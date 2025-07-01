
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
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

export function AdminDashboardTabs() {
  return (
    <Tabs defaultValue="master-plan" className="w-full">
      <TabsList className="grid w-full grid-cols-18 mb-6">
        <TabsTrigger value="master-plan">🚀 Master Plan</TabsTrigger>
        <TabsTrigger value="quantum-mastermind">🧠 Quantum Mind</TabsTrigger>
        <TabsTrigger value="koala-ai">🐨 Koala AI</TabsTrigger>
        <TabsTrigger value="quantum-search">🔍 Quantum Search</TabsTrigger>
        <TabsTrigger value="quantum-command">👑 Command Center</TabsTrigger>
        <TabsTrigger value="phantom-recovery">🛡️ Phantom Recovery</TabsTrigger>
        <TabsTrigger value="community-recovery">🌍 Community Recovery</TabsTrigger>
        <TabsTrigger value="transparency">🔍 Transparency</TabsTrigger>
        <TabsTrigger value="wallets">💰 Wallet Control</TabsTrigger>
        <TabsTrigger value="master-defense">🧠 Master Defense</TabsTrigger>
        <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
        <TabsTrigger value="mastermind">🤖 Mastermind</TabsTrigger>
        <TabsTrigger value="dashboard">System Dashboard</TabsTrigger>
        <TabsTrigger value="security">Advanced Security</TabsTrigger>
        <TabsTrigger value="ultimate-security">🔥 Ultimate Security</TabsTrigger>
        <TabsTrigger value="immortal-security">⚡ Immortal Security</TabsTrigger>
        <TabsTrigger value="ultimate">🔥 Ultimate Fortress</TabsTrigger>
        <TabsTrigger value="ultimate-suite">Ultimate Suite</TabsTrigger>
      </TabsList>
      
      <TabsContent value="master-plan">
        <RevolutionaryMasterPlan />
      </TabsContent>

      <TabsContent value="quantum-mastermind">
        <QuantumMastermindCore />
      </TabsContent>

      <TabsContent value="koala-ai">
        <SelfTrainingKoalaAI />
      </TabsContent>

      <TabsContent value="quantum-search">
        <QuantumGlobalSearchEngine />
      </TabsContent>

      <TabsContent value="quantum-command">
        <QuantumGlobalCommandCenter />
      </TabsContent>

      <TabsContent value="phantom-recovery">
        <PhantomRecoveryEngine />
      </TabsContent>
      
      <TabsContent value="community-recovery">
        <CommunityRecoveryDashboard />
      </TabsContent>

      <TabsContent value="transparency">
        <EnhancedSuspiciousTransactions />
      </TabsContent>

      <TabsContent value="wallets">
        <WalletConnectionManager />
      </TabsContent>

      <TabsContent value="master-defense">
        <MasterDefenseOrchestrator />
      </TabsContent>

      <TabsContent value="analytics">
        <AdminAnalyticsDashboard />
      </TabsContent>

      <TabsContent value="mastermind">
        <AutonomousMastermind />
      </TabsContent>
      
      <TabsContent value="dashboard">
        <AdminDashboard />
      </TabsContent>
      
      <TabsContent value="security">
        <AdvancedSecurityCenter />
      </TabsContent>
      
      <TabsContent value="ultimate-security">
        <UltimateSecurity />
      </TabsContent>

      <TabsContent value="immortal-security">
        <ImmortalSecurity />
      </TabsContent>
      
      <TabsContent value="ultimate">
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
              🔥 ULTIMATE SECURITY FORTRESS
            </h2>
            <p className="text-xl text-muted-foreground mt-2">
              Quantum-Level Protection Beyond Any Known Technology
            </p>
          </div>
        </div>
      </TabsContent>
      
      <TabsContent value="ultimate-suite">
        <UltimateSecuritySuite />
      </TabsContent>
    </Tabs>
  )
}
