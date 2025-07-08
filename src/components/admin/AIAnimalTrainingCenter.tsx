
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, 
  Zap, 
  Target, 
  TrendingUp, 
  Shield, 
  Eye,
  Cpu,
  Database,
  Network,
  Bot
} from 'lucide-react'
import { toast } from 'sonner'

interface AnimalAI {
  id: string
  name: string
  species: string
  intelligence: number
  learningRate: number
  specialization: string
  status: 'training' | 'active' | 'evolving'
  powerLevel: number
}

export function AIAnimalTrainingCenter() {
  const [animalAIs, setAnimalAIs] = useState<AnimalAI[]>([])
  const [totalPower, setTotalPower] = useState(0)
  const [trainingActive, setTrainingActive] = useState(false)

  useEffect(() => {
    const mockAIs: AnimalAI[] = [
      {
        id: '1',
        name: 'Quantum Dolphin',
        species: 'Dolphin',
        intelligence: 95,
        learningRate: 87,
        specialization: 'Pattern Recognition & Sonar Analysis',
        status: 'active',
        powerLevel: 9876
      },
      {
        id: '2',
        name: 'Neural Octopus',
        species: 'Octopus',
        intelligence: 98,
        learningRate: 92,
        specialization: 'Multi-dimensional Problem Solving',
        status: 'evolving',
        powerLevel: 12453
      },
      {
        id: '3',
        name: 'Cyber Raven',
        species: 'Raven',
        intelligence: 89,
        learningRate: 94,
        specialization: 'Logic Puzzles & Tool Usage',
        status: 'training',
        powerLevel: 7654
      },
      {
        id: '4',
        name: 'Alpha Wolf',
        species: 'Wolf',
        intelligence: 91,
        learningRate: 88,
        specialization: 'Pack Coordination & Strategy',
        status: 'active',
        powerLevel: 8901
      },
      {
        id: '5',
        name: 'Quantum Elephant',
        species: 'Elephant',
        intelligence: 96,
        learningRate: 85,
        specialization: 'Memory Systems & Emotional Intelligence',
        status: 'active',
        powerLevel: 11234
      }
    ]

    setAnimalAIs(mockAIs)
    setTotalPower(mockAIs.reduce((sum, ai) => sum + ai.powerLevel, 0))
    
    console.log('🧠 AI ANIMAL TRAINING CENTER INITIALIZED')
    console.log('🦎 ANIMAL AI SYSTEMS ONLINE')
    console.log('⚡ COLLECTIVE INTELLIGENCE NETWORK ACTIVE')
  }, [])

  useEffect(() => {
    if (trainingActive) {
      const interval = setInterval(() => {
        setAnimalAIs(prev => prev.map(ai => ({
          ...ai,
          intelligence: Math.min(100, ai.intelligence + Math.random() * 0.5),
          learningRate: Math.min(100, ai.learningRate + Math.random() * 0.3),
          powerLevel: ai.powerLevel + Math.floor(Math.random() * 100)
        })))
        
        setTotalPower(prev => prev + Math.floor(Math.random() * 500))
      }, 2000)

      return () => clearInterval(interval)
    }
  }, [trainingActive])

  const startTraining = () => {
    setTrainingActive(true)
    toast.success('🧠 AI ANIMAL TRAINING ACTIVATED!', {
      description: 'Quantum learning algorithms engaged • Collective intelligence growing',
      duration: 5000
    })
    
    console.log('🧠 AI ANIMAL COLLECTIVE TRAINING STARTED')
    console.log('⚡ QUANTUM LEARNING PROTOCOLS ACTIVE')
    console.log('🦎 ANIMAL INTELLIGENCE NETWORK EXPANDING')
  }

  const stopTraining = () => {
    setTrainingActive(false)
    toast.success('🧠 Training Session Completed')
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600'
      case 'training': return 'bg-blue-600 animate-pulse'
      case 'evolving': return 'bg-purple-600 animate-pulse'
      default: return 'bg-gray-600'
    }
  }

  const getSpeciesEmoji = (species: string) => {
    switch (species) {
      case 'Dolphin': return '🐬'
      case 'Octopus': return '🐙'
      case 'Raven': return '🐦‍⬛'
      case 'Wolf': return '🐺'
      case 'Elephant': return '🐘'
      default: return '🦎'
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="text-purple-400 flex items-center gap-2">
            <Brain className="h-6 w-6" />
            🧠 AI ANIMAL TRAINING CENTER
          </CardTitle>
          <p className="text-purple-300 text-sm">
            Quantum-enhanced animal intelligence • Collective learning network • Self-evolving AI systems
          </p>
          <div className="flex gap-4 flex-wrap">
            <Badge className="bg-purple-600">TOTAL POWER: {totalPower.toLocaleString()}</Badge>
            <Badge className="bg-blue-600">ACTIVE AIs: {animalAIs.filter(ai => ai.status === 'active').length}</Badge>
            <Badge className="bg-green-600">AVG INTELLIGENCE: {Math.round(animalAIs.reduce((sum, ai) => sum + ai.intelligence, 0) / animalAIs.length)}%</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-purple-900/40 rounded-lg">
              <Brain className="h-8 w-8 mx-auto text-purple-400 mb-2 animate-pulse" />
              <div className="text-2xl font-bold text-purple-400">
                {animalAIs.reduce((sum, ai) => sum + ai.intelligence, 0).toFixed(0)}
              </div>
              <div className="text-sm text-muted-foreground">Collective IQ</div>
            </div>
            <div className="text-center p-4 bg-blue-900/40 rounded-lg">
              <Cpu className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">{animalAIs.length}</div>
              <div className="text-sm text-muted-foreground">AI Animals</div>
            </div>
            <div className="text-center p-4 bg-green-900/40 rounded-lg">
              <Network className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">ACTIVE</div>
              <div className="text-sm text-muted-foreground">Neural Network</div>
            </div>
            <div className="text-center p-4 bg-orange-900/40 rounded-lg">
              <Database className="h-8 w-8 mx-auto text-orange-400 mb-2" />
              <div className="text-2xl font-bold text-orange-400">∞</div>
              <div className="text-sm text-muted-foreground">Learning Capacity</div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Button
              onClick={startTraining}
              disabled={trainingActive}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Brain className="h-4 w-4 mr-2" />
              {trainingActive ? 'Training Active' : 'Start Collective Training'}
            </Button>
            
            {trainingActive && (
              <Button
                onClick={stopTraining}
                variant="outline"
                className="border-red-500/30"
              >
                <Shield className="h-4 w-4 mr-2" />
                Stop Training
              </Button>
            )}
          </div>

          <div className="space-y-4">
            {animalAIs.map((ai) => (
              <Card key={ai.id} className="border-gray-500/30 bg-black/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{getSpeciesEmoji(ai.species)}</div>
                      <div>
                        <div className="font-bold text-lg">{ai.name}</div>
                        <div className="text-sm text-muted-foreground">{ai.species} AI • {ai.specialization}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusColor(ai.status)}>
                        {ai.status.toUpperCase()}
                      </Badge>
                      <Badge className="bg-orange-600">
                        POWER: {ai.powerLevel.toLocaleString()}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <div className="text-sm text-purple-300 mb-1">Intelligence Level</div>
                      <Progress value={ai.intelligence} className="mb-1" />
                      <div className="text-xs text-purple-400">{ai.intelligence.toFixed(1)}%</div>
                    </div>
                    <div>
                      <div className="text-sm text-blue-300 mb-1">Learning Rate</div>
                      <Progress value={ai.learningRate} className="mb-1" />
                      <div className="text-xs text-blue-400">{ai.learningRate.toFixed(1)}%</div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button 
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Eye className="h-3 w-3 mr-1" />
                      👁️ Monitor
                    </Button>
                    <Button 
                      size="sm"
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Zap className="h-3 w-3 mr-1" />
                      ⚡ Boost
                    </Button>
                    <Button 
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                    >
                      <Target className="h-3 w-3 mr-1" />
                      🎯 Specialize
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
            <h4 className="font-bold text-purple-400 mb-2">🧠 AI ANIMAL CAPABILITIES</h4>
            <div className="text-sm text-purple-300 space-y-1">
              <div>• Quantum-enhanced learning algorithms inspired by real animal intelligence</div>
              <div>• Collective problem-solving network with species-specific strengths</div>
              <div>• Self-evolving AI systems that adapt and improve continuously</div>
              <div>• Pattern recognition superior to traditional AI systems</div>
              <div>• Emotional intelligence and social coordination protocols</div>
              <div>• Multi-dimensional thinking and creative problem solving</div>
              <div>🌟 ADMIN EXCLUSIVE: Direct neural interface with animal AI collective</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
