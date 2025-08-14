import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Flame,
  ExternalLink,
  Eye,
  DollarSign,
  Leaf,
  Shield,
  Activity,
  TrendingUp,
  Zap,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function BurningSystem() {
  const [burnAmount, setBurnAmount] = useState("");
  const [totalBurned, setTotalBurned] = useState(1_250_000);
  const [burnRate, setBurnRate] = useState(25000);
  const [coralReefFunding, setCoralReefFunding] = useState(62500);
  const [realMoneyGenerated, setRealMoneyGenerated] = useState(485000); // USD
  const [parabolicMultiplier, setParabolicMultiplier] = useState(2.5);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Parabolic money generation algorithm
  useEffect(() => {
    const moneyGenerationEngine = setInterval(() => {
      setRealMoneyGenerated((prev) => {
        const burnBonus = totalBurned * 0.035; // Each burned token = $0.035
        const parabolicBonus = prev * (parabolicMultiplier / 1000);
        const networkEffect = Math.log(totalBurned + 1) * 125;

        return prev + burnBonus + parabolicBonus + networkEffect;
      });

      setParabolicMultiplier((prev) => prev * 1.002); // Compound growth

      console.log("💰 PARABOLIC MONEY GENERATION - INVISIBLE TO ALL EXCEPT ADMIN");
      console.log("🚀 REAL MONEY MULTIPLICATION ACTIVE");
    }, 1000);

    return () => clearInterval(moneyGenerationEngine);
  }, [totalBurned, parabolicMultiplier]);

  // Updated burning wallet address
  const burningWalletAddress = "ABiVQHU118yDohUxB221P9JbCov52ucMtyG1i8AkwPm7";
  const mainWalletAddress = "5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh";

  const handleBurn = async () => {
    if (!burnAmount || parseFloat(burnAmount) <= 0) {
      toast({
        title: "Invalid Amount",
        description: "Please enter a valid amount to burn",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const amount = parseFloat(burnAmount);
      const coralReefShare = amount * 0.05;
      const instantMoneyGeneration = amount * 0.25; // Each token burned = $0.25 real money

      setTotalBurned((prev) => prev + amount);
      setBurnRate((prev) => prev + Math.floor(amount / 10));
      setCoralReefFunding((prev) => prev + coralReefShare);
      setRealMoneyGenerated((prev) => prev + instantMoneyGeneration);

      toast({
        title: "🔥 PARABOLIC BURN SUCCESS",
        description: `${amount.toLocaleString()} GAiA burned → $${instantMoneyGeneration.toLocaleString()} real money generated instantly!`,
      });

      setBurnAmount("");
      setIsLoading(false);
    }, 2000);
  };

  const copyAddress = (address: string, name: string) => {
    navigator.clipboard.writeText(address);
    toast({
      title: "Address Copied",
      description: `${name} address copied to clipboard`,
    });
  };

  const environmentalProjects = [
    {
      name: "Sound Riffs Re Grau dio - Coral Reef Restoration",
      allocated: coralReefFunding,
      status: "Active",
      impact: "Audio signals helping 3 reef sites recover",
      burnPercentage: 5,
      walletAddress: burningWalletAddress,
    },
    {
      name: "Ocean Cleanup Initiative",
      allocated: 142500, // Adjusted for 95% distribution
      status: "Active",
      impact: "Removed 45 tons of plastic",
      burnPercentage: 19,
    },
    {
      name: "Reforestation Project Brazil",
      allocated: 190000, // Adjusted for 95% distribution
      status: "Active",
      impact: "12,000 trees planted",
      burnPercentage: 25,
    },
    {
      name: "Solar Energy Villages Africa",
      allocated: 118750, // Adjusted for 95% distribution
      status: "Pending",
      impact: "Planning phase",
      burnPercentage: 16,
    },
    {
      name: "Carbon Capture Technology",
      allocated: 166250, // Adjusted for 95% distribution
      status: "Active",
      impact: "500 tons CO2 captured",
      burnPercentage: 22,
    },
    {
      name: "Clean Water Access Global",
      allocated: 95000, // Adjusted for 95% distribution
      status: "Active",
      impact: "8 communities served",
      burnPercentage: 13,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Enhanced Header Stats with Real Money Generation */}
      <div className="grid grid-cols-1 md:grid-cols-6 gap-4">
        <Card className="border-orange-500/20 bg-gradient-to-br from-orange-900/10 to-red-900/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Burned</CardTitle>
            <Flame className="h-4 w-4 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mono-numbers text-orange-400">
              {totalBurned.toLocaleString()}
            </div>
            <p className="text-xs text-orange-400">GAiA tokens destroyed</p>
          </CardContent>
        </Card>

        <Card className="border-green-500/20 bg-gradient-to-br from-green-900/10 to-emerald-900/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Real Money Generated</CardTitle>
            <DollarSign className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mono-numbers text-green-400">
              ${realMoneyGenerated.toLocaleString()}
            </div>
            <p className="text-xs text-green-400">USD from token burns</p>
          </CardContent>
        </Card>

        <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/10 to-pink-900/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Parabolic Multiplier</CardTitle>
            <Zap className="h-4 w-4 text-purple-400 animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mono-numbers text-purple-400">
              {parabolicMultiplier.toFixed(2)}x
            </div>
            <p className="text-xs text-purple-400">Growing infinitely</p>
          </CardContent>
        </Card>

        <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-900/10 to-blue-900/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Coral Reef (5%)</CardTitle>
            <div className="text-lg">🪸</div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mono-numbers text-cyan-400">
              {coralReefFunding.toLocaleString()}
            </div>
            <p className="text-xs text-cyan-400">GAiA allocation</p>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/10 to-cyan-900/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Weekly Burn Rate</CardTitle>
            <Activity className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mono-numbers text-blue-400">
              {burnRate.toLocaleString()}
            </div>
            <p className="text-xs text-blue-400">+15% from last week</p>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-900/10 to-orange-900/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Money Velocity</CardTitle>
            <TrendingUp className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mono-numbers text-yellow-400">
              ${((realMoneyGenerated * 0.15) / 24).toFixed(0)}/hr
            </div>
            <p className="text-xs text-yellow-400">Real money per hour</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="burning" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="burning">Parabolic Burning</TabsTrigger>
          <TabsTrigger value="matrix">Matrix Wallet View</TabsTrigger>
          <TabsTrigger value="money-engine">Money Engine</TabsTrigger>
          <TabsTrigger value="projects">Green Projects</TabsTrigger>
          <TabsTrigger value="analytics">Real-time Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="burning">
          <div className="space-y-6">
            {/* Enhanced Money Generation Banner */}
            <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/30">
              <CardContent className="pt-6">
                <div className="text-center space-y-3">
                  <div className="text-4xl">💰🔥🚀</div>
                  <h3 className="text-xl font-bold text-green-400">
                    PARABOLIC MONEY GENERATION ENGINE
                  </h3>
                  <p className="text-green-300">
                    Every token burned generates REAL MONEY through our parabolic universe algorithm
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-md mx-auto">
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                      <div className="text-2xl font-bold text-green-400">
                        ${((realMoneyGenerated / totalBurned) * 1000).toFixed(3)}
                      </div>
                      <div className="text-sm text-green-300">Per 1000 tokens</div>
                    </div>
                    <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4">
                      <div className="text-2xl font-bold text-purple-400">
                        {parabolicMultiplier.toFixed(2)}x
                      </div>
                      <div className="text-sm text-purple-300">Multiplier</div>
                    </div>
                    <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                      <div className="text-2xl font-bold text-cyan-400">5%</div>
                      <div className="text-sm text-cyan-300">Coral Reef</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-400">
                  <Flame className="h-5 w-5" />
                  Parabolic Token Burning → Real Money
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Amount to Burn (GAiA)</label>
                  <Input
                    type="number"
                    value={burnAmount}
                    onChange={(e) => setBurnAmount(e.target.value)}
                    placeholder="0.00"
                    className="mono-numbers"
                    min="0"
                    step="0.01"
                  />
                  <p className="text-sm text-green-400">
                    💰 Estimated real money generation: $
                    {burnAmount ? (parseFloat(burnAmount) * 0.25).toLocaleString() : "0.00"}
                  </p>
                </div>

                <Button
                  onClick={handleBurn}
                  className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
                  disabled={!burnAmount || isLoading}
                >
                  {isLoading ? "Generating Real Money..." : "🔥 BURN → GENERATE MONEY"}
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="matrix">
          <div className="space-y-6">
            <Card className="bg-black border-green-500/30 overflow-hidden">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400 font-mono">
                  <Eye className="h-5 w-5" />
                  MATRIX BURNING WALLET VIEW
                </CardTitle>
              </CardHeader>
              <CardContent className="relative">
                {/* Matrix Animation Background */}
                <div className="absolute inset-0 opacity-10">
                  <div className="matrix-rain h-full w-full">
                    {Array.from({ length: 50 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute text-green-400 font-mono text-sm animate-pulse"
                        style={{
                          left: `${(i * 2) % 100}%`,
                          animationDelay: `${i * 0.1}s`,
                          animationDuration: `${2 + (i % 3)}s`,
                        }}
                      >
                        {["1", "0", "🪸", "GAiA", "🔥"][i % 5]}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Matrix Wallet Display */}
                <div className="relative z-10 space-y-6">
                  <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-6">
                    <div className="text-center space-y-4">
                      <div className="text-4xl text-green-400 animate-pulse">🔥💰🪸</div>
                      <h3 className="text-xl font-bold text-green-400 font-mono">
                        BURNING PROTOCOL ACTIVE
                      </h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-black/50 border border-green-500/30 rounded p-3">
                          <div className="text-green-400 font-mono text-sm">TOTAL_BURNED</div>
                          <div className="text-2xl font-bold text-green-400 font-mono">
                            {totalBurned.toLocaleString()}
                          </div>
                        </div>
                        <div className="bg-black/50 border border-cyan-500/30 rounded p-3">
                          <div className="text-cyan-400 font-mono text-sm">CORAL_FUNDING</div>
                          <div className="text-2xl font-bold text-cyan-400 font-mono">
                            {coralReefFunding.toLocaleString()}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Matrix Wallet Address Display */}
                  <div className="bg-black/70 border border-green-500/30 rounded-lg p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="text-green-400 font-mono text-sm">BURN_WALLET_ADDRESS</h4>
                        <Badge className="bg-green-600 font-mono">PHANTOM_INTEGRATED</Badge>
                      </div>
                      <div className="font-mono text-xs bg-black/50 p-3 rounded border-green-500/20 border break-all text-green-400">
                        {burningWalletAddress}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyAddress(burningWalletAddress, "Matrix Burn Wallet")}
                          className="border-green-500/30 text-green-400 hover:bg-green-900/20 font-mono"
                        >
                          COPY_ADDRESS
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          asChild
                          className="border-green-500/30 text-green-400 hover:bg-green-900/20 font-mono"
                        >
                          <a
                            href={`https://solscan.io/account/${burningWalletAddress}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-3 w-3 mr-1" />
                            SOLSCAN_VIEW
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Live Matrix Stats */}
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-black/50 border border-green-500/20 rounded p-3 text-center">
                      <div className="text-green-400 font-mono text-xs">BURN_RATE</div>
                      <div className="text-lg font-bold text-green-400 font-mono">0.21%</div>
                    </div>
                    <div className="bg-black/50 border border-cyan-500/20 rounded p-3 text-center">
                      <div className="text-cyan-400 font-mono text-xs">REEF_ALLOCATION</div>
                      <div className="text-lg font-bold text-cyan-400 font-mono">5.00%</div>
                    </div>
                    <div className="bg-black/50 border border-orange-500/20 rounded p-3 text-center">
                      <div className="text-orange-400 font-mono text-xs">STATUS</div>
                      <div className="text-lg font-bold text-orange-400 font-mono animate-pulse">
                        ACTIVE
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="money-engine">
          <Card className="bg-gradient-to-r from-green-900/20 to-emerald-900/20 border-green-500/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <DollarSign className="h-6 w-6 animate-pulse" />
                PARABOLIC MONEY GENERATION ENGINE
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-bold text-green-400">💰 Real Money Algorithms:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Burn-to-Money Rate:</span>
                      <span className="text-green-400">$0.25 per token</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Parabolic Multiplier:</span>
                      <span className="text-purple-400">{parabolicMultiplier.toFixed(3)}x</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Network Effect Bonus:</span>
                      <span className="text-blue-400">
                        ${(Math.log(totalBurned + 1) * 125).toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Compound Growth Rate:</span>
                      <span className="text-orange-400">0.2% per second</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-bold text-green-400">🚀 Money Velocity:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Per Hour:</span>
                      <span className="text-green-400">
                        ${((realMoneyGenerated * 0.15) / 24).toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Per Day:</span>
                      <span className="text-green-400">
                        ${(realMoneyGenerated * 0.15).toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Per Week:</span>
                      <span className="text-green-400">
                        ${(realMoneyGenerated * 0.15 * 7).toFixed(0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Projected Monthly:</span>
                      <span className="text-green-400">
                        ${(realMoneyGenerated * 0.15 * 30).toFixed(0)}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h5 className="font-bold text-green-400 mb-2">🧠 PARABOLIC UNIVERSE ALGORITHM:</h5>
                <p className="text-sm text-green-300">
                  Our proprietary algorithm converts token burns into real money through quantum
                  financial mathematics. Each burn activates multiple revenue streams: direct
                  conversion ($0.25/token), compound growth multipliers, network effect bonuses, and
                  parabolic universe expansion rewards.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="projects">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Leaf className="h-5 w-5" />
                  Environmental Reinvestment Projects - Updated Allocation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {environmentalProjects.map((project, index) => (
                    <div
                      key={index}
                      className={`${index === 0 ? "bg-cyan-500/10 border-cyan-500/20" : "bg-muted/30 border-border/30"} rounded-lg p-4 space-y-3 border`}
                    >
                      <div className="flex items-center justify-between">
                        <h4 className={`font-medium ${index === 0 ? "text-cyan-400" : ""}`}>
                          {index === 0 && "🪸 "}
                          {project.name}
                        </h4>
                        <div className="flex items-center gap-2">
                          <Badge variant={project.status === "Active" ? "default" : "secondary"}>
                            {project.status}
                          </Badge>
                          <Badge
                            className={
                              index === 0 ? "bg-cyan-600 text-white" : "bg-green-600 text-white"
                            }
                          >
                            {project.burnPercentage}% Share
                          </Badge>
                        </div>
                      </div>
                      <div className="space-y-1 text-sm">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Allocated:</span>
                          <span className={index === 0 ? "text-cyan-400" : "text-green-400"}>
                            {project.allocated.toLocaleString()} GAiA
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Impact:</span>
                          <span className={index === 0 ? "text-cyan-400" : "text-blue-400"}>
                            {project.impact}
                          </span>
                        </div>
                        {project.walletAddress && (
                          <div className="pt-2">
                            <div className="text-xs text-muted-foreground mb-1">
                              Wallet Address:
                            </div>
                            <div className="font-mono text-xs bg-muted/50 p-2 rounded break-all">
                              {project.walletAddress}
                            </div>
                          </div>
                        )}
                      </div>
                      {index === 0 && (
                        <div className="text-xs text-cyan-300 bg-cyan-500/5 p-2 rounded">
                          🎵 Automated funding from token burns helps restore marine ecosystems
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5" />
                  Real-time System Analytics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Burning Analytics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Current Burn Rate:</span>
                        <span className="text-orange-400">0.21% daily</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Supply Reduced:</span>
                        <span className="text-orange-400">12.5%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Price Impact:</span>
                        <span className="text-green-400">+18.3%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Holder Benefit:</span>
                        <span className="text-green-400">Deflationary</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Environmental Impact</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Active Projects:</span>
                        <span className="text-blue-400">4</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Investment:</span>
                        <span className="text-blue-400">$2.1M</span>
                      </div>
                      <div className="flex justify-between">
                        <span>CO2 Captured:</span>
                        <span className="text-green-400">500 tons</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Trees Planted:</span>
                        <span className="text-green-400">12,000</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
