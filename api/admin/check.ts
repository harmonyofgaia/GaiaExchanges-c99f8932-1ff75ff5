import { VercelRequest, VercelResponse } from '@vercel/node';
import { withAdminOnly, extractUserContext } from '../../middleware/adminOnly';

async function handler(req: VercelRequest, res: VercelResponse): Promise<void> {
  if (req.method !== 'GET') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    // Get user context from middleware
    const user = (req as any).adminUser;
    
    res.status(200).json({
      message: 'Admin access verified',
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        twoFactorVerified: user.twoFactorVerified
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('Admin check error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}

// Export handler wrapped with admin middleware
export default withAdminOnly(handler);