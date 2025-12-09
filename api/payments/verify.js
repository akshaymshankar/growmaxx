// POST /api/payments/verify
import { verifyPaymentSignature } from '../lib/razorpay.js';
import { getUserFromToken, createResponse } from '../lib/auth.js';
import { supabaseAdmin } from '../lib/supabase.js';

export default async function handler(req) {
  if (req.method !== 'POST') {
    return createResponse(405, { error: 'Method not allowed' });
  }

  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return createResponse(401, { error: 'Unauthorized' });
    }

    const token = authHeader.split(' ')[1];
    const user = await getUserFromToken(token);

    if (!user) {
      return createResponse(401, { error: 'Invalid token' });
    }

    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, plan_id, plan_name, billing_cycle, amount } = JSON.parse(req.body);

    // Verify signature
    const isValid = verifyPaymentSignature(razorpay_order_id, razorpay_payment_id, razorpay_signature);

    if (!isValid) {
      return createResponse(400, { error: 'Invalid payment signature' });
    }

    // Update payment status
    const { data: payment } = await supabaseAdmin
      .from('payments')
      .update({
        razorpay_payment_id,
        razorpay_signature,
        status: 'success',
        updated_at: new Date().toISOString(),
      })
      .eq('razorpay_order_id', razorpay_order_id)
      .eq('user_id', user.id)
      .select()
      .single();

    if (!payment) {
      return createResponse(404, { error: 'Payment not found' });
    }

    // Create or update subscription
    const endDate = billing_cycle === 'onetime' 
      ? null 
      : billing_cycle === 'yearly'
        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    const nextBillingDate = billing_cycle === 'onetime' 
      ? null 
      : billing_cycle === 'yearly'
        ? new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString()
        : new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString();

    // Check if user has existing subscription
    const { data: existingSub } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .single();

    if (existingSub) {
      // Update existing subscription
      await supabaseAdmin
        .from('subscriptions')
        .update({
          plan_id,
          plan_name,
          amount,
          billing_cycle,
          status: 'active',
          end_date: endDate,
          next_billing_date: nextBillingDate,
          updated_at: new Date().toISOString(),
        })
        .eq('id', existingSub.id);
    } else {
      // Create new subscription
      await supabaseAdmin.from('subscriptions').insert({
        user_id: user.id,
        plan_id,
        plan_name,
        amount,
        billing_cycle,
        status: 'active',
        end_date: endDate,
        next_billing_date: nextBillingDate,
      });
    }

    return createResponse(200, {
      success: true,
      payment: {
        id: payment.id,
        amount: payment.amount,
        status: 'success',
      },
      message: 'Payment verified and subscription activated',
    });
  } catch (error) {
    console.error('Verify payment error:', error);
    return createResponse(500, { error: error.message || 'Failed to verify payment' });
  }
}

