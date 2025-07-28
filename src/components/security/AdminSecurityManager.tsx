
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Shield, UserCheck, UserX, AlertTriangle, CheckCircle } from 'lucide-react'
import { supabase } from '@/integrations/supabase/client'
import { toast } from 'sonner'

interface AdminUser {
  user_id: string
  email: string
  created_at: string
  is_active?: boolean
}

interface SecurityEvent {
  id: string
  event_type: string
  severity: string
  created_at: string
  event_details: any
  source_system?: string
}

export function AdminSecurityManager() {
  const [adminUsers, setAdminUsers] = useState<AdminUser[]>([])
  const [securityEvents, setSecurityEvents] = useState<SecurityEvent[]>([])
  const [newAdminEmail, setNewAdminEmail] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAdminUsers()
    loadSecurityEvents()
  }, [])

  const loadAdminUsers = async () => {
    try {
      const { data, error } = await supabase.rpc('list_active_admins')
      if (error) throw error
      // Add is_active property to match interface
      const adminUsersWithStatus = (data || []).map(user => ({
        ...user,
        is_active: true
      }))
      setAdminUsers(adminUsersWithStatus)
    } catch (error) {
      console.error('Error loading admin users:', error)
      toast.error('Failed to load admin users')
    }
  }

  const loadSecurityEvents = async () => {
    try {
      const { data, error } = await supabase
        .from('security_events')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20)
      
      if (error) throw error
      // Map database fields to match interface
      const mappedEvents = (data || []).map(event => ({
        ...event,
        source_system: event.source_system || 'system',
        severity: event.severity?.toString() || 'INFO'
      }))
      setSecurityEvents(mappedEvents)
    } catch (error) {
      console.error('Error loading security events:', error)
    }
  }

  const grantAdminAccess = async () => {
    if (!newAdminEmail) {
      toast.error('Please enter an email address')
      return
    }

    setLoading(true)
    try {
      // First get the user UUID by email
      const { data: userUuid, error: uuidError } = await supabase
        .rpc('get_user_uuid_by_email', { user_email: newAdminEmail })
      
      if (uuidError) throw uuidError

      // Grant admin access
      const { data, error } = await supabase
        .rpc('manage_admin_user', {
          p_user_id: userUuid,
          p_action: 'grant'
        })

      if (error) throw error

      // Log security event
      await supabase.rpc('log_comprehensive_security_event', {
        p_event_type: 'ADMIN_ACCESS_GRANTED',
        p_severity: 'HIGH',
        p_event_details: { target_email: newAdminEmail }
      })

      toast.success('Admin access granted successfully')
      setNewAdminEmail('')
      loadAdminUsers()
    } catch (error: any) {
      console.error('Error granting admin access:', error)
      toast.error(`Failed to grant admin access: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const revokeAdminAccess = async (userId: string, email: string) => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .rpc('manage_admin_user', {
          p_user_id: userId,
          p_action: 'revoke'
        })

      if (error) throw error

      // Log security event
      await supabase.rpc('log_comprehensive_security_event', {
        p_event_type: 'ADMIN_ACCESS_REVOKED',
        p_severity: 'HIGH',
        p_event_details: { target_email: email }
      })

      toast.success('Admin access revoked successfully')
      loadAdminUsers()
    } catch (error: any) {
      console.error('Error revoking admin access:', error)
      toast.error(`Failed to revoke admin access: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  const runSecurityDiagnostic = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase.rpc('security_diagnostic_report')
      if (error) throw error

      // Log diagnostic run
      await supabase.rpc('log_comprehensive_security_event', {
        p_event_type: 'SECURITY_DIAGNOSTIC_RUN',
        p_severity: 'INFO',
        p_event_details: { results_count: data?.length || 0 }
      })

      toast.success(`Security diagnostic completed. Found ${data?.length || 0} items to review.`)
      loadSecurityEvents()
    } catch (error: any) {
      console.error('Error running security diagnostic:', error)
      toast.error(`Failed to run security diagnostic: ${error.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-black/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <UserCheck className="h-5 w-5" />
              Grant Admin Access
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              type="email"
              placeholder="Enter user email..."
              value={newAdminEmail}
              onChange={(e) => setNewAdminEmail(e.target.value)}
              className="bg-black/30 border-green-500/30"
            />
            <Button
              onClick={grantAdminAccess}
              disabled={loading || !newAdminEmail}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <Shield className="h-4 w-4 mr-2" />
              Grant Admin Access
            </Button>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-black/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <AlertTriangle className="h-5 w-5" />
              Security Diagnostics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Run comprehensive security diagnostics to identify potential issues.
            </p>
            <Button
              onClick={runSecurityDiagnostic}
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Run Security Diagnostic
            </Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-black/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <UserCheck className="h-5 w-5" />
              Active Admin Users ({adminUsers.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {adminUsers.map((admin) => (
                <div
                  key={admin.user_id}
                  className="flex items-center justify-between p-3 bg-black/30 rounded-lg"
                >
                  <div className="flex flex-col">
                    <span className="text-sm font-medium text-white">{admin.email}</span>
                    <span className="text-xs text-muted-foreground">
                      Added: {new Date(admin.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => revokeAdminAccess(admin.user_id, admin.email)}
                    disabled={loading}
                  >
                    <UserX className="h-3 w-3 mr-1" />
                    Revoke
                  </Button>
                </div>
              ))}
              {adminUsers.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No admin users found
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <Card className="border-red-500/30 bg-gradient-to-br from-red-900/20 to-black/70">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <Shield className="h-5 w-5" />
              Recent Security Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {securityEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 bg-black/30 rounded-lg space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <Badge
                      variant={
                        event.severity === 'HIGH' ? 'destructive' :
                        event.severity === 'MEDIUM' ? 'default' : 'secondary'
                      }
                    >
                      {event.severity}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(event.created_at).toLocaleString()}
                    </span>
                  </div>
                  <p className="text-sm font-medium">{event.event_type}</p>
                  <p className="text-xs text-muted-foreground">
                    Source: {event.source_system}
                  </p>
                </div>
              ))}
              {securityEvents.length === 0 && (
                <p className="text-muted-foreground text-center py-4">
                  No security events found
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
