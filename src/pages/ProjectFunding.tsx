
import { Navbar } from '@/components/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Heart, Users, Target, Coins, TreePine, Flame, Shield, Globe } from 'lucide-react'

export default function ProjectFunding() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
            💚 Decentralized Project Funding
          </h1>
          <p className="text-xl text-muted-foreground">
            Community-driven funding for environmental initiatives
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-green-500/20 bg-gradient-to-br from-green-900/20 to-green-800/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Heart className="h-5 w-5" />
                Ocean Cleanup Initiative
              </CardTitle>
              <Badge variant="outline" className="border-green-500/50 text-green-400 w-fit">
                Active
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Remove plastic waste from oceans using advanced filtration systems
              </p>
              <Progress value={75} className="w-full" />
              <div className="flex justify-between text-sm">
                <span>75% funded</span>
                <span className="text-green-400 font-semibold">$150,000 / $200,000</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>1,247 contributors</span>
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                Fund Project
              </Button>
            </CardContent>
          </Card>

          <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-blue-800/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <TreePine className="h-5 w-5" />
                Reforestation Program
              </CardTitle>
              <Badge variant="outline" className="border-blue-500/50 text-blue-400 w-fit">
                Growing
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Plant native trees in deforested areas to restore ecosystems
              </p>
              <Progress value={45} className="w-full" />
              <div className="flex justify-between text-sm">
                <span>45% funded</span>
                <span className="text-blue-400 font-semibold">$45,000 / $100,000</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>892 contributors</span>
              </div>
              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                Fund Project
              </Button>
            </CardContent>
          </Card>

          <Card className="border-orange-500/20 bg-gradient-to-br from-orange-900/20 to-orange-800/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Flame className="h-5 w-5" />
                Wildfire Sand Blast Defense
              </CardTitle>
              <Badge variant="outline" className="border-orange-500/50 text-orange-400 w-fit">
                Critical
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Advanced sand cannon systems for wildfire prevention and suppression
              </p>
              <Progress value={90} className="w-full" />
              <div className="flex justify-between text-sm">
                <span>90% funded</span>
                <span className="text-orange-400 font-semibold">$135,000 / $150,000</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>2,156 contributors</span>
              </div>
              <Button className="w-full bg-orange-600 hover:bg-orange-700">
                Fund Project
              </Button>
            </CardContent>
          </Card>

          <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-purple-800/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Target className="h-5 w-5" />
                Solar Energy Access
              </CardTitle>
              <Badge variant="outline" className="border-purple-500/50 text-purple-400 w-fit">
                Nearly Complete
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Provide solar panels to remote communities for clean energy
              </p>
              <Progress value={95} className="w-full" />
              <div className="flex justify-between text-sm">
                <span>95% funded</span>
                <span className="text-purple-400 font-semibold">$142,500 / $150,000</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>1,678 contributors</span>
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Fund Project
              </Button>
            </CardContent>
          </Card>

          <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-900/20 to-cyan-800/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <Shield className="h-5 w-5" />
                Coral Reef Restoration
              </CardTitle>
              <Badge variant="outline" className="border-cyan-500/50 text-cyan-400 w-fit">
                New
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Restore damaged coral reefs using innovative regeneration techniques
              </p>
              <Progress value={15} className="w-full" />
              <div className="flex justify-between text-sm">
                <span>15% funded</span>
                <span className="text-cyan-400 font-semibold">$18,000 / $120,000</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>324 contributors</span>
              </div>
              <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                Fund Project
              </Button>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-900/20 to-yellow-800/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-400">
                <Globe className="h-5 w-5" />
                Carbon Capture Network
              </CardTitle>
              <Badge variant="outline" className="border-yellow-500/50 text-yellow-400 w-fit">
                Expanding
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Deploy global network of carbon capture and storage facilities
              </p>
              <Progress value={62} className="w-full" />
              <div className="flex justify-between text-sm">
                <span>62% funded</span>
                <span className="text-yellow-400 font-semibold">$310,000 / $500,000</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Users className="h-4 w-4" />
                <span>3,789 contributors</span>
              </div>
              <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                Fund Project
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Funding Statistics */}
        <Card className="mt-8 border-gray-500/20 bg-gradient-to-r from-gray-900/20 to-black/20">
          <CardHeader>
            <CardTitle className="text-center text-white">Global Funding Impact</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-400">$2.4M</div>
                <p className="text-sm text-muted-foreground">Total Funded</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">47</div>
                <p className="text-sm text-muted-foreground">Active Projects</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">12.8K</div>
                <p className="text-sm text-muted-foreground">Contributors</p>
              </div>
              <div>
                <div className="text-3xl font-bold text-yellow-400">156</div>
                <p className="text-sm text-muted-foreground">Countries</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
