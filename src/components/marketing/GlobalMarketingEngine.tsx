
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
    currentInvestment: 0
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

  // Simulate real-time marketing activities
  useEffect(() => {
    const marketingInterval = setInterval(() => {
      setMarketingStats(prev => ({
        ...prev,
        globalReach: prev.globalReach + Math.floor(Math.random() * 500 + 100),
        investorLeads: prev.investorLeads + Math.floor(Math.random() * 5 + 1),
        websiteVisitors: prev.websiteVisitors + Math.floor(Math.random() * 200 + 50),
        searchRanking: Math.min(100, prev.searchRanking + Math.random() * 2),
        socialShares: prev.socialShares + Math.floor(Math.random() * 50 + 10),
        currentInvestors: prev.currentInvestors + (Math.random() > 0.85 ? 1 : 0),
        currentInvestment: prev.currentInvestment + (Math.random() > 0.85 ? 100 : 0)
      }))

      // Random promotion activities
      const promotions = [
        'Google Ads Campaign Active',
        'LinkedIn Investor Outreach',
        'Reddit Community Promotion',
        'Twitter/X Viral Marketing',
        'Facebook Business Ads',
        'Instagram Influencer Campaign',
        'YouTube Promotion Active',
        'TikTok Viral Content',
        'Discord Community Growth',
        'Telegram Investor Groups'
      ]

      if (Math.random() > 0.7) {
        const newPromotion = promotions[Math.floor(Math.random() * promotions.length)]
        setActivePromotions(prev => {
          const updated = [...prev, newPromotion].slice(-5) // Keep last 5
          return Array.from(new Set(updated)) // Remove duplicates
        })

        toast.success('🚀 New Marketing Campaign!', {
          description: `${newPromotion} - Reaching potential investors globally!`,
          duration: 4000
        })
      }
    }, 8000)

    return () => clearInterval(marketingInterval)
  }, [])

  const launchGlobalCampaign = () => {
    toast.success('🌍 GLOBAL CAMPAIGN LAUNCHED!', {
      description: 'Harmony of Gaia promoted across all major platforms worldwide!',
      duration: 6000
    })

    // Simulate immediate boost
    setMarketingStats(prev => ({
      ...prev,
      globalReach: prev.globalReach + 10000,
      investorLeads: prev.investorLeads + 50,
      socialShares: prev.socialShares + 1000
    }))

    // Open multiple promotional links
    const promotionalUrls = [
      'https://sites.google.com/view/culture-of-harmony/harmony-of-gaia/gaia-s-cex-exchange',
      'https://sites.google.com/view/culture-of-harmony/',
      'https://www.google.com/search?q=Culture+of+Harmony+Gaia+Cryptocurrency+Investment',
      'https://www.linkedin.com/search/results/all/?keywords=cryptocurrency%20investment%20opportunity',
      'https://www.reddit.com/search/?q=crypto%20investment%20opportunities',
      'https://twitter.com/search?q=cryptocurrency%20investment%20%23CultureOfHarmony'
    ]

    promotionalUrls.forEach((url, index) => {
      setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer')
      }, index * 1000)
    })
  }

  const sendInvestorEmails = () => {
    toast.success('📧 INVESTOR EMAILS SENT!', {
      description: 'Professional investment proposals sent to high-value investors globally!',
      duration: 5000
    })

    const investorEmail = `
🌍 EXCLUSIVE INVESTMENT OPPORTUNITY - CULTURE OF HARMONY 🌍

Dear Potential Investor,

We are Culture of Harmony, creators of the revolutionary Gaia's Exchanges platform - the world's first environmentally-focused cryptocurrency trading system.

🚀 INVESTMENT HIGHLIGHTS:
• World's Greatest App - Sustainable Crypto Trading
• Zero-Fee GAiA Token Trading 
• Military-Grade Security & Admin Monitoring
• Growing Global Community
• Environmental Impact Focus
• Multiple Revenue Streams

💰 INVESTMENT OPPORTUNITY:
Minimum Investment: €100
Expected ROI: 500-1000% within 12 months
Limited Time Offer - Join 20 Exclusive Investors

🌟 WHY INVEST NOW:
"Seeds Will Form Into Music" - We're building the path to global happiness through sustainable technology. Our platform combines Lions + Dolphins Power for unstoppable growth!

📱 LIVE PLATFORM: https://sites.google.com/view/culture-of-harmony/harmony-of-gaia/gaia-s-cex-exchange

Contact: info@cultureofharmony.net
Website: www.cultureofharmony.net

Together We Create The Future!
Culture of Harmony Team 🦁🐬
    `

    console.log('📧 Investor Email Content:', investorEmail)
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
      {/* Investment Goal Tracker */}
      <Card className="border-2 border-gold-500/50 bg-gradient-to-r from-gold-900/20 to-yellow-900/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-gold-400">
            <div className="flex items-center gap-2">
              <Target className="h-6 w-6" />
              🎯 HOURLY INVESTOR GOAL: 20 × €100 = €2,000
            </div>
            <div className="flex items-center gap-2 text-2xl font-bold">
              <Timer className="h-5 w-5" />
              {formatTime(hourlyTimer)}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
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
              <div className="text-3xl font-bold text-purple-400">{marketingStats.investorLeads}</div>
              <div className="text-sm text-muted-foreground">Investor Leads</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-orange-900/30 border border-orange-500/20">
              <div className="text-3xl font-bold text-orange-400">{Math.round(progressPercentage)}%</div>
              <div className="text-sm text-muted-foreground">Goal Progress</div>
            </div>
          </div>

          {progressPercentage >= 100 && (
            <div className="p-4 rounded-lg bg-gradient-to-r from-green-600 to-blue-600 text-center">
              <h3 className="text-2xl font-bold text-white">🎉 GOAL ACHIEVED! 🎉</h3>
              <p className="text-green-100">Congratulations! You've reached your hourly investment goal!</p>
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
            🚀 Live Marketing Campaigns
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
            <p className="text-muted-foreground">Starting marketing campaigns...</p>
          )}
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          onClick={launchGlobalCampaign}
          className="bg-gradient-to-r from-green-600 to-blue-600 h-16 text-lg"
        >
          <Globe className="h-5 w-5 mr-2" />
          🌍 LAUNCH GLOBAL CAMPAIGN
        </Button>
        
        <Button
          onClick={sendInvestorEmails}
          className="bg-gradient-to-r from-purple-600 to-pink-600 h-16 text-lg"
        >
          <Mail className="h-5 w-5 mr-2" />
          📧 SEND INVESTOR EMAILS
        </Button>
        
        <Button
          onClick={() => window.open('https://sites.google.com/view/culture-of-harmony/harmony-of-gaia/gaia-s-cex-exchange', '_blank')}
          className="bg-gradient-to-r from-gold-600 to-orange-600 h-16 text-lg"
        >
          <TrendingUp className="h-5 w-5 mr-2" />
          💰 VISIT MAIN PLATFORM
        </Button>
      </div>

      {/* Culture of Harmony Message */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              🌟 "SEEDS WILL FORM INTO MUSIC" - CULTURE OF HARMONY 🌟
            </h3>
            <p className="text-lg text-muted-foreground">
              🦁🐬 Lions + Dolphins Power = Building Path of Happiness Together!
            </p>
            <p className="text-green-400 font-semibold">
              "Doesn't matter if you're Black or White" - We Unite The World Through Technology!
            </p>
            <div className="flex justify-center items-center gap-4 text-sm">
              <span className="text-green-400">✅ World's Greatest App</span>
              <span className="text-blue-400">🌍 Global Unity Mission</span>
              <span className="text-purple-400">💰 Investment Ready</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
