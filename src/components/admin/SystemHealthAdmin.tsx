import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Activity, 
  Cpu, 
  HardDrive, 
  Wifi,
  Server,
  Database,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Clock,
  Zap,
  Network
} from 'lucide-react';

export function SystemHealthAdmin() {
  const [systemMetrics, setSystemMetrics] = useState({
    overallHealth: 96.8,
    uptime: 99.97,
    totalServices: 47,
    runningServices: 45,
    criticalAlerts: 2,
    warnings: 7,
    cpuUsage: 34.7,
    memoryUsage: 67.2,
    diskUsage: 42.1,
    networkLatency: 12.4
  });

  const [services, setServices] = useState([
    { id: 1, name: "Authentication Service", status: "healthy", uptime: 99.99, cpu: 12.3, memory: 45.2, responseTime: 45 },
    { id: 2, name: "Video Streaming Engine", status: "healthy", uptime: 99.95, cpu: 67.8, memory: 78.9, responseTime: 89 },
    { id: 3, name: "Database Cluster", status: "warning", uptime: 99.92, cpu: 34.5, memory: 89.1, responseTime: 123 },
    { id: 4, name: "Payment Processing", status: "healthy", uptime: 100.0, cpu: 8.7, memory: 23.4, responseTime: 67 },
    { id: 5, name: "AI Processing Engine", status: "healthy", uptime: 99.87, cpu: 78.9, memory: 91.2, responseTime: 234 },
    { id: 6, name: "File Storage System", status: "critical", uptime: 98.45, cpu: 45.6, memory: 67.8, responseTime: 456 },
    { id: 7, name: "Notification Service", status: "healthy", uptime: 99.98, cpu: 15.4, memory: 34.7, responseTime: 78 },
    { id: 8, name: "Analytics Engine", status: "healthy", uptime: 99.89, cpu: 56.7, memory: 72.3, responseTime: 156 },
    { id: 9, name: "Search Indexer", status: "warning", uptime: 99.76, cpu: 23.8, memory: 56.9, responseTime: 189 },
    { id: 10, name: "Backup System", status: "healthy", uptime: 99.94, cpu: 12.1, memory: 28.5, responseTime: 234 }
  ]);

  const [systemAlerts, setSystemAlerts] = useState([
    { id: 1, severity: "critical", service: "File Storage System", message: "Disk usage approaching 95% capacity", timestamp: "2 minutes ago" },
    { id: 2, severity: "critical", service: "Video Streaming", message: "High memory usage detected", timestamp: "15 minutes ago" },
    { id: 3, severity: "warning", service: "Database Cluster", message: "Slow query performance detected", timestamp: "1 hour ago" },
    { id: 4, severity: "warning", service: "Search Indexer", message: "Index rebuild recommended", timestamp: "2 hours ago" },
    { id: 5, severity: "warning", service: "Analytics Engine", message: "Processing queue building up", timestamp: "3 hours ago" }
  ]);

  const [performanceMetrics, setPerformanceMetrics] = useState([
    { metric: "API Response Time", value: 145, unit: "ms", status: "good", trend: "stable" },
    { metric: "Database Query Time", value: 67, unit: "ms", status: "good", trend: "improving" },
    { metric: "Page Load Speed", value: 2.3, unit: "s", status: "warning", trend: "declining" },
    { metric: "Error Rate", value: 0.12, unit: "%", status: "good", trend: "stable" },
    { metric: "Throughput", value: 1847, unit: "req/min", status: "excellent", trend: "improving" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        overallHealth: Math.max(85, Math.min(100, prev.overallHealth + (Math.random() - 0.5) * 0.5)),
        cpuUsage: Math.max(0, Math.min(100, prev.cpuUsage + (Math.random() - 0.5) * 5)),
        memoryUsage: Math.max(0, Math.min(100, prev.memoryUsage + (Math.random() - 0.5) * 3)),
        diskUsage: Math.max(0, Math.min(100, prev.diskUsage + (Math.random() - 0.5) * 1)),
        networkLatency: Math.max(5, Math.min(50, prev.networkLatency + (Math.random() - 0.5) * 2))
      }));

      setServices(prev => prev.map(service => ({
        ...service,
        cpu: Math.max(0, Math.min(100, service.cpu + (Math.random() - 0.5) * 5)),
        memory: Math.max(0, Math.min(100, service.memory + (Math.random() - 0.5) * 3)),
        responseTime: Math.max(10, service.responseTime + (Math.random() - 0.5) * 20)
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Healthy</Badge>;
      case 'warning':
        return <Badge variant="default" className="bg-yellow-500"><AlertTriangle className="h-3 w-3 mr-1" />Warning</Badge>;
      case 'critical':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Critical</Badge>;
      case 'offline':
        return <Badge variant="destructive"><XCircle className="h-3 w-3 mr-1" />Offline</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'warning':
        return <Badge variant="default" className="bg-yellow-500">Warning</Badge>;
      case 'info':
        return <Badge variant="outline">Info</Badge>;
      default:
        return <Badge variant="secondary">{severity}</Badge>;
    }
  };

  const getPerformanceStatusColor = (status: string) => {
    switch (status) {
      case 'excellent':
        return 'text-green-600';
      case 'good':
        return 'text-green-500';
      case 'warning':
        return 'text-yellow-500';
      case 'critical':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-green-400">💚 System Health Monitor</h2>
          <p className="text-muted-foreground">Real-time System Performance & Health Monitoring</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline" className="text-green-400 border-green-400">
            <Activity className="h-4 w-4 mr-2" />
            Health: {systemMetrics.overallHealth.toFixed(1)}%
          </Badge>
          <Badge variant="outline" className="text-blue-400 border-blue-400">
            <Clock className="h-4 w-4 mr-2" />
            Uptime: {systemMetrics.uptime.toFixed(2)}%
          </Badge>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground">CPU Usage</p>
                <p className="text-2xl font-bold">{systemMetrics.cpuUsage.toFixed(1)}%</p>
              </div>
              <Cpu className="h-8 w-8 text-blue-500" />
            </div>
            <Progress value={systemMetrics.cpuUsage} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground">Memory Usage</p>
                <p className="text-2xl font-bold">{systemMetrics.memoryUsage.toFixed(1)}%</p>
              </div>
              <Database className="h-8 w-8 text-green-500" />
            </div>
            <Progress value={systemMetrics.memoryUsage} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground">Disk Usage</p>
                <p className="text-2xl font-bold">{systemMetrics.diskUsage.toFixed(1)}%</p>
              </div>
              <HardDrive className="h-8 w-8 text-purple-500" />
            </div>
            <Progress value={systemMetrics.diskUsage} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Network Latency</p>
                <p className="text-2xl font-bold">{systemMetrics.networkLatency.toFixed(1)}ms</p>
              </div>
              <Wifi className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Running Services</p>
                <p className="text-2xl font-bold">{systemMetrics.runningServices}/{systemMetrics.totalServices}</p>
              </div>
              <Server className="h-8 w-8 text-indigo-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="services" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="services">Services</TabsTrigger>
          <TabsTrigger value="alerts">System Alerts</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="monitoring">Live Monitoring</TabsTrigger>
          <TabsTrigger value="settings">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="services" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Service Status Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b">
                    <tr>
                      <th className="text-left p-4">Service</th>
                      <th className="text-left p-4">Status</th>
                      <th className="text-left p-4">Uptime</th>
                      <th className="text-left p-4">CPU</th>
                      <th className="text-left p-4">Memory</th>
                      <th className="text-left p-4">Response Time</th>
                      <th className="text-left p-4">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {services.map((service) => (
                      <tr key={service.id} className="border-b hover:bg-muted/50">
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Server className="h-4 w-4" />
                            <span className="font-medium">{service.name}</span>
                          </div>
                        </td>
                        <td className="p-4">{getStatusBadge(service.status)}</td>
                        <td className="p-4">
                          <span className="font-mono text-sm">{service.uptime.toFixed(2)}%</span>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Progress value={service.cpu} className="w-16 h-2" />
                            <span className="text-sm">{service.cpu.toFixed(1)}%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Progress value={service.memory} className="w-16 h-2" />
                            <span className="text-sm">{service.memory.toFixed(1)}%</span>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm">{service.responseTime.toFixed(0)}ms</span>
                        </td>
                        <td className="p-4">
                          <div className="flex space-x-1">
                            <Button size="sm" variant="outline">Restart</Button>
                            <Button size="sm" variant="outline">Logs</Button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>System Alerts & Issues</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {systemAlerts.map((alert) => (
                  <div key={alert.id} className="flex items-start justify-between p-4 border rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        {getSeverityBadge(alert.severity)}
                      </div>
                      <div>
                        <h3 className="font-semibold">{alert.service}</h3>
                        <p className="text-sm text-muted-foreground">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">Investigate</Button>
                      <Button size="sm" variant="outline">Dismiss</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {performanceMetrics.map((metric, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <h3 className="font-semibold">{metric.metric}</h3>
                      <div className="flex items-center space-x-4 mt-1">
                        <span className="text-sm text-muted-foreground">Status: </span>
                        <span className={`text-sm font-medium capitalize ${getPerformanceStatusColor(metric.status)}`}>
                          {metric.status}
                        </span>
                        <span className="text-sm text-muted-foreground">Trend: {metric.trend}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className={`text-2xl font-bold ${getPerformanceStatusColor(metric.status)}`}>
                        {metric.value}{metric.unit}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Real-time Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">System Load</span>
                    <div className="flex items-center space-x-2">
                      <Activity className="h-4 w-4 text-green-500" />
                      <span className="font-medium">Normal</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Network Traffic</span>
                    <div className="flex items-center space-x-2">
                      <Network className="h-4 w-4 text-blue-500" />
                      <span className="font-medium">1.2 GB/s</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Connections</span>
                    <div className="flex items-center space-x-2">
                      <Wifi className="h-4 w-4 text-green-500" />
                      <span className="font-medium">45,782</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Queue Processing</span>
                    <div className="flex items-center space-x-2">
                      <Zap className="h-4 w-4 text-yellow-500" />
                      <span className="font-medium">847 pending</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Resource Utilization</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Total CPU Cores</span>
                      <span className="text-sm font-medium">64 cores</span>
                    </div>
                    <Progress value={systemMetrics.cpuUsage} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Total Memory</span>
                      <span className="text-sm font-medium">512 GB</span>
                    </div>
                    <Progress value={systemMetrics.memoryUsage} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Storage Pool</span>
                      <span className="text-sm font-medium">50 TB</span>
                    </div>
                    <Progress value={systemMetrics.diskUsage} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Monitoring Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Real-time monitoring</h3>
                    <p className="text-sm text-muted-foreground">Enable continuous system monitoring</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Auto-restart failed services</h3>
                    <p className="text-sm text-muted-foreground">Automatically restart services that fail</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Performance alerts</h3>
                    <p className="text-sm text-muted-foreground">Send notifications for performance issues</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Alert Threshold CPU (%)</label>
                  <input type="number" className="w-full px-3 py-2 border rounded-md mt-1" defaultValue="80" />
                </div>
                <div>
                  <label className="text-sm font-medium">Alert Threshold Memory (%)</label>
                  <input type="number" className="w-full px-3 py-2 border rounded-md mt-1" defaultValue="85" />
                </div>
              </div>
              <Button>Save Configuration</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}