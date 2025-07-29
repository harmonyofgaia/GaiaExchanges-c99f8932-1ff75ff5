
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { User, Settings, Activity } from 'lucide-react'

export default function Profile() {
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
      
      <Card className="border-blue-500/30 bg-gradient-to-r from-blue-900/20 to-cyan-900/20">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
            👤 User Profile
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Manage your account and view your activity
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-blue-900/30 rounded-lg border border-blue-500/30">
              <User className="h-12 w-12 mx-auto text-blue-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-blue-400">Personal Info</div>
              <div className="text-sm text-muted-foreground">Account details</div>
            </div>

            <div className="text-center p-6 bg-cyan-900/30 rounded-lg border border-cyan-500/30">
              <Settings className="h-12 w-12 mx-auto text-cyan-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-cyan-400">Preferences</div>
              <div className="text-sm text-muted-foreground">Customize settings</div>
            </div>

            <div className="text-center p-6 bg-purple-900/30 rounded-lg border border-purple-500/30">
              <Activity className="h-12 w-12 mx-auto text-purple-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-purple-400">Activity History</div>
              <div className="text-sm text-muted-foreground">Track your actions</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
