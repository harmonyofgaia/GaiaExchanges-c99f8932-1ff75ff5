
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Heart, Globe, Shield } from 'lucide-react'

const About = () => {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-green-900/20 to-blue-900/20">
      <div className="container mx-auto max-w-4xl">
        <Card className="border-green-500/30 bg-gradient-to-br from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400 text-3xl">
              <Users className="h-8 w-8" />
              🌍 About Harmony of Gaia
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-blue-400 flex items-center gap-2">
                  <Heart className="h-5 w-5" />
                  Our Mission
                </h3>
                <p className="text-muted-foreground">
                  We create true souls, true life, true smiles. A more impressive way of doing things.
                  We bring creativity and good vibrations to everyone, aiming to bring a smile to every soul.
                </p>
              </div>
              
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-purple-400 flex items-center gap-2">
                  <Globe className="h-5 w-5" />
                  Global Impact
                </h3>
                <p className="text-muted-foreground">
                  Seeds will form into music. We offer projects across different platforms with full transparency.
                  Our open approach showcases every step of our journey.
                </p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-green-900/40 to-blue-900/40 rounded-lg border border-green-500/30">
              <div className="text-center">
                <Badge className="bg-green-600 text-white mb-4">
                  <Shield className="h-3 w-3 mr-1" />
                  SECURE & INNOVATIVE
                </Badge>
                <h2 className="text-2xl font-bold text-green-400 mb-2">
                  🎵 "Doesn't matter if you're Black or White"
                </h2>
                <p className="text-lg text-muted-foreground">
                  Unity through technology, creativity, and positive vibrations for all.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default About
