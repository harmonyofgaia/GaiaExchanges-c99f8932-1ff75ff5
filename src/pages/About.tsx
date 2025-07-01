
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { Heart, Globe, Shield, Zap } from 'lucide-react'

const About = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-6 py-8">
        <div className="flex items-center justify-center mb-8">
          <UniversalGaiaLogo 
            size="xl" 
            animated={true}
            showText={true}
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>
        
        <Card className="mb-8 border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-400">
              🌍 About GAiA - Harmony of Culture
            </CardTitle>
            <p className="text-center text-xl text-muted-foreground">
              A Plan That Humanity Will Never Forget!
            </p>
          </CardHeader>
          <CardContent>
            <div className="text-center space-y-6">
              <div className="text-6xl animate-bounce">🌍💚🦋</div>
              <div className="text-lg text-muted-foreground max-w-4xl mx-auto">
                We Are a Strong Creative Open Minded Circuit To Happiness. A Lot of Grooves and Styles and Businesses And idea's Are involved in This Green And Alive Story. We Will not make you only be surprised but we show you true Souls, True Life, True Smiles A More Impressive way on Doing Things.
              </div>
              <div className="text-xl font-bold text-green-400">
                "Seeds Will form in to Music" 🎵
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardContent className="p-6 text-center">
              <Heart className="h-12 w-12 mx-auto text-green-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-green-400">True Souls</div>
              <div className="text-sm text-muted-foreground">Authentic connections and genuine experiences</div>
            </CardContent>
          </Card>

          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardContent className="p-6 text-center">
              <Globe className="h-12 w-12 mx-auto text-blue-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-blue-400">Global Impact</div>
              <div className="text-sm text-muted-foreground">Environmental conservation through technology</div>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardContent className="p-6 text-center">
              <Shield className="h-12 w-12 mx-auto text-purple-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-purple-400">Quantum Security</div>
              <div className="text-sm text-muted-foreground">Unbreakable protection for our community</div>
            </CardContent>
          </Card>

          <Card className="border-yellow-500/30 bg-yellow-900/20">
            <CardContent className="p-6 text-center">
              <Zap className="h-12 w-12 mx-auto text-yellow-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-yellow-400">Innovation</div>
              <div className="text-sm text-muted-foreground">Cutting-edge technology for positive change</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
          <CardContent className="p-8 text-center">
            <div className="text-2xl font-bold text-purple-400 mb-4">
              "Doesn't matter if You're Black Or White" 🌈
            </div>
            <div className="text-lg text-muted-foreground">
              Our goal is To Bring A Smile to every Soul
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default About
