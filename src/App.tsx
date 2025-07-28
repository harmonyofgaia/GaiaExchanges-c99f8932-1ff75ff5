
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@/components/theme-provider'
import { Toaster } from '@/components/ui/sonner'
import { Navbar } from '@/components/Navbar'

// Pages
import Index from './pages/Index'
import Dashboard from './pages/Dashboard'
import Exchange from './pages/Exchange'
import GreenInvestments from './pages/GreenInvestments'
import EarningActivities from './pages/EarningActivities'
import EnhancedLeaderboard from './pages/EnhancedLeaderboard'
import GreenImpactDashboard from './pages/GreenImpactDashboard'
import EcoAvatar from './pages/EcoAvatar'
import CommunityEngagementHub from './pages/CommunityEngagementHub'
import PartnershipManagement from './pages/PartnershipManagement'
import ImpactMeasurementSystem from './pages/ImpactMeasurementSystem'
import SeaGreenPsychohistorical from './pages/SeaGreenPsychohistorical'
import GaiaTokenStatus from './pages/GaiaTokenStatus'
import VirtualWorld from './pages/VirtualWorld'
import AnimalWelfare from './pages/AnimalWelfare'
import Gaming from './pages/Gaming'
import Marketplace from './pages/Marketplace'
import Wallet from './pages/Wallet'
import VideoExchange from './pages/VideoExchange'
import StreamingShows from './pages/StreamingShows'
import GaiaBikeEcosystem from './pages/GaiaBikeEcosystem'
import TokenMining from './pages/TokenMining'
import CoinCrafter from './pages/CoinCrafter'
import SandProtect from './pages/SandProtect'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <Router>
          <div className="min-h-screen bg-background">
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/exchange" element={<Exchange />} />
                <Route path="/green-investments" element={<GreenInvestments />} />
                <Route path="/earning-activities" element={<EarningActivities />} />
                <Route path="/enhanced-leaderboard" element={<EnhancedLeaderboard />} />
                <Route path="/green-impact-dashboard" element={<GreenImpactDashboard />} />
                <Route path="/eco-avatar" element={<EcoAvatar />} />
                <Route path="/community-engagement-hub" element={<CommunityEngagementHub />} />
                <Route path="/partnership-management" element={<PartnershipManagement />} />
                <Route path="/impact-measurement-system" element={<ImpactMeasurementSystem />} />
                <Route path="/sea-green-psychohistorical" element={<SeaGreenPsychohistorical />} />
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
                <Route path="/coin-crafter" element={<CoinCrafter />} />
                <Route path="/sand-protect" element={<SandProtect />} />
              </Routes>
            </main>
            <Toaster />
          </div>
        </Router>
      </ThemeProvider>
    </QueryClientProvider>
  )
}

export default App
