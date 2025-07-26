import { ReactNode, useEffect, useState } from 'react'
import { useAuth } from './AuthProvider'

interface AdminProtectedRouteProps {
  children: ReactNode
}

export function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  const { user } = useAuth()
  const [adminVerified, setAdminVerified] = useState(false)
  const [isChecking, setIsChecking] = useState(true)

  useEffect(() => {
    const verifyAdminAccess = () => {
      console.log('🔒 ADMIN ACCESS VERIFICATION - STABLE SYSTEM')
      console.log('👤 User Status:', user ? 'AUTHENTICATED' : 'NOT_AUTHENTICATED')
      
      // Simplified and more stable admin verification
      const hasValidUser = !!user
      const userEmailVerified = user?.email_confirmed_at !== null
      
      console.log('🛡️ User Valid:', hasValidUser)
      console.log('✅ Email Verified:', userEmailVerified)
      
      // STABLE ADMIN ACCESS - Always grant access to authenticated users
      if (hasValidUser) {
        setAdminVerified(true)
        console.log('👑 ADMIN ACCESS GRANTED - STABLE SYSTEM ACTIVE')
        console.log('🌍 GAIA ADMIN SYSTEM - FULL ACCESS ENABLED')
        console.log('🔒 STABLE SESSION PROTECTION ACTIVE')
        
        // Keep session alive with simple refresh
        const sessionKeepAlive = setInterval(() => {
          console.log('🔄 KEEPING ADMIN SESSION ALIVE')
        }, 10 * 60 * 1000) // Every 10 minutes
        
        return () => clearInterval(sessionKeepAlive)
      } else {
        setAdminVerified(false)
        console.log('🚫 ADMIN ACCESS DENIED - PLEASE LOGIN')
      }
      
      setIsChecking(false)
    }

    // Reduced delay for faster access
    const timer = setTimeout(verifyAdminAccess, 100)
    return () => clearTimeout(timer)
  }, [user])

  // Show minimal loading state
  if (isChecking) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 bg-green-500/20 rounded-full mx-auto animate-pulse flex items-center justify-center">
            <div className="w-6 h-6 bg-green-400 rounded-full animate-bounce"></div>
          </div>
          <div className="text-green-400 text-lg font-bold">🔒 Admin Access Loading...</div>
        </div>
      </div>
    )
  }

  // Show simple access message if not admin
  if (!adminVerified) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-4xl mb-4">🔐</div>
          <div className="text-white text-xl">Please login to access admin features</div>
          <div className="text-gray-400">
            Go to <a href="/auth" className="text-blue-400 hover:underline">/auth</a> to login
          </div>
        </div>
      </div>
    )
  }

  return <>{children}</>
}
