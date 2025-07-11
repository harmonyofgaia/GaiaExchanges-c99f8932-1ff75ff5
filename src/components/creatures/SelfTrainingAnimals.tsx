
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'

interface Animal {
  id: string
  name: string
  type: 'dragon' | 'wolf' | 'eagle' | 'lion' | 'phoenix' | 'tiger'
  level: number
  experience: number
  health: number
  power: number
  specialAbility: string
  isTraining: boolean
  lastTrained: Date
}

export function SelfTrainingAnimals() {
  const [animals, setAnimals] = useState<Animal[]>([
    {
      id: '1',
      name: 'Quantum Dragon',
      type: 'dragon',
      level: 47,
      experience: 12847,
      health: 100,
      power: 15000,
      specialAbility: 'Quantum Fire Breath',
      isTraining: true,
      lastTrained: new Date()
    },
    {
      id: '2',
      name: 'Alpha Wolf',
      type: 'wolf',
      level: 32,
      experience: 8492,
      health: 100,
      power: 8500,
      specialAbility: 'Pack Leadership',
      isTraining: false,
      lastTrained: new Date(Date.now() - 300000)
    },
    {
      id: '3',
      name: 'Sky Guardian',
      type: 'eagle',
      level: 28,
      experience: 6743,
      health: 100,
      power: 7200,
      specialAbility: 'Aerial Surveillance',
      isTraining: true,
      lastTrained: new Date()
    },
    {
      id: '4',
      name: 'Thunder Lion',
      type: 'lion',
      level: 35,
      experience: 9876,
      health: 100,
      power: 9800,
      specialAbility: 'Roar of Thunder',
      isTraining: false,
      lastTrained: new Date(Date.now() - 150000)
    }
  ])

  const [totalPower, setTotalPower] = useState(0)

  useEffect(() => {
    // Calculate total power
    const power = animals.reduce((sum, animal) => sum + animal.power, 0)
    setTotalPower(power)

    // Self-training mechanism
    const trainingInterval = setInterval(() => {
      setAnimals(prev => prev.map(animal => {
        if (animal.isTraining) {
          const expGain = Math.floor(Math.random() * 50) + 25
          const powerGain = Math.floor(Math.random() * 100) + 50
          const newExp = animal.experience + expGain
          const newLevel = Math.floor(newExp / 500) + 1
          
          return {
            ...animal,
            experience: newExp,
            level: newLevel,
            power: animal.power + powerGain,
            lastTrained: new Date()
          }
        }
        return animal
      }))

      // Random training notifications
      if (Math.random() > 0.7) {
        const trainingMessages = [
          '🐉 Quantum Dragon learned new quantum abilities!',
          '🐺 Alpha Wolf improved pack coordination!',
          '🦅 Sky Guardian enhanced surveillance range!',
          '🦁 Thunder Lion increased roar intensity!',
          '🔥 Phoenix gained regeneration powers!',
          '🐅 Tiger mastered stealth techniques!'
        ]
        
        const message = trainingMessages[Math.floor(Math.random() * trainingMessages.length)]
        toast.success('🎯 Training Success!', {
          description: message,
          duration: 4000
        })
      }
    }, 5000)

    return () => clearInterval(trainingInterval)
  }, [animals])

  const toggleTraining = (animalId: string) => {
    setAnimals(prev => prev.map(animal => 
      animal.id === animalId 
        ? { ...animal, isTraining: !animal.isTraining }
        : animal
    ))
  }

  const getAnimalEmoji = (type: Animal['type']) => {
    const emojis = {
      dragon: '🐉',
      wolf: '🐺',
      eagle: '🦅',
      lion: '🦁',
      phoenix: '🔥',
      tiger: '🐅'
    }
    return emojis[type]
  }

  return (
    <div className="space-y-6">
      {/* Overview */}
      <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
        <CardHeader>
          <CardTitle className="text-center text-purple-400">
            🦁 SELF-TRAINING ANIMAL ARMY - CONTINUOUS EVOLUTION
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div className="p-4 bg-purple-900/30 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">{animals.length}</div>
              <div className="text-sm text-muted-foreground">Active Animals</div>
            </div>
            <div className="p-4 bg-blue-900/30 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{totalPower.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Power</div>
            </div>
            <div className="p-4 bg-green-900/30 rounded-lg">
              <div className="text-2xl font-bold text-green-400">
                {animals.filter(a => a.isTraining).length}
              </div>
              <div className="text-sm text-muted-foreground">Training Now</div>
            </div>
            <div className="p-4 bg-yellow-900/30 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">∞</div>
              <div className="text-sm text-muted-foreground">Growth Rate</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Animal Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {animals.map((animal) => (
          <Card key={animal.id} className="border-gold-500/30 bg-gradient-to-br from-gold-900/20 to-orange-900/20">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-3xl">{getAnimalEmoji(animal.type)}</span>
                  <div>
                    <div className="text-gold-400">{animal.name}</div>
                    <div className="text-sm text-muted-foreground">Level {animal.level}</div>
                  </div>
                </div>
                <Badge className={animal.isTraining ? 'bg-green-600 animate-pulse' : 'bg-gray-600'}>
                  {animal.isTraining ? 'TRAINING' : 'RESTING'}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Health</span>
                  <span className="text-green-400">{animal.health}%</span>
                </div>
                <Progress value={animal.health} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Experience</span>
                  <span className="text-blue-400">{animal.experience.toLocaleString()}</span>
                </div>
                <Progress value={(animal.experience % 500) / 5} className="h-2" />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Power Level</span>
                  <span className="text-purple-400">{animal.power.toLocaleString()}</span>
                </div>
                <div className="text-xs text-gold-400">Special: {animal.specialAbility}</div>
              </div>

              <div className="flex gap-2">
                <Button 
                  onClick={() => toggleTraining(animal.id)}
                  className={animal.isTraining ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}
                  size="sm"
                >
                  {animal.isTraining ? 'Pause Training' : 'Start Training'}
                </Button>
                <Button variant="outline" size="sm">
                  View Stats
                </Button>
              </div>

              <div className="text-xs text-muted-foreground">
                Last trained: {animal.lastTrained.toLocaleTimeString()}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Training Status */}
      <Card className="border-green-500/30 bg-green-900/10">
        <CardHeader>
          <CardTitle className="text-green-400">🎯 Auto-Training Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-sm text-muted-foreground space-y-2">
            <p>• Animals automatically gain experience and power every 5 seconds</p>
            <p>• Each animal has unique growth patterns and special abilities</p>
            <p>• Training can be paused/resumed individually for each animal</p>
            <p>• Quantum enhancement boosts all animals simultaneously</p>
            <p>• Level progression unlocks new defensive capabilities</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
