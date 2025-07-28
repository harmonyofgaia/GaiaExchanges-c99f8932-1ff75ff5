
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Leaf, Globe, Heart, Users, Gamepad2, Shield, Zap, Star } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/10 via-blue-900/10 to-purple-900/10">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center mb-8">
          <UniversalGaiaLogo 
            size="xl" 
            animated={true}
            showText={true}
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
            About Harmony of Gaia
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            We Are a Strong Creative Open Minded Circuit To Happiness - Building the future of sustainable technology, 
            gaming, and environmental consciousness through quantum-powered innovation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Leaf className="h-6 w-6" />
                Environmental Mission
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Our core mission is to create technology that not only serves humanity but actively heals our planet. 
                Every project connects to environmental restoration and sustainability.
              </p>
              <Badge className="bg-green-600">🌍 Planet First</Badge>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-cyan-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Gamepad2 className="h-6 w-6" />
                Gaming Innovation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Revolutionary gaming experiences powered by quantum computing, featuring 8K graphics, 
                neural network AI, and immersive virtual worlds that surpass all competitors.
              </p>
              <Badge className="bg-blue-600">🎮 Next-Gen Gaming</Badge>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Zap className="h-6 w-6" />
                Quantum Technology
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Leveraging quantum computing power for unprecedented processing capabilities, 
                blockchain security, and AI-driven systems that evolve and learn continuously.
              </p>
              <Badge className="bg-purple-600">⚡ Quantum Powered</Badge>
            </CardContent>
          </Card>
        </div>

        <Card className="border-yellow-500/30 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 mb-12">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-yellow-400">
              🌟 Our Core Values
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <Heart className="h-12 w-12 text-red-400 mx-auto mb-2" />
                <h3 className="text-xl font-bold text-red-400">Happiness</h3>
                <p className="text-sm text-muted-foreground">
                  Bringing smiles to every soul through creative and positive experiences
                </p>
              </div>
              <div className="text-center">
                <Users className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                <h3 className="text-xl font-bold text-blue-400">Community</h3>
                <p className="text-sm text-muted-foreground">
                  Building strong, supportive communities that grow and thrive together
                </p>
              </div>
              <div className="text-center">
                <Star className="h-12 w-12 text-purple-400 mx-auto mb-2" />
                <h3 className="text-xl font-bold text-purple-400">Innovation</h3>
                <p className="text-sm text-muted-foreground">
                  Pushing boundaries with creative solutions that change the world
                </p>
              </div>
              <div className="text-center">
                <Globe className="h-12 w-12 text-green-400 mx-auto mb-2" />
                <h3 className="text-xl font-bold text-green-400">Sustainability</h3>
                <p className="text-sm text-muted-foreground">
                  Every action contributes to a healthier, more sustainable planet
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/20 to-blue-900/20">
          <CardHeader>
            <CardTitle className="text-center text-3xl font-bold text-green-400">
              🚀 Our Vision for the Future
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
              We envision a world where technology serves both humanity and nature. Through our revolutionary gaming platforms, 
              environmental projects, and quantum-powered innovations, we're building the foundation for a sustainable, 
              joyful future where creativity flourishes and every being can thrive.
            </p>
            
            <div className="bg-black/30 rounded-lg p-6">
              <h3 className="text-2xl font-bold text-blue-400 mb-4">
                "Seeds Will Form Into Music"
              </h3>
              <p className="text-muted-foreground italic">
                Every small action, every creative spark, every moment of happiness contributes to the grand symphony 
                of positive change. We are planting seeds of innovation that will grow into harmonious solutions 
                for generations to come.
              </p>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                onClick={() => window.location.href = '/gaias-projects'}
                className="bg-green-600 hover:bg-green-700"
              >
                <Leaf className="h-4 w-4 mr-2" />
                Explore Our Projects
              </Button>
              <Button 
                onClick={() => window.location.href = '/gaming'}
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Gamepad2 className="h-4 w-4 mr-2" />
                Experience Our Games
              </Button>
              <Button 
                onClick={() => window.location.href = '/contact'}
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Users className="h-4 w-4 mr-2" />
                Join Our Community
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
