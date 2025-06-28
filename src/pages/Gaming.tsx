import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Gamepad2, 
  Trophy, 
  Coins, 
  Star, 
  Heart,
  Users,
  Target,
  Zap,
  Gift,
  Download,
  Play,
  Crown,
  Sparkles
} from 'lucide-react'
import { toast } from 'sonner'
import { HarmonyGamingEngine } from '@/components/HarmonyGamingEngine'

const Gaming = () => {
  const [playerStats, setPlayerStats] = useState({
    gaiaTokens: 0,
    level: 1,
    experience: 0,
    gamesPlayed: 0,
    achievements: 0,
    animalsSaved: 0
  })

  const [activeGames, setActiveGames] = useState([
    { 
      id: 1, 
      name: 'Harmony Builders', 
      description: 'Build sustainable worlds and earn GAIA tokens',
      reward: '10-50 GAIA per game',
      players: 12500,
      difficulty: 'Easy',
      category: 'Building',
      animalImpact: '5 animals helped per game'
    },
    { 
      id: 2, 
      name: 'Ocean Cleaners', 
      description: 'Clean the oceans and save marine life',
      reward: '25-100 GAIA per game',
      players: 8750,
      difficulty: 'Medium',
      category: 'Adventure',
      animalImpact: '10 marine animals saved'
    },
    { 
      id: 3, 
      name: 'Forest Guardians', 
      description: 'Protect forests and wildlife habitats',
      reward: '50-200 GAIA per game',
      players: 5200,
      difficulty: 'Hard',
      category: 'Strategy',
      animalImpact: '20 forest animals protected'
    },
    { 
      id: 4, 
      name: 'Green Energy Quest', 
      description: 'Build renewable energy systems worldwide',
      reward: '30-150 GAIA per game',
      players: 9800,
      difficulty: 'Medium',
      category: 'Simulation',
      animalImpact: '15 habitats powered sustainably'
    }
  ])

  const [dailyChallenges] = useState([
    { id: 1, title: 'Save 10 Virtual Animals', reward: '100 GAIA', progress: 70, completed: false },
    { id: 2, title: 'Plant 25 Virtual Trees', reward: '75 GAIA', progress: 45, completed: false },
    { id: 3, title: 'Clean 5 Ocean Areas', reward: '120 GAIA', progress: 90, completed: true },
    { id: 4, title: 'Build 3 Animal Sanctuaries', reward: '200 GAIA', progress: 60, completed: false }
  ])

  // Gaming metrics update
  useEffect(() => {
    const updateStats = () => {
      setPlayerStats(prev => ({
        ...prev,
        gaiaTokens: prev.gaiaTokens + Math.floor(Math.random() * 10),
        experience: prev.experience + Math.floor(Math.random() * 5),
        animalsSaved: prev.animalsSaved + Math.floor(Math.random() * 2)
      }))
    }

    const interval = setInterval(updateStats, 8000)
    return () => clearInterval(interval)
  }, [])

  const playGame = (gameId: number) => {
    const game = activeGames.find(g => g.id === gameId)
    if (game) {
      const earnedTokens = Math.floor(Math.random() * 50) + 10
      const animalsSaved = Math.floor(Math.random() * 10) + 5
      
      setPlayerStats(prev => ({
        ...prev,
        gaiaTokens: prev.gaiaTokens + earnedTokens,
        gamesPlayed: prev.gamesPlayed + 1,
        experience: prev.experience + 25,
        animalsSaved: prev.animalsSaved + animalsSaved
      }))

      toast.success(`🎮 ${game.name} Completed!`, {
        description: `Earned ${earnedTokens} GAIA tokens! Helped ${animalsSaved} animals!`,
        duration: 5000
      })
    }
  }

  const downloadApp = () => {
    toast.success('🚀 Downloading Harmony of Gaia Game!', {
      description: 'My Little Big Planet experience - where creativity meets conservation!',
      duration: 6000
    })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-green-900/20 to-blue-900/20">
      <div className="container mx-auto px-4 py-6">
        
        {/* Gaming Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-green-400 to-blue-400 bg-clip-text text-transparent">
            🎮 HARMONY OF GAIA GAMING
          </h1>
          <p className="text-xl text-muted-foreground mt-4">
            🌍 My Little Big Planet - Play, Earn, Save Animals & Build Better Worlds
          </p>
          <p className="text-sm text-green-400 mt-2">
            🐾 Every Game Played = Real Animals Saved From Cages Forever
          </p>
        </div>

        {/* Player Stats Dashboard */}
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mb-8">
          <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/30 to-orange-900/30">
            <CardContent className="pt-4 text-center">
              <Coins className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">{playerStats.gaiaTokens}</div>
              <div className="text-xs text-muted-foreground">GAIA Tokens</div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
            <CardContent className="pt-4 text-center">
              <Crown className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">{playerStats.level}</div>
              <div className="text-xs text-muted-foreground">Level</div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
            <CardContent className="pt-4 text-center">
              <Zap className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{playerStats.experience}</div>
              <div className="text-xs text-muted-foreground">Experience</div>
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
            <CardContent className="pt-4 text-center">
              <Gamepad2 className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{playerStats.gamesPlayed}</div>
              <div className="text-xs text-muted-foreground">Games Played</div>
            </CardContent>
          </Card>

          <Card className="border-red-500/30 bg-gradient-to-br from-red-900/30 to-pink-900/30">
            <CardContent className="pt-4 text-center">
              <Trophy className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-400">{playerStats.achievements}</div>
              <div className="text-xs text-muted-foreground">Achievements</div>
            </CardContent>
          </Card>

          <Card className="border-pink-500/30 bg-gradient-to-br from-pink-900/30 to-rose-900/30">
            <CardContent className="pt-4 text-center">
              <Heart className="h-6 w-6 text-pink-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-pink-400">{playerStats.animalsSaved}</div>
              <div className="text-xs text-muted-foreground">Animals Saved</div>
            </CardContent>
          </Card>
        </div>

        {/* Ultimate Gaming Engine */}
        <HarmonyGamingEngine />

        {/* Download Gaming App */}
        <Card className="border-2 border-purple-500/50 bg-gradient-to-r from-purple-900/30 to-pink-900/30 mb-8 mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400 text-center justify-center">
              <Sparkles className="h-6 w-6" />
              🎮 Download "My Little Big Planet" - Harmony of Gaia Edition
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <p className="text-lg text-muted-foreground">
              The most revolutionary gaming experience that saves real animals while you play!
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/20">
                <h4 className="font-bold text-green-400 mb-2">🌍 World Building</h4>
                <p className="text-sm text-muted-foreground">Create sustainable worlds where animals roam free</p>
              </div>
              <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
                <h4 className="font-bold text-blue-400 mb-2">💰 Earn Real GAIA</h4>
                <p className="text-sm text-muted-foreground">Every action earns actual cryptocurrency</p>
              </div>
              <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
                <h4 className="font-bold text-purple-400 mb-2">🐾 Save Real Animals</h4>
                <p className="text-sm text-muted-foreground">Game progress funds real animal sanctuaries</p>
              </div>
            </div>
            <Button 
              onClick={downloadApp}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8"
            >
              <Download className="h-5 w-5 mr-2" />
              🚀 DOWNLOAD HARMONY OF GAIA GAME - FREE
            </Button>
          </CardContent>
        </Card>

        {/* Available Games */}
        <Card className="border-green-500/20 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Play className="h-5 w-5" />
              🎯 Play & Earn Games - Save Animals With Every Click
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {activeGames.map((game) => (
                <div key={game.id} className="p-4 border border-border/50 rounded-lg bg-muted/20 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-bold">{game.name}</h3>
                    <Badge className="bg-green-600 text-white">{game.difficulty}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{game.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Reward:</span>
                      <span className="text-yellow-400 font-bold">{game.reward}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Active Players:</span>
                      <span className="text-blue-400">{game.players.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Animal Impact:</span>
                      <span className="text-green-400">{game.animalImpact}</span>
                    </div>
                  </div>
                  <Button 
                    onClick={() => playGame(game.id)}
                    className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                  >
                    <Play className="h-4 w-4 mr-2" />
                    🎮 PLAY NOW & SAVE ANIMALS
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Daily Challenges */}
        <Card className="border-orange-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-400">
              <Target className="h-5 w-5" />
              🏆 Daily Animal Rescue Challenges
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {dailyChallenges.map((challenge) => (
              <div key={challenge.id} className="p-4 border border-border/50 rounded-lg bg-muted/20">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold">{challenge.title}</h4>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-yellow-600 text-white">{challenge.reward}</Badge>
                    {challenge.completed && <Badge className="bg-green-600 text-white">COMPLETED</Badge>}
                  </div>
                </div>
                <Progress value={challenge.progress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>{challenge.progress}% Complete</span>
                  <span>🐾 Real animals benefit from your progress</span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Mission Statement */}
        <div className="mt-8 text-center">
          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-lg p-6">
            <h3 className="text-2xl font-bold text-green-400 mb-4">🌍 OUR MISSION: BREAK THE CAGE WORLD</h3>
            <p className="text-muted-foreground mb-4">
              Every game you play contributes to real animal welfare projects worldwide. 
              We're building a future where no animal lives in miserable conditions.
            </p>
            <p className="text-sm text-green-400 font-bold">
              🎵 "Seeds Will Form Into Music" - Every click creates harmony for all living beings! 🎵
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Gaming
