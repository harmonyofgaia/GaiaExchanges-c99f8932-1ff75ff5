
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, Activity } from 'lucide-react';

const mockTradingData = [
  { time: '09:00', price: 150, volume: 1200, high: 155, low: 148, open: 150, close: 152 },
  { time: '10:00', price: 152, volume: 1800, high: 158, low: 150, open: 152, close: 156 },
  { time: '11:00', price: 156, volume: 2200, high: 162, low: 154, open: 156, close: 160 },
  { time: '12:00', price: 160, volume: 1900, high: 165, low: 158, open: 160, close: 163 },
  { time: '13:00', price: 163, volume: 2400, high: 168, low: 161, open: 163, close: 166 },
  { time: '14:00', price: 166, volume: 2100, high: 170, low: 164, open: 166, close: 168 },
  { time: '15:00', price: 168, volume: 1700, high: 172, low: 166, open: 168, close: 170 },
  { time: '16:00', price: 170, volume: 1500, high: 174, low: 168, open: 170, close: 172 }
];

export function AdvancedTradingCharts() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <TrendingUp className="h-5 w-5" />
            Price Chart
            <Badge className="bg-green-600 animate-pulse">LIVE</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={mockTradingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(59,130,246,0.5)',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="price" 
                stroke="#3b82f6" 
                strokeWidth={2}
                dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="high" 
                stroke="#10b981" 
                strokeWidth={1}
                strokeDasharray="5 5"
              />
              <Line 
                type="monotone" 
                dataKey="low" 
                stroke="#ef4444" 
                strokeWidth={1}
                strokeDasharray="5 5"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Activity className="h-5 w-5" />
            Volume Analysis
            <Badge className="bg-blue-600">REAL-TIME</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={mockTradingData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="time" stroke="rgba(255,255,255,0.7)" />
              <YAxis stroke="rgba(255,255,255,0.7)" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'rgba(0,0,0,0.8)', 
                  border: '1px solid rgba(16,185,129,0.5)',
                  borderRadius: '8px'
                }} 
              />
              <Legend />
              <Bar dataKey="volume" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="lg:col-span-2 bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <TrendingDown className="h-5 w-5" />
            Technical Indicators
            <Badge className="bg-purple-600">ADVANCED</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-900/30 rounded-lg">
              <div className="text-2xl font-bold text-green-400">+12.5%</div>
              <div className="text-sm text-muted-foreground">24h Change</div>
            </div>
            <div className="text-center p-4 bg-blue-900/30 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">$172.00</div>
              <div className="text-sm text-muted-foreground">Current Price</div>
            </div>
            <div className="text-center p-4 bg-yellow-900/30 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">2.4M</div>
              <div className="text-sm text-muted-foreground">Volume</div>
            </div>
            <div className="text-center p-4 bg-purple-900/30 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">RSI: 68</div>
              <div className="text-sm text-muted-foreground">Momentum</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
