
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Lightbulb, Heart, Zap, Globe, TreePine, Droplet, Wind, Sun, Bike, Recycle } from 'lucide-react'
import { toast } from 'sonner'

export function ComprehensiveInnovationHub() {
  const [innovations, setInnovations] = useState({
    health: 25,
    environment: 30,
    social: 20,
    technology: 35
  })

  const tokenEarningIdeas = [
    {
      category: 'Health & Wellness',
      icon: Heart,
      ideas: [
        { name: 'Daily Steps Challenge', tokens: 5, description: 'Earn tokens for walking 10,000+ steps daily' },
        { name: 'Meditation Sessions', tokens: 10, description: 'Complete mindfulness sessions for mental health' },
        { name: 'Healthy Recipe Sharing', tokens: 15, description: 'Share eco-friendly, healthy recipes' },
        { name: 'Air Quality Monitoring', tokens: 20, description: 'Report local air quality data' },
        { name: 'Community Health Events', tokens: 50, description: 'Organize local health awareness events' }
      ]
    },
    {
      category: 'Environmental Action',
      icon: TreePine,
      ideas: [
        { name: 'Tree Planting Projects', tokens: 100, description: 'Plant and document tree growth' },
        { name: 'Beach/River Cleanup', tokens: 75, description: 'Organize or participate in cleanup drives' },
        { name: 'Solar Panel Installation', tokens: 200, description: 'Install renewable energy systems' },
        { name: 'Plastic Reduction Challenge', tokens: 25, description: 'Document plastic-free lifestyle choices' },
        { name: 'Wildlife Conservation', tokens: 150, description: 'Support local wildlife protection efforts' }
      ]
    },
    {
      category: 'Social Impact',
      icon: Globe,
      ideas: [
        { name: 'Educational Content Creation', tokens: 40, description: 'Create sustainability education materials' },
        { name: 'Community Gardens', tokens: 80, description: 'Start or maintain community growing spaces' },
        { name: 'Elderly Support Services', tokens: 60, description: 'Provide technology help to seniors' },
        { name: 'Food Waste Reduction', tokens: 35, description: 'Redistribute surplus food to those in need' },
        { name: 'Green Transportation', tokens: 30, description: 'Use eco-friendly transport methods' }
      ]
    },
    {
      category: 'Technology Innovation',
      icon: Zap,
      ideas: [
        { name: 'Smart Home Energy Optimization', tokens: 120, description: 'Implement AI-driven energy savings' },
        { name: 'Carbon Footprint Tracking App', tokens: 300, description: 'Develop personal carbon monitoring tools' },
        { name: 'Community Resource Sharing Platform', tokens: 250, description: 'Create local sharing economy solutions' },
        { name: 'Renewable Energy Microgrids', tokens: 500, description: 'Design community energy systems' },
        { name: 'Waste-to-Energy Solutions', tokens: 400, description: 'Innovate waste conversion technologies' }
      ]
    }
  ]

  const futureImpactProjects = [
    {
      name: 'Global Reforestation Network',
      description: 'AI-coordinated worldwide tree planting with real-time impact tracking',
      tokens: 10000,
      impact: '1 billion trees planted',
      timeframe: '5 years'
    },
    {
      name: 'Ocean Plastic Recycling Stations',
      description: 'Automated floating platforms that collect and process ocean plastic',
      tokens: 15000,
      impact: '50% ocean plastic reduction',
      timeframe: '10 years'
    },
    {
      name: 'Community Solar Grid Revolution',
      description: 'Decentralized solar networks powering entire communities',
      tokens: 20000,
      impact: '100% renewable communities',
      timeframe: '15 years'
    },
    {
      name: 'Vertical Farm Ecosystems',
      description: 'Multi-story sustainable food production in urban areas',
      tokens: 12000,
      impact: 'Food security for all',
      timeframe: '8 years'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setInnovations(prev => ({
        health: Math.min(100, prev.health + 0.1),
        environment: Math.min(100, prev.environment + 0.15),
        social: Math.min(100, prev.social + 0.12),
        technology: Math.min(100, prev.technology + 0.18)
      }))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const launchInnovation = (project: any) => {
    toast.success(`🚀 ${project.name} Launched!`, {
      description: `Potential Impact: ${project.impact} | Timeline: ${project.timeframe}`,
      duration: 10000
    })
  }

  return (
    <div className="space-y-6">
      {/* Main Innovation Header */}
      <Card className="bg-gradient-to-r from-green-900/40 via-blue-900/40 to-purple-900/40 border-2 border-green-500/50">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
            💡 COMPREHENSIVE INNOVATION HUB
          </CardTitle>
          <div className="text-center space-y-2">
            <div className="text-xl text-green-400 font-bold">
              🌍 BUILDING A BETTER WORLD TOGETHER • 🚀 INNOVATION FOR ALL • 💚 SUSTAINABLE FUTURE
            </div>
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge className="bg-green-600 animate-pulse">WORLD CHANGING</Badge>
              <Badge className="bg-blue-600 animate-pulse">COMMUNITY DRIVEN</Badge>
              <Badge className="bg-purple-600 animate-pulse">TOKEN REWARDS</Badge>
              <Badge className="bg-yellow-600 animate-pulse">REAL IMPACT</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Innovation Progress */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-red-500/30 bg-red-900/20">
          <CardContent className="pt-6 text-center">
            <Heart className="h-10 w-10 mx-auto text-red-400 mb-2" />
            <div className="text-2xl font-bold text-red-400">{innovations.health.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Health Innovation</div>
            <Progress value={innovations.health} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-green-900/20">
          <CardContent className="pt-6 text-center">
            <TreePine className="h-10 w-10 mx-auto text-green-400 mb-2" />
            <div className="text-2xl font-bold text-green-400">{innovations.environment.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Environmental</div>
            <Progress value={innovations.environment} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardContent className="pt-6 text-center">
            <Globe className="h-10 w-10 mx-auto text-blue-400 mb-2" />
            <div className="text-2xl font-bold text-blue-400">{innovations.social.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Social Impact</div>
            <Progress value={innovations.social} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardContent className="pt-6 text-center">
            <Zap className="h-10 w-10 mx-auto text-purple-400 mb-2" />
            <div className="text-2xl font-bold text-purple-400">{innovations.technology.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Technology</div>
            <Progress value={innovations.technology} className="mt-2 h-2" />
          </CardContent>
        </Card>
      </div>

      {/* Token Earning Ideas */}
      <Tabs defaultValue="health" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="health">❤️ Health</TabsTrigger>
          <TabsTrigger value="environment">🌱 Environment</TabsTrigger>
          <TabsTrigger value="social">🤝 Social</TabsTrigger>
          <TabsTrigger value="technology">⚡ Technology</TabsTrigger>
        </TabsList>

        {tokenEarningIdeas.map((category, categoryIndex) => (
          <TabsContent key={categoryIndex} value={category.category.toLowerCase().split(' ')[0]} className="space-y-4">
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <category.icon className="h-6 w-6" />
                  {category.category} - Token Earning Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {category.ideas.map((idea, ideaIndex) => (
                    <Card key={ideaIndex} className="border-blue-500/20 bg-blue-900/10 hover:scale-105 transition-transform">
                      <CardContent className="pt-4">
                        <div className="space-y-3">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-blue-400">{idea.name}</h4>
                            <Badge className="bg-yellow-600">{idea.tokens} GAIA</Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">{idea.description}</p>
                          <Button className="w-full bg-green-600 hover:bg-green-700">
                            <Lightbulb className="h-4 w-4 mr-2" />
                            Start Earning
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Future Impact Projects */}
      <Card className="border-purple-500/50 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="text-purple-400 text-center text-3xl">
            🚀 FUTURE WORLD-CHANGING PROJECTS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {futureImpactProjects.map((project, index) => (
              <Card key={index} className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-orange-900/20">
                <CardHeader>
                  <CardTitle className="text-yellow-400">{project.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{project.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-green-400">Impact:</span>
                      <span className="text-green-300">{project.impact}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-400">Timeline:</span>
                      <span className="text-blue-300">{project.timeframe}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yellow-400">Reward:</span>
                      <span className="text-yellow-300">{project.tokens.toLocaleString()} GAIA</span>
                    </div>
                  </div>

                  <Button 
                    onClick={() => launchInnovation(project)}
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Launch Project
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Community Impact Summary */}
      <Card className="border-green-500/50 bg-gradient-to-r from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="text-green-400 text-center text-2xl">
            🌍 COMMUNITY IMPACT SUMMARY
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="space-y-2">
              <div className="text-4xl">🌳</div>
              <div className="text-xl font-bold text-green-400">2.5M</div>
              <div className="text-sm text-muted-foreground">Trees Planted</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl">💧</div>
              <div className="text-xl font-bold text-blue-400">500K L</div>
              <div className="text-sm text-muted-foreground">Water Saved</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl">⚡</div>
              <div className="text-xl font-bold text-yellow-400">1.2M kWh</div>
              <div className="text-sm text-muted-foreground">Clean Energy</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl">🏥</div>
              <div className="text-xl font-bold text-red-400">100K</div>
              <div className="text-sm text-muted-foreground">Health Checkups</div>
            </div>
            <div className="space-y-2">
              <div className="text-4xl">🤝</div>
              <div className="text-xl font-bold text-purple-400">50K</div>
              <div className="text-sm text-muted-foreground">Lives Improved</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
