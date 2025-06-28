
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  Github, 
  ExternalLink, 
  Star, 
  GitFork, 
  Download, 
  Shield,
  Code,
  Smartphone,
  Globe
} from 'lucide-react'

export function GitHubRepositories() {
  const repositories = [
    {
      name: 'gaia-exchanges',
      description: 'Main Gaia\'s Exchanges application - Cross-platform trading app',
      url: 'https://github.com/harmonyofgaia/gaia-exchanges',
      language: 'TypeScript',
      stars: 1250,
      forks: 89,
      platform: 'Multi-platform',
      icon: <Code className="h-4 w-4" />,
      color: 'bg-blue-600'
    },
    {
      name: 'gaia-token-contract',
      description: 'GAiA Token smart contract and tokenomics implementation',
      url: 'https://github.com/harmonyofgaia/gaia-token-contract',
      language: 'Solidity',
      stars: 892,
      forks: 156,
      platform: 'Blockchain',
      icon: <Shield className="h-4 w-4" />,
      color: 'bg-green-600'
    },
    {
      name: 'gaia-mobile-app',
      description: 'Native mobile applications for iOS and Android',
      url: 'https://github.com/harmonyofgaia/gaia-mobile-app',
      language: 'React Native',
      stars: 743,
      forks: 67,
      platform: 'Mobile',
      icon: <Smartphone className="h-4 w-4" />,
      color: 'bg-purple-600'
    },
    {
      name: 'gaia-web3-dapp',
      description: 'Decentralized application interface for Web3 trading',
      url: 'https://github.com/harmonyofgaia/gaia-web3-dapp',
      language: 'TypeScript',
      stars: 567,
      forks: 89,
      platform: 'Web3',
      icon: <Globe className="h-4 w-4" />,
      color: 'bg-cyan-600'
    },
    {
      name: 'gaia-api-backend',
      description: 'Backend API services and microservices architecture',
      url: 'https://github.com/harmonyofgaia/gaia-api-backend',
      language: 'Node.js',
      stars: 432,
      forks: 78,
      platform: 'Backend',
      icon: <Code className="h-4 w-4" />,
      color: 'bg-orange-600'
    },
    {
      name: 'gaia-security-audits',
      description: 'Security audit reports and penetration testing results',
      url: 'https://github.com/harmonyofgaia/gaia-security-audits',
      language: 'Documentation',
      stars: 234,
      forks: 12,
      platform: 'Security',
      icon: <Shield className="h-4 w-4" />,
      color: 'bg-red-600'
    }
  ]

  const handleRepositoryClick = (url: string, name: string) => {
    window.open(url, '_blank', 'noopener,noreferrer')
    console.log(`🔗 Opening repository: ${name}`)
  }

  return (
    <Card className="border-green-500/20 bg-gradient-to-br from-green-900/20 to-blue-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Github className="h-5 w-5" />
          Official GitHub Repositories
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Open source, transparent, and community-driven development
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repositories.map((repo) => (
            <div key={repo.name} className="p-4 border border-border/50 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors">
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-1 rounded ${repo.color} text-white`}>
                      {repo.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-sm">{repo.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {repo.platform}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleRepositoryClick(repo.url, repo.name)}
                  >
                    <ExternalLink className="h-3 w-3" />
                  </Button>
                </div>
                
                <p className="text-xs text-muted-foreground line-clamp-2">
                  {repo.description}
                </p>
                
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      {repo.language}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-3 w-3" />
                      {repo.forks}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border/20">
          <div className="text-center space-y-3">
            <h4 className="font-semibold text-blue-400">Repository Features</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs">
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3 text-green-400" />
                <span>Code Signed</span>
              </div>
              <div className="flex items-center gap-1">
                <Star className="h-3 w-3 text-yellow-400" />
                <span>MIT Licensed</span>
              </div>
              <div className="flex items-center gap-1">
                <Download className="h-3 w-3 text-blue-400" />
                <span>Auto Releases</span>
              </div>
              <div className="flex items-center gap-1">
                <Github className="h-3 w-3 text-purple-400" />
                <span>CI/CD Pipeline</span>
              </div>
            </div>
            
            <div className="flex items-center justify-center gap-4 pt-2">
              <Button size="sm" variant="outline" asChild>
                <a href="https://github.com/harmonyofgaia" target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  View Organization
                </a>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a href="https://github.com/harmonyofgaia/gaia-exchanges/releases" target="_blank" rel="noopener noreferrer">
                  <Download className="h-4 w-4 mr-2" />
                  Latest Releases
                </a>
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
