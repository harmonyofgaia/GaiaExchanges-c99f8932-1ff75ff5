
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ContactSystem } from '@/components/contact/ContactSystem'
import { AppStorePreparation } from '@/components/appstore/AppStorePreparation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Smartphone, Mail, Download, Shield, ExternalLink } from 'lucide-react'

const AppStoreSubmission = () => {
  return (
    <div className="space-y-6 p-6">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
          App Store Submission Center
        </h1>
        <p className="text-xl text-muted-foreground mt-2">
          Complete package for submitting Harmony of Gaia to Apple App Store and Google Play Store
        </p>
        <Badge className="mt-4 bg-gradient-to-r from-green-600 to-blue-600 text-white text-lg px-6 py-2">
          Ready for Manual Submission
        </Badge>
      </div>

      <Tabs defaultValue="app-store" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="app-store" className="flex items-center gap-2">
            <Smartphone className="h-4 w-4" />
            App Store Package
          </TabsTrigger>
          <TabsTrigger value="contact" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            Contact System
          </TabsTrigger>
          <TabsTrigger value="instructions" className="flex items-center gap-2">
            <ExternalLink className="h-4 w-4" />
            Submission Guide
          </TabsTrigger>
        </TabsList>

        <TabsContent value="app-store" className="space-y-6 mt-6">
          <AppStorePreparation />
        </TabsContent>

        <TabsContent value="contact" className="space-y-6 mt-6">
          <ContactSystem />
        </TabsContent>

        <TabsContent value="instructions" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Shield className="h-5 w-5" />
                Complete Submission Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-blue-400">Apple App Store Submission</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-blue-500/10 rounded-lg">
                      <h4 className="font-medium mb-2">1. Prerequisites</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Apple Developer Account ($99/year)</li>
                        <li>• Mac computer with Xcode</li>
                        <li>• Valid iOS distribution certificate</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-green-500/10 rounded-lg">
                      <h4 className="font-medium mb-2">2. App Store Connect</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Create new app in App Store Connect</li>
                        <li>• Upload app bundle (.ipa file)</li>
                        <li>• Add screenshots and metadata</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-purple-500/10 rounded-lg">
                      <h4 className="font-medium mb-2">3. Review Process</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Submit for review (1-7 days)</li>
                        <li>• Address any feedback</li>
                        <li>• App goes live after approval</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-yellow-400">Google Play Store Submission</h3>
                  <div className="space-y-3 text-sm">
                    <div className="p-3 bg-yellow-500/10 rounded-lg">
                      <h4 className="font-medium mb-2">1. Prerequisites</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Google Play Console account ($25 one-time)</li>
                        <li>• Android app bundle (.aab file)</li>
                        <li>• Signed release keystore</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-orange-500/10 rounded-lg">
                      <h4 className="font-medium mb-2">2. Play Console</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Create new app in Play Console</li>
                        <li>• Upload app bundle</li>
                        <li>• Configure store listing</li>
                      </ul>
                    </div>
                    <div className="p-3 bg-red-500/10 rounded-lg">
                      <h4 className="font-medium mb-2">3. Review Process</h4>
                      <ul className="space-y-1 text-muted-foreground">
                        <li>• Submit for review (1-3 days)</li>
                        <li>• Address policy violations</li>
                        <li>• App published after approval</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-500/20 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-400 mb-4">What We've Prepared for You</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium text-blue-400 mb-2">📱 Complete Documentation</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>✅ Privacy Policy (GDPR & CCPA compliant)</li>
                      <li>✅ Terms of Service (International)</li>
                      <li>✅ App Store Descriptions</li>
                      <li>✅ Keywords and Categories</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium text-purple-400 mb-2">🔧 Technical Assets</h4>
                    <ul className="text-sm space-y-1 text-muted-foreground">
                      <li>✅ Official Gaia Logo (App Icon ready)</li>
                      <li>✅ Working Web Application</li>
                      <li>✅ Contact System (info@cultureofharmony.net)</li>
                      <li>✅ Security Documentation</li>
                    </ul>
                  </div>
                </div>
                
                <div className="mt-4 p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                  <h4 className="font-medium text-yellow-400 mb-2">⚠️ Manual Steps Required</h4>
                  <p className="text-sm text-muted-foreground">
                    You'll need to personally create developer accounts, build the mobile app versions, 
                    and submit through the official app store portals. This ensures your complete control 
                    over the submission process and maintains security of your developer credentials.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default AppStoreSubmission
