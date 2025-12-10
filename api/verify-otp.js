// @vercel/node
// Verify OTP from Supabase

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ error: 'Phone and OTP are required' });
    }

    // Validate OTP format
    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      return res.status(400).json({ error: 'Invalid OTP format' });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    
    // If Supabase not configured, accept OTP for development
    if (!supabaseUrl || !supabaseKey) {
      console.warn('⚠️ Supabase not configured, accepting OTP for development');
      return res.status(200).json({ 
        success: true,
        message: 'OTP verified (development mode)'
      });
    }
    
    // Get OTP from Supabase
    const response = await fetch(
      `${supabaseUrl}/rest/v1/otp_verifications?phone=eq.${encodeURIComponent(phone)}&expires_at=gt.${new Date().toISOString()}&verified=eq.false&order=created_at.desc&limit=1`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch OTP from database');
    }
    
    const otpRecords = await response.json();
    
    if (!otpRecords || otpRecords.length === 0) {
      return res.status(400).json({ error: 'OTP not found or expired' });
    }
    
    const otpRecord = otpRecords[0];
    
    // Verify OTP
    if (otpRecord.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
    
    // Mark OTP as verified
    await fetch(
      `${supabaseUrl}/rest/v1/otp_verifications?id=eq.${otpRecord.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        },
        body: JSON.stringify({ verified: true })
      }
    );
    
    res.status(200).json({ 
      success: true,
      message: 'OTP verified successfully'
    });
    
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ error: error.message || 'Failed to verify OTP' });
  }
}

