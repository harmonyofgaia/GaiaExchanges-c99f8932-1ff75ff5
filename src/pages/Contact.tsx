
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Mail, MessageCircle, Phone, Globe, Heart } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Message sent! We\'ll get back to you soon! 🌍✨')
    setFormData({ name: '', email: '', message: '' })
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900/10 to-green-900/10">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-400 via-green-400 to-purple-400 bg-clip-text text-transparent mb-6">
            Contact GAIA
          </h1>
          <p className="text-xl text-muted-foreground">
            Let's Create Something Beautiful Together
          </p>
          <p className="text-lg text-green-400 mt-2">
            "Seeds Will Form Into Music" - Share Your Ideas With Us
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Contact Form */}
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <MessageCircle className="h-6 w-6" />
                Send Us a Message
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-blue-300">Your Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="bg-black/30 border-blue-500/30 text-blue-100"
                    placeholder="Share your beautiful name..."
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="text-blue-300">Email Address</Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="bg-black/30 border-blue-500/30 text-blue-100"
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message" className="text-blue-300">Your Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    className="bg-black/30 border-blue-500/30 text-blue-100 min-h-[150px]"
                    placeholder="Tell us about your ideas, dreams, or how we can help bring a smile to your soul..."
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-bold py-3"
                >
                  <Heart className="h-5 w-5 mr-2" />
                  Send Message With Love
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-green-400">
                  <Globe className="h-6 w-6" />
                  Our Mission
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  We're building a global community of creative souls who believe in positive change, 
                  environmental protection, and spreading smiles across the world.
                </p>
                <div className="space-y-2">
                  <p className="text-green-300 font-semibold">
                    "Bring A Smile to every Soul"
                  </p>
                  <p className="text-blue-300">
                    "Doesn't matter if You're Black Or White"
                  </p>
                  <p className="text-purple-300">
                    "True Souls, True Life, True Smiles"
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Mail className="h-6 w-6" />
                  Connect With Us
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Join our creative circuit to happiness and be part of the movement that's 
                  changing the world one seed at a time.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Globe className="h-5 w-5 text-blue-400" />
                    <span className="text-blue-300">Global Community</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Heart className="h-5 w-5 text-red-400" />
                    <span className="text-red-300">Spreading Love & Creativity</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-green-400" />
                    <span className="text-green-300">Open Communication</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-yellow-500/30 bg-yellow-900/20">
              <CardHeader>
                <CardTitle className="text-center text-yellow-400">
                  "Seeds Will Form Into Music"
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-center text-muted-foreground">
                  Every message, every idea, every connection contributes to our living 
                  symphony of positive change. Let's create something beautiful together!
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
