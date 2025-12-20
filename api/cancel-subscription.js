// Cancel Razorpay Subscription
// POST /api/cancel-subscription

import { createClient } from '@supabase/supabase-js';
import https from 'https';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { subscription_id, user_id } = req.body;

    if (!subscription_id || !user_id) {
      return res.status(400).json({ error: 'Missing subscription_id or user_id' });
    }

    // Verify user owns this subscription
    const { data: subscription, error: subError } = await supabase
      .from('subscriptions')
      .select('*')
      .eq('razorpay_subscription_id', subscription_id)
      .eq('user_id', user_id)
      .single();

    if (subError || !subscription) {
      return res.status(404).json({ error: 'Subscription not found' });
    }

    // Cancel subscription via Razorpay API
    const auth = Buffer.from(`${process.env.RAZORPAY_KEY_ID}:${process.env.RAZORPAY_KEY_SECRET}`).toString('base64');
    
    const cancelData = JSON.stringify({
      cancel_at_cycle_end: true, // Cancel at end of billing cycle (like Netflix)
    });

    const options = {
      hostname: 'api.razorpay.com',
      port: 443,
      path: `/v1/subscriptions/${subscription_id}/cancel`,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Basic ${auth}`,
        'Content-Length': Buffer.byteLength(cancelData),
      },
    };

    return new Promise((resolve) => {
      const req = https.request(options, async (response) => {
        let data = '';
        response.on('data', (chunk) => { data += chunk; });
        response.on('end', async () => {
          if (response.statusCode >= 200 && response.statusCode < 300) {
            try {
              const cancelledSub = JSON.parse(data);
              
              // Update subscription in database
              await supabase
                .from('subscriptions')
                .update({
                  status: 'cancelled',
                  cancelled_at: new Date().toISOString(),
                  updated_at: new Date().toISOString(),
                })
                .eq('razorpay_subscription_id', subscription_id);

              return resolve(res.status(200).json({
                success: true,
                message: 'Subscription cancelled successfully',
                subscription: cancelledSub,
              }));
            } catch (e) {
              return resolve(res.status(500).json({ error: 'Failed to parse response' }));
            }
          } else {
            return resolve(res.status(response.statusCode).json({
              error: 'Failed to cancel subscription',
              details: data,
            }));
          }
        });
      });

      req.on('error', (error) => {
        return resolve(res.status(500).json({
          error: 'Network error',
          message: error.message,
        }));
      });

      req.write(cancelData);
      req.end();
    });
  } catch (error) {
    console.error('Cancel subscription error:', error);
    return res.status(500).json({
      error: 'Internal server error',
      message: error.message,
    });
  }
}



