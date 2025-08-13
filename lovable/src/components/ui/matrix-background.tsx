import { useEffect, useRef } from "react";

interface MatrixBackgroundProps {
  speed?: number;
  density?: number;
  color?: string;
  fadeEffect?: boolean;
}

export function MatrixBackground({
  speed = 50,
  density = 20,
  color = "#00ff00",
  fadeEffect = true,
}: MatrixBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    // Matrix rain setup
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+-=[]{}|;:,.<>?";
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = [];

    // Initialize drops
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.random() * canvas.height;
    }

    const draw = () => {
      // Fade effect
      if (fadeEffect) {
        ctx.fillStyle = "rgba(0, 0, 0, 0.05)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }

      ctx.fillStyle = color;
      ctx.font = `${fontSize}px monospace`;

      // Draw characters
      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        ctx.fillText(char, x, y);

        // Reset drop if it reaches bottom or random reset
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }

        // Move drop down
        drops[i] += Math.random() * (density / 10);
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    // Start animation with speed control
    const interval = setInterval(draw, 100 - speed);

    return () => {
      clearInterval(interval);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener("resize", resizeCanvas);
    };
  }, [speed, density, color, fadeEffect]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-30"
      style={{ background: "transparent" }}
    />
  );
}
