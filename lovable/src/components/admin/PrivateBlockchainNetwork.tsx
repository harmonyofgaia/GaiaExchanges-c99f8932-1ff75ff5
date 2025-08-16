import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Database, Network, Shield, Cpu, Zap, Activity } from "lucide-react";

export function PrivateBlockchainNetwork() {
  const [networkStats, setNetworkStats] = useState({
    nodes: 247,
    transactions: 15847,
    hashRate: 987654,
    networkHealth: 99.8,
    securityLevel: 100,
    dataIntegrity: 100,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setNetworkStats((prev) => ({
        ...prev,
        transactions: prev.transactions + Math.floor(Math.random() * 50),
        hashRate: prev.hashRate + Math.floor(Math.random() * 10000 - 5000),
        networkHealth: Math.max(
          95,
          Math.min(100, prev.networkHealth + (Math.random() - 0.5) * 0.2)
        )
      }));
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      <Card className="border-cyan-500/30 bg-gradient-to-r from-cyan-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-400">
            <Database className="h-6 w-6" />
            🔗 PRIVATE GAiA BLOCKCHAIN NETWORK
          </CardTitle>
          <div className="flex gap-4">
            <Badge className="bg-green-600 animate-pulse">OPERATIONAL</Badge>
            <Badge className="bg-blue-600">QUANTUM SECURED</Badge>
            <Badge className="bg-purple-600">ULTRA-FAST</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-green-900/20 rounded border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">{networkStats.nodes}</div>
              <div className="text-sm text-muted-foreground">Active Nodes</div>
            </div>
            <div className="text-center p-4 bg-blue-900/20 rounded border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">
                {networkStats.transactions.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Transactions</div>
            </div>
            <div className="text-center p-4 bg-purple-900/20 rounded border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">
                {networkStats.hashRate.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Hash Rate (H/s)</div>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-green-400">Network Health</span>
                <span className="text-green-400">{networkStats.networkHealth.toFixed(1)}%</span>
              </div>
              <Progress value={networkStats.networkHealth} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-blue-400">Security Level</span>
                <span className="text-blue-400">{networkStats.securityLevel}%</span>
              </div>
              <Progress value={networkStats.securityLevel} className="h-2" />
            </div>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-purple-400">Data Integrity</span>
                <span className="text-purple-400">{networkStats.dataIntegrity}%</span>
              </div>
              <Progress value={networkStats.dataIntegrity} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-green-500/20 bg-green-900/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Network className="h-5 w-5" />
              Network Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Consensus Algorithm:</span>
              <span className="text-green-400 font-bold">Quantum Proof of Stake</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Block Time:</span>
              <span className="text-blue-400 font-bold">0.5 seconds</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Transaction Speed:</span>
              <span className="text-purple-400 font-bold">50,000 TPS</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Network Type:</span>
              <span className="text-cyan-400 font-bold">Private & Secure</span>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-blue-900/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Shield className="h-5 w-5" />
              Security Features
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Encryption:</span>
              <span className="text-green-400 font-bold">Quantum-Resistant</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Authentication:</span>
              <span className="text-blue-400 font-bold">Multi-Layer</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Data Privacy:</span>
              <span className="text-purple-400 font-bold">Zero-Knowledge</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-muted-foreground">Immutability:</span>
              <span className="text-cyan-400 font-bold">Absolute</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-purple-500/20 bg-purple-900/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Activity className="h-5 w-5" />
            Live Network Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {Array.from({ length: 5 }, (_, i) => (
              <div
                key={i}
                className="flex items-center justify-between p-3 bg-black/20 rounded border border-purple-500/20"
              >
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm">Block #{(15847 + i).toLocaleString()} mined</span>
                </div>
                <div className="text-sm text-purple-400">
                  {Math.floor(Math.random() * 100) + 50} transactions
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Button className="bg-green-600 hover:bg-green-700">
          <Cpu className="h-4 w-4 mr-2" />
          Node Status
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Network className="h-4 w-4 mr-2" />
          Network Map
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Shield className="h-4 w-4 mr-2" />
          Security Audit
        </Button>
        <Button className="bg-cyan-600 hover:bg-cyan-700">
          <Zap className="h-4 w-4 mr-2" />
          Performance
        </Button>
      </div>
    </div>
  );
}
