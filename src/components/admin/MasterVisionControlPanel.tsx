import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
import {
  CheckCircle,
  Clock,
  ArrowRight,
  Zap,
  Shield,
  TrendingUp,
  Brain,
  Gamepad2,
  Leaf,
  BarChart3,
} from "lucide-react";
import { toast } from "sonner";

interface Phase {
  id: string;
  title: string;
  description: string;
  priority: number;
  status: "pending" | "approved" | "in-progress" | "completed";
  features: string[];
  timeline: string;
  icon: React.ComponentType;
}

const masterVisionPhases: Phase[] = [
  {
    id: "phase1",
    title: "GAIA PRIVATE BLOCKCHAIN TRADING ENGINE",
    description: "Transform the Exchange page into the ultimate trading powerhouse",
    priority: 1,
    status: "pending",
    timeline: "Next 30 Days",
    icon: TrendingUp,
    features: [
      "Multi-Chart Views: TradingView-style advanced charting",
      "Order Book Depth: Real-time buy/sell walls visualization",
      "Algorithmic Trading Bots: AI-powered trading assistants",
      "Liquidity Pools: DeFi-style automated market makers",
      "Cross-Chain Swaps: Bridge to ETH, BSC, Polygon networks",
      "Flash Loans: Instant capital for arbitrage opportunities",
      "Portfolio Analytics: Real-time P&L tracking",
      "Risk Management: Stop-loss, take-profit automation",
    ],
  },
  {
    id: "phase2",
    title: "WALL OF DEFENSE ENHANCEMENTS",
    description: "Advanced security features and real-time monitoring",
    priority: 2,
    status: "pending",
    timeline: "60 Days",
    icon: Shield,
    features: [
      "AI Threat Prediction: Machine learning threat pattern recognition",
      "Quantum-Resistant Encryption: Future-proof security protocols",
      "Multi-Sig Vaults: Enterprise-grade asset protection",
      "Behavior Analytics: Anomaly detection for account protection",
      "Hardware Wallet Integration: Ledger/Trezor native support",
      "Global Threat Map: Live visualization of attack attempts",
      "Security Score Dashboard: Real-time security health metrics",
    ],
  },
  {
    id: "phase3",
    title: "GREEN INVESTMENT PLATFORM",
    description: "Comprehensive environmental impact ecosystem",
    priority: 3,
    status: "pending",
    timeline: "90 Days",
    icon: Leaf,
    features: [
      "PFAS Cleanup Initiative: Forever chemicals remediation",
      "7-Phase Land Recovery: Systematic ecosystem restoration",
      "Ocean Plastic Harvesting: Large-scale marine cleanup",
      "Carbon Capture Networks: Direct air capture facilities",
      "Impact NFTs: Proof of environmental contribution",
      "Carbon Credit Trading: Verified offset marketplace",
      "Satellite Monitoring: Real-time project progress tracking",
    ],
  },
  {
    id: "phase4",
    title: "GAMING ECOSYSTEM EXPANSION",
    description: "Revolutionary game concepts with real-world impact",
    priority: 4,
    status: "pending",
    timeline: "120 Days",
    icon: Gamepad2,
    features: [
      "Climate Change Simulation: Strategy game for environmental solutions",
      "Virtual Ecosystem Management: Build and maintain digital biomes",
      "Ocean Conservation RPG: Underwater adventure with real impact",
      "Play-to-Earn Mechanics: GAIA tokens for gameplay achievements",
      "Tournament Infrastructure: Competitive gaming with crypto prizes",
      "Metaverse Integration: Virtual worlds for environmental education",
    ],
  },
  {
    id: "phase5",
    title: "AI & AUTOMATION",
    description: "Intelligent features and automation systems",
    priority: 5,
    status: "pending",
    timeline: "150 Days",
    icon: Brain,
    features: [
      "AI Trading Assistant: Personalized investment recommendations",
      "Smart Contract Auditor: Automated security analysis",
      "Content Generation: AI-powered educational materials",
      "Customer Support Bot: Advanced NLP-powered assistance",
      "Market Making Bot: Automated liquidity provision",
      "Predictive Analytics: AI-powered market forecasting",
    ],
  },
  {
    id: "phase6",
    title: "ANALYTICS & INTELLIGENCE",
    description: "Advanced metrics and business intelligence",
    priority: 6,
    status: "pending",
    timeline: "180 Days",
    icon: BarChart3,
    features: [
      "User Behavior Insights: Deep engagement analytics",
      "Environmental Impact Tracking: Real-world outcome measurement",
      "Revenue Optimization: Dynamic pricing algorithms",
      "User Segmentation: Personalized experience delivery",
      "Growth Hacking Tools: Viral mechanics and referral systems",
      "Cross-Platform Intelligence: Unified data across all Gaia services",
    ],
  },
];

