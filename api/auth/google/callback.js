// GET /api/auth/google/callback - Handle Google OAuth callback
import { supabaseAdmin } from '../../lib/supabase.js';
import { createResponse } from '../../lib/auth.js';

export default async function handler(req) {
  if (req.method !== 'GET') {
    return createResponse(405, { error: 'Method not allowed' });
  }

  try {
    const { code } = req.query;

    if (!code) {
      return {
        statusCode: 302,
        headers: {
          Location: `${req.headers.origin || 'http://localhost:5174'}/signin?error=no_code`,
        },
      };
    }

    // Exchange code for tokens
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        code,
        client_id: process.env.GOOGLE_CLIENT_ID,
        client_secret: process.env.GOOGLE_CLIENT_SECRET,
        redirect_uri: `${req.headers.origin || 'http://localhost:5174'}/api/auth/google/callback`,
        grant_type: 'authorization_code',
      }),
    });

    const tokens = await tokenResponse.json();

    if (!tokens.access_token) {
      return {
        statusCode: 302,
        headers: {
          Location: `${req.headers.origin || 'http://localhost:5174'}/signin?error=auth_failed`,
        },
      };
    }

    // Get user info from Google
    const userResponse = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: { Authorization: `Bearer ${tokens.access_token}` },
    });
    const googleUser = await userResponse.json();

    // Sign in or sign up with Supabase
    const { data: authData, error: authError } = await supabaseAdmin.auth.signInWithIdToken({
      provider: 'google',
      token: tokens.id_token || tokens.access_token,
      access_token: tokens.access_token,
    });

    // If user doesn't exist, create them
    if (authError && authError.message.includes('User not found')) {
      const { data: newUser, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email: googleUser.email,
        email_confirm: true,
        user_metadata: {
          name: googleUser.name,
          avatar_url: googleUser.picture,
          provider: 'google',
        },
      });

      if (createError) {
        return {
          statusCode: 302,
          headers: {
            Location: `${req.headers.origin || 'http://localhost:5174'}/signin?error=create_failed`,
          },
        };
      }

      // Redirect with session
      const sessionToken = Buffer.from(JSON.stringify({
        user: newUser.user,
        access_token: tokens.access_token,
      })).toString('base64');

      return {
        statusCode: 302,
        headers: {
          Location: `${req.headers.origin || 'http://localhost:5174'}/auth/callback?token=${sessionToken}`,
        },
      };
    }

    // Get user profile
    const { data: profile } = await supabaseAdmin
      .from('user_profiles')
      .select('*')
      .eq('id', authData.user.id)
      .single();

    // Create session token
    const sessionToken = Buffer.from(JSON.stringify({
      user: authData.user,
      session: authData.session,
      profile,
    })).toString('base64');

    // Redirect to frontend with token
    return {
      statusCode: 302,
      headers: {
        Location: `${req.headers.origin || 'http://localhost:5174'}/auth/callback?token=${sessionToken}`,
      },
    };
  } catch (error) {
    console.error('Google callback error:', error);
    return {
      statusCode: 302,
      headers: {
        Location: `${req.headers.origin || 'http://localhost:5174'}/signin?error=server_error`,
      },
    };
  }
}

