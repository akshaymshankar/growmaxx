// Unified Express server for Railway deployment
// Serves frontend (static files) + API routes + Webhook handler
// Run with: npm run server (local) or Railway will auto-start

import express from 'express';
import cors from 'cors';
import Razorpay from 'razorpay';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { readFileSync, existsSync } from 'fs';
import { Resend } from 'resend';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const NODE_ENV = process.env.NODE_ENV || 'development';

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || '*',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Initialize Supabase client for webhook
// Use defaults from frontend config if env vars not set
const supabaseUrl = process.env.SUPABASE_URL || 'https://qrwsqjztooxeziqfrmjx.supabase.co';
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyd3Nxanp0b294ZXppcWZybWp4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyNTY2MTEsImV4cCI6MjA4MDgzMjYxMX0.woX1RFTOnSN-JRdObGWsrvhCpLBNRcA4m7TTLUdvy0A';

const supabase = createClient(supabaseUrl, supabaseKey);

// Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID || 'rzp_live_RpPJAYduTK0PS7',
  key_secret: process.env.RAZORPAY_KEY_SECRET || '7CjgSBmlW2rhdtWKrcJ4fH75',
});

// Resend email client (free tier: 3,000 emails/month)
const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

// Helper function to send emails
async function sendEmail({ from, to, subject, html, text }) {
  // If Resend not configured, log to console
  if (!resend) {
    console.log('📧 Email (Resend not configured):', { from, to, subject, text });
    return { success: false, message: 'Resend API key not configured' };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: from || 'operations@growmaxx.in',
      to: to,
      subject: subject,
      html: html || `<pre>${text}</pre>`,
      text: text,
    });

    if (error) {
      console.error('Resend email error:', error);
      return { success: false, error };
    }

    console.log('✅ Email sent successfully:', data);
    return { success: true, data };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, error: error.message };
  }
}

// Cancel subscription
app.post('/api/cancel-subscription', async (req, res) => {
  try {
    const { subscription_id, user_id } = req.body;

    if (!subscription_id || !user_id) {
      return res.status(400).json({ error: 'Missing subscription_id or user_id' });
    }

    // Cancel subscription via Razorpay API (cancel at end of cycle, like Netflix)
    const cancelledSub = await razorpay.subscriptions.cancel(subscription_id, {
      cancel_at_cycle_end: true, // Cancel at end of billing cycle
    });

    res.json({
      success: true,
      message: 'Subscription cancelled successfully',
      subscription: cancelledSub,
    });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    res.status(500).json({
      error: 'Failed to cancel subscription',
      message: error.message,
    });
  }
});

