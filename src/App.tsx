import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth/AuthProvider"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { useGlobalBackgroundServices } from "@/hooks/useGlobalBackgroundServices"
import { InvisibleEcoIndicator } from "@/components/eco/InvisibleEcoIndicator"

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
const GaiaBikeEcosystem = React.lazy(() => import('./pages/GaiaBikeEcosystem'))

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

// Global background services component
function GlobalBackgroundServices() {
  const backgroundState = useGlobalBackgroundServices()
  
  // This component runs all background services invisibly
  // It has no UI impact - all upgrades are completely invisible to users
  return null
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <GlobalBackgroundServices />
          <InvisibleEcoIndicator />
          <div className="min-h-screen bg-background">
            <Router>
              <Suspense fallback={<LoadingFallback />}>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/dashboard" element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/exchange" element={
                    <ProtectedRoute>
                      <Exchange />
                    </ProtectedRoute>
                  } />
                  <Route path="/gaias-projects" element={
                    <ProtectedRoute>
                      <GaiasProjects />
                    </ProtectedRoute>
                  } />
                  <Route path="/green-impact-dashboard" element={
                    <ProtectedRoute>
                      <GreenImpactDashboard />
                    </ProtectedRoute>
                  } />
                  <Route path="/project-funding" element={
                    <ProtectedRoute>
                      <DecentralizedProjectFundingPools />
                    </ProtectedRoute>
                  } />
                  <Route path="/eco-missions" element={
                    <ProtectedRoute>
                      <EcoMissionGenerator />
                    </ProtectedRoute>
                  } />
                  <Route path="/planet-cleaning" element={
                    <ProtectedRoute>
                      <PlanetCleaningRewardsSystem />
                    </ProtectedRoute>
                  } />
                  <Route path="/nft-cards" element={
                    <ProtectedRoute>
                      <NFTCardGame />
                    </ProtectedRoute>
                  } />
                  <Route path="/eco-avatar" element={
                    <ProtectedRoute>
                      <EcoAvatarGaiaSoulSystem />
                    </ProtectedRoute>
                  } />
                  <Route path="/gaia-bike" element={
                    <ProtectedRoute>
                      <GaiaBikeEcosystem />
                    </ProtectedRoute>
                  } />
                  <Route path="/auth" element={<Auth />} />
                  <Route path="/admin" element={
                    <ProtectedRoute isAdminRoute={true}>
                      <Admin />
                    </ProtectedRoute>
                  } />
                  <Route path="/security" element={
                    <ProtectedRoute isAdminRoute={true}>
                      <Security />
                    </ProtectedRoute>
                  } />
                </Routes>
              </Suspense>
            </Router>
          </div>
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
