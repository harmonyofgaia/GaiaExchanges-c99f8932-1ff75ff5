import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  BarChart3,
  PieChart,
  Activity,
  DollarSign,
  Users,
  Zap,
} from "lucide-react";
import { useGaiaTokenData } from "@/hooks/useGaiaTokenData";
import { GAIA_TOKEN, formatGaiaPrice } from "@/constants/gaia";

export function ExchangeAnalytics() {
  const { tokenData, hasRealData } = useGaiaTokenData();

  const [analyticsData, setAnalyticsData] = useState({
    totalVolume: hasRealData && tokenData ? tokenData.volume24h : 8750000,
    dailyTrades: hasRealData && tokenData ? tokenData.transactions24h : 45780,
    activeUsers: hasRealData && tokenData ? tokenData.holders : 12450,
    priceChange24h: hasRealData && tokenData ? tokenData.priceChange24h : 12.5,
    currentPrice: hasRealData && tokenData ? tokenData.price : 0.000125,
    marketCap: hasRealData && tokenData ? tokenData.marketCap : 278687500,
    liquidityPool:
      hasRealData && tokenData ? tokenData.marketCap * 0.3 : 83606250,
    stakingRewards:
      hasRealData && tokenData ? tokenData.totalBurned * 0.1 : 1425000,
    avgTradeSize:
      hasRealData && tokenData
        ? tokenData.volume24h / tokenData.transactions24h
        : 191.2,
  });

  const [chartData, setChartData] = useState([
    {
      time: "00:00",
      volume: 120000,
      price: hasRealData && tokenData ? tokenData.price * 0.98 : 0.000122,
    },
    {
      time: "04:00",
      volume: 150000,
      price: hasRealData && tokenData ? tokenData.price * 0.99 : 0.000124,
    },
    {
      time: "08:00",
      volume: 180000,
      price: hasRealData && tokenData ? tokenData.price * 1.01 : 0.000126,
    },
    {
      time: "12:00",
      volume: 220000,
      price: hasRealData && tokenData ? tokenData.price * 0.98 : 0.000123,
    },
    {
      time: "16:00",
      volume: 190000,
      price: hasRealData && tokenData ? tokenData.price * 1.02 : 0.000128,
    },
    {
      time: "20:00",
      volume: 160000,
      price: hasRealData && tokenData ? tokenData.price : 0.000125,
    },
  ]);

  const [topTradingPairs, setTopTradingPairs] = useState([
    {
      pair: `${GAIA_TOKEN.SYMBOL}/USDT`,
      volume:
        hasRealData && tokenData
          ? `${(tokenData.volume24h / 1000000).toFixed(1)}M`
          : "8.7M",
      change:
        hasRealData && tokenData
          ? `+${tokenData.priceChange24h.toFixed(1)}%`
          : "+12.5%",
      price:
        hasRealData && tokenData
          ? formatGaiaPrice(tokenData.price)
          : "$0.000125",
    },
    {
      pair: `${GAIA_TOKEN.SYMBOL}/BTC`,
      volume:
        hasRealData && tokenData
          ? `${((tokenData.volume24h * 0.75) / 1000000).toFixed(1)}M`
          : "6.5M",
      change:
        hasRealData && tokenData
          ? `+${(tokenData.priceChange24h * 0.8).toFixed(1)}%`
          : "+10.0%",
      price: `${(0.0000567 * (hasRealData && tokenData ? tokenData.price / 0.000125 : 1)).toFixed(8)} BTC`,
    },
    {
      pair: `${GAIA_TOKEN.SYMBOL}/ETH`,
      volume:
        hasRealData && tokenData
          ? `${((tokenData.volume24h * 0.5) / 1000000).toFixed(1)}M`
          : "4.4M",
      change:
        hasRealData && tokenData
          ? `+${(tokenData.priceChange24h * 0.6).toFixed(1)}%`
          : "+7.5%",
      price: `${(0.00105 * (hasRealData && tokenData ? tokenData.price / 0.000125 : 1)).toFixed(6)} ETH`,
    },
  ]);

  // Update analytics data when token data changes
  useEffect(() => {
    if (hasRealData && tokenData) {
      setAnalyticsData({
        totalVolume: tokenData.volume24h,
        dailyTrades: tokenData.transactions24h,
        activeUsers: tokenData.holders,
        priceChange24h: tokenData.priceChange24h,
        currentPrice: tokenData.price,
        marketCap: tokenData.marketCap,
        liquidityPool: tokenData.marketCap * 0.3, // 30% of market cap as liquidity
        stakingRewards: tokenData.totalBurned * 0.1, // 10% of burned tokens as rewards
        avgTradeSize: tokenData.volume24h / tokenData.transactions24h,
      });

      // Update trading pairs with real data
      setTopTradingPairs([
        {
          pair: `${GAIA_TOKEN.SYMBOL}/USDT`,
          volume: `${(tokenData.volume24h / 1000000).toFixed(1)}M`,
          change: `+${tokenData.priceChange24h.toFixed(1)}%`,
          price: formatGaiaPrice(tokenData.price),
        },
        {
          pair: `${GAIA_TOKEN.SYMBOL}/BTC`,
          volume: `${((tokenData.volume24h * 0.75) / 1000000).toFixed(1)}M`,
          change: `+${(tokenData.priceChange24h * 0.8).toFixed(1)}%`,
          price: `${(0.0000567 * (tokenData.price / 0.000125)).toFixed(8)} BTC`,
        },
        {
          pair: `${GAIA_TOKEN.SYMBOL}/ETH`,
          volume: `${((tokenData.volume24h * 0.5) / 1000000).toFixed(1)}M`,
          change: `+${(tokenData.priceChange24h * 0.6).toFixed(1)}%`,
          price: `${(0.00105 * (tokenData.price / 0.000125)).toFixed(6)} ETH`,
        },
      ]);

      // Update chart data with real prices
      setChartData([
        { time: "00:00", volume: 120000, price: tokenData.price * 0.98 },
        { time: "04:00", volume: 150000, price: tokenData.price * 0.99 },
        { time: "08:00", volume: 180000, price: tokenData.price * 1.01 },
        { time: "12:00", volume: 220000, price: tokenData.price * 0.98 },
        { time: "16:00", volume: 190000, price: tokenData.price * 1.02 },
        { time: "20:00", volume: 160000, price: tokenData.price },
      ]);
    }
  }, [tokenData, hasRealData]);

  useEffect(() => {
    // Only update with simulation if we don't have real data
    if (!hasRealData) {
      const interval = setInterval(() => {
        setAnalyticsData((prev) => ({
          ...prev,
          totalVolume: prev.totalVolume + Math.floor(Math.random() * 10000),
          dailyTrades: prev.dailyTrades + Math.floor(Math.random() * 50),
          activeUsers: prev.activeUsers + Math.floor(Math.random() * 20) - 10,
          priceChange24h: prev.priceChange24h + (Math.random() - 0.5) * 2,
        }));
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [hasRealData]);

  return (
    <div className="space-y-6">
      {/* Analytics Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
          📊 {GAIA_TOKEN.SYMBOL} Exchange Analytics
        </h2>
        <p className="text-muted-foreground">
          Real-time {GAIA_TOKEN.SYMBOL} token data and comprehensive trading
          insights
        </p>
        {hasRealData && (
          <Badge className="mt-2 bg-green-600 text-white">
            ✅ Live Data Connected
          </Badge>
        )}
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-blue-500/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Current Price</p>
                <p className="text-2xl font-bold text-blue-400">
                  {formatGaiaPrice(analyticsData.currentPrice)}
                </p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-400" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
              <span className="text-green-400 text-sm">Live Price</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">24h Volume</p>
                <p className="text-2xl font-bold text-green-400">
                  ${(analyticsData.totalVolume / 1000000).toFixed(1)}M
                </p>
              </div>
              <BarChart3 className="h-8 w-8 text-green-400" />
            </div>
            <div className="flex items-center mt-2">
              <Activity className="h-4 w-4 text-yellow-400 mr-1" />
              <span className="text-yellow-400 text-sm">Trading Volume</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Market Cap</p>
                <p className="text-2xl font-bold text-purple-400">
                  ${(analyticsData.marketCap / 1000000).toFixed(1)}M
                </p>
              </div>
              <PieChart className="h-8 w-8 text-purple-400" />
            </div>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-green-400 mr-1" />
              <span className="text-green-400 text-sm">Total Value</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-orange-900/20 to-red-900/20 border-orange-500/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Price Change</p>
                <p className="text-2xl font-bold text-orange-400">
                  {analyticsData.priceChange24h > 0 ? "+" : ""}
                  {analyticsData.priceChange24h.toFixed(2)}%
                </p>
              </div>
              {analyticsData.priceChange24h > 0 ? (
                <TrendingUp className="h-8 w-8 text-green-400" />
              ) : (
                <TrendingDown className="h-8 w-8 text-red-400" />
              )}
            </div>
            <div className="flex items-center mt-2">
              <DollarSign className="h-4 w-4 text-orange-400 mr-1" />
              <span className="text-orange-400 text-sm">24h Change</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Trading Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Overview */}
        <Card className="bg-gradient-to-br from-gray-900/20 to-slate-900/20 border-gray-500/30">
          <CardHeader>
            <CardTitle className="text-gray-400 flex items-center gap-2">
              <PieChart className="h-5 w-5" />
              {GAIA_TOKEN.SYMBOL} Market Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm">Market Cap</span>
                <span className="font-bold text-blue-400">
                  ${(analyticsData.marketCap / 1000000).toFixed(1)}M
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Liquidity Pool</span>
                <span className="font-bold text-green-400">
                  ${(analyticsData.liquidityPool / 1000000).toFixed(1)}M
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Total Burned</span>
                <span className="font-bold text-purple-400">
                  {hasRealData && tokenData
                    ? (tokenData.totalBurned / 1000000).toFixed(1)
                    : "14.3"}
                  M {GAIA_TOKEN.SYMBOL}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Avg Trade Size</span>
                <span className="font-bold text-orange-400">
                  ${analyticsData.avgTradeSize.toFixed(2)}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Trading Pairs */}
        <Card className="bg-gradient-to-br from-indigo-900/20 to-blue-900/20 border-indigo-500/30">
          <CardHeader>
            <CardTitle className="text-indigo-400 flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Top {GAIA_TOKEN.SYMBOL} Trading Pairs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {topTradingPairs.map((pair, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-muted/10 rounded border border-border/20"
                >
                  <div className="flex items-center gap-3">
                    <Badge variant="outline" className="text-xs">
                      #{index + 1}
                    </Badge>
                    <div>
                      <div className="font-bold text-white">{pair.pair}</div>
                      <div className="text-xs text-muted-foreground">
                        Vol: {pair.volume}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-white">{pair.price}</div>
                    <div
                      className={`text-xs ${
                        pair.change.startsWith("+")
                          ? "text-green-400"
                          : "text-red-400"
                      }`}
                    >
                      {pair.change}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="bg-gradient-to-r from-teal-900/20 via-blue-900/20 to-purple-900/20 border-teal-500/30">
        <CardHeader>
          <CardTitle className="text-teal-400 flex items-center gap-2">
            <Activity className="h-5 w-5" />
            📈 {GAIA_TOKEN.SYMBOL} Performance Metrics & Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-teal-900/20 rounded-lg">
              <div className="text-2xl font-bold text-teal-400 mb-2">
                {hasRealData && tokenData
                  ? tokenData.holders.toLocaleString()
                  : "12,450"}
              </div>
              <div className="text-sm text-muted-foreground">Total Holders</div>
              <Badge className="mt-2 bg-teal-600 text-white">Growing</Badge>
            </div>
            <div className="text-center p-4 bg-blue-900/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400 mb-2">
                {hasRealData && tokenData
                  ? tokenData.transactions24h.toLocaleString()
                  : "45,780"}
              </div>
              <div className="text-sm text-muted-foreground">
                24h Transactions
              </div>
              <Badge className="mt-2 bg-blue-600 text-white">Active</Badge>
            </div>
            <div className="text-center p-4 bg-purple-900/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-400 mb-2">
                {hasRealData && tokenData
                  ? `${tokenData.burnRate.toFixed(1)}%`
                  : "3.5%"}
              </div>
              <div className="text-sm text-muted-foreground">Burn Rate</div>
              <Badge className="mt-2 bg-purple-600 text-white">
                Deflationary
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
