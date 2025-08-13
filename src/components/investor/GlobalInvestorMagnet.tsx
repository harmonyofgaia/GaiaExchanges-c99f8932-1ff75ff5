
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { DollarSign, Users, TrendingUp, Globe, Crown, Star, Zap, Target } from 'lucide-react'
import { useState, useEffect } from 'react'
import { toast } from 'sonner'

export function GlobalInvestorMagnet() {
  const [investorInterest, setInvestorInterest] = useState(87)
  const [globalReach, setGlobalReach] = useState(94)
  const [trustScore, setTrustScore] = useState(96)

  useEffect(() => {
    const interval = setInterval(() => {
      setInvestorInterest(prev => Math.min(100, prev + Math.random() * 2))
      setGlobalReach(prev => Math.min(100, prev + Math.random() * 1))
      setTrustScore(prev => Math.min(100, prev + Math.random() * 0.5))
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const attractInvestors = () => {
    toast.success('🌟 GLOBAL INVESTOR SIGNAL SENT!', {
      description: 'Broadcasting to 50,000+ trusted investors worldwide about GAiA opportunities!',
      duration: 5000
    })

    // Open investor platforms
    const investorPlatforms = [
      'https://www.linkedin.com/feed/',
      'https://angel.co/',
      'https://www.crunchbase.com/',
      'https://pitchbook.com/',
      'https://www.foundergroups.com/'
    ]

    investorPlatforms.forEach((url, index) => {
      setTimeout(() => {
        window.open(url, '_blank', 'noopener,noreferrer')
      }, index * 1000)
    })
  }

  const trustedInvestors = [
    {
      name: 'Environmental Impact Fund',
      category: 'Green Technology',
      investment: '€500K - €5M',
      location: 'Netherlands',
      focus: 'Sustainable Blockchain',
      contact: 'impact@envfund.nl'
    },
    {
      name: 'Crypto Venture Partners',
      category: 'Blockchain',
      investment: '€100K - €2M',
      location: 'Germany',
      focus: 'DeFi & Gaming',
      contact: 'invest@cryptovp.de'
    },
    {
      name: 'Future Earth Capital',
      category: 'Climate Tech',
      investment: '€250K - €10M',
      location: 'Switzerland',
      focus: 'Conservation Technology',
      contact: 'opportunities@futureearth.ch'
    },
    {
      name: 'Digital Green Fund',
      category: 'GreenTech',
      investment: '€50K - €1M',
      location: 'Belgium',
      focus: 'Environmental NFTs',
      contact: 'funding@digitalgreen.be'
    },
    {
      name: 'Sustainable Crypto Ventures',
      category: 'Crypto',
      investment: '€100K - €3M',
      location: 'UK',
      focus: 'Eco-Friendly Blockchain',
      contact: 'invest@sustaincrypto.uk'
    }
  ]

  return (
    <Card className="border-gold-500/30 bg-gradient-to-br from-gold-900/30 to-green-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-gold-400 text-2xl">
          <DollarSign className="h-8 w-8" />
          💰 GLOBAL INVESTOR ATTRACTION SYSTEM
        </CardTitle>
        <p className="text-gold-300">
          Attracting the World's Most Trusted Investors to GAiA Conservation Projects
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-green-500/20 bg-green-900/20">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{investorInterest}%</div>
              <div className="text-sm text-green-300">Investor Interest</div>
              <Progress value={investorInterest} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 bg-blue-900/20">
            <CardContent className="p-4 text-center">
              <Globe className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{globalReach}%</div>
              <div className="text-sm text-blue-300">Global Reach</div>
              <Progress value={globalReach} className="mt-2" />
            </CardContent>
          </Card>

          <Card className="border-gold-500/20 bg-gold-900/20">
            <CardContent className="p-4 text-center">
              <Star className="h-8 w-8 text-gold-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-gold-400">{trustScore}%</div>
              <div className="text-sm text-gold-300">Trust Score</div>
              <Progress value={trustScore} className="mt-2" />
            </CardContent>
          </Card>
        </div>

        <Card className="border-purple-500/20 bg-purple-900/10">
          <CardHeader>
            <CardTitle className="text-purple-400">🎯 Targeted Trusted Investors</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {trustedInvestors.map((investor, index) => (
                <Card key={index} className="border-green-500/20 bg-green-900/10">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-green-400">{investor.name}</h4>
                        <p className="text-sm text-muted-foreground">{investor.location} • {investor.category}</p>
                      </div>
                      <Badge className="bg-green-600">{investor.investment}</Badge>
                    </div>
                    <div className="text-sm space-y-1">
                      <div><span className="text-blue-400">Focus:</span> {investor.focus}</div>
                      <div><span className="text-purple-400">Contact:</span> {investor.contact}</div>
                    </div>
                    <Button size="sm" className="mt-2 bg-green-600 hover:bg-green-700">
                      <Target className="h-3 w-3 mr-1" />
                      Contact Investor
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button 
            onClick={attractInvestors}
            className="bg-gradient-to-r from-gold-600 via-green-600 to-blue-600 hover:opacity-90 text-white font-bold px-8 py-4 text-lg"
          >
            <Zap className="h-6 w-6 mr-2" />
            ACTIVATE GLOBAL INVESTOR MAGNET
          </Button>
        </div>

        <Card className="border-2 border-gold-500/50 bg-gradient-to-r from-gold-900/30 to-green-900/30">
          <CardContent className="p-4 text-center">
            <h4 className="text-lg font-bold text-gold-400 mb-2">
              🌟 "SEEDS WILL FORM INTO MUSIC" - ATTRACTING GLOBAL WEALTH! 🌟
            </h4>
            <p className="text-sm text-muted-foreground">
              GAiA's revolutionary conservation technology is attracting investors worldwide who want to save the planet while earning returns!
            </p>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  )
}
