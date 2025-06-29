
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Download, Sparkles, Zap, Star, Palette } from 'lucide-react'
import { toast } from 'sonner'

interface Illustration {
  id: string
  title: string
  description: string
  imageUrl: string
  style: string
  tags: string[]
  downloads: number
}

export function CommunityIllustrations() {
  const [illustrations, setIllustrations] = useState<Illustration[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const neuralArtStyles = [
    {
      name: 'Synaptic Flow',
      description: 'Inspired by neural connections and electrical impulses',
      baseImage: '/lovable-uploads/2ab2dcf8-008f-4f94-9341-9b6fcb25cefb.png'
    },
    {
      name: 'Bioelectric Dreams',
      description: 'Organic neural networks with warm electrical activity',
      baseImage: '/lovable-uploads/494a76f3-e002-482a-b606-e7af62367027.png'
    },
    {
      name: 'Neural Symphony',
      description: 'Red and blue neural pathways creating harmonious patterns',
      baseImage: '/lovable-uploads/93093efd-1912-4361-987d-424e6cf8e1df.png'
    },
    {
      name: 'Quantum Neurons',
      description: 'Blue-dominant neural networks with quantum effects',
      baseImage: '/lovable-uploads/42ec85dc-42df-4958-96d8-7919a192f629.png'
    },
    {
      name: 'Living Circuits',
      description: 'Green and pink neural pathways resembling living technology',
      baseImage: '/lovable-uploads/3ce518f5-75b0-493f-897a-45119793a33d.png'
    },
    {
      name: 'Cosmic Connections',
      description: 'Purple neural networks extending into cosmic space',
      baseImage: '/lovable-uploads/1087f396-900a-4e0b-be62-7b049d0294ff.png'
    },
    {
      name: 'Electric Harmony',
      description: 'Colorful neural pathways with electrical harmonics',
      baseImage: '/lovable-uploads/1ed369eb-ecda-422a-af60-8f511aa9aa8e.png'
    }
  ]

  useEffect(() => {
    // Load existing community illustrations
    const mockIllustrations: Illustration[] = neuralArtStyles.map((style, index) => ({
      id: `neural-art-${index}`,
      title: style.name,
      description: style.description,
      imageUrl: style.baseImage,
      style: 'Neural Network Art',
      tags: ['Neural', 'Abstract', 'Community', 'High-Quality'],
      downloads: Math.floor(Math.random() * 500) + 100
    }))
    
    setIllustrations(mockIllustrations)
  }, [])

  const generateNewIllustration = async () => {
    setIsGenerating(true)
    
    try {
      // Generate new artwork inspired by neural themes
      const response = await fetch('/functions/v1/generate-artwork', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          basePrompt: 'High-quality neural network illustration inspired by synaptic connections, bioelectric patterns, and quantum neural pathways, vibrant colors, professional digital art, community artwork',
          artworkType: 'community_illustration',
          style: 'neural_inspired_masterpiece'
        })
      })

      const result = await response.json()
      
      if (result.success) {
        const newIllustration: Illustration = {
          id: `community-${Date.now()}`,
          title: 'Generated Neural Art',
          description: 'AI-generated illustration inspired by neural pathways',
          imageUrl: result.image,
          style: 'Neural Community Art',
          tags: ['Generated', 'Neural', 'Community', 'AI-Art'],
          downloads: 0
        }
        
        setIllustrations(prev => [newIllustration, ...prev])
        
        // Save to cloud storage
        try {
          await fetch('/functions/v1/save-artwork-to-cloud', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              artworkId: newIllustration.id,
              imageData: result.image,
              artworkType: 'community_illustration',
              prompt: 'Community neural network illustration'
            })
          })
          
          toast.success('🎨 New Community Illustration Created!', {
            description: 'High-quality neural artwork saved to secure cloud storage',
            duration: 6000
          })
        } catch (error) {
          console.error('Cloud save error:', error)
        }
      }
    } catch (error) {
      console.error('Generation error:', error)
      toast.error('Failed to generate illustration')
    }
    
    setIsGenerating(false)
  }

  const downloadIllustration = (illustration: Illustration) => {
    // Update download count
    setIllustrations(prev => prev.map(ill => 
      ill.id === illustration.id 
        ? { ...ill, downloads: ill.downloads + 1 }
        : ill
    ))

    // Create download link
    const link = document.createElement('a')
    link.href = illustration.imageUrl
    link.download = `gaia-community-${illustration.title.toLowerCase().replace(/\s+/g, '-')}.png`
    link.click()

    toast.success('🎨 Community Artwork Downloaded!', {
      description: `${illustration.title} - Perfect for community sharing`,
      duration: 4000
    })
  }

  return (
    <div className="space-y-6">
      <Card className="border-2 border-purple-500/50 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-3 text-purple-300">
            <Palette className="h-8 w-8 animate-pulse text-pink-400" />
            <div>
              <div className="text-3xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400 bg-clip-text text-transparent">
                Community Neural Illustrations
              </div>
              <div className="text-sm font-normal text-purple-400">
                High-Quality Neural Network Art for Our Community
              </div>
            </div>
            <Sparkles className="h-6 w-6 text-cyan-400 animate-bounce" />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="text-sm text-muted-foreground">
              🎨 {illustrations.length} Community Artworks Available
            </div>
            <Button
              onClick={generateNewIllustration}
              disabled={isGenerating}
              className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            >
              {isGenerating ? (
                <>
                  <Zap className="h-4 w-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Generate New Art
                </>
              )}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {illustrations.map((illustration) => (
              <Card key={illustration.id} className="border border-purple-500/20 bg-gradient-to-br from-purple-900/10 to-pink-900/10 hover:scale-105 transition-transform duration-300">
                <CardContent className="p-4">
                  <div className="aspect-square rounded-lg overflow-hidden mb-4 relative group">
                    <img 
                      src={illustration.imageUrl} 
                      alt={illustration.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <h3 className="text-lg font-bold text-purple-300 mb-1">
                        {illustration.title}
                      </h3>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {illustration.description}
                      </p>
                    </div>
                    
                    <div className="flex flex-wrap gap-1">
                      {illustration.tags.map((tag) => (
                        <Badge key={tag} className="bg-purple-600/20 text-purple-300 text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Star className="h-4 w-4 text-yellow-400" />
                        <span className="text-xs text-yellow-400">
                          {illustration.downloads} downloads
                        </span>
                      </div>
                      
                      <Button
                        size="sm"
                        onClick={() => downloadIllustration(illustration)}
                        className="bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
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
          
          <div className="mt-8 text-center">
            <div className="p-4 bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg border border-green-500/30">
              <h3 className="text-lg font-bold text-green-400 mb-2">
                🌟 Community Art Collection
              </h3>
              <p className="text-sm text-green-300">
                All artworks are inspired by your uploaded neural network images and are automatically 
                saved to secure cloud storage. Perfect for community sharing, social media, and creative projects.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
