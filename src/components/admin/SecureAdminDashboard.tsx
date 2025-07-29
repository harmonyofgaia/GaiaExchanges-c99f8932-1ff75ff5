
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield, Lock, Eye, AlertTriangle, Zap, Crown, Activity, Globe, Users, TrendingUp, Gavel, Skull, Server, Settings, Bell, Camera, Coins, Brain, Gamepad2, FileText, Palette, Heart, Scale, Target, Database, Hammer, Sparkles, Volume2 } from 'lucide-react'
import { AdminProtectedRoute } from '@/components/auth/AdminProtectedRoute'
import { AdminOnlyAccess } from '@/components/security/AdminOnlyAccess'
import { EnhancedBackgroundManager } from '@/components/backgrounds/EnhancedBackgroundManager'
import { AdminDashboardTabs } from './AdminDashboardTabs'
import { RefactoredSecuritySuite } from './RefactoredSecuritySuite'
import RefactoredAdminTools from './RefactoredAdminTools'
import { SupremeControlSuite } from './SupremeControlSuite'
import { UserIsolationSystem } from './UserIsolationSystem'
import { AIEngineCapabilities } from './AIEngineCapabilities'
import { ChatSecurityPanel } from './ChatSecurityPanel'
import UltimateSecurity from './UltimateSecurity'
import { RuleSystemManagement } from './RuleSystemManagement'
import { HoneypotMonitor } from '@/components/security/HoneypotMonitor'
import { DeploymentStatusPanel } from './DeploymentStatusPanel'
import { UltimateAdminSuite } from './UltimateAdminSuite'
import { MasterAdminControlCenter } from './MasterAdminControlCenter'
import { DragonAIDefense } from './DragonAIDefense'
import { KoalaAIEngine } from './KoalaAIEngine'
import { UltimateIntelligenceHub } from './UltimateIntelligenceHub'
import { AdminMediaLibrary } from './AdminMediaLibrary'
import { WalletEngineAdmin } from './WalletEngineAdmin'
import { TokenBurnController } from './TokenBurnController'
import { GitHubIntegrationSuite } from '@/components/system/GitHubIntegrationSuite'
import { NotificationController } from './NotificationController'
import { PsychohistoricalEngine } from './PsychohistoricalEngine'
import { PhoenixGuardian } from './PhoenixGuardian'
import { GaiaIATool } from './GaiaIATool'
import { SecurityDashboard } from './security/SecurityDashboard'
import { UserManagementSystemRefactored } from './UserManagementSystemRefactored'
import { LegalProtectionSystem } from './LegalProtectionSystem'
import { CommunityRecoveryEngine } from './CommunityRecoveryEngine'
import { ArtworkUploadProcessor } from './ArtworkUploadProcessor'
import { ParabolicCommandCenter } from './ParabolicCommandCenter'
import { AutomationMaster } from './AutomationMaster'
import { CreationToolsSuite } from './CreationToolsSuite'
import { BlockchainSecurityLogs } from './BlockchainSecurityLogs'
import { CompletionTaskManager } from './CompletionTaskManager'
import { BrandClarificationManager } from './BrandClarificationManager'
import { AutonomousSystemTracker } from './AutonomousSystemTracker'

