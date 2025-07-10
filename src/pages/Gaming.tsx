
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Gamepad2, 
  Trophy, 
  Users, 
  Zap, 
  Target, 
  Crown, 
  Sword,
  Shield,
  Star,
  Flame,
  Globe,
  ChevronRight
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { toast } from 'sonner'

export default function Gaming() {
  const [activeMode, setActiveMode] = useState('casual')
  const [playersOnline, setPlayersOnline] = useState(47523)

  const gameModes = [
    {
      id: 'casual',
      name: 'Casual Mode',
      description: 'Relaxed gaming experience for fun',
      icon: Star,
      color: 'bg-green-600',
      players: 12847,
      features: ['No pressure', 'Learn at your pace', 'Friendly community']
    },
    {
      id: 'competitive',
      name: 'Competitive Mode',
      description: 'Ranked matches and tournaments',
      icon: Trophy,
      color: 'bg-orange-600',
      players: 8934,
      features: ['Ranked system', 'Tournaments', 'Leaderboards']
    },
    {
      id: 'adventure',
      name: 'Adventure Mode',
      description: 'Epic quests and exploration',
      icon: Globe,
      color: 'bg-blue-600',
      players: 15672,
      features: ['Story campaigns', 'World exploration', 'Epic rewards']
    },
    {
      id: 'battle',
      name: 'Battle Royale',
      description: 'Last player standing wins',
      icon: Sword,
      color: 'bg-red-600',
      players: 23456,
      features: ['100 players', 'Shrinking map', 'Intense combat']
    },
    {
      id: 'creative',
      name: 'Creative Mode',
      description: 'Build and create your own worlds',
      icon: Flame,
      color: 'bg-purple-600',
      players: 9821,
      features: ['Unlimited resources', 'World builder', 'Share creations']
    },
    {
      id: 'survival',
      name: 'Survival Mode',
      description: 'Survive against all odds',
      icon: Shield,
      color: 'bg-yellow-600',
      players: 6754,
      features: ['Resource management', 'Environmental hazards', 'Team cooperation']
    }
  ]

  const availableGames = [
    {
      id: 'gaia-fantasy-mmorpg',
      name: 'GAiA Fantasy MMORPG',
      path: '/game/gaia-fantasy-mmorpg',
      description: 'Massive fantasy world with magic and adventure',
      image: '🏰',
      status: 'live'
    },
    {
      id: 'snake-arena',
      name: 'Snake Arena',
      path: '/game/snake-arena',
      description: 'Classic snake game with multiplayer battles',
      image: '🐍',
      status: 'live'
    },
    {
      id: 'gaia-fighter',
      name: 'GAiA Fighter',
      path: '/gaia-fighter-game',
      description: 'Epic fighting game with GAiA warriors',
      image: '⚔️',
      status: 'live'
    },
    {
      id: 'space-explorer',
      name: 'Space Explorer',
      path: '/game/space-explorer',
      description: 'Explore the cosmos and discover new worlds',
      image: '🚀',
      status: 'coming-soon'
    },
    {
      id: 'dragon-master',
      name: 'Dragon Master',
      path: '/game/dragon-master',
      description: 'Train and battle with legendary dragons',
      image: '🐉',
      status: 'coming-soon'
    },
    {
      id: 'eco-guardian',
      name: 'Eco Guardian',
      path: '/game/eco-guardian',
      description: 'Save the environment in this action RPG',
      image: '🌱',
      status: 'coming-soon'
    }
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setPlayersOnline(prev => prev + Math.floor(Math.random() * 100 - 50))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const selectMode = (modeId: string) => {
    setActiveMode(modeId)
    const mode = gameModes.find(m => m.id === modeId)
    toast.success(`🎮 ${mode?.name} Selected!`, {
      description: `Ready to play in ${mode?.name.toLowerCase()}`,
      duration: 3000
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8 border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
              🎮 GAiA Gaming Hub
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Multiple game modes • Competitive tournaments • Virtual worlds
            </p>
            <div className="flex justify-center gap-4 flex-wrap mt-4">
              <Badge className="bg-purple-600">
                <Users className="h-4 w-4 mr-2" />
                {playersOnline.toLocaleString()} Online
              </Badge>
              <Badge className="bg-blue-600">6 Game Modes</Badge>
              <Badge className="bg-green-600">Live Tournaments</Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Game Mode Selection */}
        <Card className="mb-8 border-green-500/30 bg-green-900/20">
          <CardHeader>
            <CardTitle className="text-green-400">🎯 Choose Your Gaming Mode</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {gameModes.map((mode) => {
                const IconComponent = mode.icon
                const isActive = activeMode === mode.id
                
                return (
                  <Card 
                    key={mode.id} 
                    className={`cursor-pointer transition-all duration-300 ${
                      isActive 
                        ? 'border-yellow-400 bg-yellow-900/20 scale-105' 
                        : 'border-gray-500/30 bg-gray-900/20 hover:border-yellow-400/50'
                    }`}
                    onClick={() => selectMode(mode.id)}
                  >
                    <CardContent className="p-6 text-center">
                      <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${mode.color} flex items-center justify-center`}>
                        <IconComponent className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">{mode.name}</h3>
                      <p className="text-sm text-muted-foreground mb-4">{mode.description}</p>
                      <Badge className="bg-blue-600 mb-3">
                        {mode.players.toLocaleString()} players
                      </Badge>
                      <div className="space-y-1">
                        {mode.features.map((feature, index) => (
                          <div key={index} className="text-xs text-green-400">
                            ✓ {feature}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Available Games */}
        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardHeader>
            <CardTitle className="text-blue-400">🎲 Available Games</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableGames.map((game) => (
                <Card key={game.id} className="border-purple-500/30 bg-purple-900/20">
                  <CardContent className="p-6 text-center">
                    <div className="text-6xl mb-4">{game.image}</div>
                    <h3 className="text-xl font-bold text-purple-400 mb-2">{game.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{game.description}</p>
                    <Badge className={game.status === 'live' ? 'bg-green-600' : 'bg-yellow-600'}>
                      {game.status === 'live' ? 'Live Now' : 'Coming Soon'}
                    </Badge>
                    {game.status === 'live' && (
                      <Link to={game.path}>
                        <Button className="w-full mt-4 bg-purple-600 hover:bg-purple-700">
                          <Gamepad2 className="h-4 w-4 mr-2" />
                          Play Now
                          <ChevronRight className="h-4 w-4 ml-2" />
                        </Button>
                      </Link>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Gaming Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">1,247</div>
              <div className="text-sm text-muted-foreground">Active Tournaments</div>
            </CardContent>
          </Card>
          
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{playersOnline.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Players Online</div>
            </CardContent>
          </Card>
          
          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardContent className="p-6 text-center">
              <Crown className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">892</div>
              <div className="text-sm text-muted-foreground">Champions</div>
            </CardContent>
          </Card>
          
          <Card className="border-orange-500/30 bg-orange-900/20">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-400">∞</div>
              <div className="text-sm text-muted-foreground">Possibilities</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
