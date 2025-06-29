
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AdminOnlySecurityBarrier } from "@/components/admin/AdminOnlySecurityBarrier"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
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
import "./App.css"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <AdminOnlySecurityBarrier />
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/admin" element={<Admin />} />
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
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
