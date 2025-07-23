import { VercelRequest, VercelResponse } from '@vercel/node';

// Admin user configuration
interface AdminConfig {
  adminEmails: string[];
  adminUserIds: string[];
  adminRoles: string[];
  requireTwoFactor: boolean;
}

// Default admin configuration - should be configured via environment variables
const DEFAULT_ADMIN_CONFIG: AdminConfig = {
  adminEmails: [],
  adminUserIds: [],
  adminRoles: ['admin', 'super_admin'],
  requireTwoFactor: true
};

// Get admin configuration from environment variables
function getAdminConfig(): AdminConfig {
  return {
    adminEmails: process.env.ADMIN_EMAILS?.split(',').map(email => email.trim()) || DEFAULT_ADMIN_CONFIG.adminEmails,
    adminUserIds: process.env.ADMIN_USER_IDS?.split(',').map(id => id.trim()) || DEFAULT_ADMIN_CONFIG.adminUserIds,
    adminRoles: process.env.ADMIN_ROLES?.split(',').map(role => role.trim()) || DEFAULT_ADMIN_CONFIG.adminRoles,
    requireTwoFactor: process.env.REQUIRE_TWO_FACTOR === 'true' || DEFAULT_ADMIN_CONFIG.requireTwoFactor
  };
}

// User context interface
interface UserContext {
  id?: string;
  email?: string;
  role?: string;
  isAuthenticated: boolean;
  twoFactorVerified?: boolean;
}

// Extract user context from request (implementation depends on authentication system)
async function extractUserContext(req: VercelRequest): Promise<UserContext> {
  try {
    // Get authorization header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return { isAuthenticated: false };
    }

    const token = authHeader.substring(7);
    
    // Validate token with Supabase (example implementation)
    if (process.env.VITE_SUPABASE_URL && process.env.VITE_SUPABASE_ANON_KEY) {
      const response = await fetch(`${process.env.VITE_SUPABASE_URL}/auth/v1/user`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'apikey': process.env.VITE_SUPABASE_ANON_KEY
        }
      });

      if (response.ok) {
        const userData = await response.json();
        return {
          id: userData.id,
          email: userData.email,
          role: userData.user_metadata?.role || userData.app_metadata?.role,
          isAuthenticated: true,
          twoFactorVerified: userData.user_metadata?.two_factor_verified || false
        };
      }
    }

    return { isAuthenticated: false };
  } catch (error) {
    console.error('Error extracting user context:', error);
    return { isAuthenticated: false };
  }
}

// Check if user is admin
function isAdmin(user: UserContext, config: AdminConfig): boolean {
  if (!user.isAuthenticated) {
    return false;
  }

  // Check by email
  if (user.email && config.adminEmails.includes(user.email)) {
    return true;
  }

  // Check by user ID
  if (user.id && config.adminUserIds.includes(user.id)) {
    return true;
  }

  // Check by role
  if (user.role && config.adminRoles.includes(user.role)) {
    return true;
  }

  return false;
}

// Check if two-factor authentication is satisfied
function isTwoFactorSatisfied(user: UserContext, config: AdminConfig): boolean {
  if (!config.requireTwoFactor) {
    return true;
  }

  return user.twoFactorVerified === true;
}

// Middleware function for API routes
export async function adminOnlyMiddleware(
  req: VercelRequest,
  res: VercelResponse,
  next?: () => void
): Promise<boolean> {
  try {
    const config = getAdminConfig();
    const user = await extractUserContext(req);

    // Check authentication
    if (!user.isAuthenticated) {
      res.status(401).json({ 
        error: 'Authentication required',
        code: 'UNAUTHORIZED'
      });
      return false;
    }

    // Check admin privileges
    if (!isAdmin(user, config)) {
      res.status(403).json({ 
        error: 'Admin privileges required',
        code: 'FORBIDDEN'
      });
      return false;
    }

    // Check two-factor authentication if required
    if (!isTwoFactorSatisfied(user, config)) {
      res.status(403).json({ 
        error: 'Two-factor authentication required',
        code: 'TWO_FACTOR_REQUIRED'
      });
      return false;
    }

    // Add user context to request for downstream handlers
    (req as any).adminUser = user;

    // Call next middleware if provided
    if (next) {
      next();
    }

    return true;
  } catch (error) {
    console.error('Admin middleware error:', error);
    res.status(500).json({ 
      error: 'Internal server error',
      code: 'INTERNAL_ERROR'
    });
    return false;
  }
}

// Higher-order function to wrap API handlers with admin middleware
export function withAdminOnly(handler: (req: VercelRequest, res: VercelResponse) => Promise<void>) {
  return async (req: VercelRequest, res: VercelResponse) => {
    const isAuthorized = await adminOnlyMiddleware(req, res);
    if (isAuthorized) {
      await handler(req, res);
    }
  };
}

// React hook for client-side admin checking
export function useAdminAuth() {
  // This would be used in React components to check admin status
  // Implementation would depend on your authentication context
  
  const checkAdminStatus = async (token: string): Promise<{ isAdmin: boolean; user?: UserContext }> => {
    try {
      const response = await fetch('/api/admin/check', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        return { isAdmin: true, user: data.user };
      } else {
        return { isAdmin: false };
      }
    } catch (error) {
      console.error('Admin status check failed:', error);
      return { isAdmin: false };
    }
  };

  return { checkAdminStatus };
}

// Export utilities
export { getAdminConfig, extractUserContext, isAdmin, isTwoFactorSatisfied };
export type { AdminConfig, UserContext };