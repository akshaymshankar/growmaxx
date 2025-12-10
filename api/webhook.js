// @vercel/node
// Vercel Serverless Function
// POST /api/webhook
// Handles Razorpay webhook events for payment confirmation

import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

export default async function handler(req) {
  // Only allow POST
  if (req.method !== 'POST') {
    return {
      statusCode: 405,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Get webhook secret from environment
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.error('❌ RAZORPAY_WEBHOOK_SECRET not configured');
      return {
        statusCode: 500,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Webhook secret not configured' }),
      };
    }

    // Get webhook signature from headers
    const signature = req.headers['x-razorpay-signature'];
    const webhookBody = typeof req.body === 'string' ? req.body : JSON.stringify(req.body);
    
    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(webhookBody)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('❌ Invalid webhook signature');
      return {
        statusCode: 401,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ error: 'Invalid signature' }),
      };
    }

    // Parse webhook payload
    const payload = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
    const event = payload.event;
    const paymentEntity = payload.payload?.payment?.entity || payload.payload?.payment_link?.entity;

    console.log('Webhook event received:', event);
    console.log('Payment entity:', paymentEntity?.id);

    // Initialize Supabase
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_SERVICE_ROLE_KEY
    );

    // Handle different webhook events
    if (event === 'payment.captured' || event === 'payment_link.paid') {
      const paymentId = paymentEntity?.id;
      const orderId = paymentEntity?.order_id;
      const amount = paymentEntity?.amount; // in paise
      const currency = paymentEntity?.currency;
      const status = paymentEntity?.status;
      const notes = paymentEntity?.notes || {};
      
      // Try to extract user info from notes (if available)
      let userId = notes.user_id;
      let planId = notes.plan_id;
      let billingCycle = notes.billing_cycle;
      let paymentIntentId = notes.payment_intent_id;

      // If notes don't have user info, try to match by amount and recent pending payments
      if (!userId || !planId) {
        console.log('⚠️ No user info in notes, trying to match by amount...');
        
        // Find pending payment with matching amount (within last hour)
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();
        const { data: pendingPayments, error: findError } = await supabase
          .from('payments')
          .select('*')
          .eq('status', 'pending')
          .eq('amount', amount)
          .gte('created_at', oneHourAgo)
          .order('created_at', { ascending: false })
          .limit(1);

        if (findError) {
          console.error('Error finding pending payment:', findError);
        } else if (pendingPayments && pendingPayments.length > 0) {
          const pendingPayment = pendingPayments[0];
          userId = pendingPayment.user_id;
          paymentIntentId = pendingPayment.id;
          
          // Extract plan info from metadata
          if (pendingPayment.metadata) {
            planId = pendingPayment.metadata.plan_id;
            billingCycle = pendingPayment.metadata.billing_cycle;
          }
          
          console.log('✅ Matched payment by amount:', {
            paymentIntentId,
            userId: userId?.substring(0, 8),
            planId,
          });
        }
      }

      if (!userId) {
        console.error('❌ Could not determine user_id for payment');
        return {
          statusCode: 400,
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ error: 'Could not match payment to user' }),
        };
      }

      if (!planId) {
        console.error('❌ Could not determine plan_id for payment');
        // Continue anyway - we'll use default values
        planId = 'unknown';
        billingCycle = 'monthly';
      }

      console.log('Processing payment:', {
        paymentId,
        userId: userId.substring(0, 8),
        planId,
        amount: amount / 100, // Convert to rupees
      });

      // Update payment record
      if (paymentIntentId) {
        const { error: updateError } = await supabase
          .from('payments')
          .update({
            razorpay_payment_id: paymentId,
            razorpay_order_id: orderId,
            status: 'success',
            amount: amount,
            currency: currency,
            updated_at: new Date().toISOString(),
          })
          .eq('id', paymentIntentId);

        if (updateError) {
          console.error('Payment update error:', updateError);
        } else {
          console.log('✅ Payment record updated');
        }
      } else {
        // Create new payment record if intent wasn't found
        const { error: insertError } = await supabase
          .from('payments')
          .insert({
            user_id: userId,
            razorpay_payment_id: paymentId,
            razorpay_order_id: orderId,
            amount: amount,
            currency: currency,
            status: 'success',
            payment_method: 'razorpay',
            description: `Payment via Razorpay Payment Link`,
            metadata: {
              plan_id: planId,
              billing_cycle: billingCycle,
            },
          });

        if (insertError) {
          console.error('Payment insert error:', insertError);
        } else {
          console.log('✅ Payment record created');
        }
      }

      // Create or update subscription (if not one-time)
      if (billingCycle && billingCycle !== 'onetime') {
        const endDate = new Date();
        if (billingCycle === 'monthly') {
          endDate.setMonth(endDate.getMonth() + 1);
        } else if (billingCycle === 'yearly') {
          endDate.setFullYear(endDate.getFullYear() + 1);
        }

        const { error: subError } = await supabase
          .from('subscriptions')
          .upsert({
            user_id: userId,
            plan_id: planId,
            plan_name: notes.plan_name || 'Plan',
            billing_cycle: billingCycle,
            amount: amount,
            status: 'active',
            start_date: new Date().toISOString(),
            end_date: endDate.toISOString(),
            next_billing_date: endDate.toISOString(),
            autopay_enabled: notes.autopay_enabled === 'true',
          }, {
            onConflict: 'user_id',
          });

        if (subError) {
          console.error('Subscription error:', subError);
        } else {
          console.log('✅ Subscription created/updated');
        }
      }

      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          success: true,
          message: 'Webhook processed successfully'
        }),
      };
    }

    // Handle payment failed event
    if (event === 'payment.failed') {
      const paymentId = paymentEntity?.id;
      const notes = paymentEntity?.notes || {};
      const userId = notes.user_id;
      const paymentIntentId = notes.payment_intent_id;

      if (paymentIntentId) {
        await supabase
          .from('payments')
          .update({
            razorpay_payment_id: paymentId,
            status: 'failed',
            updated_at: new Date().toISOString(),
          })
          .eq('id', paymentIntentId);
      }

      console.log('❌ Payment failed:', paymentId);
      
      return {
        statusCode: 200,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          success: true,
          message: 'Payment failure recorded'
        }),
      };
    }

    // Unknown event - just acknowledge
    console.log('Unknown webhook event:', event);
    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        success: true,
        message: 'Webhook received'
      }),
    };

  } catch (error) {
    console.error('❌ Webhook error:', error);
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        error: 'Webhook processing failed',
        message: error.message,
      }),
    };
  }
}

