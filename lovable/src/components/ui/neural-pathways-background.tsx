import { useEffect, useState } from "react";

interface NeuralNode {
  id: number;
  x: number;
  y: number;
  size: number;
  pulse: number;
  connections: number[];
  activity: number;
}

interface NeuralPathwaysBackgroundProps {
  style?: "synaptic" | "bioelectric" | "neural" | "quantum";
  intensity?: "low" | "medium" | "high";
}

export function NeuralPathwaysBackground({
  style = "neural",
  intensity = "medium",
}: NeuralPathwaysBackgroundProps) {
  const [nodes, setNodes] = useState<NeuralNode[]>([]);
  const [time, setTime] = useState(0);

  const nodeCount = intensity === "low" ? 15 : intensity === "medium" ? 25 : 35;

  useEffect(() => {
    // Create neural network nodes
    const newNodes: NeuralNode[] = Array.from({ length: nodeCount }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 8 + 4,
      pulse: Math.random() * 2 * Math.PI,
      connections: [],
      activity: Math.random(),
    }));

    // Create connections between nearby nodes
    newNodes.forEach((node, i) => {
      newNodes.forEach((otherNode, j) => {
        if (i !== j) {
          const distance = Math.sqrt(
            Math.pow(node.x - otherNode.x, 2) + Math.pow(node.y - otherNode.y, 2)
          );
          if (distance < 25 && Math.random() > 0.6) {
            node.connections.push(j);
          }
        }
      });
    });

    setNodes(newNodes);
  }, [nodeCount]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prev) => prev + 0.02);

      setNodes((prev) =>
        prev.map((node) => ({
          ...node,
          activity: Math.max(0, Math.min(1, node.activity + (Math.random() - 0.5) * 0.1)),
          pulse: node.pulse + 0.02,
        }))
      );
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const getStyleColors = () => {
    switch (style) {
      case "synaptic":
        return {
          primary: "rgba(0, 255, 255, 0.8)",
          secondary: "rgba(255, 100, 200, 0.6)",
          accent: "rgba(100, 255, 100, 0.4)",
        };
      case "bioelectric":
        return {
          primary: "rgba(255, 165, 0, 0.8)",
          secondary: "rgba(255, 69, 0, 0.6)",
          accent: "rgba(255, 215, 0, 0.4)",
        };
      case "quantum":
        return {
          primary: "rgba(138, 43, 226, 0.8)",
          secondary: "rgba(75, 0, 130, 0.6)",
          accent: "rgba(148, 0, 211, 0.4)",
        };
      default:
        return {
          primary: "rgba(34, 197, 94, 0.8)",
          secondary: "rgba(59, 130, 246, 0.6)",
          accent: "rgba(168, 85, 247, 0.4)",
        };
    }
  };

  const colors = getStyleColors();

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: -2 }}>
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-gray-900 to-black" />

      {/* Neural network inspired background patterns */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0 bg-[url('/lovable-uploads/93093efd-1912-4361-987d-424e6cf8e1df.png')] bg-cover bg-center mix-blend-screen"
          style={{ filter: "hue-rotate(120deg)" }}
        />
      </div>

      {/* Animated SVG neural network */}
      <svg className="absolute inset-0 w-full h-full" style={{ mixBlendMode: "screen" }}>
        {/* Neural connections */}
        {nodes.map((node) =>
          node.connections.map((connectionId) => {
            const targetNode = nodes[connectionId];
            if (!targetNode) return null;

            const activity = (node.activity + targetNode.activity) / 2;
            const opacity = Math.sin(time + node.pulse) * 0.3 + 0.4;

            return (
              <line
                key={`${node.id}-${connectionId}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${targetNode.x}%`}
                y2={`${targetNode.y}%`}
                stroke={colors.secondary}
                strokeWidth={activity * 2 + 0.5}
                opacity={opacity * activity}
                className="animate-pulse"
              />
            );
          })
        )}

        {/* Neural nodes */}
        {nodes.map((node) => {
          const pulseScale = Math.sin(time + node.pulse) * 0.3 + 1;
          const glowIntensity = node.activity * 0.8 + 0.2;

          return (
            <g key={node.id}>
              {/* Outer glow */}
              <circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={node.size * pulseScale * 2}
                fill={colors.accent}
                opacity={glowIntensity * 0.3}
                className="animate-pulse"
              />
              {/* Main node */}
              <circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={node.size * pulseScale}
                fill={colors.primary}
                opacity={glowIntensity}
              />
              {/* Core highlight */}
              <circle
                cx={`${node.x}%`}
                cy={`${node.y}%`}
                r={node.size * pulseScale * 0.4}
                fill="white"
                opacity={glowIntensity * 0.8}
              />
            </g>
          );
        })}

        {/* Electrical activity waves */}
        {Array.from({ length: 3 }).map((_, i) => (
          <circle
            key={`wave-${i}`}
            cx="50%"
            cy="50%"
            r={`${20 + i * 15 + Math.sin(time + i) * 5}%`}
            fill="none"
            stroke={colors.primary}
            strokeWidth="1"
            opacity={0.1 + Math.sin(time + i) * 0.05}
            className="animate-pulse"
          />
        ))}
      </svg>

      {/* Floating particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: colors.accent,
              animationDelay: `${i * 0.2}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              boxShadow: `0 0 ${Math.random() * 10 + 5}px currentColor`,
            }}
          />
        ))}
      </div>

      {/* Gaia Exchange logo integration */}
      <div className="absolute top-10 left-10 opacity-10">
        <div className="text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          GAIA
        </div>
        <div className="text-sm text-center text-green-400 opacity-60">Neural Exchange Network</div>
      </div>
    </div>
  );
}
