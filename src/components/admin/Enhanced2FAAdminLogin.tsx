
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { AdminLogin } from './AdminLogin'
import { AdminMFA } from './AdminMFA'
import { GoogleAuthenticator } from '../auth/GoogleAuthenticator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Shield, Smartphone, QrCode, AlertTriangle } from 'lucide-react'

interface Enhanced2FAAdminLoginProps {
  onLoginSuccess: () => void
  onShowRecovery?: () => void
}

export function Enhanced2FAAdminLogin({ onLoginSuccess, onShowRecovery }: Enhanced2FAAdminLoginProps) {
  const [loginStep, setLoginStep] = useState<'credentials' | 'sms-mfa' | 'google-2fa' | 'success'>('credentials')
  const [selectedMFAMethod, setSelectedMFAMethod] = useState<'sms' | 'google'>('sms')

  const handleCredentialsSuccess = (username: string, password: string) => {
    // Original admin credentials restored
    const validCredentials = {
      user: 'Synatic',
      pass: 'Freedom!oul19922323'
    }
    
    if (username === validCredentials.user && 
        password === validCredentials.pass) {
      
      // Immediate secure cleanup
      username = ''
      password = ''
      validCredentials.user = ''
      validCredentials.pass = ''
      
      // After successful credential validation, show MFA options
      setLoginStep(selectedMFAMethod === 'sms' ? 'sms-mfa' : 'google-2fa')
      return true
    }
    
    // Clear all traces
    username = ''
    password = ''
    
    return false
  }

  const handleMFASuccess = () => {
    setLoginStep('success')
    onLoginSuccess()
  }

  const handleGoogleAuthSetup = () => {
    // Google Authenticator setup completed
    handleMFASuccess()
  }

  return (
    <div className="max-w-lg mx-auto space-y-6">
      {/* Header */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-blue-900/20 p-6">
        <div className="text-center space-y-2">
          <Shield className="h-12 w-12 text-green-400 mx-auto" />
          <h1 className="text-2xl font-bold text-green-400">GAIA Admin Security Center</h1>
          <p className="text-sm text-green-300">Original System Restored • Enhanced Wall of Defense</p>
        </div>
      </Card>

      {loginStep === 'credentials' && (
        <div className="space-y-4">
          {/* MFA Method Selection */}
          <Card className="border-blue-500/30 p-4">
            <h3 className="text-blue-400 font-medium mb-3">Choose 2FA Method:</h3>
            <Tabs value={selectedMFAMethod} onValueChange={(v) => setSelectedMFAMethod(v as 'sms' | 'google')}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="sms" className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4" />
                  SMS Verification
                </TabsTrigger>
                <TabsTrigger value="google" className="flex items-center gap-2">
                  <QrCode className="h-4 w-4" />
                  Google Authenticator
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </Card>

          {/* Admin Login Form */}
          <AdminLogin onLoginSuccess={handleCredentialsSuccess} />

          {/* Recovery Access Button */}
          {onShowRecovery && (
            <Card className="border-red-500/30 bg-red-900/20 p-4">
              <div className="text-center space-y-3">
                <AlertTriangle className="h-8 w-8 text-red-400 mx-auto" />
                <h3 className="text-red-400 font-medium">Account Recovery</h3>
                <p className="text-xs text-red-300">Use only if primary login fails</p>
                <Button 
                  onClick={onShowRecovery}
                  variant="outline"
                  className="border-red-500/30 text-red-400 hover:bg-red-900/30"
                >
                  Access 4-Step Recovery System
                </Button>
              </div>
            </Card>
          )}
        </div>
      )}

      {loginStep === 'sms-mfa' && (
        <AdminMFA onMFASuccess={handleMFASuccess} />
      )}

      {loginStep === 'google-2fa' && (
        <GoogleAuthenticator
          onSetupComplete={handleGoogleAuthSetup}
          onVerificationSuccess={handleMFASuccess}
          userEmail="michelzuidwijk@gmail.com"
        />
      )}

      {loginStep === 'success' && (
        <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20 p-6">
          <div className="text-center space-y-4">
            <div className="text-6xl">🎉</div>
            <h2 className="text-2xl font-bold text-green-400">Original System Restored!</h2>
            <p className="text-green-300">
              Welcome back to GAIA Admin Dashboard - Enhanced wall of defense active
            </p>
          </div>
        </Card>
      )}
    </div>
  )
}
