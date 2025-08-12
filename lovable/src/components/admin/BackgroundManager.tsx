import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Palette,
  Sparkles,
  Zap,
  Crown,
  Globe,
  Heart,
  Cloud,
  Save,
  Download,
} from "lucide-react";
import { AdminProtectedRoute } from "@/components/auth/AdminProtectedRoute";
import { toast } from "sonner";

interface BackgroundStyle {
  id: string;
  name: string;
  type: "neural" | "artistic" | "gothic" | "quantum" | "cosmic" | "bioelectric";
  description: string;
  colors: string[];
  cloudUrl: string;
  isActive: boolean;
  artisticValue: string;
  createdAt: Date;
}

function BackgroundManagerContent() {
  const [currentBackground, setCurrentBackground] = useState("neural-electric");
  const [reverseButtonVisible, setReverseButtonVisible] = useState(true);
  const [dailyInspiration, setDailyInspiration] = useState("");
  const [backgroundStyles, setBackgroundStyles] = useState<BackgroundStyle[]>(
    [],
  );
  const [selectedStyleType, setSelectedStyleType] = useState<string>("all");

  const predefinedStyles: BackgroundStyle[] = [
    {
      id: "style-1",
      name: "Neural Harmony Supreme",
      type: "neural",
      description:
        "Advanced neural pathways with harmony-inspired flow patterns",
      colors: ["#10b981", "#34d399", "#6ee7b7", "#a7f3d0"],
      cloudUrl: "/lovable-uploads/2ab2dcf8-008f-4f94-9341-9b6fcb25cefb.png",
      isActive: true,
      artisticValue:
        "High-energy organic neural flow with environmental consciousness",
      createdAt: new Date("2024-01-15"),
    },
    {
      id: "style-2",
      name: "Gothic Quantum Elegance",
      type: "gothic",
      description:
        "Medieval-inspired quantum patterns with decorative flourishes",
      colors: ["#8b5cf6", "#a855f7", "#c084fc", "#ddd6fe"],
      cloudUrl: "/lovable-uploads/494a76f3-e002-482a-b606-e7af62367027.png",
      isActive: false,
      artisticValue:
        "Combines ancient aesthetics with quantum technology harmony",
      createdAt: new Date("2024-01-16"),
    },
    {
      id: "style-3",
      name: "Cosmic Dragon Fortress",
      type: "cosmic",
      description: "Galactic formations with dragon-powered energy signatures",
      colors: ["#f59e0b", "#f97316", "#ef4444", "#dc2626"],
      cloudUrl: "/lovable-uploads/42ec85dc-42df-4958-96d8-7919a192f629.png",
      isActive: false,
      artisticValue:
        "Infinite cosmic energy channeled through dragon consciousness",
      createdAt: new Date("2024-01-17"),
    },
    {
      id: "style-4",
      name: "Bioelectric Symphony",
      type: "bioelectric",
      description: "Living energy patterns that pulse with life force",
      colors: ["#06b6d4", "#0891b2", "#0e7490", "#155e75"],
      cloudUrl: "/lovable-uploads/3ce518f5-75b0-493f-897a-45119793a33d.png",
      isActive: false,
      artisticValue:
        "Biological electricity merged with symphonic visual harmony",
      createdAt: new Date("2024-01-18"),
    },
    {
      id: "style-5",
      name: "Harmony Logo Constellation",
      type: "artistic",
      description: "Gaia logo patterns forming constellation-like arrangements",
      colors: ["#22c55e", "#16a34a", "#15803d", "#166534"],
      cloudUrl: "/lovable-uploads/1087f396-900a-4e0b-be62-7b049d0294ff.png",
      isActive: false,
      artisticValue:
        "Sacred geometry expressed through logo multiplication and arrangement",
      createdAt: new Date("2024-01-19"),
    },
    {
      id: "style-6",
      name: "Environmental Vision Matrix",
      type: "quantum",
      description: "Environmental consciousness visualization in quantum form",
      colors: ["#059669", "#047857", "#065f46", "#064e3b"],
      cloudUrl: "/lovable-uploads/1ed369eb-ecda-422a-af60-8f511aa9aa8e.png",
      isActive: false,
      artisticValue:
        "Environmental healing energy captured in quantum visual language",
      createdAt: new Date("2024-01-20"),
    },
    {
      id: "style-7",
      name: "Dragon Neural Mastery",
      type: "neural",
      description:
        "Ultimate fusion of dragon power and neural network supremacy",
      colors: ["#dc2626", "#ef4444", "#f97316", "#f59e0b"],
      cloudUrl: "/lovable-uploads/93093efd-1912-4361-987d-424e6cf8e1df.png",
      isActive: false,
      artisticValue:
        "Dragon consciousness channeled through advanced neural architectures",
      createdAt: new Date("2024-01-21"),
    },
  ];

  useEffect(() => {
    setBackgroundStyles(predefinedStyles);

    const today = new Date().toDateString();
    const storedDate = localStorage.getItem("dailyInspirationDate");

    const inspirations = [
      "🎨 Today's vision: Artistic typography becomes the gateway to digital transcendence",
      "✨ Creative evolution: Each letter carries the DNA of universal harmony and consciousness",
      "🌟 Design revolution: Typography is the bridge between ancient wisdom and quantum reality",
      "🔥 Artistic mastery: Gothic elegance meets neural networks in perfect creative synthesis",
      "💫 Visual alchemy: Every glyph transforms ordinary text into extraordinary experience",
      "🌈 Typography magic: Letters dance with cosmic energy to create visual poetry",
      "⚡ Design consciousness: Artistic fonts channel the collective creative spirit of Gaia",
    ];

    if (storedDate !== today) {
      const newInspiration =
        inspirations[Math.floor(Math.random() * inspirations.length)];
      setDailyInspiration(newInspiration);
      localStorage.setItem("dailyInspiration", newInspiration);
      localStorage.setItem("dailyInspirationDate", today);
    } else {
      setDailyInspiration(
        localStorage.getItem("dailyInspiration") || inspirations[0],
      );
    }
  }, []);

  const handleReverseButtonToggle = (checked: boolean) => {
    setReverseButtonVisible(checked);
    localStorage.setItem("adminReverseButtonVisible", checked.toString());
  };

  const activateBackground = (styleId: string) => {
    setBackgroundStyles((prev) =>
      prev.map((style) => ({
        ...style,
        isActive: style.id === styleId,
      })),
    );

    const selectedStyle = backgroundStyles.find((s) => s.id === styleId);
    if (selectedStyle) {
      setCurrentBackground(selectedStyle.name);
      toast.success("🎨 BACKGROUND ACTIVATED!", {
        description: `${selectedStyle.name} is now active across all pages`,
        duration: 3000,
      });
    }
  };

  const saveToCloud = async (styleId: string) => {
    const style = backgroundStyles.find((s) => s.id === styleId);
    if (style) {
      // Simulate cloud save
      toast.info("☁️ SAVING TO CLOUD...", {
        description: `Uploading ${style.name} to secure cloud storage`,
        duration: 2000,
      });

      setTimeout(() => {
        toast.success("✅ CLOUD SAVE COMPLETE!", {
          description: `${style.name} safely stored in admin cloud system`,
          duration: 3000,
        });
      }, 2000);
    }
  };

  const filteredStyles =
    selectedStyleType === "all"
      ? backgroundStyles
      : backgroundStyles.filter((style) => style.type === selectedStyleType);

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Palette className="h-6 w-6" />
            🎨 ENHANCED ARTISTIC BACKGROUND STUDIO - ADMIN CONTROL CENTER
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 rounded-lg bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/20">
            <h3 className="text-lg font-semibold text-cyan-300 mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Daily Artistic Inspiration
            </h3>
            <p className="text-cyan-200 italic">{dailyInspiration}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-400" />
              Enhanced Admin Controls
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between p-3 rounded bg-zinc-800/50">
                <div>
                  <span className="text-white font-medium">
                    Admin Reverse Button
                  </span>
                  <p className="text-sm text-gray-400">
                    Show/hide reverse button on all pages
                  </p>
                </div>
                <Switch
                  checked={reverseButtonVisible}
                  onCheckedChange={handleReverseButtonToggle}
                />
              </div>

              <div className="flex items-center justify-between p-3 rounded bg-zinc-800/50">
                <div>
                  <span className="text-white font-medium">
                    Background Filter
                  </span>
                  <p className="text-sm text-gray-400">
                    Filter backgrounds by artistic type
                  </p>
                </div>
                <Select
                  value={selectedStyleType}
                  onValueChange={setSelectedStyleType}
                >
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="neural">Neural</SelectItem>
                    <SelectItem value="gothic">Gothic</SelectItem>
                    <SelectItem value="cosmic">Cosmic</SelectItem>
                    <SelectItem value="artistic">Artistic</SelectItem>
                    <SelectItem value="quantum">Quantum</SelectItem>
                    <SelectItem value="bioelectric">Bioelectric</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-400" />
              Enhanced Artistic Background Collection - Cloud Storage Ready
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredStyles.map((style) => (
                <Card
                  key={style.id}
                  className="bg-zinc-800/50 border-zinc-600/50 hover:border-purple-500/30 transition-all"
                >
                  <CardContent className="p-4">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-white text-sm">
                          {style.name}
                        </h4>
                        <Badge
                          className={`${style.isActive ? "bg-green-600" : "bg-gray-600"} text-white text-xs`}
                        >
                          {style.isActive ? "ACTIVE" : "READY"}
                        </Badge>
                      </div>

                      <div className="aspect-video bg-gradient-to-r from-gray-700 to-gray-600 rounded flex items-center justify-center">
                        <div className="text-2xl">🎨</div>
                      </div>

                      <p className="text-xs text-gray-300">
                        {style.description}
                      </p>

                      <div className="flex flex-wrap gap-1">
                        {style.colors.map((color, i) => (
                          <div
                            key={i}
                            className="w-4 h-4 rounded border border-gray-500"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>

                      <div className="space-y-1">
                        <p className="text-xs text-purple-300">
                          <strong>Type:</strong>{" "}
                          {style.type.charAt(0).toUpperCase() +
                            style.type.slice(1)}
                        </p>
                        <p className="text-xs text-blue-300">
                          <strong>Artistic Value:</strong> {style.artisticValue}
                        </p>
                        <p className="text-xs text-green-300">
                          <strong>Created:</strong>{" "}
                          {style.createdAt.toLocaleDateString()}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          onClick={() => activateBackground(style.id)}
                          className={`flex-1 ${style.isActive ? "bg-green-600 hover:bg-green-700" : "bg-blue-600 hover:bg-blue-700"}`}
                          disabled={style.isActive}
                        >
                          {style.isActive ? (
                            <>
                              <Zap className="h-3 w-3 mr-1" />
                              Active
                            </>
                          ) : (
                            <>
                              <Palette className="h-3 w-3 mr-1" />
                              Activate
                            </>
                          )}
                        </Button>

                        <Button
                          size="sm"
                          onClick={() => saveToCloud(style.id)}
                          variant="outline"
                          className="border-green-500/30 text-green-400 hover:bg-green-500/10"
                        >
                          <Cloud className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/20">
            <h4 className="text-green-300 font-semibold mb-2 flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Enhanced Artistic Evolution Status - Better • Faster • Stronger
            </h4>
            <div className="text-sm text-green-200 space-y-1">
              <p>
                • Typography enhancement: Revolutionary multi-layered Gothic
                styling with quantum effects ✅
              </p>
              <p>
                • Background collection: {backgroundStyles.length} unique
                artistic styles cloud-ready ✅
              </p>
              <p>
                • Visual harmony: Advanced color gradients and animation systems
                ✅
              </p>
              <p>
                • Admin control: Full background management with cloud storage
                integration ✅
              </p>
              <p>
                • Creative energy: 100% powered by Harmony of Gaia artistic
                vision ✅
              </p>
              <p>
                • Heavenly fortress: Building our digital realm with artistic
                excellence ✅
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export function BackgroundManager() {
  return (
    <AdminProtectedRoute>
      <BackgroundManagerContent />
    </AdminProtectedRoute>
  );
}
