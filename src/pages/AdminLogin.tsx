
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, ArrowRight } from 'lucide-react'

export default function AdminLogin() {
  useEffect(() => {
    // Log the migration for analytics
    console.log('AdminLogin: Redirecting to /secure-admin (migration complete)')
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-green-900/20 flex items-center justify-center p-6">
      <div className="max-w-md mx-auto">
        <Card className="border-2 border-blue-500/50 bg-gradient-to-br from-blue-900/30 to-black/80 backdrop-blur-sm mb-4">
          <CardHeader>
            <div className="text-center">
              <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold text-blue-400">
                🔄 ADMIN LOGIN MIGRATED
              </CardTitle>
              <p className="text-blue-300 text-sm mt-2">
                Admin login functionality has been moved to the secure admin portal
              </p>
            </div>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="p-4 bg-gradient-to-r from-blue-900/30 to-green-900/30 border border-blue-500/20 rounded-lg">
              <h3 className="text-lg font-bold text-blue-400 mb-2">✅ Migration Complete</h3>
              <p className="text-blue-300 text-sm mb-4">
                All admin authentication features are now integrated under <strong>/secure-admin</strong> with enhanced security.
              </p>
              <div className="text-xs text-gray-400 space-y-1 mb-4">
                <div>• IP exclusivity protection maintained</div>
                <div>• 2-minute session timeout (adjustable)</div>
                <div>• Enhanced authentication flow</div>
                <div>• All original features preserved</div>
              </div>
              <Badge variant="outline" className="border-green-500/50 text-green-400">
                <ArrowRight className="h-3 w-3 mr-1" />
                Redirecting to /secure-admin
              </Badge>
            </div>
          </CardContent>
        </Card>
        <Navigate to="/secure-admin" replace />
      </div>
    </div>
  )
}
