
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Sword, 
  Shield, 
  Heart, 
  Zap, 
  Users, 
  MapPin, 
  Crown,
  Gamepad2,
  Trophy,
  Star
} from 'lucide-react'
import { toast } from 'sonner'

interface Player {
  name: string
  level: number
  health: number
  maxHealth: number
  mana: number
  maxMana: number
  experience: number
  class: string
  location: string
}

interface GameStats {
  playersOnline: number
  totalQuests: number
  guildsActive: number
  worldEvents: number
}

export default function GaiaFantasyMMORPG() {
  const [player, setPlayer] = useState<Player>({
    name: 'Gaia Guardian',
    level: 1,
    health: 100,
    maxHealth: 100,
    mana: 50,
    maxMana: 50,
    experience: 0,
    class: 'Environmental Protector',
    location: 'Harmony Forest'
  })

  const [gameStats, setGameStats] = useState<GameStats>({
    playersOnline: 15247,
    totalQuests: 500,
    guildsActive: 128,
    worldEvents: 3
  })

  const [isGameActive, setIsGameActive] = useState(false)
  const [currentQuest, setCurrentQuest] = useState<string | null>(null)

  useEffect(() => {
    // Simulate live game statistics
    const interval = setInterval(() => {
      setGameStats(prev => ({
        ...prev,
        playersOnline: prev.playersOnline + Math.floor(Math.random() * 10 - 5),
        worldEvents: Math.floor(Math.random() * 5) + 1
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const startGame = () => {
    setIsGameActive(true)
    toast.success('🎮 Welcome to GAIA Fantasy MMORPG!', {
      description: 'Your adventure begins in the mystical Harmony Forest',
      duration: 5000
    })
  }

  const startQuest = (questName: string) => {
    setCurrentQuest(questName)
    toast.success(`🌟 Quest Started: ${questName}`, {
      description: 'Complete environmental challenges to gain experience',
      duration: 4000
    })
    
    // Simulate quest completion
    setTimeout(() => {
      setPlayer(prev => ({
        ...prev,
        experience: prev.experience + 50,
        level: prev.experience + 50 >= prev.level * 100 ? prev.level + 1 : prev.level
      }))
      setCurrentQuest(null)
      toast.success('✅ Quest Completed!', {
        description: 'You gained experience and protected the environment',
        duration: 3000
      })
    }, 8000)
  }

  const availableQuests = [
    'Save the Endangered Panthers',
    'Clean the Crystal Rivers',
    'Plant 1000 Magic Trees',
    'Defeat the Pollution Demons',
    'Rescue the Forest Spirits'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 p-6">
      <div className="container mx-auto space-y-6">
        {/* Game Header */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400 text-3xl">
              <Crown className="h-8 w-8" />
              🌍 GAIA Fantasy MMORPG - Environmental Adventure
            </CardTitle>
            <div className="flex gap-4">
              <Badge className="bg-green-600 animate-pulse">
                👥 {gameStats.playersOnline.toLocaleString()} Online
              </Badge>
              <Badge className="bg-blue-600">
                🏆 {gameStats.totalQuests} Quests Available
              </Badge>
              <Badge className="bg-purple-600">
                ⚔️ {gameStats.guildsActive} Active Guilds
              </Badge>
              <Badge className="bg-orange-600 animate-pulse">
                🌟 {gameStats.worldEvents} World Events
              </Badge>
            </div>
          </CardHeader>
        </Card>

        {!isGameActive ? (
          /* Game Launch Screen */
          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-center text-purple-400 text-2xl">
                🎮 Enter the GAIA Universe
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-6">
              <div className="text-6xl animate-bounce">🌍⚔️🌍</div>
              <p className="text-lg text-muted-foreground">
                Join millions of players in the ultimate environmental adventure MMORPG
              </p>
              <Button 
                onClick={startGame}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold text-xl py-4 px-8"
              >
                <Gamepad2 className="h-6 w-6 mr-2" />
                START ADVENTURE
              </Button>
            </CardContent>
          </Card>
        ) : (
          /* Active Game Interface */
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Player Stats */}
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="text-green-400">🧙‍♂️ Player Status</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between">
                    <span className="text-green-400 font-bold">{player.name}</span>
                    <Badge className="bg-green-600">Level {player.level}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{player.class}</p>
                  <p className="text-sm text-blue-400">📍 {player.location}</p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-red-400">❤️ Health</span>
                    <span>{player.health}/{player.maxHealth}</span>
                  </div>
                  <Progress value={(player.health / player.maxHealth) * 100} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-blue-400">⚡ Mana</span>
                    <span>{player.mana}/{player.maxMana}</span>
                  </div>
                  <Progress value={(player.mana / player.maxMana) * 100} className="h-2" />
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-yellow-400">⭐ Experience</span>
                    <span>{player.experience}/{player.level * 100}</span>
                  </div>
                  <Progress value={(player.experience / (player.level * 100)) * 100} className="h-2" />
                </div>
              </CardContent>
            </Card>

            {/* Game World */}
            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="text-blue-400">🌍 Game World</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-6xl mb-4">🌲🏔️🌊</div>
                  <h3 className="text-xl font-bold text-blue-400">Harmony Forest</h3>
                  <p className="text-sm text-muted-foreground">
                    A mystical realm where environmental magic flows freely
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button variant="outline" className="border-green-500/30 text-green-400">
                    🌲 Forest Path
                  </Button>
                  <Button variant="outline" className="border-blue-500/30 text-blue-400">
                    🌊 Crystal Lake
                  </Button>
                  <Button variant="outline" className="border-purple-500/30 text-purple-400">
                    🏔️ Mountain Peak
                  </Button>
                  <Button variant="outline" className="border-yellow-500/30 text-yellow-400">
                    🌅 Solar Plains
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Quests */}
            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="text-purple-400">⚔️ Active Quests</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {currentQuest ? (
                  <div className="p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
                    <h4 className="text-yellow-400 font-bold">🌟 Current Quest</h4>
                    <p className="text-sm">{currentQuest}</p>
                    <div className="mt-2">
                      <Progress value={Math.random() * 100} className="h-2" />
                      <p className="text-xs text-muted-foreground mt-1">Quest in progress...</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <h4 className="text-purple-400 font-bold">Available Quests:</h4>
                    {availableQuests.map((quest, index) => (
                      <Button
                        key={index}
                        onClick={() => startQuest(quest)}
                        variant="outline"
                        className="w-full justify-start border-purple-500/30 text-purple-300 hover:bg-purple-500/10"
                      >
                        <Star className="h-4 w-4 mr-2" />
                        {quest}
                      </Button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Live Game Statistics */}
        <Card className="border-orange-500/30 bg-orange-900/20">
          <CardHeader>
            <CardTitle className="text-orange-400">📊 Live Game Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-900/20 rounded-lg">
                <Users className="h-8 w-8 mx-auto text-green-400" />
                <div className="text-2xl font-bold text-green-400">{gameStats.playersOnline.toLocaleString()}</div>
                <div className="text-sm text-muted-foreground">Players Online</div>
              </div>
              <div className="text-center p-4 bg-blue-900/20 rounded-lg">
                <Trophy className="h-8 w-8 mx-auto text-blue-400" />
                <div className="text-2xl font-bold text-blue-400">{gameStats.totalQuests}</div>
                <div className="text-sm text-muted-foreground">Total Quests</div>
              </div>
              <div className="text-center p-4 bg-purple-900/20 rounded-lg">
                <Shield className="h-8 w-8 mx-auto text-purple-400" />
                <div className="text-2xl font-bold text-purple-400">{gameStats.guildsActive}</div>
                <div className="text-sm text-muted-foreground">Active Guilds</div>
              </div>
              <div className="text-center p-4 bg-orange-900/20 rounded-lg">
                <Zap className="h-8 w-8 mx-auto text-orange-400" />
                <div className="text-2xl font-bold text-orange-400">{gameStats.worldEvents}</div>
                <div className="text-sm text-muted-foreground">World Events</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
