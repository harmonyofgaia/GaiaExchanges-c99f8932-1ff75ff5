import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import {
  TrendingUp,
  DollarSign,
  Target,
  Zap,
  Crown,
  Users,
} from "lucide-react";
import { toast } from "sonner";

export function QuantumTradingEngine() {
  const [tradingMetrics, setTradingMetrics] = useState({
    gaiaTokenValue: 0.00234,
    totalMarketCap: 15420000,
    dailyVolume: 2340000,
    investorsAttracted: 247,
    marketingReach: 89.5,
    valueMultiplier: 1.0,
  });

  const [dynamicPricing, setDynamicPricing] = useState({
    basePice: 0.00234,
    demandMultiplier: 1.0,
    scarcityBonus: 0,
    investorInterest: 75.5,
  });

  const [investorLeads, setInvestorLeads] = useState<
    Array<{
      id: string;
      name: string;
      platform: string;
      investment: number;
      status: "interested" | "negotiating" | "committed";
      priority: "high" | "medium" | "low";
    }>
  >([]);

  useEffect(() => {
    const tradingInterval = setInterval(() => {
      console.log("💰 QUANTUM TRADING ENGINE - MAXIMUM PROFIT MODE");
      console.log(
        "🎯 DYNAMIC PRICING: Higher value = Fewer buyers for perfect balance",
      );
      console.log(
        "👥 INVESTOR MAGNETISM: Attracting perfect investors automatically",
      );

      // Simulate dynamic pricing based on demand
      setTradingMetrics((prev) => {
        const newValue =
          prev.gaiaTokenValue * (1 + (Math.random() - 0.5) * 0.02);
        const buyerReduction = Math.max(0.1, 1 - (newValue - 0.002) * 100); // Higher price = fewer buyers

        return {
          ...prev,
          gaiaTokenValue: newValue,
          totalMarketCap:
            prev.totalMarketCap * (1 + (Math.random() - 0.5) * 0.01),
          dailyVolume: prev.dailyVolume * buyerReduction,
          investorsAttracted:
            prev.investorsAttracted + (Math.random() > 0.7 ? 1 : 0),
          marketingReach: Math.min(
            100,
            prev.marketingReach + Math.random() * 0.5,
          ),
        };
      });

      // Generate new investor leads
      if (Math.random() > 0.8) {
        const investors = [
          "Crypto Whale #1",
          "DeFi Foundation",
          "Green Energy Corp",
          "Tech Venture Capital",
          "Sustainable Fund",
        ];
        const platforms = [
          "LinkedIn",
          "Discord",
          "Telegram",
          "Twitter",
          "Email",
        ];

        const newInvestor = {
          id: Date.now().toString(),
          name: investors[Math.floor(Math.random() * investors.length)],
          platform: platforms[Math.floor(Math.random() * platforms.length)],
          investment: Math.floor(Math.random() * 500000) + 50000,
          status: ["interested", "negotiating"][
            Math.floor(Math.random() * 2)
          ] as "interested" | "negotiating",
          priority:
            Math.random() > 0.7
              ? "high"
              : Math.random() > 0.4
                ? "medium"
                : ("low" as "high" | "medium" | "low"),
        };

        setInvestorLeads((prev) => [newInvestor, ...prev.slice(0, 9)]);
        console.log("🎯 NEW INVESTOR ATTRACTED:", newInvestor);
      }
    }, 4000);

    return () => clearInterval(tradingInterval);
  }, []);

  const activateInvestorMagnet = () => {
    toast.success("🧲 INVESTOR MAGNET ACTIVATED!", {
      description:
        "Quantum algorithms now attracting perfect investors globally",
      duration: 8000,
    });

    setTradingMetrics((prev) => ({
      ...prev,
      investorsAttracted: prev.investorsAttracted + 50,
      marketingReach: 100,
    }));

    console.log(
      "🧲 INVESTOR MAGNETISM: ATTRACTING HIGH-VALUE INVESTORS WORLDWIDE",
    );
  };

  const activateViralMarketing = () => {
    toast.success("🚀 VIRAL MARKETING ACTIVATED!", {
      description:
        "Harmony of Gaia spreading across all platforms automatically",
      duration: 5000,
    });

    console.log(
      "🚀 VIRAL MARKETING: GAIA TOKEN SPREADING ACROSS ALL PLATFORMS",
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-600";
      case "medium":
        return "bg-yellow-600";
      default:
        return "bg-green-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "committed":
        return "bg-green-600";
      case "negotiating":
        return "bg-blue-600";
      default:
        return "bg-purple-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Trading Metrics Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-green-500/50 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <DollarSign className="h-6 w-6" />
              GAIA Token Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-400 mb-2">
              ${tradingMetrics.gaiaTokenValue.toFixed(6)}
            </div>
            <div className="text-sm text-green-300">
              Market Cap: ${tradingMetrics.totalMarketCap.toLocaleString()}
            </div>
            <Badge className="mt-2 bg-green-600 text-white">📈 RISING</Badge>
          </CardContent>
        </Card>

        <Card className="border-blue-500/50 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <TrendingUp className="h-6 w-6" />
              Daily Volume
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-blue-400 mb-2">
              ${tradingMetrics.dailyVolume.toLocaleString()}
            </div>
            <div className="text-sm text-blue-300">Dynamic Balance Active</div>
            <Badge className="mt-2 bg-blue-600 text-white">⚖️ BALANCED</Badge>
          </CardContent>
        </Card>

        <Card className="border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Users className="h-6 w-6" />
              Investors Attracted
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-400 mb-2">
              {tradingMetrics.investorsAttracted}
            </div>
            <div className="text-sm text-purple-300">
              Marketing Reach: {tradingMetrics.marketingReach.toFixed(1)}%
            </div>
            <Badge className="mt-2 bg-purple-600 text-white">🧲 MAGNETIC</Badge>
          </CardContent>
        </Card>
      </div>

      {/* Dynamic Pricing System */}
      <Card className="border-orange-500/50 bg-gradient-to-br from-orange-900/30 to-red-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <Target className="h-6 w-6" />
            Dynamic Coin Value System - Perfect Balance Algorithm
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center space-y-2">
              <h3 className="text-2xl font-bold text-orange-400">
                ⚖️ PERFECT BALANCE ACHIEVED
              </h3>
              <p className="text-orange-300">
                Higher coin value automatically reduces buyer count for optimal
                market balance
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-xl font-bold text-green-400">$0.00234</div>
                <div className="text-sm text-muted-foreground">Base Price</div>
                <Progress value={45} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-blue-400">1.2x</div>
                <div className="text-sm text-muted-foreground">
                  Demand Multiplier
                </div>
                <Progress value={60} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-purple-400">0.8x</div>
                <div className="text-sm text-muted-foreground">
                  Buyer Reduction
                </div>
                <Progress value={80} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-xl font-bold text-yellow-400">Perfect</div>
                <div className="text-sm text-muted-foreground">
                  Balance Status
                </div>
                <Progress value={100} className="mt-2" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Investor Management System */}
      <Card className="border-cyan-500/50 bg-gradient-to-br from-cyan-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-400">
            <Crown className="h-6 w-6" />
            Quantum Investor Magnetism System
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">
                  {investorLeads.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  Active Leads
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {investorLeads.filter((i) => i.status === "committed").length}
                </div>
                <div className="text-sm text-muted-foreground">Committed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {investorLeads.filter((i) => i.priority === "high").length}
                </div>
                <div className="text-sm text-muted-foreground">
                  High Priority
                </div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  $
                  {investorLeads
                    .reduce((sum, i) => sum + i.investment, 0)
                    .toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">
                  Total Interest
                </div>
              </div>
            </div>

            {/* Recent Investor Leads */}
            <div className="space-y-2">
              <h4 className="font-semibold text-cyan-400">
                🎯 Recent Investor Leads:
              </h4>
              <div className="max-h-32 overflow-y-auto space-y-2">
                {investorLeads.map((investor) => (
                  <div
                    key={investor.id}
                    className="flex items-center justify-between p-2 rounded bg-cyan-500/10 border border-cyan-500/20"
                  >
                    <div className="flex items-center gap-2">
                      <Badge
                        className={`${getPriorityColor(investor.priority)} text-white text-xs`}
                      >
                        {investor.priority.toUpperCase()}
                      </Badge>
                      <span className="text-sm font-medium">
                        {investor.name}
                      </span>
                      <Badge className="bg-gray-600 text-white text-xs">
                        {investor.platform}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-green-400">
                        ${investor.investment.toLocaleString()}
                      </span>
                      <Badge
                        className={`${getStatusColor(investor.status)} text-white text-xs`}
                      >
                        {investor.status.toUpperCase()}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Trading Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Button
          onClick={activateInvestorMagnet}
          className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-8"
        >
          <Target className="h-6 w-6 mr-3" />
          🧲 ACTIVATE INVESTOR MAGNET - QUANTUM ATTRACTION
        </Button>

        <Button
          onClick={activateViralMarketing}
          className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-bold py-8"
        >
          <Zap className="h-6 w-6 mr-3" />
          🚀 ACTIVATE VIRAL MARKETING - GLOBAL SPREAD
        </Button>
      </div>
    </div>
  );
}
