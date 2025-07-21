
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Leaf, 
  Heart, 
  Lightbulb, 
  Users, 
  Coins,
  Recycle,
  TreePine,
  Droplets,
  Sun,
  Wind,
  Zap,
  Globe
} from 'lucide-react'

interface InnovationProject {
  id: string
  title: string
  description: string
  tokenReward: number
  impact: string
  category: 'environmental' | 'health' | 'education' | 'community'
  participants: number
  completion: number
  icon: string
}

export function ComprehensiveInnovationHub() {
  const [activeTab, setActiveTab] = useState('earn-tokens')

  const tokenEarningIdeas: InnovationProject[] = [
    {
      id: '1',
      title: 'Solar Panel Installation Reports',
      description: 'Upload photos and data of solar panel installations in your community',
      tokenReward: 50,
      impact: 'Renewable Energy Tracking',
      category: 'environmental',
      participants: 1247,
      completion: 67,
      icon: '☀️'
    },
    {
      id: '2',
      title: 'Community Garden Documentation',
      description: 'Document community gardens, urban farming, and green spaces',
      tokenReward: 35,
      impact: 'Food Security & Green Spaces',
      category: 'environmental',
      participants: 892,
      completion: 78,
      icon: '🌱'
    },
    {
      id: '3',
      title: 'Wellness Activity Tracking',
      description: 'Log daily wellness activities: meditation, exercise, healthy eating',
      tokenReward: 25,
      impact: 'Community Health Improvement',
      category: 'health',
      participants: 2156,
      completion: 89,
      icon: '💪'
    },
    {
      id: '4',
      title: 'Recycling Center Mapping',
      description: 'Map and verify recycling centers, waste reduction facilities',
      tokenReward: 40,
      impact: 'Waste Reduction Network',
      category: 'environmental',
      participants: 743,
      completion: 45,
      icon: '♻️'
    },
    {
      id: '5',
      title: 'Educational Content Creation',
      description: 'Create educational content about sustainability and green living',
      tokenReward: 75,
      impact: 'Knowledge Sharing',
      category: 'education',
      participants: 567,
      completion: 34,
      icon: '📚'
    },
    {
      id: '6',
      title: 'Clean Energy Usage Reporting',
      description: 'Report on renewable energy usage in your area',
      tokenReward: 60,
      impact: 'Clean Energy Transition',
      category: 'environmental',
      participants: 423,
      completion: 56,
      icon: '⚡'
    }
  ]

  const worldImpactProjects = [
    {
      title: 'Global Forest Restoration',
      description: 'AI-powered reforestation using drone technology and satellite monitoring',
      investment: '€2.5M',
      impact: '1M trees planted worldwide',
      icon: '🌳',
      status: 'Active'
    },
    {
      title: 'Ocean Cleanup Network',
      description: 'Advanced marine debris collection systems powered by renewable energy',
      investment: '€1.8M',
      impact: '500 tons of ocean plastic removed',
      icon: '🌊',
      status: 'Expanding'
    },
    {
      title: 'Renewable Energy Microgrids',
      description: 'Community-owned solar and wind power systems in developing regions',
      investment: '€3.2M',
      impact: '50,000 homes powered by clean energy',
      icon: '⚡',
      status: 'Active'
    },
    {
      title: 'Sustainable Agriculture AI',
      description: 'AI systems for optimizing crop yields while reducing environmental impact',
      investment: '€1.5M',
      impact: '30% reduction in agricultural water usage',
      icon: '🌾',
      status: 'Research'
    },
    {
      title: 'Mental Health Support Network',
      description: 'AI-powered mental health support and community wellness programs',
      investment: '€900K',
      impact: '100,000+ people supported',
      icon: '💚',
      status: 'Active'
    },
    {
      title: 'Clean Water Technology',
      description: 'Advanced water purification systems for underserved communities',
      investment: '€2.1M',
      impact: 'Clean water access for 75,000 people',
      icon: '💧',
      status: 'Deployment'
    }
  ]

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'environmental': return 'bg-green-600'
      case 'health': return 'bg-blue-600'
      case 'education': return 'bg-purple-600'
      case 'community': return 'bg-orange-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Main Header */}
      <Card className="bg-gradient-to-r from-green-900/40 via-blue-900/40 to-purple-900/40 border-2 border-green-500/50">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
            🌍 COMPREHENSIVE INNOVATION HUB
          </CardTitle>
          <div className="text-center space-y-2">
            <div className="text-xl text-green-400 font-bold">
              💚 Earn GAiA Tokens • 🌱 Improve the World • 🚀 Revolutionary Impact
            </div>
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge className="bg-green-600 animate-pulse">WORLD CHANGING</Badge>
              <Badge className="bg-blue-600 animate-pulse">TOKEN EARNING</Badge>
              <Badge className="bg-purple-600 animate-pulse">COMMUNITY DRIVEN</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="earn-tokens">💰 Earn GAiA Tokens</TabsTrigger>
          <TabsTrigger value="world-impact">🌍 World Impact Projects</TabsTrigger>
          <TabsTrigger value="burning-mechanism">🔥 Token Burning & Reinvestment</TabsTrigger>
        </TabsList>

        <TabsContent value="earn-tokens" className="space-y-6">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Coins className="h-6 w-6" />
                💰 COMMUNITY TOKEN EARNING OPPORTUNITIES
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tokenEarningIdeas.map((idea) => (
                  <Card key={idea.id} className="border-green-500/20 bg-green-900/10 hover:bg-green-800/20 transition-all">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-green-400">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{idea.icon}</span>
                          <span className="text-sm">{idea.title}</span>
                        </div>
                        <Badge className={getCategoryColor(idea.category)}>
                          {idea.category.toUpperCase()}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{idea.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Progress</span>
                          <span className="text-sm font-bold">{idea.completion}%</span>
                        </div>
                        <Progress value={idea.completion} className="h-2" />
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Reward:</span>
                        <div className="flex items-center gap-1">
                          <Coins className="h-4 w-4 text-yellow-400" />
                          <span className="text-yellow-400 font-bold">{idea.tokenReward} GAiA</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Participants:</span>
                        <span className="text-blue-400 font-bold">{idea.participants.toLocaleString()}</span>
                      </div>
                      
                      <div className="text-xs text-green-400 font-semibold">
                        Impact: {idea.impact}
                      </div>
                      
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <Heart className="h-4 w-4 mr-2" />
                        Start Contributing
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="world-impact" className="space-y-6">
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Globe className="h-6 w-6" />
                🌍 WORLD IMPACT REINVESTMENT PROJECTS
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {worldImpactProjects.map((project, index) => (
                  <Card key={index} className="border-blue-500/20 bg-blue-900/10">
                    <CardHeader>
                      <CardTitle className="flex items-center justify-between text-blue-400">
                        <div className="flex items-center gap-2">
                          <span className="text-3xl">{project.icon}</span>
                          <span className="text-sm">{project.title}</span>
                        </div>
                        <Badge className={`${
                          project.status === 'Active' ? 'bg-green-600' :
                          project.status === 'Expanding' ? 'bg-blue-600' :
                          project.status === 'Research' ? 'bg-purple-600' :
                          'bg-orange-600'
                        }`}>
                          {project.status.toUpperCase()}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Investment:</span>
                          <span className="text-green-400 font-bold">{project.investment}</span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Impact:</span>
                          <span className="text-blue-400 font-bold text-sm">{project.impact}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="burning-mechanism" className="space-y-6">
          <Card className="border-red-500/30 bg-red-900/20">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <Zap className="h-6 w-6" />
                🔥 TOKEN BURNING & REINVESTMENT MECHANISM
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-6 bg-red-900/30 rounded-lg text-center">
                  <div className="text-4xl mb-2">🔥</div>
                  <div className="text-2xl font-bold text-red-400">25%</div>
                  <div className="text-sm text-muted-foreground">Tokens Burned Weekly</div>
                  <div className="text-xs text-red-300 mt-2">Reduces supply, increases value</div>
                </div>
                
                <div className="p-6 bg-green-900/30 rounded-lg text-center">
                  <div className="text-4xl mb-2">🌱</div>
                  <div className="text-2xl font-bold text-green-400">50%</div>
                  <div className="text-sm text-muted-foreground">Environmental Projects</div>
                  <div className="text-xs text-green-300 mt-2">Direct world impact investment</div>
                </div>
                
                <div className="p-6 bg-blue-900/30 rounded-lg text-center">
                  <div className="text-4xl mb-2">💰</div>
                  <div className="text-2xl font-bold text-blue-400">25%</div>
                  <div className="text-sm text-muted-foreground">Community Rewards</div>
                  <div className="text-xs text-blue-300 mt-2">Reinvested in user rewards</div>
                </div>
              </div>
              
              <Card className="border-purple-500/30 bg-purple-900/20">
                <CardContent className="pt-6">
                  <h3 className="text-xl font-bold text-purple-400 mb-4 text-center">
                    🚀 REVOLUTIONARY TOKENOMICS MODEL
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <div>🔥 <strong>Deflationary Mechanism:</strong> Regular token burning reduces supply</div>
                      <div>🌍 <strong>World Impact Fund:</strong> 50% reinvested in global projects</div>
                      <div>💚 <strong>Community First:</strong> Users earn by improving the world</div>
                      <div>🔄 <strong>Sustainable Loop:</strong> Value creation through positive impact</div>
                    </div>
                    <div className="space-y-2">
                      <div>📈 <strong>Value Appreciation:</strong> Burning mechanism increases token value</div>
                      <div>🏆 <strong>Achievement Rewards:</strong> Extra tokens for major milestones</div>
                      <div>🤝 <strong>Partnership Bonuses:</strong> Collaboration with green organizations</div>
                      <div>♾️ <strong>Infinite Potential:</strong> Scalable impact worldwide</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Global Impact Statistics */}
      <Card className="border-emerald-500/30 bg-emerald-900/20">
        <CardContent className="pt-6">
          <h3 className="text-2xl font-bold text-emerald-400 mb-6 text-center">
            🌍 GLOBAL IMPACT STATISTICS
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="p-4 bg-green-900/30 rounded-lg">
              <TreePine className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">1.2M</div>
              <div className="text-xs text-muted-foreground">Trees Planted</div>
            </div>
            <div className="p-4 bg-blue-900/30 rounded-lg">
              <Droplets className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">75K</div>
              <div className="text-xs text-muted-foreground">People with Clean Water</div>
            </div>
            <div className="p-4 bg-yellow-900/30 rounded-lg">
              <Sun className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">50K</div>
              <div className="text-xs text-muted-foreground">Homes Solar Powered</div>
            </div>
            <div className="p-4 bg-purple-900/30 rounded-lg">
              <Recycle className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">500T</div>
              <div className="text-xs text-muted-foreground">Ocean Plastic Removed</div>
            </div>
            <div className="p-4 bg-pink-900/30 rounded-lg">
              <Heart className="h-8 w-8 text-pink-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-pink-400">100K+</div>
              <div className="text-xs text-muted-foreground">Lives Improved</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
