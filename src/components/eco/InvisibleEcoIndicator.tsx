// Invisible Eco Status Indicator - Minimal UI for showing eco-system is active
import React from "react";
import { useEcoIntegration } from "@/services/ecoIntegration";
import { Badge } from "@/components/ui/badge";

export function InvisibleEcoIndicator() {
  const { userProfile } = useEcoIntegration();

  // Only show for admin users, completely invisible to regular users
  const isAdmin = localStorage.getItem("admin-logged-in") === "true";

  if (!isAdmin) {
    return null; // Completely invisible to regular users
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 space-y-1">
      <Badge
        variant="secondary"
        className="bg-green-900/80 text-green-100 text-xs"
      >
        🌱 Eco: {userProfile.totalCarbonReduced.toFixed(1)}kg CO₂
      </Badge>
      <Badge
        variant="secondary"
        className="bg-blue-900/80 text-blue-100 text-xs"
      >
        🪙 {userProfile.totalTokensEarned} GAIA
      </Badge>
    </div>
  );
}
