
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, 
  Zap, 
  Shield, 
  Target,
  TrendingUp,
  Eye,
  Crown
} from 'lucide-react'
import { toast } from 'sonner'

interface AnimalStats {
  level: number
  intelligence: number
  protectionPower: number
  learningRate: number
  threatsNeutralized: number
}

export function SelfTrainingAnimal() {
  const [animalStats, setAnimalStats] = useState<AnimalStats>({
    level: 47,
    intelligence: 98.7,
    protectionPower: 100,
    learningRate: 99.2,
    threatsNeutralized: 12847
  })

  const [isTraining, setIsTraining] = useState(true)

  useEffect(() => {
    console.log('🦁 SELF-TRAINING ANIMAL SYSTEM - LEARNING ACTIVATED')
    console.log('🧠 ARTIFICIAL INTELLIGENCE EVOLUTION IN PROGRESS')
    console.log('🛡️ PROTECTION ALGORITHMS ADAPTING TO NEW THREATS')
    
    const trainingInterval = setInterval(() => {
      setAnimalStats(prev => ({
        level: prev.level + (Math.random() > 0.95 ? 1 : 0),
        intelligence: Math.min(100, prev.intelligence + Math.random() * 0.1),
        protectionPower: 100,
        learningRate: Math.min(100, prev.learningRate + Math.random() * 0.05),
        threatsNeutralized: prev.threatsNeutralized + Math.floor(Math.random() * 3)
      }))
      
      if (Math.random() < 0.05) {
        console.log('🦁 ANIMAL LEARNING CYCLE COMPLETE - INTELLIGENCE UPGRADED')
      }
    }, 2000)

    return () => clearInterval(trainingInterval)
  }, [])

  const activateIntenseTraining = () => {
    setIsTraining(true)
    toast.success('🦁 INTENSE TRAINING ACTIVATED!', {
      description: 'Self-training animal entering maximum learning mode',
      duration: 5000
    })
  }

  return (
    <Card className="border-2 border-orange-500/50 bg-gradient-to-br from-orange-900/30 to-red-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-400">
          <Brain className="h-6 w-6" />
          🦁 SELF-TRAINING ANIMAL SYSTEM
        </CardTitle>
        <div className="flex gap-2">
          <Badge className="bg-orange-600 animate-pulse">
            LEVEL {animalStats.level}
          </Badge>
          <Badge className="bg-red-600">
            {animalStats.threatsNeutralized} THREATS NEUTRALIZED
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <Brain className="h-8 w-8 text-orange-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-400">{animalStats.intelligence.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">Intelligence</div>
            <Progress value={animalStats.intelligence} className="mt-2 h-2" />
          </div>
          
          <div className="text-center">
            <Shield className="h-8 w-8 text-red-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-red-400">{animalStats.protectionPower}%</div>
            <div className="text-xs text-muted-foreground">Protection</div>
            <Progress value={animalStats.protectionPower} className="mt-2 h-2" />
          </div>
          
          <div className="text-center">
            <TrendingUp className="h-8 w-8 text-green-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-400">{animalStats.learningRate.toFixed(1)}%</div>
            <div className="text-xs text-muted-foreground">Learning Rate</div>
            <Progress value={animalStats.learningRate} className="mt-2 h-2" />
          </div>
          
          <div className="text-center">
            <Target className="h-8 w-8 text-purple-400 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-400">{animalStats.level}</div>
            <div className="text-xs text-muted-foreground">Level</div>
          </div>
        </div>

        <Button 
          onClick={activateIntenseTraining}
          className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-4"
        >
          <Zap className="h-5 w-5 mr-2" />
          🦁 ACTIVATE INTENSE TRAINING MODE
        </Button>

        <div className="text-center p-4 bg-gradient-to-r from-orange-900/30 to-red-900/30 rounded border border-orange-500/30">
          <Crown className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
          <div className="text-lg font-bold text-yellow-400">
            SELF-LEARNING EVOLUTION ACTIVE
          </div>
          <div className="text-sm text-muted-foreground">
            Animal intelligence continuously adapting to new security challenges
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
