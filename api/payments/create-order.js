// POST /api/payments/create-order
import { razorpay } from '../lib/razorpay.js';
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

    const { plan_id, plan_name, amount, billing_cycle } = JSON.parse(req.body);

    if (!plan_id || !amount) {
      return createResponse(400, { error: 'Plan ID and amount are required' });
    }

    // Create Razorpay order
    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // Convert to paise
      currency: 'INR',
      receipt: `growmaxx_${user.id}_${Date.now()}`,
      notes: {
        user_id: user.id,
        plan_id,
        plan_name,
        billing_cycle,
      },
    });

    // Save order to database
    await supabaseAdmin.from('payments').insert({
      user_id: user.id,
      amount: amount,
      razorpay_order_id: order.id,
      status: 'pending',
      metadata: {
        plan_id,
        plan_name,
        billing_cycle,
      },
    });

    return createResponse(200, {
      success: true,
      order: {
        id: order.id,
        amount: order.amount / 100,
        currency: order.currency,
        key_id: process.env.RAZORPAY_KEY_ID || 'rzp_live_RpPJAYduTK0PS7',
      },
    });
  } catch (error) {
    console.error('Create order error:', error);
    return createResponse(500, { error: error.message || 'Failed to create order' });
  }
}

