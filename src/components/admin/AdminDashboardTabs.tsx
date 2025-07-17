
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { RefactoredAdminTools } from './RefactoredAdminTools'
import { RefactoredSecuritySuite } from './RefactoredSecuritySuite'
import { UltimateAIEngineSuite } from './UltimateAIEngineSuite'
import { SupremeControlSuite } from './SupremeControlSuite'
import { LiveArtistHub } from './LiveArtistHub'
import { ParabolicAIThinking } from './ParabolicAIThinking'
import { AudioEngineManager } from './AudioEngineManager'
import { ThunderstormDefense } from './ThunderstormDefense'
import { InvisibleDolphin } from './InvisibleDolphin'
import { AdminMediaLibrary } from './AdminMediaLibrary'
import { MarketingTokenSuite } from './MarketingTokenSuite'
import { InvestorReadySystem } from './InvestorReadySystem'
import { AdvancedTacticsHub } from './AdvancedTacticsHub'
import { WalletEngineAdmin } from './WalletEngineAdmin'
import { PowerAnalyticsHub } from './PowerAnalyticsHub'
import { GlobalCommandCenter } from './GlobalCommandCenter'
import { QuantumDataProcessor } from './QuantumDataProcessor'
import { LiveAnimalNFTManager } from './LiveAnimalNFTManager'
import { AITaskManagerEngine } from './AITaskManagerEngine'

export function AdminDashboardTabs() {
  return (
    <Tabs defaultValue="live-artist" className="w-full">
      <TabsList className="grid w-full grid-cols-6 lg:grid-cols-15 text-xs">
        <TabsTrigger value="live-artist">🎭 Live Artist</TabsTrigger>
        <TabsTrigger value="media">🎵 Media Library</TabsTrigger>
        <TabsTrigger value="marketing">🚀 Marketing</TabsTrigger>
        <TabsTrigger value="investor">💼 Investors</TabsTrigger>
        <TabsTrigger value="tactics">⚔️ Tactics</TabsTrigger>
        <TabsTrigger value="tools">🛠️ Tools</TabsTrigger>
        <TabsTrigger value="security">🛡️ Security</TabsTrigger>
        <TabsTrigger value="ai-engine">🌌 AI Engine</TabsTrigger>
        <TabsTrigger value="supreme-control">👑 Supreme</TabsTrigger>
        <TabsTrigger value="ai-thinking">🧠 AI Brain</TabsTrigger>
        <TabsTrigger value="audio-engine">🎵 Audio</TabsTrigger>
        <TabsTrigger value="thunderstorm">⚡ Defense</TabsTrigger>
        <TabsTrigger value="dolphin">🐬 Dolphin</TabsTrigger>
        <TabsTrigger value="wallet-engine">💰 Wallets</TabsTrigger>
        <TabsTrigger value="power-analytics">📊 Analytics</TabsTrigger>
        <TabsTrigger value="global-command">🌍 Global</TabsTrigger>
        <TabsTrigger value="quantum-data">⚛️ Quantum</TabsTrigger>
        <TabsTrigger value="animal-nft">🦁 Animal NFT</TabsTrigger>
        <TabsTrigger value="ai-task-manager">🤖 AI Tasks</TabsTrigger>
      </TabsList>

      <TabsContent value="live-artist" className="space-y-4">
        <LiveArtistHub />
      </TabsContent>

      <TabsContent value="media" className="space-y-4">
        <AdminMediaLibrary />
      </TabsContent>

      <TabsContent value="marketing" className="space-y-4">
        <MarketingTokenSuite />
      </TabsContent>

      <TabsContent value="investor" className="space-y-4">
        <InvestorReadySystem />
      </TabsContent>

      <TabsContent value="tactics" className="space-y-4">
        <AdvancedTacticsHub />
      </TabsContent>

      <TabsContent value="tools" className="space-y-4">
        <RefactoredAdminTools />
      </TabsContent>

      <TabsContent value="security" className="space-y-4">
        <RefactoredSecuritySuite />
      </TabsContent>

      <TabsContent value="ai-engine" className="space-y-4">
        <UltimateAIEngineSuite />
      </TabsContent>

      <TabsContent value="supreme-control" className="space-y-4">
        <SupremeControlSuite />
      </TabsContent>

      <TabsContent value="ai-thinking" className="space-y-4">
        <ParabolicAIThinking />
      </TabsContent>

      <TabsContent value="audio-engine" className="space-y-4">
        <AudioEngineManager />
      </TabsContent>

      <TabsContent value="thunderstorm" className="space-y-4">
        <ThunderstormDefense />
      </TabsContent>

      <TabsContent value="dolphin" className="space-y-4">
        <InvisibleDolphin />
      </TabsContent>

      <TabsContent value="wallet-engine" className="space-y-4">
        <WalletEngineAdmin />
      </TabsContent>

      <TabsContent value="power-analytics" className="space-y-4">
        <PowerAnalyticsHub />
      </TabsContent>

      <TabsContent value="global-command" className="space-y-4">
        <GlobalCommandCenter />
      </TabsContent>

      <TabsContent value="quantum-data" className="space-y-4">
        <QuantumDataProcessor />
      </TabsContent>

      <TabsContent value="animal-nft" className="space-y-4">
        <LiveAnimalNFTManager />
      </TabsContent>

      <TabsContent value="ai-task-manager" className="space-y-4">
        <AITaskManagerEngine />
      </TabsContent>
    </Tabs>
  )
}
