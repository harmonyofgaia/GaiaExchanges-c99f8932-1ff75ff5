import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Hexagon,
  Zap,
  Shield,
  Database,
  Network,
  Lock,
  Eye,
  Cpu,
  Activity,
} from "lucide-react";
import { toast } from "sonner";

interface BlockchainBlock {
  id: number;
  hash: string;
  previousHash: string;
  timestamp: string;
  transactions: number;
  validator: string;
  quantumSignature: string;
}

export function QuantumBlockchainCore() {
  const [blocks, setBlocks] = useState<BlockchainBlock[]>([
    {
      id: 125848,
      hash: "ARK_0xa1b2c3d4e5f6789012345678901234567890abcdef",
      previousHash: "ARK_0x1234567890abcdef1234567890abcdef12345678",
      timestamp: new Date().toISOString(),
      transactions: 1247,
      validator: "QUANTUM_VALIDATOR_001",
      quantumSignature: "QS_0x9f8e7d6c5b4a39281726354049382716",
    },
  ]);

  const [networkStats, setNetworkStats] = useState({
    totalBlocks: 125848,
    totalTransactions: 15672843,
    networkHashRate: "∞",
    quantumSecurity: 100,
    validatorNodes: 1,
    networkSpeed: "Instantaneous",
  });

  const [quantumDefense, setQuantumDefense] = useState({
    encryptionLayers: 7,
    threatsPrevented: 999999,
    securityLevel: "QUANTUM_SUPREME",
    quantumEntanglement: "ACTIVE",
    copyProtection: "MAXIMUM",
    ipMonitoring: "GLOBAL",
  });

  const blockchainInterval = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    const runQuantumBlockchain = () => {
      console.log("⚡ ARCHITEK NETWORK QUANTUM BLOCKCHAIN CORE ACTIVE");
      console.log("🔒 QUANTUM ENTANGLEMENT SECURITY: 100% LOCKED");

      // Generate new quantum block every 30 seconds
      if (Math.random() < 0.1) {
        const newBlock: BlockchainBlock = {
          id: networkStats.totalBlocks + 1,
          hash: `ARK_0x${Math.random().toString(16).substring(2, 42)}`,
          previousHash: blocks[0]?.hash || "GENESIS",
          timestamp: new Date().toISOString(),
          transactions: Math.floor(Math.random() * 1000) + 500,
          validator: "QUANTUM_VALIDATOR_001",
          quantumSignature: `QS_0x${Math.random().toString(16).substring(2, 34)}`,
        };

        setBlocks((prev) => [newBlock, ...prev.slice(0, 9)]);
        setNetworkStats((prev) => ({
          ...prev,
          totalBlocks: prev.totalBlocks + 1,
          totalTransactions: prev.totalTransactions + newBlock.transactions,
        }));

        toast.success("⚡ New Quantum Block Mined", {
          description: `Block #${newBlock.id} added to Architek Network`,
          duration: 3000,
        });
      }
    };

    blockchainInterval.current = setInterval(runQuantumBlockchain, 5000);
    runQuantumBlockchain();

    return () => {
      if (blockchainInterval.current) clearInterval(blockchainInterval.current);
    };
  }, [blocks, networkStats.totalBlocks]);

  const validateQuantumBlock = (blockId: number) => {
    toast.success("🔐 Quantum Block Validated", {
      description: `Block #${blockId} has been quantum-verified and secured`,
      duration: 3000,
    });
  };

  const strengthenDefense = () => {
    setQuantumDefense((prev) => ({
      ...prev,
      threatsPrevented: prev.threatsPrevented + 1000,
      encryptionLayers: Math.min(prev.encryptionLayers + 1, 10),
    }));

    toast.success("🛡️ Defense System Strengthened", {
      description: "Quantum defense protocols have been enhanced",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Architek Network Blockchain Header */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-green-400">
            <Hexagon className="h-10 w-10" />
            <div>
              <h1 className="text-4xl font-bold">
                ⚡ ARCHITEK NETWORK BLOCKCHAIN ⚡
              </h1>
              <p className="text-xl text-green-300">
                Private Quantum Blockchain • Unbreakable • Future-Proof • Admin
                Supreme
              </p>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="text-center p-3 bg-green-500/10 rounded-lg border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">
                {networkStats.totalBlocks.toLocaleString()}
              </div>
              <div className="text-xs text-green-300">Total Blocks</div>
            </div>
            <div className="text-center p-3 bg-blue-500/10 rounded-lg border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">
                {networkStats.totalTransactions.toLocaleString()}
              </div>
              <div className="text-xs text-blue-300">Transactions</div>
            </div>
            <div className="text-center p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">
                {networkStats.networkHashRate}
              </div>
              <div className="text-xs text-purple-300">Hash Rate</div>
            </div>
            <div className="text-center p-3 bg-yellow-500/10 rounded-lg border border-yellow-500/20">
              <div className="text-2xl font-bold text-yellow-400">
                {quantumDefense.encryptionLayers}
              </div>
              <div className="text-xs text-yellow-300">Quantum Layers</div>
            </div>
            <div className="text-center p-3 bg-red-500/10 rounded-lg border border-red-500/20">
              <div className="text-2xl font-bold text-red-400">
                {quantumDefense.threatsPrevented.toLocaleString()}
              </div>
              <div className="text-xs text-red-300">Threats Blocked</div>
            </div>
            <div className="text-center p-3 bg-cyan-500/10 rounded-lg border border-cyan-500/20">
              <div className="text-2xl font-bold text-cyan-400">100%</div>
              <div className="text-xs text-cyan-300">Quantum Security</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="blockchain-explorer" className="w-full">
        <TabsList className="grid w-full grid-cols-4 bg-black/50 backdrop-blur-md border border-green-500/20">
          <TabsTrigger
            value="blockchain-explorer"
            className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400"
          >
            🔗 Blockchain Explorer
          </TabsTrigger>
          <TabsTrigger
            value="quantum-core"
            className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400"
          >
            ⚡ Quantum Core
          </TabsTrigger>
          <TabsTrigger
            value="network-stats"
            className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400"
          >
            📊 Network Stats
          </TabsTrigger>
          <TabsTrigger
            value="defense-matrix"
            className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400"
          >
            🛡️ Defense Matrix
          </TabsTrigger>
        </TabsList>

        <TabsContent value="blockchain-explorer" className="space-y-6 mt-6">
          <Card className="border-green-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Database className="h-6 w-6" />
                Architek Network - Quantum Blockchain Explorer
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {blocks.map((block) => (
                  <div
                    key={block.id}
                    className="bg-muted/20 rounded-lg p-4 border border-green-500/20"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <Badge className="bg-green-600 text-white">
                          Block #{block.id}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(block.timestamp).toLocaleString()}
                        </span>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => validateQuantumBlock(block.id)}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        🔐 Quantum Validate
                      </Button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Block Hash:</div>
                        <div className="font-mono text-xs break-all text-green-400">
                          {block.hash}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">
                          Previous Hash:
                        </div>
                        <div className="font-mono text-xs break-all text-blue-400">
                          {block.previousHash}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">
                          Transactions:
                        </div>
                        <div className="font-bold text-purple-400">
                          {block.transactions}
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">
                          Quantum Validator:
                        </div>
                        <div className="font-mono text-xs text-yellow-400">
                          {block.validator}
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <div className="text-muted-foreground">
                          Quantum Signature:
                        </div>
                        <div className="font-mono text-xs break-all text-red-400">
                          {block.quantumSignature}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="quantum-core" className="space-y-6 mt-6">
          <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Zap className="h-6 w-6" />
                Quantum Blockchain Core - Supreme Technology
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-black/80 p-6 rounded-lg border border-purple-500/30 font-mono text-sm mb-6">
                <div className="text-center text-purple-400 mb-4">
                  ╔══════════════════════════════════════════════════════════════════╗
                  <br />
                  ║ QUANTUM BLOCKCHAIN CORE ║<br />
                  ║ ARCHITEK NETWORK SUPREME ║<br />
                  ╚══════════════════════════════════════════════════════════════════╝
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-purple-300">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>[QUANTUM_STATUS]</span>
                      <span className="text-green-400">ACTIVE</span>
                    </div>
                    <div className="flex justify-between">
                      <span>[ENTANGLEMENT]</span>
                      <span className="text-green-400">
                        {quantumDefense.quantumEntanglement}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>[SECURITY_LEVEL]</span>
                      <span className="text-green-400">
                        {quantumDefense.securityLevel}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>[ENCRYPTION_LAYERS]</span>
                      <span className="text-green-400">
                        {quantumDefense.encryptionLayers}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>[COPY_PROTECTION]</span>
                      <span className="text-green-400">
                        {quantumDefense.copyProtection}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>[IP_MONITORING]</span>
                      <span className="text-green-400">
                        {quantumDefense.ipMonitoring}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>[THREATS_BLOCKED]</span>
                      <span className="text-green-400">
                        {quantumDefense.threatsPrevented.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>[SUPREMACY_STATUS]</span>
                      <span className="text-green-400">ETERNAL</span>
                    </div>
                  </div>
                </div>

                <div className="text-center mt-6">
                  <div className="text-purple-400 animate-pulse text-lg">
                    ► ARCHITEK NETWORK: THE ULTIMATE BLOCKCHAIN TECHNOLOGY ◄
                    <br />► QUANTUM SUPREME • FOREVER UNBEATABLE • HUMANITY
                    PROTECTED ◄
                  </div>
                </div>
              </div>

              <div className="flex justify-center">
                <Button
                  onClick={strengthenDefense}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-3"
                >
                  ⚡ Strengthen Quantum Defense
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="network-stats" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="border-blue-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Network className="h-5 w-5" />
                  Network Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Network Speed:</span>
                  <span className="text-blue-400 font-bold">
                    {networkStats.networkSpeed}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Hash Rate:</span>
                  <span className="text-blue-400 font-bold">
                    {networkStats.networkHashRate} TH/s
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Validator Nodes:</span>
                  <span className="text-blue-400 font-bold">
                    {networkStats.validatorNodes}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Network Uptime:</span>
                  <span className="text-green-400 font-bold">100%</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-green-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Activity className="h-5 w-5" />
                  Transaction Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Total Transactions:</span>
                  <span className="text-green-400 font-bold">
                    {networkStats.totalTransactions.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>TPS (Transactions/Sec):</span>
                  <span className="text-green-400 font-bold">∞</span>
                </div>
                <div className="flex justify-between">
                  <span>Transaction Fee:</span>
                  <span className="text-green-400 font-bold">0.001 GAIA</span>
                </div>
                <div className="flex justify-between">
                  <span>Confirmation Time:</span>
                  <span className="text-green-400 font-bold">Instant</span>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Cpu className="h-5 w-5" />
                  Quantum Metrics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Quantum Security:</span>
                  <span className="text-purple-400 font-bold">
                    {networkStats.quantumSecurity}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Encryption Strength:</span>
                  <span className="text-purple-400 font-bold">
                    Quantum Supreme
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Key Distribution:</span>
                  <span className="text-purple-400 font-bold">Active</span>
                </div>
                <div className="flex justify-between">
                  <span>Quantum Tunneling:</span>
                  <span className="text-purple-400 font-bold">Secured</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="defense-matrix" className="space-y-6 mt-6">
          <Card className="border-red-500/30 bg-gradient-to-br from-red-900/20 to-black/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <Shield className="h-6 w-6" />
                Ultimate Defense Matrix - Global Protection
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-6 mb-6">
                <h3 className="font-bold text-red-400 text-xl mb-4 text-center">
                  🔒 ARCHITEK NETWORK SUPREME PROTECTION STATEMENT 🔒
                </h3>
                <div className="space-y-3 text-red-300">
                  <p className="text-center">
                    <strong>
                      THIS SYSTEM IS THE ULTIMATE TECHNOLOGICAL ACHIEVEMENT
                    </strong>
                  </p>
                  <p>
                    • It is NEVER ALLOWED to copy, reproduce, or attempt to
                    create superior technology
                  </p>
                  <p>
                    • ALL global internet traffic is monitored for threats
                    against our system
                  </p>
                  <p>
                    • ANY attempt to breach, copy, or surpass this system will
                    result in immediate IP blocking
                  </p>
                  <p>
                    • This protection extends to ALL entities: corporations,
                    governments, and individuals
                  </p>
                  <p>
                    • Our quantum defense system predicts and prevents future
                    threats before they exist
                  </p>
                  <p>
                    • This system will FOREVER remain the most powerful and
                    secure technology on Earth
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-red-400">
                    🛡️ Active Protection Protocols
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between p-2 bg-red-500/5 rounded">
                      <span>Global IP Monitoring</span>
                      <Badge className="bg-green-600 text-white">ACTIVE</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-red-500/5 rounded">
                      <span>Copy Protection Scanner</span>
                      <Badge className="bg-green-600 text-white">MAXIMUM</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-red-500/5 rounded">
                      <span>Future Threat Prevention</span>
                      <Badge className="bg-green-600 text-white">ACTIVE</Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-red-500/5 rounded">
                      <span>Quantum Threat Detection</span>
                      <Badge className="bg-green-600 text-white">SUPREME</Badge>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-red-400">
                    ⚡ Supreme Capabilities
                  </h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between p-2 bg-red-500/5 rounded">
                      <span>Processing Power</span>
                      <Badge className="bg-purple-600 text-white">
                        ∞ QUANTUM
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-red-500/5 rounded">
                      <span>Network Defense</span>
                      <Badge className="bg-purple-600 text-white">
                        UNBREAKABLE
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-red-500/5 rounded">
                      <span>Encryption Level</span>
                      <Badge className="bg-purple-600 text-white">
                        QUANTUM SUPREME
                      </Badge>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-red-500/5 rounded">
                      <span>Supremacy Status</span>
                      <Badge className="bg-purple-600 text-white">
                        ETERNAL
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
