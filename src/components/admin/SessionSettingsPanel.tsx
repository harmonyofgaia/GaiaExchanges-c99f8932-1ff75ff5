import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Clock, Settings, Shield, Save } from 'lucide-react'
import { toast } from 'sonner'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'

export function SessionSettingsPanel() {
  const { adminSession, sessionTimeout, updateSessionTimeout, extendSession } = useSecureAdmin()
  const [newTimeout, setNewTimeout] = useState(sessionTimeout)
  const [timeRemaining, setTimeRemaining] = useState('Calculating...')

  const handleTimeoutChange = (value: number[]) => {
    setNewTimeout(value[0])
  }

  const handleSaveTimeout = () => {
    updateSessionTimeout(newTimeout)
    toast.success('🔐 Session Timeout Updated', {
      description: `Admin session timeout set to ${newTimeout} minutes`,
      duration: 3000
    })
  }

  const handleExtendSession = () => {
    extendSession()
    toast.success('⏰ Session Extended', {
      description: `Session extended by ${sessionTimeout} minutes`,
      duration: 3000
    })
  }

  const getTimeRemaining = () => {
    return timeRemaining
  }

  useEffect(() => {
    const updateRemainingTime = () => {
      if (!adminSession) {
        setTimeRemaining('No active session')
        return
      }

      const sessionExpiry = localStorage.getItem('gaia-admin-expiry')
      if (!sessionExpiry) {
        setTimeRemaining('Unknown')
        return
      }

      const remaining = parseInt(sessionExpiry) - Date.now()
      if (remaining <= 0) {
        setTimeRemaining('Session expired')
        return
      }

      const minutes = Math.floor(remaining / (1000 * 60))
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000)
      setTimeRemaining(`${minutes}m ${seconds}s`)
    }

    updateRemainingTime()
    const interval = setInterval(updateRemainingTime, 1000)
    return () => clearInterval(interval)
  }, [adminSession])

  // Update newTimeout when sessionTimeout changes
  useEffect(() => {
    setNewTimeout(sessionTimeout)
  }, [sessionTimeout])

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-indigo-900/30">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Admin Session Management
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Current Session Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-green-300 text-sm font-medium">Session Status</span>
              </div>
              <Badge variant="outline" className="border-green-500/50 text-green-400">
                Active
              </Badge>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-blue-400" />
                <span className="text-blue-300 text-sm font-medium">Time Remaining</span>
              </div>
              <div className="text-blue-400 font-mono text-lg">
                {getTimeRemaining()}
              </div>
            </div>
            
            <div className="p-4 bg-gradient-to-r from-purple-900/30 to-indigo-900/30 border border-purple-500/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="h-4 w-4 text-purple-400" />
                <span className="text-purple-300 text-sm font-medium">Current Timeout</span>
              </div>
              <div className="text-purple-400 font-mono text-lg">
                {sessionTimeout} minutes
              </div>
            </div>
          </div>

          {/* Session Timeout Configuration */}
          <div className="space-y-4">
            <div>
              <Label className="text-blue-300 mb-2 block">
                Admin Session Timeout (minutes)
              </Label>
              <div className="space-y-4">
                <Slider
                  value={[newTimeout]}
                  onValueChange={handleTimeoutChange}
                  max={60}
                  min={1}
                  step={1}
                  className="w-full"
                />
                <div className="flex items-center justify-between text-sm text-gray-400">
                  <span>1 min</span>
                  <span className="text-blue-400 font-medium">{newTimeout} minutes</span>
                  <span>60 min</span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Button 
                onClick={handleSaveTimeout}
                disabled={newTimeout === sessionTimeout}
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Timeout Setting
              </Button>
              
              <Button 
                onClick={handleExtendSession}
                variant="outline"
                className="flex-1 border-green-500/30 text-green-400 hover:bg-green-900/20"
              >
                <Clock className="h-4 w-4 mr-2" />
                Extend Current Session
              </Button>
            </div>
          </div>

          {/* Session Security Info */}
          <div className="p-4 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/20 rounded-lg">
            <h4 className="text-yellow-400 font-medium mb-2">🔐 Security Features Active</h4>
            <div className="text-sm text-gray-300 space-y-1">
              <div>• IP address exclusivity enforced</div>
              <div>• Single session limitation active</div>
              <div>• Automatic session validation every 30 seconds</div>
              <div>• Session automatically expires after timeout period</div>
              <div>• All admin actions logged and monitored</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}