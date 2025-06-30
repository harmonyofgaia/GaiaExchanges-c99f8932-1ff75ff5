
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Gamepad2, Sword, Shield, Target, Zap, Crown, Star } from 'lucide-react'
import { toast } from 'sonner'

const Game = () => {
  const [playerLevel, setPlayerLevel] = useState(1)
  const [experience, setExperience] = useState(0)
  const [health, setHealth] = useState(100)
  const [energy, setEnergy] = useState(100)
  const [gaiaCoins, setGaiaCoins] = useState(1000)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    console.log('🎮 GAIA GAME SYSTEM - LOADING COMPLETE')
    console.log('🌍 Welcome to the GAiA Gaming Universe!')
    
    if (isPlaying) {
      const gameInterval = setInterval(() => {
        setExperience(prev => {
          const newExp = prev + Math.floor(Math.random() * 10) + 1
          if (newExp >= playerLevel * 100) {
            setPlayerLevel(level => level + 1)
            setGaiaCoins(coins => coins + 500)
            toast.success('🎉 Level Up!', {
              description: `Congratulations! You reached level ${playerLevel + 1}`,
              duration: 3000
            })
            return 0
          }
          return newExp
        })
        
        setEnergy(prev => Math.max(0, prev - 1))
        setGaiaCoins(prev => prev + Math.floor(Math.random() * 5) + 1)
      }, 2000)

      return () => clearInterval(gameInterval)
    }
  }, [isPlaying, playerLevel])

  const startGame = () => {
    setIsPlaying(true)
    setHealth(100)
    setEnergy(100)
    
    toast.success('🎮 Game Started!', {
      description: 'Welcome to the GAiA Gaming Universe - Start your adventure!',
      duration: 4000
    })
  }

  const pauseGame = () => {
    setIsPlaying(false)
    toast.info('⏸️ Game Paused', {
      description: 'Your progress has been saved',
      duration: 2000
    })
  }

  const buyHealthPotion = () => {
    if (gaiaCoins >= 50) {
      setGaiaCoins(prev => prev - 50)
      setHealth(prev => Math.min(100, prev + 25))
      toast.success('🧪 Health Potion Used!', {
        description: '+25 Health restored',
        duration: 2000
      })
    } else {
      toast.error('❌ Not enough GAiA Coins!', {
        description: 'You need 50 GAiA Coins for a health potion',
        duration: 3000
      })
    }
  }

  const buyEnergyPotion = () => {
    if (gaiaCoins >= 30) {
      setGaiaCoins(prev => prev - 30)
      setEnergy(prev => Math.min(100, prev + 50))
      toast.success('⚡ Energy Potion Used!', {
        description: '+50 Energy restored',
        duration: 2000
      })
    } else {
      toast.error('❌ Not enough GAiA Coins!', {
        description: 'You need 30 GAiA Coins for an energy potion',
        duration: 3000
      })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <Card className="bg-gradient-to-r from-green-900/50 to-blue-900/50 border-green-500/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Gamepad2 className="h-8 w-8" />
              🎮 GAiA Gaming Universe - Adventure Awaits!
            </CardTitle>
            <div className="flex gap-4 text-sm">
              <Badge className="bg-blue-600">
                🏆 Level: {playerLevel}
              </Badge>
              <Badge className="bg-purple-600">
                ⭐ EXP: {experience}/{playerLevel * 100}
              </Badge>
              <Badge className="bg-green-600">
                💰 GAiA Coins: {gaiaCoins}
              </Badge>
              <Badge className={isPlaying ? "bg-green-600 animate-pulse" : "bg-gray-600"}>
                {isPlaying ? "🎮 Playing" : "⏸️ Paused"}
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {/* Player Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-red-900/30 border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-400 flex items-center gap-2">
                <Shield className="h-5 w-5" />
                ❤️ Health
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Current Health:</span>
                  <span className="text-red-400 font-bold">{health}/100</span>
                </div>
                <Progress value={health} className="h-3" />
                <Button 
                  onClick={buyHealthPotion}
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={health >= 100}
                >
                  🧪 Health Potion (50 coins)
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-blue-900/30 border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                ⚡ Energy
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Current Energy:</span>
                  <span className="text-blue-400 font-bold">{energy}/100</span>
                </div>
                <Progress value={energy} className="h-3" />
                <Button 
                  onClick={buyEnergyPotion}
                  className="w-full bg-blue-600 hover:bg-blue-700"
                  disabled={energy >= 100}
                >
                  ⚡ Energy Potion (30 coins)
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-purple-900/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Star className="h-5 w-5" />
                ⭐ Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span>Current EXP:</span>
                  <span className="text-purple-400 font-bold">{experience}/{playerLevel * 100}</span>
                </div>
                <Progress value={(experience / (playerLevel * 100)) * 100} className="h-3" />
                <div className="text-center text-sm text-muted-foreground">
                  Next level in {(playerLevel * 100) - experience} EXP
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Game Controls */}
        <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
          <CardHeader>
            <CardTitle className="text-purple-400">🎯 Game Controls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {!isPlaying ? (
                <Button 
                  onClick={startGame}
                  className="bg-green-600 hover:bg-green-700 h-16 text-lg"
                >
                  <Gamepad2 className="h-6 w-6 mr-2" />
                  🎮 Start Adventure
                </Button>
              ) : (
                <Button 
                  onClick={pauseGame}
                  className="bg-orange-600 hover:bg-orange-700 h-16 text-lg"
                >
                  <Target className="h-6 w-6 mr-2" />
                  ⏸️ Pause Game
                </Button>
              )}
              
              <Button className="bg-blue-600 hover:bg-blue-700 h-16 text-lg" disabled={!isPlaying}>
                <Sword className="h-6 w-6 mr-2" />
                ⚔️ Battle Mode
              </Button>
              
              <Button className="bg-purple-600 hover:bg-purple-700 h-16 text-lg" disabled={!isPlaying}>
                <Crown className="h-6 w-6 mr-2" />
                🏪 GAiA Shop
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Gaming Features */}
        <Card className="bg-gradient-to-r from-cyan-900/30 to-teal-900/30 border-cyan-500/30">
          <CardHeader>
            <CardTitle className="text-cyan-400">🌟 Gaming Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-bold text-cyan-400 mb-3">🎮 Available Features</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>⚔️ Combat System:</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🏆 Level System:</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>💰 GAiA Economy:</span>
                    <span className="text-green-400">Active</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🧪 Potion System:</span>
                    <span className="text-green-400">Active</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold text-cyan-400 mb-3">🚀 Coming Soon</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>🗺️ Quest System:</span>
                    <span className="text-yellow-400">Coming Soon</span>
                  </div>
                  <div className="flex justify-between">
                    <span>👥 Multiplayer:</span>
                    <span className="text-yellow-400">Coming Soon</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🏠 Housing System:</span>
                    <span className="text-yellow-400">Coming Soon</span>
                  </div>
                  <div className="flex justify-between">
                    <span>🎨 NFT Integration:</span>
                    <span className="text-yellow-400">Coming Soon</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Game
