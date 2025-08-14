import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Crown,
  Zap,
  Globe,
  Shield,
  Star,
  Flame,
  Settings,
  Users,
  BarChart3,
  Lock,
  Activity,
  Hammer,
  Palette,
  Mountain,
  Coins,
  Brain,
  Cpu,
  Rocket,
} from "lucide-react";
import { UltimateSecurityCore } from "./UltimateSecurityCore";
import { QuantumTradingEngine } from "./QuantumTradingEngine";
import { DragonAIDefense } from "./DragonAIDefense";
import { InvisibleTrackingSystem } from "./InvisibleTrackingSystem";
import { AutomationMaster } from "./AutomationMaster";
import { CreationToolsSuite } from "./CreationToolsSuite";
import { AnalyticsDashboard } from "./AnalyticsDashboard";
import { CriticalSystemFixes } from "./CriticalSystemFixes";
import { UserManagementSystemRefactored } from "./UserManagementSystemRefactored";
import { AllFeaturesIntegrated } from "@/components/AllFeaturesIntegrated";
import { ComprehensiveSystemIntegration } from "@/components/ComprehensiveSystemIntegration";
import { DefenseCreatureArmy } from "./DefenseCreatureArmy";
import { SearchTrackingSuite } from "./SearchTrackingSuite";
import { EntertainmentRewardsHub } from "./EntertainmentRewardsHub";
import { ParabolicAIThinking } from "./ParabolicAIThinking";
import { AutonomousMastermind } from "./AutonomousMastermind";
import { UltimateAdminControls } from "./UltimateAdminControls";
import { SelfTrainingKoalaAI } from "./SelfTrainingKoalaAI";
import { PersistentAdminSession } from "./PersistentAdminSession";
import { SmartNotificationManager } from "../system/SmartNotificationManager";
import { GitHubIntegration } from "../system/GitHubIntegration";
import { NotificationSettings } from "../system/NotificationSettings";
import { AdvancedSystemUpgrades } from "../system/AdvancedSystemUpgrades";

