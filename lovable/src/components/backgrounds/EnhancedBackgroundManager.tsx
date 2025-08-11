import { useState, useEffect } from "react";
import { MatrixRainBackground } from "./MatrixRainBackground";
import { NeuroBackground } from "./NeuroBackground";
import { PuzzleBackground } from "./PuzzleBackground";
import { CyberPunkBackground } from "./CyberPunkBackground";
import { QuantumBackground } from "./QuantumBackground";
import { BioElectricBackground } from "./BioElectricBackground";
import { HolographicBackground } from "./HolographicBackground";

export type EnhancedBackgroundType =
  | "matrix"
  | "neural"
  | "puzzle"
  | "cyberpunk"
  | "quantum"
  | "bioelectric"
  | "holographic";

export interface EnhancedBackgroundSettings {
  type: EnhancedBackgroundType;
  intensity: "low" | "medium" | "high";
  color: string;
  speed: number;
  autoGenerate?: boolean;
  pattern?: string;
  neuralDensity?: number;
}

interface EnhancedBackgroundManagerProps {
  settings?: EnhancedBackgroundSettings;
  className?: string;
}

const DEFAULT_SETTINGS: EnhancedBackgroundSettings = {
  type: "matrix",
  intensity: "medium",
  color: "#00ff00",
  speed: 1,
  autoGenerate: false,
  pattern: "default",
  neuralDensity: 50,
};

const ANIMATION_CYCLE_DURATION = 30000; // 30 seconds

export function EnhancedBackgroundManager({
  settings: propSettings,
  className = "",
}: EnhancedBackgroundManagerProps) {
    const [currentSettings, setCurrentSettings] =
      useState<EnhancedBackgroundSettings>(propSettings || DEFAULT_SETTINGS);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isLocked, setIsLocked] = useState(false);

  useEffect(() => {
      const loadSettings = () => {
        const savedSettings = localStorage.getItem("gaia-background-settings");
        const savedLock = localStorage.getItem("gaia-background-lock");

        if (savedSettings) {
          try {
            const parsed = JSON.parse(savedSettings);
            setCurrentSettings(parsed);
          } catch (error) {
            console.warn("Failed to parse saved background settings");
          }
        }

        setIsLocked(savedLock === "true");
      };

      loadSettings();

      // Listen for settings changes from visual controls
      const handleSettingsChange = (event: CustomEvent) => {
        if (!isLocked) {
          setCurrentSettings(event.detail);
        }
      };

      window.addEventListener(
        "background-settings-changed",
        handleSettingsChange as EventListener,
      );

      return () => {
        window.removeEventListener(
          "background-settings-changed",
          handleSettingsChange as EventListener,
        );
      };
  }, [isLocked]);

  // Auto-generate new backgrounds only if enabled and not locked
  useEffect(() => {
    if (!currentSettings.autoGenerate || isLocked) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(() => {
        const backgroundTypes: EnhancedBackgroundType[] = [
          "matrix",
          "neural",
          "puzzle",
        ];
        const colors = ["#00ff00", "#00ffff", "#ff00ff", "#ffff00", "#ff0080"];
        const intensities: Array<"low" | "medium" | "high"> = [
          "low",
          "medium",
          "high",
        ];

        const newSettings: EnhancedBackgroundSettings = {
          type: backgroundTypes[
            Math.floor(Math.random() * backgroundTypes.length)
          ],
          intensity:
            intensities[Math.floor(Math.random() * intensities.length)],
          color: colors[Math.floor(Math.random() * colors.length)],
          speed: Math.random() * 2 + 0.5,
          autoGenerate: true,
          pattern: "default",
          neuralDensity: Math.floor(Math.random() * 100) + 20,
        };

        setCurrentSettings(newSettings);
        // Save the auto-generated settings
        localStorage.setItem(
          "gaia-background-settings",
          JSON.stringify(newSettings),
        );
        setIsTransitioning(false);
      }, 1000);
    }, ANIMATION_CYCLE_DURATION);

    return () => clearInterval(interval);
  }, [currentSettings.autoGenerate, isLocked]);

  const renderBackground = () => {
    const baseProps = {
      intensity: currentSettings.intensity,
      color: currentSettings.color,
      speed: currentSettings.speed,
    };

    switch (currentSettings.type) {
      case "matrix":
        return <MatrixRainBackground {...baseProps} />;

      case "neural":
        return (
          <NeuroBackground
            {...baseProps}
            pattern={
              currentSettings.pattern as
                | "default"
                | "creative"
                | "abstract"
                | "organic"
                | "geometric"
            }
            neuralDensity={currentSettings.neuralDensity}
          />
        );

      case "puzzle":
        return <PuzzleBackground {...baseProps} />;

      case "cyberpunk":
        return <CyberPunkBackground {...baseProps} />;

      case "quantum":
        return <QuantumBackground {...baseProps} />;

      case "bioelectric":
        return <BioElectricBackground {...baseProps} />;

      case "holographic":
        return <HolographicBackground {...baseProps} />;

      default:
        return <MatrixRainBackground {...baseProps} />;
    }
  };

  return (
    <div className={`fixed inset-0 pointer-events-none z-0 ${className}`}>
      <div
        className={`transition-opacity duration-1000 ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {renderBackground()}
      </div>

      {/* Lock indicator */}
      {isLocked && (
        <div className="absolute top-4 right-4 z-10 bg-yellow-500/20 backdrop-blur-sm border border-yellow-500/30 rounded-lg px-3 py-1 text-yellow-300 text-xs font-medium">
          🔒 Background Locked
        </div>
      )}
    </div>
  );
}

export function updateBackgroundConfig(config: EnhancedBackgroundSettings) {
  // Update background config and save to localStorage
  localStorage.setItem("gaia-background-settings", JSON.stringify(config));
  window.dispatchEvent(
    new CustomEvent("background-settings-changed", { detail: config }),
  );
  console.log("Background config updated:", config);
}
