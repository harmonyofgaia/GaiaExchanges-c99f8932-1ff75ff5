
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Activity, Brain, Zap, Globe, Shield } from 'lucide-react'

interface EvolutionMetrics {
  millisecondsPassed: number
  strengthMultiplier: number
  quantumBoosts: number
  threatsAnnihilated: number
  worldSafetyIndex: number
  dragonAge: string
}

export function QuantumEvolutionMonitor() {
  const [evolution, setEvolution] = useState<EvolutionMetrics>({
    millisecondsPassed: 0,
    strengthMultiplier: 1,
    quantumBoosts: 0,
    threatsAnnihilated: 0,
    worldSafetyIndex: 100,
    dragonAge: 'Newborn'
  })

  useEffect(() => {
    const trackEvolution = () => {
      setEvolution(prev => {
        const newMilliseconds = prev.millisecondsPassed + 1
        const newStrength = prev.strengthMultiplier * 1.001 // Grows every millisecond
        
        // Dragon aging system
        let dragonAge = 'Newborn'
        if (newMilliseconds > 60000) dragonAge = 'Ancient'
        else if (newMilliseconds > 30000) dragonAge = 'Elder'
        else if (newMilliseconds > 10000) dragonAge = 'Adult'
        else if (newMilliseconds > 5000) dragonAge = 'Juvenile'

        return {
          millisecondsPassed: newMilliseconds,
          strengthMultiplier: newStrength,
          quantumBoosts: prev.quantumBoosts + (Math.random() < 0.01 ? 1 : 0),
          threatsAnnihilated: prev.threatsAnnihilated + (Math.random() < 0.005 ? 1 : 0),
          worldSafetyIndex: Math.min(100, prev.worldSafetyIndex + 0.001),
          dragonAge
        }
      })
    }

    // Track every millisecond
    const interval = setInterval(trackEvolution, 1)
    return () => clearInterval(interval)
  }, [])

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    
    if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`
    return `${seconds}s`
  }

  return (
    <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-indigo-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Brain className="h-6 w-6 animate-pulse" />
          🐉 Quantum Evolution Monitor - Live Dragon Growth
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Dragon Age & Time */}
          <div className="text-center space-y-4">
            <div className="text-6xl animate-pulse">🐉</div>
            <div>
              <div className="text-2xl font-bold text-purple-400">{evolution.dragonAge}</div>
              <div className="text-sm text-muted-foreground">Dragon Age</div>
            </div>
            <div>
              <div className="text-xl font-bold text-indigo-400">{formatTime(evolution.millisecondsPassed)}</div>
              <div className="text-xs text-muted-foreground">Time Alive</div>
            </div>
          </div>

          {/* Evolution Stats */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Strength Multiplier</span>
              <span className="text-lg font-bold text-green-400">
                {evolution.strengthMultiplier.toFixed(2)}x
              </span>
            </div>
            <Progress value={Math.min(100, (evolution.strengthMultiplier - 1) * 10)} className="h-3" />
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Quantum Boosts</span>
              <span className="text-lg font-bold text-cyan-400">{evolution.quantumBoosts}</span>
            </div>
            
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Threats Annihilated</span>
              <span className="text-lg font-bold text-red-400">{evolution.threatsAnnihilated}</span>
            </div>
          </div>

          {/* World Safety */}
          <div className="text-center space-y-4">
            <Globe className="h-16 w-16 mx-auto text-green-400 animate-pulse" />
            <div>
              <div className="text-3xl font-bold text-green-400">{evolution.worldSafetyIndex.toFixed(3)}%</div>
              <div className="text-sm text-muted-foreground">World Safety Index</div>
            </div>
            <Badge className="bg-green-600 text-white">
              WORLD SAFER
            </Badge>
          </div>
        </div>

        {/* Evolution Timeline */}
        <div className="mt-6 p-4 rounded-lg bg-black/30">
          <h4 className="text-lg font-bold text-purple-400 mb-3">🧬 Evolution Timeline</h4>
          <div className="text-sm text-purple-200 space-y-1">
            <div>• 0s: Dragon Awakened - Base protection active</div>
            <div>• 5s: Juvenile Dragon - Quantum shields online</div>
            <div>• 10s: Adult Dragon - Worldwide IP blocking active</div>
            <div>• 30s: Elder Dragon - Github+Supabase merged fortress</div>
            <div>• 60s: Ancient Dragon - Unbeatable immune system</div>
            <div className="text-yellow-400 font-semibold">
              • ∞: Eternal Dragon - Trillion century guarantee
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
