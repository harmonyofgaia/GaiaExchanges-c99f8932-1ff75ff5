
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Home, 
  Users, 
  Coins, 
  TreePine, 
  Award,
  Zap,
  Target,
  TrendingUp,
  Star
} from 'lucide-react'
import { toast } from 'sonner'

interface HabboRoom {
  id: string
  name: string
  type: 'eco' | 'social' | 'business'
  level: number
  ecoScore: number
  visitors: number
  coins: number
}

export function HabboTycoonGame() {
  const [rooms, setRooms] = useState<HabboRoom[]>([
    {
      id: '1',
      name: 'Green Garden Paradise',
      type: 'eco',
      level: 3,
      ecoScore: 85,
      visitors: 127,
      coins: 2450
    },
    {
      id: '2', 
      name: 'Solar Power Hub',
      type: 'business',
      level: 2,
      ecoScore: 92,
      visitors: 89,
      coins: 1890
    },
    {
      id: '3',
      name: 'Community Center',
      type: 'social',
      level: 4,
      ecoScore: 78,
      visitors: 156,
      coins: 3200
    }
  ])

  const [totalCoins, setTotalCoins] = useState(15670)
  const [ecoLevel, setEcoLevel] = useState(8)
  const [achievements, setAchievements] = useState([
    { id: '1', name: 'Eco Warrior', unlocked: true },
    { id: '2', name: 'Community Builder', unlocked: true },
    { id: '3', name: 'Green Tycoon', unlocked: false }
  ])

  useEffect(() => {
    // Simulate room activity and coin generation
    const interval = setInterval(() => {
      setRooms(prevRooms => 
        prevRooms.map(room => ({
          ...room,
          visitors: room.visitors + Math.floor(Math.random() * 5),
          coins: room.coins + Math.floor(Math.random() * 50 + 10)
        }))
      )
      setTotalCoins(prev => prev + Math.floor(Math.random() * 100 + 25))
    }, 8000)

    return () => clearInterval(interval)
  }, [])

  const upgradeRoom = (roomId: string) => {
    setRooms(prevRooms =>
      prevRooms.map(room => {
        if (room.id === roomId && totalCoins >= room.level * 500) {
          setTotalCoins(prev => prev - room.level * 500)
          toast.success(`🏠 ${room.name} upgraded to level ${room.level + 1}!`, {
            description: `Eco score increased! Earning more GAiA tokens.`,
            duration: 4000
          })
          return {
            ...room,
            level: room.level + 1,
            ecoScore: Math.min(100, room.ecoScore + 5)
          }
        }
        return room
      })
    )
  }

  const collectCoins = (roomId: string) => {
    const room = rooms.find(r => r.id === roomId)
    if (room) {
      const earned = room.coins
      setTotalCoins(prev => prev + earned)
      setRooms(prevRooms =>
        prevRooms.map(r => r.id === roomId ? { ...r, coins: 0 } : r)
      )
      toast.success(`💰 Collected ${earned} GAiA coins from ${room.name}!`)
    }
  }

  const getRoomTypeIcon = (type: string) => {
    switch (type) {
      case 'eco': return <TreePine className="h-4 w-4" />
      case 'social': return <Users className="h-4 w-4" />
      case 'business': return <TrendingUp className="h-4 w-4" />
      default: return <Home className="h-4 w-4" />
    }
  }

  const getRoomTypeColor = (type: string) => {
    switch (type) {
      case 'eco': return 'bg-green-600'
      case 'social': return 'bg-blue-600'
      case 'business': return 'bg-purple-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-r from-green-900/30 to-green-800/30 border-green-500/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Coins className="h-5 w-5 text-green-400" />
              <span className="font-bold text-green-400">GAiA Coins</span>
            </div>
            <div className="text-2xl font-bold text-green-400">{totalCoins.toLocaleString()}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-900/30 to-blue-800/30 border-blue-500/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <TreePine className="h-5 w-5 text-blue-400" />
              <span className="font-bold text-blue-400">Eco Level</span>
            </div>
            <div className="text-2xl font-bold text-blue-400">{ecoLevel}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-purple-900/30 to-purple-800/30 border-purple-500/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Home className="h-5 w-5 text-purple-400" />
              <span className="font-bold text-purple-400">Rooms</span>
            </div>
            <div className="text-2xl font-bold text-purple-400">{rooms.length}</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-orange-900/30 to-orange-800/30 border-orange-500/30">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="h-5 w-5 text-orange-400" />
              <span className="font-bold text-orange-400">Visitors</span>
            </div>
            <div className="text-2xl font-bold text-orange-400">
              {rooms.reduce((sum, room) => sum + room.visitors, 0)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Rooms Management */}
      <Card className="border-green-500/30">
        <CardHeader>
          <CardTitle className="text-green-400">🏠 Your Eco-Rooms</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {rooms.map((room) => (
              <Card key={room.id} className="border-gray-600">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getRoomTypeIcon(room.type)}
                      <h4 className="font-semibold">{room.name}</h4>
                    </div>
                    <Badge className={getRoomTypeColor(room.type)}>
                      Level {room.level}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Eco Score</span>
                        <span className="text-green-400">{room.ecoScore}%</span>
                      </div>
                      <Progress value={room.ecoScore} className="h-2" />
                    </div>

                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-muted-foreground">Visitors:</span>
                        <div className="font-semibold">{room.visitors}</div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Coins:</span>
                        <div className="font-semibold text-green-400">{room.coins}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        onClick={() => collectCoins(room.id)}
                        disabled={room.coins === 0}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Coins className="h-3 w-3 mr-1" />
                        Collect
                      </Button>
                      <Button 
                        onClick={() => upgradeRoom(room.id)}
                        disabled={totalCoins < room.level * 500}
                        size="sm"
                        variant="outline"
                      >
                        <Zap className="h-3 w-3 mr-1" />
                        Upgrade
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <Card className="border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-400">🏆 Achievements</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {achievements.map((achievement) => (
              <div 
                key={achievement.id}
                className={`p-4 rounded-lg border ${
                  achievement.unlocked 
                    ? 'bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-500/30'
                    : 'bg-gray-800/30 border-gray-600'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-full ${
                    achievement.unlocked ? 'bg-yellow-600' : 'bg-gray-600'
                  }`}>
                    {achievement.unlocked ? (
                      <Star className="h-4 w-4 text-white" />
                    ) : (
                      <Target className="h-4 w-4 text-gray-400" />
                    )}
                  </div>
                  <div>
                    <div className={`font-semibold ${
                      achievement.unlocked ? 'text-yellow-400' : 'text-gray-400'
                    }`}>
                      {achievement.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {achievement.unlocked ? 'Completed' : 'Locked'}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
