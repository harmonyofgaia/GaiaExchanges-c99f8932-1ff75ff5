
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RefactoredAdminTools } from './RefactoredAdminTools'
import { RefactoredSecuritySuite } from './RefactoredSecuritySuite'
import { UltimateAIEngineSuite } from './UltimateAIEngineSuite'
import { SupremeControlSuite } from './SupremeControlSuite'
import { LiveArtistShow } from './LiveArtistShow'
import { ParabolicAIThinking } from './ParabolicAIThinking'
import { AudioEngineManager } from './AudioEngineManager'
import { ThunderstormDefense } from './ThunderstormDefense'
import { InvisibleDolphin } from './InvisibleDolphin'
import { AdminMediaLibrary } from './AdminMediaLibrary'
import { MarketingTokenSuite } from './MarketingTokenSuite'

export function AdminDashboardTabs() {
  return (
    <Tabs defaultValue="storage" className="w-full">
      <TabsList className="grid w-full grid-cols-5 lg:grid-cols-11 text-xs">
        <TabsTrigger value="storage">📁 Storage</TabsTrigger>
        <TabsTrigger value="marketing">🚀 Marketing</TabsTrigger>
        <TabsTrigger value="tools">🛠️ Tools</TabsTrigger>
        <TabsTrigger value="security">🛡️ Security</TabsTrigger>
        <TabsTrigger value="ai-engine">🌌 AI Engine</TabsTrigger>
        <TabsTrigger value="supreme-control">👑 Supreme</TabsTrigger>
        <TabsTrigger value="live-artist">🎭 Artist</TabsTrigger>
        <TabsTrigger value="ai-thinking">🧠 AI Brain</TabsTrigger>
        <TabsTrigger value="audio-engine">🎵 Audio</TabsTrigger>
        <TabsTrigger value="thunderstorm">⚡ Defense</TabsTrigger>
        <TabsTrigger value="dolphin">🐬 Dolphin</TabsTrigger>
      </TabsList>

      <TabsContent value="storage" className="space-y-6">
        <AdminMediaLibrary />
      </TabsContent>

      <TabsContent value="marketing" className="space-y-6">
        <MarketingTokenSuite />
      </TabsContent>

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

      <TabsContent value="audio-engine" className="space-y-6">
        <AudioEngineManager />
      </TabsContent>

      <TabsContent value="thunderstorm" className="space-y-6">
        <ThunderstormDefense />
      </TabsContent>

      <TabsContent value="dolphin" className="space-y-6">
        <InvisibleDolphin />
      </TabsContent>
    </Tabs>
  )
}
