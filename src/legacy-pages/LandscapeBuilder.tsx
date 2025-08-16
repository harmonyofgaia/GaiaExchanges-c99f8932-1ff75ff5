import { useState, useEffect, useCallback} from "react";
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
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

export default function LandscapeBuilder() {
  const [landscapePower, setLandscapePower] = useState(5000);
  const [ecosystems, setEcosystems] = useState(0);

  useEffect(() => {
    console.log("🏔️ LANDSCAPE BUILDER - ECOSYSTEM CREATION ACTIVE");
    console.log("🌍 ENVIRONMENTAL RESTORATION: UNLIMITED POWER");

    const growthInterval = setInterval(() => {
      setLandscapePower((prev) => prev * 1.003);
      setEcosystems((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(growthInterval);
  }, []);

  const createLandscape = () => {
    toast.success("🌍 Landscape Created!", {
      description: "New ecosystem generated with environmental restoration protocols",
      duration: 4000,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20 mb-8">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
            🏔️ LANDSCAPE BUILDER PRO
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Create and restore ecosystems with advanced environmental technology
          </p>
          <div className="flex justify-center gap-4 flex-wrap mt-4">
            <Badge className="bg-green-600 animate-pulse">
              POWER: {Math.floor(landscapePower).toLocaleString()}
            </Badge>
            <Badge className="bg-blue-600">ECOSYSTEMS: {ecosystems}</Badge>
            <Link to="/aura-land-scrapyard">
              <Badge className="bg-purple-600 hover:bg-purple-700 cursor-pointer animate-pulse">
                🌟 AURA SCRAPYARD - EXCLUSIVE ACCESS
              </Badge>
            </Link>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="builder" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="builder">🏗️ Builder</TabsTrigger>
          <TabsTrigger value="ecosystems">🌍 Ecosystems</TabsTrigger>
          <TabsTrigger value="restoration">🌱 Restoration</TabsTrigger>
          <TabsTrigger value="scrapyard">🌟 Aura Scrapyard</TabsTrigger>
        </TabsList>

        <TabsContent value="builder" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="border-green-500/30 bg-green-900/20">
              <CardContent className="p-4 text-center">
                <Mountain className="h-8 w-8 mx-auto text-green-400 mb-2" />
                <Button className="w-full bg-green-600 hover:bg-green-700">Create Mountains</Button>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardContent className="p-4 text-center">
                <Trees className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Plant Forests</Button>
              </CardContent>
            </Card>

            <Card className="border-cyan-500/30 bg-cyan-900/20">
              <CardContent className="p-4 text-center">
                <Waves className="h-8 w-8 mx-auto text-cyan-400 mb-2" />
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700">Create Waterways</Button>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-yellow-900/20">
              <CardContent className="p-4 text-center">
                <Sun className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
                <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                  Climate Control
                </Button>
              </CardContent>
            </Card>
          </div>

          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Palette className="h-6 w-6" />
                Advanced Landscape Tools
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button
                onClick={createLandscape}
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3"
              >
                <Zap className="h-5 w-5 mr-2" />
                CREATE COMPLETE ECOSYSTEM
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ecosystems" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="text-green-400">🌲 Forest Ecosystems</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Create diverse forest environments</p>
                <Button className="w-full bg-green-600 hover:bg-green-700">Generate Forest</Button>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="text-blue-400">🌊 Aquatic Systems</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Build lakes, rivers, and wetlands</p>
                <Button className="w-full bg-blue-600 hover:bg-blue-700">Create Waters</Button>
              </CardContent>
            </Card>

            <Card className="border-orange-500/30 bg-orange-900/20">
              <CardHeader>
                <CardTitle className="text-orange-400">🏜️ Desert Landscapes</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Design arid and semi-arid regions</p>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">Build Desert</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="restoration" className="space-y-6">
          <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-cyan-900/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Layers className="h-6 w-6" />
                🌱 Environmental Restoration Engine
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <h4 className="font-bold text-green-400 mb-3">🌍 Active Restoration Projects:</h4>
                <div className="text-sm text-green-300 space-y-2">
                  <div>• Coral Reef Restoration: 15,000 reefs rebuilt</div>
                  <div>• Forest Regeneration: 2.5M trees planted</div>
                  <div>• Wetland Recovery: 500 wetlands restored</div>
                  <div>• Soil Remediation: 10,000 acres cleaned</div>
                  <div>• Wildlife Habitat Creation: 1,200 habitats built</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scrapyard" className="space-y-6">
          <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
            <CardHeader>
              <CardTitle className="text-purple-400 flex items-center gap-2">
                <Sparkles className="h-6 w-6 animate-pulse" />
                🌟 AURA LAND SCRAPYARD - EXCLUSIVE ACCESS
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center space-y-4">
              <p className="text-lg text-purple-300">
                Transform scrap materials into landscape-building resources using aura fusion
                technology
              </p>

              <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 mb-6">
                <h4 className="font-bold text-purple-400 mb-2">🔮 Exclusive Scrapyard Features:</h4>
                <div className="text-sm text-purple-300 space-y-1">
                  <div>✨ Convert any scrap into quantum building materials</div>
                  <div>⚡ Reality-bending landscape transformation tools</div>
                  <div>🌟 Aura-powered ecosystem generation</div>
                  <div>💎 Exclusive tools only available to admin users</div>
                </div>
              </div>

              <Link to="/aura-land-scrapyard">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-8">
                  <Sparkles className="h-5 w-5 mr-2" />
                  🌟 ENTER AURA SCRAPYARD
                </Button>
              </Link>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
