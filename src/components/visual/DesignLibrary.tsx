
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Image, 
  Palette, 
  Brush, 
  Layers,
  Download,
  Upload,
  Star,
  Search,
  Filter,
  Grid,
  List,
  Lock,
  Unlock
} from 'lucide-react'
import { toast } from 'sonner'

interface DesignAsset {
  id: string
  name: string
  type: 'background' | 'overlay' | 'texture' | 'pattern'
  url: string
  tags: string[]
  category: 'neural' | 'nature' | 'abstract' | 'geometric' | 'cosmic'
  isFavorite?: boolean
}

export function DesignLibrary({ isLocked }: { isLocked: boolean }) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [favorites, setFavorites] = useState<string[]>([])

  // All uploaded design assets organized by category
  const designAssets: DesignAsset[] = [
    // Neural/Synaptic designs
    {
      id: 'neural-1',
      name: 'Electric Neural Network',
      type: 'background',
      url: '/lovable-uploads/42ec85dc-42df-4958-96d8-7919a192f629.png',
      tags: ['neural', 'electric', 'synaptic'],
      category: 'neural'
    },
    {
      id: 'neural-2',
      name: 'Bioelectric Pathways',
      type: 'overlay',
      url: '/lovable-uploads/3ce518f5-75b0-493f-897a-45119793a33d.png',
      tags: ['bioelectric', 'pathways', 'organic'],
      category: 'neural'
    },
    {
      id: 'neural-3',
      name: 'Neural Matrix',
      type: 'background',
      url: '/lovable-uploads/1087f396-900a-4e0b-be62-7b049d0294ff.png',
      tags: ['matrix', 'neural', 'network'],
      category: 'neural'
    },
    {
      id: 'neural-4',
      name: 'Synaptic Fire',
      type: 'texture',
      url: '/lovable-uploads/1ed369eb-ecda-422a-af60-8f511aa9aa8e.png',
      tags: ['synaptic', 'fire', 'energy'],
      category: 'neural'
    },
    {
      id: 'neural-5',
      name: 'Brain Connections',
      type: 'pattern',
      url: '/lovable-uploads/2ab2dcf8-008f-4f94-9341-9b6fcb25cefb.png',
      tags: ['brain', 'connections', 'cognitive'],
      category: 'neural'
    },
    // Nature designs
    {
      id: 'nature-1',
      name: 'Forest Canopy',
      type: 'background',
      url: 'https://images.unsplash.com/photo-1523712999610-f77fbcfc3843?auto=format&fit=crop&w=800',
      tags: ['forest', 'trees', 'natural'],
      category: 'nature'
    },
    {
      id: 'nature-2',
      name: 'Ocean Waves',
      type: 'background',
      url: 'https://images.unsplash.com/photo-1500375592092-40eb2168fd21?auto=format&fit=crop&w=800',
      tags: ['ocean', 'waves', 'water'],
      category: 'nature'
    },
    // Abstract designs
    {
      id: 'abstract-1',
      name: 'Plasma Energy',
      type: 'background',
      url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800',
      tags: ['plasma', 'energy', 'abstract'],
      category: 'abstract'
    },
    // Cosmic designs
    {
      id: 'cosmic-1',
      name: 'Starry Night',
      type: 'background',
      url: 'https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?auto=format&fit=crop&w=800',
      tags: ['stars', 'night', 'cosmic'],
      category: 'cosmic'
    }
  ]

  const filteredAssets = designAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         asset.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesCategory = selectedCategory === 'all' || asset.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const toggleFavorite = (assetId: string) => {
    if (isLocked) return
    setFavorites(prev => 
      prev.includes(assetId) 
        ? prev.filter(id => id !== assetId)
        : [...prev, assetId]
    )
  }

  const applyDesign = (asset: DesignAsset) => {
    if (isLocked) {
      toast.error('Visual controls are locked')
      return
    }
    
    // Apply the design
    toast.success(`Applied ${asset.name} design`)
    
    // Emit event for background manager
    window.dispatchEvent(new CustomEvent('apply-design', {
      detail: { asset }
    }))
  }

  return (
    <Card className="border-purple-500/20 bg-purple-900/10">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Image className="h-5 w-5" />
          Design Library & Art Studio
        </CardTitle>
        
        {/* Search and filters */}
        <div className="flex flex-col md:flex-row gap-4 mt-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search designs, patterns, textures..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
              disabled={isLocked}
            />
          </div>
          
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3 py-2 rounded-md border bg-background text-foreground"
            disabled={isLocked}
          >
            <option value="all">All Categories</option>
            <option value="neural">Neural/Synaptic</option>
            <option value="nature">Nature</option>
            <option value="abstract">Abstract</option>
            <option value="geometric">Geometric</option>
            <option value="cosmic">Cosmic</option>
          </select>
          
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
              disabled={isLocked}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
              disabled={isLocked}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="art-tools">Art Tools</TabsTrigger>
            <TabsTrigger value="custom">Custom</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gallery" className="space-y-4">
            <div className={`grid gap-4 ${
              viewMode === 'grid' 
                ? 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4' 
                : 'grid-cols-1'
            }`}>
              {filteredAssets.map((asset) => (
                <Card 
                  key={asset.id}
                  className="group cursor-pointer hover:border-purple-500/50 transition-all duration-200"
                  onClick={() => applyDesign(asset)}
                >
                  <div className="relative">
                    <img 
                      src={asset.url}
                      alt={asset.name}
                      className="w-full h-32 object-cover rounded-t-lg"
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(asset.id)
                      }}
                      disabled={isLocked}
                    >
                      <Star 
                        className={`h-4 w-4 ${
                          favorites.includes(asset.id) ? 'fill-yellow-400 text-yellow-400' : ''
                        }`} 
                      />
                    </Button>
                  </div>
                  <CardContent className="p-3">
                    <h4 className="font-semibold text-sm mb-1">{asset.name}</h4>
                    <div className="flex flex-wrap gap-1 mb-2">
                      <Badge variant="secondary" className="text-xs">{asset.type}</Badge>
                      <Badge variant="outline" className="text-xs">{asset.category}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {asset.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-xs text-muted-foreground">#{tag}</span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="art-tools">
            <div className="text-center py-8">
              <Brush className="h-16 w-16 mx-auto mb-4 text-purple-400" />
              <h3 className="text-lg font-semibold mb-2">Advanced Art Tools Coming Soon</h3>
              <p className="text-muted-foreground">
                Canvas editor, brush tools, layer management, and more creative features
              </p>
            </div>
          </TabsContent>
          
          <TabsContent value="custom">
            <div className="space-y-4">
              <div className="flex gap-2">
                <Button disabled={isLocked}>
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Custom Design
                </Button>
                <Button variant="outline" disabled={isLocked}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Current Design
                </Button>
              </div>
              
              <div className="text-center py-8 border-2 border-dashed border-muted rounded-lg">
                <Image className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <p className="text-muted-foreground">
                  Drag and drop your custom designs here or click upload
                </p>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="favorites">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {filteredAssets
                .filter(asset => favorites.includes(asset.id))
                .map((asset) => (
                  <Card 
                    key={asset.id}
                    className="cursor-pointer hover:border-purple-500/50"
                    onClick={() => applyDesign(asset)}
                  >
                    <img 
                      src={asset.url}
                      alt={asset.name}
                      className="w-full h-24 object-cover rounded-t-lg"
                    />
                    <CardContent className="p-2">
                      <h4 className="font-semibold text-xs">{asset.name}</h4>
                    </CardContent>
                  </Card>
                ))}
              
              {favorites.length === 0 && (
                <div className="col-span-full text-center py-8">
                  <Star className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">No favorites yet</p>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
