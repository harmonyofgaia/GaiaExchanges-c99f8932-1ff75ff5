
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { toast } from 'sonner'
import { 
  Github, 
  ExternalLink, 
  CheckCircle, 
  AlertCircle, 
  Clock,
  Star,
  GitFork,
  Download
} from 'lucide-react'

interface GitHubStatus {
  isConnected: boolean
  organization: string
  repository: string
  lastRelease: string | null
  hasReleases: boolean
  isLoading: boolean
}

export function GitHubIntegration() {
  const [githubStatus, setGithubStatus] = useState<GitHubStatus>({
    isConnected: false,
    organization: 'harmonyofgaia',
    repository: 'gaia-exchanges',
    lastRelease: null,
    hasReleases: false,
    isLoading: true
  })

  const checkGitHubStatus = async () => {
    const { organization, repository } = githubStatus
    
    try {
      console.log('🔍 Checking GitHub repository status...')
      
      // Check if repository exists
      const repoResponse = await fetch(`https://api.github.com/repos/${organization}/${repository}`)
      const repoExists = repoResponse.ok
      
      let lastRelease = null
      let hasReleases = false
      
      if (repoExists) {
        // Check for releases
        const releasesResponse = await fetch(`https://api.github.com/repos/${organization}/${repository}/releases/latest`)
        
        if (releasesResponse.ok) {
          const release = await releasesResponse.json()
          lastRelease = release.tag_name
          hasReleases = true
          console.log(`✅ Found latest release: ${lastRelease}`)
        }
      }

      setGithubStatus(prev => ({
        ...prev,
        isConnected: repoExists,
        lastRelease,
        hasReleases,
        isLoading: false
      }))

      if (repoExists) {
        toast.success('GitHub Repository Connected', {
          description: `✅ ${organization}/${repository} is accessible`,
          duration: 3000
        })
      } else {
        toast.info('Setting up GitHub Repository', {
          description: `📝 Repository will be created: ${organization}/${repository}`,
          duration: 5000
        })
      }

    } catch (error) {
      console.error('❌ Error checking GitHub status:', error)
      setGithubStatus(prev => ({
        ...prev,
        isConnected: false,
        isLoading: false
      }))
      
      toast.error('GitHub API Error', {
        description: 'Could not check repository status',
        duration: 3000
      })
    }
  }

  useEffect(() => {
    checkGitHubStatus()
  }, [])

  const openGitHubRepo = () => {
    const url = `https://github.com/${githubStatus.organization}/${githubStatus.repository}`
    window.open(url, '_blank', 'noopener,noreferrer')
    
    toast.success('Opening GitHub Repository', {
      description: '🚀 Culture of Harmony - GAiA Project',
      duration: 3000
    })
  }

  const openGitHubOrg = () => {
    const url = `https://github.com/${githubStatus.organization}`
    window.open(url, '_blank', 'noopener,noreferrer')
    
    toast.success('Opening GitHub Organization', {
      description: '🌍 Culture of Harmony Organization',
      duration: 3000
    })
  }

  const createGitHubRepo = () => {
    toast.info('Creating GitHub Repository', {
      description: '📝 Use Lovable\'s "Export to GitHub" feature to create the repository',
      duration: 8000
    })
  }

  return (
    <Card className="border-blue-500/20 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Github className="h-5 w-5" />
          GitHub Integration Status
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {githubStatus.isLoading ? (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Clock className="h-4 w-4 animate-spin" />
            <span>Checking GitHub repository...</span>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
              <div className="flex items-center gap-3">
                {githubStatus.isConnected ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-orange-400" />
                )}
                <div>
                  <div className="font-semibold">
                    {githubStatus.organization}/{githubStatus.repository}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {githubStatus.isConnected ? 'Repository Connected' : 'Repository Not Found'}
                  </div>
                </div>
              </div>
              <Badge className={githubStatus.isConnected ? 'bg-green-600' : 'bg-orange-600'}>
                {githubStatus.isConnected ? 'Connected' : 'Pending'}
              </Badge>
            </div>

            {githubStatus.hasReleases && (
              <div className="flex items-center justify-between p-3 rounded-lg bg-green-900/20">
                <div className="flex items-center gap-3">
                  <Download className="h-5 w-5 text-green-400" />
                  <div>
                    <div className="font-semibold text-green-400">Latest Release</div>
                    <div className="text-sm text-muted-foreground">
                      Version {githubStatus.lastRelease}
                    </div>
                  </div>
                </div>
                <Badge className="bg-green-600">Available</Badge>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button 
                onClick={openGitHubRepo}
                className="bg-blue-600 hover:bg-blue-700"
                disabled={!githubStatus.isConnected}
              >
                <Github className="h-4 w-4 mr-2" />
                View Repository
              </Button>
              
              <Button 
                onClick={openGitHubOrg}
                variant="outline"
              >
                <Star className="h-4 w-4 mr-2" />
                Organization
              </Button>
              
              {!githubStatus.isConnected && (
                <Button 
                  onClick={createGitHubRepo}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Create Repo
                </Button>
              )}
            </div>

            <div className="pt-3 border-t border-border/20 text-center">
              <p className="text-sm text-muted-foreground">
                🎵 Culture of Harmony - "Seeds Will Form Into Music" 🎵
              </p>
              <p className="text-xs text-green-400 mt-1">
                Building harmony for the global community - One commit at a time
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
