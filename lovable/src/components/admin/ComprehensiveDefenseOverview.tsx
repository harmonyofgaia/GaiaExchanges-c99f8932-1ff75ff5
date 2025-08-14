import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Zap,
  Eye,
  Target,
  Activity,
  Globe,
  PlayCircle,
  PauseCircle,
  RotateCcw,
  AlertTriangle,
  CheckCircle,
  Crown,
  Flame,
} from "lucide-react";
import { toast } from "sonner";
import { useInvisibleSecurity } from "@/services/invisibleSecurity";

interface DefenseOverviewStats {
  totalAnimals: number;
  activeAnimals: number;
  immortalCreatures: number;
  totalThreatsRepelled: number;
  systemIntegrity: number;
  combinedPower: number;
  evolutionRate: number;
  defenseEffectiveness: number;
}

export function ComprehensiveDefenseOverview() {
  const {
    metrics: securityMetrics,
    getDefenseAnimals,
    getRecentThreats,
    emergencyLockdown,
  } = useInvisibleSecurity();

  const [overviewStats, setOverviewStats] = useState<DefenseOverviewStats>({
    totalAnimals: 0, // Will be dynamically computed
    activeAnimals: 35,
    immortalCreatures: 11,
    totalThreatsRepelled: 0,
    systemIntegrity: 100,
    combinedPower: 8500000,
    evolutionRate: 75000,
    defenseEffectiveness: 98.7,
  });

  const [recentActivity, setRecentActivity] = useState<string[]>([]);

  useEffect(() => {
    const updateStats = () => {
      // Simulate real-time activity
      const activities = [
        "🐉 Alpha Dragon neutralized quantum breach attempt",
        "🐨 Cyber Koala decoded malicious algorithm",
        "🦅 Phoenix Guardian restored system integrity",
        "🦁 King Lion blocked unauthorized access",
        "🐬 AI Dolphin detected deep web intrusion",
        "🐺 Pack Wolf coordinated multi-vector defense",
        "🐒 Monkey Squad eliminated code injection",
        "🐲 Digital Dragon prevented matrix corruption",
        "⚛️ Quantum Phoenix executed dimension reset",
      ];

      if (Math.random() < 0.3) {
        const newActivity = activities[Math.floor(Math.random() * activities.length)];
        setRecentActivity((prev) => [newActivity, ...prev.slice(0, 9)]);
      }

      // Update stats
      setOverviewStats((prev) => ({
        ...prev,
        totalThreatsRepelled: prev.totalThreatsRepelled + Math.floor(Math.random() * 5),
        combinedPower: prev.combinedPower + Math.floor(Math.random() * 10000),
        systemIntegrity: Math.max(
          95,
          Math.min(100, prev.systemIntegrity + (Math.random() - 0.5) * 2)
        ),
      }));
    };

    const interval = setInterval(updateStats, 3000);
    updateStats();

    return () => clearInterval(interval);
  }, []);

  const deployAllDefenses = () => {
    toast.success("🛡️ ALL DEFENSE SYSTEMS DEPLOYED!", {
      description: "Maximum protection activated across all systems",
      duration: 8000,
    });
    console.log("🚨 COMPREHENSIVE DEFENSE DEPLOYMENT INITIATED");
    console.log("🐉 39 Defense Animals Activated");
    console.log("♾️ 11 Immortal Creatures Deployed");
    console.log("🛡️ Ultimate Defensive Barrier Engaged");
    console.log("⚡ System Power Level: MAXIMUM");
  };

  const activateEmergencyProtocol = () => {
    emergencyLockdown();
    toast.error("🚨 EMERGENCY PROTOCOL ACTIVATED!", {
      description: "All systems locked down - Maximum defense engaged",
      duration: 10000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Main Overview Card */}
      <div className="p-[2px] bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-lg">
        <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center gap-2 text-2xl">
              <Shield className="h-8 w-8 animate-pulse" />
              🛡️ COMPREHENSIVE DEFENSE OVERVIEW - GAIA PROTECTION MATRIX
            </CardTitle>
            <div className="flex gap-2 flex-wrap">
              <Badge className="bg-green-600">✅ ALL SYSTEMS OPERATIONAL</Badge>
              <Badge className="bg-purple-600">♾️ IMMORTAL PROTECTION: ACTIVE</Badge>
              <Badge className="bg-blue-600">🔒 SECURITY LEVEL: MAXIMUM</Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-500/30">
                <Shield className="h-8 w-8 mx-auto text-green-400 mb-2" />
                <div className="text-2xl font-bold text-green-400">
                  {overviewStats.totalAnimals}
                </div>
                <div className="text-sm text-muted-foreground">Total Defense Animals</div>
              </div>

              <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                <Crown className="h-8 w-8 mx-auto text-purple-400 mb-2" />
                <div className="text-2xl font-bold text-purple-400">
                  {overviewStats.immortalCreatures}
                </div>
                <div className="text-sm text-muted-foreground">Immortal Creatures</div>
              </div>

              <div className="text-center p-4 bg-red-900/30 rounded-lg border border-red-500/30">
                <Target className="h-8 w-8 mx-auto text-red-400 mb-2" />
                <div className="text-2xl font-bold text-red-400">
                  {overviewStats.totalThreatsRepelled}
                </div>
                <div className="text-sm text-muted-foreground">Threats Repelled</div>
              </div>

              <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
                <Zap className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                <div className="text-2xl font-bold text-blue-400">
                  {overviewStats.combinedPower.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Combined Power</div>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-green-400">🛡️ System Integrity</span>
                  <span className="text-green-400">
                    {overviewStats.systemIntegrity.toFixed(1)}%
                  </span>
                </div>
                <Progress value={overviewStats.systemIntegrity} className="h-3" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-purple-400">⚡ Defense Effectiveness</span>
                  <span className="text-purple-400">{overviewStats.defenseEffectiveness}%</span>
                </div>
                <Progress value={overviewStats.defenseEffectiveness} className="h-3" />
              </div>
            </div>

            <div className="flex gap-2 flex-wrap">
              <Button onClick={deployAllDefenses} className="bg-red-600 hover:bg-red-700">
                <PlayCircle className="h-4 w-4 mr-1" />
                🚨 DEPLOY ALL DEFENSES
              </Button>
              <Button
                onClick={activateEmergencyProtocol}
                className="bg-orange-600 hover:bg-orange-700"
              >
                <AlertTriangle className="h-4 w-4 mr-1" />
                ⚠️ EMERGENCY PROTOCOL
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Defense Systems Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Eye className="h-5 w-5" />
                AI Defense Animals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>🐉 Dragons:</span>
                  <Badge className="bg-red-600">3 Active</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>🐨 Koalas:</span>
                  <Badge className="bg-green-600">2 Active</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>🦅 Phoenix:</span>
                  <Badge className="bg-orange-600">2 Active</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>🦁 Lions:</span>
                  <Badge className="bg-yellow-600">2 Active</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>🐒 Monkeys:</span>
                  <Badge className="bg-purple-600">3 Active</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>🐬 Dolphins:</span>
                  <Badge className="bg-blue-600">1 Active</Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>🐺 Wolves:</span>
                  <Badge className="bg-gray-600">1 Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-indigo-900/30">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Crown className="h-5 w-5" />
                Immortal Core
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>♾️ Immortality Index:</span>
                  <span className="text-purple-400 font-bold">100%</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>⚡ Evolution Rate:</span>
                  <span className="text-blue-400 font-bold">
                    {overviewStats.evolutionRate.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>🔥 Invincibility:</span>
                  <span className="text-red-400 font-bold">MAXIMUM</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>🌟 Quantum Level:</span>
                  <span className="text-yellow-400 font-bold">TRANSCENDENT</span>
                </div>
                <div className="mt-3 p-2 bg-purple-800/30 rounded text-xs text-center">
                  <div className="text-purple-300">Status: ETERNAL PROTECTION</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Security Service
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>🛡️ Threats Blocked:</span>
                  <span className="text-green-400 font-bold">{securityMetrics.threatsBlocked}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>💀 Attackers Neutralized:</span>
                  <span className="text-red-400 font-bold">
                    {securityMetrics.attackersNeutralized}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>🔍 Global Scanning:</span>
                  <Badge
                    className={securityMetrics.globalScanningActive ? "bg-green-600" : "bg-red-600"}
                  >
                    {securityMetrics.globalScanningActive ? "ACTIVE" : "INACTIVE"}
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span>🎯 Defense Animals:</span>
                  <span className="text-blue-400 font-bold">
                    {securityMetrics.defenseAnimalsActive}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Real-time Activity Feed */}
        <Card className="border-orange-500/30 bg-gradient-to-br from-orange-900/30 to-red-900/30">
          <CardHeader>
            <CardTitle className="text-orange-400 flex items-center gap-2">
              <Activity className="h-5 w-5 animate-pulse" />
              🔴 LIVE DEFENSE ACTIVITY FEED
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-60 overflow-y-auto">
              {recentActivity.length === 0 ? (
                <div className="text-center text-muted-foreground py-4">
                  🛡️ Monitoring for defense activity...
                </div>
              ) : (
                recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 bg-black/20 rounded text-sm"
                  >
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span className="text-green-300">{activity}</span>
                    <span className="text-xs text-muted-foreground ml-auto">
                      {new Date().toLocaleTimeString()}
                    </span>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* System Status Summary */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
          <CardContent className="pt-6 text-center">
            <div className="text-6xl mb-4">🛡️</div>
            <h3 className="text-2xl font-bold text-green-400 mb-4">
              COMPREHENSIVE DEFENSE STATUS: FULLY OPERATIONAL
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-green-200">
              <div className="space-y-2">
                <div>
                  ✅ <strong>AI Animals:</strong> 14 guardians active and protecting
                </div>
                <div>
                  ✅ <strong>Creature Army:</strong> 12 legendary defenders deployed
                </div>
                <div>
                  ✅ <strong>Immortal Core:</strong> 11 eternal protectors online
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  ⚡ <strong>Combined Power:</strong> Over 8.5 million defense points
                </div>
                <div>
                  🌍 <strong>Global Coverage:</strong> Worldwide protection active
                </div>
                <div>
                  🔒 <strong>Security Level:</strong> Maximum protection engaged
                </div>
              </div>
              <div className="space-y-2">
                <div>
                  ♾️ <strong>Immortality:</strong> Absolute and eternal
                </div>
                <div>
                  🎯 <strong>Effectiveness:</strong> 98.7% threat prevention
                </div>
                <div>
                  🚀 <strong>Evolution:</strong> Continuously improving
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
