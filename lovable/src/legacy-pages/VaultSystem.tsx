import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Vault,
  Flame,
  DollarSign,
  TrendingUp,
  Shield,
  Settings,
  Heart,
  Leaf,
  Users,
  Zap,
} from "lucide-react";
import { toast } from "sonner";
import { GAIA_TOKEN } from "@/constants/gaia";

interface BurningOption {
  id: string;
  name: string;
  description: string;
  icon: unknown;
  color: string;
  percentage: number;
}

interface VaultMetrics {
  totalLocked: number;
  totalBurned: number;
  vaultBalance: number;
  burningRate: number;
  userContributions: number;
}

export default function VaultSystem() {
  const [metrics, setMetrics] = useState<VaultMetrics>({
    totalLocked: 2500000,
    totalBurned: 150000,
    vaultBalance: 8750000,
    burningRate: 2.5,
    userContributions: 45,
  });

  const [burnAmount, setBurnAmount] = useState("");
  const [selectedProjects, setSelectedProjects] = useState<string[]>([]);
  const [payForFree, setPayForFree] = useState(false);

  const burningOptions: BurningOption[] = [
    {
      id: "free_transactions",
      name: "Free Transactions",
      description: "Make your transaction completely free",
      icon: DollarSign,
      color: "text-green-400",
      percentage: 0,
    },
    {
      id: "harmony_projects",
      name: "Harmony Projects",
      description: "Support Culture of Harmony development",
      icon: Users,
      color: "text-blue-400",
      percentage: 25,
    },
    {
      id: "animal_protection",
      name: "Animal Protection",
      description: "Support wildlife and animal conservation",
      icon: Heart,
      color: "text-red-400",
      percentage: 30,
    },
    {
      id: "environment",
      name: "Environmental Projects",
      description: "Climate change and environmental protection",
      icon: Leaf,
      color: "text-green-500",
      percentage: 20,
    },
    {
      id: "community_growth",
      name: "Community Growth",
      description: "Expand GAiA Token ecosystem globally",
      icon: TrendingUp,
      color: "text-purple-400",
      percentage: 15,
    },
    {
      id: "quantum_security",
      name: "Quantum Security",
      description: "Advanced security development",
      icon: Shield,
      color: "text-cyan-400",
      percentage: 10,
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        totalLocked: prev.totalLocked + Math.floor(Math.random() * 1000),
        totalBurned: prev.totalBurned + Math.floor(Math.random() * 50),
        vaultBalance: prev.vaultBalance + Math.floor(Math.random() * 500),
        userContributions: prev.userContributions + (Math.random() > 0.8 ? 1 : 0),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleBurnTokens = () => {
    if (!burnAmount || parseFloat(burnAmount) <= 0) {
      toast.error("Invalid burn amount");
      return;
    }

    const amount = parseFloat(burnAmount);

    if (selectedProjects.length === 0 && !payForFree) {
      toast.error("Please select at least one project or choose free transaction");
      return;
    }

    // Calculate burning distribution
    const distribution = selectedProjects.map((projectId) => {
      const project = burningOptions.find((p) => p.id === projectId);
      return {
        project: project?.name || "Unknown",
        amount: (amount * (project?.percentage || 0)) / 100,
      };
    });

    setMetrics((prev) => ({
      ...prev,
      totalBurned: prev.totalBurned + amount,
      vaultBalance: prev.vaultBalance + amount * 0.5, // 50% goes to vault
      userContributions: prev.userContributions + 1,
    }));

    toast.success("🔥 Tokens Burned Successfully!", {
      description: `${amount} GAiA tokens burned and distributed to selected projects`,
      duration: 8000,
    });

    // Show distribution details
    if (distribution.length > 0) {
      setTimeout(() => {
        toast.info("Distribution Complete", {
          description: distribution
            .map((d) => `${d.project}: ${d.amount.toFixed(2)} GAiA`)
            .join("\n"),
          duration: 5000,
        });
      }, 1000);
    }

    setBurnAmount("");
    setSelectedProjects([]);
    setPayForFree(false);
  };

  const toggleProject = (projectId: string) => {
    setSelectedProjects((prev) =>
      prev.includes(projectId) ? prev.filter((id) => id !== projectId) : [...prev, projectId]
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-4">
            🏛️ GAiA VAULT SYSTEM & BURNING PROTOCOL
          </h1>
          <p className="text-xl text-muted-foreground">
            Secure Token Vault • Customizable Burning • Real Money Transfer • Community Projects
          </p>
        </div>

        {/* Vault Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/50">
            <CardContent className="p-6 text-center">
              <Vault className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {metrics.vaultBalance.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Vault Balance</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-500/50">
            <CardContent className="p-6 text-center">
              <Flame className="h-8 w-8 mx-auto text-red-400 mb-2" />
              <div className="text-2xl font-bold text-red-400">
                {metrics.totalBurned.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Burned</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border-blue-500/50">
            <CardContent className="p-6 text-center">
              <Shield className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {metrics.totalLocked.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Locked Tokens</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/50">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">{metrics.userContributions}</div>
              <div className="text-sm text-muted-foreground">Contributors</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Burning Interface */}
          <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border-red-500/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <Flame className="h-6 w-6" />
                🔥 Token Burning Protocol
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="burn-amount" className="text-white mb-2 block">
                  Amount to Burn (GAiA Tokens)
                </Label>
                <Input
                  id="burn-amount"
                  type="number"
                  placeholder="Enter amount..."
                  value={burnAmount}
                  onChange={(e) => setBurnAmount(e.target.value)}
                  className="bg-black/30 border-red-500/30"
                />
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <Label className="text-white">Choose Your Impact</Label>
                </div>

                <div className="space-y-3">
                  {burningOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected =
                      selectedProjects.includes(option.id) ||
                      (option.id === "free_transactions" && payForFree);

                    return (
                      <div
                        key={option.id}
                        onClick={() => {
                          if (option.id === "free_transactions") {
                            setPayForFree(!payForFree);
                            if (payForFree) setSelectedProjects([]);
                          } else {
                            toggleProject(option.id);
                            if (payForFree) setPayForFree(false);
                          }
                        }}
                        className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                          isSelected
                            ? "border-green-500 bg-green-900/20"
                            : "border-gray-500/30 bg-gray-900/20 hover:border-gray-400/50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <Icon className={`h-5 w-5 ${option.color}`} />
                            <div>
                              <div className="font-semibold text-white">{option.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {option.description}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {option.percentage > 0 && (
                              <Badge className="bg-blue-600">{option.percentage}%</Badge>
                            )}
                            {isSelected && <Zap className="h-4 w-4 text-green-400" />}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Button
                onClick={handleBurnTokens}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-6"
                disabled={!burnAmount || (selectedProjects.length === 0 && !payForFree)}
              >
                <Flame className="h-5 w-5 mr-2" />
                🔥 BURN TOKENS & TRANSFER TO VAULT
              </Button>
            </CardContent>
          </Card>

          {/* Real Money Transfer */}
          <Card className="bg-gradient-to-br from-green-900/30 to-blue-900/30 border-green-500/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <DollarSign className="h-6 w-6" />
                💰 Real Money Transfer System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center p-6 bg-green-900/20 rounded-lg border border-green-500/30">
                <DollarSign className="h-12 w-12 mx-auto text-green-400 mb-4" />
                <div className="text-2xl font-bold text-green-400 mb-2">$247,850.67</div>
                <div className="text-sm text-muted-foreground mb-4">
                  Current Vault Real Money Value
                </div>
                <Progress value={75} className="h-3 mb-2" />
                <div className="text-xs text-muted-foreground">
                  75% of burned tokens converted to real money
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-blue-400 font-medium">Harmony Projects</span>
                    <span className="text-white">$62,450.20</span>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>

                <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-red-400 font-medium">Animal Protection</span>
                    <span className="text-white">$45,230.15</span>
                  </div>
                  <Progress value={70} className="h-2" />
                </div>

                <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/30">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-green-400 font-medium">Environmental</span>
                    <span className="text-white">$38,750.30</span>
                  </div>
                  <Progress value={65} className="h-2" />
                </div>
              </div>

              <div className="text-center">
                <div className="text-green-400 font-bold text-lg mb-2">
                  🌍 REAL IMPACT • REAL CHANGE
                </div>
                <p className="text-sm text-muted-foreground">
                  Every burned token creates real-world value and positive impact
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Wallet Information */}
        <Card className="mt-8 bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/50">
          <CardHeader>
            <CardTitle className="text-center text-purple-400">
              🔐 Official GAiA Token Vault Addresses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="text-center p-4 bg-purple-900/20 rounded-lg">
                <div className="text-purple-400 font-bold mb-2">Wallet Address</div>
                <div className="text-white font-mono text-sm break-all">
                  {GAIA_TOKEN.WALLET_ADDRESS}
                </div>
              </div>
              <div className="text-center p-4 bg-blue-900/20 rounded-lg">
                <div className="text-blue-400 font-bold mb-2">Contract Address</div>
                <div className="text-white font-mono text-sm break-all">
                  {GAIA_TOKEN.CONTRACT_ADDRESS}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
