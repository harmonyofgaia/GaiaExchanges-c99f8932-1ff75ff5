import { useEffect, useState } from "react";

interface Synapse {
  id: number;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  intensity: number;
  speed: number;
}

interface NeuralElectricBackgroundProps {
  style?: string;
  intensity?: "low" | "medium" | "high";
}

export function NeuralElectricBackground({
  style = "neural",
  intensity = "medium",
}: NeuralElectricBackgroundProps) {
  const [synapses, setSynapses] = useState<Synapse[]>([]);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const synapseCount = intensity === "low" ? 8 : intensity === "medium" ? 15 : 25;

  useEffect(() => {
    const newSynapses = Array.from({ length: synapseCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      targetX: Math.random() * 100,
      targetY: Math.random() * 100,
      intensity: Math.random() * 0.8 + 0.2,
      speed: Math.random() * 0.5 + 0.2,
    }));
    setSynapses(newSynapses);
  }, [synapseCount]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setMousePos({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setSynapses((prev) =>
        prev.map((synapse) => ({
          ...synapse,
          x: synapse.x + (synapse.targetX - synapse.x) * synapse.speed * 0.01,
          y: synapse.y + (synapse.targetY - synapse.y) * synapse.speed * 0.01,
          targetX: synapse.targetX + (Math.random() - 0.5) * 2,
          targetY: synapse.targetY + (Math.random() - 0.5) * 2,
          intensity: Math.max(0.1, Math.min(1, synapse.intensity + (Math.random() - 0.5) * 0.1)),
        }))
      );
    }, 100);

    return () => clearInterval(interval);
  }, []);

  const getBackgroundImage = () => {
    switch (style) {
      case "synaptic":
        return "/lovable-uploads/42ec85dc-42df-4958-96d8-7919a192f629.png";
      case "bioelectric":
        return "/lovable-uploads/3ce518f5-75b0-493f-897a-45119793a33d.png";
      case "neural":
        return "/lovable-uploads/1087f396-900a-4e0b-be62-7b049d0294ff.png";
      default:
        return "/lovable-uploads/1ed369eb-ecda-422a-af60-8f511aa9aa8e.png";
    }
  };

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -2 }}>
      {/* Base neural background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

      {/* Neural imagery overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-15 mix-blend-screen"
        style={{
          backgroundImage: `url('${getBackgroundImage()}')`,
          filter: "hue-rotate(120deg) saturate(1.5)",
        }}
      />

      {/* Secondary neural layer */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-8 mix-blend-soft-light"
        style={{
          backgroundImage: `url('/lovable-uploads/2ab2dcf8-008f-4f94-9341-9b6fcb25cefb.png')`,
          filter: "hue-rotate(180deg) saturate(0.8)",
        }}
      />

      {/* Interactive synapses */}
      <svg className="absolute inset-0 w-full h-full">
        {/* Electrical connections */}
        {synapses.map((synapse, index) => {
          const nextSynapse = synapses[(index + 1) % synapses.length];
          const distance = Math.sqrt(
            Math.pow(synapse.x - mousePos.x, 2) + Math.pow(synapse.y - mousePos.y, 2)
          );
          const mouseInfluence = Math.max(0, 1 - distance / 30);

          return (
            <g key={synapse.id}>
              {/* Connection line */}
              <line
                x1={`${synapse.x}%`}
                y1={`${synapse.y}%`}
                x2={`${nextSynapse.x}%`}
                y2={`${nextSynapse.y}%`}
                stroke={`rgba(0, 255, 255, ${synapse.intensity * 0.6})`}
                strokeWidth={1 + mouseInfluence}
                className="animate-pulse"
              />

              {/* Synapse node */}
              <circle
                cx={`${synapse.x}%`}
                cy={`${synapse.y}%`}
                r={2 + mouseInfluence * 3}
                fill={`rgba(255, 100, 200, ${synapse.intensity})`}
                className="animate-pulse"
              />

              {/* Electrical spark */}
              <circle
                cx={`${synapse.x}%`}
                cy={`${synapse.y}%`}
                r={4 + mouseInfluence * 6}
                fill="none"
                stroke={`rgba(255, 255, 255, ${synapse.intensity * 0.4})`}
                strokeWidth="1"
                opacity={mouseInfluence}
              />
            </g>
          );
        })}
      </svg>

      {/* Floating neural particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 15 }).map((_, i) => (
          <div
            key={`neural-particle-${i}`}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + Math.random() * 3}s`,
              boxShadow: "0 0 8px currentColor",
            }}
          />
        ))}
      </div>
    </div>
  );
}
