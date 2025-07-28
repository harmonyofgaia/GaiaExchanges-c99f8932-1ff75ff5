
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  Coins, 
  TrendingUp, 
  Award, 
  Target,
  Calendar,
  Activity,
  Flame,
  Trophy,
  Clock,
  CheckCircle,
  AlertCircle,
  Users,
  Leaf,
  Zap
} from 'lucide-react'
import { useEarningActivities, useUserProfile } from '@/hooks/useEarningSystem'
import { BeeHotelActions } from '@/components/earning/BeeHotelActions'
import { WaterSavingActions } from '@/components/earning/WaterSavingActions'
import { EnvironmentalEducationActions } from '@/components/earning/EnvironmentalEducationActions'
import { CarbonCreditActions } from '@/components/earning/CarbonCreditActions'
import { HomeGrownFoodActions } from '@/components/earning/HomeGrownFoodActions'
import { ReferralSystem } from '@/components/earning/ReferralSystem'
import { SkillBasedEarning } from '@/components/earning/SkillBasedEarning'

export default function EarningActivitiesDashboard() {
  const [activeCategory, setActiveCategory] = useState('overview')
  const [timeFilter, setTimeFilter] = useState('all')
  const userId = 'current-user'
  
  const { activities, loading } = useEarningActivities(userId)
  const { stats, profile } = useUserProfile(userId)

  // Enhanced stats with time filtering
  const [filteredActivities, setFilteredActivities] = useState(activities)

  useEffect(() => {
    if (timeFilter === 'today') {
      const today = new Date().toDateString()
      setFilteredActivities(activities.filter(activity => 
        activity.timestamp.toDateString() === today
      ))
    } else if (timeFilter === 'week') {
      const weekAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
      setFilteredActivities(activities.filter(activity => 
        activity.timestamp >= weekAgo
      ))
    } else if (timeFilter === 'month') {
      const monthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
      setFilteredActivities(activities.filter(activity => 
        activity.timestamp >= monthAgo
      ))
    } else {
      setFilteredActivities(activities)
    }
  }, [activities, timeFilter])

  const categories = [
    { id: 'overview', label: '📊 Overview', icon: Activity },
    { id: 'bee-hotel', label: '🐝 Bee Hotels', icon: Target },
    { id: 'water-saving', label: '💧 Water Saving', icon: TrendingUp },
    { id: 'education', label: '📚 Education', icon: Award },
    { id: 'carbon-credits', label: '🌱 Carbon Credits', icon: Coins },
    { id: 'home-grown', label: '🌿 Home Grown Food', icon: Calendar },
    { id: 'referrals', label: '👥 Referrals', icon: Activity },
    { id: 'skills', label: '🛠️ Skills', icon: Target }
  ]

  const achievements = [
    { id: 1, name: 'First Steps', description: 'Complete your first earning activity', progress: 100, maxProgress: 100, unlocked: true },
    { id: 2, name: 'Water Guardian', description: 'Save 1000L of water', progress: 750, maxProgress: 1000, unlocked: false },
    { id: 3, name: 'Bee Friend', description: 'Maintain 5 bee hotels', progress: 3, maxProgress: 5, unlocked: false },
    { id: 4, name: 'Green Teacher', description: 'Complete 10 education activities', progress: 7, maxProgress: 10, unlocked: false }
  ]

  const levelProgress = ((stats.totalPoints % 1000) / 1000) * 100
  const nextLevelPoints = 1000 - (stats.totalPoints % 1000)

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading your earning activities...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6 space-y-6">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
          🌍 GAiA Earning Activities Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Harmony of Culture - Track your environmental impact and earn GAiA tokens
        </p>
        <div className="flex justify-center gap-2 mt-4">
          <Button 
            variant={timeFilter === 'all' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeFilter('all')}
          >
            All Time
          </Button>
          <Button 
            variant={timeFilter === 'today' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeFilter('today')}
          >
            Today
          </Button>
          <Button 
            variant={timeFilter === 'week' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeFilter('week')}
          >
            This Week
          </Button>
          <Button 
            variant={timeFilter === 'month' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setTimeFilter('month')}
          >
            This Month
          </Button>
        </div>
      </div>

      {/* Enhanced Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-green-800/10">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-400">Total GAiA Points</p>
                <p className="text-2xl font-bold text-green-400">{stats.totalPoints.toLocaleString()}</p>
                <div className="flex items-center gap-1 text-xs text-green-300/80 mt-1">
                  <TrendingUp className="h-3 w-3" />
                  <span>+{filteredActivities.reduce((sum, a) => sum + a.pointsEarned, 0)} this period</span>
                </div>
              </div>
              <Coins className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-blue-800/10">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-400">GAiA Tokens</p>
                <p className="text-2xl font-bold text-blue-400">{stats.totalTokens.toLocaleString()}</p>
                <div className="flex items-center gap-1 text-xs text-blue-300/80 mt-1">
                  <Zap className="h-3 w-3" />
                  <span>+{filteredActivities.reduce((sum, a) => sum + a.tokensEarned, 0)} this period</span>
                </div>
              </div>
              <Award className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-purple-800/10">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-400">Current Level</p>
                <p className="text-2xl font-bold text-purple-400">{stats.level}</p>
                <div className="text-xs text-purple-300/80 mt-1">
                  {nextLevelPoints} points to next level
                </div>
              </div>
              <Trophy className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/30 bg-gradient-to-br from-orange-900/20 to-orange-800/10">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-400">Current Streak</p>
                <p className="text-2xl font-bold text-orange-400">{stats.streak} days</p>
                <div className="flex items-center gap-1 text-xs text-orange-300/80 mt-1">
                  <Flame className="h-3 w-3" />
                  <span>Keep going!</span>
                </div>
              </div>
              <Target className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card className="border-purple-500/20 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Trophy className="h-5 w-5" />
            Level Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Level {stats.level}</span>
              <span>Level {stats.level + 1}</span>
            </div>
            <Progress value={levelProgress} className="h-3" />
            <div className="text-center text-sm text-muted-foreground">
              {stats.totalPoints.toLocaleString()} / {((Math.floor(stats.totalPoints / 1000) + 1) * 1000).toLocaleString()} points
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Activity Categories */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid grid-cols-4 md:grid-cols-8">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-xs">
              {category.label.split(' ')[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Quick Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="border-green-500/20">
              <CardHeader>
                <CardTitle className="text-lg">📈 Activity Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Total Activities</span>
                    <span className="font-semibold">{activities.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">This Period</span>
                    <span className="font-semibold">{filteredActivities.length}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                    <span className="font-semibold text-green-400">
                      {activities.length > 0 ? Math.round((activities.filter(a => a.status === 'completed').length / activities.length) * 100) : 0}%
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-lg">🏆 Achievements</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {achievements.slice(0, 3).map((achievement) => (
                    <div key={achievement.id} className="space-y-1">
                      <div className="flex justify-between text-sm">
                        <span className={achievement.unlocked ? 'text-yellow-400' : 'text-muted-foreground'}>
                          {achievement.unlocked ? '🏆' : '🔒'} {achievement.name}
                        </span>
                      </div>
                      <Progress 
                        value={(achievement.progress / achievement.maxProgress) * 100} 
                        className="h-1"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-lg">⚡ Live Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-sm">System Active</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Network Health</span>
                    <span className="text-green-400">99.9%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Token Price</span>
                    <span className="text-blue-400">$3.25</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activities */}
          <Card>
            <CardHeader>
              <CardTitle>📊 Recent Activity History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredActivities.slice(0, 8).map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border border-muted/50">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${
                        activity.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                        activity.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {activity.status === 'completed' ? <CheckCircle className="h-4 w-4" /> :
                         activity.status === 'pending' ? <Clock className="h-4 w-4" /> :
                         <AlertCircle className="h-4 w-4" />}
                      </div>
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground">
                          {activity.timestamp.toLocaleDateString()} at {activity.timestamp.toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <Badge variant="outline" className="mb-1">
                        +{activity.pointsEarned} pts
                      </Badge>
                      <div className="text-xs text-muted-foreground">
                        +{activity.tokensEarned} GAiA
                      </div>
                    </div>
                  </div>
                ))}
                {filteredActivities.length === 0 && (
                  <div className="text-center py-8">
                    <Leaf className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">No activities found for this period</p>
                    <p className="text-sm text-muted-foreground">Start earning by completing eco-friendly activities!</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Achievements Detail */}
          <Card>
            <CardHeader>
              <CardTitle>🏅 Achievement Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="p-4 border border-muted rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{achievement.unlocked ? '🏆' : '🔒'}</span>
                        <span className={`font-medium ${achievement.unlocked ? 'text-yellow-400' : 'text-muted-foreground'}`}>
                          {achievement.name}
                        </span>
                      </div>
                      <Badge variant={achievement.unlocked ? 'default' : 'secondary'}>
                        {achievement.progress}/{achievement.maxProgress}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                    <Progress 
                      value={(achievement.progress / achievement.maxProgress) * 100} 
                      className="h-2"
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bee-hotel">
          <BeeHotelActions />
        </TabsContent>

        <TabsContent value="water-saving">
          <WaterSavingActions />
        </TabsContent>

        <TabsContent value="education">
          <EnvironmentalEducationActions />
        </TabsContent>

        <TabsContent value="carbon-credits">
          <CarbonCreditActions />
        </TabsContent>

        <TabsContent value="home-grown">
          <HomeGrownFoodActions />
        </TabsContent>

        <TabsContent value="referrals">
          <ReferralSystem />
        </TabsContent>

        <TabsContent value="skills">
          <SkillBasedEarning />
        </TabsContent>
      </Tabs>
    </div>
  )
}
