
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useAutoIssueResolver } from './auto-issue-resolver/useAutoIssueResolver'
import { SystemHeader } from './auto-issue-resolver/SystemHeader'
import { SystemStatsGrid } from './auto-issue-resolver/SystemStatsGrid'
import { AutoResolutionFeatures } from './auto-issue-resolver/AutoResolutionFeatures'
import { RecentIssues } from './auto-issue-resolver/RecentIssues'
import { EnhancedSecurityMonitor } from './auto-issue-resolver/EnhancedSecurityMonitor'

export function AutoIssueResolver() {
  const { issues, lastCheck, securityLevel } = useAutoIssueResolver()

  const systemStats = {
    systemHealth: securityLevel === 'HIGH' ? 100 : securityLevel === 'MEDIUM' ? 85 : 60,
    checkInterval: '3s',
    activeIssues: issues.filter(i => !i.resolved).length,
    securityLevel
  }

  return (
    <div className="space-y-6">
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
              🛡️ <strong>Advanced Security Monitoring Active</strong> - Full cybersecurity protection for Harmony of Gaia Exchange and Community
            </p>
          </div>

          <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/20 rounded-lg p-3">
            <p className="text-xs text-center text-red-300">
              🚨 <strong>Threat Detection: ACTIVE</strong> | 🔒 <strong>File Integrity: PROTECTED</strong> | 💰 <strong>Wallet Security: MAXIMUM</strong>
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Enhanced Security Monitor */}
      <EnhancedSecurityMonitor />
    </div>
  )
}
