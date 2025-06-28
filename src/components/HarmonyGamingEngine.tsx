
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { 
  Gamepad2, 
  Zap, 
  Shield, 
  Sword, 
  Crown, 
  Target,
  Users,
  Trophy,
  Heart,
  Star,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  Settings,
  Maximize,
  Sparkles
} from 'lucide-react'
import { toast } from 'sonner'

export function HarmonyGamingEngine() {
  const [gameState, setGameState] = useState({
    isPlaying: false,
    playerHealth: 100,
    playerMana: 100,
    playerLevel: 25,
    experience: 15750,
    nextLevelXP: 20000,
    score: 48320,
    killCount: 127,
    currentWave: 8,
    gaiaEarned: 2340.75,
    animalsSaved: 45
  })

  const [activeAbilities, setActiveAbilities] = useState([
    { id: 1, name: 'Animal Guardian Shield', cooldown: 0, maxCooldown: 15, damage: 0, healing: 250 },
    { id: 2, name: 'Liberation Strike', cooldown: 3, maxCooldown: 8, damage: 450, healing: 0 },
    { id: 3, name: 'Sanctuary Blast', cooldown: 0, maxCooldown: 20, damage: 800, healing: 0 },
    { id: 4, name: 'Healing Harmony', cooldown: 5, maxCooldown: 12, damage: 0, healing: 400 }
  ])

  const [enemies, setEnemies] = useState([
    { id: 1, name: 'Cage Master', health: 750, maxHealth: 1200, type: 'boss', reward: 150 },
    { id: 2, name: 'Factory Guard', health: 280, maxHealth: 400, type: 'elite', reward: 75 },
    { id: 3, name: 'Poacher Scout', health: 150, maxHealth: 300, type: 'normal', reward: 35 },
    { id: 4, name: 'Cage Builder', health: 200, maxHealth: 350, type: 'normal', reward: 45 }
  ])

  const [gameSettings, setGameSettings] = useState({
    graphics: 'Ultra',
    sound: 85,
    difficulty: 'Hard',
    autoSave: true,
    crossPlatform: true
  })

  const gameCanvasRef = useRef<HTMLDivElement>(null)

  // Game loop simulation
  useEffect(() => {
    if (!gameState.isPlaying) return

    const gameLoop = setInterval(() => {
      // Update cooldowns
      setActiveAbilities(prev => prev.map(ability => ({
        ...ability,
        cooldown: Math.max(0, ability.cooldown - 1)
      })))

      // Regenerate mana
      setGameState(prev => ({
        ...prev,
        playerMana: Math.min(100, prev.playerMana + 2),
        experience: prev.experience + Math.floor(Math.random() * 25),
        gaiaEarned: prev.gaiaEarned + (Math.random() * 5)
      }))

      // Random enemy damage simulation
      if (Math.random() < 0.3) {
        setGameState(prev => ({
          ...prev,
          playerHealth: Math.max(0, prev.playerHealth - Math.floor(Math.random() * 15))
        }))
      }

      // Random game events
      if (Math.random() < 0.1) {
        const events = [
          'Animal rescued from factory farm!',
          'Sanctuary expansion completed!',
          'Cage system destroyed!',
          'Wildlife corridor opened!',
          'Poacher camp eliminated!'
        ]
        const randomEvent = events[Math.floor(Math.random() * events.length)]
        toast.success('🎮 Game Event!', {
          description: randomEvent,
          duration: 3000
        })
      }
    }, 1000)

    return () => clearInterval(gameLoop)
  }, [gameState.isPlaying])

  const startGame = () => {
    setGameState(prev => ({ ...prev, isPlaying: true }))
    toast.success('🚀 Harmony of Gaia Game Started!', {
      description: 'Fighting for animal liberation begins now!',
      duration: 4000
    })
  }

  const pauseGame = () => {
    setGameState(prev => ({ ...prev, isPlaying: false }))
    toast.info('⏸️ Game Paused', {
      description: 'Animals are safe while you rest!',
      duration: 2000
    })
  }

  const useAbility = (abilityId: number) => {
    const ability = activeAbilities.find(a => a.id === abilityId)
    if (!ability || ability.cooldown > 0) return

    if (ability.healing > 0) {
      setGameState(prev => ({
        ...prev,
        playerHealth: Math.min(100, prev.playerHealth + ability.healing / 5),
        playerMana: Math.max(0, prev.playerMana - 15)
      }))
    }

    if (ability.damage > 0) {
      const enemyIndex = Math.floor(Math.random() * enemies.length)
      setEnemies(prev => prev.map((enemy, index) => 
        index === enemyIndex 
          ? { ...enemy, health: Math.max(0, enemy.health - ability.damage / 10) }
          : enemy
      ))

      setGameState(prev => ({
        ...prev,
        playerMana: Math.max(0, prev.playerMana - 20),
        score: prev.score + ability.damage,
        gaiaEarned: prev.gaiaEarned + (ability.damage / 10)
      }))
    }

    setActiveAbilities(prev => prev.map(a => 
      a.id === abilityId ? { ...a, cooldown: a.maxCooldown } : a
    ))

    toast.success(`⚡ ${ability.name} Activated!`, {
      description: `${ability.damage > 0 ? `Dealt ${ability.damage} damage!` : `Healed ${ability.healing} HP!`}`,
      duration: 2000
    })
  }

  const getAbilityColor = (ability: any) => {
    if (ability.cooldown > 0) return 'bg-gray-600'
    if (ability.healing > 0) return 'bg-green-600 hover:bg-green-700'
    return 'bg-red-600 hover:bg-red-700'
  }

  return (
    <div className="space-y-6">
      {/* Gaming Engine Header */}
      <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Gamepad2 className="h-6 w-6" />
            🎮 HARMONY OF GAIA - ULTIMATE GAMING ENGINE
            <Badge className="bg-purple-600 text-white animate-pulse">CAGE-BREAKING WARFARE</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 rounded-lg bg-blue-900/30 border border-blue-500/20">
              <Crown className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">Level {gameState.playerLevel}</div>
              <div className="text-xs text-muted-foreground">Liberation Warrior</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-yellow-900/30 border border-yellow-500/20">
              <Star className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">{gameState.score.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">Total Score</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-green-900/30 border border-green-500/20">
              <Heart className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">{gameState.animalsSaved}</div>
              <div className="text-xs text-muted-foreground">Animals Saved</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-red-900/30 border border-red-500/20">
              <Trophy className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-400">{gameState.killCount}</div>
              <div className="text-xs text-muted-foreground">Enemies Defeated</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Game Canvas */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-br from-black to-gray-900">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-green-400">🌍 BATTLEFIELD - BREAKING THE CAGE WORLD</CardTitle>
            <div className="flex gap-2">
              {!gameState.isPlaying ? (
                <Button onClick={startGame} className="bg-green-600 hover:bg-green-700">
                  <Play className="h-4 w-4 mr-2" />
                  START BATTLE
                </Button>
              ) : (
                <Button onClick={pauseGame} variant="outline">
                  <Pause className="h-4 w-4 mr-2" />
                  PAUSE
                </Button>
              )}
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Button variant="outline">
                <Maximize className="h-4 w-4 mr-2" />
                Fullscreen
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Game Canvas Area */}
          <div 
            ref={gameCanvasRef}
            className="aspect-video bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 rounded-lg border-2 border-green-500/30 relative overflow-hidden"
          >
            {/* Simulated Game Environment */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <Sparkles className="h-16 w-16 text-green-400 mx-auto animate-pulse" />
                <h3 className="text-2xl font-bold text-green-400">HARMONY OF GAIA ENGINE</h3>
                <p className="text-muted-foreground">Ultra-High Performance • Cross-Platform • VR Ready</p>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  <div className="p-3 bg-green-900/30 rounded border border-green-500/20">
                    <div className="text-sm text-green-400">Graphics: {gameSettings.graphics}</div>
                  </div>
                  <div className="p-3 bg-blue-900/30 rounded border border-blue-500/20">
                    <div className="text-sm text-blue-400">FPS: 144</div>
                  </div>
                  <div className="p-3 bg-purple-900/30 rounded border border-purple-500/20">
                    <div className="text-sm text-purple-400">Ping: 12ms</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Game Status Overlay */}
            {gameState.isPlaying && (
              <div className="absolute top-4 left-4 space-y-2">
                <div className="bg-black/70 p-2 rounded text-sm">
                  <div className="text-green-400">Wave: {gameState.currentWave}</div>
                </div>
                <div className="bg-black/70 p-2 rounded text-sm">
                  <div className="text-yellow-400">GAIA: {gameState.gaiaEarned.toFixed(2)}</div>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Player Stats & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Player Status */}
        <Card className="border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Shield className="h-5 w-5" />
              🛡️ Liberation Warrior Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Health:</span>
                <span className="text-red-400">{gameState.playerHealth}/100</span>
              </div>
              <Progress value={gameState.playerHealth} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Mana:</span>
                <span className="text-blue-400">{gameState.playerMana}/100</span>
              </div>
              <Progress value={gameState.playerMana} className="h-2" />
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Experience:</span>
                <span className="text-purple-400">{gameState.experience}/{gameState.nextLevelXP}</span>
              </div>
              <Progress value={(gameState.experience / gameState.nextLevelXP) * 100} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="p-3 bg-green-900/20 rounded border border-green-500/20 text-center">
                <div className="text-lg font-bold text-green-400">{gameState.gaiaEarned.toFixed(2)}</div>
                <div className="text-xs text-muted-foreground">GAIA Earned</div>
              </div>
              <div className="p-3 bg-blue-900/20 rounded border border-blue-500/20 text-center">
                <div className="text-lg font-bold text-blue-400">{gameState.animalsSaved}</div>
                <div className="text-xs text-muted-foreground">Animals Saved</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Combat Abilities */}
        <Card className="border-red-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <Sword className="h-5 w-5" />
              ⚔️ Combat Abilities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-3">
              {activeAbilities.map((ability) => (
                <Button
                  key={ability.id}
                  onClick={() => useAbility(ability.id)}
                  disabled={ability.cooldown > 0 || gameState.playerMana < 15}
                  className={`${getAbilityColor(ability)} relative h-16 flex-col text-xs`}
                >
                  <div className="font-bold">{ability.name}</div>
                  {ability.cooldown > 0 ? (
                    <div className="text-xs">Cooldown: {ability.cooldown}s</div>
                  ) : (
                    <div className="text-xs">
                      {ability.damage > 0 && `Damage: ${ability.damage}`}
                      {ability.healing > 0 && `Healing: ${ability.healing}`}
                    </div>
                  )}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Enemy Status */}
      <Card className="border-red-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Target className="h-5 w-5" />
            🎯 Enemy Forces (Cage System Defenders)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {enemies.map((enemy) => (
              <div key={enemy.id} className="p-4 border border-border/50 rounded-lg bg-red-900/10">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold">{enemy.name}</h4>
                  <Badge className={`${enemy.type === 'boss' ? 'bg-red-600' : enemy.type === 'elite' ? 'bg-orange-600' : 'bg-gray-600'} text-white`}>
                    {enemy.type.toUpperCase()}
                  </Badge>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Health:</span>
                    <span className="text-red-400">{enemy.health}/{enemy.maxHealth}</span>
                  </div>
                  <Progress value={(enemy.health / enemy.maxHealth) * 100} className="h-2" />
                  <div className="text-xs text-yellow-400">Reward: {enemy.reward} GAIA</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Game Engine Info */}
      <div className="text-center">
        <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 border border-purple-500/20 rounded-lg p-6">
          <h3 className="text-2xl font-bold text-purple-400 mb-4">🎮 UNREAL TOURNAMENT × WORLD OF WARCRAFT ENGINE</h3>
          <p className="text-muted-foreground mb-4">
            Ultra-performance gaming engine optimized for every platform. Experience the battle to free animals from cages 
            with stunning graphics, immersive gameplay, and real cryptocurrency rewards.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <div className="p-3 bg-green-900/20 rounded border border-green-500/20">
              <div className="text-sm font-bold text-green-400">🖥️ PC/Windows</div>
              <div className="text-xs text-muted-foreground">Ultra Settings</div>
            </div>
            <div className="p-3 bg-blue-900/20 rounded border border-blue-500/20">
              <div className="text-sm font-bold text-blue-400">📱 Mobile/Tablet</div>
              <div className="text-xs text-muted-foreground">Optimized</div>
            </div>
            <div className="p-3 bg-purple-900/20 rounded border border-purple-500/20">
              <div className="text-sm font-bold text-purple-400">🥽 VR Ready</div>
              <div className="text-xs text-muted-foreground">Full Immersion</div>
            </div>
            <div className="p-3 bg-yellow-900/20 rounded border border-yellow-500/20">
              <div className="text-sm font-bold text-yellow-400">🌐 Cross-Platform</div>
              <div className="text-xs text-muted-foreground">Play Anywhere</div>
            </div>
          </div>
          <p className="text-sm text-green-400 font-bold mt-4">
            🎵 "Seeds Will Form Into Music" - Every battle creates harmony and freedom! 🎵
          </p>
        </div>
      </div>
    </div>
  )
}
