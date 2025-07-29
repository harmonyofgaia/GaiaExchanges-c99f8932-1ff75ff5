
import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Navbar } from '@/components/Navbar'
import { GaiaLogo } from '@/components/GaiaLogo'
import { useGlobalBackgroundServices } from '@/hooks/useGlobalBackgroundServices'
import { CrossPagePersistence } from '@/components/system/CrossPagePersistence'
import { HoneypotRedirect } from '@/components/security/HoneypotRedirect'
import { AnimatedEarthLogo } from '@/components/branding/AnimatedEarthLogo'
import { PersistentAudioControls } from '@/components/audio/PersistentAudioControls'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const Dashboard = lazy(() => import('./pages/Dashboard'))
const GreenImpactDashboard = lazy(() => import('./pages/GreenImpactDashboard'))
const EcoAvatar = lazy(() => import('./legacy-pages/EcoAvatar'))
const DeploymentCenter = lazy(() => import('./legacy-pages/DeploymentCenter'))
const LiveTracking = lazy(() => import('./pages/LiveTracking'))
const Gaming = lazy(() => import('./pages/Gaming'))
const Wallet = lazy(() => import('./pages/Wallet'))
const Marketplace = lazy(() => import('./pages/Marketplace'))
const VideoExchange = lazy(() => import('./pages/VideoExchange'))
const StreamingShows = lazy(() => import('./pages/StreamingShows'))
const GaiaBikeEcosystem = lazy(() => import('./pages/GaiaBikeEcosystem'))
const TokenMining = lazy(() => import('./pages/TokenMining'))
const GreenInvestments = lazy(() => import('./pages/GreenInvestments'))
const CoinCrafter = lazy(() => import('./pages/CoinCrafter'))
const SandProtect = lazy(() => import('./pages/SandProtect'))
const GaiasProjects = lazy(() => import('./pages/GaiasProjects'))
const GaiaPrivateBlockchainSwapToken = lazy(() => import('./pages/GaiaPrivateBlockchainSwapToken'))
const PrivateBlockchain = lazy(() => import('./pages/PrivateBlockchain'))
const SecureAdmin = lazy(() => import('./pages/SecureAdmin'))
const EarningActivitiesDashboard = lazy(() => import('./pages/EarningActivities'))
const EnhancedLeaderboard = lazy(() => import('./pages/EnhancedLeaderboard'))
const DecentralizedProjectFundingPools = lazy(() => import('./pages/DecentralizedProjectFundingPools'))
const CommunityEngagementHub = lazy(() => import('./pages/CommunityEngagementHub'))
const PartnershipManagement = lazy(() => import('./pages/PartnershipManagement'))
const ImpactMeasurementSystem = lazy(() => import('./pages/ImpactMeasurementSystem'))
const SeaGreenPsychohistorical = lazy(() => import('./pages/SeaGreenPsychohistorical'))
const GaiaTokenStatus = lazy(() => import('./pages/GaiaTokenStatus'))
const LandscapeBuilder = lazy(() => import('./pages/LandscapeBuilder'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Pricing = lazy(() => import('./pages/Pricing'))
const VirtualWorld = lazy(() => import('./pages/VirtualWorld'))
const AnimalWelfare = lazy(() => import('./pages/AnimalWelfare'))
const Exchange = lazy(() => import('./pages/Exchange'))
const AuraLandScrapyard = lazy(() => import('./pages/AuraLandScrapyard'))
const ComprehensiveStatus = lazy(() => import('./pages/ComprehensiveStatus'))

function App() {
  useGlobalBackgroundServices()

  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground" data-router="true">
        <CrossPagePersistence />
        <HoneypotRedirect />
        <Navbar />
        <main className="flex-1">
          <Suspense fallback={
            <div className="min-h-screen bg-background flex items-center justify-center">
              <div className="text-center">
                <div className="mb-4 flex justify-center">
                  <AnimatedEarthLogo />
                </div>
                <div className="mt-4 text-primary animate-pulse">Loading Gaia's Exchanges...</div>
              </div>
            </div>
          }>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/green-impact-dashboard" element={<GreenImpactDashboard />} />
              <Route path="/eco-avatar" element={<EcoAvatar />} />
              <Route path="/community-engagement-hub" element={<CommunityEngagementHub />} />
              {/* Partnership management moved to secure admin only */}
              <Route path="/impact-measurement-system" element={<ImpactMeasurementSystem />} />
              <Route path="/sea-green-psychohistorical" element={<SeaGreenPsychohistorical />} />
              <Route path="/gaia-token-status" element={<GaiaTokenStatus />} />
              <Route path="/deployment-center" element={<DeploymentCenter />} />
              <Route path="/virtual-world" element={<VirtualWorld />} />
              <Route path="/animal-welfare" element={<AnimalWelfare />} />
              <Route path="/gaming" element={<Gaming />} />
              <Route path="/exchange" element={<Exchange />} />
              <Route path="/marketplace" element={<Marketplace />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/video-exchange" element={<VideoExchange />} />
              <Route path="/streaming-shows" element={<StreamingShows />} />
              <Route path="/gaia-bike-ecosystem" element={<GaiaBikeEcosystem />} />
              <Route path="/token-mining" element={<TokenMining />} />
              <Route path="/green-investments" element={<GreenInvestments />} />
              <Route path="/coin-crafter" element={<CoinCrafter />} />
              <Route path="/landscape-builder" element={<LandscapeBuilder />} />
              <Route path="/aura-land-scrapyard" element={<AuraLandScrapyard />} />
              <Route path="/comprehensive-status" element={<ComprehensiveStatus />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/admin" element={<Navigate to="/secure-admin" replace />} />
              <Route path="/live-tracking" element={<LiveTracking />} />
              <Route path="/sand-protect" element={<SandProtect />} />
              <Route path="/gaias-projects" element={<GaiasProjects />} />
              <Route path="/gaia-private-blockchain-swap-token" element={<GaiaPrivateBlockchainSwapToken />} />
              <Route path="/private-blockchain" element={<PrivateBlockchain />} />
              <Route path="/secure-admin" element={<SecureAdmin />} />
              <Route path="/earning-activities" element={<EarningActivitiesDashboard />} />
              <Route path="/enhanced-leaderboard" element={<EnhancedLeaderboard />} />
              <Route path="/project-funding" element={<DecentralizedProjectFundingPools />} />
            </Routes>
          </Suspense>
        </main>
        <PersistentAudioControls />
        <Toaster position="top-right" />
      </div>
    </Router>
  )
}

export default App
