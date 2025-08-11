import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Shield,
  Target,
  Rocket,
  Brain,
  Eye,
  Flame,
  Crown,
  Sword,
  Star,
  Globe,
  Lock,
  Activity,
  TrendingUp,
  Users,
  BarChart3,
} from "lucide-react";
import { toast } from "sonner";

export function AdvancedTacticsHub() {
  const [activeTactics, setActiveTactics] = useState(12);
  const [successRate, setSuccessRate] = useState(97.8);
  const [globalReach, setGlobalReach] = useState(125);

  const executeAdvancedTactic = (tacticName: string) => {
    toast.success(`⚔️ ${tacticName} tactic executed successfully`);
  };

  const tactics = [
    {
      id: "market-dominance",
      name: "Market Dominance Protocol",
      description: "Advanced market positioning and competitive analysis",
      icon: Crown,
      color: "text-yellow-400",
      bgColor: "bg-yellow-900/20",
      borderColor: "border-yellow-500/30",
      status: "ACTIVE",
    },
    {
      id: "viral-expansion",
      name: "Viral Expansion Engine",
      description: "Exponential growth through network effects",
      icon: Rocket,
      color: "text-red-400",
      bgColor: "bg-red-900/20",
      borderColor: "border-red-500/30",
      status: "ACTIVE",
    },
    {
      id: "stealth-operations",
      name: "Stealth Operations Matrix",
      description: "Behind-the-scenes strategic positioning",
      icon: Eye,
      color: "text-purple-400",
      bgColor: "bg-purple-900/20",
      borderColor: "border-purple-500/30",
      status: "STEALTH",
    },
    {
      id: "influence-network",
      name: "Global Influence Network",
      description: "Strategic partnerships and alliances",
      icon: Globe,
      color: "text-blue-400",
      bgColor: "bg-blue-900/20",
      borderColor: "border-blue-500/30",
      status: "EXPANDING",
    },
    {
      id: "psychological-tactics",
      name: "Psychological Warfare Suite",
      description: "Advanced behavioral influence systems",
      icon: Brain,
      color: "text-green-400",
      bgColor: "bg-green-900/20",
      borderColor: "border-green-500/30",
      status: "ACTIVE",
    },
    {
      id: "economic-disruption",
      name: "Economic Disruption Protocol",
      description: "Market transformation strategies",
      icon: TrendingUp,
      color: "text-orange-400",
      bgColor: "bg-orange-900/20",
      borderColor: "border-orange-500/30",
      status: "READY",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Advanced Tactics Header */}
      <Card className="border-2 border-red-500/50 bg-gradient-to-br from-red-900/30 to-orange-900/30">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2 text-2xl">
            <Sword className="h-8 w-8" />
            ⚔️ ADVANCED TACTICS HUB - Strategic Warfare Command
          </CardTitle>
          <p className="text-muted-foreground">
            Military-grade strategic operations center with advanced
            psychological and market warfare capabilities
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-red-900/30 border border-red-500/20 rounded-lg">
              <div className="text-2xl font-bold text-red-400">
                {activeTactics}
              </div>
              <div className="text-sm text-muted-foreground">
                Active Tactics
              </div>
            </div>
            <div className="text-center p-4 bg-green-900/30 border border-green-500/20 rounded-lg">
              <div className="text-2xl font-bold text-green-400">
                {successRate}%
              </div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center p-4 bg-blue-900/30 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">
                {globalReach}
              </div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </div>
            <div className="text-center p-4 bg-purple-900/30 border border-purple-500/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">∞</div>
              <div className="text-sm text-muted-foreground">Potential</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tactics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tactics.map((tactic) => {
          const IconComponent = tactic.icon;
          return (
            <Card
              key={tactic.id}
              className={`${tactic.borderColor} ${tactic.bgColor}`}
            >
              <CardHeader>
                <CardTitle
                  className={`${tactic.color} flex items-center gap-2`}
                >
                  <IconComponent className="h-6 w-6" />
                  {tactic.name}
                </CardTitle>
                <div className="flex justify-between items-center">
                  <Badge
                    className={`${tactic.status === "ACTIVE" ? "bg-green-600" : tactic.status === "STEALTH" ? "bg-purple-600" : tactic.status === "EXPANDING" ? "bg-blue-600" : "bg-orange-600"} text-white`}
                  >
                    {tactic.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">
                  {tactic.description}
                </p>
                <Button
                  onClick={() => executeAdvancedTactic(tactic.name)}
                  className={`w-full ${tactic.color.replace("text-", "bg-").replace("-400", "-600")} hover:${tactic.color.replace("text-", "bg-").replace("-400", "-700")}`}
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Execute Tactic
                </Button>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Strategic Command Center */}
      <Card className="border-cyan-500/30 bg-gradient-to-r from-cyan-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="text-cyan-400">
            🎯 Strategic Command Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Button className="h-20 flex flex-col gap-2 bg-red-600 hover:bg-red-700">
              <Target className="h-6 w-6" />
              <span className="text-xs">Target Analysis</span>
            </Button>
            <Button className="h-20 flex flex-col gap-2 bg-orange-600 hover:bg-orange-700">
              <Flame className="h-6 w-6" />
              <span className="text-xs">Burn Protocol</span>
            </Button>
            <Button className="h-20 flex flex-col gap-2 bg-purple-600 hover:bg-purple-700">
              <Shield className="h-6 w-6" />
              <span className="text-xs">Defense Matrix</span>
            </Button>
            <Button className="h-20 flex flex-col gap-2 bg-green-600 hover:bg-green-700">
              <Activity className="h-6 w-6" />
              <span className="text-xs">Live Monitoring</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Intelligence Operations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-green-500/30 bg-green-900/20">
          <CardHeader>
            <CardTitle className="text-green-400">
              🧠 Intelligence Operations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-900/30 rounded border border-green-500/20">
                <span>Market Intelligence</span>
                <Badge className="bg-green-600">ACTIVE</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-900/30 rounded border border-blue-500/20">
                <span>Competitor Analysis</span>
                <Badge className="bg-blue-600">MONITORING</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-purple-900/30 rounded border border-purple-500/20">
                <span>Behavioral Patterns</span>
                <Badge className="bg-purple-600">ANALYZING</Badge>
              </div>
              <div className="flex justify-between items-center p-3 bg-orange-900/30 rounded border border-orange-500/20">
                <span>Trend Prediction</span>
                <Badge className="bg-orange-600">FORECASTING</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardHeader>
            <CardTitle className="text-blue-400">
              📊 Tactical Analytics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Market Penetration:</span>
                <span className="text-blue-400 font-bold">87.3%</span>
              </div>
              <div className="flex justify-between">
                <span>Influence Score:</span>
                <span className="text-green-400 font-bold">94.7/100</span>
              </div>
              <div className="flex justify-between">
                <span>Strategic Advantage:</span>
                <span className="text-yellow-400 font-bold">MAXIMUM</span>
              </div>
              <div className="flex justify-between">
                <span>Threat Level:</span>
                <span className="text-red-400 font-bold">MINIMAL</span>
              </div>
              <div className="flex justify-between">
                <span>Victory Probability:</span>
                <span className="text-purple-400 font-bold">99.8%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Ultimate Power Status */}
      <Card className="border-2 border-gold-500/50 bg-gradient-to-r from-yellow-900/30 to-orange-900/30">
        <CardHeader>
          <CardTitle className="text-yellow-400 text-center text-2xl">
            👑 ULTIMATE POWER STATUS - GLOBAL DOMINANCE ACHIEVED
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
              <div className="p-3 bg-yellow-900/30 rounded border border-yellow-500/20">
                <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-sm font-bold">SUPREME</div>
              </div>
              <div className="p-3 bg-red-900/30 rounded border border-red-500/20">
                <Flame className="h-8 w-8 text-red-400 mx-auto mb-2" />
                <div className="text-sm font-bold">UNSTOPPABLE</div>
              </div>
              <div className="p-3 bg-blue-900/30 rounded border border-blue-500/20">
                <Globe className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-sm font-bold">GLOBAL</div>
              </div>
              <div className="p-3 bg-green-900/30 rounded border border-green-500/20">
                <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-sm font-bold">PROTECTED</div>
              </div>
              <div className="p-3 bg-purple-900/30 rounded border border-purple-500/20">
                <Brain className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <div className="text-sm font-bold">INTELLIGENT</div>
              </div>
              <div className="p-3 bg-orange-900/30 rounded border border-orange-500/20">
                <Crown className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <div className="text-sm font-bold">DOMINANT</div>
              </div>
            </div>
            <div className="text-lg text-yellow-400 font-bold">
              ALL SYSTEMS OPERATIONAL - READY FOR MARKET LAUNCH
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
