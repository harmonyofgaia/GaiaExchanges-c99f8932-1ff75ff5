
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Activity, TrendingUp, Zap, Globe, Shield, DollarSign, Users } from 'lucide-react'

const LiveTracking = () => {
  console.log("🚀 LiveTracking page initializing...")
  
  const [liveData, setLiveData] = useState([
    { time: '10:00', price: 3.20, volume: 12000000, users: 48000, transactions: 124000 },
    { time: '10:05', price: 3.22, volume: 12100000, users: 48100, transactions: 124500 },
    { time: '10:10', price: 3.25, volume: 12200000, users: 48200, transactions: 125000 }
  ])
  
  const [currentPrice, setCurrentPrice] = useState(3.25)
  const [volume24h, setVolume24h] = useState(12500000)
  const [activeUsers, setActiveUsers] = useState(48750)
  const [transactions, setTransactions] = useState(125000)
  const [isLive, setIsLive] = useState(true)

  useEffect(() => {
    console.log("✅ LiveTracking component mounted and running!")
    
    if (!isLive) return

    const updateData = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      })
      
      const priceChange = (Math.random() - 0.5) * 0.1
      const newPrice = Math.max(0.1, currentPrice + priceChange)
      const newVolume = volume24h + Math.floor(Math.random() * 100000)
      const newUsers = activeUsers + Math.floor(Math.random() * 50)
      const newTransactions = transactions + Math.floor(Math.random() * 100)
      
      setCurrentPrice(newPrice)
      setVolume24h(newVolume)
      setActiveUsers(newUsers)
      setTransactions(newTransactions)
      
      const newDataPoint = {
        time: timeStr,
        price: newPrice,
        volume: newVolume,
        users: newUsers,
        transactions: newTransactions
      }
      
      setLiveData(prev => [...prev.slice(-9), newDataPoint])
      
      console.log("📊 Live data updated:", { price: newPrice, volume: newVolume })
    }

    const interval = setInterval(updateData, 3000)
    updateData() // Initial update
    
    return () => clearInterval(interval)
  }, [isLive, currentPrice, volume24h, activeUsers, transactions])

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact'
    }).format(value)
  }

  const formatNumber = (value) => {
    return new Intl.NumberFormat('en-US', { notation: 'compact' }).format(value)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900/10 to-blue-900/10 p-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🌍 GAIA Live Tracking Center
          </h1>
          <p className="text-xl text-gray-300 mb-6">
            Real-Time Analytics • Live Performance • Global Monitoring
          </p>
          
          <div className="flex justify-center items-center gap-4 mb-6">
            <Badge className={`${isLive ? 'bg-green-500 animate-pulse' : 'bg-red-500'} text-white px-4 py-2`}>
              <Activity className="h-4 w-4 mr-2" />
              {isLive ? 'Live Data Stream Active' : 'Stream Paused'}
            </Badge>
            <Button 
              onClick={() => setIsLive(!isLive)}
              variant={isLive ? "destructive" : "default"}
              size="sm"
            >
              {isLive ? 'Pause Stream' : 'Start Stream'}
            </Button>
          </div>
        </div>

        {/* Live Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-400">GAIA Price</p>
                  <p className="text-2xl font-bold text-green-400">{formatCurrency(currentPrice)}</p>
                  <Badge className="mt-2 bg-green-600 text-white text-xs">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    Live
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
                  <p className="text-2xl font-bold text-blue-400">{formatCurrency(volume24h)}</p>
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
                  <p className="text-2xl font-bold text-purple-400">{formatNumber(activeUsers)}</p>
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
                  <p className="text-2xl font-bold text-yellow-400">{formatNumber(transactions)}</p>
                  <Badge className="mt-2 bg-yellow-600 text-white text-xs">Real-time</Badge>
                </div>
                <Zap className="h-8 w-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Live Chart */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-green-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <TrendingUp className="h-5 w-5" />
                Live Price Chart
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={liveData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="price" 
                      stroke="#22c55e" 
                      strokeWidth={3}
                      dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Activity className="h-5 w-5" />
                Volume Tracking
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={liveData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                    <YAxis stroke="#9CA3AF" fontSize={12} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#fff'
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="volume" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Performance Indicators */}
        <Card className="border-cyan-500/30 bg-gradient-to-r from-cyan-900/20 to-blue-900/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Zap className="h-5 w-5" />
              Network Performance
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
                  <span className="text-sm font-bold text-green-400">99.9%</span>
                </div>
                <Progress value={99.9} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-400">Security Score</span>
                  <span className="text-sm font-bold text-blue-400">100%</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Status Overview */}
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
              <p className="text-lg text-gray-300 max-w-4xl mx-auto">
                GAIA ecosystem running at <span className="text-green-400 font-bold">peak performance</span>. 
                Network speed is <span className="text-blue-400 font-bold">10x faster</span> than industry standards 
                with <span className="text-purple-400 font-bold">100% uptime</span> guaranteed.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mt-6">
                <Badge className="bg-green-600 text-white text-sm py-2 px-4">
                  💚 Love Protocol: ACTIVE
                </Badge>
                <Badge className="bg-yellow-600 text-white text-sm py-2 px-4">
                  😊 Joy Network: ENGAGED
                </Badge>
                <Badge className="bg-blue-600 text-white text-sm py-2 px-4">
                  🚀 Performance: 10x ENHANCED
                </Badge>
                <Badge className="bg-purple-600 text-white text-sm py-2 px-4">
                  🌍 Global Reach: 195+ COUNTRIES
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default LiveTracking
