
import { HomeIcon, Users, Settings, Shield, BarChart3, Leaf, Target, Sparkles, Globe, Heart, TreePine, Coins, Gamepad2, Video, MapPin, Zap } from "lucide-react";

export const navigationItems = [
  {
    title: "Home",
    to: "/",
    icon: HomeIcon,
    variant: "default" as const,
  },
  {
    title: "Dashboard",
    to: "/dashboard",
    icon: BarChart3,
    variant: "ghost" as const,
  },
  {
    title: "Exchange",
    to: "/exchange",
    icon: Users,
    variant: "ghost" as const,
  },
  {
    title: "Wallet",
    to: "/wallet",
    icon: Coins,
    variant: "ghost" as const,
  },
  {
    title: "Markets",
    to: "/markets",
    icon: BarChart3,
    variant: "ghost" as const,
  },
  {
    title: "Gaia's Projects",
    to: "/gaias-projects",
    icon: TreePine,
    variant: "ghost" as const,
  },
  {
    title: "Environmental Hub",
    to: "/environmental-hub",
    icon: Leaf,
    variant: "ghost" as const,
  },
  {
    title: "Project Funding",
    to: "/project-funding",
    icon: Heart,
    variant: "ghost" as const,
  },
  {
    title: "Eco Missions",
    to: "/eco-missions",
    icon: Target,
    variant: "ghost" as const,
  },
  {
    title: "Planet Cleaning",
    to: "/planet-cleaning",
    icon: Globe,
    variant: "ghost" as const,
  },
  {
    title: "NFT Cards",
    to: "/nft-cards",
    icon: Sparkles,
    variant: "ghost" as const,
  },
  {
    title: "Eco Avatar",
    to: "/eco-avatar",
    icon: Users,
    variant: "ghost" as const,
  },
  {
    title: "Gaming",
    to: "/gaming",
    icon: Gamepad2,
    variant: "ghost" as const,
  },
  {
    title: "Live Tracking",
    to: "/live-tracking",
    icon: MapPin,
    variant: "ghost" as const,
  },
  {
    title: "Videos",
    to: "/video-upload",
    icon: Video,
    variant: "ghost" as const,
  },
  {
    title: "Automation",
    to: "/complete-system-hub",
    icon: Zap,
    variant: "ghost" as const,
  },
  {
    title: "Admin",
    to: "/admin",
    icon: Settings,
    variant: "ghost" as const,
  },
  {
    title: "Security",
    to: "/security",
    icon: Shield,
    variant: "ghost" as const,
  },
];

// Default export for compatibility with './nav-items' import pattern
export default navigationItems;
