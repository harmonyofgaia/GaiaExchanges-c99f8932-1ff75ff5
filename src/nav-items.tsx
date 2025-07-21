import { HomeIcon, InfoIcon, WalletIcon, TrendingUpIcon, CodeIcon, ActivityIcon, DownloadIcon, ShareIcon, DollarSignIcon, EyeIcon, UserIcon, GamepadIcon, ZapIcon, MapIcon, SettingsIcon } from "lucide-react";
import { Index, About, Wallet, Markets, SmartContracts, SystemStatus, ComprehensiveStatus, Downloads, Marketing, Reinvestments, Transparency, Admin, Gaming, GaiaFighterGame, LiveTracking, GaiaCoinCrafter, LandscapeBuilder, NotFound } from "@/pages";
import ModuleSystemHub from "@/pages/ModuleSystemHub";

export interface NavItem {
  title: string;
  to: string;
  icon: any;
  page: JSX.Element;
}

export const navItems: NavItem[] = [
  {
    title: "Home",
    to: "/",
    icon: HomeIcon,
    page: <Index />,
  },
  {
    title: "About",
    to: "/about",
    icon: InfoIcon,
    page: <About />,
  },
  {
    title: "Wallet",
    to: "/wallet",
    icon: WalletIcon,
    page: <Wallet />,
  },
  {
    title: "Markets",
    to: "/markets",
    icon: TrendingUpIcon,
    page: <Markets />,
  },
  {
    title: "Smart Contracts",
    to: "/smart-contracts",
    icon: CodeIcon,
    page: <SmartContracts />,
  },
  {
    title: "System Status",
    to: "/system-status",
    icon: ActivityIcon,
    page: <SystemStatus />,
  },
  {
    title: "Comprehensive Status",
    to: "/comprehensive-status",
    icon: ActivityIcon,
    page: <ComprehensiveStatus />,
  },
  {
    title: "Downloads",
    to: "/downloads",
    icon: DownloadIcon,
    page: <Downloads />,
  },
  {
    title: "Marketing",
    to: "/marketing",
    icon: ShareIcon,
    page: <Marketing />,
  },
  {
    title: "Reinvestments",
    to: "/reinvestments",
    icon: DollarSignIcon,
    page: <Reinvestments />,
  },
  {
    title: "Transparency",
    to: "/transparency",
    icon: EyeIcon,
    page: <Transparency />,
  },
  {
    title: "Admin",
    to: "/admin",
    icon: UserIcon,
    page: <Admin />,
  },
  {
    title: "Gaming",
    to: "/gaming",
    icon: GamepadIcon,
    page: <Gaming />,
  },
  {
    title: "Gaia Fighter Game",
    to: "/gaia-fighter-game",
    icon: ZapIcon,
    page: <GaiaFighterGame />,
  },
  {
    title: "Live Tracking",
    to: "/live-tracking",
    icon: ActivityIcon,
    page: <LiveTracking />,
  },
  {
    title: "Gaia Coin Crafter",
    to: "/gaia-coin-crafter",
    icon: DollarSignIcon,
    page: <GaiaCoinCrafter />,
  },
  {
    title: "Landscape Builder",
    to: "/landscape-builder",
    icon: MapIcon,
    page: <LandscapeBuilder />,
  },
  {
    title: "Module System Hub",
    to: "/module-system-hub",
    icon: SettingsIcon,
    page: <ModuleSystemHub />,
  },
  {
    title: "404",
    to: "*",
    icon: InfoIcon,
    page: <NotFound />,
  },
];