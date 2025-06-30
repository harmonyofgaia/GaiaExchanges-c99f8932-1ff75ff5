
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card } from '@/components/ui/card'
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

export function AdminDashboardTabs() {
  return (
    <Tabs defaultValue="transparency" className="w-full">
      <TabsList className="grid w-full grid-cols-13 mb-6">
        <TabsTrigger value="transparency">🔍 Transparency</TabsTrigger>
        <TabsTrigger value="wallets">💰 Wallet Control</TabsTrigger>
        <TabsTrigger value="master-defense">🧠 Master Defense</TabsTrigger>
        <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
        <TabsTrigger value="mastermind">🤖 Mastermind</TabsTrigger>
        <TabsTrigger value="dashboard">System Dashboard</TabsTrigger>
        <TabsTrigger value="security">Advanced Security</TabsTrigger>
        <TabsTrigger value="ultimate">Ultimate Suite</TabsTrigger>
        <TabsTrigger value="future">Enhanced Future</TabsTrigger>
        <TabsTrigger value="partnerships">Partnership Engine</TabsTrigger>
        <TabsTrigger value="github">GitHub Control</TabsTrigger>
        <TabsTrigger value="media">Media Library</TabsTrigger>
        <TabsTrigger value="vpn-disruptor">👻 VPN Disruptor</TabsTrigger>
        <TabsTrigger value="satellite">🛰️ Satellite</TabsTrigger>
        <TabsTrigger value="transaction-reversal">💰 Transaction Control</TabsTrigger>
      </TabsList>
      
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

      <TabsContent value="media">
        <MediaLibraryManager />
      </TabsContent>

      <TabsContent value="vpn-disruptor">
        <InvisibleVPNDisruptor />
      </TabsContent>

      <TabsContent value="satellite">
        <UniversalSatelliteTracker />
      </TabsContent>
      
      <TabsContent value="transaction-reversal">
        <TransactionReversalSystem />
      </TabsContent>
    </Tabs>
  )
}
