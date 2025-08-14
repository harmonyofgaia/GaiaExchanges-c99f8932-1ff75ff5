import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Medal, Star, Users, TrendingUp, Crown, Zap, Globe } from "lucide-react";

interface LeaderboardEntry {
  rank: number;
  username: string;
  points: number;
  tokens: number;
  level: number;
  badge: string;
  country: string;
  change: "up" | "down" | "same";
}

export default function EnhancedLeaderboard() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([
    {
      rank: 1,
      username: "EcoWarrior2024",
      points: 15750,
      tokens: 2850,
      level: 25,
      badge: "🌟",
      country: "USA",
      change: "up",
    },
    {
      rank: 2,
      username: "GreenHero",
      points: 14200,
      tokens: 2600,
      level: 23,
      badge: "🌱",
      country: "Netherlands",
      change: "same",
    },
    {
      rank: 3,
      username: "TreePlanter",
      points: 13800,
      tokens: 2450,
      level: 22,
      badge: "🌳",
      country: "Germany",
      change: "down",
    },
    // Add more entries...
  ]);

  const [timeFrame, setTimeFrame] = useState<"weekly" | "monthly" | "allTime">("weekly");

  useEffect(() => {
    const interval = setInterval(() => {
      setLeaderboard((prev) =>
        prev.map((entry) => ({
          ...entry,
          points: entry.points + Math.floor(Math.random() * 50),
          tokens: entry.tokens + Math.floor(Math.random() * 10),
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-400" />;
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />;
      case 3:
        return <Medal className="h-6 w-6 text-orange-400" />;
      default:
        return <span className="text-lg font-bold text-muted-foreground">#{rank}</span>;
    }
  };

  const getChangeIcon = (change: string) => {
    switch (change) {
      case "up":
        return <TrendingUp className="h-4 w-4 text-green-400" />;
      case "down":
        return <TrendingUp className="h-4 w-4 text-red-400 rotate-180" />;
      default:
        return <div className="h-4 w-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400 bg-clip-text text-transparent mb-4">
            🏆 Global Leaderboard
          </h1>
          <p className="text-xl text-muted-foreground">
            See how you rank among the world's top environmental champions
          </p>
        </div>

        <Tabs
          value={timeFrame}
          onValueChange={(value) => setTimeFrame(value as any)}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-3 mb-8">
            <TabsTrigger value="weekly">This Week</TabsTrigger>
            <TabsTrigger value="monthly">This Month</TabsTrigger>
            <TabsTrigger value="allTime">All Time</TabsTrigger>
          </TabsList>

          <TabsContent value={timeFrame} className="space-y-6">
            {/* Top 3 Podium */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              {leaderboard.slice(0, 3).map((entry, index) => (
                <Card
                  key={entry.rank}
                  className={`text-center ${
                    index === 0
                      ? "bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/30"
                      : index === 1
                        ? "bg-gradient-to-br from-gray-900/30 to-slate-900/30 border-gray-500/30"
                        : "bg-gradient-to-br from-orange-900/30 to-red-900/30 border-orange-500/30"
                  }`}
                >
                  <CardHeader>
                    <div className="flex justify-center mb-2">{getRankIcon(entry.rank)}</div>
                    <CardTitle className="text-xl">{entry.username}</CardTitle>
                    <div className="flex justify-center gap-2">
                      <Badge className="bg-purple-600">Level {entry.level}</Badge>
                      <Badge className="bg-blue-600">{entry.country}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <div className="text-2xl font-bold text-green-400">
                        {entry.points.toLocaleString()} pts
                      </div>
                      <div className="text-lg text-blue-400">
                        {entry.tokens.toLocaleString()} GAIA
                      </div>
                      <div className="text-4xl">{entry.badge}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Full Leaderboard */}
            <Card className="bg-gray-900/50 border-gray-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <Trophy className="h-6 w-6" />
                  Global Rankings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {leaderboard.map((entry) => (
                    <div
                      key={entry.rank}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-all hover:bg-gray-800/50 ${
                        entry.rank <= 3
                          ? "bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/30"
                          : "bg-gray-900/30 border-gray-500/20"
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-8 flex justify-center">{getRankIcon(entry.rank)}</div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{entry.badge}</span>
                          <div>
                            <div className="font-semibold">{entry.username}</div>
                            <div className="text-sm text-muted-foreground">
                              Level {entry.level} • {entry.country}
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-6">
                        <div className="text-right">
                          <div className="font-bold text-green-400">
                            {entry.points.toLocaleString()} pts
                          </div>
                          <div className="text-sm text-blue-400">
                            {entry.tokens.toLocaleString()} GAIA
                          </div>
                        </div>
                        <div className="w-6 flex justify-center">{getChangeIcon(entry.change)}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-green-900/30 border-green-500/30">
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400">12,589</div>
                  <div className="text-sm text-green-300/80">Total Participants</div>
                </CardContent>
              </Card>

              <Card className="bg-blue-900/30 border-blue-500/30">
                <CardContent className="p-4 text-center">
                  <Zap className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-400">2.4M</div>
                  <div className="text-sm text-blue-300/80">Total GAIA Earned</div>
                </CardContent>
              </Card>

              <Card className="bg-purple-900/30 border-purple-500/30">
                <CardContent className="p-4 text-center">
                  <Star className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-purple-400">156</div>
                  <div className="text-sm text-purple-300/80">Countries</div>
                </CardContent>
              </Card>

              <Card className="bg-orange-900/30 border-orange-500/30">
                <CardContent className="p-4 text-center">
                  <Globe className="h-8 w-8 text-orange-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-orange-400">45K</div>
                  <div className="text-sm text-orange-300/80">Projects Completed</div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
