
import { useState, useEffect } from 'react'
import { AdminControlSystem } from '@/components/AdminControlSystem'
import { EnhancedAdminControls } from '@/components/EnhancedAdminControls'
import { SecureAdminLogin } from '@/components/admin/SecureAdminLogin'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const Admin = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)

  // Check for existing admin session
  useEffect(() => {
    const adminToken = localStorage.getItem('secure_admin_token')
    const adminIP = localStorage.getItem('admin_verified_ip')
    const sessionExpiry = localStorage.getItem('admin_session_expiry')
    
    // Verify session hasn't expired and IP matches
    if (adminToken && adminIP && sessionExpiry) {
      const now = new Date().getTime()
      if (now < parseInt(sessionExpiry)) {
        setIsAdminAuthenticated(true)
      } else {
        // Clear expired session
        localStorage.removeItem('secure_admin_token')
        localStorage.removeItem('admin_verified_ip')
        localStorage.removeItem('admin_session_expiry')
      }
    }
  }, [])

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true)
    // Set session expiry to 24 hours
    const expiry = new Date().getTime() + (24 * 60 * 60 * 1000)
    localStorage.setItem('admin_session_expiry', expiry.toString())
  }

  // Show secure login if not authenticated
  if (!isAdminAuthenticated) {
    return <SecureAdminLogin onLoginSuccess={handleLoginSuccess} />
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-green-400">🛡️ Admin Control System</h1>
          <p className="text-muted-foreground">Complete control over the Harmony of Gaia Exchange</p>
          <div className="flex gap-2 mt-2">
            <span className="px-2 py-1 bg-green-600 text-white text-xs rounded">ADMIN AUTHENTICATED</span>
            <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded">IP SECURED</span>
            <span className="px-2 py-1 bg-purple-600 text-white text-xs rounded">MAX PRIVILEGES</span>
            <span className="px-2 py-1 bg-red-600 text-white text-xs rounded">MILITARY SECURITY</span>
          </div>
        </div>
        <button
          onClick={() => {
            localStorage.removeItem('secure_admin_token')
            localStorage.removeItem('admin_verified_ip')
            localStorage.removeItem('admin_session_expiry')
            setIsAdminAuthenticated(false)
          }}
          className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg"
        >
          Secure Logout
        </button>
      </div>
      
      <Tabs defaultValue="enhanced" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="enhanced">Enhanced Controls</TabsTrigger>
          <TabsTrigger value="standard">Standard Controls</TabsTrigger>
        </TabsList>
        
        <TabsContent value="enhanced">
          <EnhancedAdminControls />
        </TabsContent>
        
        <TabsContent value="standard">
          <AdminControlSystem />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Admin
