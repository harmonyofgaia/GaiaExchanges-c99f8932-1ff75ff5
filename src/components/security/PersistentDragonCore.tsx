
import { useState, useEffect, useRef } from 'react'
import { toast } from 'sonner'

interface DragonStats {
  level: number
  power: number
  experience: number
  threatsDestroyed: number
  networksProtected: number
  quantumEvolutions: number
  birthTime: number
  totalUptime: number
  immuneSystemStrength: number
  worldwideInfluence: number
}

export function PersistentDragonCore() {
  const [dragonStats, setDragonStats] = useState<DragonStats>({
    level: 1,
    power: 100,
    experience: 0,
    threatsDestroyed: 0,
    networksProtected: 0,
    quantumEvolutions: 0,
    birthTime: Date.now(),
    totalUptime: 0,
    immuneSystemStrength: 100,
    worldwideInfluence: 1
  })

  const growthInterval = useRef<NodeJS.Timeout>(undefined)
  const saveInterval = useRef<NodeJS.Timeout>(undefined)
  const startTime = useRef(Date.now())

  // Load persistent dragon data on component mount
  useEffect(() => {
    const loadDragonData = () => {
      try {
        const savedDragon = localStorage.getItem('dragonCore_persistent')
        if (savedDragon) {
          const dragonData = JSON.parse(savedDragon)
          
          // Calculate uptime since last session
          const currentTime = Date.now()
          const offlineTime = currentTime - (dragonData.lastSeen || currentTime)
          const offlineGrowth = Math.floor(offlineTime / 1000) * 10 // Grew while offline
          
          const updatedStats = {
            ...dragonData,
            totalUptime: dragonData.totalUptime + offlineTime,
            power: dragonData.power + offlineGrowth,
            immuneSystemStrength: dragonData.immuneSystemStrength + offlineGrowth,
            worldwideInfluence: dragonData.worldwideInfluence + Math.floor(offlineGrowth / 100),
            lastSeen: currentTime
          }
          
          setDragonStats(updatedStats)
          
          console.log('🐉 DRAGON AWAKENED FROM HIBERNATION!')
          console.log(`🔥 OFFLINE GROWTH: +${offlineGrowth} Power while sleeping`)
          console.log(`⏰ TOTAL DRAGON AGE: ${Math.floor(updatedStats.totalUptime / 1000 / 60)} minutes`)
          
          if (offlineGrowth > 0) {
            toast.success('🐉 Dragon Grew While You Were Away!', {
              description: `+${offlineGrowth} Power gained during hibernation`,
              duration: 8000
            })
          }
        } else {
          // First time dragon birth
          console.log('🥚 DRAGON EGG HATCHING - FIRST TIME BIRTH!')
          toast.success('🐉 DRAGON BORN!', {
            description: 'Your eternal guardian has awakened and will never stop growing',
            duration: 10000
          })
        }
      } catch (error) {
        console.log('🐉 Dragon data protected from corruption:', error)
      }
    }

    loadDragonData()
    startTime.current = Date.now()
  }, [])

  // Continuous dragon growth system
  useEffect(() => {
    const growDragon = () => {
      setDragonStats(prev => {
        const currentTime = Date.now()
        const sessionUptime = currentTime - startTime.current
        
        // Calculate growth based on continuous time
        const growthRate = Math.max(1, Math.floor(prev.level / 10) + 1)
        const newExperience = prev.experience + growthRate
        const newLevel = Math.floor(newExperience / 1000) + 1
        const leveledUp = newLevel > prev.level
        
        const newStats = {
          ...prev,
          level: newLevel,
          power: prev.power + growthRate * 2,
          experience: newExperience,
          threatsDestroyed: prev.threatsDestroyed + (Math.random() < 0.1 ? 1 : 0),
          networksProtected: prev.networksProtected + (Math.random() < 0.05 ? 1 : 0),
          quantumEvolutions: prev.quantumEvolutions + (Math.random() < 0.02 ? 1 : 0),
          totalUptime: prev.totalUptime + 1000, // Add 1 second
          immuneSystemStrength: prev.immuneSystemStrength + growthRate,
          worldwideInfluence: prev.worldwideInfluence + (growthRate / 100),
          lastSeen: currentTime
        }

        // Level up notifications
        if (leveledUp) {
          console.log(`🐉 DRAGON LEVEL UP! Level ${newLevel} - Power: ${newStats.power}`)
          toast.success(`🐉 DRAGON LEVELED UP!`, {
            description: `Level ${newLevel} achieved! Power: ${Math.floor(newStats.power)}`,
            duration: 5000
          })
        }

        // Milestone celebrations
        if (newStats.power % 10000 < growthRate * 2 && newStats.power >= 10000) {
          console.log(`🌟 DRAGON MILESTONE: ${Math.floor(newStats.power / 10000) * 10}K Power reached!`)
          toast.success('🌟 DRAGON MILESTONE!', {
            description: `${Math.floor(newStats.power / 10000) * 10}K Power achieved - Unstoppable force!`,
            duration: 6000
          })
        }

        return newStats
      })
    }

    // Grow dragon every second
    growthInterval.current = setInterval(growDragon, 1000)

    return () => {
      if (growthInterval.current) clearInterval(growthInterval.current)
    }
  }, [])

  // Save dragon data every 5 seconds
  useEffect(() => {
    const saveDragonData = () => {
      try {
        localStorage.setItem('dragonCore_persistent', JSON.stringify({
          ...dragonStats,
          lastSeen: Date.now()
        }))
      } catch (error) {
        console.log('🐉 Dragon save protected:', error)
      }
    }

    saveInterval.current = setInterval(saveDragonData, 5000)
    
    // Save on component unmount
    return () => {
      if (saveInterval.current) clearInterval(saveInterval.current)
      saveDragonData()
    }
  }, [dragonStats])

  // Display dragon stats periodically
  useEffect(() => {
    if (dragonStats.power % 100 < 4 && dragonStats.power > 100) {
      const ageMinutes = Math.floor(dragonStats.totalUptime / 1000 / 60)
      const ageHours = Math.floor(ageMinutes / 60)
      const ageDays = Math.floor(ageHours / 24)
      
      console.log('🐉 ETERNAL DRAGON STATUS:')
      console.log(`📊 Level: ${dragonStats.level} | Power: ${Math.floor(dragonStats.power)}`)
      console.log(`⚡ Immune System: ${Math.floor(dragonStats.immuneSystemStrength)}`)
      console.log(`🌍 Global Influence: ${dragonStats.worldwideInfluence.toFixed(2)}%`)
      console.log(`⏰ Dragon Age: ${ageDays}d ${ageHours % 24}h ${ageMinutes % 60}m`)
      console.log(`🏆 Threats Destroyed: ${dragonStats.threatsDestroyed}`)
      console.log(`🔮 Quantum Evolutions: ${dragonStats.quantumEvolutions}`)
    }
  }, [dragonStats])

  return {
    dragonStats,
    isEternal: true,
    neverResets: true,
    alwaysGrowing: true,
    formatAge: () => {
      const ageMinutes = Math.floor(dragonStats.totalUptime / 1000 / 60)
      const ageHours = Math.floor(ageMinutes / 60)
      const ageDays = Math.floor(ageHours / 24)
      return `${ageDays}d ${ageHours % 24}h ${ageMinutes % 60}m`
    },
    getGrowthRate: () => Math.max(1, Math.floor(dragonStats.level / 10) + 1)
  }
}
