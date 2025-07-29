
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { Bell, Mail, Smartphone } from 'lucide-react'

export default function Notifications() {
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
      
      <Card className="border-indigo-500/30 bg-gradient-to-r from-indigo-900/20 to-violet-900/20">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">
            🔔 Notifications
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Stay informed with personalized alerts
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-indigo-900/30 rounded-lg border border-indigo-500/30">
              <Bell className="h-12 w-12 mx-auto text-indigo-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-indigo-400">App Notifications</div>
              <div className="text-sm text-muted-foreground">In-app alerts</div>
            </div>

            <div className="text-center p-6 bg-violet-900/30 rounded-lg border border-violet-500/30">
              <Mail className="h-12 w-12 mx-auto text-violet-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-violet-400">Email Alerts</div>
              <div className="text-sm text-muted-foreground">Important updates</div>
            </div>

            <div className="text-center p-6 bg-purple-900/30 rounded-lg border border-purple-500/30">
              <Smartphone className="h-12 w-12 mx-auto text-purple-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-purple-400">Push Notifications</div>
              <div className="text-sm text-muted-foreground">Mobile alerts</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
