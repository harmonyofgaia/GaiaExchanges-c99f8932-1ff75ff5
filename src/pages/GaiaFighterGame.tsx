
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Input } from '@/components/ui/input'
import { 
  Sword, 
  Shield, 
  Zap, 
  Users, 
  MessageCircle, 
  Trophy,
  Coins,
  Flame,
  Target,
  Crown,
  Star,
  Heart,
  Globe,
  Wifi,
  Volume2
} from 'lucide-react'
import { toast } from 'sonner'

const GaiaFighterGame = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameStats, setGameStats] = useState({
    totalPlayers: 47523,
    onlinePlayers: 8942,
    totalFights: 125847,
    gaiaTokensBurned: 15420,
    playersRank: 'Fighter',
    wins: 23,
    losses: 7,
    tokensWon: 45,
    tokensLost: 12
  })

  const [chatMessages, setChatMessages] = useState([
    { id: 1, player: 'GaiaWarrior', message: 'Ready for battle!', time: '2m ago' },
    { id: 2, player: 'EcoFighter', message: 'Let\'s save the planet!', time: '1m ago' },
    { id: 3, player: 'NatureMaster', message: 'May the best fighter win!', time: '30s ago' }
  ])

  const [newMessage, setNewMessage] = useState('')
  const [gameMode, setGameMode] = useState<'waiting' | 'fighting' | 'victory' | 'defeat'>('waiting')
  const [opponent, setOpponent] = useState({ name: 'EcoWarrior', country: 'Brazil', rank: 'Master' })

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setGameStats(prev => ({
        ...prev,
        onlinePlayers: prev.onlinePlayers + Math.floor(Math.random() * 20) - 10,
        totalFights: prev.totalFights + Math.floor(Math.random() * 5),
        gaiaTokensBurned: prev.gaiaTokensBurned + Math.floor(Math.random() * 3)
      }))

      // Add random chat messages
      if (Math.random() < 0.3) {
        const players = ['EcoFighter', 'GaiaWarrior', 'NatureMaster', 'PlantLover', 'OceanGuard']
        const messages = ['GG!', 'Ready for another round!', 'Great fight!', 'For the planet!', 'Gaia power!']
        const newMsg = {
          id: Date.now(),
          player: players[Math.floor(Math.random() * players.length)],
          message: messages[Math.floor(Math.random() * messages.length)],
          time: 'now'
        }
        setChatMessages(prev => [newMsg, ...prev.slice(0, 9)])
      }
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        player: 'You',
        message: newMessage,
        time: 'now'
      }
      setChatMessages(prev => [message, ...prev.slice(0, 9)])
      setNewMessage('')
    }
  }

  const startFight = () => {
    setGameMode('fighting')
    toast.success('🥊 Fight Started!', {
      description: 'Battle begins! Winner takes 1 GAIA token!',
      duration: 3000
    })

    // Simulate fight outcome after 8 seconds
    setTimeout(() => {
      const victory = Math.random() > 0.5
      setGameMode(victory ? 'victory' : 'defeat')
      
      if (victory) {
        setGameStats(prev => ({
          ...prev,
          wins: prev.wins + 1,
          tokensWon: prev.tokensWon + 1,
          gaiaTokensBurned: prev.gaiaTokensBurned + 1
        }))
        toast.success('🏆 VICTORY!', {
          description: 'You won 1 GAIA token! Token burned for environmental projects!',
          duration: 5000
        })
      } else {
        setGameStats(prev => ({
          ...prev,
          losses: prev.losses + 1,
          tokensLost: prev.tokensLost + 1,
          gaiaTokensBurned: prev.gaiaTokensBurned + 1
        }))
        toast.error('💔 DEFEAT!', {
          description: 'You lost 1 GAIA token! Token burned for environmental projects!',
          duration: 5000
        })
      }

      setTimeout(() => setGameMode('waiting'), 3000)
    }, 8000)
  }

  const findOpponent = () => {
    const opponents = [
      { name: 'EcoWarrior', country: 'Brazil', rank: 'Master' },
      { name: 'NatureGuard', country: 'Japan', rank: 'Expert' },
      { name: 'GaiaDefender', country: 'Germany', rank: 'Fighter' },
      { name: 'PlanetSaver', country: 'Canada', rank: 'Champion' },
      { name: 'GreenFighter', country: 'Australia', rank: 'Elite' }
    ]
    setOpponent(opponents[Math.floor(Math.random() * opponents.length)])
    toast.info('🔍 Opponent Found!', {
      description: `Matched with ${opponent.name} from ${opponent.country}!`,
      duration: 3000
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900/20 via-orange-900/20 to-yellow-900/20">
      <div className="container mx-auto px-4 py-6">
        
        {/* Game Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
            ⚔️ GAIA FIGHTER WORLD CHAMPIONSHIP
          </h1>
          <p className="text-2xl text-muted-foreground mb-2">
            🥊 Global Fighting Arena - Every Win/Loss Burns 1 GAIA Token for Nature
          </p>
          <p className="text-lg text-orange-400">
            Produced by Harmony of Gaia Token | Fighting for the Planet
          </p>
          <div className="flex justify-center gap-4 mt-4">
            <Badge className="bg-gradient-to-r from-red-600 to-orange-600 text-white text-sm px-4 py-2">
              <Flame className="h-4 w-4 mr-2" />
              TOKEN BURNING ACTIVE
            </Badge>
            <Badge className="bg-gradient-to-r from-green-600 to-blue-600 text-white text-sm px-4 py-2">
              <Globe className="h-4 w-4 mr-2" />
              WORLDWIDE MULTIPLAYER
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Game Arena */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Game Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-2 border-red-500/50">
                <CardContent className="pt-4 text-center">
                  <Users className="h-6 w-6 text-red-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-400">{gameStats.totalPlayers.toLocaleString()}</div>
                  <div className="text-xs text-red-300">Total Fighters</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 border-2 border-green-500/50">
                <CardContent className="pt-4 text-center">
                  <Wifi className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400">{gameStats.onlinePlayers.toLocaleString()}</div>
                  <div className="text-xs text-green-300">Online Now</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-2 border-yellow-500/50">
                <CardContent className="pt-4 text-center">
                  <Sword className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-yellow-400">{gameStats.totalFights.toLocaleString()}</div>
                  <div className="text-xs text-yellow-300">Total Fights</div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50">
                <CardContent className="pt-4 text-center">
                  <Flame className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-400">{gameStats.gaiaTokensBurned.toLocaleString()}</div>
                  <div className="text-xs text-purple-300">Tokens Burned</div>
                </CardContent>
              </Card>
            </div>

            {/* Fighting Arena */}
            <Card className="bg-gradient-to-br from-gray-900/50 to-red-900/30 border-2 border-orange-500/50">
              <CardHeader>
                <CardTitle className="text-orange-400 flex items-center gap-2 justify-center">
                  <Trophy className="h-6 w-6" />
                  ⚔️ FIGHTING ARENA - TEKKEN STYLE COMBAT
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                
                {/* Game Canvas Placeholder */}
                <div className="relative bg-gradient-to-br from-red-800/30 to-orange-800/30 border border-red-500/30 rounded-lg overflow-hidden">
                  <canvas 
                    ref={canvasRef}
                    width={800}
                    height={400}
                    className="w-full h-64 bg-gradient-to-br from-red-900/20 to-orange-900/20"
                  />
                  
                  {/* Game Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {gameMode === 'waiting' && (
                      <div className="text-center">
                        <div className="text-6xl mb-4">🥊</div>
                        <div className="text-2xl font-bold text-orange-400 mb-4">READY TO FIGHT?</div>
                        <div className="text-lg text-muted-foreground mb-4">
                          Opponent: {opponent.name} ({opponent.country}) - {opponent.rank}
                        </div>
                      </div>
                    )}
                    
                    {gameMode === 'fighting' && (
                      <div className="text-center">
                        <div className="text-6xl mb-4 animate-bounce">⚔️</div>
                        <div className="text-2xl font-bold text-red-400 mb-4">FIGHT IN PROGRESS!</div>
                        <div className="text-lg text-muted-foreground">
                          Battle for 1 GAIA Token!
                        </div>
                      </div>
                    )}
                    
                    {gameMode === 'victory' && (
                      <div className="text-center">
                        <div className="text-6xl mb-4 animate-pulse">🏆</div>
                        <div className="text-2xl font-bold text-green-400 mb-4">VICTORY!</div>
                        <div className="text-lg text-green-300">+1 GAIA Token Won & Burned!</div>
                      </div>
                    )}
                    
                    {gameMode === 'defeat' && (
                      <div className="text-center">
                        <div className="text-6xl mb-4 animate-pulse">💔</div>
                        <div className="text-2xl font-bold text-red-400 mb-4">DEFEAT!</div>
                        <div className="text-lg text-red-300">-1 GAIA Token Lost & Burned!</div>
                      </div>
                    )}
                  </div>
                  
                  {/* Health Bars */}
                  <div className="absolute top-4 left-4 right-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs text-green-400 mb-1">YOU</div>
                        <Progress value={gameMode === 'defeat' ? 0 : 85} className="h-3 bg-red-900/50" />
                      </div>
                      <div>
                        <div className="text-xs text-red-400 mb-1 text-right">{opponent.name.toUpperCase()}</div>
                        <Progress value={gameMode === 'victory' ? 0 : 92} className="h-3 bg-red-900/50" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Game Controls */}
                <div className="flex justify-center gap-4">
                  <Button 
                    onClick={findOpponent}
                    disabled={gameMode === 'fighting'}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  >
                    <Target className="h-4 w-4 mr-2" />
                    🔍 FIND OPPONENT
                  </Button>
                  <Button 
                    onClick={startFight}
                    disabled={gameMode === 'fighting'}
                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                  >
                    <Sword className="h-4 w-4 mr-2" />
                    ⚔️ START FIGHT
                  </Button>
                </div>

                {/* Token Burning Info */}
                <div className="bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-500/30 rounded-lg p-4">
                  <div className="text-center">
                    <Flame className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                    <h4 className="text-lg font-bold text-orange-400 mb-2">🔥 TOKEN BURNING MECHANISM</h4>
                    <p className="text-sm text-muted-foreground mb-2">
                      Every fight burns 1 GAIA token regardless of win/loss - contributing to environmental projects!
                    </p>
                    <div className="text-xs text-orange-300">
                      💰 Win: +1 Token (then burned) | 💔 Lose: -1 Token (then burned) | 🌍 Impact: 100% to nature!
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Player Stats */}
            <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-500/50">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <Crown className="h-5 w-5" />
                  👤 Your Fighter Profile
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <Crown className="h-8 w-8 text-white" />
                  </div>
                  <div className="font-bold text-blue-400">{gameStats.playersRank}</div>
                </div>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Wins:</span>
                    <span className="text-green-400 font-bold">{gameStats.wins}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Losses:</span>
                    <span className="text-red-400 font-bold">{gameStats.losses}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Win Rate:</span>
                    <span className="text-yellow-400 font-bold">
                      {((gameStats.wins / (gameStats.wins + gameStats.losses)) * 100).toFixed(1)}%
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tokens Won:</span>
                    <span className="text-green-400 font-bold">{gameStats.tokensWon}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tokens Lost:</span>
                    <span className="text-red-400 font-bold">{gameStats.tokensLost}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Global Chat */}
            <Card className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 border-2 border-green-500/50">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <MessageCircle className="h-5 w-5" />
                  💬 Global Fighter Chat
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Chat Messages */}
                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {chatMessages.map((msg) => (
                    <div key={msg.id} className="p-2 bg-muted/20 rounded border border-border/30">
                      <div className="flex justify-between items-start">
                        <span className="font-semibold text-green-400 text-sm">{msg.player}</span>
                        <span className="text-xs text-muted-foreground">{msg.time}</span>
                      </div>
                      <div className="text-sm">{msg.message}</div>
                    </div>
                  ))}
                </div>

                {/* Chat Input */}
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                  />
                  <Button onClick={sendMessage} size="sm">
                    <MessageCircle className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Environmental Impact */}
            <Card className="bg-gradient-to-br from-green-900/30 to-blue-900/30 border-2 border-green-500/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Heart className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <h4 className="font-bold text-green-400 mb-2">🌍 Environmental Impact</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Every fight contributes to coral reef restoration and environmental projects through token burning!
                  </p>
                  <div className="text-2xl font-bold text-green-400 mb-1">
                    {gameStats.gaiaTokensBurned}
                  </div>
                  <div className="text-xs text-green-300">GAIA Tokens Burned Today</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GaiaFighterGame
