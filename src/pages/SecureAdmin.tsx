
import { SecureAdminDashboard } from '@/components/admin/SecureAdminDashboard'
import { EnhancedBackgroundManager } from '@/components/backgrounds/EnhancedBackgroundManager'
import { AdminProtectedRoute } from '@/components/auth/AdminProtectedRoute'
import { AdminOnlyAccess } from '@/components/security/AdminOnlyAccess'

export default function SecureAdmin() {
  return (
    <AdminProtectedRoute>
      <AdminOnlyAccess>
        <div className="relative min-h-screen">
          <EnhancedBackgroundManager 
            settings={{
              type: 'neural',
              intensity: 'high',
              color: '#00ff00',
              speed: 1.5,
              autoGenerate: true
            }}
          />
          
          <div className="relative z-10">
            <SecureAdminDashboard />
          </div>
        </div>
      </AdminOnlyAccess>
    </AdminProtectedRoute>
  )
}
<a href="/docs/GAIA_ENGINE_BLUEPRINT.md" download>
  Download GAIA Engine Blueprint
</a>