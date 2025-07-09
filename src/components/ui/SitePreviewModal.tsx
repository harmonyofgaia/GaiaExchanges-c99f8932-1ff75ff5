
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Eye, Star, Zap, Shield, Globe } from 'lucide-react'

interface SitePreviewModalProps {
  isOpen: boolean
  onClose: () => void
}

export function SitePreviewModal({ isOpen, onClose }: SitePreviewModalProps) {
  const screenshots = [
    {
      title: '🎮 Gaming Hub',
      description: '12+ game modes including Emo, Battle Royale, and Creative modes',
      image: '/api/placeholder/400/250',
      features: ['Multiple game modes', 'Live tournaments', 'Competitive play']
    },
    {
      title: '🌍 Virtual World',
      description: 'Explore massive 8K virtual environments with landscape building',
      image: '/api/placeholder/400/250',
      features: ['8K Ultra graphics', 'World building', 'Social interaction']
    },
    {
      title: '💱 Advanced Exchange',
      description: 'Professional trading platform with real-time analytics',
      image: '/api/placeholder/400/250',
      features: ['Live trading', 'Advanced charts', 'Secure swapping']
    },
    {
      title: '🦎 Live Animal Tracking',
      description: 'Track real animals with NFT integration and virtual companions',
      image: '/api/placeholder/400/250',
      features: ['Real animal tracking', 'NFT integration', 'Virtual companions']
    },
    {
      title: '🛡️ Quantum Security',
      description: 'Advanced security protocols protecting all user assets',
      image: '/api/placeholder/400/250',
      features: ['Quantum encryption', 'Multi-layer protection', 'Real-time monitoring']
    },
    {
      title: '🎵 Live Artist Platform',
      description: 'Support artists and discover new music experiences',
      image: '/api/placeholder/400/250',
      features: ['Live performances', 'Artist support', 'Music NFTs']
    }
  ]

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-purple-900/20 to-green-900/20 border-purple-500/30">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-green-400">
            🌍 GAiA Platform Preview
          </DialogTitle>
          <p className="text-center text-muted-foreground text-lg">
            Discover the revolutionary features of our quantum-secured platform
          </p>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {screenshots.map((screenshot, index) => (
            <Card key={index} className="border-purple-500/20 bg-gradient-to-br from-purple-900/10 to-blue-900/10">
              <CardContent className="p-6">
                <div className="relative mb-4">
                  <div className="w-full h-48 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center">
                    <div className="text-6xl opacity-50">
                      {screenshot.title.split(' ')[0]}
                    </div>
                  </div>
                  <Badge className="absolute top-2 right-2 bg-green-600">
                    Live
                  </Badge>
                </div>
                
                <h3 className="text-xl font-bold text-purple-400 mb-2">
                  {screenshot.title}
                </h3>
                
                <p className="text-muted-foreground mb-4">
                  {screenshot.description}
                </p>
                
                <div className="space-y-2">
                  {screenshot.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2 text-sm">
                      <Star className="h-4 w-4 text-green-400" />
                      <span className="text-green-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8 p-6 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20 rounded-lg">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-green-400 mb-4">
              🚀 Ready to Experience GAiA Platform?
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center justify-center gap-2 text-green-300">
                <Shield className="h-5 w-5" />
                <span>Quantum Security</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-blue-300">
                <Zap className="h-5 w-5" />
                <span>Instant Access</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-purple-300">
                <Globe className="h-5 w-5" />
                <span>Global Community</span>
              </div>
            </div>
            <Button 
              onClick={onClose}
              className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-bold px-8 py-3"
            >
              <Eye className="h-5 w-5 mr-2" />
              Explore Platform Now
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
