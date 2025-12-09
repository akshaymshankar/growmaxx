// GET /api/auth/me - Get current user
import { getUserFromToken, getUserProfile, createResponse } from '../lib/auth.js';

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

    const profile = await getUserProfile(user.id);

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
    });
  } catch (error) {
    console.error('Get user error:', error);
    return createResponse(500, { error: 'Internal server error' });
  }
}

