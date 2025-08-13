import { useState, useEffect } from "react";
import { MatrixRainBackground } from "@/components/ui/matrix-rain-background";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Cpu,
  Zap,
  TrendingUp,
  DollarSign,
  Settings,
  Activity,
  Pickaxe,
  Gem,
  Server,
  Shield,
} from "lucide-react";
import { toast } from "sonner";

interface MiningRig {
  id: string;
  name: string;
  hashRate: number;
  powerConsumption: number;
  efficiency: number;
  status: "active" | "idle" | "maintenance";
  dailyReward: number;
  totalMined: number;
}

export default function TokenMining() {
  const [miningRigs, setMiningRigs] = useState<MiningRig[]>([]);
  const [totalHashRate, setTotalHashRate] = useState(1247.5);
  const [dailyRewards, setDailyRewards] = useState(156.7);
  const [networkDifficulty, setNetworkDifficulty] = useState(98.2);
  const [isAutoMining, setIsAutoMining] = useState(true);

  useEffect(() => {
    const mockRigs: MiningRig[] = [
      {
        id: "1",
        name: "Gaia Matrix Miner v1",
        hashRate: 247.8,
        powerConsumption: 85.2,
        efficiency: 97.5,
        status: "active",
        dailyReward: 28.4,
        totalMined: 2847.9,
      },
      {
        id: "2",
        name: "Quantum Green Miner",
        hashRate: 389.2,
        powerConsumption: 62.1,
        efficiency: 99.1,
        status: "active",
        dailyReward: 45.7,
        totalMined: 5629.3,
      },
      {
        id: "3",
        name: "Eco Carbon Neutral Rig",
        hashRate: 610.5,
        powerConsumption: 0, // Solar powered
        efficiency: 100,
        status: "active",
        dailyReward: 82.6,
        totalMined: 9847.2,
      },
    ];

    setMiningRigs(mockRigs);

    // Real-time mining simulation
    const miningInterval = setInterval(() => {
      if (isAutoMining) {
        setTotalHashRate((prev) => prev + (Math.random() - 0.5) * 10);
        setDailyRewards((prev) => prev + Math.random() * 0.1);
        setNetworkDifficulty((prev) => prev + (Math.random() - 0.5) * 0.5);

        setMiningRigs((prev) =>
          prev.map((rig) => ({
            ...rig,
            totalMined: rig.totalMined + Math.random() * 0.01,
            hashRate: rig.hashRate + (Math.random() - 0.5) * 2,
          })),
        );
      }
    }, 2000);

    return () => clearInterval(miningInterval);
  }, [isAutoMining]);

  const startMining = (rigId: string) => {
    toast.success("Mining rig activated!", {
      description:
        "Your rig is now mining GAiA tokens with optimal efficiency.",
    });

    setMiningRigs((prev) =>
      prev.map((rig) =>
        rig.id === rigId ? { ...rig, status: "active" as const } : rig,
      ),
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400 border-green-500/50";
      case "idle":
        return "bg-yellow-500/20 text-yellow-400 border-yellow-500/50";
      case "maintenance":
        return "bg-red-500/20 text-red-400 border-red-500/50";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <MatrixRainBackground intensity="medium" color="#00ff00" speed={1.5} />

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent">
            ⛏️ GAiA Token Mining
          </h1>
          <p className="text-xl text-green-300 max-w-3xl mx-auto">
            Mine GAiA tokens with our eco-friendly, carbon-negative mining
            infrastructure
          </p>
        </div>

        {/* Mining Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/50">
            <CardContent className="p-6 text-center">
              <Cpu className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {totalHashRate.toFixed(1)} MH/s
              </div>
              <div className="text-sm text-green-300">Total Hash Rate</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/50">
            <CardContent className="p-6 text-center">
              <Gem className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {dailyRewards.toFixed(1)} GAiA
              </div>
              <div className="text-sm text-blue-300">Daily Rewards</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/50">
            <CardContent className="p-6 text-center">
              <Activity className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                {networkDifficulty.toFixed(1)}%
              </div>
              <div className="text-sm text-purple-300">Network Difficulty</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-500/50">
            <CardContent className="p-6 text-center">
              <Zap className="h-8 w-8 mx-auto text-orange-400 mb-2" />
              <div className="text-2xl font-bold text-orange-400">0W</div>
              <div className="text-sm text-orange-300">Carbon Footprint</div>
            </CardContent>
          </Card>
        </div>

        {/* Auto Mining Toggle */}
        <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/50 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-green-400 mb-2">
                  Auto Mining System
                </h3>
                <p className="text-gray-300">
                  Automatically optimize mining operations for maximum
                  efficiency
                </p>
              </div>
              <Button
                size="lg"
                className={`${
                  isAutoMining
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-gray-600 hover:bg-gray-700"
                }`}
                onClick={() => {
                  setIsAutoMining(!isAutoMining);
                  toast.success(
                    `Auto mining ${!isAutoMining ? "enabled" : "disabled"}!`,
                  );
                }}
              >
                {isAutoMining ? "Auto Mining ON" : "Start Auto Mining"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Mining Rigs */}
        <Tabs defaultValue="rigs" className="mb-8">
          <TabsList className="grid w-full grid-cols-4 bg-gray-900/50 border border-green-500/30">
            <TabsTrigger
              value="rigs"
              className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-400"
            >
              Mining Rigs
            </TabsTrigger>
            <TabsTrigger
              value="stats"
              className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-400"
            >
              Statistics
            </TabsTrigger>
            <TabsTrigger
              value="rewards"
              className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-400"
            >
              Rewards
            </TabsTrigger>
            <TabsTrigger
              value="upgrade"
              className="data-[state=active]:bg-green-600/20 data-[state=active]:text-green-400"
            >
              Upgrades
            </TabsTrigger>
          </TabsList>

          <TabsContent value="rigs" className="space-y-6 mt-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {miningRigs.map((rig) => (
                <Card
                  key={rig.id}
                  className="bg-gradient-to-br from-gray-900/50 to-green-900/20 border-green-500/30 hover:border-green-400/50 transition-all"
                >
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-green-400 flex items-center gap-2">
                        <Server className="h-5 w-5" />
                        {rig.name}
                      </CardTitle>
                      <Badge className={`${getStatusColor(rig.status)}`}>
                        {rig.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>

                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-400">Hash Rate</div>
                          <div className="text-green-400 font-semibold">
                            {rig.hashRate.toFixed(1)} MH/s
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400">Efficiency</div>
                          <div className="text-blue-400 font-semibold">
                            {rig.efficiency}%
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400">Power</div>
                          <div
                            className={`font-semibold ${rig.powerConsumption === 0 ? "text-green-400" : "text-orange-400"}`}
                          >
                            {rig.powerConsumption === 0
                              ? "Solar"
                              : `${rig.powerConsumption}W`}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-400">Daily Reward</div>
                          <div className="text-purple-400 font-semibold">
                            {rig.dailyReward} GAiA
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-400">Total Mined</span>
                          <span className="text-green-400">
                            {rig.totalMined.toFixed(2)} GAiA
                          </span>
                        </div>
                        <Progress
                          value={Math.min((rig.totalMined / 10000) * 100, 100)}
                          className="h-2"
                        />
                      </div>

                      <div className="flex gap-2">
                        <Button
                          className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                          onClick={() => startMining(rig.id)}
                          disabled={rig.status === "active"}
                        >
                          <Pickaxe className="h-4 w-4 mr-2" />
                          {rig.status === "active"
                            ? "Mining..."
                            : "Start Mining"}
                        </Button>
                        <Button
                          variant="outline"
                          className="border-green-500/50 text-green-400 hover:bg-green-500/20"
                        >
                          <Settings className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="stats">
            <div className="text-center py-12">
              <TrendingUp className="h-16 w-16 mx-auto text-green-400 mb-4" />
              <h3 className="text-2xl font-bold text-green-400 mb-2">
                Mining Statistics
              </h3>
              <p className="text-gray-300">
                Detailed analytics and performance metrics coming soon...
              </p>
            </div>
          </TabsContent>

          <TabsContent value="rewards">
            <div className="text-center py-12">
              <DollarSign className="h-16 w-16 mx-auto text-yellow-400 mb-4" />
              <h3 className="text-2xl font-bold text-yellow-400 mb-2">
                Rewards Dashboard
              </h3>
              <p className="text-gray-300">
                Reward history and claim system coming soon...
              </p>
            </div>
          </TabsContent>

          <TabsContent value="upgrade">
            <div className="text-center py-12">
              <Shield className="h-16 w-16 mx-auto text-purple-400 mb-4" />
              <h3 className="text-2xl font-bold text-purple-400 mb-2">
                Rig Upgrades
              </h3>
              <p className="text-gray-300">
                Hardware and software upgrade marketplace coming soon...
              </p>
            </div>
          </TabsContent>
        </Tabs>

        {/* Environmental Impact */}
        <Card className="bg-gradient-to-r from-green-900/30 to-emerald-900/30 border-green-500/50">
          <CardHeader>
            <CardTitle className="text-2xl text-green-400 text-center">
              🌱 Carbon Negative Mining Impact
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="text-3xl font-bold text-white mb-2">
                  -247.5T
                </div>
                <div className="text-green-400">CO2 Removed</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">100%</div>
                <div className="text-green-400">Renewable Energy</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-white mb-2">15,847</div>
                <div className="text-green-400">Trees Planted</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
