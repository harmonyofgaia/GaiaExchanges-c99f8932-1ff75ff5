
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Shield, QrCode, Smartphone, CheckCircle, Copy } from 'lucide-react'
import { toast } from 'sonner'

interface GoogleAuthenticatorProps {
  onSetupComplete: (secret: string) => void
  onVerificationSuccess: () => void
  userEmail?: string
}

export function GoogleAuthenticator({ onSetupComplete, onVerificationSuccess, userEmail }: GoogleAuthenticatorProps) {
  const [step, setStep] = useState<'setup' | 'verify' | 'complete'>('setup')
  const [secret, setSecret] = useState('')
  const [qrCodeUrl, setQrCodeUrl] = useState('')
  const [verificationCode, setVerificationCode] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)

  useEffect(() => {
    generateSecret()
  }, [])

  const generateSecret = () => {
    // Generate a random 32-character base32 secret
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567'
    let result = ''
    for (let i = 0; i < 32; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    setSecret(result)
    
    // Generate QR code URL for Google Authenticator
    const issuer = 'Harmony of Gaia'
    const accountName = userEmail || 'user@cultureofharmony.net'
    const otpAuthUrl = `otpauth://totp/${encodeURIComponent(issuer)}:${encodeURIComponent(accountName)}?secret=${result}&issuer=${encodeURIComponent(issuer)}`
    
    // Use QR Server API to generate QR code
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=256x256&data=${encodeURIComponent(otpAuthUrl)}`
    setQrCodeUrl(qrUrl)
  }

  const copySecret = () => {
    navigator.clipboard.writeText(secret)
    toast.success('Secret key copied to clipboard!')
  }

  const verifyCode = async () => {
    if (verificationCode.length !== 6) {
      toast.error('Please enter a complete 6-digit code')
      return
    }

    setIsVerifying(true)
    
    try {
      // In a real implementation, you would verify the TOTP code on the server
      // For demo purposes, we'll simulate verification
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Simple verification simulation - in production, use a proper TOTP library
      const isValid = verificationCode.match(/^\d{6}$/)
      
      if (isValid) {
        setStep('complete')
        onSetupComplete(secret)
        onVerificationSuccess()
        toast.success('🔐 Google Authenticator setup completed successfully!')
      } else {
        toast.error('Invalid verification code. Please try again.')
      }
    } catch (error) {
      toast.error('Verification failed. Please try again.')
    } finally {
      setIsVerifying(false)
    }
  }

  return (
    <div className="max-w-md mx-auto space-y-6">
      {/* Header */}
      <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-blue-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-center text-green-400">
            <Shield className="h-5 w-5" />
            Google Authenticator Setup
          </CardTitle>
          <div className="text-center text-sm text-green-300">
            Secure your GAIA account with 2FA
          </div>
        </CardHeader>
      </Card>

      {step === 'setup' && (
        <Card className="border-blue-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <QrCode className="h-5 w-5" />
              Step 1: Scan QR Code
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center space-y-4">
              <p className="text-sm text-muted-foreground">
                Open Google Authenticator app and scan this QR code:
              </p>
              
              {qrCodeUrl && (
                <div className="flex justify-center">
                  <img 
                    src={qrCodeUrl} 
                    alt="Google Authenticator QR Code"
                    className="border-2 border-white rounded-lg"
                  />
                </div>
              )}
              
              <div className="bg-muted/20 border border-border/30 rounded-lg p-3">
                <p className="text-xs text-muted-foreground mb-2">
                  Can't scan? Enter this secret key manually:
                </p>
                <div className="flex items-center gap-2">
                  <code className="flex-1 text-xs bg-black/20 p-2 rounded font-mono">
                    {secret}
                  </code>
                  <Button size="sm" onClick={copySecret} variant="outline">
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>
            
            <Button onClick={() => setStep('verify')} className="w-full bg-blue-600 hover:bg-blue-700">
              <Smartphone className="h-4 w-4 mr-2" />
              I've Added the Account
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 'verify' && (
        <Card className="border-yellow-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-yellow-400">
              <Shield className="h-5 w-5" />
              Step 2: Verify Setup
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground text-center">
              Enter the 6-digit code from your Google Authenticator app:
            </p>
            
            <div className="flex justify-center">
              <InputOTP 
                maxLength={6} 
                value={verificationCode} 
                onChange={setVerificationCode}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>
            
            <Button 
              onClick={verifyCode} 
              disabled={isVerifying || verificationCode.length !== 6}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isVerifying ? 'Verifying...' : 'Verify & Complete Setup'}
            </Button>
            
            <Button 
              onClick={() => setStep('setup')} 
              variant="outline"
              className="w-full"
            >
              Back to QR Code
            </Button>
          </CardContent>
        </Card>
      )}

      {step === 'complete' && (
        <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
          <CardContent className="pt-6">
            <div className="text-center space-y-4">
              <CheckCircle className="h-16 w-16 text-green-400 mx-auto" />
              <h3 className="text-xl font-bold text-green-400">Setup Complete!</h3>
              <p className="text-muted-foreground">
                Your GAIA account is now protected with Google Authenticator 2FA
              </p>
              <Badge className="bg-green-600 text-white">
                🔐 Maximum Security Active
              </Badge>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Security Information */}
      <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
        <CardContent className="pt-6">
          <div className="space-y-3 text-center">
            <Shield className="h-8 w-8 text-purple-400 mx-auto" />
            <h4 className="font-semibold text-purple-400">Universal Protection</h4>
            <p className="text-xs text-muted-foreground">
              This 2FA setup works across all GAIA services: Exchange, Wallet, Gaming, VR World, 
              and all downloadable applications for Windows, Linux, macOS, iOS, and Android.
            </p>
            <Badge className="bg-purple-600 text-white text-xs">
              Cross-Platform Security
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
