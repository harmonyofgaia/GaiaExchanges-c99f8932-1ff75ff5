import { useState, useEffect, useCallback} from "react";

interface GlowingTextProps {
  text: string;
  className?: string;
  glowColor?: string;
  toggleable?: boolean;
}

export function GlowingText({
  text,
  className = "",
  glowColor = "rgb(34, 197, 94)",
  toggleable = true,
}: GlowingTextProps) {
  const [isGlowing, setIsGlowing] = useState(true);

  useEffect(() => {
    if (!toggleable) return;

    const interval = setInterval(() => {
      setIsGlowing((prev) => !prev);
    }, 2000); // Toggle every 2 seconds

    return () => clearInterval(interval);
  }, [toggleable]);

  const glowStyle = isGlowing
    ? {
        textShadow: `
      0 0 5px ${glowColor},
      0 0 10px ${glowColor},
      0 0 15px ${glowColor},
      0 0 20px ${glowColor},
      0 0 35px ${glowColor},
      0 0 40px ${glowColor}
    `,
        color: glowColor,
        filter: "brightness(1.2)",
      }
    : {
        color: glowColor.replace("rgb", "rgba").replace(")", ", 0.7)"),
        textShadow: "none",
      };

  return (
    <span
      className={`inline-block transition-all duration-500 ${className}`}
      style={glowStyle}
      onClick={() => toggleable && setIsGlowing((prev) => !prev)}
    >
      {text}
    </span>
  );
}
