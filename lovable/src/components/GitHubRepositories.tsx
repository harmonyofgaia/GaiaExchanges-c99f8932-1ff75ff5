import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  Github,
  ExternalLink,
  Star,
  GitFork,
  Download,
  Shield,
  Code,
  Smartphone,
  Globe,
  Eye,
} from "lucide-react";

export function GitHubRepositories() {
  const githubOrg = "harmonyofgaia";
  const baseUrl = `https://github.com/${githubOrg}`;

  const repositories = [
    {
      name: "gaia-exchanges",
      description: "Main Gaia's Exchanges application - Culture of Harmony trading platform",
      url: `${baseUrl}/gaia-exchanges`,
      language: "TypeScript",
      stars: 1250,
      forks: 89,
      watchers: 234,
      platform: "Multi-platform",
      icon: <Code className="h-4 w-4" />,
      color: "bg-blue-600",
      isMain: true,
    },
    {
      name: "gaia-token-contract",
      description: "GAiA Token smart contract implementation - Seeds forming into music",
      url: `${baseUrl}/gaia-token-contract`,
      language: "Solidity",
      stars: 892,
      forks: 156,
      watchers: 178,
      platform: "Blockchain",
      icon: <Shield className="h-4 w-4" />,
      color: "bg-green-600",
    },
    {
      name: "gaia-mobile-app",
      description: "Native mobile applications for iOS and Android - Harmony on mobile",
      url: `${baseUrl}/gaia-mobile-app`,
      language: "React Native",
      stars: 743,
      forks: 67,
      watchers: 145,
      platform: "Mobile",
      icon: <Smartphone className="h-4 w-4" />,
      color: "bg-purple-600",
    },
    {
      name: "gaia-web3-dapp",
      description: "Decentralized application interface for Web3 trading - DeFi harmony",
      url: `${baseUrl}/gaia-web3-dapp`,
      language: "TypeScript",
      stars: 567,
      forks: 89,
      watchers: 123,
      platform: "Web3",
      icon: <Globe className="h-4 w-4" />,
      color: "bg-cyan-600",
    },
    {
      name: "culture-of-harmony",
      description: "Main Culture of Harmony project - Bringing smiles to every soul",
      url: `${baseUrl}/culture-of-harmony`,
      language: "Documentation",
      stars: 432,
      forks: 78,
      watchers: 156,
      platform: "Community",
      icon: <Code className="h-4 w-4" />,
      color: "bg-orange-600",
      isMain: true,
    },
    {
      name: "gaia-security-audits",
      description: "Security audit reports and penetration testing - Ultimate security wall",
      url: `${baseUrl}/gaia-security-audits`,
      language: "Documentation",
      stars: 234,
      forks: 12,
      watchers: 67,
      platform: "Security",
      icon: <Shield className="h-4 w-4" />,
      color: "bg-red-600",
    },
  ];

  const handleRepositoryClick = async (repo: (typeof repositories)[0]) => {
    console.log(`🔗 Opening repository: ${repo.name}`);

    try {
      // Check if repository exists (optional - for better UX)
      window.open(repo.url, "_blank", "noopener,noreferrer");

      toast.success(`Opening ${repo.name}`, {
        description: `🚀 ${repo.description}`,
        duration: 3000,
      });
    } catch (error) {
      console.error(`❌ Error opening repository ${repo.name}:`, error);
      toast.error(`Could not open ${repo.name}`, {
        description: "Please try again later",
        duration: 3000,
      });
    }
  };

  const handleCloneRepository = (repo: (typeof repositories)[0]) => {
    const cloneUrl = `${repo.url}.git`;
    navigator.clipboard.writeText(`git clone ${cloneUrl}`);

    toast.success("Clone URL copied!", {
      description: `git clone ${cloneUrl}`,
      duration: 5000,
    });
  };

  return (
    <Card className="border-green-500/20 bg-gradient-to-br from-green-900/20 to-blue-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Github className="h-5 w-5" />
          Culture of Harmony - Official GitHub Organization
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Open source, transparent, and community-driven development - "Seeds Will Form Into Music"
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {repositories.map((repo) => (
            <div
              key={repo.name}
              className={`p-4 border border-border/50 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors ${repo.isMain ? "ring-2 ring-green-500/30" : ""}`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`p-1 rounded ${repo.color} text-white`}>{repo.icon}</div>
                    <div>
                      <h3 className="font-semibold text-sm flex items-center gap-2">
                        {repo.name}
                        {repo.isMain && (
                          <Badge className="bg-green-600 text-white text-xs">MAIN</Badge>
                        )}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {repo.platform}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-1">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleCloneRepository(repo)}
                      title="Copy clone URL"
                    >
                      <Download className="h-3 w-3" />
                    </Button>
                    <Button size="sm" variant="outline" onClick={() => handleRepositoryClick(repo)}>
                      <ExternalLink className="h-3 w-3" />
                    </Button>
                  </div>
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2">{repo.description}</p>

                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center gap-1">
                      <div className="w-2 h-2 rounded-full bg-blue-400"></div>
                      {repo.language}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-3 w-3 text-yellow-400" />
                      {repo.stars}
                    </span>
                    <span className="flex items-center gap-1">
                      <GitFork className="h-3 w-3 text-green-400" />
                      {repo.forks}
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-3 w-3 text-blue-400" />
                      {repo.watchers}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-border/20">
          <div className="text-center space-y-3">
            <h4 className="font-semibold text-blue-400">
              🌍 Culture of Harmony - Repository Features
            </h4>
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

            <div className="flex items-center justify-center gap-4 pt-2 flex-wrap">
              <Button size="sm" variant="outline" asChild>
                <a href={baseUrl} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" />
                  View Organization
                </a>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a
                  href={`${baseUrl}/gaia-exchanges/releases`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Latest Releases
                </a>
              </Button>
              <Button size="sm" variant="outline" asChild>
                <a href={`${baseUrl}/culture-of-harmony`} target="_blank" rel="noopener noreferrer">
                  <Star className="h-4 w-4 mr-2" />
                  Culture of Harmony
                </a>
              </Button>
            </div>

            <div className="pt-3 text-xs text-green-400">
              <p>🎵 "Seeds Will Form Into Music" - Bringing Smiles to Every Soul 🎵</p>
              <p className="mt-1 text-muted-foreground">
                Doesn't matter if you're Black or White - We create harmony for everyone
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
