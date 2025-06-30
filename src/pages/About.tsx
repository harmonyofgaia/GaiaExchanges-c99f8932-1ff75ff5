
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Users, Heart, Globe, Leaf } from 'lucide-react'

const About = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          ℹ️ About Harmony of Gaia
        </h1>
        <p className="text-xl text-muted-foreground mt-4">
          Creating harmony between technology and nature • Building a sustainable future
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card className="border-green-500/30 bg-green-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-400">
              <Leaf className="h-6 w-6" />
              Our Mission
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              To create a harmonious balance between cutting-edge technology and environmental conservation, 
              ensuring every digital innovation contributes to real-world positive impact.
            </p>
            <div className="flex gap-2 flex-wrap">
              <Badge className="bg-green-600">Environmental</Badge>
              <Badge className="bg-blue-600">Technology</Badge>
              <Badge className="bg-purple-600">Innovation</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <Globe className="h-6 w-6" />
              Global Impact
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground mb-4">
              Through the GAiA token ecosystem, we've facilitated real environmental projects 
              across 47 countries, helping wildlife conservation and sustainable development.
            </p>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Trees Planted</span>
                <span className="text-green-400 font-bold">2,847</span>
              </div>
              <div className="flex justify-between">
                <span>Animals Helped</span>
                <span className="text-blue-400 font-bold">1,653</span>
              </div>
              <div className="flex justify-between">
                <span>Countries Reached</span>
                <span className="text-purple-400 font-bold">47</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="border-purple-500/30 bg-purple-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Heart className="h-6 w-6" />
            Culture of Harmony
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground text-center">
            "We Are a Strong Creative Open Minded Circuit To Happiness. Seeds Will form in to Music. 
            Enjoy this massive Good Vibration. We have a lot to offer for maybe you little big planet 
            and hopefully we Boost Some Creativeness inside of You And especially my Goal is To Bring A Smile to every Soul."
          </p>
          <div className="text-center mt-4">
            <Badge className="bg-gradient-to-r from-green-400 to-blue-400 text-black">
              "Doesn't matter if You're Black Or White"
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default About
