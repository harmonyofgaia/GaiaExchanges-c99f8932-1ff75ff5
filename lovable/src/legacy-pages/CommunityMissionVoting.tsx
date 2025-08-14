import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Vote,
  Trophy,
  Target,
  Users,
  TrendingUp,
  Clock,
  CheckCircle,
  MapPin,
  Coins,
  Star,
  Award,
  Zap,
  Globe,
  TreePine,
  Heart,
  Shield,
  Eye,
  ThumbsUp,
  ThumbsDown,
  BarChart3,
} from "lucide-react";
import { toast } from "sonner";
import { Navbar } from "@/components/Navbar";

interface Mission {
  id: string;
  title: string;
  description: string;
  category:
    | "conservation"
    | "renewable_energy"
    | "waste_reduction"
    | "education"
    | "transportation";
  location: string;
  target_amount: number;
  current_funding: number;
  votes_for: number;
  votes_against: number;
  total_voters: number;
  deadline: Date;
  status: "voting" | "approved" | "funded" | "active" | "completed";
  reward_pool: number;
  impact_metrics: {
    carbon_reduction: number;
    trees_planted: number;
    people_impacted: number;
  };
  created_by: string;
  created_date: Date;
  user_vote?: "for" | "against";
}

interface LeaderboardEntry {
  id: string;
  username: string;
  avatar: string;
  eco_score: number;
  missions_completed: number;
  tokens_earned: number;
  votes_cast: number;
  rank: number;
  rank_change: number;
  badges: string[];
  location: string;
  join_date: Date;
}

interface CommunityStats {
  total_missions: number;
  active_missions: number;
  completed_missions: number;
  total_funding: number;
  community_members: number;
  votes_cast_today: number;
  environmental_impact: {
    total_carbon_saved: number;
    total_trees_planted: number;
    total_people_impacted: number;
  };
}

