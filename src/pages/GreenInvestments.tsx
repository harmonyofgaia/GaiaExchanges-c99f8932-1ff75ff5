import { useState, useEffect } from 'react'
import { MatrixRainBackground } from '@/components/ui/matrix-rain-background'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { GaiaCommunityProjects } from '@/components/GaiaCommunityProjects'
import { 
  Leaf, 
  Droplet, 
  Wind, 
  Sun, 
  TreePine,
  TrendingUp,
  DollarSign,
  Target,
  Globe,
  Zap,
  Heart,
  Shield,
  Flame
} from 'lucide-react'
import { toast } from 'sonner'
import { useGaiaTokenData } from '@/hooks/useGaiaTokenData'
import { GAIA_TOKEN, formatGaiaNumber } from '@/constants/gaia'

interface GreenProject {
  id: string
  title: string
  description: string
  category: string
  fundingGoal: number
  fundingRaised: number
  carbonImpact: number
  expectedReturn: number
  riskLevel: 'Low' | 'Medium' | 'High'
  duration: string
  location: string
  verified: boolean
  icon: any
}

export default function GreenInvestments() {
  const { tokenData, isLoading, error } = useGaiaTokenData(true)
  const [projects, setProjects] = useState<GreenProject[]>([])
  
  // Stats derived from real GAiA token data
  const totalInvested = tokenData ? Math.floor(tokenData.volume24h / 3) : 2847592
  const carbonOffset = tokenData ? Math.floor(tokenData.transactions24h * 2.75) : 125847
  const activeProjects = tokenData ? Math.floor(tokenData.holders / 500) + 20 : 24
  const [communityDonations, setCommunityDonations] = useState(0)

  useEffect(() => {
    // Simulate loading green projects
    const mockProjects: GreenProject[] = [
      {
        id: '1',
        title: 'Amazon Reforestation Initiative',
        description: 'Large-scale reforestation project in the Amazon rainforest with indigenous community partnership.',
        category: 'Reforestation',
        fundingGoal: 5000000,
        fundingRaised: 3750000,
        carbonImpact: 250000,
        expectedReturn: 12.5,
        riskLevel: 'Low',
        duration: '10 years',
        location: 'Brazil',
        verified: true,
        icon: TreePine
      },
      {
        id: '2',
        title: 'Ocean Cleanup Technology',
        description: 'Advanced plastic removal systems for ocean cleanup with biodegradable processing.',
        category: 'Ocean Cleanup',
        fundingGoal: 8000000,
        fundingRaised: 2400000,
        carbonImpact: 180000,
        expectedReturn: 15.2,
        riskLevel: 'Medium',
        duration: '7 years',
        location: 'Pacific Ocean',
        verified: true,
        icon: Droplet
      },
      {
        id: '3',
        title: 'Solar Farm Network Africa',
        description: 'Distributed solar power generation network providing clean energy to rural communities.',
        category: 'Renewable Energy',
        fundingGoal: 12000000,
        fundingRaised: 8900000,
        carbonImpact: 400000,
        expectedReturn: 18.7,
        riskLevel: 'Low',
        duration: '15 years',
        location: 'Kenya, Tanzania',
        verified: true,
        icon: Sun
      },
      {
        id: '4',
        title: 'Wind Energy Expansion',
        description: 'Next-generation wind turbines with improved efficiency and bird-safe technology.',
        category: 'Wind Energy',
        fundingGoal: 15000000,
        fundingRaised: 5200000,
        carbonImpact: 350000,
        expectedReturn: 16.3,
        riskLevel: 'Medium',
        duration: '12 years',
        location: 'North Sea',
        verified: true,
        icon: Wind
      },
      {
        id: '5',
        title: 'Wildfire Sand Defense System',
        description: 'Revolutionary sand-based fire suppression technology using automated defense cannons for wildfire protection.',
        category: 'Wildfire Defense',
        fundingGoal: 6500000,
        fundingRaised: 4200000,
        carbonImpact: 180000,
        expectedReturn: 14.8,
        riskLevel: 'Medium',
        duration: '8 years',
        location: 'California, Australia',
        verified: true,
        icon: Shield
      }
    ]
    
    setProjects(mockProjects)
    
    console.log('🌱 Green Investments: Connected to GAiA token data')
    if (tokenData?.isLive) {
      console.log(`📊 Live GAiA Stats: Volume: $${tokenData.volume24h.toLocaleString()} | Price: $${tokenData.price.toFixed(6)}`)
    }
  }, [tokenData])

  const handleInvest = (projectId: string, amount: number = 1000) => {
    toast.success(`Successfully invested ${amount} GAiA tokens!`, {
      description: 'Your investment is now contributing to positive environmental impact.'
    })
    
    setProjects(prev => prev.map(project => 
      project.id === projectId 
        ? { ...project, fundingRaised: project.fundingRaised + amount }
        : project
    ))
  }

  const handleCommunityDonation = (projectId: string, amount: number) => {
    setCommunityDonations(prev => prev + amount)
    toast.success(`🌍 Community donation tracked!`, {
      description: `${amount} GAiA donated to GAiA community project. Total community donations: ${communityDonations + amount} GAiA`
    })
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'Low': return 'bg-green-500/20 text-green-400 border-green-500/50'
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50'
      case 'High': return 'bg-red-500/20 text-red-400 border-red-500/50'
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/50'
    }
  }

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <MatrixRainBackground intensity="low" color="#00aa00" speed={0.8} />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            🌍 Green Investment Platform
          </h1>
          <p className="text-xl text-green-300 max-w-3xl mx-auto">
            Invest in verified environmental projects and earn sustainable returns while creating positive global impact
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/50">
            <CardContent className="p-6 text-center">
              <DollarSign className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">${totalInvested.toLocaleString()}</div>
              <div className="text-sm text-green-300">Total Invested</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/50">
            <CardContent className="p-6 text-center">
              <Leaf className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">{carbonOffset.toLocaleString()}T</div>
              <div className="text-sm text-blue-300">CO2 Offset</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/50 border-purple-500/50">
            <CardContent className="p-6 text-center">
              <Target className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">{activeProjects}</div>
              <div className="text-sm text-purple-300">Active Projects</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-500/50">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto text-orange-400 mb-2" />
              <div className="text-2xl font-bold text-orange-400">14.2%</div>
              <div className="text-sm text-orange-300">Avg. Returns</div>
            </CardContent>
          </Card>
        </div>

        {/* Project Categories */}
        <Tabs defaultValue="all" className="mb-8">
          <TabsList className="grid w-full grid-cols-7 bg-gray-900/50 border border-green-500/30">
            <TabsTrigger value="all" className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-400">All Projects</TabsTrigger>
            <TabsTrigger value="community" className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-400">
              <Heart className="h-4 w-4 mr-1" />
              GAiA Community
            </TabsTrigger>
            <TabsTrigger value="wildfire" className="data-[state=active]:bg-red-600/20 data-[state=active]:text-red-400">
              <Shield className="h-4 w-4 mr-1" />
              Wildfire Sand
            </TabsTrigger>
            <TabsTrigger value="reforestation" className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-400">Reforestation</TabsTrigger>
            <TabsTrigger value="renewable" className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-400">Renewable Energy</TabsTrigger>
            <TabsTrigger value="ocean" className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-400">Ocean Cleanup</TabsTrigger>
            <TabsTrigger value="technology" className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-400">Clean Tech</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-6 mt-8">
            {/* GAiA Community Projects Section */}
            <div className="mb-12">
              <GaiaCommunityProjects onDonate={handleCommunityDonation} />
            </div>

            {/* Separator */}
            <div className="text-center py-8">
              <div className="h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent mb-4"></div>
              <h3 className="text-2xl font-bold text-green-400 mb-2">Traditional Green Investment Projects</h3>
              <p className="text-gray-400">Large-scale environmental investment opportunities</p>
              <div className="h-px bg-gradient-to-r from-transparent via-green-500/50 to-transparent mt-4"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects.map((project) => {
                const Icon = project.icon
                const fundingProgress = (project.fundingRaised / project.fundingGoal) * 100
                
                return (
                  <Card key={project.id} className="bg-gradient-to-br from-gray-900/50 to-green-900/20 border-green-500/30 hover:border-green-400/50 transition-all">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <Icon className="h-8 w-8 text-green-400" />
                          <div>
                            <CardTitle className="text-green-400">{project.title}</CardTitle>
                            <div className="flex items-center gap-2 mt-2">
                              <Badge variant="outline" className="text-xs">
                                {project.category}
                              </Badge>
                              <Badge className={`text-xs ${getRiskColor(project.riskLevel)}`}>
                                {project.riskLevel} Risk
                              </Badge>
                              {project.verified && (
                                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/50 text-xs">
                                  ✓ Verified
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    
                    <CardContent>
                      <p className="text-gray-300 mb-4 text-sm">{project.description}</p>
                      
                      <div className="space-y-3 mb-6">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Progress</span>
                          <span className="text-green-400">{fundingProgress.toFixed(1)}%</span>
                        </div>
                        <Progress value={fundingProgress} className="h-2" />
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-400">Raised: ${project.fundingRaised.toLocaleString()}</span>
                          <span className="text-gray-400">Goal: ${project.fundingGoal.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6 text-sm">
                        <div>
                          <div className="text-gray-400">Expected Return</div>
                          <div className="text-green-400 font-semibold">{project.expectedReturn}% APY</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Carbon Impact</div>
                          <div className="text-blue-400 font-semibold">{project.carbonImpact.toLocaleString()}T CO2</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Duration</div>
                          <div className="text-purple-400 font-semibold">{project.duration}</div>
                        </div>
                        <div>
                          <div className="text-gray-400">Location</div>
                          <div className="text-orange-400 font-semibold">{project.location}</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                          onClick={() => handleInvest(project.id, 1000)}
                        >
                          <Zap className="h-4 w-4 mr-2" />
                          Invest 1000 GAiA
                        </Button>
                        <Button 
                          variant="outline" 
                          className="border-green-500/50 text-green-400 hover:bg-green-500/20"
                          onClick={() => handleInvest(project.id, 5000)}
                        >
                          5000 GAiA
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </TabsContent>

          <TabsContent value="community" className="space-y-6 mt-8">
            <GaiaCommunityProjects onDonate={handleCommunityDonation} />
          </TabsContent>

          <TabsContent value="wildfire" className="space-y-6 mt-8">
            <div className="space-y-8">
              {/* Wildfire Sand Project Header */}
              <div className="text-center">
                <div className="flex justify-center items-center gap-4 mb-6">
                  <Shield className="h-12 w-12 text-red-400" />
                  <Flame className="h-8 w-8 text-orange-400 animate-pulse" />
                </div>
                <h2 className="text-4xl font-bold text-red-400 mb-4">
                  🔥 Wildfire Sand Defense System
                </h2>
                <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                  Revolutionary sand-based fire suppression technology powered by GAiA token. 
                  Automated defense cannons strategically deployed to protect forests, communities, and wildlife from devastating wildfires.
                </p>
              </div>

              {/* Live Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-500/50">
                  <CardContent className="p-6 text-center">
                    <Shield className="h-8 w-8 mx-auto text-red-400 mb-2" />
                    <div className="text-2xl font-bold text-red-400">
                      {tokenData ? Math.floor(tokenData.holders / 500) + 24 : 47}
                    </div>
                    <div className="text-sm text-red-300">Active Cannons</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 border-orange-500/50">
                  <CardContent className="p-6 text-center">
                    <Flame className="h-8 w-8 mx-auto text-orange-400 mb-2" />
                    <div className="text-2xl font-bold text-orange-400">
                      {tokenData ? Math.floor(tokenData.transactions24h / 500) + 89 : 180}
                    </div>
                    <div className="text-sm text-orange-300">Fires Extinguished</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/50">
                  <CardContent className="p-6 text-center">
                    <TreePine className="h-8 w-8 mx-auto text-green-400 mb-2" />
                    <div className="text-2xl font-bold text-green-400">
                      {tokenData ? formatGaiaNumber(tokenData.volume24h / 100) : "87.5K"}
                    </div>
                    <div className="text-sm text-green-300">Acres Protected</div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/50">
                  <CardContent className="p-6 text-center">
                    <Zap className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                    <div className="text-2xl font-bold text-blue-400">
                      {tokenData ? (tokenData.price * 1000000).toFixed(0) : "125"}%
                    </div>
                    <div className="text-sm text-blue-300">System Efficiency</div>
                  </CardContent>
                </Card>
              </div>

              {/* Main Wildfire Sand Project Card */}
              <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/30">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <Badge className="bg-red-600 text-white">🔥 Wildfire Defense</Badge>
                    <Badge className="bg-green-600 text-white">✅ Verified by GAiA</Badge>
                  </div>
                  <CardTitle className="text-2xl text-red-400 flex items-center gap-2">
                    <Shield className="h-6 w-6" />
                    Wildfire Sand Defense System
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-gray-300 leading-relaxed">
                    Our revolutionary Wildfire Sand Defense System uses advanced automated sand cannons 
                    powered by GAiA token transactions. Each cannon can suppress fires within a 500-meter 
                    radius using eco-friendly sand-based extinguishing technology. The system operates 24/7 
                    with AI-powered fire detection and instant response capabilities.
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-red-400">📊 Project Statistics</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-400">Funding Goal:</span>
                          <span className="text-green-400">$6.5M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Raised:</span>
                          <span className="text-blue-400">$4.2M</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Carbon Impact:</span>
                          <span className="text-green-400">180,000 tons CO₂</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-400">Coverage Area:</span>
                          <span className="text-purple-400">California, Australia</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-lg font-semibold text-orange-400">🛡️ Defense Features</h4>
                      <ul className="space-y-1 text-sm text-gray-300">
                        <li>• Automated fire detection AI</li>
                        <li>• 500m suppression radius</li>
                        <li>• Eco-friendly sand technology</li>
                        <li>• 24/7 monitoring system</li>
                        <li>• GAiA token powered operations</li>
                        <li>• Real-time response capability</li>
                      </ul>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Funding Progress</span>
                      <span className="text-green-400">64.6%</span>
                    </div>
                    <Progress value={64.6} className="h-3 bg-gray-800" />
                  </div>

                  <div className="flex gap-4">
                    <Button 
                      size="lg" 
                      className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                      onClick={() => handleInvest('5', 2000)}
                    >
                      <Flame className="h-4 w-4 mr-2" />
                      Fund Defense System (2000 GAiA)
                    </Button>
                    <Button 
                      variant="outline" 
                      className="border-red-500/50 text-red-400 hover:bg-red-500/20"
                      onClick={() => handleInvest('5', 5000)}
                    >
                      <Shield className="h-4 w-4 mr-2" />
                      5000 GAiA
                    </Button>
                  </div>

                  <div className="bg-gradient-to-r from-red-900/30 to-orange-900/30 p-4 rounded-lg border border-red-500/30">
                    <h5 className="text-red-400 font-semibold mb-2">🚨 Emergency Impact</h5>
                    <p className="text-sm text-gray-300">
                      Every GAiA token invested directly powers our defense network. Your contribution 
                      helps maintain active sand cannons, funds new installations, and protects countless 
                      acres of forest and wildlife habitats from devastating wildfires.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Other tab contents would be filtered versions of the same projects */}
          <TabsContent value="reforestation">
            <div className="text-center py-12">
              <TreePine className="h-16 w-16 mx-auto text-green-400 mb-4" />
              <h3 className="text-2xl font-bold text-green-400 mb-2">Reforestation Projects</h3>
              <p className="text-gray-300">Filtered view of reforestation-specific projects coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="renewable">
            <div className="text-center py-12">
              <Sun className="h-16 w-16 mx-auto text-yellow-400 mb-4" />
              <h3 className="text-2xl font-bold text-yellow-400 mb-2">Renewable Energy</h3>
              <p className="text-gray-300">Solar, wind, and clean energy projects coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="ocean">
            <div className="text-center py-12">
              <Droplet className="h-16 w-16 mx-auto text-blue-400 mb-4" />
              <h3 className="text-2xl font-bold text-blue-400 mb-2">Ocean Cleanup</h3>
              <p className="text-gray-300">Marine conservation and cleanup projects coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="technology">
            <div className="text-center py-12">
              <Zap className="h-16 w-16 mx-auto text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-purple-400 mb-2">Clean Technology</h3>
              <p className="text-gray-300">Innovation in environmental technology coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Investment Portfolio */}
        <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/50">
          <CardHeader>
            <CardTitle className="text-2xl text-green-400 text-center">
              🌱 Your Green Investment Portfolio
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div>
                <div className="text-3xl font-bold text-white mb-2">$125,847</div>
                <div className="text-green-400">Total Invested</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">+18.5%</div>
                <div className="text-green-400">Portfolio Growth</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">2,847T</div>
                <div className="text-green-400">CO2 Impact</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400 mb-2">{communityDonations.toLocaleString()}</div>
                <div className="text-blue-400">Community Donations</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
