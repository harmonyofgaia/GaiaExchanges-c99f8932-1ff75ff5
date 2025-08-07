import { SecureAdminDashboard } from '@/components/admin/SecureAdminDashboard'
import { EnhancedBackgroundManager } from '@/components/backgrounds/EnhancedBackgroundManager'
import { AdminProtectedRoute } from '@/components/auth/AdminProtectedRoute'
import { AdminOnlyAccess } from '@/components/security/AdminOnlyAccess'
import { SupabaseImageGallery } from '@/components/admin/SupabaseImageGallery'

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
            <div style={{ display: 'flex', gap: 16, margin: '20px 0' }}>
              <a
                href="/public/GAIA_ENGINE_BLUEPRINT.md"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  background: '#2ecc40',
                  color: '#fff',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
              >
                View GAIA Engine Blueprint
              </a>
              <a
                href="/public/GAIA_ENGINE_BLUEPRINT.md"
                download
                style={{
                  display: 'inline-block',
                  padding: '10px 20px',
                  background: '#007bff',
                  color: '#fff',
                  borderRadius: '5px',
                  textDecoration: 'none',
                  fontWeight: 'bold',
                }}
              >
                Download GAIA Engine Blueprint
              </a>
            </div>
            <SupabaseImageGallery />
            <SecureAdminDashboard />
          </div>
        </div>
      </AdminOnlyAccess>
    </AdminProtectedRoute>
  )
}