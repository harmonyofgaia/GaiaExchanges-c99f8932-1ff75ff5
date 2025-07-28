import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/sonner'
import { Routes, Route } from 'react-router-dom'
import Index from '@/pages/Index'
import SystemAnalysis from '@/pages/SystemAnalysis'
import AutoIssueResolver from '@/pages/AutoIssueResolver'
import SecurityDashboard from '@/pages/SecurityDashboard'
import GitHubRepositories from '@/pages/GitHubRepositories'
import GitHubIntegration from '@/pages/GitHubIntegration'
import GaiaCommunityProjects from '@/pages/GaiaCommunityProjects'
import MasterSecurityOrchestratorPage from '@/pages/MasterSecurityOrchestratorPage'
import GitHubIntegrationSuitePage from '@/pages/GitHubIntegrationSuitePage'

function App() {
  return (
    <QueryClientProvider client={new QueryClient()}>
      <div className="min-h-screen bg-background">
        <Toaster />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/auto-issue-resolver" element={<AutoIssueResolver />} />
          <Route path="/security-dashboard" element={<SecurityDashboard />} />
          <Route path="/github-repositories" element={<GitHubRepositories />} />
          <Route path="/github-integration" element={<GitHubIntegration />} />
          <Route path="/gaia-community-projects" element={<GaiaCommunityProjects />} />
          <Route path="/master-security" element={<MasterSecurityOrchestratorPage />} />
          <Route path="/github-integration-suite" element={<GitHubIntegrationSuitePage />} />
          <Route path="/system-analysis" element={<SystemAnalysis />} />
        </Routes>
      </div>
    </QueryClientProvider>
  )
}

export default App
