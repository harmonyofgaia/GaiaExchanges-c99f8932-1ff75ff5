import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart3, TrendingUp, Activity } from "lucide-react";
import { GAIA_METRICS } from "@/constants/gaia";

interface AnalyticsData {
  totalTrades: number;
  activeUsers: number;
  systemHealth: number;
  networkSpeed: number;
}

export function ChartAnalytics() {
  const [analytics, setAnalytics] = useState<AnalyticsData>({
    totalTrades: GAIA_METRICS.INITIAL_TRANSACTIONS,
    activeUsers: GAIA_METRICS.INITIAL_HOLDERS,
    systemHealth: GAIA_METRICS.ECOSYSTEM_HEALTH,
    networkSpeed: GAIA_METRICS.NETWORK_SPEED,
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setAnalytics((prev) => ({
        ...prev,
        totalTrades: prev.totalTrades + Math.floor(Math.random() * 20) + 5,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 10),
        systemHealth: Math.max(90, Math.min(100, prev.systemHealth + (Math.random() - 0.5) * 2)),
        networkSpeed: Math.max(
          2000,
          Math.min(3000, prev.networkSpeed + (Math.random() - 0.5) * 100)
        ),
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <BarChart3 className="h-6 w-6" />
          Chart Analytics Dashboard
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-black/30 rounded-lg border border-purple-500/30">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-green-400" />
              <span className="text-green-400 font-semibold">Trading Activity</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {analytics.totalTrades.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Total Trades</div>
            <Progress value={85} className="mt-2 h-2" />
          </div>

          <div className="p-4 bg-black/30 rounded-lg border border-blue-500/30">
            <div className="flex items-center gap-2 mb-2">
              <Activity className="h-4 w-4 text-blue-400" />
              <span className="text-blue-400 font-semibold">Active Users</span>
            </div>
            <div className="text-2xl font-bold text-white mb-1">
              {analytics.activeUsers.toLocaleString()}
            </div>
            <div className="text-sm text-gray-400">Online Now</div>
            <Progress value={92} className="mt-2 h-2" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-black/30 rounded-lg border border-green-500/30">
            <h4 className="text-green-400 font-semibold mb-2">System Health</h4>
            <div className="text-2xl font-bold text-green-400 mb-1">
              {analytics.systemHealth.toFixed(1)}%
            </div>
            <Progress value={analytics.systemHealth} className="h-2" />
            <Badge className="mt-2 bg-green-600 text-white">Excellent</Badge>
          </div>

          <div className="p-4 bg-black/30 rounded-lg border border-cyan-500/30">
            <h4 className="text-cyan-400 font-semibold mb-2">Network Speed</h4>
            <div className="text-2xl font-bold text-cyan-400 mb-1">
              {analytics.networkSpeed.toFixed(0)} TPS
            </div>
            <Progress value={(analytics.networkSpeed / 3000) * 100} className="h-2" />
            <Badge className="mt-2 bg-cyan-600 text-white">High Performance</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
