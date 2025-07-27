
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Trophy, 
  Medal, 
  Award, 
  TrendingUp, 
  Users,
  Star,
  Crown,
  Target,
  Flame
} from 'lucide-react'

interface LeaderboardEntry {
  id: string
  username: string
  avatar: string
  rank: number
  points: number
  tokensEarned: number
  ecoActions: number
  streak: number
  badge: string
  change: number
}

export default function EnhancedLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    {
      id: '1',
      username: 'EcoWarrior2024',
      avatar: '🌱',
      rank: 1,
      points: 15847,
      tokensEarned: 5234,
      ecoActions: 147,
      streak: 23,
      badge: 'Planet Protector',
      change: 2
    },
    {
      id: '2',
      username: 'GreenThumb',
      avatar: '🌿',
      rank: 2,
      points: 14523,
      tokensEarned: 4876,
      ecoActions: 134,
      streak: 19,
      badge: 'Tree Hugger',
      change: -1
    },
    {
      id: '3',
      username: 'ClimateHero',
      avatar: '🌍',
      rank: 3,
      points: 13456,
      tokensEarned: 4321,
      ecoActions: 128,
      streak: 15,
      badge: 'Carbon Fighter',
      change: 1
    },
    {
      id: '4',
      username: 'SolarPioneer',
      avatar: '☀️',
      rank: 4,
      points: 12789,
      tokensEarned: 3987,
      ecoActions: 115,
      streak: 12,
      badge: 'Energy Saver',
      change: 0
    },
    {
      id: '5',
      username: 'WaterGuardian',
      avatar: '💧',
      rank: 5,
      points: 11234,
      tokensEarned: 3654,
      ecoActions: 98,
      streak: 8,
      badge: 'Water Protector',
      change: 3
    }
  ])

  const [activeTab, setActiveTab] = useState('overall')

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />
      case 2: return <Medal className="h-6 w-6 text-gray-400" />
      case 3: return <Award className="h-6 w-6 text-amber-600" />
      default: return <Trophy className="h-5 w-5 text-blue-500" />
    }
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-4 w-4 text-green-500" />
    if (change < 0) return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
    return <div className="h-4 w-4" />
  }

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-400 to-yellow-600'
      case 2: return 'bg-gradient-to-r from-gray-300 to-gray-500'
      case 3: return 'bg-gradient-to-r from-amber-400 to-amber-600'
      default: return 'bg-gradient-to-r from-blue-400 to-blue-600'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
          🏆 GAiA Leaderboard
        </h1>
        <p className="text-lg text-muted-foreground">
          Celebrate the top eco-warriors making a difference for our planet
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overall">Overall</TabsTrigger>
          <TabsTrigger value="tokens">Tokens</TabsTrigger>
          <TabsTrigger value="actions">Actions</TabsTrigger>
          <TabsTrigger value="streaks">Streaks</TabsTrigger>
        </TabsList>

        <TabsContent value="overall" className="space-y-6">
          {/* Top 3 Podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            {leaderboard.slice(0, 3).map((entry, index) => (
              <motion.div
                key={entry.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className={`relative overflow-hidden ${entry.rank === 1 ? 'ring-2 ring-yellow-400' : ''}`}>
                  <div className={`absolute inset-0 ${getRankColor(entry.rank)} opacity-10`} />
                  <CardHeader className="text-center relative">
                    <div className="text-4xl mb-2">{entry.avatar}</div>
                    <div className="flex items-center justify-center gap-2 mb-2">
                      {getRankIcon(entry.rank)}
                      <span className="text-2xl font-bold">#{entry.rank}</span>
                    </div>
                    <CardTitle className="text-xl">{entry.username}</CardTitle>
                    <Badge className="mt-2">{entry.badge}</Badge>
                  </CardHeader>
                  <CardContent className="text-center">
                    <div className="text-2xl font-bold text-green-600 mb-1">
                      {entry.points.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">Total Points</div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Full Leaderboard */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                Full Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {leaderboard.map((entry, index) => (
                  <motion.div
                    key={entry.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="flex items-center gap-4 p-4 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      {getRankIcon(entry.rank)}
                      <span className="text-2xl font-bold w-8">#{entry.rank}</span>
                    </div>
                    
                    <div className="text-3xl">{entry.avatar}</div>
                    
                    <div className="flex-1">
                      <div className="font-semibold">{entry.username}</div>
                      <div className="text-sm text-muted-foreground">{entry.badge}</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-green-600">
                        {entry.points.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">points</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-yellow-600">
                        {entry.tokensEarned.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground">tokens</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-blue-600">
                        {entry.ecoActions}
                      </div>
                      <div className="text-sm text-muted-foreground">actions</div>
                    </div>
                    
                    <div className="text-right">
                      <div className="font-bold text-orange-600">
                        {entry.streak}
                      </div>
                      <div className="text-sm text-muted-foreground">streak</div>
                    </div>
                    
                    <div className="flex items-center gap-1">
                      {getChangeIcon(entry.change)}
                      <span className="text-sm">{Math.abs(entry.change) > 0 ? Math.abs(entry.change) : '-'}</span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tokens" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Star className="h-5 w-5" />
                Top Token Earners
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Token-focused leaderboard content */}
              <div className="space-y-4">
                {leaderboard
                  .sort((a, b) => b.tokensEarned - a.tokensEarned)
                  .map((entry, index) => (
                    <div key={entry.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold">#{index + 1}</span>
                        <span className="text-2xl">{entry.avatar}</span>
                        <div>
                          <div className="font-semibold">{entry.username}</div>
                          <div className="text-sm text-muted-foreground">{entry.badge}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-yellow-600">
                          {entry.tokensEarned.toLocaleString()}
                        </div>
                        <div className="text-sm text-muted-foreground">GAIA Tokens</div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="actions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5" />
                Most Active Eco-Warriors
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Action-focused leaderboard content */}
              <div className="space-y-4">
                {leaderboard
                  .sort((a, b) => b.ecoActions - a.ecoActions)
                  .map((entry, index) => (
                    <div key={entry.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold">#{index + 1}</span>
                        <span className="text-2xl">{entry.avatar}</span>
                        <div>
                          <div className="font-semibold">{entry.username}</div>
                          <div className="text-sm text-muted-foreground">{entry.badge}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-blue-600">
                          {entry.ecoActions}
                        </div>
                        <div className="text-sm text-muted-foreground">Eco Actions</div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="streaks" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Flame className="h-5 w-5" />
                Longest Streaks
              </CardTitle>
            </CardHeader>
            <CardContent>
              {/* Streak-focused leaderboard content */}
              <div className="space-y-4">
                {leaderboard
                  .sort((a, b) => b.streak - a.streak)
                  .map((entry, index) => (
                    <div key={entry.id} className="flex items-center justify-between p-4 rounded-lg bg-muted/20">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-bold">#{index + 1}</span>
                        <span className="text-2xl">{entry.avatar}</span>
                        <div>
                          <div className="font-semibold">{entry.username}</div>
                          <div className="text-sm text-muted-foreground">{entry.badge}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-orange-600">
                          {entry.streak}
                        </div>
                        <div className="text-sm text-muted-foreground">Day Streak</div>
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
