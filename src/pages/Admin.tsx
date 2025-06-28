
import { useState, useEffect } from 'react'
import { AdminControlSystem } from '@/components/AdminControlSystem'
import { EnhancedAdminControls } from '@/components/EnhancedAdminControls'
import { SecureAdminLogin } from '@/components/admin/SecureAdminLogin'
import { AuthTest } from '@/components/auth/AuthTest'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

const AdminContent = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)

  // Enhanced session validation with security checks
  useEffect(() => {
    const adminToken = localStorage.getItem('secure_admin_token')
    const adminIP = localStorage.getItem('admin_verified_ip')
    const sessionExpiry = localStorage.getItem('admin_session_expiry')
    
    if (adminToken && adminIP && sessionExpiry) {
      const now = new Date().getTime()
      if (now < parseInt(sessionExpiry)) {
        setIsAdminAuthenticated(true)
        console.log('🔐 Valid admin session restored')
      } else {
        // Clean expired session
        localStorage.removeItem('secure_admin_token')
        localStorage.removeItem('admin_verified_ip')
        localStorage.removeItem('admin_session_expiry')
        console.log('🧹 Expired admin session cleaned')
      }
    }
  }, [])

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true)
    const expiry = new Date().getTime() + (24 * 60 * 60 * 1000)
    localStorage.setItem('admin_session_expiry', expiry.toString())
    console.log('👑 Admin access granted with maximum security')
  }

  const handleSecureLogout = () => {
    localStorage.removeItem('secure_admin_token')
    localStorage.removeItem('admin_verified_ip')
    localStorage.removeItem('admin_session_expiry')
    localStorage.removeItem('admin_recovery_enabled')
    setIsAdminAuthenticated(false)
    console.log('🔐 Secure admin logout completed - all traces removed')
  }

  // Show secure login if not authenticated
  if (!isAdminAuthenticated) {
    return <SecureAdminLogin onLoginSuccess={handleLoginSuccess} />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-400">👑 GODMODE Admin Control System</h1>
          <p className="text-muted-foreground">Ultimate control over Harmony of Gaia Exchange</p>
          <div className="flex gap-2 mt-2">
            <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">GODMODE ACTIVE</span>
            <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">QUAD-LAYER SECURED</span>
            <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded">MAXIMUM PRIVILEGES</span>
            <span className="px-2 py-1 bg-red-600 text-white text-xs rounded">THREAT DETECTION ON</span>
          </div>
        </div>
        <button
          onClick={handleSecureLogout}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
        >
          🔐 Secure Logout
        </button>
      </div>
      
      <Tabs defaultValue="enhanced" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="enhanced">Enhanced Controls</TabsTrigger>
          <TabsTrigger value="standard">Standard Controls</TabsTrigger>
          <TabsTrigger value="auth-test">Auth System Test</TabsTrigger>
        </TabsList>
        
        <TabsContent value="enhanced">
          <EnhancedAdminControls />
        </TabsContent>
        
        <TabsContent value="standard">
          <AdminControlSystem />
        </TabsContent>
        
        <TabsContent value="auth-test">
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-xl font-bold text-green-400 mb-2">🧪 Authentication System Test</h3>
              <p className="text-muted-foreground">Test user registration and login functionality</p>
            </div>
            <AuthTest />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

const Admin = () => {
  return (
    <ProtectedRoute isAdminRoute={true}>
      <AdminContent />
    </ProtectedRoute>
  )
}

export default Admin
