// Eco-Friendly Token Economy and User Missions Integration
import { useState, useEffect } from "react";

export interface EcoMission {
  id: string;
  type: "bike_ride" | "tree_planting" | "recycling" | "green_energy" | "ocean_cleanup";
  title: string;
  description: string;
  carbonImpact: number; // kg CO2 reduced
  tokenReward: number;
  status: "available" | "active" | "completed" | "verified";
  progress: number; // 0-100
  difficulty: "easy" | "medium" | "hard";
  location?: string;
  deadline?: Date;
}

export interface EcoBadge {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  earned: boolean;
  earnedDate?: Date;
  requirements: string[];
}

export interface BikeActivity {
  id: string;
  distance: number; // km
  duration: number; // minutes
  carbonSaved: number; // kg CO2
  tokenEarned: number;
  timestamp: Date;
  route?: string;
}

export interface UserEcoProfile {
  totalCarbonReduced: number;
  totalTokensEarned: number;
  activeMissions: number;
  completedMissions: number;
  badges: EcoBadge[];
  bikeActivities: BikeActivity[];
  greenLevel: number;
  ecoRank: string;
}

class EcoIntegrationService {
  private userProfile: UserEcoProfile = {
    totalCarbonReduced: 0,
    totalTokensEarned: 0,
    activeMissions: 0,
    completedMissions: 0,
    badges: [],
    bikeActivities: [],
    greenLevel: 1,
    ecoRank: "Eco Newcomer",
  };

  private availableMissions: EcoMission[] = [];
  private callbacks: ((profile: UserEcoProfile) => void)[] = [];

  constructor() {
    this.initializeDefaultData();
    this.startMissionGenerator();
  }

  private initializeDefaultData() {
    // Initialize with some demo data
    this.userProfile = {
      totalCarbonReduced: 247.5,
      totalTokensEarned: 12450,
      activeMissions: 3,
      completedMissions: 18,
      badges: [
        {
          id: "first-ride",
          name: "First Ride",
          description: "Complete your first bike mission",
          iconUrl: "🚴",
          earned: true,
          earnedDate: new Date("2024-01-15"),
          requirements: ["Complete 1 bike ride mission"],
        },
        {
          id: "carbon-warrior",
          name: "Carbon Warrior",
          description: "Reduce 100kg of CO2",
          iconUrl: "🌱",
          earned: true,
          earnedDate: new Date("2024-02-01"),
          requirements: ["Reduce 100kg CO2 through missions"],
        },
        {
          id: "tree-hugger",
          name: "Tree Hugger",
          description: "Plant 10 trees",
          iconUrl: "🌳",
          earned: false,
          requirements: ["Complete 10 tree planting missions"],
        },
      ],
      bikeActivities: [
        {
          id: "ride-1",
          distance: 12.5,
          duration: 45,
          carbonSaved: 2.3,
          tokenEarned: 125,
          timestamp: new Date("2024-12-22"),
          route: "Downtown to Park",
        },
      ],
      greenLevel: 5,
      ecoRank: "Eco Champion",
    };

    this.generateInitialMissions();
  }

  private generateInitialMissions() {
    this.availableMissions = [
      {
        id: "bike-work-1",
        type: "bike_ride",
        title: "Bike to Work Challenge",
        description: "Use your GAIA Bike to commute to work for 5 days",
        carbonImpact: 15.2,
        tokenReward: 500,
        status: "available",
        progress: 0,
        difficulty: "medium",
        deadline: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      },
      {
        id: "tree-plant-1",
        type: "tree_planting",
        title: "Urban Forest Initiative",
        description: "Plant native trees in designated urban areas",
        carbonImpact: 50.0,
        tokenReward: 1000,
        status: "available",
        progress: 0,
        difficulty: "hard",
        location: "City Central Park",
      },
      {
        id: "recycle-1",
        type: "recycling",
        title: "Plastic-Free Week",
        description: "Avoid single-use plastics and recycle existing waste",
        carbonImpact: 8.5,
        tokenReward: 300,
        status: "available",
        progress: 0,
        difficulty: "easy",
      },
      {
        id: "energy-1",
        type: "green_energy",
        title: "Solar Panel Installation",
        description: "Install or advocate for solar panels in your community",
        carbonImpact: 200.0,
        tokenReward: 2500,
        status: "available",
        progress: 0,
        difficulty: "hard",
      },
    ];
  }

