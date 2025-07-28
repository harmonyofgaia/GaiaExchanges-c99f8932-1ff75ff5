
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Image, Layers, Settings, Wand2 } from 'lucide-react'
import { toast } from 'sonner'

interface AdvancedBackgroundControlsProps {
  isLocked: boolean
}

export function AdvancedBackgroundControls({ isLocked }: AdvancedBackgroundControlsProps) {
  const [backgroundType, setBackgroundType] = useState('gradient')
  const [opacity, setOpacity] = useState(80)
  const [blurIntensity, setBlurIntensity] = useState(20)
  const [animationSpeed, setAnimationSpeed] = useState(1)

  const backgroundTypes = [
    { value: 'gradient', label: 'Gradient' },
    { value: 'particle', label: 'Particle System' },
    { value: 'geometric', label: 'Geometric Patterns' },
    { value: 'nature', label: 'Nature Inspired' },
    { value: 'cosmic', label: 'Cosmic Theme' }
  ]

  const applyBackgroundChanges = () => {
    if (isLocked) {
      toast.error('Visual controls are locked')
      return
    }
    toast.success('Background settings applied successfully!')
  }

  return (
    <Card className="border-blue-500/20 bg-blue-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Image className="h-5 w-5" />
          Advanced Background Controls
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Background Type</Label>
          <Select value={backgroundType} onValueChange={setBackgroundType} disabled={isLocked}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {backgroundTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Opacity</Label>
            <Slider
              value={[opacity]}
              onValueChange={(value) => setOpacity(value[0])}
              max={100}
              min={0}
              step={5}
              disabled={isLocked}
            />
          </div>

          <div className="space-y-2">
            <Label>Blur Intensity</Label>
            <Slider
              value={[blurIntensity]}
              onValueChange={(value) => setBlurIntensity(value[0])}
              max={50}
              min={0}
              step={2}
              disabled={isLocked}
            />
          </div>
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

        <div className="flex items-center space-x-2">
          <Switch disabled={isLocked} />
          <Label>Enable Dynamic Effects</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch disabled={isLocked} />
          <Label>Responsive Background</Label>
        </div>

        <Button onClick={applyBackgroundChanges} className="w-full" disabled={isLocked}>
          <Wand2 className="h-4 w-4 mr-2" />
          Apply Background Changes
        </Button>
      </CardContent>
    </Card>
  )
}
