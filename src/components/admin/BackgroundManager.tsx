import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Palette, Sparkles, Zap, Crown, Globe, Heart } from 'lucide-react'
import { AdminProtectedRoute } from '@/components/auth/AdminProtectedRoute'

interface CollectedImage {
  id: string
  name: string
  description: string
  artisticValue: string
  inspiration: string
}

function BackgroundManagerContent() {
  const [currentBackground, setCurrentBackground] = useState('neural-electric')
  const [reverseButtonVisible, setReverseButtonVisible] = useState(true)
  const [dailyInspiration, setDailyInspiration] = useState('')

  const collectedImages: CollectedImage[] = [
    {
      id: 'img1',
      name: 'Neural Synapse Pattern',
      description: 'Complex branching networks with electric blue pathways',
      artisticValue: 'High-energy organic flow',
      inspiration: 'Used for neural background dendrites'
    },
    {
      id: 'img2', 
      name: 'Cosmic Web Formation',
      description: 'Galaxy-like structures with interconnected nodes',
      artisticValue: 'Universal connectivity theme',
      inspiration: 'Applied to cosmic trading interfaces'
    },
    {
      id: 'img3',
      name: 'Digital Matrix Flow',
      description: 'Green cascading code with depth layers',
      artisticValue: 'Cyberpunk aesthetic energy',
      inspiration: 'Enhanced security page backgrounds'
    },
    {
      id: 'img4',
      name: 'Organic Circuit Patterns',
      description: 'Biological meets technological fusion',
      artisticValue: 'Harmony of nature and tech',
      inspiration: 'Bio-tech gaming environments'
    },
    {
      id: 'img5',
      name: 'Quantum Particle Dance',
      description: 'Subatomic particles in motion',
      artisticValue: 'Microscopic universe beauty',
      inspiration: 'Quantum security visualizations'
    },
    {
      id: 'img6',
      name: 'Ethereal Energy Waves',
      description: 'Flowing energy with spectral colors',
      artisticValue: 'Spiritual technological harmony',
      inspiration: 'Meditation and wellness pages'
    },
    {
      id: 'img7',
      name: 'Fractal Growth Patterns',
      description: 'Self-similar expanding structures',
      artisticValue: 'Infinite creative potential',
      inspiration: 'Growth and expansion themes'
    }
  ]

  useEffect(() => {
    const today = new Date().toDateString()
    const storedDate = localStorage.getItem('dailyInspirationDate')
    
    const inspirations = [
      "🎨 Today's energy: Quantum creativity flows through neural pathways of innovation",
      "✨ Artistic vision: Where technology meets soul, beauty emerges in sacred geometry",
      "🌟 Creative force: Each pixel carries the DNA of infinite possibility",
      "🔥 Design spirit: From chaos comes order, from order comes transcendent beauty",
      "💫 Visual harmony: The universe speaks through color, form, and divine proportion",
      "🌈 Aesthetic power: Every background tells a story of human-AI collaboration",
      "⚡ Creative lightning: Innovation strikes when art and code dance together"
    ]
    
    if (storedDate !== today) {
      const newInspiration = inspirations[Math.floor(Math.random() * inspirations.length)]
      setDailyInspiration(newInspiration)
      localStorage.setItem('dailyInspiration', newInspiration)
      localStorage.setItem('dailyInspirationDate', today)
    } else {
      setDailyInspiration(localStorage.getItem('dailyInspiration') || inspirations[0])
    }
  }, [])

  const handleReverseButtonToggle = (checked: boolean) => {
    setReverseButtonVisible(checked)
    localStorage.setItem('adminReverseButtonVisible', checked.toString())
  }

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-pink-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Palette className="h-6 w-6" />
            Background Design Studio - Admin Only
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="p-4 rounded-lg bg-gradient-to-r from-cyan-900/20 to-blue-900/20 border border-cyan-500/20">
            <h3 className="text-lg font-semibold text-cyan-300 mb-2 flex items-center gap-2">
              <Sparkles className="h-5 w-5" />
              Daily Creative Inspiration
            </h3>
            <p className="text-cyan-200 italic">{dailyInspiration}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Crown className="h-5 w-5 text-yellow-400" />
              Admin Controls
            </h3>
            
            <div className="flex items-center justify-between p-3 rounded bg-zinc-800/50">
              <div>
                <span className="text-white font-medium">Admin Reverse Button</span>
                <p className="text-sm text-gray-400">Show/hide reverse button on all pages</p>
              </div>
              <Switch
                checked={reverseButtonVisible}
                onCheckedChange={handleReverseButtonToggle}
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <Heart className="h-5 w-5 text-red-400" />
              Collected Art Album - Artistic DNA Library
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {collectedImages.map((image) => (
                <Card key={image.id} className="bg-zinc-800/50 border-zinc-600/50">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <h4 className="font-medium text-white">{image.name}</h4>
                        <Badge className="bg-green-600 text-white text-xs">Applied</Badge>
                      </div>
                      <p className="text-sm text-gray-300">{image.description}</p>
                      <div className="space-y-1">
                        <p className="text-xs text-purple-300">
                          <strong>Artistic Value:</strong> {image.artisticValue}
                        </p>
                        <p className="text-xs text-blue-300">
                          <strong>Current Use:</strong> {image.inspiration}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-lg bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/20">
            <h4 className="text-green-300 font-semibold mb-2 flex items-center gap-2">
              <Globe className="h-4 w-4" />
              Artistic Evolution Status
            </h4>
            <div className="text-sm text-green-200 space-y-1">
              <p>• Neural backgrounds: Enhanced with organic dendrite patterns</p>
              <p>• Color harmonies: Balanced across all page themes</p>
              <p>• User experience: Seamless artistic transitions</p>
              <p>• Creative energy: 100% powered by Harmony of Gaia vision</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function BackgroundManager() {
  return (
    <AdminProtectedRoute>
      <BackgroundManagerContent />
    </AdminProtectedRoute>
  )
}
