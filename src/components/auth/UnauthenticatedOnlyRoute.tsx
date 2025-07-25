import { useAuth } from './AuthProvider'
import { Navigate } from 'react-router-dom'

interface UnauthenticatedOnlyRouteProps {
  children: React.ReactNode
}

export function UnauthenticatedOnlyRoute({ children }: UnauthenticatedOnlyRouteProps) {
  const { user, loading } = useAuth()

  // Show loading state while validating
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-green-900">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 bg-green-400 rounded-full animate-bounce"></div>
          </div>
          <p className="text-green-400 font-medium">Loading Gaia's Exchanges...</p>
          <p className="text-green-300 text-sm">Checking authentication status</p>
        </div>
      </div>
    )
  }

  // If user is authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" replace />
  }

  // If user is not authenticated, show the auth page
  return <>{children}</>
}