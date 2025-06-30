
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import Index from '@/pages/Index'
import Gaming from '@/pages/Gaming'
import Admin from '@/pages/Admin'
import UltimateSecurity from '@/pages/UltimateSecurity'
import GaiaCoinCrafter from '@/pages/GaiaCoinCrafter'
import LandscapeBuilder from '@/pages/LandscapeBuilder'
import GaiaFighterGame from '@/pages/GaiaFighterGame'
import Game from '@/pages/Game'
import { PersistentAdminSession } from '@/components/admin/PersistentAdminSession'
import { AdminRouteProtector } from '@/components/admin/AdminRouteProtector'
import { PageStabilityMonitor } from '@/components/admin/PageStabilityMonitor'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <PersistentAdminSession />
        <AdminRouteProtector />
        <PageStabilityMonitor />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/gaming" element={<Gaming />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/ultimate-security" element={<UltimateSecurity />} />
          <Route path="/coin-crafter" element={<GaiaCoinCrafter />} />
          <Route path="/gaia-coin-crafter" element={<GaiaCoinCrafter />} />
          <Route path="/landscape-builder" element={<LandscapeBuilder />} />
          <Route path="/gaia-fighter-game" element={<GaiaFighterGame />} />
          <Route path="/gaia-fighter" element={<GaiaFighterGame />} />
          <Route path="/game" element={<Game />} />
        </Routes>
        <Toaster />
      </Router>
    </QueryClientProvider>
  )
}

export default App
