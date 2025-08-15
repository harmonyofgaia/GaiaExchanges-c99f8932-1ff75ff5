import React, { useState , useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Waves, Fish, Crown, Gem } from "lucide-react";
import { Tool, Landscape } from "@/types/ui-types";

interface CoralReefTool extends Tool {
  ecoImpact: number;
  rarity: "common" | "rare" | "epic" | "legendary";
}

interface CoralReefLandscape extends Landscape {
  coralHealth: number;
  marineLife: number;
  conservationStatus: string;
}

export function CoralReefNFTMarketplace() {
  const [selectedCategory, setSelectedCategory] = useState("tools");

  const tools: CoralReefTool[] = [
    {
      id: "coral-restorer",
      name: "Coral Restoration Tool",
      price: 250,
      description: "Advanced tool for rehabilitating damaged coral reefs",
      category: "restoration",
      rarity: "epic",
      ecoImpact: 85,
      icon: "🪸",
    },
    {
      id: "reef-scanner",
      name: "Marine Life Scanner",
      price: 180,
      description: "High-tech scanner for monitoring reef biodiversity",
      category: "monitoring",
      rarity: "rare",
      ecoImpact: 70,
      icon: "🔬",
    },
  ];

  const landscapes: CoralReefLandscape[] = [
    {
      id: "great-barrier",
      name: "Great Barrier Reef Section",
      price: 1200,
      description: "Protected section of the world's largest coral reef system",
      category: "coral-reef",
      biome: "marine",
      coralHealth: 78,
      marineLife: 92,
      conservationStatus: "Protected",
      image: "🪸",
    },
    {
      id: "maldives-atoll",
      name: "Maldives Coral Atoll",
      price: 850,
      description: "Pristine coral atoll with diverse marine ecosystems",
      category: "coral-reef",
      biome: "tropical",
      coralHealth: 88,
      marineLife: 85,
      conservationStatus: "Thriving",
      image: "🏝️",
    },
  ];

  return (
    <Card className="border-cyan-500/30 bg-gradient-to-br from-cyan-900/30 to-blue-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-400">
          <Waves className="h-6 w-6" />
          🌊 Coral Reef NFT Marketplace
        </CardTitle>
        <div className="flex gap-2">
          <Button
            variant={selectedCategory === "tools" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("tools")}
            className="bg-cyan-600 hover:bg-cyan-700"
          >
            Marine Tools
          </Button>
          <Button
            variant={selectedCategory === "landscapes" ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory("landscapes")}
            className="bg-blue-600 hover:bg-blue-700"
          >
            Reef Landscapes
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {selectedCategory === "tools" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {tools.map((tool) => (
              <Card key={tool.id} className="border-cyan-500/20 bg-cyan-900/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{tool.icon}</span>
                    <div>
                      <h4 className="font-medium text-white">{tool.name}</h4>
                      <Badge
                        className={`text-xs ${
                          tool.rarity === "legendary"
                            ? "bg-yellow-600"
                            : tool.rarity === "epic"
                              ? "bg-purple-600"
                              : tool.rarity === "rare"
                                ? "bg-blue-600"
                                : "bg-gray-600"
                        }`}
                      >
                        {tool.rarity}
                      </Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{tool.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Eco Impact</span>
                      <span className="text-green-400">{tool.ecoImpact}%</span>
                    </div>
                    <Progress value={tool.ecoImpact} className="h-1" />
                    <div className="flex justify-between items-center">
                      <span className="text-cyan-400 font-bold">{tool.price} GAiA</span>
                      <Button size="sm" className="bg-cyan-600 hover:bg-cyan-700">
                        Purchase
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {selectedCategory === "landscapes" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {landscapes.map((landscape) => (
              <Card key={landscape.id} className="border-blue-500/20 bg-blue-900/20">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="text-2xl">{landscape.image}</span>
                    <div>
                      <h4 className="font-medium text-white">{landscape.name}</h4>
                      <Badge className="bg-green-600 text-xs">{landscape.conservationStatus}</Badge>
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mb-3">{landscape.description}</p>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Coral Health</span>
                      <span className="text-green-400">{landscape.coralHealth}%</span>
                    </div>
                    <Progress value={landscape.coralHealth} className="h-1" />
                    <div className="flex justify-between text-sm">
                      <span>Marine Life</span>
                      <span className="text-blue-400">{landscape.marineLife}%</span>
                    </div>
                    <Progress value={landscape.marineLife} className="h-1" />
                    <div className="flex justify-between items-center">
                      <span className="text-blue-400 font-bold">{landscape.price} GAiA</span>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                        <Crown className="h-3 w-3 mr-1" />
                        Own Reef
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
