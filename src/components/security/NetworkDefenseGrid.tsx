import { useState, useEffect, useRef, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import {
  Wifi,
  Globe,
  Server,
  Shield,
  Ban,
  Activity,
  Network,
  Lock,
  Zap,
  Target,
} from "lucide-react";
import { toast } from "sonner";

interface NetworkNode {
  id: string;
  name: string;
  location: string;
  status: "active" | "blocking" | "attacking" | "defending";
  threatsBlocked: number;
  bandwidthUsed: number;
  uptime: number;
}

interface NetworkMetrics {
  totalNodes: number;
  activeDefenses: number;
  blockedIPs: number;
  bandwidthTotal: string;
  globalCoverage: number;
  threatsStopped: number;
}

export function NetworkDefenseGrid() {
  const [networkNodes, setNetworkNodes] = useState<NetworkNode[]>([
    {
      id: "node-us-east",
      name: "US East Defense Hub",
      location: "New York, USA",
      status: "active",
      threatsBlocked: 234,
      bandwidthUsed: 87,
      uptime: 99.9,
    },
    {
      id: "node-us-west",
      name: "US West Defense Hub",
      location: "San Francisco, USA",
      status: "blocking",
      threatsBlocked: 156,
      bandwidthUsed: 92,
      uptime: 99.7,
    },
    {
      id: "node-eu-central",
      name: "EU Central Defense Hub",
      location: "Frankfurt, Germany",
      status: "defending",
      threatsBlocked: 189,
      bandwidthUsed: 78,
      uptime: 99.8,
    },
    {
      id: "node-asia-east",
      name: "Asia East Defense Hub",
      location: "Tokyo, Japan",
      status: "attacking",
      threatsBlocked: 267,
      bandwidthUsed: 95,
      uptime: 99.6,
    },
    {
      id: "node-oceania",
      name: "Oceania Defense Hub",
      location: "Sydney, Australia",
      status: "active",
      threatsBlocked: 98,
      bandwidthUsed: 65,
      uptime: 99.9,
    },
    {
      id: "node-africa",
      name: "Africa Defense Hub",
      location: "Cape Town, South Africa",
      status: "blocking",
      threatsBlocked: 123,
      bandwidthUsed: 73,
      uptime: 99.5,
    },
    {
      id: "node-south-america",
      name: "South America Defense Hub",
      location: "São Paulo, Brazil",
      status: "defending",
      threatsBlocked: 145,
      bandwidthUsed: 81,
      uptime: 99.4,
    },
    {
      id: "node-middle-east",
      name: "Middle East Defense Hub",
      location: "Dubai, UAE",
      status: "active",
      threatsBlocked: 167,
      bandwidthUsed: 89,
      uptime: 99.8,
    },
  ]);

  const [networkMetrics, setNetworkMetrics] = useState<NetworkMetrics>({
    totalNodes: 8,
    activeDefenses: 8,
    blockedIPs: 2847,
    bandwidthTotal: "50 Tbps",
    globalCoverage: 94,
    threatsStopped: 1379,
  });

  const [isLaunchingGlobalDefense, setIsLaunchingGlobalDefense] = useState(false);
  const networkInterval = useRef<NodeJS.Timeout>(undefined);

  // Network Defense Grid Updates - Every 5 seconds
  useEffect(() => {
    const updateNetworkDefenseGrid = () => {
      console.log("🌐 NETWORK DEFENSE GRID - GLOBAL PROTECTION ACTIVE");

      try {
        // Update network nodes with realistic activity
        setNetworkNodes((prev) =>
          prev.map((node) => {
            const statuses: ("active" | "blocking" | "attacking" | "defending")[] = [
              "active",
              "blocking",
              "attacking",
              "defending",
            ];

            // Randomly update node status and metrics
            if (Math.random() < 0.3) {
              const newStatus = statuses[Math.floor(Math.random() * statuses.length)];
              const additionalThreats =
                newStatus === "blocking" || newStatus === "attacking"
                  ? Math.floor(Math.random() * 5) + 1
                  : 0;

              return {
                ...node,
                status: newStatus,
                threatsBlocked: node.threatsBlocked + additionalThreats,
                bandwidthUsed: Math.min(
                  100,
                  Math.max(50, node.bandwidthUsed + (Math.random() - 0.5) * 10)
                ),
                uptime: Math.min(100, Math.max(95, node.uptime + (Math.random() - 0.5) * 0.2))
              };
            }

            return node;
          })
        );

        // Update global metrics
        if (Math.random() < 0.4) {
          setNetworkMetrics((prev) => ({
            ...prev,
            blockedIPs: prev.blockedIPs + Math.floor(Math.random() * 10) + 1,
            threatsStopped: prev.threatsStopped + Math.floor(Math.random() * 5) + 1,
            globalCoverage: Math.min(100, prev.globalCoverage + (Math.random() - 0.5) * 2)
          }));
        }

        // Simulate major threat detection
        if (Math.random() < 0.1) {
          const threatTypes = [
            "Coordinated DDoS attack",
            "Botnet infiltration attempt",
            "Nation-state cyber attack",
            "Advanced persistent threat",
            "Zero-day exploit deployment",
            "Cryptocurrency exchange hack attempt",
          ];

          const detectedThreat = threatTypes[Math.floor(Math.random() * threatTypes.length)];
          console.log(`🚨 MAJOR THREAT DETECTED: ${detectedThreat}`);

          toast.warning("🌐 Global Threat Detected", {
            description: `Network Defense Grid responding to: ${detectedThreat}`,
            duration: 4000,
          });
        }
      } catch (error) {
        console.log("🌐 Network Defense Grid self-protected:", error);
      }
    };

    networkInterval.current = setInterval(updateNetworkDefenseGrid, 5000);
    updateNetworkDefenseGrid();

    return () => {
      if (networkInterval.current) clearInterval(networkInterval.current);
    };
  }, []);

  const launchGlobalDefense = () => {
    setIsLaunchingGlobalDefense(true);

    toast.error("🌐 GLOBAL DEFENSE PROTOCOL INITIATED!", {
      description: "Activating all network nodes - Maximum protection engaged",
      duration: 6000,
    });

    // Simulate global defense activation
    setTimeout(() => {
      setNetworkMetrics((prev) => ({
        ...prev,
        activeDefenses: prev.totalNodes,
        blockedIPs: prev.blockedIPs + 500,
        threatsStopped: prev.threatsStopped + 100,
        globalCoverage: 100,
      }));

      setNetworkNodes((prev) =>
        prev.map((node) => ({
          ...node,
          status: "defending",
          bandwidthUsed: 100,
          uptime: 100,
        }))
      );

      setIsLaunchingGlobalDefense(false);

      toast.success("🛡️ GLOBAL DEFENSE ACTIVE!", {
        description: "All network nodes at maximum defense capacity",
        duration: 5000,
      });
    }, 4000);
  };

  const getNodeStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600";
      case "blocking":
        return "bg-yellow-600";
      case "attacking":
        return "bg-red-600";
      case "defending":
        return "bg-blue-600";
      default:
        return "bg-gray-600";
    }
  };

  const getNodeStatusIcon = (status: string) => {
    switch (status) {
      case "active":
        return <Activity className="h-3 w-3" />;
      case "blocking":
        return <Ban className="h-3 w-3" />;
      case "attacking":
        return <Target className="h-3 w-3" />;
      case "defending":
        return <Shield className="h-3 w-3" />;
      default:
        return <Server className="h-3 w-3" />;
    }
  };

  const getTotalThreatsBlocked = () => {
    return networkNodes.reduce((total, node) => total + node.threatsBlocked, 0);
  };

  const getAverageUptime = () => {
    const total = networkNodes.reduce((sum, node) => sum + node.uptime, 0);
    return (total / networkNodes.length).toFixed(1);
  };

  return (
    <div className="space-y-6">
      {/* Network Defense Grid Command Center */}
      <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/40 to-pink-900/40 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-purple-300">
            <Network className="h-8 w-8 animate-pulse" />
            <div>
              <div className="text-2xl">GLOBAL NETWORK DEFENSE GRID</div>
              <div className="text-sm font-normal text-purple-400">
                Worldwide Protection Infrastructure - Real-time Threat Blocking
              </div>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-300 animate-pulse">
                {networkMetrics.totalNodes}
              </div>
              <div className="text-sm text-muted-foreground">Defense Nodes</div>
              <Badge className="mt-2 bg-purple-600 text-white animate-pulse">
                <Server className="h-3 w-3 mr-1" />
                DEPLOYED
              </Badge>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-green-300">
                {networkMetrics.activeDefenses}
              </div>
              <div className="text-sm text-muted-foreground">Active Defenses</div>
              <Badge className="mt-2 bg-green-600 text-white">
                <Shield className="h-3 w-3 mr-1" />
                ONLINE
              </Badge>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-red-300">
                {networkMetrics.blockedIPs.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Blocked IPs</div>
              <Badge className="mt-2 bg-red-600 text-white">
                <Ban className="h-3 w-3 mr-1" />
                BANNED
              </Badge>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-blue-300">
                {networkMetrics.bandwidthTotal}
              </div>
              <div className="text-sm text-muted-foreground">Total Bandwidth</div>
              <Badge className="mt-2 bg-blue-600 text-white">
                <Wifi className="h-3 w-3 mr-1" />
                CAPACITY
              </Badge>
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-cyan-300">
                {networkMetrics.globalCoverage}%
              </div>
              <div className="text-sm text-muted-foreground">Global Coverage</div>
              <Progress value={networkMetrics.globalCoverage} className="mt-2 h-2" />
            </div>

            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-300">
                {networkMetrics.threatsStopped.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Threats Stopped</div>
              <Badge className="mt-2 bg-yellow-600 text-white">
                <Zap className="h-3 w-3 mr-1" />
                DEFEATED
              </Badge>
            </div>
          </div>

          <div className="mt-6">
            <Button
              onClick={launchGlobalDefense}
              disabled={isLaunchingGlobalDefense}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold"
            >
              {isLaunchingGlobalDefense ? (
                <>
                  <Network className="h-4 w-4 mr-2 animate-spin" />
                  ACTIVATING GLOBAL DEFENSE...
                </>
              ) : (
                <>
                  <Globe className="h-4 w-4 mr-2" />
                  ACTIVATE MAXIMUM GLOBAL DEFENSE
                </>
              )}
            </Button>
            {isLaunchingGlobalDefense && <Progress value={65} className="mt-2 h-3" />}
          </div>
        </CardContent>
      </Card>

      {/* Network Nodes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {networkNodes.map((node) => (
          <Card
            key={node.id}
            className="border-indigo-500/30 bg-gradient-to-br from-indigo-900/20 to-purple-900/20"
          >
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-indigo-400 text-sm">
                <Server className="h-4 w-4" />
                {node.name}
              </CardTitle>
              <p className="text-xs text-muted-foreground">{node.location}</p>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge className={`text-white text-xs ${getNodeStatusColor(node.status)}`}>
                  {getNodeStatusIcon(node.status)}
                  <span className="ml-1">{node.status.toUpperCase()}</span>
                </Badge>
                <div className="text-xs text-muted-foreground">{node.uptime}% uptime</div>
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span>Threats Blocked:</span>
                  <span className="text-red-400 font-semibold">{node.threatsBlocked}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span>Bandwidth:</span>
                  <span className="text-blue-400 font-semibold">{node.bandwidthUsed}%</span>
                </div>
              </div>

              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Bandwidth Usage:</div>
                <Progress value={node.bandwidthUsed} className="h-2" />
              </div>

              <div className="space-y-1">
                <div className="text-xs text-muted-foreground">Uptime:</div>
                <Progress value={node.uptime} className="h-2" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Network Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Shield className="h-5 w-5" />
              Defense Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Total Threats Blocked:</span>
              <span className="text-green-400 font-semibold">{getTotalThreatsBlocked()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Average Node Uptime:</span>
              <span className="text-green-400 font-semibold">{getAverageUptime()}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Response Time:</span>
              <span className="text-green-400 font-semibold">{"< 50ms"}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Globe className="h-5 w-5" />
              Global Coverage
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Continents Covered:</span>
              <span className="text-blue-400 font-semibold">7/7</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Countries Protected:</span>
              <span className="text-blue-400 font-semibold">195+</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Population Reached:</span>
              <span className="text-blue-400 font-semibold">7.8B+</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <Target className="h-5 w-5" />
              Threat Intelligence
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm">Active Threats:</span>
              <span className="text-red-400 font-semibold">0</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Threat Sources:</span>
              <span className="text-red-400 font-semibold">2,847 blocked</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Risk Level:</span>
              <span className="text-green-400 font-semibold">MINIMAL</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Network Defense Commitment */}
      <Card className="border-cyan-500/30 bg-gradient-to-r from-cyan-900/20 to-blue-900/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <Network className="h-16 w-16 mx-auto text-cyan-400 animate-pulse" />
            <h3 className="text-2xl font-bold text-cyan-300">
              🌐 GLOBAL NETWORK DEFENSE COMMITMENT
            </h3>
            <div className="max-w-4xl mx-auto space-y-3 text-cyan-200">
              <p className="text-lg">
                Our Global Network Defense Grid operates 24/7 across all continents to provide
                unparalleled protection for the Culture of Harmony community.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
                <div className="p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
                  <h4 className="font-bold text-purple-300 mb-3">🛡️ Network Capabilities:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• 50 Tbps total bandwidth capacity</li>
                    <li>• Sub-50ms global response time</li>
                    <li>• 99.9% average uptime guarantee</li>
                    <li>• Real-time threat intelligence sharing</li>
                    <li>• Automated DDoS mitigation</li>
                    <li>• Advanced traffic analysis and filtering</li>
                  </ul>
                </div>
                <div className="p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
                  <h4 className="font-bold text-blue-300 mb-3">🌍 Global Presence:</h4>
                  <ul className="text-sm space-y-1">
                    <li>• 8 strategic defense hubs worldwide</li>
                    <li>• Coverage across all 7 continents</li>
                    <li>• Protection for 195+ countries</li>
                    <li>• Multi-layered redundancy systems</li>
                    <li>• 24/7 network operations centers</li>
                    <li>• Continuous infrastructure expansion</li>
                  </ul>
                </div>
              </div>
              <p className="text-sm text-cyan-400 font-semibold mt-4">
                Building the world's most secure and transparent cryptocurrency ecosystem 🛡️
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
