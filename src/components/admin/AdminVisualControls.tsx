
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Palette, Settings, Eye, Lock, Unlock } from 'lucide-react'
import { useLock } from '@/components/providers/ThemeProvider'

interface AdminVisualControlsProps {
  isAdmin?: boolean
}

function AdminVisualControls({ isAdmin = false }: AdminVisualControlsProps) {
  const { isLocked, toggleLock } = useLock()
  const [backgroundIntensity, setBackgroundIntensity] = useState(50)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  
  return (
    <div className="space-y-6">
      <Card className="border-purple-500/20 bg-purple-900/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Settings className="h-5 w-5" />
            Admin Visual Controls
            {isAdmin && (
              <Badge className="bg-red-600 text-white">
                ADMIN ONLY
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Lock Visual Controls</Label>
            <Button
              onClick={toggleLock}
              variant={isLocked ? "destructive" : "outline"}
              size="sm"
            >
              {isLocked ? <Lock className="h-4 w-4" /> : <Unlock className="h-4 w-4" />}
              {isLocked ? 'Locked' : 'Unlocked'}
            </Button>
          </div>
          
          <div className="space-y-2">
            <Label>Background Intensity</Label>
            <Slider
              value={[backgroundIntensity]}
              onValueChange={(value) => setBackgroundIntensity(value[0])}
              max={100}
              step={1}
              disabled={isLocked}
            />
          </div>
          
          <div className="space-y-2">
            <Label>Animation Speed</Label>
            <Slider
              value={[animationSpeed]}
              onValueChange={(value) => setAnimationSpeed(value[0])}
              max={3}
              min={0.1}
              step={0.1}
              disabled={isLocked}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AdminVisualControls
