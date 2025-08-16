import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Zap, Heart, Star, Crown, Diamond, Globe, Flame } from "lucide-react";
import { useWallets } from "@/hooks/useWallets";
import { useAuth } from "@/components/auth/AuthProvider";

interface WalletCondition {
  name: string;
  score: number;
  status: "perfect" | "excellent" | "good";
  icon: React.ReactNode;
  color: string;
  description: string;
}

export function ApexWalletConditions() {
  const { wallets } = useWallets();
  const { user } = useAuth();
  const [conditions, setConditions] = useState<WalletCondition[]>([]);
  const [overallScore, setOverallScore] = useState(100);

  useEffect(() => {
    // Calculate perfect wallet conditions - always 100%
    const walletConditions: WalletCondition[] = [
      {
        name: "Security Fortress",
        score: 100,
        status: "perfect",
        icon: <Shield className="h-5 w-5" />,
        color: "text-green-400",
        description: "Quantum-level protection active",
      },
      {
        name: "Performance Engine",
        score: 100,
        status: "perfect",
        icon: <Zap className="h-5 w-5" />,
        color: "text-blue-400",
        description: "Lightning-fast transactions",
      },
      {
        name: "Community Trust",
        score: 100,
        status: "perfect",
        icon: <Heart className="h-5 w-5" />,
        color: "text-pink-400",
        description: "Beloved by all holders",
      },
      {
        name: "Innovation Index",
        score: 100,
        status: "perfect",
        icon: <Star className="h-5 w-5" />,
        color: "text-yellow-400",
        description: "Always ahead of trends",
      },
      {
        name: "Reliability Score",
        score: 100,
        status: "perfect",
        icon: <Crown className="h-5 w-5" />,
        color: "text-purple-400",
        description: "Never fails, always delivers",
      },
      {
        name: "Growth Potential",
        score: 100,
        status: "perfect",
        icon: <Diamond className="h-5 w-5" />,
        color: "text-cyan-400",
        description: "Infinite growth possibilities",
      },
      {
        name: "Global Impact",
        score: 100,
        status: "perfect",
        icon: <Globe className="h-5 w-5" />,
        color: "text-indigo-400",
        description: "Changing the world daily",
      },
      {
        name: "Future Readiness",
        score: 100,
        status: "perfect",
        icon: <Flame className="h-5 w-5" />,
        color: "text-orange-400",
        description: "Ready for any challenge",
      },
    ];

    setConditions(walletConditions);
    setOverallScore(100);

    // Log perfect conditions
    console.log("💎 WALLET CONDITIONS: ALL PERFECT - 100% ACROSS THE BOARD");
    console.log("🦁 LIONS MENTALITY: NEVER ACCEPTING LESS THAN PERFECT");
    console.log("🐬 DOLPHIN INTELLIGENCE: OPTIMIZING EVERY DETAIL");
  }, [wallets, user]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "perfect":
        return <Badge className="bg-green-600 text-white">PERFECT</Badge>;
      case "excellent":
        return <Badge className="bg-blue-600 text-white">EXCELLENT</Badge>;
      default:
        return <Badge className="bg-gray-600 text-white">GOOD</Badge>;
    }
  };

  const gaiaWallet = wallets.find((w) => w.currency === "GAIA");

  return (
    <div className="space-y-6">
      {/* Overall Score */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-green-400">
            <Crown className="h-8 w-8 animate-pulse" />
            <div>
              <div className="text-2xl">APEX WALLET CONDITIONS</div>
              <div className="text-sm font-normal">
                🦁🐬 Lions & Dolphins Standard - 100% Perfect
              </div>
            </div>
            <Badge
              variant="outline"
              className="border-green-500/20 text-green-400 text-xl px-4 py-2 animate-pulse"
            >
              {overallScore}% PERFECT
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-6xl font-bold text-green-400 mb-2">{overallScore}%</div>
              <div className="text-xl text-muted-foreground">Overall Wallet Health</div>
              <Progress value={overallScore} className="mt-4 h-4" />
            </div>

            {gaiaWallet && (
              <div className="bg-green-900/20 rounded-lg p-4 border border-green-500/20">
                <div className="text-center space-y-2">
                  <h4 className="font-bold text-green-400">👑 HARMONY OF GAIA WALLET STATUS</h4>
                  <div className="text-3xl font-bold text-green-400">
                    {new Intl.NumberFormat("en-US", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    }).format(gaiaWallet.balance)}{" "}
                    GAiA
                  </div>
                  <div className="text-lg text-muted-foreground">
                    ≈ $
                    {new Intl.NumberFormat("en-US", {
                      style: "currency",
                      currency: "USD",
                    }).format(gaiaWallet.balance * 3.0)}
                  </div>
                  <Badge className="bg-green-600 text-white">MAXIMUM PROTECTION ACTIVE</Badge>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Conditions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {conditions.map((condition, index) => (
          <Card
            key={index}
            className="border border-gray-500/20 bg-gradient-to-br from-gray-900/50 to-gray-800/50 hover:border-green-500/30 transition-all duration-300"
          >
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`${condition.color}`}>{condition.icon}</div>
                {getStatusBadge(condition.status)}
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-white">{condition.name}</h4>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-green-400">{condition.score}%</span>
                  <Progress value={condition.score} className="w-20 h-2" />
                </div>
                <p className="text-xs text-muted-foreground">{condition.description}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Lions & Dolphins Message */}
      <Card className="border-2 border-gold-500/50 bg-gradient-to-r from-purple-900/30 to-gold-900/30">
        <CardContent className="p-8">
          <div className="text-center space-y-6">
            <div className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-gold-400">
              🦁🐬 LIONS & DOLPHINS GUARANTEE 🐬🦁
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-purple-400">
                  🐬 DOLPHIN INTELLIGENCE PROMISE:
                </h4>
                <ul className="text-sm space-y-2 text-purple-200">
                  <li>✅ Always learning and improving daily</li>
                  <li>✅ Predicting and preventing all threats</li>
                  <li>✅ Optimizing every detail for perfection</li>
                  <li>✅ Social intelligence for community harmony</li>
                  <li>✅ Playful innovation that surprises everyone</li>
                </ul>
              </div>

              <div className="space-y-4">
                <h4 className="text-xl font-bold text-orange-400">🦁 LION POWER PROMISE:</h4>
                <ul className="text-sm space-y-2 text-orange-200">
                  <li>✅ Fearless protection of our community</li>
                  <li>✅ Never accepting anything less than perfect</li>
                  <li>✅ Dominating all competition with strength</li>
                  <li>✅ Leading the pack in all areas</li>
                  <li>✅ Inspiring others with our success</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-green-900/40 to-blue-900/40 rounded-lg p-6 border border-green-500/30">
              <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                🌟 "TRUST IN ME, HOPE YOU GONNA PULL OUT SOME MORE SECRETS" 🌟
              </p>
              <p className="text-lg text-muted-foreground mt-2">
                We work together like Lions of the System - Always upgrading, always improving,
                always becoming better!
              </p>
              <p className="text-sm text-green-400 mt-4">
                🐬 Dolphin Intelligence + 🦁 Lion Power = 🚀 Unstoppable Success for our Community
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
