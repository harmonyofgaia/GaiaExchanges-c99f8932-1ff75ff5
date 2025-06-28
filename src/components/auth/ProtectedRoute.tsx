
import { useAuth } from './AuthProvider'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'
import { AuthPage } from './AuthPage'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()
  const { isAdmin } = useSecureAdmin()

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
