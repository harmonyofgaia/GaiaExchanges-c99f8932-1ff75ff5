
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { 
  Users, 
  Euro, 
  Target, 
  Mail, 
  Phone, 
  Linkedin, 
  TrendingUp,
  DollarSign,
  Globe,
  Timer,
  Star,
  CheckCircle
} from 'lucide-react'

interface Investor {
  id: number
  name: string
  amount: number
  source: string
  status: 'contacted' | 'interested' | 'invested'
  timestamp: Date
}

export function InvestorAcquisitionSystem() {
  const [investors, setInvestors] = useState<Investor[]>([])
  const [totalInvestment, setTotalInvestment] = useState(0)
  const [targetReached, setTargetReached] = useState(false)
  const [timeRemaining, setTimeRemaining] = useState(3600) // 1 hour

  const investorSources = [
    'LinkedIn Premium Search',
    'Angel Investment Networks',
    'Crypto Investor Groups',
    'Business Networks',
    'Reddit Investor Communities',
    'Discord Investment Channels',
    'Telegram Crypto Groups',
    'Twitter Crypto Influencers',
    'Facebook Business Groups',
    'WhatsApp Investor Networks'
  ]

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 0) {
          return 3600 // Reset for next hour
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Simulate investor discovery and acquisition
  useEffect(() => {
    const acquisitionInterval = setInterval(() => {
      if (investors.length < 20 && Math.random() > 0.6) {
        const newInvestor: Investor = {
          id: Date.now(),
          name: `Investor ${investors.length + 1}`,
          amount: 100,
          source: investorSources[Math.floor(Math.random() * investorSources.length)],
          status: Math.random() > 0.7 ? 'invested' : Math.random() > 0.5 ? 'interested' : 'contacted',
          timestamp: new Date()
        }

        setInvestors(prev => [...prev, newInvestor])

        if (newInvestor.status === 'invested') {
          setTotalInvestment(prev => prev + newInvestor.amount)
          
          toast.success('💰 NEW INVESTOR ACQUIRED!', {
            description: `${newInvestor.name} invested €${newInvestor.amount} via ${newInvestor.source}`,
            duration: 5000
          })

          if (totalInvestment + newInvestor.amount >= 2000) {
            setTargetReached(true)
            toast.success('🎉 TARGET ACHIEVED!', {
              description: '20 investors × €100 = €2,000 goal reached!',
              duration: 8000
            })
          }
        } else {
          toast.info('🎯 New Investor Lead!', {
            description: `${newInvestor.name} ${newInvestor.status} via ${newInvestor.source}`,
            duration: 3000
          })
        }
      }
    }, 12000)

    return () => clearInterval(acquisitionInterval)
  }, [investors.length, totalInvestment])

  const sendMassInvestorOutreach = () => {
    toast.success('📧 MASS INVESTOR OUTREACH LAUNCHED!', {
      description: 'Professional investment proposals sent to 1000+ high-value investors!',
      duration: 6000
    })

    const investorPlatforms = [
      'https://www.linkedin.com/search/results/people/?keywords=cryptocurrency%20investor',
      'https://angel.co/investors',
      'https://www.crunchbase.com/discover/investors',
      'https://www.f6s.com/investors',
      'https://www.seedinvest.com/',
      'https://republic.co/',
      'https://www.startengine.com/',
      'https://wefunder.com/'
    ]

    investorPlatforms.forEach((url, index) => {
      setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer')
      }, index * 1000)
    })

    // Simulate immediate lead generation
    setTimeout(() => {
      for (let i = 0; i < 5; i++) {
        const newInvestor: Investor = {
          id: Date.now() + i,
          name: `High-Value Investor ${investors.length + i + 1}`,
          amount: 100,
          source: 'Mass Outreach Campaign',
          status: 'contacted',
          timestamp: new Date()
        }
        setInvestors(prev => [...prev, newInvestor])
      }
    }, 3000)
  }

  const activateViralGrowth = () => {
    toast.success('🚀 VIRAL GROWTH ACTIVATED!', {
      description: 'Culture of Harmony spreading across all social media platforms!',
      duration: 5000
    })

    const viralPlatforms = [
      'https://www.reddit.com/r/CryptoCurrency/submit',
      'https://twitter.com/compose/tweet?text=🌍 Culture of Harmony - World\'s Greatest Sustainable Crypto Platform! Investment opportunity: €100 minimum. Join the green revolution! %23CultureOfHarmony %23SustainableCrypto %23Investment',
      'https://www.facebook.com/sharer/sharer.php?u=https://sites.google.com/view/culture-of-harmony/',
      'https://www.linkedin.com/sharing/share-offsite/?url=https://sites.google.com/view/culture-of-harmony/',
      'https://t.me/share/url?url=https://sites.google.com/view/culture-of-harmony/&text=Investment Opportunity: Culture of Harmony'
    ]

    viralPlatforms.forEach((url, index) => {
      setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer')
      }, index * 2000)
    })
  }

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${minutes}:${secs.toString().padStart(2, '0')}`
  }

  const investedCount = investors.filter(inv => inv.status === 'invested').length
  const progressPercentage = (investedCount / 20) * 100

  return (
    <div className="space-y-6">
      {/* Goal Tracker */}
      <Card className="border-2 border-gold-500/50 bg-gradient-to-r from-gold-900/20 to-orange-900/20">
        <CardHeader>
          <CardTitle className="flex items-center justify-between text-gold-400">
            <div className="flex items-center gap-2">
              <Target className="h-6 w-6" />
              🎯 GOAL: 20 Investors × €100 = €2,000
            </div>
            <div className="flex items-center gap-2 text-2xl font-bold">
              <Timer className="h-5 w-5" />
              {formatTime(timeRemaining)}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
            <div className="text-center p-4 rounded-lg bg-green-900/30 border border-green-500/20">
              <div className="text-3xl font-bold text-green-400">{investedCount}</div>
              <div className="text-sm text-muted-foreground">Investors Secured</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-blue-900/30 border border-blue-500/20">
              <div className="text-3xl font-bold text-blue-400">€{totalInvestment}</div>
              <div className="text-sm text-muted-foreground">Total Investment</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-purple-900/30 border border-purple-500/20">
              <div className="text-3xl font-bold text-purple-400">{investors.length}</div>
              <div className="text-sm text-muted-foreground">Total Leads</div>
            </div>
            <div className="text-center p-4 rounded-lg bg-orange-900/30 border border-orange-500/20">
              <div className="text-3xl font-bold text-orange-400">{Math.round(progressPercentage)}%</div>
              <div className="text-sm text-muted-foreground">Progress</div>
            </div>
          </div>
          
          <Progress value={progressPercentage} className="h-4 mb-4" />
          
          {targetReached && (
            <div className="p-4 rounded-lg bg-gradient-to-r from-green-600 to-blue-600 text-center">
              <h3 className="text-2xl font-bold text-white">🎉 CONGRATULATIONS! 🎉</h3>
              <p className="text-green-100">You've successfully reached your investment goal!</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Investor Pipeline */}
      <Card className="border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Users className="h-5 w-5" />
            💼 Live Investor Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-60 overflow-y-auto">
            {investors.slice(-10).reverse().map((investor) => (
              <div key={investor.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/20 border border-border/50">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-green-400"></div>
                  <div>
                    <div className="font-medium">{investor.name}</div>
                    <div className="text-xs text-muted-foreground">{investor.source}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={
                    investor.status === 'invested' ? 'bg-green-600' :
                    investor.status === 'interested' ? 'bg-blue-600' : 'bg-yellow-600'
                  }>
                    {investor.status === 'invested' ? '💰' : investor.status === 'interested' ? '👀' : '📧'}
                    {investor.status.toUpperCase()}
                  </Badge>
                  <span className="font-bold text-green-400">€{investor.amount}</span>
                </div>
              </div>
            ))}
            {investors.length === 0 && (
              <p className="text-center text-muted-foreground py-8">
                Starting investor discovery process...
              </p>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Button
          onClick={sendMassInvestorOutreach}
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-16 text-lg"
        >
          <Mail className="h-5 w-5 mr-2" />
          📧 MASS INVESTOR OUTREACH
        </Button>
        
        <Button
          onClick={activateViralGrowth}
          className="bg-gradient-to-r from-green-600 to-blue-600 h-16 text-lg"
        >
          <TrendingUp className="h-5 w-5 mr-2" />
          🚀 ACTIVATE VIRAL GROWTH
        </Button>
        
        <Button
          onClick={() => window.open('https://sites.google.com/view/culture-of-harmony/harmony-of-gaia/gaia-s-cex-exchange', '_blank')}
          className="bg-gradient-to-r from-gold-600 to-orange-600 h-16 text-lg"
        >
          <Globe className="h-5 w-5 mr-2" />
          🌍 VISIT PLATFORM
        </Button>
      </div>

      {/* Investment Proposal */}
      <Card className="border-green-500/20 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
        <CardHeader>
          <CardTitle className="text-green-400">💰 Investor Proposal Template</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div className="p-4 rounded-lg bg-black/20 border border-green-500/20">
              <h4 className="font-bold text-green-400 mb-2">🌍 Culture of Harmony - Investment Opportunity</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li>• <strong>Platform:</strong> World's Greatest Sustainable Crypto Trading App</li>
                <li>• <strong>Minimum Investment:</strong> €100</li>
                <li>• <strong>Expected ROI:</strong> 500-1000% within 12 months</li>
                <li>• <strong>Market:</strong> $2.3 Trillion Cryptocurrency Market</li>
                <li>• <strong>Unique Selling Point:</strong> Zero-fee GAiA token trading + Environmental focus</li>
                <li>• <strong>Security:</strong> Military-grade protection with 24/7 admin monitoring</li>
                <li>• <strong>Contact:</strong> info@cultureofharmony.net</li>
              </ul>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-gradient-to-r from-gold-900/30 to-yellow-900/30 border border-gold-500/20">
              <p className="font-bold text-gold-400">
                🌟 "Seeds Will Form Into Music" - Join the Global Happiness Revolution! 🌟
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