export function UltimateAdminSuite() {
  const [activeSystem, setActiveSystem] = useState("overview");

  const adminSystems = [
    { id: "overview", label: "🌟 Ultimate Features", icon: Star },
    { id: "upgrades", label: "🚀 System Upgrades", icon: Rocket },
    { id: "github", label: "🐙 GitHub Integration", icon: Activity },
    { id: "notifications", label: "🔔 Smart Notifications", icon: Settings },
    { id: "ai-thinking", label: "🧠 Parabolic AI", icon: Brain },
    { id: "mastermind", label: "🤖 Autonomous AI", icon: Cpu },
    { id: "godfather", label: "👑 Ultimate Control", icon: Crown },
    { id: "koala-ai", label: "🐨 Self-Training AI", icon: Activity },
    { id: "security", label: "🛡️ Security Core", icon: Shield },
    { id: "trading", label: "💰 Trading Engine", icon: BarChart3 },
    { id: "dragon-ai", label: "🐉 Dragon AI", icon: Flame },
    { id: "tracking", label: "👁️ Live Tracking", icon: Activity },
    { id: "automation", label: "⚡ Automation", icon: Zap },
    { id: "creation", label: "🎨 Creation Tools", icon: Palette },
    { id: "analytics", label: "📊 Analytics", icon: BarChart3 },
    { id: "users", label: "👥 User Management", icon: Users },
    { id: "system", label: "⚙️ System Fixes", icon: Settings },
  ];

  return (
    <div className="space-y-6">
      {/* Smart Notification Manager (invisible service) */}
      <SmartNotificationManager />

      {/* Persistent Admin Session Component */}
      <PersistentAdminSession />

      {/* Main Control Header */}
      <Card className="bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-green-900/40 border-2 border-purple-500/50">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-green-400">
            🌌 ULTIMATE GAIA ADMIN CONTROL CENTER
          </CardTitle>
          <div className="text-center space-y-2">
            <div className="text-xl text-purple-400 font-bold">
              🛡️ QUANTUM DEFENSE • 🐉 DRAGON AI • ⚡ INFINITE POWER • 🧠 EXCLUSIVE AI ENGINE
            </div>
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge className="bg-red-600 animate-pulse">MAXIMUM SECURITY</Badge>
              <Badge className="bg-blue-600 animate-pulse">QUANTUM ACTIVE</Badge>
              <Badge className="bg-green-600 animate-pulse">DRAGON PROTECTION</Badge>
              <Badge className="bg-purple-600 animate-pulse">AI ENGINE SUPREME</Badge>
              <Badge className="bg-pink-600 animate-pulse">ADMIN GODFATHER</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* System Navigation */}
      <Card className="border-blue-500/30 bg-blue-900/20">
        <CardHeader>
          <CardTitle className="text-blue-400">🎛️ Admin System Navigation</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
            {adminSystems.map((system) => {
              const Icon = system.icon;
              const isActive = activeSystem === system.id;

              return (
                <Button
                  key={system.id}
                  onClick={() => setActiveSystem(system.id)}
                  className={`h-20 flex flex-col gap-2 ${
                    isActive
                      ? "bg-purple-600 text-white"
                      : "bg-gray-800 hover:bg-gray-700 text-gray-300"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="text-xs font-medium">{system.label}</span>
                </Button>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* System Content */}
      <div className="space-y-6">
        {activeSystem === "overview" && (
          <div className="space-y-6">
            <Card className="border-yellow-500/50 bg-gradient-to-r from-yellow-900/30 to-orange-900/30">
              <CardHeader>
                <CardTitle className="text-yellow-400 text-center text-3xl">
                  🌟 ULTIMATE FEATURES GALAXY
                </CardTitle>
              </CardHeader>
              <CardContent>
                <AllFeaturesIntegrated />
              </CardContent>
            </Card>

            <Card className="border-cyan-500/50 bg-gradient-to-r from-cyan-900/30 to-blue-900/30">
              <CardHeader>
                <CardTitle className="text-cyan-400 text-center text-3xl">
                  ⚡ COMPREHENSIVE SYSTEM INTEGRATION
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ComprehensiveSystemIntegration />
              </CardContent>
            </Card>
          </div>
        )}

        {activeSystem === "upgrades" && <AdvancedSystemUpgrades />}
        {activeSystem === "github" && <GitHubIntegration />}
        {activeSystem === "notifications" && <NotificationSettings />}
        {activeSystem === "ai-thinking" && <ParabolicAIThinking />}
        {activeSystem === "mastermind" && <AutonomousMastermind />}
        {activeSystem === "godfather" && <UltimateAdminControls />}
        {activeSystem === "koala-ai" && <SelfTrainingKoalaAI />}
        {activeSystem === "security" && <UltimateSecurityCore />}
        {activeSystem === "trading" && <QuantumTradingEngine />}
        {activeSystem === "dragon-ai" && <DragonAIDefense />}
        {activeSystem === "tracking" && <SearchTrackingSuite />}
        {activeSystem === "automation" && <AutomationMaster />}
        {activeSystem === "creation" && <CreationToolsSuite />}
        {activeSystem === "analytics" && <AnalyticsDashboard />}
        {activeSystem === "users" && <UserManagementSystemRefactored />}
        {activeSystem === "system" && <CriticalSystemFixes />}
      </div>

      {/* System Status Footer */}
      <Card className="border-green-500/30 bg-green-900/20">
        <CardContent className="pt-6">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-center">
            <div className="p-3 bg-green-900/30 rounded-lg">
              <div className="text-2xl font-bold text-green-400">100%</div>
              <div className="text-xs text-muted-foreground">System Health</div>
            </div>
            <div className="p-3 bg-blue-900/30 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">∞</div>
              <div className="text-xs text-muted-foreground">Processing Power</div>
            </div>
            <div className="p-3 bg-purple-900/30 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">SUPREME</div>
              <div className="text-xs text-muted-foreground">Defense Level</div>
            </div>
            <div className="p-3 bg-yellow-900/30 rounded-lg">
              <div className="text-2xl font-bold text-yellow-400">GALAXY</div>
              <div className="text-xs text-muted-foreground">Coverage Active</div>
            </div>
            <div className="p-3 bg-pink-900/30 rounded-lg">
              <div className="text-2xl font-bold text-pink-400">GODFATHER</div>
              <div className="text-xs text-muted-foreground">AI Engine Mode</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
