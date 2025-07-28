
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Navbar } from '@/components/Navbar'
import { 
  TrendingUp, 
  Users, 
  Leaf, 
  DollarSign, 
  Target, 
  Award,
  Activity,
  Globe
} from 'lucide-react'
import { AnimatedCounter } from '@/components/ui/animated-counter'

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalUsers: 12847,
    activeProjects: 156,
    tokensEarned: 2847395,
    carbonOffset: 58392,
    projectsCompleted: 89,
    communityScore: 94
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(prev => ({
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 5),
        activeProjects: prev.activeProjects + Math.floor(Math.random() * 2),
        tokensEarned: prev.tokensEarned + Math.floor(Math.random() * 100),
        carbonOffset: prev.carbonOffset + Math.floor(Math.random() * 10),
        projectsCompleted: prev.projectsCompleted,
        communityScore: Math.min(100, prev.communityScore + Math.floor(Math.random() * 2))
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌍 GAiA Dashboard
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Real-time overview of your environmental impact and community engagement
          </p>
        </div>

        {/* Main Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-green-300 text-sm font-medium">Total Users</p>
                  <div className="text-2xl font-bold text-green-400">
                    <AnimatedCounter value={stats.totalUsers} />
                  </div>
                </div>
                <Users className="h-8 w-8 text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-blue-300 text-sm font-medium">Active Projects</p>
                  <div className="text-2xl font-bold text-blue-400">
                    <AnimatedCounter value={stats.activeProjects} />
                  </div>
                </div>
                <Target className="h-8 w-8 text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-purple-300 text-sm font-medium">Tokens Earned</p>
                  <div className="text-2xl font-bold text-purple-400">
                    <AnimatedCounter value={stats.tokensEarned} />
                  </div>
                </div>
                <DollarSign className="h-8 w-8 text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-500/30">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-orange-300 text-sm font-medium">Carbon Offset</p>
                  <div className="text-2xl font-bold text-orange-400">
                    <AnimatedCounter value={stats.carbonOffset} />
                    <span className="text-sm text-orange-300 ml-1">tons</span>
                  </div>
                </div>
                <Leaf className="h-8 w-8 text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Progress Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Activity className="h-5 w-5" />
                Project Completion Rate
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Completed Projects</span>
                  <span className="text-green-400 font-bold">{stats.projectsCompleted}/156</span>
                </div>
                <Progress value={(stats.projectsCompleted / 156) * 100} className="h-3" />
                <div className="text-xs text-muted-foreground">
                  {((stats.projectsCompleted / 156) * 100).toFixed(1)}% completion rate
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Award className="h-5 w-5" />
                Community Engagement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Community Score</span>
                  <span className="text-purple-400 font-bold">{stats.communityScore}/100</span>
                </div>
                <Progress value={stats.communityScore} className="h-3" />
                <Badge className="bg-purple-600 text-white">
                  {stats.communityScore >= 90 ? 'Excellent' : stats.communityScore >= 70 ? 'Good' : 'Growing'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Globe className="h-5 w-5" />
              Recent Environmental Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-green-800/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Leaf className="h-5 w-5 text-green-400" />
                  <div>
                    <div className="font-medium text-white">Ocean Cleanup Project</div>
                    <div className="text-sm text-muted-foreground">2,500 tons of plastic removed</div>
                  </div>
                </div>
                <Badge className="bg-green-600">Active</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-800/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <Target className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="font-medium text-white">Forest Restoration</div>
                    <div className="text-sm text-muted-foreground">50,000 trees planted this month</div>
                  </div>
                </div>
                <Badge className="bg-blue-600">Ongoing</Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-purple-800/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <TrendingUp className="h-5 w-5 text-purple-400" />
                  <div>
                    <div className="font-medium text-white">Renewable Energy Initiative</div>
                    <div className="text-sm text-muted-foreground">15MW solar capacity added</div>
                  </div>
                </div>
                <Badge className="bg-purple-600">Completed</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
