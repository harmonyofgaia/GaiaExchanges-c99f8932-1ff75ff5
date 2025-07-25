
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/components/auth/AuthProvider'
import Index from '@/pages/Index'
import UserAuth from '@/pages/UserAuth'
import EnvironmentalGames from '@/pages/EnvironmentalGames'
import { SecureAdminLogin } from '@/components/admin/SecureAdminLogin'
import SecureAdmin from '@/pages/SecureAdmin'
import SecureVault from '@/pages/SecureVault'
import AdminLogin from '@/legacy-pages/AdminLogin'
import LegacySecureAdmin from '@/legacy-pages/SecureAdmin'
import LegacySecureVault from '@/legacy-pages/SecureVault'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          <Route path="/environmental-games" element={<EnvironmentalGames />} />
          
          {/* User Authentication - Only when users want to register/login */}
          <Route path="/user-auth" element={<UserAuth />} />
          <Route path="/auth" element={<UserAuth />} />

          {/* Admin Routes - Independent admin authentication */}
          <Route path="/admin-login" element={<SecureAdminLogin />} />
          <Route path="/secure-admin" element={<SecureAdmin />} />
          <Route path="/secure-vault" element={<SecureVault />} />
          <Route path="/admin" element={<AdminLogin />} />

          {/* Legacy Admin Routes */}
          <Route path="/legacy-admin" element={<LegacySecureAdmin />} />
          <Route path="/legacy-vault" element={<LegacySecureVault />} />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
