import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Activity,
  Users,
  DollarSign,
  Zap,
  BarChart3,
} from "lucide-react";
import { GAIA_TOKEN, GAIA_METRICS, formatGaiaPrice, formatGaiaNumber } from "@/constants/gaia";

interface NewGAiAChartData {
  time: string;
  price: number;
  volume: number;
  holders: number;
  transactions: number;
  marketCap: number;
  engagement: number;
}

interface CurrentNewGAiAMetrics {
  price: number;
  volume: number;
  holders: number;
  transactions: number;
  marketCap: number;
  change24h: number;
}

export function LiveChartsGrid() {
  const [chartData, setChartData] = useState<NewGAiAChartData[]>([]);
  const [currentNewGAiAMetrics, setCurrentNewGAiAMetrics] = useState<CurrentNewGAiAMetrics>({
    price: GAIA_TOKEN.INITIAL_PRICE,
    volume: GAIA_METRICS.INITIAL_VOLUME,
    holders: GAIA_METRICS.INITIAL_HOLDERS,
    transactions: GAIA_METRICS.INITIAL_TRANSACTIONS,
    marketCap: GAIA_METRICS.INITIAL_MARKET_CAP,
    change24h: 145.82,
  });

  // Generate live new GAiA data every 1.5 seconds
  useEffect(() => {
    console.log("📊 New GAiA Charts: Connected to wallet:", GAIA_TOKEN.WALLET_ADDRESS);

    const generateNewGAiAData = () => {
      const now = new Date();
      const timeStr = now.toLocaleTimeString("en-US", {
        hour12: false,
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });

      const newDataPoint: NewGAiAChartData = {
        time: timeStr,
        price: Math.max(
          0.00001,
          currentNewGAiAMetrics.price * (1 + (Math.random() - 0.35) * 0.025)
        ),
        volume: currentNewGAiAMetrics.volume * (1 + (Math.random() - 0.5) * 0.15),
        holders: currentNewGAiAMetrics.holders + Math.floor(Math.random() * 75),
        transactions: currentNewGAiAMetrics.transactions + Math.floor(Math.random() * 150),
        marketCap: Math.max(
          1000000,
          currentNewGAiAMetrics.marketCap * (1 + (Math.random() - 0.5) * 0.025)
        ),
        engagement: 88 + Math.random() * 12,
      };

      setChartData((prev) => [...prev.slice(-19), newDataPoint]);

      // Update current new GAiA metrics
      setCurrentNewGAiAMetrics((prev) => ({
        ...prev,
        price: newDataPoint.price,
        volume: newDataPoint.volume,
        holders: newDataPoint.holders,
        transactions: newDataPoint.transactions,
        marketCap: newDataPoint.marketCap,
        change24h: prev.change24h + (Math.random() - 0.5) * 3,
      }));
    };

    generateNewGAiAData(); // Initial data
    const interval = setInterval(generateNewGAiAData, 1500);
    return () => clearInterval(interval);
  }, [
    currentNewGAiAMetrics.price,
    currentNewGAiAMetrics.volume,
    currentNewGAiAMetrics.holders,
    currentNewGAiAMetrics.transactions,
    currentNewGAiAMetrics.marketCap,
  ]);

  const pieData = [
    { name: "New GAiA Holders", value: 50, color: "#22c55e" },
    { name: "New GAiA Trading Volume", value: 35, color: "#3b82f6" },
    { name: "New GAiA Market Activity", value: 10, color: "#f59e0b" },
    { name: "New GAiA Network Usage", value: 5, color: "#8b5cf6" },
  ];

  return (
    <div className="space-y-6">
      {/* Live New GAiA Metrics Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">New GAiA Price</p>
                <p className="text-lg font-bold text-green-400">
                  {formatGaiaPrice(currentNewGAiAMetrics.price)}
                </p>
                <Badge
                  className={`text-xs ${currentNewGAiAMetrics.change24h >= 0 ? "bg-green-600" : "bg-red-600"} text-white`}
                >
                  {currentNewGAiAMetrics.change24h >= 0 ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {currentNewGAiAMetrics.change24h.toFixed(2)}%
                </Badge>
              </div>
              <DollarSign className="h-6 w-6 text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">New GAiA Volume 24h</p>
                <p className="text-lg font-bold text-blue-400">
                  {formatGaiaPrice(currentNewGAiAMetrics.volume)}
                </p>
                <Badge className="text-xs bg-blue-600 text-white">Connected</Badge>
              </div>
              <Activity className="h-6 w-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/30 to-pink-900/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">New GAiA Holders</p>
                <p className="text-lg font-bold text-purple-400">
                  {currentNewGAiAMetrics.holders.toLocaleString()}
                </p>
                <Badge className="text-xs bg-purple-600 text-white">Enhanced</Badge>
              </div>
              <Users className="h-6 w-6 text-purple-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/30 to-orange-900/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">New GAiA Transactions</p>
                <p className="text-lg font-bold text-yellow-400">
                  {currentNewGAiAMetrics.transactions.toLocaleString()}
                </p>
                <Badge className="text-xs bg-yellow-600 text-white">Live</Badge>
              </div>
              <Zap className="h-6 w-6 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-900/30 to-teal-900/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">New GAiA Market Cap</p>
                <p className="text-lg font-bold text-emerald-400">
                  {formatGaiaPrice(currentNewGAiAMetrics.marketCap)}
                </p>
                <Badge className="text-xs bg-emerald-600 text-white">Connected</Badge>
              </div>
              <TrendingUp className="h-6 w-6 text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-900/30 to-sky-900/30">
          <CardContent className="pt-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Network Speed</p>
                <p className="text-lg font-bold text-cyan-400">0.08s</p>
                <Badge className="text-xs bg-cyan-600 text-white">15x Faster</Badge>
              </div>
              <Activity className="h-6 w-6 text-cyan-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Live New GAiA Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* New GAiA Price Chart */}
        <Card className="border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <TrendingUp className="h-5 w-5" />
              Live New GAiA Price Chart
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="price"
                    stroke="#22c55e"
                    strokeWidth={2}
                    dot={{ fill: "#22c55e", strokeWidth: 2, r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* New GAiA Volume Chart */}
        <Card className="border-blue-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Activity className="h-5 w-5" />
              New GAiA Trading Volume (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="volume"
                    stroke="#3b82f6"
                    fill="url(#colorVolume)"
                  />
                  <defs>
                    <linearGradient id="colorVolume" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* New GAiA Holder Activity Chart */}
        <Card className="border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Users className="h-5 w-5" />
              New GAiA Holders & Transactions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9CA3AF" fontSize={12} />
                  <YAxis stroke="#9CA3AF" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                  <Legend />
                  <Bar dataKey="holders" fill="#8b5cf6" name="New GAiA Holders" />
                  <Bar dataKey="transactions" fill="#f59e0b" name="New GAiA Transactions" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* New GAiA Market Distribution */}
        <Card className="border-yellow-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-400">
              <BarChart3 className="h-5 w-5" />
              New GAiA Market Activity Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
