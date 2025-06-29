
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { 
  Crown, 
  Users, 
  Target, 
  Zap, 
  Trophy,
  Skull2,
  Heart,
  Timer,
  MapPin,
  Flame
} from 'lucide-react'
import { toast } from 'sonner'

interface Player {
  id: string
  name: string
  country: string
  rank: number
  health: number
  position: { x: number; y: number }
  isAlive: boolean
  kills: number
}

export function BattleRoyaleMode() {
  const [gameState, setGameState] = useState<'lobby' | 'starting' | 'active' | 'finished'>('lobby')
  const [playersCount, setPlayersCount] = useState(47)
  const [playersAlive, setPlayersAlive] = useState(100)
  const [currentPlayer, setCurrentPlayer] = useState<Player>({
    id: 'user',
    name: 'You',
    country: 'Global',
    rank: 1,
    health: 100,
    position: { x: 50, y: 50 },
    isAlive: true,
    kills: 0
  })
  const [timeRemaining, setTimeRemaining] = useState(600) // 10 minutes
  const [prizePool, setPrizePool] = useState(50000)
  const [topPlayers, setTopPlayers] = useState<Player[]>([])

  useEffect(() => {
    // Simulate players joining
    const joinInterval = setInterval(() => {
      if (gameState === 'lobby' && playersCount < 100) {
        setPlayersCount(prev => Math.min(100, prev + Math.floor(Math.random() * 5) + 1))
      }
    }, 2000)

    // Game timer
    let gameTimer: NodeJS.Timeout
    if (gameState === 'active') {
      gameTimer = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 0) {
            setGameState('finished')
            return 0
          }
          return prev - 1
        })
      }, 1000)
    }

    // Simulate battle events
    const battleInterval = setInterval(() => {
      if (gameState === 'active' && playersAlive > 1) {
        const eliminated = Math.floor(Math.random() * 3) + 1
        setPlayersAlive(prev => Math.max(1, prev - eliminated))
        
        if (Math.random() < 0.3) {
          setCurrentPlayer(prev => ({ ...prev, kills: prev.kills + 1 }))
          toast.success('🔥 ELIMINATION!', {
            description: 'You eliminated an opponent! +500 GAIA bonus!',
            duration: 3000
          })
        }
      }
    }, 5000)

    return () => {
      clearInterval(joinInterval)
      if (gameTimer) clearInterval(gameTimer)
      clearInterval(battleInterval)
    }
  }, [gameState, playersAlive])

  const joinBattleRoyale = () => {
    if (playersCount >= 100) {
      setGameState('starting')
      toast.success('🚀 BATTLE ROYALE STARTING!', {
        description: '100 fighters ready! Ultimate battle begins in 10 seconds!',
        duration: 5000
      })
      
      setTimeout(() => {
        setGameState('active')
        setPlayersAlive(100)
      }, 10000)
    } else {
      toast.info('⏳ Waiting for more players...', {
        description: `${100 - playersCount} more fighters needed!`,
        duration: 3000
      })
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      {/* Battle Royale Header */}
      <Card className="bg-gradient-to-br from-red-900/40 to-orange-900/40 border-2 border-red-500/50">
        <CardHeader>
          <CardTitle className="text-center">
            <div className="flex items-center justify-center gap-2 text-red-400 text-3xl font-bold mb-2">
              <Crown className="h-8 w-8" />
              ⚔️ BATTLE ROYALE - ULTIMATE SURVIVAL
            </div>
            <div className="text-lg text-orange-400">
              100 Fighters Enter • 1 Champion Emerges • Winner Takes All
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-900/30 rounded border border-green-500/30">
              <Users className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{playersCount}/100</div>
              <div className="text-xs text-muted-foreground">Fighters Ready</div>
            </div>
            
            <div className="text-center p-4 bg-blue-900/30 rounded border border-blue-500/30">
              <Heart className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{playersAlive}</div>
              <div className="text-xs text-muted-foreground">Still Alive</div>
            </div>
            
            <div className="text-center p-4 bg-yellow-900/30 rounded border border-yellow-500/30">
              <Trophy className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">{prizePool.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">GAIA Prize Pool</div>
            </div>
            
            <div className="text-center p-4 bg-purple-900/30 rounded border border-purple-500/30">
              <Timer className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">{formatTime(timeRemaining)}</div>
              <div className="text-xs text-muted-foreground">Time Remaining</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Main Battle Arena */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-br from-gray-900/50 to-red-900/30 border-2 border-red-500/50">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="text-red-400">🏟️ BATTLE ARENA</span>
                <Badge className={`${
                  gameState === 'lobby' ? 'bg-yellow-600' :
                  gameState === 'starting' ? 'bg-orange-600' :
                  gameState === 'active' ? 'bg-red-600' : 'bg-green-600'
                } text-white animate-pulse`}>
                  {gameState.toUpperCase()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gradient-to-br from-red-900/20 to-orange-900/20 rounded-lg border border-red-500/30 relative overflow-hidden">
                
                {/* Arena Background */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(239,68,68,0.1)_0%,transparent_70%)]"></div>
                
                {/* Game State Display */}
                <div className="absolute inset-0 flex items-center justify-center">
                  {gameState === 'lobby' && (
                    <div className="text-center">
                      <Crown className="h-20 w-20 text-yellow-400 mx-auto mb-4 animate-pulse" />
                      <div className="text-3xl font-bold text-yellow-400 mb-2">BATTLE ROYALE LOBBY</div>
                      <div className="text-lg text-muted-foreground mb-6">
                        {playersCount < 100 ? `Waiting for ${100 - playersCount} more fighters...` : 'Ready to start!'}
                      </div>
                      <Progress value={(playersCount / 100) * 100} className="w-64 mx-auto mb-6" />
                      <Button 
                        onClick={joinBattleRoyale}
                        className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-lg px-8 py-3"
                      >
                        <Target className="h-6 w-6 mr-2" />
                        JOIN BATTLE ROYALE
                      </Button>
                    </div>
                  )}
                  
                  {gameState === 'starting' && (
                    <div className="text-center">
                      <Zap className="h-20 w-20 text-orange-400 mx-auto mb-4 animate-bounce" />
                      <div className="text-4xl font-bold text-orange-400 mb-2">BATTLE STARTING!</div>
                      <div className="text-xl text-orange-300">Prepare for ultimate combat!</div>
                    </div>
                  )}
                  
                  {gameState === 'active' && (
                    <div className="text-center">
                      <Flame className="h-20 w-20 text-red-400 mx-auto mb-4 animate-pulse" />
                      <div className="text-4xl font-bold text-red-400 mb-2">BATTLE IN PROGRESS!</div>
                      <div className="text-xl text-red-300 mb-4">Fight for survival!</div>
                      <div className="bg-black/50 p-4 rounded-lg">
                        <div className="text-lg text-green-400">Your Stats:</div>
                        <div className="text-sm">Eliminations: {currentPlayer.kills}</div>
                        <div className="text-sm">Health: {currentPlayer.health}%</div>
                        <div className="text-sm">Rank: #{Math.max(1, playersAlive - currentPlayer.kills)}</div>
                      </div>
                    </div>
                  )}
                  
                  {gameState === 'finished' && (
                    <div className="text-center">
                      <Trophy className="h-20 w-20 text-yellow-400 mx-auto mb-4 animate-bounce" />
                      <div className="text-4xl font-bold text-yellow-400 mb-2">BATTLE COMPLETE!</div>
                      <div className="text-xl text-yellow-300">Champion has been crowned!</div>
                    </div>
                  )}
                </div>

                {/* Live Stats Overlay */}
                {gameState === 'active' && (
                  <div className="absolute top-4 left-4 bg-black/80 p-3 rounded border border-red-500/30">
                    <div className="text-red-400 font-bold text-sm">ZONE CLOSING</div>
                    <div className="text-xs text-muted-foreground">Stay in safe zone!</div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard & Stats */}
        <div className="space-y-6">
          
          {/* Live Leaderboard */}
          <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border border-yellow-500/30">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Trophy className="h-5 w-5" />
                🏆 Live Leaderboard
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center justify-between p-2 bg-black/30 rounded">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full flex items-center justify-center text-xs font-bold">
                      {i + 1}
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold">{i === 0 ? 'You' : `Fighter${i + 1}`}</div>
                      <div className="text-xs text-muted-foreground">{Math.floor(Math.random() * 10)} eliminations</div>
                    </div>
                  </div>
                  <Badge className="bg-green-600 text-white text-xs">ALIVE</Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Prize Breakdown */}
          <Card className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 border border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Flame className="h-5 w-5" />
                💰 Prize Pool
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>🥇 1st Place:</span>
                <span className="text-yellow-400 font-bold">{Math.floor(prizePool * 0.5).toLocaleString()} GAIA</span>
              </div>
              <div className="flex justify-between">
                <span>🥈 2nd Place:</span>
                <span className="text-gray-400 font-bold">{Math.floor(prizePool * 0.25).toLocaleString()} GAIA</span>
              </div>
              <div className="flex justify-between">
                <span>🥉 3rd Place:</span>
                <span className="text-orange-400 font-bold">{Math.floor(prizePool * 0.15).toLocaleString()} GAIA</span>
              </div>
              <div className="flex justify-between">
                <span>Top 10:</span>
                <span className="text-blue-400 font-bold">{Math.floor(prizePool * 0.1 / 7).toLocaleString()} GAIA each</span>
              </div>
            </CardContent>
          </Card>

          {/* Environmental Impact */}
          <Card className="bg-gradient-to-br from-green-900/30 to-blue-900/30 border border-green-500/30">
            <CardContent className="pt-6 text-center">
              <Heart className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-sm font-bold text-green-400 mb-2">🌍 Battle for Earth!</div>
              <div className="text-xs text-muted-foreground">
                Every elimination plants a tree! This battle will plant {playersAlive} trees for environmental restoration!
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
