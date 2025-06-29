
import { AdminProtectedRoute } from '@/components/auth/AdminProtectedRoute'
import { ParabolicCommandCenter } from '@/components/admin/ParabolicCommandCenter'

export default function Admin() {
  return (
    <AdminProtectedRoute>
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-purple-900">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-purple-400 mb-4">
              👑 GAiA Admin Control Center
            </h1>
            <p className="text-gray-300 text-lg">
              Ultimate administrative control with parabolic universe access
            </p>
          </div>
          
          <ParabolicCommandCenter />
        </div>
      </div>
    </AdminProtectedRoute>
  )
}
