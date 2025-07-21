
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Lightbulb, 
  Heart, 
  Leaf, 
  Zap, 
  Globe, 
  Users,
  Coins,
  TreePine,
  Waves,
  Sun
} from 'lucide-react'

export function ComprehensiveInnovationHub() {
  const [activeProjects, setActiveProjects] = useState(12)
  const [tokensEarned, setTokensEarned] = useState(284756)
  const [communityImpact, setCommunityImpact] = useState(95.8)

  const realLifeIdeas = [
    {
      id: 1,
      title: "🌱 Community Garden Network",
      description: "Local food production with blockchain tracking",
      tokenReward: "50-200 GAIA/month",
      impact: "Food security & carbon reduction",
      category: "Environment",
      status: "Active"
    },
    {
      id: 2,
      title: "🏥 Health Data Sharing",
      description: "Secure medical data exchange for research",
      tokenReward: "100-500 GAIA/submission",
      impact: "Accelerated medical research",
      category: "Healthcare",
      status: "Development"
    },
    {
      id: 3,
      title: "♻️ Waste-to-Energy Tracking",
      description: "Monitor and reward waste recycling",
      tokenReward: "25-100 GAIA/kg",
      impact: "Circular economy growth",
      category: "Sustainability",
      status: "Active"
    },
    {
      id: 4,
      title: "🌊 Ocean Cleanup Missions",
      description: "Coordinated plastic removal from oceans",
      tokenReward: "500-2000 GAIA/mission",
      impact: "Marine ecosystem restoration",
      category: "Environment",
      status: "Active"
    },
    {
      id: 5,
      title: "🔋 Renewable Energy Sharing",
      description: "Peer-to-peer clean energy marketplace",
      tokenReward: "75-300 GAIA/kWh",
      impact: "Energy independence",
      category: "Energy",
      status: "Beta"
    },
    {
      id: 6,
      title: "📚 Educational Content Creation",
      description: "Sustainable living tutorials and guides",
      tokenReward: "200-1000 GAIA/content",
      impact: "Global education access",
      category: "Education",
      status: "Active"
    },
    {
      id: 7,
      title: "🌳 Reforestation Verification",
      description: "Satellite-verified tree planting projects",
      tokenReward: "10-50 GAIA/tree",
      impact: "Carbon sequestration",
      category: "Environment",
      status: "Active"
    },
    {
      id: 8,
      title: "🏘️ Smart City Development",
      description: "IoT sensors for urban optimization",
      tokenReward: "1000-5000 GAIA/deployment",
      impact: "Efficient resource usage",
      category: "Technology",
      status: "Pilot"
    }
  ]

  const burningMechanisms = [
    {
      mechanism: "Environmental Impact Multiplier",
      description: "50% of earned tokens automatically burned when environmental goals exceeded",
      tokensBurned: "142,378 GAIA",
      impact: "Deflationary pressure + ecosystem rewards"
    },
    {
      mechanism: "Community Health Reinvestment",
      description: "30% of healthcare tokens fund global medical research",
      tokensReinvested: "85,427 GAIA",
      impact: "Medical breakthrough acceleration"
    },
    {
      mechanism: "Education Access Fund",
      description: "25% of education tokens provide free learning resources",
      tokensAllocated: "56,789 GAIA",
      impact: "Knowledge democratization"
    }
  ]

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Environment': return <Leaf className="h-4 w-4" />
      case 'Healthcare': return <Heart className="h-4 w-4" />
      case 'Energy': return <Zap className="h-4 w-4" />
      case 'Education': return <Lightbulb className="h-4 w-4" />
      case 'Technology': return <Globe className="h-4 w-4" />
      default: return <Users className="h-4 w-4" />
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Environment': return 'bg-green-600'
      case 'Healthcare': return 'bg-red-600'
      case 'Energy': return 'bg-yellow-600'
      case 'Education': return 'bg-blue-600'
      case 'Technology': return 'bg-purple-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-green-500/50 bg-gradient-to-r from-green-900/40 via-emerald-900/40 to-teal-900/40">
        <CardHeader>
          <CardTitle className="text-green-400 text-center text-4xl">
            🌍 COMPREHENSIVE INNOVATION HUB
          </CardTitle>
          <div className="text-center">
            <Badge className="bg-green-600 animate-pulse text-lg px-4 py-2">
              REAL WORLD IMPACT GENERATOR
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center p-4 bg-green-900/30 rounded-lg">
              <Lightbulb className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-3xl font-bold text-green-400">{activeProjects}</div>
              <div className="text-sm text-muted-foreground">Active Projects</div>
            </div>
            
            <div className="text-center p-4 bg-emerald-900/30 rounded-lg">
              <Coins className="h-8 w-8 mx-auto text-emerald-400 mb-2" />
              <div className="text-3xl font-bold text-emerald-400">{tokensEarned.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Tokens Earned</div>
            </div>
            
            <div className="text-center p-4 bg-teal-900/30 rounded-lg">
              <Globe className="h-8 w-8 mx-auto text-teal-400 mb-2" />
              <div className="text-3xl font-bold text-teal-400">{communityImpact.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Community Impact</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Real Life Innovation Ideas */}
      <Card className="border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-blue-400">💡 Real Life Token-Earning Innovations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {realLifeIdeas.map((idea) => (
              <Card key={idea.id} className="border-gray-600/30 bg-gray-900/20">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center justify-between text-lg">
                    <span className="text-gray-100">{idea.title}</span>
                    <Badge className={getCategoryColor(idea.category)}>
                      {getCategoryIcon(idea.category)}
                      <span className="ml-1">{idea.category}</span>
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{idea.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Token Reward:</span>
                      <span className="text-green-400 font-semibold">{idea.tokenReward}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Impact:</span>
                      <span className="text-blue-400">{idea.impact}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Status:</span>
                      <Badge className={idea.status === 'Active' ? 'bg-green-600' : idea.status === 'Development' ? 'bg-yellow-600' : 'bg-blue-600'}>
                        {idea.status}
                      </Badge>
                    </div>
                  </div>

                  <Button className="w-full bg-green-600 hover:bg-green-700 text-sm">
                    Join Project & Earn Tokens
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Token Burning & Reinvestment Mechanisms */}
      <Card className="border-orange-500/30">
        <CardHeader>
          <CardTitle className="text-orange-400">🔥 Token Burning & Reinvestment Mechanisms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {burningMechanisms.map((mechanism, index) => (
              <Card key={index} className="border-gray-600/30 bg-gray-900/20">
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <h4 className="font-semibold text-orange-400">{mechanism.mechanism}</h4>
                    <p className="text-sm text-muted-foreground">{mechanism.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Tokens Burned/Invested:</span>
                        <div className="text-orange-400 font-semibold">
                          {mechanism.tokensBurned || mechanism.tokensReinvested || mechanism.tokensAllocated}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Global Impact:</span>
                        <div className="text-green-400">{mechanism.impact}</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Innovation Manifesto */}
      <Card className="border-cyan-500/30 bg-cyan-900/20">
        <CardContent className="pt-6 text-center">
          <div className="text-6xl mb-4">🌟</div>
          <h3 className="text-2xl font-bold text-cyan-400 mb-4">
            INNOVATION FOR HUMANITY MANIFESTO
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-cyan-200">
            <div className="space-y-2">
              <div>🌱 <strong>Environmental Restoration:</strong> Heal the planet through collective action</div>
              <div>🏥 <strong>Healthcare Access:</strong> Democratize medical research and treatment</div>
              <div>📚 <strong>Education Equality:</strong> Provide knowledge access to all humanity</div>
              <div>⚡ <strong>Clean Energy Future:</strong> Accelerate renewable energy adoption</div>
            </div>
            <div className="space-y-2">
              <div>🏘️ <strong>Smart Communities:</strong> Optimize resource usage through technology</div>
              <div>♻️ <strong>Circular Economy:</strong> Eliminate waste through innovative recycling</div>
              <div>🔥 <strong>Token Burning:</strong> Create deflationary value while funding projects</div>
              <div>🌍 <strong>Global Impact:</strong> Every action contributes to planetary healing</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
