
import { HomeIcon, Users, Settings, Shield, BarChart3, Leaf, Target, Sparkles, Globe, Heart, TreePine, Flame } from "lucide-react";

// Enhanced navigation with Master Plan v7 features
export interface NavigationItem {
  title: string;
  to: string;
  icon: typeof HomeIcon;
  variant: "default" | "ghost";
  masterPlanVersion?: "v7" | "v3";
  features?: string[];
  description?: string;
  lazyLoaded?: boolean;
}

export const navigationItems: NavigationItem[] = [
  {
    title: "Home",
    to: "/",
    icon: HomeIcon,
    variant: "default" as const,
    description: "Gateway to the GaiaExchanges ecosystem",
    lazyLoaded: true,
  },
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: BarChart3,
    variant: "ghost" as const,
    description: "Comprehensive platform analytics and overview",
    lazyLoaded: true,
  },
  {
    title: "Exchange",
    to: "/exchange",
    icon: Users,
    variant: "ghost" as const,
    description: "Multi-chain token exchange and trading platform",
    lazyLoaded: true,
  },
  {
    title: "Gaia's Projects",
    to: "/gaias-projects",
    icon: TreePine,
    variant: "ghost" as const,
    description: "Environmental project showcase and participation",
    lazyLoaded: true,
  },
  {
    title: "Green Impact",
    to: "/green-impact-dashboard",
    icon: Leaf,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Advanced Impact Metrics",
      "AI-Powered Predictions",
      "Global Leaderboards",
      "Achievement System",
      "Real-time Environmental Data"
    ],
    description: "Master Plan v7: Enhanced environmental impact tracking with AI insights",
    lazyLoaded: true,
  },
  {
    title: "Project Funding",
    to: "/project-funding",
    icon: Heart,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Decentralized Governance",
      "Smart Contract Automation",
      "Multi-signature Security",
      "Impact Verification",
      "Community Voting"
    ],
    description: "Master Plan v7: Advanced decentralized funding with governance",
    lazyLoaded: true,
  },
  {
    title: "Eco Missions",
    to: "/eco-missions",
    icon: Target,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "AI Mission Generation",
      "Geolocation Integration",
      "Community Challenges",
      "Progress Tracking",
      "Reward Optimization"
    ],
    description: "Master Plan v7: AI-powered mission generation and tracking",
    lazyLoaded: true,
  },
  {
    title: "Planet Cleaning",
    to: "/planet-cleaning",
    icon: Globe,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Satellite Verification",
      "IoT Sensor Integration",
      "Blockchain Rewards",
      "Global Impact Mapping",
      "Community Coordination"
    ],
    description: "Master Plan v7: Verified cleanup activities with satellite monitoring",
    lazyLoaded: true,
  },
  {
    title: "NFT Cards",
    to: "/nft-cards",
    icon: Sparkles,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Biodiversity Collection",
      "Dynamic Rarity System",
      "Ecosystem Interactions",
      "Trading Marketplace",
      "Conservation Partnerships"
    ],
    description: "Master Plan v7: Advanced biodiversity NFT ecosystem",
    lazyLoaded: true,
  },
  {
    title: "Eco Avatar",
    to: "/eco-avatar",
    icon: Users,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Gaia Soul System",
      "Elemental Meditation",
      "Spiritual Evolution",
      "Avatar Customization",
      "Environmental Bonding"
    ],
    description: "Master Plan v7: Deep spiritual connection with nature through avatars",
    lazyLoaded: true,
  },
  {
    title: "Forest Shield",
    to: "/forest-shield-master-plan",
    icon: TreePine,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Sand Cannon Defense Network",
      "AI Wildfire Detection",
      "Blockchain Token System",
      "Community Engagement Hub",
      "Global Partnership Network"
    ],
    description: "Forest Shield Sand Cannon Wildfire Defense Master Plan",
    lazyLoaded: true,
  },
  {
    title: "Wildfire Defense",
    to: "/wildfire-defense-dashboard",
    icon: Flame,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Real-time Monitoring",
      "Sand Cannon Control",
      "IoT Sensor Network",
      "Emergency Response",
      "Performance Analytics"
    ],
    description: "Real-time wildfire defense monitoring and control dashboard",
    lazyLoaded: true,
  },
  {
    title: "Admin",
    to: "/admin",
    icon: Settings,
    variant: "ghost" as const,
    description: "Platform administration and management",
    lazyLoaded: true,
  },
  {
    title: "Security",
    to: "/security",
    icon: Shield,
    variant: "ghost" as const,
    description: "Security monitoring and threat detection",
    lazyLoaded: true,
  },
];

// Helper functions for Master Plan v7 features
export const getMasterPlanV7Items = () => 
  navigationItems.filter(item => item.masterPlanVersion === "v7");

export const getLazyLoadedItems = () => 
  navigationItems.filter(item => item.lazyLoaded);

export const getItemFeatures = (path: string) => 
  navigationItems.find(item => item.to === path)?.features || [];

// Default export for compatibility with './nav-items' import pattern
export default navigationItems;
