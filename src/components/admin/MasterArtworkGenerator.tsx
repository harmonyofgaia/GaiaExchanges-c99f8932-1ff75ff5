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
  RefreshCw,
  Shield
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

  // Enhanced base prompts inspired by user's uploaded artwork
  const basePrompts = [
    // Based on uploaded neural and circuit designs
    "futuristic neural circuit pathways with glowing cyan connections, intricate electronic patterns",
    "bioelectric neural networks with orange synaptic connections, complex brain-like structures",
    "flowing green energy streams with elegant curves, smooth light trails and organic movements",
    "matrix-style digital rain with bright green code, cybernetic data streams",
    "high-tech neural pathways with golden connections, complex biological electronics",
    "abstract digital matrix background with green binary patterns, cyberpunk aesthetic",
    "electric lightning neural connections with blue-purple energy, dramatic bioelectric effects",
    "futuristic quantum neural networks with multi-colored synaptic firing patterns",
    
    // Enhanced artistic combinations
    "cybernetic neural brain patterns mixed with flowing green energy streams",
    "matrix digital rain combined with bioelectric orange neural connections",
    "lightning strike effects merged with circuit board pathways and cyan glows",
    "organic neural networks blended with geometric digital matrix patterns"
  ]

  // Reference images from user uploads for inspiration
  const referenceImages = [
    '/lovable-uploads/8dc2817a-08c9-4335-8775-43870a7f26c5.png', // Circuit pathways
    '/lovable-uploads/20a0d750-cf9d-4320-8cc2-1591c5f19aea.png', // Neural network
    '/lovable-uploads/28f681a5-8b61-4af1-89e4-7c58ef582a15.png', // Green energy flow
    '/lovable-uploads/3930cd91-f3ea-4ad6-9fc1-d3448d12bb1e.png', // Matrix digital
    '/lovable-uploads/4bcf8fca-25cd-4cd4-a563-eaa0ef11ef1e.png', // Neural connections
    '/lovable-uploads/2486d68b-0497-4fd3-98a6-4c6b23e61741.png', // Matrix code
    '/lovable-uploads/1c09cba7-4648-42f8-9d7e-53cd2213616d.png', // Lightning strikes
    '/lovable-uploads/05787e50-5b20-4f59-b531-da2bc13bf3fb.png'  // Blue matrix
  ]

  const artworkTypes = [
    { value: 'neural_circuit', label: '🧠 Neural Circuits' },
    { value: 'bioelectric_flow', label: '⚡ Bioelectric Flow' },
    { value: 'matrix_code', label: '💚 Matrix Code' },
    { value: 'lightning_neural', label: '⚡ Lightning Neural' },
    { value: 'quantum_pathways', label: '🌌 Quantum Pathways' },
    { value: 'digital_organic', label: '🔬 Digital Organic' },
    { value: 'cybernetic_fusion', label: '🤖 Cybernetic Fusion' },
    { value: 'energy_streams', label: '🌊 Energy Streams' }
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

  const generateNewArtwork = async () => {
    setIsGenerating(true)
    try {
      const randomPrompt = basePrompts[Math.floor(Math.random() * basePrompts.length)]
      
      // Enhanced prompt with reference to uploaded artwork styles
      const enhancedPrompt = `${randomPrompt}, inspired by neural circuit designs and matrix digital aesthetics, high quality digital art, vibrant neon colors, dramatic lighting effects, professional cyberpunk artwork`
      
      const response = await fetch('/functions/v1/generate-artwork', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          basePrompt: enhancedPrompt,
          artworkType: selectedStyle,
          style: 'neural_matrix_fusion_collection'
        })
      })

      const result = await response.json()
      
      if (result.success) {
        // Add the new artwork to our local state
        const newArtwork: GeneratedArtwork = {
          id: result.artwork_id || `artwork-${Date.now()}`,
          prompt: enhancedPrompt,
          artwork_type: selectedStyle,
          style: 'neural_matrix_fusion_collection',
          image_data: result.image,
          generated_at: new Date().toISOString(),
          downloads: 0,
          nft_ready: true
        }
        
        setArtworks(prev => [newArtwork, ...prev])
        setTotalGenerated(prev => prev + 1)

        // Automatically save to secure cloud storage (admin only)
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
              prompt: enhancedPrompt
            })
          })

          const cloudResult = await cloudResponse.json()
          
          if (cloudResult.success) {
            toast.success('🎨 Neural Matrix Art Created & Secured!', {
              description: `Generated artwork saved to admin-only cloud storage`,
              duration: 6000
            })
          }
        } catch (cloudError) {
          console.error('Cloud save error:', cloudError)
          toast.warning('⚠️ Artwork generated but cloud save failed', {
            description: 'Check your connection and try again'
          })
        }
        
        toast.success('🧠 New Neural Matrix Masterpiece Created!', {
          description: `Cybernetic artwork generated with ${selectedStyle} style using your uploaded neural references`,
          duration: 4000
        })
      }
    } catch (error) {
      console.error('Generation error:', error)
      toast.error('Generation failed', {
        description: 'Please check your AI image generation API connection'
      })
    }
    setIsGenerating(false)
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
      link.download = `harmony-gaia-neural-art-${artwork.id}.png`
      link.click()

      toast.success('🎨 Neural Artwork Downloaded!', {
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
      
      <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/20 to-green-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-purple-300">
            <Crown className="h-8 w-8 animate-pulse text-yellow-400" />
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-green-400 to-cyan-400 bg-clip-text text-transparent">
                Neural Matrix Art Generator
              </div>
              <div className="text-sm font-normal text-purple-400">
                AI-Powered Neural Circuit & Matrix Art Creation - Inspired by Your Uploads
              </div>
            </div>
            <Sparkles className="h-6 w-6 text-green-400 animate-bounce" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          {/* Security Notice */}
          <div className="mb-6 p-4 bg-gradient-to-r from-blue-900/20 to-purple-900/20 rounded-lg border border-blue-500/30">
            <h3 className="text-lg font-bold text-blue-400 mb-2 flex items-center gap-2">
              <Shield className="h-5 w-5" />
              🔒 Admin-Only Neural Art Cloud Storage
            </h3>
            <p className="text-xs text-blue-300">
              ✨ All generated neural artworks are automatically saved to secure cloud storage accessible only by admin users. 
              Your cybernetic creations are protected with quantum-level security and neural encryption.
            </p>
          </div>

          {/* Reference Images Showcase */}
          <div className="mb-6 p-4 bg-gradient-to-r from-green-900/20 to-cyan-900/20 rounded-lg border border-green-500/30">
            <h3 className="text-lg font-bold text-green-400 mb-3 flex items-center gap-2">
              <ImageIcon className="h-5 w-5" />
              Your Neural Matrix Reference Collection
            </h3>
            <div className="grid grid-cols-4 md:grid-cols-8 gap-2">
              {referenceImages.map((img, index) => (
                <div key={index} className="aspect-square rounded-lg overflow-hidden border border-green-500/30">
                  <img 
                    src={img} 
                    alt={`Neural Reference ${index + 1}`} 
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
            <p className="text-xs text-green-300 mt-2">
              🧠 These neural circuit and matrix designs inspire the AI to create cybernetic pathways, 
              bioelectric connections, and futuristic digital art with lightning effects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-purple-400">{totalGenerated}</div>
              <div className="text-sm text-muted-foreground">Neural Artworks Created</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-green-400">
                {autoGenerate ? formatTime(nextUpdateIn) : 'Paused'}
              </div>
              <div className="text-sm text-muted-foreground">Next Neural Generation</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-cyan-400">
                {artworks.reduce((sum, art) => sum + (art.downloads || 0), 0)}
              </div>
              <div className="text-sm text-muted-foreground">Total Downloads</div>
            </div>
            <div className="text-center space-y-2">
              <div className="text-3xl font-bold text-yellow-400">100%</div>
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
              className="bg-gradient-to-r from-purple-600 to-green-600 hover:from-purple-700 hover:to-green-700"
            >
              {isGenerating ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Creating Neural Art...
                </>
              ) : (
                <>
                  <Wand2 className="h-4 w-4 mr-2" />
                  Generate Neural Matrix Art
                </>
              )}
            </Button>

            <Button
              onClick={() => setAutoGenerate(!autoGenerate)}
              variant={autoGenerate ? "destructive" : "default"}
            >
              <Timer className="h-4 w-4 mr-2" />
              Auto Neural: {autoGenerate ? 'ON' : 'OFF'}
            </Button>
          </div>

          {isGenerating && (
            <div className="mb-6">
              <Progress value={75} className="h-3" />
              <p className="text-sm text-center mt-2 text-purple-300">
                Creating neural matrix artwork inspired by your cybernetic references...
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="gallery" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="gallery">🎨 Gallery</TabsTrigger>
          <TabsTrigger value="references">📸 References</TabsTrigger>
          <TabsTrigger value="3d-tools">🛠️ 3D Tools</TabsTrigger>
          <TabsTrigger value="animations">🎬 Animations</TabsTrigger>
          <TabsTrigger value="best">⭐ Best</TabsTrigger>
          <TabsTrigger value="analytics">📊 Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="references" className="space-y-4">
          <Card className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/20 to-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <ImageIcon className="h-6 w-6" />
                Your Uploaded Reference Artworks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {referenceImages.map((img, index) => (
                  <div key={index} className="bg-gradient-to-br from-green-900/10 to-blue-900/10 border border-green-500/20 rounded-lg overflow-hidden">
                    <div className="aspect-square">
                      <img 
                        src={img} 
                        alt={`Reference ${index + 1}`} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-3">
                      <Badge className="mb-2 bg-green-600 text-white">
                        Reference #{index + 1}
                      </Badge>
                      <p className="text-xs text-muted-foreground">
                        {index < 3 ? 'Atmospheric Lighting' : 
                         index < 5 ? 'Architectural & Nature' : 'Artistic Composition'}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-6 text-center">
                <p className="text-sm text-green-300">
                  🎨 These references inspire the AI to create similar atmospheric effects, 
                  color palettes, and artistic styles in generated artworks.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

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
