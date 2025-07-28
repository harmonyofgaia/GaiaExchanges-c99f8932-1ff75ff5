
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Wand2, Sparkles } from 'lucide-react'
import { toast } from 'sonner'

interface TemplateSelectorProps {
  onTemplateApplied: (template: any) => void
  isLocked: boolean
}

export function TemplateSelector({ onTemplateApplied, isLocked }: TemplateSelectorProps) {
  const templates = [
    {
      id: 'gaia-nature',
      name: 'GAIA Nature',
      description: 'Earth-friendly green theme',
      preview: 'bg-gradient-to-br from-green-600 to-emerald-600'
    },
    {
      id: 'cosmic-purple',
      name: 'Cosmic Purple',
      description: 'Space-inspired purple theme',
      preview: 'bg-gradient-to-br from-purple-600 to-violet-600'
    },
    {
      id: 'ocean-blue',
      name: 'Ocean Blue',
      description: 'Deep ocean blue theme',
      preview: 'bg-gradient-to-br from-blue-600 to-cyan-600'
    },
    {
      id: 'sunset-orange',
      name: 'Sunset Orange',
      description: 'Warm sunset theme',
      preview: 'bg-gradient-to-br from-orange-600 to-red-600'
    }
  ]

  const applyTemplate = (template: any) => {
    if (isLocked) {
      toast.error('Visual controls are locked')
      return
    }
    
    onTemplateApplied(template)
    toast.success(`Applied ${template.name} template!`, {
      description: 'Theme has been updated successfully'
    })
  }

  return (
    <Card className="border-indigo-500/20 bg-indigo-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-indigo-400">
          <Sparkles className="h-5 w-5" />
          Template Gallery
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {templates.map((template) => (
            <Card 
              key={template.id}
              className="cursor-pointer border transition-all hover:border-indigo-500/50 hover:scale-105"
              onClick={() => applyTemplate(template)}
            >
              <CardContent className="p-4">
                <div className={`w-full h-16 rounded-lg mb-3 ${template.preview}`} />
                <h4 className="font-bold text-indigo-400 mb-1">{template.name}</h4>
                <p className="text-sm text-muted-foreground">{template.description}</p>
                <Button 
                  size="sm" 
                  className="w-full mt-3 bg-indigo-600 hover:bg-indigo-700"
                  disabled={isLocked}
                >
                  <Wand2 className="h-3 w-3 mr-2" />
                  Apply Theme
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center pt-4">
          <Badge className="bg-indigo-600">
            🎨 More templates coming soon
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}
