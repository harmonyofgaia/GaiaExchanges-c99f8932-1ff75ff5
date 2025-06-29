
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { QueryClient } from '@tanstack/react-query'
import { QueryClientProvider } from '@tanstack/react-query'
import { TooltipProvider } from '@/components/ui/tooltip'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as SonnerToaster } from '@/components/ui/sonner'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import Index from '@/pages/Index'
import SystemStatus from '@/pages/SystemStatus'
import ComprehensiveStatus from '@/pages/ComprehensiveStatus'
import UltimateSecurity from '@/pages/UltimateSecurity'
import LiveTracking from '@/pages/LiveTracking'
import GaiaCoinCrafterPage from '@/pages/GaiaCoinCrafter'
import Transparency from '@/pages/Transparency'
import Gaming from '@/pages/Gaming'
import GaiaFighterGame from '@/pages/GaiaFighterGame'
import LandscapeBuilder from '@/pages/LandscapeBuilder'
import Wallet from '@/pages/Wallet'
import VirtualWorld from '@/pages/VirtualWorld'

function App() {
  const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <SonnerToaster />
        <BrowserRouter>
          <SidebarProvider>
            <div className="min-h-screen flex w-full">
              <AppSidebar />
              <main className="flex-1">
                <SidebarTrigger />
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/wallet" element={<Wallet />} />
                  <Route path="/virtual-world" element={<VirtualWorld />} />
                  <Route path="/system-status" element={<SystemStatus />} />
                  <Route path="/comprehensive-status" element={<ComprehensiveStatus />} />
                  <Route path="/ultimate-security" element={<UltimateSecurity />} />
                  <Route path="/live-tracking" element={<LiveTracking />} />
                  <Route path="/coin-crafter" element={<GaiaCoinCrafterPage />} />
                  <Route path="/transparency" element={<Transparency />} />
                  <Route path="/gaming" element={<Gaming />} />
                  <Route path="/gaia-fighter-game" element={<GaiaFighterGame />} />
                  <Route path="/landscape-builder" element={<LandscapeBuilder />} />
                </Routes>
              </main>
            </div>
          </SidebarProvider>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