  private startMissionGenerator() {
    // Generate new missions periodically
    setInterval(() => {
      this.generateNewMission();
    }, 30000); // Every 30 seconds for demo purposes
  }

  private generateNewMission() {
    const missionTypes: EcoMission["type"][] = [
      "bike_ride",
      "tree_planting",
      "recycling",
      "green_energy",
      "ocean_cleanup",
    ];

    const randomType = missionTypes[Math.floor(Math.random() * missionTypes.length)];
    const missionTemplates = this.getMissionTemplates(randomType);
    const template = missionTemplates[Math.floor(Math.random() * missionTemplates.length)];

    const newMission: EcoMission = {
      id: `mission-${Date.now()}`,
      type: randomType,
      title: template.title,
      description: template.description,
      carbonImpact: template.carbonImpact + (Math.random() * 10 - 5), // Add some variance
      tokenReward: template.tokenReward + Math.floor(Math.random() * 200 - 100),
      status: "available",
      progress: 0,
      difficulty: template.difficulty,
      deadline: template.hasDeadline
        ? new Date(Date.now() + Math.random() * 14 * 24 * 60 * 60 * 1000)
        : undefined,
    };

    // Only add if we don't have too many missions
    if (this.availableMissions.length < 10) {
      this.availableMissions.push(newMission);
      console.log(`🌱 New eco-mission generated: ${newMission.title}`);
    }
  }

  private getMissionTemplates(type: EcoMission["type"]) {
    const templates = {
      bike_ride: [
        {
          title: "Green Commute Challenge",
          description: "Use eco-friendly transportation for daily commute",
          carbonImpact: 12.0,
          tokenReward: 400,
          difficulty: "medium" as const,
          hasDeadline: true,
        },
        {
          title: "Weekend Nature Ride",
          description: "Explore nature trails on your GAIA Bike",
          carbonImpact: 8.5,
          tokenReward: 250,
          difficulty: "easy" as const,
          hasDeadline: false,
        },
      ],
      tree_planting: [
        {
          title: "Forest Recovery Mission",
          description: "Help restore damaged forest areas",
          carbonImpact: 75.0,
          tokenReward: 1500,
          difficulty: "hard" as const,
          hasDeadline: false,
        },
      ],
      recycling: [
        {
          title: "Zero Waste Challenge",
          description: "Reduce household waste to zero for one week",
          carbonImpact: 5.2,
          tokenReward: 200,
          difficulty: "medium" as const,
          hasDeadline: true,
        },
      ],
      green_energy: [
        {
          title: "Community Solar Project",
          description: "Participate in local renewable energy initiative",
          carbonImpact: 150.0,
          tokenReward: 2000,
          difficulty: "hard" as const,
          hasDeadline: false,
        },
      ],
      ocean_cleanup: [
        {
          title: "Beach Cleanup Drive",
          description: "Remove plastic waste from coastal areas",
          carbonImpact: 20.0,
          tokenReward: 600,
          difficulty: "medium" as const,
          hasDeadline: false,
        },
      ],
    };

    return templates[type] || [];
  }

  // Public methods
  getUserProfile(): UserEcoProfile {
    return { ...this.userProfile };
  }

  getAvailableMissions(): EcoMission[] {
    return [...this.availableMissions.filter((m) => m.status === "available")];
  }

  getActiveMissions(): EcoMission[] {
    return [...this.availableMissions.filter((m) => m.status === "active")];
  }

  startMission(missionId: string): boolean {
    const mission = this.availableMissions.find((m) => m.id === missionId);
    if (!mission || mission.status !== "available") return false;

    mission.status = "active";
    this.userProfile.activeMissions++;

    console.log(`🚀 Mission started: ${mission.title}`);
    this.notifyCallbacks();
    return true;
  }

  updateMissionProgress(missionId: string, progress: number): boolean {
    const mission = this.availableMissions.find((m) => m.id === missionId);
    if (!mission || mission.status !== "active") return false;

    mission.progress = Math.min(100, Math.max(0, progress));

    if (mission.progress >= 100) {
      this.completeMission(missionId);
    }

    this.notifyCallbacks();
    return true;
  }

