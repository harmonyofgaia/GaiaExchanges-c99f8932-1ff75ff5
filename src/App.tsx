
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from "@/components/ui/toaster"
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Index from '@/pages/Index'
import Game from '@/pages/Game'
import Gaming from '@/pages/Gaming'
import { Navbar } from '@/components/Navbar'
import { useGlobalBackgroundServices } from '@/hooks/useGlobalBackgroundServices'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { MasterSystemOrchestrator } from '@/components/system/MasterSystemOrchestrator'
import { PersistentAdminSession } from '@/components/admin/PersistentAdminSession'
import { StorageIntegrationProvider } from '@/components/storage/StorageIntegrationProvider'

const queryClient = new QueryClient()

function App() {
  const backgroundService = useGlobalBackgroundServices()

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <StorageIntegrationProvider>
          <AuthProvider>
            <MasterSystemOrchestrator />
            <PersistentAdminSession />
            <div className="min-h-screen bg-background">
              <Navbar />
              <main className="pt-16">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/gaming" element={<Gaming />} />
                  <Route path="/game" element={<Game />} />
                </Routes>
              </main>
              <Toaster />
            </div>
          </AuthProvider>
        </StorageIntegrationProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
