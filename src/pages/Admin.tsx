
import { AdminControlSystem } from '@/components/AdminControlSystem'

const Admin = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Control System</h1>
          <p className="text-muted-foreground">Complete control over the Harmony of Gaia Exchange</p>
        </div>
      </div>
      
      <AdminControlSystem />
    </div>
  )
}

export default Admin
