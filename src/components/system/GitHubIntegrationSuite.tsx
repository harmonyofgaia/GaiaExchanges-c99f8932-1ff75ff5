
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Github, GitBranch, GitCommit, GitPullRequest, Settings } from 'lucide-react'

export function GitHubIntegrationSuite() {
  return (
    <div className="space-y-6">
      <Card className="border-gray-500/30 bg-gray-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-gray-400">
            <Github className="h-6 w-6" />
            🐙 GitHub Integration Suite
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-300">Repository Status</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                  <span className="text-gray-300">Connected Repository</span>
                  <Badge className="bg-green-600">gaia-universe</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                  <span className="text-gray-300">Current Branch</span>
                  <Badge className="bg-blue-600">main</Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                  <span className="text-gray-300">Last Commit</span>
                  <Badge className="bg-purple-600">2 hours ago</Badge>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-300">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button className="bg-gray-700 hover:bg-gray-600 h-16 flex-col">
                  <GitCommit className="h-5 w-5 mb-1" />
                  <span className="text-xs">View Commits</span>
                </Button>
                <Button className="bg-gray-700 hover:bg-gray-600 h-16 flex-col">
                  <GitBranch className="h-5 w-5 mb-1" />
                  <span className="text-xs">Manage Branches</span>
                </Button>
                <Button className="bg-gray-700 hover:bg-gray-600 h-16 flex-col">
                  <GitPullRequest className="h-5 w-5 mb-1" />
                  <span className="text-xs">Pull Requests</span>
                </Button>
                <Button className="bg-gray-700 hover:bg-gray-600 h-16 flex-col">
                  <Settings className="h-5 w-5 mb-1" />
                  <span className="text-xs">Repository Settings</span>
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-300">Recent Activity</h3>
            <div className="space-y-2">
              {[
                { action: 'Pushed to main branch', time: '2 hours ago', type: 'commit' },
                { action: 'Merged PR #42: Feature update', time: '5 hours ago', type: 'merge' },
                { action: 'Created new branch: feature/admin-tools', time: '1 day ago', type: 'branch' },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-900/30 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.type === 'commit' ? 'bg-green-400' :
                      activity.type === 'merge' ? 'bg-blue-400' : 'bg-yellow-400'
                    }`} />
                    <span className="text-gray-300">{activity.action}</span>
                  </div>
                  <span className="text-xs text-gray-500">{activity.time}</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
