
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AdminMediaLibrary } from './AdminMediaLibrary'
import { MarketingTokenSuite } from './MarketingTokenSuite'
import { RealTimeAdminMetrics } from './RealTimeAdminMetrics'
import { 
  Upload, 
  TrendingUp, 
  Activity, 
  Shield, 
  Zap, 
  Globe,
  Settings,
  Database,
  Lock,
  Eye
} from 'lucide-react'

export function EnhancedAdminMenu() {
  return (
    <div className="space-y-6">
      {/* Admin Status Banner */}
      <Card className="border-red-500/50 bg-gradient-to-r from-red-900/30 to-orange-900/30">
        <CardContent className="pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-600/20 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-red-400" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-red-400">🛡️ ADMIN CONTROL ACTIVE</h2>
                <p className="text-red-300 text-sm">Full administrative privileges enabled</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-green-600 text-white animate-pulse">
                <Activity className="h-3 w-3 mr-1" />
                LIVE MONITORING
              </Badge>
              <Badge className="bg-red-600 text-white">
                <Lock className="h-3 w-3 mr-1" />
                SECURE ACCESS
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real-time Metrics Dashboard */}
      <RealTimeAdminMetrics />

      {/* Media Library */}
      <AdminMediaLibrary />

      {/* Marketing & Token Integration */}
      <MarketingTokenSuite />

      {/* Quick Admin Actions */}
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Zap className="h-5 w-5" />
            ⚡ QUICK ADMIN ACTIONS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="bg-green-600 hover:bg-green-700 h-16 flex-col">
              <Database className="h-5 w-5 mb-1" />
              <span className="text-xs">System Backup</span>
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 h-16 flex-col">
              <Shield className="h-5 w-5 mb-1" />
              <span className="text-xs">Security Scan</span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 h-16 flex-col">
              <Zap className="h-5 w-5 mb-1" />
              <span className="text-xs">Performance Boost</span>
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 h-16 flex-col">
              <Settings className="h-5 w-5 mb-1" />
              <span className="text-xs">System Config</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* System Status Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-500/30 bg-green-900/10">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="w-8 h-8 bg-green-600/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Globe className="h-4 w-4 text-green-400" />
              </div>
              <div className="text-2xl font-bold text-green-400">100%</div>
              <div className="text-sm text-gray-400">Global Network</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-blue-900/10">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="w-8 h-8 bg-blue-600/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Activity className="h-4 w-4 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-blue-400">24/7</div>
              <div className="text-sm text-gray-400">Monitoring</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-purple-900/10">
          <CardContent className="pt-4">
            <div className="text-center">
              <div className="w-8 h-8 bg-purple-600/20 rounded-full mx-auto mb-2 flex items-center justify-center">
                <Eye className="h-4 w-4 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-purple-400">∞</div>
              <div className="text-sm text-gray-400">Security Layers</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
