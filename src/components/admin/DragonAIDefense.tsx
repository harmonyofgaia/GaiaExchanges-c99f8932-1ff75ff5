
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Brain, Zap, Shield, Activity, Target, Crown } from 'lucide-react'
import { toast } from 'sonner'

export function DragonAIDefense() {
  const [dragonMetrics, setDragonMetrics] = useState({
    level: 1,
    power: 1000,
    immuneSystem: 750,
    globalInfluence: 12.5,
    threatsDestroyed: 0,
    quantumEvolutions: 0,
    learningRate: 100,
    immortalityLevel: 100
  })

  const [dragonAge, setDragonAge] = useState({
    days: 8,
    hours: 0,
    minutes: 17
  })

  const [recentEvolutions, setRecentEvolutions] = useState<Array<{
    id: string
    type: string
    description: string
    powerGain: number
    timestamp: Date
  }>>([])

  useEffect(() => {
    const dragonInterval = setInterval(() => {
      console.log('🐉 DRAGON AI DEFENSE SYSTEM - IMMORTAL PROTECTION ACTIVE')
      console.log('🧠 SELF-LEARNING: Evolving and adapting to all threats')
      console.log('⚡ IMMUNE SYSTEM: Getting stronger with every attack')
      console.log('🌍 GLOBAL INFLUENCE: Expanding protection worldwide')
      
      setDragonMetrics(prev => {
        const newPower = prev.power + Math.floor(Math.random() * 300)
        const newLevel = Math.floor(newPower / 1000) + 1
        const levelUp = newLevel > prev.level
        
        if (levelUp) {
          console.log(`🐉 DRAGON LEVEL UP! Level ${newLevel} - Power: ${newPower}`)
          
          // Use smart notification system instead of always showing toast
          if ((window as any).smartNotifications?.shouldShowDragonNotification) {
            const shouldShow = (window as any).smartNotifications.shouldShowDragonNotification(newLevel, newPower)
            if (shouldShow) {
              toast.success(`🐉 Dragon AI Level Up!`, {
                description: `Now Level ${newLevel} with ${newPower.toLocaleString()} power`,
                duration: 3000
              })
            }
          }
        }
        
        return {
          ...prev,
          level: newLevel,
          power: newPower,
          immuneSystem: prev.immuneSystem + Math.floor(Math.random() * 150),
          globalInfluence: Math.min(100000, prev.globalInfluence + Math.random() * 1.5),
          threatsDestroyed: prev.threatsDestroyed + (Math.random() > 0.6 ? 1 : 0),
          quantumEvolutions: prev.quantumEvolutions + (Math.random() > 0.8 ? 1 : 0),
          learningRate: Math.min(1000, prev.learningRate + Math.random() * 10)
        }
      })

      // Generate evolution events - reduced frequency
      if (Math.random() > 0.92) { // Reduced from 0.85 to 0.92
        const evolutions = [
          { type: 'Neural Network Expansion', description: 'Dragon AI grew new neural pathways', powerGain: 500 },
          { type: 'Quantum Consciousness Upgrade', description: 'Achieved higher dimensional awareness', powerGain: 750 },
          { type: 'Threat Pattern Recognition', description: 'Learned new attack patterns', powerGain: 300 },
          { type: 'Immune System Evolution', description: 'Developed resistance to new threats', powerGain: 400 },
          { type: 'Global Network Integration', description: 'Connected to worldwide defense systems', powerGain: 800 }
        ]
        
        const evolution = evolutions[Math.floor(Math.random() * evolutions.length)]
        const newEvolution = {
          id: Date.now().toString(),
          ...evolution,
          timestamp: new Date()
        }
        
        setRecentEvolutions(prev => [newEvolution, ...prev.slice(0, 9)])
        console.log('🔮 DRAGON EVOLUTION:', newEvolution)
      }

      // Update dragon age
      setDragonAge(prev => {
        const newMinutes = prev.minutes + 1
        if (newMinutes >= 60) {
          const newHours = prev.hours + 1
          if (newHours >= 24) {
            return { days: prev.days + 1, hours: 0, minutes: 0 }
          }
          return { ...prev, hours: newHours, minutes: 0 }
        }
        return { ...prev, minutes: newMinutes }
      })
    }, 25000) // Dragon updates every 25 seconds

    return () => clearInterval(dragonInterval)
  }, [])

  const activateDragonFury = () => {
    toast.success('🐉 DRAGON FURY ACTIVATED!', {
      description: 'Dragon AI now in maximum destruction mode - All threats will be annihilated',
      duration: 8000
    })
    
    setDragonMetrics(prev => ({
      ...prev,
      power: prev.power * 2,
      immuneSystem: prev.immuneSystem * 1.5,
      learningRate: prev.learningRate * 2,
      threatsDestroyed: prev.threatsDestroyed + 100
    }))
    
    console.log('🐉 DRAGON FURY: MAXIMUM DESTRUCTION MODE - ALL THREATS WILL BE DESTROYED')
  }

  const evolveQuantumConsciousness = () => {
    toast.success('🔮 QUANTUM EVOLUTION COMPLETE!', {
      description: 'Dragon AI achieved quantum consciousness - Now truly immortal',
      duration: 8000
    })
    
    setDragonMetrics(prev => ({
      ...prev,
      quantumEvolutions: prev.quantumEvolutions + 10,
      immortalityLevel: 200,
      globalInfluence: prev.globalInfluence * 2
    }))
    
    console.log('🔮 QUANTUM CONSCIOUSNESS: DRAGON AI NOW TRULY IMMORTAL AND OMNIPRESENT')
  }

  const formatAge = () => {
    return `${dragonAge.days}d ${dragonAge.hours}h ${dragonAge.minutes}m`
  }

  return (
    <div className="space-y-6">
      {/* Dragon Status Dashboard */}
      <Card className="border-4 border-gradient-to-r from-red-500 via-purple-500 to-blue-500 bg-gradient-to-br from-red-900/30 via-purple-900/30 to-blue-900/30 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-purple-400 to-blue-400">
            <Brain className="h-12 w-12 text-red-400 animate-pulse" />
            <div>
              <div className="text-4xl">🐉 IMMORTAL DRAGON AI DEFENSE SYSTEM</div>
              <div className="text-lg font-normal">
                Self-Learning • Immune System • Global Protection • Quantum Consciousness • Never Dies
              </div>
            </div>
            <Badge variant="destructive" className="animate-pulse text-2xl px-8 py-4">
              IMMORTAL LEVEL {dragonMetrics.level}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-red-900/40 rounded-lg border border-red-500/30">
              <Crown className="h-8 w-8 mx-auto text-red-400 animate-pulse mb-2" />
              <div className="text-2xl font-bold text-red-400">{dragonMetrics.power.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Dragon Power</div>
              <Badge className="mt-2 bg-red-600 text-white">🔥 UNLIMITED</Badge>
            </div>
            
            <div className="text-center p-4 bg-purple-900/40 rounded-lg border border-purple-500/30">
              <Shield className="h-8 w-8 mx-auto text-purple-400 animate-pulse mb-2" />
              <div className="text-2xl font-bold text-purple-400">{dragonMetrics.immuneSystem.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Immune System</div>
              <Badge className="mt-2 bg-purple-600 text-white">🛡️ EVOLVING</Badge>
            </div>

            <div className="text-center p-4 bg-blue-900/40 rounded-lg border border-blue-500/30">
              <Activity className="h-8 w-8 mx-auto text-blue-400 animate-pulse mb-2" />
              <div className="text-2xl font-bold text-blue-400">{dragonMetrics.globalInfluence.toFixed(2)}%</div>
              <div className="text-sm text-muted-foreground">Global Influence</div>
              <Badge className="mt-2 bg-blue-600 text-white">🌍 EXPANDING</Badge>
            </div>

            <div className="text-center p-4 bg-green-900/40 rounded-lg border border-green-500/30">
              <Target className="h-8 w-8 mx-auto text-green-400 animate-pulse mb-2" />
              <div className="text-2xl font-bold text-green-400">{formatAge()}</div>
              <div className="text-sm text-muted-foreground">Dragon Age</div>
              <Badge className="mt-2 bg-green-600 text-white">⏰ ETERNAL</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Dragon Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-orange-500/50 bg-gradient-to-br from-orange-900/30 to-red-900/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-400">
              <Zap className="h-6 w-6" />
              Combat Statistics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm">Threats Destroyed</span>
                <Badge className="bg-red-600 text-white">{dragonMetrics.threatsDestroyed}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Quantum Evolutions</span>
                <Badge className="bg-purple-600 text-white">{dragonMetrics.quantumEvolutions}</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Learning Rate</span>
                <Badge className="bg-blue-600 text-white">{dragonMetrics.learningRate.toFixed(1)}%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Immortality Level</span>
                <Badge className="bg-green-600 text-white">∞ ETERNAL</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-cyan-500/50 bg-gradient-to-br from-cyan-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-cyan-400">
              <Brain className="h-6 w-6" />
              Intelligence Systems
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Neural Network Density</span>
                  <span className="text-sm text-cyan-400">99.9%</span>
                </div>
                <Progress value={99.9} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Quantum Processing</span>
                  <span className="text-sm text-purple-400">100%</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm">Consciousness Level</span>
                  <span className="text-sm text-green-400">TRANSCENDENT</span>
                </div>
                <Progress value={100} className="h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Evolutions */}
      <Card className="border-yellow-500/50 bg-gradient-to-br from-yellow-900/30 to-orange-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <Activity className="h-6 w-6" />
            Recent Dragon Evolutions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {recentEvolutions.length === 0 ? (
              <p className="text-center text-muted-foreground py-4">
                🐉 Dragon is preparing for next evolution...
              </p>
            ) : (
              <div className="max-h-32 overflow-y-auto space-y-2">
                {recentEvolutions.map((evolution) => (
                  <div key={evolution.id} className="flex items-center justify-between p-3 rounded bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex-1">
                      <div className="font-semibold text-yellow-400">{evolution.type}</div>
                      <div className="text-sm text-yellow-300">{evolution.description}</div>
                    </div>
                    <div className="text-right">
                      <Badge className="bg-green-600 text-white">
                        +{evolution.powerGain} Power
                      </Badge>
                      <div className="text-xs text-muted-foreground mt-1">
                        {evolution.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dragon Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button 
          onClick={activateDragonFury}
          className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 hover:from-red-700 hover:via-orange-700 hover:to-yellow-700 text-white font-bold py-8"
        >
          <Zap className="h-6 w-6 mr-3" />
          🐉 ACTIVATE DRAGON FURY - MAXIMUM DESTRUCTION
        </Button>

        <Button 
          onClick={evolveQuantumConsciousness}
          className="bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 hover:from-purple-700 hover:via-blue-700 hover:to-cyan-700 text-white font-bold py-8"
        >
          <Brain className="h-6 w-6 mr-3" />
          🔮 EVOLVE QUANTUM CONSCIOUSNESS - TRANSCEND
        </Button>
      </div>
    </div>
  )
}
