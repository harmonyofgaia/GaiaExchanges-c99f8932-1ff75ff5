
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Target, 
  Bomb, 
  Wind, 
  Users, 
  Trophy,
  Crosshair,
  Flame,
  Zap
} from 'lucide-react'
import { toast } from 'sonner'

interface Worm {
  id: string
  name: string
  health: number
  maxHealth: number
  position: { x: number, y: number }
  gaiaValue: number
  team: 'player' | 'enemy'
  isActive: boolean
}

export function WormsGameArena() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameState, setGameState] = useState<'waiting' | 'playing' | 'finished'>('waiting')
  const [currentPlayer, setCurrentPlayer] = useState<'player' | 'enemy'>('player')
  const [selectedWeapon, setSelectedWeapon] = useState('bazooka')
  const [windStrength, setWindStrength] = useState(0)
  const [turnTimer, setTurnTimer] = useState(30)

  const [worms, setWorms] = useState<Worm[]>([
    {
      id: '1',
      name: 'GaiaWorm Alpha',
      health: 100,
      maxHealth: 100,
      position: { x: 100, y: 300 },
      gaiaValue: 25,
      team: 'player',
      isActive: true
    },
    {
      id: '2',
      name: 'GaiaWorm Beta',
      health: 100,
      maxHealth: 100,
      position: { x: 150, y: 300 },
      gaiaValue: 25,
      team: 'player',
      isActive: false
    },
    {
      id: '3',
      name: 'Enemy Worm 1',
      health: 100,
      maxHealth: 100,
      position: { x: 600, y: 300 },
      gaiaValue: 30,
      team: 'enemy',
      isActive: false
    },
    {
      id: '4',
      name: 'Enemy Worm 2',
      health: 100,
      maxHealth: 100,
      position: { x: 650, y: 300 },
      gaiaValue: 35,
      team: 'enemy',
      isActive: false
    }
  ])

  const weapons = [
    { id: 'bazooka', name: 'Bazooka', damage: 45, cost: 0, icon: <Bomb className="h-4 w-4" /> },
    { id: 'grenade', name: 'Grenade', damage: 30, cost: 5, icon: <Bomb className="h-4 w-4" /> },
    { id: 'shotgun', name: 'Shotgun', damage: 25, cost: 3, icon: <Target className="h-4 w-4" /> },
    { id: 'airstrike', name: 'Air Strike', damage: 60, cost: 15, icon: <Flame className="h-4 w-4" /> }
  ]

  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => {
        setTurnTimer(prev => {
          if (prev <= 1) {
            switchTurn()
            return 30
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [gameState, currentPlayer])

  useEffect(() => {
    // Generate random wind strength
    const windInterval = setInterval(() => {
      setWindStrength(Math.floor(Math.random() * 21) - 10) // -10 to +10
    }, 10000)

    return () => clearInterval(windInterval)
  }, [])

  const startGame = () => {
    setGameState('playing')
    setCurrentPlayer('player')
    setTurnTimer(30)
    toast.success('🐛 Worms Battle Started!', {
      description: 'Destroy enemy worms and collect their GAIA values!',
      duration: 3000
    })
  }

  const switchTurn = () => {
    setCurrentPlayer(prev => prev === 'player' ? 'enemy' : 'player')
    setTurnTimer(30)
  }

  const fireWeapon = () => {
    const weapon = weapons.find(w => w.id === selectedWeapon)
    if (!weapon) return

    // Simulate attack
    const enemyWorms = worms.filter(w => w.team !== currentPlayer)
    if (enemyWorms.length > 0) {
      const targetWorm = enemyWorms[Math.floor(Math.random() * enemyWorms.length)]
      const damage = weapon.damage + Math.floor(Math.random() * 20) - 10

      setWorms(prev => prev.map(worm => {
        if (worm.id === targetWorm.id) {
          const newHealth = Math.max(0, worm.health - damage)
          return { ...worm, health: newHealth }
        }
        return worm
      }))

      toast.success(`💥 Hit! ${damage} damage dealt!`, {
        description: `${targetWorm.name} took ${damage} damage!`,
        duration: 2000
      })

      // Check if worm is defeated
      if (targetWorm.health - damage <= 0) {
        toast.success(`🏆 Worm Defeated!`, {
          description: `Earned ${targetWorm.gaiaValue} GAIA tokens!`,
          duration: 3000
        })
      }
    }

    switchTurn()
  }

  const getWormsByTeam = (team: 'player' | 'enemy') => {
    return worms.filter(w => w.team === team && w.health > 0)
  }

  return (
    <Card className="bg-gradient-to-br from-brown-900/30 to-yellow-900/30 border-2 border-yellow-500/50">
      <CardHeader>
        <CardTitle className="text-yellow-400 flex items-center gap-2">
          <Target className="h-6 w-6" />
          🐛 WORMS BATTLEFIELD - GAIA TOKEN WARFARE
        </CardTitle>
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">
            Classic Worms gameplay with GAIA token rewards for defeated worms
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-cyan-400" />
              <span className="text-cyan-400">Wind: {windStrength > 0 ? '+' : ''}{windStrength}</span>
            </div>
            {gameState === 'playing' && (
              <div className="flex items-center gap-2">
                <Badge className={currentPlayer === 'player' ? 'bg-green-600' : 'bg-red-600'}>
                  {currentPlayer === 'player' ? 'YOUR TURN' : 'ENEMY TURN'}
                </Badge>
                <span className="text-yellow-400 font-bold">{turnTimer}s</span>
              </div>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Game Canvas */}
        <div className="relative bg-gradient-to-b from-sky-400/20 to-green-600/20 border border-yellow-500/30 rounded-lg overflow-hidden">
          <canvas 
            ref={canvasRef}
            width={800}
            height={400}
            className="w-full h-64 bg-gradient-to-b from-blue-800/20 to-green-800/20"
          />
          
          {/* Game Overlay */}
          <div className="absolute inset-0 flex items-center justify-center">
            {gameState === 'waiting' && (
              <div className="text-center">
                <div className="text-6xl mb-4">🐛</div>
                <div className="text-2xl font-bold text-yellow-400 mb-4">WORMS ARENA READY</div>
                <div className="text-lg text-muted-foreground mb-4">
                  Fight against enemy worms and collect their GAIA values!
                </div>
                <Button 
                  onClick={startGame}
                  className="bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                >
                  <Target className="h-4 w-4 mr-2" />
                  START WORMS BATTLE
                </Button>
              </div>
            )}
          </div>

          {/* Worm Health Bars */}
          {gameState === 'playing' && (
            <div className="absolute top-4 left-4 right-4">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <div className="text-xs text-green-400 mb-2">YOUR WORMS</div>
                  {getWormsByTeam('player').map(worm => (
                    <div key={worm.id} className="mb-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-green-400">{worm.name}</span>
                        <span className="text-yellow-400">{worm.gaiaValue} GAIA</span>
                      </div>
                      <Progress value={(worm.health / worm.maxHealth) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
                <div>
                  <div className="text-xs text-red-400 mb-2 text-right">ENEMY WORMS</div>
                  {getWormsByTeam('enemy').map(worm => (
                    <div key={worm.id} className="mb-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-yellow-400">{worm.gaiaValue} GAIA</span>
                        <span className="text-red-400">{worm.name}</span>
                      </div>
                      <Progress value={(worm.health / worm.maxHealth) * 100} className="h-2" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Weapon Selection */}
        {gameState === 'playing' && currentPlayer === 'player' && (
          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border border-yellow-500/30 rounded-lg p-4">
            <h4 className="text-yellow-400 font-bold mb-3">🔫 SELECT WEAPON</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {weapons.map(weapon => (
                <Button
                  key={weapon.id}
                  onClick={() => setSelectedWeapon(weapon.id)}
                  variant={selectedWeapon === weapon.id ? "default" : "outline"}
                  className={`flex flex-col gap-2 h-16 ${
                    selectedWeapon === weapon.id 
                      ? 'bg-gradient-to-r from-yellow-600 to-orange-600' 
                      : 'border-yellow-500/30'
                  }`}
                >
                  {weapon.icon}
                  <div className="text-xs">
                    <div>{weapon.name}</div>
                    <div className="text-red-400">{weapon.damage} DMG</div>
                  </div>
                </Button>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <Button 
                onClick={fireWeapon}
                className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
              >
                <Crosshair className="h-4 w-4 mr-2" />
                🎯 FIRE WEAPON
              </Button>
            </div>
          </div>
        )}

        {/* Game Stats */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="p-3 bg-green-900/30 rounded border border-green-500/20">
            <div className="text-lg font-bold text-green-400">{getWormsByTeam('player').length}</div>
            <div className="text-xs text-green-300">Your Worms</div>
          </div>
          <div className="p-3 bg-yellow-900/30 rounded border border-yellow-500/20">
            <div className="text-lg font-bold text-yellow-400">
              {worms.filter(w => w.health <= 0).reduce((sum, w) => sum + w.gaiaValue, 0)}
            </div>
            <div className="text-xs text-yellow-300">GAIA Earned</div>
          </div>
          <div className="p-3 bg-red-900/30 rounded border border-red-500/20">
            <div className="text-lg font-bold text-red-400">{getWormsByTeam('enemy').length}</div>
            <div className="text-xs text-red-300">Enemy Worms</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
