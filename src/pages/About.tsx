
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Globe, Heart, Leaf, Shield, Zap, Users } from 'lucide-react'
import HoverSidebar from '@/components/HoverSidebar'
import { GAIA_TOKEN } from '@/constants/gaia'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <Card className="mb-8 border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                🌍 About Harmony of Gaia
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                {GAIA_TOKEN.BRAND_STATEMENT}
              </p>
            </CardHeader>
          </Card>

          {/* Mission & Vision */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Heart className="h-6 w-6" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  To create a harmonious blend of gaming, blockchain technology, and environmental restoration. 
                  We believe that entertainment and ecological responsibility can work hand in hand to build a 
                  sustainable future for all cultures and communities worldwide.
                </p>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Globe className="h-6 w-6" />
                  Our Vision
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  A world where digital innovation drives real-world positive impact. Through our gaming ecosystem 
                  and GAiA token, we envision communities united in protecting our planet while celebrating the 
                  rich diversity of human culture and creativity.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Core Values */}
          <Card className="mb-8 border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="text-center text-2xl text-purple-400">
                Core Values & Principles
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-500/20">
                  <Leaf className="h-12 w-12 mx-auto text-green-400 mb-4" />
                  <h3 className="text-lg font-bold text-green-400 mb-2">Environmental Stewardship</h3>
                  <p className="text-sm text-muted-foreground">
                    Every transaction and game session contributes to real environmental restoration projects.
                  </p>
                </div>
                
                <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-500/20">
                  <Users className="h-12 w-12 mx-auto text-blue-400 mb-4" />
                  <h3 className="text-lg font-bold text-blue-400 mb-2">Cultural Harmony</h3>
                  <p className="text-sm text-muted-foreground">
                    Celebrating diversity and bringing together communities from all backgrounds.
                  </p>
                </div>
                
                <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-500/20">
                  <Zap className="h-12 w-12 mx-auto text-purple-400 mb-4" />
                  <h3 className="text-lg font-bold text-purple-400 mb-2">Innovation</h3>
                  <p className="text-sm text-muted-foreground">
                    Pushing the boundaries of gaming and blockchain technology for positive impact.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Token Information */}
          <Card className="border-orange-500/30 bg-orange-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <Shield className="h-6 w-6" />
                GAiA Token Official Information
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-orange-900/10 border border-orange-500/20 rounded-lg p-4">
                  <Badge className="bg-orange-600 mb-2">OFFICIAL TOKEN</Badge>
                  <p className="text-orange-300 font-bold mb-2">{GAIA_TOKEN.OFFICIAL_DISCLAIMER}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Contract Address:</span>
                      <code className="block text-orange-300 font-mono break-all bg-orange-900/20 p-1 rounded mt-1">
                        {GAIA_TOKEN.CONTRACT_ADDRESS}
                      </code>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Network:</span>
                      <span className="block text-orange-300 font-bold">{GAIA_TOKEN.NETWORK}</span>
                    </div>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-muted-foreground">{GAIA_TOKEN.SOCIAL_MEDIA_CORRECTION}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default About
