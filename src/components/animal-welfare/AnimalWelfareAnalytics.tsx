import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  Area,
  AreaChart,
} from "recharts";
import {
  TrendingUp,
  Heart,
  Globe,
  Users,
  Target,
  Award,
  Zap,
  Camera,
  DollarSign,
  Activity,
} from "lucide-react";

export function AnimalWelfareAnalytics() {
  const [realTimeData, setRealTimeData] = useState({
    totalAnimalsProtected: 247891,
    fundsRaised: 1547820,
    activeRescues: 45,
    globalPartners: 247,
    liveCameras: 156,
    nftsSold: 8947,
    carbonOffset: 2456,
    treesPlanted: 89542,
  });

  // Funding by region data
  const fundingByRegion = [
    { name: "Africa", amount: 425600, percentage: 28 },
    { name: "Asia", amount: 387200, percentage: 25 },
    { name: "Americas", amount: 310400, percentage: 20 },
    { name: "Europe", amount: 248800, percentage: 16 },
    { name: "Oceania", amount: 175820, percentage: 11 },
  ];

  // Species protection data
  const speciesData = [
    { name: "Elephants", protected: 2847, endangered: 415000, percentage: 0.69 },
    { name: "Rhinos", protected: 1240, endangered: 27000, percentage: 4.59 },
    { name: "Tigers", protected: 890, endangered: 3900, percentage: 22.82 },
    { name: "Pandas", protected: 456, endangered: 1864, percentage: 24.46 },
    { name: "Gorillas", protected: 234, endangered: 1000, percentage: 23.40 },
    { name: "Sea Turtles", protected: 5678, endangered: 85000, percentage: 6.68 },
  ];

  // Monthly rescue trends
  const monthlyRescues = [
    { month: "Jan", rescues: 89, funding: 125000 },
    { month: "Feb", rescues: 124, funding: 156000 },
    { month: "Mar", rescues: 167, funding: 189000 },
    { month: "Apr", rescues: 198, funding: 234000 },
    { month: "May", rescues: 245, funding: 267000 },
    { month: "Jun", rescues: 289, funding: 298000 },
  ];

  // Conservation impact over time
  const conservationImpact = [
    { month: "Jan", carbonOffset: 145, treesPlanted: 12400 },
    { month: "Feb", carbonOffset: 289, treesPlanted: 15600 },
    { month: "Mar", carbonOffset: 456, treesPlanted: 18900 },
    { month: "Apr", carbonOffset: 678, treesPlanted: 23400 },
    { month: "May", carbonOffset: 934, treesPlanted: 28700 },
    { month: "Jun", carbonOffset: 1245, treesPlanted: 34500 },
  ];

  // NFT marketplace data
  const nftCategories = [
    { name: "Endangered Species", value: 3456, color: "#ef4444" },
    { name: "Conservation Heroes", value: 2134, color: "#10b981" },
    { name: "Habitat Protectors", value: 1789, color: "#3b82f6" },
    { name: "Rescue Animals", value: 1568, color: "#f59e0b" },
  ];

  // Global impact metrics
  const globalImpactMetrics = [
    {
      title: "Animals Rescued",
      value: realTimeData.totalAnimalsProtected,
      change: "+12.5%",
      trend: "up",
      icon: Heart,
      color: "text-green-400",
    },
    {
      title: "Funds Raised (GAiA)",
      value: realTimeData.fundsRaised,
      change: "+18.3%",
      trend: "up",
      icon: DollarSign,
      color: "text-blue-400",
    },
    {
      title: "Active Rescues",
      value: realTimeData.activeRescues,
      change: "+5.7%",
      trend: "up",
      icon: Activity,
      color: "text-orange-400",
    },
    {
      title: "Global Partners",
      value: realTimeData.globalPartners,
      change: "+8.2%",
      trend: "up",
      icon: Globe,
      color: "text-purple-400",
    },
  ];

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        totalAnimalsProtected: prev.totalAnimalsProtected + Math.floor(Math.random() * 3),
        fundsRaised: prev.fundsRaised + Math.floor(Math.random() * 100),
        activeRescues: prev.activeRescues + (Math.random() > 0.8 ? 1 : 0),
      }));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const COLORS = ["#ef4444", "#10b981", "#3b82f6", "#f59e0b"];

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-blue-500/50 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            📊 ANIMAL WELFARE ANALYTICS DASHBOARD
          </CardTitle>
          <p className="text-center text-lg text-muted-foreground">
            Real-time insights into global animal welfare impact and conservation efforts
          </p>
        </CardHeader>
      </Card>

      {/* Real-time Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {globalImpactMetrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <Card key={index} className="border-cyan-500/30 bg-cyan-900/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{metric.title}</p>
                    <p className="text-2xl font-bold">{metric.value.toLocaleString()}</p>
                    <p className={`text-sm ${metric.color}`}>
                      {metric.change} from last month
                    </p>
                  </div>
                  <Icon className={`h-8 w-8 ${metric.color}`} />
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Analytics Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">📈 Overview</TabsTrigger>
          <TabsTrigger value="funding">💰 Funding</TabsTrigger>
          <TabsTrigger value="species">🦁 Species</TabsTrigger>
          <TabsTrigger value="conservation">🌿 Conservation</TabsTrigger>
          <TabsTrigger value="nft">🎨 NFT Market</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Rescues Trend */}
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="text-green-400">Monthly Animal Rescues</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyRescues}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#1f2937", 
                        border: "1px solid #10b981",
                        borderRadius: "8px"
                      }} 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="rescues" 
                      stroke="#10b981" 
                      fill="#10b981" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Funding Trends */}
            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="text-blue-400">Monthly Funding (GAiA)</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyRescues}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="month" stroke="#9ca3af" />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: "#1f2937", 
                        border: "1px solid #3b82f6",
                        borderRadius: "8px"
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="funding" 
                      stroke="#3b82f6" 
                      strokeWidth={3}
                      dot={{ fill: "#3b82f6", strokeWidth: 2, r: 6 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity Feed */}
          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400">🔴 Live Activity Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-green-800/30 rounded-lg">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-sm">🐘 3 elephants rescued in Kenya - 2 minutes ago</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-blue-800/30 rounded-lg">
                  <div className="w-3 h-3 bg-blue-400 rounded-full animate-pulse" />
                  <span className="text-sm">💰 500 GAiA donated to marine conservation - 4 minutes ago</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-orange-800/30 rounded-lg">
                  <div className="w-3 h-3 bg-orange-400 rounded-full animate-pulse" />
                  <span className="text-sm">🎨 New Tiger NFT sold for 150 GAiA - 7 minutes ago</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-purple-800/30 rounded-lg">
                  <div className="w-3 h-3 bg-purple-400 rounded-full animate-pulse" />
                  <span className="text-sm">📹 New live camera activated in Amazon - 12 minutes ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="funding" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Funding by Region */}
            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="text-blue-400">Funding by Region</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fundingByRegion.map((region, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{region.name}</span>
                        <span>{region.amount.toLocaleString()} GAiA ({region.percentage}%)</span>
                      </div>
                      <Progress value={region.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Funding Distribution Chart */}
            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="text-purple-400">Funding Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={fundingByRegion}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percentage }) => `${name} ${percentage}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                    >
                      {fundingByRegion.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="species" className="space-y-6">
          <Card className="border-orange-500/30 bg-orange-900/20">
            <CardHeader>
              <CardTitle className="text-orange-400">Endangered Species Protection Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {speciesData.map((species, index) => (
                  <div key={index} className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold">{species.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {species.protected.toLocaleString()} protected of {species.endangered.toLocaleString()} endangered
                        </p>
                      </div>
                      <Badge className="bg-orange-600">
                        {species.percentage.toFixed(2)}%
                      </Badge>
                    </div>
                    <Progress value={species.percentage} className="h-3" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="conservation" className="space-y-6">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400">Environmental Impact Over Time</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={conservationImpact}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" />
                  <YAxis stroke="#9ca3af" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: "#1f2937", 
                      border: "1px solid #10b981",
                      borderRadius: "8px"
                    }} 
                  />
                  <Area 
                    type="monotone" 
                    dataKey="carbonOffset" 
                    stackId="1"
                    stroke="#10b981" 
                    fill="#10b981" 
                    fillOpacity={0.6}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="treesPlanted" 
                    stackId="2"
                    stroke="#34d399" 
                    fill="#34d399" 
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nft" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* NFT Sales by Category */}
            <Card className="border-pink-500/30 bg-pink-900/20">
              <CardHeader>
                <CardTitle className="text-pink-400">NFT Sales by Category</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={nftCategories}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {nftCategories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* NFT Market Stats */}
            <Card className="border-cyan-500/30 bg-cyan-900/20">
              <CardHeader>
                <CardTitle className="text-cyan-400">NFT Marketplace Statistics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-cyan-800/30 rounded-lg">
                    <span>Total NFTs Sold</span>
                    <span className="font-bold text-cyan-400">{realTimeData.nftsSold.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-cyan-800/30 rounded-lg">
                    <span>Average Sale Price</span>
                    <span className="font-bold text-cyan-400">127 GAiA</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-cyan-800/30 rounded-lg">
                    <span>Total Volume</span>
                    <span className="font-bold text-cyan-400">1,136,269 GAiA</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-cyan-800/30 rounded-lg">
                    <span>Active Collectors</span>
                    <span className="font-bold text-cyan-400">4,521</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
