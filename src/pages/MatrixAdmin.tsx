
import { useState } from 'react'
import { MatrixAdminLogin } from '@/components/admin/MatrixAdminLogin'
import { AdminDashboard } from '@/components/admin/AdminDashboard'
import { SystemHealthChecker } from '@/components/admin/SystemHealthChecker'

const MatrixAdmin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const handleLoginSuccess = () => {
    setIsAuthenticated(true)
  }

  if (!isAuthenticated) {
    return <MatrixAdminLogin onLoginSuccess={handleLoginSuccess} />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-black">
      <div className="container mx-auto p-6 space-y-6">
        <SystemHealthChecker />
        <AdminDashboard />
      </div>
    </div>
  )
}

export default MatrixAdmin
