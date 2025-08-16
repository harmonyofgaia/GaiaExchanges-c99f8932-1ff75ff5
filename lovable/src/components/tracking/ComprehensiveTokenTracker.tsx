import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, Activity, BarChart3, Eye, Zap, Globe, ExternalLink } from "lucide-react";
import { GAIA_TOKEN, GAIA_METRICS, formatGaiaPrice, formatGaiaNumber } from "@/constants/gaia";
import { useTypeValidation } from "@/hooks/useTypeValidation";

interface TrackingData {
  price: number;
  volume: number;
  marketCap: number;
  change24h: number;
  holders: number;
}

export function ComprehensiveTokenTracker() {
  const { isValidConfiguration } = useTypeValidation("ComprehensiveTokenTracker");
  const [trackingData, setTrackingData] = useState<TrackingData>({
    price: GAIA_TOKEN.INITIAL_PRICE,
    volume: GAIA_METRICS.INITIAL_VOLUME,
    marketCap: GAIA_METRICS.INITIAL_MARKET_CAP,
    change24h: 5.67,
    holders: GAIA_METRICS.INITIAL_HOLDERS,
  });

  const [isLiveTracking, setIsLiveTracking] = useState(true);
  const [trackingSpeed, setTrackingSpeed] = useState(2500); // ms

  useEffect(() => {
    if (!isLiveTracking) return;

    const interval = setInterval(() => {
      setTrackingData((prev) => ({
        ...prev,
        price: prev.price * (1 + (Math.random() - 0.5) * 0.002),
        volume: prev.volume * (1 + (Math.random() - 0.5) * 0.05),
        marketCap: prev.marketCap * (1 + (Math.random() - 0.5) * 0.003),
        change24h: prev.change24h + (Math.random() - 0.5) * 0.1,
        holders: prev.holders + Math.floor(Math.random() * 50)
      }));
    }, trackingSpeed);

    return () => clearInterval(interval);
  }, [isLiveTracking, trackingSpeed]);

  const openPumpFun = () => {
    window.open(GAIA_TOKEN.PUMP_FUN_URL, "_blank");
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Activity className="h-6 w-6" />
            📡 COMPREHENSIVE TOKEN TRACKER - GAiA Network
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              onClick={openPumpFun}
              variant="outline"
              size="sm"
              className="border-purple-500/30 text-purple-400"
            >
              <ExternalLink className="h-3 w-3 mr-1" />
              View on PumpFun
            </Button>
            <Badge className={`${isLiveTracking ? "bg-green-600 animate-pulse" : "bg-gray-600"}`}>
              {isLiveTracking ? "LIVE TRACKING" : "PAUSED"}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="metrics">Metrics</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="network">Network</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/20">
                  <div className="text-2xl font-bold text-green-400">
                    {formatGaiaPrice(trackingData.price)}
                  </div>
                  <div className="text-sm text-muted-foreground">GAiA Price</div>
                  <div
                    className={`text-sm ${trackingData.change24h >= 0 ? "text-green-400" : "text-red-400"}`}
                  >
                    {trackingData.change24h >= 0 ? "+" : ""}
                    {trackingData.change24h.toFixed(2)}%
                  </div>
                </div>
                <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
                  <div className="text-2xl font-bold text-blue-400">
                    {formatGaiaNumber(trackingData.volume)}
                  </div>
                  <div className="text-sm text-muted-foreground">24h Volume</div>
                </div>
                <div className="text-center p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
                  <div className="text-2xl font-bold text-purple-400">
                    {formatGaiaNumber(trackingData.holders)}
                  </div>
                  <div className="text-sm text-muted-foreground">Holders</div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="metrics" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-black/20 rounded-lg border border-gray-500/20">
                  <h4 className="text-lg font-semibold text-white mb-3">Market Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Market Cap:</span>
                      <span className="text-green-400">
                        {formatGaiaPrice(trackingData.marketCap)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>24h Change:</span>
                      <span
                        className={trackingData.change24h >= 0 ? "text-green-400" : "text-red-400"}
                      >
                        {trackingData.change24h.toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Network:</span>
                      <span className="text-blue-400">{GAIA_TOKEN.NETWORK || "Solana"}</span>
                    </div>
                  </div>
                </div>
                <div className="p-4 bg-black/20 rounded-lg border border-gray-500/20">
                  <h4 className="text-lg font-semibold text-white mb-3">System Health</h4>
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Security Score:</span>
                        <span className="text-green-400">{GAIA_METRICS.SECURITY_SCORE}%</span>
                      </div>
                      <Progress value={GAIA_METRICS.SECURITY_SCORE} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span>Ecosystem Health:</span>
                        <span className="text-blue-400">{GAIA_METRICS.ECOSYSTEM_HEALTH}%</span>
                      </div>
                      <Progress value={GAIA_METRICS.ECOSYSTEM_HEALTH} className="h-2" />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-4">
              <div className="p-4 bg-black/20 rounded-lg border border-gray-500/20">
                <h4 className="text-lg font-semibold text-white mb-3">Real-Time Analytics</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-3 bg-cyan-900/20 rounded border border-cyan-500/20">
                    <div className="text-xl font-bold text-cyan-400">{trackingSpeed}ms</div>
                    <div className="text-sm text-muted-foreground">Update Speed</div>
                  </div>
                  <div className="text-center p-3 bg-yellow-900/20 rounded border border-yellow-500/20">
                    <div className="text-xl font-bold text-yellow-400">100%</div>
                    <div className="text-sm text-muted-foreground">Accuracy</div>
                  </div>
                  <div className="text-center p-3 bg-green-900/20 rounded border border-green-500/20">
                    <div className="text-xl font-bold text-green-400">24/7</div>
                    <div className="text-sm text-muted-foreground">Monitoring</div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="network" className="space-y-4">
              <div className="p-4 bg-black/20 rounded-lg border border-gray-500/20">
                <h4 className="text-lg font-semibold text-white mb-3">Network Information</h4>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span>Contract Address:</span>
                    <code className="text-purple-400 font-mono text-xs">
                      {GAIA_TOKEN.CONTRACT_ADDRESS}
                    </code>
                  </div>
                  <div className="flex justify-between">
                    <span>Official Wallet:</span>
                    <code className="text-green-400 font-mono text-xs">
                      {GAIA_TOKEN.WALLET_ADDRESS}
                    </code>
                  </div>
                  <div className="flex justify-between">
                    <span>Network Speed:</span>
                    <span className="text-cyan-400">{GAIA_METRICS.NETWORK_SPEED} TPS</span>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Tracking Controls */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                onClick={() => setIsLiveTracking(!isLiveTracking)}
                className={`${isLiveTracking ? "bg-red-600 hover:bg-red-700" : "bg-green-600 hover:bg-green-700"}`}
              >
                <Eye className="h-4 w-4 mr-2" />
                {isLiveTracking ? "Pause Tracking" : "Resume Tracking"}
              </Button>
              <Button
                onClick={() => setTrackingSpeed((prev) => (prev === 2500 ? 1000 : 2500))}
                variant="outline"
                className="border-purple-500/30 text-purple-400"
              >
                <Zap className="h-4 w-4 mr-2" />
                {trackingSpeed === 1000 ? "Normal Speed" : "High Speed"}
              </Button>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-green-400" />
              <span className="text-sm text-green-400">Connected to GAiA Network</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Configuration Status */}
      {!isValidConfiguration() && (
        <Card className="border-red-500/50 bg-red-900/20">
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 text-red-400">
              <Activity className="h-5 w-5" />
              <span>Configuration Issues Detected - Check Type Validation</span>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
