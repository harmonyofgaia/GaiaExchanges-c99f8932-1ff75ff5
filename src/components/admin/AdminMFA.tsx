
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Shield, Smartphone, Clock } from 'lucide-react'

interface AdminMFAProps {
  onMFASuccess: () => void
  onBackToLogin: () => void
}

export function AdminMFA({ onMFASuccess, onBackToLogin }: AdminMFAProps) {
  const [mfaCode, setMfaCode] = useState('')
  const [timeLeft, setTimeLeft] = useState(300) // 5 minutes
  const [correctCode] = useState(() => Math.floor(100000 + Math.random() * 900000).toString())

  useEffect(() => {
    console.log(`🔐 MFA Code for admin access: ${correctCode}`)
    
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev <= 1) {
          onBackToLogin()
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [correctCode, onBackToLogin])

  const handleMFASubmit = () => {
    if (mfaCode === correctCode) {
      // Store device fingerprint for future logins
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.textBaseline = 'top'
        ctx.font = '14px Arial'
        ctx.fillText('Harmony of Gaia Security Check', 2, 2)
      }
      
      const fingerprint = btoa(
        navigator.userAgent + 
        navigator.language + 
        screen.width + 'x' + screen.height + 
        new Date().getTimezoneOffset() +
        (canvas.toDataURL() || '')
      )
      
      localStorage.setItem('gaia_admin_device', fingerprint)
      onMFASuccess()
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <Card className="max-w-md mx-auto bg-gradient-to-br from-black/90 to-gray-900/90 border-red-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-center text-red-400">
          <Smartphone className="h-5 w-5" />
          Multi-Factor Authentication Required
        </CardTitle>
        <div className="text-center text-xs text-red-300">
          New Device Detected • Enhanced Security Protocol Active
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3 text-xs">
          <div className="flex items-center gap-2 text-red-400 mb-2">
            <Clock className="h-3 w-3" />
            <span className="font-semibold">Security Timer: {formatTime(timeLeft)}</span>
          </div>
          <div className="text-red-300">
            Check console for your secure MFA code. This is a development feature for admin access.
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-red-400">6-Digit MFA Code</label>
          <Input
            value={mfaCode}
            onChange={(e) => setMfaCode(e.target.value)}
            placeholder="000000"
            maxLength={6}
            className="bg-black/50 border-red-500/30 text-red-100 text-center text-lg tracking-widest"
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            onClick={handleMFASubmit} 
            className="flex-1 bg-red-600 hover:bg-red-700"
            disabled={mfaCode.length !== 6}
          >
            <Shield className="h-4 w-4 mr-2" />
            Verify & Access
          </Button>
          <Button 
            onClick={onBackToLogin} 
            variant="outline"
            className="border-gray-500 text-gray-400"
          >
            Back
          </Button>
        </div>
        
        <div className="text-xs text-center text-gray-400">
          This device will be remembered for future logins after verification
        </div>
      </CardContent>
    </Card>
  )
}