// Create subscription (for autopay)
app.post('/api/create-subscription', async (req, res) => {
  try {
    const { plan_id, plan_name, amount, billing_cycle, user_id, user_email, user_name, user_phone, payment_intent_id } = req.body;

    console.log('📋 Subscription creation request:', {
      plan_id,
      plan_name,
      amount: amount,
      amount_in_paise: Math.round(amount * 100),
      billing_cycle,
      user_id: user_id?.substring(0, 8),
    });

    if (!plan_id || !amount || !billing_cycle || !user_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Validate amount is reasonable (not test amount)
    if (amount < 100) {
      console.error('❌ Amount too low:', amount);
      return res.status(400).json({ error: 'Amount must be at least ₹100' });
    }

    // Calculate billing interval
    let period = 'monthly';
    let interval = 1;
    
    if (billing_cycle === 'yearly') {
      period = 'monthly';
      interval = 12; // Bill monthly for 12 months
    } else if (billing_cycle === 'monthly') {
      period = 'monthly';
      interval = 1;
    }

    // Create a Razorpay plan (Razorpay will generate the plan_id)
    // Note: For production, you should create plans in Razorpay dashboard and reuse them
    let razorpayPlan;
    
    try {
      const amountInPaise = Math.round(amount * 100);
      console.log('💰 Creating Razorpay plan with amount:', {
        amount_rupees: amount,
        amount_paise: amountInPaise,
        currency: 'INR',
      });

      razorpayPlan = await razorpay.plans.create({
        period,
        interval,
        item: {
          name: `${plan_name} - ${billing_cycle === 'yearly' ? 'Yearly' : 'Monthly'}`,
          amount: amountInPaise, // Convert to paise
          currency: 'INR',
          description: `${plan_name} Plan - ${billing_cycle === 'yearly' ? 'Yearly' : 'Monthly'}`,
        },
      });
      console.log('✅ Razorpay plan created:', razorpayPlan.id);
      console.log('✅ Plan amount:', {
        plan_amount_paise: razorpayPlan.item?.amount,
        plan_amount_rupees: (razorpayPlan.item?.amount || 0) / 100,
      });
    } catch (createPlanError) {
      console.error('Plan creation error:', createPlanError);
      // If plan creation fails (e.g., duplicate), try to find existing plan
      // or use plan_id from request if it's a valid Razorpay plan_id
      if (createPlanError.statusCode === 400 && createPlanError.error?.description?.includes('already exists')) {
        // Plan might already exist, but we don't have the ID
        // For now, return error - in production, you should create plans in dashboard
        throw new Error('Plan creation failed. Please create plans in Razorpay dashboard first.');
      }
      throw createPlanError;
    }

    // Create subscription with plan_id + customer for UPI Autopay/Card mandates
    // Note: Subscriptions don't support hosted_page parameter
    // They return short_url for customer authorization
    // IMPORTANT: UPI Autopay has a 30-year limit, so we can't use 999 (infinite)
    // Razorpay: Either end_at OR total_count should be sent, not both
    const now = Math.floor(Date.now() / 1000);
    
    // Calculate total_count based on billing cycle
    // User can extend plan later if needed
    let totalCount;
    
    if (billing_cycle === 'yearly') {
      totalCount = 1; // 1 yearly payment = 1 year
    } else {
      // Monthly: 12 billing cycles = 1 year
      totalCount = 12; // 12 months = 1 year
    }
    
    const subscriptionData = {
      plan_id: razorpayPlan.id,
      // Customer details required for UPI Autopay and Card mandates
      customer_notify: 1,
      total_count: totalCount, // Use total_count (Razorpay will calculate end_at automatically)
      start_at: now + 60, // Start in 1 minute
      expire_by: now + (24 * 60 * 60), // Authorization link expires in 24 hours
      notes: {
        user_id,
        plan_name,
        billing_cycle,
        autopay_enabled: 'true',
        payment_intent_id, // Link to initial payment intent for webhook matching
      },
    };

    // Add customer details if provided (for UPI Autopay/Card mandates)
    if (user_email || user_name || user_phone) {
      // First, create or get customer
      let customer;
      try {
        // Try to find existing customer by email
        const customers = await razorpay.customers.all({ email: user_email });
        if (customers.items && customers.items.length > 0) {
          customer = customers.items[0];
        } else {
          // Create new customer
          customer = await razorpay.customers.create({
            name: user_name || 'Customer',
            email: user_email || undefined,
            contact: user_phone || undefined,
          });
        }
        subscriptionData.customer_id = customer.id;
      } catch (customerError) {
        console.error('Customer creation error:', customerError);
        // Continue without customer_id - Razorpay will create one automatically
      }
    }

    const subscription = await razorpay.subscriptions.create(subscriptionData);

    console.log('✅ Subscription created:', subscription.id);
    console.log('📋 Subscription status:', subscription.status);
    console.log('📋 Subscription response keys:', Object.keys(subscription));
    
    // Razorpay subscriptions return short_url for authorization
    // Format: https://rzp.io/i/{short_url_code} or https://rzp.io/rzp/{code}
    const paymentUrl = subscription.short_url;

    if (!paymentUrl) {
      console.error('❌ No short_url in subscription response:', JSON.stringify(subscription, null, 2));
      console.error('⚠️ Make sure UPI Autopay and Cards are enabled in Razorpay Dashboard');
      console.error('⚠️ Go to: Settings → Subscriptions → Settings → Enable payment methods');
      throw new Error('Subscription created but authorization URL not available. Please enable payment methods in Razorpay Dashboard.');
    }

    console.log('✅ Subscription authorization URL:', paymentUrl);
    console.log('ℹ️ Customer will be redirected to authorize autopay mandate');

    res.json({
      success: true,
      subscription_id: subscription.id,
      short_url: paymentUrl, // Always return as short_url for frontend compatibility
      status: subscription.status,
      plan_id: subscription.plan_id,
      amount: subscription.plan ? subscription.plan.amount : Math.round(amount * 100),
      currency: subscription.plan ? subscription.plan.currency : 'INR',
    });
  } catch (error) {
    console.error('Subscription creation error:', error);
    res.status(500).json({ 
      error: 'Subscription creation failed',
      message: error.message || error.description || 'Unknown error',
      details: error.error ? error.error : undefined,
    });
  }
});

// Create payment link
app.post('/api/create-payment-link', async (req, res) => {
  try {
    const { amount, currency = 'INR', plan_id, plan_name, billing_cycle, user_id, user_email, user_name, user_phone, payment_intent_id } = req.body;

    if (!amount || !plan_id || !user_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

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
        payment_intent_id, // Link to payment intent for webhook matching
      },
      callback_url: `${process.env.FRONTEND_URL || process.env.RAILWAY_PUBLIC_DOMAIN || 'http://localhost:5173'}/payment-callback`,
      callback_method: 'get',
    };

    const paymentLink = await razorpay.paymentLink.create(paymentLinkData);

    res.json({
      success: true,
      payment_link_id: paymentLink.id,
      payment_link_url: paymentLink.short_url,
      amount: paymentLink.amount,
      currency: paymentLink.currency,
    });
  } catch (error) {
    console.error('Payment link creation error:', error);
    res.status(500).json({ 
      error: 'Payment link creation failed',
      message: error.message 
    });
  }
});

