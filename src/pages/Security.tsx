
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Shield, Lock, Eye, AlertTriangle } from 'lucide-react'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'

export default function Security() {
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
      
      <Card className="border-red-500/30 bg-gradient-to-r from-red-900/20 to-orange-900/20">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
            🛡️ Security Center
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Advanced security protocols protecting the GAiA Network
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card className="bg-muted/20 border-green-500/20">
              <CardContent className="p-4 text-center">
                <Shield className="h-12 w-12 text-green-400 mx-auto mb-2" />
                <h3 className="font-bold text-green-400">Network Protection</h3>
                <p className="text-sm text-muted-foreground">Advanced firewall systems</p>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/20 border-blue-500/20">
              <CardContent className="p-4 text-center">
                <Lock className="h-12 w-12 text-blue-400 mx-auto mb-2" />
                <h3 className="font-bold text-blue-400">Encryption</h3>
                <p className="text-sm text-muted-foreground">End-to-end security</p>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/20 border-purple-500/20">
              <CardContent className="p-4 text-center">
                <Eye className="h-12 w-12 text-purple-400 mx-auto mb-2" />
                <h3 className="font-bold text-purple-400">Monitoring</h3>
                <p className="text-sm text-muted-foreground">24/7 threat detection</p>
              </CardContent>
            </Card>
            
            <Card className="bg-muted/20 border-yellow-500/20">
              <CardContent className="p-4 text-center">
                <AlertTriangle className="h-12 w-12 text-yellow-400 mx-auto mb-2" />
                <h3 className="font-bold text-yellow-400">Alerts</h3>
                <p className="text-sm text-muted-foreground">Real-time notifications</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="text-center mt-8">
            <h3 className="text-2xl font-bold text-red-400 mb-2">Ultimate Protection</h3>
            <p className="text-muted-foreground">
              Our security infrastructure ensures the highest level of protection for all GAiA Network operations.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
