
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, MessageSquare, Phone, MapPin, Shield } from 'lucide-react'

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-green-400 mb-4">
            📧 CONTACT US
          </h1>
          <p className="text-muted-foreground">
            Get in touch with the GAIA team - Dragon-secured communication
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <MessageSquare className="h-5 w-5" />
                Send Message
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Name</label>
                <Input placeholder="Your name" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Email</label>
                <Input type="email" placeholder="your@email.com" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Subject</label>
                <Input placeholder="Message subject" />
              </div>
              <div>
                <label className="text-sm text-muted-foreground mb-2 block">Message</label>
                <Textarea placeholder="Your message..." rows={5} />
              </div>
              <Button className="w-full bg-green-600 hover:bg-green-700">
                <Mail className="h-4 w-4 mr-2" />
                Send Dragon-Protected Message
              </Button>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Phone className="h-5 w-5" />
                  Contact Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">contact@harmonyofgaia.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-blue-400" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">+1 (555) GAIA-HELP</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-purple-400" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-muted-foreground">Global - Dragon Protected</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Shield className="h-5 w-5" />
                  Support Hours
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Monday - Friday</span>
                    <span className="text-green-400">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Weekend</span>
                    <span className="text-green-400">24/7</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Dragon Response</span>
                    <span className="text-green-400">Instant</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        <Card className="mt-8 border-red-500/30 bg-gradient-to-r from-red-900/20 to-orange-900/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <h3 className="text-2xl font-bold text-red-400 mb-4">
                🐉 Dragon-Secured Communication
              </h3>
              <p className="text-muted-foreground">
                All communications are encrypted with quantum-level dragon security protocols.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Contact
