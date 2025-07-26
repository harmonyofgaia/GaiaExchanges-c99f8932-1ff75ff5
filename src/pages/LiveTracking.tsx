
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, AlertTriangle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export default function LiveTracking() {
  const navigate = useNavigate()

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="border-red-500/50 bg-gradient-to-r from-red-900/20 to-orange-900/20 mb-8">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-red-400 flex items-center justify-center gap-4">
            <AlertTriangle className="h-12 w-12" />
            🔒 RESTRICTED ACCESS
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Live tracking functionality has been moved to secure admin access only
          </p>
        </CardHeader>
        <CardContent className="text-center space-y-6">
          <div className="bg-red-900/30 border border-red-500/50 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-red-400 mb-4">
              🛰️ Admin-Only Feature
            </h3>
            <p className="text-lg text-muted-foreground mb-4">
              For security and privacy reasons, the live tracking system is now exclusively available 
              to authenticated administrators through the secure admin portal.
            </p>
            <p className="text-red-300">
              This change ensures proper access controls and protects user privacy.
            </p>
          </div>
          
          <Button 
            onClick={() => navigate('/secure-admin')}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
          >
            <Shield className="mr-2 h-5 w-5" />
            Access Secure Admin Portal
          </Button>
          
          <div className="text-sm text-muted-foreground">
            <p>If you are an administrator, please use the secure admin portal to access live tracking functionality.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
