import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import './App.css'

import { Navbar } from '@/components/Navbar'
import AppSidebar from '@/components/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { BackgroundMediaEngine } from '@/components/media/BackgroundMediaEngine'

// Pages - Keep all existing pages except removed ones
import Index from '@/pages/Index'
import Exchange from '@/pages/Exchange'
import Gaming from '@/pages/Gaming'
import NFTs from '@/pages/NFTs'
import Analytics from '@/pages/Analytics'
import Swap from '@/pages/Swap'
import Security from '@/pages/Security'
import AdminLogin from '@/pages/AdminLogin'
import SecureAdmin from '@/pages/SecureAdmin'
import GaiasProjects from '@/pages/GaiasProjects'
import TransparentWallet from '@/pages/TransparentWallet'
import GaiaCoinCrafter from '@/pages/GaiaCoinCrafter'
import LandscapeBuilder from '@/pages/LandscapeBuilder'
import GaiaFighterGame from '@/pages/GaiaFighterGame'

// Keep existing advanced pages (removed Enhanced Downloads and Docs from routes)
import UltimateFeatureHub from '@/pages/UltimateFeatureHub'
import NFTGreenAnimalPlatform from '@/pages/NFTGreenAnimalPlatform'
import SecureVault from '@/pages/SecureVault'
import AuraLandScrapyard from '@/pages/AuraLandScrapyard'
import CoinCrafter from '@/pages/CoinCrafter'
import VirtualWorld from '@/pages/VirtualWorld'
import LiveTracking from '@/pages/LiveTracking'
import SystemStatus from '@/pages/SystemStatus'
import ComprehensiveStatus from '@/pages/ComprehensiveStatus'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Pricing from '@/pages/Pricing'

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
              
              <div className="flex">
                <AppSidebar />
                <div className="flex-1">
                  <Navbar />
                  <main className="container mx-auto px-4 py-6">
                    <Routes>
                      {/* Keep all existing routes except removed ones */}
                      <Route path="/" element={<Index />} />
                      <Route path="/exchange" element={<Exchange />} />
                      <Route path="/gaming" element={<Gaming />} />
                      <Route path="/nfts" element={<NFTs />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/swap" element={<Swap />} />
                      <Route path="/security" element={<Security />} />
                      <Route path="/admin" element={<AdminLogin />} />
                      <Route path="/secure-admin" element={<SecureAdmin />} />
                      <Route path="/secure-vault" element={<SecureVault />} />
                      <Route path="/gaias-projects" element={<GaiasProjects />} />
                      <Route path="/transparent-wallet" element={<TransparentWallet />} />
                      <Route path="/coin-crafter" element={<GaiaCoinCrafter />} />
                      <Route path="/landscape-builder" element={<LandscapeBuilder />} />
                      <Route path="/gaia-fighter" element={<GaiaFighterGame />} />
                      
                      {/* Keep advanced feature routes (removed individual Ultimate/Immortal Security and Enhanced Downloads/Docs routes) */}
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
                    </Routes>
                  </main>
                </div>
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
