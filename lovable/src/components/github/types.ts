export interface GitHubStatus {
  isConnected: boolean;
  organization: string;
  repository: string;
  lastRelease: string | null;
  hasReleases: boolean;
  isLoading?: boolean;
  isPrivate: boolean;
  websiteUrl: string;
  securityEnabled: boolean;
  branchProtection: boolean;
  secretsScanning: boolean;
  dependencyAlerts: boolean;
  codeScanning: boolean;
  securityFeatures: {
    secretsScanning: boolean;
    dependencyScanning: boolean;
    codeScanning: boolean;
    branchProtection: boolean;
  };
}
