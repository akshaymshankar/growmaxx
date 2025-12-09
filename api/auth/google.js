// GET /api/auth/google - Initiate Google OAuth
import { createResponse } from '../lib/auth.js';

export default async function handler(req) {
  if (req.method !== 'GET') {
    return createResponse(405, { error: 'Method not allowed' });
  }

  const redirectUrl = req.query.redirect_uri || 
    `${req.headers.origin || 'http://localhost:5174'}/api/auth/google/callback`;

  // Google OAuth URL
  const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${process.env.GOOGLE_CLIENT_ID || '842356384486-t9mhke9r4mvcvfo871udk6trp5r7coup.apps.googleusercontent.com'}&` +
    `redirect_uri=${encodeURIComponent(redirectUrl)}&` +
    `response_type=code&` +
    `scope=openid email profile&` +
    `access_type=offline&` +
    `prompt=consent`;

  return {
    statusCode: 302,
    headers: {
      Location: googleAuthUrl,
    },
  };
}

