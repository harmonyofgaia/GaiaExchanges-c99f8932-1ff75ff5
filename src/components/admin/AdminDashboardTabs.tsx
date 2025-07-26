
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AdminControlSystem } from '@/components/AdminControlSystem'
import { RefactoredAdminTools } from './RefactoredAdminTools'
import { UltimateSecurity } from './UltimateSecurity'
import { AdminRecoveryPortal } from '@/components/security/AdminRecoveryPortal'
import { PlanRecoverySystem } from './PlanRecoverySystem'
import { HolisticAnalysis } from './HolisticAnalysis'
import { AnimalWelfareControlPanel } from './AnimalWelfareControlPanel'
import { AdminVisualControls } from './AdminVisualControls'
import { SecureAdminQuantumIAEnginePanel } from '@/components/SecureAdminQuantumIAEnginePanel'
import { HuntingHackersSection } from './HuntingHackersSection'
import { SystemDiagnosticsModule } from './SystemDiagnosticsModule'
import { AdvancedControlDashboard } from './AdvancedControlDashboard'

export function AdminDashboardTabs() {
  return (
    <Tabs defaultValue="hunting-hackers" className="w-full">
      <TabsList className="grid w-full grid-cols-12">
        <TabsTrigger value="hunting-hackers" className="bg-gradient-to-r from-red-600/20 to-purple-600/20 border border-red-500/30">
          🎯 Hunting Hackers
        </TabsTrigger>
        <TabsTrigger value="diagnostics" className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30">
          🔍 Diagnostics
        </TabsTrigger>
        <TabsTrigger value="advanced-control" className="bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30">
          🚀 Advanced Control
        </TabsTrigger>
        <TabsTrigger value="control">Control Center</TabsTrigger>
        <TabsTrigger value="visual">🎨 Visual Controls</TabsTrigger>
        <TabsTrigger value="animal-welfare">🐾 Animal Welfare</TabsTrigger>
        <TabsTrigger value="security">Security Suite</TabsTrigger>
        <TabsTrigger value="tools">Admin Tools</TabsTrigger>
        <TabsTrigger value="recovery">Recovery Portal</TabsTrigger>
        <TabsTrigger value="plans">Plan Recovery</TabsTrigger>
        <TabsTrigger value="analysis">Deep Analysis</TabsTrigger>
        <TabsTrigger value="quantum-ia" className="bg-gradient-to-r from-purple-600/20 to-gold/20 border border-purple-500/30">
          👑 Quantum IA
        </TabsTrigger>
      </TabsList>

      <TabsContent value="hunting-hackers" className="space-y-6">
        <HuntingHackersSection />
      </TabsContent>

      <TabsContent value="diagnostics" className="space-y-6">
        <SystemDiagnosticsModule />
      </TabsContent>

      <TabsContent value="advanced-control" className="space-y-6">
        <AdvancedControlDashboard />
      </TabsContent>

      <TabsContent value="control" className="space-y-6">
        <AdminControlSystem />
      </TabsContent>

      <TabsContent value="visual" className="space-y-6">
        <AdminVisualControls />
      </TabsContent>

      <TabsContent value="animal-welfare" className="space-y-6">
        <AnimalWelfareControlPanel />
      </TabsContent>

      <TabsContent value="security" className="space-y-6">
        <UltimateSecurity />
      </TabsContent>

      <TabsContent value="tools" className="space-y-6">
        <RefactoredAdminTools />
      </TabsContent>

      <TabsContent value="recovery" className="space-y-6">
        <AdminRecoveryPortal />
      </TabsContent>

      <TabsContent value="plans" className="space-y-6">
        <PlanRecoverySystem />
      </TabsContent>

      <TabsContent value="analysis" className="space-y-6">
        <HolisticAnalysis />
      </TabsContent>

      <TabsContent value="quantum-ia" className="space-y-6">
        <SecureAdminQuantumIAEnginePanel />
      </TabsContent>
    </Tabs>
  )
}
