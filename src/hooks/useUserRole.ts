
import { useState, useEffect } from 'react'
import { supabase } from '@/integrations/supabase/client'
import { useAuth } from '@/components/auth/AuthProvider'

export type UserRole = 'user' | 'admin' | 'moderator'

export function useUserRole() {
  const { user } = useAuth()
  const [roles, setRoles] = useState<UserRole[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!user) {
      setRoles([])
      setLoading(false)
      return
    }

    const fetchUserRoles = async () => {
      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)

        if (error) {
          console.error('Error fetching user roles:', error)
        } else {
          setRoles(data?.map(r => r.role as UserRole) || [])
        }
      } catch (error) {
        console.error('Error fetching user roles:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchUserRoles()
  }, [user])

  const hasRole = (role: UserRole) => roles.includes(role)
  const isAdmin = () => hasRole('admin')
  const isModerator = () => hasRole('moderator')

  return {
    roles,
    loading,
    hasRole,
    isAdmin,
    isModerator
  }
}
