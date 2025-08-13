import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Mountain,
  Trees,
  Waves,
  Sun,
  Zap,
  Settings,
  Palette,
  Layers,
  Sparkles,
  Cpu,
  Globe,
  Crown,
  Building2,
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { UltimateLandscapeBuilder } from "@/components/landscapes/UltimateLandscapeBuilder";
import { VirtualLandscapeCreator } from "@/components/landscapes/VirtualLandscapeCreator";
import { LandscapeToolbox } from "@/components/landscapes/LandscapeToolbox";
import { LandscapeMarketplace } from "@/components/virtualworld/LandscapeMarketplace";
import { LandscapeBuilderAdvanced } from "@/components/LandscapeBuilderAdvanced";

export default function LandscapeBuilder() {
  const [landscapePower, setLandscapePower] = useState(50000);
  const [ecosystems, setEcosystems] = useState(247);
  const [activeEngines, setActiveEngines] = useState(12);
  const [virtualWorlds, setVirtualWorlds] = useState(8);

  useEffect(() => {
    console.log(
      "🏔️ LANDSCAPE BUILDER PRO - ULTIMATE ECOSYSTEM CREATION ACTIVE",
    );
    console.log("🌍 ENVIRONMENTAL RESTORATION: UNLIMITED POWER");
    console.log("⚡ ALL ENGINES ACTIVATED: Reality Bending Mode");

    const growthInterval = setInterval(() => {
      setLandscapePower((prev) => prev * 1.005);
      setEcosystems((prev) => prev + Math.floor(Math.random() * 5) + 1);
      setActiveEngines((prev) => Math.min(prev + 1, 50));
    }, 4000);

    // Engine activation notifications
    const engineInterval = setInterval(() => {
      const engines = [
        "🌊 Ocean Physics Engine - Realistic Water Simulation",
        "🏔️ Mountain Generator Pro - Infinite Terrain Creation",
        "🌲 Forest AI Engine - Intelligent Ecosystem Growth",
        "⚡ Weather Control System - Climate Manipulation",
        "🔥 Volcano Engine - Geological Formation",
        "❄️ Ice Age Simulator - Climate Change Effects",
        "🌪️ Storm Generator - Dynamic Weather Systems",
        "🌅 Day/Night Cycle Engine - Time Manipulation",
      ];

      const randomEngine = engines[Math.floor(Math.random() * engines.length)];
      toast.success("🔧 ENGINE ACTIVATED!", {
        description: randomEngine,
        duration: 3000,
      });
    }, 10000);

    return () => {
      clearInterval(growthInterval);
      clearInterval(engineInterval);
    };
  }, []);

  const createMegaLandscape = () => {
    toast.success("🌍 MEGA LANDSCAPE CREATED!", {
      description:
        "Universe-scale ecosystem generated with all engines active!",
      duration: 5000,
    });
  };

  const handlePurchase = (landscape: string) => {
    toast.success("🛒 Landscape Purchased!", {
      description: `${landscape} added to your collection with environmental impact!`,
      duration: 4000,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <Card className="border-4 border-green-500/50 bg-gradient-to-r from-green-900/30 via-blue-900/30 to-purple-900/30">
        <CardHeader>
          <CardTitle className="text-center text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
            🏔️ ULTIMATE LANDSCAPE BUILDER PRO
          </CardTitle>
          <p className="text-center text-2xl text-green-300 font-bold">
            Create Infinite Worlds - Unlimited Power & Cloud Storage
          </p>
          <div className="flex justify-center gap-4 flex-wrap mt-6">
            <Badge className="bg-green-600 animate-pulse text-lg px-4 py-2">
              POWER: {Math.floor(landscapePower).toLocaleString()}⚡
            </Badge>
            <Badge className="bg-blue-600 text-lg px-4 py-2">
              ECOSYSTEMS: {ecosystems.toLocaleString()}🌍
            </Badge>
            <Badge className="bg-purple-600 animate-bounce text-lg px-4 py-2">
              ENGINES: {activeEngines}/50 🔧
            </Badge>
            <Badge className="bg-cyan-600 text-lg px-4 py-2">
              WORLDS: {virtualWorlds}🌌
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Main Tabs */}
      <Tabs defaultValue="ultimate" className="w-full">
        <TabsList className="grid w-full grid-cols-6 h-auto p-2">
          <TabsTrigger value="ultimate" className="p-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <Crown className="h-6 w-6" />
              <span className="font-bold">Ultimate Builder</span>
              <Badge className="bg-gold-600 text-xs">PREMIUM</Badge>
            </div>
          </TabsTrigger>
          <TabsTrigger value="advanced" className="p-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <Cpu className="h-6 w-6" />
              <span className="font-bold">Advanced Tools</span>
              <Badge className="bg-blue-600 text-xs">AI POWERED</Badge>
            </div>
          </TabsTrigger>
          <TabsTrigger value="creator" className="p-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <Palette className="h-6 w-6" />
              <span className="font-bold">Virtual Creator</span>
              <Badge className="bg-purple-600 text-xs">3D ENGINE</Badge>
            </div>
          </TabsTrigger>
          <TabsTrigger value="toolbox" className="p-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <Layers className="h-6 w-6" />
              <span className="font-bold">Pro Toolbox</span>
              <Badge className="bg-orange-600 text-xs">TOOLS</Badge>
            </div>
          </TabsTrigger>
          <TabsTrigger value="marketplace" className="p-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <Building2 className="h-6 w-6" />
              <span className="font-bold">Marketplace</span>
              <Badge className="bg-green-600 text-xs">BUY/SELL</Badge>
            </div>
          </TabsTrigger>
          <TabsTrigger value="restoration" className="p-4 text-center">
            <div className="flex flex-col items-center gap-2">
              <Sparkles className="h-6 w-6" />
              <span className="font-bold">Restoration</span>
              <Badge className="bg-cyan-600 text-xs">ECO MODE</Badge>
            </div>
          </TabsTrigger>
        </TabsList>

        <div className="mt-8">
          <TabsContent value="ultimate" className="space-y-6">
            <UltimateLandscapeBuilder />
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <LandscapeBuilderAdvanced />
          </TabsContent>

          <TabsContent value="creator" className="space-y-6">
            <VirtualLandscapeCreator />
          </TabsContent>

          <TabsContent value="toolbox" className="space-y-6">
            <LandscapeToolbox />
          </TabsContent>

          <TabsContent value="marketplace" className="space-y-6">
            <LandscapeMarketplace onPurchase={handlePurchase} />
          </TabsContent>

          <TabsContent value="restoration" className="space-y-6">
            <Card className="border-green-500/50 bg-gradient-to-r from-green-900/30 to-cyan-900/30">
              <CardHeader>
                <CardTitle className="text-green-400 flex items-center gap-2">
                  <Sparkles className="h-8 w-8 animate-pulse" />
                  🌱 ENVIRONMENTAL RESTORATION ENGINE
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <Card className="bg-green-500/10 border-green-500/30">
                    <CardHeader>
                      <CardTitle className="text-green-400 flex items-center gap-2">
                        <Trees className="h-6 w-6" />
                        Forest Restoration
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-3xl font-bold text-green-400">
                          2.8M
                        </div>
                        <div className="text-sm text-green-300">
                          Trees Planted
                        </div>
                        <Button className="w-full bg-green-600 hover:bg-green-700">
                          <Trees className="h-4 w-4 mr-2" />
                          Plant Forest
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-blue-500/10 border-blue-500/30">
                    <CardHeader>
                      <CardTitle className="text-blue-400 flex items-center gap-2">
                        <Waves className="h-6 w-6" />
                        Ocean Cleanup
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-3xl font-bold text-blue-400">
                          18K
                        </div>
                        <div className="text-sm text-blue-300">
                          Reefs Restored
                        </div>
                        <Button className="w-full bg-blue-600 hover:bg-blue-700">
                          <Waves className="h-4 w-4 mr-2" />
                          Clean Ocean
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-orange-500/10 border-orange-500/30">
                    <CardHeader>
                      <CardTitle className="text-orange-400 flex items-center gap-2">
                        <Mountain className="h-6 w-6" />
                        Mountain Recovery
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="text-3xl font-bold text-orange-400">
                          500
                        </div>
                        <div className="text-sm text-orange-300">
                          Peaks Restored
                        </div>
                        <Button className="w-full bg-orange-600 hover:bg-orange-700">
                          <Mountain className="h-4 w-4 mr-2" />
                          Restore Mountains
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                <Card className="bg-black/40 border-cyan-500/30">
                  <CardContent className="pt-6">
                    <h3 className="text-2xl font-bold text-cyan-400 mb-4 text-center">
                      🌍 ACTIVE RESTORATION PROJECTS
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="space-y-2">
                        <div className="text-green-400">
                          🌲 Amazon Rainforest Recovery: 95% Complete
                        </div>
                        <div className="text-blue-400">
                          🐋 Whale Migration Routes: Restored
                        </div>
                        <div className="text-purple-400">
                          🦋 Butterfly Sanctuaries: 1,200 Created
                        </div>
                        <div className="text-orange-400">
                          🏔️ Alpine Ecosystem Renewal: Active
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="text-cyan-400">
                          🌊 Coral Reef Regeneration: 2.5M m²
                        </div>
                        <div className="text-yellow-400">
                          🌅 Wetland Restoration: 800 Sites
                        </div>
                        <div className="text-pink-400">
                          🌸 Pollinator Gardens: 15,000 Planted
                        </div>
                        <div className="text-green-300">
                          🌱 Soil Remediation: 50,000 Acres
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="text-center">
                  <Button
                    onClick={createMegaLandscape}
                    className="bg-gradient-to-r from-green-600 via-blue-600 to-purple-600 hover:from-green-700 hover:via-blue-700 hover:to-purple-700 text-white font-black text-2xl px-12 py-6 rounded-xl shadow-2xl transform hover:scale-110 transition-all duration-300"
                  >
                    <Globe className="h-8 w-8 mr-4 animate-spin" />
                    🌍 CREATE MEGA ECOSYSTEM
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>

      {/* Quick Access Links */}
      <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-400 text-center">
            🌟 QUICK ACCESS - PREMIUM FEATURES
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/aura-land-scrapyard">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 h-16">
                <Sparkles className="h-6 w-6 mr-2 animate-pulse" />
                <div className="text-left">
                  <div className="font-bold">🌟 Aura Scrapyard</div>
                  <div className="text-xs">
                    Transform scrap to landscape materials
                  </div>
                </div>
              </Button>
            </Link>

            <Link to="/virtual-world">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 h-16">
                <Globe className="h-6 w-6 mr-2 animate-spin" />
                <div className="text-left">
                  <div className="font-bold">🌍 Virtual World</div>
                  <div className="text-xs">Explore created landscapes</div>
                </div>
              </Button>
            </Link>

            <Button className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 h-16">
              <Crown className="h-6 w-6 mr-2 animate-bounce" />
              <div className="text-left">
                <div className="font-bold">👑 Premium Tools</div>
                <div className="text-xs">Unlock advanced features</div>
              </div>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
