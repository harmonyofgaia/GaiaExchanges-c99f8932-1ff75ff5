import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import {
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  ArrowDownRight,
  Smartphone,
  Download,
  Star,
  Shield,
  Zap,
  Globe,
  Users,
  BarChart3,
  DollarSign,
  Coins,
  Lock,
  Wifi,
  Heart,
} from "lucide-react";
import { toast } from "sonner";

const GaiasExchange = () => {
  const [marketData, setMarketData] = useState({
    gaiaPrice: 0.00247,
    gaiaChange: 12.5,
    btcPrice: 43567.89,
    btcChange: -2.3,
    ethPrice: 2345.67,
    ethChange: 5.7,
    totalVolume: 15420000,
    totalUsers: 247583,
    dailyTrades: 8947,
  });

  const [appDownloadStats, setAppDownloadStats] = useState({
    totalDownloads: 45230,
    dailyDownloads: 1247,
    appRating: 4.9,
    activeUsers: 23456,
    appVersion: "2.1.0",
  });

  const [tradingPairs] = useState([
    { pair: "GAIA/USDT", price: 0.00247, change: 12.5, volume: "2.4M" },
    { pair: "GAIA/BTC", price: 0.0000567, change: 8.3, volume: "1.8M" },
    { pair: "GAIA/ETH", price: 0.00105, change: -3.2, volume: "1.2M" },
    { pair: "BTC/USDT", price: 43567.89, change: -2.3, volume: "45.2M" },
    { pair: "ETH/USDT", price: 2345.67, change: 5.7, volume: "32.1M" },
    { pair: "USDT/USD", price: 1.0001, change: 0.01, volume: "89.5M" },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMarketData((prev) => ({
        ...prev,
        gaiaPrice: prev.gaiaPrice + (Math.random() - 0.5) * 0.0001,
        gaiaChange: prev.gaiaChange + (Math.random() - 0.5) * 2,
        totalVolume: prev.totalVolume + Math.floor(Math.random() * 10000),
        dailyTrades: prev.dailyTrades + Math.floor(Math.random() * 10),
      }));

      setAppDownloadStats((prev) => ({
        ...prev,
        totalDownloads: prev.totalDownloads + Math.floor(Math.random() * 5),
        dailyDownloads: prev.dailyDownloads + Math.floor(Math.random() * 3),
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20) - 10,
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const downloadApp = (platform: string) => {
    toast.success(`📱 Downloading Gaia's Exchange for ${platform}!`, {
      description:
        "The most trusted crypto exchange app - now available on all platforms!",
      duration: 5000,
    });
  };

  const executeInstantTrade = () => {
    toast.success("⚡ Instant Trade Executed!", {
      description: "Your GAIA tokens have been traded with minimal fees!",
      duration: 4000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-green-900/20 to-purple-900/20">
      <div className="container mx-auto px-4 py-6">
        {/* Exchange Header */}
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🏛️ GAIA'S EXCHANGE
          </h1>
          <p className="text-2xl text-muted-foreground mb-2">
            🌍 The World's Most Trusted Environmental Cryptocurrency Exchange
          </p>
          <p className="text-lg text-green-400">
            Available on All Platforms - Download Now from Your App Store!
          </p>
          <div className="flex justify-center gap-4 mt-4 flex-wrap">
            <Badge className="bg-gradient-to-r from-blue-600 to-green-600 text-white text-sm px-4 py-2">
              <Shield className="h-4 w-4 mr-2" />
              ULTRA SECURE
            </Badge>
            <Badge className="bg-gradient-to-r from-green-600 to-purple-600 text-white text-sm px-4 py-2">
              <Zap className="h-4 w-4 mr-2" />
              INSTANT TRADING
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-600 to-blue-600 text-white text-sm px-4 py-2">
              <Globe className="h-4 w-4 mr-2" />
              GLOBAL ACCESS
            </Badge>
          </div>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 border-2 border-green-500/50">
            <CardContent className="pt-4 text-center">
              <Coins className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">
                ${marketData.gaiaPrice.toFixed(6)}
              </div>
              <div className="text-xs text-green-300 flex items-center justify-center gap-1">
                <ArrowUpRight className="h-3 w-3" />+
                {marketData.gaiaChange.toFixed(2)}%
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                GAIA Token
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 border-2 border-orange-500/50">
            <CardContent className="pt-4 text-center">
              <DollarSign className="h-6 w-6 text-orange-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-orange-400">
                ${marketData.totalVolume.toLocaleString()}
              </div>
              <div className="text-xs text-orange-300">24h Volume</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-2 border-blue-500/50">
            <CardContent className="pt-4 text-center">
              <Users className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {marketData.totalUsers.toLocaleString()}
              </div>
              <div className="text-xs text-blue-300">Total Users</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50">
            <CardContent className="pt-4 text-center">
              <BarChart3 className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                {marketData.dailyTrades.toLocaleString()}
              </div>
              <div className="text-xs text-purple-300">Daily Trades</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trading Interface */}
          <div className="lg:col-span-2 space-y-6">
            {/* Trading Pairs */}
            <Card className="bg-gradient-to-br from-gray-900/30 to-blue-900/30 border-2 border-blue-500/50">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <BarChart3 className="h-6 w-6" />
                  📈 Live Trading Pairs - Real-Time Market Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {tradingPairs.map((pair, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 bg-muted/20 rounded border border-border/30 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <div className="font-bold text-white">{pair.pair}</div>
                        {pair.pair.includes("GAIA") && (
                          <Badge className="bg-green-600 text-white text-xs">
                            HOT
                          </Badge>
                        )}
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-white">
                          ${pair.price.toLocaleString()}
                        </div>
                        <div
                          className={`text-xs flex items-center gap-1 ${
                            pair.change > 0 ? "text-green-400" : "text-red-400"
                          }`}
                        >
                          {pair.change > 0 ? (
                            <ArrowUpRight className="h-3 w-3" />
                          ) : (
                            <ArrowDownRight className="h-3 w-3" />
                          )}
                          {pair.change > 0 ? "+" : ""}
                          {pair.change}%
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">
                          Vol: {pair.volume}
                        </div>
                        <Button
                          size="sm"
                          className="mt-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
                        >
                          Trade
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Trade */}
            <Card className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 border-2 border-green-500/50">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Zap className="h-6 w-6" />⚡ Instant GAIA Token Trading
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      From
                    </label>
                    <div className="flex gap-2">
                      <Input placeholder="Amount" className="flex-1" />
                      <Button variant="outline" className="min-w-20">
                        GAIA
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-muted-foreground mb-2 block">
                      To
                    </label>
                    <div className="flex gap-2">
                      <Input placeholder="Amount" className="flex-1" />
                      <Button variant="outline" className="min-w-20">
                        USDT
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Exchange Rate:</span>
                    <span className="text-green-400 font-bold">
                      1 GAIA = $0.00247
                    </span>
                  </div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Network Fee:</span>
                    <span className="text-green-400 font-bold">
                      0.1% (Lowest in Industry)
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Environmental Contribution:</span>
                    <span className="text-green-400 font-bold">
                      0.05% to Coral Reefs
                    </span>
                  </div>
                </div>

                <Button
                  onClick={executeInstantTrade}
                  className="w-full bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white font-bold py-3"
                >
                  <Zap className="h-5 w-5 mr-2" />⚡ EXECUTE INSTANT TRADE
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* App Download Section */}
          <div className="space-y-6">
            {/* Download Stats */}
            <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-2 border-purple-500/50">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <Smartphone className="h-5 w-5" />
                  📱 Mobile App Statistics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">Total Downloads:</span>
                    <span className="font-bold text-purple-400">
                      {appDownloadStats.totalDownloads.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Daily Downloads:</span>
                    <span className="font-bold text-green-400">
                      +{appDownloadStats.dailyDownloads}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">App Rating:</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="font-bold text-yellow-400">
                        {appDownloadStats.appRating}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Active Users:</span>
                    <span className="font-bold text-blue-400">
                      {appDownloadStats.activeUsers.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Current Version:</span>
                    <span className="font-bold text-cyan-400">
                      v{appDownloadStats.appVersion}
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* App Download Buttons */}
            <Card className="bg-gradient-to-br from-blue-900/30 to-green-900/30 border-2 border-blue-500/50">
              <CardHeader>
                <CardTitle className="text-blue-400 flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  📲 Download Gaia's Exchange App
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground text-center mb-4">
                  Access the world's most trusted environmental crypto exchange
                  on any device!
                </p>

                <div className="space-y-3">
                  <Button
                    onClick={() => downloadApp("iOS")}
                    className="w-full bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-800 hover:to-black text-white"
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    🍎 Download for iOS - App Store
                  </Button>

                  <Button
                    onClick={() => downloadApp("Android")}
                    className="w-full bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 text-white"
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    🤖 Download for Android - Google Play
                  </Button>

                  <Button
                    onClick={() => downloadApp("Windows")}
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-700 hover:to-blue-900 text-white"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    🪟 Download for Windows
                  </Button>

                  <Button
                    onClick={() => downloadApp("Mac")}
                    className="w-full bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    🍎 Download for macOS
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20 rounded-lg">
                  <div className="text-center">
                    <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <h4 className="font-bold text-green-400 mb-2">
                      🛡️ Ultra-Secure & Trusted
                    </h4>
                    <p className="text-xs text-muted-foreground">
                      Bank-level security, multi-factor authentication, and the
                      highest trust score in the industry
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Environmental Impact */}
            <Card className="bg-gradient-to-br from-green-900/30 to-cyan-900/30 border-2 border-green-500/50">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Heart className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <h4 className="font-bold text-green-400 mb-2">
                    🌍 Environmental Mission
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Every trade on Gaia's Exchange contributes to coral reef
                    restoration and environmental projects worldwide!
                  </p>
                  <div className="text-lg font-bold text-green-400 mb-1">
                    0.05% of all trades
                  </div>
                  <div className="text-xs text-green-300">
                    Goes directly to coral reef restoration
                  </div>

                  <div className="mt-4 p-3 bg-cyan-500/10 rounded border border-cyan-500/20">
                    <div className="text-sm font-bold text-cyan-400 mb-1">
                      🪸 Sound Riffs Re Grau dio Project
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Revolutionary underwater audio technology restoring coral
                      reefs worldwide
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trust Banner */}
        <div className="mt-8">
          <Card className="bg-gradient-to-r from-blue-900/30 via-green-900/30 to-purple-900/30 border-2 border-blue-500/50">
            <CardContent className="py-8">
              <div className="text-center">
                <div className="flex justify-center items-center gap-4 mb-4">
                  <Shield className="h-12 w-12 text-blue-400" />
                  <div className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
                    THE MOST TRUSTED EXCHANGE IN HISTORY
                  </div>
                  <Shield className="h-12 w-12 text-green-400" />
                </div>
                <p className="text-xl text-muted-foreground mb-6">
                  🏛️ Building the future of environmental cryptocurrency trading
                  with unmatched security and transparency
                </p>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="p-4 bg-blue-500/10 rounded border border-blue-500/20">
                    <Lock className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                    <div className="font-bold text-blue-400">
                      Bank-Level Security
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Military-grade encryption
                    </div>
                  </div>
                  <div className="p-4 bg-green-500/10 rounded border border-green-500/20">
                    <Wifi className="h-8 w-8 text-green-400 mx-auto mb-2" />
                    <div className="font-bold text-green-400">
                      24/7 Availability
                    </div>
                    <div className="text-xs text-muted-foreground">
                      99.99% uptime guarantee
                    </div>
                  </div>
                  <div className="p-4 bg-purple-500/10 rounded border border-purple-500/20">
                    <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                    <div className="font-bold text-purple-400">
                      Global Community
                    </div>
                    <div className="text-xs text-muted-foreground">
                      247K+ active traders
                    </div>
                  </div>
                  <div className="p-4 bg-cyan-500/10 rounded border border-cyan-500/20">
                    <Heart className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                    <div className="font-bold text-cyan-400">
                      Environmental Focus
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Every trade helps nature
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default GaiasExchange;
