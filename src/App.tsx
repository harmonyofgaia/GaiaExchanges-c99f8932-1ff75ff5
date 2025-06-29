
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Contact from '@/pages/Contact'
import Pricing from '@/pages/Pricing'
import { AuthPage } from '@/components/auth/AuthPage'
import Admin from '@/pages/Admin'
import SecureAdmin from '@/pages/SecureAdmin'
import UltimateSecurity from '@/pages/UltimateSecurity'
import SecureVault from '@/pages/SecureVault'
import { SystemMonitor } from '@/components/SystemMonitor'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          {/* Background Security Systems - Always Running */}
          <SystemMonitor />
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/auth" element={<AuthPage />} />
            
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
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
