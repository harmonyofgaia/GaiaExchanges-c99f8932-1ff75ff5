
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Activity, TrendingUp, Zap, Globe, Shield, DollarSign, Users } from 'lucide-react'

const LiveTracking = () => {
  const [mounted, setMounted] = useState(false)
  const [currentTime, setCurrentTime] = useState(new Date())
  const [liveData, setLiveData] = useState({
    price: 3.25,
    volume: 12500000,
    users: 48750,
    transactions: 125000,
    health: 99.9,
    change: 8.47
  })

  useEffect(() => {
    console.log('🌍 LiveTracking: Component mounting...')
    setMounted(true)
    
    // Time update
    const timeInterval = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)

    // Data simulation
    const dataInterval = setInterval(() => {
      setLiveData(prev => ({
        price: prev.price + (Math.random() - 0.5) * 0.05,
        volume: prev.volume + Math.random() * 50000,
        users: prev.users + Math.floor(Math.random() * 5),
        transactions: prev.transactions + Math.floor(Math.random() * 25),
        health: Math.min(99.9, prev.health + Math.random() * 0.05),
        change: prev.change + (Math.random() - 0.5) * 0.2
      }))
    }, 3000)

    console.log('✅ LiveTracking: All systems initialized')

    return () => {
      clearInterval(timeInterval)
      clearInterval(dataInterval)
      console.log('🔄 LiveTracking: Cleanup completed')
    }
  }, [])

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value)
  }

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US', { 
      notation: 'compact',
      maximumFractionDigits: 1
    }).format(value)
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-green-900/20 to-blue-900/20 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-400 mx-auto mb-4"></div>
          <p className="text-lg text-green-400">Loading GAIA Live Tracking...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900/20 to-blue-900/20 p-4">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🌍 GAIA Live Tracking
          </h1>
          <p className="text-lg text-gray-300 mb-4">
            Real-Time Performance Monitor
          </p>
          
          <div className="flex justify-center items-center gap-4 mb-6">
            <Badge className="bg-green-500 animate-pulse text-white">
              <Activity className="h-4 w-4 mr-2" />
              Live Stream Active
            </Badge>
            <Badge className="bg-blue-500 text-white">
              {currentTime.toLocaleTimeString()}
            </Badge>
          </div>
        </div>

        {/* Main Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">GAIA Price</p>
                  <p className="text-2xl font-bold text-green-400">{formatCurrency(liveData.price)}</p>
                  <Badge className={`mt-2 ${liveData.change >= 0 ? 'bg-green-600' : 'bg-red-600'} text-white text-xs`}>
                    {liveData.change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingUp className="h-3 w-3 mr-1" />}
                    {liveData.change.toFixed(2)}%
                  </Badge>
                </div>
                <DollarSign className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Volume 24h</p>
                  <p className="text-2xl font-bold text-blue-400">{formatCurrency(liveData.volume)}</p>
                  <Badge className="mt-2 bg-blue-600 text-white text-xs">Trading</Badge>
                </div>
                <Activity className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Active Users</p>
                  <p className="text-2xl font-bold text-purple-400">{formatNumber(liveData.users)}</p>
                  <Badge className="mt-2 bg-purple-600 text-white text-xs">Online</Badge>
                </div>
                <Users className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/30 to-orange-900/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">Transactions</p>
                  <p className="text-2xl font-bold text-yellow-400">{formatNumber(liveData.transactions)}</p>
                  <Badge className="mt-2 bg-yellow-600 text-white text-xs">Real-time</Badge>
                </div>
                <Zap className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Status */}
        <Card className="border-cyan-500/30 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Zap className="h-5 w-5" />
              System Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Response Time</span>
                  <span className="text-sm font-bold text-cyan-400">0.8ms</span>
                </div>
                <Progress value={92} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">System Health</span>
                  <span className="text-sm font-bold text-green-400">{liveData.health.toFixed(1)}%</span>
                </div>
                <Progress value={liveData.health} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Security Level</span>
                  <span className="text-sm font-bold text-blue-400">Maximum</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Live Data Display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="border-green-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <TrendingUp className="h-5 w-5" />
                Current Market Data
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <p className="text-3xl font-bold text-green-400 mb-2">
                    {formatCurrency(liveData.price)}
                  </p>
                  <p className="text-sm text-gray-400">Current GAIA Price</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-3 border border-green-500/30 rounded">
                    <p className="text-sm text-gray-400">24h High</p>
                    <p className="text-lg font-bold text-green-400">{formatCurrency(liveData.price * 1.08)}</p>
                  </div>
                  <div className="text-center p-3 border border-red-500/30 rounded">
                    <p className="text-sm text-gray-400">24h Low</p>
                    <p className="text-lg font-bold text-red-400">{formatCurrency(liveData.price * 0.92)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Activity className="h-5 w-5" />
                Network Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Total Transactions</span>
                  <span className="text-lg font-bold text-blue-400">{formatNumber(liveData.transactions)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Active Users</span>
                  <span className="text-lg font-bold text-purple-400">{formatNumber(liveData.users)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Network Speed</span>
                  <span className="text-lg font-bold text-yellow-400">10x Faster</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Global Reach</span>
                  <span className="text-lg font-bold text-green-400">195 Countries</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* System Status */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Shield className="h-5 w-5" />
              GAIA Ecosystem Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-green-400">🌍 ALL SYSTEMS OPERATIONAL</h3>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">
                GAIA ecosystem running at <span className="text-green-400 font-bold">peak performance</span>. 
                Network speed is <span className="text-blue-400 font-bold">10x faster</span> with 
                <span className="text-purple-400 font-bold"> 100% uptime</span>.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <Badge className="bg-green-600 text-white text-sm py-2 px-4">
                  💚 Love Protocol: ACTIVE
                </Badge>
                <Badge className="bg-yellow-600 text-white text-sm py-2 px-4">
                  😊 Joy Network: ENGAGED
                </Badge>
                <Badge className="bg-blue-600 text-white text-sm py-2 px-4">
                  🚀 Performance: ENHANCED
                </Badge>
                <Badge className="bg-purple-600 text-white text-sm py-2 px-4">
                  🌍 Global: 195+ COUNTRIES
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Controls */}
        <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Globe className="h-5 w-5" />
              Live Control Panel
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-green-600 hover:bg-green-700 text-white"
                onClick={() => console.log('🔄 Data refreshed')}
              >
                Refresh Data
              </Button>
              <Button 
                className="bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => console.log('📊 Export initiated')}
              >
                Export Report
              </Button>
              <Button 
                className="bg-purple-600 hover:bg-purple-700 text-white"
                onClick={() => console.log('📈 Analytics opened')}
              >
                Advanced Analytics
              </Button>
              <Button 
                className="bg-yellow-600 hover:bg-yellow-700 text-white"
                onClick={() => console.log('🔔 Alerts configured')}
              >
                Configure Alerts
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LiveTracking