// Create payment order
app.post('/api/create-payment', async (req, res) => {
  try {
    const { amount, currency = 'INR', plan_id, plan_name, billing_cycle, user_id } = req.body;

    if (!amount || !plan_id || !user_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const options = {
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

    const order = await razorpay.orders.create(options);

    res.json({
      success: true,
      order_id: order.id,
      amount: order.amount,
      currency: order.currency,
      receipt: order.receipt,
    });
  } catch (error) {
    console.error('Razorpay error:', error);
    res.status(500).json({
      error: 'Payment creation failed',
      message: error.message,
    });
  }
});

// Verify payment
app.post('/api/verify-payment', async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, user_id, plan } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !user_id) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Verify signature
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET || '7CjgSBmlW2rhdtWKrcJ4fH75';
    const generated_signature = crypto
      .createHmac('sha256', razorpayKeySecret)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex');

    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid payment signature' });
    }

    res.json({
      success: true,
      payment_id: razorpay_payment_id,
      message: 'Payment verified successfully',
    });
  } catch (error) {
    console.error('Verification error:', error);
    res.status(500).json({
      error: 'Payment verification failed',
      message: error.message,
    });
  }
});

// Send OTP via WhatsApp (Green API) or SMS (TextLocal)
app.post('/api/send-otp', async (req, res) => {
  try {
    const { phone } = req.body;

    if (!phone) {
      return res.status(400).json({ error: 'Phone number is required' });
    }

    // Generate 6-digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Store OTP in Supabase
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    
    if (supabaseUrl && supabaseKey) {
      const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes
      
      try {
        await fetch(`${supabaseUrl}/rest/v1/otp_verifications`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': supabaseKey,
            'Authorization': `Bearer ${supabaseKey}`
          },
          body: JSON.stringify({
            phone: phone,
            otp: otp,
            expires_at: expiresAt.toISOString()
          })
        });
      } catch (err) {
        console.error('Failed to store OTP:', err);
      }
    }
    
    // Try Green API (WhatsApp)
    let sent = false;
    let method = '';
    
    if (process.env.GREEN_API_ID_INSTANCE && process.env.GREEN_API_TOKEN) {
      try {
        const formattedPhone = phone.replace(/[+\s]/g, '');
        const message = `Your GrowMaxx verification code is: ${otp}\n\nValid for 10 minutes.`;
        
        const response = await fetch(
          `https://api.green-api.com/waInstance${process.env.GREEN_API_ID_INSTANCE}/sendMessage/${process.env.GREEN_API_TOKEN}`,
          {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              chatId: `${formattedPhone}@c.us`,
              message: message
            })
          }
        );
        
        if (response.ok) {
          sent = true;
          method = 'WhatsApp';
        }
      } catch (err) {
        console.error('Green API error:', err);
      }
    }
    
    // Fallback to TextLocal (SMS)
    if (!sent && process.env.TEXTLOCAL_API_KEY) {
      try {
        const formattedPhone = phone.replace(/[+\s]/g, '');
        const message = `Your GrowMaxx verification code is: ${otp}. Valid for 10 minutes.`;
        
        const params = new URLSearchParams({
          apikey: process.env.TEXTLOCAL_API_KEY,
          numbers: formattedPhone,
          message: message,
          sender: process.env.TEXTLOCAL_SENDER || 'GrowMaxx'
        });
        
        const response = await fetch(`https://api.textlocal.in/send/?${params}`);
        const data = await response.json();
        
        if (data.status === 'success') {
          sent = true;
          method = 'SMS';
        }
      } catch (err) {
        console.error('TextLocal error:', err);
      }
    }
    
    // If no service configured, return OTP for development
    if (!sent) {
      console.log(`⚠️ No OTP service configured. OTP for ${phone}: ${otp}`);
      res.json({ 
        success: true,
        message: 'OTP generated (no service configured)',
        otp: otp, // Development only
        warning: 'Configure Green API or TextLocal for production'
      });
      return;
    }
    
    res.json({ 
      success: true,
      message: `OTP sent successfully via ${method}`
    });
    
  } catch (error) {
    console.error('Send OTP error:', error);
    res.status(500).json({ error: error.message || 'Failed to send OTP' });
  }
});

