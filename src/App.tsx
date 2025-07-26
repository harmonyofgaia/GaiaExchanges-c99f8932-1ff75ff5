
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '@/components/auth/AuthProvider'
import Index from './pages/Index'

// Lazy load all pages to improve performance
import { lazy, Suspense } from 'react'

const Dashboard = lazy(() => import('./pages/Dashboard'))
const Exchange = lazy(() => import('./pages/Exchange'))
const GaiasProjects = lazy(() => import('./pages/GaiasProjects'))
const GreenImpactDashboard = lazy(() => import('./pages/GreenImpactDashboard'))
const ProjectFunding = lazy(() => import('./pages/ProjectFunding'))
const EcoMissions = lazy(() => import('./pages/EcoMissions'))
const PlanetCleaning = lazy(() => import('./pages/PlanetCleaning'))
const NFTCards = lazy(() => import('./pages/NFTCards'))
const EcoAvatar = lazy(() => import('./pages/EcoAvatar'))
const ForestShieldMasterPlan = lazy(() => import('./pages/ForestShieldMasterPlan'))
const WildfireDefenseDashboard = lazy(() => import('./pages/WildfireDefenseDashboard'))
const ForestTokenSystem = lazy(() => import('./pages/ForestTokenSystem'))
const CommunityEngagementHub = lazy(() => import('./pages/CommunityEngagementHub'))
const PartnershipManagement = lazy(() => import('./pages/PartnershipManagement'))
const ImpactMeasurementSystem = lazy(() => import('./pages/ImpactMeasurementSystem'))
const SeaGreenPsychohistoricalProject = lazy(() => import('./pages/SeaGreenPsychohistoricalProject'))
const Admin = lazy(() => import('./legacy-pages/Admin'))
const DeploymentCenter = lazy(() => import('./legacy-pages/DeploymentCenter'))
const Security = lazy(() => import('./pages/Security'))
const VideoExchange = lazy(() => import('./pages/VideoExchange'))
const SecureAdmin = lazy(() => import('./pages/SecureAdmin'))
const GaiaBikeEcosystem = lazy(() => import('./pages/GaiaBikeEcosystem'))
const NFTCardGame = lazy(() => import('./pages/NFTCardGame'))
const CoinCrafter = lazy(() => import('./pages/CoinCrafter'))

// Loading component
const LoadingSpinner = () => (
  <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
    <div className="text-center space-y-4">
      <div className="w-16 h-16 bg-green-500/20 rounded-full mx-auto animate-pulse flex items-center justify-center">
        <div className="w-8 h-8 bg-green-400 rounded-full animate-bounce"></div>
      </div>
      <p className="text-green-400 font-medium">Loading GAiA Platform...</p>
    </div>
  </div>
)

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/exchange" element={<Exchange />} />
                <Route path="/gaias-projects" element={<GaiasProjects />} />
                <Route path="/green-impact-dashboard" element={<GreenImpactDashboard />} />
                <Route path="/project-funding" element={<ProjectFunding />} />
                <Route path="/eco-missions" element={<EcoMissions />} />
                <Route path="/planet-cleaning" element={<PlanetCleaning />} />
                <Route path="/nft-cards" element={<NFTCards />} />
                <Route path="/eco-avatar" element={<EcoAvatar />} />
                <Route path="/forest-shield-master-plan" element={<ForestShieldMasterPlan />} />
                <Route path="/wildfire-defense-dashboard" element={<WildfireDefenseDashboard />} />
                <Route path="/forest-token-system" element={<ForestTokenSystem />} />
                <Route path="/community-engagement-hub" element={<CommunityEngagementHub />} />
                <Route path="/partnership-management" element={<PartnershipManagement />} />
                <Route path="/impact-measurement-system" element={<ImpactMeasurementSystem />} />
                <Route path="/sea-green-psychohistorical" element={<SeaGreenPsychohistoricalProject />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/deployment-center" element={<DeploymentCenter />} />
                <Route path="/security" element={<Security />} />
                <Route path="/secure-admin/video-exchange" element={<VideoExchange />} />
                <Route path="/admin-login" element={<SecureAdmin />} />
                <Route path="/secure-vault" element={<SecureAdmin />} />
                <Route path="/gaia-bike-ecosystem" element={<GaiaBikeEcosystem />} />
                <Route path="/nft-card-game" element={<NFTCardGame />} />
                <Route path="/coin-crafter" element={<CoinCrafter />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
