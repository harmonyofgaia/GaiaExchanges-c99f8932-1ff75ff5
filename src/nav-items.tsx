import { HomeIcon, InfoIcon, WalletIcon, TrendingUpIcon, CodeIcon, ActivityIcon, DownloadIcon, MegaphoneIcon, RepeatIcon, EyeIcon, ShieldIcon, GamepadIcon, UserIcon } from "lucide-react";
import Index from "@/pages/Index";
import About from "@/pages/About";
import Wallet from "@/pages/Wallet";
import Markets from "@/pages/Markets";
import SmartContracts from "@/pages/SmartContracts";
import SystemStatus from "@/pages/SystemStatus";
import ComprehensiveStatus from "@/pages/ComprehensiveStatus";
import Downloads from "@/pages/Downloads";
import Marketing from "@/pages/Marketing";
import Reinvestments from "@/pages/Reinvestments";
import Transparency from "@/pages/Transparency";
import Admin from "@/pages/Admin";
import Gaming from "@/pages/Gaming";
import GaiaFighterGame from "@/pages/GaiaFighterGame";
import LiveTracking from "@/pages/LiveTracking";
import GaiaCoinCrafter from "@/pages/GaiaCoinCrafter";
import LandscapeBuilder from "@/pages/LandscapeBuilder";
import NotFound from "@/pages/NotFound";

export const navItems = [
  { to: "/", title: "Home", page: <Index />, icon: <HomeIcon className="h-4 w-4" /> },
  { to: "/about", title: "About", page: <About />, icon: <InfoIcon className="h-4 w-4" /> },
  { to: "/wallet", title: "Wallet", page: <Wallet />, icon: <WalletIcon className="h-4 w-4" /> },
  { to: "/markets", title: "Markets", page: <Markets />, icon: <TrendingUpIcon className="h-4 w-4" /> },
  { to: "/smart-contracts", title: "Smart Contracts", page: <SmartContracts />, icon: <CodeIcon className="h-4 w-4" /> },
  { to: "/system-status", title: "System Status", page: <SystemStatus />, icon: <ActivityIcon className="h-4 w-4" /> },
  { to: "/comprehensive-status", title: "Comprehensive Status", page: <ComprehensiveStatus />, icon: <ActivityIcon className="h-4 w-4" /> },
  { to: "/downloads", title: "Downloads", page: <Downloads />, icon: <DownloadIcon className="h-4 w-4" /> },
  { to: "/marketing", title: "Marketing", page: <Marketing />, icon: <MegaphoneIcon className="h-4 w-4" /> },
  { to: "/reinvestments", title: "Reinvestments", page: <Reinvestments />, icon: <RepeatIcon className="h-4 w-4" /> },
  { to: "/transparency", title: "Transparency", page: <Transparency />, icon: <EyeIcon className="h-4 w-4" /> },
  { to: "/admin", title: "Admin", page: <Admin />, icon: <ShieldIcon className="h-4 w-4" /> },
  { to: "/gaming", title: "Gaming", page: <Gaming />, icon: <GamepadIcon className="h-4 w-4" /> },
  { to: "/gaia-fighter-game", title: "Gaia Fighter Game", page: <GaiaFighterGame />, icon: <GamepadIcon className="h-4 w-4" /> },
  { to: "/live-tracking", title: "Live Tracking", page: <LiveTracking />, icon: <ActivityIcon className="h-4 w-4" /> },
  { to: "/gaia-coin-crafter", title: "Gaia Coin Crafter", page: <GaiaCoinCrafter />, icon: <UserIcon className="h-4 w-4" /> },
  { to: "/landscape-builder", title: "Landscape Builder", page: <LandscapeBuilder />, icon: <UserIcon className="h-4 w-4" /> },
  { to: "*", title: "Not Found", page: <NotFound />, icon: <InfoIcon className="h-4 w-4" /> },
];