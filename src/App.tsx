
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import Docs from '@/pages/Docs'
import Admin from '@/pages/Admin'
import AuthTest from '@/pages/AuthTest'
import SystemStatus from '@/pages/SystemStatus'
import UltimateSecurity from '@/pages/UltimateSecurity'
import Markets from '@/pages/Markets'
import GaiasExchange from '@/pages/GaiasExchange'
import Gaming from '@/pages/Gaming'
import Wallet from '@/pages/Wallet'
import Profile from '@/pages/Profile'
import Contact from '@/pages/Contact'
import Marketing from '@/pages/Marketing'
import TechnoSoulSolutions from '@/pages/TechnoSoulSolutions'
import Downloads from '@/pages/Downloads'
import VirtualWorld from '@/pages/VirtualWorld'
import ComprehensiveStatus from '@/pages/ComprehensiveStatus'
import LiveTracking from '@/pages/LiveTracking'
import CoinCrafter from '@/pages/CoinCrafter'
import Transparency from '@/pages/Transparency'
import LandscapeBuilder from '@/pages/LandscapeBuilder'
import GaiaFighterGame from '@/pages/GaiaFighterGame'
import ArtistStreaming from '@/pages/ArtistStreaming'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { EnhancedAdminControls } from '@/components/EnhancedAdminControls'
import { ConnectionTracker } from '@/components/security/ConnectionTracker'
import { Navbar } from '@/components/Navbar'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { PageSpecificBackground } from '@/components/ui/page-specific-background'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <PageSpecificBackground />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/docs" element={<Docs />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/auth-test" element={<AuthTest />} />
              <Route path="/system-status" element={<SystemStatus />} />
              <Route path="/ultimate-security" element={<UltimateSecurity />} />
              <Route path="/enhanced-admin" element={<EnhancedAdminControls />} />
              <Route path="/markets" element={<Markets />} />
              <Route path="/gaias-exchange" element={<GaiasExchange />} />
              <Route path="/gaming" element={<Gaming />} />
              <Route path="/gaia-fighter-game" element={<GaiaFighterGame />} />
              <Route path="/artist-streaming" element={<ArtistStreaming />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/marketing" element={<Marketing />} />
              <Route path="/techno-soul-solutions" element={<TechnoSoulSolutions />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/virtual-world" element={<VirtualWorld />} />
              <Route path="/comprehensive-status" element={<ComprehensiveStatus />} />
              <Route path="/live-tracking" element={<LiveTracking />} />
              <Route path="/coin-crafter" element={<CoinCrafter />} />
              <Route path="/transparency" element={<Transparency />} />
              <Route path="/landscape-builder" element={<LandscapeBuilder />} />
            </Routes>
          </BrowserRouter>
          <ConnectionTracker />
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
