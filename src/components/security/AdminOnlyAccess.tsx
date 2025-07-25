
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Lock } from 'lucide-react'

export function AdminOnlyAccess({ children }: { children: React.ReactNode }) {
  const [isValidAdmin, setIsValidAdmin] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyAdminAccess = async () => {
      console.log('🔒 SIMPLIFIED ADMIN ACCESS - NO AUTH MODULE REQUIRED')
      
      // Check if admin is logged in via admin-specific authentication
      const adminLoggedIn = localStorage.getItem('admin-logged-in') === 'true'
      const adminSessionActive = sessionStorage.getItem('admin-session-active') === 'true'
      
      console.log('👑 Admin Status:', { adminLoggedIn, adminSessionActive })

      if (adminLoggedIn || adminSessionActive) {
        setIsValidAdmin(true)
        console.log('✅ ADMIN ACCESS GRANTED - No user auth required')
      } else {
        setIsValidAdmin(false)
        console.log('🚫 ADMIN ACCESS DENIED - Please login via admin portal')
      }

      setLoading(false)
    }

    verifyAdminAccess()
  }, [])

  // Minimal loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-green-500/20 rounded-full mx-auto animate-pulse flex items-center justify-center">
            <Lock className="w-6 h-6 text-green-400 animate-bounce" />
          </div>
          <p className="text-green-400 font-medium">🔒 Loading Admin Access...</p>
        </div>
      </div>
    )
  }

  if (!isValidAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-blue-900/20 to-black">
        <Card className="border-blue-500/50 bg-blue-900/20 max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Shield className="h-6 w-6" />
              GAIA Admin Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <Lock className="h-12 w-12 text-blue-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-blue-400 mb-2">🔐 Admin Login Required</h3>
              <p className="text-muted-foreground mb-4">
                Please use the admin portal to access the control center.
              </p>
              <a 
                href="/secure-admin" 
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Go to Admin Portal
              </a>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Render admin content with active badge for verified admins
  return (
    <div className="relative">
      {/* Admin Active Badge */}
      <div className="fixed top-4 right-4 z-50">
        <Badge className="bg-green-600 text-white shadow-lg animate-pulse">
          <Shield className="h-3 w-3 mr-1" />
          ADMIN ACTIVE
        </Badge>
      </div>
      
      {/* Admin Content */}
      {children}
    </div>
  )
}
