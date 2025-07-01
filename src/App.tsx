
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { AppLayout } from '@/components/layout/AppLayout'
import Index from '@/pages/Index'
import Home from '@/pages/Home'
import Gaming from '@/pages/Gaming'
import Admin from '@/pages/Admin'
import UltimateSecurity from '@/pages/UltimateSecurity'
import GaiaCoinCrafter from '@/pages/GaiaCoinCrafter'
import LandscapeBuilder from '@/pages/LandscapeBuilder'
import GaiaFighterGame from '@/pages/GaiaFighterGame'
import Game from '@/pages/Game'
import VirtualWorld from '@/pages/VirtualWorld'
import Wallet from '@/pages/Wallet'
import LiveTracking from '@/pages/LiveTracking'
import SystemStatus from '@/pages/SystemStatus'
import ComprehensiveStatus from '@/pages/ComprehensiveStatus'
import ImmortalSecurity from '@/pages/ImmortalSecurity'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Pricing from '@/pages/Pricing'
import Exchange from '@/pages/Exchange'
import NFTs from '@/pages/NFTs'
import Analytics from '@/pages/Analytics'
import Swap from '@/pages/Swap'
import GaiasProjects from '@/pages/GaiasProjects'
import TransparentWallet from '@/pages/TransparentWallet'
import Security from '@/pages/Security'
import UltimateFeatureHub from '@/pages/UltimateFeatureHub'
import NFTGreenAnimalPlatform from '@/pages/NFTGreenAnimalPlatform'
import SecureVault from '@/pages/SecureVault'
import SecureAdmin from '@/pages/SecureAdmin'
import Docs from '@/pages/Docs'
import { PersistentAdminSession } from '@/components/admin/PersistentAdminSession'
import { AdminRouteProtector } from '@/components/admin/AdminRouteProtector'
import { PageStabilityMonitor } from '@/components/admin/PageStabilityMonitor'
import { AutoStabilityEngine } from '@/components/admin/AutoStabilityEngine'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <PersistentAdminSession />
        <AdminRouteProtector />
        <PageStabilityMonitor />
        <AutoStabilityEngine />
        <AppLayout>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/gaming" element={<Gaming />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/ultimate-security" element={<UltimateSecurity />} />
            <Route path="/coin-crafter" element={<GaiaCoinCrafter />} />
            <Route path="/gaia-coin-crafter" element={<GaiaCoinCrafter />} />
            <Route path="/landscape-builder" element={<LandscapeBuilder />} />
            <Route path="/aura-land-scrapyard" element={<LandscapeBuilder />} />
            <Route path="/gaia-fighter-game" element={<GaiaFighterGame />} />
            <Route path="/gaia-fighter" element={<GaiaFighterGame />} />
            <Route path="/game" element={<Game />} />
            <Route path="/virtual-world" element={<VirtualWorld />} />
            <Route path="/wallet" element={<Wallet />} />
            <Route path="/live-tracking" element={<LiveTracking />} />
            <Route path="/system-status" element={<SystemStatus />} />
            <Route path="/comprehensive-status" element={<ComprehensiveStatus />} />
            <Route path="/immortal-security" element={<ImmortalSecurity />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/exchange" element={<Exchange />} />
            <Route path="/nfts" element={<NFTs />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/swap" element={<Swap />} />
            <Route path="/gaias-projects" element={<GaiasProjects />} />
            <Route path="/transparent-wallet" element={<TransparentWallet />} />
            <Route path="/security" element={<Security />} />
            <Route path="/complete-system-hub" element={<UltimateFeatureHub />} />
            <Route path="/ultimate-feature-hub" element={<UltimateFeatureHub />} />
            <Route path="/nft-green-animal-platform" element={<NFTGreenAnimalPlatform />} />
            <Route path="/live-animals" element={<NFTGreenAnimalPlatform />} />
            <Route path="/secure-vault" element={<SecureVault />} />
            <Route path="/secure-admin" element={<SecureAdmin />} />
            <Route path="/admin-vault" element={<SecureVault />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/documentation" element={<Docs />} />
          </Routes>
        </AppLayout>
        <Toaster />
      </Router>
    </QueryClientProvider>
  )
}

export default App
