
import { AdvancedBreachProtocol } from '@/components/security/AdvancedBreachProtocol'
import { AIEngineCapabilities } from './AIEngineCapabilities'
import { InvisibleDefenseMatrix } from '@/components/security/InvisibleDefenseMatrix'
import { UltimateSecurityOrchestrator } from '@/components/security/UltimateSecurityOrchestrator'
import { DragonSecurityDashboard } from '@/components/security/DragonSecurityDashboard'

export function RefactoredSecuritySuite() {
  return (
    <div className="space-y-8">
      <AdvancedBreachProtocol />
      <AIEngineCapabilities />
      <InvisibleDefenseMatrix />
      <UltimateSecurityOrchestrator />
      <DragonSecurityDashboard />
    </div>
  )
}
