
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Image, Palette, Sparkles, Download } from 'lucide-react'
import { toast } from 'sonner'

export function CampaignArtworkGenerator() {
  const [generatedArtworks, setGeneratedArtworks] = useState<string[]>([])
  const [isGenerating, setIsGenerating] = useState(false)

  const artworkPrompts = [
    "GAiA Token logo with baby boom explosion, rocket ships flying to moon, green eco-friendly colors, professional crypto art",
    "Harmony of Gaia community logo with earth healing, nature restoration, bright colors, inspiring artwork",
    "GAiA cryptocurrency with pump.fun style graphics, viral meme energy, to the moon theme, exciting colors",
    "Environmental crypto token with dragon protection, quantum security, green technology, futuristic design",
    "Baby boom crypto explosion artwork, GAiA token at center, community growth, wealth creation theme"
  ]

  const generateArtwork = async () => {
    setIsGenerating(true)
    
    try {
      for (const prompt of artworkPrompts) {
        // Simulate artwork generation
        setTimeout(() => {
          const artworkUrl = `data:image/svg+xml,${encodeURIComponent(`
            <svg width="400" height="400" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="grad1" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" style="stop-color:#00ff88;stop-opacity:1" />
                  <stop offset="100%" style="stop-color:#0066ff;stop-opacity:1" />
                </radialGradient>
              </defs>
              <rect width="400" height="400" fill="url(#grad1)"/>
              <circle cx="200" cy="200" r="80" fill="#ffffff" opacity="0.9"/>
              <text x="200" y="210" text-anchor="middle" fill="#000" font-size="24" font-weight="bold">GAiA</text>
              <text x="200" y="240" text-anchor="middle" fill="#000" font-size="12">Baby Boom</text>
              <polygon points="150,120 250,120 280,180 220,250 180,250 120,180" fill="#ffff00" opacity="0.7"/>
              <text x="200" y="320" text-anchor="middle" fill="#fff" font-size="14">🚀 TO THE MOON 🚀</text>
            </svg>
          `)}`
          
          setGeneratedArtworks(prev => [...prev, artworkUrl])
        }, Math.random() * 2000)
      }
      
      setTimeout(() => {
        setIsGenerating(false)
        toast.success('🎨 Campaign Artworks Generated!', {
          description: 'Professional GAiA Token artworks ready for global distribution',
          duration: 5000
        })
      }, 5000)
      
    } catch (error) {
      console.error('Artwork generation error:', error)
      setIsGenerating(false)
    }
  }

  const downloadArtwork = (artwork: string, index: number) => {
    const link = document.createElement('a')
    link.href = artwork
    link.download = `gaia-campaign-artwork-${index + 1}.svg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    
    toast.success('🎨 Artwork Downloaded!', {
      description: 'Ready for social media and pump.fun distribution'
    })
  }

  return (
    <Card className="border-2 border-purple-500/50 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Palette className="h-6 w-6" />
          🎨 CAMPAIGN ARTWORK GENERATOR
          <Badge className="bg-pink-600">VIRAL READY</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <Button 
          onClick={generateArtwork}
          disabled={isGenerating}
          className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 py-4"
        >
          {isGenerating ? (
            <>
              <Sparkles className="h-5 w-5 mr-2 animate-spin" />
              Generating Campaign Artworks...
            </>
          ) : (
            <>
              <Image className="h-5 w-5 mr-2" />
              🎨 Generate GAiA Campaign Artworks
            </>
          )}
        </Button>

        {generatedArtworks.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-purple-400">Generated Campaign Artworks:</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {generatedArtworks.map((artwork, index) => (
                <div key={index} className="p-4 bg-black/30 rounded-lg">
                  <img src={artwork} alt={`Campaign Artwork ${index + 1}`} className="w-full h-48 object-cover rounded mb-2" />
                  <Button 
                    onClick={() => downloadArtwork(artwork, index)}
                    className="w-full bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Download for Distribution
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="bg-gradient-to-r from-green-900/40 to-blue-900/40 p-4 rounded-lg border border-green-500/30">
          <h4 className="font-bold text-green-400 mb-2">🚀 Campaign Artwork Features:</h4>
          <ul className="text-sm text-green-300 space-y-1">
            <li>• Professional GAiA Token logo integration</li>
            <li>• Baby boom explosion graphics</li>
            <li>• Pump.fun viral meme style</li>
            <li>• "To the moon" rocket themes</li>
            <li>• Eco-friendly color schemes</li>
            <li>• Community growth imagery</li>
            <li>• Download ready for all platforms</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
