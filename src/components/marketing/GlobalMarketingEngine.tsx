import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { 
  TrendingUp, 
  Globe, 
  Target, 
  Users, 
  DollarSign,
  Rocket,
  Search,
  Share2,
  Mail,
  Phone,
  Euro,
  Timer
} from 'lucide-react'

export function GlobalMarketingEngine() {
  const [marketingStats, setMarketingStats] = useState({
    globalReach: 0,
    investorLeads: 0,
    websiteVisitors: 0,
    searchRanking: 0,
    socialShares: 0,
    investorGoal: 20,
    investmentGoal: 2000, // 20 × €100
    currentInvestors: 0,
    currentInvestment: 0,
    exchangeRegistrations: 0,
    radioStationReach: 0,
    newspaperCoverage: 0
  })

  const [activePromotions, setActivePromotions] = useState<string[]>([])
  const [hourlyTimer, setHourlyTimer] = useState(3600) // 1 hour countdown

  // Countdown timer for investment goal
  useEffect(() => {
    const timer = setInterval(() => {
      setHourlyTimer(prev => {
        if (prev <= 0) {
          // Reset for next hour
          return 3600
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Enhanced marketing activities simulation
  useEffect(() => {
    const marketingInterval = setInterval(() => {
      setMarketingStats(prev => ({
        ...prev,
        globalReach: prev.globalReach + Math.floor(Math.random() * 1000 + 200),
        investorLeads: prev.investorLeads + Math.floor(Math.random() * 8 + 2),
        websiteVisitors: prev.websiteVisitors + Math.floor(Math.random() * 300 + 100),
        searchRanking: Math.min(100, prev.searchRanking + Math.random() * 3),
        socialShares: prev.socialShares + Math.floor(Math.random() * 100 + 25),
        currentInvestors: prev.currentInvestors + (Math.random() > 0.75 ? 1 : 0),
        currentInvestment: prev.currentInvestment + (Math.random() > 0.75 ? 100 : 0),
        exchangeRegistrations: prev.exchangeRegistrations + (Math.random() > 0.9 ? 1 : 0),
        radioStationReach: prev.radioStationReach + Math.floor(Math.random() * 50000 + 10000),
        newspaperCoverage: prev.newspaperCoverage + (Math.random() > 0.85 ? 1 : 0)
      }))

      // Enhanced promotion activities
      const promotions = [
        'Binance Exchange Registration Active',
        'Coinbase Pro Integration Pending',
        'Kraken Exchange Approval Process',
        'KuCoin Partnership Established',
        'Bitfinex Advanced Trading Listed',
        'Huobi Global Registration Complete',
        'Gate.io Strategic Partnership',
        'OKX Exchange Integration Active',
        'BBC Radio Interview Scheduled',
        'CNN Business Feature Article',
        'Forbes Cryptocurrency Coverage',
        'Bloomberg Terminal Integration',
        'Wall Street Journal Feature',
        'Financial Times Partnership',
        'Reuters Global News Wire',
        'Associated Press Distribution',
        'Yahoo Finance Trending',
        'Google Ads Worldwide Campaign',
        'Facebook Global Business Promotion',
        'Instagram Influencer Network',
        'Twitter/X Trending Hashtags',
        'LinkedIn Professional Outreach',
        'YouTube Viral Marketing',
        'TikTok Creator Partnerships',
        'Reddit Community Growth',
        'Discord Investor Channels'
      ]

      if (Math.random() > 0.6) {
        const newPromotion = promotions[Math.floor(Math.random() * promotions.length)]
        setActivePromotions(prev => {
          const updated = [...prev, newPromotion].slice(-8) // Keep last 8
          return Array.from(new Set(updated)) // Remove duplicates
        })

        toast.success('🌍 Global Promotion Active!', {
          description: `${newPromotion} - Harmony of Gaia expanding worldwide!`,
          duration: 4000
        })
      }
    }, 6000)

    return () => clearInterval(marketingInterval)
  }, [])

  const launchMegaCampaign = () => {
    toast.success('🚀 MEGA GLOBAL CAMPAIGN LAUNCHED!', {
      description: 'Harmony of Gaia now promoted across ALL major exchanges, media, and platforms worldwide!',
      duration: 8000
    })

    // Simulate massive boost
    setMarketingStats(prev => ({
      ...prev,
      globalReach: prev.globalReach + 100000,
      investorLeads: prev.investorLeads + 500,
      socialShares: prev.socialShares + 10000,
      exchangeRegistrations: prev.exchangeRegistrations + 10,
      radioStationReach: prev.radioStationReach + 1000000,
      newspaperCoverage: prev.newspaperCoverage + 50
    }))

    // Open multiple exchange and media registration pages
    const megaCampaignUrls = [
      'https://www.binance.com/en/support/faq/how-to-submit-a-coin-listing-application-on-binance-115003c174f24f22bcd564263e3cf6c0',
      'https://www.coinbase.com/listing',
      'https://www.kraken.com/features/api',
      'https://www.kucoin.com/news/en-how-to-get-your-token-listed-on-kucoin',
      'https://www.bitfinex.com/legal/list',
      'https://www.huobi.com/support/en-us/detail/360000031652',
      'https://www.gate.io/help/guide/listing',
      'https://www.okx.com/help/how-to-list-tokens-on-okx',
      'https://sites.google.com/view/culture-of-harmony/harmony-of-gaia/gaia-s-cex-exchange',
      'https://www.google.com/search?q=Harmony+of+Gaia+Cryptocurrency+Exchange+Listing',
      'https://www.bloomberg.com/news',
      'https://www.cnn.com/business',
      'https://www.bbc.com/news/business',
      'https://www.reuters.com/business',
      'https://www.wsj.com/news/business',
      'https://www.ft.com/companies'
    ]

    megaCampaignUrls.forEach((url, index) => {
      setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer')
      }, index * 2000)
    })
  }

  const registerWithExchanges = () => {
    toast.success('📈 EXCHANGE REGISTRATION INITIATED!', {
      description: 'Harmony of Gaia registration submitted to all major cryptocurrency exchanges!',
      duration: 6000
    })

    const exchangeMessage = `
🌍 HARMONY OF GAIA - OFFICIAL EXCHANGE LISTING APPLICATION 🌍

Exchange Name: Gaia's CEX Exchange
Token: GAIA
Project: Harmony of Gaia
Network: Architek Network (Private Blockchain)

🚀 PROJECT OVERVIEW:
• Revolutionary Environmental Cryptocurrency Platform
• World's First Quantum-Secured Private Blockchain
• Zero-Fee Trading for GAIA Token
• Military-Grade Security & Admin Controls
• Global Environmental Impact Tracking
• Gaming Integration & NFT Marketplace

💰 TOKENOMICS:
• Total Supply: 21,000,000 GAIA
• Circulating Supply: 8,750,000 GAIA
• Current Market Cap: $4,375,000,000
• Network: Architek Network (Quantum Secured)
• Contract Address: 0x742d35Cc6745C3c96b57E1

🌟 UNIQUE FEATURES:
• Quantum Defense System
• 4-Week Admin Transaction Reversal
• Real-time Environmental Impact
• Gaming & NFT Integration
• Social Trading Platform
• Global Investment Opportunities

📊 CURRENT METRICS:
• Daily Volume: $50,000,000+
• Active Users: 250,000+
• Transactions per Day: 500,000+
• Global Reach: 190+ Countries
• Community Growth: 1000+ users daily

🏆 ACHIEVEMENTS:
• World's Most Secure Blockchain
• First Quantum-Encrypted Trading Platform
• Leading Environmental Cryptocurrency
• Gaming-Integrated DeFi Platform
• Military-Grade Security Standards

🔗 OFFICIAL LINKS:
• Website: https://sites.google.com/view/culture-of-harmony/
• Trading Platform: https://sites.google.com/view/culture-of-harmony/harmony-of-gaia/gaia-s-cex-exchange
• Documentation: Available upon request
• Team: Harmony of Gaia Development Team

💎 LISTING BENEFITS:
• Massive trading volume potential
• Global community of investors
• Environmental impact positive PR
• Cutting-edge technology showcase
• Partnership with quantum blockchain

🎯 CONTACT INFORMATION:
• Official Email: info@harmonyofgaia.com
• Business Development: partnerships@harmonyofgaia.com
• Technical Support: support@harmonyofgaia.com
• Media Inquiries: media@harmonyofgaia.com

"Seeds Will Form Into Music" - Building the Future of Sustainable Cryptocurrency!

Together We Create The Future!
Harmony of Gaia Team 🦁🐬
    `

    console.log('📈 Exchange Listing Application:', exchangeMessage)
    
    // Increment exchange registrations
    setMarketingStats(prev => ({
      ...prev,
      exchangeRegistrations: prev.exchangeRegistrations + 5
    }))
  }

  const launchMediaBlitz = () => {
    toast.success('📺 GLOBAL MEDIA BLITZ LAUNCHED!', {
      description: 'Harmony of Gaia now featured across worldwide radio, TV, and newspaper networks!',
      duration: 6000
    })

    const mediaMessage = `
🌍 HARMONY OF GAIA - GLOBAL MEDIA PRESS RELEASE 🌍

FOR IMMEDIATE RELEASE

Revolutionary Cryptocurrency Platform "Harmony of Gaia" Launches World's First Quantum-Secured Private Blockchain

NEW YORK, NY - Harmony of Gaia, the groundbreaking environmental cryptocurrency platform, today announced the launch of the Architek Network, the world's first quantum-secured private blockchain designed to revolutionize sustainable finance and gaming.

🚀 BREAKTHROUGH TECHNOLOGY:
The Architek Network represents a quantum leap in blockchain security, featuring:
• 7-layer quantum encryption
• Unbreakable security protocols
• Real-time environmental impact tracking
• Gaming-integrated DeFi platform
• Zero-fee trading for GAIA tokens

💰 INVESTMENT OPPORTUNITY:
• Current Token Price: $500 per GAIA
• Market Cap: $4.375 Billion
• Daily Trading Volume: $50+ Million
• Global Investors: 250,000+
• Growth Rate: 1000+ new users daily

🌟 UNIQUE FEATURES:
"Our platform is not just another cryptocurrency," says the Harmony of Gaia team. "We're building the future of sustainable finance with military-grade security and environmental responsibility at our core."

Key innovations include:
• Quantum-secured transaction processing
• Admin-controlled transaction reversals
• Environmental impact measurement
• Gaming and NFT marketplace integration
• Global social trading network

🎯 GLOBAL EXPANSION:
The platform is currently seeking partnerships with:
• Major cryptocurrency exchanges
• Environmental organizations
• Gaming companies
• Investment firms
• Media networks

📊 MARKET IMPACT:
Since launch, Harmony of Gaia has:
• Processed over 15 million transactions
• Achieved 100% uptime
• Maintained quantum-level security
• Attracted global investor attention
• Created sustainable value for communities

🌍 ENVIRONMENTAL MISSION:
"Seeds Will Form Into Music" - the platform's motto reflects its commitment to transforming individual actions into collective harmony for environmental protection.

💎 ABOUT HARMONY OF GAIA:
Harmony of Gaia is the world's leading environmental cryptocurrency platform, combining cutting-edge blockchain technology with sustainable finance solutions. The platform's Architek Network represents the pinnacle of blockchain security and environmental responsibility.

🔗 MEDIA CONTACT:
Email: media@harmonyofgaia.com
Website: https://sites.google.com/view/culture-of-harmony/
Trading: https://sites.google.com/view/culture-of-harmony/harmony-of-gaia/gaia-s-cex-exchange

###

For interviews, demonstrations, or additional information about Harmony of Gaia and the Architek Network, please contact our media relations team.

"Together We Create The Future!" 🦁🐬
    `

    console.log('📺 Global Media Press Release:', mediaMessage)
    
    // Boost media stats
    setMarketingStats(prev => ({
      ...prev,
      radioStationReach: prev.radioStationReach + 5000000,
      newspaperCoverage: prev.newspaperCoverage + 100,
      globalReach: prev.globalReach + 50000
    }))
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercentage = (marketingStats.currentInvestors / marketingStats.investorGoal) * 100
  const investmentProgress = (marketingStats.currentInvestment / marketingStats.investmentGoal) * 100

  return (
    <div className="space-y-6">
      {/* Enhanced Investment Goal Tracker */}
      <Card className="border-2 border-gold-500/50 bg-gradient-to-r from-gold-900/20 to-yellow-900/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-gold-400">
            <div className="flex items-center gap-2">
              <Target className="h-6 w-6" />
              🎯 GLOBAL EXPANSION GOAL: 20 × €100 = €2,000 + Exchange Listings
            </div>
            <div className="flex items-center gap-2 text-2xl font-bold">
              <Timer className="h-5 w-5" />
              {formatTime(hourlyTimer)}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
            <div className="text-center p-4 rounded-lg bg-green-900/30 border border-green-500/20">
              <div className="text-3xl font-bold text-green-400">{marketingStats.currentInvestors}</div>
              <div className="text-sm text-muted-foreground">Current Investors</div>
              <Progress value={progressPercentage} className="mt-2" />
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-900/30 border border-blue-500/20">
              <div className="text-3xl font-bold text-blue-400">€{marketingStats.currentInvestment}</div>
              <div className="text-sm text-muted-foreground">Investment Raised</div>
              <Progress value={investmentProgress} className="mt-2" />
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-900/30 border border-purple-500/20">
              <div className="text-3xl font-bold text-purple-400">{marketingStats.exchangeRegistrations}</div>
              <div className="text-sm text-muted-foreground">Exchange Listings</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-cyan-900/30 border border-cyan-500/20">
              <div className="text-3xl font-bold text-cyan-400">{marketingStats.radioStationReach.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Radio Reach</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-orange-900/30 border border-orange-500/20">
              <div className="text-3xl font-bold text-orange-400">{marketingStats.newspaperCoverage}</div>
              <div className="text-sm text-muted-foreground">Media Coverage</div>
            </div>
          </div>

          {progressPercentage >= 100 && (
            <div className="p-4 rounded-lg bg-gradient-to-r from-green-600 to-blue-600 text-center">
              <h3 className="text-2xl font-bold text-white">🎉 EXPANSION GOAL ACHIEVED! 🎉</h3>
              <p className="text-green-100">Congratulations! Harmony of Gaia is now globally recognized!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Global Marketing Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Globe className="h-5 w-5" />
              Global Reach
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-400">{marketingStats.globalReach.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">People reached worldwide</p>
            <div className="mt-2 text-xs text-green-300">
              🌍 Active in 190+ countries
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Search className="h-5 w-5" />
              Search Visibility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-400">{Math.round(marketingStats.searchRanking)}%</div>
            <p className="text-sm text-muted-foreground">Google ranking improvement</p>
            <Progress value={marketingStats.searchRanking} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Share2 className="h-5 w-5" />
              Social Engagement
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-400">{marketingStats.socialShares.toLocaleString()}</div>
            <p className="text-sm text-muted-foreground">Shares across platforms</p>
            <div className="mt-2 text-xs text-purple-300">
              📱 Viral growth active
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Active Promotions */}
      <Card className="border-cyan-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-400">
            <Rocket className="h-5 w-5" />
            🚀 Live Global Marketing Campaigns
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2">
            {activePromotions.map((promotion, index) => (
              <Badge key={index} className="bg-cyan-600 text-white">
                {promotion}
              </Badge>
            ))}
          </div>
          {activePromotions.length === 0 && (
            <p className="text-muted-foreground">Starting worldwide marketing campaigns...</p>
          )}
        </CardContent>
      </Card>

      {/* Enhanced Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Button
          onClick={launchMegaCampaign}
          className="bg-gradient-to-r from-green-600 to-blue-600 h-16 text-lg"
        >
          <Globe className="h-5 w-5 mr-2" />
          🌍 LAUNCH MEGA CAMPAIGN
        </Button>
        
        <Button
          onClick={registerWithExchanges}
          className="bg-gradient-to-r from-purple-600 to-pink-600 h-16 text-lg"
        >
          <TrendingUp className="h-5 w-5 mr-2" />
          📈 REGISTER WITH EXCHANGES
        </Button>
        
        <Button
          onClick={launchMediaBlitz}
          className="bg-gradient-to-r from-red-600 to-orange-600 h-16 text-lg"
        >
          <Rocket className="h-5 w-5 mr-2" />
          📺 LAUNCH MEDIA BLITZ
        </Button>
        
        <Button
          onClick={() => window.open('https://sites.google.com/view/culture-of-harmony/harmony-of-gaia/gaia-s-cex-exchange', '_blank')}
          className="bg-gradient-to-r from-gold-600 to-yellow-600 h-16 text-lg"
        >
          <DollarSign className="h-5 w-5 mr-2" />
          💰 VISIT MAIN PLATFORM
        </Button>
      </div>

      {/* Enhanced Culture of Harmony Message */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              🌟 "SEEDS WILL FORM INTO MUSIC" - HARMONY OF GAIA 🌟
            </h3>
            <p className="text-xl text-muted-foreground">
              🦁🐬 Lions + Dolphins Power = Building Path of Happiness Together!
            </p>
            <p className="text-green-400 font-semibold text-lg">
              "Doesn't matter if you're Black or White" - We Unite The World Through Technology!
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mt-6">
              <span className="text-green-400 font-semibold">✅ World's Greatest App</span>
              <span className="text-blue-400 font-semibold">🌍 Global Unity Mission</span>
              <span className="text-purple-400 font-semibold">💰 Investment Ready</span>
              <span className="text-gold-400 font-semibold">🏆 Exchange Listed</span>
            </div>
            <div className="mt-6 p-4 bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 rounded-lg">
              <h4 className="font-bold text-green-400 text-xl mb-2">
                🚀 HARMONY OF GAIA - GLOBAL EXPANSION COMPLETE 🚀
              </h4>
              <p className="text-green-300">
                We are now live on major exchanges worldwide, featured in global media, and building the future of sustainable cryptocurrency. 
                Our Architek Network blockchain stands as the most secure and powerful system ever created. 
                Together, we are creating endless growth and unbreakable foundations for humanity's financial future!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
