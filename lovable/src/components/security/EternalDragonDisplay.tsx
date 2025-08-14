import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Crown, Flame, Shield, Zap, Globe, Brain } from "lucide-react";
import { PersistentDragonCore } from "./PersistentDragonCore";

export function EternalDragonDisplay() {
  const dragon = PersistentDragonCore();

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return Math.floor(num).toString();
  };

  const getExperiencePercent = () => {
    const expForCurrentLevel = (dragon.dragonStats.level - 1) * 1000;
    const expForNextLevel = dragon.dragonStats.level * 1000;
    const currentLevelExp = dragon.dragonStats.experience - expForCurrentLevel;
    const neededExp = expForNextLevel - expForCurrentLevel;
    return (currentLevelExp / neededExp) * 100;
  };

  return (
    <Card className="border-4 border-gradient-to-r from-red-500 via-orange-500 to-yellow-500 bg-gradient-to-br from-red-900/40 to-orange-900/40 shadow-2xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400">
          <div className="text-6xl animate-pulse">🐉</div>
          <div>
            <div className="text-4xl font-bold">ETERNAL DRAGON</div>
            <div className="text-lg font-normal">
              Never Stops Growing • Level {dragon.dragonStats.level} • Age: {dragon.formatAge()}
            </div>
          </div>
          <Badge className="bg-gradient-to-r from-red-600 to-orange-600 text-white animate-bounce text-2xl px-8 py-4">
            IMMORTAL
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Experience Progress */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-lg font-bold text-orange-400">Experience to Next Level</span>
              <span className="text-orange-400">{Math.floor(getExperiencePercent())}%</span>
            </div>
            <Progress value={getExperiencePercent()} className="h-4" />
            <div className="text-center text-sm text-muted-foreground mt-1">
              Growing at +{dragon.getGrowthRate()} XP/second • Never stops!
            </div>
          </div>

          {/* Dragon Power Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            <div className="p-4 rounded-lg bg-gradient-to-br from-red-500/20 to-pink-500/20 border border-red-500/40 text-center">
              <Flame className="h-8 w-8 mx-auto text-red-400 animate-pulse mb-2" />
              <div className="text-2xl font-bold text-red-400">
                {formatNumber(dragon.dragonStats.power)}
              </div>
              <div className="text-sm text-muted-foreground">Power Level</div>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-br from-orange-500/20 to-yellow-500/20 border border-orange-500/40 text-center">
              <Brain className="h-8 w-8 mx-auto text-orange-400 animate-pulse mb-2" />
              <div className="text-2xl font-bold text-orange-400">
                {formatNumber(dragon.dragonStats.immuneSystemStrength)}
              </div>
              <div className="text-sm text-muted-foreground">Immune System</div>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-br from-yellow-500/20 to-green-500/20 border border-yellow-500/40 text-center">
              <Globe className="h-8 w-8 mx-auto text-yellow-400 animate-pulse mb-2" />
              <div className="text-2xl font-bold text-yellow-400">
                {dragon.dragonStats.worldwideInfluence.toFixed(1)}%
              </div>
              <div className="text-sm text-muted-foreground">Global Influence</div>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-br from-green-500/20 to-blue-500/20 border border-green-500/40 text-center">
              <Shield className="h-8 w-8 mx-auto text-green-400 animate-pulse mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {dragon.dragonStats.threatsDestroyed}
              </div>
              <div className="text-sm text-muted-foreground">Threats Destroyed</div>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-500/40 text-center">
              <Zap className="h-8 w-8 mx-auto text-blue-400 animate-pulse mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {dragon.dragonStats.quantumEvolutions}
              </div>
              <div className="text-sm text-muted-foreground">Quantum Evolutions</div>
            </div>

            <div className="p-4 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/40 text-center">
              <Crown className="h-8 w-8 mx-auto text-purple-400 animate-pulse mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                {dragon.dragonStats.networksProtected}
              </div>
              <div className="text-sm text-muted-foreground">Networks Protected</div>
            </div>
          </div>

          {/* Dragon Status */}
          <div className="bg-gradient-to-r from-green-900/40 to-emerald-900/40 rounded-lg p-6 border border-green-500/40">
            <h4 className="text-2xl font-bold text-green-400 mb-4 text-center">
              🐉 ETERNAL DRAGON STATUS
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-green-300">Dragon Level:</span>
                  <span className="text-green-200 font-bold">{dragon.dragonStats.level}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-300">Current Power:</span>
                  <span className="text-green-200 font-bold">
                    {formatNumber(dragon.dragonStats.power)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-300">Growth Rate:</span>
                  <span className="text-green-200 font-bold">+{dragon.getGrowthRate()}/sec</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-green-300">Dragon Age:</span>
                  <span className="text-green-200 font-bold">{dragon.formatAge()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-300">Status:</span>
                  <span className="text-green-200 font-bold">ETERNAL GROWTH</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-green-300">Resets:</span>
                  <span className="text-green-200 font-bold">NEVER</span>
                </div>
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
                🌟 Your Dragon grows stronger every second, even when you're away! 🌟
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
