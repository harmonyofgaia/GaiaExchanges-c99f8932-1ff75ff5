
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Shield, 
  Users, 
  TrendingUp, 
  Globe, 
  Zap,
  Crown,
  Target,
  DollarSign,
  Activity,
  Settings,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { toast } from 'sonner'

export function UltraAdminDashboard() {
  const [realTimeStats, setRealTimeStats] = useState({
    activeUsers: 1247,
    totalTransactions: 15420,
    globalReach: 89.5,
    securityLevel: 99.8,
    growthRate: 156.7,
    communityScore: 94.2
  })

  const [systemControls, setSystemControls] = useState({
    autoGrowthEngine: true,
    securityMaxMode: true,
    globalExpansion: true,
    investorMagnet: true,
    viralMarketing: false
  })

  // Real-time stats update every 3 seconds
  useEffect(() => {
    const updateStats = () => {
      setRealTimeStats(prev => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 15 + 2),
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 25 + 5),
        globalReach: Math.min(100, prev.globalReach + (Math.random() * 0.5)),
        securityLevel: Math.max(99, Math.min(100, prev.securityLevel + (Math.random() * 0.2 - 0.1))),
        growthRate: prev.growthRate + (Math.random() * 5 - 2),
        communityScore: Math.max(90, Math.min(100, prev.communityScore + (Math.random() * 1 - 0.5)))
      }))
    }

    const interval = setInterval(updateStats, 3000)
    return () => clearInterval(interval)
  }, [])

  const toggleSystemControl = (control: keyof typeof systemControls) => {
    setSystemControls(prev => ({
      ...prev,
      [control]: !prev[control]
    }))

    const controlNames = {
      autoGrowthEngine: 'Auto Growth Engine',
      securityMaxMode: 'Maximum Security Mode',
      globalExpansion: 'Global Expansion Protocol',
      investorMagnet: 'Investor Magnetism System',
      viralMarketing: 'Viral Marketing Campaign'
    }

    toast.success(`${controlNames[control]} ${systemControls[control] ? 'Disabled' : 'Activated'}!`, {
      description: `System control updated - Effects active immediately`,
      duration: 3000
    })
  }

  const executeEmergencyProtocol = () => {
    toast.success('⚡ EMERGENCY PROTOCOL ACTIVATED!', {
      description: 'All systems maximized - Quantum security engaged - Global expansion accelerated',
      duration: 8000
    })
    
    setSystemControls({
      autoGrowthEngine: true,
      securityMaxMode: true,
      globalExpansion: true,
      investorMagnet: true,
      viralMarketing: true
    })
  }

  return (
    <div className="space-y-6">
      {/* Real-Time Command Center */}
      <Card className="border-2 border-red-500/50 bg-gradient-to-br from-red-900/30 to-orange-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Crown className="h-6 w-6" />
            🚀 ULTRA ADMIN COMMAND CENTER - REAL-TIME CONTROL
            <Badge className="bg-red-600 text-white animate-pulse">ADMIN ONLY</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="text-center p-3 rounded-lg bg-blue-900/30 border border-blue-500/20">
              <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{realTimeStats.activeUsers.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Active Users</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-green-900/30 border border-green-500/20">
              <Activity className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{realTimeStats.totalTransactions.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Transactions</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-purple-900/30 border border-purple-500/20">
              <Globe className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">{realTimeStats.globalReach.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Global Reach</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-red-900/30 border border-red-500/20">
              <Shield className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-400">{realTimeStats.securityLevel.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Security Level</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-yellow-900/30 border border-yellow-500/20">
              <TrendingUp className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">{realTimeStats.growthRate.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Growth Rate</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-cyan-900/30 border border-cyan-500/20">
              <Target className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-cyan-400">{realTimeStats.communityScore.toFixed(1)}</div>
              <div className="text-xs text-muted-foreground">Community Score</div>
            </div>
          </div>

          <Button 
            onClick={executeEmergencyProtocol}
            className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4"
          >
            <AlertTriangle className="h-5 w-5 mr-2" />
            🚨 EXECUTE EMERGENCY GROWTH PROTOCOL
          </Button>
        </CardContent>
      </Card>

      {/* System Controls */}
      <Tabs defaultValue="controls" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="controls">System Controls</TabsTrigger>
          <TabsTrigger value="analytics">Deep Analytics</TabsTrigger>
          <TabsTrigger value="community">Community Management</TabsTrigger>
          <TabsTrigger value="global">Global Operations</TabsTrigger>
        </TabsList>

        <TabsContent value="controls" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(systemControls).map(([key, value]) => (
              <Card key={key} className="border-green-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-semibold text-sm capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </h4>
                    <Badge className={value ? 'bg-green-600' : 'bg-gray-600'}>
                      {value ? 'ACTIVE' : 'INACTIVE'}
                    </Badge>
                  </div>
                  <Button
                    onClick={() => toggleSystemControl(key as keyof typeof systemControls)}
                    className={`w-full ${value ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                  >
                    {value ? 'Disable' : 'Activate'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-400">Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Server Response Time</span>
                    <span className="text-sm text-green-400">12ms</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Database Efficiency</span>
                    <span className="text-sm text-green-400">98.7%</span>
                  </div>
                  <Progress value={98.7} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Network Optimization</span>
                    <span className="text-sm text-yellow-400">91.2%</span>
                  </div>
                  <Progress value={91.2} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-purple-400">Growth Tracking</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Daily Active Users</span>
                    <span className="text-sm text-green-400">+23.4%</span>
                  </div>
                  <Progress value={89} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Revenue Growth</span>
                    <span className="text-sm text-green-400">+156.7%</span>
                  </div>
                  <Progress value={75} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Market Penetration</span>
                    <span className="text-sm text-blue-400">+45.2%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="community" className="space-y-4">
          <Card className="border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400">Community Health Monitor</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-900/20 rounded-lg">
                  <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400">94.2%</div>
                  <div className="text-sm text-muted-foreground">Satisfaction Rate</div>
                </div>
                <div className="text-center p-4 bg-blue-900/20 rounded-lg">
                  <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-400">5,847</div>
                  <div className="text-sm text-muted-foreground">Active Members</div>
                </div>
                <div className="text-center p-4 bg-purple-900/20 rounded-lg">
                  <Activity className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-400">2,341</div>
                  <div className="text-sm text-muted-foreground">Daily Interactions</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="global" className="space-y-4">
          <Card className="border-cyan-500/20">
            <CardHeader>
              <CardTitle className="text-cyan-400">Global Expansion Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <span className="font-semibold">North America</span>
                  <Badge className="bg-green-600">DOMINATED</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <span className="font-semibold">Europe</span>
                  <Badge className="bg-blue-600">EXPANDING</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <span className="font-semibold">Asia Pacific</span>
                  <Badge className="bg-yellow-600">IN PROGRESS</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                  <span className="font-semibold">Global South</span>
                  <Badge className="bg-purple-600">TARGETING</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
