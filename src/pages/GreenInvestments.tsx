
import { GAiACommunityProjects } from '@/components/green-investments/GAiACommunityProjects'
import { GaiaCommunityProjects } from '@/components/GaiaCommunityProjects'
import { WildfireSandProtection } from '@/components/green-investments/WildfireSandProtection'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Leaf, Globe, TrendingUp, Shield, Flame, Users, DollarSign } from 'lucide-react'

const GreenInvestments = () => {
  // Your restored project data
  const restoredProjects = [
    {
      id: 1,
      name: 'Coral Reef Restoration',
      description: 'Restoring damaged coral reefs worldwide using sound technology',
      funding: 250000,
      target: 500000,
      impact: 'Ocean Protection',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Rainforest Conservation',
      description: 'Protecting Amazon rainforest areas',
      funding: 180000,
      target: 300000,
      impact: 'Climate Action',
      status: 'Active'
    },
    {
      id: 3,
      name: 'Solar Energy for Communities',
      description: 'Solar panel installations in underserved areas',
      funding: 320000,
      target: 400000,
      impact: 'Clean Energy',
      status: 'Active'
    },
    {
      id: 4,
      name: 'Ocean Cleanup Technology',
      description: 'Advanced systems for removing plastic from oceans',
      funding: 150000,
      target: 250000,
      impact: 'Ocean Cleanup',
      status: 'Active'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌱 Green Investments
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            Invest in environmental projects • Support sustainable initiatives • Make a positive impact
          </p>
          <div className="text-sm text-green-400 mt-2">
            ✨ Powered by GAiA Token • Community Driven • Transparent Impact
          </div>
        </div>

        {/* Green Investment Overview */}
        <Card className="mb-8 bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Globe className="h-6 w-6" />
              Green Investment Ecosystem
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center p-4 bg-green-800/20 rounded-lg">
                <Leaf className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">Environmental</div>
                <div className="text-sm text-muted-foreground">Impact Projects</div>
              </div>
              <div className="text-center p-4 bg-blue-800/20 rounded-lg">
                <TrendingUp className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">Sustainable</div>
                <div className="text-sm text-muted-foreground">Returns</div>
              </div>
              <div className="text-center p-4 bg-purple-800/20 rounded-lg">
                <Globe className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">Global</div>
                <div className="text-sm text-muted-foreground">Community</div>
              </div>
              <div className="text-center p-4 bg-orange-800/20 rounded-lg">
                <Shield className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-400">Protection</div>
                <div className="text-sm text-muted-foreground">& Prevention</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Your Restored Green Projects */}
        <Card className="mb-8 bg-gradient-to-br from-green-900/40 via-blue-900/40 to-purple-900/40 border-green-500/50">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-green-400">
              🌱 YOUR HARMONY GREEN PROJECTS - RESTORED
            </CardTitle>
            <div className="text-center text-lg text-green-300">
              Environmental Impact • Community Driven • Transparent Funding
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Project Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-900/50 rounded-lg border-2 border-green-500/50">
                <Leaf className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-400">{restoredProjects.length}</div>
                <div className="text-sm text-green-300">Active Projects</div>
              </div>
              
              <div className="text-center p-4 bg-blue-900/50 rounded-lg border-2 border-blue-500/50">
                <DollarSign className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-400">
                  ${restoredProjects.reduce((sum, p) => sum + p.funding, 0).toLocaleString()}
                </div>
                <div className="text-sm text-blue-300">Total Funding</div>
              </div>
              
              <div className="text-center p-4 bg-purple-900/50 rounded-lg border-2 border-purple-500/50">
                <Globe className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-400">15</div>
                <div className="text-sm text-purple-300">Countries</div>
              </div>
              
              <div className="text-center p-4 bg-orange-900/50 rounded-lg border-2 border-orange-500/50">
                <Users className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-400">12.5K</div>
                <div className="text-sm text-orange-300">Contributors</div>
              </div>
            </div>

            {/* Your Restored Projects Display */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-center text-white">
                🌍 YOUR ACTIVE GREEN PROJECTS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {restoredProjects.map((project) => (
                  <Card key={project.id} className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-blue-900/30">
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xl font-bold text-green-400">{project.name}</h4>
                          <Badge className="bg-green-600 text-white">{project.status}</Badge>
                        </div>
                        <p className="text-muted-foreground">{project.description}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{Math.round((project.funding / project.target) * 100)}%</span>
                          </div>
                          <Progress 
                            value={(project.funding / project.target) * 100} 
                            className="w-full h-3"
                          />
                          <div className="flex justify-between text-sm">
                            <span className="text-green-400">${project.funding.toLocaleString()} raised</span>
                            <span className="text-blue-400">${project.target.toLocaleString()} target</span>
                          </div>
                        </div>
                        <Badge className="bg-purple-600 text-white w-full text-center py-2">
                          Impact: {project.impact}
                        </Badge>
                        <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                          Invest in Project
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-green-400 mb-2">
                🌱 BUILDING A GREENER TOMORROW 🌱
              </div>
              <div className="text-lg text-green-300">
                Every Investment • Every Choice • Every Project • Makes a Difference
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Featured Project: Wildfire Sand Protection */}
        <div className="mb-12">
          <div className="text-center mb-6">
            <Badge className="bg-orange-600 text-white mb-2">
              <Flame className="h-4 w-4 mr-1" />
              FEATURED PROTECTION PROJECT
            </Badge>
            <h2 className="text-2xl font-bold text-orange-400">Advanced Wildfire Sand Barrier Protection System</h2>
            <p className="text-muted-foreground mt-2">
              Revolutionary sand barrier technology protecting communities from wildfire threats with real-time monitoring
            </p>
          </div>
          <WildfireSandProtection />
        </div>

        {/* Your Restored GAiA Community Projects */}
        <div className="mb-12">
          <GAiACommunityProjects />
        </div>

        {/* Additional Community Projects */}
        <div className="mb-12">
          <GaiaCommunityProjects />
        </div>
      </div>
    </div>
  )
}

export default GreenInvestments
