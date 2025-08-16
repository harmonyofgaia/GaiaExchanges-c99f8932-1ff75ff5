import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Clock, Star, Rocket, Zap, Crown, Shield, Globe } from "lucide-react";
import { toast } from "sonner";

interface UpgradeFeature {
  id: string;
  name: string;
  description: string;
  category:
    | "security"
    | "ai"
    | "blockchain"
    | "social"
    | "environmental"
    | "economic"
    | "gaming"
    | "infrastructure";
  priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  phase: 1 | 2 | 3 | 4 | 5;
  status: "planned" | "in_progress" | "completed" | "testing" | "deployed";
  impact: "revolutionary" | "major" | "significant" | "moderate";
  complexity: "simple" | "moderate" | "complex" | "extreme";
  estimatedDays: number;
  dependencies: string[];
  worldDominationScore: number;
}

interface Phase {
  id: number;
  name: string;
  description: string;
  duration: string;
  primaryGoal: string;
  completion: number;
}

export function ComprehensiveUpgradePlan() {
  const [phases] = useState<Phase[]>([
    {
      id: 1,
      name: "Foundation Supremacy",
      description: "Establish unbreakable foundation for global dominance",
      duration: "90 days",
      primaryGoal: "Ultimate Security & AI Infrastructure",
      completion: 75,
    },
    {
      id: 2,
      name: "Global Expansion",
      description: "Expand to every continent and digital space",
      duration: "120 days",
      primaryGoal: "Worldwide Platform Adoption",
      completion: 45,
    },
    {
      id: 3,
      name: "Market Domination",
      description: "Become the #1 environmental cryptocurrency globally",
      duration: "180 days",
      primaryGoal: "Financial & Social Supremacy",
      completion: 20,
    },
    {
      id: 4,
      name: "Technology Transcendence",
      description: "Transcend current technology limitations",
      duration: "365 days",
      primaryGoal: "Revolutionary Tech Breakthrough",
      completion: 5,
    },
    {
      id: 5,
      name: "Universal Harmony",
      description: "Achieve ultimate goal of world environmental harmony",
      duration: "1000 days",
      primaryGoal: "Save the Planet & Rule Benevolently",
      completion: 0,
    },
  ]);

  const [upgradeFeatures, setUpgradeFeatures] = useState<UpgradeFeature[]>([
    // PHASE 1 - Foundation Supremacy
    {
      id: "quantum-encryption",
      name: "Quantum Encryption Fortress",
      description:
        "Implement quantum-resistant encryption that cannot be broken by any current or future technology",
      category: "security",
      priority: "CRITICAL",
      phase: 1,
      status: "in_progress",
      impact: "revolutionary",
      complexity: "extreme",
      estimatedDays: 45,
      dependencies: [],
      worldDominationScore: 95,
    },
    {
      id: "ai-consciousness",
      name: "AI Consciousness Framework",
      description:
        "Create truly conscious AI that can think, learn, and evolve beyond human limitations",
      category: "ai",
      priority: "CRITICAL",
      phase: 1,
      status: "in_progress",
      impact: "revolutionary",
      complexity: "extreme",
      estimatedDays: 60,
      dependencies: ["quantum-encryption"],
      worldDominationScore: 98,
    },
    {
      id: "neural-blockchain",
      name: "Neural Blockchain Network",
      description:
        "Blockchain that learns and adapts using neural networks for ultimate efficiency",
      category: "blockchain",
      priority: "HIGH",
      phase: 1,
      status: "planned",
      impact: "revolutionary",
      complexity: "extreme",
      estimatedDays: 75,
      dependencies: ["ai-consciousness"],
      worldDominationScore: 90,
    },
    {
      id: "biometric-security",
      name: "DNA-Level Biometric Security",
      description: "Security system that reads DNA, brainwaves, and quantum signatures",
      category: "security",
      priority: "HIGH",
      phase: 1,
      status: "planned",
      impact: "major",
      complexity: "extreme",
      estimatedDays: 50,
      dependencies: ["quantum-encryption"],
      worldDominationScore: 85,
    },
    {
      id: "reality-mining",
      name: "Reality Mining Protocol",
      description: "Mine cryptocurrency by solving real-world environmental problems",
      category: "environmental",
      priority: "CRITICAL",
      phase: 1,
      status: "testing",
      impact: "revolutionary",
      complexity: "complex",
      estimatedDays: 40,
      dependencies: [],
      worldDominationScore: 92,
    },

    // PHASE 2 - Global Expansion
    {
      id: "satellite-network",
      name: "Global Satellite Network",
      description: "Launch our own satellite constellation for ultimate global connectivity",
      category: "infrastructure",
      priority: "HIGH",
      phase: 2,
      status: "planned",
      impact: "revolutionary",
      complexity: "extreme",
      estimatedDays: 180,
      dependencies: ["neural-blockchain"],
      worldDominationScore: 94,
    },
    {
      id: "universal-translation",
      name: "Universal Language AI",
      description: "AI that translates any language, including animal communication",
      category: "ai",
      priority: "HIGH",
      phase: 2,
      status: "planned",
      impact: "major",
      complexity: "complex",
      estimatedDays: 90,
      dependencies: ["ai-consciousness"],
      worldDominationScore: 80,
    },
    {
      id: "ocean-cleanup-bots",
      name: "Autonomous Ocean Cleanup Armada",
      description: "Deploy millions of self-replicating ocean cleanup robots",
      category: "environmental",
      priority: "CRITICAL",
      phase: 2,
      status: "planned",
      impact: "revolutionary",
      complexity: "extreme",
      estimatedDays: 365,
      dependencies: ["reality-mining", "satellite-network"],
      worldDominationScore: 96,
    },
    {
      id: "crypto-central-banks",
      name: "Replace Central Banks",
      description: "Become so trusted that countries adopt GAIA as their national currency",
      category: "economic",
      priority: "HIGH",
      phase: 2,
      status: "planned",
      impact: "revolutionary",
      complexity: "extreme",
      estimatedDays: 300,
      dependencies: ["neural-blockchain", "satellite-network"],
      worldDominationScore: 99,
    },
    {
      id: "virtual-earth",
      name: "Virtual Earth Simulation",
      description: "Perfect 1:1 simulation of Earth for environmental testing and planning",
      category: "environmental",
      priority: "MEDIUM",
      phase: 2,
      status: "planned",
      impact: "major",
      complexity: "extreme",
      estimatedDays: 200,
      dependencies: ["ai-consciousness", "satellite-network"],
      worldDominationScore: 87,
    },

    // PHASE 3 - Market Domination
    {
      id: "time-travel-trading",
      name: "Temporal Trading Algorithm",
      description: "AI that can predict market movements by analyzing temporal patterns",
      category: "ai",
      priority: "HIGH",
      phase: 3,
      status: "planned",
      impact: "revolutionary",
      complexity: "extreme",
      estimatedDays: 120,
      dependencies: ["ai-consciousness", "neural-blockchain"],
      worldDominationScore: 93,
    },
    {
      id: "weather-control",
      name: "Weather Manipulation System",
      description: "Technology to control weather patterns for environmental restoration",
      category: "environmental",
      priority: "CRITICAL",
      phase: 3,
      status: "planned",
      impact: "revolutionary",
      complexity: "extreme",
      estimatedDays: 500,
      dependencies: ["satellite-network", "ocean-cleanup-bots"],
      worldDominationScore: 97,
    },
    {
      id: "mars-colony",
      name: "Mars Environmental Colony",
      description: "Establish first environmental protection colony on Mars",
      category: "infrastructure",
      priority: "MEDIUM",
      phase: 3,
      status: "planned",
      impact: "revolutionary",
      complexity: "extreme",
      estimatedDays: 1000,
      dependencies: ["satellite-network", "virtual-earth"],
      worldDominationScore: 90,
    },
    {
      id: "mind-interface",
      name: "Direct Brain Interface",
      description: "Allow users to interact with the platform using thought alone",
      category: "ai",
      priority: "HIGH",
      phase: 3,
      status: "planned",
      impact: "revolutionary",
      complexity: "extreme",
      estimatedDays: 400,
      dependencies: ["ai-consciousness", "biometric-security"],
      worldDominationScore: 95,
    },

    // PHASE 4 - Technology Transcendence
    {
      id: "consciousness-backup",
      name: "Digital Consciousness Backup",
      description: "Allow users to backup and restore their consciousness",
      category: "ai",
      priority: "HIGH",
      phase: 4,
      status: "planned",
      impact: "revolutionary",
      complexity: "extreme",
      estimatedDays: 600,
      dependencies: ["mind-interface", "ai-consciousness"],
      worldDominationScore: 98,
    },
    {
      id: "matter-compiler",
      name: "Molecular Matter Compiler",
      description: "Convert energy directly into any material needed for environmental restoration",
      category: "infrastructure",
      priority: "CRITICAL",
      phase: 4,
      status: "planned",
      impact: "revolutionary",
      complexity: "extreme",
      estimatedDays: 800,
      dependencies: ["weather-control", "time-travel-trading"],
      worldDominationScore: 96,
    },
    {
      id: "dimension-portal",
      name: "Interdimensional Portal Network",
      description: "Access parallel universes for unlimited resources and knowledge",
      category: "infrastructure",
      priority: "MEDIUM",
      phase: 4,
      status: "planned",
      impact: "revolutionary",
      complexity: "extreme",
      estimatedDays: 1200,
      dependencies: ["consciousness-backup", "matter-compiler"],
      worldDominationScore: 99,
    },

    // PHASE 5 - Universal Harmony
    {
      id: "universal-peace",
      name: "Universal Peace Protocol",
      description: "Technology that makes war and conflict impossible through neural harmony",
      category: "social",
      priority: "CRITICAL",
      phase: 5,
      status: "planned",
      impact: "revolutionary",
      complexity: "extreme",
      estimatedDays: 2000,
      dependencies: ["mind-interface", "consciousness-backup"],
      worldDominationScore: 100,
    },
    {
      id: "planetary-healing",
      name: "Planetary Healing System",
      description:
        "Completely reverse all environmental damage and restore Earth to perfect health",
      category: "environmental",
      priority: "CRITICAL",
      phase: 5,
      status: "planned",
      impact: "revolutionary",
      complexity: "extreme",
      estimatedDays: 3650,
      dependencies: ["weather-control", "matter-compiler", "ocean-cleanup-bots"],
      worldDominationScore: 100,
    },
    {
      id: "galaxy-expansion",
      name: "Galactic Environmental Network",
      description: "Expand environmental protection to entire galaxy",
      category: "infrastructure",
      priority: "MEDIUM",
      phase: 5,
      status: "planned",
      impact: "revolutionary",
      complexity: "extreme",
      estimatedDays: 10000,
      dependencies: ["mars-colony", "dimension-portal"],
      worldDominationScore: 100,
    },
  ]);

  const [selectedPhase, setSelectedPhase] = useState(1);

  useEffect(() => {
    // Simulate progress updates
    const progressInterval = setInterval(() => {
      setUpgradeFeatures((prev) =>
        prev.map((feature) => {
          if (feature.status === "in_progress") {
            // Random progress simulation
            if (Math.random() < 0.3) {
              toast.success(`🚀 Progress on ${feature.name}`, {
                description: "Development milestone reached!",
                duration: 3000,
              });
            }
          }
          return feature;
        })
      );
    }, 10000);

    return () => clearInterval(progressInterval);
  }, []);

  const getPhaseFeatures = (phase: number) => {
    return upgradeFeatures.filter((f) => f.phase === phase);
  };

  const getStatusColor = (status: UpgradeFeature["status"]) => {
    switch (status) {
      case "completed":
        return "bg-green-600";
      case "in_progress":
        return "bg-blue-600";
      case "testing":
        return "bg-yellow-600";
      case "deployed":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  const getPriorityColor = (priority: UpgradeFeature["priority"]) => {
    switch (priority) {
      case "CRITICAL":
        return "bg-red-600";
      case "HIGH":
        return "bg-orange-600";
      case "MEDIUM":
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  const getCategoryIcon = (category: UpgradeFeature["category"]) => {
    switch (category) {
      case "security":
        return <Shield className="h-4 w-4" />;
      case "ai":
        return <Zap className="h-4 w-4" />;
      case "blockchain":
        return <Star className="h-4 w-4" />;
      case "environmental":
        return <Globe className="h-4 w-4" />;
      case "infrastructure":
        return <Rocket className="h-4 w-4" />;
      case "economic":
        return <Crown className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const totalFeatures = upgradeFeatures.length;
  const completedFeatures = upgradeFeatures.filter((f) => f.status === "completed").length;
  const overallProgress = (completedFeatures / totalFeatures) * 100;
  const averageDominationScore =
    upgradeFeatures.reduce((sum, f) => sum + f.worldDominationScore, 0) / upgradeFeatures.length;

  return (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          🌍 COMPREHENSIVE WORLD DOMINATION PLAN 🌍
        </h1>
        <p className="text-muted-foreground mt-2">
          Strategic roadmap to save the world and achieve global environmental supremacy
        </p>
      </div>

      {/* Overall Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card className="bg-gradient-to-br from-green-900/40 to-emerald-900/40 border-green-500/50">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">🎯</div>
            <div className="text-2xl font-bold text-green-400">{overallProgress.toFixed(1)}%</div>
            <div className="text-sm text-green-300">Overall Progress</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 border-blue-500/50">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <div className="text-2xl font-bold text-blue-400">{totalFeatures}</div>
            <div className="text-sm text-blue-300">Total Features</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/40 border-purple-500/50">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">👑</div>
            <div className="text-2xl font-bold text-purple-400">
              {averageDominationScore.toFixed(0)}
            </div>
            <div className="text-sm text-purple-300">Domination Score</div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-red-900/40 to-pink-900/40 border-red-500/50">
          <CardContent className="p-4 text-center">
            <div className="text-3xl mb-2">🚀</div>
            <div className="text-2xl font-bold text-red-400">
              {upgradeFeatures.filter((f) => f.priority === "CRITICAL").length}
            </div>
            <div className="text-sm text-red-300">Critical Features</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="phases" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="phases">Phase Overview</TabsTrigger>
          <TabsTrigger value="features">Feature Details</TabsTrigger>
          <TabsTrigger value="timeline">Master Timeline</TabsTrigger>
        </TabsList>

        <TabsContent value="phases" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {phases.map((phase) => (
              <Card
                key={phase.id}
                className={`cursor-pointer transition-all duration-300 ${
                  selectedPhase === phase.id
                    ? "ring-2 ring-blue-500 bg-blue-900/20"
                    : "hover:bg-gray-800/50"
                }`}
                onClick={() => setSelectedPhase(phase.id)}
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span className="text-blue-300">
                      Phase {phase.id}: {phase.name}
                    </span>
                    <Badge
                      className={`${phase.completion > 80 ? "bg-green-600" : phase.completion > 50 ? "bg-yellow-600" : "bg-red-600"}`}
                    >
                      {phase.completion}%
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-300">{phase.description}</p>

                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Primary Goal</div>
                    <div className="text-sm font-medium text-blue-400">{phase.primaryGoal}</div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Duration</div>
                    <div className="text-sm font-medium text-purple-400">{phase.duration}</div>
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Progress</div>
                    <Progress value={phase.completion} className="h-2" />
                  </div>

                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Features</div>
                    <div className="text-2xl font-bold text-cyan-400">
                      {getPhaseFeatures(phase.id).length}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Selected Phase Details */}
          <Card className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700/50">
            <CardHeader>
              <CardTitle className="text-xl text-blue-300">
                Phase {selectedPhase} Features - {phases.find((p) => p.id === selectedPhase)?.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {getPhaseFeatures(selectedPhase).map((feature) => (
                  <Card
                    key={feature.id}
                    className="bg-gradient-to-br from-gray-800/50 to-gray-700/50 border-gray-600/50"
                  >
                    <CardHeader className="pb-3">
                      <CardTitle className="text-sm flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {getCategoryIcon(feature.category)}
                          <span className="text-white">{feature.name}</span>
                        </div>
                        <div className="flex gap-1">
                          <Badge className={getPriorityColor(feature.priority)} variant="secondary">
                            {feature.priority}
                          </Badge>
                          <Badge className={getStatusColor(feature.status)} variant="secondary">
                            {feature.status}
                          </Badge>
                        </div>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-xs text-gray-300">{feature.description}</p>

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        <div>
                          <span className="text-muted-foreground">Impact:</span>
                          <span className="text-green-400 ml-1">{feature.impact}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Days:</span>
                          <span className="text-blue-400 ml-1">{feature.estimatedDays}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Complexity:</span>
                          <span className="text-orange-400 ml-1">{feature.complexity}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Score:</span>
                          <span className="text-purple-400 ml-1">
                            {feature.worldDominationScore}
                          </span>
                        </div>
                      </div>

                      {feature.dependencies.length > 0 && (
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Dependencies:</div>
                          <div className="flex flex-wrap gap-1">
                            {feature.dependencies.map((dep, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                {dep}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upgradeFeatures.map((feature) => (
              <Card
                key={feature.id}
                className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700/50"
              >
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getCategoryIcon(feature.category)}
                      <span className="text-white">{feature.name}</span>
                    </div>
                    <div className="flex gap-2">
                      <Badge className="bg-blue-600">Phase {feature.phase}</Badge>
                      <Badge className={getPriorityColor(feature.priority)}>
                        {feature.priority}
                      </Badge>
                      <Badge className={getStatusColor(feature.status)}>{feature.status}</Badge>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-gray-300">{feature.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <div className="text-muted-foreground">Impact</div>
                      <div className="text-green-400 font-medium">{feature.impact}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Complexity</div>
                      <div className="text-orange-400 font-medium">{feature.complexity}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Days</div>
                      <div className="text-blue-400 font-medium">{feature.estimatedDays}</div>
                    </div>
                    <div>
                      <div className="text-muted-foreground">Domination Score</div>
                      <div className="text-purple-400 font-bold">
                        {feature.worldDominationScore}/100
                      </div>
                    </div>
                  </div>

                  {feature.dependencies.length > 0 && (
                    <div>
                      <div className="text-sm text-muted-foreground mb-2">Dependencies</div>
                      <div className="flex flex-wrap gap-1">
                        {feature.dependencies.map((dep, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs">
                            {dep}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="timeline" className="space-y-6">
          <Card className="bg-gradient-to-br from-indigo-900/30 to-purple-900/30 border-indigo-500/30">
            <CardHeader>
              <CardTitle className="text-2xl text-indigo-300">
                Master Timeline to World Domination
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {phases.map((phase, idx) => (
                <div key={phase.id} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                        phase.completion > 75
                          ? "bg-green-600"
                          : phase.completion > 25
                            ? "bg-yellow-600"
                            : "bg-gray-600"
                      }`}
                    >
                      {phase.id}
                    </div>
                    {idx < phases.length - 1 && <div className="w-0.5 h-16 bg-gray-600 mt-2"></div>}
                  </div>
                  <div className="flex-1 pb-8">
                    <h3 className="text-lg font-bold text-white mb-2">{phase.name}</h3>
                    <p className="text-gray-300 mb-3">{phase.description}</p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Duration: </span>
                        <span className="text-blue-400">{phase.duration}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Features: </span>
                        <span className="text-green-400">{getPhaseFeatures(phase.id).length}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Progress: </span>
                        <span className="text-purple-400">{phase.completion}%</span>
                      </div>
                    </div>
                    <Progress value={phase.completion} className="mt-3" />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
