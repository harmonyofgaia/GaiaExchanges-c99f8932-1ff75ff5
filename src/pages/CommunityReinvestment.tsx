
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Heart, Users, Sprout, Coins, TrendingUp, Globe } from 'lucide-react'

export default function CommunityReinvestment() {
  const projects = [
    { name: "Forest Restoration", allocated: 250000, spent: 180000, impact: "1,250 trees planted" },
    { name: "Ocean Cleanup", allocated: 150000, spent: 120000, impact: "50 tons plastic removed" },
    { name: "Solar Community", allocated: 300000, spent: 220000, impact: "500 homes powered" },
    { name: "Education Program", allocated: 100000, spent: 85000, impact: "2,000 students reached" }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 p-6">
      <div className="container mx-auto max-w-6xl">
        <Card className="mb-8 border-green-500/50 bg-gradient-to-r from-green-900/40 to-blue-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              💚 Community Reinvestment Hub
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              100% Transparent - Every Token Reinvested in Environmental Projects
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Badge className="bg-green-600">🌱 Active Projects</Badge>
              <Badge className="bg-blue-600">💧 Ocean Focus</Badge>
              <Badge className="bg-purple-600">🏫 Education</Badge>
              <Badge className="bg-yellow-600">☀️ Renewable Energy</Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardContent className="p-6 text-center">
              <Coins className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">$800K</div>
              <div className="text-sm text-muted-foreground">Total Allocated</div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardContent className="p-6 text-center">
              <TrendingUp className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">$605K</div>
              <div className="text-sm text-muted-foreground">Already Invested</div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">12,500</div>
              <div className="text-sm text-muted-foreground">Lives Impacted</div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-yellow-900/20">
            <CardContent className="p-6 text-center">
              <Globe className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-yellow-400">25</div>
              <div className="text-sm text-muted-foreground">Countries Reached</div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-blue-500/30 bg-blue-900/20 mb-8">
          <CardHeader>
            <CardTitle className="text-blue-400">🎯 Active Community Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index} className="p-6 bg-black/30 rounded-lg border border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-green-400">{project.name}</h3>
                    <Badge className="bg-green-600">{project.impact}</Badge>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Allocated</div>
                      <div className="text-lg font-bold text-blue-400">${project.allocated.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Invested</div>
                      <div className="text-lg font-bold text-green-400">${project.spent.toLocaleString()}</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">Progress</div>
                      <Progress value={(project.spent / project.allocated) * 100} className="h-3" />
                      <div className="text-sm text-muted-foreground mt-1">
                        {Math.round((project.spent / project.allocated) * 100)}% Complete
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Heart className="h-6 w-6" />
                Community Impact
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">CO2 Reduced:</span>
                  <span className="font-bold text-green-400">2,500 tons</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Trees Planted:</span>
                  <span className="font-bold text-green-400">1,250</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Plastic Removed:</span>
                  <span className="font-bold text-green-400">50 tons</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Renewable Energy:</span>
                  <span className="font-bold text-green-400">500 homes</span>
                </div>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Sprout className="h-4 w-4 mr-2" />
                View Full Impact Report
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Users className="h-6 w-6" />
                Community Voting
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Token holders vote on which environmental projects receive funding. 
                Your voice shapes the future of our planet.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Next Vote:</span>
                  <span className="text-blue-400">Ocean Plastic Cleanup 2.0</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Voting Opens:</span>
                  <span className="text-green-400">Dec 15, 2024</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Funding Amount:</span>
                  <span className="text-purple-400">$500,000</span>
                </div>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Users className="h-4 w-4 mr-2" />
                Join Community Vote
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
