
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { AdminSecurityManager } from '@/components/security/AdminSecurityManager'
import { SystemHealthMonitor } from '@/components/security/SystemHealthMonitor'
import { ErrorTrackingDashboard } from '@/components/security/ErrorTrackingDashboard'
import { Navbar } from '@/components/Navbar'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'
import { Shield, Activity, Bug, Users } from 'lucide-react'

export default function AdminSecurityCenter() {
  return (
    <ProtectedRoute isAdminRoute={true}>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent mb-4">
              🛡️ Admin Security Center
            </h1>
            <p className="text-xl text-muted-foreground">
              Comprehensive security management and monitoring
            </p>
          </div>

          <Tabs defaultValue="admin" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 bg-black/50">
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Admin Management
              </TabsTrigger>
              <TabsTrigger value="health" className="flex items-center gap-2">
                <Activity className="h-4 w-4" />
                System Health
              </TabsTrigger>
              <TabsTrigger value="errors" className="flex items-center gap-2">
                <Bug className="h-4 w-4" />
                Error Tracking
              </TabsTrigger>
              <TabsTrigger value="security" className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Security Monitor
              </TabsTrigger>
            </TabsList>

            <TabsContent value="admin">
              <AdminSecurityManager />
            </TabsContent>

            <TabsContent value="health">
              <SystemHealthMonitor />
            </TabsContent>

            <TabsContent value="errors">
              <ErrorTrackingDashboard />
            </TabsContent>

            <TabsContent value="security">
              <div className="text-center py-12">
                <Shield className="h-16 w-16 text-green-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">Security Monitor</h3>
                <p className="text-muted-foreground">
                  Advanced security monitoring features coming soon
                </p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </ProtectedRoute>
  )
}
