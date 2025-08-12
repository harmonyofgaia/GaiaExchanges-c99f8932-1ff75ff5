
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Edit, 
  Trash2, 
  Share2, 
  Download, 
  Upload, 
  Eye, 
  Settings,
  Copy,
  Heart,
  Star,
  Globe
} from 'lucide-react'
import { toast } from 'sonner'

interface Landscape {
  id: string
  name: string
  type: string
  thumbnail: string
  size: string
  lastModified: string
  isPublic: boolean
  likes: number
  downloads: number
  rating: number
}

export function MyLandscapeManager() {
  const [landscapes, setLandscapes] = useState<Landscape[]>([])
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('all')

  useEffect(() => {
    // Mock data - in real app this would come from API/database
    const mockLandscapes: Landscape[] = [
      {
        id: '1',
        name: 'Epic Mountain Range',
        type: 'mountain',
        thumbnail: '🏔️',
        size: '50km²',
        lastModified: '2024-01-15',
        isPublic: true,
        likes: 847,
        downloads: 234,
        rating: 4.8
      },
      {
        id: '2',
        name: 'Underwater Paradise',
        type: 'ocean',
        thumbnail: '🌊',
        size: '75km²',
        lastModified: '2024-01-12',
        isPublic: false,
        likes: 1203,
        downloads: 567,
        rating: 4.9
      },
      {
        id: '3',
        name: 'Enchanted Forest',
        type: 'forest',
        thumbnail: '🌲',
        size: '30km²',
        lastModified: '2024-01-10',
        isPublic: true,
        likes: 692,
        downloads: 189,
        rating: 4.7
      },
      {
        id: '4',
        name: 'Desert Kingdom',
        type: 'desert',
        thumbnail: '🏜️',
        size: '85km²',
        lastModified: '2024-01-08',
        isPublic: true,
        likes: 445,
        downloads: 123,
        rating: 4.5
      }
    ]
    setLandscapes(mockLandscapes)
  }, [])

  const filteredLandscapes = landscapes.filter(landscape => {
    const matchesSearch = landscape.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'all' || landscape.type === filterType
    return matchesSearch && matchesType
  })

  const editLandscape = (id: string) => {
    toast.success('🎨 Opening Landscape Editor!', {
      description: 'Loading advanced editing tools...',
      duration: 3000
    })
  }

  const deleteLandscape = (id: string) => {
    setLandscapes(prev => prev.filter(l => l.id !== id))
    toast.success('🗑️ Landscape Deleted!', {
      description: 'Your landscape has been removed.',
      duration: 3000
    })
  }

  const togglePublic = (id: string) => {
    setLandscapes(prev => prev.map(l => 
      l.id === id ? { ...l, isPublic: !l.isPublic } : l
    ))
    toast.success('🌍 Visibility Updated!', {
      description: 'Landscape sharing settings changed.',
      duration: 3000
    })
  }

  return (
    <Card className="border-purple-500/30 bg-purple-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Settings className="h-6 w-6" />
          🏞️ My Landscape Collection
        </CardTitle>
        <p className="text-muted-foreground">
          Manage, edit, and share your created landscapes
        </p>
      </CardHeader>
      <CardContent className="space-y-6">
        
        {/* Search and Filter Controls */}
        <div className="flex flex-col md:flex-row gap-4">
          <Input
            placeholder="Search your landscapes..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <select 
            value={filterType} 
            onChange={(e) => setFilterType(e.target.value)}
            className="px-3 py-2 bg-background border border-input rounded-md"
          >
            <option value="all">All Types</option>
            <option value="mountain">Mountains</option>
            <option value="ocean">Oceans</option>
            <option value="forest">Forests</option>
            <option value="desert">Deserts</option>
          </select>
        </div>

        {/* Landscape Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLandscapes.map((landscape) => (
            <Card key={landscape.id} className="border-blue-500/20 bg-blue-900/10">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-2xl">{landscape.thumbnail}</div>
                    <div>
                      <h4 className="font-bold text-blue-400">{landscape.name}</h4>
                      <p className="text-xs text-muted-foreground">{landscape.size}</p>
                    </div>
                  </div>
                  <Badge className={landscape.isPublic ? 'bg-green-600' : 'bg-gray-600'}>
                    {landscape.isPublic ? 'Public' : 'Private'}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                
                {/* Stats */}
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <Heart className="h-3 w-3 text-red-400" />
                      <span className="text-sm text-red-400">{landscape.likes}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <Download className="h-3 w-3 text-blue-400" />
                      <span className="text-sm text-blue-400">{landscape.downloads}</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400" />
                      <span className="text-sm text-yellow-400">{landscape.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-2">
                  <Button 
                    onClick={() => editLandscape(landscape.id)}
                    size="sm" 
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    Edit
                  </Button>
                  <Button 
                    onClick={() => togglePublic(landscape.id)}
                    size="sm" 
                    variant="outline"
                  >
                    <Globe className="h-3 w-3 mr-1" />
                    {landscape.isPublic ? 'Make Private' : 'Make Public'}
                  </Button>
                </div>
                
                <div className="grid grid-cols-3 gap-1">
                  <Button size="sm" variant="ghost">
                    <Eye className="h-3 w-3" />
                  </Button>
                  <Button size="sm" variant="ghost">
                    <Copy className="h-3 w-3" />
                  </Button>
                  <Button 
                    onClick={() => deleteLandscape(landscape.id)}
                    size="sm" 
                    variant="ghost" 
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>

                <div className="text-xs text-muted-foreground">
                  Modified: {landscape.lastModified}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredLandscapes.length === 0 && (
          <div className="text-center py-8">
            <div className="text-4xl mb-4">🌍</div>
            <h3 className="text-lg font-bold text-muted-foreground mb-2">No landscapes found</h3>
            <p className="text-muted-foreground">Create your first landscape to get started!</p>
          </div>
        )}

        {/* Import/Export Tools */}
        <Card className="border-green-500/20 bg-green-900/10">
          <CardHeader>
            <CardTitle className="text-green-400">🔄 Import & Export Tools</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-4">
            <Button className="bg-green-600 hover:bg-green-700">
              <Upload className="h-4 w-4 mr-2" />
              Import Landscape
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="h-4 w-4 mr-2" />
              Export All
            </Button>
          </CardContent>
        </Card>

      </CardContent>
    </Card>
  )
}
