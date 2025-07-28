import { lazy, Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { Toaster } from 'sonner'
import { Navbar } from '@/components/Navbar'
import { GaiaLogo } from '@/components/GaiaLogo'
import { useGlobalBackgroundServices } from '@/hooks/useGlobalBackgroundServices'
import { CrossPagePersistence } from '@/components/system/CrossPagePersistence'
import { MenuControlProvider } from '@/components/menu/MenuControlProvider'

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'))
const LiveTracking = lazy(() => import('./pages/LiveTracking'))
const Gaming = lazy(() => import('./pages/Gaming'))
const Wallet = lazy(() => import('./pages/Wallet'))
const Markets = lazy(() => import('./pages/Markets'))
const VideoExchange = lazy(() => import('./pages/VideoExchange'))
const GaiaBikeEcosystem = lazy(() => import('./pages/GaiaBikeEcosystem'))
const TokenMining = lazy(() => import('./pages/TokenMining'))
const GreenInvestments = lazy(() => import('./pages/GreenInvestments'))
const CoinCrafter = lazy(() => import('./pages/CoinCrafter'))
const SandProtect = lazy(() => import('./pages/SandProtect'))
const GaiasProjects = lazy(() => import('./pages/GaiasProjects'))
const GaiaPrivateBlockchainSwapToken = lazy(() => import('./pages/GaiaPrivateBlockchainSwapToken'))
const PrivateBlockchain = lazy(() => import('./pages/PrivateBlockchain'))
const Admin = lazy(() => import('./pages/Admin'))
const SecureAdmin = lazy(() => import('./pages/SecureAdmin'))
const DeploymentStatus = lazy(() => import('./pages/DeploymentStatus'))
const EarningActivitiesDashboard = lazy(() => import('./pages/EarningActivitiesDashboard'))
const EnhancedLeaderboard = lazy(() => import('./pages/EnhancedLeaderboard'))
const LandscapeBuilder = lazy(() => import('./pages/LandscapeBuilder'))
const About = lazy(() => import('./pages/About'))
const Contact = lazy(() => import('./pages/Contact'))
const Pricing = lazy(() => import('./pages/Pricing'))
const VirtualWorld = lazy(() => import('./pages/VirtualWorld'))
const AnimalWelfare = lazy(() => import('./pages/AnimalWelfare'))
const Exchange = lazy(() => import('./pages/Exchange'))
const NFTGreenAnimals = lazy(() => import('./pages/NFTGreenAnimals'))
const AuraLandScrapyard = lazy(() => import('./pages/AuraLandScrapyard'))
const ComprehensiveStatus = lazy(() => import('./pages/ComprehensiveStatus'))

function App() {
  useGlobalBackgroundServices()

  return (
    <Router>
      <MenuControlProvider>
        <div className="min-h-screen bg-background text-foreground" data-router="true">
          <CrossPagePersistence />
          <Navbar />
          <main className="flex-1">
            <Suspense fallback={
              <div className="min-h-screen bg-background flex items-center justify-center">
                <div className="text-center">
                  <GaiaLogo size="xl" variant="matrix" />
                  <div className="mt-4 text-primary animate-pulse">Loading GAiA Universe...</div>
                </div>
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/virtual-world" element={<VirtualWorld />} />
                <Route path="/animal-welfare" element={<AnimalWelfare />} />
                <Route path="/gaming" element={<Gaming />} />
                <Route path="/exchange" element={<Exchange />} />
                <Route path="/nft-green-animals" element={<NFTGreenAnimals />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/markets" element={<Markets />} />
                <Route path="/video-exchange" element={<VideoExchange />} />
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
                <Route path="/admin" element={<Admin />} />
                <Route path="/live-tracking" element={<LiveTracking />} />
                <Route path="/sand-protect" element={<SandProtect />} />
                <Route path="/gaias-projects" element={<GaiasProjects />} />
                <Route path="/gaia-private-blockchain-swap-token" element={<GaiaPrivateBlockchainSwapToken />} />
                <Route path="/private-blockchain" element={<PrivateBlockchain />} />
                <Route path="/secure-admin" element={<SecureAdmin />} />
                <Route path="/deployment-status" element={<DeploymentStatus />} />
                <Route path="/earning-activities" element={<EarningActivitiesDashboard />} />
                <Route path="/enhanced-leaderboard" element={<EnhancedLeaderboard />} />
              </Routes>
            </Suspense>
          </main>
          <Toaster position="top-right" />
        </div>
      </MenuControlProvider>
    </Router>
  )
}

export default App
