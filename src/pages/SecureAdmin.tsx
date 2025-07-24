
import { EnhancedAdminProtection } from '@/components/admin/EnhancedAdminProtection'
import { UnifiedAdminDashboard } from '@/components/admin/UnifiedAdminDashboard'

const SecureAdmin = () => {
  return (
    <EnhancedAdminProtection>
      <UnifiedAdminDashboard />
    </EnhancedAdminProtection>
  )
}

export default SecureAdmin
