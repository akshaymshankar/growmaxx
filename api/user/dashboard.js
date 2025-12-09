// GET /api/user/dashboard
import { getUserFromToken, getUserProfile, createResponse } from '../lib/auth.js';
import { supabaseAdmin } from '../lib/supabase.js';

export default async function handler(req) {
  if (req.method !== 'GET') {
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

    // Get user profile
    const profile = await getUserProfile(user.id);

    // Get active subscription
    const { data: subscription } = await supabaseAdmin
      .from('subscriptions')
      .select('*')
      .eq('user_id', user.id)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    // Get payment history
    const { data: payments } = await supabaseAdmin
      .from('payments')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false })
      .limit(10);

    // Get user sites
    const { data: sites } = await supabaseAdmin
      .from('user_sites')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    return createResponse(200, {
      success: true,
      user: {
        id: user.id,
        email: user.email,
        name: profile?.name || user.user_metadata?.name,
        phone: profile?.phone,
        business_name: profile?.business_name,
        business_type: profile?.business_type,
        city: profile?.city,
      },
      subscription: subscription || null,
      payments: payments || [],
      sites: sites || [],
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    return createResponse(500, { error: 'Internal server error' });
  }
}

