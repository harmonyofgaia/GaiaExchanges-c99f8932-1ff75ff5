
import { EnhancedAdminProtection } from '@/components/admin/EnhancedAdminProtection'
import { UnifiedAdminDashboard } from '@/components/admin/UnifiedAdminDashboard'

export default function Admin() {
  return (
    <EnhancedAdminProtection>
      <UnifiedAdminDashboard />
    </EnhancedAdminProtection>
  )
}
