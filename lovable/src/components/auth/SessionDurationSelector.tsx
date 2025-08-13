
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Clock, Shield } from 'lucide-react'
import { useEnhanced2FAAuth } from './Enhanced2FAAuthProvider'

export function SessionDurationSelector() {
  const { sessionDuration, setSessionDuration } = useEnhanced2FAAuth()
  const [selectedDuration, setSelectedDuration] = useState(sessionDuration.toString())

  const handleUpdateDuration = () => {
    const hours = parseInt(selectedDuration)
    setSessionDuration(hours)
  }

  const durationOptions = [
    { value: '1', label: '1 Hour' },
    { value: '4', label: '4 Hours' },
    { value: '8', label: '8 Hours' },
    { value: '12', label: '12 Hours' },
    { value: '24', label: '24 Hours (Default)' },
    { value: '48', label: '48 Hours' },
    { value: '72', label: '3 Days' },
    { value: '168', label: '1 Week' }
  ]

  return (
    <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Clock className="h-5 w-5" />
          Session Duration Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Choose how long you want to stay logged in after authentication:
        </p>
        
        <div className="space-y-3">
          <Select value={selectedDuration} onValueChange={setSelectedDuration}>
            <SelectTrigger className="bg-black/30 border-blue-500/30">
              <SelectValue placeholder="Select duration" />
            </SelectTrigger>
            <SelectContent>
              {durationOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            onClick={handleUpdateDuration}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <Shield className="h-4 w-4 mr-2" />
            Update Session Duration
          </Button>
        </div>
        
        <div className="text-xs text-muted-foreground text-center">
          Current session: {sessionDuration} hours • Security active across all GAIA services
        </div>
      </CardContent>
    </Card>
  )
}
