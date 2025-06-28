
import { Download } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { GitHubStatus } from './types'

interface LatestReleaseDisplayProps {
  githubStatus: GitHubStatus
}

export function LatestReleaseDisplay({ githubStatus }: LatestReleaseDisplayProps) {
  if (!githubStatus.hasReleases) {
    return null
  }

  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-green-900/20">
      <div className="flex items-center gap-3">
        <Download className="h-5 w-5 text-green-400" />
        <div>
          <div className="font-semibold text-green-400">Latest Secure Release</div>
          <div className="text-sm text-muted-foreground">
            Version {githubStatus.lastRelease} - Fully audited and signed
          </div>
        </div>
      </div>
      <Badge className="bg-green-600">Available</Badge>
    </div>
  )
}
