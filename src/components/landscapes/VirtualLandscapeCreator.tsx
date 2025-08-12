import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Mountain, Palette, Save, Eye, Upload } from "lucide-react";
import { toast } from "sonner";

export function VirtualLandscapeCreator() {
  const [landscapeConfig, setLandscapeConfig] = useState({
    name: "",
    terrain: "mountain",
    size: [50],
    complexity: [75],
    weather: "sunny",
    population: [25],
    resources: [60],
  });

  const handleCreateLandscape = () => {
    toast.success(`🌍 Created landscape: ${landscapeConfig.name}!`, {
      description: `Terrain: ${landscapeConfig.terrain} | Size: ${landscapeConfig.size[0]}km² | Complexity: ${landscapeConfig.complexity[0]}%`,
      duration: 4000,
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="border-green-500/30 bg-green-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Mountain className="h-6 w-6" />
            🎨 Landscape Configuration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <label className="text-sm font-medium text-green-400 mb-2 block">
              Landscape Name
            </label>
            <Input
              placeholder="Enter landscape name..."
              value={landscapeConfig.name}
              onChange={(e) =>
                setLandscapeConfig((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
              className="border-green-500/20"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-blue-400 mb-2 block">
              Terrain Size: {landscapeConfig.size[0]} km²
            </label>
            <Slider
              value={landscapeConfig.size}
              onValueChange={(value) =>
                setLandscapeConfig((prev) => ({ ...prev, size: value }))
              }
              max={200}
              min={10}
              step={5}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-purple-400 mb-2 block">
              Complexity Level: {landscapeConfig.complexity[0]}%
            </label>
            <Slider
              value={landscapeConfig.complexity}
              onValueChange={(value) =>
                setLandscapeConfig((prev) => ({ ...prev, complexity: value }))
              }
              max={100}
              min={10}
              step={5}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-orange-400 mb-2 block">
              Population Density: {landscapeConfig.population[0]}%
            </label>
            <Slider
              value={landscapeConfig.population}
              onValueChange={(value) =>
                setLandscapeConfig((prev) => ({ ...prev, population: value }))
              }
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-cyan-400 mb-2 block">
              Resource Abundance: {landscapeConfig.resources[0]}%
            </label>
            <Slider
              value={landscapeConfig.resources}
              onValueChange={(value) =>
                setLandscapeConfig((prev) => ({ ...prev, resources: value }))
              }
              max={100}
              min={0}
              step={5}
              className="w-full"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Button
              onClick={handleCreateLandscape}
              className="bg-green-600 hover:bg-green-700"
            >
              <Save className="h-4 w-4 mr-2" />
              Create Landscape
            </Button>
            <Button
              variant="outline"
              className="border-blue-500/30 text-blue-400"
            >
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-purple-500/30 bg-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Palette className="h-6 w-6" />
            🖼️ Live Preview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="aspect-video bg-gradient-to-b from-blue-400/20 to-green-400/20 rounded-lg border border-purple-500/20 flex items-center justify-center">
            <div className="text-center space-y-4">
              <div className="text-6xl">🌍</div>
              <div className="text-lg font-bold text-purple-400">
                {landscapeConfig.name || "Unnamed Landscape"}
              </div>
              <div className="text-sm text-muted-foreground">
                {landscapeConfig.size[0]}km² • {landscapeConfig.complexity[0]}%
                complexity
              </div>
              <div className="flex justify-center gap-2">
                <Badge className="bg-green-600">
                  Size: {landscapeConfig.size[0]}km²
                </Badge>
                <Badge className="bg-blue-600">
                  Population: {landscapeConfig.population[0]}%
                </Badge>
                <Badge className="bg-purple-600">
                  Resources: {landscapeConfig.resources[0]}%
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
