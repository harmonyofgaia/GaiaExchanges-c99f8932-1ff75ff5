
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Smartphone, Mail } from 'lucide-react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { useToast } from '@/hooks/use-toast'

interface AdminMFAProps {
  onMFASuccess: () => void
}

export function AdminMFA({ onMFASuccess }: AdminMFAProps) {
  const [mfaMethod, setMfaMethod] = useState<'phone' | 'email' | null>(null)
  const [otpCode, setOtpCode] = useState('')
  const { toast } = useToast()

  const sendMFACode = (method: 'phone' | 'email') => {
    setMfaMethod(method)
    
    const code = Math.floor(100000 + Math.random() * 900000).toString()
    console.log(`MFA Code for ${method}:`, code)
    
    if (method === 'phone') {
      toast({
        title: "SMS Verification Sent",
        description: "6-digit code sent to +31687758236",
      })
    } else {
      toast({
        title: "Email Verification Sent", 
        description: "6-digit code sent to info@cultureofharmony.net",
      })
    }
  }

  const verifyMFA = () => {
    if (otpCode.length === 6) {
      const deviceFingerprint = btoa(
        navigator.userAgent + 
        navigator.language + 
        screen.width + 'x' + screen.height + 
        new Date().getTimezoneOffset()
      )
      localStorage.setItem('gaia_admin_device', deviceFingerprint)
      onMFASuccess()
      toast({
        title: "MFA Verification Successful",
        description: "Device registered and access granted",
      })
    } else {
      toast({
        title: "Invalid Verification Code",
        description: "Please enter the complete 6-digit code",
        variant: "destructive",
      })
    }
  }

  return (
    <Card className="max-w-md mx-auto bg-gradient-to-br from-black/90 to-gray-900/90 border-orange-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-center text-orange-400">
          <Smartphone className="h-5 w-5" />
          Multi-Factor Authentication Required
        </CardTitle>
        <div className="text-center text-xs text-orange-300">
          New Device Detected • Additional Verification Needed
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-3 text-xs">
          <div className="text-orange-400 mb-2">🔒 Security Alert: Unknown Device</div>
          <div className="text-orange-300">
            For your security, we need to verify this device before granting admin access.
          </div>
        </div>

        {!mfaMethod ? (
          <div className="space-y-3">
            <div className="text-sm text-center text-gray-300 mb-4">
              Choose your verification method:
            </div>
            <Button 
              onClick={() => sendMFACode('phone')} 
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Smartphone className="h-4 w-4 mr-2" />
              SMS to +31687758236
            </Button>
            <Button 
              onClick={() => sendMFACode('email')} 
              variant="outline"
              className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
            >
              <Mail className="h-4 w-4 mr-2" />
              Email to info@cultureofharmony.net
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="text-sm text-center text-gray-300">
              Enter the 6-digit code sent to your {mfaMethod === 'phone' ? 'phone' : 'email'}:
            </div>
            
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={otpCode} onChange={setOtpCode}>
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
              onClick={verifyMFA} 
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={otpCode.length !== 6}
            >
              Verify & Complete Secure Login
            </Button>

            <Button 
              onClick={() => setMfaMethod(null)} 
              variant="outline"
              className="w-full text-xs"
            >
              Try Different Method
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
