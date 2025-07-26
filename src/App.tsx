
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { MasterSystemOrchestrator } from '@/components/system/MasterSystemOrchestrator'
import { AdminRouteProtector } from '@/components/admin/AdminRouteProtector'
import Index from '@/pages/Index'
import Admin from '@/pages/Admin'
import AdminLogin from '@/pages/AdminLogin'
import SecureAdmin from '@/pages/SecureAdmin'
import SecureVault from '@/pages/SecureVault'
import Security from '@/pages/Security'
import QuantumSecurity from '@/pages/QuantumSecurity'
import About from '@/pages/About'
import Wallet from '@/pages/Wallet'
import Markets from '@/pages/Markets'
import SmartContracts from '@/pages/SmartContracts'
import SystemStatus from '@/pages/SystemStatus'
import ComprehensiveStatus from '@/pages/ComprehensiveStatus'
import Downloads from '@/pages/Downloads'
import Marketing from '@/pages/Marketing'
import Reinvestments from '@/pages/Reinvestments'
import Transparency from '@/pages/Transparency'
import Gaming from '@/pages/Gaming'
import GaiaFighterGame from '@/pages/GaiaFighterGame'
import LiveTracking from '@/pages/LiveTracking'
import GaiaCoinCrafter from '@/pages/GaiaCoinCrafter'
import LandscapeBuilder from '@/pages/LandscapeBuilder'
import Dashboard from '@/pages/Dashboard'
import Exchange from '@/pages/Exchange'
import GaiasProjects from '@/pages/GaiasProjects'
import GreenImpactDashboard from '@/pages/GreenImpactDashboard'
import ProjectFunding from '@/pages/ProjectFunding'
import EcoMissions from '@/pages/EcoMissions'
import PlanetCleaning from '@/pages/PlanetCleaning'
import NFTCards from '@/pages/NFTCards'
import EcoAvatar from '@/pages/EcoAvatar'
import SeaGreenPsychohistoricalProject from '@/pages/SeaGreenPsychohistoricalProject'
import NotFound from '@/pages/NotFound'
import './App.css'

const queryClient = new QueryClient()

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <AdminRouteProtector />
            <MasterSystemOrchestrator />
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
              <Route path="/sea-green-psychohistorical" element={<SeaGreenPsychohistoricalProject />} />
              <Route path="/about" element={<About />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/markets" element={<Markets />} />
              <Route path="/smart-contracts" element={<SmartContracts />} />
              <Route path="/system-status" element={<SystemStatus />} />
              <Route path="/comprehensive-status" element={<ComprehensiveStatus />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/marketing" element={<Marketing />} />
              <Route path="/reinvestments" element={<Reinvestments />} />
              <Route path="/transparency" element={<Transparency />} />
              <Route path="/gaming" element={<Gaming />} />
              <Route path="/gaia-fighter" element={<GaiaFighterGame />} />
              <Route path="/live-tracking" element={<LiveTracking />} />
              <Route path="/coin-crafter" element={<GaiaCoinCrafter />} />
              <Route path="/landscape-builder" element={<LandscapeBuilder />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/admin-login" element={<AdminLogin />} />
              <Route path="/secure-admin" element={<SecureAdmin />} />
              <Route path="/secure-vault" element={<SecureVault />} />
              <Route path="/security" element={<Security />} />
              <Route path="/quantum-security" element={<QuantumSecurity />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
            <Toaster 
              position="top-right"
              toastOptions={{
                style: {
                  background: 'rgba(0, 0, 0, 0.9)',
                  color: '#10b981',
                  border: '1px solid rgba(16, 185, 129, 0.3)'
                }
              }}
            />
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </div>
  )
}

export default App
