
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Lock, AlertTriangle } from 'lucide-react'

export default function SecurityDashboard() {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
          Security Dashboard
        </h1>
        <p className="text-xl text-muted-foreground">
          Comprehensive security monitoring for Gaia Exchange
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card className="border-red-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-red-400" />
              Threat Detection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-400">All systems secure</p>
          </CardContent>
        </Card>

        <Card className="border-orange-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Lock className="h-5 w-5 text-orange-400" />
              Access Control
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-400">Authentication active</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
              Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-green-400">No active alerts</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
