import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Gamepad2, Zap, Crown, Sword, Shield, Star, Flame, Brain, Rocket } from "lucide-react";
import { toast } from "sonner";

export function GaiaFighterPro() {
  const [gameState, setGameState] = useState({
    isActive: false,
    playerLevel: 9999,
    quantumPower: 100,
    dragonEnergy: 100,
    universalRank: "Quantum God Emperor",
    currentRealm: "Middle-earth Sanctuary",
    activeQuests: 247,
    guildsConquered: 156,
    legendaryItems: 892,
    cloudProcessingPower: "∞ Quantum Cores",
  });

  const [visualEffects, setVisualEffects] = useState({
    rayTracing: "ULTRA 16K",
    particleSystem: "Quantum Physics Engine",
    lighting: "Volumetric God Rays",
    physics: "Real-World Simulation",
    ai: "Dragon Neural Networks",
    multiplayer: "10,000+ Simultaneous Players",
  });

  const gameCanvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (gameState.isActive) {
      const cloudEngine = setInterval(() => {
        // Quantum cloud processing simulation
        setGameState((prev) => ({
          ...prev,
          quantumPower: Math.min(100, prev.quantumPower + 0.5),
          dragonEnergy: Math.min(100, prev.dragonEnergy + 0.3),
          activeQuests: prev.activeQuests + Math.floor(Math.random() * 5),
          guildsConquered: prev.guildsConquered + Math.floor(Math.random() * 2),
        }));

        // Epic events simulation
        if (Math.random() < 0.15) {
          const epicEvents = [
            "🐉 Ancient Dragon Tamed - Unlimited Power Unlocked!",
            "⚔️ Legendary Weapon Forged - Reality Itself Trembles!",
            "🌟 New Galaxy Discovered - Infinite Adventures Await!",
            "👑 Kingdom Conquered - Your Empire Grows!",
            "🔮 Quantum Portal Opened - Travel Between Worlds!",
            "⚡ Lightning Strike - 1000x Damage Multiplier!",
            "🏰 Fortress Built - Impenetrable Defense Activated!",
          ];
          const event = epicEvents[Math.floor(Math.random() * epicEvents.length)];
          toast.success("🎮 LEGENDARY EVENT!", {
            description: event,
            duration: 5000,
          });
        }
      }, 2000);

      return () => clearInterval(cloudEngine);
    }
  }, [gameState.isActive]);

  const startUltimateGame = () => {
    setGameState((prev) => ({ ...prev, isActive: true }));
    toast.success("🚀 GAIA FIGHTER PRO ACTIVATED!", {
      description: "Quantum Cloud Gaming Engine Online - Graphics Beyond Imagination!",
      duration: 6000,
    });
  };

  return (
    <Card className="border-4 border-red-500/50 bg-gradient-to-br from-red-900/40 via-orange-900/40 to-yellow-900/40">
      <CardHeader>
        <CardTitle className="text-center text-4xl font-black bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
          ⚔️ GAIA FIGHTER PRO - QUANTUM UNIVERSE
        </CardTitle>
        <div className="text-center text-xl text-orange-300 font-bold">
          1000x More Powerful Than Any Game Ever Created
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Ultimate Stats Display */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-red-900/50 rounded-lg border-2 border-red-500/50">
            <Crown className="h-8 w-8 text-red-400 mx-auto mb-2 animate-pulse" />
            <div className="text-2xl font-black text-red-400">Level {gameState.playerLevel}</div>
            <div className="text-sm text-red-300">{gameState.universalRank}</div>
          </div>

          <div className="text-center p-4 bg-blue-900/50 rounded-lg border-2 border-blue-500/50">
            <Zap className="h-8 w-8 text-blue-400 mx-auto mb-2 animate-spin" />
            <div className="text-2xl font-black text-blue-400">{gameState.quantumPower}%</div>
            <div className="text-sm text-blue-300">Quantum Power</div>
          </div>

          <div className="text-center p-4 bg-purple-900/50 rounded-lg border-2 border-purple-500/50">
            <Flame className="h-8 w-8 text-purple-400 mx-auto mb-2 animate-bounce" />
            <div className="text-2xl font-black text-purple-400">{gameState.dragonEnergy}%</div>
            <div className="text-sm text-purple-300">Dragon Energy</div>
          </div>

          <div className="text-center p-4 bg-green-900/50 rounded-lg border-2 border-green-500/50">
            <Star className="h-8 w-8 text-green-400 mx-auto mb-2 animate-pulse" />
            <div className="text-2xl font-black text-green-400">{gameState.activeQuests}</div>
            <div className="text-sm text-green-300">Active Quests</div>
          </div>
        </div>

        {/* Ultimate Game Canvas */}
        <div
          ref={gameCanvasRef}
          className="aspect-video bg-gradient-to-br from-black via-red-900/30 to-orange-900/30 rounded-lg border-4 border-orange-500/50 relative overflow-hidden"
        >
          {gameState.isActive ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-8xl animate-pulse">⚔️</div>
                <div className="text-4xl font-black text-orange-400 animate-bounce">
                  QUANTUM BATTLEFIELD ACTIVE
                </div>
                <div className="text-xl text-orange-300">
                  Current Realm: {gameState.currentRealm}
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">
                      {gameState.guildsConquered}
                    </div>
                    <div>Guilds Conquered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">
                      {gameState.legendaryItems}
                    </div>
                    <div>Legendary Items</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">∞</div>
                    <div>Power Level</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                onClick={startUltimateGame}
                className="bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 hover:from-red-700 hover:via-orange-700 hover:to-yellow-700 text-white font-black text-2xl px-12 py-6 rounded-xl shadow-2xl transform hover:scale-110 transition-all duration-300"
              >
                <Rocket className="h-8 w-8 mr-4 animate-bounce" />
                ENTER QUANTUM BATTLEFIELD
              </Button>
            </div>
          )}
        </div>

        {/* Technical Specifications */}
        <div className="bg-black/50 rounded-lg p-6 border-2 border-orange-500/30">
          <h3 className="text-2xl font-bold text-orange-400 mb-4 text-center">
            🚀 QUANTUM TECHNICAL SPECIFICATIONS
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {Object.entries(visualEffects).map(([key, value]) => (
              <div
                key={key}
                className="text-center p-3 bg-gradient-to-br from-orange-900/30 to-red-900/30 rounded border border-orange-500/30"
              >
                <div className="text-sm text-orange-300 capitalize">
                  {key.replace(/([A-Z])/g, " $1")}
                </div>
                <div className="text-xs text-orange-400 font-bold">{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <div className="text-3xl font-black text-orange-400 mb-2">
            🌟 POWERED BY QUANTUM CLOUD COMPUTING 🌟
          </div>
          <div className="text-lg text-orange-300">
            World of Warcraft × Final Fantasy × Lord of the Rings = GAIA FIGHTER PRO
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
