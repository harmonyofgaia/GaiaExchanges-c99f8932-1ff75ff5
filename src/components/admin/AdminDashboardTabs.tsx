
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AdminDashboard } from './AdminDashboard'
import { AdvancedSecurityCenter } from './AdvancedSecurityCenter'
import { UltimateSecuritySuite } from './UltimateSecuritySuite'
import { FutureReadingMachine } from './FutureReadingMachine'
import { QuantumPartnershipEngine } from './QuantumPartnershipEngine'
import { GitHubAdminIntegration } from '../github/GitHubAdminIntegration'
import { EnhancedFutureReadingMachine } from './EnhancedFutureReadingMachine'
import { MediaLibraryManager } from './MediaLibraryManager'
import { InvisibleVPNDisruptor } from './InvisibleVPNDisruptor'
import { UniversalSatelliteTracker } from './UniversalSatelliteTracker'
import { EnhancedSuspiciousTransactions } from './EnhancedSuspiciousTransactions'
import { TransactionReversalSystem } from './TransactionReversalSystem'
import { MasterDefenseOrchestrator } from './MasterDefenseOrchestrator'
import { AdminAnalyticsDashboard } from './AdminAnalyticsDashboard'
import { AutonomousMastermind } from './AutonomousMastermind'
import { WalletConnectionManager } from './WalletConnectionManager'
import { CommunityRecoveryDashboard } from './CommunityRecoveryDashboard'
import { QuantumGlobalSearchEngine } from './QuantumGlobalSearchEngine'
import { QuantumGlobalCommandCenter } from './QuantumGlobalCommandCenter'
import { PhantomRecoveryEngine } from './PhantomRecoveryEngine'
import { SelfTrainingKoalaAI } from './SelfTrainingKoalaAI'
import { RevolutionaryMasterPlan } from './RevolutionaryMasterPlan'
import { UltimateSecurity } from './UltimateSecurity'
import { ImmortalSecurity } from './ImmortalSecurity'
import { QuantumMastermindCore } from './QuantumMastermindCore'
import { SecureVaultLogin } from './SecureVaultLogin'
import { QuantumThunderstormDefense } from './QuantumThunderstormDefense'
import { UniversalMatrixEngine } from './UniversalMatrixEngine'
import { AnonymousTrackerPro } from './AnonymousTrackerPro'
import { QuantumGameEngine } from './QuantumGameEngine'
import { PDFGenerationSystem } from './PDFGenerationSystem'
import { MobileAppDeployment } from './MobileAppDeployment'

// Import the Enhanced Downloads and Documentation components
import EnhancedDownloads from '@/pages/EnhancedDownloads'
import Docs from '@/pages/Docs'

