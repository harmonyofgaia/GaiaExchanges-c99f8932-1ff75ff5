import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Settings,
  DollarSign,
  Shield,
  AlertTriangle,
  Target,
  Vote,
  Coins,
  Activity,
  CheckCircle,
  Users,
  Award,
  Flame,
  TreePine,
  Heart,
  Zap,
  BarChart3,
  Clock,
  Globe,
  Wallet,
  Star,
  Trophy,
  TrendingUp
} from 'lucide-react'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { AnimatedCounter } from '@/components/ui/animated-counter'

export default function SandProtect() {
  const [activeTab, setActiveTab] = useState('overview')
  const [protectionStats, setProtectionStats] = useState({
    totalProtected: 15847,
    activeGuardians: 2456,
    tokensEarned: 156789,
    threatsBlocked: 342,
    ecosystemHealth: 89.7,
    communityVotes: 8934
  })

  useEffect(() => {
    // Simulate protection stats updates
    const interval = setInterval(() => {
      setProtectionStats(prev => ({
        ...prev,
        totalProtected: prev.totalProtected + Math.floor(Math.random() * 10),
        activeGuardians: prev.activeGuardians + Math.floor(Math.random() * 5),
        tokensEarned: prev.tokensEarned + Math.floor(Math.random() * 100),
        threatsBlocked: prev.threatsBlocked + Math.floor(Math.random() * 2),
        ecosystemHealth: Math.min(100, prev.ecosystemHealth + Math.random() * 0.1),
        communityVotes: prev.communityVotes + Math.floor(Math.random() * 10)
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 dark:from-gray-900 dark:via-yellow-900/10 dark:to-orange-900/10">
      {/* Header */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <UniversalGaiaLogo 
            size="lg" 
            animated={true} 
            showText={true}
            className="mx-auto mb-6"
          />
          <h1 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-600 to-orange-600 mb-6">
            🏜️ Sand Protection Initiative
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
            Protect our desert ecosystems and prevent desertification through community action and innovative technology
          </p>
        </div>
      </section>

      {/* Protection Stats */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-12">
            <Card className="text-center border-yellow-200 bg-gradient-to-br from-yellow-50 to-orange-50">
              <CardContent className="p-6">
                <Shield className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-yellow-600">
                  <AnimatedCounter value={protectionStats.totalProtected} />
                </div>
                <div className="text-sm text-muted-foreground">Areas Protected</div>
              </CardContent>
            </Card>
            
            <Card className="text-center border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
              <CardContent className="p-6">
                <Users className="h-8 w-8 text-orange-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-orange-600">
                  <AnimatedCounter value={protectionStats.activeGuardians} />
                </div>
                <div className="text-sm text-muted-foreground">Active Guardians</div>
              </CardContent>
            </Card>
            
            <Card className="text-center border-red-200 bg-gradient-to-br from-red-50 to-pink-50">
              <CardContent className="p-6">
                <Award className="h-8 w-8 text-red-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-red-600">
                  <AnimatedCounter value={protectionStats.tokensEarned} />
                </div>
                <div className="text-sm text-muted-foreground">Tokens Earned</div>
              </CardContent>
            </Card>

            <Card className="text-center border-purple-200 bg-gradient-to-br from-purple-50 to-indigo-50">
              <CardContent className="p-6">
                <Target className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-purple-600">
                  <AnimatedCounter value={protectionStats.threatsBlocked} />
                </div>
                <div className="text-sm text-muted-foreground">Threats Blocked</div>
              </CardContent>
            </Card>

            <Card className="text-center border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardContent className="p-6">
                <Flame className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-green-600">
                  <AnimatedCounter value={protectionStats.ecosystemHealth} decimals={1} />%
                </div>
                <div className="text-sm text-muted-foreground">Ecosystem Health</div>
              </CardContent>
            </Card>

            <Card className="text-center border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardContent className="p-6">
                <TreePine className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-blue-600">
                  <AnimatedCounter value={protectionStats.communityVotes} />
                </div>
                <div className="text-sm text-muted-foreground">Community Votes</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Main Content Tabs */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="protection">Protection</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
              <TabsTrigger value="governance">Governance</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="h-5 w-5" />
                      Protection Overview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Desert Areas Protected</span>
                        <Badge className="bg-green-100 text-green-800">
                          {protectionStats.totalProtected.toLocaleString()} km²
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Active Monitoring</span>
                        <Badge className="bg-blue-100 text-blue-800">24/7</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Threat Level</span>
                        <Badge className="bg-yellow-100 text-yellow-800">Medium</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Community Impact
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Active Guardians</span>
                        <Badge className="bg-purple-100 text-purple-800">
                          {protectionStats.activeGuardians.toLocaleString()}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Community Votes</span>
                        <Badge className="bg-orange-100 text-orange-800">
                          {protectionStats.communityVotes.toLocaleString()}
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Participation Rate</span>
                        <Badge className="bg-green-100 text-green-800">87%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="protection" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Target className="h-5 w-5" />
                      Active Monitoring
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                      <div className="text-sm text-muted-foreground">Continuous Protection</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Flame className="h-5 w-5" />
                      Threat Prevention
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-orange-600 mb-2">98%</div>
                      <div className="text-sm text-muted-foreground">Success Rate</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TreePine className="h-5 w-5" />
                      Ecosystem Health
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {protectionStats.ecosystemHealth.toFixed(1)}%
                      </div>
                      <div className="text-sm text-muted-foreground">Overall Health</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Guardian Network
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {protectionStats.activeGuardians.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Active Guardians</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="earnings" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5" />
                      Total Earnings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">
                        {protectionStats.tokensEarned.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">GAIA Tokens</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Heart className="h-5 w-5" />
                      Community Rewards
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600 mb-2">25,340</div>
                      <div className="text-sm text-muted-foreground">Distributed</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Active Earnings
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <Zap className="h-5 w-5 text-yellow-600" />
                      <Badge className="bg-green-100 text-green-800">ACTIVE</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      Growth Rate
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <AlertTriangle className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                      <div className="text-sm text-muted-foreground">Calculating...</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="governance" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Vote className="h-5 w-5" />
                      Active Proposals
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">Expand Protection Zone</span>
                          <Badge className="bg-blue-100 text-blue-800">ACTIVE</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Vote className="h-4 w-4" />
                          <span>1,234 votes</span>
                        </div>
                      </div>
                      
                      <div className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium">New Guardian Rewards</span>
                          <Badge className="bg-green-100 text-green-800">PASSING</Badge>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Vote className="h-4 w-4" />
                          <span>2,567 votes</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Users className="h-5 w-5" />
                      Governance Stats
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span>Total Proposals</span>
                        <Badge className="bg-purple-100 text-purple-800">45</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Active Voters</span>
                        <Badge className="bg-blue-100 text-blue-800">3,421</Badge>
                      </div>
                      <div className="flex justify-between items-center">
                        <span>Participation Rate</span>
                        <Badge className="bg-green-100 text-green-800">78%</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="community" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Vote className="h-5 w-5" />
                      Community Voting
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {protectionStats.communityVotes.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">Total Votes Cast</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Coins className="h-5 w-5" />
                      Token Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-yellow-600 mb-2">156K</div>
                      <div className="text-sm text-muted-foreground">Tokens Distributed</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5" />
                      Active Participation
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600 mb-2">89%</div>
                      <div className="text-sm text-muted-foreground">Participation Rate</div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="h-5 w-5" />
                      Wallet Analytics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Connected Wallets: 2,456</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Coins className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm">Active Transactions: 1,234</span>
                        <DollarSign className="h-4 w-4 text-green-600" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5" />
                      Performance Metrics
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-gold-600" />
                        <span className="text-sm">Top Performers: 123</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-silver-600" />
                        <span className="text-sm">Achievement Rate: 85%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5" />
                      Growth Trends
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Activity className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Monthly Growth: +15%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="h-4 w-4 text-purple-600" />
                        <span className="text-sm">Target Achievement: 87%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Flame className="h-4 w-4 text-orange-600" />
                        <span className="text-sm">Engagement Rate: 92%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Revenue Growth: +23%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      System Health
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <BarChart3 className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Uptime: 99.9%</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-4 w-4 text-blue-600" />
                        <span className="text-sm">Response Time: 0.3s</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Global Impact Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-yellow-900/10 to-orange-900/10">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Global Impact Dashboard</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Global Coverage
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600 mb-2">89</div>
                  <div className="text-sm text-muted-foreground">Countries Protected</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Real-time Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 text-green-600" />
                    <span className="text-sm">Live Transactions: 234</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-blue-600" />
                    <span className="text-sm">Active Guardians: 1,567</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Coins className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm">Tokens Earned: 12,345</span>
                    <DollarSign className="h-4 w-4 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  Achievements
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-gold-600" />
                    <span className="text-sm">Gold Guardians: 456</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-silver-600" />
                    <span className="text-sm">Silver Guardians: 789</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-bronze-600" />
                    <span className="text-sm">Bronze Guardians: 1,234</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  )
}
