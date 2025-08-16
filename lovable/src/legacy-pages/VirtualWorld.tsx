import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Users, Gamepad2, Zap, Crown, Star, Rocket, Cpu } from "lucide-react";
import { toast } from "sonner";
import { UniversalGaiaLogo } from "@/components/branding/UniversalGaiaLogo";

export default function VirtualWorld() {
  const [worldState, setWorldState] = useState({
    isActive: false,
    playersOnline: 47523,
    worldsCreated: 1247,
    graphicsQuality: "8K Ultra",
    currentWorld: "Underground Winter Fortress",
    gameEngine: "Harmony Quantum Engine v3.0",
  });

  const [selectedLandscape, setSelectedLandscape] = useState("underground-winter");

  const premadeLandscapes = [
    {
      id: "underground-winter",
      name: "Underground Winter Fortress",
      description: "Massive underground kingdom with frozen waterfalls and crystal caves",
      graphics: "8K Ultra HDR",
      style: "Fantasy Epic",
    },
    {
      id: "halo-station",
      name: "Halo Space Station",
      description: "Futuristic space station with gravity rings and plasma weapons",
      graphics: "8K Ray-Traced",
      style: "Sci-Fi Action",
    },
    {
      id: "god-of-war-realm",
      name: "God of War Nordic Realm",
      description: "Norse mythology world with ancient temples and mythical creatures",
      graphics: "8K Photorealistic",
      style: "Mythological",
    },
    {
      id: "warcraft-kingdom",
      name: "Warcraft Kingdom",
      description: "Massive fantasy kingdom with castles, dragons, and magic",
      graphics: "8K Fantasy",
      style: "High Fantasy",
    },
    {
      id: "final-fantasy-world",
      name: "Final Fantasy Cosmic World",
      description: "Floating islands with airships and crystal-powered cities",
      graphics: "8K Anime Style",
      style: "JRPG Epic",
    },
  ];

  useEffect(() => {
    if (worldState.isActive) {
      const worldEngine = setInterval(() => {
        setWorldState((prev) => ({
          ...prev,
          playersOnline: prev.playersOnline + Math.floor(Math.random() * 100),
          worldsCreated: prev.worldsCreated + Math.floor(Math.random() * 5)
        }));

        // World events
        if (Math.random() < 0.1) {
          const events = [
            "🏰 New Kingdom Discovered - Explore Infinite Possibilities!",
            "🐉 Dragon Boss Spawned - Epic Battle Awaits!",
            "⚔️ Legendary Weapon Found - Power Beyond Imagination!",
            "🌟 New Dimension Opened - Travel Between Worlds!",
            "🚀 Space Station Built - Interplanetary Adventures!",
            "❄️ Winter Kingdom Unlocked - Frozen Majesty!",
            "🔥 Volcanic Realm Created - Molten Challenges!",
          ];
          const event = events[Math.floor(Math.random() * events.length)];
          toast.success("🌍 WORLD EVENT!", {
            description: event,
            duration: 4000,
          });
        }
      }, 3000);

      return () => clearInterval(worldEngine);
    }
  }, [worldState.isActive]);

  const enterVirtualWorld = () => {
    setWorldState((prev) => ({ ...prev, isActive: true }));
    toast.success("🌍 VIRTUAL WORLD ACTIVATED!", {
      description: "8K Graphics Engine Online - Unlimited Possibilities Await!",
      duration: 6000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-blue-900/20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center mb-8">
          <UniversalGaiaLogo
            size="lg"
            animated={true}
            showText={true}
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>

        <Card className="border-4 border-cyan-500/50 bg-gradient-to-br from-cyan-900/40 via-blue-900/40 to-purple-900/40 mb-8">
          <CardHeader>
            <CardTitle className="text-center text-5xl font-black bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              🌍 HARMONY VIRTUAL UNIVERSE
            </CardTitle>
            <div className="text-center text-2xl text-cyan-300 font-bold">
              8K Ultra Graphics • Unlimited Creation • Multiplayer Sandbox
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* World Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-cyan-900/50 rounded-lg border-2 border-cyan-500/50">
                <Users className="h-8 w-8 text-cyan-400 mx-auto mb-2 animate-pulse" />
                <div className="text-2xl font-black text-cyan-400">
                  {worldState.playersOnline.toLocaleString()}
                </div>
                <div className="text-sm text-cyan-300">Players Online</div>
              </div>

              <div className="text-center p-4 bg-blue-900/50 rounded-lg border-2 border-blue-500/50">
                <Globe className="h-8 w-8 text-blue-400 mx-auto mb-2 animate-spin" />
                <div className="text-2xl font-black text-blue-400">{worldState.worldsCreated}</div>
                <div className="text-sm text-blue-300">Worlds Created</div>
              </div>

              <div className="text-center p-4 bg-purple-900/50 rounded-lg border-2 border-purple-500/50">
                <Cpu className="h-8 w-8 text-purple-400 mx-auto mb-2 animate-bounce" />
                <div className="text-2xl font-black text-purple-400">
                  {worldState.graphicsQuality}
                </div>
                <div className="text-sm text-purple-300">Graphics Quality</div>
              </div>

              <div className="text-center p-4 bg-green-900/50 rounded-lg border-2 border-green-500/50">
                <Rocket className="h-8 w-8 text-green-400 mx-auto mb-2 animate-pulse" />
                <div className="text-2xl font-black text-green-400">∞</div>
                <div className="text-sm text-green-300">Possibilities</div>
              </div>
            </div>

            {/* Premade Landscape Showcase */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-center text-white">
                🎮 PREMADE EPIC LANDSCAPES
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {premadeLandscapes.map((landscape) => (
                  <Card
                    key={landscape.id}
                    className={`border-2 transition-all duration-300 cursor-pointer ${
                      selectedLandscape === landscape.id
                        ? "border-yellow-400 bg-yellow-900/20 scale-105"
                        : "border-gray-500/50 bg-gray-900/20 hover:border-yellow-400/50"
                    }`}
                  >
                    <CardContent className="p-6">
                      <div className="text-center space-y-3">
                        <div className="text-2xl font-bold text-yellow-400">{landscape.name}</div>
                        <div className="text-sm text-muted-foreground">{landscape.description}</div>
                        <div className="space-y-2">
                          <Badge className="bg-blue-600 text-white">{landscape.graphics}</Badge>
                          <Badge className="bg-purple-600 text-white">{landscape.style}</Badge>
                        </div>
                        <Button
                          onClick={() => setSelectedLandscape(landscape.id)}
                          className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                        >
                          <Gamepad2 className="h-4 w-4 mr-2" />
                          Explore World
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Virtual World Canvas */}
            <div className="aspect-video bg-gradient-to-br from-black via-cyan-900/30 to-purple-900/30 rounded-lg border-4 border-cyan-500/50 relative overflow-hidden">
              {worldState.isActive ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-6">
                    <div className="text-8xl animate-pulse">🌍</div>
                    <div className="text-4xl font-black text-cyan-400 animate-bounce">
                      VIRTUAL UNIVERSE ONLINE
                    </div>
                    <div className="text-xl text-cyan-300">
                      Current World:{" "}
                      {premadeLandscapes.find((l) => l.id === selectedLandscape)?.name}
                    </div>
                    <div className="text-lg text-blue-300">Engine: {worldState.gameEngine}</div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-green-400">8K</div>
                        <div>Ultra Graphics</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-400">∞</div>
                        <div>Cloud Power</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-yellow-400">VR</div>
                        <div>Ready</div>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    onClick={enterVirtualWorld}
                    className="bg-gradient-to-r from-cyan-600 via-blue-600 to-purple-600 hover:from-cyan-700 hover:via-blue-700 hover:to-purple-700 text-white font-black text-3xl px-16 py-8 rounded-xl shadow-2xl transform hover:scale-110 transition-all duration-300"
                  >
                    <Globe className="h-10 w-10 mr-6 animate-spin" />
                    ENTER VIRTUAL UNIVERSE
                  </Button>
                </div>
              )}
            </div>

            {/* Game Engine Features */}
            <div className="bg-black/50 rounded-lg p-6 border-2 border-cyan-500/30">
              <h3 className="text-2xl font-bold text-cyan-400 mb-4 text-center">
                🚀 HARMONY QUANTUM ENGINE FEATURES
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  "Ray Tracing 8K",
                  "Cloud Processing",
                  "VR/AR Ready",
                  "Multiplayer 10K+",
                  "Physics Engine",
                  "AI Creatures",
                  "Dynamic Weather",
                  "Infinite Worlds",
                ].map((feature, index) => (
                  <Badge
                    key={index}
                    className="bg-gradient-to-r from-cyan-600 to-blue-600 p-3 text-center text-white"
                  >
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-black text-cyan-400 mb-2">
                🌌 UNLIMITED VIRTUAL REALITY 🌌
              </div>
              <div className="text-xl text-cyan-300">
                Create • Explore • Conquer • Build Your Own Universe
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
