
import { useState } from "react"
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/sonner"
import { Toaster as ToastProvider } from "@/components/ui/toaster"
import { AuthProvider } from "@/components/auth/AuthProvider"
import { ProtectedRoute } from "@/components/auth/ProtectedRoute"
import { GlobalErrorBoundary } from "./GlobalErrorBoundary"

// Import all pages
import Index from "@/pages/Index"
import About from "@/pages/About"
import Admin from "@/pages/Admin"
import ComprehensiveStatus from "@/pages/ComprehensiveStatus"
import Downloads from "@/pages/Downloads"
import Marketing from "@/pages/Marketing"
import Markets from "@/pages/Markets"
import NotFound from "@/pages/NotFound"
import Reinvestments from "@/pages/Reinvestments"
import SmartContracts from "@/pages/SmartContracts"
import SystemStatus from "@/pages/SystemStatus"
import Transparency from "@/pages/Transparency"
import UltimateSecurity from "@/pages/UltimateSecurity"
import Wallet from "@/pages/Wallet"

export function AppWithErrorBoundary() {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000,
        retry: 1,
      },
    },
  }))

  return (
    <GlobalErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Router>
            <ProtectedRoute>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/about" element={<About />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/status" element={<ComprehensiveStatus />} />
                <Route path="/downloads" element={<Downloads />} />
                <Route path="/marketing" element={<Marketing />} />
                <Route path="/markets" element={<Markets />} />
                <Route path="/reinvestments" element={<Reinvestments />} />
                <Route path="/smart-contracts" element={<SmartContracts />} />
                <Route path="/system-status" element={<SystemStatus />} />
                <Route path="/transparency" element={<Transparency />} />
                <Route path="/security" element={<UltimateSecurity />} />
                <Route path="/wallet" element={<Wallet />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<Navigate to="/404" replace />} />
              </Routes>
            </ProtectedRoute>
          </Router>
          <Toaster />
          <ToastProvider />
        </AuthProvider>
      </QueryClientProvider>
    </GlobalErrorBoundary>
  )
}
