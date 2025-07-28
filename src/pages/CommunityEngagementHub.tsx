
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Users, MessageSquare, Trophy, Heart, Globe, Star } from 'lucide-react'
import { Navbar } from '@/components/Navbar'

export default function CommunityEngagementHub() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-blue-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🤝 Community Engagement Hub
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Connect, Collaborate, and Create Environmental Impact Together
          </p>
          <div className="flex gap-4 mt-4">
            <Badge variant="outline" className="border-green-500/50 text-green-400">
              <Users className="h-3 w-3 mr-1" />
              12.4K Members
            </Badge>
            <Badge variant="outline" className="border-blue-500/50 text-blue-400">
              <Globe className="h-3 w-3 mr-1" />
              Global Community
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-400">Active Members</CardTitle>
              <Users className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">12,435</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-400">Discussions</CardTitle>
              <MessageSquare className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">3,847</div>
              <p className="text-xs text-muted-foreground">Active conversations</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-400">Projects</CardTitle>
              <Trophy className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">247</div>
              <p className="text-xs text-muted-foreground">Community initiatives</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/20 to-black/50 border-yellow-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-400">Impact Score</CardTitle>
              <Star className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">9.2/10</div>
              <p className="text-xs text-muted-foreground">Community rating</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400">Recent Community Initiatives</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/20">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-green-400">Ocean Cleanup Drive</h4>
                    <Badge variant="outline" className="border-green-500/30 text-green-400 text-xs">Active</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Organizing beach cleanup events worldwide</p>
                  <Progress value={78} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Progress</span>
                    <span>78%</span>
                  </div>
                </div>

                <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/20">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-blue-400">Urban Forest Project</h4>
                    <Badge variant="outline" className="border-blue-500/30 text-blue-400 text-xs">Growing</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Planting trees in urban environments</p>
                  <Progress value={45} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Progress</span>
                    <span>45%</span>
                  </div>
                </div>

                <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/20">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="font-medium text-purple-400">Renewable Energy Hub</h4>
                    <Badge variant="outline" className="border-purple-500/30 text-purple-400 text-xs">Planning</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">Community solar panel installations</p>
                  <Progress value={12} className="h-2" />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Progress</span>
                    <span>12%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-400">Community Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 gap-4">
                <Button className="w-full bg-green-600 hover:bg-green-700 justify-start">
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Join Discussions
                </Button>
                <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                  <Trophy className="h-4 w-4 mr-2" />
                  View Leaderboard
                </Button>
                <Button className="w-full bg-purple-600 hover:bg-purple-700 justify-start">
                  <Heart className="h-4 w-4 mr-2" />
                  Support Projects
                </Button>
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700 justify-start">
                  <Star className="h-4 w-4 mr-2" />
                  Rate & Review
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
