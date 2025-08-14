import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  X,
  Palette,
  Brush,
  Settings,
  Wand2,
  Download,
  Upload,
  Save,
  RotateCcw,
  Monitor,
  Smartphone,
  Tablet,
  Zap,
  Sparkles,
  Eye,
  Layers,
  Type,
  Image,
  Video,
  Music,
  Grid,
  Star,
  Heart,
  Cpu,
  Gamepad2,
  Camera,
  MousePointer,
  Headphones,
  Lock,
  Unlock,
  Maximize,
  Minimize,
} from "lucide-react";
import { toast } from "sonner";

interface FullVisualControlPanelProps {
  isOpen: boolean;
  onClose: () => void;
  activeEffects: {
    particles: boolean;
    glow: boolean;
    blur: boolean;
    rainbow: boolean;
    matrix: boolean;
    pulse: boolean;
  };
  onEffectToggle: (effect: string) => void;
}

interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
  };
  effects: {
    blur: number;
    brightness: number;
    contrast: number;
    saturation: number;
    hue: number;
    opacity: number;
  };
  animation: {
    speed: number;
    intensity: number;
    enabled: boolean;
  };
  layout: {
    spacing: number;
    borderRadius: number;
    fontSize: number;
    lineHeight: number;
  };
}

export function FullVisualControlPanel({
  isOpen,
  onClose,
  activeEffects,
  onEffectToggle,
}: FullVisualControlPanelProps) {
  const [activeTab, setActiveTab] = useState("effects");
  const [isMaximized, setIsMaximized] = useState(false);
  const [themeConfig, setThemeConfig] = useState<ThemeConfig>({
    colors: {
      primary: "#00ff00",
      secondary: "#0066cc",
      accent: "#ff6600",
      background: "#000000",
      foreground: "#ffffff",
      muted: "#666666",
      border: "#333333",
    },
    effects: {
      blur: 0,
      brightness: 100,
      contrast: 100,
      saturation: 100,
      hue: 0,
      opacity: 100,
    },
    animation: {
      speed: 1,
      intensity: 50,
      enabled: true,
    },
    layout: {
      spacing: 16,
      borderRadius: 8,
      fontSize: 16,
      lineHeight: 1.5,
    },
  });

  const [customCSS, setCustomCSS] = useState("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setMediaFiles((prev) => [...prev, ...files]);
    toast.success(`Uploaded ${files.length} file(s)`, {
      description: "Files added to media library",
      duration: 2000,
    });
  };

  const applyCustomCSS = () => {
    if (customCSS.trim()) {
      // Create or update custom style element
      let styleElement = document.getElementById("gaia-custom-styles") as HTMLStyleElement;
      if (!styleElement) {
        styleElement = document.createElement("style");
        styleElement.id = "gaia-custom-styles";
        document.head.appendChild(styleElement);
      }
      styleElement.textContent = customCSS;
      toast.success("Custom CSS applied!", {
        description: "Your custom styles are now active",
        duration: 3000,
      });
    }
  };

  const resetTheme = () => {
    setThemeConfig({
      colors: {
        primary: "#00ff00",
        secondary: "#0066cc",
        accent: "#ff6600",
        background: "#000000",
        foreground: "#ffffff",
        muted: "#666666",
        border: "#333333",
      },
      effects: {
        blur: 0,
        brightness: 100,
        contrast: 100,
        saturation: 100,
        hue: 0,
        opacity: 100,
      },
      animation: {
        speed: 1,
        intensity: 50,
        enabled: true,
      },
      layout: {
        spacing: 16,
        borderRadius: 8,
        fontSize: 16,
        lineHeight: 1.5,
      },
    });
    setCustomCSS("");
    toast.success("Theme reset to defaults", {
      description: "All customizations have been cleared",
      duration: 2000,
    });
  };

  const exportTheme = () => {
    const exportData = {
      config: themeConfig,
      effects: activeEffects,
      customCSS,
      timestamp: new Date().toISOString(),
      version: "2.0",
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gaia-master-theme-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Master theme exported!", {
      description: "Complete theme configuration downloaded",
      duration: 3000,
    });
  };

  const presetThemes = [
    {
      name: "Neon Cyberpunk",
      colors: {
        primary: "#00ff41",
        secondary: "#ff0080",
        accent: "#ffff00",
        background: "#0a0a0a",
        foreground: "#ffffff",
        muted: "#404040",
        border: "#00ff41",
      },
    },
    {
      name: "Ocean Deep",
      colors: {
        primary: "#0066cc",
        secondary: "#00ccff",
        accent: "#66ccff",
        background: "#001122",
        foreground: "#ffffff",
        muted: "#336699",
        border: "#0066cc",
      },
    },
    {
      name: "Forest Dream",
      colors: {
        primary: "#22c55e",
        secondary: "#16a34a",
        accent: "#84cc16",
        background: "#0f1a0f",
        foreground: "#ffffff",
        muted: "#4a7c59",
        border: "#22c55e",
      },
    },
    {
      name: "Solar Flare",
      colors: {
        primary: "#ff6600",
        secondary: "#ff9933",
        accent: "#ffcc00",
        background: "#1a0f00",
        foreground: "#ffffff",
        muted: "#995c33",
        border: "#ff6600",
      },
    },
  ];

  const applyPreset = (preset: (typeof presetThemes)[0]) => {
    setThemeConfig((prev) => ({ ...prev, colors: preset.colors }));
    toast.success(`Applied ${preset.name} theme!`, {
      description: "Color scheme updated",
      duration: 2000,
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div
        className={`bg-background/98 backdrop-blur-md border border-primary/30 rounded-xl shadow-2xl overflow-hidden transition-all duration-300 ${
          isMaximized ? "w-full h-full" : "max-w-7xl w-full max-h-[95vh]"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-primary/20 bg-gradient-to-r from-purple-900/30 to-indigo-900/30">
          <div className="flex items-center gap-3">
            <Wand2 className="h-8 w-8 text-purple-400" />
            <div>
              <h2 className="text-2xl font-bold text-primary">Master Visual Control Panel</h2>
              <p className="text-sm text-muted-foreground">
                Complete interface customization suite
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMaximized(!isMaximized)}
              className="text-muted-foreground hover:text-primary"
            >
              {isMaximized ? <Minimize className="h-4 w-4" /> : <Maximize className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-muted-foreground hover:text-primary"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <div
          className="overflow-y-auto"
          style={{
            maxHeight: isMaximized ? "calc(100vh - 80px)" : "calc(95vh - 80px)",
          }}
        >
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-7 m-4">
              <TabsTrigger value="effects" className="flex items-center gap-2">
                <Sparkles className="h-4 w-4" />
                Effects
              </TabsTrigger>
              <TabsTrigger value="colors" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                Colors
              </TabsTrigger>
              <TabsTrigger value="layout" className="flex items-center gap-2">
                <Grid className="h-4 w-4" />
                Layout
              </TabsTrigger>
              <TabsTrigger value="media" className="flex items-center gap-2">
                <Image className="h-4 w-4" />
                Media
              </TabsTrigger>
              <TabsTrigger value="advanced" className="flex items-center gap-2">
                <Cpu className="h-4 w-4" />
                Advanced
              </TabsTrigger>
              <TabsTrigger value="presets" className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Presets
              </TabsTrigger>
              <TabsTrigger value="css" className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Custom CSS
              </TabsTrigger>
            </TabsList>

            <div className="p-6">
              <TabsContent value="effects" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Visual Effects */}
                  <Card className="border-purple-500/30">
                    <CardHeader>
                      <CardTitle className="text-purple-400 flex items-center gap-2">
                        <Zap className="h-5 w-5" />
                        Visual Effects
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      {Object.entries(activeEffects).map(([effect, enabled]) => (
                        <div key={effect} className="flex items-center justify-between">
                          <Label className="capitalize">{effect}</Label>
                          <Switch
                            checked={enabled}
                            onCheckedChange={() => onEffectToggle(effect)}
                          />
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  {/* Filter Effects */}
                  <Card className="border-blue-500/30">
                    <CardHeader>
                      <CardTitle className="text-blue-400 flex items-center gap-2">
                        <Eye className="h-5 w-5" />
                        Filter Effects
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Blur: {themeConfig.effects.blur}px</Label>
                        <Slider
                          value={[themeConfig.effects.blur]}
                          onValueChange={(value) =>
                            setThemeConfig((prev) => ({
                              ...prev,
                              effects: { ...prev.effects, blur: value[0] },
                            }))
                          }
                          max={20}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label>Brightness: {themeConfig.effects.brightness}%</Label>
                        <Slider
                          value={[themeConfig.effects.brightness]}
                          onValueChange={(value) =>
                            setThemeConfig((prev) => ({
                              ...prev,
                              effects: {
                                ...prev.effects,
                                brightness: value[0],
                              },
                            }))
                          }
                          max={200}
                          min={10}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label>Contrast: {themeConfig.effects.contrast}%</Label>
                        <Slider
                          value={[themeConfig.effects.contrast]}
                          onValueChange={(value) =>
                            setThemeConfig((prev) => ({
                              ...prev,
                              effects: { ...prev.effects, contrast: value[0] },
                            }))
                          }
                          max={200}
                          min={10}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label>Saturation: {themeConfig.effects.saturation}%</Label>
                        <Slider
                          value={[themeConfig.effects.saturation]}
                          onValueChange={(value) =>
                            setThemeConfig((prev) => ({
                              ...prev,
                              effects: {
                                ...prev.effects,
                                saturation: value[0],
                              },
                            }))
                          }
                          max={200}
                          min={0}
                          className="mt-2"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  {/* Animation Controls */}
                  <Card className="border-green-500/30">
                    <CardHeader>
                      <CardTitle className="text-green-400 flex items-center gap-2">
                        <Heart className="h-5 w-5" />
                        Animation
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Enable Animations</Label>
                        <Switch
                          checked={themeConfig.animation.enabled}
                          onCheckedChange={(checked) =>
                            setThemeConfig((prev) => ({
                              ...prev,
                              animation: {
                                ...prev.animation,
                                enabled: checked,
                              },
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label>Speed: {themeConfig.animation.speed}x</Label>
                        <Slider
                          value={[themeConfig.animation.speed]}
                          onValueChange={(value) =>
                            setThemeConfig((prev) => ({
                              ...prev,
                              animation: { ...prev.animation, speed: value[0] },
                            }))
                          }
                          max={5}
                          min={0.1}
                          step={0.1}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label>Intensity: {themeConfig.animation.intensity}%</Label>
                        <Slider
                          value={[themeConfig.animation.intensity]}
                          onValueChange={(value) =>
                            setThemeConfig((prev) => ({
                              ...prev,
                              animation: {
                                ...prev.animation,
                                intensity: value[0],
                              },
                            }))
                          }
                          max={100}
                          className="mt-2"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="colors" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Object.entries(themeConfig.colors).map(([colorName, colorValue]) => (
                    <Card key={colorName} className="border-purple-500/30">
                      <CardHeader>
                        <CardTitle className="capitalize text-purple-400">{colorName}</CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div
                          className="w-full h-16 rounded-lg border-2 border-white/20"
                          style={{ backgroundColor: colorValue }}
                        />
                        <Input
                          type="color"
                          value={colorValue}
                          onChange={(e) =>
                            setThemeConfig((prev) => ({
                              ...prev,
                              colors: {
                                ...prev.colors,
                                [colorName]: e.target.value,
                              },
                            }))
                          }
                          className="h-10"
                        />
                        <Input
                          value={colorValue}
                          onChange={(e) =>
                            setThemeConfig((prev) => ({
                              ...prev,
                              colors: {
                                ...prev.colors,
                                [colorName]: e.target.value,
                              },
                            }))
                          }
                          placeholder="#000000"
                        />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="layout" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-blue-500/30">
                    <CardHeader>
                      <CardTitle className="text-blue-400 flex items-center gap-2">
                        <Grid className="h-5 w-5" />
                        Layout Settings
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Spacing: {themeConfig.layout.spacing}px</Label>
                        <Slider
                          value={[themeConfig.layout.spacing]}
                          onValueChange={(value) =>
                            setThemeConfig((prev) => ({
                              ...prev,
                              layout: { ...prev.layout, spacing: value[0] },
                            }))
                          }
                          max={64}
                          min={4}
                          step={2}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label>Border Radius: {themeConfig.layout.borderRadius}px</Label>
                        <Slider
                          value={[themeConfig.layout.borderRadius]}
                          onValueChange={(value) =>
                            setThemeConfig((prev) => ({
                              ...prev,
                              layout: {
                                ...prev.layout,
                                borderRadius: value[0],
                              },
                            }))
                          }
                          max={32}
                          step={1}
                          className="mt-2"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-green-500/30">
                    <CardHeader>
                      <CardTitle className="text-green-400 flex items-center gap-2">
                        <Type className="h-5 w-5" />
                        Typography
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>Font Size: {themeConfig.layout.fontSize}px</Label>
                        <Slider
                          value={[themeConfig.layout.fontSize]}
                          onValueChange={(value) =>
                            setThemeConfig((prev) => ({
                              ...prev,
                              layout: { ...prev.layout, fontSize: value[0] },
                            }))
                          }
                          max={24}
                          min={12}
                          className="mt-2"
                        />
                      </div>
                      <div>
                        <Label>Line Height: {themeConfig.layout.lineHeight}</Label>
                        <Slider
                          value={[themeConfig.layout.lineHeight]}
                          onValueChange={(value) =>
                            setThemeConfig((prev) => ({
                              ...prev,
                              layout: { ...prev.layout, lineHeight: value[0] },
                            }))
                          }
                          max={3}
                          min={1}
                          step={0.1}
                          className="mt-2"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="media" className="space-y-6">
                <Card className="border-orange-500/30">
                  <CardHeader>
                    <CardTitle className="text-orange-400 flex items-center gap-2">
                      <Image className="h-5 w-5" />
                      Media Library
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex gap-4">
                      <Button onClick={() => fileInputRef.current?.click()}>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Media
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        multiple
                        accept="image/*,video/*,audio/*"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                    </div>
                    {mediaFiles.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {mediaFiles.map((file, index) => (
                          <div key={index} className="border border-muted rounded-lg p-3">
                            <div className="text-sm text-muted-foreground truncate">
                              {file.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {(file.size / 1024).toFixed(1)} KB
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="border-red-500/30">
                    <CardHeader>
                      <CardTitle className="text-red-400 flex items-center gap-2">
                        <Cpu className="h-5 w-5" />
                        Performance
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>Hardware Acceleration</Label>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Reduce Motion</Label>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>High DPI Support</Label>
                        <Switch defaultChecked />
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-yellow-500/30">
                    <CardHeader>
                      <CardTitle className="text-yellow-400 flex items-center gap-2">
                        <Gamepad2 className="h-5 w-5" />
                        Experimental
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label>3D Interface</Label>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>Spatial Audio</Label>
                        <Switch />
                      </div>
                      <div className="flex items-center justify-between">
                        <Label>AI Assistance</Label>
                        <Switch />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="presets" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {presetThemes.map((preset, index) => (
                    <Card
                      key={index}
                      className="border-purple-500/30 cursor-pointer hover:bg-purple-500/5"
                      onClick={() => applyPreset(preset)}
                    >
                      <CardHeader>
                        <CardTitle className="text-purple-400">{preset.name}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex gap-2 mb-4">
                          {Object.values(preset.colors)
                            .slice(0, 5)
                            .map((color, i) => (
                              <div
                                key={i}
                                className="w-8 h-8 rounded-full border border-white/20"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                        </div>
                        <Button className="w-full">Apply Theme</Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="css" className="space-y-6">
                <Card className="border-indigo-500/30">
                  <CardHeader>
                    <CardTitle className="text-indigo-400 flex items-center gap-2">
                      <Settings className="h-5 w-5" />
                      Custom CSS Editor
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      value={customCSS}
                      onChange={(e) => setCustomCSS(e.target.value)}
                      placeholder="Enter your custom CSS here..."
                      className="min-h-[300px] font-mono"
                    />
                    <div className="flex gap-2">
                      <Button onClick={applyCustomCSS}>
                        <Wand2 className="h-4 w-4 mr-2" />
                        Apply CSS
                      </Button>
                      <Button variant="outline" onClick={() => setCustomCSS("")}>
                        Clear
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Footer Actions */}
        <div className="border-t border-primary/20 p-6 bg-gradient-to-r from-purple-900/20 to-indigo-900/20">
          <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={exportTheme} className="bg-purple-600 hover:bg-purple-700">
              <Download className="h-4 w-4 mr-2" />
              Export Complete Theme
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import Theme
            </Button>
            <Button variant="outline">
              <Save className="h-4 w-4 mr-2" />
              Save as Preset
            </Button>
            <Button variant="outline" onClick={resetTheme}>
              <RotateCcw className="h-4 w-4 mr-2" />
              Reset All
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
