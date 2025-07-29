
import { AdvancedBreachProtocol } from '@/components/security/AdvancedBreachProtocol'
import { AIEngineCapabilities } from './AIEngineCapabilities'
import { InvisibleDefenseMatrix } from '@/components/security/InvisibleDefenseMatrix'
import { UltimateSecurityOrchestrator } from '@/components/security/UltimateSecurityOrchestrator'
import { DragonSecurityDashboard } from '@/components/security/DragonSecurityDashboard'
import { QuantumFortressDashboard } from '@/components/security/QuantumFortressDashboard'
import { ThreatIntelligenceDashboard } from '@/components/security/ThreatIntelligenceDashboard'
import { BlockchainSupremacyDashboard } from '@/components/security/BlockchainSupremacyDashboard'

export function RefactoredSecuritySuite() {
  return (
    <div className="space-y-8">
      {/* Phase 1: Quantum Fortress Foundation */}
      <QuantumFortressDashboard />
      
      {/* Phase 2: Enhanced Threat Intelligence Matrix */}
      <ThreatIntelligenceDashboard />
      
      {/* Phase 3: Blockchain Supremacy Engine */}
      <BlockchainSupremacyDashboard />
      
      {/* Existing Security Systems */}
      <AdvancedBreachProtocol />
      <AIEngineCapabilities />
      <InvisibleDefenseMatrix />
      <UltimateSecurityOrchestrator />
      <DragonSecurityDashboard />
    </div>
  )
}
