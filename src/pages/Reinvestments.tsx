
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { CoinGeckoTrading } from '@/components/CoinGeckoTrading'
import { 
  TrendingUp, 
  Globe, 
  DollarSign, 
  Coins, 
  BarChart3, 
  Target,
  Shield,
  CheckCircle,
  ArrowUpRight,
  Leaf,
  Users,
  Network
} from 'lucide-react'

const Reinvestments = () => {
  // Mock reinvestment data
  const reinvestmentData = {
    totalReinvested: 847523.67,
    totalTokensBurned: 1250000,
    environmentalProjects: 12,
    partnersOnboarded: 156,
    exchangesConnected: 8,
    weeklyGrowth: 15.7
  }

  const reinvestmentProjects = [
    {
      id: 1,
      name: "Ocean Cleanup Initiative",
      allocation: 125000,
      progress: 78,
      status: "Active",
      impact: "2.3M plastic bottles removed"
    },
    {
      id: 2,
      name: "Solar Energy Expansion",
      allocation: 200000,
      progress: 92,
      status: "Completed",
      impact: "500 solar panels installed"
    },
    {
      id: 3,
      name: "Forest Restoration",
      allocation: 85000,
      progress: 45,
      status: "In Progress",
      impact: "15,000 trees planted"
    },
    {
      id: 4,
      name: "Clean Water Access",
      allocation: 150000,
      progress: 63,
      status: "Active",
      impact: "8 communities served"
    }
  ]

  const connectedExchanges = [
    { name: "CoinGecko", status: "Connected", tokens: 450, trustScore: 98 },
    { name: "Revolut", status: "Connected", tokens: 89, trustScore: 96 },
    { name: "Binance", status: "Integrating", tokens: 672, trustScore: 94 },
    { name: "Coinbase", status: "Pending", tokens: 234, trustScore: 97 },
    { name: "Kraken", status: "Connected", tokens: 198, trustScore: 95 },
    { name: "KuCoin", status: "Connected", tokens: 345, trustScore: 89 }
  ]

  const formatMoney = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-400">Harmony of Gaia - Reinvestments Overview</h1>
          <p className="text-muted-foreground">Complete transparency of all environmental reinvestments and exchange integrations</p>
        </div>
        <Badge className="bg-green-600 text-white px-4 py-2">
          Live Data • Updates Every 5s
        </Badge>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <DollarSign className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">
                  {formatMoney(reinvestmentData.totalReinvested)}
                </div>
                <div className="text-sm text-muted-foreground">Total Reinvested</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 rounded-lg">
                <Coins className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-blue-400">
                  {reinvestmentData.totalTokensBurned.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Tokens Burned</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/30 to-violet-900/30 border-purple-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-500/20 rounded-lg">
                <Leaf className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-purple-400">
                  {reinvestmentData.environmentalProjects}
                </div>
                <div className="text-sm text-muted-foreground">Green Projects</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 border-orange-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-500/20 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-orange-400">
                  +{reinvestmentData.weeklyGrowth}%
                </div>
                <div className="text-sm text-muted-foreground">Weekly Growth</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Exchange Connections */}
      <Card className="border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <Network className="h-5 w-5" />
            Connected Exchanges & Token Networks
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {connectedExchanges.map((exchange, index) => (
              <Card key={index} className="bg-muted/30 border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{exchange.name}</h3>
                    <Badge 
                      className={
                        exchange.status === 'Connected' 
                          ? 'bg-green-600' 
                          : exchange.status === 'Integrating'
                          ? 'bg-yellow-600'
                          : 'bg-orange-600'
                      }
                    >
                      {exchange.status}
                    </Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Available Tokens:</span>
                      <span className="font-medium">{exchange.tokens}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Trust Score:</span>
                      <span className="font-medium text-green-400">{exchange.trustScore}/100</span>
                    </div>
                  </div>
                  {exchange.status === 'Connected' && (
                    <div className="flex items-center gap-1 mt-3 text-green-400 text-xs">
                      <CheckCircle className="h-3 w-3" />
                      <span>Full Integration Active</span>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Environmental Reinvestment Projects */}
      <Card className="border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Target className="h-5 w-5" />
            Environmental Reinvestment Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reinvestmentProjects.map((project) => (
              <Card key={project.id} className="bg-muted/20 border-border/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold">{project.name}</h3>
                    <Badge 
                      className={
                        project.status === 'Completed' 
                          ? 'bg-green-600' 
                          : project.status === 'Active'
                          ? 'bg-blue-600'
                          : 'bg-yellow-600'
                      }
                    >
                      {project.status}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-muted-foreground">Allocation</div>
                      <div className="font-semibold text-green-400">{formatMoney(project.allocation)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Progress</div>
                      <div className="font-semibold">{project.progress}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Impact</div>
                      <div className="font-semibold text-primary">{project.impact}</div>
                    </div>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* CoinGecko Integration */}
      <CoinGeckoTrading />

      {/* Action Buttons */}
      <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-primary/20">
        <CardContent className="p-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-semibold text-primary">Expand Harmony of Gaia Network</h3>
            <p className="text-muted-foreground">
              Join the movement to create the world's most trusted and environmentally conscious crypto exchange
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="bg-green-600 hover:bg-green-700 flex items-center gap-2">
                <Leaf className="h-4 w-4" />
                View Environmental Impact
              </Button>
              <Button variant="outline" className="border-blue-500/30 text-blue-400 hover:bg-blue-900/20 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Connect New Exchange
              </Button>
              <Button variant="outline" className="border-purple-500/30 text-purple-400 hover:bg-purple-900/20 flex items-center gap-2">
                <Users className="h-4 w-4" />
                Partner Program
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trust & Security Banner */}
      <Card className="border-green-500/20 bg-gradient-to-r from-green-900/10 to-emerald-900/10">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3 text-center justify-center">
            <Shield className="h-6 w-6 text-green-400" />
            <div>
              <h4 className="font-semibold text-green-400">🌍 Harmony of Gaia Trust Network</h4>
              <p className="text-sm text-muted-foreground">
                Every token verified • Every transaction transparent • Every reinvestment tracked • Building the future of sustainable finance
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Reinvestments
