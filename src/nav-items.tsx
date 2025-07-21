import { Home, Wallet, BarChart3, FileCode, Activity, Download, TrendingUp, DollarSign, Eye, ShieldCheck, GamepadIcon, Target, Wrench, Map, NotebookIcon, Settings, Database, Brain, Palette, Users } from "lucide-react";

// Import all the existing pages
import {
  Index,
  About,
  Wallet as WalletPage,
  Markets,
  SmartContracts,
  SystemStatus,
  ComprehensiveStatus,
  Downloads,
  Marketing,
  Reinvestments,
  Transparency,
  Admin,
  Gaming,
  GaiaFighterGame,
  LiveTracking,
  GaiaCoinCrafter,
  LandscapeBuilder,
  NotFound
} from "./pages";

/**
 * Central navigation configuration for GaiaExchanges
 * Defines routes and their associated components
 */
export const navItems = [
  {
    title: "Home",
    to: "/",
    icon: Home,
    page: <Index />,
  },
  {
    title: "About",
    to: "/about",
    icon: NotebookIcon,
    page: <About />,
  },
  {
    title: "Wallet",
    to: "/wallet",
    icon: Wallet,
    page: <WalletPage />,
  },
  {
    title: "Markets",
    to: "/markets",
    icon: BarChart3,
    page: <Markets />,
  },
  {
    title: "Smart Contracts",
    to: "/smart-contracts",
    icon: FileCode,
    page: <SmartContracts />,
  },
  {
    title: "System Status",
    to: "/system-status",
    icon: Activity,
    page: <SystemStatus />,
  },
  {
    title: "Comprehensive Status",
    to: "/comprehensive-status",
    icon: Activity,
    page: <ComprehensiveStatus />,
  },
  {
    title: "Downloads",
    to: "/downloads",
    icon: Download,
    page: <Downloads />,
  },
  {
    title: "Marketing",
    to: "/marketing",
    icon: TrendingUp,
    page: <Marketing />,
  },
  {
    title: "Reinvestments",
    to: "/reinvestments",
    icon: DollarSign,
    page: <Reinvestments />,
  },
  {
    title: "Transparency",
    to: "/transparency",
    icon: Eye,
    page: <Transparency />,
  },
  {
    title: "Admin",
    to: "/admin",
    icon: ShieldCheck,
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
    icon: Target,
    page: <GaiaFighterGame />,
  },
  {
    title: "Live Tracking",
    to: "/live-tracking",
    icon: Activity,
    page: <LiveTracking />,
  },
  {
    title: "Gaia Coin Crafter",
    to: "/gaia-coin-crafter",
    icon: Wrench,
    page: <GaiaCoinCrafter />,
  },
  {
    title: "Landscape Builder",
    to: "/landscape-builder",
    icon: Map,
    page: <LandscapeBuilder />,
  },
  // New modular system pages (to be implemented)
  {
    title: "GaiaChain Core",
    to: "/gaia-chain",
    icon: Database,
    page: <div className="p-8"><h1 className="text-2xl font-bold">GaiaChain Core Blockchain</h1><p>Modular blockchain infrastructure - Coming Soon</p></div>,
  },
  {
    title: "Admin System",
    to: "/admin-system",
    icon: Settings,
    page: <div className="p-8"><h1 className="text-2xl font-bold">Heaven-Grade Admin System</h1><p>Enterprise administration and security - Coming Soon</p></div>,
  },
  {
    title: "DEX & Wallets",
    to: "/dex-wallets",
    icon: Wallet,
    page: <div className="p-8"><h1 className="text-2xl font-bold">Modular DEX & Wallets</h1><p>Advanced trading and multi-chain wallets - Coming Soon</p></div>,
  },
  {
    title: "AI Analytics",
    to: "/ai-analytics",
    icon: Brain,
    page: <div className="p-8"><h1 className="text-2xl font-bold">AI & Quantum Analytics</h1><p>Intelligent insights and quantum cache - Coming Soon</p></div>,
  },
  {
    title: "NFT Metaverse",
    to: "/nft-metaverse",
    icon: Palette,
    page: <div className="p-8"><h1 className="text-2xl font-bold">NFT Marketplace & Metaverse</h1><p>Digital assets and virtual worlds - Coming Soon</p></div>,
  },
  {
    title: "Governance",
    to: "/governance",
    icon: Users,
    page: <div className="p-8"><h1 className="text-2xl font-bold">Governance & DevOps</h1><p>DAO governance and operational excellence - Coming Soon</p></div>,
  },
  // 404 route - should be last
  {
    title: "Not Found",
    to: "*",
    icon: NotebookIcon,
    page: <NotFound />,
  },
];