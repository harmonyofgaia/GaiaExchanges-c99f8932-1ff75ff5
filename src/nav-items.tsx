import { lazy } from "react";

// Lazy load components for better performance
const Index = lazy(() => import("./pages/Index"));
const About = lazy(() => import("./pages/About"));
const Admin = lazy(() => import("./pages/Admin"));
const AdminCraftedTools = lazy(() => import("./pages/AdminCraftedTools"));
const AdminLogin = lazy(() => import("./pages/AdminLogin"));
const Analytics = lazy(() => import("./pages/Analytics"));
const AnimalNFTCommunity = lazy(() => import("./pages/AnimalNFTCommunity"));
const AppStoreSubmission = lazy(() => import("./pages/AppStoreSubmission"));
const ArtistStreaming = lazy(() => import("./pages/ArtistStreaming"));
const AuraLandScrapyard = lazy(() => import("./pages/AuraLandScrapyard"));
const AuthTest = lazy(() => import("./pages/AuthTest"));
const CoinCrafter = lazy(() => import("./pages/CoinCrafter"));
const Community = lazy(() => import("./pages/Community"));
const CompleteSystemHub = lazy(() => import("./pages/CompleteSystemHub"));
const ComprehensiveDocumentation = lazy(() => import("./pages/ComprehensiveDocumentation"));
const ComprehensiveStatus = lazy(() => import("./pages/ComprehensiveStatus"));
const Contact = lazy(() => import("./pages/Contact"));
const Docs = lazy(() => import("./pages/Docs"));
const Downloads = lazy(() => import("./pages/Downloads"));
const DrivingToNature = lazy(() => import("./pages/DrivingToNature"));
const EnhancedDownloads = lazy(() => import("./pages/EnhancedDownloads"));
const Exchange = lazy(() => import("./pages/Exchange"));
const FeeVault = lazy(() => import("./pages/FeeVault"));
const GaiaBikeEcosystem = lazy(() => import("./pages/GaiaBikeEcosystem"));
const GaiaCoinCrafter = lazy(() => import("./pages/GaiaCoinCrafter"));
const GaiaFighterGame = lazy(() => import("./pages/GaiaFighterGame"));
const GaiasExchange = lazy(() => import("./pages/GaiasExchange"));
const GaiasProjects = lazy(() => import("./pages/GaiasProjects"));
const Game = lazy(() => import("./pages/Game"));
const Gaming = lazy(() => import("./pages/Gaming"));
const GlobalMarketingDashboard = lazy(() => import("./pages/GlobalMarketingDashboard"));
const HeartOfGaia = lazy(() => import("./pages/HeartOfGaia"));
const Home = lazy(() => import("./pages/Home"));
const LandscapeBuilder = lazy(() => import("./pages/LandscapeBuilder"));
const LiveTracking = lazy(() => import("./pages/LiveTracking"));
const Marketing = lazy(() => import("./pages/Marketing"));
const MarketingHub = lazy(() => import("./pages/MarketingHub"));
const Marketplace = lazy(() => import("./pages/Marketplace"));
const Markets = lazy(() => import("./pages/Markets"));
const NFTGreenAnimalPlatform = lazy(() => import("./pages/NFTGreenAnimalPlatform"));
const NFTs = lazy(() => import("./pages/NFTs"));
const NotFound = lazy(() => import("./pages/NotFound"));
const PlatformCompatibility = lazy(() => import("./pages/PlatformCompatibility"));
const Pricing = lazy(() => import("./pages/Pricing"));
const PrivateBlockchain = lazy(() => import("./pages/PrivateBlockchain"));
const Profile = lazy(() => import("./pages/Profile"));
const Reinvestments = lazy(() => import("./pages/Reinvestments"));
const SecureAdmin = lazy(() => import("./pages/SecureAdmin"));
const SecureVault = lazy(() => import("./pages/SecureVault"));
const Security = lazy(() => import("./pages/Security"));
const SmartContracts = lazy(() => import("./pages/SmartContracts"));
const Swap = lazy(() => import("./pages/Swap"));
const SystemStatus = lazy(() => import("./pages/SystemStatus"));
const TaskReverser = lazy(() => import("./pages/TaskReverser"));
const TechnoSoulSolutions = lazy(() => import("./pages/TechnoSoulSolutions"));
const Transparency = lazy(() => import("./pages/Transparency"));
const TransparentWallet = lazy(() => import("./pages/TransparentWallet"));
const UltimateFeatureHub = lazy(() => import("./pages/UltimateFeatureHub"));
const VaultSystem = lazy(() => import("./pages/VaultSystem"));
const VideoUpload = lazy(() => import("./pages/VideoUpload"));
const VirtualWorld = lazy(() => import("./pages/VirtualWorld"));
const Wallet = lazy(() => import("./pages/Wallet"));
const Webshop = lazy(() => import("./pages/Webshop"));

