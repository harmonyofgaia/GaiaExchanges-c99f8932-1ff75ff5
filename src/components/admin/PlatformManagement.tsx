import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TrendingUp,
  Globe,
  Shield,
  Building2,
  ExternalLink,
  BarChart3,
  Users,
  DollarSign,
  Network,
  Zap,
  Lock,
  Eye,
  Download,
} from "lucide-react";
import { toast } from "sonner";

interface ExchangeIntegration {
  name: string;
  status: "active" | "pending" | "maintenance";
  volume24h: number;
  fees: number;
  pairs: number;
  uptime: number;
}

interface InvestmentOpportunity {
  title: string;
  type: "partnership" | "expansion" | "investment";
  amount: string;
  roi: string;
  status: "open" | "negotiating" | "completed";
  priority: "high" | "medium" | "low";
}

export function PlatformManagement() {
  const [exchanges, setExchanges] = useState<ExchangeIntegration[]>([
    {
      name: "Binance",
      status: "active",
      volume24h: 2400000000,
      fees: 0.1,
      pairs: 847,
      uptime: 99.9,
    },
    {
      name: "Coinbase Pro",
      status: "active",
      volume24h: 1200000000,
      fees: 0.5,
      pairs: 289,
      uptime: 99.8,
    },
    {
      name: "KuCoin",
      status: "pending",
      volume24h: 800000000,
      fees: 0.1,
      pairs: 456,
      uptime: 99.7,
    },
    {
      name: "Huobi",
      status: "maintenance",
      volume24h: 600000000,
      fees: 0.2,
      pairs: 234,
      uptime: 98.5,
    },
  ]);

  const [investments, setInvestments] = useState<InvestmentOpportunity[]>([
    {
      title: "European Market Expansion",
      type: "expansion",
      amount: "$25M",
      roi: "340%",
      status: "open",
      priority: "high",
    },
    {
      title: "Strategic Partnership with Revolut",
      type: "partnership",
      amount: "$15M",
      roi: "280%",
      status: "negotiating",
      priority: "high",
    },
    {
      title: "Asian Infrastructure Investment",
      type: "investment",
      amount: "$50M",
      roi: "450%",
      status: "open",
      priority: "medium",
    },
    {
      title: "DeFi Protocol Integration",
      type: "partnership",
      amount: "$8M",
      roi: "220%",
      status: "completed",
      priority: "low",
    },
  ]);

  const [metrics, setMetrics] = useState({
    totalExchanges: 47,
    activePartnerships: 12,
    pendingDeals: 8,
    totalVolume: 8.4e9,
    globalReach: 189,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        totalVolume: prev.totalVolume * (1 + (Math.random() - 0.5) * 0.001),
        activePartnerships:
          prev.activePartnerships + (Math.random() < 0.1 ? 1 : 0),
      }));

      setExchanges((prev) =>
        prev.map((exchange) => ({
          ...exchange,
          volume24h: exchange.volume24h * (1 + (Math.random() - 0.5) * 0.02),
          uptime: Math.max(
            95,
            Math.min(100, exchange.uptime + (Math.random() - 0.5) * 0.1),
          ),
        })),
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-600";
      case "pending":
        return "bg-yellow-600";
      case "maintenance":
        return "bg-red-600";
      case "open":
        return "bg-blue-600";
      case "negotiating":
        return "bg-orange-600";
      case "completed":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "text-red-400";
      case "medium":
        return "text-yellow-400";
      case "low":
        return "text-green-400";
      default:
        return "text-gray-400";
    }
  };

  const initiatePartnership = (opportunity: InvestmentOpportunity) => {
    toast.success("🤝 Partnership Initiative Started", {
      description: `Contacting stakeholders for ${opportunity.title}`,
      duration: 5000,
    });
  };

  const deployToExchange = (exchange: ExchangeIntegration) => {
    toast.success("🚀 Exchange Deployment Initiated", {
      description: `GAiA token deployment to ${exchange.name} starting...`,
      duration: 5000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Admin Header */}
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 via-indigo-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent flex items-center gap-3">
            <img
              src="/lovable-uploads/e2cc6708-58e6-4f52-b2ad-b98967ce3b7c.png"
              alt="Harmony of Gaia"
              className="w-8 h-8"
            />
            🔧 ADMIN PLATFORM MANAGEMENT CENTER
            <Lock className="h-6 w-6 text-purple-400" />
          </CardTitle>
          <p className="text-purple-400">
            Administrative control for global expansion and multi-exchange
            integrations
          </p>
        </CardHeader>
      </Card>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Exchanges</p>
                <p className="text-2xl font-bold text-green-400">
                  {metrics.totalExchanges}
                </p>
              </div>
              <Building2 className="h-8 w-8 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">
                  Active Partnerships
                </p>
                <p className="text-2xl font-bold text-blue-400">
                  {metrics.activePartnerships}
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/30 to-orange-900/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Pending Deals</p>
                <p className="text-2xl font-bold text-yellow-400">
                  {metrics.pendingDeals}
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-2xl font-bold text-purple-400">
                  ${(metrics.totalVolume / 1e9).toFixed(1)}B
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-900/30 to-blue-900/30">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Global Reach</p>
                <p className="text-2xl font-bold text-cyan-400">
                  {metrics.globalReach} Countries
                </p>
              </div>
              <Globe className="h-8 w-8 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="exchanges" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="exchanges">
            Multi-Exchange Integration
          </TabsTrigger>
          <TabsTrigger value="expansion">
            Global Expansion & Investment
          </TabsTrigger>
        </TabsList>

        <TabsContent value="exchanges" className="space-y-6">
          <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                🔧 Admin Multi-Exchange Integration System
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {exchanges.map((exchange, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-black/30 border border-gray-500/30"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-white">
                          {exchange.name}
                        </h4>
                        <Badge
                          className={`${getStatusColor(exchange.status)} text-white text-xs`}
                        >
                          {exchange.status}
                        </Badge>
                      </div>
                      <Button
                        onClick={() => deployToExchange(exchange)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Zap className="h-4 w-4 mr-1" />
                        Deploy
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          24h Volume
                        </span>
                        <div className="font-bold text-green-400">
                          ${(exchange.volume24h / 1e9).toFixed(2)}B
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Trading Pairs
                        </span>
                        <div className="font-bold text-blue-400">
                          {exchange.pairs}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Fees</span>
                        <div className="font-bold text-yellow-400">
                          {exchange.fees}%
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Uptime</span>
                        <div className="font-bold text-purple-400">
                          {exchange.uptime.toFixed(1)}%
                        </div>
                      </div>
                    </div>

                    <div className="mt-3">
                      <div className="flex justify-between text-xs mb-1">
                        <span>Integration Progress</span>
                        <span className="text-green-400">
                          {exchange.status === "active"
                            ? "100%"
                            : exchange.status === "pending"
                              ? "75%"
                              : "45%"}
                        </span>
                      </div>
                      <Progress
                        value={
                          exchange.status === "active"
                            ? 100
                            : exchange.status === "pending"
                              ? 75
                              : 45
                        }
                        className="h-2"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="expansion" className="space-y-6">
          <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/30 to-orange-900/30">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                🔧 Admin Global Expansion & Investment Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {investments.map((investment, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg bg-black/30 border border-gray-500/30"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-white">
                          {investment.title}
                        </h4>
                        <Badge
                          className={`${getStatusColor(investment.status)} text-white text-xs`}
                        >
                          {investment.status}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={`${getPriorityColor(investment.priority)} border-current text-xs`}
                        >
                          {investment.priority} priority
                        </Badge>
                      </div>
                      <Button
                        onClick={() => initiatePartnership(investment)}
                        size="sm"
                        className="bg-yellow-600 hover:bg-yellow-700"
                      >
                        <ExternalLink className="h-4 w-4 mr-1" />
                        Initiate
                      </Button>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">
                          Investment Amount
                        </span>
                        <div className="font-bold text-green-400">
                          {investment.amount}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">
                          Expected ROI
                        </span>
                        <div className="font-bold text-blue-400">
                          {investment.roi}
                        </div>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Type</span>
                        <div className="font-bold text-purple-400 capitalize">
                          {investment.type}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 rounded-lg bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30">
                <h4 className="font-semibold text-blue-400 mb-3">
                  🤝 Strategic Partnerships
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Institutional investors ($5M+ portfolio)</li>
                    <li>• Licensed financial service providers</li>
                    <li>• Global regulatory compliance teams</li>
                    <li>• Web3 infrastructure partners</li>
                  </ul>
                  <ul className="space-y-1 text-muted-foreground">
                    <li>• Available on all major app stores</li>
                    <li>• Multi-blockchain network support</li>
                    <li>• 24/7 automated trading systems</li>
                    <li>• Real-time global market data</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
