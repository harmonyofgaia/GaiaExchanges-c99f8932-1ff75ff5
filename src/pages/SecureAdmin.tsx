
import { EnhancedBackgroundManager } from '@/components/backgrounds/EnhancedBackgroundManager'
import { SecureVaultLogin } from '@/components/admin/SecureVaultLogin'

const SecureAdmin = () => {
  return (
    <div className="min-h-screen relative">
      <EnhancedBackgroundManager 
        config={{
          type: 'neuro',
          intensity: 'high',
          color: '#ff00ff',
          speed: 1.5,
          autoGenerate: false
        }}
      />
      <div className="relative z-10">
        <SecureVaultLogin />
      </div>
    </div>
  )
}

export default SecureAdmin
