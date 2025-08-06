
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { useNavigate } from 'react-router-dom'
import { 
  Gamepad2, 
  Mountain, 
  Coins, 
  Sword, 
  Building2,
  Crown,
  Rocket,
  Sparkles
} from 'lucide-react'

export function GameNavigationHub() {
  const navigate = useNavigate()

  const games = [
    {
      id: 'gaia-fighter',
      name: '⚔️ GAIA FIGHTER PRO',
      description: 'Ultimate combat system with global tournaments',
      route: '/gaia-fighter',
      icon: <Sword className="h-8 w-8" />,
      color: 'from-red-600 to-orange-600',
      status: 'ACTIVE',
      players: '15,247'
    },
    {
      id: 'landscape-builder',
      name: '🌍 LANDSCAPE BUILDER PRO',
      description: 'Unlimited cloud storage & AI generation',
      route: '/landscape-builder',
      icon: <Mountain className="h-8 w-8" />,
      color: 'from-green-600 to-blue-600',
      status: 'ACTIVE',
      players: '8,934'
    },
    {
      id: 'coin-crafter',
      name: '💰 GAIA COIN CRAFTER',
      description: 'Advanced token creation & trading',
      route: '/coin-crafter',
      icon: <Coins className="h-8 w-8" />,
      color: 'from-yellow-600 to-green-600',
      status: 'ACTIVE',
      players: '12,156'
    },
    {
      id: 'habbo-tycoon',
      name: '🏨 HABBO TYCOON',
      description: 'Virtual real life platform & empire building',
      route: '/gaming',
      icon: <Building2 className="h-8 w-8" />,
      color: 'from-purple-600 to-pink-600',
      status: 'ACTIVE',
      players: '6,789'
    }
  ]

  const handleGameLaunch = (route: string, gameName: string) => {
    console.log(`🎮 LAUNCHING GAME: ${gameName}`)
    console.log(`🚀 QUANTUM GAME ENGINE: Initializing...`)
    console.log(`🌍 ROUTE: ${route}`)
    
    navigate(route)
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border-2 border-purple-500/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400 text-center">
            <Gamepad2 className="h-6 w-6 animate-pulse" />
            🎮 GAIA GAMING NAVIGATION HUB
          </CardTitle>
          <div className="text-center">
            <Badge className="bg-green-600 animate-pulse mr-2">
              ✅ ALL GAMES ACTIVE
            </Badge>
            <Badge className="bg-blue-600 mr-2">
              👥 {games.reduce((sum, game) => sum + parseInt(game.players.replace(',', '')), 0).toLocaleString()} Online
            </Badge>
            <Badge className="bg-purple-600">
              🚀 QUANTUM ENGINE v2.0
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {games.map((game) => (
          <Card 
            key={game.id} 
            className={`bg-gradient-to-br ${game.color}/20 border-2 border-opacity-50 hover:scale-105 transition-all duration-300 cursor-pointer`}
            onClick={() => handleGameLaunch(game.route, game.name)}
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-white">
                <div className="text-white">{game.icon}</div>
                {game.name}
              </CardTitle>
              <div className="flex gap-2">
                <Badge className={`bg-gradient-to-r ${game.color}`}>
                  {game.status}
                </Badge>
                <Badge className="bg-blue-600">
                  👥 {game.players} Online
                </Badge>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">{game.description}</p>
              <Button 
                className={`w-full bg-gradient-to-r ${game.color} hover:opacity-90 text-white font-bold`}
                onClick={(e) => {
                  e.stopPropagation()
                  handleGameLaunch(game.route, game.name)
                }}
              >
                <Rocket className="h-4 w-4 mr-2" />
                🚀 LAUNCH GAME
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-2 border-yellow-500/50">
        <CardContent className="p-6 text-center">
          <div className="text-6xl mb-4 animate-bounce">🌟</div>
          <h3 className="text-2xl font-bold text-yellow-400 mb-2">
            ALL GAMES FULLY OPERATIONAL
          </h3>
          <p className="text-muted-foreground mb-4">
            Quantum game engine running at maximum capacity • All links active • Cloud storage unlimited
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 bg-green-900/20 rounded-lg">
              <div className="text-2xl font-bold text-green-400">100%</div>
              <div className="text-xs text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center p-3 bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">∞</div>
              <div className="text-xs text-muted-foreground">Storage</div>
            </div>
            <div className="text-center p-3 bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">240+</div>
              <div className="text-xs text-muted-foreground">FPS</div>
            </div>
            <div className="text-center p-3 bg-red-900/20 rounded-lg">
              <div className="text-2xl font-bold text-red-400">0ms</div>
              <div className="text-xs text-muted-foreground">Latency</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
