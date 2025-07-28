
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from 'sonner'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { BackgroundManager } from '@/components/ui/background-manager'
import { Navbar } from '@/components/Navbar'
import { VisualControlButton } from '@/components/visual/VisualControlButton'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from '@/pages/Home'
import Gaming from '@/pages/Gaming'
import Markets from '@/pages/Markets'
import Admin from '@/pages/Admin'
import Security from '@/pages/Security'
import { ProjectManagementProvider } from '@/components/project/ProjectManagementProvider'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <ProjectManagementProvider>
            <div className="min-h-screen bg-background text-foreground">
              <BackgroundManager />
              <Navbar />
              <main className="relative z-10">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/gaming" element={<Gaming />} />
                  <Route path="/markets" element={<Markets />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/security" element={<Security />} />
                </Routes>
              </main>
              <Toaster 
                position="bottom-right"
                toastOptions={{
                  style: {
                    background: 'hsl(var(--background))',
                    color: 'hsl(var(--foreground))',
                    border: '1px solid hsl(var(--border))',
                  },
                }}
              />
              <VisualControlButton />
            </div>
          </ProjectManagementProvider>
        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider>
  )
}

export default App
