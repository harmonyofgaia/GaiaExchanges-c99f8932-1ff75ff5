
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Activity, TrendingUp, Users, Zap } from 'lucide-react'
import { useState, useEffect } from 'react'
import HoverSidebar from '@/components/HoverSidebar'
import { GAIA_METRICS } from '@/constants/gaia'

const LiveTracking = () => {
  const [liveData, setLiveData] = useState({
    transactions: GAIA_METRICS.INITIAL_TRANSACTIONS,
    holders: GAIA_METRICS.INITIAL_HOLDERS,
    marketCap: GAIA_METRICS.INITIAL_MARKET_CAP,
    volume: GAIA_METRICS.INITIAL_VOLUME
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setLiveData(prev => ({
        transactions: prev.transactions + Math.floor(Math.random() * 10) + 1,
        holders: prev.holders + Math.floor(Math.random() * 5),
        marketCap: prev.marketCap + (Math.random() - 0.5) * 50000,
        volume: prev.volume + Math.floor(Math.random() * 1000)
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8 border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                📊 GAiA Live Tracking
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                Real-time monitoring of the GAiA ecosystem
              </p>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="border-green-500/30 bg-green-900/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Live Transactions</p>
                    <p className="text-2xl font-bold text-green-400">{liveData.transactions.toLocaleString()}</p>
                  </div>
                  <Activity className="h-8 w-8 text-green-400" />
                </div>
                <Badge className="bg-green-600 mt-2">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Live
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Token Holders</p>
                    <p className="text-2xl font-bold text-blue-400">{liveData.holders.toLocaleString()}</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-400" />
                </div>
                <Badge className="bg-blue-600 mt-2">
                  Growing
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Market Cap</p>
                    <p className="text-2xl font-bold text-purple-400">${(liveData.marketCap / 1000000).toFixed(2)}M</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-400" />
                </div>
                <Badge className="bg-purple-600 mt-2">
                  Trending
                </Badge>
              </CardContent>
            </Card>

            <Card className="border-orange-500/30 bg-orange-900/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">24h Volume</p>
                    <p className="text-2xl font-bold text-orange-400">${liveData.volume.toLocaleString()}</p>
                  </div>
                  <Zap className="h-8 w-8 text-orange-400" />
                </div>
                <Badge className="bg-orange-600 mt-2">
                  Active
                </Badge>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <Card className="border-cyan-500/30 bg-cyan-900/20">
              <CardHeader>
                <CardTitle className="text-cyan-400">🌍 Environmental Impact</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Trees Planted</span>
                      <span className="text-sm text-cyan-400">152M / 200M</span>
                    </div>
                    <Progress value={76} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Carbon Offset</span>
                      <span className="text-sm text-green-400">89%</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                  
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Ocean Cleanup</span>
                      <span className="text-sm text-blue-400">67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-pink-500/30 bg-pink-900/20">
              <CardHeader>
                <CardTitle className="text-pink-400">⚡ Network Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Network Speed</span>
                    <Badge className="bg-green-600">{GAIA_METRICS.NETWORK_SPEED} TPS</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Security Score</span>
                    <Badge className="bg-blue-600">{GAIA_METRICS.SECURITY_SCORE}%</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Ecosystem Health</span>
                    <Badge className="bg-purple-600">{GAIA_METRICS.ECOSYSTEM_HEALTH}%</Badge>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Dragon Power</span>
                    <Badge className="bg-orange-600">{GAIA_METRICS.DRAGON_POWER}%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveTracking
