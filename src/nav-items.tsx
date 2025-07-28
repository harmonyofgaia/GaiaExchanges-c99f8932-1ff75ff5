
import { HomeIcon, Leaf, Users, Handshake, BarChart3, ShieldCheck, Gamepad2, Palette, DollarSign, Zap, Video, Store, Hammer } from "lucide-react";
import Index from "./pages/Index.jsx";
import Community from "./pages/Community.jsx";
import Admin from "./pages/Admin.jsx";
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
    page: <div className="p-8"><h1 className="text-2xl font-bold text-green-400">🌲 Forest Shield - Coming Soon</h1></div>,
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
    page: <div className="p-8"><h1 className="text-2xl font-bold text-blue-400">🤝 Partnership - Coming Soon</h1></div>,
  },
  {
    title: "Impact",
    to: "/impact",
    icon: <BarChart3 className="h-4 w-4" />,
    page: <div className="p-8"><h1 className="text-2xl font-bold text-purple-400">📊 Impact - Coming Soon</h1></div>,
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
    page: <div className="p-8"><h1 className="text-2xl font-bold text-red-400">🎮 Games - Coming Soon</h1></div>,
  },
  {
    title: "NFT",
    to: "/nft",
    icon: <Palette className="h-4 w-4" />,
    page: <div className="p-8"><h1 className="text-2xl font-bold text-pink-400">🎨 NFT - Coming Soon</h1></div>,
  },
  {
    title: "Exchange",
    to: "/exchange",
    icon: <DollarSign className="h-4 w-4" />,
    page: <div className="p-8"><h1 className="text-2xl font-bold text-yellow-400">💰 Exchange - Coming Soon</h1></div>,
  },
  {
    title: "Energy",
    to: "/energy",
    icon: <Zap className="h-4 w-4" />,
    page: <div className="p-8"><h1 className="text-2xl font-bold text-orange-400">⚡ Energy - Coming Soon</h1></div>,
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
