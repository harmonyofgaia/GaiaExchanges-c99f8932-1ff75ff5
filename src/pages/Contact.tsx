
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Mail, MessageSquare, Phone, MapPin, Send } from 'lucide-react'
import { toast } from 'sonner'
import HoverSidebar from '@/components/HoverSidebar'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    contactType: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all required fields')
      return
    }

    setLoading(true)
    try {
      // Simulate form submission
      await new Promise(resolve => setTimeout(resolve, 1500))
      
      toast.success('Message sent successfully!', {
        description: 'We\'ll get back to you within 24 hours.',
        duration: 5000
      })
      
      setFormData({
        name: '',
        email: '',
        subject: '',
        contactType: '',
        message: ''
      })
    } catch (error) {
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-cyan-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          {/* Header */}
          <Card className="mb-8 border-blue-500/30 bg-gradient-to-r from-blue-900/30 to-cyan-900/30">
            <CardHeader>
              <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                📧 Contact Us
              </CardTitle>
              <p className="text-center text-xl text-muted-foreground">
                Get in touch with the Harmony of Gaia community
              </p>
            </CardHeader>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="border-purple-500/30 bg-purple-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-purple-400">
                    <MessageSquare className="h-6 w-6" />
                    Send us a Message
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="name">Name *</Label>
                        <Input
                          id="name"
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          placeholder="Your full name"
                          className="bg-black/30 border-purple-500/30"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          placeholder="your.email@example.com"
                          className="bg-black/30 border-purple-500/30"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          value={formData.subject}
                          onChange={(e) => setFormData({...formData, subject: e.target.value})}
                          placeholder="Brief subject line"
                          className="bg-black/30 border-purple-500/30"
                        />
                      </div>
                      <div>
                        <Label htmlFor="contactType">Contact Type</Label>
                        <Select value={formData.contactType} onValueChange={(value) => setFormData({...formData, contactType: value})}>
                          <SelectTrigger className="bg-black/30 border-purple-500/30">
                            <SelectValue placeholder="Select type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="general">General Inquiry</SelectItem>
                            <SelectItem value="technical">Technical Support</SelectItem>
                            <SelectItem value="partnership">Partnership</SelectItem>
                            <SelectItem value="feedback">Feedback</SelectItem>
                            <SelectItem value="bug-report">Bug Report</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message">Message *</Label>
                      <Textarea
                        id="message"
                        value={formData.message}
                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                        placeholder="Tell us how we can help you..."
                        rows={6}
                        className="bg-black/30 border-purple-500/30"
                      />
                    </div>

                    <Button 
                      type="submit" 
                      disabled={loading}
                      className="w-full bg-purple-600 hover:bg-purple-700 h-12"
                    >
                      {loading ? 'Sending...' : (
                        <>
                          <Send className="h-4 w-4 mr-2" />
                          Send Message
                        </>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="space-y-6">
              <Card className="border-green-500/30 bg-green-900/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-green-400">
                    <Mail className="h-6 w-6" />
                    Get in Touch
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-green-400" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-sm text-muted-foreground">contact@harmonyofgaia.com</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MessageSquare className="h-5 w-5 text-blue-400" />
                    <div>
                      <p className="font-medium">Discord</p>
                      <p className="text-sm text-muted-foreground">Join our community</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-purple-400" />
                    <div>
                      <p className="font-medium">Global Community</p>
                      <p className="text-sm text-muted-foreground">Worldwide presence</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-cyan-500/30 bg-cyan-900/20">
                <CardHeader>
                  <CardTitle className="text-cyan-400">Response Times</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm">General Inquiries</span>
                    <span className="text-sm text-cyan-400">24-48 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Technical Support</span>
                    <span className="text-sm text-green-400">12-24 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Bug Reports</span>
                    <span className="text-sm text-orange-400">4-12 hours</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm">Partnership</span>
                    <span className="text-sm text-purple-400">2-5 days</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
