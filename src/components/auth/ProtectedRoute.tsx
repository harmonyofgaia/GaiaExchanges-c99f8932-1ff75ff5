
import { useAuth } from './AuthProvider'
import { AuthPage } from './AuthPage'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth()

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

  if (!user) {
    return <AuthPage />
  }

  return <>{children}</>
}
