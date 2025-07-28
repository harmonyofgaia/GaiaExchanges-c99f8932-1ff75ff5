
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Coins, 
  Award, 
  Bike, 
  Carrot, 
  PartyPopper, 
  Droplets,
  TreePine,
  BookOpen,
  Users,
  Gift,
  TrendingUp,
  Zap,
  Target,
  Calendar,
  MapPin,
  Leaf
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { GitHubDataService, RestoredProjectData } from '@/services/githubDataService'
import { toast } from 'sonner'

interface EarningSystem {
  id: string
  name: string
  icon: any
  description: string
  pointsRange: string
  tokensRange: string
  status: 'active' | 'development' | 'planned'
  features: string[]
  discount?: number
  category: string
  bgColor: string
  textColor: string
}

export default function EarningSystemsOverview() {
  const [earningSystems] = useState<EarningSystem[]>([
    {
      id: 'home-grown-food',
      name: '🥕 Home Grown Food',
      icon: Carrot,
      description: 'Earn tokens by growing organic food, sharing seeds, and teaching sustainable agriculture practices.',
      pointsRange: '15-50 pts',
      tokensRange: '3-15 GAiA',
      status: 'active',
      features: ['Organic Certification Bonus', 'Seed Sharing Rewards', 'Teaching Multiplier', 'Harvest Verification'],
      discount: 10,
      category: 'Agriculture',
      bgColor: 'bg-orange-900/20',
      textColor: 'text-orange-400'
    },
    {
      id: 'gaia-eco-bike',
      name: '🚴 GAiA Eco Bike',
      icon: Bike,
      description: 'Revolutionary eco-transportation system with token rewards for sustainable mobility and carbon offset.',
      pointsRange: '20-100 pts',
      tokensRange: '5-25 GAiA',
      status: 'active',
      features: ['Distance-based Rewards', 'Carbon Offset Tracking', 'Route Optimization', 'Community Challenges'],
      discount: 15,
      category: 'Transportation',
      bgColor: 'bg-blue-900/20',
      textColor: 'text-blue-400'
    },
    {
      id: 'party-events',
      name: '🎉 Community Party Events',
      icon: PartyPopper,
      description: 'Host and participate in eco-friendly community events, celebrations, and educational gatherings.',
      pointsRange: '25-75 pts',
      tokensRange: '8-20 GAiA',
      status: 'active',
      features: ['Event Hosting Bonus', 'Participation Rewards', 'Eco-friendly Setup', 'Community Building'],
      discount: 20,
      category: 'Community',
      bgColor: 'bg-purple-900/20',
      textColor: 'text-purple-400'
    },
    {
      id: 'water-saving',
      name: '💧 Water Conservation',
      icon: Droplets,
      description: 'Advanced water saving techniques with IoT monitoring and community impact tracking.',
      pointsRange: '10-40 pts',
      tokensRange: '2-12 GAiA',
      status: 'active',
      features: ['Smart Monitoring', 'Leak Detection', 'Greywater Systems', 'Rain Collection'],
      category: 'Environmental',
      bgColor: 'bg-cyan-900/20',
      textColor: 'text-cyan-400'
    },
    {
      id: 'bee-hotels',
      name: '🐝 Pollinator Support',
      icon: Target,
      description: 'Create and maintain bee hotels, support local pollinators, and track biodiversity impact.',
      pointsRange: '20-60 pts',
      tokensRange: '4-18 GAiA',
      status: 'active',
      features: ['Biodiversity Tracking', 'Maintenance Rewards', 'Educational Content', 'Species Monitoring'],
      category: 'Biodiversity',
      bgColor: 'bg-yellow-900/20',
      textColor: 'text-yellow-400'
    },
    {
      id: 'carbon-credits',
      name: '🌱 Carbon Credit Trading',
      icon: TreePine,
      description: 'Earn, trade, and verify carbon credits through reforestation and emissions reduction projects.',
      pointsRange: '30-150 pts',
      tokensRange: '10-50 GAiA',
      status: 'active',
      features: ['Blockchain Verification', 'Trading Platform', 'Impact Measurement', 'Global Projects'],
      category: 'Climate Action',
      bgColor: 'bg-green-900/20',
      textColor: 'text-green-400'
    },
    {
      id: 'education',
      name: '📚 Environmental Education',
      icon: BookOpen,
      description: 'Create, share, and consume educational content about sustainability and environmental protection.',
      pointsRange: '15-45 pts',
      tokensRange: '3-15 GAiA',
      status: 'active',
      features: ['Content Creation', 'Peer Teaching', 'Certification Programs', 'Impact Stories'],
      category: 'Education',
      bgColor: 'bg-indigo-900/20',
      textColor: 'text-indigo-400'
    },
    {
      id: 'skill-marketplace',
      name: '🛠️ Green Skills Marketplace',
      icon: Zap,
      description: 'Offer and hire eco-friendly skills, from solar installation to permaculture design.',
      pointsRange: '50-200 pts',
      tokensRange: '15-75 GAiA',
      status: 'development',
      features: ['Skill Verification', 'Project Matching', 'Quality Ratings', 'Continuous Learning'],
      category: 'Economy',
      bgColor: 'bg-emerald-900/20',
      textColor: 'text-emerald-400'
    },
    {
      id: 'referral-system',
      name: '👥 Community Growth',
      icon: Users,
      description: 'Expand the GAiA ecosystem by inviting friends and building sustainable communities.',
      pointsRange: '40-100 pts',
      tokensRange: '10-30 GAiA',
      status: 'development',
      features: ['Tiered Rewards', 'Activity Bonuses', 'Community Building', 'Long-term Benefits'],
      category: 'Growth',
      bgColor: 'bg-pink-900/20',
      textColor: 'text-pink-400'
    },
    {
      id: 'nft-marketplace',
      name: '🎨 Eco NFT Marketplace',
      icon: Gift,
      description: 'Trade environmental impact NFTs, carbon credit certificates, and sustainability achievements.',
      pointsRange: '25-500 pts',
      tokensRange: '8-200 GAiA',
      status: 'planned',
      features: ['Impact NFTs', 'Achievement Badges', 'Trading System', 'Verification Proof'],
      category: 'Digital Economy',
      bgColor: 'bg-violet-900/20',
      textColor: 'text-violet-400'
    },
    {
      id: 'location-missions',
      name: '📍 Location-based Missions',
      icon: MapPin,
      description: 'Complete environmental missions at specific locations worldwide with GPS verification.',
      pointsRange: '35-120 pts',
      tokensRange: '12-40 GAiA',
      status: 'planned',
      features: ['GPS Verification', 'Global Missions', 'Local Impact', 'Community Coordination'],
      category: 'Adventure',
      bgColor: 'bg-red-900/20',
      textColor: 'text-red-400'
    }
  ])

  const [restoredProjects, setRestoredProjects] = useState<RestoredProjectData[]>([])
  const [isRestoring, setIsRestoring] = useState(false)

  const restoreGitHubData = async () => {
    setIsRestoring(true)
    try {
      const projects = await GitHubDataService.restoreAllProjects()
      setRestoredProjects(projects)
      toast.success(`🌱 Successfully restored ${projects.length} GAiA projects from GitHub!`)
    } catch (error) {
      toast.error('Failed to restore GitHub project data')
    } finally {
      setIsRestoring(false)
    }
  }

  useEffect(() => {
    // Auto-restore on page load
    restoreGitHubData()
  }, [])

  const activeCount = earningSystems.filter(s => s.status === 'active').length
  const developmentCount = earningSystems.filter(s => s.status === 'development').length
  const plannedCount = earningSystems.filter(s => s.status === 'planned').length

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600'
      case 'development': return 'bg-yellow-600'
      case 'planned': return 'bg-blue-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🌍 GAiA Earning Systems
          </h1>
          <p className="text-xl text-green-300 mb-6">
            Complete ecosystem for sustainable living • Token rewards • Community impact
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
            <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-green-400">{activeCount}</div>
                <div className="text-sm text-green-300">Active Systems</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-500/30">
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{developmentCount}</div>
                <div className="text-sm text-yellow-300">In Development</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/30">
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{plannedCount}</div>
                <div className="text-sm text-blue-300">Planned Features</div>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{restoredProjects.length}</div>
                <div className="text-sm text-purple-300">Restored Projects</div>
              </CardContent>
            </Card>
          </div>

          <Button 
            onClick={restoreGitHubData}
            disabled={isRestoring}
            size="lg"
            className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 mb-8"
          >
            {isRestoring ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Restoring GitHub Data...
              </>
            ) : (
              <>
                <Leaf className="h-4 w-4 mr-2" />
                Restore Original GAiA Projects
              </>
            )}
          </Button>
        </div>

        <Tabs defaultValue="systems" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="systems">Earning Systems</TabsTrigger>
            <TabsTrigger value="restored">Restored Projects</TabsTrigger>
            <TabsTrigger value="integration">System Integration</TabsTrigger>
          </TabsList>

          <TabsContent value="systems">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {earningSystems.map((system) => (
                <Card key={system.id} className={`${system.bgColor} border-${system.textColor.split('-')[1]}-500/30 transition-all duration-300 hover:scale-105`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <Badge className={getStatusColor(system.status)}>
                        {system.status.toUpperCase()}
                      </Badge>
                      {system.discount && (
                        <Badge variant="outline" className="border-green-500 text-green-400">
                          {system.discount}% OFF
                        </Badge>
                      )}
                    </div>
                    <CardTitle className={`${system.textColor} flex items-center gap-2`}>
                      <system.icon className="h-5 w-5" />
                      {system.name}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      {system.description}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className={`${system.textColor} font-medium`}>
                        <Coins className="h-4 w-4 inline mr-1" />
                        {system.pointsRange}
                      </div>
                      <div className={`${system.textColor} font-medium`}>
                        <Award className="h-4 w-4 inline mr-1" />
                        {system.tokensRange}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1">
                      {system.features.map((feature, index) => (
                        <Badge key={index} variant="outline" className="text-xs border-gray-500/50">
                          {feature}
                        </Badge>
                      ))}
                    </div>

                    <div className={`p-2 rounded-lg border border-${system.textColor.split('-')[1]}-500/20`}>
                      <div className="text-xs font-medium mb-1">Category: {system.category}</div>
                      <Progress value={system.status === 'active' ? 100 : system.status === 'development' ? 60 : 20} className="h-2" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="restored">
            <div className="space-y-4">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-green-400 mb-2">
                  🔄 Restored GAiA Projects from GitHub
                </h3>
                <p className="text-muted-foreground">
                  Original project data recovered from your GitHub pull requests
                </p>
              </div>

              {restoredProjects.length === 0 ? (
                <Card className="text-center p-8">
                  <div className="text-muted-foreground">
                    {isRestoring ? 'Restoring projects...' : 'No projects restored yet. Click the restore button above.'}
                  </div>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {restoredProjects.map((project, index) => (
                    <Card key={index} className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
                      <CardHeader>
                        <div className="flex justify-between items-start">
                          <CardTitle className="text-green-400">{project.title}</CardTitle>
                          <Badge className={project.status === 'active' ? 'bg-green-600' : 'bg-yellow-600'}>
                            {project.status}
                          </Badge>
                        </div>
                        <div className="text-sm text-blue-400">{project.github_source}</div>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <p className="text-sm text-muted-foreground">
                          {project.description}
                        </p>
                        
                        <div className="grid grid-cols-3 gap-2 text-sm">
                          <div className="text-center p-2 bg-green-900/20 rounded">
                            <div className="font-bold text-green-400">{project.points}</div>
                            <div className="text-xs">Points</div>
                          </div>
                          <div className="text-center p-2 bg-blue-900/20 rounded">
                            <div className="font-bold text-blue-400">{project.tokens}</div>
                            <div className="text-xs">Tokens</div>
                          </div>
                          <div className="text-center p-2 bg-purple-900/20 rounded">
                            <div className="font-bold text-purple-400">{project.discount || 'N/A'}</div>
                            <div className="text-xs">Discount</div>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1">
                          <Badge variant="outline" className="border-green-500/50 text-green-400">
                            {project.category}
                          </Badge>
                          {project.features.map((feature, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="integration">
            <Card>
              <CardHeader>
                <CardTitle className="text-green-400">🔗 System Integration Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-blue-400 mb-3">Token Economy Integration</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Coins className="h-4 w-4 text-yellow-400" />
                        All earning systems connected to GAiA token rewards
                      </li>
                      <li className="flex items-center gap-2">
                        <TrendingUp className="h-4 w-4 text-green-400" />
                        Dynamic point-to-token conversion rates
                      </li>
                      <li className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-purple-400" />
                        Multiplier bonuses for consistent participation
                      </li>
                    </ul>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-green-400 mb-3">Badge & Achievement System</h4>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-blue-400" />
                        Achievement badges for each earning system
                      </li>
                      <li className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-red-400" />
                        Cross-system achievement combinations
                      </li>
                      <li className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-orange-400" />
                        Time-based progression rewards
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 p-4 rounded-lg border border-green-500/30">
                  <h4 className="font-semibold text-green-400 mb-2">📊 System Status Summary</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-green-400">100%</div>
                      <div className="text-xs">Token Integration</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400">95%</div>
                      <div className="text-xs">Badge System</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-purple-400">85%</div>
                      <div className="text-xs">Discount System</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-orange-400">90%</div>
                      <div className="text-xs">Community Features</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
