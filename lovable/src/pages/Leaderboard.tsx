import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Crown, Star, TrendingUp, Users, Globe, Medal, Award } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  userId: string;
  username: string;
  avatar: string;
  totalPoints: number;
  totalTokens: number;
  level: number;
  country: string;
  trend: "up" | "down" | "stable";
  badges: number;
}

export default function Leaderboard() {
  const [globalLeaders, setGlobalLeaders] = useState<LeaderboardEntry[]>([]);
  const [weeklyLeaders, setWeeklyLeaders] = useState<LeaderboardEntry[]>([]);
  const [monthlyLeaders, setMonthlyLeaders] = useState<LeaderboardEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading leaderboard data
    const mockData: LeaderboardEntry[] = [
      {
        rank: 1,
        userId: "1",
        username: "EcoHero2024",
        avatar: "🌱",
        totalPoints: 15847,
        totalTokens: 3169,
        level: 47,
        country: "🇺🇸",
        trend: "up",
        badges: 23,
      },
      {
        rank: 2,
        userId: "2",
        username: "GreenWarrior",
        avatar: "🌿",
        totalPoints: 14523,
        totalTokens: 2905,
        level: 44,
        country: "🇨🇦",
        trend: "stable",
        badges: 19,
      },
      {
        rank: 3,
        userId: "3",
        username: "EarthDefender",
        avatar: "🌍",
        totalPoints: 13891,
        totalTokens: 2778,
        level: 42,
        country: "🇬🇧",
        trend: "up",
        badges: 21,
      },
    ];

    setTimeout(() => {
      setGlobalLeaders(mockData);
      setWeeklyLeaders(mockData.slice().reverse());
      setMonthlyLeaders([...mockData].sort(() => Math.random() - 0.5));
      setLoading(false);
    }, 1500);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-400" />;
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-400 rotate-180" />;
      default:
        return <div className="h-4 w-4 rounded-full bg-yellow-400" />;
    }
  };

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-300" />;
      case 3:
        return <Award className="h-6 w-6 text-orange-400" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const LeaderboardTable = ({ leaders }: { leaders: LeaderboardEntry[] }) => (
    <div className="space-y-3">
      {leaders.map((leader, index) => (
        <Card
          key={leader.userId}
          className={`
          ${leader.rank <= 3 ? "bg-gradient-to-r from-yellow-900/30 to-orange-900/30 border-yellow-500/50" : "bg-card/50"}
        `}
        >
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">{getRankIcon(leader.rank)}</div>
                <div className="text-4xl">{leader.avatar}</div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg">{leader.username}</span>
                    <span>{leader.country}</span>
                    {getTrendIcon(leader.trend)}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Level {leader.level} • {leader.badges} badges
                  </div>
                </div>
              </div>

              <div className="text-right space-y-1">
                <div className="flex items-center gap-2">
                  <Star className="h-4 w-4 text-yellow-400" />
                  <span className="font-bold text-yellow-400">
                    {leader.totalPoints.toLocaleString()}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 bg-green-400 rounded-full" />
                  <span className="font-bold text-green-400">
                    {leader.totalTokens.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin text-6xl">🏆</div>
          <h2 className="text-2xl font-bold text-primary">Loading Global Leaderboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 to-blue-900/20 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <Card className="border-yellow-500/30 bg-gradient-to-r from-yellow-900/30 to-orange-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">
              🏆 GAIA GLOBAL LEADERBOARD 🏆
            </CardTitle>
            <div className="text-center space-y-2">
              <p className="text-xl text-muted-foreground">
                Compete with eco-warriors worldwide and earn your place among the champions!
              </p>
              <div className="flex justify-center gap-4">
                <Badge className="bg-yellow-600">🌍 Global Competition</Badge>
                <Badge className="bg-green-600">⚡ Real-time Updates</Badge>
                <Badge className="bg-blue-600">🏅 Multiple Categories</Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-purple-900/30 border-purple-500/30">
            <CardContent className="p-6 text-center">
              <Users className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">127,439</div>
              <div className="text-sm text-muted-foreground">Active Players</div>
            </CardContent>
          </Card>

          <Card className="bg-green-900/30 border-green-500/30">
            <CardContent className="p-6 text-center">
              <Globe className="h-8 w-8 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">195</div>
              <div className="text-sm text-muted-foreground">Countries</div>
            </CardContent>
          </Card>

          <Card className="bg-yellow-900/30 border-yellow-500/30">
            <CardContent className="p-6 text-center">
              <Star className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">24.7M</div>
              <div className="text-sm text-muted-foreground">Total Points</div>
            </CardContent>
          </Card>

          <Card className="bg-blue-900/30 border-blue-500/30">
            <CardContent className="p-6 text-center">
              <Trophy className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">156</div>
              <div className="text-sm text-muted-foreground">Tournaments</div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Tabs */}
        <Tabs defaultValue="global" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="global">🌍 Global</TabsTrigger>
            <TabsTrigger value="weekly">📅 Weekly</TabsTrigger>
            <TabsTrigger value="monthly">📊 Monthly</TabsTrigger>
          </TabsList>

          <TabsContent value="global" className="space-y-6">
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Globe className="h-6 w-6" />
                  Global Champions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LeaderboardTable leaders={globalLeaders} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="weekly" className="space-y-6">
            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <TrendingUp className="h-6 w-6" />
                  Weekly Rising Stars
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LeaderboardTable leaders={weeklyLeaders} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monthly" className="space-y-6">
            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Crown className="h-6 w-6" />
                  Monthly Masters
                </CardTitle>
              </CardHeader>
              <CardContent>
                <LeaderboardTable leaders={monthlyLeaders} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Your Ranking */}
        <Card className="border-orange-500/30 bg-gradient-to-r from-orange-900/30 to-red-900/30">
          <CardContent className="p-6">
            <div className="text-center space-y-4">
              <h3 className="text-2xl font-bold text-orange-400">Your Current Ranking</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-white">#847</div>
                  <div className="text-sm text-muted-foreground">Global Rank</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-yellow-400">1,247</div>
                  <div className="text-sm text-muted-foreground">Total Points</div>
                </div>
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-green-400">249</div>
                  <div className="text-sm text-muted-foreground">Total Tokens</div>
                </div>
              </div>
              <Button className="bg-orange-600 hover:bg-orange-700">
                <Trophy className="h-4 w-4 mr-2" />
                Climb the Rankings!
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
