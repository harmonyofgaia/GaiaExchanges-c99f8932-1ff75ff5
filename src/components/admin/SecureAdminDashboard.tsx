import { IAEngine } from "./IAEngine";
import { DailyEngineAutomation } from "./DailyEngineAutomation";
import { GaiaBlockchainNetwork } from "./GaiaBlockchainNetwork";
import { MarketingCampaignManager } from "./MarketingCampaignManager";
import { useState, useEffect, lazy, Suspense } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  Zap,
  Crown,
  Activity,
  Globe,
  Users,
  TrendingUp,
  Gavel,
  Skull,
  Server,
} from "lucide-react";
import { AdminProtectedRoute } from "@/components/auth/AdminProtectedRoute";
import { AdminOnlyAccess } from "@/components/security/AdminOnlyAccess";
import { EnhancedBackgroundManager } from "@/components/backgrounds/EnhancedBackgroundManager";
import { AdminDashboardTabs } from "./AdminDashboardTabs";

// Import directly to fix loading issues
import { RefactoredSecuritySuite } from "./RefactoredSecuritySuite";
import RefactoredAdminTools from "./RefactoredAdminTools";
import { SupremeControlSuite } from "./SupremeControlSuite";
import { UserIsolationSystem } from "./UserIsolationSystem";
import { AIEngineCapabilities } from "./AIEngineCapabilities";
import { ChatSecurityPanel } from "./ChatSecurityPanel";
import UltimateSecurity from "./UltimateSecurity";
import { RuleSystemManagement } from "./RuleSystemManagement";
import { HoneypotMonitor } from "@/components/security/HoneypotMonitor";
import { DeploymentStatusPanel } from "./DeploymentStatusPanel";
// Integrated Admin Page Components
// Duplicate imports removed
// Duplicate imports removed
import { MasterVisionControlPanel } from "./MasterVisionControlPanel";
import { EinsteinTacticalAnimals } from "../defense/EinsteinTacticalAnimals";
import { FoodPackageSystem } from "../community/FoodPackageSystem";
import { UltimateAdminSuite } from "./UltimateAdminSuite";
import { MasterAdminControlCenter } from "./MasterAdminControlCenter";
import { DragonAIDefense } from "./DragonAIDefense";
import { KoalaAIEngine } from "./KoalaAIEngine";
import { UltimateIntelligenceHub } from "./UltimateIntelligenceHub";
import { AdminMediaLibrary } from "./AdminMediaLibrary";
import { WalletEngineAdmin } from "./WalletEngineAdmin";
import { TokenBurnController } from "./TokenBurnController";
import { GitHubIntegrationSuite } from "@/components/system/GitHubIntegrationSuite";
import { NotificationController } from "./NotificationController";
import { PsychohistoricalEngine } from "./PsychohistoricalEngine";
import { PhoenixGuardian } from "./PhoenixGuardian";
import { GaiaIATool } from "./GaiaIATool";
import { SecurityDashboard } from "./security/SecurityDashboard";
import { UserManagementSystemRefactored } from "./UserManagementSystemRefactored";
import { AdminDashboard } from "./AdminDashboard";
import { OmniscientGPSEngine } from "@/components/tracking/OmniscientGPSEngine";
import { AnimalDefenseCommandCenter } from "./AnimalDefenseCommandCenter";
import { PlatformManagement } from "./PlatformManagement";
import { QuantumDefenseWall } from "./QuantumDefenseWall";
import { BackgroundTacticalSystems } from "./BackgroundTacticalSystems";
import { MultiExchangeIntegration } from "@/components/MultiExchangeIntegration";
import { InvestorScoutingSystem } from "@/components/InvestorScoutingSystem";
import { MasterUpgradePlan } from "./MasterUpgradePlan";
import { BundledAdminPages } from "./BundledAdminPages";
import { FarmerEcosystem } from "./FarmerEcosystem";
import { PDFTransactionTracker } from "./PDFTransactionTracker";
import { AnimalGrazingRecovery } from "./AnimalGrazingRecovery";
import { AnimalTransferProtocols } from "./AnimalTransferProtocols";
// Duplicate imports removed

