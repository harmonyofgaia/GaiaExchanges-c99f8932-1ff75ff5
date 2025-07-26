
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { AdminControlSystem } from '@/components/AdminControlSystem'
import { RefactoredAdminTools } from './RefactoredAdminTools'
import { UltimateSecurity } from './UltimateSecurity'
import { AdminRecoveryPortal } from '@/components/security/AdminRecoveryPortal'
import { PlanRecoverySystem } from './PlanRecoverySystem'
import { HolisticAnalysis } from './HolisticAnalysis'
import { AnimalWelfareControlPanel } from './AnimalWelfareControlPanel'
import { AbsoluteSystemRule } from './AbsoluteSystemRule'

export function AdminDashboardTabs() {
  return (
    <Tabs defaultValue="rules" className="w-full">
      <TabsList className="grid w-full grid-cols-8">
        <TabsTrigger value="rules" className="relative bg-gradient-to-r from-red-600 to-orange-600 text-white font-bold">
          🚨 RULES
          <Badge className="absolute -top-2 -right-2 bg-red-500 text-white text-xs animate-pulse">
            CRITICAL
          </Badge>
        </TabsTrigger>
        <TabsTrigger value="control">Control Center</TabsTrigger>
        <TabsTrigger value="animal-welfare">🐾 Animal Welfare</TabsTrigger>
        <TabsTrigger value="security">Security Suite</TabsTrigger>
        <TabsTrigger value="tools">Admin Tools</TabsTrigger>
        <TabsTrigger value="recovery">Recovery Portal</TabsTrigger>
        <TabsTrigger value="plans">Plan Recovery</TabsTrigger>
        <TabsTrigger value="analysis">Deep Analysis</TabsTrigger>
      </TabsList>

      <TabsContent value="rules" className="space-y-6">
        <AbsoluteSystemRule />
      </TabsContent>

      <TabsContent value="control" className="space-y-6">
        <AdminControlSystem />
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
    </Tabs>
  )
}
