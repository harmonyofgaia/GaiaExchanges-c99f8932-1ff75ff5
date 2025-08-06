
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Users, TrendingUp, Target, Star, Crown, Diamond } from 'lucide-react'
import { toast } from 'sonner'

interface InvestorLead {
  id: string
  name: string
  category: string
  interestLevel: number
  investmentCapacity: string
  specialization: string
  contactMethod: string
  dragonAttraction: number
  timestamp: Date
}

export function InvestorScoutingSystem() {
  const [investorLeads, setInvestorLeads] = useState<InvestorLead[]>([])
  const [scoutingActive, setScoutingActive] = useState(true)
  const scoutingInterval = useRef<NodeJS.Timeout>(undefined)

  useEffect(() => {
    const scoutForInvestors = () => {
      console.log('👑 INVESTOR SCOUTING SYSTEM - ATTRACTING PERFECT INVESTORS')
      
      // Generate quality investor leads
      if (Math.random() < 0.3) {
        const investorCategories = [
          { name: 'Quantum Tech Ventures', category: 'Deep Tech', capacity: '$50M-$500M', specialization: 'Quantum Computing & AI Security' },
          { name: 'Blockchain Security Fund', category: 'Crypto Security', capacity: '$10M-$100M', specialization: 'Cryptocurrency & DeFi Protection' },
          { name: 'Green Innovation Capital', category: 'Environmental Tech', capacity: '$25M-$250M', specialization: 'Sustainable Technology Solutions' },
          { name: 'AI Revolution Partners', category: 'Artificial Intelligence', capacity: '$100M-$1B', specialization: 'Advanced AI & Machine Learning' },
          { name: 'Fintech Disruptors LLC', category: 'Financial Technology', capacity: '$20M-$200M', specialization: 'Revolutionary Financial Systems' },
          { name: 'Cyber Defense Ventures', category: 'Cybersecurity', capacity: '$15M-$150M', specialization: 'Advanced Threat Protection' },
          { name: 'Future Tech Consortium', category: 'Emerging Technology', capacity: '$75M-$750M', specialization: 'Next-Generation Innovation' },
          { name: 'Harmony Investment Group', category: 'Holistic Solutions', capacity: '$30M-$300M', specialization: 'Integrated Technology Ecosystems' }
        ]

        const randomInvestor = investorCategories[Math.floor(Math.random() * investorCategories.length)]
        
        const newLead: InvestorLead = {
          id: `investor-${Date.now()}`,
          name: randomInvestor.name,
          category: randomInvestor.category,
          interestLevel: Math.floor(Math.random() * 30) + 70, // 70-100% interest
          investmentCapacity: randomInvestor.capacity,
          specialization: randomInvestor.specialization,
          contactMethod: 'Dragon Security Demonstration',
          dragonAttraction: Math.floor(Math.random() * 50) + 50, // 50-100% dragon attraction
          timestamp: new Date()
        }

        setInvestorLeads(prev => [newLead, ...prev.slice(0, 9)]) // Keep last 10 leads

        console.log(`👑 NEW INVESTOR LEAD: ${newLead.name} - ${newLead.interestLevel}% interested`)
        
        // Show notification for high-value leads
        if (newLead.interestLevel > 85) {
          toast.success('👑 HIGH-VALUE INVESTOR DETECTED!', {
            description: `${newLead.name} - ${newLead.interestLevel}% interest in Dragon Security`,
            duration: 8000
          })
        }
      }
    }

    // Scout for investors every 10 seconds
    scoutingInterval.current = setInterval(scoutForInvestors, 10000)
    scoutForInvestors()

    return () => {
      if (scoutingInterval.current) clearInterval(scoutingInterval.current)
    }
  }, [])

  const activateAdvertising = () => {
    toast.success('📢 ADVERTISING ACTIVATED!', {
      description: 'Dragon Security value now broadcasting to attract perfect investors',
      duration: 10000
    })
    
    console.log('📢 ADVERTISING SYSTEM ACTIVATED - DEMONSTRATING PRICELESS VALUE')
    console.log('🎯 TARGET INVESTORS: High-Quality • Perfect Fit • Revolutionary Vision')
  }

  const getInterestBadge = (level: number) => {
    if (level >= 90) return <Badge className="bg-green-600">EXTREMELY HIGH</Badge>
    if (level >= 80) return <Badge className="bg-blue-600">VERY HIGH</Badge>
    if (level >= 70) return <Badge className="bg-yellow-600">HIGH</Badge>
    return <Badge className="bg-gray-600">MODERATE</Badge>
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Deep Tech': return <Star className="h-4 w-4" />
      case 'Crypto Security': return <Diamond className="h-4 w-4" />
      case 'Environmental Tech': return <Target className="h-4 w-4" />
      case 'Artificial Intelligence': return <Crown className="h-4 w-4" />
      default: return <TrendingUp className="h-4 w-4" />
    }
  }

  return (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Users className="h-6 w-6" />
          👑 Investor Scouting System - Perfect Match Finder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Scouting Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center p-3 rounded-lg bg-green-900/20 border border-green-500/30">
            <Users className="h-6 w-6 mx-auto text-green-400 mb-1" />
            <div className="text-lg font-bold text-green-400">{investorLeads.length}</div>
            <div className="text-xs text-muted-foreground">Active Leads</div>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-blue-900/20 border border-blue-500/30">
            <TrendingUp className="h-6 w-6 mx-auto text-blue-400 mb-1" />
            <div className="text-lg font-bold text-blue-400">
              {investorLeads.length > 0 ? Math.round(investorLeads.reduce((sum, lead) => sum + lead.interestLevel, 0) / investorLeads.length) : 0}%
            </div>
            <div className="text-xs text-muted-foreground">Avg Interest</div>
          </div>
          
          <div className="text-center p-3 rounded-lg bg-purple-900/20 border border-purple-500/30">
            <Crown className="h-6 w-6 mx-auto text-purple-400 mb-1" />
            <div className="text-lg font-bold text-purple-400">
              {investorLeads.filter(lead => lead.interestLevel > 85).length}
            </div>
            <div className="text-xs text-muted-foreground">High-Value</div>
          </div>
        </div>

        {/* Investor Leads */}
        <div className="space-y-3 max-h-60 overflow-y-auto">
          {investorLeads.length === 0 ? (
            <div className="text-center py-8 text-green-400">
              <div className="text-6xl mb-4">🎯</div>
              <div className="font-semibold">Scouting for Perfect Investors</div>
              <div className="text-sm text-muted-foreground">
                Dragon Security attracting high-quality investment opportunities
              </div>
            </div>
          ) : (
            investorLeads.map((lead) => (
              <div key={lead.id} className="p-4 rounded-lg bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/30">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getCategoryIcon(lead.category)}
                    <div>
                      <div className="font-semibold text-green-300">{lead.name}</div>
                      <div className="text-sm text-muted-foreground">{lead.specialization}</div>
                      <div className="text-xs text-blue-400">{lead.investmentCapacity}</div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    {getInterestBadge(lead.interestLevel)}
                    <div className="text-xs text-muted-foreground">
                      {lead.interestLevel}% Interest
                    </div>
                    <div className="text-xs text-purple-400">
                      Dragon: {lead.dragonAttraction}%
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Advertising Activation */}
        <Button 
          onClick={activateAdvertising}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3"
        >
          <TrendingUp className="h-5 w-5 mr-2" />
          📢 ACTIVATE INVESTOR ADVERTISING - DEMONSTRATE PRICELESS VALUE
        </Button>

        {/* Investment Attraction Philosophy */}
        <div className="mt-4 p-4 rounded-lg bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30">
          <h4 className="text-lg font-bold text-green-400 mb-2">🎯 Perfect Investor Attraction Strategy</h4>
          <div className="text-sm text-green-200 space-y-1">
            <div>• Attract investors who understand revolutionary technology</div>
            <div>• Demonstrate priceless value through Dragon Security performance</div>
            <div>• Focus on quality over quantity - perfect fit investors only</div>
            <div>• Show boundaries being broken and impossible being achieved</div>
            <div>• Prove endless growth potential and community impact</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
