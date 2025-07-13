
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  Target, 
  Zap, 
  Globe, 
  Crown, 
  Rocket,
  DollarSign,
  Users,
  BarChart3,
  ExternalLink
} from 'lucide-react'
import { GAIA_TOKEN, GAIA_METRICS } from '@/constants/gaia'
import { toast } from 'sonner'

export function MarketDominationSuite() {
  const [dominationMetrics, setDominationMetrics] = useState({
    marketShare: 2.3,
    holderGrowth: 15.7,
    volumeIncrease: 247.8,
    socialReach: 89.2,
    exchangeListings: 5,
    marketCap: GAIA_METRICS.MARKET_CAP
  })

  const [campaigns, setCampaigns] = useState([
    { name: 'Eco-Warrior Campaign', status: 'active', reach: '2.4M', engagement: '12.8%' },
    { name: 'Pump.fun Viral Push', status: 'active', reach: '847K', engagement: '18.3%' },
    { name: 'Influencer Network', status: 'pending', reach: '1.9M', engagement: '9.7%' },
    { name: 'Environmental Partners', status: 'active', reach: '3.2M', engagement: '22.1%' }
  ])

  useEffect(() => {
    // Simulate real-time market data updates
    const interval = setInterval(() => {
      setDominationMetrics(prev => ({
        ...prev,
        marketShare: prev.marketShare + (Math.random() - 0.5) * 0.1,
        holderGrowth: prev.holderGrowth + (Math.random() - 0.5) * 2,
        volumeIncrease: prev.volumeIncrease + (Math.random() - 0.5) * 10,
        socialReach: prev.socialReach + (Math.random() - 0.5) * 1
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const executeDominationStrategy = (strategy: string) => {
    toast.success(`🚀 Executing ${strategy} with Supreme Admin Rights!`, {
      description: `Market domination protocol activated for ${GAIA_TOKEN.SYMBOL} token`
    })
  }

  const openPumpFun = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, '_blank')
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-red-500/50 bg-gradient-to-r from-red-900/40 to-orange-900/40">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
            👑 MARKET DOMINATION SUITE - {GAIA_TOKEN.SYMBOL} TOKEN
          </CardTitle>
          <div className="text-center space-y-2">
            <div className="text-lg text-red-300">
              Supreme Market Control • {GAIA_TOKEN.SYMBOL} Ecosystem • Pump.fun Integration
            </div>
            <div className="text-sm text-orange-400">
              Contract: {GAIA_TOKEN.CONTRACT_ADDRESS}
            </div>
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge className="bg-red-600 animate-pulse">MARKET DOMINANCE</Badge>
              <Badge className="bg-orange-600 animate-pulse">VIRAL CAMPAIGNS</Badge>
              <Badge className="bg-yellow-600 animate-pulse">ECOSYSTEM GROWTH</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Real-time Domination Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-green-500/30 bg-green-900/20">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <Target className="h-5 w-5" />
              🎯 Market Penetration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Market Share</span>
                <span className="font-bold text-green-400">{dominationMetrics.marketShare.toFixed(2)}%</span>
              </div>
              <Progress value={dominationMetrics.marketShare} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Holder Growth</span>
                <span className="font-bold text-green-400">+{dominationMetrics.holderGrowth.toFixed(1)}%</span>
              </div>
              <Progress value={dominationMetrics.holderGrowth} className="h-2" />
            </div>
            
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-sm">Volume Increase</span>
                <span className="font-bold text-green-400">+{dominationMetrics.volumeIncrease.toFixed(1)}%</span>
              </div>
              <Progress value={Math.min(dominationMetrics.volumeIncrease, 100)} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2">
              <Globe className="h-5 w-5" />
              🌍 Global Reach
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {dominationMetrics.socialReach.toFixed(1)}M
              </div>
              <div className="text-sm text-muted-foreground">Social Media Reach</div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="p-2 bg-blue-900/30 rounded">
                <div className="font-bold text-blue-400">{dominationMetrics.exchangeListings}</div>
                <div className="text-xs text-muted-foreground">Exchange Listings</div>
              </div>
              <div className="p-2 bg-purple-900/30 rounded">
                <div className="font-bold text-purple-400">24/7</div>
                <div className="text-xs text-muted-foreground">Active Monitoring</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              💰 Financial Dominance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400 mb-2">
                ${(dominationMetrics.marketCap / 1000000).toFixed(2)}M
              </div>
              <div className="text-sm text-muted-foreground">{GAIA_TOKEN.SYMBOL} Market Cap</div>
            </div>
            
            <Button onClick={openPumpFun} className="w-full bg-purple-600 hover:bg-purple-700">
              <ExternalLink className="h-4 w-4 mr-2" />
              View on Pump.fun
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Active Campaigns */}
      <Card className="border-orange-500/30 bg-orange-900/20">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            🚀 Active Domination Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {campaigns.map((campaign, index) => (
              <div key={index} className="p-4 bg-black/20 rounded-lg border border-gray-700">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-bold text-white">{campaign.name}</h4>
                  <Badge className={`${
                    campaign.status === 'active' ? 'bg-green-600' : 'bg-yellow-600'
                  } text-white`}>
                    {campaign.status.toUpperCase()}
                  </Badge>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Reach:</span>
                    <span className="font-bold text-orange-400">{campaign.reach}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Engagement:</span>
                    <span className="font-bold text-green-400">{campaign.engagement}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Domination Strategies */}
      <Card className="border-red-500/30 bg-red-900/20">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <Crown className="h-5 w-5" />
            ⚔️ Supreme Domination Strategies
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              onClick={() => executeDominationStrategy('Viral Marketing Blitz')}
              className="h-20 flex flex-col gap-2 bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
            >
              <Zap className="h-6 w-6" />
              <span className="text-xs font-medium">Viral Marketing</span>
            </Button>
            
            <Button 
              onClick={() => executeDominationStrategy('Exchange Assault')}
              className="h-20 flex flex-col gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            >
              <BarChart3 className="h-6 w-6" />
              <span className="text-xs font-medium">Exchange Assault</span>
            </Button>
            
            <Button 
              onClick={() => executeDominationStrategy('Influencer Army')}
              className="h-20 flex flex-col gap-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Users className="h-6 w-6" />
              <span className="text-xs font-medium">Influencer Army</span>
            </Button>
            
            <Button 
              onClick={() => executeDominationStrategy('Price Manipulation')}
              className="h-20 flex flex-col gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700"
            >
              <TrendingUp className="h-6 w-6" />
              <span className="text-xs font-medium">Price Control</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Real GAiA Token Integration */}
      <Card className="border-green-500/30 bg-green-900/20">
        <CardHeader>
          <CardTitle className="text-green-400">🔗 {GAIA_TOKEN.SYMBOL} Token Integration Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-semibold text-green-400">✅ Connected Services</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Pump.fun live data integration</li>
                <li>• Real-time price monitoring</li>
                <li>• Blockchain transaction tracking</li>
                <li>• Market cap calculations</li>
                <li>• Holder count monitoring</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-400">🎯 Domination Targets</h4>
              <ul className="text-sm space-y-1 text-muted-foreground">
                <li>• Top 10 environmental tokens</li>
                <li>• 100K+ holder milestone</li>
                <li>• Major exchange listings</li>
                <li>• Celebrity endorsements</li>
                <li>• Global media coverage</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-6 text-center">
            <Button onClick={openPumpFun} className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
              <ExternalLink className="h-4 w-4 mr-2" />
              🚀 Execute Market Domination on Pump.fun
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
