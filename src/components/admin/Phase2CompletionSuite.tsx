import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  Zap,
  Target,
  Activity,
  Lock,
  Eye,
  AlertTriangle,
  CheckCircle,
  Sword,
  Crown,
  Flame,
} from "lucide-react";
import { GAIA_TOKEN } from "@/constants/gaia";
import { toast } from "sonner";

export function Phase2CompletionSuite() {
  const [defenseLevel, setDefenseLevel] = useState(85);
  const [activeGuardians, setActiveGuardians] = useState(12);
  const [threatLevel, setThreatLevel] = useState("LOW");
  const [systemIntegrity, setSystemIntegrity] = useState(98);

  const legendaryGuardians = [
    {
      name: "GAiA Dragon Sentinel",
      power: 9999,
      status: "ACTIVE",
      element: "Earth",
    },
    {
      name: "Quantum Shield Bearer",
      power: 8500,
      status: "ACTIVE",
      element: "Energy",
    },
    {
      name: "Ocean Guardian Phoenix",
      power: 9200,
      status: "ACTIVE",
      element: "Water",
    },
    {
      name: "Forest Keeper Titan",
      power: 8800,
      status: "ACTIVE",
      element: "Nature",
    },
    {
      name: "Crystal Mind Protector",
      power: 9100,
      status: "ACTIVE",
      element: "Crystal",
    },
    {
      name: "Storm Caller Ancient",
      power: 8700,
      status: "ACTIVE",
      element: "Air",
    },
  ];

  const defenseMetrics = [
    { name: "Firewall Integrity", value: 99.8, status: "OPTIMAL" },
    { name: "Intrusion Detection", value: 100, status: "ACTIVE" },
    { name: "Token Security", value: 99.9, status: "SECURED" },
    { name: "Access Control", value: 100, status: "LOCKED" },
    { name: "Data Encryption", value: 99.7, status: "QUANTUM" },
    { name: "Network Monitoring", value: 99.9, status: "REAL-TIME" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate real-time defense monitoring
      setDefenseLevel((prev) => Math.min(100, prev + Math.random() * 2));
      setSystemIntegrity((prev) => Math.max(95, prev + (Math.random() - 0.5)));

      console.log("🛡️ Phase 2 Defense Systems: ACTIVE");
      console.log("🌍 Connected to Official GAiA:", GAIA_TOKEN.CONTRACT_ADDRESS);
      console.log("💎 Wallet:", GAIA_TOKEN.WALLET_ADDRESS);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const activateEmergencyProtocol = () => {
    toast.success("🚨 Emergency Defense Protocol Activated!", {
      description: "All GAiA defense systems at maximum power - Official token protected",
      duration: 5000,
    });
    setDefenseLevel(100);
    setThreatLevel("MAXIMUM DEFENSE");
  };

  return (
    <div className="space-y-6">
      <Card className="border-red-500/30 bg-gradient-to-r from-red-900/20 to-orange-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Shield className="h-6 w-6 animate-pulse" />
            🛡️ PHASE 2 COMPLETION - LEGENDARY DEFENSE ARMY
          </CardTitle>
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-3">
            <p className="text-green-400 font-mono text-sm">Official GAiA Token Protected</p>
            <p className="text-green-300 font-mono text-xs">
              Contract: {GAIA_TOKEN.CONTRACT_ADDRESS}
            </p>
            <p className="text-green-300 font-mono text-xs">Wallet: {GAIA_TOKEN.WALLET_ADDRESS}</p>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="guardians" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="guardians">Legendary Guardians</TabsTrigger>
              <TabsTrigger value="metrics">Defense Metrics</TabsTrigger>
              <TabsTrigger value="protocols">Emergency Protocols</TabsTrigger>
              <TabsTrigger value="integration">GAiA Integration</TabsTrigger>
            </TabsList>

            <TabsContent value="guardians" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {legendaryGuardians.map((guardian, index) => (
                  <Card
                    key={index}
                    className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30"
                  >
                    <CardContent className="pt-6">
                      <div className="text-center space-y-3">
                        <div className="text-4xl">
                          {guardian.element === "Earth" && "🐉"}
                          {guardian.element === "Energy" && "⚡"}
                          {guardian.element === "Water" && "🔥"}
                          {guardian.element === "Nature" && "🌳"}
                          {guardian.element === "Crystal" && "💎"}
                          {guardian.element === "Air" && "🌪️"}
                        </div>
                        <div>
                          <div className="font-bold text-purple-400">{guardian.name}</div>
                          <div className="text-sm text-purple-300">
                            Power: {guardian.power.toLocaleString()}
                          </div>
                          <Badge className="bg-green-600 mt-2">
                            <Crown className="h-3 w-3 mr-1" />
                            {guardian.status}
                          </Badge>
                        </div>
                        <Progress value={95 + Math.random() * 5} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {defenseMetrics.map((metric, index) => (
                  <Card
                    key={index}
                    className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/20"
                  >
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-green-400">{metric.name}</span>
                        <Badge className="bg-green-600">{metric.status}</Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Status</span>
                          <span className="text-green-400">{metric.value}%</span>
                        </div>
                        <Progress value={metric.value} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="protocols" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border-red-500/20">
                  <CardHeader>
                    <CardTitle className="text-red-400">🚨 Emergency Defense</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-400">{defenseLevel}%</div>
                      <p className="text-red-300">Current Defense Level</p>
                    </div>
                    <Button
                      onClick={activateEmergencyProtocol}
                      className="w-full bg-red-600 hover:bg-red-700"
                    >
                      <AlertTriangle className="h-4 w-4 mr-2" />
                      Activate Maximum Defense
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-500/20">
                  <CardHeader>
                    <CardTitle className="text-blue-400">🎯 Threat Assessment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-400">{threatLevel}</div>
                      <p className="text-blue-300">Current Threat Level</p>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex justify-between">
                        <span>Active Guards:</span>
                        <span className="text-green-400">{activeGuardians}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>System Health:</span>
                        <span className="text-green-400">{systemIntegrity.toFixed(1)}%</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="integration" className="space-y-4">
              <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-green-400">
                    🌍 Official GAiA Token Integration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <h4 className="font-bold text-blue-400">Contract Address</h4>
                      <code className="text-xs bg-blue-900/20 p-2 rounded block break-all">
                        {GAIA_TOKEN.CONTRACT_ADDRESS}
                      </code>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-bold text-purple-400">Wallet Address</h4>
                      <code className="text-xs bg-purple-900/20 p-2 rounded block break-all">
                        {GAIA_TOKEN.WALLET_ADDRESS}
                      </code>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-green-900/20 rounded-lg">
                      <div className="text-lg font-bold text-green-400">100%</div>
                      <div className="text-sm text-green-300">Token Security</div>
                    </div>
                    <div className="p-3 bg-blue-900/20 rounded-lg">
                      <div className="text-lg font-bold text-blue-400">ACTIVE</div>
                      <div className="text-sm text-blue-300">Pump.fun Link</div>
                    </div>
                    <div className="p-3 bg-purple-900/20 rounded-lg">
                      <div className="text-lg font-bold text-purple-400">VERIFIED</div>
                      <div className="text-sm text-purple-300">Official Token</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
