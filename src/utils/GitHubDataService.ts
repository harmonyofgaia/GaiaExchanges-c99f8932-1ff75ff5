
interface GitHubPRData {
  title: string
  body: string
  labels: string[]
  created_at: string
  updated_at: string
  html_url: string
}

interface ProjectData {
  id: string
  title: string
  description: string
  category: string
  status: string
  progress: number
  participants: number
  reward: number
  deadline: string
  impact: string
  tags: string[]
  fundingGoal?: number
  currentFunding?: number
  location?: string
  expectedImpact?: string
  tokenIdeas?: string[]
  badgeIdeas?: string[]
  earningMechanisms?: string[]
}

export class GitHubDataService {
  private static API_KEY_STORAGE_KEY = 'github_access_token'

  static saveAccessToken(token: string): void {
    localStorage.setItem(this.API_KEY_STORAGE_KEY, token)
    console.log('GitHub access token saved successfully')
  }

  static getAccessToken(): string | null {
    return localStorage.getItem(this.API_KEY_STORAGE_KEY)
  }

  static async fetchClosedPRs(): Promise<{ success: boolean; error?: string; data?: GitHubPRData[] }> {
    try {
      const response = await fetch(
        'https://api.github.com/repos/harmonyofgaia/GaiaExchanges-c99f8932/pulls?state=closed&per_page=100',
        {
          headers: {
            'Accept': 'application/vnd.github.v3+json',
            'User-Agent': 'GAiA-Project-Restorer'
          }
        }
      )

      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      const prs = await response.json()
      console.log('Fetched GitHub PRs:', prs.length)
      
      return {
        success: true,
        data: prs
      }
    } catch (error) {
      console.error('Error fetching GitHub PRs:', error)
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to fetch GitHub data'
      }
    }
  }

  static parseProjectDataFromPRs(prs: GitHubPRData[]): ProjectData[] {
    const projects: ProjectData[] = []
    
    // Look for project-related PRs and extract data
    const projectPRs = prs.filter(pr => 
      pr.title.toLowerCase().includes('project') ||
      pr.title.toLowerCase().includes('gaia') ||
      pr.title.toLowerCase().includes('soul') ||
      pr.body?.toLowerCase().includes('earning') ||
      pr.body?.toLowerCase().includes('token')
    )

    projectPRs.forEach(pr => {
      const project = this.extractProjectFromPR(pr)
      if (project) {
        projects.push(project)
      }
    })

    return projects
  }

  private static extractProjectFromPR(pr: GitHubPRData): ProjectData | null {
    try {
      // Extract project information from PR title and body
      const title = pr.title
      const body = pr.body || ''
      
      // Parse funding goals, progress, etc. from PR description
      const fundingMatch = body.match(/funding[:\s]*(\$?[\d,]+)/i)
      const progressMatch = body.match(/progress[:\s]*(\d+)%/i)
      const participantsMatch = body.match(/participants[:\s]*(\d+)/i)
      const rewardMatch = body.match(/reward[:\s]*(\d+)/i)
      
      // Extract token and earning ideas
      const tokenIdeas = this.extractIdeas(body, 'token')
      const badgeIdeas = this.extractIdeas(body, 'badge')
      const earningMechanisms = this.extractIdeas(body, 'earning')

      const project: ProjectData = {
        id: `github-${pr.html_url.split('/').pop()}`,
        title: title,
        description: body.substring(0, 200) + '...',
        category: this.categorizeFromContent(body),
        status: 'active',
        progress: progressMatch ? parseInt(progressMatch[1]) : Math.floor(Math.random() * 100),
        participants: participantsMatch ? parseInt(participantsMatch[1]) : Math.floor(Math.random() * 1000) + 100,
        reward: rewardMatch ? parseInt(rewardMatch[1]) : Math.floor(Math.random() * 1000) + 500,
        deadline: new Date(Date.now() + Math.random() * 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        impact: this.assessImpact(body),
        tags: this.extractTags(body),
        fundingGoal: fundingMatch ? parseInt(fundingMatch[1].replace(/[$,]/g, '')) : undefined,
        currentFunding: fundingMatch ? Math.floor(parseInt(fundingMatch[1].replace(/[$,]/g, '')) * 0.7) : undefined,
        location: this.extractLocation(body),
        expectedImpact: this.extractExpectedImpact(body),
        tokenIdeas,
        badgeIdeas,
        earningMechanisms
      }

      return project
    } catch (error) {
      console.error('Error extracting project from PR:', error)
      return null
    }
  }

  private static extractIdeas(content: string, type: string): string[] {
    const ideas: string[] = []
    const regex = new RegExp(`${type}[\\s\\w]*[:.]([^\\n]{1,100})`, 'gi')
    const matches = content.match(regex)
    
    if (matches) {
      matches.forEach(match => {
        const idea = match.replace(regex, '$1').trim()
        if (idea && idea.length > 5) {
          ideas.push(idea)
        }
      })
    }
    
    return ideas
  }

  private static categorizeFromContent(content: string): string {
    const categories = {
      'environmental': ['environment', 'eco', 'green', 'nature', 'forest'],
      'gaming': ['game', 'nft', 'dragon', 'battle'],
      'energy': ['energy', 'solar', 'wind', 'renewable'],
      'biotechnology': ['bio', 'seed', 'growth', 'organic'],
      'financial': ['finance', 'investment', 'capital', 'fund'],
      'community': ['community', 'social', 'tribe', 'collective']
    }

    for (const [category, keywords] of Object.entries(categories)) {
      if (keywords.some(keyword => content.toLowerCase().includes(keyword))) {
        return category
      }
    }
    
    return 'environmental'
  }

  private static assessImpact(content: string): string {
    if (content.toLowerCase().includes('global') || content.toLowerCase().includes('world')) {
      return 'Very High'
    }
    if (content.toLowerCase().includes('community') || content.toLowerCase().includes('region')) {
      return 'High'
    }
    if (content.toLowerCase().includes('local')) {
      return 'Medium'
    }
    return 'High'
  }

  private static extractTags(content: string): string[] {
    const commonTags = ['sustainability', 'innovation', 'community', 'environment', 'technology']
    const tags: string[] = []
    
    commonTags.forEach(tag => {
      if (content.toLowerCase().includes(tag)) {
        tags.push(tag)
      }
    })
    
    return tags.length > 0 ? tags : ['environmental', 'gaia']
  }

  private static extractLocation(content: string): string | undefined {
    const locationMatch = content.match(/location[:\s]*([^\n]{1,50})/i)
    return locationMatch ? locationMatch[1].trim() : 'Global Network'
  }

  private static extractExpectedImpact(content: string): string | undefined {
    const impactMatch = content.match(/impact[:\s]*([^\n]{1,100})/i)
    return impactMatch ? impactMatch[1].trim() : undefined
  }
}
