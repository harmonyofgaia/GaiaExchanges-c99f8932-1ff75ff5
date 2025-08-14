import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Zap,
  Shield,
  CloudLightning,
  AlertTriangle,
  Activity,
  Lock,
  Eye,
  Target,
  Cpu,
  Network,
} from "lucide-react";

interface ThreatAlert {
  id: string;
  type: "intrusion" | "ddos" | "malware" | "data_breach";
  severity: "low" | "medium" | "high" | "critical";
  source: string;
  timestamp: Date;
  blocked: boolean;
}

export function ThunderstormDefense() {
  const [defenseMode, setDefenseMode] = useState<"passive" | "active" | "thunderstorm">("passive");
  const [threats, setThreats] = useState<ThreatAlert[]>([]);
  const [systemStatus, setSystemStatus] = useState({
    firewallActive: true,
    intrusionDetection: true,
    ddosProtection: true,
    malwareScanning: true,
    dataEncryption: true,
    quantumShield: false,
  });

  const [metrics, setMetrics] = useState({
    threatsBlocked: 15847,
    intrustionAttempts: 2341,
    ddosAttacks: 89,
    malwareDetected: 456,
    dataBreachPrevented: 23,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new threats
      if (Math.random() < 0.3) {
        const newThreat: ThreatAlert = {
          id: Math.random().toString(36),
          type: ["intrusion", "ddos", "malware", "data_breach"][
            Math.floor(Math.random() * 4)
          ] as any,
          severity: ["low", "medium", "high", "critical"][Math.floor(Math.random() * 4)] as any,
          source: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          timestamp: new Date(),
          blocked: defenseMode !== "passive",
        };

        setThreats((prev) => [newThreat, ...prev.slice(0, 9)]);

        if (newThreat.blocked) {
          setMetrics((prev) => ({
            ...prev,
            threatsBlocked: prev.threatsBlocked + 1,
            intrustionAttempts:
              newThreat.type === "intrusion"
                ? prev.intrustionAttempts + 1
                : prev.intrustionAttempts,
            ddosAttacks: newThreat.type === "ddos" ? prev.ddosAttacks + 1 : prev.ddosAttacks,
            malwareDetected:
              newThreat.type === "malware" ? prev.malwareDetected + 1 : prev.malwareDetected,
            dataBreachPrevented:
              newThreat.type === "data_breach"
                ? prev.dataBreachPrevented + 1
                : prev.dataBreachPrevented,
          }));
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [defenseMode]);

  const activateThunderstormMode = () => {
    setDefenseMode("thunderstorm");
    setSystemStatus((prev) => ({ ...prev, quantumShield: true }));
    console.log("⚡ THUNDERSTORM DEFENSE ACTIVATED - MAXIMUM PROTECTION");
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "text-blue-400";
      case "medium":
        return "text-yellow-400";
      case "high":
        return "text-orange-400";
      case "critical":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "intrusion":
        return <Eye className="h-4 w-4" />;
      case "ddos":
        return <Network className="h-4 w-4" />;
      case "malware":
        return <Cpu className="h-4 w-4" />;
      case "data_breach":
        return <Lock className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <CloudLightning className="h-6 w-6" />⚡ Thunderstorm Defense Mechanism
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Defense Mode Control */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={() => setDefenseMode("passive")}
              variant={defenseMode === "passive" ? "default" : "outline"}
              className="h-16 bg-gray-600 hover:bg-gray-700"
            >
              <div className="text-center">
                <Shield className="h-6 w-6 mx-auto mb-1" />
                <div>Passive Mode</div>
              </div>
            </Button>

            <Button
              onClick={() => setDefenseMode("active")}
              variant={defenseMode === "active" ? "default" : "outline"}
              className="h-16 bg-orange-600 hover:bg-orange-700"
            >
              <div className="text-center">
                <Target className="h-6 w-6 mx-auto mb-1" />
                <div>Active Defense</div>
              </div>
            </Button>

            <Button
              onClick={activateThunderstormMode}
              variant={defenseMode === "thunderstorm" ? "default" : "outline"}
              className="h-16 bg-red-600 hover:bg-red-700 animate-pulse"
            >
              <div className="text-center">
                <Zap className="h-6 w-6 mx-auto mb-1" />
                <div>THUNDERSTORM</div>
              </div>
            </Button>
          </div>

          {/* System Status */}
          <Card className="bg-black/40 border-cyan-500/30">
            <CardContent className="pt-4">
              <h3 className="text-cyan-400 font-bold mb-4 flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Defense Systems Status
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {Object.entries(systemStatus).map(([key, active]) => (
                  <div
                    key={key}
                    className="flex items-center justify-between p-2 bg-muted/10 rounded"
                  >
                    <span className="text-sm capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                    <Badge className={active ? "bg-green-600" : "bg-red-600"}>
                      {active ? "ACTIVE" : "OFFLINE"}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Threat Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className="bg-green-900/20 border-green-500/30">
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-green-400">
                  {metrics.threatsBlocked.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Threats Blocked</div>
              </CardContent>
            </Card>

            <Card className="bg-blue-900/20 border-blue-500/30">
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {metrics.intrustionAttempts.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Intrusions Stopped</div>
              </CardContent>
            </Card>

            <Card className="bg-orange-900/20 border-orange-500/30">
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-orange-400">
                  {metrics.ddosAttacks.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">DDoS Deflected</div>
              </CardContent>
            </Card>

            <Card className="bg-purple-900/20 border-purple-500/30">
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {metrics.malwareDetected.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Malware Detected</div>
              </CardContent>
            </Card>

            <Card className="bg-red-900/20 border-red-500/30">
              <CardContent className="pt-4 text-center">
                <div className="text-2xl font-bold text-red-400">
                  {metrics.dataBreachPrevented.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Breaches Prevented</div>
              </CardContent>
            </Card>
          </div>

          {/* Live Threat Feed */}
          <Card className="bg-red-900/20 border-red-500/30">
            <CardContent className="pt-4">
              <h3 className="text-red-400 font-bold mb-4 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Live Threat Detection
              </h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {threats.length === 0 ? (
                  <div className="text-center text-muted-foreground py-4">
                    No active threats detected
                  </div>
                ) : (
                  threats.map((threat) => (
                    <div
                      key={threat.id}
                      className="flex items-center justify-between p-3 bg-black/40 rounded border border-border/20"
                    >
                      <div className="flex items-center gap-3">
                        {getTypeIcon(threat.type)}
                        <div>
                          <div className="font-semibold text-white capitalize">
                            {threat.type.replace("_", " ")}
                          </div>
                          <div className="text-xs text-muted-foreground">From: {threat.source}</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={getSeverityColor(threat.severity)}>
                          {threat.severity.toUpperCase()}
                        </Badge>
                        <Badge className={threat.blocked ? "bg-green-600" : "bg-red-600"}>
                          {threat.blocked ? "BLOCKED" : "ACTIVE"}
                        </Badge>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>

          {/* Thunderstorm Mode Info */}
          {defenseMode === "thunderstorm" && (
            <Card className="bg-yellow-900/20 border-yellow-500/30 animate-pulse">
              <CardContent className="pt-4">
                <div className="text-center">
                  <Zap className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">
                    ⚡ THUNDERSTORM MODE ACTIVE ⚡
                  </h3>
                  <p className="text-yellow-300">
                    Maximum security protocols engaged. All threats will be eliminated with extreme
                    prejudice.
                  </p>
                  <div className="mt-4 space-y-2 text-sm text-yellow-200">
                    <div>✅ Quantum Shield Activated</div>
                    <div>✅ AI-Powered Threat Prediction</div>
                    <div>✅ Real-time Counter-Attack Protocols</div>
                    <div>✅ Advanced Pattern Recognition</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
