
import { useEffect, useState, useCallback } from 'react'

interface LightningStrike {
  id: number
  x: number
  y: number
  timestamp: number
}

export function LightningClickEffect() {
  const [strikes, setStrikes] = useState<LightningStrike[]>([])

  const handleClick = useCallback((e: MouseEvent) => {
    const newStrike: LightningStrike = {
      id: Date.now() + Math.random(),
      x: e.clientX,
      y: e.clientY,
      timestamp: Date.now()
    }

    setStrikes(prev => [...prev, newStrike])

    // Remove strike after animation completes
    setTimeout(() => {
      setStrikes(prev => prev.filter(strike => strike.id !== newStrike.id))
    }, 800)
  }, [])

  useEffect(() => {
    document.addEventListener('click', handleClick)
    return () => document.removeEventListener('click', handleClick)
  }, [handleClick])

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-50">
        {strikes.map((strike) => (
          <div
            key={strike.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: strike.x,
              top: strike.y,
            }}
          >
            {/* Main lightning bolt */}
            <div className="relative">
              {/* Lightning bolt SVG */}
              <svg
                width="20"
                height="24"
                viewBox="0 0 20 24"
                className="animate-[lightning_0.8s_ease-out_forwards]"
              >
                <path
                  d="M12 2L3 14h6l-1 8 9-12h-6l1-8z"
                  fill="url(#lightningGradient)"
                  stroke="rgba(255, 255, 255, 0.8)"
                  strokeWidth="0.5"
                  className="drop-shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                />
                <defs>
                  <linearGradient id="lightningGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#60a5fa" />
                    <stop offset="50%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#1d4ed8" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Electric sparks around the lightning */}
              <div className="absolute inset-0">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-blue-400 rounded-full animate-[spark_0.6s_ease-out_forwards]"
                    style={{
                      left: `${Math.random() * 20}px`,
                      top: `${Math.random() * 24}px`,
                      animationDelay: `${i * 0.1}s`,
                      boxShadow: '0 0 4px rgba(59, 130, 246, 1)'
                    }}
                  />
                ))}
              </div>

              {/* Electric glow effect */}
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-sm animate-[glow_0.8s_ease-out_forwards]" />
            </div>
          </div>
        ))}
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes lightning {
            0% {
              opacity: 0;
              transform: scale(0.5) rotate(-10deg);
              filter: brightness(2) drop-shadow(0 0 10px rgba(59, 130, 246, 1));
            }
            20% {
              opacity: 1;
              transform: scale(1.2) rotate(5deg);
              filter: brightness(3) drop-shadow(0 0 15px rgba(59, 130, 246, 1));
            }
            40% {
              opacity: 0.8;
              transform: scale(1) rotate(-2deg);
              filter: brightness(2.5) drop-shadow(0 0 12px rgba(59, 130, 246, 0.8));
            }
            100% {
              opacity: 0;
              transform: scale(0.3) rotate(0deg);
              filter: brightness(1) drop-shadow(0 0 5px rgba(59, 130, 246, 0.3));
            }
          }

          @keyframes spark {
            0% {
              opacity: 1;
              transform: translate(0, 0) scale(1);
            }
            100% {
              opacity: 0;
              transform: translate(var(--spark-x, ${Math.random() * 20 - 10}px), var(--spark-y, ${Math.random() * 20 - 10}px)) scale(0);
            }
          }

          @keyframes glow {
            0% {
              opacity: 0.8;
              transform: scale(0.5);
            }
            50% {
              opacity: 0.4;
              transform: scale(2);
            }
            100% {
              opacity: 0;
              transform: scale(3);
            }
          }
        `
      }} />
    </>
  )
}
