
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, CandlestickChart } from 'recharts'
import { TrendingUp, Activity, BarChart3 } from 'lucide-react'

// Mock data for the charts
const priceData = [
  { time: '00:00', price: 1.2345, volume: 1500 },
  { time: '04:00', price: 1.2456, volume: 2100 },
  { time: '08:00', price: 1.2234, volume: 1800 },
  { time: '12:00', price: 1.2678, volume: 2500 },
  { time: '16:00', price: 1.2567, volume: 1900 },
  { time: '20:00', price: 1.2789, volume: 2200 },
  { time: '24:00', price: 1.2890, volume: 2000 }
]

export function AdvancedTradingCharts() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <BarChart3 className="h-5 w-5" />
            📈 Advanced Trading Charts
          </CardTitle>
          <div className="flex gap-2">
            <Badge className="bg-green-600 text-white">LIVE DATA</Badge>
            <Badge className="bg-blue-600 text-white">REAL-TIME</Badge>
            <Badge className="bg-purple-600 text-white">ADVANCED</Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Price Chart */}
      <Card className="border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <TrendingUp className="h-4 w-4" />
            GAiA Price Movement (24H)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
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
                  stroke="#10B981" 
                  strokeWidth={2}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
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
            <Activity className="h-4 w-4" />
            Trading Volume (24H)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={priceData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="time" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1F2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="volume" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Trading Stats */}
      <Card className="border-purple-500/30">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-green-900/30 rounded-lg">
              <div className="text-2xl font-bold text-green-400">1.2890</div>
              <div className="text-xs text-muted-foreground">Current Price</div>
            </div>
            <div className="text-center p-3 bg-blue-900/30 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">+4.5%</div>
              <div className="text-xs text-muted-foreground">24H Change</div>
            </div>
            <div className="text-center p-3 bg-purple-900/30 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">15.2K</div>
              <div className="text-xs text-muted-foreground">24H Volume</div>
            </div>
            <div className="text-center p-3 bg-orange-900/30 rounded-lg">
              <div className="text-2xl font-bold text-orange-400">1.3245</div>
              <div className="text-xs text-muted-foreground">24H High</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Export a mock CandlestickChart component for compatibility
export function CandlestickChart({ children, ...props }: any) {
  return (
    <div className="bg-gray-900/50 rounded-lg p-4 text-center text-muted-foreground">
      <BarChart3 className="h-8 w-8 mx-auto mb-2 text-blue-400" />
      <div>Advanced Candlestick Chart</div>
      <div className="text-xs">Coming Soon - Professional Trading View</div>
    </div>
  )
}
