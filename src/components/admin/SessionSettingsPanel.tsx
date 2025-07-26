import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Slider } from '@/components/ui/slider'
import { Clock, Settings, Shield, Save, Zap, Activity } from 'lucide-react'
import { toast } from 'sonner'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'

export function SessionSettingsPanel() {
  const { adminSession, sessionTimeout, updateSessionTimeout, extendSession } = useSecureAdmin()
  const [newTimeout, setNewTimeout] = useState(sessionTimeout)
  const [timeRemaining, setTimeRemaining] = useState('Calculating...')
  const [sessionHealth, setSessionHealth] = useState<'excellent' | 'good' | 'warning' | 'critical'>('excellent')

  const handleTimeoutChange = useCallback((value: number[]) => {
    setNewTimeout(value[0])
  }, [])

  const handleSaveTimeout = useCallback(() => {
    try {
      updateSessionTimeout(newTimeout)
      toast.success('🔐 Session Timeout Updated', {
        description: `Admin session timeout set to ${newTimeout} minutes`,
        duration: 3000
      })
    } catch (error) {
      toast.error('❌ Failed to Update Timeout', {
        description: 'Please try again',
        duration: 3000
      })
    }
  }, [newTimeout, updateSessionTimeout])

  const handleExtendSession = useCallback(() => {
    try {
      extendSession()
      toast.success('⏰ Session Extended', {
        description: `Session extended by ${sessionTimeout} minutes`,
        duration: 3000
      })
    } catch (error) {
      toast.error('❌ Failed to Extend Session', {
        description: 'Please refresh and try again',
        duration: 3000
      })
    }
  }, [extendSession, sessionTimeout])

  const calculateTimeRemaining = useCallback(() => {
    try {
      if (!adminSession) {
        setTimeRemaining('No active session')
        setSessionHealth('critical')
        return
      }

      const sessionExpiry = localStorage.getItem('gaia-admin-expiry')
      if (!sessionExpiry) {
        setTimeRemaining('Unknown')
        setSessionHealth('warning')
        return
      }

      const remaining = parseInt(sessionExpiry) - Date.now()
      if (remaining <= 0) {
        setTimeRemaining('Session expired')
        setSessionHealth('critical')
        return
      }

      const minutes = Math.floor(remaining / (1000 * 60))
      const seconds = Math.floor((remaining % (1000 * 60)) / 1000)
      setTimeRemaining(`${minutes}m ${seconds}s`)

      // Set session health based on remaining time
      const totalTimeout = sessionTimeout * 60 * 1000
      const percentRemaining = (remaining / totalTimeout) * 100
      
      if (percentRemaining > 75) {
        setSessionHealth('excellent')
      } else if (percentRemaining > 50) {
        setSessionHealth('good')
      } else if (percentRemaining > 25) {
        setSessionHealth('warning')
      } else {
        setSessionHealth('critical')
      }
    } catch (error) {
      console.error('Error calculating time remaining:', error)
      setTimeRemaining('Error')
      setSessionHealth('critical')
    }
  }, [adminSession, sessionTimeout])

  useEffect(() => {
    calculateTimeRemaining()
    const interval = setInterval(calculateTimeRemaining, 1000)
    return () => clearInterval(interval)
  }, [calculateTimeRemaining])

  // Update newTimeout when sessionTimeout changes
  useEffect(() => {
    setNewTimeout(sessionTimeout)
  }, [sessionTimeout])

  const getHealthColor = (health: typeof sessionHealth) => {
    switch (health) {
      case 'excellent': return 'text-green-400 border-green-500/50'
      case 'good': return 'text-blue-400 border-blue-500/50'
      case 'warning': return 'text-yellow-400 border-yellow-500/50'
      case 'critical': return 'text-red-400 border-red-500/50'
    }
  }

  const getHealthIcon = (health: typeof sessionHealth) => {
    switch (health) {
      case 'excellent': return '🟢'
      case 'good': return '🔵'
      case 'warning': return '🟡'
      case 'critical': return '🔴'
    }
  }

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
          {/* Enhanced Session Info */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Shield className="h-4 w-4 text-green-400" />
                <span className="text-green-300 text-sm font-medium">Session Status</span>
              </div>
              <Badge variant="outline" className="border-green-500/50 text-green-400">
                {adminSession ? 'Active' : 'Inactive'}
              </Badge>
            </div>
            
            <div className={`p-4 bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border border-blue-500/20 rounded-lg ${getHealthColor(sessionHealth)}`}>
              <div className="flex items-center gap-2 mb-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm font-medium">Time Remaining</span>
              </div>
              <div className="font-mono text-lg flex items-center gap-2">
                <span>{getHealthIcon(sessionHealth)}</span>
                {timeRemaining}
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

            <div className="p-4 bg-gradient-to-r from-orange-900/30 to-red-900/30 border border-orange-500/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Activity className="h-4 w-4 text-orange-400" />
                <span className="text-orange-300 text-sm font-medium">Session Health</span>
              </div>
              <Badge variant="outline" className={getHealthColor(sessionHealth)}>
                {sessionHealth.toUpperCase()}
              </Badge>
            </div>
          </div>

          {/* Session Timeout Configuration */}
          <div className="space-y-4">
            <div>
              <label className="text-blue-300 mb-2 block text-sm font-medium">
                Admin Session Timeout (minutes)
              </label>
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
                className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50"
              >
                <Save className="h-4 w-4 mr-2" />
                Save Timeout Setting
              </Button>
              
              <Button 
                onClick={handleExtendSession}
                disabled={!adminSession}
                variant="outline"
                className="flex-1 border-green-500/30 text-green-400 hover:bg-green-900/20 disabled:opacity-50"
              >
                <Zap className="h-4 w-4 mr-2" />
                Extend Current Session
              </Button>
            </div>
          </div>

          {/* Enhanced Session Security Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-500/20 rounded-lg">
              <h4 className="text-yellow-400 font-medium mb-2 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                🔐 Security Features Active
              </h4> 
              <div className="text-sm text-gray-300 space-y-1">
                <div>• IP address exclusivity enforced</div>
                <div>• Single session limitation active</div>
                <div>• Automatic session validation every 30 seconds</div>
                <div>• Session automatically expires after timeout period</div>
                <div>• All admin actions logged and monitored</div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-lg">
              <h4 className="text-green-400 font-medium mb-2 flex items-center gap-2">
                <Activity className="h-4 w-4" />
                📊 Session Information
              </h4>
              <div className="text-sm text-gray-300 space-y-1">
                {adminSession && (
                  <>
                    <div>• Session ID: {adminSession.id.substring(0, 12)}...</div>
                    <div>• Created: {new Date(adminSession.createdAt || adminSession.timestamp).toLocaleTimeString()}</div>
                    <div>• Last Activity: {new Date(adminSession.lastActivity || adminSession.timestamp).toLocaleTimeString()}</div>
                    <div>• Timeout: {adminSession.timeout || sessionTimeout} minutes</div>
                  </>
                )}
                {!adminSession && (
                  <div className="text-red-400">• No active session detected</div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}