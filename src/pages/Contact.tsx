
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Phone, Mail, Globe, MessageCircle } from 'lucide-react'

const Contact = () => {
  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
      <div className="container mx-auto max-w-4xl">
        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-purple-900/30">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400 text-3xl">
              <Phone className="h-8 w-8" />
              📞 Contact Harmony of Gaia
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-green-400 flex items-center gap-2">
                    <Mail className="h-5 w-5" />
                    Get in Touch
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-green-900/20 rounded border border-green-500/30">
                      <Globe className="h-5 w-5 text-green-400" />
                      <span className="text-muted-foreground">www.gaiaexchanges.net</span>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-blue-900/20 rounded border border-blue-500/30">
                      <MessageCircle className="h-5 w-5 text-blue-400" />
                      <span className="text-muted-foreground">Available 24/7</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-bold text-purple-400">Send us a Message</h3>
                <div className="space-y-4">
                  <Input placeholder="Your Name" className="bg-black/20" />
                  <Input placeholder="Your Email" className="bg-black/20" />
                  <Textarea placeholder="Your Message" className="bg-black/20 h-32" />
                  <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    Send Message
                  </Button>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-gradient-to-r from-purple-900/40 to-blue-900/40 rounded-lg border border-purple-500/30">
              <div className="text-center">
                <h2 className="text-2xl font-bold text-purple-400 mb-2">
                  🌍 Join Our Community
                </h2>
                <p className="text-lg text-muted-foreground">
                  Be part of the Harmony of Gaia ecosystem and experience true innovation.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Contact
