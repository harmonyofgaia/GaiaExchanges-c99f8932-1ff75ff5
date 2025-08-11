import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Zap,
  Cpu,
  Database,
  Globe,
  Shield,
  Brain,
  Rocket,
  Eye,
  Headphones,
  Smartphone,
  Gamepad2,
  Sparkles,
} from "lucide-react";
import { toast } from "sonner";

interface SystemUpgrade {
  id: string;
  name: string;
  description: string;
  category: "backend" | "frontend" | "ai" | "security" | "performance";
  status: "available" | "installing" | "active";
  progress: number;
  impact: "low" | "medium" | "high" | "revolutionary";
  exclusivity: number; // 1-10 scale
}

export function AdvancedSystemUpgrades() {
  const [upgrades, setUpgrades] = useState<SystemUpgrade[]>([
    {
      id: "quantum-cache",
      name: "Quantum Cache Engine",
      description:
        "Instantaneous data retrieval using quantum entanglement principles",
      category: "performance",
      status: "available",
      progress: 0,
      impact: "revolutionary",
      exclusivity: 10,
    },
    {
      id: "neural-ui",
      name: "Neural UI Adaptation",
      description:
        "Interface that learns and adapts to each user's behavior patterns",
      category: "frontend",
      status: "available",
      progress: 0,
      impact: "high",
      exclusivity: 9,
    },
    {
      id: "blockchain-consensus",
      name: "Multi-Chain Consensus",
      description: "Simultaneous operation across 15+ blockchain networks",
      category: "backend",
      status: "available",
      progress: 0,
      impact: "revolutionary",
      exclusivity: 10,
    },
    {
      id: "biometric-auth",
      name: "Web Biometric Authentication",
      description: "Fingerprint, face, and voice recognition in browser",
      category: "security",
      status: "available",
      progress: 0,
      impact: "high",
      exclusivity: 8,
    },
    {
      id: "holographic-data",
      name: "Holographic Data Visualization",
      description: "3D holographic projections of data in WebGL",
      category: "frontend",
      status: "available",
      progress: 0,
      impact: "revolutionary",
      exclusivity: 10,
    },
    {
      id: "ai-code-gen",
      name: "Self-Writing Code Engine",
      description: "AI that writes and optimizes its own code in real-time",
      category: "ai",
      status: "available",
      progress: 0,
      impact: "revolutionary",
      exclusivity: 10,
    },
    {
      id: "voice-interface",
      name: "Natural Voice Commands",
      description: "Complete platform control through natural speech",
      category: "frontend",
      status: "available",
      progress: 0,
      impact: "high",
      exclusivity: 7,
    },
    {
      id: "edge-computing",
      name: "Global Edge Network",
      description: "Processing power distributed across 200+ global locations",
      category: "performance",
      status: "available",
      progress: 0,
      impact: "high",
      exclusivity: 8,
    },
  ]);

  const [systemStats, setSystemStats] = useState({
    totalUpgrades: 8,
    activeUpgrades: 0,
    systemPower: 1000,
    exclusivityScore: 0,
    revolutionaryFeatures: 0,
  });

  const installUpgrade = async (upgradeId: string) => {
    setUpgrades((prev) =>
      prev.map((upgrade) =>
        upgrade.id === upgradeId
          ? { ...upgrade, status: "installing", progress: 0 }
          : upgrade,
      ),
    );

    const upgrade = upgrades.find((u) => u.id === upgradeId);
    if (!upgrade) return;

    toast.success(`🚀 Installing ${upgrade.name}`, {
      description: "Revolutionary upgrade in progress...",
      duration: 3000,
    });

    // Simulate installation progress
    const interval = setInterval(() => {
      setUpgrades((prev) =>
        prev.map((u) => {
          if (u.id === upgradeId && u.status === "installing") {
            const newProgress = Math.min(100, u.progress + Math.random() * 20);
            if (newProgress >= 100) {
              clearInterval(interval);

              toast.success(`✅ ${upgrade.name} Active!`, {
                description: `${upgrade.description} - System enhanced!`,
                duration: 5000,
              });

              return { ...u, status: "active", progress: 100 };
            }
            return { ...u, progress: newProgress };
          }
          return u;
        }),
      );
    }, 500);

    // Update system stats
    setTimeout(() => {
      setSystemStats((prev) => ({
        ...prev,
        activeUpgrades: prev.activeUpgrades + 1,
        systemPower: prev.systemPower + upgrade.exclusivity * 100,
        exclusivityScore: prev.exclusivityScore + upgrade.exclusivity,
        revolutionaryFeatures:
          prev.revolutionaryFeatures +
          (upgrade.impact === "revolutionary" ? 1 : 0),
      }));
    }, 3000);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "revolutionary":
        return "text-red-400 bg-red-900/30 border-red-500/50";
      case "high":
        return "text-orange-400 bg-orange-900/30 border-orange-500/50";
      case "medium":
        return "text-yellow-400 bg-yellow-900/30 border-yellow-500/50";
      default:
        return "text-green-400 bg-green-900/30 border-green-500/50";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "backend":
        return Database;
      case "frontend":
        return Smartphone;
      case "ai":
        return Brain;
      case "security":
        return Shield;
      case "performance":
        return Zap;
      default:
        return Cpu;
    }
  };

  return (
    <div className="space-y-6">
      {/* System Power Overview */}
      <Card className="border-rainbow bg-gradient-to-r from-purple-900/40 via-blue-900/40 to-cyan-900/40">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400">
            🌌 ADVANCED SYSTEM UPGRADES
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-purple-900/30 rounded-lg">
              <Rocket className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                {systemStats.systemPower}
              </div>
              <div className="text-sm text-muted-foreground">System Power</div>
            </div>
            <div className="text-center p-4 bg-blue-900/30 rounded-lg">
              <Sparkles className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {systemStats.exclusivityScore}/80
              </div>
              <div className="text-sm text-muted-foreground">
                Exclusivity Score
              </div>
            </div>
            <div className="text-center p-4 bg-cyan-900/30 rounded-lg">
              <Eye className="h-8 w-8 mx-auto text-cyan-400 mb-2" />
              <div className="text-2xl font-bold text-cyan-400">
                {systemStats.revolutionaryFeatures}
              </div>
              <div className="text-sm text-muted-foreground">
                Revolutionary Features
              </div>
            </div>
            <div className="text-center p-4 bg-green-900/30 rounded-lg">
              <Gamepad2 className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {systemStats.activeUpgrades}/{systemStats.totalUpgrades}
              </div>
              <div className="text-sm text-muted-foreground">
                Active Upgrades
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Upgrades */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {upgrades.map((upgrade) => {
          const Icon = getCategoryIcon(upgrade.category);

          return (
            <Card
              key={upgrade.id}
              className={`border-2 ${getImpactColor(upgrade.impact)}`}
            >
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Icon className="h-6 w-6" />
                    {upgrade.name}
                  </div>
                  <div className="flex gap-2">
                    <Badge
                      className={`${upgrade.impact === "revolutionary" ? "bg-red-600" : upgrade.impact === "high" ? "bg-orange-600" : "bg-blue-600"}`}
                    >
                      {upgrade.impact.toUpperCase()}
                    </Badge>
                    <Badge className="bg-purple-600">
                      ⭐ {upgrade.exclusivity}/10
                    </Badge>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {upgrade.description}
                </p>

                {upgrade.status === "installing" && (
                  <div className="mb-4">
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Installing...</span>
                      <span className="text-sm">
                        {Math.floor(upgrade.progress)}%
                      </span>
                    </div>
                    <Progress value={upgrade.progress} className="h-2" />
                  </div>
                )}

                <Button
                  onClick={() => installUpgrade(upgrade.id)}
                  disabled={upgrade.status !== "available"}
                  className={`w-full ${
                    upgrade.status === "active"
                      ? "bg-green-600 hover:bg-green-700"
                      : upgrade.status === "installing"
                        ? "bg-yellow-600 hover:bg-yellow-700"
                        : upgrade.impact === "revolutionary"
                          ? "bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
                          : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                  }`}
                >
                  {upgrade.status === "active" && "✅ Active"}
                  {upgrade.status === "installing" && "⚡ Installing..."}
                  {upgrade.status === "available" &&
                    `🚀 Install ${upgrade.name}`}
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
