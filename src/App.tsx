import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { Docs } from '@/pages/Docs'
import { Admin } from '@/pages/Admin'
import { AuthTest } from '@/pages/AuthTest'
import { SystemStatus } from '@/pages/SystemStatus'
import { UltimateSecurity } from '@/pages/UltimateSecurity'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import { Sonner } from '@/components/ui/sonner'
import { TooltipProvider } from '@/components/ui/tooltip'
import { EnhancedAdminControls } from '@/components/EnhancedAdminControls'
import { ConnectionTracker } from '@/components/security/ConnectionTracker'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/docs" element={<Docs />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/auth-test" element={<AuthTest />} />
            <Route path="/system-status" element={<SystemStatus />} />
            <Route path="/ultimate-security" element={<UltimateSecurity />} />
            <Route path="/enhanced-admin" element={<EnhancedAdminControls />} />
          </Routes>
        </BrowserRouter>
        <ConnectionTracker />
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
