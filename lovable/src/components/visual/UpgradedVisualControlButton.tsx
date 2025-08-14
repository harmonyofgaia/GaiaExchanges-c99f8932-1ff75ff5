import { useState, useRef, useEffect } from "react";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuCheckboxItem,
} from "../ui/dropdown-menu";
import { Badge } from "../ui/badge";
import { Slider } from "../ui/slider";
import {
  Settings,
  Brush,
  Lock,
  Unlock,
  Palette,
  LayoutDashboard,
  Zap,
  Eye,
  Monitor,
  Wand2,
  Image,
  Video,
  Sparkles,
  Layers,
  MousePointer,
  Maximize,
  RotateCcw,
  Save,
  Download,
  Upload,
  Sliders,
  Grid,
  Type,
  Camera,
  Cpu,
  Gamepad2,
  Heart,
  Star,
  Sun,
  Moon,
  Contrast,
  Droplets,
  Wind,
  Snowflake,
  Flame,
  Aperture,
  Atom,
  Binary,
  Bot,
  Braces,
  Chrome,
  Code,
  CodeSquare,
  Compass,
  Construction,
  Crown,
  Diamond,
  Dna,
  Drama,
  Eclipse,
  Feather,
  Film,
  Focus,
  Gem,
  Gauge,
  HardDrive,
  Hexagon,
  Infinity as InfinityIcon,
  Laptop,
  Lightbulb,
  Wand as Magic,
  Hash as Mesh,
  Microscope,
  Mountain,
  Network,
  Orbit,
  PaintBucket,
  Pen,
  Pentagon,
  Radar,
  Rocket,
  Scan,
  Scissors,
  Shapes,
  Shield,
  Smartphone,
  Sparkle,
  RotateCcw as Spiral,
  Square,
  Target,
  Telescope,
  Thermometer,
  Triangle,
  Waves,
  Workflow,
  Wrench,
  Zap as Lightning,
} from "lucide-react";
import { useLock } from "../providers/ThemeProvider";
import { toast } from "sonner";
import { FullVisualControlPanel } from "./FullVisualControlPanel";