// Verify OTP from Supabase
app.post('/api/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body;

    if (!phone || !otp) {
      return res.status(400).json({ error: 'Phone and OTP are required' });
    }

    if (otp.length !== 6 || !/^\d+$/.test(otp)) {
      return res.status(400).json({ error: 'Invalid OTP format' });
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_ANON_KEY;
    
    // If Supabase not configured, accept OTP for development
    if (!supabaseUrl || !supabaseKey) {
      console.warn('⚠️ Supabase not configured, accepting OTP for development');
      return res.json({ 
        success: true,
        message: 'OTP verified (development mode)'
      });
    }
    
    // Get OTP from Supabase
    const response = await fetch(
      `${supabaseUrl}/rest/v1/otp_verifications?phone=eq.${encodeURIComponent(phone)}&expires_at=gt.${new Date().toISOString()}&verified=eq.false&order=created_at.desc&limit=1`,
      {
        headers: {
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        }
      }
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch OTP from database');
    }
    
    const otpRecords = await response.json();
    
    if (!otpRecords || otpRecords.length === 0) {
      return res.status(400).json({ error: 'OTP not found or expired' });
    }
    
    const otpRecord = otpRecords[0];
    
    if (otpRecord.otp !== otp) {
      return res.status(400).json({ error: 'Invalid OTP' });
    }
    
    // Mark OTP as verified
    await fetch(
      `${supabaseUrl}/rest/v1/otp_verifications?id=eq.${otpRecord.id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'apikey': supabaseKey,
          'Authorization': `Bearer ${supabaseKey}`
        },
        body: JSON.stringify({ verified: true })
      }
    );
    
    res.json({ 
      success: true,
      message: 'OTP verified successfully'
    });
    
  } catch (error) {
    console.error('Verify OTP error:', error);
    res.status(500).json({ error: error.message || 'Failed to verify OTP' });
  }
});

// Webhook handler (from api/webhook.js)
app.post('/api/webhook', async (req, res) => {
  try {
    // Get webhook secret from environment
    const webhookSecret = process.env.RAZORPAY_WEBHOOK_SECRET;
    
    if (!webhookSecret) {
      console.error('❌ RAZORPAY_WEBHOOK_SECRET not configured');
      return res.status(500).json({ error: 'Webhook secret not configured' });
    }

    // Get webhook signature from headers
    const signature = req.headers['x-razorpay-signature'];
    const webhookBody = JSON.stringify(req.body);
    
    // Verify webhook signature
    const expectedSignature = crypto
      .createHmac('sha256', webhookSecret)
      .update(webhookBody)
      .digest('hex');

    if (signature !== expectedSignature) {
      console.error('❌ Invalid webhook signature');
      return res.status(401).json({ error: 'Invalid signature' });
    }

    // Parse webhook payload
    const payload = req.body;
    const event = payload.event;
    const paymentEntity = payload.payload?.payment?.entity || payload.payload?.payment_link?.entity;

    console.log('Webhook event received:', event);
    console.log('Payment entity:', paymentEntity?.id);

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
        return res.status(400).json({ error: 'Could not match payment to user' });
      }

      if (!planId) {
        console.error('❌ Could not determine plan_id for payment');
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
          
          // Update user profile with plan information
          const { data: profileData } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', userId)
            .single();

          if (profileData) {
            // Map plan_id to plan tier (basic, growth, e2e)
            let planTier = 'basic';
            if (planId === 'growth') planTier = 'growth';
            else if (planId === 'onetime') planTier = 'e2e';

            const { error: profileUpdateError } = await supabase
              .from('profiles')
              .update({
                plan_id: planId,
                plan_name: notes.plan_name || 'Plan',
                billing_cycle: billingCycle,
                plan_tier: planTier, // basic, growth, or e2e
                updated_at: new Date().toISOString(),
              })
              .eq('id', userId);

            if (profileUpdateError) {
              console.error('Profile update error:', profileUpdateError);
            } else {
              console.log('✅ User profile upgraded:', { userId: userId.substring(0, 8), planTier, planId });
            }
          }

          // Get user email for notifications (from profile or notes)
          const userEmail = profileData?.email || notes.user_email || '';
          const userName = profileData?.name || profileData?.full_name || notes.user_name || 'Customer';

          // Send email to founder@growmaxx.in about new payment
          try {
            await sendEmail({
              from: 'operations@growmaxx.in',
              to: 'founder@growmaxx.in',
              subject: `New Payment Received - ${notes.plan_name || planId} Plan`,
              text: `New payment received from ${userName} (${userEmail})\n\nPlan: ${notes.plan_name || planId}\nBilling: ${billingCycle}\nAmount: ₹${(amount / 100).toFixed(2)}\nPayment ID: ${paymentId}`,
              html: `
                <h2>New Payment Received</h2>
                <p><strong>Customer:</strong> ${userName} (${userEmail})</p>
                <p><strong>Plan:</strong> ${notes.plan_name || planId}</p>
                <p><strong>Billing:</strong> ${billingCycle}</p>
                <p><strong>Amount:</strong> ₹${(amount / 100).toFixed(2)}</p>
                <p><strong>Payment ID:</strong> ${paymentId}</p>
              `,
            });
          } catch (emailError) {
            console.error('Founder email error:', emailError);
          }

          // Send welcome email to user from operations@growmaxx.in
          if (userEmail) {
            try {
              await sendEmail({
                from: 'operations@growmaxx.in',
                to: userEmail,
                subject: `Welcome to GrowMaxx - ${notes.plan_name || planId} Plan`,
                text: `Hi ${userName},\n\nWelcome to GrowMaxx! Your ${notes.plan_name || planId} plan is now active.\n\nWe're excited to help grow your business online!\n\nBest regards,\nGrowMaxx Team`,
                html: `
                  <h2>Welcome to GrowMaxx!</h2>
                  <p>Hi ${userName},</p>
                  <p>Welcome to GrowMaxx! Your <strong>${notes.plan_name || planId}</strong> plan is now active.</p>
                  <p>We're excited to help grow your business online!</p>
                  <p>Best regards,<br>GrowMaxx Team</p>
                `,
              });
            } catch (emailError) {
              console.error('Welcome email error:', emailError);
            }
          }
          
          // Activate website when subscription is created/updated
          const { data: websites } = await supabase
            .from('websites')
            .select('*')
            .eq('user_id', userId);

          if (websites && websites.length > 0) {
            for (const website of websites) {
              if (website.status === 'suspended') {
                await supabase
                  .from('websites')
                  .update({ 
                    status: 'live',
                    suspended_at: null,
                    suspension_reason: null,
                    reactivated_at: new Date().toISOString(),
                  })
                  .eq('id', website.id);
                console.log(`✅ Website activated after subscription: ${website.site_url || website.id}`);
              }
            }
          }
        }
      }

      return res.json({ 
        success: true,
        message: 'Webhook processed successfully'
      });
    }

    // Handle subscription events
    if (event.startsWith('subscription.')) {
      const subscriptionEntity = payload.payload?.subscription?.entity;
      const subscriptionId = subscriptionEntity?.id;
      const subscriptionStatus = subscriptionEntity?.status;
      const notes = subscriptionEntity?.notes || {};
      const userId = notes.user_id;
      const planId = notes.plan_id;
      const billingCycle = notes.billing_cycle;

      console.log('Subscription event:', event, {
        subscriptionId,
        status: subscriptionStatus,
        userId: userId?.substring(0, 8),
      });

      if (userId && subscriptionId) {
        // Determine subscription status
        let dbStatus = 'active';
        if (subscriptionStatus === 'cancelled' || subscriptionStatus === 'completed' || subscriptionStatus === 'expired') {
          dbStatus = 'cancelled';
        } else if (subscriptionStatus === 'paused' || subscriptionStatus === 'halted') {
          dbStatus = 'paused';
        }
        
        // Update subscription in database
        const { error: subError } = await supabase
          .from('subscriptions')
          .upsert({
            user_id: userId,
            razorpay_subscription_id: subscriptionId,
            plan_id: planId,
            plan_name: notes.plan_name || 'Plan',
            billing_cycle: billingCycle,
            status: dbStatus,
            autopay_enabled: true,
            updated_at: new Date().toISOString(),
          }, {
            onConflict: 'user_id',
          });

        if (subError) {
          console.error('Subscription update error:', subError);
        } else {
          console.log('✅ Subscription updated:', dbStatus);
        }

        // AUTOMATIC WEBSITE DEACTIVATION/ACTIVATION
        if (dbStatus === 'cancelled' || dbStatus === 'paused') {
          console.log('🛑 Subscription cancelled/paused - Deactivating website...');
          
          const { data: websites, error: websitesError } = await supabase
            .from('websites')
            .select('*')
            .eq('user_id', userId);

          if (!websitesError && websites && websites.length > 0) {
            for (const website of websites) {
              if (website.status === 'live' || website.status === 'active') {
                const { error: updateError } = await supabase
                  .from('websites')
                  .update({ 
                    status: 'suspended',
                    suspended_at: new Date().toISOString(),
                    suspension_reason: `Subscription ${dbStatus === 'cancelled' ? 'cancelled' : 'paused'}`,
                  })
                  .eq('id', website.id);

                if (updateError) {
                  console.error('Website deactivation error:', updateError);
                } else {
                  console.log(`✅ Website deactivated: ${website.site_url || website.id}`);
                }
              }
            }
          }
        } else if (dbStatus === 'active') {
          console.log('✅ Subscription active - Activating website...');
          
          const { data: websites, error: websitesError } = await supabase
            .from('websites')
            .select('*')
            .eq('user_id', userId);

          if (!websitesError && websites && websites.length > 0) {
            for (const website of websites) {
              if (website.status === 'suspended' && 
                  (website.suspension_reason?.includes('Subscription') || 
                   website.suspension_reason?.includes('subscription'))) {
                const { error: updateError } = await supabase
                  .from('websites')
                  .update({ 
                    status: 'live',
                    suspended_at: null,
                    suspension_reason: null,
                    reactivated_at: new Date().toISOString(),
                  })
                  .eq('id', website.id);

                if (updateError) {
                  console.error('Website activation error:', updateError);
                } else {
                  console.log(`✅ Website reactivated: ${website.site_url || website.id}`);
                }
              }
            }
          }
        }

        // Handle subscription.charged event
        if (event === 'subscription.charged') {
          const invoice = payload.payload?.invoice?.entity;
          const paymentId = invoice?.payment_id;
          const amount = invoice?.amount;

          if (userId && paymentId) {
            await supabase
              .from('payments')
              .insert({
                user_id: userId,
                razorpay_payment_id: paymentId,
                razorpay_subscription_id: subscriptionId,
                amount: amount,
                currency: 'INR',
                status: 'success',
                payment_method: 'razorpay',
                description: `Subscription payment - ${notes.plan_name || 'Plan'}`,
                metadata: {
                  plan_id: planId,
                  billing_cycle: billingCycle,
                  subscription_id: subscriptionId,
                },
              });

            // Update user profile with plan information
            const { data: profileData } = await supabase
              .from('profiles')
              .select('*')
              .eq('id', userId)
              .single();

            if (profileData) {
              // Map plan_id to plan tier (basic, growth, e2e)
              let planTier = 'basic';
              if (planId === 'growth') planTier = 'growth';
              else if (planId === 'onetime') planTier = 'e2e';

              const { error: profileUpdateError } = await supabase
                .from('profiles')
                .update({
                  plan_id: planId,
                  plan_name: notes.plan_name || 'Plan',
                  billing_cycle: billingCycle,
                  plan_tier: planTier, // basic, growth, or e2e
                  updated_at: new Date().toISOString(),
                })
                .eq('id', userId);

              if (profileUpdateError) {
                console.error('Profile update error:', profileUpdateError);
              } else {
                console.log('✅ User profile upgraded:', { userId: userId.substring(0, 8), planTier, planId });
              }

              // Get user email for notifications
              const userEmail = profileData.email || notes.user_email || '';
              const userName = profileData.name || profileData.full_name || notes.user_name || 'Customer';

              // Send email to founder@growmaxx.in about new payment
              try {
                await sendEmail({
                  from: 'operations@growmaxx.in',
                  to: 'founder@growmaxx.in',
                  subject: `New Payment Received - ${notes.plan_name || planId} Plan`,
                  text: `New payment received from ${userName} (${userEmail})\n\nPlan: ${notes.plan_name || planId}\nBilling: ${billingCycle}\nAmount: ₹${(amount / 100).toFixed(2)}\nPayment ID: ${paymentId}\nSubscription ID: ${subscriptionId}`,
                  html: `
                    <h2>New Payment Received</h2>
                    <p><strong>Customer:</strong> ${userName} (${userEmail})</p>
                    <p><strong>Plan:</strong> ${notes.plan_name || planId}</p>
                    <p><strong>Billing:</strong> ${billingCycle}</p>
                    <p><strong>Amount:</strong> ₹${(amount / 100).toFixed(2)}</p>
                    <p><strong>Payment ID:</strong> ${paymentId}</p>
                    <p><strong>Subscription ID:</strong> ${subscriptionId}</p>
                  `,
                });
              } catch (emailError) {
                console.error('Founder email error:', emailError);
              }

              // Send welcome email to user from operations@growmaxx.in (only on first payment)
              if (userEmail && subscriptionEntity?.paid_count === 1) {
                try {
                  await sendEmail({
                    from: 'operations@growmaxx.in',
                    to: userEmail,
                    subject: `Welcome to GrowMaxx - ${notes.plan_name || planId} Plan`,
                    text: `Hi ${userName},\n\nWelcome to GrowMaxx! Your ${notes.plan_name || planId} plan is now active.\n\nWe're excited to help grow your business online!\n\nBest regards,\nGrowMaxx Team`,
                    html: `
                      <h2>Welcome to GrowMaxx!</h2>
                      <p>Hi ${userName},</p>
                      <p>Welcome to GrowMaxx! Your <strong>${notes.plan_name || planId}</strong> plan is now active.</p>
                      <p>We're excited to help grow your business online!</p>
                      <p>Best regards,<br>GrowMaxx Team</p>
                    `,
                  });
                } catch (emailError) {
                  console.error('Welcome email error:', emailError);
                }
              }
            }

            // Ensure website is active after successful payment
            const { data: websites } = await supabase
              .from('websites')
              .select('*')
              .eq('user_id', userId);

            if (websites && websites.length > 0) {
              for (const website of websites) {
                if (website.status === 'suspended') {
                  await supabase
                    .from('websites')
                    .update({ 
                      status: 'live',
                      suspended_at: null,
                      suspension_reason: null,
                      reactivated_at: new Date().toISOString(),
                    })
                    .eq('id', website.id);
                  console.log(`✅ Website reactivated after payment: ${website.site_url || website.id}`);
                }
              }
            }
          }
        }

        // Handle payment failure
        if (event === 'invoice.payment_failed' || event === 'subscription.pending') {
          console.log('⚠️ Subscription payment failed - Deactivating website...');
          
          if (userId) {
            const { data: websites } = await supabase
              .from('websites')
              .select('*')
              .eq('user_id', userId);

            if (websites && websites.length > 0) {
              for (const website of websites) {
                if (website.status === 'live' || website.status === 'active') {
                  await supabase
                    .from('websites')
                    .update({ 
                      status: 'suspended',
                      suspended_at: new Date().toISOString(),
                      suspension_reason: 'Payment failed',
                    })
                    .eq('id', website.id);
                  console.log(`🛑 Website deactivated due to payment failure: ${website.site_url || website.id}`);
                }
              }
            }
          }
        }
      }

      return res.json({ 
        success: true,
        message: 'Subscription webhook processed'
      });
    }

    // Handle payment failed event
    if (event === 'payment.failed') {
      const paymentId = paymentEntity?.id;
      const notes = paymentEntity?.notes || {};
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
      return res.json({ 
        success: true,
        message: 'Payment failure recorded'
      });
    }

    // Unknown event - just acknowledge
    console.log('Unknown webhook event:', event);
    return res.json({ 
      success: true,
      message: 'Webhook received'
    });

  } catch (error) {
    console.error('❌ Webhook error:', error);
    return res.status(500).json({
      error: 'Webhook processing failed',
      message: error.message,
    });
  }
});

