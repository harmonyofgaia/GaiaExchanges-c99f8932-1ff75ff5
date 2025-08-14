import { useLocation } from "react-router-dom";
import { NeuralElectricMatrix } from "./neural-electric-matrix";
import { NeuralElectricBackground } from "./neural-electric-background";

interface PageStyle {
  backgroundType: "matrix" | "neural" | "hybrid";
  intensity: "low" | "medium" | "high";
  colorScheme: "cyan" | "purple" | "green" | "rainbow" | "fire";
  flowDirection: "horizontal" | "vertical" | "radial" | "spiral";
}

const pageStyles: Record<string, PageStyle> = {
  "/": {
    backgroundType: "hybrid",
    intensity: "medium",
    colorScheme: "rainbow",
    flowDirection: "radial",
  },
  "/admin": {
    backgroundType: "matrix",
    intensity: "high",
    colorScheme: "purple",
    flowDirection: "spiral",
  },
  "/wallet": {
    backgroundType: "neural",
    intensity: "medium",
    colorScheme: "green",
    flowDirection: "horizontal",
  },
  "/gaming": {
    backgroundType: "matrix",
    intensity: "high",
    colorScheme: "fire",
    flowDirection: "vertical",
  },
  "/live-tracking": {
    backgroundType: "neural",
    intensity: "low",
    colorScheme: "cyan",
    flowDirection: "horizontal",
  },
};

export function PageSpecificNeuralBackground() {
  const location = useLocation();
  const style = pageStyles[location.pathname] || pageStyles["/"];

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: -2 }}>
      {/* Base neural background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

      {/* Matrix overlay for matrix or hybrid types */}
      {(style.backgroundType === "matrix" || style.backgroundType === "hybrid") && (
        <NeuralElectricMatrix />
      )}

      {/* Neural pathways for neural or hybrid types */}
      {(style.backgroundType === "neural" || style.backgroundType === "hybrid") && (
        <NeuralElectricBackground style={style.colorScheme} intensity={style.intensity} />
      )}

      {/* Flowing electrical currents */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({
          length: style.intensity === "high" ? 8 : style.intensity === "medium" ? 5 : 3,
        }).map((_, i) => (
          <div
            key={`flow-${i}`}
            className={`absolute w-px h-full bg-gradient-to-b opacity-30 animate-pulse`}
            style={{
              left: `${20 + i * 15}%`,
              background: `linear-gradient(to bottom, 
                transparent 0%, 
                ${
                  style.colorScheme === "cyan"
                    ? "#00ffff"
                    : style.colorScheme === "purple"
                      ? "#ff00ff"
                      : style.colorScheme === "green"
                        ? "#00ff00"
                        : style.colorScheme === "fire"
                          ? "#ff4500"
                          : "#ffffff"
                } 50%, 
                transparent 100%)`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i * 0.5}s`,
            }}
          />
        ))}
      </div>

      {/* Corner electric effects */}
      <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-cyan-500/20 to-transparent animate-pulse" />
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-purple-500/20 to-transparent animate-pulse" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-green-500/20 to-transparent animate-pulse" />
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tl from-pink-500/20 to-transparent animate-pulse" />
    </div>
  );
}
