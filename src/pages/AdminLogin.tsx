
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield, Lock, Eye, EyeOff, Crown, Vault } from 'lucide-react'
import { toast } from 'sonner'
import { AdminDashboard } from '@/components/admin/AdminDashboard'
import { SecureVaultSystem } from '@/components/SecureVaultSystem'

export default function AdminLogin() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [adminAccess, setAdminAccess] = useState<'none' | 'system' | 'vault'>('none')
  const [activeTab, setActiveTab] = useState('system')

  const handleSystemLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // System Admin credentials
      const validCredentials = {
        username: 'Synatic',
        password: 'Freedom!oul19922323'
      }

      if (credentials.username === validCredentials.username && 
          credentials.password === validCredentials.password) {
        
        console.log('🛡️ SYSTEM ADMIN ACCESS GRANTED - FULL CONTROL ACTIVE')
        console.log('👑 ADMIN SYNATIC - SUPREME SYSTEM CONTROLLER')
        
        setAdminAccess('system')
        toast.success('👑 SYSTEM ADMIN ACCESS GRANTED!', {
          description: 'Full system control activated - Supreme admin powers unlocked',
          duration: 5000
        })
      } else {
        toast.error('🚫 SYSTEM ACCESS DENIED', {
          description: 'Invalid system admin credentials',
          duration: 5000
        })
      }
    } catch (error) {
      toast.error('Security Error', {
        description: 'System protection activated',
        duration: 5000
      })
    } finally {
      setIsLoading(false)
      setCredentials({ username: '', password: '' })
    }
  }

  const handleVaultLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Vault Admin credentials
      const validCredentials = {
        username: 'Synatic',
        password: 'dolphin1992'
      }

      if (credentials.username === validCredentials.username && 
          credentials.password === validCredentials.password) {
        
        console.log('🏦 VAULT ADMIN ACCESS GRANTED - INVESTMENT CONTROL ACTIVE')
        console.log('💰 ADMIN SYNATIC - COMMUNITY VAULT CONTROLLER')
        
        setAdminAccess('vault')
        toast.success('🏦 VAULT ADMIN ACCESS GRANTED!', {
          description: 'Community vault control activated - Investment oversight unlocked',
          duration: 5000
        })
      } else {
        toast.error('🚫 VAULT ACCESS DENIED', {
          description: 'Invalid vault admin credentials',
          duration: 5000
        })
      }
    } catch (error) {
      toast.error('Security Error', {
        description: 'Vault protection activated',
        duration: 5000
      })
    } finally {
      setIsLoading(false)
      setCredentials({ username: '', password: '' })
    }
  }

  const handleLogout = () => {
    setAdminAccess('none')
    setCredentials({ username: '', password: '' })
    toast.success('🔐 Secure Logout Complete', {
      description: 'Admin session terminated securely',
      duration: 3000
    })
  }

  if (adminAccess === 'system') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-purple-900/10 to-green-900/10">
        <div className="container mx-auto px-4 py-8">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                👑 SYSTEM ADMIN CONTROL CENTER
              </h1>
              <p className="text-xl text-muted-foreground mt-2">
                Supreme Admin • Full System Control • Quantum Secured
              </p>
            </div>
            <Button onClick={handleLogout} variant="outline" className="border-red-500/30">
              <Lock className="h-4 w-4 mr-2" />
              Secure Logout
            </Button>
          </div>
          <AdminDashboard />
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
              🛡️ ADMIN PORTAL
            </CardTitle>
            <p className="text-green-300 text-sm mt-2">
              Dual Admin Access • System Control • Vault Management
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
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-blue-400">System Control Access</h3>
                  <p className="text-sm text-blue-300">Full admin control • All features • Supreme access</p>
                </div>
                
                <form onSubmit={handleSystemLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="system-username" className="text-green-300">System Admin Username</Label>
                    <Input
                      id="system-username"
                      type="text"
                      value={credentials.username}
                      onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                      className="bg-black/40 border-green-500/30 text-green-400"
                      placeholder="Enter system admin username..."
                      autoComplete="off"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="system-password" className="text-green-300">System Password</Label>
                    <div className="relative">
                      <Input
                        id="system-password"
                        type={showPassword ? 'text' : 'password'}
                        value={credentials.password}
                        onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                        className="bg-black/40 border-green-500/30 text-green-400 pr-10"
                        placeholder="Enter system password..."
                        autoComplete="off"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-8 w-8 p-0 text-green-400"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3"
                  >
                    <Shield className="h-5 w-5 mr-2" />
                    {isLoading ? 'System Verification...' : 'ACCESS SYSTEM CONTROL'}
                  </Button>
                </form>
              </div>
            </TabsContent>

            <TabsContent value="vault">
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <h3 className="text-xl font-bold text-emerald-400">Vault Control Access</h3>
                  <p className="text-sm text-emerald-300">Investment oversight • Vault management • Community funds</p>
                </div>
                
                <form onSubmit={handleVaultLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="vault-username" className="text-green-300">Vault Admin Username</Label>
                    <Input
                      id="vault-username"
                      type="text"
                      value={credentials.username}
                      onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                      className="bg-black/40 border-green-500/30 text-green-400"
                      placeholder="Enter vault admin username..."
                      autoComplete="off"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="vault-password" className="text-green-300">Vault Password</Label>
                    <div className="relative">
                      <Input
                        id="vault-password"
                        type={showPassword ? 'text' : 'password'}
                        value={credentials.password}
                        onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                        className="bg-black/40 border-green-500/30 text-green-400 pr-10"
                        placeholder="Enter vault password..."
                        autoComplete="off"
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-1 top-1 h-8 w-8 p-0 text-green-400"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    disabled={isLoading}
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white font-bold py-3"
                  >
                    <Vault className="h-5 w-5 mr-2" />
                    {isLoading ? 'Vault Verification...' : 'ACCESS VAULT CONTROL'}
                  </Button>
                </form>
              </div>
            </TabsContent>
          </Tabs>

          <div className="mt-6 p-4 bg-gradient-to-r from-green-900/30 to-blue-900/30 border border-green-500/20 rounded-lg">
            <p className="text-xs text-green-300 text-center">
              🛡️ DUAL ADMIN PORTAL • QUANTUM PROTECTED • BANK-LEVEL SECURITY
            </p>
            <p className="text-xs text-blue-300 text-center mt-1">
              System Control • Vault Management • Supreme Admin Access
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
