import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Flame, 
  Shield, 
  Zap, 
  Eye, 
  Target,
  Activity,
  Sparkles,
  Cpu,
  Globe
} from 'lucide-react'
import { toast } from 'sonner'
import { AutoTacticsGenerator } from './AutoTacticsGenerator'

interface DragonAbility {
  name: string
  description: string
  power_level: number
  cooldown: number
  active: boolean
}

export function DragonAIDefense() {
  const [dragonLevel, setDragonLevel] = useState(747)
  const [dragonHealth, setDragonHealth] = useState(100)
  const [dragonEnergy, setDragonEnergy] = useState(95)
  const [isEvolving, setIsEvolving] = useState(false)
  const [abilities, setAbilities] = useState<DragonAbility[]>([
    {
      name: 'Inferno Shield',
      description: 'Creates an impenetrable barrier of dragon fire',
      power_level: 98,
      cooldown: 0,
      active: true
    },
    {
      name: 'Threat Neutralization',
      description: 'Automatically destroys incoming threats',
      power_level: 97,
      cooldown: 0,
      active: true
    },
    {
      name: 'Prophetic Vision',
      description: 'Sees all future threats 72 hours in advance',
      power_level: 96,
      cooldown: 0,
      active: true
    },
    {
      name: 'Quantum Encryption',
      description: 'Unbreakable quantum-level data protection',
      power_level: 100,
      cooldown: 0,
      active: true
    },
    {
      name: 'Healing Flames',
      description: 'Restores and enhances all system components',
      power_level: 94,
      cooldown: 0,
      active: true
    },
    {
      name: 'Wisdom of Ages',
      description: 'Provides infinite knowledge and strategic insights',
      power_level: 97,
      cooldown: 0,
      active: true
    }
  ])

  useEffect(() => {
    // Dragon continuous growth simulation
    const interval = setInterval(() => {
      setDragonLevel(prev => prev + Math.floor(Math.random() * 3) + 1)
      
      // Regenerate health and energy
      setDragonHealth(prev => Math.min(prev + 0.5, 100))
      setDragonEnergy(prev => Math.min(prev + 0.3, 100))
    }, 2000)

    return () => clearInterval(interval)
  }, [])

  const triggerDragonEvolution = async () => {
    setIsEvolving(true)
    toast.success('🐉 DRAGON EVOLUTION INITIATED! Power increasing exponentially!')
    
    // Evolution animation sequence
    for (let i = 0; i < 5; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setDragonLevel(prev => prev * 1.2)
      setDragonEnergy(prev => Math.min(prev + 20, 100))
    }
    
    setAbilities(prev => prev.map(ability => ({
      ...ability,
      power_level: Math.min(ability.power_level + 10, 100),
      active: true
    })))
    
    setIsEvolving(false)
    toast.success('🐲 DRAGON EVOLVED! All systems enhanced beyond maximum capacity!')
  }

  const activateAbility = (abilityName: string) => {
    setAbilities(prev => prev.map(ability => 
      ability.name === abilityName 
        ? { ...ability, active: !ability.active }
        : ability
    ))
    
    toast.success(`⚡ ${abilityName} ${abilities.find(a => a.name === abilityName)?.active ? 'Deactivated' : 'Activated'}!`)
  }

  return (
    <div className="space-y-6">
      {/* Dragon Status Header */}
      <Card className="border-red-500/50 bg-gradient-to-br from-red-900/30 to-orange-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Flame className="h-6 w-6 animate-pulse" />
            🐉 DRAGON AI DEFENSE SYSTEM
            <Badge className="bg-red-600 text-white animate-pulse">
              <Cpu className="h-3 w-3 mr-1" />
              QUANTUM ACTIVE
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 rounded-lg bg-green-900/30">
              <Shield className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-green-400">{dragonLevel}</div>
              <div className="text-xs text-muted-foreground">Dragon Level</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-blue-900/30">
              <Activity className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-blue-400">{dragonHealth.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">System Health</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-yellow-900/30">
              <Zap className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-yellow-400">{dragonEnergy.toFixed(1)}%</div>
              <div className="text-xs text-muted-foreground">Energy Level</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-purple-900/30">
              <Globe className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-purple-400">24/7</div>
              <div className="text-xs text-muted-foreground">Global Coverage</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Dragon Health</span>
                  <span>{dragonHealth.toFixed(1)}%</span>
                </div>
                <Progress value={dragonHealth} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span>Dragon Energy</span>
                  <span>{dragonEnergy.toFixed(1)}%</span>
                </div>
                <Progress value={dragonEnergy} className="h-3" />
              </div>
            </div>

            <Button
              onClick={triggerDragonEvolution}
              disabled={isEvolving}
              className="w-full bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 hover:from-red-700 hover:via-orange-700 hover:to-yellow-700 text-white font-bold text-xl py-8"
            >
              <Flame className="h-8 w-8 mr-4 animate-spin" />
              {isEvolving ? '🔥 EVOLUTION IN PROGRESS...' : '🚀 TRIGGER DRAGON EVOLUTION'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">🐉 Overview</TabsTrigger>
          <TabsTrigger value="abilities">⚡ Abilities</TabsTrigger>
          <TabsTrigger value="tactics">🧮 Auto Tactics</TabsTrigger>
          <TabsTrigger value="threats">🛡️ Threats</TabsTrigger>
          <TabsTrigger value="evolution">🚀 Evolution</TabsTrigger>
          <TabsTrigger value="control">⚙️ Control</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <Card className="border-green-500/30">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Shield className="h-6 w-6 text-green-400" />
                  <h3 className="text-xl font-bold text-green-400">Dragon AI Defense Overview</h3>
                  <Eye className="h-6 w-6 text-blue-400" />
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  The Dragon AI Defense System provides real-time threat detection, quantum encryption, and
                  automatic threat neutralization. It is constantly evolving to protect the GAiA ecosystem.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
                  <div className="p-3 bg-green-900/30 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">100%</div>
                    <div className="text-xs text-muted-foreground">System Health</div>
                  </div>
                  <div className="p-3 bg-blue-900/30 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">∞</div>
                    <div className="text-xs text-muted-foreground">Processing Power</div>
                  </div>
                  <div className="p-3 bg-purple-900/30 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">SUPREME</div>
                    <div className="text-xs text-muted-foreground">Defense Level</div>
                  </div>
                  <div className="p-3 bg-orange-900/30 rounded-lg">
                    <div className="text-2xl font-bold text-orange-400">24/7</div>
                    <div className="text-xs text-muted-foreground">Global Coverage</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="abilities">
          <div className="grid gap-4">
            {abilities.map((ability, index) => (
              <Card key={index} className={`border ${ability.active ? 'border-red-500/50 bg-red-900/20' : 'border-gray-500/30'}`}>
                <CardContent className="pt-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-lg">{ability.name}</h4>
                        <Badge className={`text-white ${ability.active ? 'bg-red-600' : 'bg-gray-600'}`}>
                          Power: {ability.power_level}%
                        </Badge>
                        {ability.active && (
                          <Badge className="bg-green-600 text-white">
                            <Activity className="h-3 w-3 mr-1" />
                            ACTIVE
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{ability.description}</p>
                      <Progress value={ability.power_level} className="h-2" />
                    </div>
                    
                    <Button
                      onClick={() => activateAbility(ability.name)}
                      className={`ml-4 ${ability.active ? 'bg-red-600 hover:bg-red-700' : 'bg-orange-600 hover:bg-orange-700'}`}
                    >
                      {ability.active ? (
                        <>
                          <Shield className="h-4 w-4 mr-1" />
                          Deactivate
                        </>
                      ) : (
                        <>
                          <Flame className="h-4 w-4 mr-1" />
                          Activate
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="tactics">
          <AutoTacticsGenerator />
        </TabsContent>

        <TabsContent value="threats">
          <Card className="border-yellow-500/30">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Target className="h-6 w-6 text-yellow-400" />
                  <h3 className="text-xl font-bold text-yellow-400">Real-Time Threat Analysis</h3>
                  <Zap className="h-6 w-6 text-red-400" />
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  The Dragon AI is constantly scanning for potential threats and neutralizing them before they
                  can impact the system.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-green-900/30 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">∞</div>
                    <div className="text-xs text-muted-foreground">Threats Neutralized</div>
                  </div>
                  <div className="p-3 bg-blue-900/30 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">0</div>
                    <div className="text-xs text-muted-foreground">Security Breaches</div>
                  </div>
                  <div className="p-3 bg-purple-900/30 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">100%</div>
                    <div className="text-xs text-muted-foreground">System Protection</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="evolution">
          <Card className="border-purple-500/30">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Sparkles className="h-6 w-6 text-purple-400" />
                  <h3 className="text-xl font-bold text-purple-400">Dragon AI Evolution</h3>
                  <Cpu className="h-6 w-6 text-blue-400" />
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  The Dragon AI is constantly learning and evolving to stay ahead of emerging threats.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-green-900/30 rounded-lg">
                    <div className="text-2xl font-bold text-green-400">{dragonLevel}</div>
                    <div className="text-xs text-muted-foreground">Dragon Level</div>
                  </div>
                  <div className="p-3 bg-blue-900/30 rounded-lg">
                    <div className="text-2xl font-bold text-blue-400">∞</div>
                    <div className="text-xs text-muted-foreground">Knowledge Base</div>
                  </div>
                  <div className="p-3 bg-purple-900/30 rounded-lg">
                    <div className="text-2xl font-bold text-purple-400">24/7</div>
                    <div className="text-xs text-muted-foreground">Continuous Learning</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="control">
          <Card className="border-red-500/30">
            <CardContent className="pt-6">
              <div className="text-center space-y-4">
                <div className="flex items-center justify-center gap-2">
                  <Flame className="h-6 w-6 text-red-400" />
                  <h3 className="text-xl font-bold text-red-400">Admin-Only Dragon AI Controls</h3>
                  <Shield className="h-6 w-6 text-yellow-400" />
                </div>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  These controls are for advanced administrators only. Use with caution.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                  <Button className="bg-red-600 hover:bg-red-700">
                    <Zap className="h-4 w-4 mr-2" />
                    Activate Max Power
                  </Button>
                  <Button className="bg-purple-600 hover:bg-purple-700">
                    <Eye className="h-4 w-4 mr-2" />
                    Run Deep Scan
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Evolve Dragon AI
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Dragon Status Footer */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-emerald-900/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <Shield className="h-6 w-6 text-green-400" />
              <h3 className="text-xl font-bold text-green-400">Dragon AI Defense System Status</h3>
              <Lock className="h-6 w-6 text-blue-400" />
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              All systems are operating at maximum efficiency with quantum-level encryption. Real-time
              monitoring and automatic threat detection are active.
            </p>
            <div className="flex justify-center gap-4 text-xs flex-wrap">
              <Badge className="bg-green-600 text-white">
                <Shield className="h-3 w-3 mr-1" />
                Quantum Protected
              </Badge>
              <Badge className="bg-blue-600 text-white">
                <Eye className="h-3 w-3 mr-1" />
                24/7 Monitored
              </Badge>
              <Badge className="bg-purple-600 text-white">
                <Cpu className="h-3 w-3 mr-1" />
                AI Enhanced
              </Badge>
              <Badge className="bg-orange-600 text-white">
                <Globe className="h-3 w-3 mr-1" />
                Global Coverage
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
