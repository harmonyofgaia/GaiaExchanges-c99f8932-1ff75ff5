import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Activity,
  AlertTriangle,
  CheckCircle,
  Database,
  Globe,
  Cpu,
  HardDrive,
  Network,
  Users,
  Lock,
  Eye,
  TrendingUp,
  Wifi,
} from "lucide-react";

interface SystemMetric {
  id: string;
  name: string;
  value: number;
  threshold: number;
  status: "healthy" | "warning" | "critical";
  icon: unknown;
  unit: string;
  lastChecked: number;
}

interface ThreatIndicator {
  id: string;
  type: string;
  severity: number;
  description: string;
  detected: number;
  source: string;
  confidence: number;
}

export function ThreatDetectionEngine() {
  const [systemMetrics, setSystemMetrics] = useState<SystemMetric[]>([]);
  const [threats, setThreats] = useState<ThreatIndicator[]>([]);
  const [overallHealth, setOverallHealth] = useState(98.5);
  const [activeScans, setActiveScans] = useState(12);
  const [monitoringActive, setMonitoringActive] = useState(true);

  // Initialize system metrics
  useEffect(() => {
    const initialMetrics: SystemMetric[] = [
      {
        id: "1",
        name: "Server CPU Usage",
        value: 25,
        threshold: 80,
        status: "healthy",
        icon: Cpu,
        unit: "%",
        lastChecked: Date.now()
      },
      {
        id: "2",
        name: "Memory Usage",
        value: 67,
        threshold: 85,
        status: "healthy",
        icon: HardDrive,
        unit: "%",
        lastChecked: Date.now()
      },
      {
        id: "3",
        name: "Database Performance",
        value: 92,
        threshold: 70,
        status: "healthy",
        icon: Database,
        unit: "%",
        lastChecked: Date.now()
      },
      {
        id: "4",
        name: "Network Latency",
        value: 45,
        threshold: 200,
        status: "healthy",
        icon: Network,
        unit: "ms",
        lastChecked: Date.now()
      },
      {
        id: "5",
        name: "API Response Time",
        value: 125,
        threshold: 500,
        status: "healthy",
        icon: Globe,
        unit: "ms",
        lastChecked: Date.now()
      },
      {
        id: "6",
        name: "Active Sessions",
        value: 1247,
        threshold: 5000,
        status: "healthy",
        icon: Users,
        unit: "",
        lastChecked: Date.now()
      },
      {
        id: "7",
        name: "Failed Login Attempts",
        value: 3,
        threshold: 50,
        status: "healthy",
        icon: Lock,
        unit: "/hour",
        lastChecked: Date.now()
      },
      {
        id: "8",
        name: "File System Integrity",
        value: 100,
        threshold: 95,
        status: "healthy",
        icon: HardDrive,
        unit: "%",
        lastChecked: Date.now()
      },
      {
        id: "9",
        name: "Network Traffic",
        value: 234,
        threshold: 10000,
        status: "healthy",
        icon: Wifi,
        unit: "MB/s",
        lastChecked: Date.now()
      },
      {
        id: "10",
        name: "Error Rate",
        value: 0.02,
        threshold: 1,
        status: "healthy",
        icon: AlertTriangle,
        unit: "%",
        lastChecked: Date.now()
      },
    ];
    setSystemMetrics(initialMetrics);
  }, []);

  // Real-time monitoring simulation
  useEffect(() => {
    if (!monitoringActive) return;

    const monitoringInterval = setInterval(() => {
      // Update system metrics with realistic fluctuations
      setSystemMetrics((prev) =>
        prev.map((metric) => {
          let newValue = metric.value;

          // Simulate realistic metric changes
          switch (metric.name) {
            case "Server CPU Usage":
              newValue = Math.max(10, Math.min(95, metric.value + (Math.random() - 0.5) * 10));
              break;
            case "Memory Usage":
              newValue = Math.max(20, Math.min(90, metric.value + (Math.random() - 0.5) * 5));
              break;
            case "Database Performance":
              newValue = Math.max(70, Math.min(100, metric.value + (Math.random() - 0.5) * 3));
              break;
            case "Network Latency":
              newValue = Math.max(20, Math.min(300, metric.value + (Math.random() - 0.5) * 20));
              break;
            case "API Response Time":
              newValue = Math.max(50, Math.min(800, metric.value + (Math.random() - 0.5) * 50));
              break;
            case "Active Sessions":
              newValue = Math.max(500, Math.min(3000, metric.value + (Math.random() - 0.5) * 100));
              break;
            case "Failed Login Attempts":
              newValue = Math.max(0, Math.min(100, metric.value + (Math.random() - 0.7) * 5));
              break;
            case "File System Integrity":
              newValue = Math.max(95, Math.min(100, metric.value + (Math.random() - 0.8) * 2));
              break;
            case "Network Traffic":
              newValue = Math.max(100, Math.min(2000, metric.value + (Math.random() - 0.5) * 100));
              break;
            case "Error Rate":
              newValue = Math.max(0, Math.min(5, metric.value + (Math.random() - 0.8) * 0.1));
              break;
          }

          // Determine status based on thresholds
          let status: "healthy" | "warning" | "critical" = "healthy";
          if (
            metric.name.includes("Error") ||
            metric.name.includes("Failed") ||
            metric.name.includes("Latency") ||
            metric.name.includes("Response")
          ) {
            if (newValue > metric.threshold * 0.8) status = "warning";
            if (newValue > metric.threshold) status = "critical";
          } else {
            if (newValue > metric.threshold * 0.9) status = "warning";
            if (newValue > metric.threshold) status = "critical";
            if (metric.name.includes("Integrity") || metric.name.includes("Performance")) {
              if (newValue < metric.threshold) status = "critical";
              if (newValue < metric.threshold * 1.1) status = "warning";
            }
          }

          return {
            ...metric,
            value: newValue,
            status,
            lastChecked: Date.now()
          };
        })
      );

      // Generate threat indicators based on system anomalies
      setSystemMetrics((current) => {
        const criticalMetrics = current.filter((m) => m.status === "critical");
        const warningMetrics = current.filter((m) => m.status === "warning");

        if (criticalMetrics.length > 0 || Math.random() < 0.03) {
          const threatTypes = [
            "DDoS Attack Detected",
            "Unusual Database Activity",
            "Suspicious Login Patterns",
            "File System Anomaly",
            "Network Intrusion Attempt",
            "API Abuse Detected",
            "Memory Corruption Attempt",
            "Unauthorized Access Attempt",
          ];

          const newThreat: ThreatIndicator = {
            id: `threat-${Date.now()}`,
            type: threatTypes[Math.floor(Math.random() * threatTypes.length)],
            severity:
              criticalMetrics.length > 0
                ? Math.floor(Math.random() * 3) + 8
                : Math.floor(Math.random() * 4) + 4,
            description:
              criticalMetrics.length > 0
                ? `Critical system metric detected: ${criticalMetrics[0].name}`
                : "Anomalous behavior pattern detected",
            detected: Date.now(),
            source: [
              "Network Monitor",
              "Database Scanner",
              "File System Watcher",
              "API Gateway",
              "Security Scanner",
            ][Math.floor(Math.random() * 5)],
            confidence: 75 + Math.random() * 25,
          };

          setThreats((prev) => [newThreat, ...prev.slice(0, 9)]);
        }

        return current;
      });

      // Update overall health
      setSystemMetrics((current) => {
        const healthyCount = current.filter((m) => m.status === "healthy").length;
        const warningCount = current.filter((m) => m.status === "warning").length;
        const criticalCount = current.filter((m) => m.status === "critical").length;

        const healthScore =
          ((healthyCount * 100 + warningCount * 70 + criticalCount * 30) / (current.length * 100)) *
          100;
        setOverallHealth(healthScore);

        return current;
      });

      // Update active scans
      setActiveScans((prev) => Math.max(8, Math.min(20, prev + (Math.random() - 0.5) * 3)));
    }, 2000);

    return () => clearInterval(monitoringInterval);
  }, [monitoringActive]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
        return "text-green-500";
      case "warning":
        return "text-yellow-500";
      case "critical":
        return "text-red-500";
      default:
        return "text-gray-500";
    }
  };

  const getStatusBadgeVariant = (status: string) => {
    switch (status) {
      case "healthy":
        return "default";
      case "warning":
        return "secondary";
      case "critical":
        return "destructive";
      default:
        return "outline";
    }
  };

  const getSeverityColor = (severity: number) => {
    if (severity >= 9) return "bg-red-600";
    if (severity >= 7) return "bg-red-500";
    if (severity >= 5) return "bg-orange-500";
    if (severity >= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  const healthyMetrics = systemMetrics.filter((m) => m.status === "healthy").length;
  const warningMetrics = systemMetrics.filter((m) => m.status === "warning").length;
  const criticalMetrics = systemMetrics.filter((m) => m.status === "critical").length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Eye className="h-8 w-8 text-blue-500" />
          <div>
            <h2 className="text-2xl font-bold">Real-Time Threat Detection Engine</h2>
            <p className="text-muted-foreground">Infrastructure Monitoring & Analysis</p>
          </div>
        </div>
        <Badge variant={monitoringActive ? "default" : "secondary"}>
          {monitoringActive ? "MONITORING ACTIVE" : "STANDBY"}
        </Badge>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Overall Health</p>
                <p className="text-2xl font-bold">{overallHealth.toFixed(1)}%</p>
              </div>
              <CheckCircle
                className={`h-8 w-8 ${overallHealth > 95 ? "text-green-500" : overallHealth > 85 ? "text-yellow-500" : "text-red-500"}`}
              />
            </div>
            <Progress value={overallHealth} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Scans</p>
                <p className="text-2xl font-bold">{Math.floor(activeScans)}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Threats Detected</p>
                <p className="text-2xl font-bold">{threats.length}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Critical Alerts</p>
                <p className="text-2xl font-bold">{criticalMetrics}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Metrics Grid */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <TrendingUp className="h-5 w-5" />
            <span>Infrastructure Monitoring</span>
            <div className="flex space-x-2 ml-auto">
              <Badge variant="default">{healthyMetrics} Healthy</Badge>
              {warningMetrics > 0 && <Badge variant="secondary">{warningMetrics} Warning</Badge>}
              {criticalMetrics > 0 && (
                <Badge variant="destructive">{criticalMetrics} Critical</Badge>
              )}
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {systemMetrics.map((metric) => {
              const Icon = metric.icon;
              return (
                <div key={metric.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Icon className={`h-5 w-5 ${getStatusColor(metric.status)}`} />
                      <h4 className="font-medium text-sm">{metric.name}</h4>
                    </div>
                    <Badge variant={getStatusBadgeVariant(metric.status)}>
                      {metric.status.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Current</span>
                      <span className="font-mono">
                        {typeof metric.value === "number" && metric.value % 1 !== 0
                          ? metric.value.toFixed(2)
                          : Math.floor(metric.value)}
                        {metric.unit}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-muted-foreground">
                      <span>Threshold</span>
                      <span>
                        {metric.threshold}
                        {metric.unit}
                      </span>
                    </div>
                    <Progress
                      value={Math.min(100, (metric.value / metric.threshold) * 100)}
                      className="h-2"
                    />
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Last checked: {new Date(metric.lastChecked).toLocaleTimeString()}
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Active Threats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Active Threat Indicators</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {threats.length === 0 ? (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>
                  No active threats detected. All systems operating normally.
                </AlertDescription>
              </Alert>
            ) : (
              threats.map((threat) => (
                <div
                  key={threat.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${getSeverityColor(threat.severity)}`} />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2">
                        <p className="font-medium">{threat.type}</p>
                        <Badge variant="outline">Severity {threat.severity}/10</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{threat.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground mt-1">
                        <span>Source: {threat.source}</span>
                        <span>Confidence: {Math.floor(threat.confidence)}%</span>
                        <span>Detected: {new Date(threat.detected).toLocaleTimeString()}</span>
                      </div>
                    </div>
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
