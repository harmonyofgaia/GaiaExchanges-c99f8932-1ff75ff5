import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Gamepad2,
  Zap,
  Shield,
  Sword,
  Crown,
  Target,
  Users,
  Trophy,
  Heart,
  Star,
  Play,
  Pause,
  Settings,
  Eye,
  Brain,
  Atom,
  Rocket,
  Globe,
  Mountain,
  Waves,
  TreePine,
  Home,
  Sparkles,
  Cpu,
  Server,
  Database,
  Cloud,
} from "lucide-react";
import { toast } from "sonner";

interface QuantumEngine {
  id: string;
  name: string;
  status: "standby" | "active" | "training" | "supporting";
  performance: number;
  specialization: string;
  trainingLevel: number;
  lastUsed: Date;
}

interface GameCharacter {
  id: string;
  name: string;
  class: "Warrior" | "Mage" | "Assassin" | "Paladin" | "Hunter" | "Summoner";
  level: number;
  experience: number;
  health: number;
  mana: number;
  stats: {
    strength: number;
    agility: number;
    intelligence: number;
    vitality: number;
    luck: number;
  };
  equipment: {
    weapon: string;
    armor: string;
    accessories: string[];
  };
  abilities: string[];
  transformations: string[];
}

interface GameWorld {
  id: string;
  name: string;
  type: "Tournament Arena" | "WoW Style Zone" | "Final Fantasy Realm";
  environment: "Earth" | "Underwater" | "Space" | "Fantasy";
  difficulty: number;
  players: number;
  maxPlayers: number;
  buildingMode: boolean;
  transformable: boolean;
}

