import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/toaster"

// Lazy load all page components for better performance
const Index = React.lazy(() => import('./pages/Index'))
const Dashboard = React.lazy(() => import('./pages/Dashboard'))
const Exchange = React.lazy(() => import('./pages/Exchange'))
const GaiasProjects = React.lazy(() => import('./pages/GaiasProjects'))
const Auth = React.lazy(() => import('./pages/Auth'))
const Admin = React.lazy(() => import('./pages/Admin'))
const Security = React.lazy(() => import('./pages/Security'))
const GreenImpactDashboard = React.lazy(() => import('./pages/GreenImpactDashboard'))
const DecentralizedProjectFundingPools = React.lazy(() => import('./pages/DecentralizedProjectFundingPools'))
const EcoMissionGenerator = React.lazy(() => import('./pages/EcoMissionGenerator'))
const PlanetCleaningRewardsSystem = React.lazy(() => import('./pages/PlanetCleaningRewardsSystem'))
const NFTCardGame = React.lazy(() => import('./pages/NFTCardGame'))
const EcoAvatarGaiaSoulSystem = React.lazy(() => import('./pages/EcoAvatarGaiaSoulSystem'))

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-background">
    <div className="flex flex-col items-center space-y-4">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-400"></div>
      <p className="text-muted-foreground">Loading...</p>
    </div>
  </div>
)

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen bg-background">
          <Router>
            <Suspense fallback={<LoadingFallback />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/exchange" element={<Exchange />} />
                <Route path="/gaias-projects" element={<GaiasProjects />} />
                <Route path="/green-impact-dashboard" element={<GreenImpactDashboard />} />
                <Route path="/project-funding" element={<DecentralizedProjectFundingPools />} />
                <Route path="/eco-missions" element={<EcoMissionGenerator />} />
                <Route path="/planet-cleaning" element={<PlanetCleaningRewardsSystem />} />
                <Route path="/nft-cards" element={<NFTCardGame />} />
                <Route path="/eco-avatar" element={<EcoAvatarGaiaSoulSystem />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/security" element={<Security />} />
              </Routes>
            </Suspense>
          </Router>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
