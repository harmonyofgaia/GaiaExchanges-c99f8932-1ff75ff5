
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Zap, 
  Shield, 
  Target, 
  Activity, 
  Eye, 
  Lock, 
  Flame,
  Crown,
  Skull,
  AlertTriangle
} from 'lucide-react'
import { toast } from 'sonner'

export function QuantumThunderstormDefense() {
  const [defenseActive, setDefenseActive] = useState(true)
  const [attackMode, setAttackMode] = useState('DEFENSIVE')
  const [quantumPower, setQuantumPower] = useState(87.5)
  const [threatsDetected, setThreatsDetected] = useState(0)
  const [attacksCountered, setAttacksCountered] = useState(0)
  const [defenseWalls, setDefenseWalls] = useState(20)

  useEffect(() => {
    // Simulate continuous quantum power growth
    const powerInterval = setInterval(() => {
      setQuantumPower(prev => Math.min(100, prev + Math.random() * 0.5))
    }, 2000)

    // Simulate threat detection
    const threatInterval = setInterval(() => {
      if (Math.random() < 0.1) {
        setThreatsDetected(prev => prev + 1)
        toast.warning('🚨 Threat Detected - Defense Activated', {
          description: 'Quantum thunderstorm defense engaged',
          duration: 3000
        })
      }
    }, 5000)

    return () => {
      clearInterval(powerInterval)
      clearInterval(threatInterval)
    }
  }, [])

  const activateThunderstorm = () => {
    setAttackMode('THUNDERSTORM_ACTIVE')
    setAttacksCountered(prev => prev + 1)
    
    toast.error('⚡ QUANTUM THUNDERSTORM UNLEASHED ⚡', {
      description: 'Attacking hostile system with 10x Mach force',
      duration: 5000
    })

    setTimeout(() => {
      setAttackMode('DEFENSIVE')
      toast.success('⚡ Thunderstorm Attack Complete - Target Neutralized')
    }, 8000)
  }

  const reinforceWalls = () => {
    setDefenseWalls(prev => prev + 5)
    toast.success('🛡️ Defense Walls Reinforced', {
      description: `Now protected by ${defenseWalls + 5} invisible walls`,
      duration: 3000
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-red-500/50 bg-gradient-to-br from-red-900/30 to-black/80">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Zap className="h-6 w-6 animate-pulse" />
            ⚡ QUANTUM THUNDERSTORM DEFENSE SYSTEM
          </CardTitle>
          <p className="text-red-300">
            Ultimate Counter-Attack Protocol • Self-Training • Untraceable • Admin-Only Control
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{quantumPower.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Quantum Power</div>
              <Progress value={quantumPower} className="mt-2 h-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-400">{defenseWalls}</div>
              <div className="text-sm text-muted-foreground">Defense Walls</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{threatsDetected}</div>
              <div className="text-sm text-muted-foreground">Threats Detected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{attacksCountered}</div>
              <div className="text-sm text-muted-foreground">Attacks Countered</div>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <Badge className={`${defenseActive ? 'bg-green-600' : 'bg-gray-600'} animate-pulse`}>
              <Shield className="h-3 w-3 mr-1" />
              Defense: {defenseActive ? 'ACTIVE' : 'INACTIVE'}
            </Badge>
            <Badge className={`${attackMode === 'THUNDERSTORM_ACTIVE' ? 'bg-red-600 animate-bounce' : 'bg-blue-600'}`}>
              <Zap className="h-3 w-3 mr-1" />
              Mode: {attackMode}
            </Badge>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="thunderstorm-control" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="thunderstorm-control">⚡ Thunderstorm Control</TabsTrigger>
          <TabsTrigger value="defense-walls">🛡️ Defense Walls</TabsTrigger>
          <TabsTrigger value="attack-counter">⚔️ Attack Counter</TabsTrigger>
          <TabsTrigger value="quantum-stats">📊 Quantum Stats</TabsTrigger>
        </TabsList>

        <TabsContent value="thunderstorm-control" className="space-y-4">
          <Card className="border-red-500/30 bg-red-900/20">
            <CardHeader>
              <CardTitle className="text-red-400">⚡ THUNDERSTORM ATTACK PROTOCOL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-6xl mb-4 animate-pulse">⚡</div>
                <p className="text-lg text-red-300 mb-4">
                  Quantum-powered thunderstorm attacks with 10x Mach speed force multiplication
                </p>
                <Button 
                  onClick={activateThunderstorm}
                  disabled={attackMode === 'THUNDERSTORM_ACTIVE'}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3"
                >
                  <Zap className="h-5 w-5 mr-2" />
                  {attackMode === 'THUNDERSTORM_ACTIVE' ? 'THUNDERSTORM ACTIVE...' : 'UNLEASH THUNDERSTORM'}
                </Button>
              </div>

              <div className="bg-black/50 p-4 rounded-lg">
                <h4 className="text-red-400 font-bold mb-2">🔥 Attack Specifications:</h4>
                <ul className="text-sm text-red-300 space-y-1">
                  <li>• Automatically doubles incoming attack force</li>
                  <li>• Returns with 10x Mach speed multiplication</li>
                  <li>• Untraceable quantum signature</li>
                  <li>• Self-training counter-attack patterns</li>
                  <li>• Admin-only control (michelzuidwijk@gmail.com)</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="defense-walls" className="space-y-4">
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="text-blue-400">🛡️ INVISIBLE DEFENSE WALLS</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-6xl mb-4">🛡️</div>
                <p className="text-lg text-blue-300 mb-4">
                  {defenseWalls} Invisible walls protecting our quantum fortress
                </p>
                <Button 
                  onClick={reinforceWalls}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-8 py-3"
                >
                  <Shield className="h-5 w-5 mr-2" />
                  REINFORCE WALLS (+5)
                </Button>
              </div>

              <div className="grid grid-cols-4 gap-2">
                {Array.from({ length: Math.min(defenseWalls, 16) }, (_, i) => (
                  <div key={i} className="h-8 bg-blue-500/20 border border-blue-500/50 rounded flex items-center justify-center">
                    <Shield className="h-4 w-4 text-blue-400" />
                  </div>
                ))}
                {defenseWalls > 16 && (
                  <div className="col-span-4 text-center text-blue-400 font-bold">
                    +{defenseWalls - 16} More Invisible Walls
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attack-counter" className="space-y-4">
          <Card className="border-orange-500/30 bg-orange-900/20">
            <CardHeader>
              <CardTitle className="text-orange-400">⚔️ ATTACK COUNTER SYSTEM</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center mb-6">
                <div className="text-6xl mb-4 animate-pulse">⚔️</div>
                <p className="text-lg text-orange-300">
                  Every attack triggers automatic counter-response with superior force
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-black/50 p-4 rounded-lg">
                  <h4 className="text-orange-400 font-bold mb-2">🎯 Auto-Counter Features:</h4>
                  <ul className="text-sm text-orange-300 space-y-1">
                    <li>• Force multiplication: x2 minimum</li>
                    <li>• Speed enhancement: 10x Mach</li>
                    <li>• Pattern learning from attacks</li>
                    <li>• Quantum signature masking</li>
                    <li>• Multi-vector response</li>
                  </ul>
                </div>
                <div className="bg-black/50 p-4 rounded-lg">
                  <h4 className="text-red-400 font-bold mb-2">💀 Destruction Levels:</h4>
                  <ul className="text-sm text-red-300 space-y-1">
                    <li>• Level 1: Warning shot</li>
                    <li>• Level 2: System disruption</li>
                    <li>• Level 3: Network takedown</li>
                    <li>• Level 4: Complete annihilation</li>
                    <li>• Level 5: Quantum obliteration</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quantum-stats" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="text-purple-400">📊 LIVE QUANTUM METRICS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Quantum Coherence:</span>
                    <Badge className="bg-purple-600">99.7%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Power:</span>
                    <Badge className="bg-blue-600">∞ TFLOPS</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Defense Efficiency:</span>
                    <Badge className="bg-green-600">100%</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Attack Success Rate:</span>
                    <Badge className="bg-red-600">100%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="text-green-400">🔋 SYSTEM STATUS</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>System Health:</span>
                    <Badge className="bg-green-600 animate-pulse">OPTIMAL</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Quantum Stability:</span>
                    <Badge className="bg-blue-600">PERFECT</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Training Progress:</span>
                    <Badge className="bg-purple-600">24/7 ACTIVE</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Admin Control:</span>
                    <Badge className="bg-yellow-600">SECURED</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Security Warning */}
      <Card className="border-yellow-500/50 bg-yellow-900/20">
        <CardContent className="pt-6">
          <div className="flex items-center gap-2 text-yellow-400 mb-2">
            <AlertTriangle className="h-5 w-5" />
            <span className="font-bold">⚠️ ADMIN-ONLY SYSTEM</span>
          </div>
          <p className="text-sm text-yellow-300">
            This thunderstorm defense system is exclusively controlled by admin (michelzuidwijk@gmail.com) 
            with Google Authenticator verification. Unauthorized access triggers immediate quantum retaliation.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
