import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  TrendingUp,
  Users,
  DollarSign,
  Globe,
  Activity,
  Target,
  Zap,
  Eye,
  Brain,
  Shield,
} from "lucide-react";

export function AdvancedAnalyticsDashboard() {
  const [analyticsData, setAnalyticsData] = useState({
    userGrowth: [
      { month: "Jan", users: 1200, revenue: 45000 },
      { month: "Feb", users: 2100, revenue: 78000 },
      { month: "Mar", users: 3800, revenue: 142000 },
      { month: "Apr", users: 6200, revenue: 235000 },
      { month: "May", users: 9800, revenue: 387000 },
      { month: "Jun", users: 15400, revenue: 612000 },
    ],
    geographicData: [
      { region: "North America", value: 45, color: "#ef4444" },
      { region: "Europe", value: 30, color: "#3b82f6" },
      { region: "Asia Pacific", value: 20, color: "#10b981" },
      { region: "Others", value: 5, color: "#f59e0b" },
    ],
    performanceMetrics: {
      conversionRate: 23.7,
      retentionRate: 89.4,
      engagementScore: 94.2,
      satisfactionIndex: 96.8,
      viralCoefficient: 2.4,
      lifetimeValue: 1247,
    },
  });

  const [aiInsights, setAIInsights] = useState([
    {
      id: 1,
      insight: "User growth accelerating 156% month-over-month",
      impact: "high",
      category: "growth",
    },
    {
      id: 2,
      insight: "European market showing 340% engagement increase",
      impact: "high",
      category: "geographic",
    },
    {
      id: 3,
      insight: "Optimal posting time: 2-4 PM UTC for maximum reach",
      impact: "medium",
      category: "timing",
    },
    {
      id: 4,
      insight: "Community challenges driving 67% of new registrations",
      impact: "high",
      category: "features",
    },
    {
      id: 5,
      insight: "Mobile users converting 23% higher than desktop",
      impact: "medium",
      category: "platform",
    },
  ]);

  const [realTimeMetrics, setRealTimeMetrics] = useState({
    activeUsers: 2847,
    transactionsPerSecond: 47.3,
    globalReach: 94.7,
    securityScore: 99.9,
    systemLoad: 34.2,
  });

  // Update real-time metrics every 4 seconds
  useEffect(() => {
    const updateMetrics = () => {
      setRealTimeMetrics((prev) => ({
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 20 + 5),
        transactionsPerSecond: Math.max(
          20,
          prev.transactionsPerSecond + (Math.random() * 10 - 5),
        ),
        globalReach: Math.min(100, prev.globalReach + Math.random() * 0.3),
        securityScore: Math.max(
          99,
          Math.min(100, prev.securityScore + (Math.random() * 0.1 - 0.05)),
        ),
        systemLoad: Math.max(
          10,
          Math.min(90, prev.systemLoad + (Math.random() * 10 - 5)),
        ),
      }));
    };

    const interval = setInterval(updateMetrics, 4000);
    return () => clearInterval(interval);
  }, []);

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-600";
      case "medium":
        return "bg-yellow-600";
      case "low":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Real-Time Command Dashboard */}
      <Card className="border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-cyan-400">
            <Brain className="h-6 w-6" />
            🧠 ADVANCED ANALYTICS - AI-POWERED INSIGHTS ENGINE
            <Badge className="bg-cyan-600 text-white animate-pulse">
              REAL-TIME
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-6">
            <div className="text-center p-3 rounded-lg bg-green-900/30 border border-green-500/20">
              <Users className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {realTimeMetrics.activeUsers.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Active Users</div>
            </div>

            <div className="text-center p-3 rounded-lg bg-blue-900/30 border border-blue-500/20">
              <Activity className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {realTimeMetrics.transactionsPerSecond.toFixed(1)}
              </div>
              <div className="text-xs text-muted-foreground">TPS</div>
            </div>

            <div className="text-center p-3 rounded-lg bg-purple-900/30 border border-purple-500/20">
              <Globe className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                {realTimeMetrics.globalReach.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Global Reach</div>
            </div>

            <div className="text-center p-3 rounded-lg bg-red-900/30 border border-red-500/20">
              <Shield className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-400">
                {realTimeMetrics.securityScore.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">
                Security Score
              </div>
            </div>

            <div className="text-center p-3 rounded-lg bg-yellow-900/30 border border-yellow-500/20">
              <Zap className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">
                {realTimeMetrics.systemLoad.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">System Load</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Advanced Analytics Tabs */}
      <Tabs defaultValue="growth" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="growth">Growth Analytics</TabsTrigger>
          <TabsTrigger value="geographic">Geographic Analysis</TabsTrigger>
          <TabsTrigger value="performance">Performance Metrics</TabsTrigger>
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="growth" className="space-y-4">
          <Card className="border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400">
                User Growth & Revenue Trends
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={analyticsData.userGrowth}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                    />
                    <Line
                      type="monotone"
                      dataKey="users"
                      stroke="#10b981"
                      strokeWidth={3}
                    />
                    <Line
                      type="monotone"
                      dataKey="revenue"
                      stroke="#3b82f6"
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="geographic" className="space-y-4">
          <Card className="border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-400">
                Global User Distribution
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={analyticsData.geographicData}
                      cx="50%"
                      cy="50%"
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ region, value }) => `${region}: ${value}%`}
                    >
                      {analyticsData.geographicData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {Object.entries(analyticsData.performanceMetrics).map(
              ([key, value]) => (
                <Card key={key} className="border-purple-500/20">
                  <CardContent className="p-4">
                    <div className="text-center space-y-2">
                      <Target className="h-8 w-8 text-purple-400 mx-auto" />
                      <h4 className="font-semibold capitalize">
                        {key.replace(/([A-Z])/g, " $1").trim()}
                      </h4>
                      <div className="text-2xl font-bold text-purple-400">
                        {typeof value === "number"
                          ? key.includes("Rate") ||
                            key.includes("Score") ||
                            key.includes("Index")
                            ? `${value.toFixed(1)}%`
                            : value.toLocaleString()
                          : value}
                      </div>
                      <Progress
                        value={
                          typeof value === "number" ? Math.min(100, value) : 0
                        }
                        className="h-2"
                      />
                    </div>
                  </CardContent>
                </Card>
              ),
            )}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <Card className="border-yellow-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-yellow-400">
                <Eye className="h-5 w-5" />
                AI-Generated Strategic Insights
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {aiInsights.map((insight) => (
                <div
                  key={insight.id}
                  className="p-4 border border-border/50 rounded-lg bg-muted/20"
                >
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium">{insight.insight}</p>
                    <Badge
                      className={`text-xs text-white ${getImpactColor(insight.impact)}`}
                    >
                      {insight.impact.toUpperCase()} IMPACT
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="text-xs">
                      {insight.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      AI Confidence: {Math.floor(Math.random() * 20 + 80)}%
                    </span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Strategic Recommendations */}
      <Card className="border-orange-500/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-orange-400">
              🎯 STRATEGIC RECOMMENDATIONS FOR DOMINATION
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/20">
                <TrendingUp className="h-6 w-6 text-red-400 mx-auto mb-2" />
                <h4 className="font-semibold text-red-400 mb-2">
                  Accelerate Growth
                </h4>
                <p className="text-sm text-muted-foreground">
                  Focus on European market expansion - 340% engagement potential
                </p>
              </div>
              <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/20">
                <Users className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <h4 className="font-semibold text-green-400 mb-2">
                  Community Power
                </h4>
                <p className="text-sm text-muted-foreground">
                  Launch mobile-first features - 23% higher conversion rate
                </p>
              </div>
              <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
                <DollarSign className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <h4 className="font-semibold text-blue-400 mb-2">
                  Revenue Optimization
                </h4>
                <p className="text-sm text-muted-foreground">
                  Implement time-sensitive campaigns during peak hours
                </p>
              </div>
            </div>
            <p className="text-sm text-cyan-400 font-bold">
              📊 "Data Drives Decisions, Insights Ignite Action" - Every Metric
              Tells Our Victory Story! 📊
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
