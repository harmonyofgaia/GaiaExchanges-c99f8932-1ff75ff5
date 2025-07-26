import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Droplets, 
  Carrot, 
  Bug, 
  GraduationCap, 
  Briefcase, 
  Users, 
  Vote, 
  MapPin,
  Leaf,
  Image,
  AlertTriangle,
  Calendar,
  Lightbulb,
  Heart,
  Trophy,
  Coins,
  TrendingUp,
  BarChart3,
  Target,
  Star
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { WaterSavingActions } from '@/components/earning/WaterSavingActions'
import { HomeGrownFoodActions } from '@/components/earning/HomeGrownFoodActions'
import { BeeHotelActions } from '@/components/earning/BeeHotelActions'
import { EnvironmentalEducationActions } from '@/components/earning/EnvironmentalEducationActions'
import { ReferralSystem } from '@/components/earning/ReferralSystem'
import { CarbonCreditActions } from '@/components/earning/CarbonCreditActions'
import { SkillBasedEarning } from '@/components/earning/SkillBasedEarning'
import { useEarningActivities, useUserProfile, useBadges, useAchievements } from '@/hooks/useEarningSystem'
import { EarningActivityType } from '@/types/gaia-types'

const activityIcons = {
  [EarningActivityType.WATER_SAVING]: Droplets,
  [EarningActivityType.HOME_GROWN_FOOD]: Carrot,
  [EarningActivityType.BEE_HOTEL]: Bug,
  [EarningActivityType.ENVIRONMENTAL_EDUCATION]: GraduationCap,
  [EarningActivityType.SKILL_BASED]: Briefcase,
  [EarningActivityType.REFERRAL]: Users,
  [EarningActivityType.MISSION_VOTING]: Vote,
  [EarningActivityType.LOCATION_MISSION]: MapPin,
  [EarningActivityType.CARBON_CREDIT]: Leaf,
  [EarningActivityType.NFT_MARKETPLACE]: Image,
  [EarningActivityType.EMERGENCY_RESPONSE]: AlertTriangle,
  [EarningActivityType.LONG_TERM_COMMITMENT]: Calendar,
  [EarningActivityType.INNOVATION]: Lightbulb,
  [EarningActivityType.ACCESSIBILITY]: Heart
}

const activityNames = {
  [EarningActivityType.WATER_SAVING]: 'Water Saving',
  [EarningActivityType.HOME_GROWN_FOOD]: 'Home Grown Food',
  [EarningActivityType.BEE_HOTEL]: 'Bee Hotels',
  [EarningActivityType.ENVIRONMENTAL_EDUCATION]: 'Environmental Education',
  [EarningActivityType.SKILL_BASED]: 'Skill-Based Work',
  [EarningActivityType.REFERRAL]: 'Referral Program',
  [EarningActivityType.MISSION_VOTING]: 'Mission Voting',
  [EarningActivityType.LOCATION_MISSION]: 'Location Missions',
  [EarningActivityType.CARBON_CREDIT]: 'Carbon Credits',
  [EarningActivityType.NFT_MARKETPLACE]: 'NFT Marketplace',
  [EarningActivityType.EMERGENCY_RESPONSE]: 'Emergency Response',
  [EarningActivityType.LONG_TERM_COMMITMENT]: 'Long-term Commitment',
  [EarningActivityType.INNOVATION]: 'Innovation Bonuses',
  [EarningActivityType.ACCESSIBILITY]: 'Accessibility Rewards'
}

