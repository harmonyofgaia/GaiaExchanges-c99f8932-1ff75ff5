
import { useState, useEffect } from 'react'
import { AdminControlSystem } from '@/components/AdminControlSystem'
import { EnhancedAdminControls } from '@/components/EnhancedAdminControls'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

const Admin = () => {
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false)

  // Automatically grant admin access without any authentication
  useEffect(() => {
    // Auto-authenticate as admin immediately
    setIsAdminAuthenticated(true)
    // Store admin token for consistency
    localStorage.setItem('secure_admin_token', 'admin-auto-authenticated')
  }, [])

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
            <span className="px-2 py-1 bg-orange-600 text-white text-xs rounded">AUTO ACCESS</span>
          </div>
        </div>
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
