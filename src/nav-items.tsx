
import { HomeIcon, Users, Settings, Shield, BarChart3, Leaf, Target, Sparkles, Globe, Heart, TreePine, Flame, Coins, Handshake, Video, Brain, Rocket, Building, Sprout, Droplets, Award, GraduationCap } from "lucide-react";

// Enhanced navigation with Master Plan v7 features and complete eco integration
export interface NavigationItem {
  title: string;
  to: string;
  icon: typeof HomeIcon;
  variant: "default" | "ghost";
  masterPlanVersion?: "v7" | "v3";
  features?: string[];
  description?: string;
  lazyLoaded?: boolean;
  category: "core" | "eco" | "blockchain" | "community" | "gaming" | "admin";
}

export const navigationItems: NavigationItem[] = [
  // Core System Pages
  {
    title: "Home",
    to: "/",
    icon: HomeIcon,
    variant: "default" as const,
    description: "Gateway to the GaiaExchanges ecosystem",
    lazyLoaded: true,
    category: "core",
  },
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: BarChart3,
    variant: "ghost" as const,
    description: "Comprehensive platform analytics and overview",
    lazyLoaded: true,
    category: "core",
  },
  {
    title: "Live Tracking",
    to: "/live-tracking",
    icon: Target,
    variant: "ghost" as const,
    description: "Real-time environmental data and project tracking",
    lazyLoaded: true,
    category: "core",
  },
  {
    title: "Wallet",
    to: "/wallet",
    icon: Coins,
    variant: "ghost" as const,
    description: "GAIA token wallet and blockchain interactions",
    lazyLoaded: true,
    category: "blockchain",
  },
  {
    title: "Markets", 
    to: "/markets",
    icon: BarChart3,
    variant: "ghost" as const,
    description: "Environmental trading and investment markets",
    lazyLoaded: true,
    category: "blockchain",
  },

  // Eco Features - Main sustainable living features
  {
    title: "Bee Hotel Network",
    to: "/bee-hotel",
    icon: Building,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Pollinator Habitat Creation",
      "GAIA Token Rewards",
      "Biodiversity Tracking",
      "Global Network Connection",
      "Staking & Expansion"
    ],
    description: "Create pollinator habitats and earn GAIA tokens through biodiversity conservation",
    lazyLoaded: true,
    category: "eco",
  },
  {
    title: "Home-Grown Food",
    to: "/home-grown-food",
    icon: Sprout,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Sustainable Agriculture",
      "Carbon Offset Tracking",
      "Crop Growth Monitoring",
      "GAIA Rewards System",
      "Seed Marketplace"
    ],
    description: "Grow your own food, earn GAIA tokens, and offset carbon through sustainable agriculture",
    lazyLoaded: true,
    category: "eco",
  },
  {
    title: "Water Storage",
    to: "/water-storage",
    icon: Droplets,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Rainwater Collection",
      "Greywater Recycling",
      "Water Purification",
      "Storage Optimization",
      "GAIA Token Earning"
    ],
    description: "Collect, purify, and store water sustainably while earning GAIA tokens",
    lazyLoaded: true,
    category: "eco",
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
    description: "Deep spiritual connection with nature through avatars",
    lazyLoaded: true,
    category: "eco",
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
    description: "AI-powered mission generation and tracking",
    lazyLoaded: true,
    category: "eco",
  },

  // Community & Education
  {
    title: "Badge System",
    to: "/badge-system",
    icon: Award,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Achievement Tracking",
      "GAIA Staking Bonuses",
      "Progress Validation",
      "Rarity System",
      "Environmental Impact"
    ],
    description: "Earn badges for environmental actions and unlock GAIA staking bonuses",
    lazyLoaded: true,
    category: "community",
  },
  {
    title: "Scholarship Network",
    to: "/scholarship",
    icon: GraduationCap,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Educational Funding",
      "Merit-Based Selection",
      "GAIA Token Integration",
      "Community Funding",
      "Provider Network"
    ],
    description: "Fund education, support students, and earn GAIA tokens through educational impact",
    lazyLoaded: true,
    category: "community",
  },
  {
    title: "Marketplace",
    to: "/marketplace",
    icon: Handshake,
    variant: "ghost" as const,
    description: "Trade eco-friendly products and services",
    lazyLoaded: true,
    category: "community",
  },

  // Environmental Projects
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
    description: "Enhanced environmental impact tracking with AI insights",
    lazyLoaded: true,
    category: "eco",
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
    description: "Advanced decentralized funding with governance",
    lazyLoaded: true,
    category: "community",
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
    description: "Verified cleanup activities with satellite monitoring",
    lazyLoaded: true,
    category: "eco",
  },
  {
    title: "Gaia's Projects",
    to: "/gaias-projects",
    icon: TreePine,
    variant: "ghost" as const,
    description: "Environmental project showcase and participation",
    lazyLoaded: true,
    category: "eco",
  },

  // Forest Protection
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
    category: "eco",
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
    category: "eco",
  },

  // Blockchain & Token Features
  {
    title: "Private Blockchain",
    to: "/private-blockchain",
    icon: Shield,
    variant: "ghost" as const,
    description: "Gaia's private blockchain infrastructure",
    lazyLoaded: true,
    category: "blockchain",
  },
  {
    title: "Gaia Token Swap",
    to: "/gaia-private-blockchain-swap-token",
    icon: Coins,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Quantum-Resistant Security",
      "Multi-Token Swap Support",
      "Real-time Rate Updates",
      "Advanced Validation",
      "Dragon-Level Protection"
    ],
    description: "Enhanced private blockchain with secure token swapping",
    lazyLoaded: true,
    category: "blockchain",
  },
  {
    title: "Token Mining",
    to: "/token-mining",
    icon: Sparkles,
    variant: "ghost" as const,
    description: "Mine GAIA tokens through environmental actions",
    lazyLoaded: true,
    category: "blockchain",
  },
  {
    title: "Green Investments",
    to: "/green-investments",
    icon: Leaf,
    variant: "ghost" as const,
    description: "Invest in sustainable projects and earn returns",
    lazyLoaded: true,
    category: "blockchain",
  },
  {
    title: "Coin Crafter",
    to: "/coin-crafter",
    icon: Coins,
    variant: "ghost" as const,
    description: "Create and manage custom environmental tokens",
    lazyLoaded: true,
    category: "blockchain",
  },

  // Gaming & Entertainment
  {
    title: "Gaming",
    to: "/gaming",
    icon: Target,
    variant: "ghost" as const,
    description: "Environmental games and challenges",
    lazyLoaded: true,
    category: "gaming",
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
    description: "Advanced biodiversity NFT ecosystem",
    lazyLoaded: true,
    category: "gaming",
  },
  {
    title: "Video Exchange",
    to: "/video-exchange",
    icon: Video,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Personal Channels (Little Heaven)",
      "Seamless Video Upload",
      "Interactive Video Player",
      "Chat Engine & Social Features",
      "Points, Tokens & Gift System"
    ],
    description: "GAiA Community Video Exchange Outstanding Experience",
    lazyLoaded: true,
    category: "gaming",
  },
  {
    title: "Gaia Bike Ecosystem",
    to: "/gaia-bike-ecosystem", 
    icon: Sparkles,
    variant: "ghost" as const,
    description: "Sustainable transportation and rewards",
    lazyLoaded: true,
    category: "eco",
  },

  // Advanced Systems
  {
    title: "Sea Green Psychohistorical",
    to: "/sea-green-psychohistorical",
    icon: Brain,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Psychohistorical AI Engine",
      "Global Data Analysis",
      "Future Prediction Models",
      "Secure Admin Dashboard",
      "Token Governance Integration"
    ],
    description: "Advanced AI-powered environmental future prediction and idea generation",
    lazyLoaded: true,
    category: "admin",
  },
  
  // Admin & System
  {
    title: "Admin",
    to: "/admin",
    icon: Settings,
    variant: "ghost" as const,
    description: "Platform administration and management",
    lazyLoaded: true,
    category: "admin",
  },
  {
    title: "Secure Admin",
    to: "/secure-admin",
    icon: Shield,
    variant: "ghost" as const,
    description: "Advanced security administration",
    lazyLoaded: true,
    category: "admin",
  },
  {
    title: "GAiA Token Status",
    to: "/gaia-consistency-status",
    icon: Shield,
    variant: "ghost" as const,
    description: "GAiA token integration consistency monitoring",
    features: [
      "Real-time Consistency Scanning",
      "Component Integration Status",
      "Official Token Verification",
      "System Health Monitoring"
    ],
    lazyLoaded: true,
    category: "admin",
  },
  {
    title: "Deployment Center",
    to: "/deployment-center",
    icon: Rocket,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "V2+ Master Plan Validation",
      "Einstein Copilot Integration",
      "Advanced Deployment Automation",
      "Real-time System Monitoring"
    ],
    description: "V2+ Deployment Center with Einstein Copilot assistance",
    lazyLoaded: true,
    category: "admin",
  },
];

// Helper functions for Master Plan v7 features
export const getMasterPlanV7Items = () => 
  navigationItems.filter(item => item.masterPlanVersion === "v7");

export const getLazyLoadedItems = () => 
  navigationItems.filter(item => item.lazyLoaded);

export const getItemFeatures = (path: string) => 
  navigationItems.find(item => item.to === path)?.features || [];

export const getItemsByCategory = (category: NavigationItem['category']) =>
  navigationItems.filter(item => item.category === category);

// Default export for compatibility with './nav-items' import pattern
export default navigationItems;
