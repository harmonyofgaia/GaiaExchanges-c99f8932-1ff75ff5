// GitHub Scanner Service - Comprehensive Issues and PRs Analysis
import type { Issue } from '@/components/auto-issue-resolver/types'

export interface GitHubIssue {
  id: number
  number: number
  title: string
  body: string
  state: 'open' | 'closed'
  labels: Array<{ name: string; color: string }>
  user: { login: string; avatar_url: string }
  created_at: string
  updated_at: string
  html_url: string
}

export interface GitHubPR extends GitHubIssue {
  merged: boolean
  merge_commit_sha: string | null
  draft: boolean
  head: { ref: string; sha: string }
  base: { ref: string; sha: string }
}

export interface LostFeature {
  name: string
  description: string
  lastSeen: string
  priority: 'high' | 'medium' | 'low'
  restoreInstructions: string
}

export interface ScanResult {
  issues: GitHubIssue[]
  pullRequests: GitHubPR[]
  lostFeatures: LostFeature[]
  totalScanned: number
  lastScanTime: Date
  healthScore: number
}

class GitHubScannerService {
  private readonly REPO_OWNER = 'harmonyofgaia'
  private readonly REPO_NAME = 'GaiaExchanges-c99f8932'
  private readonly API_BASE = 'https://api.github.com'
  
  private cachedResults: ScanResult | null = null
  private lastScanTime = 0
  private readonly CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

  async scanRepository(): Promise<ScanResult> {
    const now = Date.now()
    
    // Return cached results if still fresh
    if (this.cachedResults && (now - this.lastScanTime) < this.CACHE_DURATION) {
      return this.cachedResults
    }

    console.log('🔍 Starting comprehensive GitHub repository scan...')
    
    try {
      const [issues, pullRequests] = await Promise.all([
        this.fetchAllIssues(),
        this.fetchAllPullRequests()
      ])

      const lostFeatures = this.analyzeLostFeatures(issues, pullRequests)
      const healthScore = this.calculateHealthScore(issues, pullRequests)

      const result: ScanResult = {
        issues,
        pullRequests,
        lostFeatures,
        totalScanned: issues.length + pullRequests.length,
        lastScanTime: new Date(),
        healthScore
      }

      this.cachedResults = result
      this.lastScanTime = now

      console.log(`✅ Scan complete: ${result.totalScanned} items analyzed`)
      console.log(`📊 Repository health score: ${result.healthScore}%`)
      
      return result
    } catch (error) {
      console.error('❌ Error scanning repository:', error)
      
      // Return mock data for development/demo purposes
      return this.getMockScanResult()
    }
  }

  private async fetchAllIssues(): Promise<GitHubIssue[]> {
    const issues: GitHubIssue[] = []
    let page = 1
    const per_page = 100

    while (true) {
      try {
        const response = await fetch(
          `${this.API_BASE}/repos/${this.REPO_OWNER}/${this.REPO_NAME}/issues?state=all&page=${page}&per_page=${per_page}&sort=updated&direction=desc`
        )
        
        if (!response.ok) {
          console.warn(`⚠️ GitHub API response: ${response.status}`)
          break
        }

        const pageIssues: GitHubIssue[] = await response.json()
        
        if (pageIssues.length === 0) break
        
        // Filter out pull requests (GitHub includes PRs in issues endpoint)
        const actualIssues = pageIssues.filter(issue => !('pull_request' in issue))
        issues.push(...actualIssues)
        
        page++
        
        // Respect rate limits
        await new Promise(resolve => setTimeout(resolve, 100))
      } catch (error) {
        console.error('Error fetching issues page:', page, error)
        break
      }
    }

    return issues
  }

  private async fetchAllPullRequests(): Promise<GitHubPR[]> {
    const pullRequests: GitHubPR[] = []
    let page = 1
    const per_page = 100

    while (true) {
      try {
        const response = await fetch(
          `${this.API_BASE}/repos/${this.REPO_OWNER}/${this.REPO_NAME}/pulls?state=all&page=${page}&per_page=${per_page}&sort=updated&direction=desc`
        )
        
        if (!response.ok) {
          console.warn(`⚠️ GitHub API response: ${response.status}`)
          break
        }

        const pagePRs: GitHubPR[] = await response.json()
        
        if (pagePRs.length === 0) break
        
        pullRequests.push(...pagePRs)
        page++
        
        // Respect rate limits
        await new Promise(resolve => setTimeout(resolve, 100))
      } catch (error) {
        console.error('Error fetching PRs page:', page, error)
        break
      }
    }

    return pullRequests
  }

