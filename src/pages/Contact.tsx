
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Mail, MessageSquare, Phone, MapPin } from 'lucide-react'

const Contact = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          📞 Contact Us
        </h1>
        <p className="text-xl text-muted-foreground mt-4">
          Get in touch • We'd love to hear from you • Building harmony together
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-400">
              <MessageSquare className="h-6 w-6" />
              Send us a Message
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input placeholder="Your Name" className="bg-blue-900/20 border-blue-500/30" />
            <Input placeholder="Your Email" type="email" className="bg-blue-900/20 border-blue-500/30" />
            <Input placeholder="Subject" className="bg-blue-900/20 border-blue-500/30" />
            <Textarea 
              placeholder="Your Message" 
              rows={5} 
              className="bg-blue-900/20 border-blue-500/30" 
            />
            <Button className="w-full bg-blue-600 hover:bg-blue-700">
              <Mail className="h-4 w-4 mr-2" />
              Send Message
            </Button>
          </CardContent>
        </Card>

        <div className="space-y-6">
          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Mail className="h-6 w-6" />
                Email
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                For general inquiries and support
              </p>
              <p className="text-green-400 font-semibold mt-2">
                hello@harmonyofgaia.com
              </p>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Phone className="h-6 w-6" />
                Community
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Join our community discussions
              </p>
              <p className="text-purple-400 font-semibold mt-2">
                Discord • Telegram • Twitter
              </p>
            </CardContent>
          </Card>

          <Card className="border-cyan-500/30 bg-cyan-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-cyan-400">
                <MapPin className="h-6 w-6" />
                Global Presence
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Operating across 47 countries
              </p>
              <p className="text-cyan-400 font-semibold mt-2">
                Worldwide • Remote First • Decentralized
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Contact
