import { useState, useEffect } from "react";

interface UserProfile {
  id: string;
  name: string;
  ecoScore: number;
  activities: string[];
}

export function useEcoIntegration() {
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Simple mock eco integration
    setUserProfile({
      id: "user-1",
      name: "Eco Warrior",
      ecoScore: 85,
      activities: ["Water Conservation", "Solar Energy", "Tree Planting"],
    });
  }, []);

  return {
    userProfile,
    isLoading,
  };
}