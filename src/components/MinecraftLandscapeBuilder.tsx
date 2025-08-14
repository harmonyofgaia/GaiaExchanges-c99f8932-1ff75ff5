import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Gamepad2, Hammer, TreePine } from "lucide-react";
import { AgeLandscapeSelector } from "./AgeLandscapeSelector";
import { toast } from "sonner";

export function MinecraftLandscapeBuilder() {
  const [selectedAge, setSelectedAge] = useState("6-8");
  const [isBuilding, setIsBuilding] = useState(false);

  const startBuilding = () => {
    setIsBuilding(true);
    toast.success("🏗️ Minecraft Builder Launched!", {
      description: "Build amazing landscapes and launch into games directly",
      duration: 4000,
    });
  };

  const launchIntoGame = (game: string) => {
    toast.success(`🎮 Launching into ${game}!`, {
      description: "Your landscape will be loaded into the game world",
      duration: 5000,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-green-400">🌍 Minecraft Landscape Builder</h1>
          <p className="text-green-300 max-w-2xl mx-auto">
            Create amazing Minecraft landscapes with game integration and cross-platform
            compatibility
          </p>
        </div>

        {/* Age Selector */}
        <Card className="border-green-500/30 bg-gradient-to-br from-green-900/40 to-emerald-900/40">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <Users className="h-6 w-6" />
              Age Group Selection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AgeLandscapeSelector selectedAge={selectedAge} onAgeSelect={setSelectedAge} />
          </CardContent>
        </Card>

        {/* Building Canvas */}
        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/40 to-purple-900/40">
          <CardHeader>
            <CardTitle className="text-blue-400 flex items-center gap-2">
              <Hammer className="h-6 w-6" />
              Landscape Creation Studio
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-gradient-to-br from-black via-green-900/30 to-blue-900/30 rounded-lg border-2 border-green-500/50 relative">
              {isBuilding ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="text-8xl animate-bounce">⛏️</div>
                    <div className="text-2xl font-bold text-green-400">
                      MINECRAFT BUILDER ACTIVE
                    </div>
                    <div className="text-lg text-blue-300">Age Group: {selectedAge}</div>
                  </div>
                </div>
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button
                    onClick={startBuilding}
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold text-xl px-8 py-4"
                  >
                    <TreePine className="h-6 w-6 mr-2" />
                    Start Building
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Game Launch Integration */}
        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/40 to-pink-900/40">
          <CardHeader>
            <CardTitle className="text-purple-400 flex items-center gap-2">
              <Gamepad2 className="h-6 w-6" />
              🎮 Launch into Games
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => launchIntoGame("Worms Arena")}
                className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 p-6"
                disabled={!isBuilding}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">🐛</div>
                  <div className="font-bold">Worms Arena</div>
                  <div className="text-xs opacity-75">Use landscape as battlefield</div>
                </div>
              </Button>

              <Button
                onClick={() => launchIntoGame("GAiA Fantasy")}
                className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 p-6"
                disabled={!isBuilding}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">⚔️</div>
                  <div className="font-bold">GAiA Fantasy</div>
                  <div className="text-xs opacity-75">Adventure in your world</div>
                </div>
              </Button>

              <Button
                onClick={() => launchIntoGame("Minecraft")}
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 p-6"
                disabled={!isBuilding}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">⛏️</div>
                  <div className="font-bold">Minecraft</div>
                  <div className="text-xs opacity-75">Export to Minecraft</div>
                </div>
              </Button>
            </div>

            {!isBuilding && (
              <div className="text-center mt-4 text-muted-foreground">
                Start building to unlock game launches
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
