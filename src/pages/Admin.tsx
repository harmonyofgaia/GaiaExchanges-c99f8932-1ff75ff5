
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Shield, Settings, Activity, Database, Users, FileText, Leaf, RotateCcw, CloudLightning, Server, Github } from 'lucide-react'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'
import { SecureAdminLogin } from '@/components/admin/SecureAdminLogin'
import { AdminMFA } from '@/components/admin/AdminMFA'
import { TokenManagement } from '@/components/admin/TokenManagement'
import { ComprehensiveSystemCheck } from '@/components/admin/ComprehensiveSystemCheck'
import { DailyAdvertising } from '@/components/admin/DailyAdvertising'
import { AuthTest } from '@/components/auth/AuthTest'
import { GreenProjectManager } from '@/components/admin/GreenProjectManager'
import { BackgroundManager } from '@/components/admin/BackgroundManager'
import { toast } from 'sonner'
import { EncryptedSecurityReports } from '@/components/admin/EncryptedSecurityReports'
import { UltimateResilienceEngine } from '@/components/security/UltimateResilienceEngine'
import { CloudResilienceManager } from '@/components/admin/CloudResilienceManager'
import { ServerResilienceEngine } from '@/components/admin/ServerResilienceEngine'
import { GitHubAdminIntegration } from '@/components/github/GitHubAdminIntegration'
import { MasterArtworkGenerator } from '@/components/admin/MasterArtworkGenerator'
import { SystemStatusChecker } from '@/components/admin/SystemStatusChecker'

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

        <Tabs defaultValue="artwork-generator" className="w-full">
          <TabsList className="grid w-full grid-cols-12 bg-black/50 backdrop-blur-md border border-green-500/20">
            <TabsTrigger value="artwork-generator" className="data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
              🎨 Creative Suite
            </TabsTrigger>
            <TabsTrigger value="system-status" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              📊 System Status
            </TabsTrigger>
            <TabsTrigger value="server-resilience" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
              <Server className="h-4 w-4 mr-2" />
              Server Shield
            </TabsTrigger>
            <TabsTrigger value="github-integration" className="data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
              <Github className="h-4 w-4 mr-2" />
              GitHub Force
            </TabsTrigger>
            <TabsTrigger value="resilience" className="data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">
              <CloudLightning className="h-4 w-4 mr-2" />
              Resilience
            </TabsTrigger>
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
            <TabsTrigger value="backgrounds" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              <FileText className="h-4 w-4 mr-2" />
              Backgrounds
            </TabsTrigger>
            <TabsTrigger value="security-reports" className="data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
              <FileText className="h-4 w-4 mr-2" />
              Security Reports
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="artwork-generator" className="space-y-6 mt-6">
            <MasterArtworkGenerator />
          </TabsContent>
          
          <TabsContent value="system-status" className="space-y-6 mt-6">
            <SystemStatusChecker />
          </TabsContent>
          
          <TabsContent value="server-resilience" className="space-y-6 mt-6">
            <ServerResilienceEngine />
          </TabsContent>
          
          <TabsContent value="github-integration" className="space-y-6 mt-6">
            <GitHubAdminIntegration />
          </TabsContent>
          
          <TabsContent value="resilience" className="space-y-6 mt-6">
            <UltimateResilienceEngine />
          </TabsContent>
          
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
          
          <TabsContent value="backgrounds" className="space-y-6 mt-6">
            <BackgroundManager />
          </TabsContent>
          
          <TabsContent value="security-reports" className="space-y-6 mt-6">
            <EncryptedSecurityReports />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Admin
