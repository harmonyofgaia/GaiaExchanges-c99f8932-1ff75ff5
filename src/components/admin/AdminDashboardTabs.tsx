
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
import { AdminDashboard } from './AdminDashboard'
import { AdvancedSecurityCenter } from './AdvancedSecurityCenter'
import { UltimateSecuritySuite } from './UltimateSecuritySuite'
import { FutureReadingMachine } from './FutureReadingMachine'
import { QuantumPartnershipEngine } from './QuantumPartnershipEngine'
import { GitHubAdminIntegration } from '../github/GitHubAdminIntegration'

export function AdminDashboardTabs() {
  return (
    <Tabs defaultValue="dashboard" className="w-full">
      <TabsList className="grid w-full grid-cols-7 mb-6">
        <TabsTrigger value="dashboard">System Dashboard</TabsTrigger>
        <TabsTrigger value="security">Advanced Security</TabsTrigger>
        <TabsTrigger value="ultimate">Ultimate Suite</TabsTrigger>
        <TabsTrigger value="future">Future Reading</TabsTrigger>
        <TabsTrigger value="partnerships">Partnership Engine</TabsTrigger>
        <TabsTrigger value="github">GitHub Control</TabsTrigger>
        <TabsTrigger value="analytics">Deep Analytics</TabsTrigger>
      </TabsList>
      
      <TabsContent value="dashboard">
        <AdminDashboard />
      </TabsContent>
      
      <TabsContent value="security">
        <AdvancedSecurityCenter />
      </TabsContent>
      
      <TabsContent value="ultimate">
        <UltimateSecuritySuite />
      </TabsContent>
      
      <TabsContent value="future">
        <FutureReadingMachine />
      </TabsContent>
      
      <TabsContent value="partnerships">
        <QuantumPartnershipEngine />
      </TabsContent>

      <TabsContent value="github">
        <GitHubAdminIntegration />
      </TabsContent>
      
      <TabsContent value="analytics">
        <Card className="p-6">
          <h3 className="text-2xl font-bold text-green-400 mb-4">🔍 Deep System Analytics</h3>
          <p className="text-muted-foreground">Advanced analytics dashboard with enhanced AI predictions...</p>
        </Card>
      </TabsContent>
    </Tabs>
  )
}
