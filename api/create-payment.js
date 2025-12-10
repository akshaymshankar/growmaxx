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

    // Use fetch directly with timeout (8 seconds)
    // This prevents the 300-second Vercel timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 8000);

    try {
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
        console.error('❌ Razorpay API error:', response.status, errorText);
        throw new Error(`Razorpay API error: ${response.status} - ${errorText}`);
      }

      const order = await response.json();
      console.log('✅ Razorpay order created successfully:', order.id);

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
        console.error('❌ Razorpay API timeout after 8 seconds');
        throw new Error('Razorpay API timeout - please try again');
      }
      throw fetchError;
    }
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
