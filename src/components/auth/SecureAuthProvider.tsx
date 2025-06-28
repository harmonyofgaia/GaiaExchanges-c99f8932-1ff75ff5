
import React, { createContext, useContext, useEffect, useState } from 'react'
import { User, Session } from '@supabase/supabase-js'
import { supabase } from '@/integrations/supabase/client'
import { AdminSecurityShield } from '@/components/security/AdminSecurityShield'
import { EmailVerificationSystem } from './EmailVerificationSystem'

interface SecureAuthContextType {
  user: User | null
  session: Session | null
  isEmailVerified: boolean
  userType: 'admin' | 'customer' | null
  signInWithEmailVerification: (email: string, password: string) => Promise<{ error: any }>
  signOut: () => Promise<{ error: any }>
  loading: boolean
}

const SecureAuthContext = createContext<SecureAuthContextType>({
  user: null,
  session: null,
  isEmailVerified: false,
  userType: null,
  signInWithEmailVerification: async () => ({ error: null }),
  signOut: async () => ({ error: null }),
  loading: true
})

export const useSecureAuth = () => {
  const context = useContext(SecureAuthContext)
  if (!context) {
    throw new Error('useSecureAuth must be used within a SecureAuthProvider')
  }
  return context
}

export function SecureAuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [userType, setUserType] = useState<'admin' | 'customer' | null>(null)
  const [pendingAuth, setPendingAuth] = useState<{email: string, password: string} | null>(null)

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Secure auth state changed:', event, session?.user?.email)
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)

        if (session?.user) {
          // Determine user type
          const email = session.user.email
          if (email === 'info@cultureofharmony.net') {
            setUserType('admin')
          } else {
            setUserType('customer')
          }

          // Log security event
          try {
            await supabase.from('security_events').insert({
              user_id: session.user.id,
              event_type: 'SECURE_LOGIN',
              event_description: `Secure login with email verification - ${userType}`,
              severity: 'low'
            })
          } catch (error) {
            console.error('Error logging security event:', error)
          }
        }
      }
    )

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [userType])

  const signInWithEmailVerification = async (email: string, password: string) => {
    setPendingAuth({ email, password })
    
    // Skip captcha by implementing email verification
    return { error: null }
  }

  const handleEmailVerificationSuccess = async (code: string) => {
    if (!pendingAuth) return

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: pendingAuth.email,
        password: pendingAuth.password
      })

      if (!error) {
        setIsEmailVerified(true)
        setPendingAuth(null)
      }

      return { error }
    } catch (error) {
      return { error }
    }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (!error) {
      setIsEmailVerified(false)
      setUserType(null)
    }
    return { error }
  }

  const value = {
    user,
    session,
    isEmailVerified,
    userType,
    signInWithEmailVerification,
    signOut,
    loading
  }

  // Show email verification if pending auth
  if (pendingAuth && !isEmailVerified) {
    return (
      <SecureAuthContext.Provider value={value}>
        <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900/10 flex items-center justify-center p-4">
          <EmailVerificationSystem
            email={pendingAuth.email}
            onVerificationSuccess={handleEmailVerificationSuccess}
            userType={pendingAuth.email === 'info@cultureofharmony.net' ? 'admin' : 'customer'}
          />
        </div>
      </SecureAuthContext.Provider>
    )
  }

  return (
    <SecureAuthContext.Provider value={value}>
      {user && userType === 'admin' && <AdminSecurityShield />}
      {children}
    </SecureAuthContext.Provider>
  )
}
