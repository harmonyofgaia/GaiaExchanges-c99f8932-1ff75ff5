
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield, Lock, Crown, Vault } from 'lucide-react'
import { AdminCredentialsForm } from '@/components/admin/AdminCredentialsForm'
import { AdminDashboardTabs } from '@/components/admin/AdminDashboardTabs'
import { SecureVaultSystem } from '@/components/SecureVaultSystem'

export default function AdminLogin() {
  const [adminAccess, setAdminAccess] = useState<'none' | 'system' | 'vault'>('none')
  const [activeTab, setActiveTab] = useState('system')

  const handleSystemLogin = () => setAdminAccess('system')
  const handleVaultLogin = () => setAdminAccess('vault')

  const handleLogout = () => {
    setAdminAccess('none')
    // Secure session cleanup and logging would go here
  }

  if (adminAccess === 'system') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/10 to-green-900/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                👑 SUPREME ADMIN CONTROL CENTER
              </h1>
              <p className="text-xl text-muted-foreground mt-2">
                Ultimate System Control • Quantum Secured • Maximum Authority
              </p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="border-red-500/30">
              <Lock className="h-4 w-4 mr-2" />
              Secure Logout
            </Button>
          </div>
          
          <AdminDashboardTabs />
        </div>
      </div>
    )
  }

  if (adminAccess === 'vault') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-green-900/10 to-blue-900/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-emerald-400 bg-clip-text text-transparent">
                🏦 VAULT ADMIN CONTROL CENTER
              </h1>
              <p className="text-xl text-muted-foreground mt-2">
                Community Vault Admin • Investment Control • Full Transparency
              </p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="border-red-500/30">
              <Lock className="h-4 w-4 mr-2" />
              Secure Logout
            </Button>
          </div>
          <SecureVaultSystem />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/20 to-green-900/20 flex items-center justify-center p-6">
      <Card className="max-w-lg mx-auto border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-black/80 backdrop-blur-sm">
        <CardHeader>
          <div className="text-center">
            <Crown className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <CardTitle className="text-3xl font-bold text-green-400">
              🛡️ SUPREME ADMIN PORTAL
            </CardTitle>
            <p className="text-green-300 text-sm mt-2">
              Dual Admin Access • Ultimate Control • Quantum Protected
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="system" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                System Admin
              </TabsTrigger>
              <TabsTrigger value="vault" className="flex items-center gap-2">
                <Vault className="h-4 w-4" />
                Vault Admin
              </TabsTrigger>
            </TabsList>

            <TabsContent value="system">
              <AdminCredentialsForm loginType="system" onLoginSuccess={handleSystemLogin} />
            </TabsContent>

            <TabsContent value="vault">
              <AdminCredentialsForm loginType="vault" onLoginSuccess={handleVaultLogin} />
            </TabsContent>
          </Tabs>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20 rounded-lg">
            <p className="text-xs text-green-300 text-center">
              🛡️ DUAL ADMIN PORTAL • QUANTUM PROTECTED • MAXIMUM SECURITY
            </p>
            <p className="text-xs text-blue-300 text-center mt-1">
              Supreme Control • Vault Management • Ultimate Admin Access
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
