import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  ArrowUpDown,
  DollarSign,
  Shield,
  Zap,
  Network,
  Coins,
  Activity,
  Users,
  Database,
  Heart,
  LineChart,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { toast } from "sonner";
import { GAIA_TOKEN } from "@/constants/gaia";
import { useGaiaTokenData } from "@/hooks/useGaiaTokenData";

export default function Exchange() {
  const [tradeType, setTradeType] = useState<"buy" | "sell">("buy");
  const [amount, setAmount] = useState("");
  const [price, setPrice] = useState("");
  const [selectedPair, setSelectedPair] = useState(`${GAIA_TOKEN.SYMBOL}/USDT`);

  const { tokenData, hasRealData, isLoading } = useGaiaTokenData();

  // Use REAL GAiA token data or fallback to current values
  const currentPrice = hasRealData && tokenData ? tokenData.price : GAIA_TOKEN.INITIAL_PRICE;
  const priceChange = hasRealData && tokenData ? tokenData.priceChange24h : 12.5;
  const volume24h = hasRealData && tokenData ? tokenData.volume24h : 8750000;
  const marketCap = hasRealData && tokenData ? tokenData.marketCap : 278687500;
  const holders = hasRealData && tokenData ? tokenData.holders : 12450;
  const transactions = hasRealData && tokenData ? tokenData.transactions24h : 45780;

  const tradingPairs = [
    { pair: `${GAIA_TOKEN.SYMBOL}/USDT`, price: currentPrice, change: priceChange, volume: volume24h },
    { pair: `${GAIA_TOKEN.SYMBOL}/USDC`, price: currentPrice * 0.999, change: priceChange * 0.95, volume: volume24h * 0.6 },
    { pair: `${GAIA_TOKEN.SYMBOL}/SOL`, price: currentPrice / 150, change: priceChange * 0.8, volume: volume24h * 0.4 },
  ];

  const handleTrade = () => {
    if (!amount || !price) {
      toast.error("Please enter amount and price");
      return;
    }

    toast.success(
      `${tradeType.toUpperCase()} order placed: ${amount} ${GAIA_TOKEN.SYMBOL} at $${price}`,
      {
        description: `Order submitted to ${GAIA_TOKEN.NAME} on ${GAIA_TOKEN.NETWORK}`,
        duration: 3000,
      }
    );
    setAmount("");
    setPrice("");
  };

  const formatNumber = (num: number): string => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(2) + "M";
    }
    if (num >= 1000) {
      return (num / 1000).toFixed(2) + "K";
    }
    return num.toFixed(2);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/20 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                🌍 Gaia's Private Blockchain Exchange
              </h1>
              <p className="text-muted-foreground mt-2">
                The world's first carbon-negative trading platform
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="outline" className="border-green-500/50 text-green-400">
                <Heart className="h-3 w-3 mr-1" />
                Network Health: 99.8%
              </Badge>
              <Badge variant="outline" className="border-blue-500/50 text-blue-400">
                <Network className="h-3 w-3 mr-1" />
                120 Nodes
              </Badge>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          
          {/* Main Trading Interface */}
          <div className="xl:col-span-2 space-y-6">
            
            {/* Price Chart Area */}
            <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-500/30">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Coins className="h-6 w-6 text-green-400" />
                    {GAIA_TOKEN.NAME} - Live Trading
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-green-400">
                      ${currentPrice.toFixed(6)}
                    </span>
                    <div className={`flex items-center gap-1 ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                      {priceChange >= 0 ? <ArrowUpRight className="h-4 w-4" /> : <ArrowDownRight className="h-4 w-4" />}
                      <span>{Math.abs(priceChange).toFixed(2)}%</span>
                    </div>
                    {!hasRealData && (
                      <Badge variant="outline" className="text-yellow-400 border-yellow-500/50">
                        Demo Data
                      </Badge>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {/* Trading Chart Placeholder */}
                <div className="h-64 bg-black/20 rounded-lg flex items-center justify-center mb-6">
                  <div className="text-center">
                    <LineChart className="h-16 w-16 mx-auto text-green-400 mb-4" />
                    <p className="text-muted-foreground">Live Trading Chart</p>
                    <p className="text-sm text-muted-foreground">Real-time price movements for {GAIA_TOKEN.NAME}</p>
                    <p className="text-xs text-green-400">Contract: {GAIA_TOKEN.CONTRACT_ADDRESS}</p>
                  </div>
                </div>

                {/* Trading Pairs */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {tradingPairs.map((pair) => (
                    <div
                      key={pair.pair}
                      className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                        selectedPair === pair.pair
                          ? 'border-green-500/50 bg-green-500/10'
                          : 'border-border/50 bg-card/50 hover:border-green-500/30'
                      }`}
                      onClick={() => setSelectedPair(pair.pair)}
                    >
                      <div className="text-sm font-medium">{pair.pair}</div>
                      <div className="text-lg font-bold">${pair.price.toFixed(6)}</div>
                      <div className={`text-sm ${pair.change >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {pair.change >= 0 ? '+' : ''}{pair.change.toFixed(2)}%
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Market Statistics */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { label: "24h Volume", value: `$${formatNumber(volume24h)}`, icon: Activity, color: "text-blue-400" },
                { label: "Market Cap", value: `$${formatNumber(marketCap)}`, icon: DollarSign, color: "text-green-400" },
                { label: "Holders", value: formatNumber(holders), icon: Users, color: "text-purple-400" },
                { label: "24h Transactions", value: formatNumber(transactions), icon: Database, color: "text-yellow-400" },
              ].map((stat, index) => (
                <Card key={index} className="bg-card/50">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground">{stat.label}</p>
                        <p className="text-xl font-bold">{stat.value}</p>
                      </div>
                      <stat.icon className={`h-6 w-6 ${stat.color}`} />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Trading Panel */}
          <div className="space-y-6">
            <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-purple-400" />
                  Instant Trade
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Trading Pair
                  </label>
                  <select
                    value={selectedPair}
                    onChange={(e) => setSelectedPair(e.target.value)}
                    className="w-full p-3 bg-background border border-border rounded-lg"
                  >
                    {tradingPairs.map((pair) => (
                      <option key={pair.pair} value={pair.pair}>{pair.pair}</option>
                    ))}
                  </select>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant={tradeType === "buy" ? "default" : "outline"}
                    onClick={() => setTradeType("buy")}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Buy
                  </Button>
                  <Button
                    variant={tradeType === "sell" ? "default" : "outline"}
                    onClick={() => setTradeType("sell")}
                    className="flex-1 bg-red-600 hover:bg-red-700"
                  >
                    Sell
                  </Button>
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Amount ({GAIA_TOKEN.SYMBOL})
                  </label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div>
                  <label className="text-sm text-muted-foreground mb-2 block">
                    Price (USD)
                  </label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="text-lg"
                  />
                </div>

                <div className="p-3 bg-background/50 rounded-lg">
                  <div className="flex justify-between text-sm">
                    <span>Trading Fee:</span>
                    <span className="text-green-400">0% (Carbon Offset)</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Network Fee:</span>
                    <span className="text-blue-400">~0.001 {GAIA_TOKEN.SYMBOL}</span>
                  </div>
                  <div className="flex justify-between text-sm font-medium mt-2 pt-2 border-t border-border/50">
                    <span>Total:</span>
                    <span>{amount && price ? `$${(parseFloat(amount) * parseFloat(price)).toFixed(2)}` : '$0.00'}</span>
                  </div>
                </div>

                <Button
                  onClick={handleTrade}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-lg py-6"
                >
                  <ArrowUpDown className="h-5 w-5 mr-2" />
                  Execute {tradeType.toUpperCase()} Order
                </Button>
              </CardContent>
            </Card>

            {/* Network Status */}
            <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-400" />
                  Blockchain Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Network Health</span>
                    <span className="text-sm font-medium">99.8%</span>
                  </div>
                  <Progress value={99.8} className="h-2" />
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm">Active Nodes</span>
                    <span className="text-sm font-medium">120</span>
                  </div>
                  <Progress value={80} className="h-2" />
                </div>

                <div className="pt-2 border-t border-border/50">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Carbon Impact:</span>
                    <Badge variant="outline" className="border-green-500/50 text-green-400">
                      -100% CO2
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}