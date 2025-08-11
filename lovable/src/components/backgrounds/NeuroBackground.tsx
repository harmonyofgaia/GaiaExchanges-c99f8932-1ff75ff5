import { useEffect, useRef } from "react";
import { createPatternNode, Quadtree } from "@/utils/patternUtils";

export interface NeuroBackgroundProps {
  intensity?: "low" | "medium" | "high";
  color?: string;
  speed?: number;
  pattern?: "default" | "creative" | "abstract" | "organic" | "geometric";
  neuralDensity?: number;
}

export function NeuroBackground({
  intensity = "medium",
  color = "#00ffff",
  speed = 1,
  pattern = "default",
  neuralDensity = 50,
}: NeuroBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Initialize neural network nodes
    const nodes = [];
    for (let i = 0; i < neuralDensity; i++) {
      const node = createPatternNode(
        Math.random() * canvas.width,
        Math.random() * canvas.height,
        Math.random(),
      );
      nodes.push(node);
    }

    // Create quadtree for spatial partitioning
    const quadtree = new Quadtree({
      x: 0,
      y: 0,
      width: canvas.width,
      height: canvas.height,
    });

    // Insert nodes into quadtree
    nodes.forEach((node) => quadtree.insert(node));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw neural connections
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 0.6;

      nodes.forEach((node) => {
        // Find nearby nodes for connections
        const nearbyNodes = quadtree.query({
          x: node.x - 100,
          y: node.y - 100,
          width: 200,
          height: 200,
        });

        nearbyNodes.forEach((nearbyNode) => {
          if (nearbyNode.id !== node.id) {
            const distance = Math.sqrt(
              Math.pow(node.x - nearbyNode.x, 2) +
                Math.pow(node.y - nearbyNode.y, 2),
            );

            if (distance < 150) {
              ctx.beginPath();
              ctx.moveTo(node.x, node.y);
              ctx.lineTo(nearbyNode.x, nearbyNode.y);
              ctx.stroke();
            }
          }
        });

        // Draw node
        ctx.fillStyle = color;
        ctx.globalAlpha = node.intensity;
        ctx.beginPath();
        ctx.arc(node.x, node.y, 3, 0, Math.PI * 2);
        ctx.fill();

        // Animate node movement
        node.x += (Math.random() - 0.5) * speed;
        node.y += (Math.random() - 0.5) * speed;

        // Bounce off edges
        if (node.x < 0 || node.x > canvas.width)
          node.x = Math.random() * canvas.width;
        if (node.y < 0 || node.y > canvas.height)
          node.y = Math.random() * canvas.height;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [intensity, color, speed, pattern, neuralDensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.4 }}
    />
  );
}
