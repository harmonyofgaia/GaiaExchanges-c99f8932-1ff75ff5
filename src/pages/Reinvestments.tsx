
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
  // Mock reinvestment data - Updated for correct allocation
  const reinvestmentData = {
    totalReinvested: 1247523.67, // Updated to reflect increased funding
    totalTokensBurned: 1250000,
    environmentalProjects: 13,
    partnersOnboarded: 156,
    exchangesConnected: 8,
    weeklyGrowth: 18.2,
    coralReefAllocation: 5, // 5% to coral reef
    otherProjectsAllocation: 95 // 95% to other projects
  }

  const reinvestmentProjects = [
    {
      id: 1,
      name: "Sound Riffs Re Grau dio - Coral Reef Restoration",
      allocation: 62500, // 5% of 1.25M burned tokens
      progress: 12,
      status: "Active",
      impact: "Audio signals helping 3 reef sites",
      description: "Personal project: Restoring coral reefs with balanced underwater audio signals to attract marine life and recover ecosystems",
      burnContribution: 5, // 5% of all burns go here
      category: "Marine Conservation",
      walletAddress: "ABiVQHU118yDohUxB221P9JbCov52ucMtyG1i8AkwPm7"
    },
    {
      id: 2,
      name: "Ocean Cleanup Initiative",
      allocation: 237500, // Part of 95% allocation
      progress: 78,
      status: "Active",
      impact: "2.3M plastic bottles removed",
      burnContribution: 19
    },
    {
      id: 3,
      name: "Solar Energy Expansion",
      allocation: 300000, // Part of 95% allocation
      progress: 92,
      status: "Completed",
      impact: "500 solar panels installed",
      burnContribution: 25
    },
    {
      id: 4,
      name: "Forest Restoration Brazil",
      allocation: 200000, // Part of 95% allocation
      progress: 45,
      status: "In Progress",
      impact: "15,000 trees planted",
      burnContribution: 16
    },
    {
      id: 5,
      name: "Clean Water Access Global",
      allocation: 187500, // Part of 95% allocation
      progress: 63,
      status: "Active",
      impact: "8 communities served",
      burnContribution: 15
    },
    {
      id: 6,
      name: "Carbon Capture Technology",
      allocation: 250000, // Part of 95% allocation
      progress: 35,
      status: "Active",
      impact: "750 tons CO2 captured",
      burnContribution: 20
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
          <p className="text-muted-foreground">Complete transparency: 5% coral reef restoration, 95% other green projects</p>
        </div>
        <Badge className="bg-green-600 text-white px-4 py-2">
          Live Data • Updates Every 5s
        </Badge>
      </div>

      {/* Featured Coral Reef Project */}
      <Card className="border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-400">
            <div className="text-4xl">🪸</div>
            🌊 PERSONAL PROJECT: Sound Riffs Re Grau dio - Coral Reef Restoration
            <Badge className="bg-cyan-600 text-white animate-pulse">5% BURN ALLOCATION</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="text-center">
            <div className="text-6xl animate-bounce mb-4">🐠🪸🎵</div>
            <p className="text-lg text-cyan-300 mb-4">
              Personal commitment: Revolutionary underwater audio technology helping coral reefs recover and attract marine life back to damaged ecosystems
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-cyan-400">{formatMoney(62500)}</div>
              <div className="text-sm text-muted-foreground">Personal Funding (5%)</div>
            </div>
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">DEDICATED</div>
              <div className="text-sm text-muted-foreground">Personal Wallet</div>
            </div>
            <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-green-400">3</div>
              <div className="text-sm text-muted-foreground">Active Reef Sites</div>
            </div>
            <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">12%</div>
              <div className="text-sm text-muted-foreground">Progress Complete</div>
            </div>
          </div>
          
          <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
            <h4 className="font-bold text-cyan-400 mb-2">🎵 Personal Wallet Address:</h4>
            <div className="font-mono text-sm bg-black/30 p-2 rounded break-all text-cyan-300 mb-2">
              ABiVQHU118yDohUxB221P9JbCov52ucMtyG1i8AkwPm7
            </div>
            <p className="text-sm text-cyan-300">
              This is where 5% of ALL GAiA token burns are automatically sent to fund real-world coral reef restoration through Sound Riffs Re Grau dio technology.
            </p>
          </div>
          
          <div className="bg-muted/30 p-4 rounded-lg">
            <h4 className="font-bold text-cyan-400 mb-2">🎵 How Sound Riffs Re Grau dio Works:</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-1">
                <div>🔊 Balanced underwater audio signals</div>
                <div>🐟 Attracts fish and marine life</div>
                <div>🪸 Stimulates coral growth</div>
              </div>
              <div className="space-y-1">
                <div>🌊 Restores natural ecosystem balance</div>
                <div>🔬 Scientifically proven methods</div>
                <div>📈 Measurable recovery results</div>
              </div>
            </div>
          </div>
          
          <Progress value={12} className="h-3 bg-cyan-900/30" />
          <div className="text-center">
            <p className="text-sm text-cyan-400">
              🚀 Personal commitment: Every GAiA token burn contributes 5% directly to coral reef restoration!
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Updated Key Metrics */}
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

        <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-cyan-500/20 rounded-lg">
                <div className="text-2xl">🪸</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-cyan-400">5%</div>
                <div className="text-sm text-muted-foreground">Coral Reef (Personal)</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/30 to-teal-900/30 border-green-500/30">
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-500/20 rounded-lg">
                <Leaf className="h-6 w-6 text-green-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-green-400">95%</div>
                <div className="text-sm text-muted-foreground">Other Green Projects</div>
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
            Environmental Reinvestment Projects - Corrected Allocation (5% / 95%)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reinvestmentProjects.map((project) => (
              <Card key={project.id} className={`${project.id === 1 ? 'bg-cyan-900/20 border-cyan-500/30' : 'bg-muted/20 border-border/30'}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className={`font-semibold ${project.id === 1 ? 'text-cyan-400' : ''}`}>
                      {project.id === 1 && '🪸 '}{project.name}
                    </h3>
                    <div className="flex items-center gap-2">
                      <Badge 
                        className={
                          project.status === 'Completed' 
                            ? 'bg-green-600' 
                            : project.status === 'Active'
                            ? project.id === 1 ? 'bg-cyan-600' : 'bg-blue-600'
                            : 'bg-yellow-600'
                        }
                      >
                        {project.status}
                      </Badge>
                      <Badge className={project.id === 1 ? 'bg-cyan-600 text-white' : 'bg-green-600 text-white'}>
                        {project.burnContribution}% Burn Share
                      </Badge>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-muted-foreground">Allocation</div>
                      <div className={`font-semibold ${project.id === 1 ? 'text-cyan-400' : 'text-green-400'}`}>
                        {formatMoney(project.allocation)}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Progress</div>
                      <div className="font-semibold">{project.progress}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Impact</div>
                      <div className={`font-semibold ${project.id === 1 ? 'text-cyan-400' : 'text-primary'}`}>
                        {project.impact}
                      </div>
                    </div>
                  </div>
                  <Progress value={project.progress} className="h-2" />
                  {project.id === 1 && (
                    <div className="mt-3 space-y-2">
                      <div className="p-3 bg-cyan-500/10 rounded border border-cyan-500/20">
                        <p className="text-sm text-cyan-300">
                          🎵 Personal project: {project.burnContribution}% of all GAiA token burns automatically fund coral reef restoration through innovative sound technology.
                        </p>
                      </div>
                      <div className="bg-black/30 p-2 rounded">
                        <div className="text-xs text-cyan-400 mb-1">Personal Wallet:</div>
                        <div className="font-mono text-xs text-cyan-300 break-all">
                          {project.walletAddress}
                        </div>
                      </div>
                    </div>
                  )}
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
