import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import {
  User,
  Palette,
  Shirt,
  Crown,
  Sparkles,
  Download,
  Upload,
  Share2,
  Zap,
  Leaf,
} from "lucide-react";
import { toast } from "sonner";

interface AvatarCustomization {
  skinTone: number;
  hairStyle: string;
  hairColor: string;
  eyeColor: string;
  clothing: string;
  accessories: string[];
  ecoLevel: number;
  specialEffects: string[];
}

export default function EcoAvatar() {
  const [avatar, setAvatar] = useState<AvatarCustomization>({
    skinTone: 3,
    hairStyle: "medium",
    hairColor: "#8B4513",
    eyeColor: "#4169E1",
    clothing: "eco_casual",
    accessories: ["eco_badge"],
    ecoLevel: 15,
    specialEffects: ["green_aura"],
  });

  const [selectedCategory, setSelectedCategory] = useState("appearance");

  const hairStyles = [
    { id: "short", name: "Short", icon: "💇‍♂️", eco: false },
    { id: "medium", name: "Medium", icon: "💇‍♀️", eco: false },
    { id: "long", name: "Long", icon: "👩‍🦰", eco: false },
    { id: "eco_natural", name: "Eco Natural", icon: "🌿", eco: true },
    { id: "solar_spikes", name: "Solar Spikes", icon: "☀️", eco: true },
  ];

  const clothingOptions = [
    { id: "casual", name: "Casual", icon: "👕", eco: false },
    { id: "formal", name: "Formal", icon: "👔", eco: false },
    { id: "eco_casual", name: "Eco Casual", icon: "🌱", eco: true },
    { id: "solar_suit", name: "Solar Suit", icon: "☀️", eco: true },
    { id: "nature_guardian", name: "Nature Guardian", icon: "🛡️", eco: true },
    { id: "ocean_protector", name: "Ocean Protector", icon: "🌊", eco: true },
  ];

  const accessories = [
    { id: "eco_badge", name: "Eco Badge", icon: "🏅", cost: 0, eco: true },
    { id: "leaf_crown", name: "Leaf Crown", icon: "👑", cost: 100, eco: true },
    {
      id: "solar_glasses",
      name: "Solar Glasses",
      icon: "🕶️",
      cost: 50,
      eco: true,
    },
    {
      id: "nature_necklace",
      name: "Nature Necklace",
      icon: "📿",
      cost: 75,
      eco: true,
    },
    { id: "wind_scarf", name: "Wind Scarf", icon: "🧣", cost: 30, eco: true },
    {
      id: "earth_boots",
      name: "Earth Boots",
      icon: "👢",
      cost: 120,
      eco: true,
    },
  ];

  const specialEffects = [
    {
      id: "green_aura",
      name: "Green Aura",
      icon: "✨",
      cost: 0,
      description: "Eco energy glow",
    },
    {
      id: "solar_rays",
      name: "Solar Rays",
      icon: "☀️",
      cost: 200,
      description: "Radiant solar energy",
    },
    {
      id: "nature_particles",
      name: "Nature Particles",
      icon: "🌿",
      cost: 150,
      description: "Floating leaves and flowers",
    },
    {
      id: "ocean_waves",
      name: "Ocean Waves",
      icon: "🌊",
      cost: 180,
      description: "Flowing water effects",
    },
    {
      id: "earth_crystals",
      name: "Earth Crystals",
      icon: "💎",
      cost: 250,
      description: "Crystalline formations",
    },
    {
      id: "wind_swirls",
      name: "Wind Swirls",
      icon: "🌪️",
      cost: 170,
      description: "Air currents and swirls",
    },
  ];

  const updateAvatar = (field: keyof AvatarCustomization, value: unknown) => {
    setAvatar((prev) => ({ ...prev, [field]: value }));
  };

  const addAccessory = (accessoryId: string) => {
    if (!avatar.accessories.includes(accessoryId)) {
      updateAvatar("accessories", [...avatar.accessories, accessoryId]);
      toast.success("Accessory added to your eco avatar!");
    }
  };

  const addSpecialEffect = (effectId: string) => {
    if (!avatar.specialEffects.includes(effectId)) {
      updateAvatar("specialEffects", [...avatar.specialEffects, effectId]);
      toast.success("Special effect activated!");
    }
  };

  const saveAvatar = () => {
    toast.success("Eco Avatar saved successfully!", {
      description: "Your environmental impact avatar is now active",
    });
  };

  const shareAvatar = () => {
    toast.success("Avatar shared!", {
      description: "Your eco avatar has been shared with the community",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 to-blue-900/20 p-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              🌱 ECO AVATAR CREATOR 🌱
            </CardTitle>
            <div className="text-center space-y-2">
              <p className="text-xl text-muted-foreground">
                Create your personalized environmental impact avatar
              </p>
              <div className="flex justify-center gap-4">
                <Badge className="bg-green-600">🌍 Eco-Themed</Badge>
                <Badge className="bg-blue-600">⚡ Dynamic Effects</Badge>
                <Badge className="bg-purple-600">🎨 Infinite Customization</Badge>
              </div>
            </div>
          </CardHeader>
        </Card>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Avatar Preview */}
          <Card className="border-blue-500/30 bg-gradient-to-b from-blue-900/30 to-cyan-900/30">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <User className="h-6 w-6" />
                Avatar Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Avatar Display */}
              <div className="aspect-square bg-gradient-to-b from-sky-200 to-green-200 rounded-lg p-8 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-green-400/20" />

                {/* Avatar Character */}
                <div className="relative z-10 h-full flex flex-col items-center justify-end">
                  {/* Special Effects */}
                  {avatar.specialEffects.includes("green_aura") && (
                    <div className="absolute inset-0 bg-green-400/20 rounded-full animate-pulse" />
                  )}
                  {avatar.specialEffects.includes("solar_rays") && (
                    <div className="absolute inset-0 bg-yellow-400/30 rounded-full animate-ping" />
                  )}

                  {/* Head */}
                  <div className="text-8xl mb-4">
                    {avatar.clothing === "nature_guardian"
                      ? "🧙‍♀️"
                      : avatar.clothing === "solar_suit"
                        ? "👨‍🚀"
                        : avatar.clothing === "ocean_protector"
                          ? "🏊‍♀️"
                          : "🧑‍🌾"}
                  </div>

                  {/* Accessories Display */}
                  <div className="absolute top-0 left-1/2 transform -translate-x-1/2 space-y-2">
                    {avatar.accessories.map((acc) => {
                      const accessory = accessories.find((a) => a.id === acc);
                      return (
                        accessory && (
                          <div key={acc} className="text-2xl">
                            {accessory.icon}
                          </div>
                        )
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Avatar Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-green-900/30 rounded-lg">
                  <Leaf className="h-6 w-6 text-green-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-green-400">Level {avatar.ecoLevel}</div>
                  <div className="text-xs text-muted-foreground">Eco Impact</div>
                </div>

                <div className="text-center p-3 bg-yellow-900/30 rounded-lg">
                  <Sparkles className="h-6 w-6 text-yellow-400 mx-auto mb-1" />
                  <div className="text-lg font-bold text-yellow-400">
                    {avatar.accessories.length}
                  </div>
                  <div className="text-xs text-muted-foreground">Accessories</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2">
                <Button onClick={saveAvatar} className="flex-1 bg-green-600 hover:bg-green-700">
                  <Download className="h-4 w-4 mr-2" />
                  Save Avatar
                </Button>
                <Button onClick={shareAvatar} variant="outline" className="flex-1">
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Customization Panel */}
          <div className="space-y-6">
            <Tabs defaultValue="appearance" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="appearance">👤 Look</TabsTrigger>
                <TabsTrigger value="clothing">👕 Wear</TabsTrigger>
                <TabsTrigger value="accessories">💎 Items</TabsTrigger>
                <TabsTrigger value="effects">✨ FX</TabsTrigger>
              </TabsList>

              <TabsContent value="appearance" className="space-y-4">
                <Card className="border-pink-500/30 bg-pink-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-pink-400">
                      <Palette className="h-5 w-5" />
                      Appearance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Hair Styles */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Hair Style</label>
                      <div className="grid grid-cols-3 gap-2">
                        {hairStyles.map((style) => (
                          <Button
                            key={style.id}
                            variant={avatar.hairStyle === style.id ? "default" : "outline"}
                            size="sm"
                            onClick={() => updateAvatar("hairStyle", style.id)}
                            className="h-16 flex flex-col gap-1"
                          >
                            <div className="text-xl">{style.icon}</div>
                            <div className="text-xs">{style.name}</div>
                            {style.eco && <Badge className="text-xs bg-green-600">ECO</Badge>}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Skin Tone */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Skin Tone</label>
                      <Slider
                        value={[avatar.skinTone]}
                        onValueChange={(value) => updateAvatar("skinTone", value[0])}
                        max={6}
                        min={1}
                        step={1}
                      />
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="clothing" className="space-y-4">
                <Card className="border-blue-500/30 bg-blue-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-400">
                      <Shirt className="h-5 w-5" />
                      Eco Clothing
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {clothingOptions.map((outfit) => (
                        <Button
                          key={outfit.id}
                          variant={avatar.clothing === outfit.id ? "default" : "outline"}
                          onClick={() => updateAvatar("clothing", outfit.id)}
                          className="h-20 flex flex-col gap-2"
                        >
                          <div className="text-2xl">{outfit.icon}</div>
                          <div className="text-xs">{outfit.name}</div>
                          {outfit.eco && <Badge className="text-xs bg-green-600">ECO</Badge>}
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="accessories" className="space-y-4">
                <Card className="border-yellow-500/30 bg-yellow-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-yellow-400">
                      <Crown className="h-5 w-5" />
                      Eco Accessories
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {accessories.map((accessory) => (
                        <div
                          key={accessory.id}
                          className="flex items-center justify-between p-3 bg-background/50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{accessory.icon}</div>
                            <div>
                              <div className="font-medium">{accessory.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {accessory.cost === 0 ? "Free" : `${accessory.cost} tokens`}
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => addAccessory(accessory.id)}
                            disabled={avatar.accessories.includes(accessory.id)}
                          >
                            {avatar.accessories.includes(accessory.id) ? "Equipped" : "Add"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="effects" className="space-y-4">
                <Card className="border-purple-500/30 bg-purple-900/20">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-400">
                      <Zap className="h-5 w-5" />
                      Special Effects
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {specialEffects.map((effect) => (
                        <div
                          key={effect.id}
                          className="flex items-center justify-between p-3 bg-background/50 rounded-lg"
                        >
                          <div className="flex items-center gap-3">
                            <div className="text-2xl">{effect.icon}</div>
                            <div>
                              <div className="font-medium">{effect.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {effect.description}
                              </div>
                              <div className="text-xs text-yellow-400">
                                {effect.cost === 0 ? "Free" : `${effect.cost} tokens`}
                              </div>
                            </div>
                          </div>
                          <Button
                            size="sm"
                            onClick={() => addSpecialEffect(effect.id)}
                            disabled={avatar.specialEffects.includes(effect.id)}
                          >
                            {avatar.specialEffects.includes(effect.id) ? "Active" : "Activate"}
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
}
