
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { User, Trophy, Activity, Star, Settings, MapPin, Calendar } from 'lucide-react'
import { useUserProfile, useEarningActivities, useBadges, useAchievements } from '@/hooks/useEarningSystem'
import { EarningActivityType } from '@/types/gaia-types'

interface UserProfileProps {
  userId?: string
}

export function UserProfile({ userId = 'default-user' }: UserProfileProps) {
  const { profile, stats, loadProfile, isLoading: profileLoading } = useUserProfile(userId)
  const { activities, loadActivities, isLoading: activitiesLoading } = useEarningActivities(userId)
  const { badges, loadUserBadges, isLoading: badgesLoading } = useBadges(userId)
  const { achievements, loadUserAchievements, isLoading: achievementsLoading } = useAchievements(userId)

  useEffect(() => {
    loadProfile(userId)
    loadActivities(userId)
    loadUserBadges(userId)
    loadUserAchievements(userId)
  }, [userId])

  const mockRecentActivities = [
    {
      id: '1',
      type: EarningActivityType.ENVIRONMENTAL_EDUCATION,
      title: 'Completed Environmental Course',
      description: 'Finished advanced climate science course',
      pointsEarned: 50,
      tokensEarned: 10,
      timestamp: new Date(),
      status: 'completed' as const,
      verified: true
    },
    {
      id: '2',
      type: EarningActivityType.WATER_SAVING,
      title: 'Water Conservation Action',
      description: 'Installed low-flow fixtures',
      pointsEarned: 30,
      tokensEarned: 6,
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
      status: 'completed' as const,
      verified: true
    }
  ]

  const mockBadges = [
    {
      id: '1',
      name: 'Eco Warrior',
      description: 'Completed 10 environmental activities',
      icon: '🌱',
      earned: true,
      earnedDate: new Date()
    },
    {
      id: '2',
      name: 'Water Guardian',
      description: 'Saved 1000L of water',
      icon: '💧',
      earned: true,
      earnedDate: new Date()
    }
  ]

  const mockAchievements = [
    {
      id: '1',
      name: 'Green Champion',
      description: 'Complete 100 eco activities',
      progress: 75,
      maxProgress: 100,
      completed: false,
      reward: 100
    },
    {
      id: '2',
      name: 'Community Leader',
      description: 'Refer 5 new members',
      progress: 3,
      maxProgress: 5,
      completed: false,
      reward: 150
    }
  ]

  if (profileLoading || activitiesLoading || badgesLoading || achievementsLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="border-green-500/30 bg-green-900/20">
        <CardContent className="p-6">
          <div className="flex items-center gap-6">
            <Avatar className="h-24 w-24 border-2 border-green-500">
              <AvatarImage src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${profile.username}`} />
              <AvatarFallback>{profile.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <h1 className="text-2xl font-bold text-green-400">{profile.username}</h1>
                <Badge className="bg-green-600">Level {profile.level}</Badge>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{stats.totalPoints}</div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{stats.totalTokens}</div>
                  <div className="text-sm text-muted-foreground">Total Tokens</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{stats.streak}</div>
                  <div className="text-sm text-muted-foreground">Day Streak</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-orange-400">{stats.activitiesCompleted}</div>
                  <div className="text-sm text-muted-foreground">Activities</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Profile Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="activities">Activities</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
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
                        <div className="text-sm text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="h-5 w-5" />
                  Latest Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {mockBadges.map((badge) => (
                    <div key={badge.id} className="text-center p-3 rounded-lg bg-muted/50">
                      <div className="text-2xl mb-1">{badge.icon}</div>
                      <div className="font-semibold text-sm">{badge.name}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="activities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {mockRecentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                        <Activity className="h-5 w-5 text-green-400" />
                      </div>
                      <div>
                        <div className="font-semibold">{activity.title}</div>
                        <div className="text-sm text-muted-foreground">{activity.description}</div>
                        <div className="text-xs text-muted-foreground">
                          {activity.timestamp.toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-400">+{activity.pointsEarned}</div>
                      <div className="text-sm text-blue-400">+{activity.tokensEarned} tokens</div>
                      {activity.verified && (
                        <Badge className="bg-green-600 mt-1">Verified</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="badges" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Badge Collection</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {mockBadges.map((badge) => (
                  <div key={badge.id} className="text-center p-4 rounded-lg border">
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <div className="font-semibold">{badge.name}</div>
                    <div className="text-sm text-muted-foreground mt-1">{badge.description}</div>
                    {badge.earned && (
                      <Badge className="bg-green-600 mt-2">Earned</Badge>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Achievement Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockAchievements.map((achievement) => (
                  <div key={achievement.id} className="p-4 rounded-lg border">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-semibold">{achievement.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {achievement.progress}/{achievement.maxProgress}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      {achievement.description}
                    </div>
                    <Progress 
                      value={(achievement.progress / achievement.maxProgress) * 100} 
                      className="mb-2"
                    />
                    <div className="flex items-center justify-between">
                      <div className="text-sm">
                        Reward: <span className="font-bold text-green-400">{achievement.reward} points</span>
                      </div>
                      {achievement.completed && (
                        <Badge className="bg-green-600">Completed</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
