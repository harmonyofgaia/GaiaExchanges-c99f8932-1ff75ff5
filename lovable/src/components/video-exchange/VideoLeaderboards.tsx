import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Trophy, Star, Medal, Crown } from 'lucide-react'

export function VideoLeaderboards() {
  const [selectedPeriod, setSelectedPeriod] = useState('weekly')

  const leaderboardData = [
    { rank: 1, name: "EcoWarrior Sarah", points: 89234, badge: "🌱 Green Champion" },
    { rank: 2, name: "Nature Lover Mike", points: 76543, badge: "🌊 Ocean Protector" },
    { rank: 3, name: "Climate Action Alex", points: 65432, badge: "🌍 Earth Guardian" },
    { rank: 4, name: "Solar Energy Emma", points: 54321, badge: "☀️ Solar Pioneer" },
    { rank: 5, name: "Wind Power Will", points: 43210, badge: "💨 Wind Advocate" },
  ]

  return (
    <div className="space-y-6">
      <Card className="border-yellow-500/30 bg-gradient-to-r from-yellow-900/20 to-orange-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-400" />
            Community Leaderboards
            <Badge variant="secondary">Updated Live</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex gap-2">
              {['weekly', 'monthly', 'all-time'].map(period => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period)}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1).replace('-', ' ')}
                </Button>
              ))}
            </div>
            
            <div className="space-y-3">
              {leaderboardData.map((user, index) => (
                <div key={user.rank} className="flex items-center gap-3 p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-bold">
                    {user.rank === 1 ? <Crown className="h-4 w-4" /> : 
                     user.rank === 2 ? <Medal className="h-4 w-4" /> :
                     user.rank === 3 ? <Star className="h-4 w-4" /> : user.rank}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-sm text-muted-foreground">{user.badge}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-yellow-400">{user.points.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">points</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}