// @vercel/node
// Vercel Serverless Function
// POST /api/create-subscription
// Creates a Razorpay Subscription with autopay

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
    const { plan_id, plan_name, amount, billing_cycle, user_id, user_email, user_name, user_phone } = body;

    console.log('Creating subscription:', { plan_id, amount, billing_cycle, user_id: user_id?.substring(0, 8) });

    if (!plan_id || !amount || !billing_cycle || !user_id) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ 
          error: 'Missing required fields',
          message: 'plan_id, amount, billing_cycle, and user_id are required'
        }),
      };
    }

    // Calculate billing interval
    // Razorpay uses: daily, weekly, monthly, yearly
    let interval = 'monthly';
    let interval_count = 1;
    
    if (billing_cycle === 'yearly') {
      interval = 'monthly'; // Bill monthly but for 12 months
      interval_count = 12;
    } else if (billing_cycle === 'monthly') {
      interval = 'monthly';
      interval_count = 1;
    }

    // Create Razorpay Plan first (if not exists, create it)
    // Then create subscription
    const subscriptionData = {
      plan_id: plan_id, // You'll need to create plans in Razorpay dashboard first
      customer_notify: 1,
      total_count: billing_cycle === 'yearly' ? 12 : 999, // 999 = infinite for monthly
      start_at: Math.floor(Date.now() / 1000) + 60, // Start in 1 minute
      expire_by: null,
      notes: {
        user_id,
        plan_name,
        billing_cycle,
      },
    };

    // If plan_id doesn't exist, we need to create a plan first
    // For now, let's create subscription with inline plan details
    const subscriptionWithPlan = {
      plan: {
        period: interval,
        interval: interval_count,
        item: {
          name: plan_name,
          amount: Math.round(amount * 100), // Convert to paise
          currency: 'INR',
          description: `${plan_name} Plan - ${billing_cycle === 'yearly' ? 'Yearly' : 'Monthly'}`,
        },
      },
      customer_notify: 1,
      total_count: billing_cycle === 'yearly' ? 12 : 999,
      start_at: Math.floor(Date.now() / 1000) + 60,
      notes: {
        user_id,
        plan_name,
        billing_cycle,
      },
    };

    console.log('Subscription request:', {
      plan: subscriptionWithPlan.plan,
      total_count: subscriptionWithPlan.total_count,
    });

    // Use Node.js https module to create subscription
    const makeRequest = () => {
      return new Promise((resolve, reject) => {
        const postData = JSON.stringify(subscriptionWithPlan);
        const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64');

        const options = {
          hostname: 'api.razorpay.com',
          port: 443,
          path: '/v1/subscriptions',
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
                const subscription = JSON.parse(data);
                resolve(subscription);
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

        // Timeout after 8 seconds
        timeoutId = setTimeout(() => {
          if (resolved) return;
          resolved = true;
          console.error('❌ Forcing timeout after 8 seconds');
          try {
            req.destroy();
            req.abort();
            if (req.socket) {
              req.socket.destroy();
            }
          } catch (e) {
            console.error('Error destroying request:', e);
          }
          reject(new Error('Razorpay API timeout after 8 seconds'));
        }, 8000);

        try {
          req.setTimeout(8000, () => {
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
        console.log(`Attempt ${attempt}/${maxRetries}: Creating Razorpay subscription...`);
        
        const subscription = await makeRequest();
        
        console.log(`✅ Razorpay subscription created successfully (attempt ${attempt}):`, subscription.id);

        return {
          statusCode: 200,
          headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
          },
          body: JSON.stringify({
            success: true,
            subscription_id: subscription.id,
            short_url: subscription.short_url, // Payment link for customer to authorize
            status: subscription.status,
            plan_id: subscription.plan_id,
            amount: subscription.plan.amount,
            currency: subscription.plan.currency,
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
    
    throw lastError || new Error('Failed to create Razorpay subscription after retries');
  } catch (error) {
    console.error('❌ Subscription creation error:', error);
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
        error: 'Subscription creation failed',
        message: error.message || 'Unknown error occurred',
      }),
    };
  }
}

