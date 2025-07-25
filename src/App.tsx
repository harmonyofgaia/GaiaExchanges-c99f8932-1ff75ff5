import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import { AuthProvider } from '@/components/auth/AuthProvider'
import Index from '@/pages/Index'
import UserAuth from '@/pages/UserAuth'
import { SecureAdminLogin } from '@/components/admin/SecureAdminLogin'
import SecureAdmin from '@/pages/SecureAdmin'
import SecureVault from '@/pages/SecureVault'
import AdminLogin from '@/legacy-pages/AdminLogin'
import LegacySecureAdmin from '@/legacy-pages/SecureAdmin'
import LegacySecureVault from '@/legacy-pages/SecureVault'
import { AdminProtectedRoute } from '@/components/auth/AdminProtectedRoute'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Toaster />
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Index />} />
          
          {/* User Authentication - Only when users want to register/login */}
          <Route path="/user-auth" element={<UserAuth />} />
          <Route path="/auth" element={<UserAuth />} />

          {/* Admin Routes - No user auth required, use admin-specific authentication */}
          <Route path="/admin-login" element={
            <AdminProtectedRoute>
              <SecureAdminLogin />
            </AdminProtectedRoute>
          } />
          <Route path="/secure-admin" element={
            <AdminProtectedRoute>
              <SecureAdmin />
            </AdminProtectedRoute>
          } />
          <Route path="/secure-vault" element={
            <AdminProtectedRoute>
              <SecureVault />
            </AdminProtectedRoute>
          } />
          <Route path="/admin" element={
            <AdminProtectedRoute>
              <AdminLogin />
            </AdminProtectedRoute>
          } />

          {/* Legacy Admin Routes */}
          <Route path="/legacy-admin" element={
            <AdminProtectedRoute>
              <LegacySecureAdmin />
            </AdminProtectedRoute>
          } />
          <Route path="/legacy-vault" element={
            <AdminProtectedRoute>
              <LegacySecureVault />
            </AdminProtectedRoute>
          } />
        </Routes>
      </AuthProvider>
    </Router>
  )
}

export default App
