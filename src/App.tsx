
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@/components/auth/AuthProvider"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { AdminOnlySecurityBarrier } from "@/components/admin/AdminOnlySecurityBarrier"
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
import Admin from "./pages/Admin"
import SecureAdmin from "./pages/SecureAdmin"
import ImmortalSecurity from "./pages/ImmortalSecurity"
import UltimateSecurity from "./pages/UltimateSecurity"
import SystemStatus from "./pages/SystemStatus"
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
              <Route path="/comprehensive-status" element={<ComprehensiveStatus />} />
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
              <Route 
                path="/immortal-security" 
                element={
                  <ProtectedRoute>
                    <ImmortalSecurity />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/ultimate-security" 
                element={
                  <ProtectedRoute>
                    <UltimateSecurity />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/system-status" 
                element={
                  <ProtectedRoute isAdminRoute>
                    <SystemStatus />
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
