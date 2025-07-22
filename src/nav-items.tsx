import { HomeIcon, Shield, Database, BarChart3, Users, Settings } from "lucide-react";

import Index from "@/pages/Index";
import Home from "@/pages/Home";
import Exchange from "@/pages/Exchange";
import Marketplace from "@/pages/Marketplace";
import Gaming from "@/pages/Gaming";
import Community from "@/pages/Community";
import Admin from "@/pages/Admin";
import Profile from "@/pages/Profile";
import Security from "@/pages/Security";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Exchange",
    to: "/exchange",
    icon: <BarChart3 className="h-4 w-4" />,
    page: <Exchange />,
  },
  {
    title: "Marketplace",
    to: "/marketplace",
    icon: <Database className="h-4 w-4" />,
    page: <Marketplace />,
  },
  {
    title: "Gaming",
    to: "/gaming",
    icon: <Users className="h-4 w-4" />,
    page: <Gaming />,
  },
  {
    title: "Community",
    to: "/community",
    icon: <Users className="h-4 w-4" />,
    page: <Community />,
  },
  {
    title: "Profile",
    to: "/profile",
    icon: <Users className="h-4 w-4" />,
    page: <Profile />,
  },
  {
    title: "Security",
    to: "/security",
    icon: <Shield className="h-4 w-4" />,
    page: <Security />,
  },
  {
    title: "Admin",
    to: "/admin",
    icon: <Settings className="h-4 w-4" />,
    page: <Admin />,
  },
];

export default navItems;