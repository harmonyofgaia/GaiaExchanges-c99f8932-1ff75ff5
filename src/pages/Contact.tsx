
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Mail, MessageCircle, Phone, MapPin, Send } from 'lucide-react'
import { useState } from 'react'
import HoverSidebar from '@/components/HoverSidebar'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Contact form submitted:', formData)
    // Handle form submission here
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-900/20 via-blue-900/20 to-purple-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <Card className="mb-8 border-teal-500/30 bg-gradient-to-r from-teal-900/30 to-blue-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-400">
                📞 Contact GAiA
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                Get in touch with our community team
              </p>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <MessageCircle className="h-6 w-6" />
                  Send us a message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Your name"
                      className="bg-black/30 border-blue-500/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your.email@example.com"
                      className="bg-black/30 border-blue-500/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      placeholder="How can we help?"
                      className="bg-black/30 border-blue-500/30"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell us more about your inquiry..."
                      rows={6}
                      className="bg-black/30 border-blue-500/30"
                    />
                  </div>

                  <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 h-12">
                    <Send className="h-4 w-4 mr-2" />
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="border-green-500/30 bg-green-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <Mail className="h-6 w-6" />
                    Email Support
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <div className="font-bold text-green-300">General Support</div>
                      <div className="text-muted-foreground">support@gaia-harmony.com</div>
                    </div>
                    <div>
                      <div className="font-bold text-green-300">Partnership Inquiries</div>
                      <div className="text-muted-foreground">partnerships@gaia-harmony.com</div>
                    </div>
                    <div>
                      <div className="font-bold text-green-300">Technical Support</div>
                      <div className="text-muted-foreground">tech@gaia-harmony.com</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-purple-500/30 bg-purple-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-400">
                    <MessageCircle className="h-6 w-6" />
                    Community Channels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <Button className="w-full bg-indigo-600 hover:bg-indigo-700 justify-start">
                      Join Discord Community
                    </Button>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 justify-start">
                      Follow on Twitter
                    </Button>
                    <Button className="w-full bg-red-600 hover:bg-red-700 justify-start">
                      Subscribe on YouTube
                    </Button>
                    <Button className="w-full bg-orange-600 hover:bg-orange-700 justify-start">
                      Join Telegram
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-orange-500/30 bg-orange-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-orange-400">
                    <Phone className="h-6 w-6" />
                    Response Times
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>General Inquiries:</span>
                      <span className="text-orange-300">24-48 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Technical Support:</span>
                      <span className="text-orange-300">12-24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Urgent Issues:</span>
                      <span className="text-orange-300">2-6 hours</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* FAQ Section */}
          <Card className="mt-8 border-cyan-500/30 bg-cyan-900/20">
            <CardHeader>
              <CardTitle className="text-cyan-400">Frequently Asked Questions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-cyan-300 mb-2">How do I get started with GAiA?</h4>
                  <p className="text-muted-foreground mb-4">Create a free account and start exploring our gaming ecosystem. No prior blockchain experience needed!</p>
                </div>
                <div>
                  <h4 className="font-bold text-cyan-300 mb-2">Is GAiA available on mobile?</h4>
                  <p className="text-muted-foreground mb-4">Yes! Download our mobile app from the App Store or Google Play for the full GAiA experience.</p>
                </div>
                <div>
                  <h4 className="font-bold text-cyan-300 mb-2">How does GAiA help the environment?</h4>
                  <p className="text-muted-foreground mb-4">A portion of all transactions goes directly to verified environmental restoration projects worldwide.</p>
                </div>
                <div>
                  <h4 className="font-bold text-cyan-300 mb-2">Can I earn real money playing games?</h4>
                  <p className="text-muted-foreground mb-4">Yes! Earn GAiA tokens through gameplay which can be traded or used within our ecosystem.</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default Contact
