
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Handshake, Building2, Globe, TrendingUp, Users, Award } from 'lucide-react'
import { Navbar } from '@/components/Navbar'

export default function PartnershipManagement() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🤝 Partnership Management
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Strategic Environmental Partnerships for Global Impact
          </p>
          <div className="flex gap-4 mt-4">
            <Badge variant="outline" className="border-green-500/50 text-green-400">
              <Building2 className="h-3 w-3 mr-1" />
              87 Active Partners
            </Badge>
            <Badge variant="outline" className="border-blue-500/50 text-blue-400">
              <Globe className="h-3 w-3 mr-1" />
              Global Network
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-400">Active Partners</CardTitle>
              <Handshake className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">87</div>
              <p className="text-xs text-muted-foreground">+12% from last quarter</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-400">Joint Projects</CardTitle>
              <Building2 className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">234</div>
              <p className="text-xs text-muted-foreground">Collaborative initiatives</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-400">Impact Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">$45M</div>
              <p className="text-xs text-muted-foreground">Combined environmental value</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/20 to-black/50 border-yellow-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-400">Success Rate</CardTitle>
              <Award className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">94%</div>
              <p className="text-xs text-muted-foreground">Partnership success rate</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400">Featured Partners</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/20">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-green-400">GreenTech Solutions</h4>
                    <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">Tier 1</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Renewable energy infrastructure partner</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Projects: 23</span>
                    <span className="text-green-400">Impact: High</span>
                  </div>
                </div>

                <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-blue-400">Ocean Conservation Alliance</h4>
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">Tier 1</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Marine ecosystem protection initiatives</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Projects: 18</span>
                    <span className="text-blue-400">Impact: Critical</span>
                  </div>
                </div>

                <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-purple-400">Global Forest Initiative</h4>
                    <Badge variant="outline" className="border-purple-500/30 text-purple-400 text-xs">Tier 2</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Reforestation and carbon offset programs</p>
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">Projects: 31</span>
                    <span className="text-purple-400">Impact: Significant</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-400">Partnership Management Tools</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <Button className="w-full bg-green-600 hover:bg-green-700 justify-start">
                  <Handshake className="h-4 w-4 mr-2" />
                  New Partnership Request
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                  <Building2 className="h-4 w-4 mr-2" />
                  Partner Directory
                </Button>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 justify-start">
                  <TrendingUp className="h-4 w-4 mr-2" />
                  Performance Analytics
                </Button>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700 justify-start">
                  <Users className="h-4 w-4 mr-2" />
                  Collaboration Hub
                </Button>
              </div>

              <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg border border-green-500/20">
                <h4 className="font-medium text-green-400 mb-2">Partnership Impact</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">CO₂ Reduced</span>
                    <span className="text-white">2.3M tons</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Trees Planted</span>
                    <span className="text-white">456K</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Communities Served</span>
                    <span className="text-white">1,247</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
