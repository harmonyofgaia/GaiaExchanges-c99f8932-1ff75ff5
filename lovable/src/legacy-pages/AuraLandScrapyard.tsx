import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Zap,
  Recycle,
  Sparkles,
  Cpu,
  Settings,
  Wrench,
  Rocket,
  Gem,
  Flame,
  Shield,
} from "lucide-react";
import { toast } from "sonner";

export default function AuraLandScrapyard() {
  const [scrapyardPower, setScrapyardPower] = useState(10000);
  const [materials, setMaterials] = useState({
    quantum_metal: 500,
    aura_crystals: 250,
    nano_circuits: 1000,
    energy_cores: 100,
    reality_fragments: 50,
  });

  const [exclusiveTools, setExclusiveTools] = useState([
    { name: "Quantum Material Processor", power: 5000, rarity: "Legendary" },
    { name: "Aura Crystal Synthesizer", power: 3500, rarity: "Epic" },
    { name: "Reality Fragment Collector", power: 8000, rarity: "Mythic" },
    { name: "Nano-Circuit Weaver", power: 4200, rarity: "Epic" },
    { name: "Energy Core Amplifier", power: 6500, rarity: "Legendary" },
  ]);

  useEffect(() => {
    console.log("🌟 AURA LAND SCRAPYARD - EXCLUSIVE POWER MODE ACTIVATED");
    console.log("⚡ QUANTUM PROCESSING: UNLIMITED MATERIALS");
    console.log("🔮 AURA FUSION: REALITY MANIPULATION ENABLED");

    const powerGrowth = setInterval(() => {
      setScrapyardPower((prev) => prev * 1.002);
      setMaterials((prev) => ({
        quantum_metal: prev.quantum_metal + Math.floor(Math.random() * 10),
        aura_crystals: prev.aura_crystals + Math.floor(Math.random() * 5),
        nano_circuits: prev.nano_circuits + Math.floor(Math.random() * 15),
        energy_cores: prev.energy_cores + Math.floor(Math.random() * 3),
        reality_fragments:
          prev.reality_fragments + Math.floor(Math.random() * 2),
      }));
    }, 2000);

    return () => clearInterval(powerGrowth);
  }, []);

  const processScrapMaterials = () => {
    toast.success("🌟 AURA SCRAPYARD PROCESSING!", {
      description:
        "Converting scrap into quantum materials with aura fusion technology",
      duration: 4000,
    });
  };

  const createExclusiveTool = () => {
    const newTool = {
      name: `Aura-Powered ${["Quantum", "Reality", "Cosmic", "Divine"][Math.floor(Math.random() * 4)]} ${["Processor", "Generator", "Amplifier", "Matrix"][Math.floor(Math.random() * 4)]}`,
      power: Math.floor(Math.random() * 10000) + 5000,
      rarity: ["Epic", "Legendary", "Mythic", "Divine"][
        Math.floor(Math.random() * 4)
      ],
    };

    setExclusiveTools((prev) => [...prev, newTool]);
    toast.success("🔮 EXCLUSIVE TOOL CREATED!", {
      description: `${newTool.name} - Power: ${newTool.power}`,
      duration: 5000,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-cyan-900/20 mb-8">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            🌟 AURA LAND SCRAPYARD - EXCLUSIVE QUANTUM PROCESSING
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Transform scrap into reality-bending materials using aura fusion
            technology
          </p>
          <div className="flex justify-center gap-4 flex-wrap mt-4">
            <Badge className="bg-purple-600 animate-pulse">
              POWER: {Math.floor(scrapyardPower).toLocaleString()}
            </Badge>
            <Badge className="bg-cyan-600">QUANTUM ACTIVE</Badge>
            <Badge className="bg-pink-600">AURA FUSION</Badge>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="materials" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="materials">🔮 Quantum Materials</TabsTrigger>
          <TabsTrigger value="processing">⚡ Aura Processing</TabsTrigger>
          <TabsTrigger value="tools">🛠️ Exclusive Tools</TabsTrigger>
          <TabsTrigger value="fusion">🌟 Reality Fusion</TabsTrigger>
        </TabsList>

        <TabsContent value="materials" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {Object.entries(materials).map(([material, amount]) => (
              <Card
                key={material}
                className="border-blue-500/30 bg-blue-900/20"
              >
                <CardContent className="p-4 text-center">
                  <Gem className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                  <div className="text-lg font-bold text-blue-400">
                    {amount.toLocaleString()}
                  </div>
                  <div className="text-sm text-muted-foreground capitalize">
                    {material.replace("_", " ")}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="processing" className="space-y-6">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Zap className="h-6 w-6" />
                Aura Quantum Processor
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input placeholder="Input scrap materials" />
                <Button
                  onClick={processScrapMaterials}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <Recycle className="h-4 w-4 mr-2" />
                  Process with Aura Fusion
                </Button>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h4 className="text-green-400 font-bold mb-2">
                  🌟 Exclusive Aura Processing Features:
                </h4>
                <div className="text-sm text-green-300 space-y-1">
                  <div>✨ Reality Fragment Extraction from any material</div>
                  <div>⚡ Quantum Metal Synthesis with 99.9% efficiency</div>
                  <div>🔮 Aura Crystal Growth in zero-gravity chambers</div>
                  <div>
                    🛸 Nano-Circuit Self-Assembly using AI consciousness
                  </div>
                  <div>💎 Energy Core Fusion with unlimited power output</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tools" className="space-y-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-2xl font-bold text-purple-400">
              🛠️ Exclusive Quantum Tools
            </h3>
            <Button
              onClick={createExclusiveTool}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              Create Exclusive Tool
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {exclusiveTools.map((tool, index) => (
              <Card
                key={index}
                className="border-purple-500/30 bg-purple-900/20"
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <Wrench className="h-6 w-6 text-purple-400" />
                    <Badge
                      className={`${
                        tool.rarity === "Mythic"
                          ? "bg-pink-600"
                          : tool.rarity === "Legendary"
                            ? "bg-orange-600"
                            : tool.rarity === "Epic"
                              ? "bg-purple-600"
                              : "bg-blue-600"
                      }`}
                    >
                      {tool.rarity}
                    </Badge>
                  </div>
                  <h4 className="font-bold text-purple-400 mb-2">
                    {tool.name}
                  </h4>
                  <div className="text-sm text-muted-foreground">
                    Power: {tool.power.toLocaleString()}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="fusion" className="space-y-6">
          <Card className="border-pink-500/30 bg-gradient-to-r from-pink-900/20 to-purple-900/20">
            <CardHeader>
              <CardTitle className="text-pink-400 flex items-center gap-2">
                <Flame className="h-6 w-6" />
                🌟 Reality Fusion Chamber
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center mb-6">
                <Rocket className="h-16 w-16 mx-auto text-pink-400 mb-4 animate-pulse" />
                <h3 className="text-2xl font-bold text-pink-400">
                  ULTIMATE AURA FUSION ACTIVE
                </h3>
                <p className="text-muted-foreground">
                  Combine materials to bend reality itself
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-pink-500/10 border border-pink-500/20 rounded-lg p-4">
                  <h4 className="font-bold text-pink-400 mb-3">
                    🔮 Fusion Capabilities:
                  </h4>
                  <div className="text-sm text-pink-300 space-y-2">
                    <div>
                      • Reality Fragments + Quantum Metal = Dimensional Tools
                    </div>
                    <div>
                      • Aura Crystals + Energy Cores = Infinite Power Sources
                    </div>
                    <div>
                      • Nano-Circuits + Reality Fragments = Consciousness
                      Processors
                    </div>
                    <div>
                      • All Materials Combined = Reality Manipulation Devices
                    </div>
                  </div>
                </div>

                <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-lg p-4">
                  <h4 className="font-bold text-cyan-400 mb-3">
                    ⚡ Exclusive Features:
                  </h4>
                  <div className="text-sm text-cyan-300 space-y-2">
                    <div>• Quantum Entanglement Processing</div>
                    <div>• Multi-Dimensional Material Synthesis</div>
                    <div>• Consciousness-Driven Manufacturing</div>
                    <div>• Reality-Bending Tool Creation</div>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-pink-600 via-purple-600 to-cyan-600 hover:from-pink-700 hover:via-purple-700 hover:to-cyan-700 text-white font-bold py-4">
                <Shield className="h-5 w-5 mr-2" />
                🌟 INITIATE REALITY FUSION - ADMIN ONLY
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
