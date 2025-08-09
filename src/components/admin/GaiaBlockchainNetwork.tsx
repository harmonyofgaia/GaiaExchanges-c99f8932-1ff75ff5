import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";

interface BlockchainNode {
  id: string;
  status: "online" | "offline" | "syncing";
  location: string;
  power: number;
  connections: number;
}

interface NetworkStats {
  totalNodes: number;
  activeNodes: number;
  dominanceLevel: number;
  blockHeight: number;
  hashRate: string;
  networkSecurity: number;
}

export function GaiaBlockchainNetwork() {
  const [networkActive, setNetworkActive] = useState(false);
  const [nodes, setNodes] = useState<BlockchainNode[]>([
    {
      id: "gaia-001",
      status: "offline",
      location: "North America",
      power: 0,
      connections: 0,
    },
    {
      id: "gaia-002",
      status: "offline",
      location: "Europe",
      power: 0,
      connections: 0,
    },
    {
      id: "gaia-003",
      status: "offline",
      location: "Asia Pacific",
      power: 0,
      connections: 0,
    },
    {
      id: "gaia-004",
      status: "offline",
      location: "South America",
      power: 0,
      connections: 0,
    },
    {
      id: "gaia-005",
      status: "offline",
      location: "Africa",
      power: 0,
      connections: 0,
    },
    {
      id: "gaia-006",
      status: "offline",
      location: "Oceania",
      power: 0,
      connections: 0,
    },
  ]);

  const [stats, setStats] = useState<NetworkStats>({
    totalNodes: 6,
    activeNodes: 0,
    dominanceLevel: 0,
    blockHeight: 1337000,
    hashRate: "0 TH/s",
    networkSecurity: 0,
  });

  useEffect(() => {
    if (networkActive) {
      const interval = setInterval(() => {
        setNodes((prevNodes) =>
          prevNodes.map((node) => ({
            ...node,
            status:
              node.status === "offline"
                ? "syncing"
                : node.status === "syncing"
                  ? "online"
                  : "online",
            power: Math.min(100, node.power + Math.random() * 5),
            connections: Math.floor(Math.random() * 50) + 10,
          })),
        );

        setStats((prevStats) => ({
          ...prevStats,
          activeNodes: nodes.filter((n) => n.status === "online").length,
          dominanceLevel: Math.min(
            100,
            prevStats.dominanceLevel + Math.random() * 2,
          ),
          blockHeight: prevStats.blockHeight + Math.floor(Math.random() * 3),
          hashRate: `${(Math.random() * 1000 + 500).toFixed(1)} TH/s`,
          networkSecurity: Math.min(
            100,
            prevStats.networkSecurity + Math.random() * 1.5,
          ),
        }));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [networkActive, nodes]);

  const activateNetwork = () => {
    setNetworkActive(true);
    toast.success("🌍 Gaia Private Blockchain Network Activated", {
      description:
        "Establishing global node connections and dominance protocols",
    });
  };

  const achieveDominance = () => {
    setStats((prev) => ({
      ...prev,
      dominanceLevel: 100,
      networkSecurity: 100,
      hashRate: "9999.9 TH/s",
    }));

    setNodes((prevNodes) =>
      prevNodes.map((node) => ({
        ...node,
        status: "online" as const,
        power: 100,
        connections: 99,
      })),
    );

    toast.success("👑 NETWORK DOMINANCE ACHIEVED", {
      description: "Gaia Blockchain Network now controls global infrastructure",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online":
        return "bg-green-500";
      case "syncing":
        return "bg-yellow-500";
      case "offline":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                🌍 Gaia Private Blockchain Network
                <Badge
                  className={networkActive ? "bg-green-500" : "bg-gray-500"}
                >
                  {networkActive ? "ACTIVE" : "DORMANT"}
                </Badge>
              </CardTitle>
              <CardDescription>
                Global blockchain infrastructure for world-wide green finance
                dominance
              </CardDescription>
            </div>
            <div className="flex gap-2">
              {!networkActive ? (
                <Button onClick={activateNetwork} variant="default">
                  🚀 Activate Network
                </Button>
              ) : (
                <Button onClick={achieveDominance} variant="outline">
                  👑 Achieve Dominance
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-blue-600">
                {stats.activeNodes}/{stats.totalNodes}
              </div>
              <div className="text-sm text-blue-700 dark:text-blue-300">
                Active Nodes
              </div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-purple-600">
                {stats.dominanceLevel.toFixed(1)}%
              </div>
              <div className="text-sm text-purple-700 dark:text-purple-300">
                Network Dominance
              </div>
            </div>
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-green-600">
                {stats.hashRate}
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">
                Hash Rate
              </div>
            </div>
            <div className="bg-orange-50 dark:bg-orange-950 p-4 rounded-lg text-center">
              <div className="text-2xl font-bold text-orange-600">
                {stats.networkSecurity.toFixed(1)}%
              </div>
              <div className="text-sm text-orange-700 dark:text-orange-300">
                Security Level
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-3">🌍 Global Node Network</h4>
              <div className="space-y-2">
                {nodes.map((node) => (
                  <div key={node.id} className="border rounded-lg p-3">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Badge className={getStatusColor(node.status)}>
                          {node.status}
                        </Badge>
                        <span className="font-medium text-sm">{node.id}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {node.location}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs">
                      <div>Power: {node.power.toFixed(1)}%</div>
                      <div>Connections: {node.connections}</div>
                    </div>
                    <Progress value={node.power} className="h-2 mt-2" />
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-3">📊 Network Statistics</h4>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">
                      Network Dominance
                    </span>
                    <span className="text-sm">
                      {stats.dominanceLevel.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={stats.dominanceLevel} className="h-3" />
                </div>

                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium">Security Level</span>
                    <span className="text-sm">
                      {stats.networkSecurity.toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={stats.networkSecurity} className="h-3" />
                </div>

                <div className="bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                  <div className="text-center">
                    <div className="text-lg font-bold">Block Height</div>
                    <div className="text-2xl font-mono text-primary">
                      {stats.blockHeight.toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {stats.dominanceLevel >= 100 && (
            <div className="bg-gradient-to-r from-purple-50 to-green-50 dark:from-purple-950 dark:to-green-950 p-6 rounded-lg border-2 border-purple-200">
              <h4 className="font-bold text-purple-700 dark:text-purple-300 mb-3 text-center">
                👑 WORLD DOMINATION ACHIEVED 👑
              </h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-lg font-bold text-green-600">100%</div>
                  <div className="text-xs text-green-700">Global Control</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-purple-600">∞</div>
                  <div className="text-xs text-purple-700">Network Power</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-blue-600">
                    ULTIMATE
                  </div>
                  <div className="text-xs text-blue-700">Security</div>
                </div>
                <div>
                  <div className="text-lg font-bold text-orange-600">
                    SUPREME
                  </div>
                  <div className="text-xs text-orange-700">Dominance</div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
