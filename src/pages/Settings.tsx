
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { Settings as SettingsIcon, User, Shield } from 'lucide-react'

export default function Settings() {
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
      
      <Card className="border-gray-500/30 bg-gradient-to-r from-gray-900/20 to-slate-900/20">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-slate-400">
            ⚙️ Settings
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Customize your GAiA experience
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-gray-900/30 rounded-lg border border-gray-500/30">
              <SettingsIcon className="h-12 w-12 mx-auto text-gray-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-gray-400">General Settings</div>
              <div className="text-sm text-muted-foreground">App preferences</div>
            </div>

            <div className="text-center p-6 bg-blue-900/30 rounded-lg border border-blue-500/30">
              <User className="h-12 w-12 mx-auto text-blue-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-blue-400">Profile Settings</div>
              <div className="text-sm text-muted-foreground">Personal information</div>
            </div>

            <div className="text-center p-6 bg-red-900/30 rounded-lg border border-red-500/30">
              <Shield className="h-12 w-12 mx-auto text-red-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-red-400">Security Settings</div>
              <div className="text-sm text-muted-foreground">Privacy & security</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
