
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { Coins, TrendingUp, Users, Zap, Globe, Shield, Award, Activity } from 'lucide-react'
import { Navbar } from '@/components/Navbar'

const priceData = [
  { time: '00:00', price: 2.45 },
  { time: '04:00', price: 2.52 },
  { time: '08:00', price: 2.48 },
  { time: '12:00', price: 2.67 },
  { time: '16:00', price: 2.73 },
  { time: '20:00', price: 2.81 },
  { time: '24:00', price: 2.85 }
]

const distributionData = [
  { name: 'Staked', value: 35, color: '#22c55e' },
  { name: 'Circulating', value: 45, color: '#3b82f6' },
  { name: 'Reserved', value: 15, color: '#8b5cf6' },
  { name: 'Ecosystem', value: 5, color: '#eab308' }
]

export default function GaiaTokenStatus() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🪙 GAIA Token Status
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Real-time GAIA Token Analytics & Ecosystem Health
          </p>
          <div className="flex gap-4 mt-4">
            <Badge variant="outline" className="border-green-500/50 text-green-400">
              <Coins className="h-3 w-3 mr-1" />
              $2.85 USD
            </Badge>
            <Badge variant="outline" className="border-blue-500/50 text-blue-400">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.3% 24h
            </Badge>
            <Badge variant="outline" className="border-purple-500/50 text-purple-400">
              <Activity className="h-3 w-3 mr-1" />
              High Activity
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-400">Current Price</CardTitle>
              <Coins className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$2.85</div>
              <p className="text-xs text-green-400">+12.3% (24h)</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-400">Market Cap</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$45.7M</div>
              <p className="text-xs text-blue-400">Circulating supply</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-400">Total Holders</CardTitle>
              <Users className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">23,456</div>
              <p className="text-xs text-purple-400">+847 this week</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/20 to-black/50 border-yellow-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-400">Staking APY</CardTitle>
              <Zap className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">18.5%</div>
              <p className="text-xs text-yellow-400">Annual yield</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400">GAIA Price Chart (24H)</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={priceData}>
                  <XAxis dataKey="time" />
                  <YAxis domain={['dataMin - 0.1', 'dataMax + 0.1']} />
                  <Line 
                    type="monotone" 
                    dataKey="price" 
                    stroke="#22c55e" 
                    strokeWidth={2}
                    dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-400">Token Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={distributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {distributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {distributionData.map((entry, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></div>
                    <span className="text-xs text-muted-foreground">{entry.name}: {entry.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Staking Pool
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Staked</span>
                  <span className="text-green-400 font-bold">5.67M GAIA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Stakers</span>
                  <span className="text-white">8,234</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Pool Health</span>
                  <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">Healthy</Badge>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-muted-foreground">Pool Utilization</span>
                    <span className="text-green-400">78%</span>
                  </div>
                  <Progress value={78} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Ecosystem Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Daily Transactions</span>
                  <span className="text-blue-400 font-bold">12,847</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Active dApps</span>
                  <span className="text-white">23</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Network Status</span>
                  <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">Optimal</Badge>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-muted-foreground">Ecosystem Activity</span>
                    <span className="text-blue-400">94%</span>
                  </div>
                  <Progress value={94} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Award className="h-5 w-5" />
                Governance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Active Proposals</span>
                  <span className="text-purple-400 font-bold">7</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Voting Power</span>
                  <span className="text-white">2.3M GAIA</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Participation</span>
                  <Badge variant="outline" className="border-purple-500/30 text-purple-400 text-xs">High</Badge>
                </div>
                <div>
                  <div className="flex justify-between mb-2 text-sm">
                    <span className="text-muted-foreground">Voter Turnout</span>
                    <span className="text-purple-400">67%</span>
                  </div>
                  <Progress value={67} className="h-2" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-gradient-to-r from-green-900/30 to-purple-900/30 border-green-500/20">
          <CardHeader>
            <CardTitle className="text-center text-green-400">GAIA Token Utility & Ecosystem Benefits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 mb-3">
                  <Coins className="h-12 w-12 text-green-400 mx-auto mb-2" />
                  <h3 className="font-medium text-green-400 mb-1">Environmental Rewards</h3>
                  <p className="text-sm text-muted-foreground">Earn GAIA tokens for eco-friendly actions</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-3">
                  <Shield className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                  <h3 className="font-medium text-blue-400 mb-1">Staking Benefits</h3>
                  <p className="text-sm text-muted-foreground">Stake tokens for governance and yields</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-3">
                  <Award className="h-12 w-12 text-purple-400 mx-auto mb-2" />
                  <h3 className="font-medium text-purple-400 mb-1">Governance Rights</h3>
                  <p className="text-sm text-muted-foreground">Vote on ecosystem decisions</p>
                </div>
              </div>
              <div className="text-center">
                <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-3">
                  <Globe className="h-12 w-12 text-yellow-400 mx-auto mb-2" />
                  <h3 className="font-medium text-yellow-400 mb-1">Ecosystem Access</h3>
                  <p className="text-sm text-muted-foreground">Premium features and services</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
