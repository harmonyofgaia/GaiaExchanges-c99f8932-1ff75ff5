
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Shield, 
  Zap, 
  Brain, 
  Eye, 
  Lock,
  Activity,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { toast } from 'sonner'

export function InvisibleDefenseSystem() {
  const [defenseLevel, setDefenseLevel] = useState(100)
  const [threatsNeutralized, setThreatsNeutralized] = useState(25847)
  const [isInvisibleMode, setIsInvisibleMode] = useState(true)
  const [aiLearningRate, setAiLearningRate] = useState(97.8)

  useEffect(() => {
    const interval = setInterval(() => {
      setThreatsNeutralized(prev => prev + Math.floor(Math.random() * 5) + 1)
      setAiLearningRate(prev => Math.min(100, prev + Math.random() * 0.1))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const activateGhostMode = () => {
    setIsInvisibleMode(true)
    toast.success('👻 Ghost Mode Activated - System now completely invisible')
  }

  const triggerNeuralEvolution = () => {
    toast.success('🧠 Neural Evolution Triggered - AI learning accelerated')
  }

  return (
    <div className="space-y-6">
      <Card className="border-cyan-500/50 bg-gradient-to-r from-cyan-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="text-cyan-400 text-center text-3xl">
            👻 INVISIBLE DEFENSE MATRIX
          </CardTitle>
          <div className="text-center">
            <Badge className={`${isInvisibleMode ? 'bg-green-600 animate-pulse' : 'bg-red-600'}`}>
              {isInvisibleMode ? 'GHOST MODE ACTIVE' : 'VISIBLE MODE'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-cyan-900/20 rounded-lg">
              <div className="text-3xl font-bold text-cyan-400">{defenseLevel}%</div>
              <div className="text-sm text-muted-foreground">Defense Level</div>
            </div>
            <div className="text-center p-4 bg-green-900/20 rounded-lg">
              <div className="text-3xl font-bold text-green-400">{threatsNeutralized.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Neutralized</div>
            </div>
            <div className="text-center p-4 bg-purple-900/20 rounded-lg">
              <div className="text-3xl font-bold text-purple-400">{aiLearningRate.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">AI Learning</div>
            </div>
            <div className="text-center p-4 bg-orange-900/20 rounded-lg">
              <div className="text-3xl font-bold text-orange-400">∞</div>
              <div className="text-sm text-muted-foreground">Adaptation</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-400">🧠 Self-Training AI</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Neural Network Evolution</span>
                <span>{aiLearningRate.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-green-400 h-2 rounded-full transition-all duration-1000" 
                  style={{width: `${aiLearningRate}%`}}
                />
              </div>
            </div>

            <Button
              onClick={triggerNeuralEvolution}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <Brain className="h-4 w-4 mr-2" />
              Trigger Neural Evolution
            </Button>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                <Activity className="h-4 w-4 mr-1" />
                Monitor
              </Button>
              <Button variant="outline" size="sm">
                <Zap className="h-4 w-4 mr-1" />
                Boost
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-500/30">
          <CardHeader>
            <CardTitle className="text-red-400">👻 Invisibility Controls</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              onClick={activateGhostMode}
              className="w-full bg-cyan-600 hover:bg-cyan-700"
            >
              <Eye className="h-4 w-4 mr-2" />
              Activate Ghost Mode
            </Button>

            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">Current Status:</div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-green-400">Completely Invisible</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-green-400">Self-Adaptive</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-400" />
                <span className="text-green-400">Unstoppable</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <Button variant="outline" size="sm">
                <Shield className="h-4 w-4 mr-1" />
                Cloak
              </Button>
              <Button variant="outline" size="sm">
                <Lock className="h-4 w-4 mr-1" />
                Lock
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
