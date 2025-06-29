
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AdminOnlySecurityBarrier } from "@/components/admin/AdminOnlySecurityBarrier"
import { addressMigration } from "@/utils/addressMigration"
import { addressValidationService } from "@/services/addressValidationService"
import { useEffect } from "react"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import SecureAdmin from "./pages/SecureAdmin"
import Wallet from "./pages/Wallet"
import About from "./pages/About" 
import CoinCrafter from "./pages/CoinCrafter"
import GaiaCoinCrafterPage from "./pages/GaiaCoinCrafter"
import LiveTracking from "./pages/LiveTracking"
import ImmortalSecurity from "./pages/ImmortalSecurity"
import SystemStatus from "./pages/SystemStatus"
import ComprehensiveStatus from "./pages/ComprehensiveStatus"
import Gaming from "./pages/Gaming"
import GaiaFighterGame from "./pages/GaiaFighterGame"
import LandscapeBuilder from "./pages/LandscapeBuilder"
import VirtualWorld from "./pages/VirtualWorld"
import Contact from "./pages/Contact"
import Pricing from "./pages/Pricing"
import Exchange from "./pages/Exchange"
import Markets from "./pages/Markets"
import MarketingHub from "./pages/MarketingHub"
import GlobalMarketingDashboard from "./pages/GlobalMarketingDashboard"
import Webshop from "./pages/Webshop"
import "./App.css"
import { InvisibleSecurityCore } from "@/components/security/InvisibleSecurityCore"
import { UniquenessProtector } from "@/components/security/UniquenessProtector"
import { InvisibleAttachmentSystem } from "@/components/security/InvisibleAttachmentSystem"
import { Navbar } from "@/components/Navbar"
import { HoverSidebar } from "@/components/HoverSidebar"

const queryClient = new QueryClient()

function App() {
  useEffect(() => {
    // Run address migration and validation on startup
    const initializeAddresses = async () => {
      console.log('🔧 Initializing GAiA Token address validation...')
      
      // Perform full address migration
      await addressMigration.performFullSystemMigration()
      
      // Log correct addresses
      addressValidationService.logCorrectAddresses()
      
      // Validate all addresses
      const validation = addressValidationService.validateAllAddresses()
      if (!validation.isValid) {
        console.error('🚨 ADDRESS VALIDATION FAILED:')
        validation.errors.forEach(error => console.error(error))
      } else {
        console.log('✅ All addresses validated successfully!')
      }
    }

    initializeAddresses()
  }, [])

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <AdminOnlySecurityBarrier />
          <InvisibleSecurityCore />
          <UniquenessProtector />
          <InvisibleAttachmentSystem />
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <HoverSidebar />
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/secure-admin" element={<SecureAdmin />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/about" element={<About />} />
              <Route path="/coin-crafter" element={<CoinCrafter />} />
              <Route path="/gaia-coin-crafter" element={<GaiaCoinCrafterPage />} />
              <Route path="/live-tracking" element={<LiveTracking />} />
              <Route path="/immortal-security" element={<ImmortalSecurity />} />
              <Route path="/system-status" element={<SystemStatus />} />
              <Route path="/comprehensive-status" element={<ComprehensiveStatus />} />
              <Route path="/gaming" element={<Gaming />} />
              <Route path="/game" element={<GaiaFighterGame />} />
              <Route path="/landscape-builder" element={<LandscapeBuilder />} />
              <Route path="/virtual-world" element={<VirtualWorld />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/exchange" element={<Exchange />} />
              <Route path="/markets" element={<Markets />} />
              <Route path="/marketing-hub" element={<MarketingHub />} />
              <Route path="/global-marketing" element={<GlobalMarketingDashboard />} />
              <Route path="/webshop" element={<Webshop />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
