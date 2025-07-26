import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Trophy, 
  Medal, 
  Award, 
  Crown,
  TrendingUp,
  TrendingDown,
  Minus,
  Droplets,
  Carrot,
  Bug,
  GraduationCap,
  Users,
  Star,
  Globe,
  Zap
} from 'lucide-react'
import { Navbar } from '@/components/Navbar'
import { useLeaderboard } from '@/hooks/useEarningSystem'
import { EarningActivityType } from '@/types/gaia-types'

const activityIcons = {
  [EarningActivityType.WATER_SAVING]: Droplets,
  [EarningActivityType.HOME_GROWN_FOOD]: Carrot,
  [EarningActivityType.BEE_HOTEL]: Bug,
  [EarningActivityType.ENVIRONMENTAL_EDUCATION]: GraduationCap,
  [EarningActivityType.REFERRAL]: Users,
  overall: Trophy
}

const trendIcons = {
  up: TrendingUp,
  down: TrendingDown,
  stable: Minus
}

const getTrophyIcon = (rank: number) => {
  if (rank === 1) return <Crown className="h-6 w-6 text-yellow-400" />
  if (rank === 2) return <Trophy className="h-6 w-6 text-gray-300" />
  if (rank === 3) return <Medal className="h-6 w-6 text-orange-400" />
  return <Award className="h-5 w-5 text-gray-500" />
}

const getRankColor = (rank: number) => {
  if (rank === 1) return 'text-yellow-400 border-yellow-400/30'
  if (rank === 2) return 'text-gray-300 border-gray-400/30'
  if (rank === 3) return 'text-orange-400 border-orange-400/30'
  if (rank <= 10) return 'text-green-400 border-green-400/30'
  if (rank <= 50) return 'text-blue-400 border-blue-400/30'
  return 'text-gray-400 border-gray-400/30'
}

