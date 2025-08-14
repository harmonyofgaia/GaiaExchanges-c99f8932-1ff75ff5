import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { Palette, Zap, Star, Settings } from "lucide-react";
import {
  EnhancedBackgroundManager,
  EnhancedBackgroundType,
  EnhancedBackgroundSettings,
} from "../backgrounds/EnhancedBackgroundManager";

export function ThemeDesigner() {
  const [currentTheme, setCurrentTheme] = useState<EnhancedBackgroundSettings>({
    type: "matrix",
    intensity: "medium",
    color: "#00ff00",
    speed: 1,
    autoGenerate: false,
  });

  const backgroundTypes: {
    id: EnhancedBackgroundType;
    name: string;
    description: string;
  }[] = [
    {
      id: "matrix",
      name: "Matrix Rain",
      description: "Classic falling code effect",
    },
    {
      id: "neural",
      name: "Neural Network",
      description: "Connected nodes and synapses",
    },
    {
      id: "puzzle",
      name: "Puzzle Pieces",
      description: "Animated puzzle elements",
    },
    {
      id: "cyberpunk",
      name: "CyberPunk Grid",
      description: "Futuristic grid and glitch effects",
    },
    {
      id: "quantum",
      name: "Quantum Field",
      description: "Particle entanglement visualization",
    },
    {
      id: "bioelectric",
      name: "Bio-Electric",
      description: "Organic energy patterns",
    },
    {
      id: "holographic",
      name: "Holographic",
      description: "Hologram scan line effects",
    },
  ];

  const colors = [
    "#00ff00",
    "#00ffff",
    "#ff00ff",
    "#ffff00",
    "#ff0080",
    "#0080ff",
    "#ff8000",
    "#8000ff",
    "#ff0040",
    "#40ff00",
  ];

  const updateTheme = (updates: Partial<EnhancedBackgroundSettings>) => {
    setCurrentTheme((prev) => ({ ...prev, ...updates }));
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Palette className="h-5 w-5" />
            🎨 Theme Designer
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Background Type Selection */}
          <div className="space-y-3">
            <h4 className="font-medium text-purple-400">Background Type</h4>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {backgroundTypes.map((type) => (
                <Button
                  key={type.id}
                  variant={currentTheme.type === type.id ? "default" : "outline"}
                  onClick={() => updateTheme({ type: type.id })}
                  className={`text-xs p-2 h-auto ${
                    currentTheme.type === type.id
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "border-purple-500/50 hover:bg-purple-900/20"
                  }`}
                >
                  <div className="text-center">
                    <div className="font-medium">{type.name}</div>
                    <div className="text-xs opacity-80">{type.description}</div>
                  </div>
                </Button>
              ))}
            </div>
          </div>

          {/* Color Selection */}
          <div className="space-y-3">
            <h4 className="font-medium text-purple-400">Color</h4>
            <div className="grid grid-cols-5 gap-2">
              {colors.map((color) => (
                <button
                  key={color}
                  onClick={() => updateTheme({ color })}
                  className={`h-8 w-8 rounded-full border-2 ${
                    currentTheme.color === color ? "border-white" : "border-gray-600"
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Intensity Selection */}
          <div className="space-y-3">
            <h4 className="font-medium text-purple-400">Intensity</h4>
            <div className="flex gap-2">
              {(["low", "medium", "high"] as const).map((intensity) => (
                <Button
                  key={intensity}
                  variant={currentTheme.intensity === intensity ? "default" : "outline"}
                  onClick={() => updateTheme({ intensity })}
                  className={`flex-1 ${
                    currentTheme.intensity === intensity
                      ? "bg-purple-600 hover:bg-purple-700"
                      : "border-purple-500/50 hover:bg-purple-900/20"
                  }`}
                >
                  {intensity.charAt(0).toUpperCase() + intensity.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          {/* Speed Control */}
          <div className="space-y-3">
            <h4 className="font-medium text-purple-400">Animation Speed</h4>
            <div className="px-3">
              <Slider
                value={[currentTheme.speed]}
                onValueChange={(value) => updateTheme({ speed: value[0] })}
                max={3}
                min={0.1}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-purple-300/80 mt-1">
                <span>Slow</span>
                <span>Fast</span>
              </div>
            </div>
          </div>

          {/* Auto-generate Toggle */}
          <div className="flex items-center justify-between">
            <span className="text-purple-400">Auto-generate themes</span>
            <Button
              variant={currentTheme.autoGenerate ? "default" : "outline"}
              onClick={() => updateTheme({ autoGenerate: !currentTheme.autoGenerate })}
              className={
                currentTheme.autoGenerate
                  ? "bg-purple-600 hover:bg-purple-700"
                  : "border-purple-500/50"
              }
            >
              {currentTheme.autoGenerate ? "ON" : "OFF"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card className="bg-gray-900/50 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-400">Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative h-32 rounded-lg overflow-hidden">
            <EnhancedBackgroundManager settings={currentTheme} />
            <div className="absolute inset-0 flex items-center justify-center">
              <Badge className="bg-purple-600/80 text-white">Theme Preview</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
