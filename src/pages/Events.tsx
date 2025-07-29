
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { Calendar, Users, MapPin } from 'lucide-react'

export default function Events() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-center mb-8">
        <UniversalGaiaLogo 
          size="lg" 
          animated={true}
          showText={true}
          className="hover:scale-105 transition-transform duration-300"
        />
      </div>
      
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
            🎉 Events & Meetups
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Join community events and virtual gatherings
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-purple-900/30 rounded-lg border border-purple-500/30">
              <Calendar className="h-12 w-12 mx-auto text-purple-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-purple-400">Upcoming Events</div>
              <div className="text-sm text-muted-foreground">Schedule & calendar</div>
            </div>

            <div className="text-center p-6 bg-pink-900/30 rounded-lg border border-pink-500/30">
              <Users className="h-12 w-12 mx-auto text-pink-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-pink-400">Community Meetups</div>
              <div className="text-sm text-muted-foreground">Local gatherings</div>
            </div>

            <div className="text-center p-6 bg-blue-900/30 rounded-lg border border-blue-500/30">
              <MapPin className="h-12 w-12 mx-auto text-blue-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-blue-400">Virtual Events</div>
              <div className="text-sm text-muted-foreground">Online participation</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