  completeMission(missionId: string): boolean {
    const mission = this.availableMissions.find((m) => m.id === missionId);
    if (!mission) return false;

    mission.status = "completed";
    mission.progress = 100;

    // Award rewards
    this.userProfile.totalCarbonReduced += mission.carbonImpact;
    this.userProfile.totalTokensEarned += mission.tokenReward;
    this.userProfile.activeMissions = Math.max(0, this.userProfile.activeMissions - 1);
    this.userProfile.completedMissions++;

    // Update level and rank
    this.updateUserLevel();

    console.log(`✅ Mission completed: ${mission.title}`);
    console.log(`🪙 Earned ${mission.tokenReward} GAIA tokens`);
    console.log(`🌱 Reduced ${mission.carbonImpact}kg CO2`);

    // Check for new badges
    this.checkBadgeEarning();

    this.notifyCallbacks();
    return true;
  }

  recordBikeActivity(distance: number, duration: number): BikeActivity {
    const carbonSaved = distance * 0.184; // Average CO2 saved per km
    const tokenEarned = Math.floor(distance * 10); // 10 tokens per km

    const activity: BikeActivity = {
      id: `bike-${Date.now()}`,
      distance,
      duration,
      carbonSaved,
      tokenEarned,
      timestamp: new Date(),
    };

    this.userProfile.bikeActivities.unshift(activity);
    this.userProfile.totalCarbonReduced += carbonSaved;
    this.userProfile.totalTokensEarned += tokenEarned;

    console.log(
      `🚴 GAIA Bike activity recorded: ${distance}km, ${carbonSaved.toFixed(2)}kg CO2 saved`
    );

    this.updateUserLevel();
    this.checkBadgeEarning();
    this.notifyCallbacks();

    return activity;
  }

  private updateUserLevel() {
    const newLevel = Math.floor(this.userProfile.totalCarbonReduced / 50) + 1;
    if (newLevel > this.userProfile.greenLevel) {
      this.userProfile.greenLevel = newLevel;
      console.log(`🎉 Level up! You are now Green Level ${newLevel}`);
    }

    // Update rank based on level
    if (newLevel >= 20) this.userProfile.ecoRank = "Eco Legend";
    else if (newLevel >= 15) this.userProfile.ecoRank = "Eco Master";
    else if (newLevel >= 10) this.userProfile.ecoRank = "Eco Champion";
    else if (newLevel >= 5) this.userProfile.ecoRank = "Eco Warrior";
    else this.userProfile.ecoRank = "Eco Newcomer";
  }

  private checkBadgeEarning() {
    this.userProfile.badges.forEach((badge) => {
      if (badge.earned) return;

      let earned = false;

      switch (badge.id) {
        case "tree-hugger": {
          const treeMissions = this.availableMissions.filter(
            (m) => m.type === "tree_planting" && m.status === "completed"
          ).length;
          earned = treeMissions >= 10;
          break;
        }

        case "distance-rider": {
          const totalDistance = this.userProfile.bikeActivities.reduce(
            (sum, a) => sum + a.distance,
            0
          );
          earned = totalDistance >= 100;
          break;
        }
      }

      if (earned) {
        badge.earned = true;
        badge.earnedDate = new Date();
        console.log(`🏆 Badge earned: ${badge.name}`);
      }
    });
  }

  subscribe(callback: (profile: UserEcoProfile) => void) {
    this.callbacks.push(callback);
    callback(this.userProfile);
  }

  unsubscribe(callback: (profile: UserEcoProfile) => void) {
    this.callbacks = this.callbacks.filter((cb) => cb !== callback);
  }

  private notifyCallbacks() {
    this.callbacks.forEach((callback) => callback(this.userProfile));
  }
}

// Create singleton instance
export const ecoIntegration = new EcoIntegrationService();

// React hook for components
export function useEcoIntegration() {
  const [userProfile, setUserProfile] = useState<UserEcoProfile>({
    totalCarbonReduced: 0,
    totalTokensEarned: 0,
    activeMissions: 0,
    completedMissions: 0,
    badges: [],
    bikeActivities: [],
    greenLevel: 1,
    ecoRank: "Eco Newcomer",
  });

  useEffect(() => {
    ecoIntegration.subscribe(setUserProfile);
    return () => ecoIntegration.unsubscribe(setUserProfile);
  }, []);

  return {
    userProfile,
    availableMissions: ecoIntegration.getAvailableMissions(),
    activeMissions: ecoIntegration.getActiveMissions(),
    startMission: (id: string) => ecoIntegration.startMission(id),
    updateMissionProgress: (id: string, progress: number) =>
      ecoIntegration.updateMissionProgress(id, progress),
    completeMission: (id: string) => ecoIntegration.completeMission(id),
    recordBikeActivity: (distance: number, duration: number) =>
      ecoIntegration.recordBikeActivity(distance, duration),
  };
}
