import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, ExternalLink, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { GAIA_TOKEN } from "@/constants/gaia";
import { useGaiaTokenData } from "@/hooks/useGaiaTokenData";

export function LivePumpFunData() {
  const { tokenData, hasRealData, isLoading } = useGaiaTokenData();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (tokenData) {
      setIsConnected(true);
    }
  }, [tokenData]);

  const openPumpFun = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, "_blank");
  };

  if (isLoading || !tokenData) {
    return (
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
        <CardContent className="pt-6">
          <div className="text-center text-green-400">Loading GAiA token data...</div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
      <CardHeader>
        <CardTitle className="flex items-center justify-between text-green-400">
          <div className="flex items-center gap-2">
            <Activity className="h-6 w-6" />
            🚀 LIVE GAiA Token Data - {GAIA_TOKEN.SYMBOL}
          </div>
          <div className="flex items-center gap-2">
            <Badge className={`${isConnected ? "bg-green-600" : "bg-red-600"} text-white`}>
              {isConnected ? "🟢 LIVE" : "🔴 OFFLINE"}
            </Badge>
            <Button onClick={openPumpFun} variant="outline" size="sm">
              <ExternalLink className="h-3 w-3 mr-1" />
              Trade Now
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="text-center p-4 bg-green-900/30 rounded-lg">
            <div className="text-2xl font-bold text-green-400">${tokenData.price.toFixed(8)}</div>
            <div className="text-sm text-muted-foreground">Current Price</div>
          </div>

          <div className="text-center p-4 bg-blue-900/30 rounded-lg">
            <div
              className={`text-2xl font-bold flex items-center justify-center gap-1 ${
                tokenData.priceChange24h >= 0 ? "text-green-400" : "text-red-400"
              }`}
            >
              {tokenData.priceChange24h >= 0 ? (
                <TrendingUp className="h-5 w-5" />
              ) : (
                <TrendingDown className="h-5 w-5" />
              )}
              {tokenData.priceChange24h >= 0 ? "+" : ""}
              {tokenData.priceChange24h.toFixed(2)}%
            </div>
            <div className="text-sm text-muted-foreground">24h Change</div>
          </div>

          <div className="text-center p-4 bg-purple-900/30 rounded-lg">
            <div className="text-2xl font-bold text-purple-400">
              ${tokenData.volume24h.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">24h Volume</div>
          </div>

          <div className="text-center p-4 bg-orange-900/30 rounded-lg">
            <div className="text-2xl font-bold text-orange-400">
              ${tokenData.marketCap.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Market Cap</div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-3 bg-cyan-900/20 rounded-lg">
            <div className="text-lg font-bold text-cyan-400">
              {tokenData.holders.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">Token Holders</div>
          </div>

          <div className="text-center p-3 bg-yellow-900/20 rounded-lg">
            <div className="text-lg font-bold text-yellow-400">
              {tokenData.transactions24h.toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground">24h Transactions</div>
          </div>

          <div className="text-center p-3 bg-pink-900/20 rounded-lg">
            <div className="text-lg font-bold text-pink-400">
              {tokenData.circulatingSupply ? tokenData.circulatingSupply.toLocaleString() : "N/A"}
            </div>
            <div className="text-xs text-muted-foreground">Circulating Supply</div>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-muted-foreground">
          Last updated: {tokenData.lastUpdated.toLocaleTimeString()} | Contract:{" "}
          {GAIA_TOKEN.CONTRACT_ADDRESS.slice(0, 20)}...
        </div>
      </CardContent>
    </Card>
  );
}
