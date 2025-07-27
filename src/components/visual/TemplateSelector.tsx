
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Palette, Zap, Star } from 'lucide-react'

interface Template {
  id: string
  name: string
  description: string
  preview: string
  category: string
}

interface TemplateSelectorProps {
  onTemplateApplied: (template: Template) => void
}

export function TemplateSelector({ onTemplateApplied }: TemplateSelectorProps) {
  const templates: Template[] = [
    {
      id: 'eco-green',
      name: 'Eco Green',
      description: 'Natural green theme with organic elements',
      preview: 'linear-gradient(135deg, #10b981, #059669)',
      category: 'Environmental'
    },
    {
      id: 'ocean-blue',
      name: 'Ocean Blue',
      description: 'Deep blue marine theme',
      preview: 'linear-gradient(135deg, #3b82f6, #1e40af)',
      category: 'Aquatic'
    },
    {
      id: 'sunset-orange',
      name: 'Sunset Orange',
      description: 'Warm sunset colors',
      preview: 'linear-gradient(135deg, #f97316, #ea580c)',
      category: 'Warm'
    }
  ]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Palette className="h-5 w-5 text-purple-400" />
        <h3 className="text-lg font-semibold text-purple-400">Visual Templates</h3>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {templates.map((template) => (
          <Card key={template.id} className="bg-gray-900/50 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-sm text-purple-400">{template.name}</CardTitle>
              <Badge className="bg-purple-600 w-fit">{template.category}</Badge>
            </CardHeader>
            <CardContent className="space-y-3">
              <div 
                className="h-16 rounded-lg"
                style={{ background: template.preview }}
              />
              <p className="text-xs text-gray-400">{template.description}</p>
              <Button 
                onClick={() => onTemplateApplied(template)}
                className="w-full bg-purple-600 hover:bg-purple-700"
              >
                <Star className="h-4 w-4 mr-1" />
                Apply
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
