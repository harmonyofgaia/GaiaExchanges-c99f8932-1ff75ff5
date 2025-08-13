import React from "react";

interface BadgeCardProps {
  gradientClassName?: string;
  className?: string;
  children: React.ReactNode;
}

export const BadgeCard: React.FC<BadgeCardProps> = ({ gradientClassName = "", className = "", children }) => {
  return (
    <div
      className={`rounded-xl shadow-lg p-4 text-white font-semibold ${gradientClassName} ${className}`.trim()}
      style={{ minWidth: 120, minHeight: 48, display: "flex", alignItems: "center", justifyContent: "center" }}
    >
      {children}
    </div>
  );
};
