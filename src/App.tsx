
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@/components/auth/AuthProvider"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { AdminOnlySecurityBarrier } from "@/components/admin/AdminOnlySecurityBarrier"
import { PageSpecificBackground } from "@/components/ui/page-specific-background"
import Home from "./pages/Home"
import About from "./pages/About"
import Contact from "./pages/Contact"
import Pricing from "./pages/Pricing"
import Downloads from "./pages/Downloads"
import Wallet from "./pages/Wallet"
import Gaming from "./pages/Gaming"
import CoinCrafter from "./pages/CoinCrafter"
import LiveTracking from "./pages/LiveTracking"
import Exchange from "./pages/Exchange"
import ComprehensiveStatus from "./pages/ComprehensiveStatus"
import SystemStatus from "./pages/SystemStatus"
import VirtualWorld from "./pages/VirtualWorld"
import Admin from "./pages/Admin"
import SecureAdmin from "./pages/SecureAdmin"
import ImmortalSecurity from "./pages/ImmortalSecurity"
import UltimateSecurity from "./pages/UltimateSecurity"
import NotFound from "./pages/NotFound"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AdminOnlySecurityBarrier />
          <Toaster />
          <BrowserRouter>
            <PageSpecificBackground />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/downloads" element={<Downloads />} />
              <Route path="/wallet" element={<Wallet />} />
              <Route path="/gaming" element={<Gaming />} />
              <Route path="/coin-crafter" element={<CoinCrafter />} />
              <Route path="/live-tracking" element={<LiveTracking />} />
              <Route path="/exchange" element={<Exchange />} />
              <Route path="/virtual-world" element={<VirtualWorld />} />
              <Route path="/comprehensive-status" element={<ComprehensiveStatus />} />
              <Route path="/system-status" element={<SystemStatus />} />
              <Route path="/security" element={<UltimateSecurity />} />
              <Route path="/immortal-security" element={<ImmortalSecurity />} />
              <Route path="/ultimate-security" element={<UltimateSecurity />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute isAdminRoute>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/secure-admin" 
                element={
                  <ProtectedRoute isAdminRoute>
                    <SecureAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
