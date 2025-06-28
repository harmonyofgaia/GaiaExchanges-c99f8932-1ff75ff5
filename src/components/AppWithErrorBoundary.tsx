
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/components/auth/AuthProvider'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { Toaster } from '@/components/ui/toaster'
import { SidebarProvider } from '@/components/ui/sidebar'
import { AppSidebar } from '@/components/AppSidebar'
import { GlobalErrorBoundary } from '@/components/GlobalErrorBoundary'

// Import pages
import Index from '@/pages/Index'
import Admin from '@/pages/Admin'
import About from '@/pages/About'
import Wallet from '@/pages/Wallet'
import Markets from '@/pages/Markets'
import SmartContracts from '@/pages/SmartContracts'
import UltimateSecurity from '@/pages/UltimateSecurity'
import SystemStatus from '@/pages/SystemStatus'
import ComprehensiveStatus from '@/pages/ComprehensiveStatus'
import Downloads from '@/pages/Downloads'
import Marketing from '@/pages/Marketing'
import Reinvestments from '@/pages/Reinvestments'
import Transparency from '@/pages/Transparency'
import NotFound from '@/pages/NotFound'

const queryClient = new QueryClient()

export function AppWithErrorBoundary() {
  return (
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <SidebarProvider>
              <div className="flex min-h-screen">
                <Routes>
                  {/* Admin route - no sidebar, special handling */}
                  <Route path="/admin" element={<Admin />} />
                  
                  {/* All other routes with sidebar */}
                  <Route path="/*" element={
                    <>
                      <AppSidebar />
                      <div className="flex-1 p-6">
                        <Routes>
                          <Route path="/" element={
                            <ProtectedRoute>
                              <Index />
                            </ProtectedRoute>
                          } />
                          <Route path="/about" element={
                            <ProtectedRoute>
                              <About />
                            </ProtectedRoute>
                          } />
                          <Route path="/wallet" element={
                            <ProtectedRoute>
                              <Wallet />
                            </ProtectedRoute>
                          } />
                          <Route path="/markets" element={
                            <ProtectedRoute>
                              <Markets />
                            </ProtectedRoute>
                          } />
                          <Route path="/smart-contracts" element={
                            <ProtectedRoute>
                              <SmartContracts />
                            </ProtectedRoute>
                          } />
                          <Route path="/ultimate-security" element={
                            <ProtectedRoute>
                              <UltimateSecurity />
                            </ProtectedRoute>
                          } />
                          <Route path="/system-status" element={
                            <ProtectedRoute>
                              <SystemStatus />
                            </ProtectedRoute>
                          } />
                          <Route path="/comprehensive-status" element={
                            <ProtectedRoute>
                              <ComprehensiveStatus />
                            </ProtectedRoute>
                          } />
                          <Route path="/downloads" element={
                            <ProtectedRoute>
                              <Downloads />
                            </ProtectedRoute>
                          } />
                          <Route path="/marketing" element={
                            <ProtectedRoute>
                              <Marketing />
                            </ProtectedRoute>
                          } />
                          <Route path="/reinvestments" element={
                            <ProtectedRoute>
                              <Reinvestments />
                            </ProtectedRoute>
                          } />
                          <Route path="/transparency" element={
                            <ProtectedRoute>
                              <Transparency />
                            </ProtectedRoute>
                          } />
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                      </div>
                    </>
                  } />
                </Routes>
              </div>
            </SidebarProvider>
            <Toaster />
          </Router>
        </AuthProvider>
      </QueryClientProvider>
    </GlobalErrorBoundary>
  )
}
