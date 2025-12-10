// @vercel/node
// Vercel Serverless Function
// POST /api/create-payment-link
// Creates a Razorpay Payment Link with preloaded amount

import https from 'https';

export default async function handler(req) {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      },
      body: '',
    };
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Check if Razorpay credentials are configured
    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      console.error('❌ Razorpay credentials not configured');
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ 
          error: 'Payment gateway not configured',
          message: 'RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET must be set in Vercel environment variables'
        }),
      };
    }

    // Parse request body
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { amount, currency = 'INR', plan_id, plan_name, billing_cycle, user_id, user_email, user_name, user_phone } = body;

    console.log('Creating payment link:', { amount, plan_id, user_id: user_id?.substring(0, 8) });

    if (!amount || !plan_id || !user_id) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ 
          error: 'Missing required fields',
          message: 'amount, plan_id, and user_id are required'
        }),
      };
    }

    // Create Razorpay Payment Link using API
    const paymentLinkData = {
      amount: Math.round(amount * 100), // Convert to paise
      currency,
      description: `${plan_name} Plan - ${billing_cycle === 'yearly' ? 'Yearly' : billing_cycle === 'onetime' ? 'One-time' : 'Monthly'}`,
      customer: {
        name: user_name || 'Customer',
        email: user_email || '',
        contact: user_phone || '',
      },
      notify: {
        sms: false,
        email: false,
      },
      reminder_enable: false,
      notes: {
        user_id,
        plan_id,
        plan_name,
        billing_cycle,
      },
      callback_url: `${process.env.VERCEL_URL || 'https://growmaxx.vercel.app'}/payment-callback`,
      callback_method: 'get',
    };

    console.log('Payment link request:', {
      amount: paymentLinkData.amount,
      currency: paymentLinkData.currency,
      description: paymentLinkData.description
    });

    // Use Node.js https module to create payment link
    const makeRequest = () => {
      return new Promise((resolve, reject) => {
        const postData = JSON.stringify(paymentLinkData);
        const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64');

        const options = {
          hostname: 'api.razorpay.com',
          port: 443,
          path: '/v1/payment_links',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`,
            'Content-Length': Buffer.byteLength(postData),
          },
        };

        let resolved = false;
        let timeoutId = null;
        
        const req = https.request(options, (res) => {
          let data = '';

          res.on('data', (chunk) => {
            data += chunk;
          });

          res.on('end', () => {
            if (resolved) return;
            resolved = true;
            if (timeoutId) clearTimeout(timeoutId);
            
            if (res.statusCode >= 200 && res.statusCode < 300) {
              try {
                const paymentLink = JSON.parse(data);
                resolve(paymentLink);
              } catch (e) {
                reject(new Error(`Failed to parse response: ${e.message}`));
              }
            } else {
              reject(new Error(`Razorpay API error: ${res.statusCode} - ${data}`));
            }
          });
        });

        req.on('error', (error) => {
          if (resolved) return;
          resolved = true;
          if (timeoutId) clearTimeout(timeoutId);
          reject(new Error(`Network error: ${error.message}`));
        });

        // Timeout after 10 seconds
        timeoutId = setTimeout(() => {
          if (resolved) return;
          resolved = true;
          console.error('❌ Forcing timeout after 10 seconds');
          try {
            req.destroy();
            req.abort();
            if (req.socket) {
              req.socket.destroy();
            }
          } catch (e) {
            console.error('Error destroying request:', e);
          }
          reject(new Error('Razorpay API timeout after 10 seconds'));
        }, 10000);

        try {
          req.setTimeout(10000, () => {
            if (!resolved) {
              console.error('❌ Socket timeout');
              req.destroy();
            }
          });
        } catch (e) {
          // Ignore if setTimeout not available
        }

        req.write(postData);
        req.end();
      });
    };

    // Retry logic: try up to 2 times
    const maxRetries = 2;
    let lastError = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Attempt ${attempt}/${maxRetries}: Creating Razorpay payment link...`);
        
        const paymentLink = await makeRequest();
        
        console.log(`✅ Razorpay payment link created successfully (attempt ${attempt}):`, paymentLink.id);
        console.log('Payment link URL:', paymentLink.short_url);

        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            success: true,
            payment_link_id: paymentLink.id,
            payment_link_url: paymentLink.short_url,
            amount: paymentLink.amount,
            currency: paymentLink.currency,
          }),
        };
      } catch (error) {
        console.error(`❌ Error on attempt ${attempt}:`, error.message);
        lastError = error;
        
        if (attempt < maxRetries && (
          error.message.includes('timeout') || 
          error.message.includes('Network error')
        )) {
          console.log(`Retrying in 1 second...`);
          await new Promise(resolve => setTimeout(resolve, 1000));
          continue;
        }
        
        if (error.message.includes('Razorpay API error') && error.message.includes('4')) {
          throw lastError;
        }
      }
    }
    
    throw lastError || new Error('Failed to create Razorpay payment link after retries');
  } catch (error) {
    console.error('❌ Payment link creation error:', error);
    console.error('Error details:', {
      message: error.message,
      stack: error.stack,
      name: error.name,
    });
    
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Payment link creation failed',
        message: error.message || 'Unknown error occurred',
      }),
    };
  }
}

