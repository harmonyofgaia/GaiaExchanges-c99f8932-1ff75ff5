
export interface GitHubStatus {
  isConnected: boolean
  organization: string
  repository: string
  lastRelease: string | null
  hasReleases: boolean
  isLoading: boolean
  isPrivate: boolean
  securityFeatures: {
    secretsScanning: boolean
    dependencyScanning: boolean
    codeScanning: boolean
    branchProtection: boolean
  }
}
