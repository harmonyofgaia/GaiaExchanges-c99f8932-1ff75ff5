
import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { Toaster } from '@/components/ui/toaster'
import { GlobalErrorBoundary } from '@/components/GlobalErrorBoundary'
import { AutoIssueResolver } from '@/components/AutoIssueResolver'
import { AnimatedBackground } from '@/components/ui/animated-background'

// Import all your pages
import Index from '@/pages/Index'
import Markets from '@/pages/Markets'
import Wallet from '@/pages/Wallet'
import Admin from '@/pages/Admin'
import Transparency from '@/pages/Transparency'
import About from '@/pages/About'
import Downloads from '@/pages/Downloads'
import Marketing from '@/pages/Marketing'
import NotFound from '@/pages/NotFound'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      refetchInterval: 5000, // 5 seconds - as requested
    },
  },
})

export function AppWithErrorBoundary() {
  return (
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <Router>
          <SidebarProvider>
            <div className="min-h-screen bg-background text-foreground">
              <AnimatedBackground />
              
              {/* Global Auto Issue Resolver - Hidden but Active */}
              <div className="sr-only">
                <AutoIssueResolver />
              </div>
              
              <div className="flex">
                <AppSidebar />
                <main className="flex-1 p-6">
                  <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/markets" element={<Markets />} />
                    <Route path="/wallet" element={<Wallet />} />
                    <Route path="/admin" element={<Admin />} />
                    <Route path="/transparency" element={<Transparency />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/downloads" element={<Downloads />} />
                    <Route path="/marketing" element={<Marketing />} />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </main>
              </div>
              
              <Toaster />
            </div>
          </SidebarProvider>
        </Router>
      </QueryClientProvider>
    </GlobalErrorBoundary>
  )
}
