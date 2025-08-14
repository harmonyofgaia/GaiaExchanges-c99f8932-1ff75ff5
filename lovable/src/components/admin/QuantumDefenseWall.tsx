import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Shield,
  Zap,
  Eye,
  Lock,
  Radar,
  Satellite,
  Brain,
  Cpu,
  Activity,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Skull,
  Target,
  Crosshair,
} from "lucide-react";
import { toast } from "sonner";

interface DefenseLayer {
  id: string;
  name: string;
  status: "active" | "standby" | "deployed" | "compromised";
  strength: number;
  threats_blocked: number;
  last_action: string;
  type: "perimeter" | "intrusion" | "behavioral" | "quantum" | "ai" | "physical";
}

interface ThreatIntel {
  id: string;
  threat_type: string;
  severity: "critical" | "high" | "medium" | "low";
  source_ip: string;
  location: string;
  status: "neutralized" | "monitoring" | "escalated";
  timestamp: Date;
}

export function QuantumDefenseWall() {
  const [defenseLayers, setDefenseLayers] = useState<DefenseLayer[]>([
    // Perimeter Defense
    {
      id: "firewall",
      name: "Quantum Firewall",
      status: "active",
      strength: 98.7,
      threats_blocked: 15847,
      last_action: "Blocked suspicious scan",
      type: "perimeter",
    },
    {
      id: "ddos",
      name: "Anti-DDoS Shield",
      status: "active",
      strength: 99.2,
      threats_blocked: 892,
      last_action: "Mitigated 50k req/sec attack",
      type: "perimeter",
    },
    {
      id: "honeypot",
      name: "Honeypot Network",
      status: "deployed",
      strength: 95.4,
      threats_blocked: 2847,
      last_action: "Trapped 12 attackers",
      type: "perimeter",
    },

    // Intrusion Detection
    {
      id: "ids",
      name: "Neural IDS/IPS",
      status: "active",
      strength: 97.8,
      threats_blocked: 9234,
      last_action: "Pattern analysis complete",
      type: "intrusion",
    },
    {
      id: "waf",
      name: "Web Application Firewall",
      status: "active",
      strength: 96.1,
      threats_blocked: 3421,
      last_action: "SQL injection blocked",
      type: "intrusion",
    },
    {
      id: "malware",
      name: "AI Malware Scanner",
      status: "active",
      strength: 99.5,
      threats_blocked: 567,
      last_action: "Zero-day detected & quarantined",
      type: "intrusion",
    },

    // Behavioral Analysis
    {
      id: "behavior",
      name: "User Behavior Analytics",
      status: "active",
      strength: 94.3,
      threats_blocked: 1823,
      last_action: "Anomalous pattern flagged",
      type: "behavioral",
    },
    {
      id: "biometric",
      name: "Biometric Verification",
      status: "active",
      strength: 99.8,
      threats_blocked: 234,
      last_action: "Fake identity rejected",
      type: "behavioral",
    },
    {
      id: "geofence",
      name: "Geolocation Fence",
      status: "active",
      strength: 87.6,
      threats_blocked: 445,
      last_action: "Blocked access from restricted zone",
      type: "behavioral",
    },

    // Quantum Defense
    {
      id: "quantum",
      name: "Quantum Encryption Layer",
      status: "active",
      strength: 100.0,
      threats_blocked: 0,
      last_action: "Quantum keys rotated",
      type: "quantum",
    },
    {
      id: "entanglement",
      name: "Quantum Entanglement Mesh",
      status: "active",
      strength: 99.9,
      threats_blocked: 12,
      last_action: "Entanglement verified",
      type: "quantum",
    },
    {
      id: "tunneling",
      name: "Quantum Tunneling Detector",
      status: "active",
      strength: 98.2,
      threats_blocked: 5,
      last_action: "Tunneling attempt blocked",
      type: "quantum",
    },

    // AI Defense
    {
      id: "dragon",
      name: "Dragon AI Guardian",
      status: "active",
      strength: 99.1,
      threats_blocked: 4567,
      last_action: "Threat prediction updated",
      type: "ai",
    },
    {
      id: "koala",
      name: "Koala AI Analyst",
      status: "active",
      strength: 97.4,
      threats_blocked: 2134,
      last_action: "Behavioral model refined",
      type: "ai",
    },
    {
      id: "phoenix",
      name: "Phoenix Self-Healing",
      status: "active",
      strength: 96.8,
      threats_blocked: 89,
      last_action: "System vulnerability patched",
      type: "ai",
    },

    // Physical Security
    {
      id: "satellite",
      name: "Satellite Surveillance",
      status: "active",
      strength: 92.1,
      threats_blocked: 23,
      last_action: "Facility perimeter secure",
      type: "physical",
    },
    {
      id: "datacenter",
      name: "Data Center Guards",
      status: "active",
      strength: 95.7,
      threats_blocked: 7,
      last_action: "Access attempt logged",
      type: "physical",
    },
    {
      id: "faraday",
      name: "Faraday Cage Network",
      status: "active",
      strength: 99.3,
      threats_blocked: 156,
      last_action: "EM interference blocked",
      type: "physical",
    },
  ]);

  const [threatIntel, setThreatIntel] = useState<ThreatIntel[]>([]);
  const [systemStatus, setSystemStatus] = useState({
    overall_health: 98.3,
    active_threats: 0,
    total_blocked: 0,
    quantum_integrity: 100.0,
    ai_confidence: 97.8,
  });

  // Real-time defense monitoring
  useEffect(() => {
    const monitorDefenses = () => {
      // Simulate real-time threat detection and blocking
      setDefenseLayers((prev) =>
        prev.map((layer) => {
          const threatActivity = Math.random();
          if (threatActivity > 0.95) {
            // High threat activity detected
            const threatsBlocked = Math.floor(Math.random() * 10) + 1;
            const newThreat: ThreatIntel = {
              id: crypto.randomUUID(),
              threat_type: [
                "Brute Force",
                "SQL Injection",
                "XSS Attack",
                "Data Exfiltration",
                "Privilege Escalation",
              ][Math.floor(Math.random() * 5)],
              severity: ["critical", "high", "medium", "low"][Math.floor(Math.random() * 4)] as any,
              source_ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
              location: ["Unknown", "China", "Russia", "North Korea", "Iran", "Anonymous Proxy"][
                Math.floor(Math.random() * 6)
              ],
              status: "neutralized",
              timestamp: new Date(),
            };

            setThreatIntel((prev) => [newThreat, ...prev.slice(0, 19)]);

            console.log(`🛡️ ${layer.name}: ${threatsBlocked} threats neutralized`);

            if (newThreat.severity === "critical") {
              toast.error(`🚨 CRITICAL THREAT BLOCKED`, {
                description: `${layer.name} neutralized ${newThreat.threat_type} from ${newThreat.location}`,
                duration: 5000,
              });
            }

            return {
              ...layer,
              threats_blocked: layer.threats_blocked + threatsBlocked,
              last_action: `Blocked ${newThreat.threat_type}`,
              strength: Math.min(100, layer.strength + Math.random() * 2),
            };
          }

          // Normal fluctuation
          return {
            ...layer,
            strength: Math.max(85, Math.min(100, layer.strength + (Math.random() - 0.5) * 1)),
          };
        })
      );

      // Update system status
      setSystemStatus((prev) => ({
        ...prev,
        total_blocked: prev.total_blocked + Math.floor(Math.random() * 5),
        overall_health: Math.max(
          95,
          Math.min(100, prev.overall_health + (Math.random() - 0.5) * 0.5)
        ),
        ai_confidence: Math.max(90, Math.min(100, prev.ai_confidence + (Math.random() - 0.5) * 1)),
      }));
    };

    const interval = setInterval(monitorDefenses, 3000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600";
      case "standby":
        return "bg-yellow-600";
      case "deployed":
        return "bg-blue-600";
      case "compromised":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "text-red-400";
      case "high":
        return "text-orange-400";
      case "medium":
        return "text-yellow-400";
      case "low":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "perimeter":
        return <Shield className="h-4 w-4" />;
      case "intrusion":
        return <Radar className="h-4 w-4" />;
      case "behavioral":
        return <Eye className="h-4 w-4" />;
      case "quantum":
        return <Zap className="h-4 w-4" />;
      case "ai":
        return <Brain className="h-4 w-4" />;
      case "physical":
        return <Satellite className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const activateEmergencyProtocol = () => {
    toast.success("⚡ EMERGENCY PROTOCOL ACTIVATED!", {
      description: "All defense layers elevated to maximum threat level",
      duration: 8000,
    });

    setDefenseLayers((prev) =>
      prev.map((layer) => ({
        ...layer,
        status: "active",
        strength: 100,
      }))
    );
  };

  return (
    <div className="space-y-6">
      {/* Main Defense Status */}
      <Card className="border-red-500/30 bg-gradient-to-br from-red-900/30 via-purple-900/30 to-black">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-red-400 via-purple-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
            <img
              src="/lovable-uploads/e2cc6708-58e6-4f52-b2ad-b98967ce3b7c.png"
              alt="Harmony of Gaia"
              className="w-8 h-8"
            />
            🛡️ QUANTUM DEFENSE WALL - 24/7 PROTECTION
            <Shield className="h-6 w-6 text-red-400 animate-pulse" />
          </CardTitle>
          <p className="text-red-400">
            18-Layer Defense Matrix • AI-Powered • Quantum-Secured • Military-Grade
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <Card className="bg-green-900/30 border-green-500/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">
                  {systemStatus.overall_health.toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground">System Health</div>
              </CardContent>
            </Card>
            <Card className="bg-blue-900/30 border-blue-500/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {systemStatus.total_blocked.toLocaleString()}
                </div>
                <div className="text-xs text-muted-foreground">Threats Blocked</div>
              </CardContent>
            </Card>
            <Card className="bg-purple-900/30 border-purple-500/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {systemStatus.quantum_integrity.toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground">Quantum Integrity</div>
              </CardContent>
            </Card>
            <Card className="bg-orange-900/30 border-orange-500/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-400">
                  {systemStatus.ai_confidence.toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground">AI Confidence</div>
              </CardContent>
            </Card>
            <Card className="bg-red-900/30 border-red-500/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-red-400">{systemStatus.active_threats}</div>
                <div className="text-xs text-muted-foreground">Active Threats</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mb-6">
            <Button
              onClick={activateEmergencyProtocol}
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 text-lg font-bold animate-pulse"
            >
              <AlertTriangle className="h-5 w-5 mr-2" />
              ACTIVATE EMERGENCY PROTOCOL
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Defense Layers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {defenseLayers.map((layer) => (
          <Card
            key={layer.id}
            className="border-gray-500/30 bg-gradient-to-br from-black/50 to-gray-900/50"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getTypeIcon(layer.type)}
                  <h4 className="font-semibold text-white text-sm">{layer.name}</h4>
                </div>
                <Badge className={`${getStatusColor(layer.status)} text-white text-xs`}>
                  {layer.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Strength</span>
                  <span className="text-green-400 font-bold">{layer.strength.toFixed(1)}%</span>
                </div>
                <Progress value={layer.strength} className="h-2" />
              </div>

              <div className="space-y-1 text-xs">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Threats Blocked</span>
                  <span className="text-blue-400 font-bold">
                    {layer.threats_blocked.toLocaleString()}
                  </span>
                </div>
                <div className="text-green-300 text-xs">Last: {layer.last_action}</div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Real-time Threat Intelligence */}
      <Card className="border-orange-500/30 bg-gradient-to-br from-orange-900/30 to-red-900/30">
        <CardHeader>
          <CardTitle className="text-orange-400 flex items-center gap-2">
            <Target className="h-5 w-5" />
            Real-Time Threat Intelligence Feed
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {threatIntel.length === 0 ? (
              <div className="text-center text-muted-foreground py-4">
                All systems secure - No active threats detected
              </div>
            ) : (
              threatIntel.map((threat) => (
                <div
                  key={threat.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-black/30 border border-gray-500/30"
                >
                  <div className="flex items-center gap-3">
                    <Crosshair className="h-4 w-4 text-red-400" />
                    <div>
                      <div className="font-semibold text-white text-sm">{threat.threat_type}</div>
                      <div className="text-xs text-muted-foreground">
                        {threat.source_ip} • {threat.location}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`text-sm font-bold ${getSeverityColor(threat.severity)}`}>
                      {threat.severity.toUpperCase()}
                    </div>
                    <div className="text-xs text-green-400">NEUTRALIZED</div>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