// Create payment link (for one-time payments)
app.post('/api/create-payment-link', async (req, res) => {
  try {
    const { amount, currency = 'INR', plan_id, plan_name, billing_cycle, user_id, user_email, user_name, user_phone, payment_intent_id } = req.body;

    console.log('📋 Payment link creation request:', {
      plan_id,
      plan_name,
      amount: amount,
      amount_in_paise: Math.round(amount * 100),
      billing_cycle,
      user_id: user_id?.substring(0, 8),
    });

    if (!amount || !plan_id || !user_id) {
      return res.status(400).json({ error: 'Missing required fields: amount, plan_id, user_id' });
    }

    // Validate amount is reasonable (not test amount)
    if (amount < 100) {
      console.error('❌ Amount too low:', amount);
      return res.status(400).json({ error: 'Amount must be at least ₹100' });
    }

    const amountInPaise = Math.round(amount * 100);
    console.log('💰 Creating payment link with amount:', {
      amount_rupees: amount,
      amount_paise: amountInPaise,
      currency: 'INR',
    });

    // Create payment link via Razorpay API
    const paymentLinkData = {
      amount: amountInPaise,
      currency: currency,
      description: `${plan_name} Plan - ${billing_cycle === 'yearly' ? 'Yearly' : billing_cycle === 'onetime' ? 'One-time' : 'Monthly'}`,
      customer: {
        name: user_name || 'Customer',
        email: user_email || undefined,
        contact: user_phone || undefined,
      },
      notify: {
        sms: true,
        email: true,
      },
      reminder_enable: true,
      notes: {
        plan_id,
        plan_name,
        billing_cycle,
        user_id,
        payment_intent_id,
      },
      callback_url: `${process.env.FRONTEND_URL || process.env.RAILWAY_PUBLIC_DOMAIN || 'http://localhost:5173'}/payment-callback`,
      callback_method: 'get',
    };

    const paymentLink = await razorpay.paymentLink.create(paymentLinkData);

    console.log('✅ Payment link created:', {
      payment_link_id: paymentLink.id,
      payment_link_url: paymentLink.short_url,
      amount_paise: paymentLink.amount,
      amount_rupees: paymentLink.amount / 100,
    });

    res.json({
      success: true,
      payment_link_id: paymentLink.id,
      payment_link_url: paymentLink.short_url,
      amount: paymentLink.amount,
      currency: paymentLink.currency,
    });
  } catch (error) {
    console.error('Payment link creation error:', error);
    res.status(500).json({
      error: 'Payment link creation failed',
      message: error.message || error.description || 'Unknown error',
      details: error.error ? error.error : undefined,
    });
  }
});

