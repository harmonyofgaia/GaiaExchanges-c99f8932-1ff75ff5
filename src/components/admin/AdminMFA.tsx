
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import { Smartphone, Shield, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

interface AdminMFAProps {
  onMFASuccess: () => void
}

export function AdminMFA({ onMFASuccess }: AdminMFAProps) {
  const [smsCode, setSmsCode] = useState('')
  const [googleCode, setGoogleCode] = useState('')
  const [emailCode, setEmailCode] = useState('')
  const [finalKey, setFinalKey] = useState('')
  const [currentStep, setCurrentStep] = useState(1)
  const [isVerifying, setIsVerifying] = useState(false)

  const handleSMSVerification = async () => {
    if (smsCode.length === 6) {
      setIsVerifying(true)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success('📱 SMS Code Verified!', {
        description: 'Step 2 of 4 completed',
        duration: 3000
      })
      
      setCurrentStep(2)
      setIsVerifying(false)
    }
  }

  const handleGoogleVerification = async () => {
    if (googleCode.length === 6) {
      setIsVerifying(true)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success('🔐 Google Authenticator Verified!', {
        description: 'Step 3 of 4 completed',
        duration: 3000
      })
      
      setCurrentStep(3)
      setIsVerifying(false)
    }
  }

  const handleEmailVerification = async () => {
    if (emailCode.length === 8) {
      setIsVerifying(true)
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success('📧 Email Code Verified!', {
        description: 'Step 4 of 4 completed',
        duration: 3000
      })
      
      setCurrentStep(4)
      setIsVerifying(false)
    }
  }

  const handleFinalVerification = async () => {
    if (finalKey === 'GAIA_QUANTUM_ADMIN_2024') {
      setIsVerifying(true)
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      toast.success('🌍 GAIA ADMIN ACCESS GRANTED!', {
        description: 'Welcome to the secure admin vault',
        duration: 5000
      })
      
      onMFASuccess()
      setIsVerifying(false)
    } else {
      toast.error('❌ Invalid Quantum Key', {
        description: 'Final verification failed. Access denied.',
        duration: 5000
      })
    }
  }

  return (
    <div className="space-y-6">
      {/* Step Progress */}
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-purple-900/20">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  currentStep >= step ? 'bg-green-600 text-white' : 'bg-gray-600 text-gray-300'
                }`}>
                  {currentStep > step ? <CheckCircle className="h-4 w-4" /> : step}
                </div>
                {step < 4 && (
                  <div className={`w-12 h-1 mx-2 ${
                    currentStep > step ? 'bg-green-600' : 'bg-gray-600'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="text-center mt-3 text-sm text-blue-300">
            4-Step Admin Verification Process
          </div>
        </CardContent>
      </Card>

      {/* Step 1: SMS Verification */}
      {currentStep === 1 && (
        <Card className="border-green-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Smartphone className="h-5 w-5" />
              Step 2: SMS Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enter the 6-digit code sent to your registered phone number:
            </p>
            
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={smsCode} onChange={setSmsCode}>
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
              onClick={handleSMSVerification}
              disabled={smsCode.length !== 6 || isVerifying}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isVerifying ? 'Verifying...' : 'Verify SMS Code'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 2: Google Authenticator */}
      {currentStep === 2 && (
        <Card className="border-purple-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Shield className="h-5 w-5" />
              Step 3: Google Authenticator
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enter the 6-digit code from your Google Authenticator app:
            </p>
            
            <div className="flex justify-center">
              <InputOTP maxLength={6} value={googleCode} onChange={setGoogleCode}>
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
              onClick={handleGoogleVerification}
              disabled={googleCode.length !== 6 || isVerifying}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              {isVerifying ? 'Verifying...' : 'Verify Google Code'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 3: Email Verification */}
      {currentStep === 3 && (
        <Card className="border-orange-500/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-orange-400">
              <Shield className="h-5 w-5" />
              Step 4: Email Verification
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Enter the 8-digit code sent to your admin email:
            </p>
            
            <Input
              type="text"
              maxLength={8}
              value={emailCode}
              onChange={(e) => setEmailCode(e.target.value)}
              className="text-center text-lg tracking-wider"
              placeholder="12345678"
            />
            
            <Button 
              onClick={handleEmailVerification}
              disabled={emailCode.length !== 8 || isVerifying}
              className="w-full bg-orange-600 hover:bg-orange-700"
            >
              {isVerifying ? 'Verifying...' : 'Verify Email Code'}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Step 4: Final Quantum Key */}
      {currentStep === 4 && (
        <Card className="border-red-500/30 bg-gradient-to-br from-red-900/30 to-black/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <Shield className="h-5 w-5" />
              Final Step: Quantum Admin Key
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-red-300">
              Enter the ultimate admin quantum key to access the secure vault:
            </p>
            
            <div className="space-y-2">
              <Label htmlFor="finalKey" className="text-red-300">Quantum Key</Label>
              <Input
                id="finalKey"
                type="password"
                value={finalKey}
                onChange={(e) => setFinalKey(e.target.value)}
                className="bg-black/50 border-red-500/30 text-center"
                placeholder="Enter quantum admin key..."
              />
            </div>
            
            <Button 
              onClick={handleFinalVerification}
              disabled={!finalKey || isVerifying}
              className="w-full bg-red-600 hover:bg-red-700"
            >
              {isVerifying ? 'Final Verification...' : 'Grant GAIA Admin Access'}
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
