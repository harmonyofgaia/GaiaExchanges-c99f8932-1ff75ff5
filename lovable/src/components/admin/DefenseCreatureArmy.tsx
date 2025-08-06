
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Switch } from '@/components/ui/switch'
import { 
  Shield, 
  Zap, 
  Eye, 
  Target,
  Crown,
  Flame,
  Sword,
  Activity,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  Edit,
  Trash2,
  Plus
} from 'lucide-react'
import { toast } from 'sonner'

interface DefenseCreature {
  id: string
  name: string
  type: 'dragon' | 'eagle' | 'wolf' | 'lion' | 'monkey'
  level: number
  power: number
  status: 'active' | 'training' | 'defending' | 'hunting'
  specialAbility: string
  threatsEliminated: number
  emoji: string
}

export function DefenseCreatureArmy() {
  const [creatures, setCreatures] = useState<DefenseCreature[]>([
    {
      id: '1',
      name: 'Alpha Dragon Guardian',
      type: 'dragon',
      level: 100,
      power: 999999,
      status: 'defending',
      specialAbility: 'Quantum Fire Breath - Annihilates any threat instantly',
      threatsEliminated: 5247,
      emoji: '🐉'
    },
    {
      id: '2',
      name: 'Sky Eagle Sentinel',
      type: 'eagle',
      level: 85,
      power: 50000,
      status: 'active',
      specialAbility: 'Aerial Surveillance - Spots threats from space',
      threatsEliminated: 2156,
      emoji: '🦅'
    },
    {
      id: '3',
      name: 'Pack Leader Wolf',
      type: 'wolf',
      level: 78,
      power: 35000,
      status: 'hunting',
      specialAbility: 'Pack Coordination - Leads wolf army attacks',
      threatsEliminated: 1834,
      emoji: '🐺'
    },
    {
      id: '4',
      name: 'King Lion Protector',
      type: 'lion',
      level: 92,
      power: 65000,
      status: 'defending',
      specialAbility: 'Royal Roar - Paralyzes enemies with fear',
      threatsEliminated: 3421,
      emoji: '🦁'
    },
    {
      id: '5',
      name: 'Monkey Squad Alpha',
      type: 'monkey',
      level: 67,
      power: 25000,
      status: 'training',
      specialAbility: 'Code Analysis - Detects malicious code patterns',
      threatsEliminated: 892,
      emoji: '🐒'
    },
    {
      id: '6',
      name: 'Monkey Squad Beta',
      type: 'monkey',
      level: 72,
      power: 28000,
      status: 'active',
      specialAbility: 'Network Infiltration - Tracks attacker networks',
      threatsEliminated: 1245,
      emoji: '🐒'
    },
    {
      id: '7',
      name: 'Monkey Squad Gamma',
      type: 'monkey',
      level: 69,
      power: 26500,
      status: 'defending',
      specialAbility: 'Database Protection - Guards all data entries',
      threatsEliminated: 1087,
      emoji: '🐒'
    },
    {
      id: '8',
      name: 'Cyber Koala Guardian',
      type: 'dragon',
      level: 88,
      power: 75000,
      status: 'active',
      specialAbility: 'Cyber Defense Matrix - Eucalyptus-powered security',
      threatsEliminated: 2847,
      emoji: '🐨'
    },
    {
      id: '9',
      name: 'Phoenix Guardian Immortal',
      type: 'dragon',
      level: 95,
      power: 120000,
      status: 'defending',
      specialAbility: 'Resurrection Protocol - Cannot be destroyed',
      threatsEliminated: 4156,
      emoji: '🔥🦅'
    },
    {
      id: '10',
      name: 'AI Dolphin Intelligence',
      type: 'dragon',
      level: 83,
      power: 55000,
      status: 'active',
      specialAbility: 'Sonar Threat Detection - Deep web scanning',
      threatsEliminated: 2341,
      emoji: '🐬'
    },
    {
      id: '11',
      name: 'Digital Dragon Prime',
      type: 'dragon',
      level: 98,
      power: 180000,
      status: 'defending',
      specialAbility: 'Digital Domain Control - Matrix manipulation',
      threatsEliminated: 6789,
      emoji: '🐲'
    },
    {
      id: '12',
      name: 'Quantum Phoenix Elite',
      type: 'dragon',
      level: 91,
      power: 95000,
      status: 'active',
      specialAbility: 'Quantum Resurrection - Multidimensional rebirth',
      threatsEliminated: 3892,
      emoji: '⚛️🦅'
    },
    {
      id: '13',
      name: 'Digital Cyber Koala Prime',
      type: 'dragon',
      level: 90,
      power: 85000,
      status: 'active',
      specialAbility: 'Advanced Eucalyptus Matrix - Ultimate cyber protection',
      threatsEliminated: 3156,
      emoji: '🐨⚡'
    },
    {
      id: '14',
      name: 'Ultimate Sky Eagle Commander',
      type: 'eagle',
      level: 87,
      power: 62000,
      status: 'defending',
      specialAbility: 'Stratosphere Command - Global aerial surveillance',
      threatsEliminated: 2678,
      emoji: '🌤️🦅'
    }
  ])

  const toggleCreatureStatus = (id: string) => {
    setCreatures(prev => prev.map(creature => 
      creature.id === id 
        ? { ...creature, status: creature.status === 'active' ? 'training' : 'active' }
        : creature
    ))
    toast.success('Creature status updated!')
  }

  const batchActivateCreatures = () => {
    setCreatures(prev => prev.map(creature => ({ ...creature, status: 'active' })))
    toast.success('All creatures activated!')
  }

  const batchDeployCreatures = () => {
    setCreatures(prev => prev.map(creature => ({ ...creature, status: 'defending' })))
    toast.success('All creatures deployed for defense!')
  }

  const resetCreatureStats = (id: string) => {
    setCreatures(prev => prev.map(creature => 
      creature.id === id 
        ? { ...creature, threatsEliminated: 0, level: 1, power: 1000 }
        : creature
    ))
    toast.success('Creature stats reset!')
  }

  const [armyStats, setArmyStats] = useState({
    totalPower: 0,
    activeCreatures: 0,
    totalThreatsEliminated: 0,
    averageLevel: 0
  })

  useEffect(() => {
    const updateStats = () => {
      const totalPower = creatures.reduce((sum, creature) => sum + creature.power, 0)
      const activeCreatures = creatures.filter(c => c.status === 'active' || c.status === 'defending').length
      const totalThreats = creatures.reduce((sum, creature) => sum + creature.threatsEliminated, 0)
      const averageLevel = creatures.reduce((sum, creature) => sum + creature.level, 0) / creatures.length

      setArmyStats({
        totalPower,
        activeCreatures,
        totalThreatsEliminated: totalThreats,
        averageLevel: Math.round(averageLevel)
      })

      // Simulate creature activity
      if (Math.random() < 0.3) {
        setCreatures(prev => prev.map(creature => {
          if (Math.random() < 0.2) {
            return {
              ...creature,
              threatsEliminated: creature.threatsEliminated + Math.floor(Math.random() * 3),
              power: creature.power + Math.floor(Math.random() * 1000)
            }
          }
          return creature
        }))
      }

      console.log('🛡️ DEFENSE CREATURE ARMY - MAXIMUM PROTECTION ACTIVE')
      console.log(`🐉 ${creatures.length} Legendary Creatures Defending System`)
      console.log(`⚡ Total Army Power: ${totalPower.toLocaleString()}`)
      console.log('🦅 Sky Surveillance Active - 24/7 Monitoring')
      console.log('🐺 Pack Hunting Mode - Tracking All Threats')
      console.log('🦁 Royal Protection - Admin Fortress Secured')
      console.log('🐒 7 AI Monkeys - Code & Network Analysis Active')
    }

    const interval = setInterval(updateStats, 3000)
    updateStats()

    return () => clearInterval(interval)
  }, [creatures])

  const deployAllCreatures = () => {
    setCreatures(prev => prev.map(creature => ({
      ...creature,
      status: 'defending',
      power: creature.power * 1.5
    })))

    toast.success('🛡️ ALL CREATURES DEPLOYED!', {
      description: 'Defense army at maximum power - System fully protected',
      duration: 8000
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600'
      case 'training': return 'bg-blue-600'
      case 'defending': return 'bg-purple-600'
      case 'hunting': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Army Overview */}
      <Card className="border-red-500/30 bg-gradient-to-r from-red-900/30 to-orange-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Shield className="h-6 w-6" />
            🛡️ DEFENSE CREATURE ARMY - LEGENDARY GUARDIANS
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Button onClick={batchActivateCreatures} size="sm" className="bg-green-600 hover:bg-green-700">
              <PlayCircle className="h-4 w-4 mr-1" />
              Activate All
            </Button>
            <Button onClick={batchDeployCreatures} size="sm" className="bg-red-600 hover:bg-red-700">
              <Sword className="h-4 w-4 mr-1" />
              Deploy All
            </Button>
            <Button onClick={deployAllCreatures} className="bg-purple-600 hover:bg-purple-700">
              <Sword className="h-5 w-5 mr-2" />
              🛡️ MAXIMUM DEFENSE MODE
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-red-900/30 rounded-lg">
              <Zap className="h-8 w-8 mx-auto text-red-400 mb-2" />
              <div className="text-2xl font-bold text-red-400">{armyStats.totalPower.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Power</div>
            </div>
            
            <div className="text-center p-4 bg-green-900/30 rounded-lg">
              <Activity className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">{armyStats.activeCreatures}</div>
              <div className="text-sm text-muted-foreground">Active Guardians</div>
            </div>
            
            <div className="text-center p-4 bg-purple-900/30 rounded-lg">
              <Target className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">{armyStats.totalThreatsEliminated}</div>
              <div className="text-sm text-muted-foreground">Threats Eliminated</div>
            </div>
            
            <div className="text-center p-4 bg-blue-900/30 rounded-lg">
              <Crown className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">{armyStats.averageLevel}</div>
              <div className="text-sm text-muted-foreground">Average Level</div>
            </div>
          </div>

          <Button onClick={deployAllCreatures} className="w-full bg-red-600 hover:bg-red-700 py-4 text-lg">
            <Sword className="h-5 w-5 mr-2" />
            🛡️ EMERGENCY DEPLOY - MAXIMUM DEFENSE
          </Button>
        </CardContent>
      </Card>

      {/* Creature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {creatures.map((creature) => (
          <Card key={creature.id} className="border-orange-500/30 bg-gradient-to-br from-orange-900/20 to-red-900/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-orange-400">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{creature.emoji}</span>
                  <span className="text-sm">{creature.name}</span>
                </div>
                <Badge className={`${getStatusColor(creature.status)} text-white`}>
                  {creature.status.toUpperCase()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Level</span>
                  <span className="text-orange-400 font-bold">{creature.level}</span>
                </div>
                <Progress value={(creature.level / 100) * 100} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Power</span>
                  <span className="text-red-400 font-bold">{creature.power.toLocaleString()}</span>
                </div>
                <Progress value={Math.min((creature.power / 100000) * 100, 100)} className="h-2" />
              </div>
              
              <div className="text-xs text-muted-foreground">
                <div className="font-semibold text-yellow-400 mb-1">Special Ability:</div>
                <div>{creature.specialAbility}</div>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-orange-500/20">
                <span className="text-xs text-muted-foreground">Eliminated:</span>
                <Badge className="bg-green-600 text-white">{creature.threatsEliminated}</Badge>
              </div>

              <div className="flex gap-1 pt-2">
                <Switch 
                  checked={creature.status === 'active' || creature.status === 'defending'}
                  onCheckedChange={() => toggleCreatureStatus(creature.id)}
                />
                <Button 
                  size="sm" 
                  variant="outline" 
                  onClick={() => resetCreatureStats(creature.id)}
                  className="flex-1 text-xs"
                >
                  <RotateCcw className="h-3 w-3 mr-1" />
                  Reset
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Army Manifesto */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <CardContent className="pt-6 text-center">
          <div className="text-6xl mb-4">🛡️</div>
          <h3 className="text-2xl font-bold text-green-400 mb-4">
            LEGENDARY DEFENSE ARMY MANIFESTO
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-200">
            <div className="space-y-2">
              <div>🐉 <strong>Alpha Dragon:</strong> Ultimate guardian with quantum fire breath</div>
              <div>🦅 <strong>Sky Eagle:</strong> Aerial surveillance from space to ground</div>
              <div>🐺 <strong>Pack Wolf:</strong> Coordinates army-wide threat responses</div>
              <div>🦁 <strong>King Lion:</strong> Royal protector with paralyzing roar</div>
            </div>
            <div className="space-y-2">
              <div>🐒 <strong>7 AI Monkeys:</strong> Code analysis and network protection</div>
              <div>⚡ <strong>Combined Power:</strong> Over 1 million defense points</div>
              <div>🎯 <strong>24/7 Active:</strong> Never sleeping, always protecting</div>
              <div>🌍 <strong>Global Coverage:</strong> Defending worldwide systems</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
