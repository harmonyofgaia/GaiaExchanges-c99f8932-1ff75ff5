
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

interface AdminRecoverySystemProps {
  onRecoveryComplete: () => void
  onBack: () => void
}

export function AdminRecoverySystem({ onRecoveryComplete, onBack }: AdminRecoverySystemProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [verificationData, setVerificationData] = useState({
    password: '',
    biometric: false,
    deviceCode: '',
    recoveryPhrase: ''
  })

  // Original 4-step recovery passwords
  const recoveryPasswords = {
    step1: 'GAiA_HARMONY_2024',
    step2: 'ADMIN_DEVICE_001', 
    step3: 'harmony gaia quantum vault',
    step4: 'QUANTUM_MATRIX_MASTER'
  }

  const handleStepComplete = (step: number) => {
    setCompletedSteps(prev => new Set(prev).add(step))
    
    if (step < 4) {
      setCurrentStep((step + 1) as 1 | 2 | 3 | 4)
    } else {
      // All steps completed
      sendAdminNotification()
      onRecoveryComplete()
    }
  }

  const sendAdminNotification = async () => {
    const notificationData = {
      timestamp: new Date().toISOString(),
      event: '4-Step Admin Recovery Completed',
      ip: 'Current IP Address',
      userAgent: navigator.userAgent,
      location: 'Security scan in progress...'
    }

    console.log('🔐 ADMIN RECOVERY COMPLETE:', notificationData)
    
    toast.success('🔐 4-Step Recovery Complete!', {
      description: 'All recovery steps verified - Original system access restored',
      duration: 6000
    })
  }

  const handleStepVerification = (step: number) => {
    switch (step) {
      case 1:
        if (verificationData.password === recoveryPasswords.step1) {
          handleStepComplete(1)
          toast.success('Step 1 Verified!', { description: 'Password authentication successful' })
        } else {
          toast.error('Invalid Password', { description: 'Access denied by wall of defense' })
        }
        break
      case 2:
        if (verificationData.deviceCode === recoveryPasswords.step2) {
          handleStepComplete(2)
          toast.success('Step 2 Verified!', { description: 'Device authorization confirmed' })
        } else {
          toast.error('Invalid Device Code', { description: 'Device not authorized' })
        }
        break
      case 3:
        if (verificationData.recoveryPhrase === recoveryPasswords.step3) {
          handleStepComplete(3)
          toast.success('Step 3 Verified!', { description: 'Recovery phrase confirmed' })
        } else {
          toast.error('Invalid Recovery Phrase', { description: 'Phrase verification failed' })
        }
        break
      case 4:
        if (verificationData.password === recoveryPasswords.step4) {
          handleStepComplete(4)
          toast.success('🛡️ FULL RECOVERY COMPLETE!', { 
            description: 'All 4 verification steps completed - Access granted',
            duration: 10000
          })
        } else {
          toast.error('Invalid Master Key', { description: 'Final verification failed' })
        }
        break
    }
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-red-500/50 bg-gradient-to-br from-red-900/30 to-purple-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Shield className="h-6 w-6" />
            🔑 4-STEP ADMIN RECOVERY SYSTEM
            <Badge className="bg-red-600 text-white">STEP {currentStep}/4</Badge>
          </CardTitle>
          <p className="text-red-300 text-center">
            Original Recovery System • Enhanced Wall of Defense
          </p>
        </CardHeader>
        <CardContent>
          {/* Progress Indicators */}
          <div className="mb-6">
            <div className="flex justify-between text-sm mb-2">
              <span>Recovery Progress</span>
              <span>{completedSteps.size * 25}%</span>
            </div>
            <Progress value={completedSteps.size * 25} className="h-3" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Step 1: Password */}
            <Card className={`${currentStep >= 1 ? 'border-green-500/50 bg-green-900/20' : 'border-gray-500/30'}`}>
              <CardContent className="p-4 text-center">
                <Lock className={`h-8 w-8 mx-auto mb-3 ${completedSteps.has(1) ? 'text-green-400' : currentStep === 1 ? 'text-blue-400' : 'text-gray-400'}`} />
                <h3 className="font-bold mb-2">Step 1: Password</h3>
                {currentStep === 1 ? (
                  <div className="space-y-2">
                    <Input
                      type="password"
                      placeholder="Recovery Password"
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
                ) : completedSteps.has(1) ? (
                  <CheckCircle className="h-6 w-6 mx-auto text-green-400" />
                ) : (
                  <Lock className="h-6 w-6 mx-auto text-gray-400" />
                )}
              </CardContent>
            </Card>

            {/* Step 2: Device Code */}
            <Card className={`${currentStep >= 2 ? 'border-green-500/50 bg-green-900/20' : 'border-gray-500/30'}`}>
              <CardContent className="p-4 text-center">
                <Shield className={`h-8 w-8 mx-auto mb-3 ${completedSteps.has(2) ? 'text-green-400' : currentStep === 2 ? 'text-blue-400' : 'text-gray-400'}`} />
                <h3 className="font-bold mb-2">Step 2: Device</h3>
                {currentStep === 2 ? (
                  <div className="space-y-2">
                    <Input
                      placeholder="Device Code"
                      value={verificationData.deviceCode}
                      onChange={(e) => setVerificationData(prev => ({ ...prev, deviceCode: e.target.value }))}
                    />
                    <Button 
                      onClick={() => handleStepVerification(2)} 
                      size="sm" 
                      className="w-full bg-orange-600 hover:bg-orange-700"
                    >
                      Verify
                    </Button>
                  </div>
                ) : completedSteps.has(2) ? (
                  <CheckCircle className="h-6 w-6 mx-auto text-green-400" />
                ) : (
                  <Shield className="h-6 w-6 mx-auto text-gray-400" />
                )}
              </CardContent>
            </Card>

            {/* Step 3: Recovery Phrase */}
            <Card className={`${currentStep >= 3 ? 'border-green-500/50 bg-green-900/20' : 'border-gray-500/30'}`}>
              <CardContent className="p-4 text-center">
                <Key className={`h-8 w-8 mx-auto mb-3 ${completedSteps.has(3) ? 'text-green-400' : currentStep === 3 ? 'text-blue-400' : 'text-gray-400'}`} />
                <h3 className="font-bold mb-2">Step 3: Phrase</h3>
                {currentStep === 3 ? (
                  <div className="space-y-2">
                    <Input
                      placeholder="Recovery Phrase"
                      value={verificationData.recoveryPhrase}
                      onChange={(e) => setVerificationData(prev => ({ ...prev, recoveryPhrase: e.target.value }))}
                    />
                    <Button 
                      onClick={() => handleStepVerification(3)} 
                      size="sm" 
                      className="w-full bg-purple-600 hover:bg-purple-700"
                    >
                      Verify
                    </Button>
                  </div>
                ) : completedSteps.has(3) ? (
                  <CheckCircle className="h-6 w-6 mx-auto text-green-400" />
                ) : (
                  <Key className="h-6 w-6 mx-auto text-gray-400" />
                )}
              </CardContent>
            </Card>

            {/* Step 4: Master Key */}
            <Card className={`${currentStep >= 4 ? 'border-green-500/50 bg-green-900/20' : 'border-gray-500/30'}`}>
              <CardContent className="p-4 text-center">
                <Eye className={`h-8 w-8 mx-auto mb-3 ${completedSteps.has(4) ? 'text-green-400' : currentStep === 4 ? 'text-blue-400' : 'text-gray-400'}`} />
                <h3 className="font-bold mb-2">Step 4: Master</h3>
                {currentStep === 4 ? (
                  <div className="space-y-2">
                    <Input
                      type="password"
                      placeholder="Master Key"
                      value={verificationData.password}
                      onChange={(e) => setVerificationData(prev => ({ ...prev, password: e.target.value }))}
                    />
                    <Button 
                      onClick={() => handleStepVerification(4)} 
                      size="sm" 
                      className="w-full bg-green-600 hover:bg-green-700"
                    >
                      Complete
                    </Button>
                  </div>
                ) : completedSteps.has(4) ? (
                  <CheckCircle className="h-6 w-6 mx-auto text-green-400" />
                ) : (
                  <Eye className="h-6 w-6 mx-auto text-gray-400" />
                )}
              </CardContent>
            </Card>
          </div>

          <div className="mt-6 text-center space-y-4">
            <Button 
              onClick={onBack}
              variant="ghost" 
              className="text-xs text-muted-foreground"
            >
              Back to Original Login
            </Button>
            
            <div className="p-4 bg-red-900/20 border border-red-500/20 rounded-lg">
              <p className="text-xs text-red-300 text-center">
                🔐 ORIGINAL 4-STEP RECOVERY • ENHANCED WALL OF DEFENSE
              </p>
              <p className="text-xs text-orange-300 text-center mt-1">
                Complete all steps to restore full admin access
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
