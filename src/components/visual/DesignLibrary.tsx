
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Image, Download, Star, Heart, Eye } from 'lucide-react'
import { toast } from 'sonner'

interface DesignLibraryProps {
  isLocked: boolean
}

export function DesignLibrary({ isLocked }: DesignLibraryProps) {
  const designs = [
    {
      id: 'nature-harmony',
      name: 'Nature Harmony',
      category: 'Backgrounds',
      downloads: 1247,
      rating: 4.9,
      preview: '🌿'
    },
    {
      id: 'cosmic-energy',
      name: 'Cosmic Energy',
      category: 'Themes',
      downloads: 856,
      rating: 4.8,
      preview: '🌌'
    },
    {
      id: 'ocean-depths',
      name: 'Ocean Depths',
      category: 'Color Palettes',
      downloads: 634,
      rating: 4.7,
      preview: '🌊'
    },
    {
      id: 'forest-shield',
      name: 'Forest Shield',
      category: 'Components',
      downloads: 423,
      rating: 4.6,
      preview: '🌲'
    }
  ]

  const handleApplyDesign = (designName: string) => {
    if (isLocked) {
      toast.error('Visual controls are locked')
      return
    }
    toast.success(`Applied ${designName} design`)
  }

  return (
    <Card className="border-blue-500/20 bg-blue-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Image className="h-5 w-5" />
          Design Library
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {designs.map((design) => (
            <Card key={design.id} className="border-border hover:bg-muted/50 transition-colors">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-2">
                  <div className="text-3xl">{design.preview}</div>
                  <div className="flex-1">
                    <h4 className="font-bold text-blue-400">{design.name}</h4>
                    <Badge variant="secondary" className="text-xs">{design.category}</Badge>
                  </div>
                </div>
                
                <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    <span>{design.downloads}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-3 w-3 text-yellow-400" />
                    <span>{design.rating}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    onClick={() => handleApplyDesign(design.name)}
                    disabled={isLocked}
                    className="flex-1"
                  >
                    Apply
                  </Button>
                  <Button size="sm" variant="outline" disabled={isLocked}>
                    <Heart className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="outline">
                    <Eye className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
