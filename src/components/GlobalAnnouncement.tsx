
import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Download, Share2, Globe, Megaphone, Sparkles } from 'lucide-react'
import { AbstractArtOverlay } from '@/components/ui/abstract-art-overlay'

export function GlobalAnnouncement() {
  const [announcement, setAnnouncement] = useState('')

  const generateAnnouncement = () => {
    const announcementText = `
🌍 HARMONY OF GAIA - REVOLUTIONARY PLATFORM ANNOUNCEMENT 🌍

The future of environmental cryptocurrency and gaming has arrived!

🚀 GROUNDBREAKING FEATURES NOW LIVE:
✨ Advanced Web3 DApp Integration with Quantum Gaming Engine
✨ Real-time Artist Streaming Platform with Revenue Sharing
✨ Neural Pathway Matrix Background System
✨ Revolutionary NFT Marketplace with User-Created Landscapes
✨ GAiA Token Burning System (95% Environmental Projects + 5% Coral Reef)
✨ Live Performance Recording & Community Support System

💎 TOKEN ADDRESS: ABiVQHU118yDohUxB221P9JbCov52ucMtyG1i8AkwPm7

🎮 GAMING REVOLUTION:
- Create landscapes and tools in Harmony of Gaia
- Buy exclusive weapons, armor, and unknown secrets
- Power levels and rarity systems
- NFT integration with real environmental impact

🎵 ARTIST SUPPORT ECOSYSTEM:
- Live streaming platform for real-life performances
- Revenue sharing based on viewership
- Scheduled performance slots available
- Direct support for environmental causes

🌱 ENVIRONMENTAL IMPACT:
- Every transaction helps restore natural health
- Transparent reinvestment tracking
- Community-driven environmental projects
- Real-world coral reef restoration funding

💰 ECONOMIC MODEL:
- Zero trading fees on GAiA tokens
- Viewer-based revenue generation
- Artists earn while supporting the planet
- Sustainable growth through community participation

🔮 TECHNOLOGICAL SUPERIORITY:
- Quantum-enhanced background systems
- Neural pathway matrix designs
- AI-integrated user experiences
- Cross-platform compatibility (Web, Mobile, VR/AR)

JOIN THE REVOLUTION TODAY!
🌐 Website: cultureofharmony.net
📧 Contact: info@cultureofharmony.net
🐦 Twitter: @HarmonyOfGaia

#GAiAToken #EnvironmentalCrypto #SustainableGaming #ArtistSupport #GreenTechnology #Web3Revolution #NeuralMatrix #QuantumGaming

"Doesn't matter if you're Black or White - We're all part of this beautiful Earth" 🌍✨

Together we create a new culture until the end of the world - Seeds will form into Music 🎵
    `.trim()
    
    setAnnouncement(announcementText)
  }

  const downloadAnnouncement = () => {
    const element = document.createElement('a')
    const file = new Blob([announcement], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'harmony-of-gaia-global-announcement.txt'
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(announcement)
  }

  return (
    <div className="relative p-6 bg-gradient-to-br from-green-900/20 to-purple-900/20 rounded-lg border border-green-500/20">
      <AbstractArtOverlay artType="matrix" intensity="medium" />
      
      <div className="relative z-10">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            🌍 GLOBAL PLATFORM ANNOUNCEMENT
          </CardTitle>
          <div className="flex justify-center gap-4 flex-wrap">
            <Badge className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2">
              <Megaphone className="w-4 h-4 mr-2" />
              REVOLUTIONARY UPDATE
            </Badge>
            <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">
              <Sparkles className="w-4 h-4 mr-2" />
              AI INTEGRATED
            </Badge>
            <Badge className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-4 py-2">
              <Globe className="w-4 h-4 mr-2" />
              GLOBAL REACH
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="flex gap-4 justify-center">
            <Button onClick={generateAnnouncement} className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
              <Megaphone className="w-4 h-4 mr-2" />
              Generate Announcement
            </Button>
          </div>

          {announcement && (
            <>
              <Textarea
                value={announcement}
                onChange={(e) => setAnnouncement(e.target.value)}
                className="min-h-[400px] bg-black/20 border-green-500/20 text-green-100 font-mono text-sm"
                placeholder="Your global announcement will appear here..."
              />
              
              <div className="flex gap-4 justify-center">
                <Button onClick={downloadAnnouncement} className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download as TXT
                </Button>
                <Button onClick={copyToClipboard} variant="outline" className="border-green-500/50 text-green-400 hover:bg-green-500/10">
                  <Share2 className="w-4 h-4 mr-2" />
                  Copy to Clipboard
                </Button>
              </div>
            </>
          )}
        </CardContent>
      </div>
    </div>
  )
}
