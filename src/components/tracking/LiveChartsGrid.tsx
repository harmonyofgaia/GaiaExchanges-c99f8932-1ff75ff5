
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { TrendingUp, TrendingDown, Activity, Users, DollarSign, Zap } from 'lucide-react'

interface ChartData {
  time: string
  price: number
  volume: number
  users: number
  transactions: number
  marketCap: number
  engagement: number
}

export function LiveChartsGrid() {
  const [chartData, setChartData] = useState<ChartData[]>([])
  const [currentMetrics, setCurrentMetrics] = useState({
    price: 3.25,
    volume: 12500000,
    users: 48750,
    transactions: 125000,
    marketCap: 278500000,
    change24h: 8.47
  })

  // Generate live data every 2 seconds
  useEffect(() => {
    const generateData = () => {
      const now = new Date()
      const timeStr = now.toLocaleTimeString('en-US', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit', 
        second: '2-digit' 
      })
      
      const newDataPoint: ChartData = {
        time: timeStr,
        price: currentMetrics.price * (1 + (Math.random() - 0.5) * 0.02),
        volume: currentMetrics.volume * (1 + (Math.random() - 0.5) * 0.1),
        users: currentMetrics.users + Math.floor(Math.random() * 100),
        transactions: currentMetrics.transactions + Math.floor(Math.random() * 500),
        marketCap: currentMetrics.marketCap * (1 + (Math.random() - 0.5) * 0.02),
        engagement: 85 + Math.random() * 15
      }

      setChartData(prev => [...prev.slice(-19), newDataPoint])
      
      // Update current metrics
      setCurrentMetrics(prev => ({
        ...prev,
        price: newDataPoint.price,
        volume: newDataPoint.volume,
        users: newDataPoint.users,
        transactions: newDataPoint.transactions,
        marketCap: newDataPoint.marketCap,
        change24h: prev.change24h + (Math.random() - 0.5) * 0.5
      }))
    }

    generateData() // Initial data
    const interval = setInterval(generateData, 2000)
    return () => clearInterval(interval)
  }, [currentMetrics.price, currentMetrics.volume, currentMetrics.users, currentMetrics.transactions, currentMetrics.marketCap])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      notation: 'compact'
    }).format(value)
  }

  const pieData = [
    { name: 'Active Users', value: 45, color: '#22c55e' },
    { name: 'Trading Volume', value: 30, color: '#3b82f6' },
    { name: 'Market Activity', value: 15, color: '#f59e0b' },
    { name: 'Network Usage', value: 10, color: '#8b5cf6' }
  ]

  return (
    <div className="space-y-6">
      {/* Live Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">GAIA Price</p>
                <p className="text-lg font-bold text-green-400">{formatCurrency(currentMetrics.price)}</p>
                <Badge className={`text-xs ${currentMetrics.change24h >= 0 ? 'bg-green-600' : 'bg-red-600'} text-white`}>
                  {currentMetrics.change24h >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                  {currentMetrics.change24h.toFixed(2)}%
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
                <p className="text-xs text-muted-foreground">Volume 24h</p>
                <p className="text-lg font-bold text-blue-400">{formatCurrency(currentMetrics.volume)}</p>
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
                <p className="text-xs text-muted-foreground">Active Users</p>
                <p className="text-lg font-bold text-purple-400">{currentMetrics.users.toLocaleString()}</p>
                <Badge className="text-xs bg-purple-600 text-white">Online</Badge>
              </div>
              <Users className="h-6 w-6 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/30 to-orange-900/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Transactions</p>
                <p className="text-lg font-bold text-yellow-400">{currentMetrics.transactions.toLocaleString()}</p>
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
                <p className="text-xs text-muted-foreground">Market Cap</p>
                <p className="text-lg font-bold text-emerald-400">{formatCurrency(currentMetrics.marketCap)}</p>
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
                <p className="text-lg font-bold text-cyan-400">1.2s</p>
                <Badge className="text-xs bg-cyan-600 text-white">10x Faster</Badge>
              </div>
              <Activity className="h-6 w-6 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Price Chart */}
        <Card className="border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <TrendingUp className="h-5 w-5" />
              Live Price Chart - GAIA Token
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

        {/* Volume Chart */}
        <Card className="border-blue-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Activity className="h-5 w-5" />
              Trading Volume (24h)
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

        {/* User Activity Chart */}
        <Card className="border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Users className="h-5 w-5" />
              Active Users & Transactions
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
                  <Bar dataKey="users" fill="#8b5cf6" name="Active Users" />
                  <Bar dataKey="transactions" fill="#f59e0b" name="Transactions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Market Distribution */}
        <Card className="border-yellow-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-400">
              <Activity className="h-5 w-5" />
              Market Activity Distribution
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
