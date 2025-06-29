
import { useState } from 'react'
import { AdminLogin } from './AdminLogin'
import { AdminMFA } from './AdminMFA'
import { SecureConnectionManager } from './SecureConnectionManager'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, LogOut } from 'lucide-react'

export function SecureAdminLogin() {
  const [loginStep, setLoginStep] = useState<'credentials' | 'mfa' | 'complete'>('credentials')
  const { isAdmin, grantAdminAccess, revokeAdminAccess } = useSecureAdmin()

  const handleCredentialsSuccess = () => {
    setLoginStep('mfa')
  }

  const handleMFASuccess = () => {
    setLoginStep('complete')
    grantAdminAccess()
  }

  const handleLogout = () => {
    revokeAdminAccess()
    setLoginStep('credentials')
  }

  if (isAdmin && loginStep === 'complete') {
    return (
      <div className="space-y-6">
        {/* Admin Header */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-green-400" />
                <div>
                  <h2 className="text-2xl font-bold text-green-400">🛡️ GAIA ADMIN VAULT ACCESS</h2>
                  <p className="text-green-300">Ultra-Secure Connection & Security Manager</p>
                </div>
              </div>
              <Button onClick={handleLogout} variant="outline" className="border-red-500/30">
                <LogOut className="h-4 w-4 mr-2" />
                Secure Logout
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Secure Connection Manager */}
        <SecureConnectionManager />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-2">
            🌍 GAIA SECURE ADMIN ACCESS
          </h1>
          <p className="text-green-300">
            Ultra-Secure 4-Step Verification • Dragon Protection • Full IP Tracking
          </p>
        </div>

        {loginStep === 'credentials' && (
          <AdminLogin onLoginSuccess={handleCredentialsSuccess} />
        )}

        {loginStep === 'mfa' && (
          <AdminMFA onMFASuccess={handleMFASuccess} />
        )}
      </div>
    </div>
  )
}
