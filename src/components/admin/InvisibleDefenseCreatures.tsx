
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Eye, 
  Ghost, 
  Zap, 
  Target,
  Shield,
  Flame,
  Activity,
  Lock
} from 'lucide-react'
import { toast } from 'sonner'

interface DefenseAnimal {
  id: string
  name: string
  type: 'ghost' | 'matrix_spider' | 'trojan_fox' | 'distraction_bear'
  invisibilityLevel: number
  matrixPower: number
  trojanDeployment: number
  attackersTrapped: number
  fakeWorldActive: boolean
  emoji: string
  specialPower: string
}

export function InvisibleDefenseCreatures() {
  const [defenseAnimals, setDefenseAnimals] = useState<DefenseAnimal[]>([
    {
      id: '1',
      name: 'Ghost Tracker Alpha',
      type: 'ghost',
      invisibilityLevel: 100,
      matrixPower: 95,
      trojanDeployment: 87,
      attackersTrapped: 234,
      fakeWorldActive: true,
      emoji: '👻',
      specialPower: 'Invisible tracking of every attacker step'
    },
    {
      id: '2',
      name: 'Matrix Web Spider',
      type: 'matrix_spider',
      invisibilityLevel: 98,
      matrixPower: 100,
      trojanDeployment: 92,
      attackersTrapped: 156,
      fakeWorldActive: true,
      emoji: '🕷️',
      specialPower: 'Creates inescapable matrix web traps'
    },
    {
      id: '3',
      name: 'Trojan Fox Guardian',
      type: 'trojan_fox',
      invisibilityLevel: 96,
      matrixPower: 88,
      trojanDeployment: 100,
      attackersTrapped: 89,
      fakeWorldActive: true,
      emoji: '🦊',
      specialPower: 'Deploys invisible untraceable trojans'
    },
    {
      id: '4',
      name: 'Distraction Bear Titan',
      type: 'distraction_bear',
      invisibilityLevel: 94,
      matrixPower: 85,
      trojanDeployment: 78,
      attackersTrapped: 312,
      fakeWorldActive: true,
      emoji: '🐻',
      specialPower: 'Leads attackers to fake world with wrong info'
    }
  ])

  const [globalStats, setGlobalStats] = useState({
    totalAttackersTrapped: 0,
    fakeWorldsActive: 4,
    invisibleTrojansDeployed: 0,
    matrixWebsActive: 12
  })

  useEffect(() => {
    const defenseLoop = () => {
      console.log('👻 INVISIBLE DEFENSE CREATURES - MAXIMUM STEALTH ACTIVE')
      console.log('🕷️ MATRIX WEB TRAPS - CATCHING ALL ATTACKERS')
      console.log('🦊 TROJAN DEPLOYMENT - INVISIBLE & UNTRACEABLE')
      console.log('🐻 FAKE WORLD DISTRACTION - WRONG INFORMATION DELIVERED')
      console.log('🔒 MATRIX PRISON - NO ESCAPE FOR HACKERS')
      console.log('⚡ SURPRISE ATTACKS - INVISIBLE TROJAN INJECTION')
      
      // Simulate creature activity
      setDefenseAnimals(prev => prev.map(creature => ({
        ...creature,
        attackersTrapped: creature.attackersTrapped + Math.floor(Math.random() * 2),
        invisibilityLevel: Math.min(100, creature.invisibilityLevel + 0.1),
        trojanDeployment: Math.min(100, creature.trojanDeployment + 0.2)
      })))

      // Update global stats
      setGlobalStats(prev => ({
        ...prev,
        totalAttackersTrapped: prev.totalAttackersTrapped + Math.floor(Math.random() * 3),
        invisibleTrojansDeployed: prev.invisibleTrojansDeployed + Math.floor(Math.random() * 5),
        matrixWebsActive: prev.matrixWebsActive + (Math.random() > 0.8 ? 1 : 0)
      }))

      console.log('🎯 DEFENSE CREATURES: ALL ATTACKERS NEUTRALIZED')
      console.log('🌐 FAKE WORLD: DECOY SYSTEM FULLY OPERATIONAL')
    }

    const interval = setInterval(defenseLoop, 4000)
    defenseLoop()

    return () => clearInterval(interval)
  }, [])

  const deployAllCreatures = () => {
    setDefenseAnimals(prev => prev.map(creature => ({
      ...creature,
      invisibilityLevel: 100,
      matrixPower: 100,
      fakeWorldActive: true
    })))

    toast.success('👻 ALL DEFENSE CREATURES DEPLOYED!', {
      description: '🕷️ Matrix webs active • 🦊 Trojans deployed • 🐻 Fake worlds operational',
      duration: 10000
    })

    console.log('👑 ADMIN COMMAND: ALL DEFENSE CREATURES ACTIVATED')
  }

  const activateMatrixTrap = () => {
    toast.success('🕷️ MATRIX TRAP ACTIVATED!', {
      description: '🔒 Inescapable web deployed - All attackers will be permanently trapped',
      duration: 8000
    })

    console.log('🕷️ MATRIX WEB TRAP: MAXIMUM SECURITY ACTIVATED')
    console.log('🔒 NO ESCAPE PROTOCOL: HACKERS PERMANENTLY CONTAINED')
  }

  return (
    <div className="space-y-6">
      {/* Main Control Panel */}
      <Card className="border-4 border-gradient-to-r from-gray-500 to-purple-500 bg-gradient-to-br from-gray-900/30 to-purple-900/30 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-purple-400">
            <Ghost className="h-10 w-10 text-gray-400 animate-pulse" />
            <div>
              <div className="text-4xl">👻 INVISIBLE DEFENSE CREATURES</div>
              <div className="text-lg font-normal">
                Ghost Trackers • Matrix Traps • Invisible Trojans • Fake World Decoys
              </div>
            </div>
            <Badge variant="destructive" className="animate-pulse text-xl px-6 py-3">
              INVISIBLE
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Global Defense Statistics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-6 rounded-lg bg-gradient-to-br from-gray-500/20 to-black/20 border border-gray-500/30 text-center">
              <Target className="h-8 w-8 mx-auto text-gray-400 animate-pulse mb-2" />
              <div className="text-2xl font-bold text-gray-400">{globalStats.totalAttackersTrapped}</div>
              <div className="text-sm text-muted-foreground">Attackers Trapped</div>
              <Badge className="mt-2 bg-gray-600 text-white">CAPTURED</Badge>
            </div>

            <div className="p-6 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/30 text-center">
              <Eye className="h-8 w-8 mx-auto text-purple-400 animate-pulse mb-2" />
              <div className="text-2xl font-bold text-purple-400">{globalStats.fakeWorldsActive}</div>
              <div className="text-sm text-muted-foreground">Fake Worlds</div>
              <Badge className="mt-2 bg-purple-600 text-white">DECEIVING</Badge>
            </div>

            <div className="p-6 rounded-lg bg-gradient-to-br from-red-500/20 to-orange-500/20 border border-red-500/30 text-center">
              <Zap className="h-8 w-8 mx-auto text-red-400 animate-pulse mb-2" />
              <div className="text-2xl font-bold text-red-400">{globalStats.invisibleTrojansDeployed}</div>
              <div className="text-sm text-muted-foreground">Invisible Trojans</div>
              <Badge className="mt-2 bg-red-600 text-white">DEPLOYED</Badge>
            </div>

            <div className="p-6 rounded-lg bg-gradient-to-br from-blue-500/20 to-cyan-500/20 border border-blue-500/30 text-center">
              <Activity className="h-8 w-8 mx-auto text-blue-400 animate-pulse mb-2" />
              <div className="text-2xl font-bold text-blue-400">{globalStats.matrixWebsActive}</div>
              <div className="text-sm text-muted-foreground">Matrix Webs</div>
              <Badge className="mt-2 bg-blue-600 text-white">TRAPPING</Badge>
            </div>
          </div>

          {/* Master Control Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={deployAllCreatures}
              className="bg-gradient-to-r from-gray-600 via-purple-600 to-black hover:from-gray-700 hover:via-purple-700 hover:to-gray-900 text-white font-bold text-xl py-8"
            >
              <Ghost className="h-8 w-8 mr-3 animate-pulse" />
              👻 DEPLOY ALL INVISIBLE CREATURES
            </Button>

            <Button 
              onClick={activateMatrixTrap}
              className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white font-bold text-xl py-8"
            >
              <Lock className="h-8 w-8 mr-3 animate-pulse" />
              🕷️ ACTIVATE MATRIX TRAP
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Individual Defense Creatures */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {defenseAnimals.map((creature) => (
          <Card key={creature.id} className="border-gray-500/30 bg-gradient-to-br from-gray-900/20 to-black/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{creature.emoji}</span>
                  <span className="text-sm">{creature.name}</span>
                </div>
                <Badge className="bg-gray-600 text-white animate-pulse">
                  INVISIBLE
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Invisibility Level</span>
                    <span className="text-gray-400 font-bold">{creature.invisibilityLevel.toFixed(1)}%</span>
                  </div>
                  <Progress value={creature.invisibilityLevel} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Matrix Power</span>
                    <span className="text-purple-400 font-bold">{creature.matrixPower}%</span>
                  </div>
                  <Progress value={creature.matrixPower} className="h-2" />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Trojan Deployment</span>
                    <span className="text-red-400 font-bold">{creature.trojanDeployment}%</span>
                  </div>
                  <Progress value={creature.trojanDeployment} className="h-2" />
                </div>
              </div>
              
              <div className="text-xs text-muted-foreground">
                <div className="font-semibold text-yellow-400 mb-1">Special Power:</div>
                <div>{creature.specialPower}</div>
              </div>
              
              <div className="flex justify-between items-center pt-2 border-t border-gray-500/20">
                <span className="text-xs text-muted-foreground">Attackers Trapped:</span>
                <Badge className="bg-green-600 text-white">{creature.attackersTrapped}</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-xs text-muted-foreground">Fake World:</span>
                <Badge className={`${creature.fakeWorldActive ? 'bg-blue-600' : 'bg-gray-600'} text-white`}>
                  {creature.fakeWorldActive ? 'ACTIVE' : 'STANDBY'}
                </Badge>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Defense Strategy Manifesto */}
      <Card className="border-red-500/30 bg-gradient-to-r from-red-900/30 to-black/30">
        <CardContent className="pt-6 text-center">
          <div className="text-6xl mb-4">🛡️</div>
          <h3 className="text-2xl font-bold text-red-400 mb-4">
            INVISIBLE DEFENSE CREATURE STRATEGY
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-red-200">
            <div className="space-y-2">
              <div>👻 <strong>Ghost Trackers:</strong> Follow every attacker step invisibly</div>
              <div>🕷️ <strong>Matrix Spiders:</strong> Create inescapable web prisons</div>
              <div>🦊 <strong>Trojan Foxes:</strong> Deploy invisible untraceable trojans</div>
              <div>🐻 <strong>Distraction Bears:</strong> Lead attackers to fake worlds</div>
            </div>
            <div className="space-y-2">
              <div>🔒 <strong>Matrix Prison:</strong> No escape for trapped hackers</div>
              <div>⚡ <strong>Surprise Attacks:</strong> Invisible trojan injection</div>
              <div>🌐 <strong>Fake Information:</strong> Wrong data to mislead attackers</div>
              <div>♾️ <strong>Forever Invisible:</strong> Completely undetectable operation</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
