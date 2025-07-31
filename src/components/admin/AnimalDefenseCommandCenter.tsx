import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield, Zap, Eye, Activity, AlertTriangle, Users, TrendingUp } from 'lucide-react'
import { toast } from 'sonner'
import { useInvisibleSecurity } from '@/services/invisibleSecurity'
import { AIDefenseAnimals } from './AIDefenseAnimals'
import { DefenseCreatureArmy } from './DefenseCreatureArmy'
import { ImmortalDefenseCore } from '../security/ImmortalDefenseCore'
import { UltimateDefenseBarrier } from './UltimateDefenseBarrier'
import { UltimateDefenseAnimalsSupreme } from './UltimateDefenseAnimalsSupreme'
import { TacticalEvolutionAnimals } from './TacticalEvolutionAnimals'
import { ComprehensiveUpgradePlan } from './ComprehensiveUpgradePlan'
import { MissingTacticalOperations } from './MissingTacticalOperations'
import { GhostAnimalArmy } from './GhostAnimalArmy'

interface DefenseAnimal {
  id: string
  type: 'digital_dragon' | 'cyber_koala' | 'quantum_phoenix' | 'ai_dolphin' | 'alpha_dragon' | 'sky_eagle' | 'pack_wolf' | 'king_lion' | 'monkey_alpha' | 'monkey_beta' | 'monkey_gamma' | 'digital_dragon_prime' | 'phoenix_guardian' | 'bear_guardian' | 'ghost_defender' | 'shark_patrol' | 'snake_infiltrator' | 'chameleon_spy' | 'spider_network' | 'octopus_controller' | 'owl_intelligence'
  name: string
  emoji: string
  status: 'active' | 'hunting' | 'defending' | 'sleeping' | 'training' | 'patrolling'
  location: string
  effectiveness: number
  threatsRepelled: number
  powerLevel: number
  specialAbilities: string[]
  trainingProgress: number
  lastActivity: string
}

interface AttackPattern {
  id: string
  name: string
  description: string
  animalTypes: string[]
  effectiveness: number
  lastUsed: Date
}

