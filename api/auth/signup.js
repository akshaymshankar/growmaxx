// POST /api/auth/signup
import { supabaseAdmin } from '../lib/supabase.js';
import { createResponse } from '../lib/auth.js';

export default async function handler(req) {
  if (req.method !== 'POST') {
    return createResponse(405, { error: 'Method not allowed' });
  }

  try {
    const { email, password, name, phone } = JSON.parse(req.body);

    if (!email || !password) {
      return createResponse(400, { error: 'Email and password are required' });
    }

    // Create user in Supabase Auth
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true, // Auto-confirm email for now
      user_metadata: {
        name: name || email.split('@')[0],
        phone: phone || null,
      },
    });

    if (authError) {
      return createResponse(400, { error: authError.message });
    }

    // Get user profile (created by trigger)
    const { data: profile } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    // Create session token
    const { data: sessionData, error: sessionError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email: email,
    });

    // Return user data (without password)
    return createResponse(201, {
      success: true,
      user: {
        id: authData.user.id,
        email: authData.user.email,
        name: profile?.name || name,
        phone: profile?.phone || phone,
      },
      message: 'Account created successfully',
    });
  } catch (error) {
    console.error('Signup error:', error);
    return createResponse(500, { error: 'Internal server error' });
  }
}

