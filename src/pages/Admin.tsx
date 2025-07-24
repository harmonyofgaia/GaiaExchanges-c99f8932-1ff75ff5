
import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, ArrowRight } from 'lucide-react'

export default function Admin() {
  const [redirectToSecure, setRedirectToSecure] = useState(false)

  if (redirectToSecure) {
    return <Navigate to="/secure-admin" replace />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-green-900/20 flex items-center justify-center p-6">
      <Card className="max-w-md mx-auto border-2 border-blue-500/50 bg-gradient-to-br from-blue-900/30 to-black/80 backdrop-blur-sm">
        <CardHeader>
          <div className="text-center">
            <Shield className="h-12 w-12 text-blue-400 mx-auto mb-4" />
            <CardTitle className="text-2xl font-bold text-blue-400">
              🔄 ADMIN ACCESS REDIRECT
            </CardTitle>
            <p className="text-blue-300 text-sm mt-2">
              Admin features moved to secure portal for enhanced protection
            </p>
          </div>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="p-4 bg-gradient-to-r from-blue-900/30 to-green-900/30 border border-blue-500/20 rounded-lg">
            <h3 className="text-lg font-bold text-blue-400 mb-2">🛡️ V4 Security Enhancement</h3>
            <p className="text-blue-300 text-sm mb-4">
              All admin features, controls, and dashboards are now integrated under <strong>/secure-admin</strong> for maximum protection.
            </p>
            <div className="text-xs text-gray-400 space-y-1 mb-4">
              <div>• Enhanced quantum-level security protocols</div>
              <div>• Unified admin dashboard with all features</div>
              <div>• Complete system control and monitoring</div>
              <div>• Emergency protocols and recovery systems</div>
            </div>
          </div>

          <Button 
            onClick={() => setRedirectToSecure(true)}
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-3"
          >
            <ArrowRight className="h-5 w-5 mr-2" />
            ACCESS SECURE ADMIN PORTAL
          </Button>

          <div className="mt-4 p-3 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-lg">
            <p className="text-xs text-green-300 text-center">
              🌍 Master Plan V4: All administrative operations secured under unified portal
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
