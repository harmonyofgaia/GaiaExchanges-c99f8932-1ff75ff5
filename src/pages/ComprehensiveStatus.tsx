
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { BarChart3, Activity, Shield, Globe } from 'lucide-react'

const ComprehensiveStatus = () => {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
      <div className="container mx-auto max-w-6xl">
        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400 text-3xl">
              <BarChart3 className="h-8 w-8" />
              📊 Comprehensive System Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-blue-400">System Health</h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">CPU Usage</span>
                      <span className="text-sm text-green-400">15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Memory Usage</span>
                      <span className="text-sm text-blue-400">32%</span>
                    </div>
                    <Progress value={32} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Storage Usage</span>
                      <span className="text-sm text-purple-400">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-green-400">Service Status</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span>Web Server</span>
                    <Badge className="bg-green-600">✅ Online</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Database</span>
                    <Badge className="bg-green-600">✅ Online</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>API Gateway</span>
                    <Badge className="bg-green-600">✅ Online</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Quantum Security</span>
                    <Badge className="bg-green-600">✅ Active</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ComprehensiveStatus
