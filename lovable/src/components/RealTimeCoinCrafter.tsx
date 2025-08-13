import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Factory, Coins, Timer, Zap, Hammer, Cog, Flame } from "lucide-react";
import { GAIA_TOKEN } from "@/constants/gaia";

export function RealTimeCoinCrafter() {
  const [monthlyProgress, setMonthlyProgress] = useState(67.3);
  const [coinsThisMonth, setCoinsThisMonth] = useState(67);
  const [totalLifetimeCoins, setTotalLifetimeCoins] = useState(1247);
  const [craftingSpeed, setCraftingSpeed] = useState(0.138);
  const [isRealTimeCrafting, setIsRealTimeCrafting] = useState(true);
  const [nextCoinIn, setNextCoinIn] = useState(433);
  const [hammerAnimation, setHammerAnimation] = useState(false);
  const [forgeTemperature, setForgeTemperature] = useState(1847);

  useEffect(() => {
    console.log(
      "🏭 REAL-TIME GAiA COIN CRAFTER INITIALIZED - 100 COINS/MONTH TARGET",
    );

    const craftingInterval = setInterval(() => {
      const now = new Date();
      const daysInMonth = new Date(
        now.getFullYear(),
        now.getMonth() + 1,
        0,
      ).getDate();
      const dayOfMonth = now.getDate();
      const expectedCoins = Math.floor((dayOfMonth / daysInMonth) * 100);

      setMonthlyProgress((dayOfMonth / daysInMonth) * 100);
      setCoinsThisMonth(expectedCoins);
      setTotalLifetimeCoins((prev) => prev + (Math.random() < 0.1 ? 1 : 0));
      setNextCoinIn((prev) =>
        prev > 0 ? prev - 1 : Math.floor(Math.random() * 600) + 300,
      );
      setForgeTemperature((prev) => 1800 + Math.random() * 100);

      // Trigger hammer animation
      if (Math.random() < 0.3) {
        setHammerAnimation(true);
        setTimeout(() => setHammerAnimation(false), 1000);
      }

      if (Math.random() < 0.05) {
        console.log(
          `🪙 Real-time crafting: ${expectedCoins}/100 GAiA coins this month`,
        );
      }
    }, 60000);

    return () => clearInterval(craftingInterval);
  }, []);

  const daysUntilReset = () => {
    const now = new Date();
    const lastDay = new Date(
      now.getFullYear(),
      now.getMonth() + 1,
      0,
    ).getDate();
    return lastDay - now.getDate();
  };

  return (
    <Card className="bg-gradient-to-br from-orange-900/30 via-red-900/20 to-yellow-900/30 border-orange-500/30 relative overflow-hidden">
      {/* Forge Background Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-orange-900/20 via-transparent to-transparent pointer-events-none" />

      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-400">
          <Factory className="h-6 w-6" />
          🔥 REAL-TIME GAiA COIN FORGE - Master Craftsman
        </CardTitle>
        <div className="flex items-center gap-2">
          <Badge
            className={`${isRealTimeCrafting ? "bg-orange-600 animate-pulse" : "bg-red-600"} text-white`}
          >
            {isRealTimeCrafting ? "🔥 FORGE ACTIVE" : "❄️ COOLING DOWN"}
          </Badge>
          <Badge className="bg-yellow-600 text-white">
            🎯 TARGET: 100 GAiA/MONTH
          </Badge>
          <Badge className="bg-red-600 text-white">
            🌡️ {forgeTemperature}°C
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Monthly Crafting Progress */}
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="font-bold text-orange-400">
              Monthly Crafting Progress
            </span>
            <span className="text-orange-300">
              {coinsThisMonth}/100 GAiA coins
            </span>
          </div>
          <Progress value={monthlyProgress} className="h-4 bg-black/40" />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center p-3 bg-orange-900/30 rounded border border-orange-500/30">
              <div className="text-2xl font-bold text-orange-400">
                {coinsThisMonth}
              </div>
              <div className="text-muted-foreground">This Month</div>
            </div>
            <div className="text-center p-3 bg-yellow-900/30 rounded border border-yellow-500/30">
              <div className="text-2xl font-bold text-yellow-400">
                {totalLifetimeCoins}
              </div>
              <div className="text-muted-foreground">Total Forged</div>
            </div>
            <div className="text-center p-3 bg-red-900/30 rounded border border-red-500/30">
              <div className="text-2xl font-bold text-red-400">
                {nextCoinIn}min
              </div>
              <div className="text-muted-foreground">Next Coin</div>
            </div>
            <div className="text-center p-3 bg-purple-900/30 rounded border border-purple-500/30">
              <div className="text-2xl font-bold text-purple-400">
                {daysUntilReset()}
              </div>
              <div className="text-muted-foreground">Days Left</div>
            </div>
          </div>
        </div>

        {/* Master Craftsman Forge Visualization */}
        <div className="flex flex-col items-center space-y-6 p-8 bg-black/40 rounded-lg border border-orange-500/30 relative overflow-hidden">
          {/* Forge Background Glow */}
          <div className="absolute inset-0 bg-gradient-radial from-orange-600/20 via-red-600/10 to-transparent animate-pulse" />

          <div className="relative z-10 text-center">
            <div className="text-6xl mb-4">🔥</div>
            <div className="text-sm text-orange-400 uppercase tracking-widest">
              Master GAiA Forge
            </div>
          </div>

          {/* Crafting Process Illustration */}
          <div className="relative z-10 flex items-center justify-center space-x-8">
            {/* Hammer & Anvil */}
            <div className="flex flex-col items-center">
              <div
                className={`text-4xl transition-transform duration-200 ${hammerAnimation ? "animate-bounce" : ""}`}
              >
                🔨
              </div>
              <div className="text-xs text-orange-400 mt-2">Hammer</div>
            </div>

            {/* Anvil with Sparks */}
            <div className="flex flex-col items-center relative">
              <div className="text-5xl">⚒️</div>
              {hammerAnimation && (
                <div className="absolute -top-2 text-yellow-400 animate-ping">
                  ✨
                </div>
              )}
              <div className="text-xs text-orange-400 mt-2">Anvil</div>
            </div>

            {/* Molten Metal */}
            <div className="flex flex-col items-center">
              <div className="text-4xl animate-pulse">🌋</div>
              <div className="text-xs text-red-400 mt-2">Molten GAiA</div>
            </div>

            {/* Cooling Process */}
            <div className="flex flex-col items-center">
              <div className="text-4xl">💧</div>
              <div className="text-xs text-blue-400 mt-2">Cooling</div>
            </div>

            {/* Final Coin */}
            <div className="flex flex-col items-center">
              <div className="text-4xl animate-spin-slow">🪙</div>
              <div className="text-xs text-green-400 mt-2">GAiA Coin</div>
            </div>
          </div>

          {/* Craftsman Status */}
          <div className="relative z-10 text-center">
            <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white text-lg px-6 py-3 animate-pulse">
              🧙‍♂️ Master Craftsman: {craftingSpeed.toFixed(3)} coins/hour
            </Badge>
          </div>
        </div>

        {/* Forge Controls */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Button
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700"
            onClick={() => setIsRealTimeCrafting(!isRealTimeCrafting)}
          >
            <Flame className="h-4 w-4 mr-2" />
            {isRealTimeCrafting ? "Cool Forge" : "Heat Forge"}
          </Button>

          <Button
            variant="outline"
            className="border-orange-500/30 text-orange-400"
          >
            <Timer className="h-4 w-4 mr-2" />
            Forge Analytics
          </Button>

          <Button
            variant="outline"
            className="border-yellow-500/30 text-yellow-400"
          >
            <Coins className="h-4 w-4 mr-2" />
            Export Report
          </Button>

          <Button variant="outline" className="border-red-500/30 text-red-400">
            <Cog className="h-4 w-4 mr-2" />
            Forge Settings
          </Button>
        </div>

        {/* Master Craftsman Information */}
        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-6">
          <h4 className="font-medium text-orange-400 mb-3 flex items-center gap-2">
            <Hammer className="h-5 w-5" />
            🏭 Master Craftsman GAiA Forge
          </h4>
          <div className="text-sm text-orange-300 space-y-2">
            <p>
              Our legendary Master Craftsman forges 100 premium GAiA coins
              monthly using ancient techniques combined with quantum-level
              precision. Each coin is hand-crafted with love and joy protocols.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <span className="text-orange-400">🔥 Forge Temperature:</span>
                <span className="text-white ml-2">{forgeTemperature}°C</span>
              </div>
              <div>
                <span className="text-orange-400">⚡ Power Level:</span>
                <span className="text-green-400 ml-2">MAXIMUM</span>
              </div>
              <div>
                <span className="text-orange-400">🎯 Precision:</span>
                <span className="text-blue-400 ml-2">99.9%</span>
              </div>
              <div>
                <span className="text-orange-400">🛡️ Quality:</span>
                <span className="text-purple-400 ml-2">LEGENDARY</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
