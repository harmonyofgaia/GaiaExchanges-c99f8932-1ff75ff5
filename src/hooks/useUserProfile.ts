import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/components/auth/AuthProvider'

interface UserProfile {
  id: string
  email: string
  full_name: string
  role: string
  created_at: string
  updated_at: string
  avatar_url: string | null
  last_login: string | null
}

export function useUserProfile() {
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { user } = useAuth()

  useEffect(() => {
    if (!user) {
      setIsLoading(false)
      return
    }

    const fetchProfile = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const { data, error } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('id', user.id)
          .single()

        if (error) {
          console.error('Error fetching user profile:', error)
          setError(error.message)
          return
        }

        // Ensure the profile matches the UserProfile interface
        const userProfile: UserProfile = {
          id: data.id,
          email: data.email,
          full_name: data.full_name,
          role: data.role,
          created_at: data.created_at,
          updated_at: data.updated_at,
          avatar_url: data.avatar_url || null,
          last_login: data.last_login || null
        }

        setProfile(userProfile)
      } catch (err) {
        console.error('Unexpected error:', err)
        setError('An unexpected error occurred')
      } finally {
        setIsLoading(false)
      }
    }

    fetchProfile()
  }, [user])

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user || !profile) return

    try {
      setError(null)

      const { error } = await supabase
        .from('user_profiles')
        .update(updates)
        .eq('id', user.id)

      if (error) {
        setError(error.message)
        return false
      }

      setProfile(prev => prev ? { ...prev, ...updates } : null)
      return true
    } catch (err) {
      console.error('Error updating profile:', err)
      setError('Failed to update profile')
      return false
    }
  }

  return {
    profile,
    isLoading,
    error,
    updateProfile,
    refetch: () => {
      if (user) {
        const fetchProfile = async () => {
          try {
            setIsLoading(true)
            setError(null)
    
            const { data, error } = await supabase
              .from('user_profiles')
              .select('*')
              .eq('id', user.id)
              .single()
    
            if (error) {
              console.error('Error refetching user profile:', error)
              setError(error.message)
              return
            }
    
            // Ensure the profile matches the UserProfile interface
            const userProfile: UserProfile = {
              id: data.id,
              email: data.email,
              full_name: data.full_name,
              role: data.role,
              created_at: data.created_at,
              updated_at: data.updated_at,
              avatar_url: data.avatar_url || null,
              last_login: data.last_login || null
            }
    
            setProfile(userProfile)
          } catch (err) {
            console.error('Unexpected error during refetch:', err)
            setError('An unexpected error occurred during refetch')
          } finally {
            setIsLoading(false)
          }
        }
        fetchProfile()
      }
    }
  }
}
