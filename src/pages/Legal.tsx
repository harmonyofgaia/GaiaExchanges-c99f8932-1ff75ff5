
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { UniversalGaiaLogo } from '@/components/branding/UniversalGaiaLogo'
import { Scale, FileText, Shield } from 'lucide-react'

export default function Legal() {
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
      
      <Card className="border-amber-500/30 bg-gradient-to-r from-amber-900/20 to-yellow-900/20">
        <CardHeader>
          <CardTitle className="text-center text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-yellow-400">
            ⚖️ Legal Information
          </CardTitle>
          <p className="text-center text-xl text-muted-foreground">
            Terms, privacy policy, and legal compliance
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-amber-900/30 rounded-lg border border-amber-500/30">
              <Scale className="h-12 w-12 mx-auto text-amber-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-amber-400">Terms of Service</div>
              <div className="text-sm text-muted-foreground">Usage agreement</div>
            </div>

            <div className="text-center p-6 bg-yellow-900/30 rounded-lg border border-yellow-500/30">
              <FileText className="h-12 w-12 mx-auto text-yellow-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-yellow-400">Privacy Policy</div>
              <div className="text-sm text-muted-foreground">Data protection</div>
            </div>

            <div className="text-center p-6 bg-orange-900/30 rounded-lg border border-orange-500/30">
              <Shield className="h-12 w-12 mx-auto text-orange-400 animate-pulse mb-4" />
              <div className="text-xl font-bold text-orange-400">Compliance</div>
              <div className="text-sm text-muted-foreground">Regulatory information</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
