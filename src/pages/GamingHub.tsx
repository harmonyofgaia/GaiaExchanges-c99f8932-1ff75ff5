
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Gamepad2, Trophy, Users, Zap, Coins, Play } from 'lucide-react'

export default function GamingHub() {
  const games = [
    {
      name: "Gaia Fighter",
      description: "Epic battles in the Gaia universe",
      players: "2,547",
      status: "Live",
      icon: "⚔️"
    },
    {
      name: "Coin Crafter",
      description: "Mine and craft digital tokens",
      players: "1,892",
      status: "Live",
      icon: "⛏️"
    },
    {
      name: "Live Tracking",
      description: "Real-time ecosystem monitoring",
      players: "934",
      status: "Beta",
      icon: "📍"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20 p-6">
      <div className="container mx-auto max-w-6xl">
        <Card className="mb-8 border-purple-500/50 bg-gradient-to-r from-purple-900/40 to-blue-900/40">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              🎮 GAiA Gaming Hub
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Play, Earn, and Build in the Gaia Ecosystem
            </p>
            <div className="flex justify-center gap-2 mt-4">
              <Badge className="bg-purple-600">🎯 Play to Earn</Badge>
              <Badge className="bg-blue-600">🏆 Competitive</Badge>
              <Badge className="bg-green-600">🌱 Eco-Friendly</Badge>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardContent className="p-6 text-center">
              <Gamepad2 className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">12</div>
              <div className="text-sm text-muted-foreground">Active Games</div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">5,373</div>
              <div className="text-sm text-muted-foreground">Active Players</div>
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-green-900/20">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">847</div>
              <div className="text-sm text-muted-foreground">Tournaments</div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-yellow-900/20">
            <CardContent className="p-6 text-center">
              <Coins className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-yellow-400">1.2M</div>
              <div className="text-sm text-muted-foreground">Tokens Earned</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {games.map((game, index) => (
            <Card key={index} className="border-gray-700 bg-gray-900/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="text-3xl">{game.icon}</div>
                    <div>
                      <CardTitle className="text-lg text-blue-400">{game.name}</CardTitle>
                      <p className="text-sm text-muted-foreground">{game.description}</p>
                    </div>
                  </div>
                  <Badge className={game.status === 'Live' ? 'bg-green-600' : 'bg-yellow-600'}>
                    {game.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-blue-400" />
                    <span className="text-sm text-blue-400">{game.players} players</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-yellow-400" />
                    <span className="text-sm text-yellow-400">Earn GAiA</span>
                  </div>
                </div>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Play className="h-4 w-4 mr-2" />
                  Play Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