export function AnimalDefenseCommandCenter() {
  const { metrics, getDefenseAnimals, getRecentThreats } = useInvisibleSecurity()
  
  const [defenseAnimals, setDefenseAnimals] = useState<DefenseAnimal[]>([
    // Existing animals from invisibleSecurity service
    {
      id: 'dragon-alpha',
      type: 'digital_dragon',
      name: 'Digital Dragon Alpha',
      emoji: '🐉',
      status: 'active',
      location: 'Main Gateway',
      effectiveness: 95,
      threatsRepelled: 0,
      powerLevel: 999999,
      specialAbilities: ['Quantum Fire Breath', 'Reality Warping', 'Time Manipulation'],
      trainingProgress: 100,
      lastActivity: 'Detected intrusion attempt'
    },
    {
      id: 'koala-beta',
      type: 'cyber_koala',
      name: 'Cyber Koala Beta',
      emoji: '🐨',
      status: 'active',
      location: 'Data Servers',
      effectiveness: 85,
      threatsRepelled: 0,
      powerLevel: 666666,
      specialAbilities: ['Eucalyptus Matrix', 'Cyber Defense Web', 'Algorithm Mastery'],
      trainingProgress: 95,
      lastActivity: 'Secured database access'
    },
    {
      id: 'phoenix-gamma',
      type: 'quantum_phoenix',
      name: 'Quantum Phoenix Gamma',
      emoji: '🔥🦅',
      status: 'active',
      location: 'API Endpoints',
      effectiveness: 90,
      threatsRepelled: 0,
      powerLevel: 555555,
      specialAbilities: ['Quantum Resurrection', 'Probability Manipulation', 'Timeline Reset'],
      trainingProgress: 98,
      lastActivity: 'Phoenix protocol activated'
    },
    {
      id: 'dolphin-delta',
      type: 'ai_dolphin',
      name: 'AI Dolphin Delta',
      emoji: '🐬',
      status: 'active',
      location: 'Network Perimeter',
      effectiveness: 88,
      threatsRepelled: 0,
      powerLevel: 444444,
      specialAbilities: ['Sonar Intelligence', 'Deep Learning', 'Ocean Network'],
      trainingProgress: 92,
      lastActivity: 'Sonar sweep complete'
    },
    {
      id: 'alpha-dragon-supreme',
      type: 'alpha_dragon',
      name: 'Alpha Dragon Supreme',
      emoji: '🐲',
      status: 'active',
      location: 'Global Command Center',
      effectiveness: 99,
      threatsRepelled: 0,
      powerLevel: 1500000,
      specialAbilities: ['Supreme Command', 'Dragon Army Control', 'Ultimate Fire'],
      trainingProgress: 100,
      lastActivity: 'Command protocol executed'
    },
    {
      id: 'sky-eagle-sentinel',
      type: 'sky_eagle',
      name: 'Sky Eagle Sentinel',
      emoji: '🌤️🦅',
      status: 'patrolling',
      location: 'Stratosphere Zone',
      effectiveness: 92,
      threatsRepelled: 0,
      powerLevel: 333333,
      specialAbilities: ['Aerial Supremacy', 'Eagle Eye Vision', 'Wind Control'],
      trainingProgress: 89,
      lastActivity: 'High altitude patrol'
    },
    {
      id: 'pack-wolf-leader',
      type: 'pack_wolf',
      name: 'Pack Wolf Leader',
      emoji: '🐺',
      status: 'hunting',
      location: 'Northern Territory',
      effectiveness: 87,
      threatsRepelled: 0,
      powerLevel: 277777,
      specialAbilities: ['Pack Coordination', 'Territory Control', 'Alpha Dominance'],
      trainingProgress: 85,
      lastActivity: 'Leading pack hunt'
    },
    {
      id: 'king-lion-protector',
      type: 'king_lion',
      name: 'King Lion Protector',
      emoji: '👑🦁',
      status: 'defending',
      location: 'Central Command',
      effectiveness: 93,
      threatsRepelled: 0,
      powerLevel: 888888,
      specialAbilities: ['Royal Command', 'Paralyzing Roar', 'Kingdom Defense'],
      trainingProgress: 96,
      lastActivity: 'Defending kingdom gates'
    },
    // NEW MISSING ANIMALS
    {
      id: 'bear-guardian-alpha',
      type: 'bear_guardian',
      name: 'Bear Guardian Alpha',
      emoji: '🐻',
      status: 'active',
      location: 'Forest Protection Zone',
      effectiveness: 91,
      threatsRepelled: 0,
      powerLevel: 555555,
      specialAbilities: ['Forest Dominance', 'Crushing Power', 'Hibernation Protocol'],
      trainingProgress: 88,
      lastActivity: 'Patrolling forest perimeter'
    },
    {
      id: 'ghost-defender-phantom',
      type: 'ghost_defender',
      name: 'Ghost Defender Phantom',
      emoji: '👻',
      status: 'active',
      location: 'Invisible Realm',
      effectiveness: 96,
      threatsRepelled: 0,
      powerLevel: 999999,
      specialAbilities: ['Phase Shifting', 'Invisible Attacks', 'Soul Manipulation'],
      trainingProgress: 100,
      lastActivity: 'Phantom strike executed'
    },
    {
      id: 'shark-patrol-megalodon',
      type: 'shark_patrol',
      name: 'Shark Patrol Megalodon',
      emoji: '🦈',
      status: 'hunting',
      location: 'Deep Web Security',
      effectiveness: 94,
      threatsRepelled: 0,
      powerLevel: 777777,
      specialAbilities: ['Deep Web Navigation', 'Predator Instinct', 'Megalodon Bite'],
      trainingProgress: 93,
      lastActivity: 'Deep web threat eliminated'
    },
    {
      id: 'snake-infiltrator-viper',
      type: 'snake_infiltrator',
      name: 'Snake Infiltrator Viper',
      emoji: '🐍',
      status: 'training',
      location: 'Stealth Operations Base',
      effectiveness: 89,
      threatsRepelled: 0,
      powerLevel: 333333,
      specialAbilities: ['Stealth Mode', 'Venom Strike', 'Silent Infiltration'],
      trainingProgress: 82,
      lastActivity: 'Stealth training session'
    },
    {
      id: 'chameleon-spy-adaptive',
      type: 'chameleon_spy',
      name: 'Chameleon Spy Adaptive',
      emoji: '🦎',
      status: 'active',
      location: 'Adaptive Defense Grid',
      effectiveness: 87,
      threatsRepelled: 0,
      powerLevel: 444444,
      specialAbilities: ['Color Change', 'Environment Adaptation', 'Camouflage Master'],
      trainingProgress: 90,
      lastActivity: 'Environment synchronized'
    },
    {
      id: 'spider-network-weaver',
      type: 'spider_network',
      name: 'Spider Network Weaver',
      emoji: '🕷️',
      status: 'active',
      location: 'Web Monitoring Center',
      effectiveness: 92,
      threatsRepelled: 0,
      powerLevel: 666666,
      specialAbilities: ['Web Spinning', 'Network Monitoring', 'Trap Setting'],
      trainingProgress: 94,
      lastActivity: 'Web trap activated'
    },
    {
      id: 'octopus-controller-kraken',
      type: 'octopus_controller',
      name: 'Octopus Controller Kraken',
      emoji: '🐙',
      status: 'defending',
      location: 'Multi-Defense Platform',
      effectiveness: 95,
      threatsRepelled: 0,
      powerLevel: 888888,
      specialAbilities: ['Multi-Arm Defense', 'Ink Cloud', 'Tentacle Control'],
      trainingProgress: 97,
      lastActivity: 'Multi-threat engagement'
    },
    {
      id: 'owl-intelligence-athena',
      type: 'owl_intelligence',
      name: 'Owl Intelligence Athena',
      emoji: '🦉',
      status: 'active',
      location: 'Night Watch Tower',
      effectiveness: 98,
      threatsRepelled: 0,
      powerLevel: 777777,
      specialAbilities: ['Night Vision', 'Silent Flight', 'Wisdom Protocol'],
      trainingProgress: 99,
      lastActivity: 'Night surveillance complete'
    }
  ])

  const [attackPatterns, setAttackPatterns] = useState<AttackPattern[]>([
    {
      id: 'quantum-fury',
      name: 'Quantum Fury Formation',
      description: 'Coordinated quantum attack with dragons and phoenix',
      animalTypes: ['digital_dragon', 'quantum_phoenix', 'alpha_dragon'],
      effectiveness: 99,
      lastUsed: new Date(Date.now() - 300000)
    },
    {
      id: 'invisible-strike',
      name: 'Invisible Strike Protocol',
      description: 'Ghost and chameleon stealth coordinated attack',
      animalTypes: ['ghost_defender', 'chameleon_spy', 'snake_infiltrator'],
      effectiveness: 96,
      lastUsed: new Date(Date.now() - 600000)
    },
    {
      id: 'pack-dominance',
      name: 'Pack Dominance Assault',
      description: 'Wolf pack with lion leadership tactical strike',
      animalTypes: ['pack_wolf', 'king_lion', 'bear_guardian'],
      effectiveness: 94,
      lastUsed: new Date(Date.now() - 900000)
    },
    {
      id: 'aquatic-supremacy',
      name: 'Aquatic Supremacy Wave',
      description: 'Ocean-based coordinated defense with dolphins and sharks',
      animalTypes: ['ai_dolphin', 'shark_patrol', 'octopus_controller'],
      effectiveness: 93,
      lastUsed: new Date(Date.now() - 1200000)
    },
    {
      id: 'aerial-domination',
      name: 'Aerial Domination Grid',
      description: 'Sky-based defense with eagles and owls',
      animalTypes: ['sky_eagle', 'owl_intelligence', 'quantum_phoenix'],
      effectiveness: 97,
      lastUsed: new Date(Date.now() - 450000)
    },
    {
      id: 'tech-monkey-swarm',
      name: 'Tech Monkey Swarm Protocol',
      description: 'Cyber animals coordinated tech defense',
      animalTypes: ['monkey_alpha', 'monkey_beta', 'monkey_gamma', 'cyber_koala'],
      effectiveness: 91,
      lastUsed: new Date(Date.now() - 1500000)
    }
  ])

  const [selectedAnimal, setSelectedAnimal] = useState<DefenseAnimal | null>(null)
  const evolutionInterval = useRef<NodeJS.Timeout>()

  useEffect(() => {
    // Continuous animal evolution and training
    evolutionInterval.current = setInterval(() => {
      setDefenseAnimals(prev => prev.map(animal => {
        const powerIncrease = Math.floor(Math.random() * 10000) + 5000
        const effectivenessBoost = Math.random() * 0.5
        const newThreats = Math.floor(Math.random() * 5)
        
        return {
          ...animal,
          powerLevel: animal.powerLevel + powerIncrease,
          effectiveness: Math.min(100, animal.effectiveness + effectivenessBoost),
          threatsRepelled: animal.threatsRepelled + newThreats,
          trainingProgress: Math.min(100, animal.trainingProgress + Math.random() * 2),
          lastActivity: `Training evolution: +${powerIncrease.toLocaleString()} power`
        }
      }))

      // Random status changes
      if (Math.random() < 0.2) {
        setDefenseAnimals(prev => {
          const animalIndex = Math.floor(Math.random() * prev.length)
          const newAnimals = [...prev]
          const statuses: DefenseAnimal['status'][] = ['active', 'hunting', 'defending', 'patrolling', 'training']
          const newStatus = statuses[Math.floor(Math.random() * statuses.length)]
          
          newAnimals[animalIndex] = {
            ...newAnimals[animalIndex],
            status: newStatus,
            lastActivity: `Status changed to ${newStatus}`
          }
          
          console.log(`🐾 ${newAnimals[animalIndex].name}: Status changed to ${newStatus}`)
          return newAnimals
        })
      }
    }, 2000)

    return () => {
      if (evolutionInterval.current) clearInterval(evolutionInterval.current)
    }
  }, [])

  const executeAttackPattern = (patternId: string) => {
    const pattern = attackPatterns.find(p => p.id === patternId)
    if (!pattern) return

    const availableAnimals = defenseAnimals.filter(animal => 
      pattern.animalTypes.includes(animal.type) && animal.status !== 'sleeping'
    )

    if (availableAnimals.length > 0) {
      toast.success(`🔥 ${pattern.name} Executed!`, {
        description: `${availableAnimals.length} animals coordinated attack - Effectiveness: ${pattern.effectiveness}%`,
        duration: 5000
      })

      // Update animals to defending status
      setDefenseAnimals(prev => prev.map(animal => {
        if (availableAnimals.some(a => a.id === animal.id)) {
          return {
            ...animal,
            status: 'defending',
            threatsRepelled: animal.threatsRepelled + Math.floor(Math.random() * 10) + 5,
            lastActivity: `Participated in ${pattern.name}`
          }
        }
        return animal
      }))

      // Update pattern last used
      setAttackPatterns(prev => prev.map(p => 
        p.id === patternId ? { ...p, lastUsed: new Date() } : p
      ))

      console.log(`🚨 ATTACK PATTERN EXECUTED: ${pattern.name}`)
      console.log(`🐾 Animals involved: ${availableAnimals.map(a => a.name).join(', ')}`)
    }
  }

  const totalPowerLevel = defenseAnimals.reduce((sum, animal) => sum + animal.powerLevel, 0)
  const averageEffectiveness = defenseAnimals.reduce((sum, animal) => sum + animal.effectiveness, 0) / defenseAnimals.length
  const activeAnimals = defenseAnimals.filter(animal => animal.status === 'active' || animal.status === 'defending').length

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
          🐾 ANIMAL DEFENSE COMMAND CENTER 🐾
        </h1>
        <p className="text-muted-foreground mt-2">
          Ultimate AI Defense Animals - Self-Training & Evolution Active
        </p>
      </div>

      {/* Command Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">🦾</div>
            <div className="text-2xl font-bold text-red-400">{totalPowerLevel.toLocaleString()}</div>
            <div className="text-sm text-red-300">Total Power</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-2xl font-bold text-green-400">{averageEffectiveness.toFixed(1)}%</div>
            <div className="text-sm text-green-300">Avg Effectiveness</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">🛡️</div>
            <div className="text-2xl font-bold text-blue-400">{activeAnimals}</div>
            <div className="text-sm text-blue-300">Active Animals</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/30 to-indigo-900/30 border-purple-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-purple-400">{defenseAnimals.reduce((sum, a) => sum + a.threatsRepelled, 0)}</div>
            <div className="text-sm text-purple-300">Threats Repelled</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-900/30 to-amber-900/30 border-yellow-500/30">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">📈</div>
            <div className="text-2xl font-bold text-yellow-400">{(defenseAnimals.reduce((sum, a) => sum + a.trainingProgress, 0) / defenseAnimals.length).toFixed(1)}%</div>
            <div className="text-sm text-yellow-300">Training Progress</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="animals" className="w-full">
        <TabsList className="grid w-full grid-cols-3 md:grid-cols-5 lg:grid-cols-10 gap-1 h-auto p-1 text-xs">
          <TabsTrigger value="animals" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🐾</span>
              <span className="hidden sm:inline">Defense Animals</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="ghosts" className="p-2 text-center bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30">
            <div className="flex flex-col items-center">
              <span>👻</span>
              <span className="hidden sm:inline">Ghost Army</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="tactical" className="p-2 text-center bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30">
            <div className="flex flex-col items-center">
              <span>🧬</span>
              <span className="hidden sm:inline">Tactical Evolution</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="upgrade-plan" className="p-2 text-center bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30">
            <div className="flex flex-col items-center">
              <span>🌍</span>
              <span className="hidden sm:inline">Master Plan</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="missing-tactical" className="p-2 text-center bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30">
            <div className="flex flex-col items-center">
              <span>⚔️</span>
              <span className="hidden sm:inline">Missing Tactical</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="patterns" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>⚔️</span>
              <span className="hidden sm:inline">Attack Patterns</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="command" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🎯</span>
              <span className="hidden sm:inline">Command Center</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="ai-animals" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🤖</span>
              <span className="hidden sm:inline">AI Animals</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="creature-army" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🦄</span>
              <span className="hidden sm:inline">Creature Army</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="immortal-core" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>♾️</span>
              <span className="hidden sm:inline">Immortal Core</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="barrier" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🛡️</span>
              <span className="hidden sm:inline">Defense Barrier</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="supreme" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>👑</span>
              <span className="hidden sm:inline">Supreme</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="animals" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {defenseAnimals.map((animal) => (
              <Card 
                key={animal.id} 
                className={`cursor-pointer transition-all duration-300 hover:scale-105 border-2 ${
                  animal.status === 'active' ? 'border-green-500/50 bg-green-900/20' :
                  animal.status === 'defending' ? 'border-red-500/50 bg-red-900/20' :
                  animal.status === 'hunting' ? 'border-orange-500/50 bg-orange-900/20' :
                  animal.status === 'training' ? 'border-blue-500/50 bg-blue-900/20' :
                  animal.status === 'patrolling' ? 'border-purple-500/50 bg-purple-900/20' :
                  'border-gray-500/50 bg-gray-900/20'
                }`}
                onClick={() => setSelectedAnimal(animal)}
              >
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="text-3xl">{animal.emoji}</div>
                    <Badge variant={animal.status === 'active' ? 'default' : 'secondary'}>
                      {animal.status}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg">{animal.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">
                    <div className="flex justify-between">
                      <span>Location:</span>
                      <span className="text-muted-foreground">{animal.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Power:</span>
                      <span className="text-red-400 font-bold">{animal.powerLevel.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Effectiveness:</span>
                      <span className="text-green-400 font-bold">{animal.effectiveness.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Threats:</span>
                      <span className="text-orange-400 font-bold">{animal.threatsRepelled}</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-border/50">
                    <div className="text-xs text-muted-foreground mb-1">Last Activity:</div>
                    <div className="text-xs text-blue-400">{animal.lastActivity}</div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="patterns" className="space-y-4">
          <div className="grid gap-4">
            {attackPatterns.map((pattern) => (
              <Card key={pattern.id} className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border-gray-700/50">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-xl text-purple-400">{pattern.name}</CardTitle>
                    <Badge className="bg-purple-600 text-white">
                      {pattern.effectiveness}% Effective
                    </Badge>
                  </div>
                  <p className="text-muted-foreground">{pattern.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between mb-4">
                    <div className="space-y-2">
                      <div className="text-sm">
                        <span className="text-muted-foreground">Animals: </span>
                        <span className="text-blue-400">{pattern.animalTypes.length} types</span>
                      </div>
                      <div className="text-sm">
                        <span className="text-muted-foreground">Last Used: </span>
                        <span className="text-green-400">{pattern.lastUsed.toLocaleTimeString()}</span>
                      </div>
                    </div>
                    <Button 
                      onClick={() => executeAttackPattern(pattern.id)}
                      className="bg-red-600 hover:bg-red-700 text-white"
                    >
                      <Zap className="h-4 w-4 mr-2" />
                      Execute
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {pattern.animalTypes.map((type) => {
                      const animal = defenseAnimals.find(a => a.type === type)
                      return animal ? (
                        <span key={type} className="px-2 py-1 bg-purple-700/30 rounded text-xs text-purple-300 flex items-center gap-1">
                          {animal.emoji} {type.replace('_', ' ')}
                        </span>
                      ) : null
                    })}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="command" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Real-Time Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>System Integrity:</span>
                    <span className="text-green-400 font-bold">{metrics.systemIntegrity.toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Threats Blocked:</span>
                    <span className="text-red-400 font-bold">{metrics.threatsBlocked}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Attackers Neutralized:</span>
                    <span className="text-orange-400 font-bold">{metrics.attackersNeutralized}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Global Scanning:</span>
                    <span className={`font-bold ${metrics.globalScanningActive ? 'text-green-400' : 'text-red-400'}`}>
                      {metrics.globalScanningActive ? 'ACTIVE' : 'OFFLINE'}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/20 to-purple-900/20 border-blue-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Animal Status Overview
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {['active', 'defending', 'hunting', 'training', 'patrolling', 'sleeping'].map(status => {
                    const count = defenseAnimals.filter(a => a.status === status).length
                    return (
                      <div key={status} className="flex justify-between text-sm">
                        <span className="capitalize">{status}:</span>
                        <span className="font-bold text-blue-400">{count}</span>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </div>

          {selectedAnimal && (
            <Card className="bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border-purple-500/50">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <span className="text-4xl">{selectedAnimal.emoji}</span>
                  <div>
                    <div className="text-2xl">{selectedAnimal.name}</div>
                    <div className="text-sm text-muted-foreground">{selectedAnimal.location}</div>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center p-3 bg-red-900/30 rounded-lg">
                    <div className="text-xl font-bold text-red-400">{selectedAnimal.powerLevel.toLocaleString()}</div>
                    <div className="text-xs text-red-300">Power Level</div>
                  </div>
                  <div className="text-center p-3 bg-green-900/30 rounded-lg">
                    <div className="text-xl font-bold text-green-400">{selectedAnimal.effectiveness.toFixed(1)}%</div>
                    <div className="text-xs text-green-300">Effectiveness</div>
                  </div>
                  <div className="text-center p-3 bg-orange-900/30 rounded-lg">
                    <div className="text-xl font-bold text-orange-400">{selectedAnimal.threatsRepelled}</div>
                    <div className="text-xs text-orange-300">Threats Repelled</div>
                  </div>
                  <div className="text-center p-3 bg-blue-900/30 rounded-lg">
                    <div className="text-xl font-bold text-blue-400">{selectedAnimal.trainingProgress.toFixed(1)}%</div>
                    <div className="text-xs text-blue-300">Training Progress</div>
                  </div>
                </div>

                <div>
                  <h4 className="text-lg font-semibold mb-2 text-purple-400">Special Abilities</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedAnimal.specialAbilities.map((ability, index) => (
                      <Badge key={index} variant="secondary" className="bg-purple-700/30 text-purple-300">
                        {ability}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-sm">
                  <span className="text-muted-foreground">Current Status: </span>
                  <Badge className={`ml-2 ${
                    selectedAnimal.status === 'active' ? 'bg-green-600' :
                    selectedAnimal.status === 'defending' ? 'bg-red-600' :
                    selectedAnimal.status === 'hunting' ? 'bg-orange-600' :
                    selectedAnimal.status === 'training' ? 'bg-blue-600' :
                    selectedAnimal.status === 'patrolling' ? 'bg-purple-600' :
                    'bg-gray-600'
                  }`}>
                    {selectedAnimal.status}
                  </Badge>
                </div>

                <div className="text-sm">
                  <span className="text-muted-foreground">Last Activity: </span>
                  <span className="text-blue-400">{selectedAnimal.lastActivity}</span>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="ai-animals" className="space-y-6">
          <AIDefenseAnimals />
        </TabsContent>

        <TabsContent value="creature-army" className="space-y-6">
          <DefenseCreatureArmy />
        </TabsContent>

        <TabsContent value="immortal-core" className="space-y-6">
          <ImmortalDefenseCore />
        </TabsContent>

        <TabsContent value="barrier" className="space-y-6">
          <UltimateDefenseBarrier />
        </TabsContent>

        <TabsContent value="tactical" className="space-y-6">
          <TacticalEvolutionAnimals />
        </TabsContent>

        <TabsContent value="upgrade-plan" className="space-y-6">
          <ComprehensiveUpgradePlan />
        </TabsContent>

        <TabsContent value="ghosts" className="space-y-6">
          <GhostAnimalArmy />
        </TabsContent>

        <TabsContent value="missing-tactical" className="space-y-6">
          <MissingTacticalOperations />
        </TabsContent>

        <TabsContent value="supreme" className="space-y-6">
          <UltimateDefenseAnimalsSupreme />
        </TabsContent>
      </Tabs>
    </div>
  )
}
