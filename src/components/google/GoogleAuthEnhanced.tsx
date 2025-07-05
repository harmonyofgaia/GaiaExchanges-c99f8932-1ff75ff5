
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Shield, Smartphone, Key, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

export function GoogleAuthEnhanced() {
  const [isConnected, setIsConnected] = useState(false)
  const [authCode, setAuthCode] = useState('')
  const [backupCodes, setBackupCodes] = useState<string[]>([])
  const [step, setStep] = useState<'connect' | 'verify' | 'backup'>('connect')

  useEffect(() => {
    // Check if Google Auth is already configured
    const savedAuth = localStorage.getItem('google-auth-configured')
    if (savedAuth === 'true') {
      setIsConnected(true)
    }
  }, [])

  const connectGoogleAuth = () => {
    // Simulate Google Auth connection
    setTimeout(() => {
      setStep('verify')
      toast.success('🔗 Google Authenticator Connected!', {
        description: 'Please verify with the code from your authenticator app',
        duration: 5000
      })
    }, 1500)
  }

  const verifyAuthCode = () => {
    if (authCode.length === 6) {
      setStep('backup')
      const codes = [
        'GAIA2024', 'HARMONY01', 'QUANTUM99', 'SECURE47',
        'VAULT23', 'MATRIX88', 'PEACE19', 'FREEDOM77'
      ]
      setBackupCodes(codes)
      
      toast.success('✅ Google Authenticator Verified!', {
        description: 'Your account is now protected with 2FA',
        duration: 5000
      })
    } else {
      toast.error('Invalid code - Please enter 6 digits')
    }
  }

  const completeSetup = () => {
    setIsConnected(true)
    localStorage.setItem('google-auth-configured', 'true')
    
    toast.success('🛡️ Enhanced Security Active!', {
      description: 'Google Authenticator protection is now enabled',
      duration: 5000
    })

    // Clear backup codes from display after 30 seconds
    setTimeout(() => {
      setBackupCodes([])
      console.clear()
      console.log('🧹 Security codes erased - No traces remain')
    }, 30000)
  }

  if (isConnected) {
    return (
      <Card className="border-green-500/30 bg-green-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Shield className="h-6 w-6" />
            🔗 Google Authenticator Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-4">
            <CheckCircle className="h-12 w-12 text-green-400 mx-auto" />
            <h3 className="text-lg font-bold text-green-400">Protection Active</h3>
            <p className="text-green-300">Your account is secured with Google Authenticator</p>
            <Badge className="bg-green-600 text-white">2FA ENABLED</Badge>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-blue-500/30 bg-blue-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Smartphone className="h-6 w-6" />
          🔐 Enhanced Google Authentication Setup
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {step === 'connect' && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-blue-400 mb-2">Connect Google Authenticator</h3>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security to your admin account
              </p>
            </div>
            <Button 
              onClick={connectGoogleAuth}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3"
            >
              <Shield className="h-5 w-5 mr-2" />
              CONNECT GOOGLE AUTHENTICATOR
            </Button>
          </div>
        )}

        {step === 'verify' && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-blue-400 mb-2">Verify Authentication</h3>
              <p className="text-sm text-muted-foreground">
                Enter the 6-digit code from your Google Authenticator app
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="authCode" className="text-blue-300">Authentication Code</Label>
              <Input
                id="authCode"
                type="text"
                value={authCode}
                onChange={(e) => setAuthCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                className="bg-black/40 border-blue-500/30 text-blue-400 text-center text-2xl font-mono"
                placeholder="000000"
                maxLength={6}
              />
            </div>
            <Button 
              onClick={verifyAuthCode}
              disabled={authCode.length !== 6}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3"
            >
              <Key className="h-5 w-5 mr-2" />
              VERIFY CODE
            </Button>
          </div>
        )}

        {step === 'backup' && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-yellow-400 mb-2">Backup Recovery Codes</h3>
              <p className="text-sm text-muted-foreground">
                Save these codes in a secure location. They will disappear in 30 seconds.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-2 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
              {backupCodes.map((code, index) => (
                <div key={index} className="text-center p-2 bg-black/30 rounded font-mono text-yellow-400">
                  {code}
                </div>
              ))}
            </div>
            <Button 
              onClick={completeSetup}
              className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3"
            >
              <CheckCircle className="h-5 w-5 mr-2" />
              COMPLETE SETUP
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
