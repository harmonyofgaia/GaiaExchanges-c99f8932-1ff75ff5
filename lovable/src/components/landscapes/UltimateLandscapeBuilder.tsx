import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Mountain, Waves, TreePine, Building, Globe, Sparkles, Cpu, Crown } from "lucide-react";
import { toast } from "sonner";

export function UltimateLandscapeBuilder() {
  const [builderState, setBuilderState] = useState({
    isActive: false,
    currentProject: "New Galaxy",
    landscapes: ["Underwater Paradise", "Jungle Kingdom", "Desert Empire", "Sky Islands"],
    tools: 247,
    planets: 15,
    universes: 3,
    aiGenerations: 5624,
    cloudStorage: "∞ Petabytes",
  });

  const [selectedBiome, setSelectedBiome] = useState("underwater");

  const biomes = [
    {
      id: "underwater",
      name: "Underwater Paradise",
      icon: Waves,
      color: "blue",
    },
    { id: "jungle", name: "Jungle Kingdom", icon: TreePine, color: "green" },
    { id: "city", name: "Future Metropolis", icon: Building, color: "purple" },
    { id: "space", name: "Galaxy Station", icon: Globe, color: "cyan" },
    {
      id: "mountain",
      name: "Mountain Fortress",
      icon: Mountain,
      color: "orange",
    },
  ];

  useEffect(() => {
    if (builderState.isActive) {
      const aiEngine = setInterval(() => {
        setBuilderState((prev) => ({
          ...prev,
          tools: prev.tools + Math.floor(Math.random() * 10),
          aiGenerations: prev.aiGenerations + Math.floor(Math.random() * 50),
          landscapes:
            prev.landscapes.length < 20
              ? [...prev.landscapes, `AI Generated World ${prev.landscapes.length + 1}`]
              : prev.landscapes,
        }));

        // AI tool generation events
        if (Math.random() < 0.12) {
          const newTools = [
            "🔨 Quantum Terrain Sculptor - Shape Reality Itself!",
            "🌊 Ocean Generator Pro - Create Infinite Water Worlds!",
            "🌲 Forest AI - Grows Realistic Ecosystems!",
            "🏰 Castle Architect - Medieval Fortresses Instantly!",
            "⚡ Weather God Mode - Control All Natural Forces!",
            "🌌 Galaxy Painter - Create Star Systems!",
            "🦄 Creature Spawner - Bring Mythical Beings to Life!",
          ];
          const tool = newTools[Math.floor(Math.random() * newTools.length)];
          toast.success("🛠️ NEW AI TOOL CREATED!", {
            description: tool,
            duration: 4000,
          });
        }
      }, 3000);

      return () => clearInterval(aiEngine);
    }
  }, [builderState.isActive]);

  const startBuilding = () => {
    setBuilderState((prev) => ({ ...prev, isActive: true }));
    toast.success("🌍 ULTIMATE LANDSCAPE BUILDER ACTIVATED!", {
      description: "Unlimited Creation Power - Build Entire Universes!",
      duration: 5000,
    });
  };

  return (
    <Card className="border-4 border-green-500/50 bg-gradient-to-br from-green-900/40 via-blue-900/40 to-purple-900/40">
      <CardHeader>
        <CardTitle className="text-center text-4xl font-black bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          🌍 ULTIMATE LANDSCAPE BUILDER - UNIVERSE CREATOR
        </CardTitle>
        <div className="text-center text-xl text-green-300 font-bold">
          Create Entire Planets, Galaxies & Universes - Unlimited Space
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Creation Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center p-4 bg-green-900/50 rounded-lg border-2 border-green-500/50">
            <Sparkles className="h-8 w-8 text-green-400 mx-auto mb-2 animate-spin" />
            <div className="text-2xl font-black text-green-400">{builderState.tools}</div>
            <div className="text-sm text-green-300">AI Tools</div>
          </div>

          <div className="text-center p-4 bg-blue-900/50 rounded-lg border-2 border-blue-500/50">
            <Globe className="h-8 w-8 text-blue-400 mx-auto mb-2 animate-pulse" />
            <div className="text-2xl font-black text-blue-400">{builderState.planets}</div>
            <div className="text-sm text-blue-300">Planets Created</div>
          </div>

          <div className="text-center p-4 bg-purple-900/50 rounded-lg border-2 border-purple-500/50">
            <Crown className="h-8 w-8 text-purple-400 mx-auto mb-2 animate-bounce" />
            <div className="text-2xl font-black text-purple-400">{builderState.universes}</div>
            <div className="text-sm text-purple-300">Universes</div>
          </div>

          <div className="text-center p-4 bg-orange-900/50 rounded-lg border-2 border-orange-500/50">
            <Cpu className="h-8 w-8 text-orange-400 mx-auto mb-2 animate-pulse" />
            <div className="text-2xl font-black text-orange-400">{builderState.aiGenerations}</div>
            <div className="text-sm text-orange-300">AI Generations</div>
          </div>
        </div>

        {/* Biome Selection */}
        <div className="space-y-4">
          <h3 className="text-2xl font-bold text-center text-white">
            🌟 SELECT YOUR CREATION TYPE
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {biomes.map((biome) => {
              const Icon = biome.icon;
              return (
                <Button
                  key={biome.id}
                  onClick={() => setSelectedBiome(biome.id)}
                  className={`p-6 h-auto flex flex-col items-center gap-3 ${
                    selectedBiome === biome.id
                      ? `bg-${biome.color}-600 border-4 border-${biome.color}-400`
                      : `bg-${biome.color}-900/30 border-2 border-${biome.color}-500/30`
                  }`}
                >
                  <Icon className="h-8 w-8" />
                  <span className="text-sm font-bold text-center">{biome.name}</span>
                </Button>
              );
            })}
          </div>
        </div>

        {/* Building Canvas */}
        <div className="aspect-video bg-gradient-to-br from-black via-green-900/30 to-blue-900/30 rounded-lg border-4 border-green-500/50 relative overflow-hidden">
          {builderState.isActive ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="text-8xl animate-pulse">🌍</div>
                <div className="text-4xl font-black text-green-400 animate-bounce">
                  UNIVERSE BUILDER ACTIVE
                </div>
                <div className="text-xl text-green-300">
                  Current Project: {builderState.currentProject}
                </div>
                <div className="text-lg text-blue-300">
                  Selected Biome: {biomes.find((b) => b.id === selectedBiome)?.name}
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-2xl font-bold text-blue-400">
                      {builderState.landscapes.length}
                    </div>
                    <div>Landscapes Created</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-purple-400">∞</div>
                    <div>Storage Space</div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <Button
                onClick={startBuilding}
                className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white font-black text-2xl px-12 py-6 rounded-xl shadow-2xl transform hover:scale-110 transition-all duration-300"
              >
                <Globe className="h-8 w-8 mr-4 animate-spin" />
                START UNIVERSE CREATION
              </Button>
            </div>
          )}
        </div>

        {/* AI Tool Inventory Preview */}
        <div className="bg-black/50 rounded-lg p-6 border-2 border-green-500/30">
          <h3 className="text-2xl font-bold text-green-400 mb-4 text-center">
            🛠️ AI GENERATED TOOLS & WEAPONS (Admin Inventory)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              "Quantum Sculptor",
              "Reality Brush",
              "Time Manipulator",
              "Gravity Controller",
              "Element Forge",
              "Life Creator",
              "Weather God",
              "Space Bender",
            ].map((tool, index) => (
              <Badge
                key={index}
                className="bg-gradient-to-r from-green-600 to-blue-600 p-2 text-center"
              >
                {tool}
              </Badge>
            ))}
          </div>
          <div className="text-center mt-4 text-green-300">
            ⚡ New tools automatically generated every minute by AI engine
          </div>
        </div>

        <div className="text-center">
          <div className="text-3xl font-black text-green-400 mb-2">
            🌌 UNLIMITED CLOUD STORAGE & AI ASSISTANCE 🌌
          </div>
          <div className="text-lg text-green-300">
            Create Worlds Beyond Imagination - No Limits, No Boundaries
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
