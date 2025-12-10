// @vercel/node
// Send OTP via WhatsApp (Green API) or SMS (TextLocal)

const crypto = require('crypto');

// Helper to send via Green API (WhatsApp)
async function sendViaGreenAPI(phone, otp) {
  const idInstance = process.env.GREEN_API_ID_INSTANCE;
  const apiToken = process.env.GREEN_API_TOKEN;
  
  if (!idInstance || !apiToken) {
    throw new Error('Green API credentials not configured');
  }
  
  // Format phone: remove + and spaces, ensure country code
  const formattedPhone = phone.replace(/[+\s]/g, '');
  
  const message = `Your GrowMaxx verification code is: ${otp}\n\nValid for 10 minutes.`;
  
  const response = await fetch(
    `https://api.green-api.com/waInstance${idInstance}/sendMessage/${apiToken}`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chatId: `${formattedPhone}@c.us`,
        message: message
      })
    }
  );
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`Green API error: ${error}`);
  }
  
  return await response.json();
}

// Helper to send via TextLocal (SMS)
async function sendViaTextLocal(phone, otp) {
  const apiKey = process.env.TEXTLOCAL_API_KEY;
  const sender = process.env.TEXTLOCAL_SENDER || 'GrowMaxx';
  
  if (!apiKey) {
    throw new Error('TextLocal API key not configured');
  }
  
  // Format phone: remove + and spaces
  const formattedPhone = phone.replace(/[+\s]/g, '');
  
  const message = `Your GrowMaxx verification code is: ${otp}. Valid for 10 minutes.`;
  
  const params = new URLSearchParams({
    apikey: apiKey,
    numbers: formattedPhone,
    message: message,
    sender: sender
  });
  
  const response = await fetch(`https://api.textlocal.in/send/?${params}`);
  
  if (!response.ok) {
    const error = await response.text();
    throw new Error(`TextLocal error: ${error}`);
  }
  
  const data = await response.json();
  
  if (data.status !== 'success') {
    throw new Error(data.errors?.[0]?.message || 'TextLocal send failed');
  }
  
  return data;
}

// Store OTP in Supabase
async function storeOTP(phone, otp) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !supabaseKey) {
    console.warn('Supabase not configured, OTP not stored');
    return;
  }
  
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
  
  const response = await fetch(`${supabaseUrl}/rest/v1/otp_verifications`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'apikey': supabaseKey,
      'Authorization': `Bearer ${supabaseKey}`
    },
    body: JSON.stringify({
      phone: phone,
      otp: otp,
      expires_at: expiresAt.toISOString()
    })
  });
  
  if (!response.ok) {
    console.error('Failed to store OTP:', await response.text());
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP in Supabase
    await storeOTP(phone, otp);
    
    // Send OTP via WhatsApp (Green API) or SMS (TextLocal)
    let sent = false;
    let method = '';
    
    // Try Green API first (WhatsApp)
    if (process.env.GREEN_API_ID_INSTANCE && process.env.GREEN_API_TOKEN) {
      try {
        await sendViaGreenAPI(phone, otp);
        sent = true;
        method = 'WhatsApp';
      } catch (error) {
        console.error('Green API error:', error);
      }
    }
    
    // Fallback to TextLocal (SMS)
    if (!sent && process.env.TEXTLOCAL_API_KEY) {
      try {
        await sendViaTextLocal(phone, otp);
        sent = true;
        method = 'SMS';
      } catch (error) {
        console.error('TextLocal error:', error);
      }
    }
    
    // If no service configured, return OTP for development (REMOVE IN PRODUCTION!)
    if (!sent) {
      console.log(`⚠️ No OTP service configured. OTP for ${phone}: ${otp}`);
      console.log('📝 Configure Green API or TextLocal in environment variables');
      
      // For development only - return OTP
      res.status(200).json({ 
        success: true,
        message: 'OTP generated (no service configured)',
        otp: otp, // REMOVE IN PRODUCTION
        warning: 'Configure Green API or TextLocal for production'
      });
      return;
    }
    
    res.status(200).json({ 
      success: true,
      message: `OTP sent successfully via ${method}`,
      // DO NOT return OTP in production!
    });
    
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ error: error.message || 'Failed to send OTP' });
  }
}

