
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  TrendingUp, 
  Globe, 
  Newspaper, 
  Share2, 
  Target,
  Zap,
  Crown,
  Rocket
} from 'lucide-react'
import { toast } from 'sonner'

interface MarketingCampaign {
  name: string
  status: 'active' | 'pending' | 'completed'
  progress: number
  reach: number
  engagement: number
  emoji: string
}

interface ListingPlatform {
  name: string
  status: 'submitted' | 'approved' | 'pending' | 'active'
  priority: 'high' | 'medium' | 'low'
  impact: number
  emoji: string
}

export function MarketDominationSuite() {
  const [campaigns, setCampaigns] = useState<MarketingCampaign[]>([
    { name: 'CoinGecko Submission', status: 'active', progress: 85, reach: 2500000, engagement: 15.7, emoji: '🦎' },
    { name: 'CoinMarketCap Listing', status: 'pending', progress: 70, reach: 5000000, engagement: 12.3, emoji: '📊' },
    { name: 'Social Media Blitz', status: 'active', progress: 92, reach: 1200000, engagement: 28.4, emoji: '📱' },
    { name: 'Influencer Network', status: 'completed', progress: 100, reach: 800000, engagement: 34.2, emoji: '👑' },
    { name: 'Press Release Campaign', status: 'active', progress: 60, reach: 3200000, engagement: 8.9, emoji: '📰' },
    { name: 'YouTube Partnerships', status: 'pending', progress: 45, reach: 1800000, engagement: 22.1, emoji: '📺' },
    { name: 'Podcast Tour', status: 'active', progress: 75, reach: 650000, engagement: 41.2, emoji: '🎙️' },
    { name: 'Reddit Domination', status: 'completed', progress: 100, reach: 2100000, engagement: 19.8, emoji: '🤖' }
  ])

  const [listings, setListings] = useState<ListingPlatform[]>([
    { name: 'Binance', status: 'submitted', priority: 'high', impact: 95, emoji: '🏛️' },
    { name: 'Coinbase', status: 'pending', priority: 'high', impact: 92, emoji: '🔷' },
    { name: 'Kraken', status: 'approved', priority: 'high', impact: 78, emoji: '🐙' },
    { name: 'KuCoin', status: 'active', priority: 'medium', impact: 65, emoji: '🔥' },
    { name: 'Gate.io', status: 'submitted', priority: 'medium', impact: 58, emoji: '🚪' },
    { name: 'Huobi', status: 'pending', priority: 'medium', impact: 72, emoji: '🌟' },
    { name: 'FTX', status: 'submitted', priority: 'low', impact: 45, emoji: '⚡' },
    { name: 'Bitfinex', status: 'approved', priority: 'medium', impact: 55, emoji: '💎' }
  ])

  const [totalReach, setTotalReach] = useState(0)
  const [totalEngagement, setTotalEngagement] = useState(0)

  useEffect(() => {
    const reach = campaigns.reduce((sum, campaign) => sum + campaign.reach, 0)
    const avgEngagement = campaigns.reduce((sum, campaign) => sum + campaign.engagement, 0) / campaigns.length
    
    setTotalReach(reach)
    setTotalEngagement(avgEngagement)

    console.log('📈 MARKET DOMINATION SUITE - GLOBAL REACH ACTIVE')
    console.log(`🌍 Total Reach: ${reach.toLocaleString()}`)
    console.log(`💯 Average Engagement: ${avgEngagement.toFixed(1)}%`)
  }, [campaigns])

  const launchGlobalCampaign = () => {
    console.log('🚀 LAUNCHING GLOBAL DOMINATION CAMPAIGN')
    console.log('📡 Activating all marketing channels simultaneously')
    
    toast.success('🚀 GLOBAL CAMPAIGN LAUNCHED!', {
      description: 'All marketing channels activated - GAiA domination initiated',
      duration: 8000
    })

    // Simulate campaign progress updates
    const interval = setInterval(() => {
      setCampaigns(prev => prev.map(campaign => ({
        ...campaign,
        progress: Math.min(100, campaign.progress + Math.random() * 5),
        reach: campaign.reach + Math.floor(Math.random() * 50000),
        engagement: campaign.engagement + (Math.random() - 0.5) * 2
      })))
    }, 2000)

    setTimeout(() => clearInterval(interval), 20000)
  }

  const submitToAllExchanges = () => {
    console.log('💰 SUBMITTING TO ALL MAJOR EXCHANGES')
    console.log('📋 Auto-generating compliance documents')
    
    toast.success('💰 EXCHANGE SUBMISSIONS INITIATED!', {
      description: 'GAiA token submitted to all major exchanges',
      duration: 6000
    })

    setListings(prev => prev.map(listing => ({
      ...listing,
      status: listing.status === 'pending' ? 'submitted' : listing.status
    })))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': case 'approved': return 'bg-green-600'
      case 'pending': case 'submitted': return 'bg-yellow-600'
      case 'completed': return 'bg-blue-600'
      default: return 'bg-gray-600'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-400'
      case 'medium': return 'text-yellow-400'
      case 'low': return 'text-green-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-gold-500/30 bg-gradient-to-r from-yellow-900/30 to-orange-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <Crown className="h-6 w-6" />
            👑 MARKET DOMINATION SUITE - GLOBAL CONQUEST
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-yellow-900/30 rounded-lg">
              <Globe className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-yellow-400">{totalReach.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Global Reach</div>
            </div>
            
            <div className="text-center p-4 bg-green-900/30 rounded-lg">
              <TrendingUp className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">{totalEngagement.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Engagement Rate</div>
            </div>
            
            <div className="text-center p-4 bg-blue-900/30 rounded-lg">
              <Target className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">{campaigns.length}</div>
              <div className="text-sm text-muted-foreground">Active Campaigns</div>
            </div>
            
            <div className="text-center p-4 bg-purple-900/30 rounded-lg">
              <Rocket className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">{listings.length}</div>
              <div className="text-sm text-muted-foreground">Exchange Listings</div>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <Button 
              onClick={launchGlobalCampaign}
              className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
            >
              <Rocket className="h-4 w-4 mr-2" />
              LAUNCH GLOBAL CAMPAIGN
            </Button>
            
            <Button 
              onClick={submitToAllExchanges}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
            >
              <TrendingUp className="h-4 w-4 mr-2" />
              SUBMIT TO ALL EXCHANGES
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardHeader>
            <CardTitle className="text-blue-400">📢 MARKETING CAMPAIGNS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {campaigns.map((campaign, index) => (
                <div key={index} className="p-3 bg-black/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{campaign.emoji}</span>
                      <span className="font-semibold text-white">{campaign.name}</span>
                    </div>
                    <Badge className={`${getStatusColor(campaign.status)} text-white text-xs`}>
                      {campaign.status.toUpperCase()}
                    </Badge>
                  </div>
                  
                  <Progress value={campaign.progress} className="h-2 mb-2" />
                  
                  <div className="grid grid-cols-3 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Progress:</span>
                      <span className="text-blue-400 ml-1">{campaign.progress}%</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Reach:</span>
                      <span className="text-green-400 ml-1">{(campaign.reach / 1000000).toFixed(1)}M</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Engagement:</span>
                      <span className="text-yellow-400 ml-1">{campaign.engagement.toFixed(1)}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardHeader>
            <CardTitle className="text-purple-400">🏛️ EXCHANGE LISTINGS</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {listings.map((listing, index) => (
                <div key={index} className="p-3 bg-black/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{listing.emoji}</span>
                      <span className="font-semibold text-white">{listing.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={`${getStatusColor(listing.status)} text-white text-xs`}>
                        {listing.status.toUpperCase()}
                      </Badge>
                      <Badge className={`bg-gray-800 ${getPriorityColor(listing.priority)} text-xs`}>
                        {listing.priority.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="text-xs">
                      <span className="text-muted-foreground">Impact Score:</span>
                      <span className="text-purple-400 ml-1">{listing.impact}/100</span>
                    </div>
                    <Progress value={listing.impact} className="h-2 w-24" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
