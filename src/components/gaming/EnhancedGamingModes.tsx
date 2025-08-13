import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GameModeSelector } from "./GameModeSelector";
import { GameStyleSelector } from "./GameStyleSelector";
import {
  Zap,
  Crown,
  Sword,
  Shield,
  Star,
  Rocket,
  Gamepad2,
  Users,
  Trophy,
  Brain,
  Sparkles,
} from "lucide-react";

export function EnhancedGamingModes() {
  const gameModes = [
    {
      id: "tournament",
      name: "🏆 Tournament Mode",
      description:
        "Competitive tournaments with global rankings and massive prizes",
      icon: <Crown className="h-6 w-6" />,
      color: "from-yellow-600 to-orange-600",
      players: "2,847 active",
      features: ["Global Leaderboards", "Prize Pools", "Seasonal Events"],
    },
    {
      id: "survival",
      name: "🛡️ Survival Mode",
      description: "Ultimate endurance challenges in hostile environments",
      icon: <Shield className="h-6 w-6" />,
      color: "from-green-600 to-teal-600",
      players: "1,234 active",
      features: ["Resource Management", "Dynamic Weather", "Base Building"],
    },
    {
      id: "blitz",
      name: "⚡ Blitz Mode",
      description: "Fast-paced lightning rounds with instant action",
      icon: <Zap className="h-6 w-6" />,
      color: "from-purple-600 to-pink-600",
      players: "5,678 active",
      features: ["60-Second Rounds", "Power-ups", "Chain Combos"],
    },
    {
      id: "hardcore",
      name: "⚔️ Hardcore Mode",
      description: "Maximum difficulty challenges for elite players",
      icon: <Sword className="h-6 w-6" />,
      color: "from-red-600 to-orange-600",
      players: "987 active",
      features: ["Permadeath", "Elite Rewards", "Legendary Status"],
    },
    {
      id: "creative",
      name: "🎨 Creative Mode",
      description: "Build and design unlimited worlds and experiences",
      icon: <Brain className="h-6 w-6" />,
      color: "from-cyan-600 to-blue-600",
      players: "3,421 active",
      features: ["World Builder", "Asset Library", "Physics Editor"],
    },
    {
      id: "quantum",
      name: "⚡ Quantum Mode",
      description: "Reality-bending gameplay with quantum physics",
      icon: <Sparkles className="h-6 w-6" />,
      color: "from-purple-600 to-pink-600",
      players: "1,567 active",
      features: ["Quantum States", "Reality Shifting", "Time Manipulation"],
    },
  ];

  const advancedFeatures = [
    {
      name: "AI-Powered Opponents",
      description: "Adaptive AI that learns from your gameplay",
      status: "active",
    },
    {
      name: "Cross-Platform Sync",
      description: "Play seamlessly across all devices",
      status: "active",
    },
    {
      name: "Quantum Physics Engine",
      description: "Revolutionary physics for ultimate realism",
      status: "beta",
    },
    {
      name: "Blockchain Integration",
      description: "Secure achievements and rewards on-chain",
      status: "active",
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400 text-2xl">
            <Rocket className="h-8 w-8" />
            🔥 ENHANCED GAMING MODES
          </CardTitle>
          <div className="flex items-center gap-4">
            <Badge className="bg-green-600 animate-pulse">
              ✅ ALL MODES ACTIVE
            </Badge>
            <Badge className="bg-blue-600">🎮 Advanced Features</Badge>
            <Badge className="bg-purple-600">🚀 Quantum Enhanced</Badge>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="modes" className="w-full">
        <TabsList className="grid w-full grid-cols-3 bg-black/20 mb-6">
          <TabsTrigger
            value="modes"
            className="data-[state=active]:bg-purple-600"
          >
            <Crown className="h-4 w-4 mr-2" />
            Game Modes
          </TabsTrigger>
          <TabsTrigger
            value="styles"
            className="data-[state=active]:bg-blue-600"
          >
            <Star className="h-4 w-4 mr-2" />
            Game Styles
          </TabsTrigger>
          <TabsTrigger
            value="advanced"
            className="data-[state=active]:bg-cyan-600"
          >
            <Sparkles className="h-4 w-4 mr-2" />
            Advanced
          </TabsTrigger>
        </TabsList>

        <TabsContent value="modes" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {gameModes.map((mode) => (
              <Card
                key={mode.id}
                className={`bg-gradient-to-br ${mode.color}/20 border-2 border-opacity-50 hover:scale-105 transition-all`}
              >
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-white">
                    {mode.icon}
                    {mode.name}
                  </CardTitle>
                  <div className="flex gap-2 flex-wrap">
                    <Badge className={`bg-gradient-to-r ${mode.color}`}>
                      ACTIVE
                    </Badge>
                    <Badge className="bg-blue-600">
                      <Users className="h-3 w-3 mr-1" />
                      {mode.players}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-3 text-sm">
                    {mode.description}
                  </p>
                  <div className="mb-4">
                    <h4 className="text-xs font-bold text-white mb-2">
                      Key Features:
                    </h4>
                    <div className="flex flex-wrap gap-1">
                      {mode.features.map((feature, index) => (
                        <Badge
                          key={index}
                          variant="outline"
                          className="text-xs"
                        >
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <Button
                    className={`w-full bg-gradient-to-r ${mode.color} hover:opacity-90 text-white font-bold`}
                  >
                    <Rocket className="h-4 w-4 mr-2" />
                    Enter Mode
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          <GameModeSelector />
        </TabsContent>

        <TabsContent value="styles" className="space-y-6">
          <GameStyleSelector />
        </TabsContent>

        <TabsContent value="advanced" className="space-y-6">
          <Card className="bg-gradient-to-r from-cyan-900/30 to-purple-900/30 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400 flex items-center gap-2">
                <Sparkles className="h-6 w-6" />
                🚀 Advanced Gaming Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {advancedFeatures.map((feature, index) => (
                  <div
                    key={index}
                    className="p-4 bg-black/30 rounded-lg border border-cyan-500/20"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-bold text-cyan-400">
                        {feature.name}
                      </h4>
                      <Badge
                        className={
                          feature.status === "active"
                            ? "bg-green-600"
                            : "bg-yellow-600"
                        }
                      >
                        {feature.status.toUpperCase()}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Trophy className="h-6 w-6" />
                🏆 Elite Gaming Statistics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-yellow-900/20 rounded">
                  <div className="text-2xl font-bold text-yellow-400">
                    15,432
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Tournament Winners
                  </div>
                </div>
                <div className="text-center p-4 bg-green-900/20 rounded">
                  <div className="text-2xl font-bold text-green-400">98.7%</div>
                  <div className="text-xs text-muted-foreground">
                    Server Uptime
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-900/20 rounded">
                  <div className="text-2xl font-bold text-blue-400">
                    280 FPS
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Max Performance
                  </div>
                </div>
                <div className="text-center p-4 bg-purple-900/20 rounded">
                  <div className="text-2xl font-bold text-purple-400">∞</div>
                  <div className="text-xs text-muted-foreground">
                    Possibilities
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* System Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
          <h4 className="font-medium text-purple-400 mb-2">
            🚀 Enhanced Gaming Features
          </h4>
          <div className="text-sm text-purple-300">
            ✅ Quantum-enhanced game physics engine
            <br />
            ✅ Real-time AI opponent adaptation
            <br />
            ✅ Cross-platform synchronization
            <br />
            ✅ Advanced analytics and performance tracking
            <br />
            ✅ Dynamic difficulty adjustment system
            <br />✅ Blockchain-powered achievements
          </div>
        </div>

        <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
          <h4 className="font-medium text-green-400 mb-2">
            🌍 Gaming Ecosystem Status
          </h4>
          <div className="text-sm text-green-300">
            ✅ All game modes operational
            <br />
            ✅ 15,000+ active players online
            <br />
            ✅ Real-time environmental impact tracking
            <br />
            ✅ AI-powered game generation active
            <br />
            ✅ Quantum physics engine stable
            <br />✅ Global tournaments running
          </div>
        </div>
      </div>
    </div>
  );
}
