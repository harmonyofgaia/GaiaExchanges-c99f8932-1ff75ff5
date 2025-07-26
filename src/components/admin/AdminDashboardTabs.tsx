
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AdminControlSystem } from '@/components/AdminControlSystem'
import { RefactoredAdminTools } from './RefactoredAdminTools'
import { UltimateSecurity } from './UltimateSecurity'
import { AdminRecoveryPortal } from '@/components/security/AdminRecoveryPortal'
import { PlanRecoverySystem } from './PlanRecoverySystem'
import { HolisticAnalysis } from './HolisticAnalysis'
import { AnimalWelfareControlPanel } from './AnimalWelfareControlPanel'
import { OmniscientGPSEngine } from '@/components/tracking/OmniscientGPSEngine'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export function AdminDashboardTabs() {
  return (
    <Tabs defaultValue="control" className="w-full">
      <TabsList className="grid w-full grid-cols-8">
        <TabsTrigger value="control">Control Center</TabsTrigger>
        <TabsTrigger value="tracking">🛰️ Live Tracking</TabsTrigger>
        <TabsTrigger value="animal-welfare">🐾 Animal Welfare</TabsTrigger>
        <TabsTrigger value="security">Security Suite</TabsTrigger>
        <TabsTrigger value="tools">Admin Tools</TabsTrigger>
        <TabsTrigger value="recovery">Recovery Portal</TabsTrigger>
        <TabsTrigger value="plans">Plan Recovery</TabsTrigger>
        <TabsTrigger value="analysis">Deep Analysis</TabsTrigger>
      </TabsList>

      <TabsContent value="control" className="space-y-6">
        <AdminControlSystem />
      </TabsContent>

      <TabsContent value="tracking" className="space-y-6">
        <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              🛰️ Admin Live Tracking System
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Omniscient GPS tracking with quantum-level accuracy - ADMIN ACCESS ONLY
            </p>
          </CardHeader>
          <CardContent>
            <div className="bg-red-900/20 border border-red-500/50 rounded-lg p-4 mb-6">
              <p className="text-red-400 text-center font-bold">
                🔒 RESTRICTED ACCESS: This tracking system is only available to authenticated administrators
              </p>
            </div>
            <OmniscientGPSEngine />
          </CardContent>
        </Card>
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