export function SecureAdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");

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
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-22 gap-1 h-auto p-1 text-xs">
          <TabsTrigger value="overview" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>📊</span>
              <span className="hidden sm:inline">Overview</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="dashboard" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🏠</span>
              <span className="hidden sm:inline">Dashboard</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="animals"
            className="p-2 text-center bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30"
          >
            <div className="flex flex-col items-center">
              <span>🐾</span>
              <span className="hidden sm:inline">Animals</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="live-tracking" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🛰️</span>
              <span className="hidden sm:inline">Live Tracking</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="security" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🛡️</span>
              <span className="hidden sm:inline">Security</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="users" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>👥</span>
              <span className="hidden sm:inline">Users</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="gaia-ia" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🧠</span>
              <span className="hidden sm:inline">GAIA IA</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="master-control" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>👑</span>
              <span className="hidden sm:inline">Master Control</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="tools" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🔧</span>
              <span className="hidden sm:inline">Admin Tools</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="notifications" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🔔</span>
              <span className="hidden sm:inline">Notifications</span>
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
              <span>🔥</span>
              <span className="hidden sm:inline">Token Burn</span>
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
              <span>📸</span>
              <span className="hidden sm:inline">Media</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="intelligence" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🧠</span>
              <span className="hidden sm:inline">Intelligence</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="koala" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🐨</span>
              <span className="hidden sm:inline">Koala AI</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="dragon" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🐉</span>
              <span className="hidden sm:inline">Dragon AI</span>
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
              <span className="hidden sm:inline">Psychohistory</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="control" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>👑</span>
              <span className="hidden sm:inline">Supreme Control</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="isolation" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🔒</span>
              <span className="hidden sm:inline">User Control</span>
            </div>
          </TabsTrigger>
          <TabsTrigger value="ai" className="p-2 text-center">
            <div className="flex flex-col items-center">
              <span>🤖</span>
              <span className="hidden sm:inline">AI Engine</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="deployment"
            className="p-2 text-center bg-gradient-to-r from-green-600/20 to-blue-600/20 border border-green-500/30"
          >
            <div className="flex flex-col items-center">
              <Server className="h-4 w-4" />
              <span className="hidden sm:inline">Deploy</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="honeypot"
            className="p-2 text-center bg-gradient-to-r from-red-600/20 to-orange-600/20 border border-red-500/30"
          >
            <div className="flex flex-col items-center">
              <Skull className="h-4 w-4" />
              <span className="hidden sm:inline">Honeypot</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="rules"
            className="p-2 text-center bg-gradient-to-r from-purple-600/20 to-amber-600/20 border border-purple-500/30"
          >
            <div className="flex flex-col items-center">
              <Gavel className="h-4 w-4" />
              <span className="hidden sm:inline">Rules 24/7</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="storage"
            className="p-2 text-center bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30"
          >
            <div className="flex flex-col items-center">
              <span>📁</span>
              <span className="hidden sm:inline">Storage</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="platform"
            className="p-2 text-center bg-gradient-to-r from-yellow-600/20 to-orange-600/20 border border-yellow-500/30"
          >
            <div className="flex flex-col items-center">
              <span>🌍</span>
              <span className="hidden sm:inline">Platform</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="defense-wall"
            className="p-2 text-center bg-gradient-to-r from-red-600/20 to-purple-600/20 border border-red-500/30"
          >
            <div className="flex flex-col items-center">
              <span>🛡️</span>
              <span className="hidden sm:inline">Defense Wall</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="tactical"
            className="p-2 text-center bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30"
          >
            <div className="flex flex-col items-center">
              <span>🚀</span>
              <span className="hidden sm:inline">Tactical</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="multi-exchange"
            className="p-2 text-center bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/30"
          >
            <div className="flex flex-col items-center">
              <span>🔄</span>
              <span className="hidden sm:inline">Multi-Exchange</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="investors"
            className="p-2 text-center bg-gradient-to-r from-yellow-600/20 to-amber-600/20 border border-yellow-500/30"
          >
            <div className="flex flex-col items-center">
              <span>👥</span>
              <span className="hidden sm:inline">Investors</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="master-plan"
            className="p-2 text-center bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30"
          >
            <div className="flex flex-col items-center">
              <span>🚀</span>
              <span className="hidden sm:inline">Master Plan</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="bundled-admin"
            className="p-2 text-center bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30"
          >
            <div className="flex flex-col items-center">
              <span>👑</span>
              <span className="hidden sm:inline">Admin Hub</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="farmer-ecosystem"
            className="p-2 text-center bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30"
          >
            <div className="flex flex-col items-center">
              <span>🌱</span>
              <span className="hidden sm:inline">Farmer System</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="pdf-tracker"
            className="p-2 text-center bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30"
          >
            <div className="flex flex-col items-center">
              <span>📊</span>
              <span className="hidden sm:inline">PDF Tracker</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="animal-grazing"
            className="p-2 text-center bg-gradient-to-r from-green-600/20 to-lime-600/20 border border-green-500/30"
          >
            <div className="flex flex-col items-center">
              <span>🌱</span>
              <span className="hidden sm:inline">Land Recovery</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="animal-transfer"
            className="p-2 text-center bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30"
          >
            <div className="flex flex-col items-center">
              <span>🚛</span>
              <span className="hidden sm:inline">Animal Transfer</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="ia-engine"
            className="p-2 text-center bg-gradient-to-r from-purple-600/20 to-pink-600/20 border border-purple-500/30"
          >
            <div className="flex flex-col items-center">
              <span>🧠</span>
              <span className="hidden sm:inline">IA Engine</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="automation"
            className="p-2 text-center bg-gradient-to-r from-orange-600/20 to-red-600/20 border border-orange-500/30"
          >
            <div className="flex flex-col items-center">
              <span>🔄</span>
              <span className="hidden sm:inline">Automation</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="blockchain"
            className="p-2 text-center bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30"
          >
            <div className="flex flex-col items-center">
              <span>🌍</span>
              <span className="hidden sm:inline">Blockchain</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="marketing"
            className="p-2 text-center bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/30"
          >
            <div className="flex flex-col items-center">
              <span>🚀</span>
              <span className="hidden sm:inline">Marketing</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="master-vision"
            className="p-2 text-center bg-gradient-to-r from-gold-600/20 to-yellow-600/20 border border-gold-500/30"
          >
            <div className="flex flex-col items-center">
              <span>🗺️</span>
              <span className="hidden sm:inline">Master Vision</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="einstein-animals"
            className="p-2 text-center bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/30"
          >
            <div className="flex flex-col items-center">
              <span>🧠</span>
              <span className="hidden sm:inline">Einstein Animals</span>
            </div>
          </TabsTrigger>
          <TabsTrigger
            value="food-system"
            className="p-2 text-center bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30"
          >
            <div className="flex flex-col items-center">
              <span>🍎</span>
              <span className="hidden sm:inline">Food System</span>
            </div>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="animals" className="space-y-6">
          <AnimalDefenseCommandCenter />
        </TabsContent>

        {/* Phase 1 & 2 Implementation Tabs */}
        <TabsContent value="bundled-admin" className="space-y-6">
          <BundledAdminPages />
        </TabsContent>

        <TabsContent value="farmer-ecosystem" className="space-y-6">
          <FarmerEcosystem />
        </TabsContent>

        <TabsContent value="pdf-tracker" className="space-y-6">
          <PDFTransactionTracker />
        </TabsContent>

        <TabsContent value="animal-grazing" className="space-y-6">
          <AnimalGrazingRecovery />
        </TabsContent>

        <TabsContent value="animal-transfer" className="space-y-6">
          <AnimalTransferProtocols />
        </TabsContent>

        <TabsContent value="ia-engine" className="space-y-6">
          <IAEngine />
        </TabsContent>

        <TabsContent value="automation" className="space-y-6">
          <DailyEngineAutomation />
        </TabsContent>

        <TabsContent value="blockchain" className="space-y-6">
          <GaiaBlockchainNetwork />
        </TabsContent>

        <TabsContent value="marketing" className="space-y-6">
          <MarketingCampaignManager />
        </TabsContent>

        <TabsContent value="overview" className="space-y-6">
          <UltimateAdminSuite />
        </TabsContent>

        <TabsContent value="vision" className="space-y-6">
          <MasterVisionControlPanel />
        </TabsContent>

        <TabsContent value="dashboard" className="space-y-6">
          <AdminDashboard />
        </TabsContent>

        <TabsContent value="live-tracking" className="space-y-6">
          <OmniscientGPSEngine />
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <SecurityDashboard />
          <UltimateSecurity />
          <RefactoredSecuritySuite />
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <UserManagementSystemRefactored />
          <UserIsolationSystem />
        </TabsContent>

        <TabsContent value="gaia-ia" className="space-y-6">
          <GaiaIATool />
        </TabsContent>

        <TabsContent value="master-control" className="space-y-6">
          <MasterAdminControlCenter />
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <RefactoredAdminTools />
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

        <TabsContent value="control" className="space-y-6">
          <SupremeControlSuite />
        </TabsContent>

        <TabsContent value="isolation" className="space-y-6">
          <UserIsolationSystem />
        </TabsContent>

        <TabsContent value="ai" className="space-y-6">
          <AIEngineCapabilities />
          <ChatSecurityPanel />
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

        <TabsContent value="platform" className="space-y-6">
          <PlatformManagement />
        </TabsContent>

        <TabsContent value="defense-wall" className="space-y-6">
          <QuantumDefenseWall />
        </TabsContent>

        <TabsContent value="tactical" className="space-y-6">
          <BackgroundTacticalSystems />
        </TabsContent>

        <TabsContent value="multi-exchange" className="space-y-6">
          <MultiExchangeIntegration />
        </TabsContent>

        <TabsContent value="investors" className="space-y-6">
          <InvestorScoutingSystem />
        </TabsContent>

        <TabsContent value="master-plan" className="space-y-6">
          <MasterUpgradePlan />
        </TabsContent>

        <TabsContent value="bundled-admin" className="space-y-6">
          <BundledAdminPages />
        </TabsContent>

        <TabsContent value="farmer-ecosystem" className="space-y-6">
          <FarmerEcosystem />
        </TabsContent>

        <TabsContent value="pdf-tracker" className="space-y-6">
          <PDFTransactionTracker />
        </TabsContent>

        <TabsContent value="master-vision" className="space-y-6">
          <MasterVisionControlPanel />
        </TabsContent>

        <TabsContent value="einstein-animals" className="space-y-6">
          <EinsteinTacticalAnimals />
        </TabsContent>

        <TabsContent value="food-system" className="space-y-6">
          <FoodPackageSystem />
        </TabsContent>
      </Tabs>
    </div>
  );
}
