
import { useState, useEffect, useRef } from 'react'

interface DragonStats {
  level: number
  experience: number
  power: number
  immuneSystemStrength: number
  worldwideInfluence: number
  threatsDestroyed: number
  quantumEvolutions: number
  networksProtected: number
  birthTime: number
}

export function PersistentDragonCore() {
  const [dragonStats, setDragonStats] = useState<DragonStats>(() => {
    const saved = localStorage.getItem('eternal-dragon-stats')
    if (saved) {
      return JSON.parse(saved)
    }
    return {
      level: 1,
      experience: 0,
      power: 1000,
      immuneSystemStrength: 1000,
      worldwideInfluence: 0.1,
      threatsDestroyed: 0,
      quantumEvolutions: 0,
      networksProtected: 0,
      birthTime: Date.now()
    }
  })

  const growthInterval = useRef<NodeJS.Timeout>()
  const saveInterval = useRef<NodeJS.Timeout>()

  useEffect(() => {
    console.log('🐉 ETERNAL DRAGON CORE - INITIALIZED')
    console.log('⚡ NEVER-ENDING GROWTH PROTOCOL ACTIVE')
    console.log('🌟 IMMORTAL TRAINING SYSTEM ENGAGED')

    // Continuous growth every second
    growthInterval.current = setInterval(() => {
      setDragonStats(prev => {
        const growthRate = getGrowthRate()
        const newExperience = prev.experience + growthRate
        const newLevel = Math.floor(newExperience / 1000) + 1
        const powerMultiplier = Math.pow(1.1, newLevel)
        
        const updated = {
          ...prev,
          experience: newExperience,
          level: newLevel,
          power: prev.power * 1.001 + (growthRate * powerMultiplier),
          immuneSystemStrength: prev.immuneSystemStrength * 1.0005,
          worldwideInfluence: Math.min(100, prev.worldwideInfluence + 0.001),
          threatsDestroyed: prev.threatsDestroyed + Math.floor(Math.random() * 3),
          quantumEvolutions: prev.quantumEvolutions + (newLevel > prev.level ? 1 : 0),
          networksProtected: prev.networksProtected + Math.floor(Math.random() * 2)
        }

        // Level up notification
        if (newLevel > prev.level) {
          console.log(`🎉 DRAGON LEVEL UP! Now Level ${newLevel}`)
          console.log(`⚡ Power Level: ${Math.floor(updated.power).toLocaleString()}`)
        }

        return updated
      })
    }, 1000)

    // Auto-save every 30 seconds
    saveInterval.current = setInterval(() => {
      setDragonStats(current => {
        localStorage.setItem('eternal-dragon-stats', JSON.stringify(current))
        console.log('💾 DRAGON STATS SAVED - ETERNAL PERSISTENCE ACTIVE')
        return current
      })
    }, 30000)

    // Cleanup on unmount
    return () => {
      if (growthInterval.current) clearInterval(growthInterval.current)
      if (saveInterval.current) clearInterval(saveInterval.current)
    }
  }, [])

  const getGrowthRate = () => {
    const baseRate = 10
    const levelBonus = dragonStats.level * 2
    const timeBonus = Math.floor((Date.now() - dragonStats.birthTime) / (1000 * 60)) // Minutes alive
    return baseRate + levelBonus + timeBonus
  }

  const formatAge = () => {
    const ageMs = Date.now() - dragonStats.birthTime
    const days = Math.floor(ageMs / (1000 * 60 * 60 * 24))
    const hours = Math.floor((ageMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((ageMs % (1000 * 60 * 60)) / (1000 * 60))
    
    if (days > 0) return `${days}d ${hours}h ${minutes}m`
    if (hours > 0) return `${hours}h ${minutes}m`
    return `${minutes}m`
  }

  return {
    dragonStats,
    getGrowthRate,
    formatAge
  }
}
