
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Github, Star, GitFork } from 'lucide-react'

export default function GitHubRepositories() {
  return (
    <div className="container mx-auto p-6">
      <div className="text-center space-y-4 mb-8">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          GitHub Repositories
        </h1>
        <p className="text-xl text-muted-foreground">
          Manage and monitor Gaia Exchange repositories
        </p>
      </div>

      <Card className="border-purple-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Github className="h-5 w-5 text-purple-400" />
            harmonyofgaia/GaiaExchanges-c99f8932
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-400" />
              <span>0 stars</span>
            </div>
            <div className="flex items-center gap-2">
              <GitFork className="h-4 w-4 text-blue-400" />
              <span>0 forks</span>
            </div>
          </div>
          <p className="text-muted-foreground">Main Gaia Exchange platform repository</p>
        </CardContent>
      </Card>
    </div>
  )
}
