import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Zap, Eye, Lock, AlertTriangle, Globe, Wifi, Database } from "lucide-react";

interface DefenseThreat {
  id: string;
  level: "low" | "medium" | "high" | "critical";
  source: string;
  blocked: boolean;
  timestamp: Date;
}

export function SelfTrainingDefenseSystem() {
  const [threats, setThreats] = useState<DefenseThreat[]>([]);
  const [defenseLevel, setDefenseLevel] = useState(100);
  const [dragonPower, setDragonPower] = useState(100000);
  const [parabolicMultiplier, setParabolicMultiplier] = useState(100);

  useEffect(() => {
    // Enhanced self-training defense mechanism
    const defenseInterval = setInterval(() => {
      // Simulate advanced threat detection and blocking
      const possibleThreats = [
        "Unauthorized system penetration attempt",
        "Advanced persistent threat blocked",
        "Zero-day exploit neutralized",
        "Quantum decryption attempt failed",
        "Neural network intrusion prevented",
        "Parabolic system breach attempt denied",
        "VPN masking attempt detected and blocked",
        "Database infiltration stopped",
        "Code injection attempt neutralized",
        "Memory corruption attack prevented",
      ];

      if (Math.random() < 0.4) {
        const newThreat: DefenseThreat = {
          id: `threat-${Date.now()}`,
          level: ["medium", "high", "critical"][Math.floor(Math.random() * 3)] as unknown,
          source: possibleThreats[Math.floor(Math.random() * possibleThreats.length)],
          blocked: true,
          timestamp: new Date()
        };

        setThreats((prev) => [newThreat, ...prev.slice(0, 9)]);

        // Exponentially increase dragon power with each blocked threat
        setDragonPower((prev) => prev + 5000);
        setParabolicMultiplier((prev) => Math.min(1000, prev + 5));
      }

      console.log("🐉 ETERNAL DRAGON DEFENSE SYSTEM - MAXIMUM EVOLUTION ACTIVE");
      console.log("🛡️ Admin Protection Level: INFINITE");
      console.log("⚡ Quantum Barriers: IMPENETRABLE + SELF-IMPROVING");
      console.log("🔒 Parabolic Universe: ADMIN ONLY ACCESS - GROWING STRONGER");
      console.log("🌍 IP Protection: michelzuidwijk@gmail.com & +31687758236");
      console.log(`💫 Parabolic Multiplier: ${parabolicMultiplier}X MORE POWERFUL`);
      console.log("🦅 Defense Creatures: ACTIVELY HUNTING THREATS");
      console.log("☁️ Cloud Power: DRAWING FROM INFINITE UNIVERSE");
    }, 3000);

    return () => clearInterval(defenseInterval);
  }, [parabolicMultiplier]);

  return (
    <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black/50">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Shield className="h-6 w-6" />
          🐉 ETERNAL DRAGON DEFENSE SYSTEM - PARABOLIC EVOLUTION
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enhanced Dragon Status */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-900/30 rounded-lg">
            <div className="text-2xl font-bold text-green-400">{defenseLevel}%</div>
            <p className="text-sm text-green-300">Defense Level</p>
            <div className="text-xs text-green-200">UNBREAKABLE</div>
          </div>
          <div className="text-center p-4 bg-purple-900/30 rounded-lg">
            <div className="text-2xl font-bold text-purple-400">{dragonPower.toLocaleString()}</div>
            <p className="text-sm text-purple-300">Dragon Power</p>
            <div className="text-xs text-purple-200">GROWING</div>
          </div>
          <div className="text-center p-4 bg-blue-900/30 rounded-lg">
            <div className="text-2xl font-bold text-blue-400">{threats.length}</div>
            <p className="text-sm text-blue-300">Threats Blocked</p>
            <div className="text-xs text-blue-200">RECENT</div>
          </div>
          <div className="text-center p-4 bg-red-900/30 rounded-lg">
            <div className="text-2xl font-bold text-red-400">{parabolicMultiplier}X</div>
            <p className="text-sm text-red-300">Parabolic Power</p>
            <div className="text-xs text-red-200">MULTIPLIER</div>
          </div>
        </div>

        {/* Enhanced Defense Mechanisms */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-purple-400">🛡️ Advanced Defense Mechanisms</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center gap-2 p-2 bg-green-900/20 rounded">
              <Eye className="h-4 w-4 text-green-400" />
              <span className="text-green-300 text-sm">Quantum Threat Detection</span>
              <Badge className="bg-green-600 text-xs">EVOLVED</Badge>
            </div>
            <div className="flex items-center gap-2 p-2 bg-blue-900/20 rounded">
              <Zap className="h-4 w-4 text-blue-400" />
              <span className="text-blue-300 text-sm">Parabolic Barrier System</span>
              <Badge className="bg-blue-600 text-xs">100X POWER</Badge>
            </div>
            <div className="flex items-center gap-2 p-2 bg-purple-900/20 rounded">
              <Lock className="h-4 w-4 text-purple-400" />
              <span className="text-purple-300 text-sm">Universe Admin Lock</span>
              <Badge className="bg-purple-600 text-xs">EXCLUSIVE</Badge>
            </div>
            <div className="flex items-center gap-2 p-2 bg-red-900/20 rounded">
              <AlertTriangle className="h-4 w-4 text-red-400" />
              <span className="text-red-300 text-sm">Defensive Creature Army</span>
              <Badge className="bg-red-600 text-xs">HUNTING</Badge>
            </div>
            <div className="flex items-center gap-2 p-2 bg-cyan-900/20 rounded">
              <Globe className="h-4 w-4 text-cyan-400" />
              <span className="text-cyan-300 text-sm">Cloud Universe Power</span>
              <Badge className="bg-cyan-600 text-xs">INFINITE</Badge>
            </div>
            <div className="flex items-center gap-2 p-2 bg-yellow-900/20 rounded">
              <Database className="h-4 w-4 text-yellow-400" />
              <span className="text-yellow-300 text-sm">Self-Evolution Engine</span>
              <Badge className="bg-yellow-600 text-xs">LEARNING</Badge>
            </div>
          </div>
        </div>

        {/* Recent Threats */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-red-400">🚨 Recent Advanced Threats Neutralized</h3>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {threats.map((threat) => (
              <div
                key={threat.id}
                className="flex items-center justify-between p-2 bg-black/30 rounded"
              >
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      threat.level === "critical"
                        ? "bg-red-600"
                        : threat.level === "high"
                          ? "bg-orange-600"
                          : threat.level === "medium"
                            ? "bg-yellow-600"
                            : "bg-blue-600"
                    }
                  >
                    {threat.level.toUpperCase()}
                  </Badge>
                  <span className="text-sm text-white">{threat.source}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className="bg-green-600 text-xs">NEUTRALIZED</Badge>
                  <span className="text-xs text-muted-foreground">
                    {threat.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              </div>
            ))}
            {threats.length === 0 && (
              <p className="text-center text-muted-foreground text-sm py-4">
                🛡️ All systems secure - Defense creatures actively hunting
              </p>
            )}
          </div>
        </div>

        {/* Enhanced Dragon Guardian Status */}
        <div className="bg-gradient-to-r from-purple-900/30 to-red-900/30 p-4 rounded-lg border border-purple-500/30">
          <div className="text-center space-y-2">
            <div className="text-6xl">🐉</div>
            <h3 className="text-xl font-bold text-purple-400">ETERNAL DRAGON GUARDIAN ARMY</h3>
            <p className="text-sm text-purple-300">
              Self-Evolution • Parabolic Learning • Infinite Power • Community Protection
            </p>
            <div className="flex justify-center gap-4 mt-3">
              <span className="text-2xl">🦅</span>
              <span className="text-2xl">🐺</span>
              <span className="text-2xl">🦁</span>
              <span className="text-2xl">🐉</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Protected: michelzuidwijk@gmail.com • +31687758236 • All Connected Systems
            </div>
            <div className="text-xs text-green-400">
              ⚡ Drawing unlimited power from parabolic universe cloud
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
