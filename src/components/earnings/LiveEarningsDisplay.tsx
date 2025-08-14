import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Coins, TrendingUp, Zap } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";

interface LiveEarningsDisplayProps {
  userId?: string;
}

export function LiveEarningsDisplay({ userId = "default" }: LiveEarningsDisplayProps) {
  const [earnings, setEarnings] = useState({
    totalEarned: 0,
    dailyEarnings: 0,
    currentStreak: 0,
  });

  useEffect(() => {
    const updateEarnings = () => {
      setEarnings((prev) => ({
        totalEarned: prev.totalEarned + Math.floor(Math.random() * 10),
        dailyEarnings: prev.dailyEarnings + Math.floor(Math.random() * 5),
        currentStreak: Math.max(prev.currentStreak, Math.floor(Math.random() * 30)),
      }));
    };

    const interval = setInterval(updateEarnings, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Coins className="h-5 w-5" />
          Live Earnings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-400">
              <AnimatedCounter value={earnings.totalEarned} />
            </div>
            <div className="text-sm text-green-300/80">Total GAIA</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-emerald-400">
              <AnimatedCounter value={earnings.dailyEarnings} />
            </div>
            <div className="text-sm text-emerald-300/80">Today</div>
          </div>

          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-400">
              <AnimatedCounter value={earnings.currentStreak} />
            </div>
            <div className="text-sm text-yellow-300/80">Day Streak</div>
          </div>
        </div>

        <div className="flex justify-center gap-2">
          <Badge className="bg-green-600">
            <TrendingUp className="h-3 w-3 mr-1" />
            Active
          </Badge>
          <Badge className="bg-emerald-600">
            <Zap className="h-3 w-3 mr-1" />
            Earning
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
