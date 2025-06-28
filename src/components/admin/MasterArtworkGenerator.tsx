
import { useState, useEffect, useRef } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { 
  Palette, 
  Download, 
  Sparkles, 
  Timer, 
  Image as ImageIcon,
  Wand2,
  Zap,
  Crown,
  Star,
  RefreshCw
} from 'lucide-react'
import { toast } from 'sonner'
import { ArtworkUploadProcessor } from './ArtworkUploadProcessor'
import { Creative3DTools } from '../creative/Creative3DTools'
import { FuturisticAnimationStudio } from '../creative/FuturisticAnimationStudio'

interface GeneratedArtwork {
  id: string
  prompt: string
  artwork_type: string
  style: string
  image_data: string
  generated_at: string
  downloads: number
  nft_ready: boolean
}

export function MasterArtworkGenerator() {
  const [artworks, setArtworks] = useState<GeneratedArtwork[]>([])
  const [isGenerating, setIsGenerating] = useState(false)
  const [autoGenerate, setAutoGenerate] = useState(true)
  const [selectedStyle, setSelectedStyle] = useState('abstract')
  const [nextUpdateIn, setNextUpdateIn] = useState(300) // 5 minutes
  const [totalGenerated, setTotalGenerated] = useState(0)
  const [bestArtwork, setBestArtwork] = useState<GeneratedArtwork | null>(null)
  
  const intervalRef = useRef<NodeJS.Timeout>()
  const countdownRef = useRef<NodeJS.Timeout>()

  // Base prompts inspired by user's uploaded nature images
  const basePrompts = [
    "serene mountain landscape with crystal clear waters, harmony of nature",
    "mystical forest with golden sunlight filtering through ancient trees",
    "peaceful ocean waves meeting sandy shore at sunset",
    "majestic mountain peaks reaching toward infinite sky",
    "tranquil lake reflecting perfect mirror of surrounding wilderness",
    "vibrant wildflower meadow dancing in gentle morning breeze",
    "ethereal waterfall cascading through lush green paradise",
    "cosmic night sky filled with brilliant stars above natural landscape"
  ]

  const artworkTypes = [
    { value: 'abstract', label: '🎨 Abstract Fusion' },
    { value: 'nature_fusion', label: '🌿 Nature Fusion' },
    { value: 'cosmic', label: '🌌 Cosmic Art' },
    { value: 'geometric', label: '📐 Geometric' },
    { value: 'fluid', label: '🌊 Fluid Art' }
  ]

  useEffect(() => {
    loadExistingArtworks()
    if (autoGenerate) {
      startAutoGeneration()
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
      if (countdownRef.current) clearInterval(countdownRef.current)
    }
  }, [autoGenerate])

  const loadExistingArtworks = async () => {
    try {
      // Since the database table doesn't exist in types yet, we'll simulate data
      const mockArtworks: GeneratedArtwork[] = []
      setArtworks(mockArtworks)
      setTotalGenerated(mockArtworks.length)
      
      if (mockArtworks.length > 0) {
        const best = mockArtworks.reduce((prev, current) => 
          (prev.downloads > current.downloads) ? prev : current
        )
        setBestArtwork(best)
      }
    } catch (error) {
      console.error('Error loading artworks:', error)
    }
  }

  const generateNewArtwork = async () => {
    setIsGenerating(true)
    try {
      const randomPrompt = basePrompts[Math.floor(Math.random() * basePrompts.length)]
      
      const response = await fetch('/functions/v1/generate-artwork', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          basePrompt: randomPrompt,
          artworkType: selectedStyle,
          style: 'masterpiece'
        })
      })

      const result = await response.json()
      
      if (result.success) {
        // Add the new artwork to our local state
        const newArtwork: GeneratedArtwork = {
          id: result.artwork_id || `artwork-${Date.now()}`,
          prompt: randomPrompt,
          artwork_type: selectedStyle,
          style: 'masterpiece',
          image_data: result.image,
          generated_at: new Date().toISOString(),
          downloads: 0,
          nft_ready: true
        }
        
        setArtworks(prev => [newArtwork, ...prev])
        setTotalGenerated(prev => prev + 1)

        // Save to cloud storage and send email
        try {
          const cloudResponse = await fetch('/functions/v1/save-artwork-to-cloud', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              artworkId: newArtwork.id,
              imageData: result.image,
              artworkType: selectedStyle,
              prompt: randomPrompt
            })
          })

          const cloudResult = await cloudResponse.json()
          
          if (cloudResult.success) {
            toast.success('🎨 Artwork Saved to Cloud!', {
              description: `Generated and sent to info@cultureofharmony.net with download link`,
              duration: 6000
            })
          }
        } catch (cloudError) {
          console.error('Cloud save error:', cloudError)
          toast.warning('⚠️ Artwork generated but cloud save failed', {
            description: 'Check your connection and try again'
          })
        }
        
        toast.success('🎨 New Masterpiece Created!', {
          description: `Abstract artwork generated with ${selectedStyle} style`,
          duration: 4000
        })
      }
    } catch (error) {
      console.error('Generation error:', error)
      toast.error('Generation failed', {
        description: 'Please check your Hugging Face API connection'
      })
    }
    setIsGenerating(false)
  }

  const startAutoGeneration = () => {
    // Generate every 5 minutes
    intervalRef.current = setInterval(() => {
      if (autoGenerate) {
        generateNewArtwork()
      }
    }, 300000) // 5 minutes

    // Countdown timer
    countdownRef.current = setInterval(() => {
      setNextUpdateIn(prev => {
        if (prev <= 1) {
          return 300 // Reset to 5 minutes
        }
        return prev - 1
      })
    }, 1000)
  }

  const downloadArtwork = async (artwork: GeneratedArtwork) => {
    try {
      // Update download count locally
      setArtworks(prev => prev.map(art => 
        art.id === artwork.id 
          ? { ...art, downloads: art.downloads + 1 }
          : art
      ))

      // Create download link
      const link = document.createElement('a')
      link.href = artwork.image_data
      link.download = `harmony-gaia-artwork-${artwork.id}.png`
      link.click()

      toast.success('🎨 Artwork Downloaded!', {
        description: 'Perfect for NFT minting or selling'
      })
    } catch (error) {
      console.error('Download error:', error)
    }
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="space-y-6">
      <ArtworkUploadProcessor />
      
      <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-purple-300">
            <Crown className="h-8 w-8 animate-pulse text-yellow-400" />
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
                Master Artwork Generator
              </div>
              <div className="text-sm font-normal text-purple-400">
                AI-Powered Abstract Art Creation - Harmony of Gaia Collection
              </div>
            </div>
            <Sparkles className="h-6 w-6 text-pink-400 animate-bounce" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-purple-400">{totalGenerated}</div>
              <div className="text-sm text-muted-foreground">Artworks Created</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-pink-400">
                {autoGenerate ? formatTime(nextUpdateIn) : 'Paused'}
              </div>
              <div className="text-sm text-muted-foreground">Next Generation</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-yellow-400">
                {artworks.reduce((sum, art) => sum + (art.downloads || 0), 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Downloads</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-green-400">100%</div>
              <div className="text-sm text-muted-foreground">NFT Ready</div>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-6">
            <Select value={selectedStyle} onValueChange={setSelectedStyle}>
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {artworkTypes.map(type => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              onClick={generateNewArtwork}
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Creating Art...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Now
                </>
              )}
            </Button>

            <Button
              onClick={() => setAutoGenerate(!autoGenerate)}
              variant={autoGenerate ? "destructive" : "default"}
            >
              <Timer className="h-4 w-4 mr-2" />
              Auto: {autoGenerate ? 'ON' : 'OFF'}
            </Button>
          </div>

          {isGenerating && (
            <div className="mb-6">
              <Progress value={75} className="h-3" />
              <p className="text-sm text-center mt-2 text-purple-300">
                Creating abstract masterpiece with AI...
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="gallery" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="gallery">🎨 Gallery</TabsTrigger>
          <TabsTrigger value="3d-tools">🛠️ 3D Tools</TabsTrigger>
          <TabsTrigger value="animations">🎬 Animations</TabsTrigger>
          <TabsTrigger value="best">⭐ Best</TabsTrigger>
          <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="gallery" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {artworks.map((artwork) => (
              <Card key={artwork.id} className="border border-purple-500/20 bg-gradient-to-br from-purple-900/10 to-pink-900/10">
                <CardContent className="p-4">
                  <div className="aspect-square rounded-lg overflow-hidden mb-3">
                    <img 
                      src={artwork.image_data} 
                      alt="Generated Artwork"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-purple-600 text-white">
                        {artwork.artwork_type}
                      </Badge>
                      <Badge className="bg-green-600 text-white">
                        NFT Ready
                      </Badge>
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2">
                      {artwork.prompt}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-purple-400">
                        Downloads: {artwork.downloads || 0}
                      </span>
                      <Button
                        size="sm"
                        onClick={() => downloadArtwork(artwork)}
                        className="bg-gradient-to-r from-purple-600 to-pink-600"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="3d-tools" className="space-y-4">
          <Creative3DTools />
        </TabsContent>

        <TabsContent value="animations" className="space-y-4">
          <FuturisticAnimationStudio />
        </TabsContent>

        <TabsContent value="best" className="space-y-4">
          {bestArtwork && (
            <Card className="border-2 border-yellow-500/50 bg-gradient-to-br from-yellow-900/20 to-orange-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-yellow-400">
                  <Star className="h-5 w-5" />
                  Most Popular Artwork
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="aspect-square rounded-lg overflow-hidden">
                    <img 
                      src={bestArtwork.image_data} 
                      alt="Best Artwork"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-xl font-bold text-yellow-400 mb-2">
                        {bestArtwork.artwork_type} Masterpiece
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {bestArtwork.prompt}
                      </p>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Downloads:</span>
                        <span className="font-bold text-yellow-400">{bestArtwork.downloads}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Generated:</span>
                        <span>{new Date(bestArtwork.generated_at).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <Button
                      onClick={() => downloadArtwork(bestArtwork)}
                      className="w-full bg-gradient-to-r from-yellow-600 to-orange-600"
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Download Best Artwork
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Artwork Generation Analytics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {artworkTypes.map(type => {
                  const count = artworks.filter(art => art.artwork_type === type.value).length
                  return (
                    <div key={type.value} className="text-center space-y-2">
                      <div className="text-2xl font-bold text-purple-400">{count}</div>
                      <div className="text-xs text-muted-foreground">{type.label}</div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
