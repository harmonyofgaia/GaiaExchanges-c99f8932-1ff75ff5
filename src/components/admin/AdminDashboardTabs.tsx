
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

export function AdminDashboardTabs() {
  return (
    <Tabs defaultValue="storage" className="w-full">
      <TabsList className="grid w-full grid-cols-6 lg:grid-cols-16 text-xs">
        <TabsTrigger value="storage">📁 Storage</TabsTrigger>
        <TabsTrigger value="marketing">🚀 Marketing</TabsTrigger>
        <TabsTrigger value="live-artist">🎭 Artist Hub</TabsTrigger>
        <TabsTrigger value="wallet-engine">💰 Wallet Engine</TabsTrigger>
        <TabsTrigger value="power-analytics">📊 Power Analytics</TabsTrigger>
        <TabsTrigger value="global-command">🌍 Global Command</TabsTrigger>
        <TabsTrigger value="quantum-data">⚛️ Quantum Data</TabsTrigger>
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
      </TabsList>

      <TabsContent value="storage" className="space-y-6">
        <AdminMediaLibrary />
      </TabsContent>

      <TabsContent value="marketing" className="space-y-6">
        <MarketingTokenSuite />
      </TabsContent>

      <TabsContent value="live-artist" className="space-y-6">
        <LiveArtistHub />
      </TabsContent>

      <TabsContent value="wallet-engine" className="space-y-6">
        <WalletEngineAdmin />
      </TabsContent>

      <TabsContent value="power-analytics" className="space-y-6">
        <PowerAnalyticsHub />
      </TabsContent>

      <TabsContent value="global-command" className="space-y-6">
        <GlobalCommandCenter />
      </TabsContent>

      <TabsContent value="quantum-data" className="space-y-6">
        <QuantumDataProcessor />
      </TabsContent>

      <TabsContent value="investor" className="space-y-6">
        <InvestorReadySystem />
      </TabsContent>

      <TabsContent value="tactics" className="space-y-6">
        <AdvancedTacticsHub />
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