// Verify payment callback (for frontend verification)
app.post('/api/verify-payment-callback', async (req, res) => {
  try {
    const { payment_id, payment_link_id, subscription_id, user_id, pending_payment_id } = req.body;

    if (!user_id) {
      return res.status(400).json({ error: 'user_id is required' });
    }

    // Check if payment exists in database
    if (payment_id) {
      const { data: payment } = await supabase
        .from('payments')
        .select('*')
        .eq('razorpay_payment_id', payment_id)
        .eq('user_id', user_id)
        .maybeSingle();

      if (payment && payment.status === 'success') {
        return res.json({ 
          success: true, 
          verified: true,
          payment_id: payment_id,
          message: 'Payment verified successfully'
        });
      }
    }

    // Check if subscription exists
    if (subscription_id) {
      const { data: subscription } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('razorpay_subscription_id', subscription_id)
        .eq('user_id', user_id)
        .maybeSingle();

      if (subscription) {
        return res.json({ 
          success: true, 
          verified: true,
          subscription_id: subscription_id,
          subscription_status: subscription.status,
          message: 'Subscription verified successfully'
        });
      }
    }

    // If not found yet, webhook might still be processing
    return res.json({ 
      success: true, 
      verified: false,
      message: 'Payment received, processing...'
    });
  } catch (error) {
    console.error('Payment verification error:', error);
    res.status(500).json({ 
      error: 'Verification failed',
      message: error.message 
    });
  }
});

