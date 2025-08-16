import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { TrendingUp, Globe, DollarSign, Zap } from "lucide-react";
import { GAIA_TOKEN } from "@/constants/gaia";
import { useGaiaTokenData } from "@/hooks/useGaiaTokenData";

interface Exchange {
  name: string;
  status: "listing" | "active" | "pending" | "negotiating";
  volume: string;
  users: string;
  region: string;
}

export function GlobalExchangeIntegration() {
  const { tokenData, hasRealData } = useGaiaTokenData();

  const [exchanges, setExchanges] = useState<Exchange[]>([
    {
      name: "Binance",
      status: "negotiating",
      volume: "$2.1B",
      users: "120M",
      region: "Global",
    },
    {
      name: "Coinbase",
      status: "listing",
      volume: "$890M",
      users: "100M",
      region: "US/EU",
    },
    {
      name: "Kraken",
      status: "pending",
      volume: "$456M",
      users: "9M",
      region: "Global",
    },
    {
      name: "KuCoin",
      status: "active",
      volume: "$234M",
      users: "28M",
      region: "Global",
    },
    {
      name: "Huobi",
      status: "negotiating",
      volume: "$567M",
      users: "45M",
      region: "Asia",
    },
    {
      name: "OKEx",
      status: "listing",
      volume: "$678M",
      users: "32M",
      region: "Global",
    },
  ]);

  const [globalStats, setGlobalStats] = useState({
    totalVolume: hasRealData && tokenData ? tokenData.volume24h : 8750000,
    activeExchanges: 0,
    totalUsers: 0,
    marketCap: hasRealData && tokenData ? tokenData.marketCap : 278687500,
  });

  useEffect(() => {
    const globalIntegrationEngine = () => {
      console.log(`🌍 GLOBAL EXCHANGE INTEGRATION - ${GAIA_TOKEN.SYMBOL} WORLDWIDE DOMINATION`);
      console.log(`💰 ${GAIA_TOKEN.SYMBOL} TOKEN TAKING OVER ALL MAJOR EXCHANGES`);
      console.log("🚀 UNSTOPPABLE MARKET PENETRATION - EVERYWHERE AT ONCE");

      // Update exchange statuses
      setExchanges((prev) =>
        prev.map((exchange) => {
          if (Math.random() < 0.1) {
            const statuses: Exchange["status"][] = ["listing", "active", "negotiating"];
            const newStatus = statuses[Math.floor(Math.random() * statuses.length)];

            if (newStatus !== exchange.status) {
              toast.success("🚀 Exchange Update!", {
                description: `${exchange.name} status: ${newStatus} for ${GAIA_TOKEN.SYMBOL}`,
                duration: 5000,
              });
            }

            return { ...exchange, status: newStatus };
          }
          return exchange;
        })
      );

      // Update global stats
      setGlobalStats((prev) => ({
        totalVolume:
          (hasRealData && tokenData ? tokenData.volume24h : prev.totalVolume) +
          Math.random() * 1000000,
        activeExchanges: exchanges.filter((e) => e.status === "active").length,
        totalUsers: prev.totalUsers + Math.floor(Math.random() * 10000),
        marketCap:
          hasRealData && tokenData ? tokenData.marketCap : prev.marketCap + Math.random() * 500000,
      }));

      console.log(`💎 ${GAIA_TOKEN.SYMBOL} TOKEN: BECOMING THE #1 CRYPTOCURRENCY WORLDWIDE`);
    };

    const integrationInterval = setInterval(globalIntegrationEngine, 5000);
    globalIntegrationEngine();

    return () => clearInterval(integrationInterval);
  }, [exchanges, tokenData, hasRealData]);

  const accelerateListings = () => {
    toast.success("🚀 ACCELERATION PROTOCOL ACTIVATED!", {
      description: `All ${GAIA_TOKEN.SYMBOL} exchange listings fast-tracked with maximum priority`,
      duration: 8000,
    });

    setExchanges((prev) =>
      prev.map((exchange) => ({
        ...exchange,
        status: "active",
      }))
    );

    console.log(`⚡ ${GAIA_TOKEN.SYMBOL} EXCHANGE ACCELERATION: ALL BARRIERS REMOVED`);
  };

  const getStatusColor = (status: Exchange["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-600";
      case "listing":
        return "bg-blue-600";
      case "negotiating":
        return "bg-purple-600";
      case "pending":
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="border-green-500/50 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Globe className="h-6 w-6" />
            🌍 GLOBAL EXCHANGE INTEGRATION - {GAIA_TOKEN.SYMBOL} WORLDWIDE DOMINATION
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-3 bg-green-900/30 rounded-lg">
              <TrendingUp className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-green-400">
                ${globalStats.totalVolume.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Daily Volume</div>
            </div>

            <div className="text-center p-3 bg-blue-900/30 rounded-lg">
              <Globe className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-blue-400">{globalStats.activeExchanges}</div>
              <div className="text-xs text-muted-foreground">Active Exchanges</div>
            </div>

            <div className="text-center p-3 bg-purple-900/30 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-purple-400">
                ${globalStats.marketCap.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Market Cap</div>
            </div>

            <div className="text-center p-3 bg-orange-900/30 rounded-lg">
              <Zap className="h-6 w-6 text-orange-400 mx-auto mb-2" />
              <div className="text-xl font-bold text-orange-400">
                {globalStats.totalUsers.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Total Users</div>
            </div>
          </div>

          <Button
            onClick={accelerateListings}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3 mb-6"
          >
            <Zap className="h-5 w-5 mr-2" />
            🚀 ACCELERATE ALL {GAIA_TOKEN.SYMBOL} EXCHANGE LISTINGS - GLOBAL DOMINATION
          </Button>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {exchanges.map((exchange, index) => (
              <div key={index} className="p-4 bg-black/30 rounded-lg border border-border/30">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-white">{exchange.name}</h4>
                  <Badge className={`${getStatusColor(exchange.status)} text-white`}>
                    {exchange.status.toUpperCase()}
                  </Badge>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <div className="text-muted-foreground">Volume</div>
                    <div className="text-green-400 font-bold">{exchange.volume}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Users</div>
                    <div className="text-blue-400 font-bold">{exchange.users}</div>
                  </div>
                  <div>
                    <div className="text-muted-foreground">Region</div>
                    <div className="text-purple-400 font-bold">{exchange.region}</div>
                  </div>
                </div>
                <div className="mt-2 text-xs text-muted-foreground">
                  Supporting {GAIA_TOKEN.SYMBOL} trading pairs
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
