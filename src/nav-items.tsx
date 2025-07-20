
import { Home, Globe, Coins, Hammer, Mountain, Palette, Video, Bike, BarChart3, Settings, Info, Mail, DollarSign, Crown, RotateCcw } from 'lucide-react'

// Import all page components
import Index from './pages/Index'
import VirtualWorld from './pages/VirtualWorld'
import NFTGreenAnimals from './pages/NFTGreenAnimals'
import CoinCrafter from './pages/CoinCrafter'
import LandscapeBuilder from './pages/LandscapeBuilder'
import AuraLandScrapyard from './pages/AuraLandScrapyard'
import VideoUpload from './pages/VideoUpload'
import GaiaBikeEcosystem from './pages/GaiaBikeEcosystem'
import SystemStatus from './pages/SystemStatus'
import ComprehensiveStatus from './pages/ComprehensiveStatus'
import About from './pages/About'
import Contact from './pages/Contact'
import Pricing from './pages/Pricing'
import Admin from './pages/Admin'
import TaskReverser from './pages/TaskReverser'

export const navItems = [
  {
    title: "Galaxy Home",
    to: "/",
    icon: Home,
    page: <Index />,
  },
  {
    title: "Virtual World",
    to: "/virtual-world",
    icon: Globe,
    page: <VirtualWorld />,
  },
  {
    title: "NFT Green Animals",
    to: "/nft-green-animals",
    icon: Coins,
    page: <NFTGreenAnimals />,
  },
  {
    title: "Video Upload & Earn",
    to: "/video-upload",
    icon: Video,
    page: <VideoUpload />,
  },
  {
    title: "GAiA Bike Ecosystem",
    to: "/gaia-bike-ecosystem",
    icon: Bike,
    page: <GaiaBikeEcosystem />,
  },
  {
    title: "Coin Crafter",
    to: "/coin-crafter",
    icon: Hammer,
    page: <CoinCrafter />,
  },
  {
    title: "Landscape Builder",
    to: "/landscape-builder",
    icon: Mountain,
    page: <LandscapeBuilder />,
  },
  {
    title: "Aura Land Scrapyard",
    to: "/aura-land-scrapyard",
    icon: Palette,
    page: <AuraLandScrapyard />,
  },
  {
    title: "System Status",
    to: "/system-status",
    icon: BarChart3,
    page: <SystemStatus />,
  },
  {
    title: "Comprehensive Status",
    to: "/comprehensive-status",
    icon: Settings,
    page: <ComprehensiveStatus />,
  },
  {
    title: "About GAiA",
    to: "/about",
    icon: Info,
    page: <About />,
  },
  {
    title: "Contact",
    to: "/contact",
    icon: Mail,
    page: <Contact />,
  },
  {
    title: "Pricing",
    to: "/pricing",
    icon: DollarSign,
    page: <Pricing />,
  },
  {
    title: "Admin Portal",
    to: "/admin",
    icon: Crown,
    page: <Admin />,
  },
  {
    title: "Task Reverser",
    to: "/task-reverser",
    icon: RotateCcw,
    page: <TaskReverser />,
  },
]
