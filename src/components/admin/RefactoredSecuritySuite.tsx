
import { AdvancedBreachProtocol } from '@/components/security/AdvancedBreachProtocol'
import { AIEngineCapabilities } from './AIEngineCapabilities'
import { InvisibleDefenseMatrix } from '@/components/security/InvisibleDefenseMatrix'
import { UltimateSecurityOrchestrator } from '@/components/security/UltimateSecurityOrchestrator'
import { DragonSecurityDashboard } from '@/components/security/DragonSecurityDashboard'
import { QuantumFortressDashboard } from '@/components/security/QuantumFortressDashboard'
import { ThreatIntelligenceDashboard } from '@/components/security/ThreatIntelligenceDashboard'
import { BlockchainSupremacyDashboard } from '@/components/security/BlockchainSupremacyDashboard'
import { TokenWarfareDashboard } from '@/components/security/TokenWarfareDashboard'
import { AdminDominationDashboard } from '@/components/security/AdminDominationDashboard'
import { InvisibleDefenseDashboard } from '@/components/security/InvisibleDefenseDashboard'
import { WeaponizedCounterAttackDashboard } from '@/components/security/WeaponizedCounterAttackDashboard'
import { GlobalSurveillanceDashboard } from '@/components/security/GlobalSurveillanceDashboard'
import { QuantumAIDashboard } from '@/components/security/QuantumAIDashboard'

export function RefactoredSecuritySuite() {
  return (
    <div className="space-y-8">
      {/* Phase 1: Quantum Fortress Foundation */}
      <QuantumFortressDashboard />
      
      {/* Phase 2: Enhanced Threat Intelligence Matrix */}
      <ThreatIntelligenceDashboard />
      
      {/* Phase 3: Blockchain Supremacy Engine */}
      <BlockchainSupremacyDashboard />
      
      {/* Phase 4: Token Warfare & Economic Domination */}
      <TokenWarfareDashboard />
      
      {/* Phase 5: Ultimate Admin Domination Arsenal */}
      <AdminDominationDashboard />
      
      {/* Phase 6: Invisible Defense & Stealth Matrix */}
      <InvisibleDefenseDashboard />
      
      {/* Phase 7: Weaponized Counter-Attack Systems */}
      <WeaponizedCounterAttackDashboard />
      
      {/* Phase 8: Global Surveillance & Intelligence Network */}
      <GlobalSurveillanceDashboard />
      
      {/* Phase 9: Quantum-AI Supremacy */}
      <QuantumAIDashboard />
      
      {/* Existing Security Systems */}
      <AdvancedBreachProtocol />
      <AIEngineCapabilities />
      <InvisibleDefenseMatrix />
      <UltimateSecurityOrchestrator />
      <DragonSecurityDashboard />
    </div>
  )
}
