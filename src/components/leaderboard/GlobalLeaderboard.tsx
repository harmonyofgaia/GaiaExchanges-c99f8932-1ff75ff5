
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Trophy, 
  Medal, 
  Award, 
  Crown,
  Zap,
  TreePine,
  Users,
  TrendingUp,
  Star,
  Target
} from 'lucide-react'

interface LeaderboardEntry {
  rank: number
  username: string
  avatar: string
  ecoScore: number
  tokensEarned: number
  missionsCompleted: number
  country: string
  level: number
  badges: string[]
  trend: 'up' | 'down' | 'stable'
}

export function GlobalLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    {
      rank: 1,
      username: "EcoMaster92",
      avatar: "🌟",
      ecoScore: 9847,
      tokensEarned: 125670,
      missionsCompleted: 89,
      country: "🇳🇱",
      level: 47,
      badges: ["🌍", "🏆", "⚡"],
      trend: "stable"
    },
    {
      rank: 2,
      username: "GreenHero2024",
      avatar: "🌱",
      ecoScore: 9234,
      tokensEarned: 118340,
      missionsCompleted: 82,
      country: "🇺🇸",
      level: 43,
      badges: ["🌱", "🎯", "🔥"],
      trend: "up"
    },
    {
      rank: 3,
      username: "NatureLover",
      avatar: "🍃",
      ecoScore: 8956,
      tokensEarned: 112890,
      missionsCompleted: 76,
      country: "🇩🇪",
      level: 41,
      badges: ["🍃", "💎", "⭐"],
      trend: "up"
    },
    {
      rank: 4,
      username: "ClimateChampion",
      avatar: "🌊",
      ecoScore: 8743,
      tokensEarned: 109450,
      missionsCompleted: 74,
      country: "🇨🇦",
      level: 39,
      badges: ["🌊", "🚀", "🔱"],
      trend: "down"
    },
    {
      rank: 5,
      username: "EcoWarrior",
      avatar: "⚡",
      ecoScore: 8521,
      tokensEarned: 105680,
      missionsCompleted: 71,
      country: "🇬🇧",
      level: 38,
      badges: ["⚡", "🛡️", "🎖️"],
      trend: "stable"
    },
    {
      rank: 6,
      username: "GreenTech",
      avatar: "🤖",
      ecoScore: 8298,
      tokensEarned: 102340,
      missionsCompleted: 68,
      country: "🇯🇵",
      level: 36,
      badges: ["🤖", "💻", "🔬"],
      trend: "up"
    },
    {
      rank: 7,
      username: "SolarPunk",
      avatar: "☀️",
      ecoScore: 8076,
      tokensEarned: 98720,
      missionsCompleted: 65,
      country: "🇦🇺",
      level: 35,
      badges: ["☀️", "🔋", "🌅"],
      trend: "stable"
    },
    {
      rank: 8,
      username: "OceanGuardian",
      avatar: "🐋",
      ecoScore: 7854,
      tokensEarned: 95180,
      missionsCompleted: 62,
      country: "🇧🇷",
      level: 33,
      badges: ["🐋", "🌊", "🏖️"],
      trend: "up"
    }
  ])

  const [userRank] = useState(156)
  const [totalPlayers] = useState(12847)
  const [seasonEnds] = useState("7 days")

  useEffect(() => {
    // Simulate leaderboard updates
    const interval = setInterval(() => {
      setLeaderboard(prev => 
        prev.map(entry => ({
          ...entry,
          ecoScore: entry.ecoScore + Math.floor(Math.random() * 20),
          tokensEarned: entry.tokensEarned + Math.floor(Math.random() * 100),
          trend: Math.random() > 0.7 ? 
            (Math.random() > 0.5 ? 'up' : 'down') : 
            entry.trend
        }))
      )
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="h-6 w-6 text-yellow-400" />
      case 2: return <Medal className="h-6 w-6 text-gray-300" />
      case 3: return <Award className="h-6 w-6 text-amber-600" />
      default: return <Trophy className="h-5 w-5 text-gray-400" />
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-400" />
      case 'down': return <TrendingUp className="h-4 w-4 text-red-400 rotate-180" />
      case 'stable': return <Target className="h-4 w-4 text-blue-400" />
      default: return null
    }
  }

  const getRankBg = (rank: number) => {
    switch (rank) {
      case 1: return 'bg-gradient-to-r from-yellow-900/30 to-amber-900/30 border-yellow-500/50'
      case 2: return 'bg-gradient-to-r from-gray-700/30 to-slate-700/30 border-gray-400/50'
      case 3: return 'bg-gradient-to-r from-amber-800/30 to-orange-800/30 border-amber-600/50'
      default: return 'bg-gradient-to-r from-gray-800/30 to-gray-700/30 border-gray-600/30'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-yellow-500/50 bg-gradient-to-r from-yellow-900/30 to-orange-900/30">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-yellow-400">
            🏆 GLOBAL GAIA LEADERBOARD
          </CardTitle>
          <p className="text-center text-lg text-yellow-300">
            Compete worldwide • Earn GAiA tokens • Make environmental impact
          </p>
        </CardHeader>
      </Card>

      {/* Season Info */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-900/30 to-green-800/30 border-green-500/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="h-5 w-5 text-green-400" />
              <span className="font-bold text-green-400">Total Players</span>
            </div>
            <div className="text-2xl font-bold text-green-400">{totalPlayers.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border-blue-500/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Target className="h-5 w-5 text-blue-400" />
              <span className="font-bold text-blue-400">Your Rank</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">#{userRank}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 border-purple-500/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Zap className="h-5 w-5 text-purple-400" />
              <span className="font-bold text-purple-400">Season Ends</span>
            </div>
            <div className="text-2xl font-bold text-purple-400">{seasonEnds}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-900/30 to-orange-800/30 border-orange-500/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TreePine className="h-5 w-5 text-orange-400" />
              <span className="font-bold text-orange-400">Category</span>
            </div>
            <div className="text-xl font-bold text-orange-400">Global Eco</div>
          </CardContent>
        </Card>
      </div>

      {/* Leaderboard */}
      <Card className="border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-yellow-400">🌍 Top Environmental Champions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((entry) => (
              <Card key={entry.rank} className={`${getRankBg(entry.rank)} relative overflow-hidden`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        {getRankIcon(entry.rank)}
                        <span className="text-2xl font-bold">#{entry.rank}</span>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="text-3xl">{entry.avatar}</div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-lg">{entry.username}</span>
                            <span className="text-xl">{entry.country}</span>
                            {getTrendIcon(entry.trend)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Level {entry.level} • {entry.missionsCompleted} missions
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-6">
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">Eco Score</div>
                        <div className="text-xl font-bold text-green-400">
                          {entry.ecoScore.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="text-center">
                        <div className="text-sm text-muted-foreground">GAiA Tokens</div>
                        <div className="text-xl font-bold text-blue-400">
                          {entry.tokensEarned.toLocaleString()}
                        </div>
                      </div>
                      
                      <div className="flex gap-1">
                        {entry.badges.map((badge, idx) => (
                          <div key={idx} className="text-2xl">{badge}</div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Progress bar for top 3 */}
                  {entry.rank <= 3 && (
                    <div className="mt-3">
                      <Progress 
                        value={(entry.ecoScore / 10000) * 100} 
                        className="h-2"
                      />
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Rewards Info */}
      <Card className="border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-400">🎁 Season Rewards</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
              <Crown className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
              <div className="font-bold text-yellow-400 mb-2">1st Place</div>
              <div className="text-sm text-muted-foreground">
                50,000 GAiA Tokens<br/>
                Exclusive Champion Badge<br/>
                Featured Profile
              </div>
            </div>
            
            <div className="text-center p-4 bg-gray-700/20 rounded-lg border border-gray-400/30">
              <Medal className="h-8 w-8 mx-auto text-gray-300 mb-2" />
              <div className="font-bold text-gray-300 mb-2">2nd Place</div>
              <div className="text-sm text-muted-foreground">
                25,000 GAiA Tokens<br/>
                Silver Badge<br/>
                Profile Highlight
              </div>
            </div>
            
            <div className="text-center p-4 bg-amber-800/20 rounded-lg border border-amber-600/30">
              <Award className="h-8 w-8 mx-auto text-amber-600 mb-2" />
              <div className="font-bold text-amber-600 mb-2">3rd Place</div>
              <div className="text-sm text-muted-foreground">
                10,000 GAiA Tokens<br/>
                Bronze Badge<br/>
                Special Recognition
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
