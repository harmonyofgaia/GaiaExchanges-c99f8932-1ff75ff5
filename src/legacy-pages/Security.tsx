
import { Navbar } from '@/components/Navbar'
import { SecurityDashboard } from '@/components/admin/security/SecurityDashboard'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export default function Security() {
  return (
    <ProtectedRoute isAdminRoute={true}>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-4">
              🛡️ Security Monitoring
            </h1>
            <p className="text-xl text-muted-foreground">
              Advanced threat detection and security analytics
            </p>
          </div>
          <SecurityDashboard />
        </div>
      </div>
    </ProtectedRoute>
  )
}
