import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Radar,
  Satellite,
  Wifi,
  Database,
  Cloud,
  Zap,
  Brain,
  Shield,
  Cpu,
  Activity,
  Eye,
  Lock,
  AlertTriangle,
  CheckCircle,
  PlayCircle,
  PauseCircle,
} from "lucide-react";
import { toast } from "sonner";

interface TacticalSystem {
  id: string;
  name: string;
  status: "active" | "standby" | "deploying" | "offline";
  uptime: number;
  cpu_usage: number;
  memory_usage: number;
  network_traffic: number;
  last_deployment: string;
  threat_level: "green" | "yellow" | "orange" | "red";
  category: "surveillance" | "network" | "data" | "ai" | "quantum" | "cyber";
}

interface DeploymentLog {
  id: string;
  system: string;
  action: string;
  timestamp: Date;
  success: boolean;
  details: string;
}

export function BackgroundTacticalSystems() {
  const [tacticalSystems, setTacticalSystems] = useState<TacticalSystem[]>([
    // Surveillance Systems
    {
      id: "global-radar",
      name: "Global Radar Network",
      status: "active",
      uptime: 99.97,
      cpu_usage: 45,
      memory_usage: 67,
      network_traffic: 234,
      last_deployment: "Network scan complete",
      threat_level: "green",
      category: "surveillance",
    },
    {
      id: "satellite-grid",
      name: "Satellite Grid Monitor",
      status: "active",
      uptime: 99.85,
      cpu_usage: 38,
      memory_usage: 52,
      network_traffic: 189,
      last_deployment: "Orbital sync verified",
      threat_level: "green",
      category: "surveillance",
    },
    {
      id: "drone-swarm",
      name: "Autonomous Drone Swarm",
      status: "standby",
      uptime: 98.23,
      cpu_usage: 12,
      memory_usage: 23,
      network_traffic: 45,
      last_deployment: "Perimeter patrol",
      threat_level: "yellow",
      category: "surveillance",
    },
    {
      id: "seismic-net",
      name: "Seismic Detection Network",
      status: "active",
      uptime: 99.94,
      cpu_usage: 28,
      memory_usage: 34,
      network_traffic: 78,
      last_deployment: "Vibration analysis",
      threat_level: "green",
      category: "surveillance",
    },

    // Network Defense
    {
      id: "packet-filter",
      name: "Deep Packet Inspection",
      status: "active",
      uptime: 99.99,
      cpu_usage: 78,
      memory_usage: 89,
      network_traffic: 567,
      last_deployment: "Traffic analysis",
      threat_level: "green",
      category: "network",
    },
    {
      id: "bandwidth-guard",
      name: "Bandwidth Guardian",
      status: "active",
      uptime: 99.76,
      cpu_usage: 56,
      memory_usage: 67,
      network_traffic: 345,
      last_deployment: "DDoS mitigation",
      threat_level: "orange",
      category: "network",
    },
    {
      id: "vpn-tunnel",
      name: "Quantum VPN Tunnels",
      status: "active",
      uptime: 100.0,
      cpu_usage: 23,
      memory_usage: 45,
      network_traffic: 234,
      last_deployment: "Tunnel encryption",
      threat_level: "green",
      category: "network",
    },
    {
      id: "mesh-network",
      name: "Mesh Network Overlay",
      status: "deploying",
      uptime: 67.45,
      cpu_usage: 89,
      memory_usage: 78,
      network_traffic: 456,
      last_deployment: "Node synchronization",
      threat_level: "yellow",
      category: "network",
    },

    // Data Systems
    {
      id: "backup-matrix",
      name: "Real-time Backup Matrix",
      status: "active",
      uptime: 99.89,
      cpu_usage: 34,
      memory_usage: 67,
      network_traffic: 123,
      last_deployment: "Data replication",
      threat_level: "green",
      category: "data",
    },
    {
      id: "forensics-lab",
      name: "Digital Forensics Lab",
      status: "active",
      uptime: 98.67,
      cpu_usage: 67,
      memory_usage: 78,
      network_traffic: 89,
      last_deployment: "Evidence analysis",
      threat_level: "yellow",
      category: "data",
    },
    {
      id: "integrity-check",
      name: "Data Integrity Checker",
      status: "active",
      uptime: 99.95,
      cpu_usage: 45,
      memory_usage: 56,
      network_traffic: 167,
      last_deployment: "Checksum verification",
      threat_level: "green",
      category: "data",
    },
    {
      id: "archive-vault",
      name: "Secure Archive Vault",
      status: "active",
      uptime: 100.0,
      cpu_usage: 12,
      memory_usage: 23,
      network_traffic: 34,
      last_deployment: "Vault access logged",
      threat_level: "green",
      category: "data",
    },

    // AI Systems
    {
      id: "neural-core",
      name: "Neural Command Core",
      status: "active",
      uptime: 99.78,
      cpu_usage: 89,
      memory_usage: 92,
      network_traffic: 678,
      last_deployment: "Model training",
      threat_level: "green",
      category: "ai",
    },
    {
      id: "prediction-engine",
      name: "Threat Prediction Engine",
      status: "active",
      uptime: 99.56,
      cpu_usage: 78,
      memory_usage: 84,
      network_traffic: 456,
      last_deployment: "Risk assessment",
      threat_level: "orange",
      category: "ai",
    },
    {
      id: "pattern-analyzer",
      name: "Pattern Analysis AI",
      status: "active",
      uptime: 98.89,
      cpu_usage: 67,
      memory_usage: 78,
      network_traffic: 234,
      last_deployment: "Behavioral mapping",
      threat_level: "yellow",
      category: "ai",
    },
    {
      id: "decision-matrix",
      name: "Autonomous Decision Matrix",
      status: "standby",
      uptime: 97.23,
      cpu_usage: 23,
      memory_usage: 34,
      network_traffic: 67,
      last_deployment: "Decision tree update",
      threat_level: "green",
      category: "ai",
    },

    // Quantum Systems
    {
      id: "quantum-core",
      name: "Quantum Processing Core",
      status: "active",
      uptime: 100.0,
      cpu_usage: 56,
      memory_usage: 67,
      network_traffic: 123,
      last_deployment: "Quantum state sync",
      threat_level: "green",
      category: "quantum",
    },
    {
      id: "entanglement-net",
      name: "Entanglement Network",
      status: "active",
      uptime: 99.98,
      cpu_usage: 34,
      memory_usage: 45,
      network_traffic: 78,
      last_deployment: "Entanglement verified",
      threat_level: "green",
      category: "quantum",
    },

    // Cyber Warfare
    {
      id: "attack-simulator",
      name: "Attack Simulation Engine",
      status: "active",
      uptime: 98.45,
      cpu_usage: 78,
      memory_usage: 89,
      network_traffic: 345,
      last_deployment: "Red team exercise",
      threat_level: "orange",
      category: "cyber",
    },
    {
      id: "counter-intel",
      name: "Counter Intelligence Bot",
      status: "deploying",
      uptime: 87.23,
      cpu_usage: 89,
      memory_usage: 78,
      network_traffic: 567,
      last_deployment: "Intel gathering",
      threat_level: "red",
      category: "cyber",
    },
  ]);

  const [deploymentLogs, setDeploymentLogs] = useState<DeploymentLog[]>([]);
  const [systemOverview, setSystemOverview] = useState({
    total_systems: 19,
    active_systems: 16,
    standby_systems: 2,
    deploying_systems: 1,
    offline_systems: 0,
    total_uptime: 99.2,
    avg_cpu: 52.3,
    avg_memory: 61.7,
    total_traffic: 4567,
  });

  // Background system monitoring
  useEffect(() => {
    const monitorSystems = () => {
      setTacticalSystems((prev) =>
        prev.map((system) => {
          // Simulate system activity
          const activity = Math.random();

          if (activity > 0.98) {
            // System deployment action
            const actions = [
              "Security scan initiated",
              "Threat assessment complete",
              "Network optimization",
              "Data synchronization",
              "System health check",
              "Performance optimization",
              "Security protocol update",
              "Backup verification",
              "Network redundancy test",
              "AI model refinement",
            ];

            const newLog: DeploymentLog = {
              id: crypto.randomUUID(),
              system: system.name,
              action: actions[Math.floor(Math.random() * actions.length)],
              timestamp: new Date(),
              success: Math.random() > 0.1, // 90% success rate
              details: `${system.category.toUpperCase()} operation completed`,
            };

            setDeploymentLogs((prev) => [newLog, ...prev.slice(0, 29)]);

            console.log(`🚀 ${system.name}: ${newLog.action}`);

            return {
              ...system,
              last_deployment: newLog.action,
              cpu_usage: Math.max(10, Math.min(95, system.cpu_usage + (Math.random() - 0.5) * 10)),
              memory_usage: Math.max(
                15,
                Math.min(95, system.memory_usage + (Math.random() - 0.5) * 8)
              ),
              network_traffic: Math.max(10, system.network_traffic + (Math.random() - 0.5) * 50),
              uptime: Math.max(85, Math.min(100, system.uptime + (Math.random() - 0.48) * 0.5)),
            };
          }

          // Normal fluctuations
          return {
            ...system,
            cpu_usage: Math.max(5, Math.min(90, system.cpu_usage + (Math.random() - 0.5) * 5)),
            memory_usage: Math.max(
              10,
              Math.min(95, system.memory_usage + (Math.random() - 0.5) * 3)
            ),
            network_traffic: Math.max(5, system.network_traffic + (Math.random() - 0.5) * 20),
            uptime: Math.max(80, Math.min(100, system.uptime + (Math.random() - 0.49) * 0.1)),
          };
        })
      );

      // Update overview
      setSystemOverview((prev) => ({
        ...prev,
        avg_cpu: prev.avg_cpu + (Math.random() - 0.5) * 2,
        avg_memory: prev.avg_memory + (Math.random() - 0.5) * 1.5,
        total_traffic: prev.total_traffic + (Math.random() - 0.5) * 100,
      }));
    };

    const interval = setInterval(monitorSystems, 4000);
    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600";
      case "standby":
        return "bg-yellow-600";
      case "deploying":
        return "bg-blue-600";
      case "offline":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  const getThreatColor = (level: string) => {
    switch (level) {
      case "green":
        return "text-green-400";
      case "yellow":
        return "text-yellow-400";
      case "orange":
        return "text-orange-400";
      case "red":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "surveillance":
        return <Radar className="h-4 w-4" />;
      case "network":
        return <Wifi className="h-4 w-4" />;
      case "data":
        return <Database className="h-4 w-4" />;
      case "ai":
        return <Brain className="h-4 w-4" />;
      case "quantum":
        return <Zap className="h-4 w-4" />;
      case "cyber":
        return <Shield className="h-4 w-4" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  const deployAllSystems = () => {
    toast.success("🚀 ALL TACTICAL SYSTEMS DEPLOYED", {
      description: "19 background systems activated for maximum protection",
      duration: 6000,
    });

    setTacticalSystems((prev) =>
      prev.map((system) => ({
        ...system,
        status: "active",
        uptime: 100,
        threat_level: "green",
      }))
    );
  };

  return (
    <div className="space-y-6">
      {/* System Overview */}
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-black">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-3">
            <img
              src="/lovable-uploads/e2cc6708-58e6-4f52-b2ad-b98967ce3b7c.png"
              alt="Harmony of Gaia"
              className="w-8 h-8"
            />
            🚀 BACKGROUND TACTICAL SYSTEMS - 24/7 DEPLOYMENT
            <Satellite className="h-6 w-6 text-blue-400 animate-pulse" />
          </CardTitle>
          <p className="text-blue-400">
            19 Advanced Systems • Autonomous Operation • Real-time Deployment • Military
            Intelligence
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4 mb-6">
            <Card className="bg-green-900/30 border-green-500/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">
                  {systemOverview.active_systems}
                </div>
                <div className="text-xs text-muted-foreground">Active Systems</div>
              </CardContent>
            </Card>
            <Card className="bg-yellow-900/30 border-yellow-500/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  {systemOverview.standby_systems}
                </div>
                <div className="text-xs text-muted-foreground">Standby</div>
              </CardContent>
            </Card>
            <Card className="bg-blue-900/30 border-blue-500/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {systemOverview.deploying_systems}
                </div>
                <div className="text-xs text-muted-foreground">Deploying</div>
              </CardContent>
            </Card>
            <Card className="bg-purple-900/30 border-purple-500/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {systemOverview.total_uptime.toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground">Total Uptime</div>
              </CardContent>
            </Card>
            <Card className="bg-orange-900/30 border-orange-500/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-orange-400">
                  {systemOverview.avg_cpu.toFixed(1)}%
                </div>
                <div className="text-xs text-muted-foreground">Avg CPU</div>
              </CardContent>
            </Card>
            <Card className="bg-cyan-900/30 border-cyan-500/50">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-cyan-400">
                  {systemOverview.total_traffic.toFixed(0)}
                </div>
                <div className="text-xs text-muted-foreground">Network MB/s</div>
              </CardContent>
            </Card>
          </div>

          <div className="flex justify-center mb-6">
            <Button
              onClick={deployAllSystems}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg font-bold"
            >
              <PlayCircle className="h-5 w-5 mr-2" />
              DEPLOY ALL TACTICAL SYSTEMS
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tactical Systems Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tacticalSystems.map((system) => (
          <Card
            key={system.id}
            className="border-gray-500/30 bg-gradient-to-br from-black/50 to-gray-900/50"
          >
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {getCategoryIcon(system.category)}
                  <h4 className="font-semibold text-white text-sm">{system.name}</h4>
                </div>
                <Badge className={`${getStatusColor(system.status)} text-white text-xs`}>
                  {system.status.toUpperCase()}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div>
                  <div className="text-muted-foreground">Uptime</div>
                  <div className="text-green-400 font-bold">{system.uptime.toFixed(1)}%</div>
                </div>
                <div>
                  <div className="text-muted-foreground">Threat Level</div>
                  <div className={`font-bold ${getThreatColor(system.threat_level)}`}>
                    {system.threat_level.toUpperCase()}
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">CPU</span>
                  <span className="text-blue-400">{system.cpu_usage.toFixed(0)}%</span>
                </div>
                <Progress value={system.cpu_usage} className="h-1" />

                <div className="flex justify-between text-xs">
                  <span className="text-muted-foreground">Memory</span>
                  <span className="text-purple-400">{system.memory_usage.toFixed(0)}%</span>
                </div>
                <Progress value={system.memory_usage} className="h-1" />
              </div>

              <div className="text-green-300 text-xs">Last: {system.last_deployment}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Deployment Logs */}
      <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Activity className="h-5 w-5" />
            Real-Time Deployment Logs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {deploymentLogs.length === 0 ? (
              <div className="text-center text-muted-foreground py-4">
                Monitoring system deployments...
              </div>
            ) : (
              deploymentLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-2 rounded-lg bg-black/30 border border-gray-500/30"
                >
                  <div className="flex items-center gap-3">
                    {log.success ? (
                      <CheckCircle className="h-4 w-4 text-green-400" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-red-400" />
                    )}
                    <div>
                      <div className="font-semibold text-white text-sm">{log.action}</div>
                      <div className="text-xs text-muted-foreground">
                        {log.system} • {log.details}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs text-cyan-400">{log.timestamp.toLocaleTimeString()}</div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
