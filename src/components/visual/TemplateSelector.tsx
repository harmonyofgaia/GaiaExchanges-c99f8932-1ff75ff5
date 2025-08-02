
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Palette, Wand2 } from 'lucide-react'

interface TemplateSelectorProps {
  onTemplateApplied: (template: Record<string, unknown>) => void
  isLocked?: boolean
}

export function TemplateSelector({ onTemplateApplied, isLocked = false }: TemplateSelectorProps) {
  const templates = [
    { id: 'ocean', name: 'Ocean Theme', colors: ['#0066cc', '#0080ff', '#00ccff'] },
    { id: 'forest', name: 'Forest Theme', colors: ['#006600', '#00cc00', '#66ff66'] },
    { id: 'sunset', name: 'Sunset Theme', colors: ['#ff6600', '#ff9900', '#ffcc00'] },
    { id: 'cosmic', name: 'Cosmic Theme', colors: ['#6600cc', '#9900ff', '#cc66ff'] }
  ]

  const handleApplyTemplate = (template: Record<string, unknown>) => {
    if (isLocked) return
    onTemplateApplied(template)
  }

  return (
    <Card className="border-purple-500/20 bg-purple-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Palette className="h-5 w-5" />
          Visual Templates
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {templates.map((template) => (
            <div key={template.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{template.name}</span>
                <Badge variant="secondary">{template.colors.length} colors</Badge>
              </div>
              <div className="flex gap-1">
                {template.colors.map((color, index) => (
                  <div 
                    key={index}
                    className="w-6 h-6 rounded"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <Button 
                onClick={() => handleApplyTemplate(template)}
                size="sm"
                className="w-full"
                disabled={isLocked}
              >
                <Wand2 className="h-3 w-3 mr-1" />
                Apply
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
