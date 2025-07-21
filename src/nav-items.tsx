import { 
  Index,
  About,
  Wallet,
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
} from '@/pages'

export const navItems = [
  {
    to: "/",
    page: <Index />,
  },
  {
    to: "/about",
    page: <About />,
  },
  {
    to: "/wallet",
    page: <Wallet />,
  },
  {
    to: "/markets",
    page: <Markets />,
  },
  {
    to: "/smart-contracts",
    page: <SmartContracts />,
  },
  {
    to: "/system-status",
    page: <SystemStatus />,
  },
  {
    to: "/comprehensive-status",
    page: <ComprehensiveStatus />,
  },
  {
    to: "/downloads",
    page: <Downloads />,
  },
  {
    to: "/marketing",
    page: <Marketing />,
  },
  {
    to: "/reinvestments",
    page: <Reinvestments />,
  },
  {
    to: "/transparency",
    page: <Transparency />,
  },
  {
    to: "/admin",
    page: <Admin />,
  },
  {
    to: "/gaming",
    page: <Gaming />,
  },
  {
    to: "/gaia-fighter-game",
    page: <GaiaFighterGame />,
  },
  {
    to: "/live-tracking",
    page: <LiveTracking />,
  },
  {
    to: "/gaia-coin-crafter",
    page: <GaiaCoinCrafter />,
  },
  {
    to: "/landscape-builder",
    page: <LandscapeBuilder />,
  },
  {
    to: "*",
    page: <NotFound />,
  },
]