export function GaiaFighterGameAdvanced() {
  const [gameState, setGameState] = useState({
    isPlaying: false,
    currentWorld: "FF_Crystal_Realm",
    playersOnline: 15847,
    quantumEnginesActive: 3,
    gameMode: "Tournament",
    buildingMode: false,
    transformationActive: false,
    fps: 240,
    ping: 1,
    serverLoad: 15,
  });

  const [selectedCharacter, setSelectedCharacter] = useState<GameCharacter>({
    id: "gaia-warrior-1",
    name: "Quantum Guardian",
    class: "Warrior",
    level: 85,
    experience: 1247500,
    health: 100,
    mana: 100,
    stats: {
      strength: 195,
      agility: 167,
      intelligence: 142,
      vitality: 188,
      luck: 156,
    },
    equipment: {
      weapon: "Excalibur Quantum Blade",
      armor: "Gaia's Eternal Plate",
      accessories: ["Ring of Nature's Wrath", "Amulet of Coral Reef"],
    },
    abilities: [
      "Quantum Strike",
      "Nature's Fury",
      "Coral Reef Shield",
      "Environmental Transformation",
      "Building Mode Activation",
    ],
    transformations: ["Final Fantasy Dragoon", "WoW Death Knight", "Unreal Tournament Juggernaut"],
  });

  const [quantumEngines, setQuantumEngines] = useState<QuantumEngine[]>([
    {
      id: "quantum-engine-1",
      name: "Neural Combat Processor",
      status: "active",
      performance: 98.7,
      specialization: "Combat Mechanics & Movement",
      trainingLevel: 147,
      lastUsed: new Date(),
    },
    {
      id: "quantum-engine-2",
      name: "World Generation Matrix",
      status: "training",
      performance: 97.2,
      specialization: "Environment & Building Systems",
      trainingLevel: 139,
      lastUsed: new Date(),
    },
    {
      id: "quantum-engine-3",
      name: "Transformation Core",
      status: "standby",
      performance: 99.1,
      specialization: "Item & Landscape Transformation",
      trainingLevel: 152,
      lastUsed: new Date(),
    },
    {
      id: "quantum-engine-4",
      name: "Performance Optimizer",
      status: "supporting",
      performance: 96.8,
      specialization: "FPS & Latency Optimization",
      trainingLevel: 134,
      lastUsed: new Date(),
    },
  ]);

  const [gameWorlds, setGameWorlds] = useState<GameWorld[]>([
    {
      id: "tournament-arena",
      name: "Quantum Tournament Arena",
      type: "Tournament Arena",
      environment: "Space",
      difficulty: 95,
      players: 2847,
      maxPlayers: 5000,
      buildingMode: false,
      transformable: true,
    },
    {
      id: "crystal-realm",
      name: "Final Fantasy Crystal Realm",
      type: "Final Fantasy Realm",
      environment: "Fantasy",
      difficulty: 87,
      players: 4156,
      maxPlayers: 8000,
      buildingMode: true,
      transformable: true,
    },
    {
      id: "azeroth-enhanced",
      name: "Enhanced Azeroth",
      type: "WoW Style Zone",
      environment: "Earth",
      difficulty: 92,
      players: 7894,
      maxPlayers: 10000,
      buildingMode: true,
      transformable: true,
    },
    {
      id: "coral-depths",
      name: "Coral Reef Depths",
      type: "Final Fantasy Realm",
      environment: "Underwater",
      difficulty: 89,
      players: 3247,
      maxPlayers: 6000,
      buildingMode: true,
      transformable: true,
    },
  ]);

  const gameCanvasRef = useRef<HTMLDivElement>(null);
  const quantumTrainingRef = useRef<NodeJS.Timeout>(undefined);

  // Quantum Engine Training System
  useEffect(() => {
    quantumTrainingRef.current = setInterval(() => {
      setQuantumEngines((prev) =>
        prev.map((engine) => ({
          ...engine,
          trainingLevel: engine.trainingLevel + Math.floor(Math.random() * 3),
          performance: Math.min(99.9, engine.performance + Math.random() * 0.5),
          status:
            engine.status === "training"
              ? Math.random() > 0.3
                ? "training"
                : "standby"
              : engine.status,
        }))
      );

      // Auto-optimize game performance
      setGameState((prev) => ({
        ...prev,
        fps: Math.max(240, 300 - Math.floor(Math.random() * 20)),
        ping: Math.max(1, Math.floor(Math.random() * 3)),
        serverLoad: Math.max(10, Math.min(25, prev.serverLoad + Math.floor(Math.random() * 6 - 3))),
      }));

      // Quantum enhancement notifications
      if (Math.random() < 0.1) {
        const enhancements = [
          "⚡ Quantum Combat System Enhanced - Movement 15% smoother!",
          "🌟 World Generation Matrix Upgraded - New realms discovered!",
          "🔄 Transformation Core Evolved - 3 new item combinations unlocked!",
          "🚀 Performance Optimizer Boosted - FPS increased by 20!",
          "🧠 Neural Network Expanded - AI enemies 25% more intelligent!",
          "⚔️ Combat Mechanics Refined - New combo system activated!",
        ];
        const randomEnhancement = enhancements[Math.floor(Math.random() * enhancements.length)];
        toast.success("🤖 QUANTUM ENHANCEMENT!", {
          description: randomEnhancement,
          duration: 4000,
        });
      }
    }, 2000);

    return () => {
      if (quantumTrainingRef.current) {
        clearInterval(quantumTrainingRef.current);
      }
    };
  }, []);

  const startGameplay = () => {
    setGameState((prev) => ({ ...prev, isPlaying: true }));

    // Activate quantum engines
    setQuantumEngines((prev) =>
      prev.map((engine) => ({
        ...engine,
        status: engine.id === "quantum-engine-1" ? "active" : "supporting",
        lastUsed: new Date(),
      }))
    );

    toast.success("🎮 GAIA FIGHTER ACTIVATED!", {
      description: "Quantum engines online! Experience gameplay beyond imagination!",
      duration: 5000,
    });
  };

  const toggleBuildingMode = () => {
    setGameState((prev) => ({ ...prev, buildingMode: !prev.buildingMode }));

    toast.success(`🏗️ Building Mode ${gameState.buildingMode ? "Deactivated" : "Activated"}!`, {
      description: gameState.buildingMode
        ? "Combat mode restored!"
        : "Create and transform landscapes in real-time!",
      duration: 3000,
    });
  };

  const activateTransformation = () => {
    setGameState((prev) => ({
      ...prev,
      transformationActive: !prev.transformationActive,
    }));

    const transformations = [
      "Final Fantasy Summon Form",
      "WoW Legendary Transformation",
      "Unreal Tournament Overdrive Mode",
    ];
    const randomTransform = transformations[Math.floor(Math.random() * transformations.length)];

    toast.success("🔄 TRANSFORMATION ACTIVATED!", {
      description: `${randomTransform} - Power increased by 300%!`,
      duration: 4000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Game Header */}
      <Card className="border-2 border-red-500/50 bg-gradient-to-br from-red-900/40 to-orange-900/40">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Rocket className="h-6 w-6" />
            🥊 GAIA FIGHTER - QUANTUM REVOLUTION
            <Badge className="bg-gradient-to-r from-red-600 to-orange-600 text-white animate-pulse">
              BEYOND AAA GAMES
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
            <div className="text-center p-4 rounded-lg bg-green-900/40 border border-green-500/30">
              <Users className="h-6 w-6 text-green-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {gameState.playersOnline.toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Players Online</div>
            </div>

            <div className="text-center p-4 rounded-lg bg-purple-900/40 border border-purple-500/30">
              <Brain className="h-6 w-6 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                {gameState.quantumEnginesActive}
              </div>
              <div className="text-xs text-muted-foreground">Quantum Engines</div>
            </div>

            <div className="text-center p-4 rounded-lg bg-blue-900/40 border border-blue-500/30">
              <Target className="h-6 w-6 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">{gameState.fps} FPS</div>
              <div className="text-xs text-muted-foreground">Ultra Performance</div>
            </div>

            <div className="text-center p-4 rounded-lg bg-yellow-900/40 border border-yellow-500/30">
              <Zap className="h-6 w-6 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">{gameState.ping}ms</div>
              <div className="text-xs text-muted-foreground">Quantum Ping</div>
            </div>

            <div className="text-center p-4 rounded-lg bg-cyan-900/40 border border-cyan-500/30">
              <Server className="h-6 w-6 text-cyan-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-cyan-400">{gameState.serverLoad}%</div>
              <div className="text-xs text-muted-foreground">Server Load</div>
            </div>

            <div className="text-center p-4 rounded-lg bg-pink-900/40 border border-pink-500/30">
              <Crown className="h-6 w-6 text-pink-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-pink-400">
                Level {selectedCharacter.level}
              </div>
              <div className="text-xs text-muted-foreground">Character Power</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="gameplay" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="gameplay">🎮 Gameplay</TabsTrigger>
          <TabsTrigger value="character">👤 Character</TabsTrigger>
          <TabsTrigger value="worlds">🌍 Worlds</TabsTrigger>
          <TabsTrigger value="quantum">🤖 Quantum</TabsTrigger>
          <TabsTrigger value="building">🏗️ Building</TabsTrigger>
        </TabsList>

        <TabsContent value="gameplay" className="space-y-4">
          {/* Main Game Canvas */}
          <Card className="border-2 border-blue-500/50 bg-gradient-to-br from-black via-gray-900 to-blue-900/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-blue-400">
                  🌟 {gameWorlds.find((w) => w.id === "crystal-realm")?.name} - ACTIVE REALM
                </CardTitle>
                <div className="flex gap-2">
                  {!gameState.isPlaying ? (
                    <Button
                      onClick={startGameplay}
                      className="bg-gradient-to-r from-red-600 to-orange-600"
                    >
                      <Play className="h-4 w-4 mr-2" />
                      START QUANTUM BATTLE
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setGameState((prev) => ({ ...prev, isPlaying: false }))}
                      variant="outline"
                    >
                      <Pause className="h-4 w-4 mr-2" />
                      PAUSE
                    </Button>
                  )}
                  <Button
                    onClick={toggleBuildingMode}
                    className="bg-gradient-to-r from-green-600 to-blue-600"
                  >
                    <Home className="h-4 w-4 mr-2" />
                    {gameState.buildingMode ? "COMBAT MODE" : "BUILD MODE"}
                  </Button>
                  <Button
                    onClick={activateTransformation}
                    className="bg-gradient-to-r from-purple-600 to-pink-600"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    TRANSFORM
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div
                ref={gameCanvasRef}
                className="aspect-video bg-gradient-to-br from-blue-900/30 via-purple-900/30 to-pink-900/30 rounded-lg border-2 border-blue-500/40 relative overflow-hidden"
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-8xl mb-4">⚔️✨</div>
                    <h3 className="text-4xl font-bold text-blue-400">QUANTUM GAIA FIGHTER</h3>
                    <p className="text-muted-foreground text-xl">
                      Unreal Tournament × World of Warcraft × Final Fantasy
                    </p>

                    <div className="grid grid-cols-3 gap-6 mt-8">
                      <div className="p-6 bg-red-900/40 rounded border border-red-500/30">
                        <Target className="h-12 w-12 text-red-400 mx-auto mb-4" />
                        <div className="text-lg font-bold text-red-400">Tournament Combat</div>
                        <div className="text-sm text-muted-foreground">Unreal Tournament Style</div>
                      </div>

                      <div className="p-6 bg-blue-900/40 rounded border border-blue-500/30">
                        <Globe className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                        <div className="text-lg font-bold text-blue-400">Open World</div>
                        <div className="text-sm text-muted-foreground">World of Warcraft Scale</div>
                      </div>

                      <div className="p-6 bg-purple-900/40 rounded border border-purple-500/30">
                        <Star className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                        <div className="text-lg font-bold text-purple-400">Epic Story</div>
                        <div className="text-sm text-muted-foreground">Final Fantasy Depth</div>
                      </div>
                    </div>

                    {gameState.isPlaying && (
                      <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 rounded-lg border border-green-500/20">
                        <div className="text-green-400 font-bold text-lg">
                          🎮 LIVE GAMEPLAY ACTIVE
                        </div>
                        <div className="text-sm text-muted-foreground mt-2">
                          Mode:{" "}
                          {gameState.buildingMode
                            ? "Building & Transformation"
                            : "Combat & Exploration"}
                        </div>
                        {gameState.transformationActive && (
                          <div className="text-purple-400 font-bold mt-2">
                            ✨ TRANSFORMATION MODE ACTIVE - Power Level: MAXIMUM
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="character" className="space-y-4">
          <Card className="border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400">👤 {selectedCharacter.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-400">
                    {selectedCharacter.stats.strength}
                  </div>
                  <div className="text-xs text-muted-foreground">Strength</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-400">
                    {selectedCharacter.stats.agility}
                  </div>
                  <div className="text-xs text-muted-foreground">Agility</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-purple-400">
                    {selectedCharacter.stats.intelligence}
                  </div>
                  <div className="text-xs text-muted-foreground">Intelligence</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-400">
                    {selectedCharacter.stats.vitality}
                  </div>
                  <div className="text-xs text-muted-foreground">Vitality</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-yellow-400">
                    {selectedCharacter.stats.luck}
                  </div>
                  <div className="text-xs text-muted-foreground">Luck</div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="font-bold text-green-400 mb-2">🗡️ Equipment</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between p-2 bg-muted/20 rounded">
                      <span>Weapon:</span>
                      <span className="text-yellow-400">{selectedCharacter.equipment.weapon}</span>
                    </div>
                    <div className="flex justify-between p-2 bg-muted/20 rounded">
                      <span>Armor:</span>
                      <span className="text-blue-400">{selectedCharacter.equipment.armor}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-purple-400 mb-2">⚡ Abilities</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {selectedCharacter.abilities.map((ability, index) => (
                      <Badge key={index} className="bg-purple-600 text-white">
                        {ability}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-pink-400 mb-2">🔄 Transformations</h4>
                  <div className="grid grid-cols-1 gap-2">
                    {selectedCharacter.transformations.map((transform, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        className="border-pink-500/30 hover:bg-pink-900/20"
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        {transform}
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="worlds" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gameWorlds.map((world) => {
              const getEnvironmentIcon = (env: string) => {
                switch (env) {
                  case "Space":
                    return <Rocket className="h-8 w-8" />;
                  case "Underwater":
                    return <Waves className="h-8 w-8" />;
                  case "Earth":
                    return <Globe className="h-8 w-8" />;
                  default:
                    return <Star className="h-8 w-8" />;
                }
              };

              return (
                <Card
                  key={world.id}
                  className="border-green-500/30 hover:border-green-500/50 transition-colors cursor-pointer"
                >
                  <CardContent className="p-6">
                    <div className="text-center space-y-4">
                      <div className="text-green-400">{getEnvironmentIcon(world.environment)}</div>
                      <h3 className="text-xl font-bold text-white">{world.name}</h3>
                      <Badge className="bg-blue-600 text-white">{world.type}</Badge>

                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Players:</span>
                          <span className="text-green-400">
                            {world.players.toLocaleString()}/{world.maxPlayers.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Difficulty:</span>
                          <span className="text-yellow-400">{world.difficulty}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Building Mode:</span>
                          <span className={world.buildingMode ? "text-green-400" : "text-red-400"}>
                            {world.buildingMode ? "✅ Available" : "❌ Not Available"}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Transformable:</span>
                          <span className={world.transformable ? "text-green-400" : "text-red-400"}>
                            {world.transformable ? "🔄 Yes" : "❌ No"}
                          </span>
                        </div>
                      </div>

                      <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600">
                        <Play className="h-4 w-4 mr-2" />
                        Enter World
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="quantum" className="space-y-4">
          <Card className="border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400">🤖 Quantum Support Engines</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {quantumEngines.map((engine) => (
                <div key={engine.id} className="p-4 border border-muted/20 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-bold text-cyan-400">{engine.name}</h4>
                    <Badge
                      className={`${
                        engine.status === "active"
                          ? "bg-green-600"
                          : engine.status === "training"
                            ? "bg-purple-600"
                            : engine.status === "supporting"
                              ? "bg-blue-600"
                              : "bg-gray-600"
                      } text-white`}
                    >
                      {engine.status.toUpperCase()}
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Performance:</span>
                      <span className="text-green-400">{engine.performance.toFixed(1)}%</span>
                    </div>
                    <Progress value={engine.performance} className="h-2" />

                    <div className="flex justify-between text-sm">
                      <span>Training Level:</span>
                      <span className="text-purple-400">{engine.trainingLevel}</span>
                    </div>

                    <div className="text-sm text-muted-foreground">
                      Specialization: {engine.specialization}
                    </div>

                    <div className="text-xs text-muted-foreground">
                      Last Used: {engine.lastUsed.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="building" className="space-y-4">
          <Card className="border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-orange-400">🏗️ Universal Building System</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="text-6xl mb-4">🏗️✨</div>
                <h3 className="text-2xl font-bold text-orange-400 mb-2">
                  Transform Any Environment
                </h3>
                <p className="text-muted-foreground">
                  Build in Tournament Arenas, WoW-style zones, or Final Fantasy realms
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-4 bg-green-900/30 rounded border border-green-500/20 text-center">
                  <TreePine className="h-8 w-8 text-green-400 mx-auto mb-2" />
                  <div className="text-sm font-bold text-green-400">Nature</div>
                  <div className="text-xs text-muted-foreground">Trees & Forests</div>
                </div>

                <div className="p-4 bg-blue-900/30 rounded border border-blue-500/20 text-center">
                  <Home className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                  <div className="text-sm font-bold text-blue-400">Structures</div>
                  <div className="text-xs text-muted-foreground">Buildings & Towers</div>
                </div>

                <div className="p-4 bg-purple-900/30 rounded border border-purple-500/20 text-center">
                  <Mountain className="h-8 w-8 text-purple-400 mx-auto mb-2" />
                  <div className="text-sm font-bold text-purple-400">Terrain</div>
                  <div className="text-xs text-muted-foreground">Mountains & Valleys</div>
                </div>

                <div className="p-4 bg-cyan-900/30 rounded border border-cyan-500/20 text-center">
                  <Waves className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
                  <div className="text-sm font-bold text-cyan-400">Water</div>
                  <div className="text-xs text-muted-foreground">Rivers & Oceans</div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-orange-900/20 to-yellow-900/20 border border-orange-500/30 rounded-lg p-4">
                <h4 className="text-lg font-bold text-orange-400 mb-2">
                  🔄 Transformation Features
                </h4>
                <div className="space-y-2 text-sm">
                  <div>• Transform any item into legendary FF-style equipment</div>
                  <div>• Convert landscapes between Tournament/WoW/FF environments</div>
                  <div>• Real-time building with quantum-powered physics</div>
                  <div>• Share creations with the global Gaia community</div>
                  <div>• Earn GAIA tokens for outstanding designs</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
