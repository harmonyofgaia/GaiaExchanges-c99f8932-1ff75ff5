
import { HomeIcon, Users, Settings, Shield, BarChart3, Leaf, Target, Sparkles, Globe, Heart, TreePine, Flame, Coins, Handshake, Video, Brain, Pickaxe, PartyPopper, BookOpen } from "lucide-react";

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
    title: "Forest Tokens",
    to: "/forest-token-system",
    icon: Coins,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Multi-tier Token System",
      "Staking & Rewards",
      "DAO Governance",
      "Impact Verification",
      "Blockchain Integration"
    ],
    description: "Multi-tier blockchain token system for forest defense funding and governance",
    lazyLoaded: true,
  },
  {
    title: "Community Hub",
    to: "/community-engagement-hub",
    icon: Users,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Training Programs",
      "Community Coordination",
      "Achievement System",
      "Challenge Participation",
      "Global Leaderboards"
    ],
    description: "Community training, coordination, and engagement platform",
    lazyLoaded: true,
  },
  {
    title: "Partnerships",
    to: "/partnership-management",
    icon: Handshake,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Partner Directory",
      "Collaboration Management",
      "Partnership Analytics",
      "Initiative Tracking",
      "Performance Monitoring"
    ],
    description: "NGO, agency, and tech firm partnership coordination platform",
    lazyLoaded: true,
  },
  {
    title: "Impact Metrics",
    to: "/impact-measurement-system",
    icon: BarChart3,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Real-time Impact Tracking",
      "Blockchain Verification",
      "Carbon Credit Management",
      "SDG Alignment Monitoring",
      "Transparent Reporting"
    ],
    description: "Environmental impact tracking and verification system",
    lazyLoaded: true,
  },
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
      "Token Governance Integration",
      "Auto-Documentation System"
    ],
    description: "Master Plan v7: Advanced AI-powered environmental future prediction and idea generation",
    lazyLoaded: true,
  },
  {
    title: "Gaia Bike Ecosystem",
    to: "/gaia-bike",
    icon: Users,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Eco-Friendly Transportation",
      "Carbon Offset Tracking",
      "Community Challenges",
      "Reward System",
      "Route Optimization",
      "Health & Fitness Integration"
    ],
    description: "Master Plan v7: Sustainable transportation ecosystem with environmental impact tracking",
    lazyLoaded: true,
  },
  {
    title: "Mining Pools",
    to: "/mining-pools",
    icon: Pickaxe,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Regeneration Staking",
      "Environmental Projects",
      "Yield Farming",
      "Impact Verification",
      "Community Governance",
      "Token Rewards"
    ],
    description: "Master Plan v7: Regeneration mining pools for environmental funding and rewards",
    lazyLoaded: true,
  },
  {
    title: "Events & Parties",
    to: "/events",
    icon: PartyPopper,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Environmental Celebrations",
      "Community Gatherings",
      "Educational Workshops",
      "Discount System",
      "Impact Tracking",
      "Reward Integration"
    ],
    description: "Master Plan v7: Community events, parties, and discount system for engagement",
    lazyLoaded: true,
  },
  {
    title: "Animal Welfare",
    to: "/animal-welfare",
    icon: Heart,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Emergency Rescues",
      "Wildlife Sanctuaries",
      "Conservation Programs",
      "Donation Tracking",
      "Impact Metrics",
      "Global Network"
    ],
    description: "Master Plan v7: Comprehensive animal welfare and protection platform",
    lazyLoaded: true,
  },
  {
    title: "Education & Governance",
    to: "/education",
    icon: BookOpen,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Environmental Courses",
      "Expert Instructors",
      "Community Governance",
      "Proposal Voting",
      "Certification System",
      "Token Rewards"
    ],
    description: "Master Plan v7: Educational platform with community governance integration",
    lazyLoaded: true,
  },
  {
    title: "Defense Systems",
    to: "/defense-systems",
    icon: Shield,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "AI-Powered Defense",
      "Quantum Protection",
      "Real-time Monitoring",
      "Threat Analysis",
      "Autonomous Systems",
      "Advanced Security"
    ],
    description: "Master Plan v7: Advanced defense and attack mechanism systems",
    lazyLoaded: true,
  },
  {
    title: "Enhanced NFTs",
    to: "/nft-marketplace",
    icon: Sparkles,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Environmental NFTs",
      "Impact Verification",
      "Conservation Focus",
      "Utility Integration",
      "Rarity Systems",
      "Marketplace Trading"
    ],
    description: "Master Plan v7: Enhanced NFT marketplace with environmental impact tracking",
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
  {
    title: "Video Exchange",
    to: "/secure-admin/video-exchange",
    icon: Video,
    variant: "ghost" as const,
    masterPlanVersion: "v7",
    features: [
      "Personal Channels (Little Heaven)",
      "Seamless Video Upload",
      "Interactive Video Player",
      "Chat Engine & Social Features",
      "Subscribe & Notification System",
      "Points, Tokens & Gift System",
      "Leaderboards & Badges",
      "Challenges & Events",
      "Deep Admin Control & Audit",
      "Security, Privacy & Compliance"
    ],
    description: "Master Plan v7: GAiA Community Video Exchange Outstanding Experience",
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
