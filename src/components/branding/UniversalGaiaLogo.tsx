import { useEffect, useState } from "react";

interface UniversalGaiaLogoProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl" | "responsive";
  variant?: "default" | "white" | "dark" | "colorful" | "exchange";
  position?: "left" | "center" | "right";
  animated?: boolean;
  showText?: boolean;
  className?: string;
  onClick?: () => void;
}

export function UniversalGaiaLogo({
  size = "md",
  variant = "default",
  position = "left",
  animated = true,
  showText = true,
  className = "",
  onClick,
}: UniversalGaiaLogoProps) {
  const [currentAnimation, setCurrentAnimation] = useState(0);

  const sizeClasses = {
    xs: "w-8 h-8",
    sm: "w-12 h-12",
    md: "w-16 h-16",
    lg: "w-24 h-24",
    xl: "w-32 h-32",
    responsive: "w-12 h-12 md:w-16 md:h-16 lg:w-20 lg:h-20",
  };

  const textSizeClasses = {
    xs: "text-xs",
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
    xl: "text-4xl",
    responsive: "text-sm md:text-lg lg:text-2xl",
  };

  const positionClasses = {
    left: "justify-start",
    center: "justify-center",
    right: "justify-end",
  };

  const variantStyles = {
    default: "filter-none",
    white: "brightness-0 invert",
    dark: "brightness-0",
    colorful: "hue-rotate-180 saturate-150",
    exchange: "opacity-90 hover:opacity-100",
  };

  useEffect(() => {
    if (!animated) return;

    const interval = setInterval(() => {
      setCurrentAnimation((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, [animated]);

  const getAnimationClass = () => {
    if (!animated) return "";

    switch (currentAnimation) {
      case 0:
        return "animate-pulse";
      case 1:
        return "animate-bounce";
      case 2:
        return "hover:scale-110 transition-transform duration-500";
      default:
        return "";
    }
  };

  return (
    <div className={`flex items-center gap-3 ${positionClasses[position]} ${className}`}>
      {/* Animated Background Effect */}
      {animated && (
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse rounded-full blur-xl" />
          <div className="absolute w-full h-full bg-gradient-to-l from-green-500/10 via-transparent to-blue-500/10 animate-pulse rounded-full" />
        </div>
      )}

      {/* Logo Container */}
      <div
        className={`relative ${sizeClasses[size]} ${getAnimationClass()} cursor-pointer`}
        onClick={onClick}
      >
        {/* Glow Effect */}
        {animated && (
          <div className="absolute inset-0 bg-green-400/20 rounded-full blur-lg animate-pulse" />
        )}

        {/* Main Logo - Updated to use new Harmony of Gaia logo */}
        <div className="relative z-10">
          <img
            src="/lovable-uploads/1569bfa1-1c8d-4cb2-9588-d846081e8cfb.png"
            alt="Harmony of Gaia Logo"
            className={`w-full h-full object-contain ${variantStyles[variant]} transition-all duration-300`}
          />
        </div>

        {/* Overlay Effects */}
        {animated && (
          <>
            <div
              className="absolute inset-0 bg-gradient-to-br from-transparent via-green-400/10 to-transparent rounded-full animate-spin"
              style={{ animationDuration: "8s" }}
            />
            <div
              className="absolute inset-0 bg-gradient-to-tl from-transparent via-blue-400/10 to-transparent rounded-full animate-spin"
              style={{
                animationDuration: "12s",
                animationDirection: "reverse",
              }}
            />
          </>
        )}
      </div>

      {/* Company Text */}
      {showText && (
        <div className="relative z-10">
          <div
            className={`font-bold bg-gradient-to-r from-green-400 via-emerald-300 to-green-500 bg-clip-text text-transparent ${textSizeClasses[size]}`}
          >
            Harmony of Gaia
          </div>
          {size !== "xs" && size !== "sm" && (
            <div
              className={`text-muted-foreground ${size === "responsive" ? "text-xs md:text-sm" : "text-xs"} opacity-80`}
            >
              Culture of Harmony
            </div>
          )}
        </div>
      )}
    </div>
  );
}
