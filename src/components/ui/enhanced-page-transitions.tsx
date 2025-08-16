import { useEffect, useState, useCallback} from "react";
import { useLocation } from "react-router-dom";

export function EnhancedPageTransitions() {
  const location = useLocation();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [particles, setParticles] = useState<
    Array<{
      id: number;,
      x: number;,
      y: number;,
      vx: number;,
      vy: number;,
      life: number;
    }>
  >([]);

  useEffect(() => {
    setIsTransitioning(true);

    // Create transition particles
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 10,
      vy: (Math.random() - 0.5) * 10,
      life: 1,
    }));

    setParticles(newParticles);

    const timer = setTimeout(() => {
      setIsTransitioning(false);
      setParticles([]);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  if (!isTransitioning) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {/* Neural transition overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 animate-pulse" />

      {/* Electrical particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
          style={{
            left: particle.x,
            top: particle.y,
            animationDuration: `${0.5 + Math.random() * 0.5}s`,
          }}
        />
      ))}

      {/* Scanning line effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent animate-pulse transform -skew-x-12" />
    </div>
  );
}
