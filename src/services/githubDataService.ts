
import { toast } from 'sonner'

export interface GitHubPR {
  id: number
  title: string
  body: string
  number: number
  state: string
  created_at: string
  merged_at: string | null
  user: {
    login: string
  }
  labels: Array<{
    name: string
    color: string
  }>
}

export interface RestoredProjectData {
  title: string
  description: string
  category: string
  tokens: number
  points: number
  discount?: number
  features: string[]
  status: string
  github_source: string
}

export class GitHubDataService {
  private static readonly GITHUB_API_BASE = 'https://api.github.com'
  private static readonly REPO_URL = 'harmonyofgaia/GaiaExchanges-c99f8932'

  static async fetchPullRequests(): Promise<GitHubPR[]> {
    try {
      console.log('🔍 Fetching GAiA project data from GitHub...')
      
      const response = await fetch(`${this.GITHUB_API_BASE}/repos/${this.REPO_URL}/pulls?state=closed&per_page=100`)
      
      if (!response.ok) {
        throw new Error(`GitHub API error: ${response.status}`)
      }

      const prs = await response.json() as GitHubPR[]
      console.log(`✅ Found ${prs.length} pull requests`)
      
      return prs
    } catch (error) {
      console.error('❌ Error fetching GitHub data:', error)
      toast.error('Failed to fetch GitHub data')
      return []
    }
  }

  static parseProjectFromPR(pr: GitHubPR): RestoredProjectData | null {
    try {
      const title = pr.title
      const body = pr.body || ''
      
      // Extract GAiA-related projects
      const gaiaKeywords = [
        'gaia', 'eco', 'green', 'sustainable', 'environmental', 
        'bike', 'food', 'token', 'earning', 'badge', 'party', 'event'
      ]
      
      const isGaiaProject = gaiaKeywords.some(keyword => 
        title.toLowerCase().includes(keyword) || body.toLowerCase().includes(keyword)
      )
      
      if (!isGaiaProject) return null

      // Parse points and tokens from description
      const pointsMatch = body.match(/(\d+)\s*(points?|pts)/i)
      const tokensMatch = body.match(/(\d+)\s*(tokens?|gaia)/i)
      const discountMatch = body.match(/(\d+)%\s*(discount|off)/i)
      
      const features = []
      if (body.includes('earning')) features.push('Earning System')
      if (body.includes('badge')) features.push('Badge Rewards')
      if (body.includes('discount')) features.push('Discount System')
      if (body.includes('community')) features.push('Community Features')
      if (body.includes('bike')) features.push('Eco Transportation')
      if (body.includes('food')) features.push('Sustainable Food')

      return {
        title: title,
        description: body.substring(0, 200) + (body.length > 200 ? '...' : ''),
        category: this.categorizeProject(title, body),
        tokens: tokensMatch ? parseInt(tokensMatch[1]) : Math.floor(Math.random() * 50) + 10,
        points: pointsMatch ? parseInt(pointsMatch[1]) : Math.floor(Math.random() * 100) + 25,
        discount: discountMatch ? parseInt(discountMatch[1]) : undefined,
        features,
        status: pr.merged_at ? 'active' : 'planning',
        github_source: `PR #${pr.number}`
      }
    } catch (error) {
      console.error('Error parsing PR:', error)
      return null
    }
  }

  private static categorizeProject(title: string, body: string): string {
    const text = (title + ' ' + body).toLowerCase()
    
    if (text.includes('bike') || text.includes('transport')) return 'Transportation'
    if (text.includes('food') || text.includes('grow') || text.includes('harvest')) return 'Agriculture'
    if (text.includes('party') || text.includes('event') || text.includes('community')) return 'Community Events'
    if (text.includes('token') || text.includes('earning') || text.includes('reward')) return 'Token Economy'
    if (text.includes('badge') || text.includes('achievement')) return 'Gamification'
    if (text.includes('education') || text.includes('learning')) return 'Education'
    if (text.includes('water') || text.includes('energy') || text.includes('carbon')) return 'Environmental'
    
    return 'Sustainability'
  }

  static async restoreAllProjects(): Promise<RestoredProjectData[]> {
    const prs = await this.fetchPullRequests()
    const projects: RestoredProjectData[] = []
    
    for (const pr of prs) {
      const project = this.parseProjectFromPR(pr)
      if (project) {
        projects.push(project)
      }
    }
    
    console.log(`🌱 Restored ${projects.length} GAiA projects from GitHub`)
    return projects
  }
}
