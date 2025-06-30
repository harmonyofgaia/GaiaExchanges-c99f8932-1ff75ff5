
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { CheckCircle, AlertTriangle, Server, Database } from 'lucide-react'

const SystemStatus = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          🛡️ System Status
        </h1>
        <p className="text-xl text-muted-foreground mt-4">
          Real-time system health monitoring • All systems operational
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-green-500/30 bg-green-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Server className="h-5 w-5" />
              Server Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span>Main Server</span>
              <Badge className="bg-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Online
              </Badge>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span>API Gateway</span>
              <Badge className="bg-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Operational
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>CDN Network</span>
              <Badge className="bg-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Active
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Database className="h-5 w-5" />
              Database Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span>Primary Database</span>
              <Badge className="bg-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Connected
              </Badge>
            </div>
            <div className="flex items-center justify-between mb-4">
              <span>Backup Systems</span>
              <Badge className="bg-green-600">
                <CheckCircle className="h-3 w-3 mr-1" />
                Ready
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <span>Cache Layer</span>
              <Badge className="bg-yellow-600">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Optimizing
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SystemStatus
