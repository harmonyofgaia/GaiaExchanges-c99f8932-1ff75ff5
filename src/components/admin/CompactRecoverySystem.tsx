
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Shield, Lock, Key, Eye, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

interface CompactRecoverySystemProps {
  onRecoveryComplete: () => void
  onBack: () => void
}

export function CompactRecoverySystem({ onRecoveryComplete, onBack }: CompactRecoverySystemProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1)
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set())
  const [inputValue, setInputValue] = useState('')

  const recoveryPasswords = {
    step1: 'peace harmony gaia 2024',
    step2: 'quantum admin device secure', 
    step3: 'matrix protection vault access',
    step4: 'ultimate master control key'
  }

  const handleStepVerification = () => {
    const expectedPassword = recoveryPasswords[`step${currentStep}` as keyof typeof recoveryPasswords]
    
    if (inputValue === expectedPassword) {
      const newCompleted = new Set(completedSteps).add(currentStep)
      setCompletedSteps(newCompleted)
      
      if (currentStep === 4) {
        toast.success('🛡️ 4-STEP RECOVERY COMPLETE!', {
          description: 'All verification steps completed - Access granted',
          duration: 5000
        })
        onRecoveryComplete()
      } else {
        setCurrentStep((currentStep + 1) as 1 | 2 | 3 | 4)
        toast.success(`✅ Step ${currentStep} Verified!`, {
          description: `Proceeding to step ${currentStep + 1}/4`,
          duration: 3000
        })
      }
      setInputValue('')
    } else {
      toast.error('❌ Invalid Recovery Code', {
        description: `Step ${currentStep}/4 failed - Access denied`,
        duration: 5000
      })
      setInputValue('')
    }
  }

  const stepIcons = [Lock, Shield, Key, Eye]
  const stepNames = ['Peace', 'Quantum', 'Matrix', 'Ultimate']

  return (
    <Card className="border-2 border-red-500/50 bg-gradient-to-br from-red-900/30 to-purple-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-400">
          <Shield className="h-6 w-6" />
          🔑 4-STEP RECOVERY SYSTEM
          <Badge className="bg-red-600 text-white">STEP {currentStep}/4</Badge>
        </CardTitle>
        <Progress value={completedSteps.size * 25} className="h-3" />
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-4 gap-2">
          {stepNames.map((name, index) => {
            const StepIcon = stepIcons[index]
            const stepNumber = index + 1
            const isActive = currentStep === stepNumber
            const isCompleted = completedSteps.has(stepNumber)
            
            return (
              <div key={stepNumber} className={`text-center p-2 rounded border ${
                isCompleted ? 'border-green-500 bg-green-900/20' :
                isActive ? 'border-blue-500 bg-blue-900/20' :
                'border-gray-500/30'
              }`}>
                <StepIcon className={`h-6 w-6 mx-auto mb-1 ${
                  isCompleted ? 'text-green-400' :
                  isActive ? 'text-blue-400' :
                  'text-gray-400'
                }`} />
                <p className="text-xs">{name}</p>
                {isCompleted && <CheckCircle className="h-4 w-4 mx-auto text-green-400" />}
              </div>
            )
          })}
        </div>

        {currentStep <= 4 && (
          <div className="space-y-4">
            <div className="text-center">
              <h3 className="text-lg font-bold text-red-400">
                Recovery Step {currentStep}: {stepNames[currentStep - 1]}
              </h3>
              <p className="text-sm text-muted-foreground">
                Enter the recovery password for step {currentStep}
              </p>
            </div>
            
            <div className="space-y-2">
              <Input
                type="password"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                className="bg-black/30 border-red-500/30 text-red-400 text-center"
                placeholder="Enter recovery password..."
                autoComplete="off"
              />
            </div>

            <Button 
              onClick={handleStepVerification}
              disabled={!inputValue}
              className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
            >
              <Lock className="h-5 w-5 mr-2" />
              VERIFY STEP {currentStep}
            </Button>
          </div>
        )}

        <div className="flex justify-center">
          <Button onClick={onBack} variant="ghost" className="text-xs">
            Back to Login
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
