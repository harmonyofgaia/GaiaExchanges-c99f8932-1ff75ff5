
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RefactoredAdminTools } from './RefactoredAdminTools'
import { RefactoredSecuritySuite } from './RefactoredSecuritySuite'
import { UltimateAIEngineSuite } from './UltimateAIEngineSuite'
import { SupremeControlSuite } from './SupremeControlSuite'
import { LiveArtistShow } from './LiveArtistShow'
import { ParabolicAIThinking } from './ParabolicAIThinking'

export function AdminDashboardTabs() {
  return (
    <Tabs defaultValue="tools" className="w-full">
      <TabsList className="grid w-full grid-cols-6">
        <TabsTrigger value="tools">🛠️ Admin Tools</TabsTrigger>
        <TabsTrigger value="security">🛡️ Security</TabsTrigger>
        <TabsTrigger value="ai-engine">🌌 Ultimate AI</TabsTrigger>
        <TabsTrigger value="supreme-control">👑 Supreme Control</TabsTrigger>
        <TabsTrigger value="live-artist">🎭 Live Artist Show</TabsTrigger>
        <TabsTrigger value="ai-thinking">🧠 Parabolic AI</TabsTrigger>
      </TabsList>

      <TabsContent value="tools" className="space-y-6">
        <RefactoredAdminTools />
      </TabsContent>

      <TabsContent value="security" className="space-y-6">
        <RefactoredSecuritySuite />
      </TabsContent>

      <TabsContent value="ai-engine" className="space-y-6">
        <UltimateAIEngineSuite />
      </TabsContent>

      <TabsContent value="supreme-control" className="space-y-6">
        <SupremeControlSuite />
      </TabsContent>

      <TabsContent value="live-artist" className="space-y-6">
        <LiveArtistShow />
      </TabsContent>

      <TabsContent value="ai-thinking" className="space-y-6">
        <ParabolicAIThinking />
      </TabsContent>
    </Tabs>
  )
}
