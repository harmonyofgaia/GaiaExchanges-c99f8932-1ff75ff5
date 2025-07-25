import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  AlertTriangle, 
  Zap, 
  Target, 
  Shield,
  Activity,
  PlayCircle,
  StopCircle,
  RotateCcw
} from 'lucide-react'
import { toast } from 'sonner'

interface BreachScenario {
  id: string
  name: string
  description: string
  difficulty: 'Easy' | 'Medium' | 'Hard' | 'Extreme'
  emoji: string
  status: 'Ready' | 'Running' | 'Completed'
  success: boolean
  duration: number
}

export function BreachSimulation() {
  const [scenarios, setScenarios] = useState<BreachScenario[]>([
    {
      id: '1',
      name: 'Bear Rampage Attack',
      description: 'Massive bear guardian goes rogue and attacks system infrastructure',
      difficulty: 'Hard',
      emoji: '🐻',
      status: 'Ready',
      success: false,
      duration: 0
    },
    {
      id: '2',
      name: 'Zombie Horde Breach',
      description: 'Undead army attempts to overwhelm defense systems',
      difficulty: 'Extreme',
      emoji: '🧟‍♂️',
      status: 'Ready',
      success: false,
      duration: 0
    },
    {
      id: '3',
      name: 'Shadow Serpent Infiltration',
      description: 'Stealth snake infiltrates through shadow networks',
      difficulty: 'Hard',
      emoji: '🐍',
      status: 'Ready',
      success: false,
      duration: 0
    },
    {
      id: '4',
      name: 'Thunderstorm Griffin DDoS',
      description: 'Lightning-fast distributed denial of service attack',
      difficulty: 'Medium',
      emoji: '🦅⚡',
      status: 'Ready',
      success: false,
      duration: 0
    },
    {
      id: '5',
      name: 'AI Bat Swarm DDoS',
      description: 'Coordinated bat swarm overwhelming network resources',
      difficulty: 'Hard',
      emoji: '🦇',
      status: 'Ready',
      success: false,
      duration: 0
    },
    {
      id: '6',
      name: 'Tiger Sentinel Hunt',
      description: 'Predator tiger hunting for admin vulnerabilities',
      difficulty: 'Medium',
      emoji: '🐅',
      status: 'Ready',
      success: false,
      duration: 0
    },
    {
      id: '7',
      name: 'Swarm of Bees Overload',
      description: 'Massive bee swarm targeting server infrastructure',
      difficulty: 'Easy',
      emoji: '🐝',
      status: 'Ready',
      success: false,
      duration: 0
    },
    {
      id: '8',
      name: 'Quantum Ant Army Attack',
      description: 'Quantum-coordinated ant colony overwhelming defenses',
      difficulty: 'Extreme',
      emoji: '🐜',
      status: 'Ready',
      success: false,
      duration: 0
    }
  ])

  const [activeSimulation, setActiveSimulation] = useState<string | null>(null)
  const [simulationProgress, setSimulationProgress] = useState(0)

  const startSimulation = (scenarioId: string) => {
    const scenario = scenarios.find(s => s.id === scenarioId)
    if (!scenario) return

    setActiveSimulation(scenarioId)
    setSimulationProgress(0)
    
    // Update scenario status
    setScenarios(prev => prev.map(s => 
      s.id === scenarioId 
        ? { ...s, status: 'Running' as const }
        : s
    ))

    console.log(`🚨 BREACH SIMULATION STARTED: ${scenario.name}`)
    console.log(`⚡ ${scenario.description}`)
    
    toast.success(`🚨 ${scenario.name} Started!`, {
      description: 'Defense systems responding to breach simulation',
      duration: 3000
    })

    // Simulate breach progress
    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        const newProgress = prev + Math.random() * 15
        if (newProgress >= 100) {
          clearInterval(interval)
          completeSimulation(scenarioId)
          return 100
        }
        return newProgress
      })
    }, 800)
  }

  const completeSimulation = (scenarioId: string) => {
    const scenario = scenarios.find(s => s.id === scenarioId)
    if (!scenario) return

    // Defense systems always win in simulation
    const success = true
    
    setScenarios(prev => prev.map(s => 
      s.id === scenarioId 
        ? { 
            ...s, 
            status: 'Completed' as const,
            success,
            duration: Math.floor(Math.random() * 300) + 60
          }
        : s
    ))

    setActiveSimulation(null)
    setSimulationProgress(0)

    console.log(`✅ BREACH SIMULATION COMPLETED: ${scenario.name}`)
    console.log(`🛡️ DEFENSE SYSTEMS SUCCESSFUL - THREAT NEUTRALIZED`)
    
    toast.success(`✅ ${scenario.name} Neutralized!`, {
      description: 'Defense systems successfully repelled the attack',
      duration: 5000
    })
  }

  const stopSimulation = () => {
    if (!activeSimulation) return
    
    setScenarios(prev => prev.map(s => 
      s.id === activeSimulation 
        ? { ...s, status: 'Ready' as const }
        : s
    ))

    setActiveSimulation(null)
    setSimulationProgress(0)
    
    toast.info('🛑 Simulation Stopped', {
      description: 'Breach simulation terminated by admin',
      duration: 3000
    })
  }

  const resetAllSimulations = () => {
    setScenarios(prev => prev.map(s => ({
      ...s,
      status: 'Ready' as const,
      success: false,
      duration: 0
    })))
    setActiveSimulation(null)
    setSimulationProgress(0)
    
    toast.success('🔄 All Simulations Reset', {
      description: 'Ready for new breach testing',
      duration: 3000
    })
  }

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Easy': return 'border-green-500 text-green-400'
      case 'Medium': return 'border-yellow-500 text-yellow-400'
      case 'Hard': return 'border-orange-500 text-orange-400'
      case 'Extreme': return 'border-red-500 text-red-400'
      default: return 'border-gray-500 text-gray-400'
    }
  }

  const getStatusColor = (status: string, success: boolean) => {
    switch (status) {
      case 'Ready': return 'border-blue-500 text-blue-400'
      case 'Running': return 'border-purple-500 text-purple-400'
      case 'Completed': return success ? 'border-green-500 text-green-400' : 'border-red-500 text-red-400'
      default: return 'border-gray-500 text-gray-400'
    }
  }

  const completedScenarios = scenarios.filter(s => s.status === 'Completed').length
  const successfulDefenses = scenarios.filter(s => s.status === 'Completed' && s.success).length

  return (
    <div className="space-y-6">
      <Card className="border-red-500/30 bg-gradient-to-br from-red-900/30 to-purple-900/30">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6" />
            🚨 BREACH SIMULATION CENTER - DEFENSE TRAINING
          </CardTitle>
          <div className="flex gap-4 text-sm">
            <Badge className="bg-blue-600">
              📊 Scenarios: {scenarios.length}
            </Badge>
            <Badge className="bg-purple-600">
              ✅ Completed: {completedScenarios}
            </Badge>
            <Badge className="bg-green-600">
              🛡️ Defended: {successfulDefenses}
            </Badge>
            <Badge className="bg-orange-600">
              🎯 Success Rate: {completedScenarios > 0 ? Math.round((successfulDefenses / completedScenarios) * 100) : 0}%
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4 mb-6">
            <Button 
              onClick={resetAllSimulations}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset All Simulations
            </Button>
            {activeSimulation && (
              <Button 
                onClick={stopSimulation}
                variant="destructive"
              >
                <StopCircle className="h-4 w-4 mr-2" />
                Stop Active Simulation
              </Button>
            )}
          </div>

          {activeSimulation && (
            <Card className="mb-6 border-purple-500/50 bg-gradient-to-r from-purple-900/40 to-blue-900/40">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-purple-400 font-semibold">
                    Active Simulation: {scenarios.find(s => s.id === activeSimulation)?.name}
                  </span>
                  <span className="text-purple-300">{Math.round(simulationProgress)}%</span>
                </div>
                <Progress value={simulationProgress} className="h-3" />
                <div className="text-sm text-purple-300 mt-2">
                  Defense systems are responding to breach attempt...
                </div>
              </CardContent>
            </Card>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {scenarios.map((scenario) => (
              <Card 
                key={scenario.id} 
                className="border-gray-500/20 bg-gradient-to-br from-gray-900/40 to-black/60"
              >
                <CardContent className="p-4">
                  <div className="text-center mb-3">
                    <div className="text-4xl mb-2">{scenario.emoji}</div>
                    <h3 className="text-lg font-bold text-white mb-1">{scenario.name}</h3>
                    <p className="text-sm text-gray-300 mb-3">{scenario.description}</p>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Difficulty:</span>
                      <Badge variant="outline" className={getDifficultyColor(scenario.difficulty)}>
                        {scenario.difficulty}
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-400">Status:</span>
                      <Badge variant="outline" className={getStatusColor(scenario.status, scenario.success)}>
                        {scenario.status}
                      </Badge>
                    </div>
                    {scenario.status === 'Completed' && (
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-400">Duration:</span>
                        <span className="text-xs text-green-400">{scenario.duration}s</span>
                      </div>
                    )}
                  </div>

                  <Button
                    onClick={() => startSimulation(scenario.id)}
                    disabled={scenario.status === 'Running' || activeSimulation !== null}
                    className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-600"
                  >
                    <PlayCircle className="h-4 w-4 mr-2" />
                    {scenario.status === 'Running' ? 'Running...' : 'Start Breach'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}