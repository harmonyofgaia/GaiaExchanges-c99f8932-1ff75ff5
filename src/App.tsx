
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from 'sonner'
import './App.css'

import { Navbar } from '@/components/Navbar'
import { AppSidebar } from '@/components/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { BackgroundMediaEngine } from '@/components/media/BackgroundMediaEngine'

// Pages
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
                      <Route path="/" element={<Index />} />
                      <Route path="/exchange" element={<Exchange />} />
                      <Route path="/gaming" element={<Gaming />} />
                      <Route path="/nfts" element={<NFTs />} />
                      <Route path="/analytics" element={<Analytics />} />
                      <Route path="/swap" element={<Swap />} />
                      <Route path="/security" element={<Security />} />
                      <Route path="/admin" element={<AdminLogin />} />
                      <Route path="/secure-admin" element={<SecureAdmin />} />
                      <Route path="/gaias-projects" element={<GaiasProjects />} />
                      <Route path="/transparent-wallet" element={<TransparentWallet />} />
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
