
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Layers, Download, Upload, Star, Heart } from 'lucide-react'
import { toast } from 'sonner'

interface DesignLibraryProps {
  isLocked: boolean
}

export function DesignLibrary({ isLocked }: DesignLibraryProps) {
  const [selectedTemplate, setSelectedTemplate] = useState('')

  const designTemplates = [
    {
      id: 'eco-nature',
      name: 'Eco Nature',
      description: 'Green and sustainable design theme',
      category: 'Environmental',
      rating: 4.8,
      downloads: 1247
    },
    {
      id: 'cosmic-space',
      name: 'Cosmic Space',
      description: 'Dark space theme with stellar effects',
      category: 'Futuristic',
      rating: 4.9,
      downloads: 2341
    },
    {
      id: 'ocean-depths',
      name: 'Ocean Depths',
      description: 'Deep blue underwater experience',
      category: 'Nature',
      rating: 4.7,
      downloads: 987
    },
    {
      id: 'forest-guardian',
      name: 'Forest Guardian',
      description: 'Protective forest theme',
      category: 'Environmental',
      rating: 4.8,
      downloads: 1876
    }
  ]

  const applyTemplate = (templateId: string) => {
    if (isLocked) {
      toast.error('Visual controls are locked')
      return
    }
    setSelectedTemplate(templateId)
    const template = designTemplates.find(t => t.id === templateId)
    toast.success(`Applied ${template?.name} template successfully!`)
  }

  return (
    <Card className="border-purple-500/20 bg-purple-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Layers className="h-5 w-5" />
          Design Library
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Tabs defaultValue="templates" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="assets">Assets</TabsTrigger>
          </TabsList>

          <TabsContent value="templates" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {designTemplates.map((template) => (
                <Card 
                  key={template.id}
                  className={`cursor-pointer border transition-all ${
                    selectedTemplate === template.id 
                      ? 'border-purple-500 bg-purple-900/20' 
                      : 'border-border hover:border-purple-500/50'
                  }`}
                  onClick={() => applyTemplate(template.id)}
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-purple-400">{template.name}</h4>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 text-yellow-400" />
                        <span className="text-xs">{template.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{template.description}</p>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">{template.category}</Badge>
                      <span className="text-xs text-muted-foreground">
                        {template.downloads} downloads
                      </span>
                    </div>
                    {selectedTemplate === template.id && (
                      <Badge className="mt-2 bg-purple-600">Active</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="components" className="space-y-4">
            <div className="text-center py-8 text-muted-foreground">
              <Layers className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Component library coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="assets" className="space-y-4">
            <div className="text-center py-8 text-muted-foreground">
              <Heart className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>Asset library coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex gap-2">
          <Button variant="outline" disabled={isLocked}>
            <Upload className="h-4 w-4 mr-2" />
            Upload Design
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Library
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
