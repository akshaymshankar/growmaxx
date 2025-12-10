// @vercel/node
// Vercel Serverless Function
// POST /api/verify-payment

import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

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
    const body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user_id, plan } = body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !user_id) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    // Verify signature
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
    const generated_signature = crypto
      .createHmac('sha256', razorpayKeySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return {
        statusCode: 400,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({ error: 'Invalid payment signature' }),
      };
    }

    // Initialize Supabase with service role key
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Payment verified - save to database
    const { data: payment, error: paymentError } = await supabase
      .from('payments')
      .insert({
        user_id,
        razorpay_payment_id,
        razorpay_order_id,
        amount: plan.amount,
        currency: 'INR',
        status: 'success',
        payment_method: 'razorpay',
        metadata: { plan },
      })
      .select()
      .single();

    if (paymentError) {
      console.error('Payment save error:', paymentError);
    }

    // Create or update subscription
    if (plan.billing_cycle !== 'onetime') {
      const endDate = new Date();
      if (plan.billing_cycle === 'monthly') {
        endDate.setMonth(endDate.getMonth() + 1);
      } else if (plan.billing_cycle === 'yearly') {
        endDate.setFullYear(endDate.getFullYear() + 1);
      }

      const { data: subscription, error: subError } = await supabase
        .from('subscriptions')
        .upsert({
          user_id,
          plan_id: plan.id,
          plan_name: plan.name,
          billing_cycle: plan.billing_cycle,
          amount: plan.amount,
          status: 'active',
          start_date: new Date().toISOString(),
          end_date: endDate.toISOString(),
          next_billing_date: endDate.toISOString(),
          autopay_enabled: plan.autopay || false,
        }, {
          onConflict: 'user_id',
        })
        .select()
        .single();

      if (subError) {
        console.error('Subscription error:', subError);
      }
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        success: true,
        payment_id: razorpay_payment_id,
        message: 'Payment verified successfully',
      }),
    };
  } catch (error) {
    console.error('Verification error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        error: 'Payment verification failed',
        message: error.message,
      }),
    };
  }
}
