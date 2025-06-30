
import { Toaster } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { AuthProvider } from "@/components/auth/AuthProvider"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { AdminOnlySecurityBarrier } from "@/components/admin/AdminOnlySecurityBarrier"
import Home from "./pages/Home"
import Admin from "./pages/Admin"
import SecureAdmin from "./pages/SecureAdmin"
import ImmortalSecurity from "./pages/ImmortalSecurity"
import UltimateSecurity from "./pages/UltimateSecurity"
import SystemStatus from "./pages/SystemStatus"

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <AdminOnlySecurityBarrier />
          <Toaster />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route 
                path="/admin" 
                element={
                  <ProtectedRoute isAdminRoute>
                    <Admin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/secure-admin" 
                element={
                  <ProtectedRoute isAdminRoute>
                    <SecureAdmin />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/immortal-security" 
                element={
                  <ProtectedRoute>
                    <ImmortalSecurity />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/ultimate-security" 
                element={
                  <ProtectedRoute>
                    <UltimateSecurity />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/system-status" 
                element={
                  <ProtectedRoute isAdminRoute>
                    <SystemStatus />
                  </ProtectedRoute>
                } 
              />
            </Routes>
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
  )
}

export default App
