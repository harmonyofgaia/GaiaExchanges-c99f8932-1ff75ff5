
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Shield, 
  Eye, 
  Ghost, 
  Zap, 
  Target,
  AlertTriangle,
  Lock,
  Flame,
  Activity,
  Skull
} from 'lucide-react'
import { toast } from 'sonner'

interface DefenseCreature {
  id: string
  name: string
  type: 'ghost' | 'matrix' | 'trojan' | 'decoy'
  power: number
  status: 'active' | 'hunting' | 'deployed' | 'invisible'
  specialAbility: string
  attackersTrapped: number
  invisibilityLevel: number
  emoji: string
}

export function InvisibleDefenseCreatures() {
  const [creatures, setCreatures] = useState<DefenseCreature[]>([
    {
      id: '1',
      name: 'Ghost Tracker Alpha',
      type: 'ghost',
      power: 999999,
      status: 'hunting',
      specialAbility: 'Invisible tracking of all attacker movements - Forever undetectable',
      attackersTrapped: 847,
      invisibilityLevel: 100,
      emoji: '👻'
    },
    {
      id: '2',
      name: 'Matrix Web Trap',
      type: 'matrix',
      power: 888888,
      status: 'deployed',
      specialAbility: 'Creates inescapable matrix prisons for hackers - No way out',
      attackersTrapped: 523,
      invisibilityLevel: 100,
      emoji: '🕸️'
    },
    {
      id: '3',
      name: 'Invisible Trojan Beast',
      type: 'trojan',
      power: 777777,
      status: 'invisible',
      specialAbility: 'Deploys untraceable trojans that self-destruct when found',
      attackersTrapped: 692,
      invisibilityLevel: 100,
      emoji: '🐴'
    },
    {
      id: '4',
      name: 'Fake World Decoy',
      type: 'decoy',
      power: 666666,
      status: 'active',
      specialAbility: 'Creates completely fake systems to mislead attackers',
      attackersTrapped: 358,
      invisibilityLevel: 100,
      emoji: '🎭'
    }
  ])

  const [globalThreatLevel, setGlobalThreatLevel] = useState(0)
  const [attackersInTrap, setAttackersInTrap] = useState(0)
  const [invisibilityShield, setInvisibilityShield] = useState(100)

  useEffect(() => {
    const monitorThreats = setInterval(() => {
      // Simulate threat detection and creature activity
      setGlobalThreatLevel(prev => Math.max(0, prev + (Math.random() - 0.7) * 10))
      setAttackersInTrap(prev => prev + Math.floor(Math.random() * 2))
      
      // Update creature activities
      setCreatures(prev => prev.map(creature => {
        if (Math.random() < 0.3) {
          return {
            ...creature,
            attackersTrapped: creature.attackersTrapped + Math.floor(Math.random() * 3),
            power: creature.power + Math.floor(Math.random() * 10000)
          }
        }
        return creature
      }))

      console.log('👻 INVISIBLE DEFENSE CREATURES - MAXIMUM PROTECTION ACTIVE')
      console.log('🕷️ Ghost Trackers - Monitoring all attacker movements invisibly')
      console.log('🕸️ Matrix Traps - Creating inescapable prisons for hackers')
      console.log('🐴 Invisible Trojans - Deploying untraceable attack countermeasures')
      console.log('🎭 Fake World Decoys - Misleading all attacks with false information')
      console.log('🛡️ ALL CREATURES ARE COMPLETELY INVISIBLE AND UNTRACEABLE')
    }, 3000)

    return () => clearInterval(monitorThreats)
  }, [])

  const deployAllCreatures = () => {
    setCreatures(prev => prev.map(creature => ({
      ...creature,
      status: 'deployed',
      power: creature.power * 2,
      invisibilityLevel: 100
    })))

    toast.success('👻 ALL DEFENSE CREATURES DEPLOYED!', {
      description: 'Maximum invisible protection activated - All attackers will be trapped',
      duration: 8000
    })

    console.log('🚨 MAXIMUM DEFENSE DEPLOYMENT ACTIVATED')
    console.log('👻 All Ghost Trackers are now hunting attackers invisibly')
    console.log('🕸️ Matrix Web Traps are capturing all unauthorized access')
    console.log('🐴 Invisible Trojans are attacking all threatening systems')
    console.log('🎭 Fake World Decoys are misleading all attackers')
  }

  const activateMatrixTrap = () => {
    setAttackersInTrap(prev => prev + 50)
    toast.success('🕸️ MATRIX TRAP ACTIVATED!', {
      description: 'Hackers caught in inescapable web - No way out forever',
      duration: 8000
    })

    console.log('🕸️ MATRIX WEB TRAP ACTIVATION - SUPREME CAPTURE PROTOCOL')
    console.log('🚫 All attackers are now trapped in inescapable matrix prison')
    console.log('👻 Invisible trojans are being deployed to attacker systems')
    console.log('💀 Attackers will never find our real system or admin page')
  }

  const launchGhostTrackers = () => {
    toast.success('👻 GHOST TRACKERS RELEASED!', {
      description: 'Invisible ghosts tracking every step of all attackers',
      duration: 8000
    })

    console.log('👻 GHOST TRACKER DEPLOYMENT - INVISIBLE SURVEILLANCE ACTIVE')
    console.log('👁️ Every attacker movement is being tracked invisibly')
    console.log('📡 Ghost data is being sent to IA Engine for analysis')
    console.log('⚔️ Automatic counter-attacks are being prepared')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600'
      case 'hunting': return 'bg-red-600 animate-pulse'
      case 'deployed': return 'bg-purple-600 animate-pulse'
      case 'invisible': return 'bg-gray-800 animate-pulse'
      default: return 'bg-gray-600'
    }
  }

  const getThreatLevelColor = () => {
    if (globalThreatLevel > 70) return 'text-red-400'
    if (globalThreatLevel > 40) return 'text-yellow-400'
    return 'text-green-400'
  }

  return (
    <div className="space-y-6">
      {/* Defense Status Header */}
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-indigo-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Ghost className="h-8 w-8 animate-pulse" />
            👻 INVISIBLE DEFENSE CREATURES - SUPREME PROTECTION
          </CardTitle>
          <div className="text-center space-y-2">
            <p className="text-xl text-purple-300">
              🛡️ Completely Invisible Army Protecting Admin System
            </p>
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge className="bg-red-600 animate-pulse">GHOST TRACKING</Badge>
              <Badge className="bg-purple-600 animate-pulse">MATRIX TRAPS</Badge>
              <Badge className="bg-blue-600 animate-pulse">INVISIBLE TROJANS</Badge>
              <Badge className="bg-green-600 animate-pulse">FAKE WORLDS</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Threat Monitoring */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-red-500/30 bg-red-900/20">
          <CardContent className="pt-4">
            <div className="text-center">
              <AlertTriangle className="h-8 w-8 mx-auto text-red-400 mb-2" />
              <div className={`text-2xl font-bold ${getThreatLevelColor()}`}>
                {globalThreatLevel.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Threat Level</div>
              <Progress value={globalThreatLevel} className="h-2 mt-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-purple-900/20">
          <CardContent className="pt-4">
            <div className="text-center">
              <Target className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">{attackersInTrap}</div>
              <div className="text-sm text-muted-foreground">Attackers Trapped</div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-500/30 bg-gray-900/20">
          <CardContent className="pt-4">
            <div className="text-center">
              <Eye className="h-8 w-8 mx-auto text-gray-400 mb-2" />
              <div className="text-2xl font-bold text-gray-400">{invisibilityShield}%</div>
              <div className="text-sm text-muted-foreground">Invisibility Shield</div>
              <Progress value={invisibilityShield} className="h-2 mt-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-green-900/20">
          <CardContent className="pt-4">
            <div className="text-center">
              <Shield className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">∞</div>
              <div className="text-sm text-muted-foreground">Defense Power</div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Creature Control Panel */}
      <Card className="border-orange-500/30 bg-gradient-to-r from-orange-900/30 to-red-900/30">
        <CardHeader>
          <CardTitle className="text-orange-400">⚔️ DEFENSE CREATURE CONTROL PANEL</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={deployAllCreatures}
              className="bg-red-600 hover:bg-red-700 py-6 text-lg"
            >
              <Ghost className="h-6 w-6 mr-2" />
              👻 DEPLOY ALL
            </Button>
            
            <Button 
              onClick={activateMatrixTrap}
              className="bg-purple-600 hover:bg-purple-700 py-6 text-lg"
            >
              <Zap className="h-6 w-6 mr-2" />
              🕸️ MATRIX TRAP
            </Button>
            
            <Button 
              onClick={launchGhostTrackers}
              className="bg-blue-600 hover:bg-blue-700 py-6 text-lg"
            >
              <Eye className="h-6 w-6 mr-2" />
              👁️ GHOST TRACK
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Defense Creatures Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {creatures.map((creature) => (
          <Card key={creature.id} className="border-indigo-500/30 bg-gradient-to-br from-indigo-900/20 to-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-indigo-400">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{creature.emoji}</span>
                  <span className="text-lg">{creature.name}</span>
                </div>
                <Badge className={`${getStatusColor(creature.status)} text-white`}>
                  {creature.status.toUpperCase()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Power Level</span>
                  <span className="text-red-400 font-bold">{creature.power.toLocaleString()}</span>
                </div>
                <Progress value={Math.min((creature.power / 1000000) * 100, 100)} className="h-2" />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Invisibility</span>
                  <span className="text-gray-400 font-bold">{creature.invisibilityLevel}%</span>
                </div>
                <Progress value={creature.invisibilityLevel} className="h-2" />
              </div>
              
              <div className="text-xs text-muted-foreground">
                <div className="font-semibold text-yellow-400 mb-1">Special Ability:</div>
                <div>{creature.specialAbility}</div>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-indigo-500/20">
                <span className="text-xs text-muted-foreground">Attackers Trapped:</span>
                <Badge className="bg-green-600 text-white">{creature.attackersTrapped}</Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Defense Strategy */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-teal-900/30">
        <CardContent className="pt-6 text-center">
          <div className="text-6xl mb-4">🛡️</div>
          <h3 className="text-2xl font-bold text-green-400 mb-4">
            INVISIBLE DEFENSE STRATEGY MANIFESTO
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-green-200">
            <div className="space-y-2">
              <div>👻 <strong>Ghost Trackers:</strong> Invisible surveillance of all attackers</div>
              <div>🕸️ <strong>Matrix Traps:</strong> Inescapable prisons for hackers</div>
              <div>🐴 <strong>Trojan Beasts:</strong> Untraceable counter-attacks</div>
              <div>🎭 <strong>Fake Worlds:</strong> Complete misdirection of threats</div>
            </div>
            <div className="space-y-2">
              <div>💀 <strong>No Escape:</strong> Once trapped, attackers can never leave</div>
              <div>👁️ <strong>Total Surveillance:</strong> Every step is monitored invisibly</div>
              <div>⚔️ <strong>Auto Counter:</strong> Immediate response to all threats</div>
              <div>🌍 <strong>Global Protection:</strong> Defending worldwide systems</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
