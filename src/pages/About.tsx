
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Heart, Globe, Users, Shield, Zap, Star } from 'lucide-react'
import HoverSidebar from '@/components/HoverSidebar'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8 border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
                🌍 About GAiA
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                Harmony of Culture - Building a Better World Together
              </p>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Heart className="h-6 w-6" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We believe in the power of technology to create positive environmental impact. 
                  GAiA combines gaming, blockchain, and environmental restoration to build a 
                  sustainable future for our planet.
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
                <p className="text-muted-foreground">
                  To create a global community where every action in our digital ecosystem 
                  contributes to real-world environmental restoration and cultural harmony.
                </p>
              </CardContent>
            </Card>
          </div>

          <Card className="border-purple-500/30 bg-purple-900/20 mb-8">
            <CardHeader>
              <CardTitle className="text-purple-400">🌟 Core Values</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <Users className="h-12 w-12 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-cyan-400 mb-2">Community</h3>
                  <p className="text-muted-foreground">
                    Building connections across cultures and continents
                  </p>
                </div>
                <div className="text-center">
                  <Shield className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-green-400 mb-2">Sustainability</h3>
                  <p className="text-muted-foreground">
                    Every action contributes to environmental restoration
                  </p>
                </div>
                <div className="text-center">
                  <Zap className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-lg font-bold text-purple-400 mb-2">Innovation</h3>
                  <p className="text-muted-foreground">
                    Pushing boundaries with cutting-edge technology
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-500/30 bg-orange-900/20">
            <CardHeader>
              <CardTitle className="text-orange-400">🚀 Join Our Journey</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-6">
                Be part of the movement that's changing how we think about gaming, 
                cryptocurrency, and environmental responsibility. Together, we can create 
                a more sustainable and harmonious world.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-green-600 hover:bg-green-700">
                  <Heart className="h-4 w-4 mr-2" />
                  Get Started
                </Button>
                <Button variant="outline" className="border-blue-500/30 text-blue-400">
                  <Globe className="h-4 w-4 mr-2" />
                  Learn More
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default About
