import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GitBranch, GitCommit, GitPullRequest, Github, Settings, Webhook } from "lucide-react";

export function GitHubIntegrationSuite() {
  const [isConnected, setIsConnected] = useState(true);
  const [repoUrl, setRepoUrl] = useState("https://github.com/harmonyofgaia/GaiaExchanges");

  const pullRequests = [
    {
      id: 7,
      title: "GaiaExchanges Heavy-Loaded Master Plan v3",
      status: "merged",
      author: "admin",
    },
    {
      id: 8,
      title: "GAIA Innovation Master Plan v7 Features",
      status: "merged",
      author: "admin",
    },
    {
      id: 9,
      title: "Comprehensive Supabase Security Autofix Plan",
      status: "merged",
      author: "admin",
    },
    {
      id: 10,
      title: "Automated Supabase Security & Performance Remediation System",
      status: "merged",
      author: "admin",
    },
    {
      id: 21,
      title: "Admin Page Enhancement Request",
      status: "open",
      author: "admin",
    },
  ];

  const commits = [
    {
      id: "abc123",
      message: "Implement security patches from PR #10",
      author: "admin",
      time: "2 hours ago",
    },
    {
      id: "def456",
      message: "Add new admin dashboard components",
      author: "admin",
      time: "4 hours ago",
    },
    {
      id: "ghi789",
      message: "Fix navigation routing issues",
      author: "admin",
      time: "6 hours ago",
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-purple-900/30">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            <Github className="h-5 w-5" />
            🔗 GitHub Integration Control Center
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 mb-6">
            <Badge className={`${isConnected ? "bg-green-600" : "bg-red-600"}`}>
              {isConnected ? "CONNECTED" : "DISCONNECTED"}
            </Badge>
            <span className="text-sm text-muted-foreground">
              Repository: harmonyofgaia/GaiaExchanges
            </span>
          </div>

          <Tabs defaultValue="pull-requests" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pull-requests">Pull Requests</TabsTrigger>
              <TabsTrigger value="commits">Recent Commits</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="webhooks">Webhooks</TabsTrigger>
            </TabsList>

            <TabsContent value="pull-requests" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-blue-400">Pull Requests Status</h3>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <GitPullRequest className="h-4 w-4 mr-2" />
                  Sync PRs
                </Button>
              </div>

              {pullRequests.map((pr) => (
                <Card key={pr.id} className="bg-black/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">
                          #{pr.id} {pr.title}
                        </div>
                        <div className="text-sm text-muted-foreground">by {pr.author}</div>
                      </div>
                      <Badge className={pr.status === "merged" ? "bg-purple-600" : "bg-green-600"}>
                        {pr.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="commits" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-blue-400">Recent Commits</h3>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <GitCommit className="h-4 w-4 mr-2" />
                  Sync Commits
                </Button>
              </div>

              {commits.map((commit) => (
                <Card key={commit.id} className="bg-black/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">{commit.message}</div>
                        <div className="text-sm text-muted-foreground">
                          {commit.id} • by {commit.author} • {commit.time}
                        </div>
                      </div>
                      <GitCommit className="h-4 w-4 text-blue-400" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400">Repository Settings</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Repository URL</label>
                  <Input
                    value={repoUrl}
                    onChange={(e) => setRepoUrl(e.target.value)}
                    className="bg-black/30"
                  />
                </div>

                <div className="flex gap-4">
                  <Button className="bg-green-600 hover:bg-green-700">
                    <Settings className="h-4 w-4 mr-2" />
                    Update Settings
                  </Button>
                  <Button variant="outline">
                    <GitBranch className="h-4 w-4 mr-2" />
                    Switch Branch
                  </Button>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="webhooks" className="space-y-4">
              <h3 className="text-lg font-semibold text-blue-400">Webhook Configuration</h3>

              <div className="space-y-4">
                <Card className="bg-black/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">Deployment Webhook</div>
                        <div className="text-sm text-muted-foreground">
                          Auto-deploy on push to main
                        </div>
                      </div>
                      <Badge className="bg-green-600">ACTIVE</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-black/30">
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-semibold">Security Webhook</div>
                        <div className="text-sm text-muted-foreground">
                          Security scan notifications
                        </div>
                      </div>
                      <Badge className="bg-green-600">ACTIVE</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Webhook className="h-4 w-4 mr-2" />
                  Add New Webhook
                </Button>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}
