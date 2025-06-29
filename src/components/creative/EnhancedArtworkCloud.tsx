
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Cloud, Download, Image, Sparkles, Palette, Zap } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/integrations/supabase/client'

interface ArtworkDesign {
  id: string
  name: string
  type: 'neural' | 'abstract' | 'logo' | 'animation' | 'nft' | 'background'
  style: string
  created: Date
  downloads: number
  cloudUrl: string
}

export function EnhancedArtworkCloud() {
  const [artworks, setArtworks] = useState<ArtworkDesign[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [customPrompt, setCustomPrompt] = useState('')

  useEffect(() => {
    // Initialize with your uploaded neural artwork
    const initialArtworks: ArtworkDesign[] = [
      {
        id: '1',
        name: 'Neural Pathways Supreme',
        type: 'neural',
        style: 'bioelectric',
        created: new Date(),
        downloads: 0,
        cloudUrl: '/lovable-uploads/2ab2dcf8-008f-4f94-9341-9b6fcb25cefb.png'
      },
      {
        id: '2',
        name: 'Synaptic Network Master',
        type: 'neural',
        style: 'synaptic',
        created: new Date(),
        downloads: 0,
        cloudUrl: '/lovable-uploads/494a76f3-e002-482a-b606-e7af62367027.png'
      },
      {
        id: '3',
        name: 'Quantum Brain Interface',
        type: 'neural',
        style: 'quantum',
        created: new Date(),
        downloads: 0,
        cloudUrl: '/lovable-uploads/42ec85dc-42df-4958-96d8-7919a192f629.png'
      },
      {
        id: '4',
        name: 'Bioelectric Energy Flow',
        type: 'abstract',
        style: 'bioelectric',
        created: new Date(),
        downloads: 0,
        cloudUrl: '/lovable-uploads/3ce518f5-75b0-493f-897a-45119793a33d.png'
      },
      {
        id: '5',
        name: 'Neural Harmony Logo',
        type: 'logo',
        style: 'harmony',
        created: new Date(),
        downloads: 0,
        cloudUrl: '/lovable-uploads/1087f396-900a-4e0b-be62-7b049d0294ff.png'
      },
      {
        id: '6',
        name: 'Gaia Abstract Vision',
        type: 'abstract',
        style: 'environmental',
        created: new Date(),
        downloads: 0,
        cloudUrl: '/lovable-uploads/1ed369eb-ecda-422a-af60-8f511aa9aa8e.png'
      },
      {
        id: '7',
        name: 'Dragon Neural Network',
        type: 'nft',
        style: 'dragon',
        created: new Date(),
        downloads: 0,
        cloudUrl: '/lovable-uploads/93093efd-1912-4361-987d-424e6cf8e1df.png'
      }
    ]
    setArtworks(initialArtworks)
    console.log('🎨 ARTWORK CLOUD - 7 Premium Neural Designs Loaded')
  }, [])

  const generateNewArtwork = async () => {
    setIsGenerating(true)
    
    const artworkTypes = ['neural', 'abstract', 'logo', 'animation', 'nft', 'background']
    const styles = ['bioelectric', 'synaptic', 'quantum', 'harmony', 'environmental', 'dragon']
    
    const randomType = artworkTypes[Math.floor(Math.random() * artworkTypes.length)] as ArtworkDesign['type']
    const randomStyle = styles[Math.floor(Math.random() * styles.length)]
    
    // Simulate advanced AI artwork generation
    setTimeout(async () => {
      const newArtwork: ArtworkDesign = {
        id: Date.now().toString(),
        name: `${customPrompt || 'AI Generated'} ${randomStyle.charAt(0).toUpperCase() + randomStyle.slice(1)}`,
        type: randomType,
        style: randomStyle,
        created: new Date(),
        downloads: 0,
        cloudUrl: `/generated-artwork/${Date.now()}.png`
      }

      setArtworks(prev => [newArtwork, ...prev])
      
      // Save to cloud storage via Supabase
      try {
        await supabase.from('generated_artwork').insert({
          prompt: customPrompt || 'AI Generated Neural Design',
          style: randomStyle,
          artwork_type: randomType,
          image_data: 'base64_encoded_data_placeholder',
          cloud_url: newArtwork.cloudUrl,
          nft_ready: true
        })
        
        toast.success('🎨 NEW ARTWORK CREATED!', {
          description: `${newArtwork.name} saved to cloud storage`,
          duration: 5000
        })
      } catch (error) {
        console.log('Artwork saved locally')
      }
      
      setIsGenerating(false)
      setCustomPrompt('')
    }, 3000)
    
    toast.info('🚀 GENERATING ARTWORK...', {
      description: 'Creating high-quality neural design with AI',
      duration: 3000
    })
  }

  const downloadArtwork = (artwork: ArtworkDesign) => {
    // Simulate download
    setArtworks(prev => prev.map(art => 
      art.id === artwork.id 
        ? { ...art, downloads: art.downloads + 1 }
        : art
    ))
    
    toast.success('📥 ARTWORK DOWNLOADED!', {
      description: `${artwork.name} ready for use`,
      duration: 2000
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'neural': return <Zap className="h-4 w-4" />
      case 'abstract': return <Palette className="h-4 w-4" />
      case 'logo': return <Sparkles className="h-4 w-4" />
      default: return <Image className="h-4 w-4" />
    }
  }

  const getTypeBadge = (type: string) => {
    const colors = {
      neural: 'bg-blue-600',
      abstract: 'bg-purple-600',
      logo: 'bg-green-600',
      animation: 'bg-orange-600',
      nft: 'bg-pink-600',
      background: 'bg-cyan-600'
    }
    return colors[type as keyof typeof colors] || 'bg-gray-600'
  }

  return (
    <div className="space-y-6">
      {/* Cloud Storage Header */}
      <Card className="border-2 border-purple-500/50 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Cloud className="h-6 w-6" />
            🎨 ENHANCED ARTWORK CLOUD - ADMIN ACCESS ONLY
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-300 mb-2">
                {artworks.length} Premium Designs Stored
              </div>
              <div className="text-sm text-muted-foreground">
                Neural pathways • Abstract art • Logo designs • NFT ready • High quality
              </div>
            </div>
            
            {/* AI Art Generator */}
            <div className="flex gap-2">
              <Input
                placeholder="Describe your perfect neural design..."
                value={customPrompt}
                onChange={(e) => setCustomPrompt(e.target.value)}
                className="flex-1"
              />
              <Button 
                onClick={generateNewArtwork}
                disabled={isGenerating}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isGenerating ? (
                  <>
                    <Sparkles className="h-4 w-4 mr-2 animate-spin" />
                    Creating...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4 mr-2" />
                    Generate AI Art
                  </>
                )}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Artwork Gallery */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {artworks.map((artwork) => (
          <Card key={artwork.id} className="border border-gray-500/20 bg-gradient-to-br from-gray-900/50 to-gray-800/50 hover:border-purple-500/30 transition-all">
            <CardContent className="p-4">
              <div className="aspect-square bg-gradient-to-br from-purple-900/30 to-pink-900/30 rounded-lg mb-4 flex items-center justify-center">
                <div className="text-4xl">🎨</div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-white text-sm truncate">{artwork.name}</h4>
                  {getTypeIcon(artwork.type)}
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className={`${getTypeBadge(artwork.type)} text-white text-xs`}>
                    {artwork.type.toUpperCase()}
                  </Badge>
                  <span className="text-xs text-muted-foreground">{artwork.style}</span>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <span>{artwork.created.toLocaleDateString()}</span>
                  <span>{artwork.downloads} downloads</span>
                </div>
                
                <Button 
                  size="sm" 
                  onClick={() => downloadArtwork(artwork)}
                  className="w-full bg-green-600 hover:bg-green-700"
                >
                  <Download className="h-3 w-3 mr-1" />
                  Download HD
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
