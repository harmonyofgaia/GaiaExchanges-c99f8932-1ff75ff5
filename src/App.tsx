
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AuthProvider } from '@/components/auth/AuthProvider'
import Index from '@/pages/Index'
import Admin from '@/pages/Admin'
import AdminLogin from '@/pages/AdminLogin'
import SecureAdmin from '@/pages/SecureAdmin'
import SecureVault from '@/pages/SecureVault'
import Security from '@/pages/Security'
import QuantumSecurity from '@/pages/QuantumSecurity'
import './App.css'

const queryClient = new QueryClient()

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin-login" element={<AdminLogin />} />
            <Route path="/secure-admin" element={<SecureAdmin />} />
            <Route path="/secure-vault" element={<SecureVault />} />
            <Route path="/security" element={<Security />} />
            <Route path="/quantum-security" element={<QuantumSecurity />} />
          </Routes>
          <Toaster />
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  )
}

export default App
