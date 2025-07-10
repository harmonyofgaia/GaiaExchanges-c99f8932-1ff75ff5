
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { UserManagementSystemRefactored } from './UserManagementSystemRefactored'
import { AdminLiveTrackingCenter } from './AdminLiveTrackingCenter'
import { BIOSProtection } from '@/components/security/BIOSProtection'
import { MediaLibraryManager } from './MediaLibraryManager'
import { AIAnimalTrainingCenter } from './AIAnimalTrainingCenter'
import { AdminPowerToolsCenter } from './AdminPowerToolsCenter'
import { AdminTransactionControl } from './AdminTransactionControl'

export function AdminDashboardTabs() {
  return (
    <Tabs defaultValue="live-tracking" className="w-full">
      <TabsList className="grid w-full grid-cols-7">
        <TabsTrigger value="live-tracking">🛰️ Live Tracking</TabsTrigger>
        <TabsTrigger value="user-management">👥 Users</TabsTrigger>
        <TabsTrigger value="media-library">🎵 Media</TabsTrigger>
        <TabsTrigger value="ai-training">🦎 AI Training</TabsTrigger>
        <TabsTrigger value="power-tools">⚡ Power Tools</TabsTrigger>
        <TabsTrigger value="transactions">💰 Transactions</TabsTrigger>
        <TabsTrigger value="security">🛡️ Security</TabsTrigger>
      </TabsList>

      <TabsContent value="live-tracking" className="space-y-6">
        <AdminLiveTrackingCenter />
      </TabsContent>

      <TabsContent value="user-management" className="space-y-6">
        <UserManagementSystemRefactored />
      </TabsContent>

      <TabsContent value="media-library" className="space-y-6">
        <MediaLibraryManager />
      </TabsContent>

      <TabsContent value="ai-training" className="space-y-6">
        <AIAnimalTrainingCenter />
      </TabsContent>

      <TabsContent value="power-tools" className="space-y-6">
        <AdminPowerToolsCenter />
      </TabsContent>

      <TabsContent value="transactions" className="space-y-6">
        <AdminTransactionControl />
      </TabsContent>

      <TabsContent value="security" className="space-y-6">
        <BIOSProtection />
      </TabsContent>
    </Tabs>
  )
}
