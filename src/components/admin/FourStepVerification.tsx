
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  Shield, 
  Lock, 
  Eye, 
  Fingerprint,
  Key,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'
import { toast } from 'sonner'

export function FourStepVerification() {
  const [currentStep, setCurrentStep] = useState(1)
  const [verificationData, setVerificationData] = useState({
    password: '',
    biometric: false,
    deviceCode: '',
    recoveryPhrase: ''
  })
  const [isVerified, setIsVerified] = useState(false)

  const handleStepVerification = (step: number) => {
    switch (step) {
      case 1:
        if (verificationData.password === 'GAiA_HARMONY_2024') {
          setCurrentStep(2)
          toast.success('Step 1 Verified!', { description: 'Password authentication successful' })
        } else {
          toast.error('Invalid Password', { description: 'Access denied by quantum security' })
        }
        break
      case 2:
        setVerificationData(prev => ({ ...prev, biometric: true }))
        setCurrentStep(3)
        toast.success('Step 2 Verified!', { description: 'Biometric scan completed' })
        break
      case 3:
        if (verificationData.deviceCode === 'ADMIN_DEVICE_001') {
          setCurrentStep(4)
          toast.success('Step 3 Verified!', { description: 'Device authorization confirmed' })
        } else {
          toast.error('Invalid Device Code', { description: 'Device not authorized' })
        }
        break
      case 4:
        if (verificationData.recoveryPhrase.includes('harmony') && verificationData.recoveryPhrase.includes('gaia')) {
          setIsVerified(true)
          toast.success('🛡️ FULL ACCESS GRANTED!', { 
            description: 'All 4 verification steps completed successfully',
            duration: 10000
          })
        } else {
          toast.error('Invalid Recovery Phrase', { description: 'Final verification failed' })
        }
        break
    }
  }

  const resetVerification = () => {
    setCurrentStep(1)
    setIsVerified(false)
    setVerificationData({
      password: '',
      biometric: false,
      deviceCode: '',
      recoveryPhrase: ''
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-green-500/50 bg-gradient-to-r from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold text-green-400">
            🛡️ 4-STEP VERIFICATION SYSTEM
          </CardTitle>
          <div className="flex justify-center gap-2">
            <Badge className={isVerified ? 'bg-green-600' : 'bg-blue-600'}>
              {isVerified ? '✅ VERIFIED' : '🔒 SECURE ACCESS'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Verification Progress</span>
              <span>{isVerified ? 100 : (currentStep - 1) * 25}%</span>
            </div>
            <Progress value={isVerified ? 100 : (currentStep - 1) * 25} className="h-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Step 1: Password */}
            <Card className={`${currentStep >= 1 ? 'border-green-500/50 bg-green-900/20' : 'border-gray-500/30'}`}>
              <CardContent className="p-4 text-center">
                <Lock className={`h-8 w-8 mx-auto mb-3 ${currentStep > 1 ? 'text-green-400' : 'text-blue-400'}`} />
                <h3 className="font-bold mb-2">Step 1: Password</h3>
                {currentStep === 1 ? (
                  <div className="space-y-2">
                    <Input
                      type="password"
                      placeholder="Admin Password"
                      value={verificationData.password}
                      onChange={(e) => setVerificationData(prev => ({ ...prev, password: e.target.value }))}
                    />
                    <Button 
                      onClick={() => handleStepVerification(1)} 
                      size="sm" 
                      className="w-full bg-blue-600 hover:bg-blue-700"
                    >
                      Verify
                    </Button>
                  </div>
                ) : currentStep > 1 ? (
                  <CheckCircle className="h-6 w-6 mx-auto text-green-400" />
                ) : (
                  <Lock className="h-6 w-6 mx-auto text-gray-400" />
                )}
              </CardContent>
            </Card>

            {/* Step 2: Biometric */}
            <Card className={`${currentStep >= 2 ? 'border-green-500/50 bg-green-900/20' : 'border-gray-500/30'}`}>
              <CardContent className="p-4 text-center">
                <Fingerprint className={`h-8 w-8 mx-auto mb-3 ${currentStep > 2 ? 'text-green-400' : currentStep === 2 ? 'text-blue-400' : 'text-gray-400'}`} />
                <h3 className="font-bold mb-2">Step 2: Biometric</h3>
                {currentStep === 2 ? (
                  <Button 
                    onClick={() => handleStepVerification(2)} 
                    size="sm" 
                    className="w-full bg-purple-600 hover:bg-purple-700"
                  >
                    <Fingerprint className="h-4 w-4 mr-2" />
                    Scan
                  </Button>
                ) : currentStep > 2 ? (
                  <CheckCircle className="h-6 w-6 mx-auto text-green-400" />
                ) : (
                  <Fingerprint className="h-6 w-6 mx-auto text-gray-400" />
                )}
              </CardContent>
            </Card>

            {/* Step 3: Device Code */}
            <Card className={`${currentStep >= 3 ? 'border-green-500/50 bg-green-900/20' : 'border-gray-500/30'}`}>
              <CardContent className="p-4 text-center">
                <Shield className={`h-8 w-8 mx-auto mb-3 ${currentStep > 3 ? 'text-green-400' : currentStep === 3 ? 'text-blue-400' : 'text-gray-400'}`} />
                <h3 className="font-bold mb-2">Step 3: Device</h3>
                {currentStep === 3 ? (
                  <div className="space-y-2">
                    <Input
                      placeholder="Device Code"
                      value={verificationData.deviceCode}
                      onChange={(e) => setVerificationData(prev => ({ ...prev, deviceCode: e.target.value }))}
                    />
                    <Button 
                      onClick={() => handleStepVerification(3)} 
                      size="sm" 
                      className="w-full bg-orange-600 hover:bg-orange-700"
                    >
                      Verify
                    </Button>
                  </div>
                ) : currentStep > 3 ? (
                  <CheckCircle className="h-6 w-6 mx-auto text-green-400" />
                ) : (
                  <Shield className="h-6 w-6 mx-auto text-gray-400" />
                )}
              </CardContent>
            </Card>

            {/* Step 4: Recovery Phrase */}
            <Card className={`${currentStep >= 4 ? 'border-green-500/50 bg-green-900/20' : 'border-gray-500/30'}`}>
              <CardContent className="p-4 text-center">
                <Key className={`h-8 w-8 mx-auto mb-3 ${isVerified ? 'text-green-400' : currentStep === 4 ? 'text-blue-400' : 'text-gray-400'}`} />
                <h3 className="font-bold mb-2">Step 4: Recovery</h3>
                {currentStep === 4 ? (
                  <div className="space-y-2">
                    <Input
                      placeholder="Recovery Phrase"
                      value={verificationData.recoveryPhrase}
                      onChange={(e) => setVerificationData(prev => ({ ...prev, recoveryPhrase: e.target.value }))}
                    />
                    <Button 
                      onClick={() => handleStepVerification(4)} 
                      size="sm" 
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Complete
                    </Button>
                  </div>
                ) : isVerified ? (
                  <CheckCircle className="h-6 w-6 mx-auto text-green-400" />
                ) : (
                  <Key className="h-6 w-6 mx-auto text-gray-400" />
                )}
              </CardContent>
            </Card>
          </div>

          {isVerified && (
            <div className="mt-6 text-center">
              <Badge className="bg-green-600 text-white text-lg py-2 px-6 mb-4">
                🛡️ ADMIN ACCESS FULLY VERIFIED
              </Badge>
              <div className="flex justify-center gap-4">
                <Button onClick={resetVerification} variant="outline" className="border-blue-500/30 text-blue-400">
                  Reset Verification
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
