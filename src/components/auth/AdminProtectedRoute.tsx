
import { useSecureAdmin } from '@/hooks/useSecureAdmin'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Lock } from 'lucide-react'

interface AdminProtectedRouteProps {
  children: React.ReactNode
}

export function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const { isAdmin, isValidating } = useSecureAdmin()

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

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-gray-900 to-red-900">
        <Card className="max-w-md w-full mx-4 bg-red-900/20 border-red-500/30">
          <CardHeader className="text-center">
            <CardTitle className="flex items-center justify-center gap-2 text-red-400">
              <Shield className="h-6 w-6" />
              Access Denied
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="flex justify-center">
              <Lock className="h-16 w-16 text-red-400" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-400 mb-2">Admin Access Required</h3>
              <p className="text-red-300 text-sm">
                This section is restricted to authorized administrators only. 
                System and background settings require maximum security clearance.
              </p>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-red-300 text-xs">
                🔒 Only verified admin users with proper credentials can access 
                system configuration and background management tools.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}
