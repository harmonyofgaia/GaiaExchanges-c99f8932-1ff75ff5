
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, Activity, Users, DollarSign, Zap } from 'lucide-react'

interface GaiaChartData {
  time: string
  price: number
  volume: number
  holders: number
  transactions: number
  marketCap: number
  engagement: number
}

export function LiveChartsGrid() {
  const [chartData, setChartData] = useState<GaiaChartData[]>([])
  const [currentGaiaMetrics, setCurrentGaiaMetrics] = useState({
    price: 0.0001,
    volume: 15000000,
    holders: 48750,
    transactions: 2750000,
    marketCap: 1500000000,
    change24h: 125.47
  })

  // Generate live GAiA data every 2 seconds
  useEffect(() => {
    const generateGaiaData = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      })
      
      const newDataPoint: GaiaChartData = {
        time: timeStr,
        price: Math.max(0.00001, currentGaiaMetrics.price * (1 + (Math.random() - 0.4) * 0.02)),
        volume: currentGaiaMetrics.volume * (1 + (Math.random() - 0.5) * 0.1),
        holders: currentGaiaMetrics.holders + Math.floor(Math.random() * 50),
        transactions: currentGaiaMetrics.transactions + Math.floor(Math.random() * 100),
        marketCap: Math.max(1000000, currentGaiaMetrics.marketCap * (1 + (Math.random() - 0.5) * 0.02)),
        engagement: 85 + Math.random() * 15
      }

      setChartData(prev => [...prev.slice(-19), newDataPoint])
      
      // Update current GAiA metrics
      setCurrentGaiaMetrics(prev => ({
        ...prev,
        price: newDataPoint.price,
        volume: newDataPoint.volume,
        holders: newDataPoint.holders,
        transactions: newDataPoint.transactions,
        marketCap: newDataPoint.marketCap,
        change24h: prev.change24h + (Math.random() - 0.5) * 2
      }))
    }

    generateGaiaData() // Initial data
    const interval = setInterval(generateGaiaData, 2000)
    return () => clearInterval(interval)
  }, [currentGaiaMetrics.price, currentGaiaMetrics.volume, currentGaiaMetrics.holders, currentGaiaMetrics.transactions, currentGaiaMetrics.marketCap])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact',
      minimumFractionDigits: value < 0.001 ? 6 : 2,
      maximumFractionDigits: value < 0.001 ? 6 : 2
    }).format(value)
  }

  const pieData = [
    { name: 'GAiA Holders', value: 45, color: '#22c55e' },
    { name: 'GAiA Trading Volume', value: 30, color: '#3b82f6' },
    { name: 'GAiA Market Activity', value: 15, color: '#f59e0b' },
    { name: 'GAiA Network Usage', value: 10, color: '#8b5cf6' }
  ]

  return (
    <div className="space-y-6">
      {/* Live GAiA Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">GAIA Price</p>
                <p className="text-lg font-bold text-green-400">{formatCurrency(currentGaiaMetrics.price)}</p>
                <Badge className={`text-xs ${currentGaiaMetrics.change24h >= 0 ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                  {currentGaiaMetrics.change24h >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {currentGaiaMetrics.change24h.toFixed(2)}%
                </Badge>
              </div>
              <DollarSign className="h-6 w-6 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">GAiA Volume 24h</p>
                <p className="text-lg font-bold text-blue-400">{formatCurrency(currentGaiaMetrics.volume)}</p>
                <Badge className="text-xs bg-blue-600 text-white">Live</Badge>
              </div>
              <Activity className="h-6 w-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">GAiA Holders</p>
                <p className="text-lg font-bold text-purple-400">{currentGaiaMetrics.holders.toLocaleString()}</p>
                <Badge className="text-xs bg-purple-600 text-white">Growing</Badge>
              </div>
              <Users className="h-6 w-6 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/30 to-orange-900/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">GAiA Transactions</p>
                <p className="text-lg font-bold text-yellow-400">{currentGaiaMetrics.transactions.toLocaleString()}</p>
                <Badge className="text-xs bg-yellow-600 text-white">Real-time</Badge>
              </div>
              <Zap className="h-6 w-6 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-900/30 to-teal-900/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">GAiA Market Cap</p>
                <p className="text-lg font-bold text-emerald-400">{formatCurrency(currentGaiaMetrics.marketCap)}</p>
                <Badge className="text-xs bg-emerald-600 text-white">Live</Badge>
              </div>
              <TrendingUp className="h-6 w-6 text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-900/30 to-sky-900/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Network Speed</p>
                <p className="text-lg font-bold text-cyan-400">0.1s</p>
                <Badge className="text-xs bg-cyan-600 text-white">10x Faster</Badge>
              </div>
              <Activity className="h-6 w-6 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live GAiA Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* GAiA Price Chart */}
        <Card className="border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <TrendingUp className="h-5 w-5" />
              Live GAiA Price Chart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    dot={{ fill: '#22c55e', strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* GAiA Volume Chart */}
        <Card className="border-blue-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Activity className="h-5 w-5" />
              GAiA Trading Volume (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="volume" 
                    stroke="#3b82f6" 
                    fill="url(#colorVolume)" 
                  />
                  <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* GAiA Holder Activity Chart */}
        <Card className="border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Users className="h-5 w-5" />
              GAiA Holders & Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Bar dataKey="holders" fill="#8b5cf6" name="GAiA Holders" />
                  <Bar dataKey="transactions" fill="#f59e0b" name="GAiA Transactions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* GAiA Market Distribution */}
        <Card className="border-yellow-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-400">
              <Activity className="h-5 w-5" />
              GAiA Market Activity Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
