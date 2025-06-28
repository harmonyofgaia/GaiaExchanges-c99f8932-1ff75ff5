
import { useAuth } from './AuthProvider'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'
import { AuthPage } from './AuthPage'

interface ProtectedRouteProps {
  children: React.ReactNode
  isAdminRoute?: boolean
}

export function ProtectedRoute({ children, isAdminRoute = false }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const { isAdmin, isValidating } = useSecureAdmin()

  // For admin routes, bypass regular auth completely
  if (isAdminRoute) {
    if (isValidating) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-center space-y-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto animate-bounce"></div>
            <p className="text-muted-foreground">Validating Admin Access...</p>
          </div>
        </div>
      )
    }
    
    // For admin routes, always render children (SecureAdminLogin will handle auth)
    return <>{children}</>
  }

  // Regular auth flow for non-admin routes
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center space-y-4">
          <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto animate-bounce"></div>
          <p className="text-muted-foreground">Loading Gaia's Exchanges...</p>
        </div>
      </div>
    )
  }

  // Allow access if user is admin (bypasses normal auth)
  if (isAdmin) {
    return <>{children}</>
  }

  // Normal auth check for regular users
  if (!user) {
    return <AuthPage />
  }

  return <>{children}</>
}
