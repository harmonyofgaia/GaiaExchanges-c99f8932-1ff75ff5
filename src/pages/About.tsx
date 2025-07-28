import { Navbar } from '@/components/Navbar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Heart, Globe, Leaf, Music, Smile, Users } from 'lucide-react'

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/10 to-green-900/10">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-400 via-green-400 to-blue-400 bg-clip-text text-transparent mb-6">
            About GAIA
          </h1>
          <p className="text-xl text-muted-foreground">
            The Story Behind Our Creative Circuit To Happiness
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Music className="h-6 w-6" />
                Seeds Will Form Into Music
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our core philosophy centers around the beautiful transformation of ideas (seeds) 
                into creative expressions (music). Every project, every innovation, every smile 
                contributes to this living symphony of positive change.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-purple-500/50 text-purple-300">
                  Creative Expression
                </Badge>
                <Badge variant="outline" className="border-blue-500/50 text-blue-300">
                  Innovation
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Leaf className="h-6 w-6" />
                Environmental Focus
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                GAIA represents our commitment to environmental protection and sustainable 
                innovation. Through green technology, conservation efforts, and community 
                engagement, we're building a better future for our planet.
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="border-green-500/50 text-green-300">
                  Sustainability
                </Badge>
                <Badge variant="outline" className="border-emerald-500/50 text-emerald-300">
                  Conservation
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="border-gold-500/30 bg-gradient-to-r from-yellow-900/20 to-orange-900/20 mb-8">
          <CardHeader>
            <CardTitle className="text-center text-3xl text-yellow-400">
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <p className="text-xl text-muted-foreground">
                "We Create a New Cult till the End Of the World"
              </p>
              <p className="text-lg text-blue-300">
                Not a cult in the traditional sense, but a movement of positive change, 
                creativity, and environmental consciousness that spreads across the globe.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center space-y-2">
                <Smile className="h-12 w-12 text-yellow-400 mx-auto" />
                <h3 className="text-lg font-bold text-yellow-300">Bring Smiles</h3>
                <p className="text-sm text-muted-foreground">
                  "My Goal is To Bring A Smile to every Soul"
                </p>
              </div>

              <div className="text-center space-y-2">
                <Users className="h-12 w-12 text-blue-400 mx-auto" />
                <h3 className="text-lg font-bold text-blue-300">Unity</h3>
                <p className="text-sm text-muted-foreground">
                  "Doesn't matter if You're Black Or White"
                </p>
              </div>

              <div className="text-center space-y-2">
                <Heart className="h-12 w-12 text-red-400 mx-auto" />
                <h3 className="text-lg font-bold text-red-300">Authenticity</h3>
                <p className="text-sm text-muted-foreground">
                  "True Souls, True Life, True Smiles"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-cyan-500/30 bg-cyan-900/20">
          <CardHeader>
            <CardTitle className="text-center text-2xl text-cyan-400">
              What Makes Us Different
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-lg text-muted-foreground text-center">
              "We Will not make you only be surprised but we show you true Souls, 
              True Life, True Smiles A More Impressive way on Doing Things"
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-cyan-300">Creative Innovation</h4>
                <p className="text-sm text-muted-foreground">
                  We combine technology with artistic expression to create unique experiences
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-cyan-300">Global Impact</h4>
                <p className="text-sm text-muted-foreground">
                  Every project contributes to environmental protection and social good
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-cyan-300">Community First</h4>
                <p className="text-sm text-muted-foreground">
                  Building connections and fostering creativity in every community we touch
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="text-lg font-bold text-cyan-300">Transparency</h4>
                <p className="text-sm text-muted-foreground">
                  "Full Transparency, A Open Wallet Where you can see every Step"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
