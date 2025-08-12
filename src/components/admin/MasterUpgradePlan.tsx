import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CheckCircle,
  Circle,
  Clock,
  Star,
  Crown,
  Shield,
  Zap,
  Globe,
  Leaf,
  Brain,
  Users,
  Coins,
  Target,
  Gamepad2,
} from "lucide-react";

interface Feature {
  id: string;
  name: string;
  description: string;
  status: "missing" | "partial" | "complete";
  priority: "critical" | "high" | "medium" | "low";
  complexity: 1 | 2 | 3 | 4 | 5;
  category: string;
}

interface Phase {
  id: string;
  name: string;
  description: string;
  features: Feature[];
  estimatedTime: string;
  dependencies: string[];
}

export function MasterUpgradePlan() {
  const [selectedPhase, setSelectedPhase] = useState<string>("phase1");

  const phases: Phase[] = [
    {
      id: "phase1",
      name: "Foundation Recovery & Integration",
      description: "Recover missing features and integrate core systems",
      estimatedTime: "2-3 weeks",
      dependencies: [],
      features: [
        {
          id: "bundle-admin-pages",
          name: "Bundle Plan Recovery + GitHub Pages",
          description:
            "Combine Plan Recovery, GitHub Integration, and GitHub Admin pages into one unified admin page",
          status: "missing",
          priority: "critical",
          complexity: 3,
          category: "admin",
        },
        {
          id: "farmer-system",
          name: "Restore Farmer System with Events",
          description:
            "Bring back farmer land system with event creation, profit sharing for 7-layered living forests",
          status: "missing",
          priority: "high",
          complexity: 4,
          category: "ecosystem",
        },
        {
          id: "logo-update",
          name: "Update to New Gaia Logo",
          description:
            "Replace all earth logos with new uploaded Gaia logo across all pages and external references",
          status: "missing",
          priority: "critical",
          complexity: 2,
          category: "branding",
        },
        {
          id: "pdf-transaction-tracker",
          name: "PDF Transaction Database System",
          description:
            "Create automated PDF generation for all wallet transactions, organized by project/source",
          status: "missing",
          priority: "high",
          complexity: 4,
          category: "admin",
        },
        {
          id: "exchange-integration",
          name: "Integrate Instant Swap + Blockchain into Exchange",
          description:
            "Bundle instant swap page and blockchain page into main exchange page",
          status: "missing",
          priority: "high",
          complexity: 3,
          category: "exchange",
        },
      ],
    },
    {
      id: "phase2",
      name: "Gaming & Community Hub",
      description: "Advanced community features with gaming integration",
      estimatedTime: "3-4 weeks",
      dependencies: ["phase1"],
      features: [
        {
          id: "habbo-tycoon-business",
          name: "Habbo Tycoon Business Hub",
          description:
            "Create game where users play Habbo Tycoon to access chatrooms for business development and community support",
          status: "partial",
          priority: "high",
          complexity: 5,
          category: "gaming",
        },
        {
          id: "private-chatrooms",
          name: "Private Business Chatrooms",
          description:
            "Unlimited member private chatrooms for business development with community service contact system",
          status: "missing",
          priority: "high",
          complexity: 4,
          category: "community",
        },
        {
          id: "business-financial-support",
          name: "Business Financial Support System",
          description:
            "System to help grow businesses worldwide with focus on nature restoration projects",
          status: "missing",
          priority: "medium",
          complexity: 4,
          category: "business",
        },
        {
          id: "gaia-points-to-tokens",
          name: "Gaia Points to Token Exchange",
          description:
            "Allow users to sell earned Gaia points for Gaia Tokens in fee destinations",
          status: "missing",
          priority: "medium",
          complexity: 3,
          category: "exchange",
        },
      ],
    },
    {
      id: "phase3",
      name: "Green Investment & Land Recovery",
      description: "Advanced environmental restoration systems",
      estimatedTime: "4-5 weeks",
      dependencies: ["phase1", "phase2"],
      features: [
        {
          id: "animal-grazing-recovery",
          name: "Animal Grazing Land Recovery Project",
          description:
            "7-phase land recovery system using different animals to restore unhealthy lands and remove chemicals",
          status: "missing",
          priority: "high",
          complexity: 5,
          category: "environment",
        },
        {
          id: "animal-transfer-system",
          name: "Stress-Free Animal Transfer System",
          description:
            "Safest methods to transfer animals to grazing lands with minimal stress protocols",
          status: "missing",
          priority: "high",
          complexity: 4,
          category: "environment",
        },
        {
          id: "mushroom-research",
          name: "Mushroom Neurologic Research Integration",
          description:
            "Research plan for mushroom information to help with neurologic diseases, integrated with green investments",
          status: "missing",
          priority: "medium",
          complexity: 4,
          category: "research",
        },
        {
          id: "green-investment-expansion",
          name: "Expanded Green Investment Tracking",
          description:
            "Enhanced tracking and management of all green investment projects with detailed reporting",
          status: "partial",
          priority: "high",
          complexity: 3,
          category: "investment",
        },
      ],
    },
    {
      id: "phase4",
      name: "Intelligence & Security Systems",
      description: "Advanced AI and security implementations",
      estimatedTime: "3-4 weeks",
      dependencies: ["phase1"],
      features: [
        {
          id: "information-gathering-engine",
          name: "Global Information Gathering System",
          description:
            "Restore engines to gather information from attackers, encrypted systems, and hidden networks",
          status: "missing",
          priority: "critical",
          complexity: 5,
          category: "security",
        },
        {
          id: "ia-artificial-input",
          name: "IA Artificial Input Engine",
          description:
            "Restore complete IA artificial input engine with all previous features and ideas",
          status: "partial",
          priority: "critical",
          complexity: 5,
          category: "ai",
        },
        {
          id: "linux-system-integration",
          name: "Linux System Power Integration",
          description:
            "Harness Linux system powers (6x stronger) with invisible protection and full admin control",
          status: "missing",
          priority: "high",
          complexity: 5,
          category: "system",
        },
        {
          id: "administrative-library",
          name: "Complete Administrative Library",
          description:
            "Full catalog of all data, organized file system for administration, customer support database",
          status: "partial",
          priority: "high",
          complexity: 4,
          category: "admin",
        },
      ],
    },
    {
      id: "phase5",
      name: "Ultimate Optimization & Control",
      description: "Final optimizations and advanced control systems",
      estimatedTime: "2-3 weeks",
      dependencies: ["phase1", "phase2", "phase3", "phase4"],
      features: [
        {
          id: "daily-engine-tasks",
          name: "Daily Engine Task Automation",
          description:
            "Restore all daily tasks that engines must perform or create automatically",
          status: "missing",
          priority: "medium",
          complexity: 3,
          category: "automation",
        },
        {
          id: "tactical-movements-recovery",
          name: "Tactical Defense Movements Recovery",
          description:
            "Restore all missing tactical attack and defense movements from previous wall of defense",
          status: "missing",
          priority: "high",
          complexity: 4,
          category: "defense",
        },
        {
          id: "blockchain-network-dominance",
          name: "Gaia Private Blockchain Network Dominance",
          description:
            "Ensure Gaia's Private Blockchain Network is the only exchange and network in the project",
          status: "partial",
          priority: "critical",
          complexity: 3,
          category: "blockchain",
        },
        {
          id: "ultimate-optimization",
          name: "System-Wide Optimization",
          description:
            "Final optimizations to make systems faster, stronger, and more efficient",
          status: "missing",
          priority: "medium",
          complexity: 4,
          category: "optimization",
        },
      ],
    },
  ];

  const getStatusIcon = (status: Feature["status"]) => {
    switch (status) {
      case "complete":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "partial":
        return <Clock className="h-5 w-5 text-yellow-500" />;
      case "missing":
        return <Circle className="h-5 w-5 text-red-500" />;
    }
  };

  const getPriorityColor = (priority: Feature["priority"]) => {
    switch (priority) {
      case "critical":
        return "bg-red-600";
      case "high":
        return "bg-orange-600";
      case "medium":
        return "bg-yellow-600";
      case "low":
        return "bg-green-600";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "admin":
        return <Crown className="h-4 w-4" />;
      case "security":
        return <Shield className="h-4 w-4" />;
      case "ai":
        return <Brain className="h-4 w-4" />;
      case "gaming":
        return <Gamepad2 className="h-4 w-4" />;
      case "community":
        return <Users className="h-4 w-4" />;
      case "environment":
        return <Leaf className="h-4 w-4" />;
      case "exchange":
        return <Coins className="h-4 w-4" />;
      case "blockchain":
        return <Zap className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-2xl text-purple-400 flex items-center gap-2">
            <Star className="h-6 w-6" />
            🚀 MASTER UPGRADE PLAN - WORLD DOMINATION STRATEGY
          </CardTitle>
          <p className="text-muted-foreground">
            Comprehensive 5-phase plan to make us better, faster, and stronger
            than any system
          </p>
        </CardHeader>
      </Card>

      <Tabs
        value={selectedPhase}
        onValueChange={setSelectedPhase}
        className="w-full"
      >
        <TabsList className="grid w-full grid-cols-5">
          {phases.map((phase, index) => (
            <TabsTrigger key={phase.id} value={phase.id} className="text-xs">
              Phase {index + 1}
            </TabsTrigger>
          ))}
        </TabsList>

        {phases.map((phase) => (
          <TabsContent key={phase.id} value={phase.id} className="space-y-4">
            <Card className="bg-gradient-to-br from-cyan-900/20 to-blue-900/20 border border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-xl text-cyan-400 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  {phase.name}
                </CardTitle>
                <p className="text-muted-foreground">{phase.description}</p>
                <div className="flex gap-4 text-sm">
                  <Badge className="bg-blue-600">
                    ⏱️ {phase.estimatedTime}
                  </Badge>
                  <Badge className="bg-purple-600">
                    📋 {phase.features.length} Features
                  </Badge>
                  {phase.dependencies.length > 0 && (
                    <Badge className="bg-orange-600">
                      🔗 Depends on: {phase.dependencies.join(", ")}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4">
                  {phase.features.map((feature) => (
                    <Card
                      key={feature.id}
                      className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-gray-700/50"
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              {getStatusIcon(feature.status)}
                              {getCategoryIcon(feature.category)}
                              <h3 className="font-semibold text-foreground">
                                {feature.name}
                              </h3>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                              {feature.description}
                            </p>
                            <div className="flex gap-2 flex-wrap">
                              <Badge
                                className={getPriorityColor(feature.priority)}
                              >
                                {feature.priority.toUpperCase()}
                              </Badge>
                              <Badge className="bg-gray-600">
                                Complexity: {feature.complexity}/5
                              </Badge>
                              <Badge className="bg-indigo-600">
                                {feature.category}
                              </Badge>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30">
        <CardHeader>
          <CardTitle className="text-xl text-green-400 flex items-center gap-2">
            <Zap className="h-5 w-5" />
            📊 Overall Progress Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">
                {phases.reduce(
                  (acc, phase) =>
                    acc +
                    phase.features.filter((f) => f.status === "missing").length,
                  0,
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                Missing Features
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">
                {phases.reduce(
                  (acc, phase) =>
                    acc +
                    phase.features.filter((f) => f.status === "partial").length,
                  0,
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                Partial Features
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">
                {phases.reduce(
                  (acc, phase) =>
                    acc +
                    phase.features.filter((f) => f.status === "complete")
                      .length,
                  0,
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                Complete Features
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">
                {phases.reduce((acc, phase) => acc + phase.features.length, 0)}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Features
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border border-yellow-500/30">
        <CardHeader>
          <CardTitle className="text-xl text-yellow-400 flex items-center gap-2">
            <Crown className="h-5 w-5" />
            🎯 Next Steps Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p className="text-foreground">
              Based on the analysis, I recommend starting with{" "}
              <strong>Phase 1: Foundation Recovery & Integration</strong> as it
              contains the most critical missing features that other phases
              depend on.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-semibold text-red-400 mb-2">
                  🚨 Critical Priority
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Bundle admin pages for better organization</li>
                  <li>• Update to new Gaia logo across all systems</li>
                  <li>• Restore information gathering systems</li>
                  <li>• Ensure blockchain network dominance</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold text-orange-400 mb-2">
                  ⚡ High Impact Features
                </h4>
                <ul className="text-sm space-y-1 text-muted-foreground">
                  <li>• Farmer system with event creation</li>
                  <li>• Animal grazing land recovery project</li>
                  <li>• Habbo Tycoon business development</li>
                  <li>• Linux system power integration</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
