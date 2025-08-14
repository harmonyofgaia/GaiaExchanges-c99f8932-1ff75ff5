import { useEffect, useState } from "react";
import { NeuralElectricMatrix } from "@/components/ui/neural-electric-matrix";
import { PageSpecificNeuralBackground } from "@/components/ui/page-specific-neural-background";
import { DynamicNeuralCorners } from "@/components/ui/dynamic-neural-corners";
import { EnhancedPageTransitions } from "@/components/ui/enhanced-page-transitions";

interface BackgroundStyle {
  style: string;
  intensity: number;
  neural: boolean;
  matrix: boolean;
}

export const EnhancedHomeBackground = () => {
  const [backgroundConfig, setBackgroundConfig] = useState<BackgroundStyle>({
    style: "neural-matrix",
    intensity: 80,
    neural: true,
    matrix: true,
  });

  useEffect(() => {
    // Listen for admin style updates
    const handleStyleUpdate = (event: CustomEvent) => {
      const { background } = event.detail;
      setBackgroundConfig(background);
    };

    window.addEventListener("admin-style-update", handleStyleUpdate as EventListener);

    return () => {
      window.removeEventListener("admin-style-update", handleStyleUpdate as EventListener);
    };
  }, []);

  return (
    <>
      {/* Page-specific neural background */}
      <PageSpecificNeuralBackground />

      {/* Dynamic corner effects */}
      <DynamicNeuralCorners />

      {/* Page transitions */}
      <EnhancedPageTransitions />

      {/* Enhanced floating neural elements */}
      <div className="fixed inset-0 pointer-events-none z-5">
        {Array.from({ length: backgroundConfig.neural ? 20 : 10 }).map((_, i) => (
          <div
            key={`neural-${i}`}
            className="absolute opacity-30"
            style={{
              left: `${5 + i * 4.5}%`,
              top: `${10 + Math.sin(i) * 40}%`,
              animation: `float-up ${4 + i * 0.2}s ease-in-out infinite`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            <div
              className={`w-2 h-2 ${
                i % 6 === 0
                  ? "bg-cyan-400 shadow-cyan-400/50"
                  : i % 6 === 1
                    ? "bg-purple-400 shadow-purple-400/50"
                    : i % 6 === 2
                      ? "bg-pink-400 shadow-pink-400/50"
                      : i % 6 === 3
                        ? "bg-yellow-400 shadow-yellow-400/50"
                        : i % 6 === 4
                          ? "bg-green-400 shadow-green-400/50"
                          : "bg-blue-400 shadow-blue-400/50"
              } rounded-full blur-sm shadow-lg animate-pulse`}
              style={{
                boxShadow: `0 0 20px currentColor, 0 0 40px currentColor`,
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
};
