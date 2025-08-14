import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import {
  Heart,
  Leaf,
  TreePine,
  Droplets,
  Zap,
  Star,
  Globe,
  Sun,
  Moon,
  Wind,
  Sparkles,
  Award,
  TrendingUp,
  User,
} from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";
import { toast } from "sonner";

interface GaiaSoulAttributes {
  earthConnection: number;
  waterHarmony: number;
  airAlignment: number;
  fireEnergy: number;
  spiritBalance: number;
  biodiversityAwareness: number;
  carbonNeutrality: number;
  renewableAdoption: number;
}

interface EcoAvatar {
  id: string;
  name: string;
  level: number;
  experience: number;
  attributes: GaiaSoulAttributes;
  unlocked_features: string[];
  spiritual_achievements: string[];
  environmental_impact: number;
  meditation_streak: number;
  last_updated: string;
}

export default function EcoAvatarGaiaSoulSystem() {
  const { user } = useAuth();
  const [avatar, setAvatar] = useState<EcoAvatar | null>(null);
  const [loading, setLoading] = useState(true);
  const [meditating, setMeditating] = useState(false);
  const [selectedElement, setSelectedElement] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      loadOrCreateAvatar();
    }
  }, [user]);

  const loadOrCreateAvatar = async () => {
    try {
      // For now, we'll create a mock avatar since we don't have the table yet
      // This would normally load from the database
      const mockAvatar: EcoAvatar = {
        id: "1",
        name: "Eco Seeker",
        level: 5,
        experience: 2350,
        attributes: {
          earthConnection: 65,
          waterHarmony: 72,
          airAlignment: 58,
          fireEnergy: 45,
          spiritBalance: 80,
          biodiversityAwareness: 90,
          carbonNeutrality: 55,
          renewableAdoption: 40,
        },
        unlocked_features: ["meditation_garden", "element_attunement", "biodiversity_sensing"],
        spiritual_achievements: ["First Meditation", "Earth Attunement", "Water Harmony"],
        environmental_impact: 1250,
        meditation_streak: 7,
        last_updated: new Date().toISOString(),
      };

      setAvatar(mockAvatar);
    } catch (error) {
      console.error("Error loading avatar:", error);
      toast.error("Failed to load avatar");
    } finally {
      setLoading(false);
    }
  };

  const startMeditation = (element: string) => {
    setMeditating(true);
    setSelectedElement(element);

    // Simulate meditation session
    setTimeout(() => {
      if (avatar) {
        const updatedAvatar = { ...avatar };
        const attributeKey = `${element}${
          element === "earth"
            ? "Connection"
            : element === "water"
              ? "Harmony"
              : element === "air"
                ? "Alignment"
                : "Energy"
        }` as keyof GaiaSoulAttributes;

        updatedAvatar.attributes[attributeKey] = Math.min(
          100,
          updatedAvatar.attributes[attributeKey] + 5
        );
        updatedAvatar.experience += 50;
        updatedAvatar.meditation_streak += 1;

        setAvatar(updatedAvatar);
        toast.success(`${element} meditation complete! Attributes increased.`);
      }
      setMeditating(false);
      setSelectedElement(null);
    }, 3000);
  };

  const getElementColor = (element: string) => {
    switch (element) {
      case "earth":
        return "text-green-400";
      case "water":
        return "text-blue-400";
      case "air":
        return "text-cyan-400";
      case "fire":
        return "text-red-400";
      case "spirit":
        return "text-purple-400";
      default:
        return "text-gray-400";
    }
  };

  const getElementIcon = (element: string) => {
    switch (element) {
      case "earth":
        return TreePine;
      case "water":
        return Droplets;
      case "air":
        return Wind;
      case "fire":
        return Zap;
      case "spirit":
        return Star;
      default:
        return Globe;
    }
  };

  const getAvatarLevel = (experience: number) => {
    return Math.floor(experience / 500) + 1;
  };

  const getExperienceProgress = (experience: number) => {
    return ((experience % 500) / 500) * 100;
  };

  const elements = [
    {
      name: "earth",
      label: "Earth Connection",
      description: "Deepen your connection with the Earth",
    },
    {
      name: "water",
      label: "Water Harmony",
      description: "Flow in harmony with water cycles",
    },
    {
      name: "air",
      label: "Air Alignment",
      description: "Align with the breath of the planet",
    },
    {
      name: "fire",
      label: "Fire Energy",
      description: "Channel the transformative power of fire",
    },
    {
      name: "spirit",
      label: "Spirit Balance",
      description: "Balance your spiritual essence",
    },
  ];

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <div className="flex items-center justify-center min-h-96">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400"></div>
        </div>
      </div>
    );
  }

  if (!avatar) {
    return (
      <div className="container mx-auto p-4">
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🌱</div>
          <h3 className="text-xl font-semibold text-muted-foreground mb-2">Avatar not found</h3>
          <p className="text-muted-foreground">
            Unable to load your Eco Avatar. Please try again later.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 space-y-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400 mb-4">
          🌟 Eco Avatar & Gaia Soul System
        </h1>
        <p className="text-xl text-muted-foreground">
          Evolve your spiritual connection with nature through mindful practice
        </p>
      </div>

      {/* Avatar Overview */}
      <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <User className="h-6 w-6" />
            {avatar.name} - Level {avatar.level}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">{avatar.level}</div>
              <div className="text-sm text-muted-foreground">Avatar Level</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{avatar.experience}</div>
              <div className="text-sm text-muted-foreground">Experience Points</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">{avatar.meditation_streak}</div>
              <div className="text-sm text-muted-foreground">Meditation Streak</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400">
                {avatar.environmental_impact}
              </div>
              <div className="text-sm text-muted-foreground">Environmental Impact</div>
            </div>
          </div>

          <div className="mt-6">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Progress to Level {avatar.level + 1}</span>
              <span className="font-medium">{avatar.experience % 500}/500 XP</span>
            </div>
            <Progress value={getExperienceProgress(avatar.experience)} className="h-3" />
          </div>
        </CardContent>
      </Card>

      {/* Elemental Attributes */}
      <Card className="border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Sparkles className="h-5 w-5" />
            Elemental Attributes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(avatar.attributes).map(([key, value]) => {
              const elementName = key.replace(/([A-Z])/g, " $1").toLowerCase();
              const element = elementName.split(" ")[0];
              const ElementIcon = getElementIcon(element);
              const color = getElementColor(element);

              return (
                <div key={key} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <ElementIcon className={`h-4 w-4 ${color}`} />
                      <span className="text-sm font-medium capitalize">{elementName}</span>
                    </div>
                    <span className={`font-bold ${color}`}>{value}%</span>
                  </div>
                  <Progress value={value} className="h-2" />
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Meditation Garden */}
      <Card className="border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Heart className="h-5 w-5" />
            Meditation Garden
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <p className="text-muted-foreground mb-4">
              Choose an element to meditate with and strengthen your connection to nature
            </p>
            {meditating && (
              <div className="mb-4">
                <div className="animate-pulse text-purple-400 mb-2">
                  🧘‍♂️ Meditating with {selectedElement}...
                </div>
                <Progress value={66} className="h-2" />
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {elements.map((element) => {
              const ElementIcon = getElementIcon(element.name);
              const color = getElementColor(element.name);

              return (
                <Card
                  key={element.name}
                  className="border-muted/20 hover:border-purple-500/40 transition-colors"
                >
                  <CardContent className="p-4 text-center">
                    <ElementIcon className={`h-12 w-12 ${color} mx-auto mb-2`} />
                    <h4 className={`font-medium ${color} mb-2`}>{element.label}</h4>
                    <p className="text-xs text-muted-foreground mb-3">{element.description}</p>
                    <Button
                      size="sm"
                      onClick={() => startMeditation(element.name)}
                      disabled={meditating}
                      className="w-full"
                    >
                      {meditating && selectedElement === element.name
                        ? "Meditating..."
                        : "Meditate"}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Spiritual Achievements */}
      <Card className="border-yellow-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-yellow-400">
            <Award className="h-5 w-5" />
            Spiritual Achievements
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {avatar.spiritual_achievements.map((achievement, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg border border-yellow-500/30 bg-yellow-900/20"
              >
                <Award className="h-6 w-6 text-yellow-400" />
                <div>
                  <h4 className="font-medium text-yellow-400">{achievement}</h4>
                  <p className="text-xs text-muted-foreground">Spiritual milestone reached</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Unlocked Features */}
      <Card className="border-green-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Star className="h-5 w-5" />
            Unlocked Features
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {avatar.unlocked_features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-lg border border-green-500/30 bg-green-900/20"
              >
                <Star className="h-6 w-6 text-green-400" />
                <div>
                  <h4 className="font-medium text-green-400 capitalize">
                    {feature.replace("_", " ")}
                  </h4>
                  <p className="text-xs text-muted-foreground">Feature unlocked</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Gaia Soul Essence */}
      <Card className="border-indigo-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-indigo-400">
            <Globe className="h-5 w-5" />
            Gaia Soul Essence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 rounded-full border-4 border-indigo-500/30 animate-pulse"></div>
              <div
                className="absolute inset-2 rounded-full border-2 border-green-500/30 animate-pulse"
                style={{ animationDelay: "0.5s" }}
              ></div>
              <div
                className="absolute inset-4 rounded-full border border-blue-500/30 animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe className="h-16 w-16 text-indigo-400" />
              </div>
            </div>
            <div>
              <h3 className="text-xl font-bold text-indigo-400 mb-2">Soul Resonance: Harmony</h3>
              <p className="text-sm text-muted-foreground">
                Your soul is in harmony with Gaia's frequencies. Continue your spiritual journey to
                unlock deeper connections with the natural world.
              </p>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <div className="text-green-400 font-bold">Earth</div>
                <div className="text-muted-foreground">Aligned</div>
              </div>
              <div>
                <div className="text-blue-400 font-bold">Water</div>
                <div className="text-muted-foreground">Flowing</div>
              </div>
              <div>
                <div className="text-purple-400 font-bold">Spirit</div>
                <div className="text-muted-foreground">Awakened</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
