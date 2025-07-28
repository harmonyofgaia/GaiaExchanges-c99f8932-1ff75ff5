
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Coins, 
  TrendingUp, 
  Award, 
  Target,
  Calendar,
  Activity
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
  const userId = 'current-user' // In real app, get from auth context
  
  const { activities, loading } = useEarningActivities(userId)
  const { stats } = useUserProfile(userId)

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
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
          🌍 Earning Activities Dashboard
        </h1>
        <p className="text-muted-foreground mt-2">
          Track your environmental impact and earn rewards
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-green-500/30 bg-green-900/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-green-400">Total Points</p>
                <p className="text-2xl font-bold text-green-400">{stats.totalPoints.toLocaleString()}</p>
              </div>
              <Coins className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-blue-400">Total Tokens</p>
                <p className="text-2xl font-bold text-blue-400">{stats.totalTokens.toLocaleString()}</p>
              </div>
              <Award className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-purple-400">Current Level</p>
                <p className="text-2xl font-bold text-purple-400">{stats.level}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-500/30 bg-orange-900/20">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-400">Current Streak</p>
                <p className="text-2xl font-bold text-orange-400">{stats.streak} days</p>
              </div>
              <Target className="h-8 w-8 text-orange-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Categories */}
      <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full">
        <TabsList className="grid grid-cols-4 md:grid-cols-8">
          {categories.map((category) => (
            <TabsTrigger key={category.id} value={category.id} className="text-xs">
              {category.label.split(' ')[0]}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>📊 Activity Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Recent Activities</h4>
                    <div className="space-y-2">
                      {activities.slice(0, 5).map((activity) => (
                        <div key={activity.id} className="flex items-center justify-between p-2 bg-muted/50 rounded">
                          <span className="text-sm">{activity.title}</span>
                          <Badge variant="outline">+{activity.pointsEarned} pts</Badge>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Progress to Next Level</h4>
                    <Progress value={65} className="mb-2" />
                    <p className="text-sm text-muted-foreground">2,350 / 5,000 points</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bee-hotel">
          <BeeHotelActions userId={userId} />
        </TabsContent>

        <TabsContent value="water-saving">
          <WaterSavingActions userId={userId} />
        </TabsContent>

        <TabsContent value="education">
          <EnvironmentalEducationActions userId={userId} />
        </TabsContent>

        <TabsContent value="carbon-credits">
          <CarbonCreditActions userId={userId} />
        </TabsContent>

        <TabsContent value="home-grown">
          <HomeGrownFoodActions userId={userId} />
        </TabsContent>

        <TabsContent value="referrals">
          <ReferralSystem userId={userId} />
        </TabsContent>

        <TabsContent value="skills">
          <SkillBasedEarning userId={userId} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