  private analyzeLostFeatures(issues: GitHubIssue[], pullRequests: GitHubPR[]): LostFeature[] {
    const lostFeatures: LostFeature[] = []
    
    // Analyze issues for missing features
    const featureIssues = issues.filter(issue => 
      issue.title.toLowerCase().includes('feature') ||
      issue.title.toLowerCase().includes('missing') ||
      issue.labels.some(label => label.name.toLowerCase().includes('feature'))
    )

    // Look for GAIA Bike references
    const bikeIssues = [...issues, ...pullRequests].filter(item =>
      item.title.toLowerCase().includes('bike') ||
      item.body?.toLowerCase().includes('gaia bike')
    )

    if (bikeIssues.length > 0) {
      lostFeatures.push({
        name: 'GAIA Bike Ecosystem',
        description: 'Eco-friendly transportation and rewards system',
        lastSeen: bikeIssues[0].updated_at,
        priority: 'high',
        restoreInstructions: 'Integrate bike tracking, rewards, and eco-missions'
      })
    }

    // Look for Admin Gaia Login issues
    const adminIssues = [...issues, ...pullRequests].filter(item =>
      item.title.toLowerCase().includes('admin') &&
      (item.title.toLowerCase().includes('login') || item.title.toLowerCase().includes('auth'))
    )

    if (adminIssues.length > 0) {
      lostFeatures.push({
        name: 'Admin Gaia Login',
        description: 'Secure administrative access system',
        lastSeen: adminIssues[0].updated_at,
        priority: 'high',
        restoreInstructions: 'Enhance existing admin authentication with Gaia-specific features'
      })
    }

    return lostFeatures
  }

  private calculateHealthScore(issues: GitHubIssue[], pullRequests: GitHubPR[]): number {
    const openIssues = issues.filter(i => i.state === 'open').length
    const totalIssues = issues.length
    const mergedPRs = pullRequests.filter(pr => pr.merged).length
    const totalPRs = pullRequests.length

    // Calculate based on issue resolution rate and PR merge rate
    const issueScore = totalIssues > 0 ? ((totalIssues - openIssues) / totalIssues) * 50 : 50
    const prScore = totalPRs > 0 ? (mergedPRs / totalPRs) * 50 : 50

    return Math.round(issueScore + prScore)
  }

  private getMockScanResult(): ScanResult {
    return {
      issues: [
        {
          id: 1,
          number: 1,
          title: 'Enhance GAIA Bike Integration',
          body: 'Need to restore and enhance the GAIA Bike ecosystem features',
          state: 'open',
          labels: [{ name: 'feature', color: 'green' }, { name: 'high-priority', color: 'red' }],
          user: { login: 'gaia-admin', avatar_url: '' },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          html_url: '#'
        }
      ],
      pullRequests: [],
      lostFeatures: [
        {
          name: 'GAIA Bike Ecosystem',
          description: 'Eco-friendly transportation and rewards system',
          lastSeen: new Date().toISOString(),
          priority: 'high',
          restoreInstructions: 'Integrate bike tracking, rewards, and eco-missions'
        },
        {
          name: 'Admin Gaia Login',
          description: 'Secure administrative access system',
          lastSeen: new Date().toISOString(),
          priority: 'high',
          restoreInstructions: 'Enhance existing admin authentication with Gaia-specific features'
        }
      ],
      totalScanned: 1,
      lastScanTime: new Date(),
      healthScore: 85
    }
  }

  // Convert internal issues to system Issue format
  convertToSystemIssues(scanResult: ScanResult): Issue[] {
    const systemIssues: Issue[] = []

    // Add open GitHub issues as system issues
    scanResult.issues
      .filter(issue => issue.state === 'open')
      .forEach(issue => {
        systemIssues.push({
          id: `github-issue-${issue.id}`,
          type: issue.labels.some(l => l.name.includes('bug')) ? 'error' : 'warning',
          message: issue.title,
          component: 'GitHub Repository',
          resolved: false,
          timestamp: new Date(issue.created_at)
        })
      })

    // Add lost features as high-priority issues
    scanResult.lostFeatures.forEach(feature => {
      systemIssues.push({
        id: `lost-feature-${feature.name.toLowerCase().replace(/\s+/g, '-')}`,
        type: feature.priority === 'high' ? 'error' : 'warning',
        message: `Missing Feature: ${feature.name}`,
        component: 'Feature System',
        resolved: false,
        timestamp: new Date(feature.lastSeen)
      })
    })

    return systemIssues
  }
}

export const githubScanner = new GitHubScannerService()