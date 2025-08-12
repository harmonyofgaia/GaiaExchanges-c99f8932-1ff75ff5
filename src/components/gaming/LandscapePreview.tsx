import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Mountain, Fish, TreePine, Zap, Crown, Rocket } from "lucide-react";
import { toast } from "sonner";

interface Landscape {
  id: string;
  name: string;
  type: "ocean" | "mountain" | "forest" | "quantum";
  memorySize: string;
  playerCount: number;
  biomechanicalCount: number;
  qualityLevel: number;
  description: string;
}

export function LandscapePreview() {
  const [landscapes, setLandscapes] = useState<Landscape[]>([]);
  const [selectedLandscape, setSelectedLandscape] = useState<Landscape | null>(
    null,
  );

  useEffect(() => {
    const landscapeData: Landscape[] = [
      {
        id: "1",
        name: "🌊 Infinite Ocean Paradise",
        type: "ocean",
        memorySize: "127.4 TB",
        playerCount: 2847,
        biomechanicalCount: 156,
        qualityLevel: 98,
        description:
          "Endless underwater realm with dolphin transformation zones, quantum coral reefs, and 500+ unique marine species with AI behavior.",
      },
      {
        id: "2",
        name: "🏔️ Quantum Mountain Range",
        type: "mountain",
        memorySize: "89.2 TB",
        playerCount: 1924,
        biomechanicalCount: 243,
        qualityLevel: 96,
        description:
          "Floating mountains with gravity-defying physics, crystal caves, and biomechanical wildlife. Features 1000+ levels of vertical exploration.",
      },
      {
        id: "3",
        name: "🌲 Mystical Forest Dimension",
        type: "forest",
        memorySize: "156.7 TB",
        playerCount: 3421,
        biomechanicalCount: 389,
        qualityLevel: 99,
        description:
          "Living forest with sentient trees, shape-shifting paths, and organic-digital fusion creatures. Self-evolving ecosystem powered by quantum AI.",
      },
      {
        id: "4",
        name: "⚡ Quantum Void Realm",
        type: "quantum",
        memorySize: "200+ TB",
        playerCount: 892,
        biomechanicalCount: 500,
        qualityLevel: 100,
        description:
          "Reality-bending dimension where physics laws are optional. Infinite possibilities, shape-shifting landscapes, and mind-bending challenges.",
      },
    ];
    setLandscapes(landscapeData);
    setSelectedLandscape(landscapeData[0]);
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "ocean":
        return <Fish className="h-5 w-5" />;
      case "mountain":
        return <Mountain className="h-5 w-5" />;
      case "forest":
        return <TreePine className="h-5 w-5" />;
      case "quantum":
        return <Zap className="h-5 w-5" />;
      default:
        return <Zap className="h-5 w-5" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "ocean":
        return "from-blue-600 to-cyan-600";
      case "mountain":
        return "from-gray-600 to-stone-600";
      case "forest":
        return "from-green-600 to-emerald-600";
      case "quantum":
        return "from-purple-600 to-pink-600";
      default:
        return "from-gray-600 to-slate-600";
    }
  };

  const enterLandscape = (landscape: Landscape) => {
    console.log(`🌍 ENTERING LANDSCAPE: ${landscape.name}`);
    console.log(
      `💾 LOADING: ${landscape.memorySize} of ultra-high quality data`,
    );
    console.log(`🎮 PLAYERS: ${landscape.playerCount} currently exploring`);
    console.log(
      `🦾 BIO-MECHANICAL: ${landscape.biomechanicalCount} entities active`,
    );

    toast.success(`🌍 Entering ${landscape.name}!`, {
      description: `Loading ${landscape.memorySize} of quantum-enhanced landscape data`,
      duration: 5000,
    });
  };

  return (
    <Card className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-500/20 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
            }}
          />
        ))}
      </div>

      <CardHeader className="relative z-10">
        <CardTitle className="text-indigo-400 flex items-center gap-2">
          <Crown className="w-6 h-6" />
          🌍 ULTRA-HIGH QUALITY LANDSCAPE SHOWCASE
        </CardTitle>
        <p className="text-muted-foreground">
          400TB+ quantum-enhanced worlds with endless possibilities and
          biomechanical fusion
        </p>
      </CardHeader>

      <CardContent className="relative z-10 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {landscapes.map((landscape) => (
            <Card
              key={landscape.id}
              className={`cursor-pointer transition-all hover:scale-105 border-2 ${
                selectedLandscape?.id === landscape.id
                  ? "border-purple-500 bg-purple-900/20"
                  : "border-gray-600 hover:border-blue-500"
              }`}
              onClick={() => setSelectedLandscape(landscape)}
            >
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  {getTypeIcon(landscape.type)}
                  <h4 className="font-bold text-white text-sm">
                    {landscape.name}
                  </h4>
                </div>
                <div className="space-y-1 text-xs">
                  <div className="flex justify-between">
                    <span>Memory:</span>
                    <span className="text-blue-400">
                      {landscape.memorySize}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Players:</span>
                    <span className="text-green-400">
                      {landscape.playerCount.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quality:</span>
                    <span className="text-yellow-400">
                      {landscape.qualityLevel}%
                    </span>
                  </div>
                </div>
                <Progress value={landscape.qualityLevel} className="h-2 mt-2" />
              </CardContent>
            </Card>
          ))}
        </div>

        {selectedLandscape && (
          <Card
            className={`bg-gradient-to-r ${getTypeColor(selectedLandscape.type)} bg-opacity-10 border-2`}
          >
            <CardContent className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    {getTypeIcon(selectedLandscape.type)}
                    {selectedLandscape.name}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {selectedLandscape.description}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-black/30 rounded">
                      <div className="text-2xl font-bold text-blue-400">
                        {selectedLandscape.memorySize}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Memory Size
                      </div>
                    </div>
                    <div className="text-center p-3 bg-black/30 rounded">
                      <div className="text-2xl font-bold text-green-400">
                        {selectedLandscape.playerCount.toLocaleString()}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Active Players
                      </div>
                    </div>
                    <div className="text-center p-3 bg-black/30 rounded">
                      <div className="text-2xl font-bold text-red-400">
                        {selectedLandscape.biomechanicalCount}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Bio-Mechanical
                      </div>
                    </div>
                    <div className="text-center p-3 bg-black/30 rounded">
                      <div className="text-2xl font-bold text-purple-400">
                        {selectedLandscape.qualityLevel}%
                      </div>
                      <div className="text-xs text-muted-foreground">
                        Quality Level
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => enterLandscape(selectedLandscape)}
                    className={`w-full bg-gradient-to-r ${getTypeColor(selectedLandscape.type)} hover:opacity-90`}
                  >
                    <Rocket className="h-4 w-4 mr-2" />
                    🌍 ENTER LANDSCAPE
                  </Button>
                </div>

                <div className="relative h-64 bg-black rounded-lg overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-4">
                        {selectedLandscape.type === "ocean" && "🌊"}
                        {selectedLandscape.type === "mountain" && "🏔️"}
                        {selectedLandscape.type === "forest" && "🌲"}
                        {selectedLandscape.type === "quantum" && "⚡"}
                      </div>
                      <div className="text-2xl font-bold text-white mb-2">
                        ULTRA-HIGH QUALITY
                      </div>
                      <div className="text-lg text-blue-400 animate-pulse">
                        Quantum-Enhanced • 280 FPS Ready
                      </div>
                    </div>
                  </div>

                  {Array.from({ length: 20 }).map((_, i) => (
                    <div
                      key={i}
                      className={`absolute w-2 h-2 bg-gradient-to-r ${getTypeColor(selectedLandscape.type)} rounded-full opacity-30 animate-pulse`}
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
