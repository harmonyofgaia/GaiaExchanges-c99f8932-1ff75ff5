import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Activity,
  Shield,
  Zap,
  Globe,
  Database,
  Cloud,
  Smartphone,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
} from "lucide-react";
import { toast } from "sonner";

interface HealthMetric {
  name: string;
  value: number;
  status: "excellent" | "good" | "warning" | "critical";
  trend: "up" | "down" | "stable";
  unit: string;
}

export function SystemHealthDashboard() {
  const [healthMetrics, setHealthMetrics] = useState<HealthMetric[]>([
    {
      name: "Overall System Health",
      value: 98.5,
      status: "excellent",
      trend: "up",
      unit: "%",
    },
    {
      name: "API Response Time",
      value: 45,
      status: "excellent",
      trend: "stable",
      unit: "ms",
    },
    {
      name: "Database Performance",
      value: 99.9,
      status: "excellent",
      trend: "up",
      unit: "%",
    },
    {
      name: "Security Score",
      value: 100,
      status: "excellent",
      trend: "stable",
      unit: "%",
    },
    {
      name: "Cloud Storage",
      value: 95.2,
      status: "excellent",
      trend: "up",
      unit: "%",
    },
    {
      name: "Mobile Compatibility",
      value: 100,
      status: "excellent",
      trend: "stable",
      unit: "%",
    },
  ]);

  const [systemStatus, setSystemStatus] = useState({
    uptime: "99.98%",
    totalRequests: 12547,
    successRate: 99.94,
    activeUsers: 1284,
  });

  useEffect(() => {
    // Simulate real-time updates
    const interval = setInterval(() => {
      setHealthMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: Math.max(85, Math.min(100, metric.value + (Math.random() - 0.5) * 2)),
        }))
      );

      setSystemStatus((prev) => ({
        ...prev,
        totalRequests: prev.totalRequests + Math.floor(Math.random() * 50 + 10),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20 - 10),
      }));
    }, 10000);

    return () => clearInterval(interval);
  }, []);

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

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "excellent":
        return "bg-green-600";
      case "good":
        return "bg-blue-600";
      case "warning":
        return "bg-yellow-600";
      case "critical":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-3 w-3 text-green-400" />;
      case "down":
        return <TrendingUp className="h-3 w-3 text-red-400 rotate-180" />;
      case "stable":
        return <div className="h-3 w-3 rounded-full bg-blue-400" />;
      default:
        return null;
    }
  };

  const runHealthCheck = () => {
    toast.success("🔍 Health Check Started", {
      description: "Running comprehensive system health analysis...",
    });

    // Simulate health check
    setTimeout(() => {
      setHealthMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: Math.min(100, metric.value + Math.random() * 5),
          status: metric.value > 95 ? "excellent" : metric.value > 80 ? "good" : "warning",
        }))
      );

      toast.success("✅ Health Check Complete", {
        description: "All systems operating at optimal levels",
      });
    }, 3000);
  };

  return (
    <div className="space-y-6">
      {/* Overall Status */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-green-300">
            <Activity className="h-8 w-8 animate-pulse text-green-400" />
            <div>
              <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                System Health Dashboard
              </div>
              <div className="text-sm font-normal text-green-400">
                Real-time monitoring of all platform components
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-green-400">{systemStatus.uptime}</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-blue-400">
                {systemStatus.totalRequests.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Requests</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-purple-400">{systemStatus.successRate}%</div>
              <div className="text-sm text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-cyan-400">{systemStatus.activeUsers}</div>
              <div className="text-sm text-muted-foreground">Active Users</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Health Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {healthMetrics.map((metric, index) => (
          <Card key={index} className="border border-gray-500/20">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-semibold text-sm">{metric.name}</h3>
                <div className="flex items-center gap-2">
                  {getTrendIcon(metric.trend)}
                  <Badge className={getStatusBadgeColor(metric.status)}>
                    {metric.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between items-end">
                  <span className={`text-2xl font-bold ${getStatusColor(metric.status)}`}>
                    {metric.value.toFixed(1)}
                    {metric.unit}
                  </span>
                </div>
                <Progress
                  value={
                    metric.name === "API Response Time"
                      ? 100 - (metric.value / 200) * 100
                      : metric.value
                  }
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* System Components Status */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Critical System Components
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-900/20 rounded border border-green-500/20">
                <div className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-green-400" />
                  <span className="font-medium">Database Cluster</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm">Online</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-900/20 rounded border border-green-500/20">
                <div className="flex items-center gap-2">
                  <Cloud className="h-5 w-5 text-green-400" />
                  <span className="font-medium">Cloud Storage</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm">Operational</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-900/20 rounded border border-green-500/20">
                <div className="flex items-center gap-2">
                  <Globe className="h-5 w-5 text-green-400" />
                  <span className="font-medium">API Gateway</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm">Healthy</span>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-green-900/20 rounded border border-green-500/20">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-green-400" />
                  <span className="font-medium">Mobile Apps</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm">Ready</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-900/20 rounded border border-green-500/20">
                <div className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-green-400" />
                  <span className="font-medium">Security Layer</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm">Protected</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3 bg-green-900/20 rounded border border-green-500/20">
                <div className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-green-400" />
                  <span className="font-medium">Performance</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 text-sm">Optimal</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Actions */}
      <div className="flex gap-4">
        <Button onClick={runHealthCheck} className="bg-gradient-to-r from-green-600 to-blue-600">
          <Activity className="h-4 w-4 mr-2" />
          Run Health Check
        </Button>
      </div>
    </div>
  );
}
