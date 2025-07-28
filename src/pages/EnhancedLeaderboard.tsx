import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Trophy, Medal, Crown, Star, Users, Target, TrendingUp } from 'lucide-react'
import Navbar from '@/components/Navbar'

export default function EnhancedLeaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([
    { id: 1, username: 'EcoWarrior1', score: 12500, impact: 5200, rank: 1 },
    { id: 2, username: 'GreenGuardian', score: 11800, impact: 4800, rank: 2 },
    { id: 3, username: 'PlanetSaver', score: 11200, impact: 4500, rank: 3 },
    { id: 4, username: 'GaiaChampion', score: 10500, impact: 4200, rank: 4 },
    { id: 5, username: 'NatureHero', score: 9800, impact: 3900, rank: 5 },
    { id: 6, username: 'EcoFriend', score: 9200, impact: 3600, rank: 6 },
    { id: 7, username: 'CleanEarth', score: 8600, impact: 3300, rank: 7 },
    { id: 8, username: 'GreenLife', score: 8000, impact: 3000, rank: 8 },
    { id: 9, username: 'EcoMaster', score: 7400, impact: 2700, rank: 9 },
    { id: 10, username: 'EarthDefender', score: 6800, impact: 2400, rank: 10 }
  ])

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading data
    setTimeout(() => {
      setLoading(false)
    }, 1500)
  }, [])

  const getMedalColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-500'
      case 2:
        return 'text-gray-400'
      case 3:
        return 'text-orange-400'
      default:
        return 'text-gray-500'
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-2xl text-green-400">Loading leaderboard...</div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🏆 Enhanced Global Leaderboard
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Top contributors to environmental impact and GAiA score
          </p>
        </div>

        <Card className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-white">
              Top GAiA Contributors
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-700">
                <thead>
                  <tr className="text-left">
                    <th className="px-4 py-2 text-white">Rank</th>
                    <th className="px-4 py-2 text-white">Username</th>
                    <th className="px-4 py-2 text-white">GAiA Score</th>
                    <th className="px-4 py-2 text-white">Impact Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-700">
                  {leaderboardData.map((entry) => (
                    <tr key={entry.id}>
                      <td className="px-4 py-2">
                        {entry.rank <= 3 ? (
                          <span className={getMedalColor(entry.rank)}>
                            <Trophy className="inline-block h-5 w-5 mr-1" />
                            {entry.rank}
                          </span>
                        ) : (
                          entry.rank
                        )}
                      </td>
                      <td className="px-4 py-2">{entry.username}</td>
                      <td className="px-4 py-2">{entry.score.toLocaleString()}</td>
                      <td className="px-4 py-2">{entry.impact.toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