export default function EarningActivitiesDashboard() {
  const { activities, loadActivities, loading } = useEarningActivities()
  const { stats, loadProfile } = useUserProfile()
  const { badges, availableBadges, loadUserBadges, loadAvailableBadges } = useBadges()
  const { achievements, loadUserAchievements } = useAchievements()
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    loadActivities('current-user')
    loadProfile('current-user')
    loadUserBadges('current-user')
    loadAvailableBadges()
    loadUserAchievements('current-user')
  }, [])

  const totalPoints = stats?.totalPoints || 0
  const totalTokens = stats?.totalTokens || 0
  const currentLevel = Math.floor(totalPoints / 1000) + 1
  const nextLevelPoints = currentLevel * 1000
  const levelProgress = ((totalPoints % 1000) / 1000) * 100

  const recentActivities = activities.slice(0, 10)
  const completedAchievements = achievements.filter(a => a.completed)
  const inProgressAchievements = achievements.filter(a => !a.completed)

  // Filter activities by type for analytics
  const userWaterActions = activities.filter(a => a.type === 'water_saving')
  const userFoodActions = activities.filter(a => a.type === 'home_grown_food')
  const userBeeActions = activities.filter(a => a.type === 'bee_hotel')
  const userCarbonActions = activities.filter(a => a.type === 'carbon_credit')

  // Calculate activity stats
  const activityStats = Object.values(EarningActivityType).map(type => ({
    type,
    name: activityNames[type],
    icon: activityIcons[type],
    count: activities.filter(a => a.type === type).length,
    points: activities.filter(a => a.type === type).reduce((sum, a) => sum + a.pointsEarned, 0),
    tokens: activities.filter(a => a.type === type).reduce((sum, a) => sum + a.tokensEarned, 0)
  })).sort((a, b) => b.points - a.points)

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🎯 Earning Activities Dashboard
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Track your environmental impact and earn GAIA tokens through various activities
          </p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Trophy className="h-10 w-10 text-yellow-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Total Points</p>
                  <p className="text-3xl font-bold text-yellow-400">{totalPoints.toLocaleString()}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Coins className="h-10 w-10 text-green-400" />
                <div>
                  <p className="text-sm text-muted-foreground">GAIA Tokens</p>
                  <p className="text-3xl font-bold text-green-400">{totalTokens.toFixed(3)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Star className="h-10 w-10 text-blue-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Level</p>
                  <p className="text-3xl font-bold text-blue-400">{currentLevel}</p>
                  <Progress value={levelProgress} className="mt-2 h-2" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-500/30 bg-gradient-to-r from-orange-900/30 to-red-900/30">
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <Target className="h-10 w-10 text-orange-400" />
                <div>
                  <p className="text-sm text-muted-foreground">Activities</p>
                  <p className="text-3xl font-bold text-orange-400">{activities.length}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 md:grid-cols-8 gap-1 bg-gray-800/50 overflow-x-auto">
            <TabsTrigger value="overview" className="text-xs">Overview</TabsTrigger>
            <TabsTrigger value="water" className="text-xs">Water</TabsTrigger>
            <TabsTrigger value="food" className="text-xs">Food</TabsTrigger>
            <TabsTrigger value="bees" className="text-xs">Bees</TabsTrigger>
            <TabsTrigger value="education" className="text-xs">Education</TabsTrigger>
            <TabsTrigger value="skills" className="text-xs">Skills</TabsTrigger>
            <TabsTrigger value="carbon" className="text-xs">Carbon</TabsTrigger>
            <TabsTrigger value="referrals" className="text-xs">Referrals</TabsTrigger>
          </TabsList>
          
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/50 mt-2">
            <TabsTrigger value="achievements" className="text-xs">Achievements</TabsTrigger>
            <TabsTrigger value="badges" className="text-xs">Badges</TabsTrigger>
            <TabsTrigger value="analytics" className="text-xs">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Activity Overview Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {activityStats.slice(0, 9).map((activity) => {
                const IconComponent = activity.icon
                return (
                  <Card key={activity.type} className="hover:border-green-400/50 transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <IconComponent className="h-5 w-5 text-green-400" />
                          <h3 className="font-semibold text-sm">{activity.name}</h3>
                        </div>
                        <Badge variant="secondary">{activity.count}</Badge>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Points:</span>
                          <span className="font-medium text-green-400">{activity.points}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Tokens:</span>
                          <span className="font-medium text-purple-400">{activity.tokens.toFixed(3)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>

            {/* Recent Activities */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Recent Activities</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {recentActivities.length > 0 ? (
                  <div className="space-y-3">
                    {recentActivities.map((activity) => {
                      const IconComponent = activityIcons[activity.type as EarningActivityType]
                      return (
                        <div key={activity.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <IconComponent className="h-5 w-5 text-green-400" />
                            <div>
                              <p className="font-medium">{activity.title}</p>
                              <p className="text-sm text-muted-foreground">{activity.description}</p>
                              <p className="text-xs text-muted-foreground">
                                {activity.timestamp.toLocaleDateString()}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-green-400">+{activity.pointsEarned} pts</p>
                            <p className="text-sm text-purple-400">+{activity.tokensEarned} GAIA</p>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <TrendingUp className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-lg font-medium">No activities yet</p>
                    <p className="text-muted-foreground">Start earning by participating in environmental activities!</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="water">
            <WaterSavingActions />
          </TabsContent>

          <TabsContent value="food">
            <HomeGrownFoodActions />
          </TabsContent>

          <TabsContent value="bees">
            <BeeHotelActions />
          </TabsContent>

          <TabsContent value="education">
            <EnvironmentalEducationActions />
          </TabsContent>

          <TabsContent value="referrals">
            <ReferralSystem />
          </TabsContent>

          <TabsContent value="skills">
            <SkillBasedEarning />
          </TabsContent>

          <TabsContent value="carbon">
            <CarbonCreditActions />
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            {/* Completed Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Trophy className="h-5 w-5 text-yellow-400" />
                  <span>Completed Achievements ({completedAchievements.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {completedAchievements.map((achievement) => (
                    <div key={achievement.id} className="p-4 border rounded-lg border-yellow-400/30 bg-yellow-900/10">
                      <div className="flex items-center space-x-3 mb-2">
                        <Trophy className="h-6 w-6 text-yellow-400" />
                        <h3 className="font-semibold">{achievement.title}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="bg-yellow-400/20 text-yellow-400">
                          Completed
                        </Badge>
                        <div className="text-right text-sm">
                          <p className="text-green-400">+{achievement.reward.points} pts</p>
                          <p className="text-purple-400">+{achievement.reward.tokens} GAIA</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* In Progress Achievements */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-blue-400" />
                  <span>In Progress ({inProgressAchievements.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {inProgressAchievements.map((achievement) => (
                    <div key={achievement.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-semibold">{achievement.title}</h3>
                        <span className="text-sm text-muted-foreground">
                          {achievement.progress}/{achievement.maxProgress}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                      <div className="space-y-2">
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-2"
                        />
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            Progress: {Math.round((achievement.progress / achievement.maxProgress) * 100)}%
                          </span>
                          <span className="text-green-400">
                            Reward: {achievement.reward.points} pts + {achievement.reward.tokens} GAIA
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="badges" className="space-y-6">
            {/* Earned Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Star className="h-5 w-5 text-purple-400" />
                  <span>Your Badges ({badges.length})</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                  {badges.map((badge) => (
                    <div key={badge.id} className="text-center p-4 border rounded-lg border-purple-400/30">
                      <div className="text-3xl mb-2">{badge.icon}</div>
                      <h3 className="font-semibold text-sm">{badge.name}</h3>
                      <Badge variant="secondary" className="mt-1 text-xs">
                        {badge.rarity}
                      </Badge>
                      <p className="text-xs text-muted-foreground mt-1">
                        {badge.pointsValue} pts
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Available Badges */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5 text-gray-400" />
                  <span>Available Badges</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {availableBadges.map((badge) => (
                    <div key={badge.id} className="p-4 border rounded-lg border-gray-400/30">
                      <div className="flex items-center space-x-3 mb-2">
                        <div className="text-2xl">{badge.icon}</div>
                        <div>
                          <h3 className="font-semibold">{badge.name}</h3>
                          <Badge variant="outline" className="text-xs">
                            {badge.rarity}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{badge.description}</p>
                      <div className="space-y-1">
                        <p className="text-xs font-medium">Requirements:</p>
                        {badge.requirements.map((req, index) => (
                          <p key={index} className="text-xs text-muted-foreground">• {req}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Activity Breakdown</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {activityStats.slice(0, 5).map((activity) => {
                      const IconComponent = activity.icon
                      const percentage = totalPoints > 0 ? (activity.points / totalPoints) * 100 : 0
                      return (
                        <div key={activity.type} className="space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <IconComponent className="h-4 w-4 text-green-400" />
                              <span className="text-sm font-medium">{activity.name}</span>
                            </div>
                            <span className="text-sm text-muted-foreground">
                              {activity.points} pts ({percentage.toFixed(1)}%)
                            </span>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Performance Metrics</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 border rounded-lg">
                        <p className="text-2xl font-bold text-green-400">{activities.length}</p>
                        <p className="text-sm text-muted-foreground">Total Activities</p>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <p className="text-2xl font-bold text-blue-400">{currentLevel}</p>
                        <p className="text-sm text-muted-foreground">Current Level</p>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <p className="text-2xl font-bold text-purple-400">{badges.length}</p>
                        <p className="text-sm text-muted-foreground">Badges Earned</p>
                      </div>
                      <div className="text-center p-3 border rounded-lg">
                        <p className="text-2xl font-bold text-yellow-400">{completedAchievements.length}</p>
                        <p className="text-sm text-muted-foreground">Achievements</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl mb-2">💧</div>
                    <p className="text-xl font-bold text-blue-400">
                      {userWaterActions?.reduce((sum, action) => 
                        sum + (action.metadata?.waterSavingAction?.waterSavedLiters || 0), 0
                      )?.toLocaleString() || 0}L
                    </p>
                    <p className="text-sm text-muted-foreground">Water Saved</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl mb-2">🌱</div>
                    <p className="text-xl font-bold text-green-400">
                      {userFoodActions?.reduce((sum, action) => 
                        sum + (action.metadata?.homeGrownFoodAction?.quantity || 0), 0
                      ) || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">Crops Grown</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl mb-2">🐝</div>
                    <p className="text-xl font-bold text-yellow-400">
                      {userBeeActions?.length || 0}
                    </p>
                    <p className="text-sm text-muted-foreground">Bee Hotels</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="text-2xl mb-2">🌿</div>
                    <p className="text-xl font-bold text-purple-400">
                      {userCarbonActions?.reduce((sum, action) => 
                        sum + (action.metadata?.carbonCreditAction?.carbonOffset || 0), 0
                      )?.toLocaleString() || 0} kg
                    </p>
                    <p className="text-sm text-muted-foreground">CO2 Offset</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}