// Send welcome email on signup
app.post('/api/send-welcome-email', async (req, res) => {
  try {
    const { user_email, user_name } = req.body;

    if (!user_email) {
      return res.status(400).json({ error: 'user_email is required' });
    }

    const userName = user_name || 'Customer';

    // Send welcome email to new user
    const emailResult = await sendEmail({
      from: 'operations@growmaxx.in',
      to: user_email,
      subject: 'Welcome to GrowMaxx! 🚀',
      text: `Hi ${userName},\n\nWelcome to GrowMaxx! We're excited to have you on board.\n\nGet started by selecting a plan and creating your professional landing page.\n\nBest regards,\nGrowMaxx Team`,
      html: `
        <h2>Welcome to GrowMaxx! 🚀</h2>
        <p>Hi ${userName},</p>
        <p>Welcome to GrowMaxx! We're excited to have you on board.</p>
        <p>Get started by selecting a plan and creating your professional landing page.</p>
        <p>Best regards,<br>GrowMaxx Team</p>
      `,
    });

    if (emailResult.success) {
      console.log('✅ Welcome email sent to:', user_email);
      res.json({ success: true, message: 'Welcome email sent successfully' });
    } else {
      console.error('❌ Welcome email failed:', emailResult.error);
      res.json({ success: false, message: 'Welcome email failed', error: emailResult.error });
    }
  } catch (error) {
    console.error('Send welcome email error:', error);
    res.status(500).json({ error: 'Failed to send welcome email', message: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'GrowMaxx API Server is running',
    environment: NODE_ENV,
    timestamp: new Date().toISOString()
  });
});

// Serve static files in production (Railway)
if (NODE_ENV === 'production') {
  // Serve built frontend files
  const distPath = join(__dirname, 'dist');
  
  // Check if dist folder exists
  if (existsSync(distPath)) {
    app.use(express.static(distPath));
    console.log(`✅ Serving frontend from ${distPath}`);
  } else {
    console.warn(`⚠️  Warning: ${distPath} not found. Frontend may not be built.`);
    console.warn(`⚠️  Make sure 'npm run build' runs before 'npm start'`);
  }
  
  // Serve index.html for all routes (SPA routing)
  // This must be AFTER all API routes
  app.get('*', (req, res) => {
    // Skip API routes (should be handled by API routes above)
    if (req.path.startsWith('/api/')) {
      return res.status(404).json({ error: 'API route not found' });
    }
    
    try {
      const indexPath = join(distPath, 'index.html');
      
      if (existsSync(indexPath)) {
        const indexHtml = readFileSync(indexPath, 'utf-8');
        res.send(indexHtml);
      } else {
        console.error(`❌ index.html not found at ${indexPath}`);
        res.status(500).json({ 
          error: 'Frontend not built', 
          message: 'Please ensure npm run build completed successfully',
          path: indexPath,
          distExists: existsSync(distPath)
        });
      }
    } catch (error) {
      console.error('Error serving index.html:', error);
      res.status(500).json({ 
        error: 'Failed to serve frontend', 
        message: error.message 
      });
    }
  });
}

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 GrowMaxx Server running on port ${PORT}`);
  console.log(`🌍 Environment: ${NODE_ENV}`);
  if (NODE_ENV === 'production') {
    console.log(`📦 Serving frontend from /dist`);
  } else {
    console.log(`📝 API only - Frontend runs separately on Vite dev server`);
  }
});

