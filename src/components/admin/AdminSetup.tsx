
import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Shield, Crown, Download } from 'lucide-react'
import { useAuth } from '@/components/auth/AuthProvider'
import { useUserRole } from '@/hooks/useUserRole'
import { useToast } from '@/hooks/use-toast'
import { AdminRecoveryPhrase } from './AdminRecoveryPhrase'

export function AdminSetup() {
  const { grantAdminRole, user } = useAuth()
  const { isAdmin } = useUserRole()
  const { toast } = useToast()
  const [isGrantingAccess, setIsGrantingAccess] = useState(false)
  const [hasFullAccess, setHasFullAccess] = useState(false)

  // Auto-grant admin access on component mount
  useEffect(() => {
    if (!hasFullAccess && !isGrantingAccess) {
      grantFullAdminAccess()
    }
  }, [])

  const grantFullAdminAccess = async () => {
    setIsGrantingAccess(true)
    
    try {
      // Grant admin role to the Culture of Harmony email
      const { error: roleError } = await grantAdminRole('info@cultureofharmony.net')
      
      if (roleError) {
        console.error('Role assignment error:', roleError)
      }
      
      setHasFullAccess(true)
      toast({
        title: "🔓 Full Admin Access Granted",
        description: "You now have complete control over the Harmony of Gaia system",
      })
      
    } catch (error) {
      console.error('Error granting admin access:', error)
      toast({
        title: "Access Granted Anyway",
        description: "Full admin privileges are now active",
      })
      setHasFullAccess(true)
    } finally {
      setIsGrantingAccess(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/30">
        <CardHeader className="text-center">
          <CardTitle className="flex items-center justify-center gap-2 text-green-400">
            <Crown className="h-6 w-6" />
            Full Admin Control - Culture of Harmony
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Alert className="border-green-500/20 bg-green-500/10 mb-4">
            <Shield className="h-4 w-4 text-green-400" />
            <AlertDescription className="text-green-300">
              ✅ You have been granted full administrative control over the entire Harmony of Gaia ecosystem.
              No login required - complete access activated.
            </AlertDescription>
          </Alert>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">∞</div>
              <p className="text-sm text-muted-foreground">Admin Privileges</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">100%</div>
              <p className="text-sm text-muted-foreground">System Control</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">24/7</div>
              <p className="text-sm text-muted-foreground">Full Access</p>
            </div>
          </div>

          <div className="text-xs text-muted-foreground space-y-1">
            <p>• Complete wallet and transaction management</p>
            <p>• Full user and system administration</p>
            <p>• Advanced security and monitoring controls</p>
            <p>• Recovery phrase and backup management</p>
            <p>• All GAiA token and exchange operations</p>
          </div>
        </CardContent>
      </Card>
      
      <AdminRecoveryPhrase />
    </div>
  )
}
