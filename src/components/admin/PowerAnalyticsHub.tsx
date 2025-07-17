
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  BarChart3, 
  PieChart, 
  Activity, 
  Users,
  DollarSign,
  Globe,
  Zap,
  Target,
  Database
} from 'lucide-react'

export function PowerAnalyticsHub() {
  const [analytics, setAnalytics] = useState({
    totalUsers: 15847,
    activeUsers: 2934,
    totalRevenue: 847293.45,
    growthRate: 23.7,
    networkActivity: 89.2,
    securityScore: 98.5
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics(prev => ({
        ...prev,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 10),
        activeUsers: Math.floor(Math.random() * 3000),
        totalRevenue: prev.totalRevenue + Math.random() * 100,
        growthRate: Math.max(0, Math.min(100, prev.growthRate + (Math.random() - 0.5) * 2)),
        networkActivity: Math.max(0, Math.min(100, prev.networkActivity + (Math.random() - 0.5) * 5)),
        securityScore: Math.max(0, Math.min(100, prev.securityScore + (Math.random() - 0.5) * 1))
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/50 bg-gradient-to-r from-blue-900/40 to-indigo-900/40">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400">
            📊 POWER ANALYTICS HUB
          </CardTitle>
          <div className="text-center space-y-2">
            <div className="text-lg text-blue-300">
              Real-Time Insights • Performance Metrics • Data Intelligence
            </div>
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge className="bg-blue-600 animate-pulse">LIVE DATA</Badge>
              <Badge className="bg-indigo-600 animate-pulse">AI INSIGHTS</Badge>
              <Badge className="bg-purple-600 animate-pulse">PREDICTIVE</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        <Card className="border-green-500/30 bg-green-900/20">
          <CardContent className="p-4 text-center">
            <Users className="h-8 w-8 mx-auto text-green-400 mb-2" />
            <div className="text-2xl font-bold text-green-400">{analytics.totalUsers.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Total Users</div>
          </CardContent>
        </Card>
        
        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardContent className="p-4 text-center">
            <Activity className="h-8 w-8 mx-auto text-blue-400 mb-2" />
            <div className="text-2xl font-bold text-blue-400">{analytics.activeUsers.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Active Users</div>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-500/30 bg-yellow-900/20">
          <CardContent className="p-4 text-center">
            <DollarSign className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
            <div className="text-2xl font-bold text-yellow-400">${analytics.totalRevenue.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Revenue</div>
          </CardContent>
        </Card>
        
        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardContent className="p-4 text-center">
            <TrendingUp className="h-8 w-8 mx-auto text-purple-400 mb-2" />
            <div className="text-2xl font-bold text-purple-400">{analytics.growthRate.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Growth Rate</div>
          </CardContent>
        </Card>
        
        <Card className="border-cyan-500/30 bg-cyan-900/20">
          <CardContent className="p-4 text-center">
            <Globe className="h-8 w-8 mx-auto text-cyan-400 mb-2" />
            <div className="text-2xl font-bold text-cyan-400">{analytics.networkActivity.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Network Activity</div>
          </CardContent>
        </Card>
        
        <Card className="border-red-500/30 bg-red-900/20">
          <CardContent className="p-4 text-center">
            <Zap className="h-8 w-8 mx-auto text-red-400 mb-2" />
            <div className="text-2xl font-bold text-red-400">{analytics.securityScore.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Security Score</div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-green-500/30 bg-green-900/20">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              📈 Growth Analytics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-2">
                  <span>User Growth</span>
                  <span className="text-green-400">{analytics.growthRate.toFixed(1)}%</span>
                </div>
                <Progress value={analytics.growthRate} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span>Revenue Growth</span>
                  <span className="text-green-400">31.2%</span>
                </div>
                <Progress value={31.2} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span>Network Expansion</span>
                  <span className="text-green-400">45.8%</span>
                </div>
                <Progress value={45.8} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              🎯 Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-2">
                  <span>System Performance</span>
                  <span className="text-blue-400">94.7%</span>
                </div>
                <Progress value={94.7} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span>User Satisfaction</span>
                  <span className="text-blue-400">96.3%</span>
                </div>
                <Progress value={96.3} className="h-2" />
              </div>
              
              <div>
                <div className="flex justify-between mb-2">
                  <span>Network Stability</span>
                  <span className="text-blue-400">{analytics.networkActivity.toFixed(1)}%</span>
                </div>
                <Progress value={analytics.networkActivity} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-time Data Feed */}
      <Card className="border-purple-500/30 bg-purple-900/20">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Database className="h-5 w-5" />
            📡 Real-Time Data Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Target className="h-12 w-12 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">2,847</div>
              <div className="text-sm text-muted-foreground">Active Sessions</div>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Globe className="h-12 w-12 mx-auto text-cyan-400 mb-2" />
              <div className="text-2xl font-bold text-cyan-400">127</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
            
            <div className="text-center p-4 bg-black/30 rounded-lg">
              <Zap className="h-12 w-12 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-yellow-400">0.23s</div>
              <div className="text-sm text-muted-foreground">Avg Response</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
