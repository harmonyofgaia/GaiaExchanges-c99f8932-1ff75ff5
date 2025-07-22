import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Leaf, 
  Globe, 
  Zap, 
  Droplets, 
  TreePine, 
  Award,
  TrendingUp,
  Users,
  Target,
  CheckCircle,
  BarChart3,
  PieChart
} from 'lucide-react';

interface ImpactMetrics {
  carbonFootprintReduced: number;
  treesPlanted: number;
  wasteRecycled: number;
  energySaved: number;
  waterConserved: number;
  projectsFunded: number;
  communityMembers: number;
  globalRank: number;
}

const GreenImpactDashboard = () => {
  const [impactMetrics] = useState<ImpactMetrics>({
    carbonFootprintReduced: 2547.8,
    treesPlanted: 1234,
    wasteRecycled: 876.5,
    energySaved: 15420,
    waterConserved: 9876,
    projectsFunded: 23,
    communityMembers: 45678,
    globalRank: 127
  });

  const [personalGoals, setPersonalGoals] = useState([
    { id: 1, title: "Plant 10 Trees", progress: 75, target: 10, current: 7.5 },
    { id: 2, title: "Reduce Carbon by 100kg", progress: 45, target: 100, current: 45 },
    { id: 3, title: "Fund 5 Projects", progress: 60, target: 5, current: 3 }
  ]);

  const [recentAchievements, setRecentAchievements] = useState([
    { id: 1, title: "Eco Warrior", description: "Completed 50 environmental actions", icon: Award, date: "2024-01-15" },
    { id: 2, title: "Tree Hugger", description: "Planted 100 trees", icon: TreePine, date: "2024-01-10" },
    { id: 3, title: "Ocean Protector", description: "Cleaned 50kg of ocean waste", icon: Droplets, date: "2024-01-05" }
  ]);

  const impactCards = [
    {
      title: "Carbon Footprint Reduced",
      value: `${impactMetrics.carbonFootprintReduced} kg`,
      icon: Leaf,
      color: "text-green-500",
      bgColor: "bg-green-500/10",
      trend: "+12.5%"
    },
    {
      title: "Trees Planted",
      value: impactMetrics.treesPlanted.toLocaleString(),
      icon: TreePine,
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
      trend: "+8.3%"
    },
    {
      title: "Waste Recycled",
      value: `${impactMetrics.wasteRecycled} kg`,
      icon: Globe,
      color: "text-blue-500",
      bgColor: "bg-blue-500/10",
      trend: "+15.7%"
    },
    {
      title: "Energy Saved",
      value: `${impactMetrics.energySaved} kWh`,
      icon: Zap,
      color: "text-yellow-500",
      bgColor: "bg-yellow-500/10",
      trend: "+6.2%"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50/50 to-blue-50/50 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-blue-600">
            🌍 Green Impact Dashboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Track your environmental impact, monitor global progress, and discover how your actions contribute to a sustainable future.
          </p>
          <Badge className="bg-green-600 text-white px-4 py-2">
            Global Rank: #{impactMetrics.globalRank}
          </Badge>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="personal">Personal Goals</TabsTrigger>
            <TabsTrigger value="achievements">Achievements</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Impact Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {impactCards.map((card, index) => (
                <Card key={index} className={`border-l-4 border-l-green-500 ${card.bgColor} backdrop-blur-sm`}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
                    <card.icon className={`h-4 w-4 ${card.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{card.value}</div>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <TrendingUp className="h-3 w-3 mr-1 text-green-500" />
                      {card.trend} from last month
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Community Impact Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-blue-500/30 bg-blue-900/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-blue-600">
                    <Users className="h-5 w-5" />
                    Community Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Community Members</span>
                    <span className="font-bold">{impactMetrics.communityMembers.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Projects Funded</span>
                    <span className="font-bold">{impactMetrics.projectsFunded}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Water Conserved</span>
                    <span className="font-bold">{impactMetrics.waterConserved.toLocaleString()} L</span>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700">
                    Join Community Project
                  </Button>
                </CardContent>
              </Card>

              <Card className="border-green-500/30 bg-green-900/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-600">
                    <Target className="h-5 w-5" />
                    Global Progress
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Carbon Neutrality Goal</span>
                      <span>67%</span>
                    </div>
                    <Progress value={67} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Biodiversity Protection</span>
                      <span>54%</span>
                    </div>
                    <Progress value={54} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Renewable Energy</span>
                      <span>73%</span>
                    </div>
                    <Progress value={73} className="h-2" />
                  </div>
                  <Button variant="outline" className="w-full border-green-500 text-green-600 hover:bg-green-50">
                    View Global Projects
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="personal" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {personalGoals.map((goal) => (
                <Card key={goal.id} className="border-purple-500/30 bg-purple-900/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-purple-600">{goal.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{goal.current} / {goal.target}</span>
                        <span>{goal.progress}%</span>
                      </div>
                      <Progress value={goal.progress} className="h-3" />
                    </div>
                    <Button size="sm" className="w-full">
                      Take Action
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="border-indigo-500/30 bg-indigo-900/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-indigo-600">Set New Goal</CardTitle>
              </CardHeader>
              <CardContent>
                <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700">
                  Create Custom Goal
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {recentAchievements.map((achievement) => (
                <Card key={achievement.id} className="border-amber-500/30 bg-amber-900/10 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-amber-600">
                      <achievement.icon className="h-5 w-5" />
                      {achievement.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                    <Badge variant="outline" className="border-amber-500 text-amber-600">
                      {achievement.date}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <Card className="border-orange-500/30 bg-orange-900/10 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-orange-600">Achievement Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Eco Master Badge</span>
                      <span>85%</span>
                    </div>
                    <Progress value={85} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Climate Champion</span>
                      <span>62%</span>
                    </div>
                    <Progress value={62} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-cyan-500/30 bg-cyan-900/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-600">
                    <BarChart3 className="h-5 w-5" />
                    Impact Over Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Interactive Chart Placeholder
                    <br />
                    (Integration with recharts for detailed analytics)
                  </div>
                </CardContent>
              </Card>

              <Card className="border-teal-500/30 bg-teal-900/10 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-teal-600">
                    <PieChart className="h-5 w-5" />
                    Impact Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64 flex items-center justify-center text-muted-foreground">
                    Impact Distribution Chart
                    <br />
                    (Shows breakdown of environmental contributions)
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default GreenImpactDashboard;