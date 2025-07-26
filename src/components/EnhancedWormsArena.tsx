
import React, { useState, useEffect, useRef } from 'react'
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
  Zap,
  Settings,
  Map,
  User,
  Package
} from 'lucide-react'
import { toast } from 'sonner'

interface WormCharacter {
  id: string
  name: string
  health: number
  maxHealth: number
  position: { x: number, y: number }
  gaiaValue: number
  team: 'player' | 'enemy'
  isActive: boolean
  character: {
    name: string
    sprite: string
    specialAbility: string
    stats: {
      attack: number
      defense: number
      speed: number
      luck: number
    }
  }
  inventory: string[]
}

interface GameMap {
  id: string
  name: string
  theme: string
  background: string
  terrain: string
  special: string
  difficulty: number
}

interface WeaponItem {
  id: string
  name: string
  damage: number
  cost: number
  icon: React.ComponentType<{ className?: string; size?: number | string }>
  description: string
  special: string
}

export function EnhancedWormsArena() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [gameState, setGameState] = useState<'setup' | 'character-select' | 'map-select' | 'playing' | 'finished'>('setup')
  const [currentPlayer, setCurrentPlayer] = useState<'player' | 'enemy'>('player')
  const [selectedWeapon, setSelectedWeapon] = useState('bazooka')
  const [selectedCharacter, setSelectedCharacter] = useState<string>('')
  const [selectedMap, setSelectedMap] = useState<string>('')
  const [windStrength, setWindStrength] = useState(0)
  const [turnTimer, setTurnTimer] = useState(45)

  const [worms, setWorms] = useState<WormCharacter[]>([])

  const availableCharacters = [
    {
      id: 'gaia-warrior',
      name: 'Gaia Warrior',
      sprite: '🌍',
      specialAbility: 'Earth Shake',
      stats: { attack: 85, defense: 90, speed: 70, luck: 80 }
    },
    {
      id: 'cosmic-knight',
      name: 'Cosmic Knight',
      sprite: '🌌',
      specialAbility: 'Star Strike',
      stats: { attack: 90, defense: 85, speed: 75, luck: 85 }
    },
    {
      id: 'quantum-mage',
      name: 'Quantum Mage',
      sprite: '⚡',
      specialAbility: 'Reality Warp',
      stats: { attack: 95, defense: 70, speed: 85, luck: 90 }
    },
    {
      id: 'crystal-guardian',
      name: 'Crystal Guardian',
      sprite: '💎',
      specialAbility: 'Crystal Shield',
      stats: { attack: 75, defense: 100, speed: 60, luck: 75 }
    },
    {
      id: 'space-ranger',
      name: 'Space Ranger',
      sprite: '🚀',
      specialAbility: 'Rocket Boost',
      stats: { attack: 80, defense: 75, speed: 100, luck: 95 }
    },
    {
      id: 'nebula-sniper',
      name: 'Nebula Sniper',
      sprite: '🌟',
      specialAbility: 'Precision Shot',
      stats: { attack: 100, defense: 65, speed: 90, luck: 85 }
    }
  ]

  const spaceyMaps: GameMap[] = [
    {
      id: 'asteroid-field',
      name: 'Asteroid Mining Field',
      theme: 'Space',
      background: '🌌 Deep space with floating asteroids',
      terrain: 'Rocky asteroids with low gravity',
      special: 'Floating platforms, meteor showers',
      difficulty: 3
    },
    {
      id: 'lunar-base',
      name: 'Lunar Research Base',
      theme: 'Moon',
      background: '🌙 Moon surface with Earth in background',
      terrain: 'Crater-filled surface with metal structures',
      special: 'Low gravity, energy shields',
      difficulty: 4
    },
    {
      id: 'mars-colony',
      name: 'Mars Colony Outpost',
      theme: 'Mars',
      background: '🔴 Red planet surface with dust storms',
      terrain: 'Red rocky terrain with dome structures',
      special: 'Dust storms, underground tunnels',
      difficulty: 5
    },
    {
      id: 'space-station',
      name: 'Orbital Space Station',
      theme: 'Station',
      background: '🛰️ Massive space station with solar panels',
      terrain: 'Metal platforms and corridors',
      special: 'Zero gravity zones, energy barriers',
      difficulty: 6
    },
    {
      id: 'nebula-cloud',
      name: 'Cosmic Nebula Cloud',
      theme: 'Nebula',
      background: '🌈 Colorful gas clouds and stars',
      terrain: 'Energy platforms floating in space',
      special: 'Teleportation rifts, energy storms',
      difficulty: 7
    },
    {
      id: 'black-hole',
      name: 'Black Hole Event Horizon',
      theme: 'Black Hole',
      background: '⚫ Massive black hole warping space-time',
      terrain: 'Warped space platforms',
      special: 'Gravity distortion, time dilation',
      difficulty: 10
    }
  ]

  const enhancedWeapons: WeaponItem[] = [
    { 
      id: 'plasma-bazooka', 
      name: 'Plasma Bazooka', 
      damage: 55, 
      cost: 0, 
      icon: "💥",
      description: 'Standard plasma-powered rocket launcher',
      special: 'Area explosion'
    },
    { 
      id: 'quantum-grenade', 
      name: 'Quantum Grenade', 
      damage: 40, 
      cost: 8, 
      icon: "⚡",
      description: 'Grenade that phases through terrain',
      special: 'Ignores cover'
    },
    { 
      id: 'laser-shotgun', 
      name: 'Laser Shotgun', 
      damage: 35, 
      cost: 5, 
      icon: "🎯",
      description: 'Multi-beam laser weapon',
      special: 'Multiple projectiles'
    },
    { 
      id: 'meteor-strike', 
      name: 'Meteor Strike', 
      damage: 80, 
      cost: 20, 
      icon: "☄️",
      description: 'Calls down a meteor from space',
      special: 'Massive area damage'
    },
    { 
      id: 'gravity-bomb', 
      name: 'Gravity Bomb', 
      damage: 60, 
      cost: 15, 
      icon: "🌌",
      description: 'Creates a gravity well that pulls enemies',
      special: 'Pulls enemies together'
    },
    { 
      id: 'teleport-strike', 
      name: 'Teleport Strike', 
      damage: 45, 
      cost: 12, 
      icon: "🌀",
      description: 'Teleports behind enemy before attacking',
      special: 'Bypasses defenses'
    }
  ]

  useEffect(() => {
    if (gameState === 'playing') {
      const timer = setInterval(() => {
        setTurnTimer(prev => {
          if (prev <= 1) {
            switchTurn()
            return 45
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [gameState, currentPlayer])

  useEffect(() => {
    const windInterval = setInterval(() => {
      setWindStrength(Math.floor(Math.random() * 21) - 10)
    }, 15000)

    return () => clearInterval(windInterval)
  }, [])

  const initializeWorms = () => {
    const selectedChar = availableCharacters.find(c => c.id === selectedCharacter)
    if (!selectedChar) return

    const newWorms: WormCharacter[] = [
      {
        id: '1',
        name: `${selectedChar.name} Alpha`,
        health: 100,
        maxHealth: 100,
        position: { x: 100, y: 300 },
        gaiaValue: 50,
        team: 'player',
        isActive: true,
        character: selectedChar,
        inventory: ['plasma-bazooka', 'quantum-grenade']
      },
      {
        id: '2',
        name: `${selectedChar.name} Beta`,
        health: 100,
        maxHealth: 100,
        position: { x: 200, y: 300 },
        gaiaValue: 50,
        team: 'player',
        isActive: false,
        character: selectedChar,
        inventory: ['plasma-bazooka', 'laser-shotgun']
      },
      {
        id: '3',
        name: 'Alien Invader 1',
        health: 120,
        maxHealth: 120,
        position: { x: 600, y: 300 },
        gaiaValue: 75,
        team: 'enemy',
        isActive: false,
        character: {
          name: 'Alien Warrior',
          sprite: '👽',
          specialAbility: 'Mind Control',
          stats: { attack: 85, defense: 80, speed: 75, luck: 70 }
        },
        inventory: ['plasma-bazooka', 'gravity-bomb']
      },
      {
        id: '4',
        name: 'Alien Invader 2',
        health: 110,
        maxHealth: 110,
        position: { x: 700, y: 300 },
        gaiaValue: 65,
        team: 'enemy',
        isActive: false,
        character: {
          name: 'Alien Scout',
          sprite: '🛸',
          specialAbility: 'Stealth Mode',
          stats: { attack: 75, defense: 70, speed: 95, luck: 80 }
        },
        inventory: ['plasma-bazooka', 'teleport-strike']
      }
    ]
    
    setWorms(newWorms)
  }

  const startCharacterSelect = () => {
    setGameState('character-select')
  }

  const selectCharacter = (characterId: string) => {
    setSelectedCharacter(characterId)
    setGameState('map-select')
  }

  const selectMap = (mapId: string) => {
    setSelectedMap(mapId)
    initializeWorms()
    setGameState('playing')
    toast.success('🚀 Space Worms Battle Started!', {
      description: `Fighting on ${spaceyMaps.find(m => m.id === mapId)?.name}`,
      duration: 4000
    })
  }

  const switchTurn = () => {
    setCurrentPlayer(prev => prev === 'player' ? 'enemy' : 'player')
    setTurnTimer(45)
  }

  const fireWeapon = () => {
    const weapon = enhancedWeapons.find(w => w.id === selectedWeapon)
    if (!weapon) return

    const enemyWorms = worms.filter(w => w.team !== currentPlayer)
    if (enemyWorms.length > 0) {
      const targetWorm = enemyWorms[Math.floor(Math.random() * enemyWorms.length)]
      const baseDamage = weapon.damage
      const criticalHit = Math.random() < 0.2 // 20% crit chance
      const damage = criticalHit ? baseDamage * 1.5 : baseDamage + Math.floor(Math.random() * 20) - 10

      setWorms(prev => prev.map(worm => {
        if (worm.id === targetWorm.id) {
          const newHealth = Math.max(0, worm.health - damage)
          return { ...worm, health: newHealth }
        }
        return worm
      }))

      toast.success(`${criticalHit ? '💥 CRITICAL HIT!' : '🎯 Hit!'} ${Math.floor(damage)} damage!`, {
        description: `${targetWorm.name} took ${Math.floor(damage)} damage with ${weapon.name}!`,
        duration: 3000
      })

      if (targetWorm.health - damage <= 0) {
        toast.success('🏆 Enemy Worm Defeated!', {
          description: `Earned ${targetWorm.gaiaValue} GAIA tokens!`,
          duration: 4000
        })
      }
    }

    switchTurn()
  }

  const getWormsByTeam = (team: 'player' | 'enemy') => {
    return worms.filter(w => w.team === team && w.health > 0)
  }

  const selectedMapData = spaceyMaps.find(m => m.id === selectedMap)

  return (
    <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-2 border-cyan-500/50">
      <CardHeader>
        <CardTitle className="text-cyan-400 flex items-center gap-2">
          <Target className="h-6 w-6" />
          🚀 ENHANCED SPACE WORMS ARENA - GAIA WARFARE
        </CardTitle>
        <div className="flex justify-between items-center">
          <p className="text-muted-foreground">
            Enhanced Worms with character selection, space maps, and advanced weapons
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Wind className="h-4 w-4 text-cyan-400" />
              <span className="text-cyan-400">Space Wind: {windStrength > 0 ? '+' : ''}{windStrength}</span>
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
        {/* Game Setup */}
        {gameState === 'setup' && (
          <div className="text-center py-12">
            <div className="text-8xl mb-6">🚀</div>
            <div className="text-3xl font-bold text-cyan-400 mb-4">SPACE WORMS ARENA</div>
            <div className="text-lg text-muted-foreground mb-8">
              Enhanced gameplay with character selection, space maps, and cosmic weapons
            </div>
            <Button 
              onClick={startCharacterSelect}
              className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-lg px-8 py-3"
            >
              <User className="h-5 w-5 mr-2" />
              START SPACE BATTLE
            </Button>
          </div>
        )}

        {/* Character Selection */}
        {gameState === 'character-select' && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-cyan-400 mb-2">Choose Your Space Warrior</h3>
              <p className="text-muted-foreground">Select a character with unique abilities and stats</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {availableCharacters.map((char) => (
                <Card key={char.id} className="border-cyan-500/30 hover:border-cyan-400 cursor-pointer hover:scale-105 transition-all"
                      onClick={() => selectCharacter(char.id)}>
                  <CardContent className="p-4 text-center space-y-3">
                    <div className="text-6xl">{char.sprite}</div>
                    <h4 className="font-bold text-white">{char.name}</h4>
                    <p className="text-sm text-cyan-400">{char.specialAbility}</p>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>Attack: <span className="text-red-400">{char.stats.attack}</span></div>
                      <div>Defense: <span className="text-blue-400">{char.stats.defense}</span></div>
                      <div>Speed: <span className="text-green-400">{char.stats.speed}</span></div>
                      <div>Luck: <span className="text-yellow-400">{char.stats.luck}</span></div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Map Selection */}
        {gameState === 'map-select' && (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-cyan-400 mb-2">Choose Your Battlefield</h3>
              <p className="text-muted-foreground">Select a space environment with unique challenges</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {spaceyMaps.map((map) => (
                <Card key={map.id} className="border-purple-500/30 hover:border-purple-400 cursor-pointer hover:scale-105 transition-all"
                      onClick={() => selectMap(map.id)}>
                  <CardContent className="p-4 space-y-3">
                    <div className="flex justify-between items-center">
                      <h4 className="font-bold text-white">{map.name}</h4>
                      <Badge className="bg-purple-600">Lv.{map.difficulty}</Badge>
                    </div>
                    <p className="text-sm text-purple-400">{map.theme}</p>
                    <p className="text-xs text-muted-foreground">{map.background}</p>
                    <p className="text-xs text-cyan-400">{map.special}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Game Canvas */}
        {gameState === 'playing' && (
          <>
            <div className="relative bg-gradient-to-b from-purple-900/20 to-blue-900/20 border border-cyan-500/30 rounded-lg overflow-hidden">
              <canvas 
                ref={canvasRef}
                width={800}
                height={400}
                className="w-full h-64"
                style={{
                  background: selectedMapData?.theme === 'Space' ? 
                    'linear-gradient(to bottom, #0f0f0f, #1a1a2e)' :
                    selectedMapData?.theme === 'Mars' ?
                    'linear-gradient(to bottom, #8B0000, #CD853F)' :
                    'linear-gradient(to bottom, #191970, #000080)'
                }}
              />
              
              {/* Map Info Overlay */}
              <div className="absolute top-2 left-2 bg-black/70 rounded px-2 py-1">
                <div className="text-xs text-cyan-400">{selectedMapData?.name}</div>
                <div className="text-xs text-muted-foreground">{selectedMapData?.special}</div>
              </div>

              {/* Worm Health Bars */}
              <div className="absolute top-4 left-4 right-4">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <div className="text-xs text-green-400 mb-2">YOUR SPACE WORMS</div>
                    {getWormsByTeam('player').map(worm => (
                      <div key={worm.id} className="mb-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-green-400 flex items-center gap-1">
                            {worm.character.sprite} {worm.name}
                          </span>
                          <span className="text-yellow-400">{worm.gaiaValue} GAIA</span>
                        </div>
                        <Progress value={(worm.health / worm.maxHealth) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="text-xs text-red-400 mb-2 text-right">ALIEN INVADERS</div>
                    {getWormsByTeam('enemy').map(worm => (
                      <div key={worm.id} className="mb-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-yellow-400">{worm.gaiaValue} GAIA</span>
                          <span className="text-red-400 flex items-center gap-1">
                            {worm.character.sprite} {worm.name}
                          </span>
                        </div>
                        <Progress value={(worm.health / worm.maxHealth) * 100} className="h-2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Weapon Selection */}
            {currentPlayer === 'player' && (
              <div className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border border-cyan-500/30 rounded-lg p-4">
                <h4 className="text-cyan-400 font-bold mb-3 flex items-center gap-2">
                  <Package className="h-5 w-5" />
                  🚀 SPACE ARSENAL
                </h4>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {enhancedWeapons.map(weapon => (
                    <Button
                      key={weapon.id}
                      onClick={() => setSelectedWeapon(weapon.id)}
                      variant={selectedWeapon === weapon.id ? "default" : "outline"}
                      className={`flex flex-col gap-2 h-20 ${
                        selectedWeapon === weapon.id 
                          ? 'bg-gradient-to-r from-cyan-600 to-purple-600' 
                          : 'border-cyan-500/30'
                      }`}
                    >
                      {typeof weapon.icon === 'string' ? (
                        <span className="text-2xl">{weapon.icon}</span>
                      ) : (
                        weapon.icon
                      )}
                      <div className="text-xs text-center">
                        <div>{weapon.name}</div>
                        <div className="text-red-400">{weapon.damage} DMG</div>
                        <div className="text-yellow-400">{weapon.cost} Cost</div>
                      </div>
                    </Button>
                  ))}
                </div>
                
                {selectedWeapon && (
                  <div className="mt-4 p-3 bg-black/30 rounded">
                    <div className="text-sm text-cyan-400 mb-1">
                      {enhancedWeapons.find(w => w.id === selectedWeapon)?.description}
                    </div>
                    <div className="text-xs text-purple-400">
                      Special: {enhancedWeapons.find(w => w.id === selectedWeapon)?.special}
                    </div>
                  </div>
                )}
                
                <div className="flex justify-center mt-4">
                  <Button 
                    onClick={fireWeapon}
                    className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
                  >
                    <Crosshair className="h-4 w-4 mr-2" />
                    🎯 FIRE SPACE WEAPON
                  </Button>
                </div>
              </div>
            )}

            {/* Enhanced Game Stats */}
            <div className="grid grid-cols-4 gap-4 text-center">
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
                <div className="text-xs text-red-300">Aliens Left</div>
              </div>
              <div className="p-3 bg-cyan-900/30 rounded border border-cyan-500/20">
                <div className="text-lg font-bold text-cyan-400">{selectedMapData?.difficulty || 0}</div>
                <div className="text-xs text-cyan-300">Map Level</div>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  )
}
