import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Lock, Unlock, Pause, Play, Settings, Zap, Timer, Layers, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

interface BackgroundSettings {
  isLocked: boolean;
  isAnimated: boolean;
  autoChange: boolean;
  changeInterval: number;
  intensity: number;
  speed: number;
  type: "matrix" | "neural" | "particles" | "waves" | "static";
  layers: {
    primary: boolean;
    secondary: boolean;
    particles: boolean;
    connections: boolean;
  };
}

export function AdvancedBackgroundControls({ isLocked }: { isLocked: boolean }) {
  const [settings, setSettings] = useState<BackgroundSettings>({
    isLocked: false,
    isAnimated: true,
    autoChange: true,
    changeInterval: 30, // seconds
    intensity: 60,
    speed: 1,
    type: "neural",
    layers: {
      primary: true,
      secondary: true,
      particles: true,
      connections: true,
    },
  });

  const [timeRemaining, setTimeRemaining] = useState(settings.changeInterval);

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem("gaia-background-settings");
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings(parsed);
        setTimeRemaining(parsed.changeInterval);
      } catch (error) {
        console.error("Failed to load background settings:", error);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("gaia-background-settings", JSON.stringify(settings));
  }, [settings]);

  // Timer for auto-change countdown
  useEffect(() => {
    if (!settings.autoChange || settings.isLocked) return;

    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Trigger background change
          applyBackgroundChange();
          return settings.changeInterval;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [settings.autoChange, settings.isLocked, settings.changeInterval]);

  const updateSetting = <K extends keyof BackgroundSettings>(
    key: K,
    value: BackgroundSettings[K]
  ) => {
    if (isLocked && key !== "isLocked") return;

    setSettings((prev) => ({ ...prev, [key]: value }));

    // Apply the setting immediately
    applySettingToDOM(key, value);

    // Reset timer if interval changed
    if (key === "changeInterval") {
      setTimeRemaining(value as number);
    }
  };

  const applySettingToDOM = (key: keyof BackgroundSettings, value: unknown) => {
    const root = document.documentElement;

    switch (key) {
      case "intensity":
        root.style.setProperty("--background-intensity", `${value}%`);
        break;
      case "speed":
        root.style.setProperty("--animation-speed", `${value}s`);
        break;
      case "isAnimated":
        root.style.setProperty("--animation-play-state", value ? "running" : "paused");
        break;
      case "type":
        root.setAttribute("data-background-type", value);
        break;
    }
  };

  const applyBackgroundChange = () => {
    const types: BackgroundSettings["type"][] = [
      "matrix",
      "neural",
      "particles",
      "waves",
      "static",
    ];
    const randomType = types[Math.floor(Math.random() * types.length)];

    updateSetting("type", randomType);

    toast.success(`Background changed to ${randomType}`, {
      description: "Auto-change triggered",
      duration: 2000,
    });
  };

  const toggleBackgroundLock = () => {
    const newLocked = !settings.isLocked;
    updateSetting("isLocked", newLocked);
    toast.success(
      newLocked
        ? "Background locked - no more auto changes"
        : "Background unlocked - auto changes resumed",
      {
        description: newLocked
          ? "Your current background is now fixed"
          : `Background will change every ${settings.changeInterval}s`,
        duration: 3000,
      }
    );
  };

  const toggleLayer = (layer: keyof BackgroundSettings["layers"]) => {
    if (isLocked || settings.isLocked) return;

    const newLayers = { ...settings.layers, [layer]: !settings.layers[layer] };
    updateSetting("layers", newLayers);

    // Apply layer visibility to DOM
    const layerElement = document.querySelector(`[data-layer="${layer}"]`);
    if (layerElement) {
      (layerElement as HTMLElement).style.display = newLayers[layer] ? "block" : "none";
    }

    toast.success(`${layer} layer ${newLayers[layer] ? "enabled" : "disabled"}`);
  };

  const shuffleBackground = () => {
    if (isLocked || settings.isLocked) return;

    // Randomize multiple settings
    const randomIntensity = Math.floor(Math.random() * 100);
    const randomSpeed = Math.random() * 2.5 + 0.5;
    const types: BackgroundSettings["type"][] = ["matrix", "neural", "particles", "waves"];
    const randomType = types[Math.floor(Math.random() * types.length)];

    updateSetting("intensity", randomIntensity);
    updateSetting("speed", randomSpeed);
    updateSetting("type", randomType);

    toast.success("Background shuffled!", {
      description: `New style: ${randomType}, intensity: ${randomIntensity}%`,
    });
  };

  const resetToDefaults = () => {
    if (isLocked) return;

    const defaults: BackgroundSettings = {
      isLocked: false,
      isAnimated: true,
      autoChange: true,
      changeInterval: 30,
      intensity: 60,
      speed: 1,
      type: "neural",
      layers: {
        primary: true,
        secondary: true,
        particles: true,
        connections: true,
      },
    };

    setSettings(defaults);
    setTimeRemaining(defaults.changeInterval);

    // Apply all defaults to DOM
    Object.entries(defaults).forEach(([key, value]) => {
      if (key !== "layers") {
        applySettingToDOM(key as keyof BackgroundSettings, value);
      }
    });

    toast.success("Background settings reset to defaults");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <Card className="border-cyan-500/20 bg-cyan-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-400">
          <Settings className="h-5 w-5" />
          Advanced Background Studio
        </CardTitle>

        {/* Quick status bar */}
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-4">
            <Badge variant={settings.isLocked ? "destructive" : "secondary"}>
              {settings.isLocked ? "Locked" : "Dynamic"}
            </Badge>
            <Badge variant="outline">
              {settings.type.charAt(0).toUpperCase() + settings.type.slice(1)}
            </Badge>
            {settings.autoChange && !settings.isLocked && (
              <Badge variant="secondary" className="flex items-center gap-1">
                <Timer className="h-3 w-3" />
                Next: {formatTime(timeRemaining)}
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Background Lock Control */}
        <div className="p-4 border rounded-lg bg-background/50">
          <div className="flex items-center justify-between mb-3">
            <div>
              <Label className="text-base font-semibold">Background Lock</Label>
              <p className="text-sm text-muted-foreground">
                Stop automatic background changes and keep current design
              </p>
            </div>
            <Button
              onClick={toggleBackgroundLock}
              variant={settings.isLocked ? "destructive" : "default"}
              size="sm"
              className="flex items-center gap-2"
              disabled={isLocked}
            >
              {settings.isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
              {settings.isLocked ? "Locked" : "Unlock"}
            </Button>
          </div>
        </div>

        {/* Auto-Change Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="auto-change">Auto Background Change</Label>
            <Switch
              id="auto-change"
              checked={settings.autoChange}
              onCheckedChange={(checked) => updateSetting("autoChange", checked)}
              disabled={isLocked || settings.isLocked}
            />
          </div>

          {settings.autoChange && (
            <div className="space-y-2">
              <Label>Change Interval: {settings.changeInterval}s</Label>
              <Slider
                value={[settings.changeInterval]}
                onValueChange={([value]) => updateSetting("changeInterval", value)}
                min={5}
                max={300}
                step={5}
                disabled={isLocked || settings.isLocked}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>5s</span>
                <span>5min</span>
              </div>
            </div>
          )}
        </div>

        {/* Background Type */}
        <div className="space-y-2">
          <Label>Background Style</Label>
          <Select
            value={settings.type}
            onValueChange={(value: BackgroundSettings["type"]) => updateSetting("type", value)}
            disabled={isLocked || settings.isLocked}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="neural">Neural Network</SelectItem>
              <SelectItem value="matrix">Matrix Rain</SelectItem>
              <SelectItem value="particles">Particle System</SelectItem>
              <SelectItem value="waves">Energy Waves</SelectItem>
              <SelectItem value="static">Static Image</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Animation Controls */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="animated">Enable Animations</Label>
            <Switch
              id="animated"
              checked={settings.isAnimated}
              onCheckedChange={(checked) => updateSetting("isAnimated", checked)}
              disabled={isLocked || settings.isLocked}
            />
          </div>

          {settings.isAnimated && (
            <>
              <div className="space-y-2">
                <Label>Intensity: {settings.intensity}%</Label>
                <Slider
                  value={[settings.intensity]}
                  onValueChange={([value]) => updateSetting("intensity", value)}
                  min={0}
                  max={100}
                  step={5}
                  disabled={isLocked || settings.isLocked}
                />
              </div>

              <div className="space-y-2">
                <Label>Speed: {settings.speed}x</Label>
                <Slider
                  value={[settings.speed]}
                  onValueChange={([value]) => updateSetting("speed", value)}
                  min={0.1}
                  max={3}
                  step={0.1}
                  disabled={isLocked || settings.isLocked}
                />
              </div>
            </>
          )}
        </div>

        {/* Layer Controls */}
        <div className="space-y-3">
          <Label className="flex items-center gap-2">
            <Layers className="h-4 w-4" />
            Visual Layers
          </Label>

          <div className="grid grid-cols-2 gap-3">
            {Object.entries(settings.layers).map(([layer, enabled]) => (
              <div key={layer} className="flex items-center justify-between p-2 border rounded">
                <span className="text-sm capitalize">{layer}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleLayer(layer as keyof BackgroundSettings["layers"])}
                  disabled={isLocked || settings.isLocked}
                  className={enabled ? "text-green-400" : "text-muted-foreground"}
                >
                  {enabled ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-2 pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            disabled={isLocked || settings.isLocked}
            onClick={shuffleBackground}
          >
            <Zap className="h-4 w-4 mr-2" />
            Shuffle Now
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => updateSetting("isAnimated", !settings.isAnimated)}
            disabled={isLocked || settings.isLocked}
          >
            {settings.isAnimated ? (
              <Pause className="h-4 w-4 mr-2" />
            ) : (
              <Play className="h-4 w-4 mr-2" />
            )}
            {settings.isAnimated ? "Pause" : "Play"}
          </Button>

          <Button variant="outline" size="sm" onClick={resetToDefaults} disabled={isLocked}>
            Reset Defaults
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
