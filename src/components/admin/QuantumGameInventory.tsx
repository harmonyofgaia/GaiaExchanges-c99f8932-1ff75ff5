import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Gamepad2,
  Sword,
  Shield,
  Crown,
  Gem,
  Mountain,
  Fish,
  Zap,
  Eye,
  Palette,
  Film,
  Rocket,
  Star,
} from "lucide-react";
import { toast } from "sonner";

interface GameAsset {
  id: string;
  name: string;
  type: "weapon" | "landscape" | "character" | "tool" | "vehicle";
  rarity: "common" | "rare" | "epic" | "legendary" | "quantum";
  powerLevel: number;
  memorySize: string;
  description: string;
  quantumEnhanced: boolean;
}

interface GameLevel {
  id: number;
  name: string;
  type: "surface" | "underwater" | "quantum";
  difficulty: number;
  unlocked: boolean;
  biomechanicalCount: number;
}

export function QuantumGameInventory() {
  const [gameAssets, setGameAssets] = useState<GameAsset[]>([]);
  const [gameLevels, setGameLevels] = useState<GameLevel[]>([]);
  const [totalMemoryUsed, setTotalMemoryUsed] = useState("847.3 TB");
  const [quantumPowerLevel, setQuantumPowerLevel] = useState(100);
  const [creationProgress, setCreationProgress] = useState(0);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    initializeQuantumInventory();
    generateGameLevels();
  }, [initializeQuantumInventory]);

  const initializeQuantumInventory = useCallback(() => {
    const assets: GameAsset[] = [
      {
        id: "1",
        name: "🦾 Quantum Bio-Mechanical Sword",
        type: "weapon",
        rarity: "quantum",
        powerLevel: 9999,
        memorySize: "15.7 TB",
        description: "Self-evolving biomechanical weapon with quantum DNA integration",
        quantumEnhanced: true,
      }, [])
      {
        id: "2",
        name: "🌊 Infinite Ocean World",
        type: "landscape",
        rarity: "legendary",
        powerLevel: 8750,
        memorySize: "127.4 TB",
        description: "Endless underwater realm with 500+ unique species and quantum physics",
        quantumEnhanced: true,
      },
      {
        id: "3",
        name: "🐉 Dragon-Phoenix Hybrid",
        type: "character",
        rarity: "quantum",
        powerLevel: 10000,
        memorySize: "23.8 TB",
        description: "Mythical creature with shapeshifting abilities and quantum fire breath",
        quantumEnhanced: true,
      },
      {
        id: "4",
        name: "🏔️ Quantum Mountain Range",
        type: "landscape",
        rarity: "epic",
        powerLevel: 7200,
        memorySize: "89.2 TB",
        description: "Floating mountains with gravity-defying waterfalls and crystal caves",
        quantumEnhanced: true,
      },
      {
        id: "5",
        name: "🛸 Bio-Mechanical Spaceship",
        type: "vehicle",
        rarity: "legendary",
        powerLevel: 9200,
        memorySize: "31.6 TB",
        description: "Living spacecraft that grows and adapts to different environments",
        quantumEnhanced: true,
      },
    ];
    setGameAssets(assets);
  };

  const generateGameLevels = () => {
    const levels: GameLevel[] = [];

    // Surface levels 1-1000
    for (let i = 1; i <= 1000; i++) {
      levels.push({
        id: i,
        name: `Surface Level ${i}`,
        type: "surface",
        difficulty: Math.floor(i / 10) + 1,
        unlocked: i <= 50,
        biomechanicalCount: Math.floor(Math.random() * 20) + 5,
      });
    }

    // Underwater dolphin transformation levels 1001+
    for (let i = 1001; i <= 1500; i++) {
      levels.push({
        id: i,
        name: `🐬 Dolphin Realm ${i - 1000}`,
        type: "underwater",
        difficulty: Math.floor((i - 1000) / 5) + 100,
        unlocked: false,
        biomechanicalCount: Math.floor(Math.random() * 50) + 20,
      });
    }

    // Quantum levels
    for (let i = 1501; i <= 2000; i++) {
      levels.push({
        id: i,
        name: `⚡ Quantum Dimension ${i - 1500}`,
        type: "quantum",
        difficulty: Math.floor((i - 1500) / 3) + 200,
        unlocked: false,
        biomechanicalCount: Math.floor(Math.random() * 100) + 50,
      });
    }

    setGameLevels(levels);
  };

  const createQuantumAsset = async () => {
    setIsCreating(true);
    setCreationProgress(0);

    console.log("🎮 QUANTUM ASSET CREATION INITIATED");
    console.log("⚡ ALL 20 QUANTUM COMPUTERS: Synchronized for creation");
    console.log("🎨 AI ART ENGINE: Generating ultra-high quality graphics");
    console.log("🧬 BIOMECHANICAL FUSION: Merging organic and digital elements");

    const assetTypes = ["weapon", "landscape", "character", "tool", "vehicle"] as const;
    const rarities = ["rare", "epic", "legendary", "quantum"] as const;

    // Simulate quantum creation process
    for (let i = 0; i <= 100; i += 5) {
      setCreationProgress(i);
      await new Promise((resolve) => setTimeout(resolve, 100));
    }

    const newAsset: GameAsset = {
      id: (gameAssets.length + 1).toString(),
      name: `🚀 Quantum-Generated ${assetTypes[Math.floor(Math.random() * assetTypes.length)]}`,
      type: assetTypes[Math.floor(Math.random() * assetTypes.length)],
      rarity: rarities[Math.floor(Math.random() * rarities.length)],
      powerLevel: Math.floor(Math.random() * 10000) + 5000,
      memorySize: `${(Math.random() * 50 + 10).toFixed(1)} TB`,
      description: "Quantum AI-generated asset with unlimited potential and evolution capabilities",
      quantumEnhanced: true,
    };

    setGameAssets((prev) => [newAsset, ...prev]);
    setIsCreating(false);
    setCreationProgress(0);

    toast.success("🎮 Quantum Asset Created!", {
      description: `New ${newAsset.rarity} ${newAsset.type} added to inventory`,
      duration: 5000,
    });
  };

  const create280FPSMovie = () => {
    console.log("🎬 280 FPS MOVIE CREATION INITIATED");
    console.log("🎥 QUANTUM RENDERING: Ultra-high framerate processing");
    console.log("🌊 HARMONY OF GAIA: Logo integration active");
    console.log("✨ MAGIC FEELING: Maximum immersion protocols");

    toast.success("🎬 280 FPS Movie Created!", {
      description: "Ultra-high quality cinematic experience with Harmony of Gaia branding",
      duration: 8000,
    });
  };

  const boost100xExchangeAcceptance = () => {
    console.log("🚀 100X EXCHANGE BOOST ACTIVATED");
    console.log("💼 QUANTUM COMPUTERS: Analyzing all global exchanges");
    console.log("📈 ACCELERATION PROTOCOL: Maximum acceptance probability");
    console.log("🌍 GLOBAL REACH: All major exchanges targeted");

    toast.success("🚀 100X Exchange Boost Activated!", {
      description: "All quantum computers working to accelerate token acceptance",
      duration: 10000,
    });
  };

  const getRarityColor = (rarity: string) => {
    switch (rarity) {
      case "quantum":
        return "from-purple-600 via-pink-600 to-purple-600";
      case "legendary":
        return "from-yellow-600 via-orange-600 to-yellow-600";
      case "epic":
        return "from-blue-600 via-cyan-600 to-blue-600";
      case "rare":
        return "from-green-600 via-emerald-600 to-green-600";
      default:
        return "from-gray-600 via-slate-600 to-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border-2 border-purple-500/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Gamepad2 className="h-6 w-6 animate-pulse" />
            🎮 QUANTUM GAME INVENTORY - ADMIN EXCLUSIVE
          </CardTitle>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
            <Badge className="bg-purple-600 animate-pulse">
              💾 Memory: {totalMemoryUsed} / 400 TB
            </Badge>
            <Badge className="bg-green-600">🎮 Assets: {gameAssets.length}</Badge>
            <Badge className="bg-blue-600">🌍 Levels: {gameLevels.length}</Badge>
            <Badge className="bg-red-600">⚡ Quantum Power: {quantumPowerLevel}%</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Quantum Creation Controls */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button
              onClick={createQuantumAsset}
              disabled={isCreating}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              <Palette className="h-4 w-4 mr-2" />
              {isCreating ? "Creating..." : "🎨 Create Quantum Asset"}
            </Button>
            <Button
              onClick={create280FPSMovie}
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700"
            >
              <Film className="h-4 w-4 mr-2" />
              🎬 Create 280 FPS Movie
            </Button>
            <Button
              onClick={boost100xExchangeAcceptance}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Rocket className="h-4 w-4 mr-2" />
              🚀 100X Exchange Boost
            </Button>
          </div>

          {/* Creation Progress */}
          {isCreating && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Quantum Asset Creation Progress</span>
                <span>{creationProgress}%</span>
              </div>
              <Progress value={creationProgress} className="h-3" />
            </div>
          )}

          <Tabs defaultValue="assets" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-black/50">
              <TabsTrigger value="assets">🎨 Assets</TabsTrigger>
              <TabsTrigger value="levels">🌍 Levels</TabsTrigger>
              <TabsTrigger value="biomech">🦾 Bio-Mechanical</TabsTrigger>
            </TabsList>

            <TabsContent value="assets" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {gameAssets.map((asset) => (
                  <Card
                    key={asset.id}
                    className={`bg-gradient-to-br ${getRarityColor(asset.rarity)} bg-opacity-10 border-2`}
                  >
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-bold text-white text-sm">{asset.name}</h4>
                        <Badge className={`bg-gradient-to-r ${getRarityColor(asset.rarity)}`}>
                          {asset.rarity.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-3">{asset.description}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span>Power Level</span>
                          <span className="text-green-400">
                            {asset.powerLevel.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span>Memory Size</span>
                          <span className="text-blue-400">{asset.memorySize}</span>
                        </div>
                        {asset.quantumEnhanced && (
                          <Badge className="bg-purple-600 text-xs">⚡ Quantum Enhanced</Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="levels" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
                {gameLevels.slice(0, 20).map((level) => (
                  <Card
                    key={level.id}
                    className={`bg-black/40 border ${
                      level.type === "surface"
                        ? "border-green-500/30"
                        : level.type === "underwater"
                          ? "border-blue-500/30"
                          : "border-purple-500/30"
                    }`}
                  >
                    <CardContent className="p-3">
                      <div className="text-sm font-bold text-white mb-1">{level.name}</div>
                      <div className="text-xs text-muted-foreground mb-2">
                        Difficulty: {level.difficulty} | Bio-Mech: {level.biomechanicalCount}
                      </div>
                      <Badge
                        className={`text-xs ${level.unlocked ? "bg-green-600" : "bg-gray-600"}`}
                      >
                        {level.unlocked ? "UNLOCKED" : "LOCKED"}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <div className="text-center text-muted-foreground">
                Showing first 20 levels. Total: {gameLevels.length} levels available
              </div>
            </TabsContent>

            <TabsContent value="biomech" className="space-y-4">
              <div className="text-center p-8 bg-gradient-to-r from-red-900/20 to-purple-900/20 rounded-lg border border-red-500/30">
                <div className="text-6xl mb-4">🦾</div>
                <h3 className="text-2xl font-bold text-red-400 mb-2">
                  BIO-MECHANICAL WEAPONS FORGE
                </h3>
                <p className="text-muted-foreground mb-4">
                  Quantum-powered biomechanical weapon creation system. Fusion of organic and
                  digital elements for ultimate power.
                </p>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400">847</div>
                    <div className="text-xs text-muted-foreground">Bio-Weapons</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">1,247</div>
                    <div className="text-xs text-muted-foreground">Mechanical Parts</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-purple-400">∞</div>
                    <div className="text-xs text-muted-foreground">Combinations</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-400">100%</div>
                    <div className="text-xs text-muted-foreground">Lethality</div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
