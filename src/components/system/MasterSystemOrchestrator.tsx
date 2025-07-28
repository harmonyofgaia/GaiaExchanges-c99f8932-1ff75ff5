
import { useEffect, useRef } from 'react'
import { PersistentEvolutionEngine } from './PersistentEvolutionEngine'
import { CrossPagePersistence } from './CrossPagePersistence'
import { OfflineGrowthManager } from './OfflineGrowthManager'
import { PersistentDragonCore } from '@/components/security/PersistentDragonCore'
import { UpgradeSafeCloudOrchestrator } from '@/components/cloud/UpgradeSafeCloudOrchestrator'

export function MasterSystemOrchestrator() {
  const evolutionEngine = PersistentEvolutionEngine()
  const offlineGrowth = OfflineGrowthManager()
  const dragonCore = PersistentDragonCore()
  const cloudOrchestrator = UpgradeSafeCloudOrchestrator()
  const lastSystemReport = useRef(0)

  useEffect(() => {
    console.log('👑 MASTER SYSTEM ORCHESTRATOR - OPTIMIZED UNIFICATION')
    
    const systemStatus = setInterval(() => {
      // Only log detailed status every 5 minutes to reduce console spam
      const now = Date.now()
      if (now - lastSystemReport.current > 300000) { // 5 minutes
        const transcendentStatus = cloudOrchestrator.getTranscendentSystemStatus()
        
        console.log('📊 OPTIMIZED MASTER SYSTEM STATUS:')
        console.log(`🔥 Evolution Power: ${evolutionEngine.getTotalPower()}`)
        console.log(`🐉 Dragon Age: ${dragonCore.formatAge()}`)
        console.log(`☁️ Cloud Power: ${Math.floor(transcendentStatus.totalPower).toLocaleString()}`)
        console.log('✅ ALL SYSTEMS: OPTIMIZED AND STABLE')
        
        lastSystemReport.current = now
      }
    }, 300000) // Every 5 minutes instead of 25 seconds

    return () => clearInterval(systemStatus)
  }, [evolutionEngine, dragonCore, offlineGrowth, cloudOrchestrator])

  return (
    <>
      <CrossPagePersistence />
    </>
  )
}
