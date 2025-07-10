
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Settings, Users, DollarSign, Activity, Satellite, Lock } from 'lucide-react'
import { EnhancedLiveTracking } from './EnhancedLiveTracking'
import { BIOSProtection } from '@/components/security/BIOSProtection'

export function AdminDashboardTabs() {
  return (
    <Tabs defaultValue="overview" className="w-full">
      <TabsList className="grid w-full grid-cols-7">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="tracking">Live Tracking</TabsTrigger>
        <TabsTrigger value="users">Users</TabsTrigger>
        <TabsTrigger value="trading">Trading</TabsTrigger>
        <TabsTrigger value="bios">BIOS Protection</TabsTrigger>
        <TabsTrigger value="settings">Settings</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-green-300">Total Users</p>
                  <p className="text-2xl font-bold text-green-400">12,450</p>
                </div>
                <Users className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-blue-300">Active Trades</p>
                  <p className="text-2xl font-bold text-blue-400">847</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-purple-300">System Status</p>
                  <p className="text-2xl font-bold text-purple-400">100%</p>
                </div>
                <Activity className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-red-500/30 bg-red-900/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-red-300">Security Level</p>
                  <p className="text-2xl font-bold text-red-400">MAX</p>
                </div>
                <Shield className="h-8 w-8 text-red-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-yellow-500/30 bg-yellow-900/20">
          <CardHeader>
            <CardTitle className="text-yellow-400">👑 ADMIN CONTROL STATUS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-yellow-300">Platform Control:</span>
                  <Badge className="bg-green-600">FULL ACCESS</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-300">Live Tracking:</span>
                  <Badge className="bg-purple-600">OMNISCIENT</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-300">BIOS Protection:</span>
                  <Badge className="bg-red-600">MAXIMUM</Badge>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-yellow-300">User Management:</span>
                  <Badge className="bg-blue-600">UNLIMITED</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-300">Transaction Control:</span>
                  <Badge className="bg-green-600">REVERSAL RIGHTS</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-yellow-300">Security Override:</span>
                  <Badge className="bg-purple-600">GOD MODE</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="security">
        <Card className="border-red-500/30 bg-red-900/20">
          <CardHeader>
            <CardTitle className="text-red-400 flex items-center gap-2">
              <Shield className="h-6 w-6" />
              🛡️ SECURITY CONTROL CENTER
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                <h4 className="font-bold text-red-400 mb-2">🔒 QUANTUM SECURITY ACTIVE</h4>
                <div className="text-sm text-red-300">
                  • Military-grade encryption protocols
                  • Real-time threat detection and response
                  • Automatic intrusion prevention system
                  • Zero-trust architecture implementation
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="tracking">
        <EnhancedLiveTracking />
      </TabsContent>

      <TabsContent value="users">
        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2">
              <Users className="h-6 w-6" />
              👥 USER MANAGEMENT
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                <h4 className="font-bold text-blue-400 mb-2">📊 User Statistics</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-blue-300">Total Users:</span>
                    <span className="text-blue-400 font-bold ml-2">12,450</span>
                  </div>
                  <div>
                    <span className="text-blue-300">Active Now:</span>
                    <span className="text-green-400 font-bold ml-2">2,847</span>
                  </div>
                  <div>
                    <span className="text-blue-300">New Today:</span>
                    <span className="text-purple-400 font-bold ml-2">234</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="trading">
        <Card className="border-green-500/30 bg-green-900/20">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <DollarSign className="h-6 w-6" />
              💰 TRADING CONTROL
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h4 className="font-bold text-green-400 mb-2">📈 Trading Overview</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-green-300">Active Trades:</span>
                    <span className="text-green-400 font-bold ml-2">847</span>
                  </div>
                  <div>
                    <span className="text-green-300">24h Volume:</span>
                    <span className="text-blue-400 font-bold ml-2">$8.75M</span>
                  </div>
                  <div>
                    <span className="text-green-300">Reversal Rights:</span>
                    <span className="text-yellow-400 font-bold ml-2">14 DAYS</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>

      <TabsContent value="bios">
        <BIOSProtection />
      </TabsContent>

      <TabsContent value="settings">
        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center gap-2">
              <Settings className="h-6 w-6" />
              ⚙️ ADMIN SETTINGS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                <h4 className="font-bold text-purple-400 mb-2">🔧 System Configuration</h4>
                <div className="text-sm text-purple-300">
                  • Platform-wide settings control
                  • Security protocol management
                  • User access level configuration
                  • Emergency shutdown controls
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
