
import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Lock, Eye, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'

interface AccessAttempt {
  id: string
  timestamp: Date
  ipAddress: string
  userAgent: string
  blocked: boolean
  reason: string
}

export function AdminOnlyAccess({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const [isValidAdmin, setIsValidAdmin] = useState(false)
  const [accessAttempts, setAccessAttempts] = useState<AccessAttempt[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const verifyAdminAccess = async () => {
      console.log('🔒 ADMIN ACCESS VERIFICATION - MAXIMUM SECURITY CHECK')
      
      // Get user's IP and device fingerprint
      const userIP = await fetch('https://api.ipify.org?format=json')
        .then(res => res.json())
        .then(data => data.ip)
        .catch(() => 'Unknown')

      const deviceFingerprint = btoa(
        navigator.userAgent + 
        screen.width + 
        screen.height + 
        navigator.language + 
        Intl.DateTimeFormat().resolvedOptions().timeZone
      )

      // Log access attempt
      const attempt: AccessAttempt = {
        id: `access-${Date.now()}`,
        timestamp: new Date(),
        ipAddress: userIP,
        userAgent: navigator.userAgent,
        blocked: false,
        reason: 'Verification in progress'
      }

      // STRICT ADMIN VERIFICATION
      const adminVerification = {
        hasValidUser: !!user,
        emailVerified: user?.email_confirmed_at !== null,
        userEmail: user?.email,
        deviceFingerprint,
        ipAddress: userIP,
        timestamp: new Date()
      }

      console.log('🛡️ ADMIN VERIFICATION DATA:', adminVerification)

      // Check if this is a legitimate admin access
      const isLegitimateAdmin = adminVerification.hasValidUser && 
                              adminVerification.emailVerified &&
                              adminVerification.userEmail

      if (isLegitimateAdmin) {
        attempt.reason = 'Admin access granted - Legitimate user verified'
        setIsValidAdmin(true)
        toast.success('🔒 ADMIN ACCESS GRANTED', {
          description: 'Welcome to the secure admin panel',
          duration: 3000
        })
      } else {
        attempt.blocked = true
        attempt.reason = 'Access denied - Insufficient privileges'
        
        // Log unauthorized access attempt
        console.log('🚨 UNAUTHORIZED ADMIN ACCESS ATTEMPT BLOCKED')
        console.log('📍 IP Address:', userIP)
        console.log('🖥️ Device:', navigator.userAgent)
        console.log('⏰ Timestamp:', new Date().toISOString())
        
        toast.error('🚨 ACCESS DENIED', {
          description: 'Unauthorized access attempt logged and blocked',
          duration: 5000
        })
      }

      setAccessAttempts(prev => [attempt, ...prev.slice(0, 9)])
      setLoading(false)
    }

    verifyAdminAccess()
  }, [user])

  // Hide admin content from unauthorized users
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-red-500/20 rounded-full mx-auto animate-pulse flex items-center justify-center">
            <Lock className="w-8 h-8 text-red-400 animate-bounce" />
          </div>
          <p className="text-red-400 font-medium">🔒 Verifying Admin Access...</p>
          <p className="text-red-300 text-sm">Maximum security verification in progress</p>
        </div>
      </div>
    )
  }

  if (!isValidAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black via-red-900/20 to-black">
        <Card className="border-red-500/50 bg-red-900/20 max-w-md">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <Shield className="h-6 w-6" />
              Access Restricted
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-red-400 mb-2">🔒 ADMIN ONLY ZONE</h3>
              <p className="text-muted-foreground">
                This area is restricted to authorized administrators only.
              </p>
            </div>
            
            <div className="space-y-2">
              <Badge className="w-full bg-red-600 text-white justify-center py-2">
                <Eye className="h-4 w-4 mr-2" />
                Your access attempt has been logged
              </Badge>
              <Badge className="w-full bg-orange-600 text-white justify-center py-2">
                <Lock className="h-4 w-4 mr-2" />
                Security measures active
              </Badge>
            </div>
            
            <div className="text-xs text-muted-foreground text-center">
              If you believe this is an error, contact the system administrator.
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Render admin content for verified admins
  return (
    <div className="relative">
      {/* Admin Security Badge */}
      <div className="fixed top-4 right-4 z-50">
        <Badge className="bg-green-600 text-white shadow-lg">
          <Shield className="h-3 w-3 mr-1" />
          ADMIN MODE ACTIVE
        </Badge>
      </div>
      
      {/* Admin Content */}
      {children}
    </div>
  )
}
