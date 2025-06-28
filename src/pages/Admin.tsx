
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield, Settings, Activity, Database, Users, FileText, Leaf } from 'lucide-react'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'
import { SecureAdminLogin } from '@/components/admin/SecureAdminLogin'
import { AdminMFA } from '@/components/admin/AdminMFA'
import { TokenManagement } from '@/components/admin/TokenManagement'
import { ComprehensiveSystemCheck } from '@/components/admin/ComprehensiveSystemCheck'
import { DailyAdvertising } from '@/components/admin/DailyAdvertising'
import { AuthTest } from '@/components/auth/AuthTest'
import { GreenProjectManager } from '@/components/admin/GreenProjectManager'

const Admin = () => {
  const navigate = useNavigate()
  const { isAdmin, isValidating, adminLogout } = useSecureAdmin()
  const [showMFA, setShowMFA] = useState(false)

  useEffect(() => {
    console.log('🔐 Admin Page Access Check:', { isAdmin, isValidating })
  }, [isAdmin, isValidating])

  const handleLogout = () => {
    adminLogout()
    navigate('/')
  }

  const handleMFASuccess = () => {
    setShowMFA(false)
  }

  if (isValidating) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900/10 flex items-center justify-center">
        <Card className="w-96 border-green-500/20">
          <CardContent className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-400 mx-auto mb-4"></div>
            <p className="text-muted-foreground">Validating admin session...</p>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!isAdmin) {
    return <SecureAdminLogin />
  }

  if (showMFA) {
    return <AdminMFA onSuccess={handleMFASuccess} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900/10">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Secure Admin Dashboard
            </h1>
            <p className="text-muted-foreground mt-2">
              Complete system management and security oversight
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => setShowMFA(true)}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Shield className="h-4 w-4 mr-2" />
              Enable MFA
            </Button>
            <Button onClick={handleLogout} variant="outline">
              Secure Logout
            </Button>
          </div>
        </div>

        <Tabs defaultValue="system-check" className="w-full">
          <TabsList className="grid w-full grid-cols-7 bg-black/50 backdrop-blur-md border border-green-500/20">
            <TabsTrigger value="system-check" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              <Activity className="h-4 w-4 mr-2" />
              System Check
            </TabsTrigger>
            <TabsTrigger value="token-management" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              <Database className="h-4 w-4 mr-2" />
              Token Management
            </TabsTrigger>
            <TabsTrigger value="advertising" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              <Settings className="h-4 w-4 mr-2" />
              Daily Advertising
            </TabsTrigger>
            <TabsTrigger value="auth-test" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              <Users className="h-4 w-4 mr-2" />
              Auth System Test
            </TabsTrigger>
            <TabsTrigger value="green-projects" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              <Leaf className="h-4 w-4 mr-2" />
              Green Projects
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="system-check" className="space-y-6 mt-6">
            <ComprehensiveSystemCheck />
          </TabsContent>
          
          <TabsContent value="token-management" className="space-y-6 mt-6">
            <TokenManagement />
          </TabsContent>
          
          <TabsContent value="advertising" className="space-y-6 mt-6">
            <DailyAdvertising />
          </TabsContent>
          
          <TabsContent value="auth-test" className="space-y-6 mt-6">
            <AuthTest />
          </TabsContent>
          
          <TabsContent value="green-projects" className="space-y-6 mt-6">
            <GreenProjectManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Admin
