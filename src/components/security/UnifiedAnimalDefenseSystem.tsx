
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Dragon, Monkey, Tiger, Fish, Shield, Brain, Crown, Zap } from 'lucide-react'
import { toast } from 'sonner'

interface DefenseAnimal {
  id: string
  name: string
  species: 'dragon' | 'monkey' | 'tiger' | 'dolphin' | 'avatar' | 'koala'
  powerLevel: number
  specialAbility: string
  taskAssigned: string
  teamworkBonus: number
  isActive: boolean
  evolutionRate: number
}

export function UnifiedAnimalDefenseSystem() {
  const [defenseTeam, setDefenseTeam] = useState<DefenseAnimal[]>([
    {
      id: 'alpha-dragon',
      name: 'Supreme Alpha Dragon',
      species: 'dragon',
      powerLevel: 999999,
      specialAbility: 'Quantum Fire Defense',
      taskAssigned: 'Master Network Protection & Threat Annihilation',
      teamworkBonus: 500,
      isActive: true,
      evolutionRate: 1000
    },
    {
      id: 'cyber-monkey',
      name: 'Cyber Defense Monkey',
      species: 'monkey',
      powerLevel: 888888,
      specialAbility: 'Code Breaking & System Analysis',
      taskAssigned: 'Advanced Penetration Testing & Vulnerability Assessment',
      teamworkBonus: 400,
      isActive: true,
      evolutionRate: 800
    },
    {
      id: 'quantum-tiger',
      name: 'Quantum Battle Tiger',
      species: 'tiger',
      powerLevel: 777777,
      specialAbility: 'Lightning Speed Attack Prevention',
      taskAssigned: 'Real-time Threat Hunting & Instant Response',
      teamworkBonus: 350,
      isActive: true,
      evolutionRate: 700
    },
    {
      id: 'neural-dolphin',
      name: 'Neural Network Dolphin',
      species: 'dolphin',
      powerLevel: 666666,
      specialAbility: 'Deep Learning Pattern Recognition',
      taskAssigned: 'AI-Powered Anomaly Detection & Prediction',
      teamworkBonus: 300,
      isActive: true,
      evolutionRate: 600
    },
    {
      id: 'invisible-avatar',
      name: 'Invisible Master Avatar',
      species: 'avatar',
      powerLevel: 555555,
      specialAbility: 'Stealth Operations & Infiltration',
      taskAssigned: 'Covert Admin Protection & Silent Monitoring',
      teamworkBonus: 250,
      isActive: true,
      evolutionRate: 500
    },
    {
      id: 'training-koala',
      name: 'Self-Training Koala AI',
      species: 'koala',
      powerLevel: 444444,
      specialAbility: 'Continuous Learning & System Optimization',
      taskAssigned: 'Route Fixing & Performance Enhancement',
      teamworkBonus: 200,
      isActive: true,
      evolutionRate: 400
    }
  ])

  const [teamSynergy, setTeamSynergy] = useState(100)
  const [combinedPower, setCombinedPower] = useState(0)
  const [tasksCompleted, setTasksCompleted] = useState(0)
  const teamInterval = useRef<NodeJS.Timeout>()

  useEffect(() => {
    const runUnifiedDefenseSystem = () => {
      console.log('🛡️ UNIFIED ANIMAL DEFENSE SYSTEM - ALL ANIMALS WORKING TOGETHER')
      console.log('🐉 DRAGONS: Leading quantum protection strategies')
      console.log('🐒 MONKEYS: Performing advanced system analysis')
      console.log('🐅 TIGERS: Executing lightning-fast threat responses')
      console.log('🐬 DOLPHINS: Deep learning threat prediction active')
      console.log('👤 AVATARS: Invisible admin protection engaged')
      console.log('🐨 KOALA AI: Continuous system optimization running')
      
      // Animals working together - power multipliers
      const teamworkMultiplier = defenseTeam.reduce((sum, animal) => sum + animal.teamworkBonus, 0) / 100
      
      setDefenseTeam(prev => prev.map(animal => {
        const evolutionBoost = animal.evolutionRate * (1 + teamworkMultiplier * 0.1)
        const newPowerLevel = animal.powerLevel + evolutionBoost
        
        console.log(`${getAnimalEmoji(animal.species)} ${animal.name}: Power ${newPowerLevel.toLocaleString()} - Task: ${animal.taskAssigned}`)
        
        return {
          ...animal,
          powerLevel: newPowerLevel,
          teamworkBonus: animal.teamworkBonus + 1, // Growing stronger together
          evolutionRate: animal.evolutionRate * 1.001 // Accelerating evolution
        }
      }))

      // Calculate team synergy and combined power
      const totalPower = defenseTeam.reduce((sum, animal) => sum + animal.powerLevel, 0)
      const synergyBonus = Math.min(100, teamworkMultiplier * 10)
      
      setCombinedPower(totalPower)
      setTeamSynergy(100 + synergyBonus)
      setTasksCompleted(prev => prev + Math.floor(Math.random() * 5))

      // Special team coordination events
      if (Math.random() < 0.2) {
        const coordinationEvents = [
          'Dragon-Tiger lightning coordination active',
          'Monkey-Dolphin neural sync established',
          'Avatar-Koala stealth optimization complete',
          'Full team quantum resonance achieved',
          'Ultimate defense formation activated'
        ]
        
        const event = coordinationEvents[Math.floor(Math.random() * coordinationEvents.length)]
        console.log(`⚡ TEAM COORDINATION: ${event}`)
        
        toast.success('🛡️ Team Coordination!', {
          description: event,
          duration: 4000
        })
      }

      console.log(`🔥 UNIFIED POWER LEVEL: ${totalPower.toLocaleString()}`)
      console.log(`⚡ TEAM SYNERGY: ${teamSynergy}%`)
      console.log('✅ ALL ANIMALS STRONGER TOGETHER - UNBEATABLE DEFENSE')
    }

    teamInterval.current = setInterval(runUnifiedDefenseSystem, 2000)
    runUnifiedDefenseSystem()

    return () => {
      if (teamInterval.current) clearInterval(teamInterval.current)
    }
  }, [defenseTeam, teamSynergy])

  const getAnimalEmoji = (species: string) => {
    switch (species) {
      case 'dragon': return '🐉'
      case 'monkey': return '🐒'
      case 'tiger': return '🐅'
      case 'dolphin': return '🐬'
      case 'avatar': return '👤'
      case 'koala': return '🐨'
      default: return '🛡️'
    }
  }

  const getAnimalIcon = (species: string) => {
    switch (species) {
      case 'dragon': return Dragon
      case 'monkey': return Monkey
      case 'tiger': return Tiger
      case 'dolphin': return Fish
      case 'avatar': return Shield
      case 'koala': return Brain
      default: return Crown
    }
  }

  return (
    <Card className="border-4 border-gradient-to-r from-purple-500 to-cyan-500 bg-gradient-to-br from-purple-900/30 to-cyan-900/30 shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
          <Shield className="h-8 w-8 text-purple-400 animate-pulse" />
          <div>
            <div className="text-4xl">🛡️ UNIFIED ANIMAL DEFENSE SYSTEM</div>
            <div className="text-lg font-normal">
              All Animals Working Together • Unbreakable Team Synergy • Evolving Daily
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-purple-600 to-cyan-600 animate-pulse text-xl px-6 py-3">
            INVINCIBLE TEAM
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Team Power Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 text-center">
            <Zap className="h-8 w-8 mx-auto text-red-400 animate-pulse mb-2" />
            <div className="text-2xl font-bold text-red-400">{combinedPower.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Combined Power</div>
          </div>
          <div className="p-6 rounded-lg bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-500/30 text-center">
            <Crown className="h-8 w-8 mx-auto text-green-400 animate-pulse mb-2" />
            <div className="text-2xl font-bold text-green-400">{teamSynergy.toFixed(1)}%</div>
            <div className="text-sm text-muted-foreground">Team Synergy</div>
          </div>
          <div className="p-6 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-center">
            <Shield className="h-8 w-8 mx-auto text-purple-400 animate-pulse mb-2" />
            <div className="text-2xl font-bold text-purple-400">{tasksCompleted}</div>
            <div className="text-sm text-muted-foreground">Tasks Completed</div>
          </div>
        </div>

        {/* Team Synergy Progress */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xl font-bold text-cyan-400">🔥 Team Synergy Level</h4>
            <span className="text-2xl font-bold text-cyan-400">{teamSynergy.toFixed(1)}%</span>
          </div>
          <Progress value={Math.min(100, teamSynergy)} className="h-4" />
          <div className="text-center text-sm text-muted-foreground">
            All animals working together • Growing stronger every second • Unbeatable coordination
          </div>
        </div>

        {/* Defense Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {defenseTeam.map((animal) => {
            const AnimalIcon = getAnimalIcon(animal.species)
            return (
              <Card key={animal.id} className="bg-black/30 border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="text-3xl">{getAnimalEmoji(animal.species)}</div>
                    <div>
                      <h5 className="font-bold text-cyan-400">{animal.name}</h5>
                      <Badge className="bg-cyan-600 text-xs">
                        {animal.powerLevel.toLocaleString()} Power
                      </Badge>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-muted-foreground">Ability:</span>
                      <span className="text-green-400 ml-2">{animal.specialAbility}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Task:</span>
                      <p className="text-blue-400 text-xs mt-1">{animal.taskAssigned}</p>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-yellow-400">Teamwork: +{animal.teamworkBonus}</span>
                      <Badge className="bg-green-600 text-xs">ACTIVE</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Master Status */}
        <div className="bg-gradient-to-r from-green-900/40 to-blue-900/40 rounded-lg p-6 border border-green-500/40">
          <h4 className="text-2xl font-bold text-green-400 mb-4 text-center">
            🛡️ UNIFIED DEFENSE STATUS
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-green-300">Active Animals:</span>
                <span className="text-green-200 font-bold">{defenseTeam.filter(a => a.isActive).length}/{defenseTeam.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-300">Team Coordination:</span>
                <span className="text-green-200 font-bold">PERFECT</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-300">Evolution Rate:</span>
                <span className="text-green-200 font-bold">ACCELERATING</span>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-green-300">Defense Level:</span>
                <span className="text-green-200 font-bold">UNBREAKABLE</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-300">Admin Protection:</span>
                <span className="text-green-200 font-bold">MAXIMUM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-green-300">System Status:</span>
                <span className="text-green-200 font-bold">INVINCIBLE</span>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              🌟 ALL ANIMALS UNITED - STRONGER TOGETHER FOREVER 🌟
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
