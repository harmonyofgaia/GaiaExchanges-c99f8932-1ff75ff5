
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from "@/components/Navbar"
import Index from "./pages/Index"
import CoinCrafter from "./pages/CoinCrafter"
import GaiaCoinCrafterPage from "./pages/GaiaCoinCrafter"
import LiveTracking from "./pages/LiveTracking"
import ImmortalSecurity from "./pages/ImmortalSecurity"
import Wallet from "./pages/Wallet"
import Exchange from "./pages/Exchange"
import Gaming from "./pages/Gaming"
import "./App.css"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
            <Navbar />
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/coin-crafter" element={<CoinCrafter />} />
              <Route path="/gaia-coin-crafter" element={<GaiaCoinCrafterPage />} />
              <Route path="/live-tracking" element={<LiveTracking />} />
              <Route path="/immortal-security" element={<ImmortalSecurity />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/exchange" element={<Exchange />} />
              <Route path="/gaming" element={<Gaming />} />
            </Routes>
          </div>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
