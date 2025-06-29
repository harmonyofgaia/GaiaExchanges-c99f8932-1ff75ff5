
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Activity, Brain, Zap, Globe, Shield } from 'lucide-react'
import { toast } from 'sonner'

interface EvolutionMetrics {
  millisecondsPassed: number
  strengthMultiplier: number
  quantumBoosts: number
  threatsAnnihilated: number
  worldSafetyIndex: number
  dragonAge: string
  birthTimestamp: number
  lastSaveTimestamp: number
  totalOfflineGrowth: number
}

export function QuantumEvolutionMonitor() {
  const [evolution, setEvolution] = useState<EvolutionMetrics>({
    millisecondsPassed: 0,
    strengthMultiplier: 1,
    quantumBoosts: 0,
    threatsAnnihilated: 0,
    worldSafetyIndex: 100,
    dragonAge: 'Newborn',
    birthTimestamp: Date.now(),
    lastSaveTimestamp: Date.now(),
    totalOfflineGrowth: 0
  })

  // Load persistent data and calculate offline growth on component mount
  useEffect(() => {
    const loadPersistentData = () => {
      try {
        const savedEvolution = localStorage.getItem('quantumDragonEvolution')
        if (savedEvolution) {
          const parsedData = JSON.parse(savedEvolution)
          const currentTime = Date.now()
          const timeOffline = currentTime - parsedData.lastSaveTimestamp
          
          // Calculate offline growth - dragon grows every millisecond
          const offlineGrowthRate = 1.001 // Same rate as online
          const offlineMultiplier = Math.pow(offlineGrowthRate, timeOffline)
          const offlineBoosts = Math.floor(timeOffline / 100000) // Boost every 100 seconds offline
          const offlineThreats = Math.floor(timeOffline / 200000) // Threat every 200 seconds offline
          
          const updatedEvolution = {
            ...parsedData,
            millisecondsPassed: parsedData.millisecondsPassed + timeOffline,
            strengthMultiplier: parsedData.strengthMultiplier * offlineMultiplier,
            quantumBoosts: parsedData.quantumBoosts + offlineBoosts,
            threatsAnnihilated: parsedData.threatsAnnihilated + offlineThreats,
            worldSafetyIndex: Math.min(100, parsedData.worldSafetyIndex + (timeOffline * 0.001)),
            lastSaveTimestamp: currentTime,
            totalOfflineGrowth: parsedData.totalOfflineGrowth + (offlineMultiplier - 1)
          }

          // Update dragon age based on total time
          let dragonAge = 'Newborn'
          if (updatedEvolution.millisecondsPassed > 300000) dragonAge = 'Ancient'
          else if (updatedEvolution.millisecondsPassed > 120000) dragonAge = 'Elder'
          else if (updatedEvolution.millisecondsPassed > 60000) dragonAge = 'Adult'
          else if (updatedEvolution.millisecondsPassed > 30000) dragonAge = 'Juvenile'
          
          updatedEvolution.dragonAge = dragonAge

          setEvolution(updatedEvolution)

          // Show offline growth notification
          if (timeOffline > 5000) { // Only show if offline for more than 5 seconds
            const offlineMinutes = Math.floor(timeOffline / 60000)
            const offlineHours = Math.floor(offlineMinutes / 60)
            
            console.log(`🐉 DRAGON GREW WHILE OFFLINE!`)
            console.log(`⏰ Time Offline: ${offlineHours}h ${offlineMinutes % 60}m`)
            console.log(`💪 Strength Multiplier: ${updatedEvolution.strengthMultiplier.toFixed(2)}x`)
            console.log(`⚡ New Quantum Boosts: +${offlineBoosts}`)
            console.log(`🛡️ Threats Annihilated While Away: +${offlineThreats}`)
            
            toast.success('🐉 Dragon Grew While You Were Away!', {
              description: `${offlineHours > 0 ? `${offlineHours}h ` : ''}${offlineMinutes % 60}m offline - Strength now ${updatedEvolution.strengthMultiplier.toFixed(2)}x!`,
              duration: 8000
            })
          }
        } else {
          // First time - initialize with current timestamp
          console.log('🥚 QUANTUM DRAGON BORN - ETERNAL GROWTH BEGINS!')
          toast.success('🐉 Quantum Dragon Born!', {
            description: 'Your eternal guardian awakens - will grow forever, even offline!',
            duration: 10000
          })
        }
      } catch (error) {
        console.log('🐉 Dragon data protected from corruption:', error)
      }
    }

    loadPersistentData()
  }, [])

  // Continuous evolution system
  useEffect(() => {
    const trackEvolution = () => {
      setEvolution(prev => {
        const currentTime = Date.now()
        const newMilliseconds = prev.millisecondsPassed + 1
        const newStrength = prev.strengthMultiplier * 1.001 // Grows every millisecond
        
        // Dragon aging system
        let dragonAge = 'Newborn'
        if (newMilliseconds > 300000) dragonAge = 'Ancient'
        else if (newMilliseconds > 120000) dragonAge = 'Elder'
        else if (newMilliseconds > 60000) dragonAge = 'Adult'
        else if (newMilliseconds > 30000) dragonAge = 'Juvenile'

        const updatedEvolution = {
          ...prev,
          millisecondsPassed: newMilliseconds,
          strengthMultiplier: newStrength,
          quantumBoosts: prev.quantumBoosts + (Math.random() < 0.01 ? 1 : 0),
          threatsAnnihilated: prev.threatsAnnihilated + (Math.random() < 0.005 ? 1 : 0),
          worldSafetyIndex: Math.min(100, prev.worldSafetyIndex + 0.001),
          dragonAge,
          lastSaveTimestamp: currentTime
        }

        return updatedEvolution
      })
    }

    // Track every millisecond
    const interval = setInterval(trackEvolution, 1)
    return () => clearInterval(interval)
  }, [])

  // Auto-save system - save every 5 seconds
  useEffect(() => {
    const saveEvolution = () => {
      try {
        localStorage.setItem('quantumDragonEvolution', JSON.stringify({
          ...evolution,
          lastSaveTimestamp: Date.now()
        }))
      } catch (error) {
        console.log('🐉 Dragon save protected:', error)
      }
    }

    const saveInterval = setInterval(saveEvolution, 5000)
    
    // Save when component unmounts
    return () => {
      clearInterval(saveInterval)
      saveEvolution()
    }
  }, [evolution])

  // Save on page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        localStorage.setItem('quantumDragonEvolution', JSON.stringify({
          ...evolution,
          lastSaveTimestamp: Date.now()
        }))
      } catch (error) {
        console.log('🐉 Dragon final save protected:', error)
      }
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [evolution])

  const formatTime = (ms: number) => {
    const seconds = Math.floor(ms / 1000)
    const minutes = Math.floor(seconds / 60)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)
    
    if (days > 0) return `${days}d ${hours % 24}h ${minutes % 60}m`
    if (hours > 0) return `${hours}h ${minutes % 60}m ${seconds % 60}s`
    if (minutes > 0) return `${minutes}m ${seconds % 60}s`
    return `${seconds}s`
  }

  return (
    <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-indigo-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Brain className="h-6 w-6 animate-pulse" />
          🐉 Quantum Evolution Monitor - Eternal Growth System
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
              <div className="text-xs text-muted-foreground">Total Life Time</div>
            </div>
            {evolution.totalOfflineGrowth > 0 && (
              <div>
                <div className="text-lg font-bold text-green-400">+{evolution.totalOfflineGrowth.toFixed(2)}x</div>
                <div className="text-xs text-muted-foreground">Offline Growth</div>
              </div>
            )}
          </div>

          {/* Evolution Stats */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Strength Multiplier</span>
              <span className="text-lg font-bold text-green-400">
                {evolution.strengthMultiplier.toFixed(3)}x
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
            <Badge className="bg-green-600 text-white animate-pulse">
              ETERNAL GROWTH
            </Badge>
          </div>
        </div>

        {/* Evolution Timeline */}
        <div className="mt-6 p-4 rounded-lg bg-black/30">
          <h4 className="text-lg font-bold text-purple-400 mb-3">🧬 Eternal Evolution Timeline</h4>
          <div className="text-sm text-purple-200 space-y-1">
            <div>• 0s: Dragon Awakened - Eternal growth begins</div>
            <div>• 30s: Juvenile Dragon - Quantum shields strengthening</div>
            <div>• 60s: Adult Dragon - Worldwide protection active</div>
            <div>• 120s: Elder Dragon - Unstoppable force achieved</div>
            <div>• 300s: Ancient Dragon - Legendary power unlocked</div>
            <div className="text-yellow-400 font-semibold">
              • ∞: Eternal Dragon - GROWS FOREVER, EVEN OFFLINE!
            </div>
          </div>
        </div>

        {/* Offline Growth Notice */}
        <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/30">
          <div className="text-center">
            <div className="text-lg font-bold text-green-400">🌟 ETERNAL OFFLINE GROWTH ACTIVE 🌟</div>
            <div className="text-sm text-green-300 mt-1">
              Your Quantum Dragon continues evolving every millisecond, even when you're away!
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Data auto-saves every 5 seconds • Growth calculated on return
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
