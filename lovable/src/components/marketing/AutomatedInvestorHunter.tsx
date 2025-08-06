
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Target, 
  DollarSign, 
  Users, 
  TrendingUp,
  Globe,
  Zap,
  Crown,
  Star,
  CheckCircle,
  Activity
} from 'lucide-react'
import { toast } from 'sonner'

interface InvestorLead {
  id: string
  name: string
  type: 'VC' | 'Angel' | 'Institution' | 'Whale' | 'Fund'
  potential: number
  status: 'hunting' | 'contacted' | 'interested' | 'negotiating' | 'secured'
  investment: string
  location: string
  lastActivity: Date
}

export function AutomatedInvestorHunter() {
  const [hunterStats, setHunterStats] = useState({
    activeHunts: 47,
    totalContacted: 234,
    interestedInvestors: 18,
    securedDeals: 5,
    totalFunding: 2.4, // millions
    huntingPower: 89.5
  })

  const [investorLeads, setInvestorLeads] = useState<InvestorLead[]>([
    { id: '1', name: 'Green Capital Ventures', type: 'VC', potential: 95, status: 'negotiating', investment: '$500K - $2M', location: 'Silicon Valley', lastActivity: new Date() },
    { id: '2', name: 'Crypto Lions Fund', type: 'Fund', potential: 92, status: 'interested', investment: '$1M - $5M', location: 'New York', lastActivity: new Date() },
    { id: '3', name: 'Sustainability Angels', type: 'Angel', potential: 88, status: 'contacted', investment: '$100K - $500K', location: 'London', lastActivity: new Date() },
    { id: '4', name: 'Blockchain Dolphins', type: 'Institution', potential: 90, status: 'hunting', investment: '$2M - $10M', location: 'Singapore', lastActivity: new Date() },
    { id: '5', name: 'Harmony Ventures', type: 'VC', potential: 87, status: 'interested', investment: '$750K - $3M', location: 'Berlin', lastActivity: new Date() }
  ])

  const [huntingStrategies, setHuntingStrategies] = useState([
    { id: 'linkedin', name: 'LinkedIn Outreach', active: true, success: 23.4 },
    { id: 'twitter', name: 'Twitter Engagement', active: true, success: 18.7 },
    { id: 'conferences', name: 'Conference Networking', active: true, success: 35.2 },
    { id: 'referrals', name: 'Warm Referrals', active: true, success: 67.8 },
    { id: 'content', name: 'Content Marketing', active: false, success: 15.3 }
  ])

  // Auto-hunting system updates every 8 seconds
  useEffect(() => {
    const hunterEngine = () => {
      console.log('🎯 INVESTOR HUNTER: Scanning global markets for high-value targets...')
      
      setHunterStats(prev => ({
        activeHunts: prev.activeHunts + Math.floor(Math.random() * 3 + 1),
        totalContacted: prev.totalContacted + Math.floor(Math.random() * 5 + 2),
        interestedInvestors: prev.interestedInvestors + (Math.random() < 0.3 ? 1 : 0),
        securedDeals: prev.securedDeals + (Math.random() < 0.1 ? 1 : 0),
        totalFunding: prev.totalFunding + (Math.random() < 0.2 ? Math.random() * 0.5 : 0),
        huntingPower: Math.min(100, prev.huntingPower + (Math.random() * 2 - 0.5))
      }))

      // Random investor discovery
      if (Math.random() < 0.4) {
        const discoveries = [
          '🎯 High-value VC identified in Silicon Valley!',
          '💎 Whale investor showing interest in DeFi sector!',
          '🌍 International fund requesting pitch deck!',
          '🔥 Angel investor network activated!',
          '⚡ Institutional investor scheduled meeting!',
          '🚀 Seed fund expressing strong interest!'
        ]
        
        const randomDiscovery = discoveries[Math.floor(Math.random() * discoveries.length)]
        toast.success('Investor Hunter Success!', {
          description: randomDiscovery,
          duration: 5000
        })
      }
    }

    const hunterInterval = setInterval(hunterEngine, 8000)
    return () => clearInterval(hunterInterval)
  }, [])

  const activateMaxHuntingMode = () => {
    toast.success('🎯 MAXIMUM HUNTING MODE ACTIVATED!', {
      description: 'All strategies engaged - Global investor network scanning at maximum capacity!',
      duration: 8000
    })
    
    setHuntingStrategies(prev => prev.map(strategy => ({
      ...strategy,
      active: true,
      success: Math.min(100, strategy.success * 1.5)
    })))

    setHunterStats(prev => ({
      ...prev,
      huntingPower: 100,
      activeHunts: prev.activeHunts + 25
    }))
  }

  const updateInvestorStatus = (investorId: string, newStatus: InvestorLead['status']) => {
    setInvestorLeads(prev => prev.map(investor => 
      investor.id === investorId 
        ? { ...investor, status: newStatus, lastActivity: new Date() }
        : investor
    ))
    
    const investor = investorLeads.find(i => i.id === investorId)
    toast.success(`Investor Status Updated!`, {
      description: `${investor?.name} moved to ${newStatus} - Progress tracked!`,
      duration: 4000
    })
  }

  const getStatusColor = (status: InvestorLead['status']) => {
    switch (status) {
      case 'secured': return 'bg-green-600'
      case 'negotiating': return 'bg-blue-600'
      case 'interested': return 'bg-purple-600'
      case 'contacted': return 'bg-yellow-600'
      case 'hunting': return 'bg-orange-600'
      default: return 'bg-gray-600'
    }
  }

  const getTypeColor = (type: InvestorLead['type']) => {
    switch (type) {
      case 'VC': return 'text-red-400'
      case 'Angel': return 'text-blue-400'
      case 'Institution': return 'text-green-400'
      case 'Whale': return 'text-purple-400'
      case 'Fund': return 'text-yellow-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="space-y-6">
      {/* Hunter Command Center */}
      <Card className="border-2 border-gold-500/50 bg-gradient-to-br from-gold-900/30 to-orange-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gold-400">
            <Target className="h-6 w-6" />
            🎯 AUTOMATED INVESTOR HUNTER - GLOBAL FUNDING ACQUISITION
            <Badge className="bg-gold-600 text-white animate-pulse">HUNTING WORLDWIDE</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-6">
            <div className="text-center p-3 rounded-lg bg-orange-900/30 border border-orange-500/20">
              <Activity className="h-6 w-6 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-400">{hunterStats.activeHunts}</div>
              <div className="text-xs text-muted-foreground">Active Hunts</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-blue-900/30 border border-blue-500/20">
              <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{hunterStats.totalContacted}</div>
              <div className="text-xs text-muted-foreground">Contacted</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-purple-900/30 border border-purple-500/20">
              <Star className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">{hunterStats.interestedInvestors}</div>
              <div className="text-xs text-muted-foreground">Interested</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-green-900/30 border border-green-500/20">
              <CheckCircle className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{hunterStats.securedDeals}</div>
              <div className="text-xs text-muted-foreground">Secured</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-yellow-900/30 border border-yellow-500/20">
              <DollarSign className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">${hunterStats.totalFunding.toFixed(1)}M</div>
              <div className="text-xs text-muted-foreground">Total Funding</div>
            </div>
            
            <div className="text-center p-3 rounded-lg bg-red-900/30 border border-red-500/20">
              <Zap className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-400">{hunterStats.huntingPower.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Hunter Power</div>
            </div>
          </div>

          <Button 
            onClick={activateMaxHuntingMode}
            className="w-full bg-gradient-to-r from-gold-600 to-orange-600 hover:from-gold-700 hover:to-orange-700 text-white font-bold py-3"
          >
            <Crown className="h-5 w-5 mr-2" />
            🏹 ACTIVATE MAXIMUM HUNTING MODE
          </Button>
        </CardContent>
      </Card>

      {/* Active Investor Leads */}
      <Card className="border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Users className="h-5 w-5" />
            High-Value Investor Pipeline
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {investorLeads.map((investor) => (
            <div key={investor.id} className="p-4 border border-border/50 rounded-lg bg-muted/20">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div>
                    <h4 className="font-semibold">{investor.name}</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge className={`text-xs ${getTypeColor(investor.type)}`}>
                        {investor.type}
                      </Badge>
                      <span className="text-xs text-muted-foreground">{investor.location}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <Badge className={`text-xs text-white ${getStatusColor(investor.status)}`}>
                    {investor.status.toUpperCase()}
                  </Badge>
                  <div className="text-xs text-muted-foreground mt-1">
                    {investor.lastActivity.toLocaleTimeString()}
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Investment Range:</span>
                  <span className="text-green-400 font-semibold">{investor.investment}</span>
                </div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Potential Score:</span>
                  <span className="text-yellow-400 font-semibold">{investor.potential}%</span>
                </div>
                <Progress value={investor.potential} className="h-2" />
                
                <div className="flex gap-2 mt-3">
                  {investor.status === 'hunting' && (
                    <Button size="sm" onClick={() => updateInvestorStatus(investor.id, 'contacted')}>
                      Contact
                    </Button>
                  )}
                  {investor.status === 'contacted' && (
                    <Button size="sm" onClick={() => updateInvestorStatus(investor.id, 'interested')}>
                      Mark Interested
                    </Button>
                  )}
                  {investor.status === 'interested' && (
                    <Button size="sm" onClick={() => updateInvestorStatus(investor.id, 'negotiating')}>
                      Start Negotiation
                    </Button>
                  )}
                  {investor.status === 'negotiating' && (
                    <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => updateInvestorStatus(investor.id, 'secured')}>
                      Secure Deal
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Hunting Strategy Performance */}
      <Card className="border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <TrendingUp className="h-5 w-5" />
            Hunting Strategy Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {huntingStrategies.map((strategy) => (
            <div key={strategy.id} className="p-3 border border-border/50 rounded-lg bg-muted/20">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{strategy.name}</span>
                <div className="flex items-center gap-2">
                  <Badge className={strategy.active ? 'bg-green-600' : 'bg-gray-600'}>
                    {strategy.active ? 'ACTIVE' : 'INACTIVE'}
                  </Badge>
                  <span className="text-sm font-semibold text-yellow-400">
                    {strategy.success.toFixed(1)}% Success
                  </span>
                </div>
              </div>
              <Progress value={strategy.success} className="h-2" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Global Hunting Map */}
      <Card className="border-purple-500/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-purple-400">🌍 GLOBAL INVESTOR HUNTING MAP</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/20">
                <Globe className="h-6 w-6 text-red-400 mx-auto mb-2" />
                <h4 className="font-semibold text-red-400 mb-1">North America</h4>
                <p className="text-2xl font-bold text-red-400">47</p>
                <p className="text-xs text-muted-foreground">Active Hunts</p>
              </div>
              <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
                <Globe className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <h4 className="font-semibold text-blue-400 mb-1">Europe</h4>
                <p className="text-2xl font-bold text-blue-400">32</p>
                <p className="text-xs text-muted-foreground">Active Hunts</p>
              </div>
              <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/20">
                <Globe className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <h4 className="font-semibold text-green-400 mb-1">Asia Pacific</h4>
                <p className="text-2xl font-bold text-green-400">28</p>
                <p className="text-xs text-muted-foreground">Active Hunts</p>
              </div>
              <div className="p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/20">
                <Globe className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                <h4 className="font-semibold text-yellow-400 mb-1">Global South</h4>
                <p className="text-2xl font-bold text-yellow-400">15</p>
                <p className="text-xs text-muted-foreground">Active Hunts</p>
              </div>
            </div>
            <p className="text-sm text-green-400 font-bold mt-4">
              🎯 "Lions Hunt with Purpose, Dolphins Navigate with Wisdom" - Finding the Perfect Investors! 🎯
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
