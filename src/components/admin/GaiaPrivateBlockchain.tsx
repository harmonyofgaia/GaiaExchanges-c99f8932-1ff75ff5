import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Network,
  Shield,
  Zap,
  Database,
  Cpu,
  Activity,
  Lock,
  Globe,
  Server,
  CheckCircle,
} from "lucide-react";

export function GaiaPrivateBlockchain() {
  const [blockchainStats, setBlockchainStats] = useState({
    networkStatus: "OPERATIONAL",
    totalNodes: 247,
    activeValidators: 21,
    currentBlockHeight: 1547892,
    transactionsPerSecond: 50000,
    networkHashRate: 987654321,
    securityLevel: "QUANTUM",
    consensusType: "Proof of Gaia",
    networkUptime: 99.99,
  });

  const [liveData, setLiveData] = useState({
    latestBlocks: [],
    recentTransactions: [],
    nodeStatus: [],
  });

  useEffect(() => {
    // Simulate live blockchain data updates
    const interval = setInterval(() => {
      setBlockchainStats((prev) => ({
        ...prev,
        currentBlockHeight:
          prev.currentBlockHeight + Math.floor(Math.random() * 3) + 1,
        transactionsPerSecond: Math.floor(Math.random() * 10000) + 45000,
        networkHashRate:
          prev.networkHashRate + Math.floor(Math.random() * 100000 - 50000),
      }));

      // Generate latest blocks
      const newBlocks = Array.from({ length: 5 }, (_, i) => ({
        height: blockchainStats.currentBlockHeight - i,
        hash: `0x${Math.random().toString(16).substr(2, 64)}`,
        timestamp: new Date(Date.now() - i * 2000).toISOString(),
        transactions: Math.floor(Math.random() * 500) + 100,
        validator: `Validator-${Math.floor(Math.random() * 21) + 1}`,
      }));

      setLiveData((prev) => ({
        ...prev,
        latestBlocks: newBlocks,
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, [blockchainStats.currentBlockHeight]);

  return (
    <div className="space-y-6">
      {/* Network Status Header */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400 text-2xl">
            <Network className="h-8 w-8" />
            🔗 GAIA PRIVATE BLOCKCHAIN NETWORK
          </CardTitle>
          <div className="flex gap-4 flex-wrap">
            <Badge className="bg-green-600 animate-pulse text-lg px-4 py-2">
              <CheckCircle className="h-4 w-4 mr-1" />
              {blockchainStats.networkStatus}
            </Badge>
            <Badge className="bg-blue-600 text-lg px-4 py-2">
              <Shield className="h-4 w-4 mr-1" />
              {blockchainStats.securityLevel}
            </Badge>
            <Badge className="bg-purple-600 text-lg px-4 py-2">
              <Zap className="h-4 w-4 mr-1" />
              {blockchainStats.consensusType}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Network Overview</TabsTrigger>
          <TabsTrigger value="blocks">Live Blocks</TabsTrigger>
          <TabsTrigger value="nodes">Node Management</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-green-500/20 bg-green-900/10">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Network className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400">
                    {blockchainStats.totalNodes}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Active Nodes
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-500/20 bg-blue-900/10">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Database className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-400">
                    {blockchainStats.currentBlockHeight.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Block Height
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/20 bg-purple-900/10">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Zap className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-400">
                    {blockchainStats.transactionsPerSecond.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">TPS</div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-orange-500/20 bg-orange-900/10">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Cpu className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-400">
                    {blockchainStats.networkUptime}%
                  </div>
                  <div className="text-sm text-muted-foreground">Uptime</div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Network Health */}
          <Card className="border-cyan-500/20 bg-cyan-900/10">
            <CardHeader>
              <CardTitle className="text-cyan-400">
                🔋 Network Health Status
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Consensus Participation</span>
                  <span className="text-green-400">98.7%</span>
                </div>
                <Progress value={98.7} className="h-3" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Network Security</span>
                  <span className="text-green-400">100%</span>
                </div>
                <Progress value={100} className="h-3" />
              </div>

              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Transaction Throughput</span>
                  <span className="text-blue-400">95.4%</span>
                </div>
                <Progress value={95.4} className="h-3" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="blocks" className="space-y-4">
          <Card className="border-blue-500/20 bg-blue-900/10">
            <CardHeader>
              <CardTitle className="text-blue-400">📦 Latest Blocks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {liveData.latestBlocks.map((block, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-black/20 rounded border border-blue-500/20"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                      <div>
                        <div className="font-bold text-blue-400">
                          Block #{block.height}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(block.timestamp).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-green-400">
                        {block.transactions} txs
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {block.validator}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nodes" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-green-500/20 bg-green-900/10">
              <CardHeader>
                <CardTitle className="text-green-400">
                  🖥️ Validator Nodes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {Array.from({ length: 5 }, (_, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-between p-3 bg-black/20 rounded"
                    >
                      <div className="flex items-center gap-2">
                        <Server className="h-4 w-4 text-green-400" />
                        <span className="font-medium">Validator-{i + 1}</span>
                      </div>
                      <Badge className="bg-green-600">ACTIVE</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-blue-500/20 bg-blue-900/10">
              <CardHeader>
                <CardTitle className="text-blue-400">🌐 Full Nodes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-4">
                  <Globe className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-400">226</div>
                  <div className="text-sm text-muted-foreground">
                    Full Nodes Online
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card className="border-red-500/20 bg-red-900/10">
            <CardHeader>
              <CardTitle className="text-red-400">
                🛡️ Security Protocols
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-black/20 rounded border border-red-500/20">
                  <Lock className="h-6 w-6 text-red-400 mb-2" />
                  <h4 className="font-bold text-red-400">Quantum Encryption</h4>
                  <p className="text-sm text-muted-foreground">
                    Post-quantum cryptographic protection
                  </p>
                </div>
                <div className="p-4 bg-black/20 rounded border border-orange-500/20">
                  <Shield className="h-6 w-6 text-orange-400 mb-2" />
                  <h4 className="font-bold text-orange-400">
                    Multi-Signature Validation
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    Advanced consensus security
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="border-purple-500/20 bg-purple-900/10">
            <CardHeader>
              <CardTitle className="text-purple-400">
                ⚡ Performance Metrics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-black/20 rounded">
                  <Activity className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-purple-400">0.5s</div>
                  <div className="text-sm text-muted-foreground">
                    Block Time
                  </div>
                </div>
                <div className="text-center p-4 bg-black/20 rounded">
                  <Zap className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-yellow-400">
                    0.001s
                  </div>
                  <div className="text-sm text-muted-foreground">Finality</div>
                </div>
                <div className="text-center p-4 bg-black/20 rounded">
                  <Cpu className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-xl font-bold text-green-400">50K+</div>
                  <div className="text-sm text-muted-foreground">Max TPS</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Control Actions */}
      <Card className="border-yellow-500/30 bg-yellow-900/20">
        <CardHeader>
          <CardTitle className="text-yellow-400">
            🎛️ Blockchain Controls
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="bg-green-600 hover:bg-green-700 h-16 flex flex-col gap-1">
              <Network className="h-5 w-5" />
              <span className="text-xs">Add Node</span>
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 h-16 flex flex-col gap-1">
              <Database className="h-5 w-5" />
              <span className="text-xs">Sync Chain</span>
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700 h-16 flex flex-col gap-1">
              <Shield className="h-5 w-5" />
              <span className="text-xs">Security Audit</span>
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700 h-16 flex flex-col gap-1">
              <Zap className="h-5 w-5" />
              <span className="text-xs">Optimize</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
