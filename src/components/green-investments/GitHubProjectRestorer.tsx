
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { GitHubDataService } from '@/utils/GitHubDataService'
import { Github, RefreshCw, Database, Zap } from 'lucide-react'

interface GitHubProjectRestorerProps {
  onDataRestored: (data: any) => void
}

export function GitHubProjectRestorer({ onDataRestored }: GitHubProjectRestorerProps) {
  const [isLoading, setIsLoading] = useState(false)
  const [restoredProjects, setRestoredProjects] = useState<any[]>([])

  const handleRestoreFromGitHub = async () => {
    setIsLoading(true)
    
    try {
      toast.info('🔍 Scanning GitHub repository...', {
        description: 'Analyzing closed PRs for project data',
        duration: 3000
      })

      const result = await GitHubDataService.fetchClosedPRs()
      
      if (result.success && result.data) {
        const projects = GitHubDataService.parseProjectDataFromPRs(result.data)
        
        if (projects.length > 0) {
          setRestoredProjects(projects)
          onDataRestored({ projects, source: 'github' })
          
          toast.success('✨ GitHub data restored!', {
            description: `Found ${projects.length} project records from your repository`,
            duration: 5000
          })
        } else {
          toast.warning('⚠️ No project data found', {
            description: 'Could not extract project information from GitHub PRs',
            duration: 4000
          })
        }
      } else {
        toast.error('❌ GitHub fetch failed', {
          description: result.error || 'Could not access GitHub repository',
          duration: 4000
        })
      }
    } catch (error) {
      console.error('Error restoring from GitHub:', error)
      toast.error('❌ Restoration failed', {
        description: 'An error occurred while restoring data',
        duration: 4000
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-blue-500/50 bg-gradient-to-r from-blue-900/30 to-indigo-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Github className="h-5 w-5" />
          GitHub Project Data Restoration
        </CardTitle>
        <p className="text-sm text-blue-300/80">
          Restore your original GAiA project information from GitHub repository
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center gap-2">
          <Database className="h-4 w-4 text-blue-400" />
          <span className="text-sm text-blue-300">
            Repository: harmonyofgaia/GaiaExchanges-c99f8932
          </span>
        </div>

        <Button 
          onClick={handleRestoreFromGitHub}
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
        >
          {isLoading ? (
            <>
              <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
              Analyzing GitHub Data...
            </>
          ) : (
            <>
              <Github className="h-4 w-4 mr-2" />
              Restore Projects from GitHub
            </>
          )}
        </Button>

        {restoredProjects.length > 0 && (
          <div className="mt-6 space-y-3">
            <div className="flex items-center gap-2 text-emerald-400">
              <Zap className="h-4 w-4" />
              <span className="font-semibold">Restored Projects ({restoredProjects.length})</span>
            </div>
            <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
              {restoredProjects.map((project, index) => (
                <div key={index} className="flex items-center justify-between p-2 bg-emerald-900/20 rounded border border-emerald-500/30">
                  <span className="text-sm text-emerald-300 truncate">{project.title}</span>
                  <div className="flex gap-1">
                    <Badge variant="outline" className="text-xs border-emerald-400 text-emerald-400">
                      {project.category}
                    </Badge>
                    {project.tokenIdeas && project.tokenIdeas.length > 0 && (
                      <Badge variant="outline" className="text-xs border-yellow-400 text-yellow-400">
                        Tokens
                      </Badge>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="text-xs text-blue-300/60 mt-4">
          💡 This will analyze your closed pull requests to recover project information, 
          token ideas, earning mechanisms, and badge systems.
        </div>
      </CardContent>
    </Card>
  )
}