export function MasterVisionControlPanel() {
  const [phases, setPhases] = useState<Phase[]>(masterVisionPhases);
  const [selectedPhase, setSelectedPhase] = useState<string | null>(null);

  const updatePhaseStatus = (phaseId: string, newStatus: Phase["status"]) => {
    setPhases((prev) =>
      prev.map((phase) => (phase.id === phaseId ? { ...phase, status: newStatus } : phase))
    );

    const phaseName = phases.find((p) => p.id === phaseId)?.title;
    toast.success(`Phase "${phaseName}" status updated to: ${newStatus}`, {
      description: "AI will now understand this directive for implementation",
      duration: 4000,
    });
  };

  const approvePhase = (phaseId: string) => {
    updatePhaseStatus(phaseId, "approved");
    toast.success("🚀 Phase Approved!", {
      description: "Lovable AI will prioritize implementing this phase next",
      duration: 5000,
    });
  };

  const getStatusColor = (status: Phase["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-600";
      case "in-progress":
        return "bg-blue-600";
      case "approved":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  const getProgress = (status: Phase["status"]) => {
    switch (status) {
      case "completed":
        return 100;
      case "in-progress":
        return 60;
      case "approved":
        return 25;
      default:
        return 0;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-2 border-cyan-500/50 bg-gradient-to-r from-cyan-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            🎯 GAIA MASTER VISION CONTROL PANEL
          </CardTitle>
          <p className="text-center text-muted-foreground">
            Strategic roadmap implementation control • AI directive management • Phase approval
            system
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="overview">📊 Overview</TabsTrigger>
          <TabsTrigger value="phases">🎯 Phase Control</TabsTrigger>
          <TabsTrigger value="roadmap">🗺️ Roadmap</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {["pending", "approved", "in-progress", "completed"].map((status) => (
              <Card key={status} className="border-gray-500/30">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm font-medium capitalize">{status} Phases</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-center">
                    {phases.filter((p) => p.status === status).length}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400">🎯 Implementation Strategy</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-sm text-muted-foreground">
                This control panel allows you to approve phases of the GAIA Master Vision. When you
                approve a phase, Lovable AI will understand it as a priority directive and implement
                those features accordingly.
              </p>
              <div className="bg-green-900/30 p-3 rounded-lg">
                <p className="text-xs text-green-300">
                  💡 <strong>How it works:</strong> Approve phases to signal to Lovable AI what to
                  prioritize. The AI will refer to these approved phases when implementing new
                  features.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="phases" className="space-y-4">
          {phases.map((phase) => (
            <Card
              key={phase.id}
              className="border-gray-500/30 bg-gradient-to-r from-gray-900/30 to-slate-900/30"
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <phase.icon className="h-6 w-6 text-cyan-400" />
                    <div>
                      <CardTitle className="text-lg">{phase.title}</CardTitle>
                      <p className="text-sm text-muted-foreground">{phase.description}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getStatusColor(phase.status)}>{phase.status}</Badge>
                    <Badge variant="outline">Priority {phase.priority}</Badge>
                  </div>
                </div>
                <Progress value={getProgress(phase.status)} className="mt-2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">Features:</h4>
                    <div className="grid grid-cols-1 gap-2">
                      {phase.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm">
                          <ArrowRight className="h-3 w-3 text-cyan-400" />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-gray-700">
                    <span className="text-sm text-muted-foreground">
                      Timeline: {phase.timeline}
                    </span>
                    <div className="flex gap-2">
                      {phase.status === "pending" && (
                        <Button
                          onClick={() => approvePhase(phase.id)}
                          className="bg-green-600 hover:bg-green-700"
                          size="sm"
                        >
                          <CheckCircle className="h-4 w-4 mr-1" />
                          Approve Phase
                        </Button>
                      )}
                      {phase.status === "approved" && (
                        <Button
                          onClick={() => updatePhaseStatus(phase.id, "in-progress")}
                          className="bg-blue-600 hover:bg-blue-700"
                          size="sm"
                        >
                          <Clock className="h-4 w-4 mr-1" />
                          Start Implementation
                        </Button>
                      )}
                      {phase.status === "in-progress" && (
                        <Button
                          onClick={() => updatePhaseStatus(phase.id, "completed")}
                          className="bg-purple-600 hover:bg-purple-700"
                          size="sm"
                        >
                          <Zap className="h-4 w-4 mr-1" />
                          Mark Complete
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-4">
          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400">🗺️ Implementation Roadmap</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {phases.map((phase, idx) => (
                  <div key={phase.id} className="flex items-center gap-4">
                    <div className="flex flex-col items-center">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          phase.status === "completed"
                            ? "bg-green-600"
                            : phase.status === "in-progress"
                              ? "bg-blue-600"
                              : phase.status === "approved"
                                ? "bg-purple-600"
                                : "bg-gray-600"
                        }`}
                      >
                        {idx + 1}
                      </div>
                      {idx < phases.length - 1 && (
                        <div className="w-0.5 h-12 bg-gray-600 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{phase.title}</h4>
                      <p className="text-sm text-muted-foreground">{phase.timeline}</p>
                      <Badge className={`mt-1 ${getStatusColor(phase.status)}`}>
                        {phase.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
