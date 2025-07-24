
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { WhitepaperGenerator } from '@/components/whitepaper/WhitepaperGenerator'
import { PromotionalContentGenerator } from '@/components/marketing/PromotionalContentGenerator'
import { GoogleAuthenticator } from '@/components/auth/GoogleAuthenticator'
import { Enhanced2FAAdminLogin } from '@/components/admin/Enhanced2FAAdminLogin'
import { FileText, Shield, Megaphone, Settings } from 'lucide-react'
import { useState } from 'react'

const ComprehensiveDocumentation = () => {
  const [adminAuthenticated, setAdminAuthenticated] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto p-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            📚 GAIA DOCUMENTATION CENTER
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Complete project documentation, security systems, and promotional materials
          </p>
        </div>

        <Tabs defaultValue="whitepaper" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-black/50 backdrop-blur-md">
            <TabsTrigger value="whitepaper" className="data-[state=active]:bg-green-500/20">
              <FileText className="h-4 w-4 mr-2" />
              Whitepaper
            </TabsTrigger>
            <TabsTrigger value="marketing" className="data-[state=active]:bg-purple-500/20">
              <Megaphone className="h-4 w-4 mr-2" />
              Marketing
            </TabsTrigger>
            <TabsTrigger value="security" className="data-[state=active]:bg-blue-500/20">
              <Shield className="h-4 w-4 mr-2" />
              Security & 2FA
            </TabsTrigger>
            <TabsTrigger value="admin" className="data-[state=active]:bg-red-500/20">
              <Settings className="h-4 w-4 mr-2" />
              Admin Access
            </TabsTrigger>
          </TabsList>

          <TabsContent value="whitepaper" className="mt-6">
            <WhitepaperGenerator />
          </TabsContent>

          <TabsContent value="marketing" className="mt-6">
            <PromotionalContentGenerator />
          </TabsContent>

          <TabsContent value="security" className="mt-6">
            <Card className="border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-blue-400">Google Authenticator Setup</CardTitle>
              </CardHeader>
              <CardContent>
                <GoogleAuthenticator
                  onSetupComplete={(secret) => console.log('2FA Setup:', secret)}
                  onVerificationSuccess={() => console.log('2FA Verified')}
                  userEmail="user@cultureofharmony.net"
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin" className="mt-6">
            {!adminAuthenticated ? (
              <Enhanced2FAAdminLogin onLoginSuccess={() => setAdminAuthenticated(true)} />
            ) : (
              <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
                <CardHeader>
                  <CardTitle className="text-green-400">🔐 Admin Access Granted</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-green-300">
                      Welcome to the GAIA Admin Dashboard. All security systems are active and protecting the ecosystem.
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg">
                        <div className="text-green-400 font-medium">Security Status</div>
                        <div className="text-sm text-green-300">71 layers active</div>
                      </div>
                      <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
                        <div className="text-blue-400 font-medium">Platform Status</div>
                        <div className="text-sm text-blue-300">All systems operational</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default ComprehensiveDocumentation
