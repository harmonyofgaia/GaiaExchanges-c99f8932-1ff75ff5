import { GAIA_BRANDING } from "@/constants/branding";

interface GaiaLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  variant?: "default" | "matrix" | "glow";
  className?: string;
  showText?: boolean;
}

export function GaiaLogo({
  size = "md",
  variant = "default",
  className = "",
  showText = true,
}: GaiaLogoProps) {
  const sizeClasses = {
    sm: "w-8 h-8 text-sm",
    md: "w-12 h-12 text-base",
    lg: "w-16 h-16 text-xl",
    xl: "w-24 h-24 text-3xl",
  };

  const variantClasses = {
    default: "text-green-400",
    matrix: "text-green-400 animate-pulse shadow-green-400/50",
    glow: "text-green-400 drop-shadow-[0_0_15px_rgba(34,197,94,0.8)]",
  };

  return (
    <div
      className={`${sizeClasses[size]} ${variantClasses[variant]} ${className} flex items-center gap-3`}
    >
      <div className="relative">
        {/* Main Logo Symbol */}
        <div className="relative flex items-center justify-center">
          <img
            src="/lovable-uploads/e2cc6708-58e6-4f52-b2ad-b98967ce3b7c.png"
            alt="Harmony of Gaia"
            className={`${size === "sm" ? "w-8 h-8" : size === "md" ? "w-12 h-12" : size === "lg" ? "w-16 h-16" : "w-24 h-24"} object-contain`}
          />
          {variant === "matrix" && (
            <div className="absolute inset-0 opacity-30 animate-ping">
              <img
                src="/lovable-uploads/e2cc6708-58e6-4f52-b2ad-b98967ce3b7c.png"
                alt="Harmony of Gaia"
                className={`${size === "sm" ? "w-8 h-8" : size === "md" ? "w-12 h-12" : size === "lg" ? "w-16 h-16" : "w-24 h-24"} object-contain filter brightness-150`}
              />
            </div>
          )}
        </div>

        {/* Orbiting Elements */}
        <div className="absolute -top-1 -right-1 text-green-400 text-xs animate-spin">
          ⚡
        </div>
        <div className="absolute -bottom-1 -left-1 text-blue-400 text-xs animate-pulse">
          💎
        </div>
      </div>

      {showText && (
        <div className="flex flex-col">
          <span className="font-bold text-green-400 leading-tight">
            {GAIA_BRANDING.NAME}
          </span>
          <span className="text-xs text-green-300 opacity-80 leading-tight">
            Web3 Exchange
          </span>
        </div>
      )}
    </div>
  );
}
