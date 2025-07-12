
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { TokenManagement } from './TokenManagement'
import { DefenseCreatureArmy } from './DefenseCreatureArmy'
import { SearchTrackingSuite } from './SearchTrackingSuite'
import { EntertainmentRewardsHub } from './EntertainmentRewardsHub'
import { AdvancedBreachProtocol } from '../security/AdvancedBreachProtocol'
import { AIEngineCapabilities } from './AIEngineCapabilities'
import { RefactoredSecuritySuite } from './RefactoredSecuritySuite'
import { RefactoredAdminTools } from './RefactoredAdminTools'
import { UltimateCapabilitiesMatrix } from './UltimateCapabilitiesMatrix'
import { Phase2CompletionSuite } from './Phase2CompletionSuite'
import { Phase3CompletionSuite } from './Phase3CompletionSuite'
import { SystemConsistencyScanner } from './SystemConsistencyScanner'
import { GreenProjectManager } from './GreenProjectManager'

export function AdminDashboardTabs() {
  return (
    <Tabs defaultValue="green-projects" className="w-full">
      <TabsList className="grid w-full grid-cols-6 lg:grid-cols-13">
        <TabsTrigger value="green-projects">Green Projects</TabsTrigger>
        <TabsTrigger value="consistency">System Scan</TabsTrigger>
        <TabsTrigger value="phase2">Phase 2</TabsTrigger>
        <TabsTrigger value="phase3">Phase 3</TabsTrigger>
        <TabsTrigger value="tokens">Tokens</TabsTrigger>
        <TabsTrigger value="defense">Defense</TabsTrigger>
        <TabsTrigger value="search">Search</TabsTrigger>
        <TabsTrigger value="entertainment">Entertainment</TabsTrigger>
        <TabsTrigger value="breach">Breach Protocol</TabsTrigger>
        <TabsTrigger value="ai-engine">AI Engine</TabsTrigger>
        <TabsTrigger value="security">Security</TabsTrigger>
        <TabsTrigger value="tools">Admin Tools</TabsTrigger>
        <TabsTrigger value="capabilities">Capabilities</TabsTrigger>
      </TabsList>

      <TabsContent value="green-projects" className="space-y-6">
        <GreenProjectManager />
      </TabsContent>

      <TabsContent value="consistency" className="space-y-6">
        <SystemConsistencyScanner />
      </TabsContent>
      
      <TabsContent value="phase2" className="space-y-6">
        <Phase2CompletionSuite />
      </TabsContent>
      
      <TabsContent value="phase3" className="space-y-6">
        <Phase3CompletionSuite />
      </TabsContent>
      
      <TabsContent value="tokens" className="space-y-6">
        <TokenManagement />
      </TabsContent>
      
      <TabsContent value="defense" className="space-y-6">
        <DefenseCreatureArmy />
      </TabsContent>
      
      <TabsContent value="search" className="space-y-6">
        <SearchTrackingSuite />
      </TabsContent>
      
      <TabsContent value="entertainment" className="space-y-6">
        <EntertainmentRewardsHub />
      </TabsContent>
      
      <TabsContent value="breach" className="space-y-6">
        <AdvancedBreachProtocol />
      </TabsContent>
      
      <TabsContent value="ai-engine" className="space-y-6">
        <AIEngineCapabilities />
      </TabsContent>
      
      <TabsContent value="security" className="space-y-6">
        <RefactoredSecuritySuite />
      </TabsContent>
      
      <TabsContent value="tools" className="space-y-6">
        <RefactoredAdminTools />
      </TabsContent>
      
      <TabsContent value="capabilities" className="space-y-6">
        <UltimateCapabilitiesMatrix />
      </TabsContent>
    </Tabs>
  )
}
