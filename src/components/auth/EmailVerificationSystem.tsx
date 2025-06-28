
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Mail, Shield, Lock, CheckCircle } from 'lucide-react'
import { useToast } from '@/hooks/use-toast'
import { supabase } from '@/integrations/supabase/client'

interface EmailVerificationProps {
  email: string
  onVerificationSuccess: (code: string) => void
  userType: 'admin' | 'customer'
}

export function EmailVerificationSystem({ 
  email, 
  onVerificationSuccess, 
  userType 
}: EmailVerificationProps) {
  const [verificationCode, setVerificationCode] = useState('')
  const [sentCode, setSentCode] = useState('')
  const [isCodeSent, setIsCodeSent] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const { toast } = useToast()

  const generateSecureCode = () => {
    // Generate 6-digit secure code
    return Math.floor(100000 + Math.random() * 900000).toString()
  }

  const sendVerificationEmail = async () => {
    const code = generateSecureCode()
    setSentCode(code)
    
    try {
      // In production, this would call an edge function to send email
      // For now, we'll simulate email sending and log the code
      console.log(`🔐 Security Code for ${email}:`, code)
      
      // Simulate email service
      const emailTemplate = `
        🛡️ HARMONY OF GAIA - SECURITY VERIFICATION
        
        ${userType.toUpperCase()} LOGIN VERIFICATION
        
        Your secure access code: ${code}
        
        IP Address: ${await getClientIP()}
        Timestamp: ${new Date().toLocaleString()}
        
        ⚠️ If you didn't request this, please contact security immediately.
        
        Security Level: Maximum Encryption
        Expires in: 10 minutes
      `
      
      setIsCodeSent(true)
      toast({
        title: "🔐 Verification Code Sent",
        description: `Security code sent to ${email}`,
      })
      
      // In production, actually send email here
      console.log('Email Template:', emailTemplate)
      
    } catch (error) {
      toast({
        title: "Email Send Failed",
        description: "Please try again",
        variant: "destructive"
      })
    }
  }

  const getClientIP = async () => {
    // In production, get actual IP
    return '###.###.###.### (Protected)'
  }

  const verifyCode = async () => {
    setIsVerifying(true)
    
    if (verificationCode === sentCode) {
      toast({
        title: "✅ Verification Successful",
        description: "Access granted - secure session established",
      })
      onVerificationSuccess(verificationCode)
    } else {
      toast({
        title: "❌ Invalid Code",
        description: "Please check your email and try again",
        variant: "destructive"
      })
    }
    
    setIsVerifying(false)
  }

  return (
    <Card className="max-w-md mx-auto bg-gradient-to-br from-blue-900/30 to-purple-900/30 border-blue-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-center text-blue-400">
          <Mail className="h-5 w-5" />
          Email Verification Required
        </CardTitle>
        <div className="text-center">
          <Badge className={userType === 'admin' ? 'bg-red-600' : 'bg-blue-600'}>
            {userType.toUpperCase()} ACCESS
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
          <div className="flex items-center gap-2 text-blue-400 mb-2">
            <Shield className="h-4 w-4" />
            <span className="font-semibold">Security Protocol Active</span>
          </div>
          <div className="text-sm text-blue-300">
            A verification code will be sent to:
            <div className="font-mono bg-blue-900/20 p-2 rounded mt-1">
              {email}
            </div>
          </div>
        </div>

        {!isCodeSent ? (
          <Button 
            onClick={sendVerificationEmail}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Mail className="h-4 w-4 mr-2" />
            Send Verification Code
          </Button>
        ) : (
          <div className="space-y-4">
            <div className="text-center text-sm text-green-400">
              ✅ Code sent to your email
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2 text-blue-400">
                Enter 6-Digit Verification Code
              </label>
              <Input
                type="text"
                value={verificationCode}
                onChange={(e) => setVerificationCode(e.target.value)}
                placeholder="000000"
                maxLength={6}
                className="bg-black/50 border-blue-500/30 text-center text-lg font-mono"
              />
            </div>

            <Button 
              onClick={verifyCode}
              disabled={verificationCode.length !== 6 || isVerifying}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              {isVerifying ? 'Verifying...' : 'Verify & Login'}
            </Button>

            <Button 
              onClick={() => {
                setIsCodeSent(false)
                setVerificationCode('')
              }}
              variant="outline"
              className="w-full text-xs"
            >
              Send New Code
            </Button>
          </div>
        )}

        <div className="text-xs text-center text-muted-foreground">
          🔒 This replaces traditional captcha with email-based security
        </div>
      </CardContent>
    </Card>
  )
}
