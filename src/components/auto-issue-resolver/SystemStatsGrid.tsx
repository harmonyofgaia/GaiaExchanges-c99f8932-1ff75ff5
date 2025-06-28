
import { CheckCircle, RefreshCw, AlertTriangle } from 'lucide-react'
import { SystemStats } from './types'

interface SystemStatsGridProps {
  stats: SystemStats
}

export function SystemStatsGrid({ stats }: SystemStatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
        <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
        <div className="text-2xl font-bold text-green-400">{stats.systemHealth}%</div>
        <div className="text-sm text-muted-foreground">System Health</div>
      </div>
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
        <RefreshCw className="h-8 w-8 text-blue-400 mx-auto mb-2" />
        <div className="text-2xl font-bold text-blue-400">{stats.checkInterval}</div>
        <div className="text-sm text-muted-foreground">Check Interval</div>
      </div>
      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
        <AlertTriangle className="h-8 w-8 text-purple-400 mx-auto mb-2" />
        <div className="text-2xl font-bold text-purple-400">{stats.activeIssues}</div>
        <div className="text-sm text-muted-foreground">Active Issues</div>
      </div>
    </div>
  )
}
