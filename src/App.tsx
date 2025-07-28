
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Index from "./pages/Index"
import Exchange from "./pages/Exchange"
import Dashboard from "./pages/Dashboard"
import GreenImpactDashboard from "./pages/GreenImpactDashboard"
import EcoAvatar from "./pages/EcoAvatar"
import EarningActivities from "./pages/EarningActivities"
import EnhancedLeaderboard from "./pages/EnhancedLeaderboard"
import CommunityEngagementHub from "./pages/CommunityEngagementHub"
import PartnershipManagement from "./pages/PartnershipManagement"
import ImpactMeasurementSystem from "./pages/ImpactMeasurementSystem"
import SeaGreenPsychohistoricalProject from "./pages/SeaGreenPsychohistoricalProject"
import GaiaTokenStatus from "./pages/GaiaTokenStatus"
import VirtualWorld from "./pages/VirtualWorld"
import AnimalWelfare from "./pages/AnimalWelfare"
import Gaming from "./pages/Gaming"
import Marketplace from "./pages/Marketplace"
import Wallet from "./pages/Wallet"
import VideoExchange from "./pages/VideoExchange"
import StreamingShows from "./pages/StreamingShows"
import GaiaBikeEcosystem from "./pages/GaiaBikeEcosystem"
import TokenMining from "./pages/TokenMining"
import GreenInvestments from "./pages/GreenInvestments"
import CoinCrafter from "./pages/CoinCrafter"
import SandProtect from "./pages/SandProtect"
import GaiasProjects from "./pages/GaiasProjects"
import PrivateBlockchain from "./pages/PrivateBlockchain"
import MarketingHub from "./pages/MarketingHub"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/exchange" element={<Exchange />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/marketing-hub" element={<MarketingHub />} />
            <Route path="/green-impact-dashboard" element={<GreenImpactDashboard />} />
            <Route path="/eco-avatar" element={<EcoAvatar />} />
            <Route path="/earning-activities" element={<EarningActivities />} />
            <Route path="/enhanced-leaderboard" element={<EnhancedLeaderboard />} />
            <Route path="/community-engagement-hub" element={<CommunityEngagementHub />} />
            <Route path="/partnership-management" element={<PartnershipManagement />} />
            <Route path="/impact-measurement-system" element={<ImpactMeasurementSystem />} />
            <Route path="/sea-green-psychohistorical" element={<SeaGreenPsychohistoricalProject />} />
            <Route path="/gaia-token-status" element={<GaiaTokenStatus />} />
            <Route path="/virtual-world" element={<VirtualWorld />} />
            <Route path="/animal-welfare" element={<AnimalWelfare />} />
            <Route path="/gaming" element={<Gaming />} />
            <Route path="/marketplace" element={<Marketplace />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/video-exchange" element={<VideoExchange />} />
            <Route path="/streaming-shows" element={<StreamingShows />} />
            <Route path="/gaia-bike-ecosystem" element={<GaiaBikeEcosystem />} />
            <Route path="/token-mining" element={<TokenMining />} />
            <Route path="/green-investments" element={<GreenInvestments />} />
            <Route path="/coin-crafter" element={<CoinCrafter />} />
            <Route path="/sand-protect" element={<SandProtect />} />
            <Route path="/gaias-projects" element={<GaiasProjects />} />
            <Route path="/private-blockchain" element={<PrivateBlockchain />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
