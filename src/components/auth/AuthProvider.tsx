
import React, { createContext, useContext, useEffect, useState } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { User, AuthError, Session } from '@supabase/supabase-js'
import { toast } from 'sonner'

interface AuthContextType {
  user: User | null
  session: Session | null
  loading: boolean
  signIn: (email: string, password: string) => Promise<{ error: AuthError | null }>
  signUp: (email: string, password: string, userData?: any) => Promise<{ error: AuthError | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<{ error: AuthError | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Set up auth state listener FIRST
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
        setLoading(false)

        if (event === 'SIGNED_IN') {
          toast.success('Welcome back!', {
            description: 'You have been signed in successfully.'
          })
        } else if (event === 'SIGNED_OUT') {
          toast.success('Signed out', {
            description: 'You have been signed out successfully.'
          })
        }
      }
    )

    // THEN check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
      setUser(session?.user ?? null)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (error) {
      toast.error('Sign in failed', {
        description: error.message
      })
    }

    return { error }
  }

  const signUp = async (email: string, password: string, userData?: any) => {
    const redirectUrl = `${window.location.origin}/`
    
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: userData
      }
    })

    if (error) {
      toast.error('Sign up failed', {
        description: error.message
      })
    } else {
      toast.success('Check your email', {
        description: 'Please check your email for a confirmation link.'
      })
    }

    return { error }
  }

  const signOut = async () => {
    const { error } = await supabase.auth.signOut()
    
    if (error) {
      toast.error('Sign out failed', {
        description: error.message
      })
    }
  }

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email)

    if (error) {
      toast.error('Password reset failed', {
        description: error.message
      })
    } else {
      toast.success('Check your email', {
        description: 'Please check your email for password reset instructions.'
      })
    }

    return { error }
  }

  const value = {
    user,
    session,
    loading,
    signIn,
    signUp,
    signOut,
    resetPassword
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
