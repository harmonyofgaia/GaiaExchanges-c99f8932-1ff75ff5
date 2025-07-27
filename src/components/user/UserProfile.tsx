
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { User, Trophy, Leaf, Zap, Heart, Star, Calendar, MapPin } from 'lucide-react'
import { UserProfile as UserProfileType } from '@/types/gaia-types'

interface UserProfileProps {
  userId?: string
  isOwner?: boolean
}

export const UserProfile = ({ userId, isOwner = false }: UserProfileProps) => {
  const [profile, setProfile] = useState<UserProfileType | null>(null)
  const [activeTab, setActiveTab] = useState('overview')

  useEffect(() => {
    // Mock data for now - replace with real API call
    setProfile({
      id: userId || 'user-123',
      username: 'EcoWarrior2024',
      email: 'eco@example.com',
      walletAddress: '0x742d35Cc6634C0532925a3b8D68C6F4B4B4B4B4B',
      totalPoints: 15420,
      totalTokens: 2847,
      level: 12,
      badges: [
        {
          id: 'water-saver',
          name: 'Water Saver',
          description: 'Saved 1000L of water',
          icon: '💧',
          rarity: 'common',
          requirements: ['Save 1000L water'],
          earnedAt: new Date(),
          pointsValue: 100
        },
        {
          id: 'tree-planter',
          name: 'Tree Planter',
          description: 'Planted 50 trees',
          icon: '🌳',
          rarity: 'rare',
          requirements: ['Plant 50 trees'],
          earnedAt: new Date(),
          pointsValue: 500
        }
      ],
      achievements: [
        {
          id: 'green-streak',
          title: 'Green Streak',
          description: 'Complete 30 days of eco activities',
          category: 'ENVIRONMENTAL_EDUCATION',
          progress: 23,
          maxProgress: 30,
          completed: false,
          reward: { points: 1000, tokens: 200 }
        }
      ],
      earningHistory: [],
      referralCode: 'ECO2024',
      createdAt: new Date('2024-01-15'),
      lastActive: new Date()
    })
  }, [userId])

  if (!profile) return <div className="flex items-center justify-center h-64">Loading...</div>

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
        <CardHeader>
          <div className="flex items-center gap-6">
            <Avatar className="h-20 w-20">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-green-600 text-white text-xl">
                {profile.username.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            
            <div className="flex-1 space-y-2">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-green-400">{profile.username}</h1>
                <Badge className="bg-green-600 text-white">Level {profile.level}</Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Joined {profile.createdAt.toLocaleDateString()}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  Global Community
                </div>
              </div>
              
              <div className="flex gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">{profile.totalPoints.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Points</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">{profile.totalTokens.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">GAiA Tokens</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">{profile.badges.length}</div>
                  <div className="text-sm text-muted-foreground">Badges</div>
                </div>
              </div>
            </div>
            
            {isOwner && (
              <Button className="bg-green-600 hover:bg-green-700">
                <User className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Profile Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="impact">Impact</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Badges */}
            <Card className="border-green-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Trophy className="h-5 w-5" />
                  Badges
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  {profile.badges.map((badge) => (
                    <div key={badge.id} className="flex items-center gap-2 p-3 bg-green-900/20 rounded-lg">
                      <span className="text-2xl">{badge.icon}</span>
                      <div>
                        <div className="font-semibold text-green-400">{badge.name}</div>
                        <div className="text-xs text-muted-foreground">{badge.description}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="border-blue-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Zap className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-2 bg-blue-900/20 rounded">
                    <Leaf className="h-4 w-4 text-green-400" />
                    <div className="flex-1 text-sm">Completed water saving challenge</div>
                    <div className="text-xs text-muted-foreground">2h ago</div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-blue-900/20 rounded">
                    <Heart className="h-4 w-4 text-pink-400" />
                    <div className="flex-1 text-sm">Donated to forest restoration</div>
                    <div className="text-xs text-muted-foreground">1d ago</div>
                  </div>
                  <div className="flex items-center gap-3 p-2 bg-blue-900/20 rounded">
                    <Star className="h-4 w-4 text-yellow-400" />
                    <div className="flex-1 text-sm">Earned Tree Planter badge</div>
                    <div className="text-xs text-muted-foreground">3d ago</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="achievements" className="space-y-6">
          <div className="grid gap-4">
            {profile.achievements.map((achievement) => (
              <Card key={achievement.id} className="border-purple-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold text-purple-400">{achievement.title}</h3>
                    <Badge variant={achievement.completed ? "default" : "secondary"}>
                      {achievement.completed ? 'Completed' : 'In Progress'}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{achievement.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{achievement.progress}/{achievement.maxProgress}</span>
                    </div>
                    <Progress value={(achievement.progress / achievement.maxProgress) * 100} />
                  </div>
                  <div className="flex gap-4 mt-3 text-sm">
                    <div className="flex items-center gap-1">
                      <Zap className="h-3 w-3 text-green-400" />
                      {achievement.reward.points} points
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-blue-400" />
                      {achievement.reward.tokens} tokens
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
        
        <TabsContent value="activity" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Activity History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Activity history will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="impact" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Environmental Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                Environmental impact metrics will be displayed here
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
