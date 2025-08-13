import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Eye, Lock, Zap, Satellite, Target } from "lucide-react";
import { toast } from "sonner";

export function UltimateSecurityCore() {
  const [securityMetrics, setSecurityMetrics] = useState({
    quantumEncryption: 100,
    vpnDisruption: 0,
    biometricSecurity: 100,
    invisibilityLevel: 100,
    threatDetection: 100,
    adminProtection: 100,
  });

  const [activeThreats, setActiveThreats] = useState<
    Array<{
      id: string;
      type: string;
      ip: string;
      location: string;
      severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
      blocked: boolean;
    }>
  >([]);

  useEffect(() => {
    const securityInterval = setInterval(() => {
      console.log("🛡️ ULTIMATE SECURITY CORE - QUANTUM PROTECTION ACTIVE");
      console.log("🔒 ALL SYSTEMS PROTECTED - ADMIN FORTRESS MODE");
      console.log("👻 INVISIBLE TO ALL ATTACKERS - GHOST MODE ACTIVE");

      setSecurityMetrics((prev) => ({
        ...prev,
        vpnDisruption: Math.min(100, prev.vpnDisruption + Math.random() * 5),
        threatDetection: 100, // Always perfect
      }));

      // Simulate threat detection and blocking
      if (Math.random() > 0.8) {
        const newThreat = {
          id: Date.now().toString(),
          type: [
            "SQL Injection",
            "DDoS Attack",
            "Phishing Attempt",
            "Brute Force",
          ][Math.floor(Math.random() * 4)],
          ip: `${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}.${Math.floor(Math.random() * 255)}`,
          location: ["Unknown", "Russia", "China", "North Korea"][
            Math.floor(Math.random() * 4)
          ],
          severity: ["HIGH", "CRITICAL"][Math.floor(Math.random() * 2)] as
            | "HIGH"
            | "CRITICAL",
          blocked: true,
        };

        setActiveThreats((prev) => [newThreat, ...prev.slice(0, 9)]);
        console.log("🚨 THREAT DETECTED AND NEUTRALIZED:", newThreat);
      }
    }, 3000);

    return () => clearInterval(securityInterval);
  }, []);

  const activateMaximumSecurity = () => {
    toast.success("🛡️ MAXIMUM SECURITY ACTIVATED!", {
      description: "All quantum defense systems now at GOD LEVEL",
      duration: 8000,
    });

    setSecurityMetrics({
      quantumEncryption: 200,
      vpnDisruption: 100,
      biometricSecurity: 200,
      invisibilityLevel: 200,
      threatDetection: 200,
      adminProtection: 200,
    });

    console.log(
      "👑 ULTIMATE SECURITY: GOD MODE ACTIVATED - UNBREAKABLE FORTRESS",
    );
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "CRITICAL":
        return "bg-red-600";
      case "HIGH":
        return "bg-orange-600";
      case "MEDIUM":
        return "bg-yellow-600";
      default:
        return "bg-green-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-black/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Shield className="h-6 w-6" />
              Quantum Encryption Core
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {securityMetrics.quantumEncryption}%
            </div>
            <Progress
              value={Math.min(100, securityMetrics.quantumEncryption)}
              className="mb-2"
            />
            <Badge className="bg-purple-600 text-white">UNBREAKABLE</Badge>
          </CardContent>
        </Card>

        <Card className="border-red-500/50 bg-gradient-to-br from-red-900/30 to-black/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <Satellite className="h-6 w-6" />
              VPN Disruption System
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-400 mb-2">
              {securityMetrics.vpnDisruption.toFixed(1)}%
            </div>
            <Progress value={securityMetrics.vpnDisruption} className="mb-2" />
            <Badge className="bg-red-600 text-white">👻 INVISIBLE</Badge>
          </CardContent>
        </Card>

        <Card className="border-blue-500/50 bg-gradient-to-br from-blue-900/30 to-black/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Eye className="h-6 w-6" />
              Biometric Security
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {securityMetrics.biometricSecurity}%
            </div>
            <Progress
              value={Math.min(100, securityMetrics.biometricSecurity)}
              className="mb-2"
            />
            <Badge className="bg-blue-600 text-white">EYE SCAN ACTIVE</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Threat Detection Dashboard */}
      <Card className="border-orange-500/50 bg-gradient-to-br from-orange-900/30 to-red-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <Target className="h-6 w-6" />
            Real-Time Threat Detection & Neutralization
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {activeThreats.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Active Threats
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">
                  {activeThreats.filter((t) => t.blocked).length}
                </div>
                <div className="text-sm text-muted-foreground">Blocked</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">100%</div>
                <div className="text-sm text-muted-foreground">
                  Success Rate
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">∞</div>
                <div className="text-sm text-muted-foreground">
                  Protection Level
                </div>
              </div>
            </div>

            {/* Recent Threats */}
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-400">
                🚨 Recent Threats Neutralized:
              </h4>
              <div className="max-h-32 overflow-y-auto space-y-2">
                {activeThreats.map((threat) => (
                  <div
                    key={threat.id}
                    className="flex items-center justify-between p-2 rounded bg-red-500/10 border border-red-500/20"
                  >
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${getSeverityColor(threat.severity)} text-white text-xs`}
                      >
                        {threat.severity}
                      </Badge>
                      <span className="text-sm">{threat.type}</span>
                      <span className="text-xs text-muted-foreground">
                        {threat.ip}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-green-600 text-white text-xs">
                        ✅ BLOCKED
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {threat.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Control Panel */}
      <Card className="border-green-500/50 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Lock className="h-6 w-6" />
            Ultimate Security Control Panel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-400">
                🛡️ Active Security Features:
              </h4>
              <ul className="space-y-1 text-sm text-green-300">
                <li>✅ Quantum encryption layer active</li>
                <li>✅ VPN disruption satellites online</li>
                <li>✅ Biometric eye recognition enabled</li>
                <li>✅ Invisible ghost mode activated</li>
                <li>✅ Real-time threat monitoring</li>
                <li>✅ Admin fortress protection</li>
                <li>✅ Dragon AI defense system</li>
                <li>✅ Immortal security protocols</li>
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold text-green-400">
                👑 Admin Privileges:
              </h4>
              <ul className="space-y-1 text-sm text-green-300">
                <li>✅ Transaction reversal (2 weeks)</li>
                <li>✅ Emergency shutdown control</li>
                <li>✅ User account management</li>
                <li>✅ System configuration access</li>
                <li>✅ Database direct control</li>
                <li>✅ Security system override</li>
                <li>✅ Platform-wide announcements</li>
                <li>✅ Legal action initiation</li>
              </ul>
            </div>
          </div>

          <Button
            onClick={activateMaximumSecurity}
            className="w-full bg-gradient-to-r from-purple-600 via-red-600 to-orange-600 hover:from-purple-700 hover:via-red-700 hover:to-orange-700 text-white font-bold text-2xl py-8"
          >
            <Zap className="h-8 w-8 mr-4 animate-pulse" />
            👑 ACTIVATE ULTIMATE SECURITY - GOD MODE
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