// Master Plan v7 Features
const GreenImpactDashboard = lazy(() => import("./pages/GreenImpactDashboard"));
const DecentralizedProjectFundingPools = lazy(() => import("./pages/DecentralizedProjectFundingPools"));
const EcoAvatarGaiaSoulSystem = lazy(() => import("./pages/EcoAvatarGaiaSoulSystem"));
const NFTCardGame = lazy(() => import("./pages/NFTCardGame"));
const PlanetCleaningRewardsSystem = lazy(() => import("./pages/PlanetCleaningRewardsSystem"));

export const navItems = [
  {
    title: "Home",
    to: "/",
    page: <Index />,
  },
  {
    title: "About",
    to: "/about",
    page: <About />,
  },
  {
    title: "Admin",
    to: "/admin",
    page: <Admin />,
  },
  {
    title: "Admin Crafted Tools",
    to: "/admin-crafted-tools",
    page: <AdminCraftedTools />,
  },
  {
    title: "Admin Login",
    to: "/admin-login",
    page: <AdminLogin />,
  },
  {
    title: "Analytics",
    to: "/analytics",
    page: <Analytics />,
  },
  {
    title: "Animal NFT Community",
    to: "/animal-nft-community",
    page: <AnimalNFTCommunity />,
  },
  {
    title: "App Store Submission",
    to: "/app-store-submission",
    page: <AppStoreSubmission />,
  },
  {
    title: "Artist Streaming",
    to: "/artist-streaming",
    page: <ArtistStreaming />,
  },
  {
    title: "Aura Land Scrapyard",
    to: "/aura-land-scrapyard",
    page: <AuraLandScrapyard />,
  },
  {
    title: "Auth Test",
    to: "/auth-test",
    page: <AuthTest />,
  },
  {
    title: "Coin Crafter",
    to: "/coin-crafter",
    page: <CoinCrafter />,
  },
  {
    title: "Community",
    to: "/community",
    page: <Community />,
  },
  {
    title: "Complete System Hub",
    to: "/complete-system-hub",
    page: <CompleteSystemHub />,
  },
  {
    title: "Comprehensive Documentation",
    to: "/comprehensive-documentation",
    page: <ComprehensiveDocumentation />,
  },
  {
    title: "Comprehensive Status",
    to: "/comprehensive-status",
    page: <ComprehensiveStatus />,
  },
  {
    title: "Contact",
    to: "/contact",
    page: <Contact />,
  },
  {
    title: "Docs",
    to: "/docs",
    page: <Docs />,
  },
  {
    title: "Downloads",
    to: "/downloads",
    page: <Downloads />,
  },
  {
    title: "Driving to Nature",
    to: "/driving-to-nature",
    page: <DrivingToNature />,
  },
  {
    title: "Enhanced Downloads",
    to: "/enhanced-downloads",
    page: <EnhancedDownloads />,
  },
  {
    title: "Exchange",
    to: "/exchange",
    page: <Exchange />,
  },
  {
    title: "Fee Vault",
    to: "/fee-vault",
    page: <FeeVault />,
  },
  {
    title: "Gaia Bike Ecosystem",
    to: "/gaia-bike-ecosystem",
    page: <GaiaBikeEcosystem />,
  },
  {
    title: "Gaia Coin Crafter",
    to: "/gaia-coin-crafter",
    page: <GaiaCoinCrafter />,
  },
  {
    title: "Gaia Fighter Game",
    to: "/gaia-fighter-game",
    page: <GaiaFighterGame />,
  },
  {
    title: "Gaias Exchange",
    to: "/gaias-exchange",
    page: <GaiasExchange />,
  },
  {
    title: "Gaias Projects",
    to: "/gaias-projects",
    page: <GaiasProjects />,
  },
  {
    title: "Game",
    to: "/game",
    page: <Game />,
  },
  {
    title: "Gaming",
    to: "/gaming",
    page: <Gaming />,
  },
  {
    title: "Global Marketing Dashboard",
    to: "/global-marketing-dashboard",
    page: <GlobalMarketingDashboard />,
  },
  {
    title: "Heart of Gaia",
    to: "/heart-of-gaia",
    page: <HeartOfGaia />,
  },
  {
    title: "Home",
    to: "/home",
    page: <Home />,
  },
  {
    title: "Landscape Builder",
    to: "/landscape-builder",
    page: <LandscapeBuilder />,
  },
  {
    title: "Live Tracking",
    to: "/live-tracking",
    page: <LiveTracking />,
  },
  {
    title: "Marketing",
    to: "/marketing",
    page: <Marketing />,
  },
  {
    title: "Marketing Hub",
    to: "/marketing-hub",
    page: <MarketingHub />,
  },
  {
    title: "Marketplace",
    to: "/marketplace",
    page: <Marketplace />,
  },
  {
    title: "Markets",
    to: "/markets",
    page: <Markets />,
  },
  {
    title: "NFT Green Animal Platform",
    to: "/nft-green-animal-platform",
    page: <NFTGreenAnimalPlatform />,
  },
  {
    title: "NFTs",
    to: "/nfts",
    page: <NFTs />,
  },
  {
    title: "Platform Compatibility",
    to: "/platform-compatibility",
    page: <PlatformCompatibility />,
  },
  {
    title: "Pricing",
    to: "/pricing",
    page: <Pricing />,
  },
  {
    title: "Private Blockchain",
    to: "/private-blockchain",
    page: <PrivateBlockchain />,
  },
  {
    title: "Profile",
    to: "/profile",
    page: <Profile />,
  },
  {
    title: "Reinvestments",
    to: "/reinvestments",
    page: <Reinvestments />,
  },
  {
    title: "Secure Admin",
    to: "/secure-admin",
    page: <SecureAdmin />,
  },
  {
    title: "Secure Vault",
    to: "/secure-vault",
    page: <SecureVault />,
  },
  {
    title: "Security",
    to: "/security",
    page: <Security />,
  },
  {
    title: "Smart Contracts",
    to: "/smart-contracts",
    page: <SmartContracts />,
  },
  {
    title: "Swap",
    to: "/swap",
    page: <Swap />,
  },
  {
    title: "System Status",
    to: "/system-status",
    page: <SystemStatus />,
  },
  {
    title: "Task Reverser",
    to: "/task-reverser",
    page: <TaskReverser />,
  },
  {
    title: "Techno Soul Solutions",
    to: "/techno-soul-solutions",
    page: <TechnoSoulSolutions />,
  },
  {
    title: "Transparency",
    to: "/transparency",
    page: <Transparency />,
  },
  {
    title: "Transparent Wallet",
    to: "/transparent-wallet",
    page: <TransparentWallet />,
  },
  {
    title: "Ultimate Feature Hub",
    to: "/ultimate-feature-hub",
    page: <UltimateFeatureHub />,
  },
  {
    title: "Vault System",
    to: "/vault-system",
    page: <VaultSystem />,
  },
  {
    title: "Video Upload",
    to: "/video-upload",
    page: <VideoUpload />,
  },
  {
    title: "Virtual World",
    to: "/virtual-world",
    page: <VirtualWorld />,
  },
  {
    title: "Wallet",
    to: "/wallet",
    page: <Wallet />,
  },
  {
    title: "Webshop",
    to: "/webshop",
    page: <Webshop />,
  },
  // Master Plan v7 Features
  {
    title: "Green Impact Dashboard",
    to: "/green-impact-dashboard",
    page: <GreenImpactDashboard />,
  },
  {
    title: "Decentralized Funding Pools",
    to: "/decentralized-funding-pools",
    page: <DecentralizedProjectFundingPools />,
  },
  {
    title: "Eco-Avatar & GaiaSoul",
    to: "/eco-avatar-gaia-soul",
    page: <EcoAvatarGaiaSoulSystem />,
  },
  {
    title: "NFT Card Game",
    to: "/nft-card-game",
    page: <NFTCardGame />,
  },
  {
    title: "Planet Cleaning Rewards",
    to: "/planet-cleaning-rewards",
    page: <PlanetCleaningRewardsSystem />,
  },
  // Catch-all route for 404
  {
    title: "Not Found",
    to: "*",
    page: <NotFound />,
  },
];