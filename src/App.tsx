
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import './App.css'

import { Navbar } from '@/components/Navbar'
import SlidingMenu from '@/components/SlidingMenu'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { BackgroundMediaEngine } from '@/components/media/BackgroundMediaEngine'

// Pages - Core Pages
import Index from '@/pages/Index'
import Exchange from '@/pages/Exchange'
import Gaming from '@/pages/Gaming'
import NFTs from '@/pages/NFTs'
import Analytics from '@/pages/Analytics'
import Swap from '@/pages/Swap'
import Security from '@/pages/Security'
import AdminLogin from '@/pages/AdminLogin'
import SecureAdmin from '@/pages/SecureAdmin'
import SecureVault from '@/pages/SecureVault'
import GaiasProjects from '@/pages/GaiasProjects'
import TransparentWallet from '@/pages/TransparentWallet'
import GaiaCoinCrafter from '@/pages/GaiaCoinCrafter'
import LandscapeBuilder from '@/pages/LandscapeBuilder'
import GaiaFighterGame from '@/pages/GaiaFighterGame'

// Game Pages
import GaiaFantasyMMORPG from '@/pages/games/GaiaFantasyMMORPG'
import SnakeArenaGame from '@/pages/games/SnakeArenaGame'
import Game from '@/pages/Game'

// Advanced Pages
import UltimateFeatureHub from '@/pages/UltimateFeatureHub'
import NFTGreenAnimalPlatform from '@/pages/NFTGreenAnimalPlatform'
import AuraLandScrapyard from '@/pages/AuraLandScrapyard'
import CoinCrafter from '@/pages/CoinCrafter'
import VirtualWorld from '@/pages/VirtualWorld'
import LiveTracking from '@/pages/LiveTracking'
import SystemStatus from '@/pages/SystemStatus'
import ComprehensiveStatus from '@/pages/ComprehensiveStatus'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Pricing from '@/pages/Pricing'

// New Enhanced Pages
import GAiAPrivateBlockchain from '@/pages/GAiAPrivateBlockchain'
import CommunityVault from '@/pages/CommunityVault'
import TransparentWallets from '@/pages/TransparentWallets'
import NFTMarketplace from '@/pages/NFTMarketplace'
import AdvancedLandscapeBuilder from '@/pages/AdvancedLandscapeBuilder'
import Admin from '@/pages/Admin'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <SidebarProvider>
            <div className="min-h-screen bg-background text-foreground">
              {/* Background Media Engine */}
              <BackgroundMediaEngine />
              
              {/* Sliding Menu */}
              <SlidingMenu />
              
              {/* Main Content Area */}
              <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="flex-1 container mx-auto px-4 py-6">
                  <Routes>
                    {/* Core Routes */}
                    <Route path="/" element={<Index />} />
                    <Route path="/exchange" element={<Exchange />} />
                    <Route path="/gaming" element={<Gaming />} />
                    <Route path="/nfts" element={<NFTs />} />
                    <Route path="/analytics" element={<Analytics />} />
                    <Route path="/swap" element={<Swap />} />
                    <Route path="/security" element={<Security />} />
                    
                    {/* Admin Routes */}
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/secure-admin" element={<SecureAdmin />} />
                    <Route path="/secure-vault" element={<SecureVault />} />
                    
                    {/* Project Routes */}
                    <Route path="/gaias-projects" element={<GaiasProjects />} />
                    <Route path="/transparent-wallet" element={<TransparentWallet />} />
                    <Route path="/coin-crafter" element={<GaiaCoinCrafter />} />
                    <Route path="/landscape-builder" element={<LandscapeBuilder />} />
                    <Route path="/gaia-fighter" element={<GaiaFighterGame />} />
                    <Route path="/gaia-fighter-game" element={<GaiaFighterGame />} />
                    
                    {/* Game Routes */}
                    <Route path="/game/gaia-fantasy-mmorpg" element={<GaiaFantasyMMORPG />} />
                    <Route path="/game/snake-arena" element={<SnakeArenaGame />} />
                    <Route path="/game" element={<Game />} />
                    
                    {/* Advanced Feature Routes */}
                    <Route path="/ultimate-features" element={<UltimateFeatureHub />} />
                    <Route path="/nft-green-animals" element={<NFTGreenAnimalPlatform />} />
                    <Route path="/aura-land-scrapyard" element={<AuraLandScrapyard />} />
                    <Route path="/virtual-world" element={<VirtualWorld />} />
                    <Route path="/live-tracking" element={<LiveTracking />} />
                    <Route path="/system-status" element={<SystemStatus />} />
                    <Route path="/comprehensive-status" element={<ComprehensiveStatus />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/pricing" element={<Pricing />} />
                    
                    {/* Enhanced Routes */}
                    <Route path="/gaia-private-blockchain" element={<GAiAPrivateBlockchain />} />
                    <Route path="/community-vault" element={<CommunityVault />} />
                    <Route path="/transparent-wallets" element={<TransparentWallets />} />
                    <Route path="/nft-marketplace" element={<NFTMarketplace />} />
                    <Route path="/advanced-landscape-builder" element={<AdvancedLandscapeBuilder />} />
                  </Routes>
                </main>
              </div>
            </div>
            <Toaster position="top-right" />
          </SidebarProvider>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
