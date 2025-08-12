import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import {
  Shield,
  Server,
  AlertTriangle,
  CheckCircle,
  Zap,
  Lock,
  Globe,
  Activity,
} from "lucide-react";

interface SecurityLayer {
  id: string;
  name: string;
  status: "secure" | "compromised";
  strength: number;
  lastCheck: Date;
}

interface ServerNode {
  id: string;
  location: string;
  status: "online" | "offline" | "maintenance";
  load: number;
  uptime: number;
  connections: number;
}

export function ServerResilienceEngine() {
  const [securityLayers, setSecurityLayers] = useState<SecurityLayer[]>([
    {
      id: "1",
      name: "Firewall Protection",
      status: "secure",
      strength: 98,
      lastCheck: new Date(),
    },
    {
      id: "2",
      name: "DDoS Mitigation",
      status: "secure",
      strength: 95,
      lastCheck: new Date(),
    },
    {
      id: "3",
      name: "Intrusion Detection",
      status: "secure",
      strength: 92,
      lastCheck: new Date(),
    },
    {
      id: "4",
      name: "SSL/TLS Encryption",
      status: "secure",
      strength: 99,
      lastCheck: new Date(),
    },
  ]);

  const [serverNodes, setServerNodes] = useState<ServerNode[]>([
    {
      id: "us-east-1",
      location: "Virginia, USA",
      status: "online",
      load: 45,
      uptime: 99.9,
      connections: 12847,
    },
    {
      id: "eu-west-1",
      location: "Ireland, EU",
      status: "online",
      load: 32,
      uptime: 99.8,
      connections: 8392,
    },
    {
      id: "ap-southeast-1",
      location: "Singapore, APAC",
      status: "online",
      load: 28,
      uptime: 99.9,
      connections: 6758,
    },
  ]);

  const [overallSecurity, setOverallSecurity] = useState(96);
  const [threatLevel, setThreatLevel] = useState<"low" | "medium" | "high">(
    "low",
  );

  useEffect(() => {
    const securityMonitoring = setInterval(() => {
      // Simulate security monitoring
      setSecurityLayers((prev) =>
        prev.map((layer) => ({
          ...layer,
          strength: Math.max(
            85,
            Math.min(100, layer.strength + (Math.random() - 0.5) * 2),
          ),
          lastCheck: new Date(),
        })),
      );

      // Update overall security
      const avgStrength =
        securityLayers.reduce((sum, layer) => sum + layer.strength, 0) /
        securityLayers.length;
      setOverallSecurity(Math.round(avgStrength));

      // Determine threat level
      if (avgStrength > 95) setThreatLevel("low");
      else if (avgStrength > 90) setThreatLevel("medium");
      else setThreatLevel("high");
    }, 5000);

    const serverMonitoring = setInterval(() => {
      // Simulate server load changes
      setServerNodes((prev) =>
        prev.map((node) => ({
          ...node,
          load: Math.max(
            10,
            Math.min(90, node.load + (Math.random() - 0.5) * 10),
          ),
          connections:
            node.connections + Math.floor((Math.random() - 0.5) * 100),
        })),
      );
    }, 3000);

    return () => {
      clearInterval(securityMonitoring);
      clearInterval(serverMonitoring);
    };
  }, [securityLayers]);

  const runSecurityScan = () => {
    toast.success("🔒 Full Security Scan Initiated", {
      description: "Comprehensive security audit in progress...",
      duration: 3000,
    });

    setSecurityLayers((prev) =>
      prev.map((layer) => ({
        ...layer,
        status: "secure",
        strength: Math.min(100, layer.strength + 5),
        lastCheck: new Date(),
      })),
    );
  };

  const getThreatColor = () => {
    switch (threatLevel) {
      case "low":
        return "text-green-400";
      case "medium":
        return "text-yellow-400";
      case "high":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Overall Security Status */}
      <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Shield className="h-6 w-6" />
            Server Resilience & Security Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-3xl font-bold text-green-400">
                {overallSecurity}%
              </div>
              <div className="text-sm text-muted-foreground">
                Overall Security
              </div>
              <Progress value={overallSecurity} className="mt-2" />
            </div>
            <div>
              <div className={`text-3xl font-bold ${getThreatColor()}`}>
                {threatLevel.toUpperCase()}
              </div>
              <div className="text-sm text-muted-foreground">Threat Level</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400">
                {serverNodes.filter((node) => node.status === "online").length}/
                {serverNodes.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Servers Online
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Layers */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Lock className="h-5 w-5" />
            Security Layer Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {securityLayers.map((layer) => (
              <div
                key={layer.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30"
              >
                <div className="flex items-center gap-3">
                  <div className="text-green-400">
                    {layer.status === "secure" ? (
                      <CheckCircle className="h-5 w-5" />
                    ) : (
                      <AlertTriangle className="h-5 w-5 text-red-400" />
                    )}
                  </div>
                  <div>
                    <div className="font-medium">{layer.name}</div>
                    <div className="text-sm text-muted-foreground">
                      Last check: {layer.lastCheck.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-sm font-medium text-green-400">
                      {layer.strength}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Strength
                    </div>
                  </div>
                  <Badge
                    className={
                      layer.status === "secure" ? "bg-green-600" : "bg-red-600"
                    }
                  >
                    {layer.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Server Nodes */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Server className="h-5 w-5" />
            Global Server Network
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {serverNodes.map((node) => (
              <div
                key={node.id}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30"
              >
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-blue-400" />
                  <div>
                    <div className="font-medium">{node.location}</div>
                    <div className="text-sm text-muted-foreground">
                      {node.connections.toLocaleString()} active connections
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right text-sm">
                    <div>Load: {node.load}%</div>
                    <div className="text-muted-foreground">
                      Uptime: {node.uptime}%
                    </div>
                  </div>
                  <Badge
                    className={
                      node.status === "online"
                        ? "bg-green-600"
                        : node.status === "offline"
                          ? "bg-red-600"
                          : "bg-yellow-600"
                    }
                  >
                    {node.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button
          onClick={runSecurityScan}
          className="bg-green-600 hover:bg-green-700"
        >
          <Shield className="h-4 w-4 mr-2" />
          Run Security Scan
        </Button>
        <Button variant="outline" className="border-blue-500/20">
          <Activity className="h-4 w-4 mr-2" />
          View Detailed Logs
        </Button>
        <Button variant="outline" className="border-purple-500/20">
          <Zap className="h-4 w-4 mr-2" />
          Emergency Protocols
        </Button>
      </div>
    </div>
  );
}
