// @vercel/node
// Vercel Serverless Function
// POST /api/create-payment

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

    // Create Razorpay order using direct API call (not SDK)
    // This gives us better timeout control
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

    // Use fetch directly with timeout (20 seconds) and retry logic
    // Razorpay API can be slow sometimes, so we give it more time and retry on failure
    const maxRetries = 2;
    let lastError = null;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 20000); // 20 seconds
      
      try {
        console.log(`Attempt ${attempt}/${maxRetries}: Creating Razorpay order...`);
        
        // Create Basic Auth header
        const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64');

        const response = await fetch('https://api.razorpay.com/v1/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${auth}`,
          },
          body: JSON.stringify(orderData),
          signal: controller.signal,
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
          const errorText = await response.text();
          console.error(`❌ Razorpay API error (attempt ${attempt}):`, response.status, errorText);
          
          // Don't retry on 4xx errors (client errors - wrong keys, bad request, etc.)
          if (response.status >= 400 && response.status < 500) {
            throw new Error(`Razorpay API error: ${response.status} - ${errorText}`);
          }
          
          // Retry on 5xx errors (server errors - Razorpay's fault)
          lastError = new Error(`Razorpay API error: ${response.status} - ${errorText}`);
          if (attempt < maxRetries) {
            console.log(`Retrying in 1 second...`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            continue;
          }
          throw lastError;
        }

        const order = await response.json();
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
      } catch (fetchError) {
        clearTimeout(timeoutId);
        
        if (fetchError.name === 'AbortError') {
          console.error(`❌ Razorpay API timeout after 20 seconds (attempt ${attempt})`);
          lastError = new Error('Razorpay API timeout - please try again');
          
          // Retry on timeout
          if (attempt < maxRetries) {
            console.log(`Retrying in 1 second...`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            continue;
          }
        } else {
          lastError = fetchError;
          // Retry on network errors
          if (attempt < maxRetries) {
            console.log(`Retrying in 1 second...`);
            await new Promise(resolve => setTimeout(resolve, 1000));
            continue;
          }
        }
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