export function AdminDashboardTabs() {
  return (
    <>
      {/* Enhanced Admin Control Center Overview */}
      <Card className="mb-6 border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-green-400">
            🌍 GAIA QUANTUM ADMIN CONTROL CENTER - MASTER UNIVERSE
          </CardTitle>
          <p className="text-center text-lg text-muted-foreground">
            Quantum-Powered • Self-Training • Universal Matrix • Untraceable Defense • Revolutionary Features
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 text-sm">
            <div className="space-y-2">
              <h3 className="font-bold text-blue-400">🚀 Core Matrix</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>• Master Plan</li>
                <li>• Quantum Mind</li>
                <li>• Koala AI</li>
                <li>• Command Center</li>
                <li>• Game Engine</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-purple-400">🛡️ Security Galaxy</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>• Ultimate Security</li>
                <li>• Immortal Security</li>
                <li>• Secure Vault</li>
                <li>• Thunderstorm Defense</li>
                <li>• Phantom Recovery</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-green-400">🌍 Operations</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>• Community Recovery</li>
                <li>• Wallet Control</li>
                <li>• Transparency</li>
                <li>• Analytics</li>
                <li>• Matrix Engine</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-orange-400">🔍 Tracking Tools</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>• Anonymous Tracker</li>
                <li>• IP Hunter</li>
                <li>• Quantum Search</li>
                <li>• Satellite Tracker</li>
                <li>• Dark Web Scout</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-red-400">⚔️ Attack Systems</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>• Defense Walls (20x)</li>
                <li>• Counter Attack</li>
                <li>• Data Extraction</li>
                <li>• System Breach</li>
                <li>• Invisible Forces</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h3 className="font-bold text-pink-400">🎮 Game Universe</h3>
              <ul className="text-muted-foreground space-y-1">
                <li>• MMORPG Engine</li>
                <li>• NFT Animals</li>
                <li>• Virtual Worlds</li>
                <li>• Live Tracking</li>
                <li>• Investment System</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="quantum-universe" className="w-full">
        <TabsList className="grid w-full grid-cols-8 mb-6 bg-black/50 backdrop-blur-md">
          <TabsTrigger value="quantum-universe" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
            🌌 Quantum Universe
          </TabsTrigger>
          <TabsTrigger value="security-fortress" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
            🛡️ Security Fortress
          </TabsTrigger>
          <TabsTrigger value="tracking-systems" className="data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
            🎯 Tracking Systems
          </TabsTrigger>
          <TabsTrigger value="attack-defense" className="data-[state=active]:bg-red-600/20 data-[state=active]:text-red-300">
            ⚔️ Attack & Defense
          </TabsTrigger>
          <TabsTrigger value="operations" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
            🌍 Operations
          </TabsTrigger>
          <TabsTrigger value="quantum-tools" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
            ⚡ Quantum Tools
          </TabsTrigger>
          <TabsTrigger value="downloads-docs" className="data-[state=active]:bg-cyan-500/20 data-[state=active]:text-cyan-400">
            📚 Downloads & Docs
          </TabsTrigger>
          <TabsTrigger value="analytics" className="data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400">
            📊 Analytics
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="quantum-universe">
          <Tabs defaultValue="master-plan" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="master-plan">🚀 Master Plan</TabsTrigger>
              <TabsTrigger value="quantum-mind">🧠 Quantum Mind</TabsTrigger>
              <TabsTrigger value="koala-ai">🐨 Koala AI</TabsTrigger>
              <TabsTrigger value="matrix-engine">🌌 Matrix Engine</TabsTrigger>
            </TabsList>
            
            <TabsContent value="master-plan">
              <RevolutionaryMasterPlan />
            </TabsContent>
            <TabsContent value="quantum-mind">
              <QuantumMastermindCore />
            </TabsContent>
            <TabsContent value="koala-ai">
              <SelfTrainingKoalaAI />
            </TabsContent>
            <TabsContent value="matrix-engine">
              <UniversalMatrixEngine />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="security-fortress">
          <Tabs defaultValue="secure-vault" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-4">
              <TabsTrigger value="secure-vault">🔒 Secure Vault</TabsTrigger>
              <TabsTrigger value="ultimate-security">🔥 Ultimate Security</TabsTrigger>
              <TabsTrigger value="immortal-security">⚡ Immortal Security</TabsTrigger>
              <TabsTrigger value="thunderstorm-defense">⛈️ Thunderstorm Defense</TabsTrigger>
              <TabsTrigger value="phantom-recovery">👻 Phantom Recovery</TabsTrigger>
            </TabsList>
            
            <TabsContent value="secure-vault">
              <SecureVaultLogin />
            </TabsContent>
            <TabsContent value="ultimate-security">
              <UltimateSecurity />
            </TabsContent>
            <TabsContent value="immortal-security">
              <ImmortalSecurity />
            </TabsContent>
            <TabsContent value="thunderstorm-defense">
              <QuantumThunderstormDefense />
            </TabsContent>
            <TabsContent value="phantom-recovery">
              <PhantomRecoveryEngine />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="tracking-systems">
          <Tabs defaultValue="anonymous-tracker" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="anonymous-tracker">🕵️ Anonymous Tracker</TabsTrigger>
              <TabsTrigger value="quantum-search">⚡ Quantum Search</TabsTrigger>
              <TabsTrigger value="satellite-tracker">🛰️ Satellite Tracker</TabsTrigger>
              <TabsTrigger value="invisible-vpn">👤 VPN Disruptor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="anonymous-tracker">
              <AnonymousTrackerPro />
            </TabsContent>
            <TabsContent value="quantum-search">
              <QuantumGlobalSearchEngine />
            </TabsContent>
            <TabsContent value="satellite-tracker">
              <UniversalSatelliteTracker />
            </TabsContent>
            <TabsContent value="invisible-vpn">
              <InvisibleVPNDisruptor />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="attack-defense">
          <Tabs defaultValue="master-defense" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="master-defense">🛡️ Master Defense</TabsTrigger>
              <TabsTrigger value="command-center">👑 Command Center</TabsTrigger>
              <TabsTrigger value="future-reading">🔮 Future Reading</TabsTrigger>
            </TabsList>
            
            <TabsContent value="master-defense">
              <MasterDefenseOrchestrator />
            </TabsContent>
            <TabsContent value="command-center">
              <QuantumGlobalCommandCenter />
            </TabsContent>
            <TabsContent value="future-reading">
              <EnhancedFutureReadingMachine />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="operations">
          <Tabs defaultValue="community-recovery" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-4">
              <TabsTrigger value="community-recovery">🌍 Community Recovery</TabsTrigger>
              <TabsTrigger value="wallet-control">💰 Wallet Control</TabsTrigger>
              <TabsTrigger value="transparency">🔍 Transparency</TabsTrigger>
              <TabsTrigger value="mastermind">🤖 Mastermind</TabsTrigger>
            </TabsList>
            
            <TabsContent value="community-recovery">
              <CommunityRecoveryDashboard />
            </TabsContent>
            <TabsContent value="wallet-control">
              <WalletConnectionManager />
            </TabsContent>
            <TabsContent value="transparency">
              <EnhancedSuspiciousTransactions />
            </TabsContent>
            <TabsContent value="mastermind">
              <AutonomousMastermind />
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="quantum-tools">
          <Tabs defaultValue="partnership-engine" className="w-full">
            <TabsList className="grid w-full grid-cols-5 mb-4">
              <TabsTrigger value="partnership-engine">🤝 Partnership Engine</TabsTrigger>
              <TabsTrigger value="media-library">📚 Media Library</TabsTrigger>
              <TabsTrigger value="transaction-reversal">🔄 Transaction Reversal</TabsTrigger>
              <TabsTrigger value="game-engine">🎮 Game Engine</TabsTrigger>
              <TabsTrigger value="mobile-deployment">📱 Mobile Apps</TabsTrigger>
            </TabsList>
            
            <TabsContent value="partnership-engine">
              <QuantumPartnershipEngine />
            </TabsContent>
            <TabsContent value="media-library">
              <MediaLibraryManager />
            </TabsContent>
            <TabsContent value="transaction-reversal">
              <TransactionReversalSystem />
            </TabsContent>
            <TabsContent value="game-engine">
              <QuantumGameEngine />
            </TabsContent>
            <TabsContent value="mobile-deployment">
              <MobileAppDeployment />
            </TabsContent>
          </Tabs>
        </TabsContent>

        {/* Downloads & Documentation Section */}
        <TabsContent value="downloads-docs">
          <Tabs defaultValue="enhanced-downloads" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="enhanced-downloads">📥 Enhanced Downloads</TabsTrigger>
              <TabsTrigger value="documentation">📚 Documentation</TabsTrigger>
              <TabsTrigger value="pdf-generation">📄 PDF System</TabsTrigger>
            </TabsList>
            
            <TabsContent value="enhanced-downloads">
              <EnhancedDownloads />
            </TabsContent>
            <TabsContent value="documentation">
              <Docs />
            </TabsContent>
            <TabsContent value="pdf-generation">
              <PDFGenerationSystem />
            </TabsContent>
          </Tabs>
        </TabsContent>
        
        <TabsContent value="analytics">
          <AdminAnalyticsDashboard />
        </TabsContent>
      </Tabs>
    </>
  )
}
