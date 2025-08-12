import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Settings,
  Database,
  Server,
  AlertTriangle,
  CheckCircle,
  Activity,
  Users,
  Lock,
  Eye,
} from "lucide-react";
import { toast } from "sonner";

interface SystemHealth {
  server: number;
  database: number;
  network: number;
  security: number;
  performance: number;
}

interface AdminMetrics {
  totalUsers: number;
  activeUsers: number;
  totalTransactions: number;
  serverUptime: number;
  securityThreats: number;
  systemLoad: number;
}

export function AdminDashboard() {
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    server: 99.8,
    database: 100,
    network: 98.5,
    security: 100,
    performance: 95.2,
  });

  const [adminMetrics, setAdminMetrics] = useState<AdminMetrics>({
    totalUsers: 125847,
    activeUsers: 48750,
    totalTransactions: 2847593,
    serverUptime: 99.99,
    securityThreats: 0,
    systemLoad: 23.5,
  });

  const [realTimeAlerts, setRealTimeAlerts] = useState<string[]>([]);

  // Simulate real-time admin data updates
  useEffect(() => {
    const updateAdminData = () => {
      setSystemHealth((prev) => ({
        server: Math.min(100, prev.server + (Math.random() - 0.5) * 0.1),
        database: Math.min(100, prev.database + (Math.random() - 0.5) * 0.05),
        network: Math.min(100, prev.network + (Math.random() - 0.5) * 0.2),
        security: 100, // Always perfect security
        performance: Math.min(
          100,
          prev.performance + (Math.random() - 0.5) * 0.3,
        ),
      }));

      setAdminMetrics((prev) => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 50 - 25),
        totalTransactions:
          prev.totalTransactions + Math.floor(Math.random() * 100),
        systemLoad: Math.max(
          0,
          Math.min(100, prev.systemLoad + (Math.random() - 0.5) * 2),
        ),
      }));

      // Randomly add alerts
      if (Math.random() > 0.8) {
        const alerts = [
          "🚀 Performance boost applied - 10x speed increase detected",
          "🛡️ Security scan completed - All systems secure",
          "📊 New user milestone reached - Growth accelerating",
          "⚡ Network optimization successful - Latency improved",
          "🌍 Global expansion - New region activated",
        ];
        const newAlert = alerts[Math.floor(Math.random() * alerts.length)];
        setRealTimeAlerts((prev) => [newAlert, ...prev.slice(0, 4)]);
      }
    };

    const interval = setInterval(updateAdminData, 3000);
    return () => clearInterval(interval);
  }, []);

  const handleSystemAction = (action: string) => {
    toast.success(`Admin Action: ${action}`, {
      description: "System operation completed successfully",
    });
  };

  const getHealthColor = (value: number) => {
    if (value >= 95) return "text-green-400";
    if (value >= 85) return "text-yellow-400";
    return "text-red-400";
  };

  const getHealthBadge = (value: number) => {
    if (value >= 95) return "bg-green-600";
    if (value >= 85) return "bg-yellow-600";
    return "bg-red-600";
  };

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <Card className="border-red-500/30 bg-gradient-to-r from-red-900/20 to-orange-900/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Shield className="h-8 w-8 text-red-400" />
              <div>
                <h2 className="text-2xl font-bold text-red-400">
                  🔒 ADMIN CONTROL CENTER
                </h2>
                <p className="text-sm text-muted-foreground">
                  Ultimate system control & monitoring dashboard
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-red-600 text-white animate-pulse">
                <Lock className="h-3 w-3 mr-1" />
                ADMIN MODE
              </Badge>
              <Badge className="bg-green-600 text-white">
                <CheckCircle className="h-3 w-3 mr-1" />
                ALL SYSTEMS OPTIMAL
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">System Overview</TabsTrigger>
          <TabsTrigger value="security">Security Center</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* System Health Grid */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <Card className="border-green-500/30">
              <CardContent className="pt-4">
                <div className="text-center space-y-2">
                  <Server className="h-6 w-6 text-green-400 mx-auto" />
                  <p className="text-sm text-muted-foreground">Server Health</p>
                  <p
                    className={`text-xl font-bold ${getHealthColor(systemHealth.server)}`}
                  >
                    {systemHealth.server.toFixed(1)}%
                  </p>
                  <Progress value={systemHealth.server} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30">
              <CardContent className="pt-4">
                <div className="text-center space-y-2">
                  <Database className="h-6 w-6 text-blue-400 mx-auto" />
                  <p className="text-sm text-muted-foreground">Database</p>
                  <p
                    className={`text-xl font-bold ${getHealthColor(systemHealth.database)}`}
                  >
                    {systemHealth.database.toFixed(1)}%
                  </p>
                  <Progress value={systemHealth.database} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30">
              <CardContent className="pt-4">
                <div className="text-center space-y-2">
                  <Activity className="h-6 w-6 text-purple-400 mx-auto" />
                  <p className="text-sm text-muted-foreground">Network</p>
                  <p
                    className={`text-xl font-bold ${getHealthColor(systemHealth.network)}`}
                  >
                    {systemHealth.network.toFixed(1)}%
                  </p>
                  <Progress value={systemHealth.network} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-red-500/30">
              <CardContent className="pt-4">
                <div className="text-center space-y-2">
                  <Shield className="h-6 w-6 text-red-400 mx-auto" />
                  <p className="text-sm text-muted-foreground">Security</p>
                  <p
                    className={`text-xl font-bold ${getHealthColor(systemHealth.security)}`}
                  >
                    {systemHealth.security.toFixed(1)}%
                  </p>
                  <Progress value={systemHealth.security} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30">
              <CardContent className="pt-4">
                <div className="text-center space-y-2">
                  <Settings className="h-6 w-6 text-yellow-400 mx-auto" />
                  <p className="text-sm text-muted-foreground">Performance</p>
                  <p
                    className={`text-xl font-bold ${getHealthColor(systemHealth.performance)}`}
                  >
                    {systemHealth.performance.toFixed(1)}%
                  </p>
                  <Progress value={systemHealth.performance} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Real-time Alerts */}
          <Card className="border-orange-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <AlertTriangle className="h-5 w-5" />
                Real-time System Alerts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {realTimeAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-2 p-2 rounded bg-card/50 border border-border/50"
                  >
                    <CheckCircle className="h-4 w-4 text-green-400" />
                    <span className="text-sm">{alert}</span>
                    <Badge className="ml-auto bg-green-600 text-white text-xs">
                      {new Date().toLocaleTimeString()}
                    </Badge>
                  </div>
                ))}
                {realTimeAlerts.length === 0 && (
                  <p className="text-center text-muted-foreground text-sm py-4">
                    No recent alerts - All systems operating normally
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-400">🛡️ Security Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">0</p>
                  <p className="text-sm text-muted-foreground">
                    Active Threats
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">100%</p>
                  <p className="text-sm text-muted-foreground">
                    Protection Level
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-400">24/7</p>
                  <p className="text-sm text-muted-foreground">Monitoring</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-400">∞</p>
                  <p className="text-sm text-muted-foreground">
                    Security Layers
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400">
                ⚡ Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">10x</p>
                  <p className="text-sm text-muted-foreground">
                    Speed Multiplier
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-400">
                    {adminMetrics.systemLoad.toFixed(1)}%
                  </p>
                  <p className="text-sm text-muted-foreground">System Load</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-400">
                    {adminMetrics.serverUptime}%
                  </p>
                  <p className="text-sm text-muted-foreground">Uptime</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-400">0.1s</p>
                  <p className="text-sm text-muted-foreground">Response Time</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card className="border-blue-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Users className="h-5 w-5" />
                User Analytics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-400">
                    {adminMetrics.totalUsers.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-blue-400">
                    {adminMetrics.activeUsers.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">Active Now</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-purple-400">
                    {adminMetrics.totalTransactions.toLocaleString()}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Total Transactions
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-yellow-400">98.5%</p>
                  <p className="text-sm text-muted-foreground">
                    Satisfaction Rate
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Admin Quick Actions */}
      <Card className="border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-400">
            🚀 Quick Admin Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button
              onClick={() => handleSystemAction("System Optimization")}
              className="bg-green-600 hover:bg-green-700"
            >
              Optimize System
            </Button>
            <Button
              onClick={() => handleSystemAction("Security Scan")}
              className="bg-red-600 hover:bg-red-700"
            >
              Run Security Scan
            </Button>
            <Button
              onClick={() => handleSystemAction("Performance Boost")}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Apply 10x Boost
            </Button>
            <Button
              onClick={() => handleSystemAction("System Backup")}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Create Backup
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
