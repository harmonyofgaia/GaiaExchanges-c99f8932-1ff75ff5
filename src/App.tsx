
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { HoverSidebar } from '@/components/HoverSidebar'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Pricing from '@/pages/Pricing'
import VirtualWorld from '@/pages/VirtualWorld'
import CoinCrafter from '@/pages/CoinCrafter'
import GaiaCoinCrafterPage from '@/pages/GaiaCoinCrafter'
import { AuthPage } from '@/components/auth/AuthPage'
import Admin from '@/pages/Admin'
import SecureAdmin from '@/pages/SecureAdmin'
import UltimateSecurity from '@/pages/UltimateSecurity'
import SecureVault from '@/pages/SecureVault'
import ComprehensiveStatus from '@/pages/ComprehensiveStatus'
import ImmortalSecurity from '@/pages/ImmortalSecurity'
import { SystemMonitor } from '@/components/SystemMonitor'
import { SystemVerification } from '@/components/SystemVerification'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      refetchOnWindowFocus: false,
    },
  },
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            {/* Hover Sidebar - Always Present */}
            <HoverSidebar />
            
            {/* Background Security Systems - Always Running */}
            <SystemMonitor />
            
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/pricing" element={<Pricing />} />
              <Route path="/auth" element={<AuthPage />} />
              <Route path="/virtual-world" element={<VirtualWorld />} />
              <Route path="/coin-crafter" element={<GaiaCoinCrafterPage />} />
              <Route path="/comprehensive-status" element={<ComprehensiveStatus />} />
              <Route path="/immortal-security" element={<ImmortalSecurity />} />
              
              <Route path="/admin" element={
                <ProtectedRoute isAdminRoute={true}>
                  <Admin />
                </ProtectedRoute>
              } />
              
              <Route path="/secureadmin" element={
                <ProtectedRoute isAdminRoute={true}>
                  <SecureAdmin />
                </ProtectedRoute>
              } />
              
              <Route path="/ultimatesecurity" element={
                <ProtectedRoute isAdminRoute={true}>
                  <UltimateSecurity />
                </ProtectedRoute>
              } />
              
              <Route path="/securevault" element={
                <ProtectedRoute isAdminRoute={true}>
                  <SecureVault />
                </ProtectedRoute>
              } />

              <Route path="/system-verification" element={
                <ProtectedRoute isAdminRoute={true}>
                  <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-cyan-900 p-6">
                    <div className="container mx-auto">
                      <SystemVerification />
                    </div>
                  </div>
                </ProtectedRoute>
              } />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
