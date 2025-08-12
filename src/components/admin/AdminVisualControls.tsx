
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Palette, Settings, Wand2, Download, Upload } from 'lucide-react'
import { toast } from 'sonner'

export default function AdminVisualControls() {
  const [backgroundIntensity, setBackgroundIntensity] = useState(50)
  const [animationSpeed, setAnimationSpeed] = useState(1)
  const [fontSize, setFontSize] = useState(16)
  const [spacing, setSpacing] = useState(16)

  const applyChanges = () => {
    toast.success('Visual changes applied successfully!')
  }

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Settings className="h-5 w-5" />
            Admin Visual Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Background Intensity</Label>
              <Slider
                value={[backgroundIntensity]}
                onValueChange={(value) => setBackgroundIntensity(value[0])}
                max={100}
                min={0}
                step={5}
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
              />
            </div>

            <div className="space-y-2">
              <Label>Font Size</Label>
              <Slider
                value={[fontSize]}
                onValueChange={(value) => setFontSize(value[0])}
                max={24}
                min={12}
                step={1}
              />
            </div>
            
            <div className="space-y-2">
              <Label>Spacing</Label>
              <Slider
                value={[spacing]}
                onValueChange={(value) => setSpacing(value[0])}
                max={32}
                min={8}
                step={2}
              />
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch />
            <Label>Enable Particle Effects</Label>
          </div>
          
          <div className="flex gap-2">
            <Button onClick={applyChanges} className="bg-purple-600 hover:bg-purple-700">
              <Wand2 className="h-4 w-4 mr-2" />
              Apply Changes
            </Button>
            <Button variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Export Theme
            </Button>
            <Button variant="outline">
              <Upload className="h-4 w-4 mr-2" />
              Import Theme
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
