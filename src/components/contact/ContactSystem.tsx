
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Mail, Send, Shield, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/integrations/supabase/client'

export function ContactSystem() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    contactType: 'general'
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Send email through Supabase Edge Function
      const response = await supabase.functions.invoke('send-contact-email', {
        body: {
          ...formData,
          to: 'info@cultureofharmony.net',
          timestamp: new Date().toISOString()
        }
      })

      if (response.error) {
        throw new Error(response.error.message)
      }

      // Store contact in database for tracking
      const { error: dbError } = await supabase.from('contact_submissions').insert({
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
        contact_type: formData.contactType,
        status: 'sent'
      })

      if (dbError) {
        console.error('Database error:', dbError)
        // Continue anyway since email was sent
      }

      toast.success('Message sent successfully!', {
        description: 'Your message has been sent to info@cultureofharmony.net'
      })

      // Reset form
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        contactType: 'general'
      })

    } catch (error) {
      console.error('Contact form error:', error)
      toast.error('Failed to send message', {
        description: 'Please try again or contact us directly at info@cultureofharmony.net'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const contactTypes = [
    { value: 'general', label: 'General Inquiry' },
    { value: 'support', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership Opportunity' },
    { value: 'investment', label: 'Investment Interest' },
    { value: 'media', label: 'Media & Press' },
    { value: 'legal', label: 'Legal & Compliance' }
  ]

  return (
    <div className="space-y-6">
      <Card className="border-green-500/20 bg-gradient-to-br from-green-900/10 to-blue-900/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Mail className="h-5 w-5" />
            Contact Culture of Harmony
          </CardTitle>
          <p className="text-muted-foreground">
            Get in touch with us at info@cultureofharmony.net - We respond within 24 hours
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name *</Label>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  required
                  placeholder="Your full name"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address *</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  placeholder="your@email.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contactType">Contact Type</Label>
              <select
                id="contactType"
                value={formData.contactType}
                onChange={(e) => setFormData(prev => ({ ...prev, contactType: e.target.value }))}
                className="w-full px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                {contactTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="subject">Subject *</Label>
              <Input
                id="subject"
                type="text"
                value={formData.subject}
                onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                required
                placeholder="What is this about?"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="message">Message *</Label>
              <Textarea
                id="message"
                value={formData.message}
                onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                required
                placeholder="Please provide details about your inquiry..."
                className="min-h-[120px]"
              />
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Shield className="h-4 w-4 text-green-400" />
              <span>Your information is securely encrypted and sent directly to info@cultureofharmony.net</span>
            </div>

            <Button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? (
                <>Sending Message...</>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Send Message to Culture of Harmony
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      <Card className="border-blue-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <CheckCircle className="h-5 w-5" />
            Direct Contact Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="font-medium text-green-400">Primary Email</h4>
              <p className="text-sm">info@cultureofharmony.net</p>
              <Badge className="bg-green-600">24/7 Response</Badge>
            </div>
            <div className="space-y-2">
              <h4 className="font-medium text-blue-400">Website</h4>
              <p className="text-sm">www.cultureofharmony.net</p>
              <Badge className="bg-blue-600">Coming Soon</Badge>
            </div>
          </div>
          
          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg p-4">
            <h4 className="font-medium text-purple-400 mb-2">About Culture of Harmony</h4>
            <p className="text-sm text-muted-foreground">
              We are building the future of sustainable cryptocurrency and environmental blockchain technology. 
              Our mission is to create tools that not only advance financial technology but also contribute to 
              healing our planet. Together we make the world a better place.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
