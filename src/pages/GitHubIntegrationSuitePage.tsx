
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Github, GitBranch, GitMerge, GitPullRequest } from 'lucide-react'

export default function GitHubIntegrationSuitePage() {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-green-400 bg-clip-text text-transparent">
          GitHub Integration Suite
        </h1>
        <p className="text-xl text-muted-foreground">
          Complete GitHub workflow management suite
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Github className="h-5 w-5 text-purple-400" />
              Repository
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Repo management</p>
          </CardContent>
        </Card>

        <Card className="border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-green-400" />
              Branches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Branch operations</p>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitPullRequest className="h-5 w-5 text-blue-400" />
              Pull Requests
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">PR management</p>
          </CardContent>
        </Card>

        <Card className="border-orange-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitMerge className="h-5 w-5 text-orange-400" />
              Merges
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Merge operations</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
