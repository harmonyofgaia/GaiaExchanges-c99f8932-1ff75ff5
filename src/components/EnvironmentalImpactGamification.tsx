/**
 * Environmental Impact Gamification Component
 * Innovative feature for earning GAiA tokens while helping mother nature
 */

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  TreePine, 
  Droplets, 
  Wind, 
  Sun, 
  Recycle, 
  Users, 
  Coins, 
  Trophy, 
  Target,
  Camera,
  MapPin,
  Zap
} from 'lucide-react'
import { toast } from 'sonner'

interface EcoAction {
  id: string
  title: string
  description: string
  icon: any
  category: 'trees' | 'water' | 'energy' | 'waste' | 'community'
  gaiaReward: number
  co2Impact: number
  difficulty: 'easy' | 'medium' | 'hard'
  timeRequired: string
  completed: boolean
  verificationRequired: boolean
}

interface UserEcoStats {
  totalActions: number
  gaiaEarned: number
  co2Saved: number
  treesPlanted: number
  waterSaved: number
  communityMembers: number
  currentStreak: number
  level: number
  nextLevelProgress: number
}

export function EnvironmentalImpactGamification() {
  const [userStats, setUserStats] = useState<UserEcoStats>({
    totalActions: 47,
    gaiaEarned: 1247.89,
    co2Saved: 423.5,
    treesPlanted: 12,
    waterSaved: 2847,
    communityMembers: 234,
    currentStreak: 15,
    level: 7,
    nextLevelProgress: 73
  })

  const [dailyActions] = useState<EcoAction[]>([
    {
      id: '1',
      title: 'Plant a Tree',
      description: 'Plant a tree in your local area and upload verification photo',
      icon: TreePine,
      category: 'trees',
      gaiaReward: 50.0,
      co2Impact: 22.0,
      difficulty: 'medium',
      timeRequired: '2-3 hours',
      completed: false,
      verificationRequired: true
    },
    {
      id: '2',
      title: 'Water Conservation',
      description: 'Install water-saving devices and report usage reduction',
      icon: Droplets,
      category: 'water',
      gaiaReward: 25.0,
      co2Impact: 8.5,
      difficulty: 'easy',
      timeRequired: '30 minutes',
      completed: true,
      verificationRequired: true
    },
    {
      id: '3',
      title: 'Solar Panel Check',
      description: 'Optimize solar panel efficiency or encourage neighbor installation',
      icon: Sun,
      category: 'energy',
      gaiaReward: 75.0,
      co2Impact: 45.0,
      difficulty: 'hard',
      timeRequired: '4-6 hours',
      completed: false,
      verificationRequired: true
    },
    {
      id: '4',
      title: 'Waste Reduction',
      description: 'Implement zero-waste practices for one week',
      icon: Recycle,
      category: 'waste',
      gaiaReward: 30.0,
      co2Impact: 15.0,
      difficulty: 'medium',
      timeRequired: '1 week',
      completed: false,
      verificationRequired: true
    },
    {
      id: '5',
      title: 'Community Education',
      description: 'Teach 5 people about environmental crypto and GAiA token',
      icon: Users,
      category: 'community',
      gaiaReward: 40.0,
      co2Impact: 0,
      difficulty: 'easy',
      timeRequired: '2 hours',
      completed: false,
      verificationRequired: false
    }
  ])

  const [communityChallenge] = useState({
    title: 'Global Forest Restoration',
    description: 'Help plant 100,000 trees worldwide this month',
    currentProgress: 23847,
    target: 100000,
    timeLeft: '18 days',
    participantReward: 200.0,
    globalReward: 10000.0
  })

  const completeAction = (actionId: string) => {
    const action = dailyActions.find(a => a.id === actionId)
    if (!action) return

    setUserStats(prev => ({
      ...prev,
      totalActions: prev.totalActions + 1,
      gaiaEarned: prev.gaiaEarned + action.gaiaReward,
      co2Saved: prev.co2Saved + action.co2Impact,
      currentStreak: prev.currentStreak + 1,
      nextLevelProgress: Math.min(100, prev.nextLevelProgress + 12)
    }))

    toast.success(`🌍 Action Completed! +${action.gaiaReward} GAiA`, {
      description: `You saved ${action.co2Impact}kg CO2 and helped Mother Nature!`,
      duration: 5000
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-600'
      case 'medium': return 'bg-yellow-600'
      case 'hard': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'trees': return TreePine
      case 'water': return Droplets
      case 'energy': return Sun
      case 'waste': return Recycle
      case 'community': return Users
      default: return Target
    }
  }

  return (
    <div className="space-y-6 p-4">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-2">
          🌍 Earn GAiA While Healing the Planet
        </h1>
        <p className="text-lg text-muted-foreground">
          Take environmental actions, verify your impact, and earn GAiA tokens!
        </p>
      </div>

      {/* User Stats Dashboard */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{userStats.gaiaEarned.toFixed(2)}</div>
            <div className="text-sm text-green-200">GAiA Earned</div>
            <Coins className="h-4 w-4 mx-auto mt-1 text-green-400" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{userStats.co2Saved}kg</div>
            <div className="text-sm text-blue-200">CO2 Saved</div>
            <Wind className="h-4 w-4 mx-auto mt-1 text-blue-400" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-purple-400">Level {userStats.level}</div>
            <Progress value={userStats.nextLevelProgress} className="mt-2 h-2" />
            <div className="text-xs text-purple-200 mt-1">{userStats.nextLevelProgress}% to Level {userStats.level + 1}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border-orange-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-orange-400">{userStats.currentStreak}</div>
            <div className="text-sm text-orange-200">Day Streak</div>
            <Trophy className="h-4 w-4 mx-auto mt-1 text-orange-400" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="actions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="actions">Daily Actions</TabsTrigger>
          <TabsTrigger value="challenge">Global Challenge</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
        </TabsList>

        <TabsContent value="actions" className="space-y-4">
          <div className="grid gap-4">
            {dailyActions.map((action) => {
              const IconComponent = action.icon
              return (
                <Card key={action.id} className={`border-l-4 ${action.completed ? 'border-l-green-500 bg-green-900/20' : 'border-l-gray-500'}`}>
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3">
                        <IconComponent className="h-6 w-6 text-green-400 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-semibold text-white">{action.title}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{action.description}</p>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <Badge className={getDifficultyColor(action.difficulty)}>
                              {action.difficulty}
                            </Badge>
                            <Badge variant="outline" className="text-green-400 border-green-400">
                              +{action.gaiaReward} GAiA
                            </Badge>
                            <Badge variant="outline" className="text-blue-400 border-blue-400">
                              -{action.co2Impact}kg CO2
                            </Badge>
                            <Badge variant="outline" className="text-gray-400">
                              {action.timeRequired}
                            </Badge>
                          </div>
                          {action.verificationRequired && (
                            <div className="flex items-center gap-2 text-xs text-yellow-400">
                              <Camera className="h-3 w-3" />
                              Photo verification required
                            </div>
                          )}
                        </div>
                      </div>
                      <Button
                        onClick={() => completeAction(action.id)}
                        disabled={action.completed}
                        className={action.completed ? "bg-green-600" : "bg-blue-600 hover:bg-blue-700"}
                      >
                        {action.completed ? (
                          <>
                            <Trophy className="h-4 w-4 mr-2" />
                            Completed
                          </>
                        ) : (
                          <>
                            <Target className="h-4 w-4 mr-2" />
                            Start Action
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="challenge">
          <Card className="bg-gradient-to-r from-emerald-900/30 to-teal-900/30 border-emerald-500/30">
            <CardHeader>
              <CardTitle className="text-emerald-400 flex items-center gap-2">
                <TreePine className="h-6 w-6" />
                {communityChallenge.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{communityChallenge.description}</p>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Progress</span>
                  <span>{communityChallenge.currentProgress.toLocaleString()} / {communityChallenge.target.toLocaleString()}</span>
                </div>
                <Progress 
                  value={(communityChallenge.currentProgress / communityChallenge.target) * 100} 
                  className="h-3"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{communityChallenge.timeLeft} remaining</span>
                  <span>{((communityChallenge.currentProgress / communityChallenge.target) * 100).toFixed(1)}% complete</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="text-center p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                  <div className="text-lg font-bold text-green-400">+{communityChallenge.participantReward} GAiA</div>
                  <div className="text-sm text-green-200">Participation Reward</div>
                </div>
                <div className="text-center p-3 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                  <div className="text-lg font-bold text-yellow-400">+{communityChallenge.globalReward} GAiA</div>
                  <div className="text-sm text-yellow-200">Completion Bonus</div>
                </div>
              </div>

              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                <MapPin className="h-4 w-4 mr-2" />
                Join Global Challenge
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="leaderboard">
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Trophy className="h-6 w-6" />
                Global Environmental Heroes
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { rank: 1, name: "EcoWarrior2024", gaia: 15847, co2: 2847, badge: "🥇" },
                  { rank: 2, name: "PlanetSaver", gaia: 12453, co2: 2234, badge: "🥈" },
                  { rank: 3, name: "GreenThumb", gaia: 9876, co2: 1876, badge: "🥉" },
                  { rank: 4, name: "TreeHugger", gaia: 8234, co2: 1654, badge: "🌟" },
                  { rank: 5, name: "ClimateHero", gaia: 7456, co2: 1432, badge: "⭐" }
                ].map((user) => (
                  <div key={user.rank} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{user.badge}</span>
                      <div>
                        <div className="font-semibold text-white">#{user.rank} {user.name}</div>
                        <div className="text-sm text-muted-foreground">{user.co2}kg CO2 saved</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-green-400">{user.gaia} GAiA</div>
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