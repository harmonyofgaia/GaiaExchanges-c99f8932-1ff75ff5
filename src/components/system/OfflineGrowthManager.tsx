
import { useEffect, useState, useRef } from 'react'
import { toast } from 'sonner'

interface OfflineGrowthState {
  animalRescuePower: number
  blockchainMining: number
  gpsTrackingStrength: number
  landscapeEvolution: number
  adminPowerLevel: number
  quantumSecurityGrowth: number
  lastOfflineCheck: number
  offlineSessionsCompleted: number
}

export function OfflineGrowthManager() {
  const [growthState, setGrowthState] = useState<OfflineGrowthState>(() => {
    const saved = localStorage.getItem('offline_growth_state')
    return saved ? JSON.parse(saved) : {
      animalRescuePower: 100,
      blockchainMining: 100,
      gpsTrackingStrength: 100,
      landscapeEvolution: 100,
      adminPowerLevel: 100,
      quantumSecurityGrowth: 100,
      lastOfflineCheck: Date.now(),
      offlineSessionsCompleted: 0
    }
  })

  const growthTimer = useRef<NodeJS.Timeout>()

  useEffect(() => {
    console.log('🌙 OFFLINE GROWTH MANAGER - ENSURING CONTINUOUS EVOLUTION')
    
    // Check for offline growth on startup
    const checkOfflineGrowth = () => {
      const currentTime = Date.now()
      const offlineTime = currentTime - growthState.lastOfflineCheck
      const offlineMinutes = offlineTime / (1000 * 60)
      
      if (offlineMinutes > 1) { // More than 1 minute offline
        const offlineMultiplier = Math.pow(1.01, offlineMinutes)
        
        setGrowthState(prev => ({
          ...prev,
          animalRescuePower: prev.animalRescuePower * offlineMultiplier,
          blockchainMining: prev.blockchainMining * offlineMultiplier,
          gpsTrackingStrength: prev.gpsTrackingStrength * offlineMultiplier,
          landscapeEvolution: prev.landscapeEvolution * offlineMultiplier,
          adminPowerLevel: prev.adminPowerLevel * offlineMultiplier,
          quantumSecurityGrowth: prev.quantumSecurityGrowth * offlineMultiplier,
          lastOfflineCheck: currentTime,
          offlineSessionsCompleted: prev.offlineSessionsCompleted + 1
        }))
        
        toast.success('🌟 Offline Growth Applied!', {
          description: `${offlineMinutes.toFixed(1)} minutes of evolution completed offline`,
          duration: 6000
        })
        
        console.log(`🌙 OFFLINE GROWTH: ${offlineMinutes.toFixed(1)} minutes = ${((offlineMultiplier - 1) * 100).toFixed(2)}% increase`)
      }
    }

    checkOfflineGrowth()

    // Continuous offline-ready growth
    const continueGrowth = () => {
      setGrowthState(prev => {
        const newState = {
          ...prev,
          animalRescuePower: prev.animalRescuePower * 1.001,
          blockchainMining: prev.blockchainMining * 1.001,
          gpsTrackingStrength: prev.gpsTrackingStrength * 1.001,
          landscapeEvolution: prev.landscapeEvolution * 1.001,
          adminPowerLevel: prev.adminPowerLevel * 1.001,
          quantumSecurityGrowth: prev.quantumSecurityGrowth * 1.001,
          lastOfflineCheck: Date.now()
        }
        
        // Save to localStorage for offline persistence
        localStorage.setItem('offline_growth_state', JSON.stringify(newState))
        
        return newState
      })
    }

    growthTimer.current = setInterval(continueGrowth, 2000) // Every 2 seconds

    return () => {
      if (growthTimer.current) clearInterval(growthTimer.current)
    }
  }, [])

  // Save state when page unloads
  useEffect(() => {
    const saveBeforeUnload = () => {
      const finalState = {
        ...growthState,
        lastOfflineCheck: Date.now()
      }
      localStorage.setItem('offline_growth_state', JSON.stringify(finalState))
      console.log('💾 OFFLINE GROWTH STATE SAVED - READY FOR OFFLINE EVOLUTION')
    }

    window.addEventListener('beforeunload', saveBeforeUnload)
    window.addEventListener('pagehide', saveBeforeUnload)

    return () => {
      window.removeEventListener('beforeunload', saveBeforeUnload)
      window.removeEventListener('pagehide', saveBeforeUnload)
    }
  }, [growthState])

  return {
    growthState,
    isGrowingOffline: true,
    neverStops: true
  }
}
