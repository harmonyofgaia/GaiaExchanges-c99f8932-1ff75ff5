import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/toaster"
import Index from './pages/Index'
import Dashboard from './pages/Dashboard'
import Exchange from './pages/Exchange'
import GaiasProjects from './pages/GaiasProjects'
import Auth from './pages/Auth'
import Admin from './pages/Admin'
import Security from './pages/Security'
import GreenImpactDashboard from './pages/GreenImpactDashboard'
import DecentralizedProjectFundingPools from './pages/DecentralizedProjectFundingPools'
import EcoMissionGenerator from './pages/EcoMissionGenerator'
import PlanetCleaningRewardsSystem from './pages/PlanetCleaningRewardsSystem'
import NFTCardGame from './pages/NFTCardGame'
import EcoAvatarGaiaSoulSystem from './pages/EcoAvatarGaiaSoulSystem'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <div className="min-h-screen bg-background">
          <Router>
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
          </Router>
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
