
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  useEarningActivities, 
  useUserProfile, 
  useBadges, 
  useAchievements,
  EarningActivity 
} from '@/hooks/useEarningSystem'
import { 
  Droplets, 
  Leaf, 
  Home, 
  GraduationCap, 
  Users, 
  Briefcase,
  Star,
  Trophy,
  Target,
  TrendingUp,
  Calendar,
  Award,
  Zap
} from 'lucide-react'

export default function EarningActivitiesDashboard() {
  const [activeTab, setActiveTab] = useState('activities')
  const userId = 'current-user'

  // Pass userId to all hooks
  const { 
    activities, 
    addActivity, 
    isLoading: activitiesLoading,
    recordBeeHotel,
    recordWaterSaving,
    recordEnvironmentalEducation,
    recordHomeGrownFood,
    processReferral,
    recordSkillBasedWork
  } = useEarringActivities(userId)

  const { profile, isLoading: profileLoading, stats } = useUserProfile(userId)
  const { badges, isLoading: badgesLoading } = useBadges(userId)
  const { achievements, isLoading: achievementsLoading } = useAchievements(userId)

  useEffect(() => {
    // Load initial data
  }, [])

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'water_saving': return <Droplets className="h-4 w-4 text-blue-400" />
      case 'bee_hotel': return <Home className="h-4 w-4 text-yellow-400" />
      case 'environmental_education': return <GraduationCap className="h-4 w-4 text-green-400" />
      case 'home_grown_food': return <Leaf className="h-4 w-4 text-emerald-400" />
      case 'referral': return <Users className="h-4 w-4 text-purple-400" />
      case 'skill_based_work': return <Briefcase className="h-4 w-4 text-orange-400" />
      default: return <Star className="h-4 w-4 text-gray-400" />
    }
  }

  const ActivityCard = ({ activity }: { activity: EarningActivity }) => (
    <Card className="bg-card/50 border-green-500/20">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            {getActivityIcon(activity.type)}
            <div>
              <h4 className="font-semibold text-white">{activity.title}</h4>
              <p className="text-sm text-muted-foreground">{activity.description}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant="secondary" className="text-xs">
                  +{activity.pointsEarned} points
                </Badge>
                <Badge variant="outline" className="text-xs">
                  +{activity.tokensEarned} tokens
                </Badge>
                <Badge 
                  variant={activity.status === 'completed' ? 'default' : 'secondary'}
                  className="text-xs"
                >
                  {activity.status}
                </Badge>
              </div>
            </div>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            {new Date(activity.timestamp).toLocaleDateString()}
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const QuickActions = () => (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
      <Button 
        onClick={() => recordWaterSaving({ amount: 100, method: 'rain_collection' })}
        className="bg-blue-600 hover:bg-blue-700 h-16"
      >
        <Droplets className="h-5 w-5 mr-2" />
        Log Water Saving
      </Button>
      <Button 
        onClick={() => recordBeeHotel({ hotelType: 'bamboo', size: 'medium' })}
        className="bg-yellow-600 hover:bg-yellow-700 h-16"
      >
        <Home className="h-5 w-5 mr-2" />
        Bee Hotel Update
      </Button>
      <Button 
        onClick={() => recordEnvironmentalEducation({ topic: 'sustainability', duration: 2 })}
        className="bg-green-600 hover:bg-green-700 h-16"
      >
        <GraduationCap className="h-5 w-5 mr-2" />
        Education Activity
      </Button>
    </div>
  )

  const StatsOverview = () => (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      <Card className="bg-green-900/30 border-green-500/30">
        <CardContent className="p-4 text-center">
          <Star className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-yellow-400">{stats.totalPoints}</div>
          <div className="text-xs text-muted-foreground">Total Points</div>
        </CardContent>
      </Card>
      <Card className="bg-blue-900/30 border-blue-500/30">
        <CardContent className="p-4 text-center">
          <Zap className="h-6 w-6 text-blue-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-blue-400">{stats.totalTokens}</div>
          <div className="text-xs text-muted-foreground">Total Tokens</div>
        </CardContent>
      </Card>
      <Card className="bg-purple-900/30 border-purple-500/30">
        <CardContent className="p-4 text-center">
          <Trophy className="h-6 w-6 text-purple-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-purple-400">{stats.level}</div>
          <div className="text-xs text-muted-foreground">Level</div>
        </CardContent>
      </Card>
      <Card className="bg-orange-900/30 border-orange-500/30">
        <CardContent className="p-4 text-center">
          <TrendingUp className="h-6 w-6 text-orange-400 mx-auto mb-2" />
          <div className="text-2xl font-bold text-orange-400">{stats.streak}</div>
          <div className="text-xs text-muted-foreground">Day Streak</div>
        </CardContent>
      </Card>
    </div>
  )

  const BadgesSection = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-green-400 flex items-center gap-2">
        <Award className="h-5 w-5" />
        Your Badges ({badges.length})
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {badges.map((badge) => (
          <Card key={badge.id} className="bg-card/50 border-yellow-500/20">
            <CardContent className="p-4 text-center">
              <div className="text-3xl mb-2">{badge.icon}</div>
              <h4 className="font-semibold text-white text-sm">{badge.name}</h4>
              <p className="text-xs text-muted-foreground mt-1">{badge.description}</p>
              <Badge 
                className={`mt-2 text-xs ${
                  badge.rarity === 'legendary' ? 'bg-gold-600' :
                  badge.rarity === 'epic' ? 'bg-purple-600' :
                  badge.rarity === 'rare' ? 'bg-blue-600' :
                  badge.rarity === 'uncommon' ? 'bg-green-600' :
                  'bg-gray-600'
                }`}
              >
                {badge.rarity}
              </Badge>
              {badge.earnedDate && (
                <div className="text-xs text-muted-foreground mt-1">
                  Earned: {badge.earnedDate.toLocaleDateString()}
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  const AchievementsSection = () => (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-blue-400 flex items-center gap-2">
        <Target className="h-5 w-5" />
        Achievements ({achievements.filter(a => a.completed).length}/{achievements.length})
      </h3>
      <div className="space-y-3">
        {achievements.map((achievement) => (
          <Card key={achievement.id} className="bg-card/50 border-blue-500/20">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-semibold text-white">{achievement.title}</h4>
                  <p className="text-sm text-muted-foreground">{achievement.description}</p>
                </div>
                <Badge variant={achievement.completed ? 'default' : 'secondary'}>
                  {achievement.completed ? 'Completed' : 'In Progress'}
                </Badge>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{achievement.progress}/{achievement.maxProgress}</span>
                </div>
                <Progress 
                  value={(achievement.progress / achievement.maxProgress) * 100}
                  className="h-2"
                />
                <div className="text-xs text-muted-foreground">
                  Reward: {achievement.reward.points} points, {achievement.reward.tokens} tokens
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )

  if (activitiesLoading || profileLoading || badgesLoading || achievementsLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin text-6xl">🌱</div>
          <h2 className="text-2xl font-bold text-primary">Loading Your Eco Journey...</h2>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 to-blue-900/20 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              🌱 Your Eco Activities Dashboard
            </CardTitle>
            <div className="text-center">
              <p className="text-xl text-muted-foreground">
                Track your environmental impact and earn rewards for making a difference!
              </p>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Overview */}
        <StatsOverview />

        {/* Quick Actions */}
        <QuickActions />

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="activities">📅 Recent Activities</TabsTrigger>
            <TabsTrigger value="badges">🏅 Badges</TabsTrigger>
            <TabsTrigger value="achievements">🎯 Achievements</TabsTrigger>
            <TabsTrigger value="leaderboard">🏆 Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="activities" className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-green-400">Recent Activities</h3>
              {activities.length === 0 ? (
                <Card className="bg-card/50 border-gray-500/20">
                  <CardContent className="p-8 text-center">
                    <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-400 mb-2">No Activities Yet</h4>
                    <p className="text-muted-foreground">
                      Start your eco journey by logging your first environmental activity!
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-3">
                  {activities.slice(0, 10).map((activity) => (
                    <ActivityCard key={activity.id} activity={activity} />
                  ))}
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="badges" className="space-y-6">
            <BadgesSection />
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <AchievementsSection />
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-6">
            <Card className="bg-card/50 border-gold-500/30">
              <CardContent className="p-8 text-center">
                <Trophy className="h-16 w-16 text-gold-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-gold-400 mb-2">Global Leaderboard</h3>
                <p className="text-muted-foreground mb-4">
                  See how you rank against other eco-warriors worldwide!
                </p>
                <Button className="bg-gold-600 hover:bg-gold-700">
                  View Full Leaderboard
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
