import { useEffect, useRef } from "react";

interface HolographicBackgroundProps {
  intensity?: "low" | "medium" | "high";
  color?: string;
  speed?: number;
}

export function HolographicBackground({
  intensity = "medium",
  color = "#00ffff",
  speed = 1,
}: HolographicBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

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

    const layerCount = intensity === "low" ? 3 : intensity === "high" ? 7 : 5;

    const draw = () => {
      ctx.fillStyle = "rgba(0, 0, 0, 0.02)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const time = Date.now() * 0.001 * speed;

      // Draw holographic layers
      for (let layer = 0; layer < layerCount; layer++) {
        const offset = layer * 20;
        const alpha = (Math.sin(time + layer) * 0.3 + 0.7) * (0.8 - layer * 0.1);

        ctx.globalAlpha = alpha;
        ctx.strokeStyle = color;
        ctx.lineWidth = 2;

        // Horizontal scan lines
        for (let y = offset; y < canvas.height; y += 8) {
          const waveOffset = Math.sin(time * 2 + y * 0.01) * 20;
          ctx.beginPath();
          ctx.moveTo(0, y + waveOffset);
          ctx.lineTo(canvas.width, y + waveOffset);
          ctx.stroke();
        }

        // Vertical interference patterns
        ctx.globalAlpha = alpha * 0.3;
        for (let x = 0; x < canvas.width; x += 40) {
          const interference = Math.sin(time * 3 + x * 0.01) * canvas.height * 0.1;
          ctx.beginPath();
          ctx.moveTo(x, canvas.height * 0.5 - interference);
          ctx.lineTo(x, canvas.height * 0.5 + interference);
          ctx.stroke();
        }
      }

      // Holographic glitch effect
      if (Math.random() > 0.98) {
        ctx.globalAlpha = 0.8;
        ctx.fillStyle = color + "40";
        const glitchHeight = Math.random() * 50 + 10;
        const glitchY = Math.random() * canvas.height;
        ctx.fillRect(0, glitchY, canvas.width, glitchHeight);
      }

      ctx.globalAlpha = 1;
      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [intensity, color, speed]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.5 }}
    />
  );
}
