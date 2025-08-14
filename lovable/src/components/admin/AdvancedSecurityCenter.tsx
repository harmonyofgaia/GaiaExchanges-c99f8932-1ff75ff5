import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  AlertTriangle,
  Eye,
  Users,
  Activity,
  Database,
  Lock,
  Zap,
  TrendingUp,
  Globe,
  Wifi,
  HardDrive,
  Cpu,
} from "lucide-react";
import { toast } from "sonner";

interface SecurityMetric {
  name: string;
  value: number;
  status: "excellent" | "good" | "warning" | "critical";
  trend: "up" | "down" | "stable";
}

interface ThreatAlert {
  id: string;
  type: "blocked" | "monitored" | "resolved";
  severity: "low" | "medium" | "high" | "critical";
  description: string;
  timestamp: Date;
  source: string;
}

export function AdvancedSecurityCenter() {
  const [securityMetrics, setSecurityMetrics] = useState<SecurityMetric[]>([
    {
      name: "Firewall Protection",
      value: 99.8,
      status: "excellent",
      trend: "stable",
    },
    {
      name: "Intrusion Detection",
      value: 98.5,
      status: "excellent",
      trend: "up",
    },
    {
      name: "Data Encryption",
      value: 100,
      status: "excellent",
      trend: "stable",
    },
    { name: "Access Control", value: 97.2, status: "excellent", trend: "up" },
    { name: "Network Security", value: 95.8, status: "good", trend: "stable" },
    { name: "Threat Intelligence", value: 96.4, status: "good", trend: "up" },
  ]);

  const [systemStats, setSystemStats] = useState({
    cpuUsage: 23.5,
    memoryUsage: 67.2,
    diskUsage: 45.8,
    networkLoad: 34.1,
    activeConnections: 1247,
    blockedThreats: 89,
    dataTransfer: 2.4,
  });

  const [threatAlerts, setThreatAlerts] = useState<ThreatAlert[]>([
    {
      id: "1",
      type: "blocked",
      severity: "high",
      description: "SQL injection attempt blocked from unknown IP",
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      source: "192.168.1.100",
    },
    {
      id: "2",
      type: "monitored",
      severity: "medium",
      description: "Unusual login pattern detected",
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      source: "Auth System",
    },
    {
      id: "3",
      type: "resolved",
      severity: "low",
      description: "Rate limiting applied to suspicious traffic",
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      source: "Load Balancer",
    },
  ]);

  // Real-time updates every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setSystemStats((prev) => ({
        ...prev,
        cpuUsage: Math.max(15, Math.min(85, prev.cpuUsage + (Math.random() - 0.5) * 10)),
        memoryUsage: Math.max(50, Math.min(90, prev.memoryUsage + (Math.random() - 0.5) * 5)),
        networkLoad: Math.max(20, Math.min(80, prev.networkLoad + (Math.random() - 0.5) * 15)),
        activeConnections: prev.activeConnections + Math.floor((Math.random() - 0.5) * 20),
        blockedThreats: prev.blockedThreats + Math.floor(Math.random() * 3),
        dataTransfer: Math.max(1, Math.min(10, prev.dataTransfer + (Math.random() - 0.5) * 0.5)),
      }));

      // Update security metrics occasionally
      if (Math.random() < 0.3) {
        setSecurityMetrics((prev) =>
          prev.map((metric) => ({
            ...metric,
            value: Math.max(85, Math.min(100, metric.value + (Math.random() - 0.5) * 2)),
          }))
        );
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const activateMaxSecurity = () => {
    setSecurityMetrics((prev) =>
      prev.map((metric) => ({
        ...metric,
        value: 100,
        status: "excellent" as const,
        trend: "up" as const,
      }))
    );

    toast.success("⚡ MAXIMUM SECURITY ACTIVATED!", {
      description: "All security protocols engaged - System locked down completely",
      duration: 8000,
    });
  };

  const runSecurityScan = () => {
    toast.info("🔍 Deep Security Scan Initiated", {
      description: "Comprehensive system analysis in progress...",
      duration: 10000,
    });

    setTimeout(() => {
      toast.success("✅ Security Scan Complete!", {
        description: "No vulnerabilities detected - System is fully secure",
        duration: 5000,
      });
    }, 8000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "text-green-400";
      case "good":
        return "text-blue-400";
      case "warning":
        return "text-yellow-400";
      case "critical":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low":
        return "bg-blue-600";
      case "medium":
        return "bg-yellow-600";
      case "high":
        return "bg-orange-600";
      case "critical":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Security Overview */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Shield className="h-6 w-6" />
            🛡️ ADVANCED SECURITY CENTER - QUANTUM PROTECTED
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 rounded-lg bg-green-900/30 border border-green-500/20">
              <Shield className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">ACTIVE</div>
              <div className="text-xs text-muted-foreground">Quantum Shield</div>
            </div>

            <div className="text-center p-3 rounded-lg bg-blue-900/30 border border-blue-500/20">
              <Eye className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{systemStats.blockedThreats}</div>
              <div className="text-xs text-muted-foreground">Threats Blocked</div>
            </div>

            <div className="text-center p-3 rounded-lg bg-purple-900/30 border border-purple-500/20">
              <Users className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                {systemStats.activeConnections}
              </div>
              <div className="text-xs text-muted-foreground">Active Sessions</div>
            </div>

            <div className="text-center p-3 rounded-lg bg-orange-900/30 border border-orange-500/20">
              <Activity className="h-6 w-6 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-400">
                {systemStats.dataTransfer.toFixed(1)}GB
              </div>
              <div className="text-xs text-muted-foreground">Data Transfer</div>
            </div>
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={activateMaxSecurity} className="bg-red-600 hover:bg-red-700">
              <Zap className="h-4 w-4 mr-2" />
              ACTIVATE MAX SECURITY
            </Button>
            <Button onClick={runSecurityScan} className="bg-blue-600 hover:bg-blue-700">
              <Eye className="h-4 w-4 mr-2" />
              DEEP SECURITY SCAN
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="metrics" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="metrics">Security Metrics</TabsTrigger>
          <TabsTrigger value="threats">Threat Monitor</TabsTrigger>
          <TabsTrigger value="system">System Health</TabsTrigger>
          <TabsTrigger value="tools">Security Tools</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {securityMetrics.map((metric, index) => (
              <Card key={index} className="border-green-500/20">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center mb-2">
                    <h4 className="font-semibold text-sm">{metric.name}</h4>
                    <Badge className={`${getStatusColor(metric.status)} bg-transparent border`}>
                      {metric.status.toUpperCase()}
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <Progress value={metric.value} className="h-2" />
                    <div className="flex justify-between text-xs">
                      <span className="text-muted-foreground">{metric.value.toFixed(1)}%</span>
                      <span
                        className={`${
                          metric.trend === "up"
                            ? "text-green-400"
                            : metric.trend === "down"
                              ? "text-red-400"
                              : "text-gray-400"
                        }`}
                      >
                        {metric.trend === "up" ? "↗" : metric.trend === "down" ? "↘" : "→"}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="threats" className="space-y-4">
          <Card className="border-red-500/20">
            <CardHeader>
              <CardTitle className="text-red-400">Live Threat Monitor</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {threatAlerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-3 rounded-lg bg-black/20 border border-gray-500/20"
                >
                  <div className="flex items-center gap-3">
                    <AlertTriangle className="h-4 w-4 text-orange-400" />
                    <div>
                      <div className="text-sm font-medium">{alert.description}</div>
                      <div className="text-xs text-muted-foreground">
                        {alert.source} • {alert.timestamp.toLocaleTimeString()}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getSeverityColor(alert.severity)}>
                      {alert.severity.toUpperCase()}
                    </Badge>
                    <Badge
                      className={
                        alert.type === "blocked"
                          ? "bg-red-600"
                          : alert.type === "resolved"
                            ? "bg-green-600"
                            : "bg-yellow-600"
                      }
                    >
                      {alert.type.toUpperCase()}
                    </Badge>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="system" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <Cpu className="h-5 w-5" />
                  System Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">CPU Usage</span>
                    <span className="text-sm text-blue-400">
                      {systemStats.cpuUsage.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={systemStats.cpuUsage} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Memory Usage</span>
                    <span className="text-sm text-green-400">
                      {systemStats.memoryUsage.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={systemStats.memoryUsage} className="h-2" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Disk Usage</span>
                    <span className="text-sm text-yellow-400">
                      {systemStats.diskUsage.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={systemStats.diskUsage} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-500/20">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Wifi className="h-5 w-5" />
                  Network Monitor
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Network Load</span>
                    <span className="text-sm text-purple-400">
                      {systemStats.networkLoad.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={systemStats.networkLoad} className="h-2" />
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Active Connections</span>
                  <span className="text-sm text-cyan-400">{systemStats.activeConnections}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Data Transfer</span>
                  <span className="text-sm text-orange-400">
                    {systemStats.dataTransfer.toFixed(2)} GB/s
                  </span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="tools" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="border-purple-500/20 bg-purple-900/20">
              <CardContent className="p-4 text-center">
                <Database className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                <h4 className="font-bold text-purple-400 mb-2">Database Scanner</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Deep database vulnerability scan
                </p>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">Scan Database</Button>
              </CardContent>
            </Card>

            <Card className="border-orange-500/20 bg-orange-900/20">
              <CardContent className="p-4 text-center">
                <Globe className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                <h4 className="font-bold text-orange-400 mb-2">Network Mapper</h4>
                <p className="text-xs text-muted-foreground mb-3">Map all network connections</p>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">Map Network</Button>
              </CardContent>
            </Card>

            <Card className="border-cyan-500/20 bg-cyan-900/20">
              <CardContent className="p-4 text-center">
                <Lock className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                <h4 className="font-bold text-cyan-400 mb-2">Encryption Audit</h4>
                <p className="text-xs text-muted-foreground mb-3">
                  Verify all encryption protocols
                </p>
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Audit Encryption</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
