
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Shield, Lock, Eye, EyeOff } from 'lucide-react'
import { SecureVaultLogin } from '@/components/admin/SecureVaultLogin'
import { toast } from 'sonner'

const SecureVault = () => {
  const [vaultAccess, setVaultAccess] = useState(false)
  const [pin, setPin] = useState('')
  const [showPin, setShowPin] = useState(false)
  const [attempts, setAttempts] = useState(0)

  const correctPin = '9999' // Admin vault access code

  const handlePinSubmit = () => {
    if (pin === correctPin) {
      setVaultAccess(true)
      setPin('')
      console.log('🔒 VAULT ACCESS GRANTED - ENTERING SECURE ADMIN ZONE')
      toast.success('🛡️ Vault Access Granted', {
        description: 'Welcome to the Secure GAiA Admin Zone',
        duration: 3000
      })
    } else {
      setAttempts(prev => prev + 1)
      setPin('')
      
      if (attempts >= 2) {
        console.log('🚨 MULTIPLE FAILED VAULT ACCESS ATTEMPTS - SECURITY ALERT')
        toast.error('🚨 Access Denied - Security Alert', {
          description: 'Multiple failed attempts detected',
          duration: 5000
        })
        
        // Lock out for 30 seconds after 3 failed attempts
        setTimeout(() => {
          setAttempts(0)
        }, 30000)
      } else {
        toast.error('❌ Invalid PIN', {
          description: `${2 - attempts} attempts remaining`,
          duration: 3000
        })
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handlePinSubmit()
    }
  }

  if (vaultAccess) {
    return <SecureVaultLogin />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 flex items-center justify-center p-6">
      <Card className="w-full max-w-md border-2 border-green-500/30 bg-gradient-to-br from-green-900/20 to-black/80 backdrop-blur-sm">
        <CardHeader className="text-center">
          <div className="mx-auto w-16 h-16 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
            <Shield className="h-8 w-8 text-white" />
          </div>
          <CardTitle className="text-2xl font-bold text-green-400">
            🔒 SECURE VAULT ACCESS
          </CardTitle>
          <p className="text-green-300 text-sm">
            GAiA Token - Harmony of Gaia Protected Zone
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-gray-300 text-sm mb-4">
              Enter 4-digit vault access code
            </p>
            
            <div className="relative">
              <Input
                type={showPin ? 'text' : 'password'}
                value={pin}
                onChange={(e) => setPin(e.target.value.slice(0, 4))}
                onKeyPress={handleKeyPress}
                placeholder="****"
                className="text-center text-2xl font-mono tracking-widest bg-black/40 border-green-500/30 text-green-400 placeholder-green-600/50"
                maxLength={4}
                disabled={attempts >= 3}
              />
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-green-400 hover:text-green-300"
                onClick={() => setShowPin(!showPin)}
              >
                {showPin ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <Button 
            onClick={handlePinSubmit}
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold py-3"
            disabled={pin.length !== 4 || attempts >= 3}
          >
            <Lock className="h-5 w-5 mr-2" />
            {attempts >= 3 ? 'LOCKED - Wait 30s' : 'ENTER VAULT'}
          </Button>

          {attempts > 0 && attempts < 3 && (
            <div className="text-center text-yellow-400 text-sm">
              ⚠️ {3 - attempts} attempts remaining before lockout
            </div>
          )}

          <div className="text-center">
            <div className="text-xs text-muted-foreground">
              🛡️ Protected by Culture of Harmony Security
            </div>
            <div className="text-xs text-green-600 mt-1">
              GAiA Token Wallet: 5GrTjU1zsrBDjzukfHKX7ug63cVcJWFLXGjM2xstAFbh
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default SecureVault
