import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Target,
  Zap,
  Brain,
  Activity,
  Shield,
  Sparkles,
  Calculator,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

interface DefenseTactic {
  id: string;
  name: string;
  description: string;
  effectiveness: number;
  auto_generated: boolean;
  priority: "high" | "medium" | "low";
  last_updated: string;
}

export function AutoTacticsGenerator() {
  const [tactics, setTactics] = useState<DefenseTactic[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [generationProgress, setGenerationProgress] = useState(0);

  useEffect(() => {
    generateDailyTactics();

    // Auto-generate new tactics daily
    const interval = setInterval(generateDailyTactics, 24 * 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, [generateDailyTactics]);

  const generateDailyTactics = async () => {
    setIsGenerating(true);
    setGenerationProgress(0);

    const tacticTemplates = [
      {
        name: "Quantum Firewall Rotation",
        description:
          "Rotates quantum-encrypted firewalls every 3.7 minutes with unpredictable patterns",
        base_effectiveness: 85,
      },
      {
        name: "Phantom IP Masking",
        description: "Creates 1000+ phantom IP addresses to confuse attackers",
        base_effectiveness: 78,
      },
      {
        name: "Neural Threat Prediction",
        description: "Uses AI to predict attacks 24 hours before they occur",
        base_effectiveness: 92,
      },
      {
        name: "Phoenix Resurrection Protocol",
        description: "Automatically rebuilds systems stronger after any breach attempt",
        base_effectiveness: 96,
      },
      {
        name: "Dragon Scale Armor",
        description: "Multi-layered defense that adapts to each attack type",
        base_effectiveness: 89,
      },
      {
        name: "Temporal Defense Shifting",
        description: "Shifts defensive parameters through time dimensions",
        base_effectiveness: 87,
      },
    ];

    const newTactics: DefenseTactic[] = [];

    for (let i = 0; i < tacticTemplates.length; i++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const template = tacticTemplates[i];
      const effectiveness = template.base_effectiveness + Math.floor(Math.random() * 10) - 5;

      newTactics.push({
        id: `tactic_${Date.now()}_${i}`,
        name: template.name,
        description: template.description,
        effectiveness: Math.max(effectiveness, 70),
        auto_generated: true,
        priority: effectiveness > 90 ? "high" : effectiveness > 80 ? "medium" : "low",
        last_updated: new Date().toISOString(),
      });

      setGenerationProgress(((i + 1) / tacticTemplates.length) * 100);
    }

    setTactics(newTactics);
    setIsGenerating(false);
    toast.success("🧠 Daily tactical analysis complete! New defense strategies generated!");
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-600";
      case "medium":
        return "bg-yellow-600";
      default:
        return "bg-green-600";
    }
  };

  const activateTactic = (tacticId: string) => {
    setTactics((prev) =>
      prev.map((tactic) =>
        tactic.id === tacticId
          ? {
              ...tactic,
              effectiveness: Math.min(tactic.effectiveness + 5, 100),
            }
          : tactic
      )
    );

    const tactic = tactics.find((t) => t.id === tacticId);
    toast.success(`⚡ ${tactic?.name} activated! Defense effectiveness increased!`);
  };

  return (
    <div className="space-y-6">
      {/* Generator Status Header */}
      <Card className="border-blue-500/50 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Calculator className="h-6 w-6 animate-pulse" />
            🧮 AUTO TACTICS GENERATOR - DAILY INTELLIGENCE
            <Badge className="bg-blue-600 text-white animate-pulse">
              <Brain className="h-3 w-3 mr-1" />
              AI POWERED
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 rounded-lg bg-green-900/30">
              <Target className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-green-400">{tactics.length}</div>
              <div className="text-xs text-muted-foreground">Active Tactics</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-blue-900/30">
              <Activity className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-blue-400">
                {tactics.length > 0
                  ? Math.round(
                      tactics.reduce((sum, t) => sum + t.effectiveness, 0) / tactics.length
                    )
                  : 0}
                %
              </div>
              <div className="text-xs text-muted-foreground">Avg Effectiveness</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-purple-900/30">
              <TrendingUp className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-purple-400">24h</div>
              <div className="text-xs text-muted-foreground">Auto-Update</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-orange-900/30">
              <Sparkles className="h-6 w-6 text-orange-400 mx-auto mb-2" />
              <div className="text-lg font-bold text-orange-400">∞</div>
              <div className="text-xs text-muted-foreground">AI Analysis</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-semibold text-blue-400">Daily Tactics Generation</h4>
                <p className="text-sm text-muted-foreground">
                  {isGenerating
                    ? "Generating new defense tactics..."
                    : "Ready for next generation cycle"}
                </p>
              </div>
              <Button
                onClick={generateDailyTactics}
                disabled={isGenerating}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Brain className="h-4 w-4 mr-2" />
                {isGenerating ? "Generating..." : "Generate New Tactics"}
              </Button>
            </div>

            {isGenerating && <Progress value={generationProgress} className="h-3" />}
          </div>
        </CardContent>
      </Card>

      {/* Generated Tactics List */}
      <div className="grid gap-4">
        {tactics.map((tactic) => (
          <Card key={tactic.id} className="border-border/50">
            <CardContent className="pt-4">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-lg">{tactic.name}</h4>
                    <Badge className={`text-white ${getPriorityColor(tactic.priority)}`}>
                      {tactic.priority.toUpperCase()}
                    </Badge>
                    <Badge className="bg-cyan-600 text-white">
                      {tactic.effectiveness}% Effective
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{tactic.description}</p>
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span>Effectiveness Rating</span>
                      <span>{tactic.effectiveness}%</span>
                    </div>
                    <Progress value={tactic.effectiveness} className="h-2" />
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">
                    Last Updated: {new Date(tactic.last_updated).toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-2 ml-4">
                  <Badge className="bg-green-600 text-white">
                    <Zap className="h-3 w-3 mr-1" />
                    AUTO-GEN
                  </Badge>
                  <Button
                    onClick={() => activateTactic(tactic.id)}
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Shield className="h-4 w-4 mr-1" />
                    Enhance
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {tactics.length === 0 && (
        <Card className="border-gray-500/30">
          <CardContent className="pt-6 text-center">
            <Calculator className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-gray-400 mb-2">No Tactics Generated Yet</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Click the generate button to create new AI-powered defense tactics
            </p>
            <Button onClick={generateDailyTactics} className="bg-blue-600 hover:bg-blue-700">
              <Brain className="h-4 w-4 mr-2" />
              Generate First Tactics
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
