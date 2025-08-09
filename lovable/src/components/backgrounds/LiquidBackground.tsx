import { useEffect, useRef } from "react";

interface LiquidBackgroundProps {
  intensity?: "low" | "medium" | "high";
  color?: string;
  speed?: number;
  className?: string;
}

export function LiquidBackground({
  intensity = "medium",
  color = "#00ff00",
  speed = 1,
  className = "",
}: LiquidBackgroundProps) {
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

    // Liquid wave parameters
    const waves = [];
    const waveCount = intensity === "low" ? 3 : intensity === "medium" ? 5 : 8;

    for (let i = 0; i < waveCount; i++) {
      waves.push({
        y: Math.random() * canvas.height,
        length: 0.01 + Math.random() * 0.02,
        amplitude: 50 + Math.random() * 50,
        frequency: 0.01 + Math.random() * 0.02,
        phase: Math.random() * Math.PI * 2,
      });
    }

    let time = 0;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, "rgba(0, 0, 0, 0.9)");
      gradient.addColorStop(0.5, "rgba(0, 50, 0, 0.8)");
      gradient.addColorStop(1, "rgba(0, 100, 0, 0.7)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw liquid waves
      waves.forEach((wave, index) => {
        ctx.beginPath();
        ctx.moveTo(0, canvas.height);

        for (let x = 0; x <= canvas.width; x += 2) {
          const y =
            wave.y +
            Math.sin(x * wave.length + time * speed + wave.phase) *
              wave.amplitude;
          ctx.lineTo(x, y);
        }

        ctx.lineTo(canvas.width, canvas.height);
        ctx.closePath();

        // Create liquid gradient
        const liquidGradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
        const alpha = 0.1 + index * 0.05;
        liquidGradient.addColorStop(0, `rgba(0, 255, 150, ${alpha})`);
        liquidGradient.addColorStop(0.5, `rgba(0, 200, 100, ${alpha * 0.8})`);
        liquidGradient.addColorStop(1, `rgba(0, 150, 50, ${alpha * 0.6})`);

        ctx.fillStyle = liquidGradient;
        ctx.fill();

        // Add glow effect
        ctx.shadowColor = color;
        ctx.shadowBlur = 20;
        ctx.strokeStyle = `${color}40`;
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      time += 0.01 * speed;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

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
      className={`fixed inset-0 pointer-events-none ${className}`}
      style={{ zIndex: -1 }}
    />
  );
}
