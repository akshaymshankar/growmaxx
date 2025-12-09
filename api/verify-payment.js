// Vercel Serverless Function
// POST /api/verify-payment

import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader('Access-Control-Allow-Headers', 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user_id, plan } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !user_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify signature
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;
    const generated_signature = crypto
      .createHmac('sha256', razorpayKeySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid payment signature' });
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

    return res.status(200).json({
      success: true,
      payment_id: razorpay_payment_id,
      message: 'Payment verified successfully',
    });
  } catch (error) {
    console.error('Verification error:', error);
    return res.status(500).json({
      error: 'Payment verification failed',
      message: error.message,
    });
  }
}
