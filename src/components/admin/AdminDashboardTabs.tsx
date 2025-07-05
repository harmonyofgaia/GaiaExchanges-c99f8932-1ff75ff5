import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { SearchAndTrack } from '@/components/search/SearchAndTrack'
import { SecureVaultSystem } from '@/components/SecureVaultSystem'
import { GoogleAuthEnhanced } from '@/components/google/GoogleAuthEnhanced'
import { InvisibleAttachmentSystem } from '@/components/security/InvisibleAttachmentSystem'
import { 
  BarChart3, 
  Settings, 
  Users, 
  Activity,
  Shield,
  Database,
  Server,
  Network,
  Zap,
  Eye,
  Lock
} from 'lucide-react'

export function AdminDashboardTabs() {
  return (
    <>
      <InvisibleAttachmentSystem />
      <Tabs defaultValue="search" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-card/50">
          <TabsTrigger value="search">Search & Track</TabsTrigger>
          <TabsTrigger value="vault">Vault System</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="search" className="space-y-4">
          <SearchAndTrack />
        </TabsContent>

        <TabsContent value="vault" className="space-y-4">
          <SecureVaultSystem />
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <BarChart3 className="h-5 w-5" />
                  System Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">99.8%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">2,847</div>
                    <div className="text-sm text-muted-foreground">Active Users</div>
                  </div>
                </div>
                <Progress value={98} className="h-2" />
                <div className="text-xs text-center text-muted-foreground">
                  System performance optimal
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Activity className="h-5 w-5" />
                  Real-time Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">CPU Usage</span>
                    <span className="text-sm text-green-400">23%</span>
                  </div>
                  <Progress value={23} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Memory</span>
                    <span className="text-sm text-yellow-400">45%</span>
                  </div>
                  <Progress value={45} className="h-2" />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm">Network</span>
                    <span className="text-sm text-blue-400">12%</span>
                  </div>
                  <Progress value={12} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Users className="h-5 w-5" />
                  User Activity
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">1,247</div>
                    <div className="text-sm text-muted-foreground">Online Now</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">8,439</div>
                    <div className="text-sm text-muted-foreground">Today</div>
                  </div>
                </div>
                <Badge className="w-full justify-center bg-green-600">
                  Peak Activity: 15:30 UTC
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-orange-500/30 bg-orange-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Shield className="h-5 w-5" />
                  Security Events
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-green-900/20 rounded">
                    <span className="text-sm">Login Success</span>
                    <Badge className="bg-green-600">2,847</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-red-900/20 rounded">
                    <span className="text-sm">Blocked Attempts</span>
                    <Badge className="bg-red-600">23</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-900/20 rounded">
                    <span className="text-sm">2FA Verifications</span>
                    <Badge className="bg-blue-600">1,456</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <GoogleAuthEnhanced />
            
            <Card className="border-red-500/30 bg-red-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-400">
                  <Settings className="h-5 w-5" />
                  System Configuration
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-2">
                  <Button className="bg-green-600 hover:bg-green-700" size="sm">
                    <Database className="h-4 w-4 mr-2" />
                    Backup DB
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700" size="sm">
                    <Server className="h-4 w-4 mr-2" />
                    Restart Server
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700" size="sm">
                    <Network className="h-4 w-4 mr-2" />
                    Network Test
                  </Button>
                  <Button className="bg-orange-600 hover:bg-orange-700" size="sm">
                    <Zap className="h-4 w-4 mr-2" />
                    Performance
                  </Button>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Auto-cleanup</span>
                    <Badge className="bg-green-600">ACTIVE</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Trace Eraser</span>
                    <Badge className="bg-green-600">RUNNING</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Wall of Defense</span>
                    <Badge className="bg-red-600">MAXIMUM</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-yellow-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <Eye className="h-5 w-5" />
                  Monitoring Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Real-time Alerts</span>
                    <Badge className="bg-green-600">ON</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Security Scanning</span>
                    <Badge className="bg-green-600">ACTIVE</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Performance Monitor</span>
                    <Badge className="bg-green-600">ENABLED</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Threat Detection</span>
                    <Badge className="bg-red-600">MAXIMUM</Badge>
                  </div>
                </div>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                  <Lock className="h-4 w-4 mr-2" />
                  Update Security Settings
                </Button>
              </CardContent>
            </Card>

            <Card className="border-cyan-500/30 bg-cyan-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <Shield className="h-5 w-5" />
                  Advanced Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center space-y-2">
                  <div className="text-2xl font-bold text-cyan-400">QUANTUM</div>
                  <div className="text-sm text-muted-foreground">Protection Level</div>
                  <Progress value={100} className="h-3" />
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="text-center p-2 bg-green-900/20 rounded">
                    <div className="text-green-400 font-bold">ACTIVE</div>
                    <div>Firewall</div>
                  </div>
                  <div className="text-center p-2 bg-blue-900/20 rounded">
                    <div className="text-blue-400 font-bold">ONLINE</div>
                    <div>Encryption</div>
                  </div>
                  <div className="text-center p-2 bg-purple-900/20 rounded">
                    <div className="text-purple-400 font-bold">SECURED</div>
                    <div>Quantum</div>
                  </div>
                  <div className="text-center p-2 bg-red-900/20 rounded">
                    <div className="text-red-400 font-bold">MAX</div>
                    <div>Defense</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </>
  )
}
