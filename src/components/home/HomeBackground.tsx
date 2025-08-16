import { useEffect, useRef, useCallback} from "react";
import { EnhancedHomeBackground } from "./EnhancedHomeBackground";

export function HomeBackground() {
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

    // Enhanced particle system with electrical effects
    const particles: Array<{
      x: number;,
      y: number;,
      vx: number;,
      vy: number;,
      size: number;,
      color: string;,
      alpha: number;,
      trail: Array<{ x: number; y: number; alpha: number }>;
    }> = [];

    // Create enhanced particles with trails
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 3,
        vy: (Math.random() - 0.5) * 3,
        size: Math.random() * 4 + 2,
        color: ["#00ffff", "#ff00ff", "#00ff00", "#ffff00", "#ff0080"][
          Math.floor(Math.random() * 5)
        ],
        alpha: Math.random() * 0.8 + 0.2,
        trail: [],
      });
    }

    // Animation loop with enhanced effects
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Enhanced gradient background
      const gradient = ctx.createRadialGradient(
        canvas.width / 2,
        canvas.height / 2,
        0,
        canvas.width / 2,
        canvas.height / 2,
        Math.max(canvas.width, canvas.height) / 2
      );
      gradient.addColorStop(0, "rgba(0, 255, 255, 0.03)");
      gradient.addColorStop(0.3, "rgba(255, 0, 255, 0.02)");
      gradient.addColorStop(0.6, "rgba(0, 255, 0, 0.015)");
      gradient.addColorStop(1, "rgba(0, 0, 0, 0.9)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw particles with trails
      particles.forEach((particle, index) => {
        // Update trail
        particle.trail.push({
          x: particle.x,
          y: particle.y,
          alpha: particle.alpha,
        });
        if (particle.trail.length > 10) {
          particle.trail.shift();
        }

        // Update position
        particle.x += particle.vx;
        particle.y += particle.vy;

        // Bounce off edges with electrical spark effect
        if (particle.x <= 0 || particle.x >= canvas.width) {
          particle.vx *= -1;
          // Create spark effect
          ctx.save();
          ctx.globalAlpha = 0.8;
          ctx.strokeStyle = particle.color;
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size * 3, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }
        if (particle.y <= 0 || particle.y >= canvas.height) {
          particle.vy *= -1;
        }

        // Draw trail
        particle.trail.forEach((point, trailIndex) => {
          const trailAlpha = (trailIndex / particle.trail.length) * point.alpha * 0.5;
          ctx.save();
          ctx.globalAlpha = trailAlpha;
          ctx.fillStyle = particle.color;
          ctx.beginPath();
          ctx.arc(point.x, point.y, particle.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        });

        // Draw particle with glow effect
        ctx.save();
        ctx.globalAlpha = particle.alpha;

        // Outer glow
        const glowGradient = ctx.createRadialGradient(
          particle.x,
          particle.y,
          0,
          particle.x,
          particle.y,
          particle.size * 4
        );
        glowGradient.addColorStop(0, particle.color);
        glowGradient.addColorStop(1, "transparent");

        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size * 4, 0, Math.PI * 2);
        ctx.fill();

        // Core particle
        ctx.fillStyle = particle.color;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Enhanced connections with electrical arcs
        particles.slice(index + 1).forEach((otherParticle) => {
          const dx = particle.x - otherParticle.x;
          const dy = particle.y - otherParticle.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 200) {
            const alpha = ((200 - distance) / 200) * 0.3;

            // Main connection
            ctx.save();
            ctx.globalAlpha = alpha;
            ctx.strokeStyle = particle.color;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(otherParticle.x, otherParticle.y);
            ctx.stroke();

            // Electrical arc effect
            if (alpha > 0.2) {
              ctx.strokeStyle = "#ffffff";
              ctx.lineWidth = 1;
              ctx.globalAlpha = alpha * 0.5;
              ctx.stroke();
            }
            ctx.restore();
          }
        });
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full -z-20"
        style={{
          background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a2e 50%, #0f0f0f 100%)",
        }}
      />
      <EnhancedHomeBackground />
    </>
  );
}
