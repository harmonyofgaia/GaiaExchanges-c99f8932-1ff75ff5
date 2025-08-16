import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Shield, Lock, Eye, AlertTriangle, CheckCircle, Zap, Globe, Users } from "lucide-react";

export function GameSecurityPanel() {
  const [securityLevel, setSecurityLevel] = useState(98);
  const [activePlayers, setActivePlayers] = useState(2847);
  const [securitySettings, setSecuritySettings] = useState({
    antiCheat: true,
    dataProtection: true,
    realTimeMonitoring: true,
    encryptedCommunication: true,
    ddosProtection: true,
    behaviorAnalysis: true,
  });

  const securityFeatures = [
    {
      name: "Anti-Cheat Engine",
      status: "Active",
      description: "Advanced detection of cheating attempts",
      icon: Shield,
      color: "text-green-400",
    },
    {
      name: "Data Encryption",
      status: "Active",
      description: "End-to-end encryption for all communications",
      icon: Lock,
      color: "text-blue-400",
    },
    {
      name: "DDoS Protection",
      status: "Active",
      description: "Protection against distributed attacks",
      icon: Zap,
      color: "text-yellow-400",
    },
    {
      name: "Behavior Analysis",
      status: "Active",
      description: "AI-powered suspicious activity detection",
      icon: Eye,
      color: "text-purple-400",
    },
  ];

  const recentSecurityEvents = [
    {
      timestamp: new Date(Date.now() - 300000),
      type: "blocked",
      description: "Suspicious login attempt blocked",
      severity: "medium",
    },
    {
      timestamp: new Date(Date.now() - 600000),
      type: "success",
      description: "Security scan completed successfully",
      severity: "low",
    },
    {
      timestamp: new Date(Date.now() - 900000),
      type: "blocked",
      description: "Potential exploit attempt prevented",
      severity: "high",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setSecurityLevel((prev) => Math.min(100, prev + (Math.random() - 0.5) * 2));
      setActivePlayers((prev) => prev + Math.floor((Math.random() - 0.5) * 20));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "text-red-400";
      case "medium":
        return "text-yellow-400";
      case "low":
        return "text-green-400";
      default:
        return "text-muted-foreground";
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Status Header */}
      <Card className="border-2 border-red-500/50 bg-gradient-to-br from-red-900/30 to-orange-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Shield className="h-6 w-6" />
            🛡️ Gaming Security Command Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-900/30 rounded border border-green-500/20">
              <div className="text-3xl font-bold text-green-400">{securityLevel.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Security Level</div>
              <Progress value={securityLevel} className="mt-2" />
            </div>
            <div className="text-center p-4 bg-blue-900/30 rounded border border-blue-500/20">
              <div className="text-3xl font-bold text-blue-400">
                {activePlayers.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Protected Players</div>
            </div>
            <div className="text-center p-4 bg-purple-900/30 rounded border border-purple-500/20">
              <div className="text-3xl font-bold text-purple-400">24/7</div>
              <div className="text-sm text-muted-foreground">Active Monitoring</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {securityFeatures.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Card key={index} className="border-green-500/30 bg-green-900/10">
              <CardContent className="pt-4">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <Icon className={`h-8 w-8 ${feature.color}`} />
                    <div>
                      <h4 className="font-bold">{feature.name}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-600 text-white">
                    <CheckCircle className="h-3 w-3 mr-1" />
                    {feature.status}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Security Settings */}
      <Card className="border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Lock className="h-5 w-5" />
            🔧 Security Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Anti-Cheat Protection</label>
                  <p className="text-xs text-muted-foreground">Real-time cheat detection</p>
                </div>
                <Switch
                  checked={securitySettings.antiCheat}
                  onCheckedChange={(checked) =>
                    setSecuritySettings((prev) => ({
                      ...prev,
                      antiCheat: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Data Protection</label>
                  <p className="text-xs text-muted-foreground">Enhanced data encryption</p>
                </div>
                <Switch
                  checked={securitySettings.dataProtection}
                  onCheckedChange={(checked) =>
                    setSecuritySettings((prev) => ({
                      ...prev,
                      dataProtection: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Real-Time Monitoring</label>
                  <p className="text-xs text-muted-foreground">24/7 security surveillance</p>
                </div>
                <Switch
                  checked={securitySettings.realTimeMonitoring}
                  onCheckedChange={(checked) =>
                    setSecuritySettings((prev) => ({
                      ...prev,
                      realTimeMonitoring: checked,
                    }))
                  }
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Encrypted Communication</label>
                  <p className="text-xs text-muted-foreground">Secure chat and voice</p>
                </div>
                <Switch
                  checked={securitySettings.encryptedCommunication}
                  onCheckedChange={(checked) =>
                    setSecuritySettings((prev) => ({
                      ...prev,
                      encryptedCommunication: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">DDoS Protection</label>
                  <p className="text-xs text-muted-foreground">Attack prevention system</p>
                </div>
                <Switch
                  checked={securitySettings.ddosProtection}
                  onCheckedChange={(checked) =>
                    setSecuritySettings((prev) => ({
                      ...prev,
                      ddosProtection: checked,
                    }))
                  }
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="text-sm font-medium">Behavior Analysis</label>
                  <p className="text-xs text-muted-foreground">AI-powered threat detection</p>
                </div>
                <Switch
                  checked={securitySettings.behaviorAnalysis}
                  onCheckedChange={(checked) =>
                    setSecuritySettings((prev) => ({
                      ...prev,
                      behaviorAnalysis: checked,
                    }))
                  }
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recent Security Events */}
      <Card className="border-yellow-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <AlertTriangle className="h-5 w-5" />
            📊 Recent Security Events
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentSecurityEvents.map((event, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border"
              >
                <div className="flex items-center gap-3">
                  {event.type === "blocked" ? (
                    <Shield className="h-5 w-5 text-red-400" />
                  ) : (
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  )}
                  <div>
                    <p className="text-sm font-medium">{event.description}</p>
                    <p className="text-xs text-muted-foreground">
                      {event.timestamp.toLocaleString()}
                    </p>
                  </div>
                </div>
                <Badge
                  className={`${getSeverityColor(event.severity)} border-current`}
                  variant="outline"
                >
                  {event.severity.toUpperCase()}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Emergency Actions */}
      <Card className="border-red-500/30 bg-red-900/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="h-5 w-5" />
            🚨 Emergency Security Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button variant="destructive" className="h-16">
              <Shield className="h-5 w-5 mr-2" />
              Lock Down System
            </Button>
            <Button variant="outline" className="h-16 border-yellow-500 text-yellow-400">
              <Eye className="h-5 w-5 mr-2" />
              Force Security Scan
            </Button>
            <Button variant="outline" className="h-16 border-blue-500 text-blue-400">
              <Users className="h-5 w-5 mr-2" />
              Review Active Sessions
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
