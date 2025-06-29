import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield, Settings, Activity, Database, Users, FileText, Leaf, RotateCcw, CloudLightning, Server, Github, UserCog } from 'lucide-react'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'
import { SecureAdminLogin } from '@/components/admin/SecureAdminLogin'
import { AdminMFA } from '@/components/admin/AdminMFA'
import { TokenManagement } from '@/components/admin/TokenManagement'
import { ComprehensiveSystemCheck } from '@/components/admin/ComprehensiveSystemCheck'
import { DailyAdvertising } from '@/components/admin/DailyAdvertising'
import { AuthTest } from '@/components/auth/AuthTest'
import { GreenProjectManager } from '@/components/admin/GreenProjectManager'
import { BackgroundManager } from '@/components/admin/BackgroundManager'
import { UserManagementSystem } from '@/components/admin/UserManagementSystem'
import { toast } from 'sonner'
import { EncryptedSecurityReports } from '@/components/admin/EncryptedSecurityReports'
import { UltimateResilienceEngine } from '@/components/security/UltimateResilienceEngine'
import { CloudResilienceManager } from '@/components/admin/CloudResilienceManager'
import { ServerResilienceEngine } from '@/components/admin/ServerResilienceEngine'
import { GitHubAdminIntegration } from '@/components/github/GitHubAdminIntegration'
import { MasterArtworkGenerator } from '@/components/admin/MasterArtworkGenerator'
import { SystemStatusChecker } from '@/components/admin/SystemStatusChecker'
import { SecureConnectionManager } from '@/components/admin/SecureConnectionManager'
import { GitHubRollbackManager } from '@/components/github/GitHubRollbackManager'

const Admin = () => {
  const navigate = useNavigate()
  const { isAdmin, isValidating, adminLogout } = useSecureAdmin()
  const [showMFA, setShowMFA] = useState(false)
  const [reverseButtonEnabled, setReverseButtonEnabled] = useState(false)

  useEffect(() => {
    console.log('🔐 Admin Page Access Check:', { isAdmin, isValidating })
    
    // Load reverse button state
    const savedState = localStorage.getItem('admin-reverse-button-visible')
    setReverseButtonEnabled(savedState === 'true')
  }, [isAdmin, isValidating])

  const handleLogout = () => {
    adminLogout()
    navigate('/')
  }

  const handleLoginSuccess = () => {
    console.log('Admin login successful')
  }

  const handleMFASuccess = () => {
    setShowMFA(false)
  }

  const toggleReverseButton = () => {
    const newState = !reverseButtonEnabled
    setReverseButtonEnabled(newState)
    localStorage.setItem('admin-reverse-button-visible', newState.toString())
    
    // Trigger storage event for other components
    window.dispatchEvent(new StorageEvent('storage', {
      key: 'admin-reverse-button-visible',
      newValue: newState.toString()
    }))
    
    toast.success(`Reverse Button ${newState ? 'Enabled' : 'Disabled'}`, {
      description: `Admin reverse button is now ${newState ? 'visible' : 'hidden'} on all pages.`,
      duration: 3000
    })
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
    return <SecureAdminLogin onLoginSuccess={handleLoginSuccess} />
  }

  if (showMFA) {
    return <AdminMFA onMFASuccess={handleMFASuccess} />
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
              Complete system management and creative tools oversight
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button
              onClick={toggleReverseButton}
              className={`${reverseButtonEnabled ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'}`}
            >
              <RotateCcw className="h-4 w-4 mr-2" />
              Reverse Button {reverseButtonEnabled ? 'ON' : 'OFF'}
            </Button>
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

        <Tabs defaultValue="user-management" className="w-full">
          <TabsList className="grid w-full grid-cols-7 bg-black/50 backdrop-blur-md border border-green-500/20">
            <TabsTrigger value="user-management" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
              👥 User Management
            </TabsTrigger>
            <TabsTrigger value="connection-tracking" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              🐉 Connection Tracking
            </TabsTrigger>
            <TabsTrigger value="github-rollback" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              🔄 GitHub Rollback
            </TabsTrigger>
            <TabsTrigger value="completed-systems" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              ✅ Completed Systems
            </TabsTrigger>
            <TabsTrigger value="active-systems" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              🔄 Active Systems
            </TabsTrigger>
            <TabsTrigger value="security-management" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
              🛡️ Security Management
            </TabsTrigger>
            <TabsTrigger value="project-management" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              📋 Project Management
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="user-management" className="space-y-6 mt-6">
            <UserManagementSystem />
          </TabsContent>
          
          <TabsContent value="connection-tracking" className="space-y-6 mt-6">
            <SecureConnectionManager />
          </TabsContent>
          
          <TabsContent value="github-rollback" className="space-y-6 mt-6">
            <GitHubRollbackManager />
          </TabsContent>
          
          <TabsContent value="completed-systems" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center gap-2">
                    🎨 Creative Suite (COMPLETED)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <MasterArtworkGenerator />
                </CardContent>
              </Card>
              
              <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center gap-2">
                    <Database className="h-4 w-4" />
                    Token Management (COMPLETED)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <TokenManagement />
                </CardContent>
              </Card>
              
              <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    Authentication System (COMPLETED)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <AuthTest />
                </CardContent>
              </Card>
              
              <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
                <CardHeader>
                  <CardTitle className="text-green-400 flex items-center gap-2">
                    <Leaf className="h-4 w-4" />
                    Green Projects (COMPLETED)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <GreenProjectManager />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="active-systems" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-cyan-900/20">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center gap-2">
                    📊 System Status Monitor (ACTIVE)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <SystemStatusChecker />
                </CardContent>
              </Card>
              
              <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-cyan-900/20">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center gap-2">
                    <Activity className="h-4 w-4" />
                    System Health Check (ACTIVE)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ComprehensiveSystemCheck />
                </CardContent>
              </Card>
              
              <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-cyan-900/20">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center gap-2">
                    <Settings className="h-4 w-4" />
                    Daily Advertising (ACTIVE)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <DailyAdvertising />
                </CardContent>
              </Card>
              
              <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-cyan-900/20">
                <CardHeader>
                  <CardTitle className="text-blue-400 flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    GitHub Integration (ACTIVE)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <GitHubAdminIntegration />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="security-management" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-red-500/30 bg-gradient-to-br from-red-900/20 to-orange-900/20">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <Server className="h-4 w-4" />
                    Server Resilience Engine (ACTIVE)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ServerResilienceEngine />
                </CardContent>
              </Card>
              
              <Card className="border-red-500/30 bg-gradient-to-br from-red-900/20 to-orange-900/20">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <CloudLightning className="h-4 w-4" />
                    Ultimate Resilience (ACTIVE)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <UltimateResilienceEngine />
                </CardContent>
              </Card>
              
              <Card className="border-red-500/30 bg-gradient-to-br from-red-900/20 to-orange-900/20">
                <CardHeader>
                  <CardTitle className="text-red-400 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Security Reports (ACTIVE)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <EncryptedSecurityReports />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="project-management" className="space-y-6 mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/20 to-pink-900/20">
                <CardHeader>
                  <CardTitle className="text-purple-400 flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    Background Manager (COMPLETED)
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <BackgroundManager />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Admin
