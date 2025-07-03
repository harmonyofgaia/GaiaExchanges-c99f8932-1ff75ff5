
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'

export default function AboutUs() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 p-6">
      <div className="container mx-auto space-y-6">
        <div className="text-center mb-8">
          <UniversalGaiaLogo 
            size="lg" 
            animated={true}
            showText={true}
            className="mx-auto mb-6"
          />
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            🌍 ABOUT HARMONY OF GAIA
          </h1>
        </div>

        <Card className="border-green-500/30 bg-gradient-to-r from-green-900/30 to-blue-900/30">
          <CardHeader>
            <CardTitle className="text-2xl text-green-400 text-center">
              Our Vision: A Strong Creative Open Minded Circuit To Happiness
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center">
              <p className="text-xl text-green-300 mb-4">
                "We Are a Strong Creative Open Minded Circuit To Happiness"
              </p>
              <p className="text-lg text-blue-300">
                "A Lot of Grooves and Styles and Businesses And ideas Are involved in This Green And Alive Story"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-purple-900/20 border border-purple-500/30 rounded-lg p-6">
                <h3 className="text-purple-400 font-bold text-xl mb-3">🎵 Our Mission</h3>
                <p className="text-purple-300">
                  "Seeds Will form in to Music - We Create a New Cult till the End Of the World. 
                  We show you true Souls, True Life, True Smiles A More Impressive way on Doing Things."
                </p>
              </div>
              
              <div className="bg-orange-900/20 border border-orange-500/30 rounded-lg p-6">
                <h3 className="text-orange-400 font-bold text-xl mb-3">😊 Our Goal</h3>
                <p className="text-orange-300">
                  "My Goal is To Bring A Smile to every Soul. 'Doesn't matter if Your Black Or White' - 
                  Enjoy this massive Good Vibration"
                </p>
              </div>
            </div>

            <div className="bg-cyan-900/20 border border-cyan-500/30 rounded-lg p-6 text-center">
              <h3 className="text-cyan-400 font-bold text-xl mb-3">🌟 What We Offer</h3>
              <p className="text-cyan-300 mb-4">
                "You will see a lot of Good projects on all different Sights on this platform, You will see many artists And Video's, 
                Full Transparency, A Open Wallet Where you can see every Step."
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <Badge className="bg-green-600">True Transparency</Badge>
                <Badge className="bg-blue-600">Creative Projects</Badge>
                <Badge className="bg-purple-600">Community First</Badge>
                <Badge className="bg-orange-600">Environmental Impact</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
