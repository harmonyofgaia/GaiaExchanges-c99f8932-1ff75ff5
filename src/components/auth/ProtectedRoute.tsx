
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

  // For admin routes, use enhanced validation
  if (isAdminRoute) {
    if (isValidating) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-green-900">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 bg-green-400 rounded-full animate-bounce"></div>
            </div>
            <p className="text-green-400 font-medium">Validating Admin Access...</p>
            <p className="text-green-300 text-sm">Maximum security verification in progress</p>
          </div>
        </div>
      )
    }
    
    // Admin routes always render children (SecureAdminLogin handles authentication)
    return <>{children}</>
  }

  // Regular auth flow for non-admin routes
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-blue-50">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 bg-green-400 rounded-full animate-bounce"></div>
          </div>
          <p className="text-green-600 font-medium">Loading Harmony of Gaia...</p>
          <p className="text-green-500 text-sm">Connecting to secure servers</p>
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
