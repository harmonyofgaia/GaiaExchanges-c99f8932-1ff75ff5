import { useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import {
  Palette,
  Upload,
  Download,
  Settings,
  Image,
  Video,
  FileImage,
  Brush,
  Type,
  Layout,
  Zap,
  Wand2,
  Sparkles,
  Trash2,
  Eye,
  Save,
  RotateCcw,
  Monitor,
  Smartphone,
  Tablet,
} from "lucide-react";
import { toast } from "sonner";

interface MediaFile {
  id: string;
  name: string;
  type: "image" | "video" | "audio";
  url: string;
  size: number;
  uploadDate: Date;
  category: string;
}

interface DesignPreset {
  id: string;
  name: string;
  description: string;
  config: {
    colors: {
      primary: string;
      secondary: string;
      accent: string;
      background: string;
      text: string;
    };
    fonts: {
      heading: string;
      body: string;
      mono: string;
    };
    spacing: {
      container: number;
      padding: number;
      gap: number;
      borderRadius: number;
    };
    effects: {
      shadows: boolean;
      animations: boolean;
      blur: boolean;
      gradient: boolean;
      particles: boolean;
      glow: boolean;
    };
  };
}

export function AdvancedVisualControlsMenu() {
  const [activeTab, setActiveTab] = useState("design");
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([
    {
      id: "img-1",
      name: "hero-background.jpg",
      type: "image",
      url: `https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800`,
      size: 2400000,
      uploadDate: new Date(),
      category: "backgrounds",
    },
    {
      id: "img-2",
      name: "team-photo.png",
      type: "image",
      url: `https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800`,
      size: 1800000,
      uploadDate: new Date(),
      category: "team",
    },
    {
      id: "vid-1",
      name: "intro-video.mp4",
      type: "video",
      url: "#",
      size: 15600000,
      uploadDate: new Date(),
      category: "marketing",
    },
  ]);

  const [designConfig, setDesignConfig] = useState({
    colors: {
      primary: "#00ff00",
      secondary: "#0066cc",
      accent: "#ff6600",
      background: "#000000",
      text: "#ffffff",
    },
    fonts: {
      heading: "Inter",
      body: "Inter",
      mono: "Fira Code",
    },
    spacing: {
      container: 1200,
      padding: 24,
      gap: 16,
      borderRadius: 8,
    },
    effects: {
      shadows: true,
      animations: true,
      blur: false,
      gradient: true,
      particles: false,
      glow: true,
    },
    layout: {
      device: "desktop",
      sidebar: true,
      header: true,
      footer: true,
    },
  });

  const [designPresets] = useState<DesignPreset[]>([
    {
      id: "neon-dark",
      name: "Neon Dark",
      description: "Futuristic dark theme with neon accents",
      config: {
        colors: {
          primary: "#00ff00",
          secondary: "#00ffff",
          accent: "#ff00ff",
          background: "#000000",
          text: "#ffffff",
        },
        fonts: { heading: "Orbitron", body: "Inter", mono: "Fira Code" },
        spacing: { container: 1400, padding: 32, gap: 24, borderRadius: 12 },
        effects: {
          shadows: true,
          animations: true,
          blur: true,
          gradient: true,
          particles: true,
          glow: true,
        },
      },
    },
    {
      id: "nature-green",
      name: "Nature Green",
      description: "Organic green theme with natural elements",
      config: {
        colors: {
          primary: "#22c55e",
          secondary: "#16a34a",
          accent: "#84cc16",
          background: "#f0fdf4",
          text: "#166534",
        },
        fonts: {
          heading: "Playfair Display",
          body: "Inter",
          mono: "JetBrains Mono",
        },
        spacing: { container: 1200, padding: 24, gap: 16, borderRadius: 16 },
        effects: {
          shadows: true,
          animations: false,
          blur: false,
          gradient: true,
          particles: false,
          glow: false,
        },
      },
    },
    {
      id: "cosmic-purple",
      name: "Cosmic Purple",
      description: "Space-inspired purple galaxy theme",
      config: {
        colors: {
          primary: "#8b5cf6",
          secondary: "#a855f7",
          accent: "#d946ef",
          background: "#0c0a1e",
          text: "#e2e8f0",
        },
        fonts: {
          heading: "Space Grotesk",
          body: "Inter",
          mono: "Source Code Pro",
        },
        spacing: { container: 1300, padding: 28, gap: 20, borderRadius: 10 },
        effects: {
          shadows: true,
          animations: true,
          blur: true,
          gradient: true,
          particles: true,
          glow: true,
        },
      },
    },
  ]);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);

    files.forEach((file) => {
      const newFile: MediaFile = {
        id: `file-${Date.now()}-${Math.random()}`,
        name: file.name,
        type: file.type.startsWith("image/")
          ? "image"
          : file.type.startsWith("video/")
            ? "video"
            : "audio",
        url: URL.createObjectURL(file),
        size: file.size,
        uploadDate: new Date(),
        category: "uploads",
      };

      setMediaFiles((prev) => [...prev, newFile]);
    });

    toast.success(`🎨 Uploaded ${files.length} file(s) to media library`, {
      description: "Files are now available in your design tools",
      duration: 4000,
    });
  };

  const applyDesignPreset = (preset: DesignPreset) => {
    setDesignConfig({
      colors: preset.config.colors,
      fonts: preset.config.fonts,
      spacing: preset.config.spacing,
      effects: preset.config.effects,
      layout: designConfig.layout,
    });

    toast.success(`🎨 Applied ${preset.name} theme!`, {
      description: preset.description,
      duration: 3000,
    });
  };

  const exportDesignConfig = () => {
    const config = JSON.stringify(designConfig, null, 2);
    const blob = new Blob([config], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "design-config.json";
    a.click();
    URL.revokeObjectURL(url);

    toast.success("🎨 Design configuration exported!", {
      description: "Download started for design-config.json",
      duration: 3000,
    });
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case "image":
        return <Image className="h-4 w-4" />;
      case "video":
        return <Video className="h-4 w-4" />;
      default:
        return <FileImage className="h-4 w-4" />;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto p-6 space-y-6">
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-indigo-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-purple-400">
            <Wand2 className="h-8 w-8" />
            🎨 ADVANCED VISUAL CONTROL CENTER
          </CardTitle>
          <p className="text-muted-foreground">
            Never-before-built design control system with media library and
            real-time customization
          </p>
        </CardHeader>
        <CardContent>
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="design">🎨 Design</TabsTrigger>
              <TabsTrigger value="colors">🌈 Colors</TabsTrigger>
              <TabsTrigger value="typography">📝 Typography</TabsTrigger>
              <TabsTrigger value="effects">✨ Effects</TabsTrigger>
              <TabsTrigger value="media">📁 Media Library</TabsTrigger>
              <TabsTrigger value="presets">🎭 Presets</TabsTrigger>
            </TabsList>

            <TabsContent value="design" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-blue-400">
                      <Layout className="h-5 w-5" />
                      Layout Control
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label>Device Preview</Label>
                      <Select
                        value={designConfig.layout.device}
                        onValueChange={(value) =>
                          setDesignConfig((prev) => ({
                            ...prev,
                            layout: { ...prev.layout, device: value },
                          }))
                        }
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="desktop">
                            <Monitor className="h-4 w-4 mr-2 inline" />
                            Desktop
                          </SelectItem>
                          <SelectItem value="tablet">
                            <Tablet className="h-4 w-4 mr-2 inline" />
                            Tablet
                          </SelectItem>
                          <SelectItem value="mobile">
                            <Smartphone className="h-4 w-4 mr-2 inline" />
                            Mobile
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>
                        Container Width: {designConfig.spacing.container}px
                      </Label>
                      <Slider
                        value={[designConfig.spacing.container]}
                        onValueChange={(value) =>
                          setDesignConfig((prev) => ({
                            ...prev,
                            spacing: { ...prev.spacing, container: value[0] },
                          }))
                        }
                        min={800}
                        max={1600}
                        step={50}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>Padding: {designConfig.spacing.padding}px</Label>
                      <Slider
                        value={[designConfig.spacing.padding]}
                        onValueChange={(value) =>
                          setDesignConfig((prev) => ({
                            ...prev,
                            spacing: { ...prev.spacing, padding: value[0] },
                          }))
                        }
                        min={8}
                        max={64}
                        step={4}
                        className="mt-2"
                      />
                    </div>

                    <div>
                      <Label>
                        Border Radius: {designConfig.spacing.borderRadius}px
                      </Label>
                      <Slider
                        value={[designConfig.spacing.borderRadius]}
                        onValueChange={(value) =>
                          setDesignConfig((prev) => ({
                            ...prev,
                            spacing: {
                              ...prev.spacing,
                              borderRadius: value[0],
                            },
                          }))
                        }
                        min={0}
                        max={32}
                        step={2}
                        className="mt-2"
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-400">
                      <Settings className="h-5 w-5" />
                      Component Toggles
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label>Show Sidebar</Label>
                      <Switch
                        checked={designConfig.layout.sidebar}
                        onCheckedChange={(checked) =>
                          setDesignConfig((prev) => ({
                            ...prev,
                            layout: { ...prev.layout, sidebar: checked },
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>Show Header</Label>
                      <Switch
                        checked={designConfig.layout.header}
                        onCheckedChange={(checked) =>
                          setDesignConfig((prev) => ({
                            ...prev,
                            layout: { ...prev.layout, header: checked },
                          }))
                        }
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <Label>Show Footer</Label>
                      <Switch
                        checked={designConfig.layout.footer}
                        onCheckedChange={(checked) =>
                          setDesignConfig((prev) => ({
                            ...prev,
                            layout: { ...prev.layout, footer: checked },
                          }))
                        }
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-orange-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-orange-400">
                      <Zap className="h-5 w-5" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button className="w-full" onClick={exportDesignConfig}>
                      <Download className="h-4 w-4 mr-2" />
                      Export Config
                    </Button>

                    <Button variant="outline" className="w-full">
                      <Save className="h-4 w-4 mr-2" />
                      Save Template
                    </Button>

                    <Button variant="outline" className="w-full">
                      <RotateCcw className="h-4 w-4 mr-2" />
                      Reset to Default
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="colors" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(designConfig.colors).map(
                  ([colorName, colorValue]) => (
                    <Card key={colorName} className="border-purple-500/30">
                      <CardHeader>
                        <CardTitle className="capitalize text-purple-400">
                          {colorName} Color
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div
                          className="w-full h-20 rounded-lg border-2 border-white/20"
                          style={{ backgroundColor: colorValue }}
                        />
                        <Input
                          type="color"
                          value={colorValue}
                          onChange={(e) =>
                            setDesignConfig((prev) => ({
                              ...prev,
                              colors: {
                                ...prev.colors,
                                [colorName]: e.target.value,
                              },
                            }))
                          }
                          className="h-12"
                        />
                        <Input
                          value={colorValue}
                          onChange={(e) =>
                            setDesignConfig((prev) => ({
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
                  ),
                )}
              </div>
            </TabsContent>

            <TabsContent value="typography" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {Object.entries(designConfig.fonts).map(
                  ([fontType, fontValue]) => (
                    <Card key={fontType} className="border-blue-500/30">
                      <CardHeader>
                        <CardTitle className="capitalize text-blue-400">
                          {fontType} Font
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <Select
                          value={fontValue}
                          onValueChange={(value) =>
                            setDesignConfig((prev) => ({
                              ...prev,
                              fonts: { ...prev.fonts, [fontType]: value },
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Inter">Inter</SelectItem>
                            <SelectItem value="Roboto">Roboto</SelectItem>
                            <SelectItem value="Open Sans">Open Sans</SelectItem>
                            <SelectItem value="Playfair Display">
                              Playfair Display
                            </SelectItem>
                            <SelectItem value="Space Grotesk">
                              Space Grotesk
                            </SelectItem>
                            <SelectItem value="Orbitron">Orbitron</SelectItem>
                            <SelectItem value="Fira Code">Fira Code</SelectItem>
                            <SelectItem value="JetBrains Mono">
                              JetBrains Mono
                            </SelectItem>
                          </SelectContent>
                        </Select>

                        <div className="p-4 bg-black/20 rounded-lg">
                          <div
                            style={{ fontFamily: fontValue }}
                            className="text-lg"
                          >
                            {fontType === "heading" && "Sample Heading Text"}
                            {fontType === "body" &&
                              "Sample body text for reading"}
                            {fontType === "mono" && 'const code = "sample";'}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ),
                )}
              </div>
            </TabsContent>

            <TabsContent value="effects" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Object.entries(designConfig.effects).map(
                  ([effectName, effectValue]) => (
                    <Card key={effectName} className="border-yellow-500/30">
                      <CardHeader>
                        <CardTitle className="capitalize text-yellow-400 flex items-center gap-2">
                          <Sparkles className="h-5 w-5" />
                          {effectName}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="flex items-center justify-between">
                          <Label className="capitalize">
                            {effectName.replace(/([A-Z])/g, " $1")}
                          </Label>
                          <Switch
                            checked={effectValue}
                            onCheckedChange={(checked) =>
                              setDesignConfig((prev) => ({
                                ...prev,
                                effects: {
                                  ...prev.effects,
                                  [effectName]: checked,
                                },
                              }))
                            }
                          />
                        </div>

                        <div className="text-sm text-muted-foreground">
                          {effectName === "shadows" &&
                            "Adds depth with drop shadows"}
                          {effectName === "animations" &&
                            "Enables smooth transitions"}
                          {effectName === "blur" && "Background blur effects"}
                          {effectName === "gradient" && "Gradient backgrounds"}
                          {effectName === "particles" &&
                            "Animated particle system"}
                          {effectName === "glow" && "Neon glow effects"}
                        </div>
                      </CardContent>
                    </Card>
                  ),
                )}
              </div>
            </TabsContent>

            <TabsContent value="media" className="space-y-6 mt-6">
              <Card className="border-cyan-500/30">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-cyan-400">
                    <Upload className="h-6 w-6" />
                    Media Library & Upload Center
                  </CardTitle>
                  <p className="text-muted-foreground">
                    Upload and manage images, videos, and other media files
                  </p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div
                    className="border-2 border-dashed border-cyan-500/30 rounded-lg p-8 text-center cursor-pointer hover:border-cyan-500/50 transition-colors"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    <Upload className="h-12 w-12 mx-auto text-cyan-400 mb-4" />
                    <div className="text-lg font-bold text-cyan-400 mb-2">
                      Drop files here or click to upload
                    </div>
                    <div className="text-muted-foreground">
                      Supports PNG, JPG, GIF, MP4, WebM, and more
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*,video/*,audio/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {mediaFiles.map((file) => (
                      <Card
                        key={file.id}
                        className="border-gray-500/30 hover:border-cyan-500/50 transition-colors"
                      >
                        <CardContent className="p-4">
                          <div className="aspect-video bg-black/20 rounded-lg mb-3 flex items-center justify-center overflow-hidden">
                            {file.type === "image" ? (
                              <img
                                src={file.url}
                                alt={file.name}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="text-center">
                                {getFileIcon(file.type)}
                                <div className="text-xs mt-1">
                                  {file.type.toUpperCase()}
                                </div>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <div className="font-semibold text-sm truncate">
                              {file.name}
                            </div>
                            <div className="flex items-center justify-between text-xs text-muted-foreground">
                              <Badge variant="outline" className="text-xs">
                                {file.category}
                              </Badge>
                              <span>{formatFileSize(file.size)}</span>
                            </div>

                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1"
                              >
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="flex-1"
                              >
                                <Download className="h-3 w-3 mr-1" />
                                Use
                              </Button>
                              <Button size="sm" variant="destructive">
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="presets" className="space-y-6 mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {designPresets.map((preset) => (
                  <Card
                    key={preset.id}
                    className="border-indigo-500/30 hover:border-indigo-500/50 transition-colors cursor-pointer"
                  >
                    <CardHeader>
                      <CardTitle className="text-indigo-400">
                        {preset.name}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground">
                        {preset.description}
                      </p>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex gap-2">
                        {Object.values(preset.config.colors)
                          .slice(0, 5)
                          .map((color, index) => (
                            <div
                              key={index}
                              className="w-8 h-8 rounded-full border-2 border-white/20"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                      </div>

                      <div className="space-y-2 text-xs">
                        <div>Font: {preset.config.fonts.heading}</div>
                        <div>
                          Container: {preset.config.spacing.container}px
                        </div>
                        <div>
                          Effects:{" "}
                          {
                            Object.values(preset.config.effects).filter(Boolean)
                              .length
                          }{" "}
                          enabled
                        </div>
                      </div>

                      <Button
                        className="w-full"
                        onClick={() => applyDesignPreset(preset)}
                      >
                        <Brush className="h-4 w-4 mr-2" />
                        Apply Preset
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
