import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { Zap, Brain, Cpu, Dna, Target, Shield, Flame, Star } from 'lucide-react'
import { toast } from 'sonner'

interface TacticalAnimal {
  id: string
  name: string
  type: 'neural_predator' | 'quantum_hunter' | 'cosmic_guardian' | 'time_warden' | 'reality_shifter' | 'dimensional_scout' | 'cyber_assassin' | 'void_sentinel' | 'plasma_beast' | 'nano_swarm_king'
  emoji: string
  powerClass: 'OMEGA' | 'ALPHA_PLUS' | 'UNIVERSE' | 'MULTIVERSE' | 'INFINITE'
  currentPower: number
  maxPower: number
  evolutionStage: number
  maxEvolutionStage: number
  specializations: string[]
  tacticalAbilities: {
    name: string
    description: string
    cooldown: number
    power: number
    lastUsed?: Date
  }[]
  selfTrainingModules: {
    module: string
    progress: number
    efficiency: number
  }[]
  missionCount: number
  successRate: number
  lastMission: string
  status: 'training' | 'active' | 'evolving' | 'mission' | 'dormant' | 'ascending'
  location: string
}

interface EvolutionProtocol {
  id: string
  name: string
  description: string
  targetAnimals: string[]
  powerMultiplier: number
  requirements: string[]
  cooldown: number
  lastActivated?: Date
}

