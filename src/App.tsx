import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ThemeProvider } from "@/components/ui/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import { QueryClient } from '@tanstack/react-query'
import { Index } from '@/pages/Index'
import { About } from '@/pages/About'
import { Services } from '@/pages/Services'
import { Contact } from '@/pages/Contact'
import Gaming from '@/pages/Gaming'
import { Game } from '@/pages/Game'
import { Trading } from '@/pages/Trading'
import { LandscapeBuilder } from '@/pages/LandscapeBuilder'
import { Admin } from '@/pages/Admin'
import { ArtGeneration } from '@/pages/ArtGeneration'
import { NFTCollection } from '@/pages/NFTCollection'
import { Auth } from '@/pages/Auth'
import { Navbar } from '@/components/Navbar'
import { useGlobalBackgroundServices } from '@/hooks/useGlobalBackgroundServices'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { MasterSystemOrchestrator } from '@/components/system/MasterSystemOrchestrator'
import { PersistentAdminSession } from '@/components/admin/PersistentAdminSession'
import { StorageIntegrationProvider } from '@/components/storage/StorageIntegrationProvider'

function App() {
  const backgroundService = useGlobalBackgroundServices()

  return (
    <QueryClient>
      <BrowserRouter>
        <StorageIntegrationProvider>
          <AuthProvider>
            <MasterSystemOrchestrator />
            <PersistentAdminSession />
            <ThemeProvider defaultTheme="dark" storageKey="harmony-theme">
              <div className="min-h-screen bg-background">
                <Navbar />
                <main className="pt-16">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/services" element={<Services />} />
                    <Route path="/contact" element={<Contact />} />
                    <Route path="/gaming" element={<Gaming />} />
                    <Route path="/game" element={<Game />} />
                    <Route path="/trading" element={<Trading />} />
                    <Route path="/landscape-builder" element={<LandscapeBuilder />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/art" element={<ArtGeneration />} />
                    <Route path="/nft-collection" element={<NFTCollection />} />
                    <Route path="/auth" element={<Auth />} />
                  </Routes>
                </main>
                <Toaster />
              </div>
            </ThemeProvider>
          </AuthProvider>
        </StorageIntegrationProvider>
      </BrowserRouter>
    </QueryClient>
  )
}

export default App
