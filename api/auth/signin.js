// POST /api/auth/signin
import { supabaseAdmin } from '../lib/supabase.js';
import { createResponse } from '../lib/auth.js';

export default async function handler(req) {
  if (req.method !== 'POST') {
    return createResponse(405, { error: 'Method not allowed' });
  }

  try {
    const { email, password } = JSON.parse(req.body);

    if (!email || !password) {
      return createResponse(400, { error: 'Email and password are required' });
    }

    // Sign in user
    const { data: authData, error: authError } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password,
    });

    if (authError || !authData.user) {
      return createResponse(401, { error: 'Invalid email or password' });
    }

    // Get user profile
    const { data: profile } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    // Return user data with session
    return createResponse(200, {
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email,
        name: profile?.name || authData.user.user_metadata?.name,
        phone: profile?.phone,
        business_name: profile?.business_name,
        business_type: profile?.business_type,
        city: profile?.city,
      },
      session: {
        access_token: authData.session.access_token,
        refresh_token: authData.session.refresh_token,
        expires_at: authData.session.expires_at,
      },
    });
  } catch (error) {
    console.error('Signin error:', error);
    return createResponse(500, { error: 'Internal server error' });
  }
}

