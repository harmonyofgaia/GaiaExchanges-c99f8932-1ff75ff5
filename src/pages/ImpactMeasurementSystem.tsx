import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts";
import { TrendingUp, Target, Award, Activity, Leaf, Droplets, Wind, Globe } from "lucide-react";
import { Navbar } from "@/components/Navbar";

const impactData = [
  { month: "Jan", co2: 45, water: 120, energy: 78 },
  { month: "Feb", co2: 52, water: 145, energy: 89 },
  { month: "Mar", co2: 48, water: 138, energy: 95 },
  { month: "Apr", co2: 61, water: 167, energy: 102 },
  { month: "May", co2: 55, water: 189, energy: 118 },
  { month: "Jun", co2: 67, water: 201, energy: 134 },
];

export default function ImpactMeasurementSystem() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            📊 Impact Measurement System
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Comprehensive Environmental Impact Analytics & Reporting
          </p>
          <div className="flex gap-4 mt-4">
            <Badge variant="outline" className="border-green-500/50 text-green-400">
              <Activity className="h-3 w-3 mr-1" />
              Real-time Tracking
            </Badge>
            <Badge variant="outline" className="border-blue-500/50 text-blue-400">
              <Target className="h-3 w-3 mr-1" />
              Goal Achievement
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-green-400">CO₂ Reduction</CardTitle>
              <Leaf className="h-4 w-4 text-green-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">67K tons</div>
              <p className="text-xs text-muted-foreground">+22% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-blue-400">Water Saved</CardTitle>
              <Droplets className="h-4 w-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">201K L</div>
              <p className="text-xs text-muted-foreground">+18% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-yellow-900/20 to-black/50 border-yellow-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-yellow-400">Clean Energy</CardTitle>
              <Wind className="h-4 w-4 text-yellow-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">134 MWh</div>
              <p className="text-xs text-muted-foreground">+15% from last month</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-purple-400">Impact Score</CardTitle>
              <Award className="h-4 w-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">8.9/10</div>
              <p className="text-xs text-muted-foreground">Overall performance</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400">Environmental Impact Trends</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={impactData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Bar dataKey="co2" fill="#22c55e" />
                  <Bar dataKey="water" fill="#3b82f6" />
                  <Bar dataKey="energy" fill="#eab308" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-400">Goal Progress Tracking</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">Carbon Neutrality 2030</span>
                    <span className="text-green-400">73%</span>
                  </div>
                  <Progress value={73} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">
                    On track to meet 2030 targets
                  </p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">Renewable Energy Goal</span>
                    <span className="text-blue-400">89%</span>
                  </div>
                  <Progress value={89} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">Ahead of schedule</p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">Biodiversity Conservation</span>
                    <span className="text-purple-400">45%</span>
                  </div>
                  <Progress value={45} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">Accelerating efforts needed</p>
                </div>

                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-medium">Community Engagement</span>
                    <span className="text-yellow-400">67%</span>
                  </div>
                  <Progress value={67} className="h-3" />
                  <p className="text-xs text-muted-foreground mt-1">Growing participation</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400 text-center">Environmental KPIs</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Forest Coverage</span>
                <span className="text-green-400 font-bold">+12%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Air Quality Index</span>
                <span className="text-blue-400 font-bold">85/100</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Waste Reduction</span>
                <span className="text-purple-400 font-bold">34%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Species Protected</span>
                <span className="text-yellow-400 font-bold">247</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-400 text-center">Social Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Communities Served</span>
                <span className="text-green-400 font-bold">1,247</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Jobs Created</span>
                <span className="text-blue-400 font-bold">3,456</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Education Programs</span>
                <span className="text-purple-400 font-bold">89</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Health Improvements</span>
                <span className="text-yellow-400 font-bold">+28%</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-400 text-center">Economic Value</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Green Investment</span>
                <span className="text-green-400 font-bold">$45M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Cost Savings</span>
                <span className="text-blue-400 font-bold">$12.3M</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">ROI</span>
                <span className="text-purple-400 font-bold">327%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Market Value</span>
                <span className="text-yellow-400 font-bold">$89M</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
