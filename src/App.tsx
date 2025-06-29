
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/toaster'
import { Toaster as Sonner } from '@/components/ui/sonner'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { AuthProvider } from '@/components/auth/AuthProvider'
import Index from '@/pages/Index'
import SystemStatus from '@/pages/SystemStatus'
import ComprehensiveStatus from '@/pages/ComprehensiveStatus'
import UltimateSecurity from '@/pages/UltimateSecurity'
import LiveTracking from '@/pages/LiveTracking'
import GaiaCoinCrafter from '@/pages/GaiaCoinCrafter'
import Transparency from '@/pages/Transparency'
import Gaming from '@/pages/Gaming'
import LandscapeBuilder from '@/pages/LandscapeBuilder'
import './App.css'

function App() {
  console.log('✅ App component loaded - All routes should be available')

  return (
    <AuthProvider>
      <Router>
        <SidebarProvider>
          <div className="min-h-screen flex w-full bg-background">
            <AppSidebar />
            <div className="flex-1 flex flex-col">
              <header className="h-12 flex items-center border-b px-4">
                <SidebarTrigger />
                <h1 className="ml-4 text-lg font-semibold text-green-400">Gaia's Exchanges</h1>
              </header>
              <main className="flex-1 p-6">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/system-status" element={<SystemStatus />} />
                  <Route path="/comprehensive-status" element={<ComprehensiveStatus />} />
                  <Route path="/ultimate-security" element={<UltimateSecurity />} />
                  <Route path="/live-tracking" element={<LiveTracking />} />
                  <Route path="/coin-crafter" element={<GaiaCoinCrafter />} />
                  <Route path="/transparency" element={<Transparency />} />
                  <Route path="/gaming" element={<Gaming />} />
                  <Route path="/landscape-builder" element={<LandscapeBuilder />} />
                </Routes>
              </main>
            </div>
          </div>
          <Toaster />
          <Sonner />
        </SidebarProvider>
      </Router>
    </AuthProvider>
  )
}

export default App
