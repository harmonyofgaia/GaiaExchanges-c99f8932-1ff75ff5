import { useEffect, useState, useCallback} from "react";

interface CornerEffect {
  id: string;
  corner: "top-left" | "top-right" | "bottom-left" | "bottom-right";
  intensity: number;
  color: string;
}

export function DynamicNeuralCorners() {
  const [effects, setEffects] = useState<CornerEffect[]>([]);

  useEffect(() => {
    const corners = ["top-left", "top-right", "bottom-left", "bottom-right"] as const;
    const colors = ["#00ffff", "#ff00ff", "#00ff00", "#ffff00"];

    const newEffects = corners.map((corner, index) => ({
      id: `corner-${index}`,
      corner,
      intensity: Math.random() * 0.5 + 0.3,
      color: colors[index],
    }));

    setEffects(newEffects);

    const interval = setInterval(() => {
      setEffects((prev) =>
        prev.map((effect) => ({
          ...effect,
          intensity: Math.random() * 0.7 + 0.2,
        }))
      );
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      {effects.map((effect) => (
        <div
          key={effect.id}
          className={`absolute w-40 h-40 ${
            effect.corner === "top-left"
              ? "top-0 left-0"
              : effect.corner === "top-right"
                ? "top-0 right-0"
                : effect.corner === "bottom-left"
                  ? "bottom-0 left-0"
                  : "bottom-0 right-0"
          }`}
          style={{
            background: `radial-gradient(circle at ${
              effect.corner.includes("left") ? "0%" : "100%"
            } ${effect.corner.includes("top") ? "0%" : "100%"}, ${effect.color}${Math.floor(
              effect.intensity * 255
            )
              .toString(16)
              .padStart(2, "0")} 0%, transparent 70%)`,
            filter: "blur(2px)",
            animation: `pulse ${2 + Math.random() * 2}s ease-in-out infinite`,
          }}
        />
      ))}

      {/* Neural circuit patterns in corners */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <pattern
            id="neural-circuit"
            x="0"
            y="0"
            width="50"
            height="50"
            patternUnits="userSpaceOnUse"
          >
            <path d="M25,5 L25,45 M5,25 L45,25" stroke="rgba(0,255,255,0.3)" strokeWidth="1" />
            <circle cx="25" cy="25" r="3" fill="rgba(0,255,255,0.5)" />
            <circle cx="25" cy="5" r="2" fill="rgba(255,0,255,0.4)" />
            <circle cx="25" cy="45" r="2" fill="rgba(255,0,255,0.4)" />
            <circle cx="5" cy="25" r="2" fill="rgba(0,255,0,0.4)" />
            <circle cx="45" cy="25" r="2" fill="rgba(0,255,0,0.4)" />
          </pattern>
        </defs>

        {/* Top corners */}
        <rect x="0" y="0" width="100" height="100" fill="url(#neural-circuit)" opacity="0.3" />
        <rect
          x="calc(100% - 100px)"
          y="0"
          width="100"
          height="100"
          fill="url(#neural-circuit)"
          opacity="0.3"
        />

        {/* Bottom corners */}
        <rect
          x="0"
          y="calc(100% - 100px)"
          width="100"
          height="100"
          fill="url(#neural-circuit)"
          opacity="0.3"
        />
        <rect
          x="calc(100% - 100px)"
          y="calc(100% - 100px)"
          width="100"
          height="100"
          fill="url(#neural-circuit)"
          opacity="0.3"
        />
      </svg>
    </div>
  );
}
