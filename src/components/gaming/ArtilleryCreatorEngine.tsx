import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Zap,
  Target,
  Shield,
  Rocket,
  Wrench,
  Palette,
  Save,
  Share2,
  Download,
  Upload,
  Sparkles,
  Atom,
  Brain,
} from "lucide-react";
import { toast } from "sonner";

interface CreatedWeapon {
  id: string;
  name: string;
  type: "healing" | "restoration" | "enhancement" | "research";
  description: string;
  power: number;
  range: number;
  accuracy: number;
  specialEffect: string;
  design: {
    color: string;
    shape: string;
    effects: string[];
  };
  environmentalImpact: "positive" | "neutral";
  created: Date;
}

export function ArtilleryCreatorEngine() {
  const [currentWeapon, setCurrentWeapon] = useState<Partial<CreatedWeapon>>({
    name: "",
    type: "healing",
    description: "",
    power: 50,
    range: 50,
    accuracy: 50,
    specialEffect: "",
    design: {
      color: "#00ff88",
      shape: "beam",
      effects: [],
    },
    environmentalImpact: "positive",
  });
  const [createdWeapons, setCreatedWeapons] = useState<CreatedWeapon[]>([]);
  const [isCreating, setIsCreating] = useState(false);

  const weaponTypes = [
    {
      id: "healing",
      name: "💚 Neural Healing Ray",
      description: "Weapons that heal minds and restore mental clarity",
    },
    {
      id: "restoration",
      name: "🌱 Ecosystem Restorer",
      description: "Tools that repair and regenerate natural environments",
    },
    {
      id: "enhancement",
      name: "🧠 Cognitive Enhancer",
      description: "Devices that boost intelligence and creativity",
    },
    {
      id: "research",
      name: "🔬 Research Accelerator",
      description: "Tools that speed up scientific discovery",
    },
  ];

  const weaponShapes = ["beam", "orb", "wave", "spiral", "network", "field"];
  const effectOptions = [
    "sparkle",
    "glow",
    "pulse",
    "shimmer",
    "ripple",
    "aurora",
    "quantum",
  ];

  const handleCreateWeapon = () => {
    if (!currentWeapon.name || !currentWeapon.description) {
      toast.error("Please provide name and description for your creation");
      return;
    }

    setIsCreating(true);

    setTimeout(() => {
      const newWeapon: CreatedWeapon = {
        id: `weapon_${Date.now()}`,
        name: currentWeapon.name!,
        type: currentWeapon.type as any,
        description: currentWeapon.description!,
        power: currentWeapon.power || 50,
        range: currentWeapon.range || 50,
        accuracy: currentWeapon.accuracy || 50,
        specialEffect: currentWeapon.specialEffect || "",
        design: currentWeapon.design || {
          color: "#00ff88",
          shape: "beam",
          effects: [],
        },
        environmentalImpact: currentWeapon.environmentalImpact || "positive",
        created: new Date(),
      };

      setCreatedWeapons((prev) => [newWeapon, ...prev]);
      setCurrentWeapon({
        name: "",
        type: "healing",
        description: "",
        power: 50,
        range: 50,
        accuracy: 50,
        specialEffect: "",
        design: {
          color: "#00ff88",
          shape: "beam",
          effects: [],
        },
        environmentalImpact: "positive",
      });
      setIsCreating(false);

      toast.success(`🚀 "${newWeapon.name}" created successfully!`, {
        description:
          "Your weapon has been added to the arsenal and is ready for deployment in games.",
      });
    }, 2000);
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case "healing":
        return "💚";
      case "restoration":
        return "🌱";
      case "enhancement":
        return "🧠";
      case "research":
        return "🔬";
      default:
        return "⚡";
    }
  };

  return (
    <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-blue-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Rocket className="h-6 w-6" />
          🛠️ ARTILLERY CREATOR ENGINE - Design Your Game Tools
        </CardTitle>
        <p className="text-muted-foreground">
          Create custom weapons, tools, and equipment for environmental healing
          and neural enhancement games
        </p>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="creator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="creator">Create New</TabsTrigger>
            <TabsTrigger value="arsenal">
              My Arsenal ({createdWeapons.length})
            </TabsTrigger>
            <TabsTrigger value="community">Community Designs</TabsTrigger>
          </TabsList>

          <TabsContent value="creator" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Creation Form */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-purple-400 mb-2">
                    Weapon Name
                  </label>
                  <Input
                    value={currentWeapon.name}
                    onChange={(e) =>
                      setCurrentWeapon((prev) => ({
                        ...prev,
                        name: e.target.value,
                      }))
                    }
                    placeholder="e.g., Neural Restoration Beam"
                    className="bg-purple-900/20 border-purple-500/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-400 mb-2">
                    Type
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {weaponTypes.map((type) => (
                      <Button
                        key={type.id}
                        variant={
                          currentWeapon.type === type.id ? "default" : "outline"
                        }
                        onClick={() =>
                          setCurrentWeapon((prev) => ({
                            ...prev,
                            type: type.id as any,
                          }))
                        }
                        className="h-auto p-3 text-left"
                      >
                        <div>
                          <div className="font-medium text-sm">{type.name}</div>
                          <div className="text-xs text-muted-foreground">
                            {type.description}
                          </div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-400 mb-2">
                    Description
                  </label>
                  <Textarea
                    value={currentWeapon.description}
                    onChange={(e) =>
                      setCurrentWeapon((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    placeholder="Describe how your weapon works and its environmental benefits..."
                    className="bg-purple-900/20 border-purple-500/30 min-h-[100px]"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-green-400 mb-2">
                      Power: {currentWeapon.power}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={currentWeapon.power}
                      onChange={(e) =>
                        setCurrentWeapon((prev) => ({
                          ...prev,
                          power: parseInt(e.target.value),
                        }))
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-blue-400 mb-2">
                      Range: {currentWeapon.range}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={currentWeapon.range}
                      onChange={(e) =>
                        setCurrentWeapon((prev) => ({
                          ...prev,
                          range: parseInt(e.target.value),
                        }))
                      }
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-yellow-400 mb-2">
                      Accuracy: {currentWeapon.accuracy}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="100"
                      value={currentWeapon.accuracy}
                      onChange={(e) =>
                        setCurrentWeapon((prev) => ({
                          ...prev,
                          accuracy: parseInt(e.target.value),
                        }))
                      }
                      className="w-full"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-400 mb-2">
                    Special Effect
                  </label>
                  <Input
                    value={currentWeapon.specialEffect}
                    onChange={(e) =>
                      setCurrentWeapon((prev) => ({
                        ...prev,
                        specialEffect: e.target.value,
                      }))
                    }
                    placeholder="e.g., Increases local biodiversity by 25%"
                    className="bg-purple-900/20 border-purple-500/30"
                  />
                </div>
              </div>

              {/* Visual Designer */}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-purple-400 mb-2">
                    Visual Design
                  </label>
                  <div className="p-4 bg-black/50 rounded-lg border border-purple-500/30 min-h-[200px] flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-6xl mb-2">
                        {getTypeIcon(currentWeapon.type || "healing")}
                      </div>
                      <div
                        style={{
                          color: currentWeapon.design?.color || "#00ff88",
                        }}
                        className="font-bold"
                      >
                        {currentWeapon.name || "Your Weapon"}
                      </div>
                      <div className="text-sm text-muted-foreground mt-2">
                        {currentWeapon.design?.shape || "beam"} pattern
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-400 mb-2">
                    Color
                  </label>
                  <input
                    type="color"
                    value={currentWeapon.design?.color || "#00ff88"}
                    onChange={(e) =>
                      setCurrentWeapon((prev) => ({
                        ...prev,
                        design: {
                          ...prev.design,
                          color: e.target.value,
                          shape: prev.design?.shape || "beam",
                          effects: prev.design?.effects || [],
                        },
                      }))
                    }
                    className="w-full h-12 rounded border border-purple-500/30"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-purple-400 mb-2">
                    Shape Pattern
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {weaponShapes.map((shape) => (
                      <Button
                        key={shape}
                        variant={
                          currentWeapon.design?.shape === shape
                            ? "default"
                            : "outline"
                        }
                        onClick={() =>
                          setCurrentWeapon((prev) => ({
                            ...prev,
                            design: {
                              ...prev.design,
                              shape,
                              color: prev.design?.color || "#00ff88",
                              effects: prev.design?.effects || [],
                            },
                          }))
                        }
                        className="text-xs"
                      >
                        {shape}
                      </Button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleCreateWeapon}
                  disabled={isCreating}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {isCreating ? (
                    <>
                      <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                      Creating Weapon...
                    </>
                  ) : (
                    <>
                      <Rocket className="h-4 w-4 mr-2" />
                      Create Weapon
                    </>
                  )}
                </Button>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="arsenal" className="space-y-4">
            {createdWeapons.length === 0 ? (
              <div className="text-center py-12">
                <Wrench className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold text-muted-foreground mb-2">
                  No weapons created yet
                </h3>
                <p className="text-muted-foreground">
                  Start creating your first environmental healing weapon!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {createdWeapons.map((weapon) => (
                  <Card
                    key={weapon.id}
                    className="border border-gray-700 bg-gradient-to-br from-gray-900/50 to-purple-900/20"
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2 text-sm">
                        <span className="text-2xl">
                          {getTypeIcon(weapon.type)}
                        </span>
                        {weapon.name}
                        <Badge className="bg-green-600 text-xs">Active</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <p className="text-sm text-muted-foreground">
                        {weapon.description}
                      </p>

                      <div className="grid grid-cols-3 gap-2 text-xs">
                        <div className="text-center">
                          <div className="text-green-400 font-bold">
                            {weapon.power}
                          </div>
                          <div className="text-muted-foreground">Power</div>
                        </div>
                        <div className="text-center">
                          <div className="text-blue-400 font-bold">
                            {weapon.range}
                          </div>
                          <div className="text-muted-foreground">Range</div>
                        </div>
                        <div className="text-center">
                          <div className="text-yellow-400 font-bold">
                            {weapon.accuracy}
                          </div>
                          <div className="text-muted-foreground">Accuracy</div>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs"
                        >
                          <Share2 className="h-3 w-3 mr-1" />
                          Share
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-xs"
                        >
                          <Download className="h-3 w-3 mr-1" />
                          Export
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="community" className="space-y-4">
            <div className="text-center py-8">
              <Brain className="h-16 w-16 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-purple-400 mb-2">
                Community Arsenal Coming Soon
              </h3>
              <p className="text-muted-foreground">
                Share and discover weapons created by the global GAIA community
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
