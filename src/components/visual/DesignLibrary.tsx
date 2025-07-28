
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Search, 
  Download, 
  Heart, 
  Star, 
  Filter, 
  Grid, 
  List,
  Image,
  Palette,
  Sparkles,
  Upload,
  Trash2,
  Eye
} from 'lucide-react'
import { toast } from 'sonner'

export function DesignLibrary() {
  const [searchQuery, setSearchQuery] = useState('')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const designCategories = [
    { id: 'all', name: 'All Designs', count: 156 },
    { id: 'neural', name: 'Neural Art', count: 45 },
    { id: 'nature', name: 'Nature Harmony', count: 32 },
    { id: 'cosmic', name: 'Cosmic Energy', count: 28 },
    { id: 'abstract', name: 'Abstract Forms', count: 31 },
    { id: 'geometric', name: 'Geometric', count: 20 }
  ]

  const featuredDesigns = [
    {
      id: 1,
      name: 'Neural Matrix Flow',
      category: 'neural',
      image: '/lovable-uploads/93093efd-1912-4361-987d-424e6cf8e1df.png',
      likes: 247,
      downloads: 89,
      isPremium: true,
      description: 'Advanced neural network visualization with electric pathways'
    },
    {
      id: 2,
      name: 'Gaia Forest Spirit',
      category: 'nature',
      image: '/lovable-uploads/2ab2dcf8-008f-4f94-9341-9b6fcb25cefb.png',
      likes: 198,
      downloads: 156,
      isPremium: false,
      description: 'Organic forest patterns with mystical energy'
    },
    {
      id: 3,
      name: 'Bioelectric Synapse',
      category: 'neural',
      image: '/lovable-uploads/3ce518f5-75b0-493f-897a-45119793a33d.png',
      likes: 312,
      downloads: 201,
      isPremium: true,
      description: 'Bioelectric neural connections with synaptic fire'
    },
    {
      id: 4,
      name: 'Quantum Harmony',
      category: 'cosmic',
      image: '/lovable-uploads/42ec85dc-42df-4958-96d8-7919a192f629.png',
      likes: 189,
      downloads: 134,
      isPremium: false,
      description: 'Quantum field harmonics with cosmic resonance'
    },
    {
      id: 5,
      name: 'Digital Consciousness',
      category: 'neural',
      image: '/lovable-uploads/1087f396-900a-4e0b-be62-7b049d0294ff.png',
      likes: 278,
      downloads: 167,
      isPremium: true,
      description: 'Digital consciousness emergence visualization'
    },
    {
      id: 6,
      name: 'Electric Dreams',
      category: 'abstract',
      image: '/lovable-uploads/1ed369eb-ecda-422a-af60-8f511aa9aa8e.png',
      likes: 223,
      downloads: 145,
      isPremium: false,
      description: 'Electric dream sequences with neon aesthetics'
    }
  ]

  const filteredDesigns = featuredDesigns.filter(design => {
    const matchesSearch = design.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         design.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || design.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const downloadDesign = (design: any) => {
    toast.success(`🎨 Downloaded "${design.name}" to your collection!`)
  }

  const likeDesign = (design: any) => {
    toast.success(`❤️ Added "${design.name}" to favorites!`)
  }

  const useDesign = (design: any) => {
    toast.success(`✨ Applied "${design.name}" to your canvas!`)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-purple-500/30 bg-purple-900/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-purple-400">
              <Image className="h-6 w-6" />
              🎨 Design Library
              <Badge className="bg-purple-600">156 Designs</Badge>
            </CardTitle>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <Upload className="h-4 w-4 mr-2" />
              Upload Design
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search & Filters */}
          <div className="flex gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search designs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 border-purple-500/30"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
              className="border-purple-500/50"
            >
              {viewMode === 'grid' ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
            </Button>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {designCategories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id
                    ? 'bg-purple-600 hover:bg-purple-700'
                    : 'border-purple-500/50 hover:bg-purple-900/20'
                }`}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Designs Grid */}
      <div className={viewMode === 'grid' 
        ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' 
        : 'space-y-4'
      }>
        {filteredDesigns.map((design) => (
          <Card key={design.id} className="border-green-500/30 bg-green-900/20 hover:scale-105 transition-transform">
            <CardContent className="p-4 space-y-4">
              {/* Design Preview */}
              <div className="aspect-video rounded-lg overflow-hidden border border-green-500/20">
                <img
                  src={design.image}
                  alt={design.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Design Info */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-green-400">{design.name}</h3>
                  {design.isPremium && (
                    <Badge className="bg-yellow-600">
                      <Star className="h-3 w-3 mr-1" />
                      Premium
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">{design.description}</p>
                
                {/* Stats */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Heart className="h-3 w-3" />
                    {design.likes}
                  </div>
                  <div className="flex items-center gap-1">
                    <Download className="h-3 w-3" />
                    {design.downloads}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2">
                <Button 
                  onClick={() => useDesign(design)}
                  className="flex-1 bg-green-600 hover:bg-green-700"
                >
                  <Sparkles className="h-4 w-4 mr-2" />
                  Use Design
                </Button>
                <Button
                  variant="outline"
                  onClick={() => likeDesign(design)}
                  className="border-green-500/50"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => downloadDesign(design)}
                  className="border-green-500/50"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* No Results */}
      {filteredDesigns.length === 0 && (
        <Card className="border-gray-500/30 bg-gray-900/20">
          <CardContent className="text-center py-12">
            <Image className="h-16 w-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-bold text-gray-400 mb-2">No designs found</h3>
            <p className="text-muted-foreground">
              Try adjusting your search or category filters
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
