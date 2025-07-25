
import { useEffect } from 'react'
import { PersistentEvolutionEngine } from './PersistentEvolutionEngine'
import { CrossPagePersistence } from './CrossPagePersistence'
import { OfflineGrowthManager } from './OfflineGrowthManager'
import { PersistentDragonCore } from '@/components/security/PersistentDragonCore'

// Reduced logging for better user experience
const DEBUG_MODE = false;

export function MasterSystemOrchestrator() {
  const evolutionEngine = PersistentEvolutionEngine()
  const offlineGrowth = OfflineGrowthManager()
  const dragonCore = PersistentDragonCore()

  useEffect(() => {
    if (DEBUG_MODE) {
      console.log('👑 MASTER SYSTEM ORCHESTRATOR - ALL SYSTEMS UNIFIED')
      console.log('🚀 CONTINUOUS EVOLUTION: ACTIVE')
      console.log('🌙 OFFLINE GROWTH: ENABLED')
      console.log('🔄 CROSS-PAGE PERSISTENCE: MAINTAINED')
      console.log('🐉 DRAGON SYSTEMS: ETERNAL')
      console.log('⚡ NEVER STOPS GROWING: CONFIRMED')
      
      const systemStatus = setInterval(() => {
        console.log('📊 MASTER SYSTEM STATUS:')
        console.log(`🔥 Evolution Power: ${evolutionEngine.getTotalPower()}`)
        console.log(`🐉 Dragon Age: ${dragonCore.formatAge()}`)
        console.log(`🌙 Offline Sessions: ${offlineGrowth.growthState.offlineSessionsCompleted}`)
        console.log(`⚡ Growth Rate: ${evolutionEngine.getGrowthRate()}`)
        console.log('✅ ALL SYSTEMS: CONTINUOUSLY IMPROVING')
      }, 30000) // Every 30 seconds

      return () => clearInterval(systemStatus)
    }
  }, [])

  return (
    <>
      <CrossPagePersistence />
    </>
  )
}
