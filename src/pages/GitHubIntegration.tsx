
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Github, GitBranch, GitCommit } from 'lucide-react'

export default function GitHubIntegration() {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
          GitHub Integration
        </h1>
        <p className="text-xl text-muted-foreground">
          Seamless GitHub workflow integration
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitBranch className="h-5 w-5 text-green-400" />
              Branch Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Manage branches and pull requests</p>
          </CardContent>
        </Card>

        <Card className="border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <GitCommit className="h-5 w-5 text-blue-400" />
              Commit Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">Track commits and code changes</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
