import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Hammer, Coins, Zap, Flame } from "lucide-react";
import { GAIA_TOKEN } from "@/constants/gaia";

export function EnhancedCoinCrafter() {
  const [craftingPhase, setCraftingPhase] = useState<
    "preparation" | "heating" | "hammering" | "finishing" | "complete"
  >("preparation");
  const [hammerStrikes, setHammerStrikes] = useState(0);
  const [totalCrafted, setTotalCrafted] = useState(125847);
  const [currentBatch, setCurrentBatch] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const craftingCycle = async () => {
      // Preparation phase
      setCraftingPhase("preparation");
      setProgress(0);
      setCurrentBatch(Math.floor(Math.random() * 15) + 5);

      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Heating phase
      setCraftingPhase("heating");
      setProgress(25);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Hammering phase
      setCraftingPhase("hammering");
      setHammerStrikes(0);

      for (let i = 1; i <= 5; i++) {
        setHammerStrikes(i);
        setProgress(25 + i * 10);
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      // Finishing phase
      setCraftingPhase("finishing");
      setProgress(85);
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Complete
      setCraftingPhase("complete");
      setProgress(100);
      setTotalCrafted((prev) => prev + currentBatch);

      await new Promise((resolve) => setTimeout(resolve, 2000));
    };

    const interval = setInterval(craftingCycle, 12000);
    craftingCycle(); // Start immediately

    return () => clearInterval(interval);
  }, [currentBatch]);

  const getPhaseDescription = () => {
    switch (craftingPhase) {
      case "preparation":
        return "🔧 Preparing steel and tools...";
      case "heating":
        return "🔥 Heating steel in dragon forge...";
      case "hammering":
        return `🔨 Hammering coins (${hammerStrikes}/5)...`;
      case "finishing":
        return "✨ Adding final touches and polish...";
      case "complete":
        return "✅ Batch complete! Ready for next craft.";
      default:
        return "Crafting in progress...";
    }
  };

  return (
    <Card className="bg-gradient-to-br from-orange-900/30 to-yellow-900/30 border-orange-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-400">
          <Hammer className="h-6 w-6" />
          🔥 ENHANCED GAiA COIN CRAFTER - Full Body Animation
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Enhanced Full Body Crafter Illustration */}
        <div className="flex flex-col items-center space-y-6 p-8 bg-black/20 rounded-lg">
          {/* Crafter Character - Full Body */}
          <div className="relative">
            {/* Body */}
            <div className="flex flex-col items-center">
              {/* Head */}
              <div className="text-4xl mb-2 relative">
                👨‍🔧
                {/* Safety goggles when heating */}
                {craftingPhase === "heating" && (
                  <div className="absolute -top-1 -right-1 text-2xl">🥽</div>
                )}
              </div>

              {/* Arms and Hammer */}
              <div className="relative flex items-center">
                <div className="text-3xl">💪</div>
                <div
                  className={`text-4xl mx-2 transition-all duration-300 ${
                    craftingPhase === "hammering"
                      ? "animate-bounce scale-125"
                      : "scale-100"
                  }`}
                >
                  🔨
                </div>
                <div className="text-3xl">💪</div>
              </div>

              {/* Torso with Apron */}
              <div className="text-3xl">👔</div>

              {/* Legs */}
              <div className="text-3xl">👖</div>
              <div className="flex gap-2">
                <div className="text-2xl">👢</div>
                <div className="text-2xl">👢</div>
              </div>
            </div>
          </div>

          {/* Crafting Table and Forge */}
          <div className="flex items-center justify-center space-x-8">
            {/* Forge/Furnace */}
            <div className="flex flex-col items-center">
              <div className="text-4xl relative">
                🏭
                {craftingPhase === "heating" && (
                  <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                    <div className="text-2xl animate-bounce">🔥</div>
                  </div>
                )}
              </div>
              <div className="text-sm text-orange-400">Dragon Forge</div>
            </div>

            {/* Crafting Table */}
            <div className="flex flex-col items-center">
              <div className="relative">
                <div className="text-6xl">🪚</div>

                {/* Steel ingot transforming to coin */}
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  {craftingPhase === "preparation" && (
                    <div className="text-3xl">⬜</div>
                  )}
                  {craftingPhase === "heating" && (
                    <div className="text-3xl animate-pulse">🟧</div>
                  )}
                  {craftingPhase === "hammering" && (
                    <div className="text-3xl animate-bounce">🟨</div>
                  )}
                  {(craftingPhase === "finishing" ||
                    craftingPhase === "complete") && (
                    <div className="text-3xl animate-spin">🪙</div>
                  )}
                </div>

                {/* Sparks during hammering */}
                {craftingPhase === "hammering" && (
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute text-yellow-400 animate-ping"
                        style={{
                          left: `${20 + Math.random() * 60}%`,
                          top: `${20 + Math.random() * 60}%`,
                          animationDelay: `${i * 0.2}s`,
                        }}
                      >
                        ✨
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="text-sm text-yellow-400">Crafting Table</div>
            </div>

            {/* Finished Coins Stack */}
            <div className="flex flex-col items-center">
              <div className="text-4xl">
                {craftingPhase === "complete" ? "💰" : "🪙"}
              </div>
              <div className="text-sm text-green-400">
                {currentBatch} GAiA Coins
              </div>
            </div>
          </div>

          {/* Phase Progress Bar */}
          <div className="w-full max-w-md space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-orange-400">Crafting Progress:</span>
              <span className="text-orange-300">{progress}%</span>
            </div>
            <Progress value={progress} className="h-3 bg-orange-900/30" />
            <div className="text-center text-sm text-orange-200">
              {getPhaseDescription()}
            </div>
          </div>

          {/* Status Badge */}
          <Badge
            className={`text-lg px-4 py-2 ${
              craftingPhase === "complete"
                ? "bg-green-600"
                : "bg-orange-600 animate-pulse"
            }`}
          >
            {craftingPhase === "complete"
              ? `✅ ${currentBatch} GAiA Coins Completed!`
              : `🔨 Crafting ${currentBatch} GAiA Coins...`}
          </Badge>
        </div>

        {/* Crafting Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-900/20 rounded-lg border border-green-500/20">
            <div className="text-2xl font-bold text-green-400">
              {totalCrafted.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">
              Total GAiA Crafted
            </div>
          </div>
          <div className="text-center p-4 bg-orange-900/20 rounded-lg border border-orange-500/20">
            <div className="text-2xl font-bold text-orange-400">
              {currentBatch}
            </div>
            <div className="text-sm text-muted-foreground">Current Batch</div>
          </div>
          <div className="text-center p-4 bg-blue-900/20 rounded-lg border border-blue-500/20">
            <div className="text-2xl font-bold text-blue-400">
              {hammerStrikes}/5
            </div>
            <div className="text-sm text-muted-foreground">Hammer Strikes</div>
          </div>
          <div className="text-center p-4 bg-purple-900/20 rounded-lg border border-purple-500/20">
            <div className="text-2xl font-bold text-purple-400">12s</div>
            <div className="text-sm text-muted-foreground">Cycle Time</div>
          </div>
        </div>

        {/* Dragon Forge Details */}
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
          <h4 className="font-medium text-red-400 mb-2 flex items-center gap-2">
            <Flame className="h-4 w-4" />
            🐉 Dragon-Powered Forge System
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="text-red-300">Forge Temperature:</div>
              <div className="font-mono text-xs text-red-400">
                2,847°C (Dragon Fire)
              </div>
            </div>
            <div>
              <div className="text-orange-300">Steel Quality:</div>
              <div className="font-mono text-xs text-orange-400">
                99.9% Pure Gaia Steel
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