export function SecureAdminDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent">
          🛡️ SECURE ADMIN COMMAND CENTER 🛡️
        </h1>
        <p className="text-center text-muted-foreground mt-2">
          Ultimate control and protection for the GAiA ecosystem
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-10 lg:grid-cols-20 gap-1 h-auto p-1 text-xs">
          <TabsTrigger value="overview" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🏠</span>
              <span className="hidden sm:inline">Overview</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="security" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🛡️</span>
              <span className="hidden sm:inline">Security</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="tools" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🔧</span>
              <span className="hidden sm:inline">Tools</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="control" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>👑</span>
              <span className="hidden sm:inline">Control</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="isolation" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>👥</span>
              <span className="hidden sm:inline">Users</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="ai" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🧠</span>
              <span className="hidden sm:inline">AI</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="deployment" className="p-2 text-center bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30">
            <div className="flex flex-col items-center">
              <Server className="h-4 w-4" />
              <span className="hidden sm:inline">Deploy</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="honeypot" className="p-2 text-center bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30">
            <div className="flex flex-col items-center">
              <Skull className="h-4 w-4" />
              <span className="hidden sm:inline">Honeypot</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="rules" className="p-2 text-center bg-gradient-to-r from-purple-600/20 to-amber-600/20 border border-purple-500/30">
            <div className="flex flex-col items-center">
              <Gavel className="h-4 w-4" />
              <span className="hidden sm:inline">Rules</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="master-control" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>👑</span>
              <span className="hidden sm:inline">Master</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">Notify</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="github" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>📱</span>
              <span className="hidden sm:inline">GitHub</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="tokens" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <Coins className="h-4 w-4" />
              <span className="hidden sm:inline">Tokens</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="wallets" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>💰</span>
              <span className="hidden sm:inline">Wallets</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="media" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <Camera className="h-4 w-4" />
              <span className="hidden sm:inline">Media</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="intelligence" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <Brain className="h-4 w-4" />
              <span className="hidden sm:inline">Intel</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="koala" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🐨</span>
              <span className="hidden sm:inline">Koala</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="dragon" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🐉</span>
              <span className="hidden sm:inline">Dragon</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="phoenix" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🦅</span>
              <span className="hidden sm:inline">Phoenix</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="psycho" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🔮</span>
              <span className="hidden sm:inline">Psycho</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <AdminDashboardTabs />
          <UltimateAdminSuite />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <UltimateSecurity />
          <RefactoredSecuritySuite />
          <SecurityDashboard />
          <LegalProtectionSystem />
          <BlockchainSecurityLogs />
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <RefactoredAdminTools />
          <CreationToolsSuite />
          <ArtworkUploadProcessor />
          <AutomationMaster />
          <CompletionTaskManager />
          <BrandClarificationManager />
          <AutonomousSystemTracker />
        </TabsContent>

        <TabsContent value="control" className="space-y-6">
          <SupremeControlSuite />
          <ParabolicCommandCenter />
        </TabsContent>

        <TabsContent value="isolation" className="space-y-6">
          <UserIsolationSystem />
          <UserManagementSystemRefactored />
          <CommunityRecoveryEngine />
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <AIEngineCapabilities />
          <ChatSecurityPanel />
          <GaiaIATool />
        </TabsContent>

        <TabsContent value="deployment" className="space-y-6">
          <DeploymentStatusPanel />
        </TabsContent>

        <TabsContent value="honeypot" className="space-y-6">
          <HoneypotMonitor />
        </TabsContent>

        <TabsContent value="rules" className="space-y-6">
          <RuleSystemManagement />
        </TabsContent>

        <TabsContent value="master-control" className="space-y-6">
          <MasterAdminControlCenter />
        </TabsContent>

        <TabsContent value="notifications" className="space-y-6">
          <NotificationController />
        </TabsContent>

        <TabsContent value="github" className="space-y-6">
          <GitHubIntegrationSuite />
        </TabsContent>

        <TabsContent value="tokens" className="space-y-6">
          <TokenBurnController />
        </TabsContent>

        <TabsContent value="wallets" className="space-y-6">
          <WalletEngineAdmin />
        </TabsContent>

        <TabsContent value="media" className="space-y-6">
          <AdminMediaLibrary />
        </TabsContent>

        <TabsContent value="intelligence" className="space-y-6">
          <UltimateIntelligenceHub />
        </TabsContent>

        <TabsContent value="koala" className="space-y-6">
          <KoalaAIEngine />
        </TabsContent>

        <TabsContent value="dragon" className="space-y-6">
          <DragonAIDefense />
        </TabsContent>

        <TabsContent value="phoenix" className="space-y-6">
          <PhoenixGuardian />
        </TabsContent>

        <TabsContent value="psycho" className="space-y-6">
          <PsychohistoricalEngine />
        </TabsContent>
      </Tabs>
    </div>
  )
}
