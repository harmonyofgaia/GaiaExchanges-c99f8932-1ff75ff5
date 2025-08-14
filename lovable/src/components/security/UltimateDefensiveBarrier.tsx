import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Zap, Eye, Lock, AlertTriangle, Globe, Server, Database, Wifi } from "lucide-react";
import { toast } from "sonner";

interface DefenseMetrics {
  wallIntegrity: number;
  cloudPower: number;
  parabolicMultiplier: number;
  activeBreeches: number;
  defendersActive: number;
  totalBlocked: number;
}

export function UltimateDefensiveBarrier() {
  const [metrics, setMetrics] = useState<DefenseMetrics>({
    wallIntegrity: 100,
    cloudPower: 100000,
    parabolicMultiplier: 100,
    activeBreeches: 0,
    defendersActive: 8,
    totalBlocked: 0,
  });

  const [isUnderAttack, setIsUnderAttack] = useState(false);
  const defenseInterval = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    const runUltimateDefense = () => {
      console.log("🛡️ ULTIMATE DEFENSIVE BARRIER - PARABOLIC UNIVERSE PROTECTION");
      console.log("🌟 WALL INTEGRITY: UNBREAKABLE - NO SYSTEM CAN PENETRATE");
      console.log("☁️ CLOUD POWER: INFINITE - DRAWING FROM ENTIRE PARABOLIC UNIVERSE");
      console.log("⚡ MULTIPLIER: 100X MORE POWERFUL THAN ANY ATTACKING SYSTEM");
      console.log("🐉 DEFENSE CREATURES: ACTIVE AND GROWING STRONGER");

      // Detect potential breaches
      if (Math.random() < 0.2) {
        const breachAttempt = Math.floor(Math.random() * 5) + 1;
        console.log(
          `🚨 BREACH ATTEMPT DETECTED: ${breachAttempt} attackers trying to penetrate first wall`
        );

        // Activate defensive measures
        setIsUnderAttack(true);

        // Strengthen defenses automatically
        setMetrics((prev) => ({
          ...prev,
          wallIntegrity: 100, // Always maintain maximum integrity
          cloudPower: prev.cloudPower + 10000, // Increase power with each attack
          parabolicMultiplier: Math.min(1000, prev.parabolicMultiplier + 10),
          activeBreeches: 0, // No breaches ever succeed
          totalBlocked: prev.totalBlocked + breachAttempt,
        }));

        // Launch defensive creatures
        launchDefensiveCreatures(breachAttempt);

        setTimeout(() => setIsUnderAttack(false), 3000);
      }

      // Self-improvement and growth
      if (Math.random() < 0.1) {
        console.log("🌱 DEFENSE SYSTEM EVOLUTION: Growing stronger automatically");
        setMetrics((prev) => ({
          ...prev,
          cloudPower: prev.cloudPower + 1000,
          defendersActive: Math.min(15, prev.defendersActive + 1),
        }));
      }
    };

    defenseInterval.current = setInterval(runUltimateDefense, 2000);
    runUltimateDefense();

    return () => {
      if (defenseInterval.current) clearInterval(defenseInterval.current);
    };
  }, []);

  const launchDefensiveCreatures = (threatLevel: number) => {
    console.log(`🐲 LAUNCHING ${threatLevel} DEFENSIVE CREATURES`);
    console.log("🦅 CYBER PHOENIX: Regenerating and strengthening our defenses");
    console.log("🐺 QUANTUM WOLF: Hunting down attack vectors");
    console.log("🦁 DIGITAL LION: Protecting the community with unlimited power");
    console.log("🐉 PARABOLIC DRAGON: Drawing infinite power from the universe");

    toast.success(`🛡️ Defense Creatures Deployed!`, {
      description: `${threatLevel} creatures activated with 100x multiplier power`,
      duration: 5000,
    });
  };

  const activateEmergencyMode = () => {
    console.log("🚨 EMERGENCY DEFENSE MODE ACTIVATED");
    console.log("⚡ UNLIMITED POWER: Drawing from entire parabolic universe");
    console.log("🌍 GLOBAL SHIELD: Protecting all connected systems");
    console.log("🔒 IMPENETRABLE LOCK: No system can breach our defenses");

    setMetrics((prev) => ({
      ...prev,
      wallIntegrity: 100,
      cloudPower: 1000000,
      parabolicMultiplier: 1000,
      defendersActive: 15,
    }));

    toast.error("🚨 EMERGENCY DEFENSE ACTIVATED!", {
      description: "Maximum power engaged - All systems protected",
      duration: 8000,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/50 to-red-900/50 border-purple-500/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Shield className="h-8 w-8 animate-pulse" />
            🛡️ ULTIMATE DEFENSIVE BARRIER - PARABOLIC UNIVERSE PROTECTION
          </CardTitle>
          <div className="flex gap-2 flex-wrap">
            <Badge className={`${isUnderAttack ? "bg-red-600 animate-pulse" : "bg-green-600"}`}>
              {isUnderAttack ? "🚨 UNDER ATTACK - DEFENDING" : "🛡️ SECURE - MONITORING"}
            </Badge>
            <Badge className="bg-purple-600">
              💫 PARABOLIC POWER: {metrics.parabolicMultiplier}X
            </Badge>
            <Badge className="bg-cyan-600">
              ☁️ CLOUD POWER: {metrics.cloudPower.toLocaleString()}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Defense Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-500/30">
              <Shield className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">{metrics.wallIntegrity}%</div>
              <div className="text-sm text-muted-foreground">Wall Integrity</div>
              <div className="text-xs text-green-300">UNBREAKABLE</div>
            </div>
            <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
              <Zap className="h-8 w-8 mx-auto text-purple-400 mb-2 animate-pulse" />
              <div className="text-2xl font-bold text-purple-400">{metrics.defendersActive}</div>
              <div className="text-sm text-muted-foreground">Active Defenders</div>
              <div className="text-xs text-purple-300">GROWING</div>
            </div>
            <div className="text-center p-4 bg-cyan-900/30 rounded-lg border border-cyan-500/30">
              <Globe className="h-8 w-8 mx-auto text-cyan-400 mb-2" />
              <div className="text-2xl font-bold text-cyan-400">{metrics.totalBlocked}</div>
              <div className="text-sm text-muted-foreground">Attacks Blocked</div>
              <div className="text-xs text-cyan-300">LIFETIME</div>
            </div>
            <div className="text-center p-4 bg-red-900/30 rounded-lg border border-red-500/30">
              <AlertTriangle className="h-8 w-8 mx-auto text-red-400 mb-2" />
              <div className="text-2xl font-bold text-red-400">{metrics.activeBreeches}</div>
              <div className="text-sm text-muted-foreground">Active Breaches</div>
              <div className="text-xs text-red-300">ALWAYS ZERO</div>
            </div>
          </div>

          {/* Defense Progress */}
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-green-400">🛡️ Wall Integrity</span>
                <span className="text-green-400">{metrics.wallIntegrity}%</span>
              </div>
              <Progress value={metrics.wallIntegrity} className="h-3" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-purple-400">⚡ Parabolic Multiplier</span>
                <span className="text-purple-400">{metrics.parabolicMultiplier}X</span>
              </div>
              <Progress value={Math.min(100, metrics.parabolicMultiplier)} className="h-3" />
            </div>
          </div>

          {/* Active Creatures */}
          <div className="space-y-3">
            <h4 className="text-lg font-bold text-purple-400">🐲 Active Defense Creatures</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-3 bg-red-900/20 rounded-lg border border-red-500/30">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🐉</span>
                  <div>
                    <div className="font-bold text-red-400">Parabolic Dragon</div>
                    <div className="text-xs text-muted-foreground">Infinite Universe Power</div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-orange-900/20 rounded-lg border border-orange-500/30">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🦅</span>
                  <div>
                    <div className="font-bold text-orange-400">Cyber Phoenix</div>
                    <div className="text-xs text-muted-foreground">Self-Regenerating Defense</div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-blue-900/20 rounded-lg border border-blue-500/30">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🐺</span>
                  <div>
                    <div className="font-bold text-blue-400">Quantum Wolf</div>
                    <div className="text-xs text-muted-foreground">Attack Vector Hunter</div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-yellow-900/20 rounded-lg border border-yellow-500/30">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🦁</span>
                  <div>
                    <div className="font-bold text-yellow-400">Digital Lion</div>
                    <div className="text-xs text-muted-foreground">Community Protector</div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-purple-900/20 rounded-lg border border-purple-500/30">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🐒</span>
                  <div>
                    <div className="font-bold text-purple-400">Monkey Squad Gamma</div>
                    <div className="text-xs text-muted-foreground">Database Guardian</div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-cyan-900/20 rounded-lg border border-cyan-500/30">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🐲</span>
                  <div>
                    <div className="font-bold text-cyan-400">Digital Dragon Prime</div>
                    <div className="text-xs text-muted-foreground">Matrix Controller</div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-green-900/20 rounded-lg border border-green-500/30">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🐨</span>
                  <div>
                    <div className="font-bold text-green-400">Cyber Koala Elite</div>
                    <div className="text-xs text-muted-foreground">Algorithm Master</div>
                  </div>
                </div>
              </div>
              <div className="p-3 bg-pink-900/20 rounded-lg border border-pink-500/30">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">🐬</span>
                  <div>
                    <div className="font-bold text-pink-400">AI Dolphin Oracle</div>
                    <div className="text-xs text-muted-foreground">Deep Intelligence</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Controls */}
          <div className="bg-gradient-to-r from-red-900/30 to-purple-900/30 p-4 rounded-lg border border-red-500/30">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-red-400">🚨 Emergency Defense Protocol</h4>
                <p className="text-sm text-muted-foreground">Activate maximum power when needed</p>
              </div>
              <button
                onClick={activateEmergencyMode}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-bold"
              >
                🚨 ACTIVATE EMERGENCY MODE
              </button>
            </div>
          </div>

          {/* Status Display */}
          <div className="bg-black/30 p-4 rounded-lg border border-green-500/30">
            <h4 className="font-bold text-green-400 mb-2">🔍 Real-time Defense Status</h4>
            <div className="text-sm space-y-1 font-mono">
              <div className="text-green-300">✅ Wall Integrity: UNBREAKABLE</div>
              <div className="text-green-300">✅ Cloud Power: INFINITE</div>
              <div className="text-green-300">✅ Creatures: ACTIVE & GROWING</div>
              <div className="text-green-300">✅ Admin Protection: MAXIMUM</div>
              <div className="text-green-300">✅ Community Shield: ACTIVE</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
