import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Heart, Leaf, Globe, Zap, Shield, Star } from 'lucide-react'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center mb-8">
          <UniversalGaiaLogo 
            size="lg" 
            animated={true}
            showText={true}
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              🌟 WELCOME TO GAIA UNIVERSE 🌟
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Harmony of Culture • Quantum Technology • Global Impact
            </p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center p-6 bg-green-900/30 rounded-lg border border-green-500/30">
                <Heart className="h-12 w-12 mx-auto text-green-400 animate-pulse mb-4" />
                <div className="text-2xl font-bold text-green-400">COMMUNITY</div>
                <div className="text-sm text-muted-foreground">Global Harmony</div>
                <Badge className="bg-green-600 mt-2">100M+ Members</Badge>
              </div>

              <div className="text-center p-6 bg-blue-900/30 rounded-lg border border-blue-500/30">
                <Zap className="h-12 w-12 mx-auto text-blue-400 animate-pulse mb-4" />
                <div className="text-2xl font-bold text-blue-400">TECHNOLOGY</div>
                <div className="text-sm text-muted-foreground">Quantum Innovation</div>
                <Badge className="bg-blue-600 mt-2">Cutting-Edge</Badge>
              </div>

              <div className="text-center p-6 bg-purple-900/30 rounded-lg border border-purple-500/30">
                <Globe className="h-12 w-12 mx-auto text-purple-400 animate-pulse mb-4" />
                <div className="text-2xl font-bold text-purple-400">IMPACT</div>
                <div className="text-sm text-muted-foreground">Global Solutions</div>
                <Badge className="bg-purple-600 mt-2">Positive Change</Badge>
              </div>

              <div className="text-center p-6 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
                <Leaf className="h-12 w-12 mx-auto text-yellow-400 animate-pulse mb-4" />
                <div className="text-2xl font-bold text-yellow-400">SUSTAINABILITY</div>
                <div className="text-sm text-muted-foreground">Eco-Friendly</div>
                <Badge className="bg-yellow-600 mt-2">Green Initiatives</Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-8 border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Explore GAIA Universe
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Discover our key initiatives and projects
            </p>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="community" className="w-full">
              <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                <TabsTrigger value="community">Community</TabsTrigger>
                <TabsTrigger value="technology">Technology</TabsTrigger>
                <TabsTrigger value="impact">Impact</TabsTrigger>
                <TabsTrigger value="sustainability">Sustainability</TabsTrigger>
              </TabsList>
              <TabsContent value="community" className="mt-4">
                <p className="text-lg font-semibold text-blue-400">Community Initiatives</p>
                <p className="text-muted-foreground">
                  Join our global community and participate in collaborative projects.
                </p>
                <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                  Explore Community
                </Button>
              </TabsContent>
              <TabsContent value="technology" className="mt-4">
                <p className="text-lg font-semibold text-purple-400">Quantum Technology</p>
                <p className="text-muted-foreground">
                  Explore our cutting-edge technology solutions and innovations.
                </p>
                <Button className="mt-4 bg-purple-600 hover:bg-purple-700">
                  Learn More
                </Button>
              </TabsContent>
              <TabsContent value="impact" className="mt-4">
                <p className="text-lg font-semibold text-green-400">Global Impact Projects</p>
                <p className="text-muted-foreground">
                  Discover our projects focused on creating positive global change.
                </p>
                <Button className="mt-4 bg-green-600 hover:bg-green-700">
                  View Projects
                </Button>
              </TabsContent>
              <TabsContent value="sustainability" className="mt-4">
                <p className="text-lg font-semibold text-yellow-400">Sustainability Initiatives</p>
                <p className="text-muted-foreground">
                  Learn about our eco-friendly initiatives and sustainable practices.
                </p>
                <Button className="mt-4 bg-yellow-600 hover:bg-yellow-700">
                  Explore Initiatives
                </Button>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="mt-8 border-green-500/30 bg-gradient-to-r from-green-900/30 to-emerald-900/30">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400">
              Security & Transparency
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              Ensuring a safe and transparent environment for our community
            </p>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center">
              <Shield className="h-12 w-12 mx-auto text-green-400 mb-4" />
              <h3 className="text-xl font-bold text-green-400">Quantum Security</h3>
              <p className="text-muted-foreground">
                Advanced security measures to protect your data and assets.
              </p>
            </div>
            <div className="text-center">
              <Star className="h-12 w-12 mx-auto text-emerald-400 mb-4" />
              <h3 className="text-xl font-bold text-emerald-400">Transparency</h3>
              <p className="text-muted-foreground">
                Open and transparent operations for community trust and accountability.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Home
