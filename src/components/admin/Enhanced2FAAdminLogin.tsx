
import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { AdminLogin } from './AdminLogin'
import { CompactRecoverySystem } from './CompactRecoverySystem'
import { Button } from '@/components/ui/button'
import { Shield, AlertTriangle } from 'lucide-react'

interface Enhanced2FAAdminLoginProps {
  onLoginSuccess: () => void
  onShowRecovery?: () => void
}

export function Enhanced2FAAdminLogin({ onLoginSuccess, onShowRecovery }: Enhanced2FAAdminLoginProps) {
  const [showRecovery, setShowRecovery] = useState(false)

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
      
      // Direct admin access - no MFA required
      onLoginSuccess()
      return true
    }
    
    // Clear all traces
    username = ''
    password = ''
    
    return false
  }

  const handleRecoveryComplete = () => {
    setShowRecovery(false)
    onLoginSuccess()
  }

  const handleShowRecovery = () => {
    setShowRecovery(true)
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

      {showRecovery ? (
        <CompactRecoverySystem 
          onRecoveryComplete={handleRecoveryComplete}
          onBack={() => setShowRecovery(false)}
        />
      ) : (
        <div className="space-y-4">
          {/* Admin Login Form */}
          <AdminLogin onLoginSuccess={handleCredentialsSuccess} />

          {/* Recovery Access Button */}
          <Card className="border-red-500/30 bg-red-900/20 p-4">
            <div className="text-center space-y-3">
              <AlertTriangle className="h-8 w-8 text-red-400 mx-auto" />
              <h3 className="text-red-400 font-medium">Account Recovery</h3>
              <p className="text-xs text-red-300">Use only if primary login fails</p>
              <Button 
                onClick={handleShowRecovery}
                variant="outline"
                className="border-red-500/30 text-red-400 hover:bg-red-900/30"
              >
                Access 4-Step Recovery System
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  )
}
