import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Palette,
  Download,
  Upload,
  Eye,
  Star,
  Clock,
  Brush,
  Sparkles,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

interface VisualPreset {
  id: string;
  name: string;
  category:
    | "cyberpunk"
    | "neural"
    | "quantum"
    | "bio"
    | "holographic"
    | "matrix";
  background: {
    type: string;
    intensity: string;
    color: string;
    speed: number;
  };
  ui: {
    fontSize: number;
    spacing: number;
    effects: boolean;
  };
  preview: string;
  tags: string[];
  featured: boolean;
}

const visualPresets: VisualPreset[] = [
  {
    id: "cyberpunk-neon",
    name: "Cyberpunk Neon",
    category: "cyberpunk",
    background: {
      type: "cyberpunk",
      intensity: "high",
      color: "#ff00ff",
      speed: 1.5,
    },
    ui: { fontSize: 16, spacing: 20, effects: true },
    preview: "🌆",
    tags: ["neon", "futuristic", "grid"],
    featured: true,
  },
  {
    id: "neural-harmony",
    name: "Neural Harmony",
    category: "neural",
    background: {
      type: "neural",
      intensity: "medium",
      color: "#00ff80",
      speed: 1,
    },
    ui: { fontSize: 14, spacing: 16, effects: true },
    preview: "🧠",
    tags: ["organic", "flowing", "connections"],
    featured: true,
  },
  {
    id: "quantum-field",
    name: "Quantum Field",
    category: "quantum",
    background: {
      type: "quantum",
      intensity: "high",
      color: "#8b5cf6",
      speed: 2,
    },
    ui: { fontSize: 15, spacing: 18, effects: true },
    preview: "⚛️",
    tags: ["quantum", "particles", "entanglement"],
    featured: false,
  },
  {
    id: "bio-electric",
    name: "Bio Electric",
    category: "bio",
    background: {
      type: "bioelectric",
      intensity: "medium",
      color: "#00ff80",
      speed: 1.2,
    },
    ui: { fontSize: 16, spacing: 16, effects: true },
    preview: "⚡",
    tags: ["electric", "pulses", "organic"],
    featured: true,
  },
  {
    id: "holographic-display",
    name: "Holographic Display",
    category: "holographic",
    background: {
      type: "holographic",
      intensity: "low",
      color: "#00ffff",
      speed: 0.8,
    },
    ui: { fontSize: 14, spacing: 14, effects: false },
    preview: "📡",
    tags: ["hologram", "scan", "interference"],
    featured: false,
  },
  {
    id: "matrix-rain",
    name: "Matrix Rain",
    category: "matrix",
    background: {
      type: "matrix",
      intensity: "high",
      color: "#00ff00",
      speed: 1,
    },
    ui: { fontSize: 16, spacing: 16, effects: true },
    preview: "🔴",
    tags: ["classic", "code", "rain"],
    featured: true,
  },
];

export function VisualLibrary() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPreset, setSelectedPreset] = useState<VisualPreset | null>(
    null,
  );

  const filteredPresets =
    selectedCategory === "all"
      ? visualPresets
      : visualPresets.filter((preset) => preset.category === selectedCategory);

  const applyPreset = (preset: VisualPreset) => {
    // Apply the preset settings
    const settings = {
      type: preset.background.type,
      intensity: preset.background.intensity,
      color: preset.background.color,
      speed: preset.background.speed,
      autoGenerate: false,
    };

    localStorage.setItem("gaia-background-settings", JSON.stringify(settings));
    window.dispatchEvent(
      new CustomEvent("background-settings-changed", { detail: settings }),
    );

    toast.success(`Applied "${preset.name}" preset!`, {
      description: `Background: ${preset.background.type}, UI: ${preset.ui.fontSize}px font`,
    });
  };

  const previewPreset = (preset: VisualPreset) => {
    setSelectedPreset(preset);
    toast.info(`Previewing "${preset.name}"`, {
      description: "Click Apply to use this preset",
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Palette className="h-5 w-5" />
            Visual Style Library
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid grid-cols-7 mb-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="cyberpunk">Cyber</TabsTrigger>
              <TabsTrigger value="neural">Neural</TabsTrigger>
              <TabsTrigger value="quantum">Quantum</TabsTrigger>
              <TabsTrigger value="bio">Bio</TabsTrigger>
              <TabsTrigger value="holographic">Holo</TabsTrigger>
              <TabsTrigger value="matrix">Matrix</TabsTrigger>
            </TabsList>

            <TabsContent value={selectedCategory} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredPresets.map((preset) => (
                  <Card
                    key={preset.id}
                    className={`border-2 transition-all cursor-pointer hover:shadow-lg ${
                      selectedPreset?.id === preset.id
                        ? "border-primary bg-primary/10"
                        : "border-muted hover:border-primary/50"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-2xl">{preset.preview}</div>
                        <div className="flex gap-1">
                          {preset.featured && (
                            <Badge variant="secondary" className="text-xs">
                              <Star className="h-3 w-3 mr-1" />
                              Featured
                            </Badge>
                          )}
                        </div>
                      </div>

                      <h3 className="font-medium mb-1">{preset.name}</h3>
                      <p className="text-sm text-muted-foreground mb-3 capitalize">
                        {preset.category} • {preset.background.intensity}{" "}
                        intensity
                      </p>

                      <div className="flex flex-wrap gap-1 mb-3">
                        {preset.tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="outline"
                            className="text-xs"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => previewPreset(preset)}
                          className="flex-1"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Preview
                        </Button>
                        <Button
                          size="sm"
                          onClick={() => applyPreset(preset)}
                          className="flex-1 bg-primary hover:bg-primary/90"
                        >
                          <Brush className="h-3 w-3 mr-1" />
                          Apply
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Preset Details */}
          {selectedPreset && (
            <Card className="mt-6 border-primary/30 bg-primary/10">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-primary">
                    {selectedPreset.preview} {selectedPreset.name}
                  </h3>
                  <Badge variant="secondary">Preview Mode</Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-muted-foreground">Background:</span>
                    <p className="capitalize">
                      {selectedPreset.background.type}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Intensity:</span>
                    <p className="capitalize">
                      {selectedPreset.background.intensity}
                    </p>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Color:</span>
                    <div className="flex items-center gap-2">
                      <div
                        className="w-4 h-4 rounded border"
                        style={{
                          backgroundColor: selectedPreset.background.color,
                        }}
                      />
                      <span>{selectedPreset.background.color}</span>
                    </div>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Speed:</span>
                    <p>{selectedPreset.background.speed}x</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button
                    onClick={() => applyPreset(selectedPreset)}
                    className="bg-primary hover:bg-primary/90"
                  >
                    <Sparkles className="h-4 w-4 mr-2" />
                    Apply This Style
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSelectedPreset(null)}
                  >
                    Cancel Preview
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
