
import { UltimateAdminSuite } from './UltimateAdminSuite'
import { TaskTracker } from '@/components/TaskTracker'

export function AdminDashboardTabs() {
  return (
    <div className="space-y-8">
      {/* Task Tracker Overview */}
      <TaskTracker />
      
      {/* Ultimate Admin Suite */}
      <UltimateAdminSuite />
    </div>
  )
}
