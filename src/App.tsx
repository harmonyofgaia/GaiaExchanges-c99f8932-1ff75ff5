
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@/components/auth/AuthProvider"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { UserOnlyProtectedRoute } from "@/components/auth/UserOnlyProtectedRoute"
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
import AuraLandScrapyard from "./pages/AuraLandScrapyard"
import NFTGreenAnimalPlatform from "./pages/NFTGreenAnimalPlatform"

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
              {/* Public auth page - only visible if not logged in */}
              <Route path="/auth" element={<Home />} />
              
              {/* All other routes require user authentication */}
              <Route path="/" element={
                <UserOnlyProtectedRoute>
                  <Home />
                </UserOnlyProtectedRoute>
              } />
              <Route path="/about" element={
                <UserOnlyProtectedRoute>
                  <About />
                </UserOnlyProtectedRoute>
              } />
              <Route path="/contact" element={
                <UserOnlyProtectedRoute>
                  <Contact />
                </UserOnlyProtectedRoute>
              } />
              <Route path="/pricing" element={
                <UserOnlyProtectedRoute>
                  <Pricing />
                </UserOnlyProtectedRoute>
              } />
              <Route path="/downloads" element={
                <UserOnlyProtectedRoute>
                  <Downloads />
                </UserOnlyProtectedRoute>
              } />
              <Route path="/wallet" element={
                <UserOnlyProtectedRoute>
                  <Wallet />
                </UserOnlyProtectedRoute>
              } />
              <Route path="/gaming" element={
                <UserOnlyProtectedRoute>
                  <Gaming />
                </UserOnlyProtectedRoute>
              } />
              <Route path="/coin-crafter" element={
                <UserOnlyProtectedRoute>
                  <CoinCrafter />
                </UserOnlyProtectedRoute>
              } />
              <Route path="/live-tracking" element={
                <UserOnlyProtectedRoute>
                  <LiveTracking />
                </UserOnlyProtectedRoute>
              } />
              <Route path="/exchange" element={
                <UserOnlyProtectedRoute>
                  <Exchange />
                </UserOnlyProtectedRoute>
              } />
              <Route path="/virtual-world" element={
                <UserOnlyProtectedRoute>
                  <VirtualWorld />
                </UserOnlyProtectedRoute>
              } />
              <Route path="/aura-land-scrapyard" element={
                <UserOnlyProtectedRoute>
                  <AuraLandScrapyard />
                </UserOnlyProtectedRoute>
              } />
              <Route path="/nft-green-animal-platform" element={
                <UserOnlyProtectedRoute>
                  <NFTGreenAnimalPlatform />
                </UserOnlyProtectedRoute>
              } />
              <Route path="/comprehensive-status" element={
                <UserOnlyProtectedRoute>
                  <ComprehensiveStatus />
                </UserOnlyProtectedRoute>
              } />
              <Route path="/system-status" element={
                <UserOnlyProtectedRoute>
                  <SystemStatus />
                </UserOnlyProtectedRoute>
              } />
              <Route path="/security" element={
                <UserOnlyProtectedRoute>
                  <UltimateSecurity />
                </UserOnlyProtectedRoute>
              } />
              <Route path="/immortal-security" element={
                <UserOnlyProtectedRoute>
                  <ImmortalSecurity />
                </UserOnlyProtectedRoute>
              } />
              <Route path="/ultimate-security" element={
                <UserOnlyProtectedRoute>
                  <UltimateSecurity />
                </UserOnlyProtectedRoute>
              } />
              
              {/* Admin routes require special admin authentication */}
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
