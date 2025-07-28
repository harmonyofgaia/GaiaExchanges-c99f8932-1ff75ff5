
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Brush, Palette, Download, Upload, Wand2, Image, Layers } from 'lucide-react'
import { toast } from 'sonner'

interface ArtStudioProps {
  isLocked: boolean
}

export function ArtStudio({ isLocked }: ArtStudioProps) {
  const [selectedTool, setSelectedTool] = useState('brush')
  const [aiPrompt, setAiPrompt] = useState('')

  const tools = [
    { id: 'brush', name: 'Brush', icon: <Brush className="h-4 w-4" />, color: 'bg-blue-600' },
    { id: 'palette', name: 'Palette', icon: <Palette className="h-4 w-4" />, color: 'bg-green-600' },
    { id: 'layers', name: 'Layers', icon: <Layers className="h-4 w-4" />, color: 'bg-purple-600' },
    { id: 'ai', name: 'AI Generate', icon: <Wand2 className="h-4 w-4" />, color: 'bg-pink-600' }
  ]

  const generateAIArt = () => {
    if (isLocked) {
      toast.error('Visual controls are locked')
      return
    }
    if (!aiPrompt.trim()) {
      toast.error('Please enter a prompt for AI generation')
      return
    }
    toast.success('AI art generation started...')
  }

  const saveArtwork = () => {
    if (isLocked) {
      toast.error('Visual controls are locked')
      return
    }
    toast.success('Artwork saved to gallery')
  }

  return (
    <Card className="border-purple-500/20 bg-purple-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Image className="h-5 w-5" />
          Art Studio & Creator
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Tool Selection */}
        <div className="space-y-2">
          <Label>Art Tools</Label>
          <div className="flex gap-2">
            {tools.map((tool) => (
              <Button
                key={tool.id}
                size="sm"
                variant={selectedTool === tool.id ? 'default' : 'outline'}
                onClick={() => !isLocked && setSelectedTool(tool.id)}
                className={selectedTool === tool.id ? tool.color : ''}
                disabled={isLocked}
              >
                {tool.icon}
                <span className="ml-1">{tool.name}</span>
              </Button>
            ))}
          </div>
        </div>

        {/* Canvas Area Placeholder */}
        <div className="border-2 border-dashed border-muted-foreground/30 rounded-lg p-8 text-center bg-muted/10">
          <div className="text-6xl mb-4">🎨</div>
          <p className="text-muted-foreground">Art Canvas Area</p>
          <p className="text-sm text-muted-foreground">Draw, paint, and create here</p>
        </div>

        {/* AI Art Generation */}
        <div className="space-y-2">
          <Label>AI Art Generation</Label>
          <div className="flex gap-2">
            <Textarea
              placeholder="Describe the art you want to create..."
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              disabled={isLocked}
              rows={2}
            />
          </div>
          <Button onClick={generateAIArt} disabled={isLocked} className="w-full bg-pink-600 hover:bg-pink-700">
            <Wand2 className="h-4 w-4 mr-2" />
            Generate AI Art
          </Button>
        </div>

        {/* Color Palette */}
        <div className="space-y-2">
          <Label>Color Palette</Label>
          <div className="grid grid-cols-8 gap-2">
            {['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff', '#000000', '#ffffff'].map((color, index) => (
              <div
                key={index}
                className="w-8 h-8 rounded border-2 border-border cursor-pointer hover:scale-110 transition-transform"
                style={{ backgroundColor: color }}
                onClick={() => !isLocked && toast.success(`Selected ${color}`)}
              />
            ))}
          </div>
        </div>

        {/* Art Actions */}
        <div className="flex gap-2">
          <Button onClick={saveArtwork} disabled={isLocked} className="bg-green-600 hover:bg-green-700">
            <Download className="h-4 w-4 mr-2" />
            Save Art
          </Button>
          <Button variant="outline" disabled={isLocked}>
            <Upload className="h-4 w-4 mr-2" />
            Load Art
          </Button>
          <Button variant="outline" disabled={isLocked}>
            <Palette className="h-4 w-4 mr-2" />
            Gallery
          </Button>
        </div>

        {/* Art Gallery Preview */}
        <div className="space-y-2">
          <Label>Recent Creations</Label>
          <div className="grid grid-cols-4 gap-2">
            {['🎨', '🖼️', '🌅', '🎭'].map((art, index) => (
              <Card key={index} className="p-2 cursor-pointer hover:bg-muted/50 transition-colors">
                <div className="text-2xl text-center">{art}</div>
                <Badge variant="secondary" className="text-xs w-full justify-center mt-1">
                  Art {index + 1}
                </Badge>
              </Card>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