export default function CommunityMissionVoting() {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [communityStats, setCommunityStats] = useState<CommunityStats>({
    total_missions: 0,
    active_missions: 0,
    completed_missions: 0,
    total_funding: 0,
    community_members: 0,
    votes_cast_today: 0,
    environmental_impact: {
      total_carbon_saved: 0,
      total_trees_planted: 0,
      total_people_impacted: 0,
    },
  });

  useEffect(() => {
    initializeMissions();
    initializeLeaderboard();
    initializeCommunityStats();

    // Real-time updates
    const interval = setInterval(() => {
      updateStats();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const initializeMissions = () => {
    const mockMissions: Mission[] = [
      {
        id: "mission-1",
        title: "Urban Forest Initiative - Downtown District",
        description:
          "Plant 1,000 native trees in the downtown core to improve air quality and create green corridors for wildlife.",
        category: "conservation",
        location: "Downtown Metropolitan Area",
        target_amount: 50000,
        current_funding: 32500,
        votes_for: 847,
        votes_against: 123,
        total_voters: 970,
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        status: "voting",
        reward_pool: 15000,
        impact_metrics: {
          carbon_reduction: 25000,
          trees_planted: 1000,
          people_impacted: 50000,
        },
        created_by: "EcoWarrior2024",
        created_date: new Date("2024-12-01"),
        user_vote: undefined,
      },
      {
        id: "mission-2",
        title: "Solar Power for Rural Schools",
        description:
          "Install solar panels on 25 rural schools to provide clean energy and reduce operational costs.",
        category: "renewable_energy",
        location: "Rural Education Districts",
        target_amount: 125000,
        current_funding: 89000,
        votes_for: 1234,
        votes_against: 56,
        total_voters: 1290,
        deadline: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
        status: "approved",
        reward_pool: 25000,
        impact_metrics: {
          carbon_reduction: 45000,
          trees_planted: 0,
          people_impacted: 12500,
        },
        created_by: "SolarAdvocate",
        created_date: new Date("2024-11-15"),
        user_vote: "for",
      },
      {
        id: "mission-3",
        title: "Ocean Plastic Cleanup Initiative",
        description:
          "Remove 10 tons of plastic waste from coastal areas and establish permanent cleanup stations.",
        category: "waste_reduction",
        location: "Pacific Coastal Regions",
        target_amount: 75000,
        current_funding: 75000,
        votes_for: 2156,
        votes_against: 89,
        total_voters: 2245,
        deadline: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
        status: "active",
        reward_pool: 20000,
        impact_metrics: {
          carbon_reduction: 8000,
          trees_planted: 0,
          people_impacted: 100000,
        },
        created_by: "OceanGuardian",
        created_date: new Date("2024-10-20"),
        user_vote: "for",
      },
      {
        id: "mission-4",
        title: "Community Bike Share Network",
        description:
          "Establish bike sharing stations across the city to reduce carbon emissions from transportation.",
        category: "transportation",
        location: "Metropolitan Transit Network",
        target_amount: 200000,
        current_funding: 156000,
        votes_for: 1876,
        votes_against: 234,
        total_voters: 2110,
        deadline: new Date(Date.now() + 21 * 24 * 60 * 60 * 1000),
        status: "voting",
        reward_pool: 35000,
        impact_metrics: {
          carbon_reduction: 120000,
          trees_planted: 0,
          people_impacted: 250000,
        },
        created_by: "GreenTransport",
        created_date: new Date("2024-12-05"),
        user_vote: undefined,
      },
    ];
    setMissions(mockMissions);
  };

  const initializeLeaderboard = () => {
    const mockLeaderboard: LeaderboardEntry[] = [
      {
        id: "user-1",
        username: "EcoChampion2024",
        avatar: "🌟",
        eco_score: 2850,
        missions_completed: 15,
        tokens_earned: 12500,
        votes_cast: 89,
        rank: 1,
        rank_change: 0,
        badges: ["Eco Warrior", "Top Voter", "Mission Leader"],
        location: "Global",
        join_date: new Date("2024-01-15"),
      },
      {
        id: "user-2",
        username: "GreenGuardian",
        avatar: "🌱",
        eco_score: 2720,
        missions_completed: 12,
        tokens_earned: 10800,
        votes_cast: 76,
        rank: 2,
        rank_change: 1,
        badges: ["Conservation Hero", "Active Participant"],
        location: "North America",
        join_date: new Date("2024-02-03"),
      },
      {
        id: "user-3",
        username: "PlanetDefender",
        avatar: "🌍",
        eco_score: 2650,
        missions_completed: 11,
        tokens_earned: 9750,
        votes_cast: 82,
        rank: 3,
        rank_change: -1,
        badges: ["Environmental Advocate", "Community Builder"],
        location: "Europe",
        join_date: new Date("2024-01-28"),
      },
      {
        id: "user-4",
        username: "SustainabilityPro",
        avatar: "♻️",
        eco_score: 2420,
        missions_completed: 9,
        tokens_earned: 8200,
        votes_cast: 65,
        rank: 4,
        rank_change: 2,
        badges: ["Sustainability Expert"],
        location: "Asia",
        join_date: new Date("2024-03-10"),
      },
      {
        id: "user-5",
        username: "NatureProtector",
        avatar: "🦋",
        eco_score: 2380,
        missions_completed: 10,
        tokens_earned: 7890,
        votes_cast: 58,
        rank: 5,
        rank_change: -1,
        badges: ["Wildlife Guardian", "Dedicated Voter"],
        location: "South America",
        join_date: new Date("2024-02-18"),
      },
    ];
    setLeaderboard(mockLeaderboard);
  };

  const initializeCommunityStats = () => {
    setCommunityStats({
      total_missions: 147,
      active_missions: 23,
      completed_missions: 89,
      total_funding: 2450000,
      community_members: 12847,
      votes_cast_today: 342,
      environmental_impact: {
        total_carbon_saved: 1250000,
        total_trees_planted: 45600,
        total_people_impacted: 890000,
      },
    });
  };

  const updateStats = () => {
    setCommunityStats((prev) => ({
      ...prev,
      votes_cast_today: prev.votes_cast_today + Math.floor(Math.random() * 3),
      community_members: prev.community_members + Math.floor(Math.random() * 2),
      total_funding: prev.total_funding + Math.floor(Math.random() * 1000),
    }));
  };

  const voteOnMission = (missionId: string, vote: "for" | "against") => {
    setMissions((prev) =>
      prev.map((mission) => {
        if (mission.id === missionId) {
          const updatedMission = { ...mission };

          // Remove previous vote if exists
          if (mission.user_vote === "for") {
            updatedMission.votes_for -= 1;
          } else if (mission.user_vote === "against") {
            updatedMission.votes_against -= 1;
          } else {
            updatedMission.total_voters += 1;
          }

          // Add new vote
          if (vote === "for") {
            updatedMission.votes_for += 1;
          } else {
            updatedMission.votes_against += 1;
          }

          updatedMission.user_vote = vote;
          return updatedMission;
        }
        return mission;
      })
    );

    const mission = missions.find((m) => m.id === missionId);
    toast.success(`Vote recorded!`, {
      description: `You voted ${vote} for "${mission?.title}"`,
      duration: 3000,
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "conservation":
        return <TreePine className="h-4 w-4" />;
      case "renewable_energy":
        return <Zap className="h-4 w-4" />;
      case "waste_reduction":
        return <Shield className="h-4 w-4" />;
      case "education":
        return <Star className="h-4 w-4" />;
      case "transportation":
        return <Globe className="h-4 w-4" />;
      default:
        return <Target className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "conservation":
        return "border-green-500/50 text-green-400";
      case "renewable_energy":
        return "border-yellow-500/50 text-yellow-400";
      case "waste_reduction":
        return "border-blue-500/50 text-blue-400";
      case "education":
        return "border-purple-500/50 text-purple-400";
      case "transportation":
        return "border-cyan-500/50 text-cyan-400";
      default:
        return "border-gray-500/50 text-gray-400";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "voting":
        return "border-yellow-500/50 text-yellow-400";
      case "approved":
        return "border-green-500/50 text-green-400";
      case "funded":
        return "border-blue-500/50 text-blue-400";
      case "active":
        return "border-purple-500/50 text-purple-400";
      case "completed":
        return "border-cyan-500/50 text-cyan-400";
      default:
        return "border-gray-500/50 text-gray-400";
    }
  };

  const getRankChangeIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="h-3 w-3 text-green-400" />;
    if (change < 0) return <TrendingUp className="h-3 w-3 text-red-400 rotate-180" />;
    return <span className="w-3 h-3 text-gray-400">-</span>;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="container mx-auto p-4 space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🗳️ Community Mission Voting & Leaderboard
          </h1>
          <p className="text-xl text-muted-foreground">
            Vote on Environmental Missions • Compete for Impact • Build a Better World Together
          </p>
        </div>

        {/* Community Stats */}
        <Card className="border-green-500/20 bg-gradient-to-r from-green-900/20 to-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <BarChart3 className="h-5 w-5" />
              Global Community Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">
                  {communityStats.total_missions}
                </div>
                <div className="text-sm text-muted-foreground">Total Missions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">
                  {communityStats.active_missions}
                </div>
                <div className="text-sm text-muted-foreground">Active Now</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-400">
                  {communityStats.completed_missions}
                </div>
                <div className="text-sm text-muted-foreground">Completed</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-400">
                  ${(communityStats.total_funding / 1000000).toFixed(1)}M
                </div>
                <div className="text-sm text-muted-foreground">Total Funding</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-cyan-400">
                  {communityStats.community_members.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground">Members</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-400">
                  {communityStats.votes_cast_today}
                </div>
                <div className="text-sm text-muted-foreground">Votes Today</div>
              </div>
              <div className="text-center">
                <div className="text-lg font-bold text-red-400">
                  {(communityStats.environmental_impact.total_carbon_saved / 1000).toFixed(0)}T
                </div>
                <div className="text-sm text-muted-foreground">CO₂ Saved</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="missions" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="missions">🎯 Active Missions</TabsTrigger>
            <TabsTrigger value="leaderboard">🏆 Leaderboard</TabsTrigger>
            <TabsTrigger value="analytics">📊 Impact Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="missions" className="space-y-4">
            <div className="space-y-6">
              {missions.map((mission) => (
                <Card key={mission.id} className="border-gray-500/20 bg-black/20">
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      {/* Mission Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-xl font-bold text-white">{mission.title}</h3>
                            <Badge variant="outline" className={getCategoryColor(mission.category)}>
                              {getCategoryIcon(mission.category)}
                              {mission.category.replace("_", " ")}
                            </Badge>
                            <Badge variant="outline" className={getStatusColor(mission.status)}>
                              {mission.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{mission.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3" />
                              {mission.location}
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              Ends: {mission.deadline.toLocaleDateString()}
                            </div>
                            <div className="flex items-center gap-1">
                              <Users className="h-3 w-3" />
                              Created by {mission.created_by}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Funding Progress */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Funding Progress</span>
                          <span>
                            ${mission.current_funding.toLocaleString()} / $
                            {mission.target_amount.toLocaleString()}
                          </span>
                        </div>
                        <Progress
                          value={(mission.current_funding / mission.target_amount) * 100}
                          className="h-2"
                        />
                      </div>

                      {/* Voting Section */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                          <h4 className="font-semibold text-white">Community Voting</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <ThumbsUp className="h-4 w-4 text-green-400" />
                                <span>Support ({mission.votes_for})</span>
                              </div>
                              <div className="text-green-400 font-bold">
                                {Math.round((mission.votes_for / mission.total_voters) * 100)}%
                              </div>
                            </div>
                            <Progress
                              value={(mission.votes_for / mission.total_voters) * 100}
                              className="h-1"
                            />

                            <div className="flex justify-between items-center">
                              <div className="flex items-center gap-2">
                                <ThumbsDown className="h-4 w-4 text-red-400" />
                                <span>Against ({mission.votes_against})</span>
                              </div>
                              <div className="text-red-400 font-bold">
                                {Math.round((mission.votes_against / mission.total_voters) * 100)}%
                              </div>
                            </div>
                            <Progress
                              value={(mission.votes_against / mission.total_voters) * 100}
                              className="h-1"
                            />
                          </div>

                          {mission.status === "voting" && (
                            <div className="flex gap-2 mt-4">
                              <Button
                                onClick={() => voteOnMission(mission.id, "for")}
                                className={`flex-1 ${mission.user_vote === "for" ? "bg-green-600" : "bg-green-600/70"} hover:bg-green-700`}
                              >
                                <ThumbsUp className="h-4 w-4 mr-2" />
                                {mission.user_vote === "for" ? "Voted Support" : "Vote Support"}
                              </Button>
                              <Button
                                onClick={() => voteOnMission(mission.id, "against")}
                                variant="outline"
                                className={`flex-1 ${mission.user_vote === "against" ? "border-red-500 text-red-400" : "border-gray-500"}`}
                              >
                                <ThumbsDown className="h-4 w-4 mr-2" />
                                {mission.user_vote === "against" ? "Voted Against" : "Vote Against"}
                              </Button>
                            </div>
                          )}
                        </div>

                        <div className="space-y-3">
                          <h4 className="font-semibold text-white">Expected Impact</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="flex items-center gap-2">
                                <Globe className="h-4 w-4 text-blue-400" />
                                CO₂ Reduction
                              </span>
                              <span className="font-bold text-blue-400">
                                {mission.impact_metrics.carbon_reduction.toLocaleString()} kg
                              </span>
                            </div>
                            {mission.impact_metrics.trees_planted > 0 && (
                              <div className="flex justify-between">
                                <span className="flex items-center gap-2">
                                  <TreePine className="h-4 w-4 text-green-400" />
                                  Trees Planted
                                </span>
                                <span className="font-bold text-green-400">
                                  {mission.impact_metrics.trees_planted.toLocaleString()}
                                </span>
                              </div>
                            )}
                            <div className="flex justify-between">
                              <span className="flex items-center gap-2">
                                <Users className="h-4 w-4 text-purple-400" />
                                People Impacted
                              </span>
                              <span className="font-bold text-purple-400">
                                {mission.impact_metrics.people_impacted.toLocaleString()}
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="flex items-center gap-2">
                                <Coins className="h-4 w-4 text-yellow-400" />
                                Reward Pool
                              </span>
                              <span className="font-bold text-yellow-400">
                                {mission.reward_pool.toLocaleString()} GAIA
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="leaderboard" className="space-y-4">
            <Card className="border-yellow-500/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <Trophy className="h-5 w-5" />
                  Community Leaderboard - Environmental Champions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {leaderboard.map((user) => (
                    <Card key={user.id} className="border-gray-500/20 bg-black/10">
                      <CardContent className="pt-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="flex flex-col items-center">
                              <div
                                className={`w-12 h-12 rounded-full flex items-center justify-center text-2xl ${
                                  user.rank === 1
                                    ? "bg-yellow-500"
                                    : user.rank === 2
                                      ? "bg-gray-400"
                                      : user.rank === 3
                                        ? "bg-orange-600"
                                        : "bg-gray-600"
                                }`}
                              >
                                {user.rank <= 3 ? "👑" : user.avatar}
                              </div>
                              <div className="flex items-center gap-1 mt-1">
                                <span className="text-lg font-bold">#{user.rank}</span>
                                {getRankChangeIcon(user.rank_change)}
                              </div>
                            </div>

                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-white text-lg">{user.username}</h3>
                                <Badge
                                  variant="outline"
                                  className="border-purple-500/50 text-purple-400"
                                >
                                  {user.location}
                                </Badge>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-2">
                                <div>
                                  <div className="text-sm text-muted-foreground">Eco Score</div>
                                  <div className="font-bold text-green-400">
                                    {user.eco_score.toLocaleString()}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-muted-foreground">Missions</div>
                                  <div className="font-bold text-blue-400">
                                    {user.missions_completed}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-muted-foreground">Tokens</div>
                                  <div className="font-bold text-yellow-400">
                                    {user.tokens_earned.toLocaleString()}
                                  </div>
                                </div>
                                <div>
                                  <div className="text-sm text-muted-foreground">Votes Cast</div>
                                  <div className="font-bold text-purple-400">{user.votes_cast}</div>
                                </div>
                              </div>

                              <div className="flex flex-wrap gap-1">
                                {user.badges.map((badge, index) => (
                                  <Badge
                                    key={index}
                                    variant="outline"
                                    className="text-xs border-green-500/50 text-green-400"
                                  >
                                    <Award className="h-3 w-3 mr-1" />
                                    {badge}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-sm text-muted-foreground">Joined</div>
                            <div className="text-sm text-white">
                              {user.join_date.toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <Card className="border-green-500/20">
                <CardHeader>
                  <CardTitle className="text-green-400">Mission Success Rates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { category: "Conservation", success: 94, total: 45 },
                      { category: "Renewable Energy", success: 89, total: 32 },
                      { category: "Waste Reduction", success: 92, total: 28 },
                      { category: "Transportation", success: 87, total: 23 },
                      { category: "Education", success: 96, total: 19 },
                    ].map((item) => (
                      <div key={item.category} className="space-y-2">
                        <div className="flex justify-between">
                          <span>{item.category}</span>
                          <span className="font-bold text-green-400">
                            {item.success}% ({item.total} missions)
                          </span>
                        </div>
                        <Progress value={item.success} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="border-blue-500/20">
                <CardHeader>
                  <CardTitle className="text-blue-400">Global Environmental Impact</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-400 mb-2">
                        {(communityStats.environmental_impact.total_carbon_saved / 1000).toFixed(1)}
                        T
                      </div>
                      <div className="text-sm text-muted-foreground">Total CO₂ Saved</div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-xl font-bold text-blue-400">
                          {communityStats.environmental_impact.total_trees_planted.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">Trees Planted</div>
                      </div>
                      <div>
                        <div className="text-xl font-bold text-purple-400">
                          {(
                            communityStats.environmental_impact.total_people_impacted / 1000
                          ).toFixed(0)}
                          K
                        </div>
                        <div className="text-xs text-muted-foreground">People Impacted</div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm font-medium">This Month's Progress:</div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span>New Missions</span>
                          <span className="text-green-400">+12</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Completed Projects</span>
                          <span className="text-blue-400">+8</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Community Growth</span>
                          <span className="text-purple-400">+15%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