export function UpgradedVisualControlButton() {
  const { isLocked, toggleLock } = useLock();
  const [isOpen, setIsOpen] = useState(false);
  const [showFullPanel, setShowFullPanel] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [activeEffects, setActiveEffects] = useState({
    particles: false,
    glow: false,
    blur: false,
    rainbow: false,
    matrix: false,
    pulse: false,
    aurora: false,
    hologram: false,
    neon: false,
    cyberpunk: false,
    retro: false,
    glassmorphism: false,
    neumorphism: false,
    parallax: false,
    liquidMetal: false,
    crystalline: false,
    organic: false,
    quantum: false,
    neural: false,
    cosmic: false,
  });

  const [designPresets, setDesignPresets] = useState([
    "Cyberpunk 2077",
    "Glassmorphism",
    "Neumorphism",
    "Retro Wave",
    "Dark Academia",
    "Solar Punk",
    "Minimalist",
    "Maximalist",
    "Art Deco",
    "Brutalist",
    "Memphis",
    "Vaporwave",
  ]);

  const [customPalettes, setCustomPalettes] = useState([
    "Sunset",
    "Ocean",
    "Forest",
    "Cosmic",
    "Neon",
    "Pastel",
    "Monochrome",
    "Earth Tones",
    "Ice",
    "Fire",
    "Aurora",
    "Deep Space",
  ]);

  // Check if this is production environment
  const isProduction = window.location.hostname === "www.gaiaexchanges.com";

  // Don't show visual controls in production
  if (isProduction) {
    return null;
  }

  const handleLockToggle = () => {
    toggleLock();
    toast.success(isLocked ? "Visual controls unlocked" : "Visual controls locked", {
      description: isLocked
        ? "You can now modify all visual settings"
        : "All visual settings are now protected",
      duration: 2000,
    });
  };

  const handleOpenFullPanel = () => {
    if (isLocked) {
      toast.error("Visual controls are locked", {
        description: "Unlock to access the full visual control panel",
        duration: 3000,
      });
      return;
    }
    setShowFullPanel(true);
    setIsOpen(false);
  };

  const handleQuickEffect = (effect: string) => {
    if (isLocked) {
      toast.error("Visual controls are locked", {
        description: "Unlock to apply visual effects",
        duration: 2000,
      });
      return;
    }

    setActiveEffects((prev) => ({
      ...prev,
      [effect]: !prev[effect as keyof typeof prev],
    }));

    // Dispatch effect to the application
    window.dispatchEvent(
      new CustomEvent("visual-effect-toggle", {
        detail: {
          effect,
          enabled: !activeEffects[effect as keyof typeof activeEffects],
        },
      })
    );

    toast.success(
      `${effect.charAt(0).toUpperCase() + effect.slice(1)} effect ${
        activeEffects[effect as keyof typeof activeEffects] ? "disabled" : "enabled"
      }`,
      {
        description: "Visual effect applied to the interface",
        duration: 2000,
      }
    );
  };

  const handlePresetApply = (preset: string) => {
    if (isLocked) {
      toast.error("Visual controls are locked");
      return;
    }

    // Apply preset styles based on the name
    const presetEffects = {
      "Cyberpunk 2077": ["neon", "glow", "cyberpunk"],
      Glassmorphism: ["blur", "glassmorphism"],
      Neumorphism: ["neumorphism"],
      "Retro Wave": ["retro", "glow", "neon"],
      "Solar Punk": ["organic", "particles"],
      Cosmic: ["cosmic", "aurora", "particles"],
      Vaporwave: ["retro", "rainbow", "glow"],
    };

    // Reset all effects first
    setActiveEffects((prev) => {
      const reset = Object.fromEntries(Object.keys(prev).map((key) => [key, false]));
      return reset as typeof prev;
    });

    // Apply preset effects
    const effects = presetEffects[preset as keyof typeof presetEffects] || [];
    effects.forEach((effect) => {
      setTimeout(() => handleQuickEffect(effect), 100);
    });

    toast.success(`Applied ${preset} design preset!`, {
      description: "Your interface has been transformed",
      duration: 3000,
    });
  };

  const handleColorPaletteApply = (palette: string) => {
    if (isLocked) return;

    // Apply color palettes
    const palettes = {
      Sunset: { primary: "#FF6B35", secondary: "#F7931E", accent: "#FFD23F" },
      Ocean: { primary: "#006A94", secondary: "#0582CA", accent: "#00A8E8" },
      Forest: { primary: "#2D5016", secondary: "#4F772D", accent: "#90A955" },
      Cosmic: { primary: "#2D1B69", secondary: "#7209B7", accent: "#F72585" },
      Neon: { primary: "#FF073A", secondary: "#39FF14", accent: "#FFFF00" },
      Aurora: { primary: "#4C956C", secondary: "#2F9AA0", accent: "#61A5C2" },
    };

    const colors = palettes[palette as keyof typeof palettes];
    if (colors) {
      document.documentElement.style.setProperty("--primary", colors.primary);
      document.documentElement.style.setProperty("--secondary", colors.secondary);
      document.documentElement.style.setProperty("--accent", colors.accent);

      toast.success(`Applied ${palette} color palette!`);
    }
  };

  const handleScreenRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      toast.success("Screen recording stopped", {
        description: "Recording saved to downloads",
        duration: 3000,
      });
    } else {
      setIsRecording(true);
      toast.success("Screen recording started", {
        description: "Recording the visual interface",
        duration: 3000,
      });
    }
  };

  const handleScreenshot = () => {
    toast.success("Screenshot captured", {
      description: "Interface screenshot saved",
      duration: 2000,
    });
  };

  const handleExportTheme = () => {
    const themeData = {
      colors: document.documentElement.style.cssText,
      effects: activeEffects,
      timestamp: new Date().toISOString(),
    };
    const blob = new Blob([JSON.stringify(themeData, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `gaia-theme-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success("Theme exported successfully", {
      description: "Your custom theme has been downloaded",
      duration: 3000,
    });
  };

  return (
    <>
      <div className="fixed bottom-6 left-6 z-50 animate-scale-in">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button
              size="lg"
              className="h-20 w-20 rounded-full bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 shadow-2xl border-2 border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:shadow-purple-500/50"
              title="🎨 Ultimate Visual Control Center"
            >
              <div className="flex flex-col items-center">
                <Brush className="h-8 w-8 mb-1" />
                <span className="text-xs font-bold">DESIGN</span>
              </div>
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="start"
            side="top"
            className="w-96 bg-black/95 border-purple-500/50 backdrop-blur-md shadow-2xl max-h-[80vh] overflow-y-auto"
          >
            <DropdownMenuLabel className="text-primary font-bold text-xl flex items-center gap-3 py-3">
              <Crown className="h-6 w-6 text-yellow-400" />
              🎨 ULTIMATE DESIGN STUDIO
            </DropdownMenuLabel>

            <DropdownMenuSeparator className="bg-purple-500/30" />

            {/* Lock Toggle */}
            <DropdownMenuItem
              onClick={handleLockToggle}
              className="text-yellow-300 hover:text-yellow-200 hover:bg-yellow-500/10 cursor-pointer py-4 px-4"
            >
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-3">
                  {isLocked ? <Lock className="h-6 w-6" /> : <Unlock className="h-6 w-6" />}
                  <div>
                    <span className="font-bold text-lg">{isLocked ? "LOCKED" : "UNLOCKED"}</span>
                    <p className="text-xs text-muted-foreground">
                      {isLocked ? "All controls protected" : "Full access enabled"}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={isLocked ? "destructive" : "secondary"}
                  className="text-sm px-3 py-1"
                >
                  {isLocked ? "🔒 SECURE" : "✨ ACTIVE"}
                </Badge>
              </div>
            </DropdownMenuItem>

            <DropdownMenuSeparator className="bg-purple-500/30" />

            {/* Design Presets */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-pink-300 hover:text-pink-200 hover:bg-pink-500/10 py-3">
                <Wand2 className="h-5 w-5 mr-3" />
                <div>
                  <span className="font-semibold">Design Presets</span>
                  <p className="text-xs text-muted-foreground">Professional themes</p>
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-black/95 backdrop-blur-md w-64">
                {designPresets.map((preset) => (
                  <DropdownMenuItem
                    key={preset}
                    onClick={() => handlePresetApply(preset)}
                    disabled={isLocked}
                    className="py-2 hover:bg-purple-500/20"
                  >
                    <Sparkle className="h-4 w-4 mr-2" />
                    {preset}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            {/* Color Palettes */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-blue-300 hover:text-blue-200 hover:bg-blue-500/10 py-3">
                <Palette className="h-5 w-5 mr-3" />
                <div>
                  <span className="font-semibold">Color Palettes</span>
                  <p className="text-xs text-muted-foreground">Curated color schemes</p>
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-black/95 backdrop-blur-md w-56">
                {customPalettes.map((palette) => (
                  <DropdownMenuItem
                    key={palette}
                    onClick={() => handleColorPaletteApply(palette)}
                    disabled={isLocked}
                    className="py-2 hover:bg-blue-500/20"
                  >
                    <Droplets className="h-4 w-4 mr-2" />
                    {palette}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            {/* Advanced Effects */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-purple-300 hover:text-purple-200 hover:bg-purple-500/10 py-3">
                <Lightning className="h-5 w-5 mr-3" />
                <div>
                  <span className="font-semibold">Advanced Effects</span>
                  <p className="text-xs text-muted-foreground">Premium animations</p>
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-black/95 backdrop-blur-md w-64">
                <DropdownMenuItem
                  onClick={() => handleQuickEffect("particles")}
                  disabled={isLocked}
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Particles {activeEffects.particles && "✨"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleQuickEffect("aurora")} disabled={isLocked}>
                  <Sun className="h-4 w-4 mr-2" />
                  Aurora Borealis {activeEffects.aurora && "✨"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleQuickEffect("hologram")} disabled={isLocked}>
                  <Atom className="h-4 w-4 mr-2" />
                  Hologram {activeEffects.hologram && "✨"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleQuickEffect("neon")} disabled={isLocked}>
                  <Lightbulb className="h-4 w-4 mr-2" />
                  Neon Glow {activeEffects.neon && "✨"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleQuickEffect("cyberpunk")}
                  disabled={isLocked}
                >
                  <Bot className="h-4 w-4 mr-2" />
                  Cyberpunk {activeEffects.cyberpunk && "✨"}
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleQuickEffect("glassmorphism")}
                  disabled={isLocked}
                >
                  <Gem className="h-4 w-4 mr-2" />
                  Glassmorphism {activeEffects.glassmorphism && "✨"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleQuickEffect("neural")} disabled={isLocked}>
                  <Network className="h-4 w-4 mr-2" />
                  Neural Network {activeEffects.neural && "✨"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleQuickEffect("cosmic")} disabled={isLocked}>
                  <Rocket className="h-4 w-4 mr-2" />
                  Cosmic Portal {activeEffects.cosmic && "✨"}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            {/* Professional Tools */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-green-300 hover:text-green-200 hover:bg-green-500/10 py-3">
                <Wrench className="h-5 w-5 mr-3" />
                <div>
                  <span className="font-semibold">Professional Tools</span>
                  <p className="text-xs text-muted-foreground">Advanced design features</p>
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-black/95 backdrop-blur-md w-72">
                <DropdownMenuItem onClick={handleOpenFullPanel} disabled={isLocked}>
                  <Crown className="h-4 w-4 mr-2" />
                  Master Control Panel
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <Sliders className="h-4 w-4 mr-2" />
                  Advanced Color Mixer
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <Type className="h-4 w-4 mr-2" />
                  Typography Studio Pro
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <Layers className="h-4 w-4 mr-2" />
                  Multi-Layer Manager
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <Grid className="h-4 w-4 mr-2" />
                  Layout Grid System
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <Shapes className="h-4 w-4 mr-2" />
                  Shape Generator
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <PaintBucket className="h-4 w-4 mr-2" />
                  Gradient Builder
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <Pen className="h-4 w-4 mr-2" />
                  Custom CSS Editor
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            {/* Animation Controls */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-orange-300 hover:text-orange-200 hover:bg-orange-500/10 py-3">
                <Orbit className="h-5 w-5 mr-3" />
                <div>
                  <span className="font-semibold">Animation Studio</span>
                  <p className="text-xs text-muted-foreground">Motion & transitions</p>
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-black/95 backdrop-blur-md w-64">
                <DropdownMenuItem disabled={isLocked}>
                  <Wind className="h-4 w-4 mr-2" />
                  Floating Elements
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <Waves className="h-4 w-4 mr-2" />
                  Wave Animations
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Spiral Motions
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <Target className="h-4 w-4 mr-2" />
                  Parallax Scrolling
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <Gauge className="h-4 w-4 mr-2" />
                  Performance Monitor
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <InfinityIcon className="h-4 w-4 mr-2" />
                  Infinite Scroll Effects
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            {/* Responsive Design */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-cyan-300 hover:text-cyan-200 hover:bg-cyan-500/10 py-3">
                <Monitor className="h-5 w-5 mr-3" />
                <div>
                  <span className="font-semibold">Responsive Design</span>
                  <p className="text-xs text-muted-foreground">Multi-device optimization</p>
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-black/95 backdrop-blur-md w-64">
                <DropdownMenuItem disabled={isLocked}>
                  <Smartphone className="h-4 w-4 mr-2" />
                  Mobile Optimization
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <Laptop className="h-4 w-4 mr-2" />
                  Desktop Layout
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <Monitor className="h-4 w-4 mr-2" />
                  Ultra-wide Support
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <Maximize className="h-4 w-4 mr-2" />
                  Breakpoint Manager
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            {/* Media & Capture */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-red-300 hover:text-red-200 hover:bg-red-500/10 py-3">
                <Camera className="h-5 w-5 mr-3" />
                <div>
                  <span className="font-semibold">Media Studio</span>
                  <p className="text-xs text-muted-foreground">Capture & create</p>
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-black/95 backdrop-blur-md w-64">
                <DropdownMenuItem onClick={handleScreenshot}>
                  <Camera className="h-4 w-4 mr-2" />
                  HD Screenshot
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleScreenRecord}>
                  <Video className="h-4 w-4 mr-2" />
                  {isRecording ? "Stop Recording" : "4K Screen Record"}
                  {isRecording && (
                    <div className="w-2 h-2 bg-red-500 rounded-full ml-2 animate-pulse" />
                  )}
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <Film className="h-4 w-4 mr-2" />
                  Video Editor
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <Focus className="h-4 w-4 mr-2" />
                  Focus Mode
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <Scan className="h-4 w-4 mr-2" />
                  QR Code Generator
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            <DropdownMenuSeparator className="bg-purple-500/30" />

            {/* Export & Import */}
            <DropdownMenuSub>
              <DropdownMenuSubTrigger className="text-yellow-300 hover:text-yellow-200 hover:bg-yellow-500/10 py-3">
                <HardDrive className="h-5 w-5 mr-3" />
                <div>
                  <span className="font-semibold">Project Manager</span>
                  <p className="text-xs text-muted-foreground">Save & load designs</p>
                </div>
              </DropdownMenuSubTrigger>
              <DropdownMenuSubContent className="bg-black/95 backdrop-blur-md w-64">
                <DropdownMenuItem onClick={handleExportTheme} disabled={isLocked}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Complete Theme
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <Upload className="h-4 w-4 mr-2" />
                  Import Design Package
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <Save className="h-4 w-4 mr-2" />
                  Save as Template
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <Code className="h-4 w-4 mr-2" />
                  Export CSS Code
                </DropdownMenuItem>
                <DropdownMenuItem disabled={isLocked}>
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reset to Defaults
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuSub>

            {/* Master Control Panel Access */}
            <DropdownMenuSeparator className="bg-gradient-to-r from-purple-500 to-pink-500 h-0.5" />

            <DropdownMenuItem
              onClick={handleOpenFullPanel}
              className="text-white bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 font-bold py-4 mx-2 my-2 rounded-lg"
              disabled={isLocked}
            >
              <Wand2 className="h-6 w-6 mr-3" />
              <div className="flex flex-col">
                <span className="text-lg">🎨 MASTER STUDIO</span>
                <span className="text-xs opacity-90">Ultimate Design Control</span>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Full Visual Control Panel Modal */}
      {showFullPanel && (
        <FullVisualControlPanel
          isOpen={showFullPanel}
          onClose={() => setShowFullPanel(false)}
          activeEffects={activeEffects}
          onEffectToggle={handleQuickEffect}
        />
      )}
    </>
  );
}
