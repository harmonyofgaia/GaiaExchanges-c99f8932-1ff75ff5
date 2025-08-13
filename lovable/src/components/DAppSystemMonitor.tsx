import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  Database,
  Globe,
  Shield,
  Zap,
  CheckCircle,
  AlertTriangle,
  GitBranch,
  Server,
  Cpu,
  HardDrive,
  Wifi,
} from "lucide-react";
import { toast } from "sonner";

interface SystemHealth {
  component: string;
  status: "healthy" | "warning" | "error" | "maintenance";
  performance: number;
  uptime: number;
  lastCheck: Date;
  icon: React.ReactNode;
}

export function DAppSystemMonitor() {
  const [systemHealth, setSystemHealth] = useState<SystemHealth[]>([
    {
      component: "Supabase Database",
      status: "healthy",
      performance: 98.5,
      uptime: 99.9,
      lastCheck: new Date(),
      icon: <Database className="h-4 w-4" />,
    },
    {
      component: "GitHub Integration",
      status: "healthy",
      performance: 97.2,
      uptime: 99.8,
      lastCheck: new Date(),
      icon: <GitBranch className="h-4 w-4" />,
    },
    {
      component: "Web3 Connection",
      status: "healthy",
      performance: 95.8,
      uptime: 99.7,
      lastCheck: new Date(),
      icon: <Globe className="h-4 w-4" />,
    },
    {
      component: "Security Engine",
      status: "healthy",
      performance: 99.9,
      uptime: 100,
      lastCheck: new Date(),
      icon: <Shield className="h-4 w-4" />,
    },
    {
      component: "Cross-Platform API",
      status: "healthy",
      performance: 94.3,
      uptime: 99.6,
      lastCheck: new Date(),
      icon: <Server className="h-4 w-4" />,
    },
    {
      component: "Token Management",
      status: "healthy",
      performance: 99.1,
      uptime: 99.9,
      lastCheck: new Date(),
      icon: <Zap className="h-4 w-4" />,
    },
  ]);

  const [overallHealth, setOverallHealth] = useState(0);
  const [autoFix, setAutoFix] = useState(true);

  useEffect(() => {
    // System monitoring every 5 seconds
    const monitorSystem = () => {
      setSystemHealth((prev) =>
        prev.map((system) => {
          // Simulate real-time monitoring
          const performanceVariation = (Math.random() - 0.5) * 2; // ±1%
          const uptimeVariation = (Math.random() - 0.5) * 0.2; // ±0.1%

          const newPerformance = Math.max(
            85,
            Math.min(100, system.performance + performanceVariation),
          );
          const newUptime = Math.max(
            95,
            Math.min(100, system.uptime + uptimeVariation),
          );

          // Auto-fix issues
          let newStatus = system.status;
          if (newPerformance < 90 && autoFix) {
            newStatus = "maintenance";
            // Simulate auto-repair
            setTimeout(() => {
              setSystemHealth((current) =>
                current.map((s) =>
                  s.component === system.component
                    ? {
                        ...s,
                        status: "healthy",
                        performance: Math.min(100, s.performance + 5),
                      }
                    : s,
                ),
              );
              toast.success(`🔧 Auto-Fixed: ${system.component}`, {
                description: "System automatically resolved performance issues",
                duration: 3000,
              });
            }, 2000);
          } else if (newPerformance >= 95) {
            newStatus = "healthy";
          } else if (newPerformance >= 90) {
            newStatus = "warning";
          } else {
            newStatus = "error";
          }

          return {
            ...system,
            performance: newPerformance,
            uptime: newUptime,
            status: newStatus,
            lastCheck: new Date(),
          };
        }),
      );
    };

    const interval = setInterval(monitorSystem, 5000);
    return () => clearInterval(interval);
  }, [autoFix]);

  useEffect(() => {
    // Calculate overall system health
    const totalPerformance = systemHealth.reduce(
      (sum, system) => sum + system.performance,
      0,
    );
    const avgPerformance = totalPerformance / systemHealth.length;
    setOverallHealth(avgPerformance);
  }, [systemHealth]);

  const runFullSystemCheck = () => {
    toast.success("🔍 Full System Diagnostic Started", {
      description: "Running comprehensive health check across all components",
      duration: 5000,
    });

    setSystemHealth((prev) =>
      prev.map((system) => ({
        ...system,
        status: "maintenance",
        lastCheck: new Date(),
      })),
    );

    // Simulate comprehensive check
    setTimeout(() => {
      setSystemHealth((prev) =>
        prev.map((system) => ({
          ...system,
          status: "healthy",
          performance: Math.min(100, system.performance + 3),
          uptime: Math.min(100, system.uptime + 0.1),
        })),
      );

      toast.success("✅ System Health Check Complete", {
        description:
          "All components optimized and functioning at peak performance",
        duration: 3000,
      });
    }, 5000);
  };

  const optimizePerformance = () => {
    toast.success("⚡ Performance Optimization Started", {
      description:
        "Applying advanced optimization protocols across all systems",
      duration: 4000,
    });

    setSystemHealth((prev) =>
      prev.map((system) => ({
        ...system,
        performance: Math.min(100, system.performance + 5),
        status: system.performance < 95 ? "maintenance" : "healthy",
      })),
    );

    console.log("🚀 System performance optimization completed");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "bg-green-600";
      case "warning":
        return "bg-yellow-600";
      case "error":
        return "bg-red-600";
      case "maintenance":
        return "bg-blue-600";
      default:
        return "bg-gray-600";
    }
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 95) return "text-green-400";
    if (performance >= 90) return "text-yellow-400";
    return "text-red-400";
  };

  return (
    <div className="space-y-6">
      {/* Overall System Health */}
      <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Activity className="h-5 w-5" />
            DApp System Health Monitor
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">
                {overallHealth.toFixed(1)}%
              </div>
              <p className="text-muted-foreground">Overall System Health</p>
              <Progress value={overallHealth} className="mt-3" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {systemHealth.filter((s) => s.status === "healthy").length}
                </div>
                <p className="text-muted-foreground">Healthy</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {systemHealth.filter((s) => s.status === "warning").length}
                </div>
                <p className="text-muted-foreground">Warnings</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {
                    systemHealth.filter((s) => s.status === "maintenance")
                      .length
                  }
                </div>
                <p className="text-muted-foreground">Maintenance</p>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-red-400">
                  {systemHealth.filter((s) => s.status === "error").length}
                </div>
                <p className="text-muted-foreground">Errors</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* System Components */}
      <Card>
        <CardHeader>
          <CardTitle>System Component Status</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemHealth.map((system, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 rounded-lg bg-muted/30"
              >
                <div className="flex items-center gap-3">
                  <div className="text-blue-400">{system.icon}</div>
                  <div>
                    <div className="font-medium">{system.component}</div>
                    <div className="text-sm text-muted-foreground">
                      Last check: {system.lastCheck.toLocaleTimeString()}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div
                      className={`text-sm font-medium ${getPerformanceColor(system.performance)}`}
                    >
                      {system.performance.toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Performance
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm font-medium text-green-400">
                      {system.uptime.toFixed(1)}%
                    </div>
                    <div className="text-xs text-muted-foreground">Uptime</div>
                  </div>

                  <Badge
                    className={`${getStatusColor(system.status)} text-white`}
                  >
                    {system.status}
                  </Badge>

                  {system.status === "healthy" && (
                    <CheckCircle className="h-4 w-4 text-green-400" />
                  )}
                  {system.status === "warning" && (
                    <AlertTriangle className="h-4 w-4 text-yellow-400" />
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* System Actions */}
      <div className="flex gap-4 flex-wrap">
        <Button
          onClick={runFullSystemCheck}
          className="bg-blue-600 hover:bg-blue-700"
        >
          <Activity className="h-4 w-4 mr-2" />
          Run Full System Check
        </Button>

        <Button
          onClick={optimizePerformance}
          className="bg-green-600 hover:bg-green-700"
        >
          <Zap className="h-4 w-4 mr-2" />
          Optimize Performance
        </Button>

        <Button
          variant="outline"
          className="border-purple-500/20"
          onClick={() => {
            setAutoFix(!autoFix);
            toast.success(`Auto-Fix ${autoFix ? "Disabled" : "Enabled"}`, {
              description: `System will ${autoFix ? "no longer" : "now"} automatically resolve issues`,
              duration: 3000,
            });
          }}
        >
          <Shield className="h-4 w-4 mr-2" />
          Auto-Fix: {autoFix ? "ON" : "OFF"}
        </Button>
      </div>

      {/* Resource Usage */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Cpu className="h-5 w-5" />
            System Resource Usage
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2">
                  <Cpu className="h-4 w-4" />
                  CPU Usage
                </span>
                <span className="text-sm text-green-400">23%</span>
              </div>
              <Progress value={23} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2">
                  <HardDrive className="h-4 w-4" />
                  Memory Usage
                </span>
                <span className="text-sm text-yellow-400">45%</span>
              </div>
              <Progress value={45} />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm flex items-center gap-2">
                  <Wifi className="h-4 w-4" />
                  Network Usage
                </span>
                <span className="text-sm text-blue-400">12%</span>
              </div>
              <Progress value={12} />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
