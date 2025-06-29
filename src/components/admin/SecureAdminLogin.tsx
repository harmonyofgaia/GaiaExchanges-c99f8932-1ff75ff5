import { useState } from 'react'
import { AdminLogin } from './AdminLogin'
import { AdminMFA } from './AdminMFA'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, LogOut, RefreshCw } from 'lucide-react'
import { toast } from 'sonner'

export function SecureAdminLogin() {
  const [showRecovery, setShowRecovery] = useState(false)
  const [recoveryStep, setRecoveryStep] = useState<'credentials' | 'mfa' | 'complete'>('credentials')
  const { isAdmin, grantAdminAccess, revokeAdminAccess } = useSecureAdmin()

  const handleDirectLogin = (username: string, password: string, adminKey: string) => {
    // Direct admin login for regular access
    if (username === 'harmony_admin' && 
        password === 'GAiA_SecureAdmin2024!' &&
        adminKey === 'HARMONY_QUANTUM_VAULT_ACCESS') {
      
      grantAdminAccess()
      toast.success('🌍 Welcome to GAIA Admin Control Center!', {
        description: 'Full admin access granted - all systems operational',
        duration: 5000
      })
      return true
    }
    return false
  }

  const handleRecoveryLogin = () => {
    setRecoveryStep('credentials')
    setShowRecovery(true)
  }

  const handleRecoveryCredentialsSuccess = (username: string, password: string, adminKey: string) => {
    // Validate credentials for recovery mode
    if (username === 'harmony_admin' && 
        password === 'GAiA_SecureAdmin2024!' &&
        adminKey === 'HARMONY_QUANTUM_VAULT_ACCESS') {
      
      setRecoveryStep('mfa')
      return true
    }
    return false
  }

  const handleRecoveryMFASuccess = () => {
    setRecoveryStep('complete')
    grantAdminAccess()
    setShowRecovery(false)
    toast.success('🔐 Admin Recovery Complete!', {
      description: 'Access restored via 4-step verification',
      duration: 5000
    })
  }

  const handleLogout = () => {
    revokeAdminAccess()
    setShowRecovery(false)
    setRecoveryStep('credentials')
  }

  if (isAdmin && !showRecovery) {
    return (
      <div className="space-y-6">
        {/* Admin Header */}
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-green-400" />
                <div>
                  <h2 className="text-2xl font-bold text-green-400">🛡️ GAIA ADMIN CONTROL CENTER</h2>
                  <p className="text-green-300">Ultra-Secure Admin Vault • Full System Control • Global Management</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button onClick={handleRecoveryLogin} variant="outline" className="border-blue-500/30">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Recovery Access
                </Button>
                <Button onClick={handleLogout} variant="outline" className="border-red-500/30">
                  <LogOut className="h-4 w-4 mr-2" />
                  Secure Logout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* All Admin Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-purple-900/20 p-4">
            <h3 className="text-blue-400 font-bold mb-2">🌐 Live Blockchain Network</h3>
            <p className="text-sm text-muted-foreground mb-3">Real-time Architek Network monitoring</p>
            <Button 
              onClick={() => window.location.href = '/admin'}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              View Live Blockchain
            </Button>
          </Card>

          <Card className="border-green-500/20 bg-gradient-to-br from-green-900/20 to-emerald-900/20 p-4">
            <h3 className="text-green-400 font-bold mb-2">👥 User Management</h3>
            <p className="text-sm text-muted-foreground mb-3">Control all user accounts & permissions</p>
            <Button 
              onClick={() => window.location.href = '/admin'}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              Manage Users
            </Button>
          </Card>

          <Card className="border-purple-500/20 bg-gradient-to-br from-purple-900/20 to-pink-900/20 p-4">
            <h3 className="text-purple-400 font-bold mb-2">🚀 Marketing Engine</h3>
            <p className="text-sm text-muted-foreground mb-3">Global advertising & investor outreach</p>
            <Button 
              onClick={() => window.location.href = '/admin'}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              Launch Campaigns
            </Button>
          </Card>

          <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-900/20 to-blue-900/20 p-4">
            <h3 className="text-cyan-400 font-bold mb-2">🛡️ Security Center</h3>
            <p className="text-sm text-muted-foreground mb-3">Advanced threat monitoring & protection</p>
            <Button 
              onClick={() => window.location.href = '/admin'}
              className="w-full bg-cyan-600 hover:bg-cyan-700"
            >
              Security Dashboard
            </Button>
          </Card>

          <Card className="border-orange-500/20 bg-gradient-to-br from-orange-900/20 to-red-900/20 p-4">
            <h3 className="text-orange-400 font-bold mb-2">🎮 Gaming Controls</h3>
            <p className="text-sm text-muted-foreground mb-3">Game security & tournament management</p>
            <Button 
              onClick={() => window.location.href = '/admin'}
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              Gaming Center
            </Button>
          </Card>

          <Card className="border-yellow-500/20 bg-gradient-to-br from-yellow-900/20 to-orange-900/20 p-4">
            <h3 className="text-yellow-400 font-bold mb-2">⚡ Quantum Core</h3>
            <p className="text-sm text-muted-foreground mb-3">Advanced system monitoring & control</p>
            <Button 
              onClick={() => window.location.href = '/admin'}
              className="w-full bg-yellow-600 hover:bg-yellow-700"
            >
              Quantum Dashboard
            </Button>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-2">
            🌍 GAIA ADMIN ACCESS
          </h1>
          <p className="text-green-300">
            {showRecovery ? 'Admin Recovery System • 4-Step Verification' : 'Secure Admin Login'}
          </p>
        </div>

        {!showRecovery ? (
          <>
            <AdminLogin onLoginSuccess={handleDirectLogin} />
            <div className="mt-6 text-center">
              <Button 
                onClick={handleRecoveryLogin}
                variant="ghost" 
                className="text-xs text-muted-foreground hover:text-blue-400"
              >
                Need 4-Step Recovery Access?
              </Button>
            </div>
          </>
        ) : (
          <>
            {recoveryStep === 'credentials' && (
              <AdminLogin onLoginSuccess={handleRecoveryCredentialsSuccess} />
            )}

            {recoveryStep === 'mfa' && (
              <AdminMFA onMFASuccess={handleRecoveryMFASuccess} />
            )}

            <div className="mt-4 text-center">
              <Button 
                onClick={() => setShowRecovery(false)}
                variant="ghost" 
                className="text-xs text-muted-foreground"
              >
                Back to Simple Login
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
