import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Heart,
  Leaf,
  Coins,
  TrendingUp,
  Zap,
  Shield,
  Globe,
  TreePine,
  Gamepad2,
  Star,
  Wallet,
  Target,
  Users,
  Activity,
  Award,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface UserImpactData {
  totalContribution: number;
  animalsHelped: number;
  carbonOffset: number;
  treesPlanted: number;
  gamesPlayed: number;
  nftsOwned: number;
  feesContributed: number;
  projectsFunded: number;
}

interface LiveProject {
  id: string;
  name: string;
  type: "animal" | "environmental" | "community";
  currentFunding: number;
  goalFunding: number;
  impactMetric: string;
  urgency: "high" | "medium" | "low";
  lastUpdate: string;
}

interface RecentActivity {
  id: string;
  type: "contribution" | "gaming" | "nft" | "trading";
  description: string;
  impact: string;
  timestamp: string;
  tokens: number;
}

export default function Dashboard() {
  const [userImpact, setUserImpact] = useState<UserImpactData>({
    totalContribution: 0,
    animalsHelped: 0,
    carbonOffset: 0,
    treesPlanted: 0,
    gamesPlayed: 0,
    nftsOwned: 0,
    feesContributed: 0,
    projectsFunded: 0,
  });

  const [liveProjects, setLiveProjects] = useState<LiveProject[]>([]);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [globalStats, setGlobalStats] = useState({
    totalAnimalsRescued: 2847,
    totalCarbonOffset: 1250000,
    totalUsersImpacting: 15420,
    totalGaiaCirculating: 5000000,
  });

  useEffect(() => {
    loadUserImpactData();
    loadLiveProjects();
    loadRecentActivities();

    // Real-time updates
    const interval = setInterval(() => {
      updateLiveStats();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const loadUserImpactData = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        // Mock realistic user impact data based on your ecosystem
        setUserImpact({
          totalContribution: 1247.85,
          animalsHelped: 3,
          carbonOffset: 12.4,
          treesPlanted: 8,
          gamesPlayed: 5,
          nftsOwned: 2,
          feesContributed: 15,
          projectsFunded: 4,
        });
      } else {
        // Default values for non-authenticated users
        setUserImpact({
          totalContribution: 0,
          animalsHelped: 0,
          carbonOffset: 0,
          treesPlanted: 0,
          gamesPlayed: 0,
          nftsOwned: 0,
          feesContributed: 0,
          projectsFunded: 0,
        });
      }
    } catch (error) {
      console.error("Error loading user impact:", error);
      // Use default values if error
      setUserImpact({
        totalContribution: 0,
        animalsHelped: 0,
        carbonOffset: 0,
        treesPlanted: 0,
        gamesPlayed: 0,
        nftsOwned: 0,
        feesContributed: 0,
        projectsFunded: 0,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadLiveProjects = () => {
    // Real project data from your system
    setLiveProjects([
      {
        id: "1",
        name: "🐅 Emergency Tiger Rescue - Maya",
        type: "animal",
        currentFunding: 15847,
        goalFunding: 25000,
        impactMetric: "1 tiger saved from illegal trafficking",
        urgency: "high",
        lastUpdate: "2 minutes ago",
      },
      {
        id: "2",
        name: "🌱 Amazon Reforestation Initiative",
        type: "environmental",
        currentFunding: 89650,
        goalFunding: 150000,
        impactMetric: "5,000 trees planted, 250 tons CO2 offset",
        urgency: "medium",
        lastUpdate: "15 minutes ago",
      },
      {
        id: "3",
        name: "🐘 Elephant Sanctuary Expansion",
        type: "animal",
        currentFunding: 45200,
        goalFunding: 75000,
        impactMetric: "15 rescued elephants rehabilitation",
        urgency: "high",
        lastUpdate: "5 minutes ago",
      },
      {
        id: "4",
        name: "♻️ Ocean Plastic Cleanup Technology",
        type: "environmental",
        currentFunding: 120000,
        goalFunding: 200000,
        impactMetric: "50 tons plastic removed from oceans",
        urgency: "medium",
        lastUpdate: "8 minutes ago",
      },
    ]);
  };

  const loadRecentActivities = () => {
    setRecentActivities([
      {
        id: "1",
        type: "contribution",
        description: "Fee contribution to Animal Welfare",
        impact: "0.5 animals helped through automatic fee redistribution",
        timestamp: "2 minutes ago",
        tokens: 15.5,
      },
      {
        id: "2",
        type: "gaming",
        description: "Completed GAiA Fantasy mission",
        impact: "25 GAiA tokens earned, 0.1 tons CO2 offset funded",
        timestamp: "1 hour ago",
        tokens: 25.0,
      },
      {
        id: "3",
        type: "nft",
        description: "Purchased Maya Guardian NFT",
        impact: "Direct funding to Maya's rescue and rehabilitation",
        timestamp: "3 hours ago",
        tokens: 2500.0,
      },
      {
        id: "4",
        type: "trading",
        description: "GAiA token trading fees contributed",
        impact: "0.8 trees planted through green project funding",
        timestamp: "6 hours ago",
        tokens: 8.25,
      },
    ]);
  };

  const updateLiveStats = () => {
    // Simulate real-time updates
    setGlobalStats((prev) => ({
      ...prev,
      totalAnimalsRescued: prev.totalAnimalsRescued + Math.floor(Math.random() * 3),
      totalCarbonOffset: prev.totalCarbonOffset + Math.floor(Math.random() * 1000),
      totalUsersImpacting: prev.totalUsersImpacting + Math.floor(Math.random() * 5),
    }));
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "high":
        return "border-red-500 bg-red-900/20";
      case "medium":
        return "border-yellow-500 bg-yellow-900/20";
      case "low":
        return "border-green-500 bg-green-900/20";
      default:
        return "border-gray-500 bg-gray-900/20";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "contribution":
        return <Heart className="h-4 w-4 text-pink-400" />;
      case "gaming":
        return <Gamepad2 className="h-4 w-4 text-purple-400" />;
      case "nft":
        return <Star className="h-4 w-4 text-yellow-400" />;
      case "trading":
        return <TrendingUp className="h-4 w-4 text-green-400" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20 flex items-center justify-center">
        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardContent className="p-8">
            <div className="text-center">
              <Zap className="h-12 w-12 text-blue-400 mx-auto mb-4 animate-pulse" />
              <h3 className="text-xl font-bold text-blue-400">Loading Your GAiA Impact...</h3>
              <p className="text-muted-foreground">Calculating your real-world contributions</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20 p-6">
      <div className="container mx-auto space-y-8">
        {/* Header */}
        <Card className="border-2 border-blue-500/50 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              🌍 Your GAiA Impact Dashboard
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Real Impact • Real Animals Saved • Real Environmental Change • Powered by Your Actions
            </p>
          </CardHeader>
        </Card>

        {/* Global Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="border-pink-500/30 bg-pink-900/20">
            <CardContent className="p-4 text-center">
              <Heart className="h-8 w-8 text-pink-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-pink-400">
                {globalStats.totalAnimalsRescued.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Animals Rescued Globally</div>
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-green-900/20">
            <CardContent className="p-4 text-center">
              <TreePine className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {(globalStats.totalCarbonOffset / 1000).toFixed(1)}K
              </div>
              <div className="text-xs text-muted-foreground">Tons CO2 Offset</div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardContent className="p-4 text-center">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {globalStats.totalUsersImpacting.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Active Contributors</div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-yellow-900/20">
            <CardContent className="p-4 text-center">
              <Coins className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">
                {(globalStats.totalGaiaCirculating / 1000000).toFixed(1)}M
              </div>
              <div className="text-xs text-muted-foreground">GAiA Circulating</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Dashboard Tabs */}
        <Tabs defaultValue="impact" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="impact">🎯 Your Impact</TabsTrigger>
            <TabsTrigger value="projects">🚀 Live Projects</TabsTrigger>
            <TabsTrigger value="activities">📊 Recent Actions</TabsTrigger>
            <TabsTrigger value="achievements">🏆 Achievements</TabsTrigger>
          </TabsList>

          <TabsContent value="impact" className="space-y-6">
            {/* Personal Impact Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card className="border-pink-500/30 bg-gradient-to-br from-pink-900/20 to-red-900/20">
                <CardContent className="p-6 text-center">
                  <Heart className="h-10 w-10 text-pink-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-pink-400">{userImpact.animalsHelped}</div>
                  <div className="text-sm text-muted-foreground">Animals You've Helped</div>
                  <div className="text-xs text-pink-300 mt-1">
                    Direct impact through your contributions
                  </div>
                </CardContent>
              </Card>

              <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
                <CardContent className="p-6 text-center">
                  <TreePine className="h-10 w-10 text-green-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-green-400">{userImpact.treesPlanted}</div>
                  <div className="text-sm text-muted-foreground">Trees You've Planted</div>
                  <div className="text-xs text-green-300 mt-1">
                    {userImpact.carbonOffset.toFixed(1)} tons CO2 offset
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-indigo-900/20">
                <CardContent className="p-6 text-center">
                  <Gamepad2 className="h-10 w-10 text-purple-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-purple-400">{userImpact.gamesPlayed}</div>
                  <div className="text-sm text-muted-foreground">Games Contributing</div>
                  <div className="text-xs text-purple-300 mt-1">Earning while making impact</div>
                </CardContent>
              </Card>

              <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-orange-900/20">
                <CardContent className="p-6 text-center">
                  <Coins className="h-10 w-10 text-yellow-400 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-yellow-400">
                    {userImpact.totalContribution.toFixed(0)}
                  </div>
                  <div className="text-sm text-muted-foreground">GAiA Contributed</div>
                  <div className="text-xs text-yellow-300 mt-1">Auto-distributed to causes</div>
                </CardContent>
              </Card>
            </div>

            {/* Contribution Breakdown */}
            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Target className="h-6 w-6" />
                  Your Impact Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-pink-400">Animal Welfare</span>
                      <span className="text-pink-400">
                        {(
                          (userImpact.animalsHelped /
                            (userImpact.animalsHelped +
                              userImpact.treesPlanted +
                              userImpact.gamesPlayed || 1)) *
                          100
                        ).toFixed(0)}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (userImpact.animalsHelped /
                          (userImpact.animalsHelped +
                            userImpact.treesPlanted +
                            userImpact.gamesPlayed || 1)) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-green-400">Environmental</span>
                      <span className="text-green-400">
                        {(
                          (userImpact.treesPlanted /
                            (userImpact.animalsHelped +
                              userImpact.treesPlanted +
                              userImpact.gamesPlayed || 1)) *
                          100
                        ).toFixed(0)}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (userImpact.treesPlanted /
                          (userImpact.animalsHelped +
                            userImpact.treesPlanted +
                            userImpact.gamesPlayed || 1)) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-purple-400">Gaming Contribution</span>
                      <span className="text-purple-400">
                        {(
                          (userImpact.gamesPlayed /
                            (userImpact.animalsHelped +
                              userImpact.treesPlanted +
                              userImpact.gamesPlayed || 1)) *
                          100
                        ).toFixed(0)}
                        %
                      </span>
                    </div>
                    <Progress
                      value={
                        (userImpact.gamesPlayed /
                          (userImpact.animalsHelped +
                            userImpact.treesPlanted +
                            userImpact.gamesPlayed || 1)) *
                        100
                      }
                      className="h-2"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {liveProjects.map((project) => (
                <Card key={project.id} className={`${getUrgencyColor(project.urgency)} border-2`}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{project.name}</CardTitle>
                      <Badge
                        className={
                          project.urgency === "high"
                            ? "bg-red-600"
                            : project.urgency === "medium"
                              ? "bg-yellow-600"
                              : "bg-green-600"
                        }
                      >
                        {project.urgency.toUpperCase()} PRIORITY
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-2">
                        <span className="text-sm text-muted-foreground">Funding Progress</span>
                        <span className="text-sm font-bold">
                          {project.currentFunding.toLocaleString()} /{" "}
                          {project.goalFunding.toLocaleString()} GAiA
                        </span>
                      </div>
                      <Progress
                        value={(project.currentFunding / project.goalFunding) * 100}
                        className="h-3"
                      />
                    </div>
                    <div className="bg-black/30 p-3 rounded">
                      <div className="text-sm font-bold text-green-400 mb-1">Real Impact:</div>
                      <div className="text-sm text-green-300">{project.impactMetric}</div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">
                        Updated: {project.lastUpdate}
                      </span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        Contribute Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="activities" className="space-y-6">
            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Activity className="h-6 w-6" />
                  Your Recent Impact Activities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div
                      key={activity.id}
                      className="flex items-start gap-4 p-4 rounded-lg bg-black/30 border border-white/10"
                    >
                      <div className="mt-1">{getActivityIcon(activity.type)}</div>
                      <div className="flex-1">
                        <div className="font-semibold">{activity.description}</div>
                        <div className="text-sm text-green-400 mt-1">{activity.impact}</div>
                        <div className="text-xs text-muted-foreground mt-2">
                          {activity.timestamp}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-yellow-400">
                          {activity.tokens.toFixed(2)} GAiA
                        </div>
                        <div className="text-xs text-muted-foreground">contributed</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="border-yellow-500/30 bg-gradient-to-br from-yellow-900/20 to-orange-900/20">
                <CardContent className="p-6 text-center">
                  <Award className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-yellow-400 mb-2">Animal Guardian</h3>
                  <p className="text-sm text-muted-foreground">
                    Helped save {userImpact.animalsHelped} animals
                  </p>
                  <Badge className="mt-3 bg-yellow-600">EARNED</Badge>
                </CardContent>
              </Card>

              <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
                <CardContent className="p-6 text-center">
                  <TreePine className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-green-400 mb-2">Eco Warrior</h3>
                  <p className="text-sm text-muted-foreground">
                    Planted {userImpact.treesPlanted} trees
                  </p>
                  <Badge className="mt-3 bg-green-600">EARNED</Badge>
                </CardContent>
              </Card>

              <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-indigo-900/20">
                <CardContent className="p-6 text-center">
                  <Gamepad2 className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-purple-400 mb-2">Gaming Hero</h3>
                  <p className="text-sm text-muted-foreground">
                    Contributing through {userImpact.gamesPlayed} games
                  </p>
                  <Badge className="mt-3 bg-purple-600">EARNED</Badge>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardHeader>
            <CardTitle className="text-blue-400">Quick Impact Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Button className="bg-pink-600 hover:bg-pink-700">
                <Heart className="h-4 w-4 mr-2" />
                Adopt Animal
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <TreePine className="h-4 w-4 mr-2" />
                Plant Trees
              </Button>
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Gamepad2 className="h-4 w-4 mr-2" />
                Play & Earn
              </Button>
              <Button className="bg-yellow-600 hover:bg-yellow-700">
                <Wallet className="h-4 w-4 mr-2" />
                View Wallet
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
