
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  User, 
  Edit,
  Trophy,
  Coins,
  Heart,
  Leaf,
  Users,
  Calendar,
  MapPin,
  Link as LinkIcon,
  Settings
} from 'lucide-react'
import { useEarningActivities, useUserProfile, useBadges, useAchievements } from '@/hooks/useEarningSystem'
import { EarningActivityType } from '@/types/gaia-types'

export interface UserProfileProps {
  isOwner?: boolean
}

export function UserProfile({ isOwner = false }: UserProfileProps) {
  const [isEditing, setIsEditing] = useState(false)
  const { activities: recentActivities } = useEarningActivities()
  const { profile: userProfile } = useUserProfile()
  const { badges } = useBadges()
  const { achievements } = useAchievements()

  const mockUser = {
    id: '1',
    name: 'Gaia Earth Guardian',
    avatar: '/placeholder-avatar.jpg',
    bio: 'Environmental advocate working towards a sustainable future 🌱',
    location: 'Earth',
    joinDate: '2024-01-15',
    website: 'https://gaia.earth',
    stats: {
      totalPoints: userProfile?.totalPoints || 12450,
      totalTokens: userProfile?.totalTokens || 245,
      level: userProfile?.level || 12,
      completedActivities: recentActivities?.length || 0,
      badges: badges?.length || 0,
      achievements: achievements?.length || 0
    }
  }

  const recentActivity = recentActivities?.slice(0, 5).map(activity => ({
    id: activity.id,
    type: activity.type,
    description: getActivityDescription(activity.type),
    points: activity.points || 0,
    date: activity.timestamp,
    verified: activity.verified
  })) || []

  function getActivityDescription(type: EarningActivityType): string {
    switch (type) {
      case EarningActivityType.BEE_HOTEL:
        return 'Built a bee hotel'
      case EarningActivityType.WATER_SAVING:
        return 'Saved water'
      case EarningActivityType.ENVIRONMENTAL_EDUCATION:
        return 'Completed environmental education'
      case EarningActivityType.HOME_GROWN_FOOD:
        return 'Grew food at home'
      case EarningActivityType.REFERRAL:
        return 'Referred a friend'
      case EarningActivityType.SKILL_BASED:
        return 'Completed skill-based work'
      default:
        return 'Environmental activity'
    }
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="border-green-500/20 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-20 w-20 border-2 border-green-500/30">
                <AvatarImage src={mockUser.avatar} alt={mockUser.name} />
                <AvatarFallback className="bg-green-600 text-white text-xl">
                  {mockUser.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-green-400">{mockUser.name}</h1>
                <p className="text-muted-foreground">{mockUser.bio}</p>
                <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {mockUser.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Joined {new Date(mockUser.joinDate).toLocaleDateString()}
                  </div>
                </div>
              </div>
            </div>
            {isOwner && (
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsEditing(!isEditing)}
                className="border-green-500/30 text-green-400"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-blue-500/20 bg-blue-900/10">
          <CardContent className="p-4 text-center">
            <Coins className="h-8 w-8 text-blue-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-400">{mockUser.stats.totalPoints}</div>
            <div className="text-sm text-muted-foreground">Total Points</div>
          </CardContent>
        </Card>

        <Card className="border-green-500/20 bg-green-900/10">
          <CardContent className="p-4 text-center">
            <Leaf className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400">{mockUser.stats.totalTokens}</div>
            <div className="text-sm text-muted-foreground">GAIA Tokens</div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-purple-900/10">
          <CardContent className="p-4 text-center">
            <Trophy className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-400">{mockUser.stats.level}</div>
            <div className="text-sm text-muted-foreground">Level</div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/20 bg-yellow-900/10">
          <CardContent className="p-4 text-center">
            <Heart className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-yellow-400">{mockUser.stats.completedActivities}</div>
            <div className="text-sm text-muted-foreground">Activities</div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Profile */}
      <Tabs defaultValue="activity" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="stats">Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-400">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <div>
                        <p className="font-medium">{activity.description}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-600 text-white">
                        +{activity.points} pts
                      </Badge>
                      {activity.verified && (
                        <Badge className="bg-blue-600 text-white">Verified</Badge>
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
              <CardTitle className="text-green-400">Earned Badges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {badges?.map((badge) => (
                  <div key={badge.id} className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl mb-2">{badge.icon}</div>
                    <p className="font-medium">{badge.name}</p>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-400">Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements?.map((achievement) => (
                  <div key={achievement.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">🏆</div>
                      <div>
                        <p className="font-medium">{achievement.name}</p>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                      </div>
                    </div>
                    <Badge className="bg-purple-600 text-white">
                      Achievement
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-green-400">Detailed Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span>Level Progress</span>
                    <span>{mockUser.stats.level}/20</span>
                  </div>
                  <Progress value={(mockUser.stats.level / 20) * 100} className="h-2" />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">{mockUser.stats.badges}</div>
                    <div className="text-sm text-muted-foreground">Badges Earned</div>
                  </div>
                  <div className="text-center p-4 bg-muted/50 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">{mockUser.stats.achievements}</div>
                    <div className="text-sm text-muted-foreground">Achievements</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
