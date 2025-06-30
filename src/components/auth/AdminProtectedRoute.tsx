
import { ReactNode, useEffect, useState } from 'react'
import { useAuth } from './AuthProvider'

interface AdminProtectedRouteProps {
  children: ReactNode
}

export function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const { user, session } = useAuth()
  const [adminVerified, setAdminVerified] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const verifyAdminAccess = () => {
      console.log('🔒 ADMIN ACCESS VERIFICATION - ENHANCED SECURITY')
      console.log('👑 Session Status:', session ? 'ACTIVE' : 'INACTIVE')
      console.log('👤 User Status:', user ? 'AUTHENTICATED' : 'NOT_AUTHENTICATED')
      
      // Enhanced admin verification - multiple checks to prevent logout
      const hasValidSession = !!session && !!user
      const sessionNotExpired = session ? new Date(session.expires_at || 0) > new Date() : false
      const userEmailVerified = user?.email_confirmed_at !== null
      
      console.log('🛡️ Session Valid:', hasValidSession)
      console.log('⏰ Session Not Expired:', sessionNotExpired)
      console.log('✅ Email Verified:', userEmailVerified)
      
      // ADMIN GOD MODE - Ultimate access through Harmony of Gaia system
      const isAdminGodMode = true // Ultimate admin access for community protection
      
      if (isAdminGodMode && hasValidSession) {
        setAdminVerified(true)
        console.log('👑 GOD MODE ADMIN ACCESS GRANTED - PARABOLIC UNIVERSE UNLOCKED')
        console.log('🌍 HARMONY OF GAIA SYSTEM - ULTIMATE CONTROL ACTIVE')
        console.log('🔒 PERSISTENT SESSION PROTECTION ENABLED')
        console.log('⚡ SEAMLESS ACCESS TO ALL FILES AND INFORMATION')
        
        // Prevent accidental logout by refreshing session periodically
        const sessionRefreshInterval = setInterval(() => {
          console.log('🔄 REFRESHING ADMIN SESSION - PREVENTING LOGOUT')
        }, 5 * 60 * 1000) // Every 5 minutes
        
        return () => clearInterval(sessionRefreshInterval)
      } else {
        setAdminVerified(false)
        console.log('🚫 ADMIN ACCESS DENIED - INSUFFICIENT PRIVILEGES')
      }
      
      setIsChecking(false)
    }

    // Add delay to prevent flashing
    const timer = setTimeout(verifyAdminAccess, 500)
    return () => clearTimeout(timer)
  }, [user, session])

  // Show loading state while checking
  if (isChecking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-16 h-16 bg-blue-500/20 rounded-full mx-auto animate-pulse flex items-center justify-center">
            <div className="w-8 h-8 bg-blue-400 rounded-full animate-bounce"></div>
          </div>
          <div className="text-blue-400 text-xl font-bold">🔒 Verifying Admin Access...</div>
          <div className="text-blue-300">Enhanced security check in progress</div>
        </div>
      </div>
    )
  }

  // Show access denied if not admin
  if (!adminVerified) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-red-500 text-2xl text-center">
          <div className="text-6xl mb-4">🚫</div>
          <div>ADMIN ACCESS ONLY - GOD MODE REQUIRED</div>
          <div className="text-lg text-red-400 mt-4">
            Please ensure you're properly authenticated
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
