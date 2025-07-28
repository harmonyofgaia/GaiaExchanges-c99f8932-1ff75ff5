
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Layers, Upload, Download, Brush, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

interface AdvancedBackgroundControlsProps {
  isLocked: boolean
}

export function AdvancedBackgroundControls({ isLocked }: AdvancedBackgroundControlsProps) {
  const [backgroundType, setBackgroundType] = useState('gradient')
  const [opacity, setOpacity] = useState(80)
  const [blur, setBlur] = useState(10)
  const [particleCount, setParticleCount] = useState(50)

  const backgroundTypes = [
    { value: 'gradient', label: 'Gradient' },
    { value: 'pattern', label: 'Pattern' },
    { value: 'image', label: 'Image' },
    { value: 'video', label: 'Video' },
    { value: 'particles', label: 'Particles' }
  ]

  const applyBackground = () => {
    if (isLocked) {
      toast.error('Visual controls are locked')
      return
    }
    toast.success('Background settings applied')
  }

  return (
    <Card className="border-green-500/20 bg-green-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Layers className="h-5 w-5" />
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
            <Label>Opacity: {opacity}%</Label>
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
            <Label>Blur Effect: {blur}px</Label>
            <Slider
              value={[blur]}
              onValueChange={(value) => setBlur(value[0])}
              max={50}
              min={0}
              step={1}
              disabled={isLocked}
            />
          </div>
        </div>

        {backgroundType === 'particles' && (
          <div className="space-y-2">
            <Label>Particle Count: {particleCount}</Label>
            <Slider
              value={[particleCount]}
              onValueChange={(value) => setParticleCount(value[0])}
              max={200}
              min={10}
              step={10}
              disabled={isLocked}
            />
          </div>
        )}

        <div className="space-y-2">
          <Label>Background Image Upload</Label>
          <div className="flex gap-2">
            <Input type="file" accept="image/*,video/*" disabled={isLocked} />
            <Button variant="outline" disabled={isLocked}>
              <Upload className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Switch disabled={isLocked} />
          <Label>Enable Animation</Label>
        </div>

        <div className="flex items-center space-x-2">
          <Switch disabled={isLocked} />
          <Label>Auto-change Background</Label>
        </div>

        <div className="flex gap-2">
          <Button onClick={applyBackground} disabled={isLocked} className="bg-green-600 hover:bg-green-700">
            <Brush className="h-4 w-4 mr-2" />
            Apply Settings
          </Button>
          <Button variant="outline" disabled={isLocked}>
            <Download className="h-4 w-4 mr-2" />
            Export Config
          </Button>
          <Button variant="outline" disabled={isLocked}>
            <Sparkles className="h-4 w-4 mr-2" />
            Generate AI
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
