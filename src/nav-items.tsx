
import { HomeIcon, Leaf, Users, Handshake, BarChart3, ShieldCheck, Gamepad2, Palette, DollarSign, Zap, Video, Store, Hammer } from "lucide-react";
import Index from "./pages/Index.jsx";
import Forest from "./pages/Forest.jsx";
import Community from "./pages/Community.jsx";
import Partnership from "./pages/Partnership.jsx";
import Impact from "./pages/Impact.jsx";
import Admin from "./pages/Admin.jsx";
import Games from "./pages/Games.jsx";
import NFT from "./pages/NFT.jsx";
import Exchange from "./pages/Exchange.jsx";
import Energy from "./pages/Energy.jsx";
import VideoExchange from "./pages/VideoExchange.jsx";
import AppStore from "./pages/AppStore";
import MinecraftBuilder from "./pages/MinecraftBuilder";

export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: <HomeIcon className="h-4 w-4" />,
    page: <Index />,
  },
  {
    title: "Forest Shield",
    to: "/forest",
    icon: <Leaf className="h-4 w-4" />,
    page: <Forest />,
  },
  {
    title: "Community",
    to: "/community",
    icon: <Users className="h-4 w-4" />,
    page: <Community />,
  },
  {
    title: "Partnership",
    to: "/partnership",
    icon: <Handshake className="h-4 w-4" />,
    page: <Partnership />,
  },
  {
    title: "Impact",
    to: "/impact",
    icon: <BarChart3 className="h-4 w-4" />,
    page: <Impact />,
  },
  {
    title: "Admin",
    to: "/admin",
    icon: <ShieldCheck className="h-4 w-4" />,
    page: <Admin />,
  },
  {
    title: "Games",
    to: "/games",
    icon: <Gamepad2 className="h-4 w-4" />,
    page: <Games />,
  },
  {
    title: "NFT",
    to: "/nft",
    icon: <Palette className="h-4 w-4" />,
    page: <NFT />,
  },
  {
    title: "Exchange",
    to: "/exchange",
    icon: <DollarSign className="h-4 w-4" />,
    page: <Exchange />,
  },
  {
    title: "Energy",
    to: "/energy",
    icon: <Zap className="h-4 w-4" />,
    page: <Energy />,
  },
  {
    title: "Video Exchange",
    to: "/video-exchange",
    icon: <Video className="h-4 w-4" />,
    page: <VideoExchange />,
  },
  {
    title: "App Store",
    to: "/app-store",
    icon: <Store className="h-4 w-4" />,
    page: <AppStore />,
  },
  {
    title: "Minecraft Builder",
    to: "/minecraft-builder",
    icon: <Hammer className="h-4 w-4" />,
    page: <MinecraftBuilder />,
  },
];
