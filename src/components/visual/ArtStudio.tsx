
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Textarea } from '@/components/ui/textarea'
import { Brush, Palette, Wand2, Save, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

interface ArtStudioProps {
  isLocked: boolean
}

export function ArtStudio({ isLocked }: ArtStudioProps) {
  const [brushSize, setBrushSize] = useState(10)
  const [opacity, setOpacity] = useState(80)
  const [selectedColor, setSelectedColor] = useState('#22c55e')
  const [artDescription, setArtDescription] = useState('')

  const colorPalette = [
    '#22c55e', '#3b82f6', '#8b5cf6', '#f59e0b', 
    '#ef4444', '#06b6d4', '#ec4899', '#84cc16'
  ]

  const generateArt = () => {
    if (isLocked) {
      toast.error('Visual controls are locked')
      return
    }
    toast.success('AI art generation started!', {
      description: 'Your custom artwork will be ready shortly'
    })
  }

  const saveArtwork = () => {
    if (isLocked) {
      toast.error('Visual controls are locked')
      return
    }
    toast.success('Artwork saved to library!')
  }

  return (
    <Card className="border-pink-500/20 bg-pink-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-pink-400">
          <Brush className="h-5 w-5" />
          AI Art Studio
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>Art Description</Label>
          <Textarea
            placeholder="Describe the artwork you want to create..."
            value={artDescription}
            onChange={(e) => setArtDescription(e.target.value)}
            disabled={isLocked}
            rows={3}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Brush Size</Label>
            <Slider
              value={[brushSize]}
              onValueChange={(value) => setBrushSize(value[0])}
              max={50}
              min={1}
              step={1}
              disabled={isLocked}
            />
          </div>

          <div className="space-y-2">
            <Label>Opacity</Label>
            <Slider
              value={[opacity]}
              onValueChange={(value) => setOpacity(value[0])}
              max={100}
              min={10}
              step={5}
              disabled={isLocked}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Color Palette</Label>
          <div className="flex gap-2 flex-wrap">
            {colorPalette.map((color) => (
              <button
                key={color}
                className={`w-8 h-8 rounded-full border-2 transition-all ${
                  selectedColor === color ? 'border-white scale-110' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
                onClick={() => setSelectedColor(color)}
                disabled={isLocked}
              />
            ))}
            <Input
              type="color"
              value={selectedColor}
              onChange={(e) => setSelectedColor(e.target.value)}
              className="w-8 h-8 rounded-full border-0 p-0"
              disabled={isLocked}
            />
          </div>
        </div>

        <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center">
          <Palette className="h-12 w-12 mx-auto mb-4 text-muted-foreground/50" />
          <p className="text-muted-foreground">Canvas Area</p>
          <p className="text-xs text-muted-foreground/70">AI-generated artwork will appear here</p>
        </div>

        <div className="flex gap-2">
          <Button onClick={generateArt} className="flex-1" disabled={isLocked}>
            <Wand2 className="h-4 w-4 mr-2" />
            Generate Art
          </Button>
          <Button onClick={saveArtwork} variant="outline" disabled={isLocked}>
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button variant="outline" disabled={isLocked}>
            <Trash2 className="h-4 w-4 mr-2" />
            Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
