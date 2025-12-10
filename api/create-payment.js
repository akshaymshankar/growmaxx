// @vercel/node
// Vercel Serverless Function
// POST /api/create-payment

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
      console.error('RAZORPAY_KEY_ID:', process.env.RAZORPAY_KEY_ID ? '✅ SET' : '❌ MISSING');
      console.error('RAZORPAY_KEY_SECRET:', process.env.RAZORPAY_KEY_SECRET ? '✅ SET' : '❌ MISSING');
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
    const { amount, currency = 'INR', plan_id, plan_name, billing_cycle, user_id } = body;

    console.log('Payment request:', { amount, plan_id, user_id: user_id?.substring(0, 8) });

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

    // Create Razorpay order using direct API call
    const orderData = {
      amount: Math.round(amount * 100), // Convert to paise
      currency,
      receipt: `order_${Date.now()}_${user_id.substring(0, 8)}`,
      notes: {
        plan_id,
        plan_name,
        billing_cycle,
        user_id,
      },
    };

    console.log('Creating Razorpay order with options:', {
      amount: orderData.amount,
      currency: orderData.currency,
      receipt: orderData.receipt
    });

    // Use Node.js https module for reliable HTTP requests in Vercel
    // This works better than fetch in serverless environments
    const makeRequest = () => {
      return new Promise((resolve, reject) => {
        const postData = JSON.stringify(orderData);
        const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64');

        const options = {
          hostname: 'api.razorpay.com',
          port: 443,
          path: '/v1/orders',
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`,
            'Content-Length': Buffer.byteLength(postData),
          },
          timeout: 15000, // 15 second timeout
        };

        const req = https.request(options, (res) => {
          let data = '';

          res.on('data', (chunk) => {
            data += chunk;
          });

          res.on('end', () => {
            if (res.statusCode >= 200 && res.statusCode < 300) {
              try {
                const order = JSON.parse(data);
                resolve(order);
              } catch (e) {
                reject(new Error(`Failed to parse response: ${e.message}`));
              }
            } else {
              reject(new Error(`Razorpay API error: ${res.statusCode} - ${data}`));
            }
          });
        });

        req.on('error', (error) => {
          reject(new Error(`Network error: ${error.message}`));
        });

        req.on('timeout', () => {
          req.destroy();
          reject(new Error('Request timeout after 15 seconds'));
        });

        req.write(postData);
        req.end();
      });
    };

    // Retry logic: try up to 2 times
    const maxRetries = 2;
    let lastError = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        console.log(`Attempt ${attempt}/${maxRetries}: Creating Razorpay order...`);
        
        const order = await makeRequest();
        
        console.log(`✅ Razorpay order created successfully (attempt ${attempt}):`, order.id);

        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            success: true,
            order_id: order.id,
            amount: order.amount,
            currency: order.currency,
            receipt: order.receipt,
          }),
        };
      } catch (error) {
        console.error(`❌ Error on attempt ${attempt}:`, error.message);
        lastError = error;
        
        // Retry on network errors or timeouts
        if (attempt < maxRetries && (
          error.message.includes('timeout') || 
          error.message.includes('Network error') ||
          error.message.includes('ECONNRESET') ||
          error.message.includes('ETIMEDOUT')
        )) {
          console.log(`Retrying in 1 second...`);
          await new Promise(resolve => setTimeout(resolve, 1000));
          continue;
        }
        
        // Don't retry on other errors (auth errors, etc.)
        break;
      }
    }

    // If we get here, all retries failed
    throw lastError || new Error('Failed to create Razorpay order after retries');
  } catch (error) {
    console.error('❌ Payment creation error:', error);
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
        error: 'Payment creation failed',
        message: error.message || 'Unknown error occurred',
      }),
    };
  }
}
