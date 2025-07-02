
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  DollarSign,
  Activity,
  Globe,
  Zap,
  Target
} from 'lucide-react'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'

interface AnalyticsData {
  totalUsers: number
  activeUsers: number
  totalTransactions: number
  totalVolume: number
  networkHealth: number
  globalReach: number
}

export default function Analytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalUsers: 28475,
    activeUsers: 8934,
    totalTransactions: 1247856,
    totalVolume: 5847352.67,
    networkHealth: 99.7,
    globalReach: 847
  })

  useEffect(() => {
    // Simulate real-time analytics updates
    const interval = setInterval(() => {
      setAnalytics(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10 - 5),
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 50),
        totalVolume: prev.totalVolume + Math.random() * 1000,
        networkHealth: Math.min(100, prev.networkHealth + (Math.random() - 0.5))
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20 p-6">
      <div className="container mx-auto max-w-7xl space-y-6">
        <div className="flex items-center justify-center mb-8">
          <UniversalGaiaLogo 
            size="lg" 
            animated={true}
            showText={true}
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              📊 ADVANCED ANALYTICS DASHBOARD
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Real-Time Network Intelligence • Global Performance Metrics • Predictive Analytics
            </p>
          </CardHeader>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">{analytics.totalUsers.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Users</div>
              <Badge className="mt-2 bg-green-600 animate-pulse">GROWING</Badge>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardContent className="p-6 text-center">
              <Activity className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">{analytics.activeUsers.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
              <Badge className="mt-2 bg-blue-600">24H ACTIVE</Badge>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardContent className="p-6 text-center">
              <BarChart3 className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">{analytics.totalTransactions.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Transactions</div>
              <Badge className="mt-2 bg-purple-600">PROCESSING</Badge>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-yellow-900/20">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-yellow-400">${analytics.totalVolume.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Volume</div>
              <Badge className="mt-2 bg-yellow-600">GAiA TOKEN</Badge>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Network Performance */}
          <Card className="border-cyan-500/30 bg-cyan-900/20">
            <CardHeader>
              <CardTitle className="text-cyan-400">⚡ Network Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white">Network Health</span>
                  <span className="text-green-400">{analytics.networkHealth.toFixed(1)}%</span>
                </div>
                <Progress value={analytics.networkHealth} className="h-3" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white">Transaction Throughput</span>
                  <span className="text-blue-400">5,847 TPS</span>
                </div>
                <Progress value={85} className="h-3" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white">System Uptime</span>
                  <span className="text-purple-400">99.97%</span>
                </div>
                <Progress value={99.97} className="h-3" />
              </div>

              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-white">Security Level</span>
                  <span className="text-yellow-400">Quantum Protected</span>
                </div>
                <Progress value={100} className="h-3" />
              </div>
            </CardContent>
          </Card>

          {/* Global Analytics */}
          <Card className="border-orange-500/30 bg-orange-900/20">
            <CardHeader>
              <CardTitle className="text-orange-400">🌍 Global Reach</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-900/20 rounded-lg">
                  <Globe className="h-6 w-6 mx-auto text-green-400 mb-1" />
                  <div className="text-lg font-bold text-green-400">{analytics.globalReach}</div>
                  <div className="text-xs text-muted-foreground">Countries</div>
                </div>
                <div className="text-center p-3 bg-blue-900/20 rounded-lg">
                  <Target className="h-6 w-6 mx-auto text-blue-400 mb-1" />
                  <div className="text-lg font-bold text-blue-400">24/7</div>
                  <div className="text-xs text-muted-foreground">Monitoring</div>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-bold text-orange-400">🌎 Regional Distribution</h4>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>🌍 Europe</span>
                    <span className="text-green-400">34%</span>
                  </div>
                  <Progress value={34} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span>🌏 Asia</span>
                    <span className="text-blue-400">28%</span>
                  </div>
                  <Progress value={28} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span>🌎 Americas</span>
                    <span className="text-purple-400">25%</span>
                  </div>
                  <Progress value={25} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span>🌍 Africa & Others</span>
                    <span className="text-yellow-400">13%</span>
                  </div>
                  <Progress value={13} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Environmental Impact Analytics */}
        <Card className="border-green-500/30 bg-green-900/20">
          <CardHeader>
            <CardTitle className="text-green-400">🌱 Environmental Impact Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-green-900/30 rounded-lg">
                <div className="text-2xl font-bold text-green-400">14,567</div>
                <div className="text-sm text-muted-foreground">Trees Funded</div>
              </div>
              <div className="text-center p-4 bg-blue-900/30 rounded-lg">
                <div className="text-2xl font-bold text-blue-400">-2,847</div>
                <div className="text-sm text-muted-foreground">Tons CO₂ Offset</div>
              </div>
              <div className="text-center p-4 bg-purple-900/30 rounded-lg">
                <div className="text-2xl font-bold text-purple-400">89,234</div>
                <div className="text-sm text-muted-foreground">Animals Protected</div>
              </div>
              <div className="text-center p-4 bg-yellow-900/30 rounded-lg">
                <div className="text-2xl font-bold text-yellow-400">100%</div>
                <div className="text-sm text-muted-foreground">Renewable Energy</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Real-Time Data Feed */}
        <Card className="border-red-500/30 bg-red-900/20">
          <CardHeader>
            <CardTitle className="text-red-400">🔴 Live Data Feed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-64 overflow-y-auto">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="flex justify-between items-center p-2 bg-gray-900/30 rounded border border-gray-500/30">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-400">
                      {['Transaction', 'User Registration', 'NFT Mint', 'Token Swap'][Math.floor(Math.random() * 4)]}
                    </span>
                  </div>
                  <Badge className="bg-blue-600 text-xs">Just now</Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
