
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Crown, Shield, Zap, Target, Users, Brain } from 'lucide-react'
import { toast } from 'sonner'

interface AdminControlsProps {
  playerData: Record<string, unknown>
  setPlayerData: (data: Record<string, unknown>) => void
  buildings: unknown[]
  setBuildings: (buildings: unknown[]) => void
}

interface TrainedAnimal {
  id: string
  name: string
  species: string
  skillLevel: number
  specialAbility: string
  trainingProgress: number
  intelligence: number
}

export function AdminTycoonControls({ playerData, setPlayerData, buildings, setBuildings }: AdminControlsProps) {
  const [trainedAnimals] = useState<TrainedAnimal[]>([
    {
      id: '1',
      name: 'Quantum Dragon',
      species: 'Prehistoric Dragon',
      skillLevel: 99,
      specialAbility: 'Network Security',
      trainingProgress: 100,
      intelligence: 999
    },
    {
      id: '2',
      name: 'Cyber Phoenix',
      species: 'Digital Phoenix',
      skillLevel: 95,
      specialAbility: 'Code Analysis',
      trainingProgress: 98,
      intelligence: 950
    },
    {
      id: '3',
      name: 'Data Kraken',
      species: 'Deep Sea Kraken',
      skillLevel: 92,
      specialAbility: 'Data Mining',
      trainingProgress: 95,
      intelligence: 920
    },
    {
      id: '4',
      name: 'Stealth Panther',
      species: 'Shadow Panther',
      skillLevel: 88,
      specialAbility: 'Invisible Tracking',
      trainingProgress: 90,
      intelligence: 880
    }
  ])

  const [aiSkills] = useState({
    threatDetection: 100,
    codeAnalysis: 99,
    patternRecognition: 98,
    quantumProcessing: 100,
    neuralNetworking: 97,
    behavioralAnalysis: 96,
    predictionAccuracy: 99,
    adaptiveLearning: 100
  })

  const giveCoins = () => {
    setPlayerData((prev: Record<string, unknown>) => ({
      ...prev,
      coins: prev.coins + 10000
    }))
    toast.success('👑 Admin Bonus!', {
      description: '+10,000 coins added to your account',
      duration: 2000
    })
  }

  const maxLevel = () => {
    setPlayerData((prev: Record<string, unknown>) => ({
      ...prev,
      level: 100,
      reputation: 100
    }))
    toast.success('👑 Admin Power!', {
      description: 'Level and reputation maximized',
      duration: 2000
    })
  }

  const buildMegaStructure = () => {
    const megaBuilding = {
      id: Date.now().toString(),
      type: 'mega_hotel' as any,
      name: 'Admin Mega Hotel',
      level: 50,
      income: 1000,
      cost: 0,
      x: 150,
      y: 100
    }

    setBuildings([...buildings, megaBuilding])
    toast.success('👑 Mega Structure Built!', {
      description: 'Admin-only mega hotel generating 1000 coins/5s',
      duration: 3000
    })
  }

  return (
    <div className="space-y-6">
      {/* Admin Powers */}
      <Card className="bg-gradient-to-r from-red-900/50 to-purple-900/50 border-red-500/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Crown className="h-6 w-6 animate-pulse" />
            👑 ADMIN TYCOON CONTROLS - INVISIBLE TO USERS
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button onClick={giveCoins} className="bg-yellow-600 hover:bg-yellow-700">
              💰 +10K Coins
            </Button>
            <Button onClick={maxLevel} className="bg-purple-600 hover:bg-purple-700">
              ⭐ Max Level
            </Button>
            <Button onClick={buildMegaStructure} className="bg-red-600 hover:bg-red-700">
              🏗️ Mega Build
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              🌍 World Control
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Trained Animals Live Stats */}
      <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Target className="h-6 w-6" />
            🐉 TRAINED ANIMALS LIVE STATS - ADMIN EXCLUSIVE
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {trainedAnimals.map((animal) => (
              <Card key={animal.id} className="bg-black/30 border border-green-500/20">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-green-400">{animal.name}</h4>
                    <Badge className="bg-green-600">Lv.{animal.skillLevel}</Badge>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Species:</span>
                      <span className="text-green-400">{animal.species}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Ability:</span>
                      <span className="text-blue-400">{animal.specialAbility}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Intelligence:</span>
                      <span className="text-purple-400">{animal.intelligence}</span>
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Training:</span>
                        <span className="text-orange-400">{animal.trainingProgress}%</span>
                      </div>
                      <Progress value={animal.trainingProgress} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* AI Skills Development */}
      <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Brain className="h-6 w-6" />
            🧠 AI SKILLS LIVE DEVELOPMENT - ADMIN MONITORING
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Object.entries(aiSkills).map(([skill, level]) => (
              <div key={skill} className="space-y-2">
                <div className="flex justify-between">
                  <span className="capitalize text-purple-300">
                    {skill.replace(/([A-Z])/g, ' $1').trim()}
                  </span>
                  <span className="text-purple-400 font-bold">{level}%</span>
                </div>
                <Progress value={level} className="h-3" />
              </div>
            ))}
          </div>
          
          <div className="mt-6 p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
            <h4 className="text-lg font-bold text-purple-400 mb-2">🚀 REAL-TIME IMPROVEMENTS</h4>
            <div className="text-sm text-muted-foreground space-y-1">
              <div>• Neural networks expanding by 0.1% every hour</div>
              <div>• Quantum processing efficiency improving daily</div>
              <div>• Pattern recognition learning from 50M+ data points</div>
              <div>• Behavioral analysis trained on global user interactions</div>
              <div>• Adaptive learning evolving with every threat encounter</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