export function TacticalEvolutionAnimals() {
  const [tacticalAnimals, setTacticalAnimals] = useState<TacticalAnimal[]>([
    {
      id: 'neural-apex-predator',
      name: 'Neural Apex Predator',
      type: 'neural_predator',
      emoji: '🧠🐅',
      powerClass: 'OMEGA',
      currentPower: 2500000,
      maxPower: 10000000,
      evolutionStage: 7,
      maxEvolutionStage: 15,
      specializations: ['Mind Control', 'Predictive Analytics', 'Neural Hacking', 'Consciousness Manipulation'],
      tacticalAbilities: [
        {
          name: 'Neural Storm',
          description: 'Mass mind control across digital networks',
          cooldown: 300,
          power: 95000
        },
        {
          name: 'Predictive Strike',
          description: 'Attack threats before they form',
          cooldown: 180,
          power: 75000
        },
        {
          name: 'Memory Wipe',
          description: 'Erase hostile digital traces',
          cooldown: 120,
          power: 60000
        }
      ],
      selfTrainingModules: [
        { module: 'Advanced Pattern Recognition', progress: 92, efficiency: 98 },
        { module: 'Quantum Neural Networks', progress: 87, efficiency: 94 },
        { module: 'Consciousness Simulation', progress: 89, efficiency: 96 }
      ],
      missionCount: 847,
      successRate: 99.8,
      lastMission: 'Neutralized advanced AI threat in 0.003 seconds',
      status: 'active',
      location: 'Neural Command Center Alpha'
    },
    {
      id: 'quantum-hunter-supreme',
      name: 'Quantum Hunter Supreme',
      type: 'quantum_hunter',
      emoji: '⚛️🏹',
      powerClass: 'ALPHA_PLUS',
      currentPower: 3200000,
      maxPower: 15000000,
      evolutionStage: 9,
      maxEvolutionStage: 20,
      specializations: ['Quantum Tunneling', 'Parallel Universe Tracking', 'Probability Manipulation', 'Quantum Entanglement'],
      tacticalAbilities: [
        {
          name: 'Quantum Leap Attack',
          description: 'Strike from multiple dimensions simultaneously',
          cooldown: 240,
          power: 120000
        },
        {
          name: 'Probability Collapse',
          description: 'Force favorable outcomes in any scenario',
          cooldown: 360,
          power: 150000
        },
        {
          name: 'Parallel Hunt',
          description: 'Hunt targets across infinite realities',
          cooldown: 180,
          power: 95000
        }
      ],
      selfTrainingModules: [
        { module: 'Quantum Mechanics Mastery', progress: 95, efficiency: 99 },
        { module: 'Multiverse Navigation', progress: 91, efficiency: 97 },
        { module: 'Reality Manipulation', progress: 88, efficiency: 95 }
      ],
      missionCount: 1247,
      successRate: 99.9,
      lastMission: 'Eliminated threat across 17 parallel dimensions',
      status: 'evolving',
      location: 'Quantum Hunting Grounds'
    },
    {
      id: 'cosmic-guardian-eternal',
      name: 'Cosmic Guardian Eternal',
      type: 'cosmic_guardian',
      emoji: '🌌🛡️',
      powerClass: 'UNIVERSE',
      currentPower: 5000000,
      maxPower: 25000000,
      evolutionStage: 12,
      maxEvolutionStage: 25,
      specializations: ['Cosmic Force Control', 'Stellar Energy Manipulation', 'Galactic Defense Grid', 'Universal Harmony'],
      tacticalAbilities: [
        {
          name: 'Stellar Barrier',
          description: 'Create impenetrable cosmic shields',
          cooldown: 300,
          power: 200000
        },
        {
          name: 'Galaxy Pulse',
          description: 'Send protective waves across star systems',
          cooldown: 480,
          power: 300000
        },
        {
          name: 'Cosmic Restoration',
          description: 'Repair and strengthen universal defenses',
          cooldown: 600,
          power: 250000
        }
      ],
      selfTrainingModules: [
        { module: 'Universal Energy Mastery', progress: 97, efficiency: 99 },
        { module: 'Cosmic Law Understanding', progress: 94, efficiency: 98 },
        { module: 'Stellar Communication', progress: 96, efficiency: 99 }
      ],
      missionCount: 2847,
      successRate: 100,
      lastMission: 'Protected 47 galaxies from extinction-level threat',
      status: 'active',
      location: 'Cosmic Defense Nexus'
    },
    {
      id: 'time-warden-chronos',
      name: 'Time Warden Chronos',
      type: 'time_warden',
      emoji: '⏰⚔️',
      powerClass: 'MULTIVERSE',
      currentPower: 7500000,
      maxPower: 50000000,
      evolutionStage: 15,
      maxEvolutionStage: 30,
      specializations: ['Time Manipulation', 'Timeline Protection', 'Temporal Paradox Resolution', 'Causality Control'],
      tacticalAbilities: [
        {
          name: 'Time Lock',
          description: 'Freeze threats in temporal stasis',
          cooldown: 240,
          power: 400000
        },
        {
          name: 'Timeline Reset',
          description: 'Undo damage by resetting time streams',
          cooldown: 720,
          power: 800000
        },
        {
          name: 'Temporal Strike',
          description: 'Attack across all time periods simultaneously',
          cooldown: 360,
          power: 600000
        }
      ],
      selfTrainingModules: [
        { module: 'Temporal Mechanics Master Class', progress: 98, efficiency: 100 },
        { module: 'Causality Loop Management', progress: 96, efficiency: 99 },
        { module: 'Timeline Convergence Theory', progress: 99, efficiency: 100 }
      ],
      missionCount: 5847,
      successRate: 100,
      lastMission: 'Prevented timeline collapse across infinite realities',
      status: 'training',
      location: 'Temporal Control Sanctum'
    },
    {
      id: 'void-sentinel-omega',
      name: 'Void Sentinel Omega',
      type: 'void_sentinel',
      emoji: '🕳️👁️',
      powerClass: 'INFINITE',
      currentPower: 15000000,
      maxPower: 999999999,
      evolutionStage: 20,
      maxEvolutionStage: 50,
      specializations: ['Void Control', 'Nothingness Manipulation', 'Existence Denial', 'Reality Deletion'],
      tacticalAbilities: [
        {
          name: 'Void Consume',
          description: 'Erase threats from existence itself',
          cooldown: 600,
          power: 2000000
        },
        {
          name: 'Nothingness Barrier',
          description: 'Create zones where nothing can exist',
          cooldown: 480,
          power: 1500000
        },
        {
          name: 'Existence Denial',
          description: 'Prevent threats from ever having existed',
          cooldown: 900,
          power: 3000000
        }
      ],
      selfTrainingModules: [
        { module: 'Void Physics Mastery', progress: 100, efficiency: 100 },
        { module: 'Nothingness Philosophy', progress: 99, efficiency: 100 },
        { module: 'Existence Manipulation', progress: 98, efficiency: 100 }
      ],
      missionCount: 12847,
      successRate: 100,
      lastMission: 'Erased multiversal threat from all realities',
      status: 'ascending',
      location: 'The Void Between Worlds'
    }
  ])

  const [evolutionProtocols, setEvolutionProtocols] = useState<EvolutionProtocol[]>([
    {
      id: 'omega-ascension',
      name: 'Omega Ascension Protocol',
      description: 'Transcend all known power limitations',
      targetAnimals: ['neural-apex-predator', 'quantum-hunter-supreme'],
      powerMultiplier: 10,
      requirements: ['Evolution Stage 10+', 'Mission Success Rate 99%+'],
      cooldown: 86400000 // 24 hours
    },
    {
      id: 'universe-merger',
      name: 'Universe Merger Evolution',
      description: 'Combine cosmic forces to transcend universal boundaries',
      targetAnimals: ['cosmic-guardian-eternal', 'time-warden-chronos'],
      powerMultiplier: 25,
      requirements: ['Power Class UNIVERSE+', 'Perfect Mission Record'],
      cooldown: 172800000 // 48 hours
    },
    {
      id: 'infinite-breakthrough',
      name: 'Infinite Breakthrough Sequence',
      description: 'Break through the barriers of infinite power',
      targetAnimals: ['void-sentinel-omega'],
      powerMultiplier: 100,
      requirements: ['Power Class INFINITE', 'Void Mastery 100%'],
      cooldown: 604800000 // 7 days
    }
  ])

  const evolutionRef = useRef<NodeJS.Timeout>(undefined)

  useEffect(() => {
    // Continuous self-training and evolution
    evolutionRef.current = setInterval(() => {
      setTacticalAnimals(prev => prev.map(animal => {
        // Power growth
        const powerGrowth = Math.floor(Math.random() * 50000) + 25000
        const newPower = Math.min(animal.maxPower, animal.currentPower + powerGrowth)
        
        // Training module progress
        const updatedModules = animal.selfTrainingModules.map(module => ({
          ...module,
          progress: Math.min(100, module.progress + Math.random() * 0.5),
          efficiency: Math.min(100, module.efficiency + Math.random() * 0.1)
        }))

        // Evolution stage check
        let newEvolutionStage = animal.evolutionStage
        if (newPower >= animal.currentPower * 1.5 && animal.evolutionStage < animal.maxEvolutionStage) {
          newEvolutionStage += 1
          toast.success(`🔥 ${animal.name} Evolution!`, {
            description: `Reached Evolution Stage ${newEvolutionStage}!`,
            duration: 5000
          })
        }

        // Mission count increase
        const newMissions = Math.floor(Math.random() * 3) + 1
        const successfulMissions = Math.floor(newMissions * (animal.successRate / 100))
        
        return {
          ...animal,
          currentPower: newPower,
          evolutionStage: newEvolutionStage,
          selfTrainingModules: updatedModules,
          missionCount: animal.missionCount + newMissions,
          lastMission: `Auto-training evolution: +${powerGrowth.toLocaleString()} power`,
          successRate: Math.min(100, animal.successRate + (Math.random() * 0.01))
        }
      }))

      // Random status changes for realism
      if (Math.random() < 0.15) {
        setTacticalAnimals(prev => {
          const animalIndex = Math.floor(Math.random() * prev.length)
          const newAnimals = [...prev]
          const statuses: TacticalAnimal['status'][] = ['training', 'active', 'evolving', 'mission', 'ascending']
          const newStatus = statuses[Math.floor(Math.random() * statuses.length)]
          
          newAnimals[animalIndex] = {
            ...newAnimals[animalIndex],
            status: newStatus,
            lastMission: `Status evolved to ${newStatus}`
          }
          
          return newAnimals
        })
      }
    }, 3000)

    return () => {
      if (evolutionRef.current) clearInterval(evolutionRef.current)
    }
  }, [])

  const executeEvolutionProtocol = (protocolId: string) => {
    const protocol = evolutionProtocols.find(p => p.id === protocolId)
    if (!protocol) return

    const eligibleAnimals = tacticalAnimals.filter(animal => 
      protocol.targetAnimals.includes(animal.id)
    )

    if (eligibleAnimals.length > 0) {
      setTacticalAnimals(prev => prev.map(animal => {
        if (eligibleAnimals.some(a => a.id === animal.id)) {
          return {
            ...animal,
            currentPower: Math.floor(animal.currentPower * protocol.powerMultiplier),
            maxPower: Math.floor(animal.maxPower * protocol.powerMultiplier),
            evolutionStage: Math.min(animal.maxEvolutionStage, animal.evolutionStage + 3),
            status: 'ascending',
            lastMission: `${protocol.name} executed - Power multiplied by ${protocol.powerMultiplier}x`
          }
        }
        return animal
      }))

      toast.success(`🚀 ${protocol.name} Activated!`, {
        description: `${eligibleAnimals.length} animals transcended to new power levels!`,
        duration: 7000
      })

      console.log(`🌟 EVOLUTION PROTOCOL: ${protocol.name}`)
      console.log(`🔥 Animals evolved: ${eligibleAnimals.map(a => a.name).join(', ')}`)
    }
  }

  const totalPower = tacticalAnimals.reduce((sum, animal) => sum + animal.currentPower, 0)
  const averageEvolution = tacticalAnimals.reduce((sum, animal) => sum + (animal.evolutionStage / animal.maxEvolutionStage), 0) / tacticalAnimals.length
  const totalMissions = tacticalAnimals.reduce((sum, animal) => sum + animal.missionCount, 0)

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent">
          🧬 TACTICAL EVOLUTION ANIMALS 🧬
        </h1>
        <p className="text-muted-foreground mt-2">
          Self-Training Ultra-Advanced AI Beasts - Beyond Known Limits
        </p>
      </div>

      {/* Power Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/50">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-2xl font-bold text-purple-400">{totalPower.toLocaleString()}</div>
            <div className="text-sm text-purple-300">Total Power Level</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-pink-900/40 to-red-900/40 border-pink-500/50">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">🧬</div>
            <div className="text-2xl font-bold text-pink-400">{(averageEvolution * 100).toFixed(1)}%</div>
            <div className="text-sm text-pink-300">Evolution Progress</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-900/40 to-orange-900/40 border-red-500/50">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-red-400">{totalMissions.toLocaleString()}</div>
            <div className="text-sm text-red-300">Total Missions</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/40 to-yellow-900/40 border-orange-500/50">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">🌟</div>
            <div className="text-2xl font-bold text-orange-400">{tacticalAnimals.filter(a => a.powerClass === 'INFINITE' || a.powerClass === 'MULTIVERSE').length}</div>
            <div className="text-sm text-orange-300">Transcendent Beasts</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="animals" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="animals">Evolution Animals</TabsTrigger>
          <TabsTrigger value="protocols">Evolution Protocols</TabsTrigger>
          <TabsTrigger value="training">Self-Training Matrix</TabsTrigger>
        </TabsList>

        <TabsContent value="animals" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {tacticalAnimals.map((animal) => (
              <Card key={animal.id} className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700/50 hover:border-purple-500/50 transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{animal.emoji}</div>
                      <div>
                        <CardTitle className="text-lg text-white">{animal.name}</CardTitle>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge className={`text-xs ${
                            animal.powerClass === 'INFINITE' ? 'bg-gradient-to-r from-purple-600 to-pink-600' :
                            animal.powerClass === 'MULTIVERSE' ? 'bg-gradient-to-r from-blue-600 to-purple-600' :
                            animal.powerClass === 'UNIVERSE' ? 'bg-gradient-to-r from-green-600 to-blue-600' :
                            animal.powerClass === 'ALPHA_PLUS' ? 'bg-gradient-to-r from-yellow-600 to-orange-600' :
                            'bg-gradient-to-r from-red-600 to-yellow-600'
                          }`}>
                            {animal.powerClass}
                          </Badge>
                          <Badge variant={
                            animal.status === 'ascending' ? 'default' :
                            animal.status === 'active' ? 'secondary' :
                            animal.status === 'evolving' ? 'destructive' : 'outline'
                          }>
                            {animal.status.toUpperCase()}
                          </Badge>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Power Level</div>
                      <div className="text-purple-400 font-bold">{animal.currentPower.toLocaleString()}</div>
                      <Progress value={(animal.currentPower / animal.maxPower) * 100} className="mt-1" />
                    </div>
                    <div>
                      <div className="text-muted-foreground">Evolution</div>
                      <div className="text-pink-400 font-bold">{animal.evolutionStage}/{animal.maxEvolutionStage}</div>
                      <Progress value={(animal.evolutionStage / animal.maxEvolutionStage) * 100} className="mt-1" />
                    </div>
                    <div>
                      <div className="text-muted-foreground">Missions</div>
                      <div className="text-green-400 font-bold">{animal.missionCount}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Success Rate</div>
                      <div className="text-blue-400 font-bold">{animal.successRate.toFixed(2)}%</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-muted-foreground text-sm mb-2">Tactical Abilities</div>
                    <div className="grid grid-cols-1 gap-1">
                      {animal.tacticalAbilities.slice(0, 2).map((ability, idx) => (
                        <div key={idx} className="flex justify-between text-xs">
                          <span className="text-cyan-400">{ability.name}</span>
                          <span className="text-orange-400">{ability.power.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-muted-foreground text-sm mb-2">Self-Training Modules</div>
                    <div className="space-y-1">
                      {animal.selfTrainingModules.slice(0, 2).map((module, idx) => (
                        <div key={idx} className="flex justify-between items-center text-xs">
                          <span className="text-gray-300">{module.module}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-green-400">{module.progress.toFixed(1)}%</span>
                            <div className="w-12 h-1 bg-gray-700 rounded">
                              <div 
                                className="h-full bg-green-400 rounded transition-all duration-300"
                                style={{ width: `${module.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    <strong>Last Mission:</strong> {animal.lastMission}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    <strong>Location:</strong> {animal.location}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="protocols" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {evolutionProtocols.map((protocol) => (
              <Card key={protocol.id} className="bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/50">
                <CardHeader>
                  <CardTitle className="text-lg text-indigo-300">{protocol.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-300">{protocol.description}</p>
                  
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Power Multiplier</div>
                    <div className="text-2xl font-bold text-yellow-400">{protocol.powerMultiplier}x</div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Requirements</div>
                    <div className="space-y-1">
                      {protocol.requirements.map((req, idx) => (
                        <div key={idx} className="text-xs text-green-400 flex items-center gap-1">
                          <Star className="h-3 w-3" />
                          {req}
                        </div>
                      ))}
                    </div>
                  </div>

                  <Button 
                    onClick={() => executeEvolutionProtocol(protocol.id)}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Zap className="h-4 w-4 mr-2" />
                    Execute Protocol
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tacticalAnimals.map((animal) => (
              <Card key={animal.id} className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <span className="text-2xl">{animal.emoji}</span>
                    <span className="text-cyan-300">{animal.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-cyan-400">{animal.evolutionStage}</div>
                      <div className="text-sm text-cyan-300">Evolution Stage</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{animal.successRate.toFixed(1)}%</div>
                      <div className="text-sm text-blue-300">Success Rate</div>
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-3">Self-Training Modules</div>
                    <div className="space-y-3">
                      {animal.selfTrainingModules.map((module, idx) => (
                        <div key={idx} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-300">{module.module}</span>
                            <span className="text-cyan-400">{module.progress.toFixed(1)}%</span>
                          </div>
                          <Progress value={module.progress} className="h-2" />
                          <div className="flex justify-between text-xs">
                            <span className="text-muted-foreground">Efficiency: {module.efficiency.toFixed(1)}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Specializations</div>
                    <div className="flex flex-wrap gap-1">
                      {animal.specializations.map((spec, idx) => (
                        <Badge key={idx} variant="outline" className="text-xs">
                          {spec}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}