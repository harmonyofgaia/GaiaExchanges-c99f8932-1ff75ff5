import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Rocket,
  Share2,
  Trophy,
  Star,
  Users,
  Heart,
  Zap,
  Globe,
  Target,
  Crown,
} from "lucide-react";
import { toast } from "sonner";

export function ViralGrowthEngine() {
  const [viralMetrics, setViralMetrics] = useState({
    shareScore: 0,
    influenceLevel: 0,
    communityPower: 0,
    globalReach: 0,
    viralCoefficient: 1.2,
  });

  const [challenges, setChallenges] = useState([
    {
      id: 1,
      title: "Share with 10 Friends",
      reward: "500 GAIA",
      progress: 30,
      completed: false,
    },
    {
      id: 2,
      title: "Create Viral Content",
      reward: "1000 GAIA",
      progress: 65,
      completed: false,
    },
    {
      id: 3,
      title: "Invite 5 Investors",
      reward: "2500 GAIA",
      progress: 80,
      completed: false,
    },
    {
      id: 4,
      title: "Global Ambassador",
      reward: "5000 GAIA",
      progress: 20,
      completed: false,
    },
  ]);

  const [leaderboard, setLeaderboard] = useState([
    { rank: 1, name: "CryptoLion", score: 15420, badge: "👑" },
    { rank: 2, name: "DolphinTrader", score: 12350, badge: "🐬" },
    { rank: 3, name: "GaiaWarrior", score: 9870, badge: "🌍" },
    { rank: 4, name: "HarmonySeeker", score: 8420, badge: "🎵" },
    { rank: 5, name: "You", score: 6250, badge: "🚀" },
  ]);

  // Update metrics every 5 seconds
  useEffect(() => {
    const updateMetrics = () => {
      setViralMetrics((prev) => ({
        shareScore: Math.min(100, prev.shareScore + Math.random() * 3),
        influenceLevel: Math.min(100, prev.influenceLevel + Math.random() * 2.5),
        communityPower: Math.min(100, prev.communityPower + Math.random() * 2),
        globalReach: Math.min(100, prev.globalReach + Math.random() * 1.5),
        viralCoefficient: Math.max(
          1.0,
          Math.min(5.0, prev.viralCoefficient + (Math.random() * 0.2 - 0.1))
        ),
      }));

      // Random viral event
      if (Math.random() < 0.3) {
        const events = [
          "🚀 Your content went viral in Asia!",
          "🌍 Global reach expanded by 15%!",
          "👥 Community power boost activated!",
          "⚡ Influence multiplier increased!",
          "🎯 New investor attracted through your network!",
        ];
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        toast.success("Viral Growth Success!", {
          description: randomEvent,
          duration: 4000,
        });
      }
    };

    const interval = setInterval(updateMetrics, 5000);
    return () => clearInterval(interval);
  }, []);

  const activateViralBoost = () => {
    toast.success("🚀 VIRAL BOOST ACTIVATED!", {
      description: "Maximum sharing power unlocked - Global domination mode engaged!",
      duration: 6000,
    });

    setViralMetrics((prev) => ({
      ...prev,
      shareScore: Math.min(100, prev.shareScore + 25),
      viralCoefficient: Math.min(5.0, prev.viralCoefficient * 1.5),
    }));
  };

  const completeChallenge = (challengeId: number) => {
    setChallenges((prev) =>
      prev.map((challenge) =>
        challenge.id === challengeId ? { ...challenge, completed: true, progress: 100 } : challenge
      )
    );

    const challenge = challenges.find((c) => c.id === challengeId);
    toast.success("Challenge Completed!", {
      description: `Earned ${challenge?.reward} - Keep building the movement!`,
      duration: 5000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Viral Metrics Dashboard */}
      <Card className="border-2 border-orange-500/50 bg-gradient-to-br from-orange-900/30 to-red-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400">
            <Rocket className="h-6 w-6" />
            🚀 VIRAL GROWTH ENGINE - COMMUNITY DOMINATION MODE
            <Badge className="bg-orange-600 text-white animate-pulse">SPREADING WORLDWIDE</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 rounded-lg bg-red-900/30 border border-red-500/20">
              <Share2 className="h-6 w-6 text-red-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-red-400">
                {viralMetrics.shareScore.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Share Score</div>
              <Progress value={viralMetrics.shareScore} className="mt-2 h-2" />
            </div>

            <div className="text-center p-4 rounded-lg bg-purple-900/30 border border-purple-500/20">
              <Crown className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                {viralMetrics.influenceLevel.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Influence Level</div>
              <Progress value={viralMetrics.influenceLevel} className="mt-2 h-2" />
            </div>

            <div className="text-center p-4 rounded-lg bg-green-900/30 border border-green-500/20">
              <Users className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {viralMetrics.communityPower.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Community Power</div>
              <Progress value={viralMetrics.communityPower} className="mt-2 h-2" />
            </div>

            <div className="text-center p-4 rounded-lg bg-blue-900/30 border border-blue-500/20">
              <Globe className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {viralMetrics.globalReach.toFixed(1)}%
              </div>
              <div className="text-xs text-muted-foreground">Global Reach</div>
              <Progress value={viralMetrics.globalReach} className="mt-2 h-2" />
            </div>
          </div>

          <div className="text-center mb-4">
            <div className="text-lg font-bold text-yellow-400">
              Viral Coefficient: {viralMetrics.viralCoefficient.toFixed(2)}x
            </div>
            <div className="text-sm text-muted-foreground">
              Each person you reach brings {viralMetrics.viralCoefficient.toFixed(1)} more people!
            </div>
          </div>

          <Button
            onClick={activateViralBoost}
            className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-bold py-3"
          >
            <Zap className="h-5 w-5 mr-2" />
            🔥 ACTIVATE VIRAL BOOST - SPREAD THE HARMONY
          </Button>
        </CardContent>
      </Card>

      {/* Community Challenges */}
      <Card className="border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Trophy className="h-5 w-5" />
            Community Growth Challenges
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {challenges.map((challenge) => (
            <div key={challenge.id} className="p-4 border border-border/50 rounded-lg bg-muted/20">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{challenge.title}</h4>
                <div className="flex items-center gap-2">
                  <Badge className="bg-yellow-600 text-white">{challenge.reward}</Badge>
                  {challenge.completed && (
                    <Badge className="bg-green-600 text-white">COMPLETED</Badge>
                  )}
                </div>
              </div>
              <div className="space-y-2">
                <Progress value={challenge.progress} className="h-2" />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>{challenge.progress}% Complete</span>
                  {!challenge.completed && challenge.progress >= 90 && (
                    <Button
                      size="sm"
                      onClick={() => completeChallenge(challenge.id)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      Complete
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Viral Leaderboard */}
      <Card className="border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Star className="h-5 w-5" />
            Global Influence Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {leaderboard.map((user) => (
              <div
                key={user.rank}
                className={`flex items-center justify-between p-3 rounded-lg ${
                  user.name === "You" ? "bg-green-900/30 border border-green-500/30" : "bg-muted/20"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{user.badge}</div>
                  <div>
                    <div className="font-semibold">{user.name}</div>
                    <div className="text-xs text-muted-foreground">Rank #{user.rank}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-bold text-yellow-400">{user.score.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Influence Points</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Viral Strategies */}
      <Card className="border-cyan-500/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold text-cyan-400">
              🌍 VIRAL STRATEGIES FOR GLOBAL DOMINATION
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
                <Target className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                <h4 className="font-semibold text-blue-400 mb-2">Social Media Blitz</h4>
                <p className="text-sm text-muted-foreground">
                  Share on all platforms with our viral hashtags
                </p>
              </div>
              <div className="p-4 bg-green-900/20 rounded-lg border border-green-500/20">
                <Users className="h-6 w-6 text-green-400 mx-auto mb-2" />
                <h4 className="font-semibold text-green-400 mb-2">Influencer Network</h4>
                <p className="text-sm text-muted-foreground">
                  Connect with crypto and sustainability influencers
                </p>
              </div>
              <div className="p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
                <Heart className="h-6 w-6 text-purple-400 mx-auto mb-2" />
                <h4 className="font-semibold text-purple-400 mb-2">Community Love</h4>
                <p className="text-sm text-muted-foreground">
                  Build genuine connections and spread harmony
                </p>
              </div>
            </div>
            <p className="text-sm text-green-400 font-bold">
              🎵 "Seeds Will Form Into Music" - Every share creates a symphony of growth! 🎵
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
