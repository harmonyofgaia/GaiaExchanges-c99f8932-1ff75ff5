
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { Navbar } from "./components/Navbar"

// Import all pages
import Home from "./pages/Home"
import Dashboard from "./pages/Dashboard"
import Exchange from "./pages/Exchange"
import Admin from "./pages/Admin"
import Wallet from "./pages/Wallet"
import Markets from "./pages/Markets"
import SmartContracts from "./pages/SmartContracts"
import GamingHub from "./pages/GamingHub"
import Downloads from "./pages/Downloads"
import Marketing from "./pages/Marketing"
import Reinvestments from "./pages/Reinvestments"
import Transparency from "./pages/Transparency"
import SystemStatus from "./pages/SystemStatus"
import ComprehensiveStatus from "./pages/ComprehensiveStatus"
import GaiaConsistencyStatus from "./pages/GaiaConsistencyStatus"

// Phase 1 new pages
import AppStoreSubmission from "./pages/AppStoreSubmission"
import CommunityReinvestment from "./pages/CommunityReinvestment"
import AnimalWelfare from "./pages/AnimalWelfare"
import DeploymentCenter from "./pages/DeploymentCenter"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/exchange" element={<Exchange />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/markets" element={<Markets />} />
              <Route path="/smart-contracts" element={<SmartContracts />} />
              <Route path="/gaming-hub" element={<GamingHub />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/marketing" element={<Marketing />} />
              <Route path="/reinvestments" element={<Reinvestments />} />
              <Route path="/transparency" element={<Transparency />} />
              <Route path="/system-status" element={<SystemStatus />} />
              <Route path="/comprehensive-status" element={<ComprehensiveStatus />} />
              <Route path="/gaia-consistency-status" element={<GaiaConsistencyStatus />} />
              
              {/* Phase 1 Routes */}
              <Route path="/app-store-submission" element={<AppStoreSubmission />} />
              <Route path="/community-reinvestment" element={<CommunityReinvestment />} />
              <Route path="/animal-welfare" element={<AnimalWelfare />} />
              <Route path="/deployment-center" element={<DeploymentCenter />} />
            </Routes>
          </main>
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
)

export default App
