
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AdminControlSystem } from '@/components/AdminControlSystem'
import { RefactoredAdminTools } from './RefactoredAdminTools'
import { UltimateSecurity } from './UltimateSecurity'
import { AdminRecoveryPortal } from '@/components/security/AdminRecoveryPortal'
import { PlanRecoverySystem } from './PlanRecoverySystem'
import { HolisticAnalysis } from './HolisticAnalysis'
import { VideoExchangeDashboard } from './VideoExchangeDashboard'
import { UserManagementSystem } from './UserManagementSystem'
import { PsychohistoricalEngine } from './PsychohistoricalEngine'
import { KoalaAIEngine } from './KoalaAIEngine'
import { AdminMediaLibrary } from './AdminMediaLibrary'
import { SystemHealthDashboard } from './SystemHealthDashboard'

export function AdminDashboardTabs() {
  return (
    <Tabs defaultValue="control" className="w-full">
      <TabsList className="grid w-full grid-cols-4 lg:grid-cols-6 xl:grid-cols-12 gap-1">
        <TabsTrigger value="control" className="text-xs">Control Center</TabsTrigger>
        <TabsTrigger value="video" className="text-xs">Video Exchange</TabsTrigger>
        <TabsTrigger value="users" className="text-xs">User Management</TabsTrigger>
        <TabsTrigger value="ai" className="text-xs">AI Engines</TabsTrigger>
        <TabsTrigger value="psycho" className="text-xs">Psychohistorical</TabsTrigger>
        <TabsTrigger value="media" className="text-xs">Media Library</TabsTrigger>
        <TabsTrigger value="health" className="text-xs">System Health</TabsTrigger>
        <TabsTrigger value="security" className="text-xs">Security Suite</TabsTrigger>
        <TabsTrigger value="tools" className="text-xs">Admin Tools</TabsTrigger>
        <TabsTrigger value="recovery" className="text-xs">Recovery Portal</TabsTrigger>
        <TabsTrigger value="plans" className="text-xs">Plan Recovery</TabsTrigger>
        <TabsTrigger value="analysis" className="text-xs">Deep Analysis</TabsTrigger>
      </TabsList>

      <TabsContent value="control" className="space-y-6">
        <AdminControlSystem />
      </TabsContent>

      <TabsContent value="video" className="space-y-6">
        <VideoExchangeDashboard />
      </TabsContent>

      <TabsContent value="users" className="space-y-6">
        <UserManagementSystem />
      </TabsContent>

      <TabsContent value="ai" className="space-y-6">
        <KoalaAIEngine />
      </TabsContent>

      <TabsContent value="psycho" className="space-y-6">
        <PsychohistoricalEngine />
      </TabsContent>

      <TabsContent value="media" className="space-y-6">
        <AdminMediaLibrary />
      </TabsContent>

      <TabsContent value="health" className="space-y-6">
        <SystemHealthDashboard />
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
