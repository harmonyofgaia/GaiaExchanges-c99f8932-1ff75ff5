
import { Clock } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Github } from 'lucide-react'
import { useGitHubStatus } from './github/useGitHubStatus'
import { GitHubStatusDisplay } from './github/GitHubStatusDisplay'
import { SecurityFeaturesGrid } from './github/SecurityFeaturesGrid'
import { LatestReleaseDisplay } from './github/LatestReleaseDisplay'
import { GitHubActionButtons } from './github/GitHubActionButtons'
import { CultureOfHarmonyFooter } from './github/CultureOfHarmonyFooter'

export function GitHubIntegration() {
  const { githubStatus } = useGitHubStatus()

  return (
    <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Github className="h-5 w-5" />
          GitHub Integration & Security Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {githubStatus.isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 animate-spin" />
            <span>Checking GitHub repository and security status...</span>
          </div>
        ) : (
          <div className="space-y-4">
            <GitHubStatusDisplay githubStatus={githubStatus} />
            <SecurityFeaturesGrid />
            <LatestReleaseDisplay githubStatus={githubStatus} />
            <GitHubActionButtons githubStatus={githubStatus} />
            <CultureOfHarmonyFooter />
          </div>
        )}
      </CardContent>
    </Card>
  )
}
