
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAutoIssueResolver } from './auto-issue-resolver/useAutoIssueResolver'
import { SystemHeader } from './auto-issue-resolver/SystemHeader'
import { SystemStatsGrid } from './auto-issue-resolver/SystemStatsGrid'
import { AutoResolutionFeatures } from './auto-issue-resolver/AutoResolutionFeatures'
import { RecentIssues } from './auto-issue-resolver/RecentIssues'

export function AutoIssueResolver() {
  const { issues, lastCheck } = useAutoIssueResolver()

  const systemStats = {
    systemHealth: 100,
    checkInterval: '5s',
    activeIssues: issues.filter(i => !i.resolved).length
  }

  return (
    <Card className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-500/20">
      <CardHeader>
        <CardTitle>
          <SystemHeader lastCheck={lastCheck} />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <SystemStatsGrid stats={systemStats} />
        <AutoResolutionFeatures />
        <RecentIssues issues={issues} />
        
        <div className="bg-gradient-to-r from-purple-900/20 to-green-900/20 border border-purple-500/20 rounded-lg p-3">
          <p className="text-sm text-center text-purple-300">
            🌍 <strong>Harmony of Gaia Protection Active</strong> - All systems automatically monitored and optimized for the Culture of Harmony project
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
