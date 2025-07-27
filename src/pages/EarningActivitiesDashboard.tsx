
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Trophy, Zap, Star, TrendingUp, Award, Target } from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { 
  useEarningActivities, 
  useUserProfile, 
  useAchievements, 
  useBadges 
} from '@/hooks/useEarningSystem'

// Import earning components
import { BeeHotelActions } from '@/components/earning/BeeHotelActions'
import { WaterSavingActions } from '@/components/earning/WaterSavingActions'
import { EnvironmentalEducationActions } from '@/components/earning/EnvironmentalEducationActions'
import { HomeGrownFoodActions } from '@/components/earning/HomeGrownFoodActions'
import { ReferralSystem } from '@/components/earning/ReferralSystem'
import { SkillBasedEarning } from '@/components/earning/SkillBasedEarning'

export default function EarningActivitiesDashboard() {
  const userId = 'current-user'
  const [currentTab, setCurrentTab] = useState('overview')
  
  const {
    activities,
    recordBeeHotel,
    recordWaterSaving,
    recordEnvironmentalEducation,
    recordHomeGrownFood,
    processReferral,
    recordSkillBasedWork,
    isLoading: activitiesLoading
  } = useEarningActivities(userId)
  
  const { profile, stats, isLoading: profileLoading } = useUserProfile(userId)
  const { achievements, isLoading: achievementsLoading } = useAchievements(userId)
  const { badges, isLoading: badgesLoading } = useBadges(userId)

  // Mock data for demonstration
  const mockStats = {
    totalPoints: 2450,
    totalTokens: 490,
    weeklyPoints: 320,
    monthlyPoints: 1200,
    streak: 7,
    level: 12,
    rank: 156
  }

  const mockAchievements = [
    {
      id: '1',
      name: 'Eco Warrior',
      description: 'Complete 50 environmental activities',
      progress: 42,
      maxProgress: 50,
      completed: false,
      reward: { points: 100, tokens: 20 }
    },
    {
      id: '2',
      name: 'Water Guardian',
      description: 'Save 1000L of water',
      progress: 850,
      maxProgress: 1000,
      completed: false,
      reward: { points: 200, tokens: 40 }
    }
  ]

  const mockRecentActivities = [
    {
      id: '1',
      type: 'water_saving',
      title: 'Water Conservation Action',
      description: 'Installed low-flow fixtures',
      pointsEarned: 30,
      tokensEarned: 6,
      timestamp: new Date(),
      status: 'completed' as const,
      verified: true
    },
    {
      id: '2',
      type: 'bee_hotel',
      title: 'Bee Hotel Maintenance',
      description: 'Weekly maintenance of bamboo bee hotel',
      pointsEarned: 25,
      tokensEarned: 5,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'completed' as const,
      verified: true
    }
  ]

  const isLoading = activitiesLoading || profileLoading || achievementsLoading || badgesLoading

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🌱 Earning Activities Dashboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Earn points and tokens through environmental actions and community engagement
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
          <Card className="bg-green-900/20 border-green-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-400">{mockStats.totalPoints}</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </CardContent>
          </Card>
          
          <Card className="bg-blue-900/20 border-blue-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-400">{mockStats.totalTokens}</div>
              <div className="text-sm text-muted-foreground">Total Tokens</div>
            </CardContent>
          </Card>
          
          <Card className="bg-purple-900/20 border-purple-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-400">{mockStats.weeklyPoints}</div>
              <div className="text-sm text-muted-foreground">Weekly Points</div>
            </CardContent>
          </Card>
          
          <Card className="bg-orange-900/20 border-orange-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-400">{mockStats.streak}</div>
              <div className="text-sm text-muted-foreground">Day Streak</div>
            </CardContent>
          </Card>
          
          <Card className="bg-cyan-900/20 border-cyan-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-cyan-400">{mockStats.level}</div>
              <div className="text-sm text-muted-foreground">Level</div>
            </CardContent>
          </Card>
          
          <Card className="bg-pink-900/20 border-pink-500/30">
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-pink-400">#{mockStats.rank}</div>
              <div className="text-sm text-muted-foreground">Global Rank</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={currentTab} onValueChange={setCurrentTab}>
          <TabsList className="grid w-full grid-cols-3 lg:grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="water">Water</TabsTrigger>
            <TabsTrigger value="bee">Bee Hotel</TabsTrigger>
            <TabsTrigger value="food">Food</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="referral">Referral</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Activities */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5" />
                    Recent Activities
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {mockRecentActivities.map((activity) => (
                      <div key={activity.id} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <div className="font-semibold">{activity.title}</div>
                          <div className="text-sm text-muted-foreground">{activity.description}</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-green-400">+{activity.pointsEarned}</div>
                          <div className="text-sm text-blue-400">+{activity.tokensEarned} tokens</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Achievements Progress */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Achievement Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {mockAchievements.map((achievement) => (
                      <div key={achievement.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="font-semibold">{achievement.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {achievement.progress}/{achievement.maxProgress}
                          </div>
                        </div>
                        <Progress 
                          value={(achievement.progress / achievement.maxProgress) * 100} 
                          className="h-2"
                        />
                        <div className="text-sm text-muted-foreground">
                          Reward: {achievement.reward.points} points + {achievement.reward.tokens} tokens
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="water">
            <WaterSavingActions />
          </TabsContent>

          <TabsContent value="bee">
            <BeeHotelActions />
          </TabsContent>

          <TabsContent value="food">
            <HomeGrownFoodActions />
          </TabsContent>

          <TabsContent value="education">
            <EnvironmentalEducationActions />
          </TabsContent>

          <TabsContent value="skills">
            <SkillBasedEarning />
          </TabsContent>

          <TabsContent value="referral">
            <ReferralSystem />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
