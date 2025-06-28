
import { useState, useEffect } from 'react'
import { useAuth } from '@/components/auth/AuthProvider'

export type UserRole = 'user' | 'admin' | 'moderator'

export function useUserRole() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(false)
  }, [user])

  // Simple admin check based on email
  const isAdmin = () => user?.email === 'info@cultureofharmony.net'
  const isModerator = () => false
  const hasRole = (role: UserRole) => {
    if (role === 'admin') return isAdmin()
    if (role === 'moderator') return isModerator()
    return true // everyone is a user
  }

  return {
    roles: isAdmin() ? ['admin'] as UserRole[] : ['user'] as UserRole[],
    loading,
    hasRole,
    isAdmin,
    isModerator
  }
}