export default function EnhancedLeaderboard() {
  const { globalLeaderboard, categoryLeaderboards, loadGlobalLeaderboard, loadCategoryLeaderboard } = useLeaderboard()
  const [activeTab, setActiveTab] = useState('global')
  const [timeFrame, setTimeFrame] = useState<'weekly' | 'monthly' | 'all-time'>('all-time')

  useEffect(() => {
    loadGlobalLeaderboard()
    // Load category leaderboards
    Object.values(EarningActivityType).forEach(category => {
      loadCategoryLeaderboard(category)
    })
  }, [])

  // Mock enhanced leaderboard data
  const mockGlobalLeaderboard = [
    {
      rank: 1,
      userId: 'user1',
      username: 'EcoMaster92',
      avatar: '🌟',
      totalPoints: 15847,
      totalTokens: 15.847,
      level: 58,
      badges: [
        { id: '1', name: 'Water Warrior', icon: '💧', rarity: 'epic' as const },
        { id: '2', name: 'Plant Parent', icon: '🌱', rarity: 'rare' as const },
        { id: '3', name: 'Bee Guardian', icon: '🐝', rarity: 'legendary' as const }
      ],
      activities: {
        [EarningActivityType.WATER_SAVING]: 45,
        [EarningActivityType.HOME_GROWN_FOOD]: 32,
        [EarningActivityType.BEE_HOTEL]: 8,
        [EarningActivityType.ENVIRONMENTAL_EDUCATION]: 23,
        [EarningActivityType.REFERRAL]: 12
      } as any,
      trend: 'stable' as const,
      country: '🇳🇱',
      weeklyGrowth: 1245,
      monthlyGrowth: 4850,
      streak: 45
    },
    {
      rank: 2,
      userId: 'user2',
      username: 'GreenHero2024',
      avatar: '🌱',
      totalPoints: 14234,
      totalTokens: 14.234,
      level: 52,
      badges: [
        { id: '4', name: 'Carbon Crusher', icon: '🌿', rarity: 'rare' as const },
        { id: '5', name: 'Educator', icon: '🎓', rarity: 'uncommon' as const }
      ],
      activities: {
        [EarningActivityType.WATER_SAVING]: 38,
        [EarningActivityType.HOME_GROWN_FOOD]: 28,
        [EarningActivityType.BEE_HOTEL]: 5,
        [EarningActivityType.ENVIRONMENTAL_EDUCATION]: 31,
        [EarningActivityType.REFERRAL]: 8
      } as any,
      trend: 'up' as const,
      country: '🇺🇸',
      weeklyGrowth: 1580,
      monthlyGrowth: 3200,
      streak: 23
    },
    {
      rank: 3,
      userId: 'user3',
      username: 'SustainableSara',
      avatar: '♻️',
      totalPoints: 12956,
      totalTokens: 12.956,
      level: 47,
      badges: [
        { id: '6', name: 'Recycling Queen', icon: '♻️', rarity: 'epic' as const }
      ],
      activities: {
        [EarningActivityType.WATER_SAVING]: 42,
        [EarningActivityType.HOME_GROWN_FOOD]: 35,
        [EarningActivityType.BEE_HOTEL]: 7,
        [EarningActivityType.ENVIRONMENTAL_EDUCATION]: 19,
        [EarningActivityType.REFERRAL]: 15
      } as any,
      trend: 'up' as const,
      country: '🇨🇦',
      weeklyGrowth: 892,
      monthlyGrowth: 2100,
      streak: 67
    },
    {
      rank: 4,
      userId: 'user4',
      username: 'EcoTechPro',
      avatar: '🔋',
      totalPoints: 11789,
      totalTokens: 11.789,
      level: 44,
      badges: [
        { id: '7', name: 'Innovation Master', icon: '💡', rarity: 'legendary' as const }
      ],
      activities: {
        [EarningActivityType.WATER_SAVING]: 29,
        [EarningActivityType.HOME_GROWN_FOOD]: 18,
        [EarningActivityType.BEE_HOTEL]: 3,
        [EarningActivityType.ENVIRONMENTAL_EDUCATION]: 38,
        [EarningActivityType.REFERRAL]: 22
      } as any,
      trend: 'down' as const,
      country: '🇩🇪',
      weeklyGrowth: 456,
      monthlyGrowth: 1850,
      streak: 12
    },
    {
      rank: 5,
      userId: 'user5',
      username: 'NatureLover99',
      avatar: '🦋',
      totalPoints: 10432,
      totalTokens: 10.432,
      level: 40,
      badges: [
        { id: '8', name: 'Biodiversity Champion', icon: '🦋', rarity: 'rare' as const }
      ],
      activities: {
        [EarningActivityType.WATER_SAVING]: 33,
        [EarningActivityType.HOME_GROWN_FOOD]: 29,
        [EarningActivityType.BEE_HOTEL]: 12,
        [EarningActivityType.ENVIRONMENTAL_EDUCATION]: 16,
        [EarningActivityType.REFERRAL]: 6
      } as any,
      trend: 'stable' as const,
      country: '🇦🇺',
      weeklyGrowth: 723,
      monthlyGrowth: 1654,
      streak: 89
    }
  ]

  const topPerformers = {
    weekly: mockGlobalLeaderboard.sort((a, b) => b.weeklyGrowth - a.weeklyGrowth).slice(0, 3),
    monthly: mockGlobalLeaderboard.sort((a, b) => b.monthlyGrowth - a.monthlyGrowth).slice(0, 3),
    streak: mockGlobalLeaderboard.sort((a, b) => b.streak - a.streak).slice(0, 3)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
            🏆 Global Leaderboard
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Compete with eco-warriors worldwide and climb the ranks!
          </p>
        </div>

        {/* Top Performers Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="border-yellow-500/30 bg-gradient-to-r from-yellow-900/20 to-orange-900/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-yellow-400">
                <Zap className="h-5 w-5" />
                <span>Weekly Champions</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topPerformers.weekly.map((user, index) => (
                <div key={user.userId} className="flex items-center space-x-3">
                  <div className="text-lg">{user.avatar}</div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{user.username}</p>
                    <p className="text-xs text-muted-foreground">+{user.weeklyGrowth} pts this week</p>
                  </div>
                  <Badge variant="secondary">{index + 1}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-green-400">
                <TrendingUp className="h-5 w-5" />
                <span>Monthly Leaders</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topPerformers.monthly.map((user, index) => (
                <div key={user.userId} className="flex items-center space-x-3">
                  <div className="text-lg">{user.avatar}</div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{user.username}</p>
                    <p className="text-xs text-muted-foreground">+{user.monthlyGrowth} pts this month</p>
                  </div>
                  <Badge variant="secondary">{index + 1}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-purple-400">
                <Star className="h-5 w-5" />
                <span>Streak Masters</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {topPerformers.streak.map((user, index) => (
                <div key={user.userId} className="flex items-center space-x-3">
                  <div className="text-lg">{user.avatar}</div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{user.username}</p>
                    <p className="text-xs text-muted-foreground">{user.streak} day streak</p>
                  </div>
                  <Badge variant="secondary">{index + 1}</Badge>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Main Leaderboard */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <div className="flex justify-between items-center">
            <TabsList className="grid w-fit grid-cols-6 bg-gray-800/50">
              <TabsTrigger value="global">Global</TabsTrigger>
              <TabsTrigger value="water">Water</TabsTrigger>
              <TabsTrigger value="food">Food</TabsTrigger>
              <TabsTrigger value="bees">Bees</TabsTrigger>
              <TabsTrigger value="education">Education</TabsTrigger>
              <TabsTrigger value="referrals">Referrals</TabsTrigger>
            </TabsList>

            <div className="flex space-x-2">
              <Button
                variant={timeFrame === 'weekly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeFrame('weekly')}
              >
                Weekly
              </Button>
              <Button
                variant={timeFrame === 'monthly' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeFrame('monthly')}
              >
                Monthly
              </Button>
              <Button
                variant={timeFrame === 'all-time' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setTimeFrame('all-time')}
              >
                All Time
              </Button>
            </div>
          </div>

          <TabsContent value="global" className="space-y-4">
            {/* Top 3 Podium */}
            <Card className="bg-gradient-to-r from-yellow-900/30 via-gray-900/30 to-orange-900/30 border-yellow-500/30">
              <CardContent className="p-6">
                <div className="flex justify-center items-end space-x-8">
                  {/* 2nd Place */}
                  <div className="text-center">
                    <div className="w-20 h-16 bg-gray-400/20 rounded-t-lg flex items-center justify-center mb-2">
                      <span className="text-2xl">🥈</span>
                    </div>
                    <div className="text-3xl mb-2">{mockGlobalLeaderboard[1]?.avatar}</div>
                    <p className="font-bold text-gray-300">{mockGlobalLeaderboard[1]?.username}</p>
                    <p className="text-sm text-muted-foreground">{mockGlobalLeaderboard[1]?.totalPoints.toLocaleString()} pts</p>
                  </div>

                  {/* 1st Place */}
                  <div className="text-center">
                    <div className="w-24 h-20 bg-yellow-400/20 rounded-t-lg flex items-center justify-center mb-2">
                      <span className="text-3xl">🥇</span>
                    </div>
                    <div className="text-4xl mb-2">{mockGlobalLeaderboard[0]?.avatar}</div>
                    <p className="font-bold text-yellow-400">{mockGlobalLeaderboard[0]?.username}</p>
                    <p className="text-sm text-muted-foreground">{mockGlobalLeaderboard[0]?.totalPoints.toLocaleString()} pts</p>
                    <Crown className="h-6 w-6 text-yellow-400 mx-auto mt-1" />
                  </div>

                  {/* 3rd Place */}
                  <div className="text-center">
                    <div className="w-20 h-12 bg-orange-400/20 rounded-t-lg flex items-center justify-center mb-2">
                      <span className="text-2xl">🥉</span>
                    </div>
                    <div className="text-3xl mb-2">{mockGlobalLeaderboard[2]?.avatar}</div>
                    <p className="font-bold text-orange-400">{mockGlobalLeaderboard[2]?.username}</p>
                    <p className="text-sm text-muted-foreground">{mockGlobalLeaderboard[2]?.totalPoints.toLocaleString()} pts</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Full Leaderboard */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Globe className="h-5 w-5" />
                  <span>Global Rankings</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {mockGlobalLeaderboard.map((user) => {
                    const TrendIcon = trendIcons[user.trend]
                    return (
                      <div 
                        key={user.userId} 
                        className={`flex items-center justify-between p-4 border rounded-lg ${getRankColor(user.rank)}`}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            {getTrophyIcon(user.rank)}
                            <span className="font-bold text-lg">#{user.rank}</span>
                          </div>
                          
                          <div className="text-2xl">{user.avatar}</div>
                          
                          <div>
                            <div className="flex items-center space-x-2">
                              <p className="font-bold">{user.username}</p>
                              <span className="text-sm">{user.country}</span>
                              <Badge variant="secondary" className="text-xs">
                                Level {user.level}
                              </Badge>
                            </div>
                            
                            <div className="flex items-center space-x-4 mt-1">
                              <p className="text-sm text-muted-foreground">
                                {user.totalPoints.toLocaleString()} points
                              </p>
                              <p className="text-sm text-purple-400">
                                {user.totalTokens} GAIA
                              </p>
                              <div className="flex items-center space-x-1">
                                <TrendIcon className="h-3 w-3" />
                                <span className="text-xs">
                                  {timeFrame === 'weekly' && `+${user.weeklyGrowth}`}
                                  {timeFrame === 'monthly' && `+${user.monthlyGrowth}`}
                                  {timeFrame === 'all-time' && `${user.streak} day streak`}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3">
                          {/* Activity Icons */}
                          <div className="flex space-x-1">
                            {Object.entries(user.activities).map(([activity, count]) => {
                              const IconComponent = activityIcons[activity as keyof typeof activityIcons]
                              if (!IconComponent || count === 0) return null
                              return (
                                <div key={activity} className="flex items-center space-x-1">
                                  <IconComponent className="h-3 w-3 opacity-60" />
                                  <span className="text-xs">{count}</span>
                                </div>
                              )
                            })}
                          </div>

                          {/* Badges */}
                          <div className="flex space-x-1">
                            {user.badges.slice(0, 3).map((badge) => (
                              <div 
                                key={badge.id} 
                                className="text-sm" 
                                title={badge.name}
                              >
                                {badge.icon}
                              </div>
                            ))}
                            {user.badges.length > 3 && (
                              <Badge variant="secondary" className="text-xs">
                                +{user.badges.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Category-specific leaderboards would go here */}
          <TabsContent value="water">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Droplets className="h-5 w-5 text-blue-400" />
                  <span>Water Saving Champions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Droplets className="h-16 w-16 text-blue-400 mx-auto mb-4" />
                  <p className="text-lg font-medium">Water Saving Leaderboard</p>
                  <p className="text-muted-foreground">
                    Rankings based on water conservation activities
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Other category tabs would be similar */}
          <TabsContent value="food">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Carrot className="h-5 w-5 text-green-400" />
                  <span>Food Growing Champions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Carrot className="h-16 w-16 text-green-400 mx-auto mb-4" />
                  <p className="text-lg font-medium">Home Grown Food Leaderboard</p>
                  <p className="text-muted-foreground">
                    Rankings based on food growing activities
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="bees">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bug className="h-5 w-5 text-yellow-400" />
                  <span>Bee Hotel Champions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Bug className="h-16 w-16 text-yellow-400 mx-auto mb-4" />
                  <p className="text-lg font-medium">Bee Hotel Leaderboard</p>
                  <p className="text-muted-foreground">
                    Rankings based on bee hotel creation activities
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <GraduationCap className="h-5 w-5 text-purple-400" />
                  <span>Education Champions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <GraduationCap className="h-16 w-16 text-purple-400 mx-auto mb-4" />
                  <p className="text-lg font-medium">Environmental Education Leaderboard</p>
                  <p className="text-muted-foreground">
                    Rankings based on education activities
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="referrals">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-orange-400" />
                  <span>Referral Champions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Users className="h-16 w-16 text-orange-400 mx-auto mb-4" />
                  <p className="text-lg font-medium">Referral Leaderboard</p>
                  <p className="text-muted-foreground">
                    Rankings based on successful referrals
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}