import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
import { TreePine, Droplets, Zap, Recycle, Globe, TrendingUp, Award, Target } from "lucide-react";
import { Navbar } from "@/components/Navbar";

interface ImpactData {
  category: string;
  value: number;
  unit: string;
  change: number;
  icon: React.ReactNode;
  color: string;
}

interface GlobalMetric {
  title: string;
  current: number;
  target: number;
  unit: string;
  color: string;
}

export default function ImpactMetrics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("month");
  const [personalImpact, setPersonalImpact] = useState<ImpactData[]>([]);
  const [globalMetrics, setGlobalMetrics] = useState<GlobalMetric[]>([]);

  useEffect(() => {
    // Simulate real-time impact data
    const mockPersonalImpact: ImpactData[] = [
      {
        category: "Carbon Offset",
        value: 247.5,
        unit: "kg CO₂",
        change: 12.5,
        icon: <TreePine className="h-5 w-5" />,
        color: "text-green-400",
      },
      {
        category: "Water Saved",
        value: 1834,
        unit: "liters",
        change: 8.3,
        icon: <Droplets className="h-5 w-5" />,
        color: "text-blue-400",
      },
      {
        category: "Energy Generated",
        value: 456.7,
        unit: "kWh",
        change: 15.2,
        icon: <Zap className="h-5 w-5" />,
        color: "text-yellow-400",
      },
      {
        category: "Waste Recycled",
        value: 89.3,
        unit: "kg",
        change: 6.7,
        icon: <Recycle className="h-5 w-5" />,
        color: "text-purple-400",
      },
    ];

    const mockGlobalMetrics: GlobalMetric[] = [
      {
        title: "Global Carbon Offset",
        current: 2847291,
        target: 5000000,
        unit: "tonnes CO₂",
        color: "bg-green-600",
      },
      {
        title: "Trees Planted",
        current: 1234567,
        target: 2000000,
        unit: "trees",
        color: "bg-emerald-600",
      },
      {
        title: "Ocean Plastic Removed",
        current: 45623,
        target: 100000,
        unit: "kg",
        color: "bg-blue-600",
      },
      {
        title: "Renewable Energy",
        current: 78934,
        target: 150000,
        unit: "MWh",
        color: "bg-yellow-600",
      },
    ];

    setPersonalImpact(mockPersonalImpact);
    setGlobalMetrics(mockGlobalMetrics);
  }, [selectedTimeframe]);

  const chartData = [
    { name: "Jan", carbon: 45, water: 320, energy: 67, waste: 23 },
    { name: "Feb", carbon: 52, water: 287, energy: 89, waste: 31 },
    { name: "Mar", carbon: 48, water: 398, energy: 78, waste: 28 },
    { name: "Apr", carbon: 67, water: 456, energy: 112, waste: 45 },
    { name: "May", carbon: 89, water: 523, energy: 134, waste: 52 },
    { name: "Jun", carbon: 156, water: 687, energy: 189, waste: 67 },
  ];

  const pieData = [
    { name: "Solar Energy", value: 35, color: "#FCD34D" },
    { name: "Water Conservation", value: 28, color: "#60A5FA" },
    { name: "Waste Reduction", value: 22, color: "#A78BFA" },
    { name: "Carbon Offset", value: 15, color: "#34D399" },
  ];

  const achievements = [
    {
      title: "Carbon Hero",
      description: "Offset 200kg CO₂ this month",
      icon: "🌱",
      earned: true,
    },
    {
      title: "Water Guardian",
      description: "Saved 1000+ liters",
      icon: "💧",
      earned: true,
    },
    {
      title: "Energy Pioneer",
      description: "Generated 500kWh clean energy",
      icon: "⚡",
      earned: false,
    },
    {
      title: "Eco Influencer",
      description: "Inspired 10+ community members",
      icon: "🌟",
      earned: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            📊 Environmental Impact Metrics
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Track Your Positive Environmental Impact in Real-Time
          </p>
        </div>

        {/* Time Frame Selector */}
        <div className="flex gap-4 mb-8">
          {["week", "month", "quarter", "year"].map((timeframe) => (
            <Button
              key={timeframe}
              onClick={() => setSelectedTimeframe(timeframe)}
              className={`capitalize ${
                selectedTimeframe === timeframe
                  ? "bg-green-600 text-white"
                  : "bg-gray-800 text-gray-300 hover:bg-gray-700"
              }`}
            >
              {timeframe}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Personal Impact Cards */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {personalImpact.map((impact, index) => (
              <Card
                key={impact.category}
                className="bg-gradient-to-br from-gray-900/50 to-black/50 border-gray-700/30"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className={impact.color}>{impact.icon}</div>
                      <CardTitle className="text-lg">{impact.category}</CardTitle>
                    </div>
                    <Badge className={`${impact.change >= 0 ? "bg-green-600" : "bg-red-600"}`}>
                      {impact.change >= 0 ? "+" : ""}
                      {impact.change}%
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold mb-2 text-white">
                    {impact.value.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground">{impact.unit}</div>
                  <div className="mt-4">
                    <div className="flex items-center gap-2 text-sm">
                      <TrendingUp className="h-4 w-4 text-green-400" />
                      <span className="text-green-400">
                        +{((impact.value * impact.change) / 100).toFixed(1)} {impact.unit} this{" "}
                        {selectedTimeframe}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Global Impact Summary */}
          <div className="space-y-6">
            <Card className="bg-purple-900/20 border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  🌍 Global Impact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {globalMetrics.map((metric) => (
                  <div key={metric.title}>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm font-medium">{metric.title}</span>
                      <span className="text-sm text-muted-foreground">
                        {Math.round((metric.current / metric.target) * 100)}%
                      </span>
                    </div>
                    <Progress value={(metric.current / metric.target) * 100} className="h-2 mb-1" />
                    <div className="text-xs text-muted-foreground">
                      {metric.current.toLocaleString()} / {metric.target.toLocaleString()}{" "}
                      {metric.unit}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            {/* Achievements */}
            <Card className="bg-yellow-900/20 border-yellow-500/30">
              <CardHeader>
                <CardTitle className="text-yellow-400 flex items-center gap-2">
                  <Award className="h-5 w-5" />
                  🏆 Achievements
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.title}
                    className={`flex items-center gap-3 p-2 rounded-lg ${
                      achievement.earned
                        ? "bg-green-900/20 border border-green-500/30"
                        : "bg-gray-900/20 border border-gray-600/30"
                    }`}
                  >
                    <div className="text-xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div
                        className={`font-medium ${achievement.earned ? "text-green-400" : "text-gray-400"}`}
                      >
                        {achievement.title}
                      </div>
                      <div className="text-xs text-muted-foreground">{achievement.description}</div>
                    </div>
                    {achievement.earned && <Badge className="bg-green-600">✓</Badge>}
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Impact Trend Chart */}
          <Card className="bg-gray-900/50 border-gray-700/30">
            <CardHeader>
              <CardTitle className="text-green-400">📈 Impact Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1F2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                  <Line type="monotone" dataKey="carbon" stroke="#34D399" strokeWidth={2} />
                  <Line type="monotone" dataKey="water" stroke="#60A5FA" strokeWidth={2} />
                  <Line type="monotone" dataKey="energy" stroke="#FCD34D" strokeWidth={2} />
                  <Line type="monotone" dataKey="waste" stroke="#A78BFA" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Impact Distribution */}
          <Card className="bg-gray-900/50 border-gray-700/30">
            <CardHeader>
              <CardTitle className="text-blue-400">🥧 Impact Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Impact Goals */}
        <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <Target className="h-5 w-5" />
              🎯 Monthly Impact Goals
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">🌱</div>
                <div className="text-2xl font-bold text-green-400">300kg</div>
                <div className="text-sm text-muted-foreground">Carbon Offset Goal</div>
                <Progress value={82.5} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💧</div>
                <div className="text-2xl font-bold text-blue-400">2000L</div>
                <div className="text-sm text-muted-foreground">Water Saving Goal</div>
                <Progress value={91.7} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <div className="text-2xl font-bold text-yellow-400">500kWh</div>
                <div className="text-sm text-muted-foreground">Energy Goal</div>
                <Progress value={91.3} className="mt-2" />
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">♻️</div>
                <div className="text-2xl font-bold text-purple-400">100kg</div>
                <div className="text-sm text-muted-foreground">Recycling Goal</div>
                <Progress value={89.3} className="mt-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
