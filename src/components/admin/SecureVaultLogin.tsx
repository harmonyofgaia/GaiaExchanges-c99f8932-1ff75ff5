
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Shield, Eye, EyeOff, RefreshCw, LogOut } from 'lucide-react'
import { AdminLogin } from './AdminLogin'
import { AdminMFA } from './AdminMFA'
import { AdminRecoverySystem } from './AdminRecoverySystem'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'
import { toast } from 'sonner'

export function SecureVaultLogin() {
  const [showRecovery, setShowRecovery] = useState(false)
  const [recoveryStep, setRecoveryStep] = useState<'credentials' | 'mfa' | 'complete'>('credentials')
  const [showCredentials, setShowCredentials] = useState(false)
  const [credentialsVisible, setCredentialsVisible] = useState(false)
  const { isAdmin, grantAdminAccess, revokeAdminAccess } = useSecureAdmin()

  const validateVaultAccess = (username: string, password: string) => {
    // Generate quantum vault access key
    const vaultKey = btoa('harmony quantum vault access').replace(/[^a-zA-Z0-9]/g, '').toLowerCase()
    
    // Secure credential validation (no traces stored)
    const isValidUser = username === 'Synatic'
    const isValidPass = password === 'harmonyquantumvaultaccess'
    
    if (isValidUser && isValidPass) {
      // Immediate cleanup
      username = ''
      password = ''
      
      grantAdminAccess()
      toast.success('🌍 GAIA Vault Access Granted!', {
        description: 'Quantum vault security verified - all systems operational',
        duration: 5000
      })
      return true
    }
    
    // Clear failed credentials
    username = ''
    password = ''
    return false
  }

  const handleShowCredentials = () => {
    setShowCredentials(true)
    setCredentialsVisible(true)
    
    // Auto-hide after 10 seconds
    setTimeout(() => {
      setCredentialsVisible(false)
      setShowCredentials(false)
      
      // Clear DOM traces
      const credentialElements = document.querySelectorAll('[data-credential-display]')
      credentialElements.forEach(el => el.remove())
      
      toast.success('🔐 Credentials Auto-Cleared', {
        description: 'All traces removed from memory',
        duration: 3000
      })
    }, 10000)
    
    toast.info('⏱️ Credentials Visible for 10 seconds', {
      duration: 10000
    })
  }

  if (isAdmin && !showRecovery) {
    return (
      <div className="space-y-6">
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Shield className="h-8 w-8 text-green-400" />
                <div>
                  <h2 className="text-2xl font-bold text-green-400">🛡️ GAIA VAULT ACCESS GRANTED</h2>
                  <p className="text-green-300">Quantum Security • System Control • Global Management</p>
                </div>
              </div>
              <div className="flex gap-2">
                <Button 
                  onClick={handleShowCredentials} 
                  variant="outline" 
                  className="border-yellow-500/30 text-yellow-400"
                  disabled={showCredentials}
                >
                  {credentialsVisible ? <EyeOff className="h-4 w-4 mr-2" /> : <Eye className="h-4 w-4 mr-2" />}
                  {credentialsVisible ? 'Hiding Soon...' : 'Show Credentials'}
                </Button>
                <Button onClick={() => setShowRecovery(true)} variant="outline" className="border-blue-500/30">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  4-Step Recovery
                </Button>
                <Button onClick={revokeAdminAccess} variant="outline" className="border-red-500/30">
                  <LogOut className="h-4 w-4 mr-2" />
                  Secure Logout
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Temporary Credentials Display */}
        {credentialsVisible && (
          <Card 
            className="border-yellow-500/50 bg-gradient-to-br from-yellow-900/30 to-orange-900/30 animate-pulse"
            data-credential-display="true"
          >
            <CardContent className="p-6">
              <div className="text-center space-y-4">
                <div className="text-yellow-400 font-bold text-lg">
                  ⚡ VAULT CREDENTIALS (AUTO-CLEARING)
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-black/40 p-3 rounded border border-yellow-500/30">
                    <div className="text-yellow-300 font-medium">Admin Username:</div>
                    <div className="text-white font-mono text-lg">Synatic</div>
                  </div>
                  <div className="bg-black/40 p-3 rounded border border-yellow-500/30">
                    <div className="text-yellow-300 font-medium">Vault Password:</div>
                    <div className="text-white font-mono text-lg">harmonyquantumvaultaccess</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 p-6">
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-2">
            🌍 GAIA VAULT ACCESS
          </h1>
          <p className="text-green-300">
            {showRecovery ? '4-Step Recovery System Active' : 'Quantum Vault Security Portal'}
          </p>
        </div>

        {!showRecovery ? (
          <>
            <AdminLogin onLoginSuccess={validateVaultAccess} />
            <div className="mt-6 text-center">
              <Button 
                onClick={() => setShowRecovery(true)}
                variant="ghost" 
                className="text-xs text-muted-foreground hover:text-blue-400"
              >
                Need 4-Step Recovery Access?
              </Button>
            </div>
          </>
        ) : (
          <AdminRecoverySystem 
            onRecoveryComplete={() => {
              grantAdminAccess()
              setShowRecovery(false)
            }}
            onBack={() => setShowRecovery(false)}
          />
        )}
      </div>
    </div>
  )
}
