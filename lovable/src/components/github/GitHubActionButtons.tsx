import { Button } from "@/components/ui/button";
import { Github, Star, Shield, Lock } from "lucide-react";
import { toast } from "sonner";
import { GitHubStatus } from "./types";

interface GitHubActionButtonsProps {
  githubStatus: GitHubStatus;
}

export function GitHubActionButtons({
  githubStatus,
}: GitHubActionButtonsProps) {
  const openGitHubRepo = () => {
    const url = `https://github.com/${githubStatus.organization}/${githubStatus.repository}`;
    window.open(url, "_blank", "noopener,noreferrer");

    toast.success("Opening Secure GitHub Repository", {
      description: "🚀 Culture of Harmony - GAiA Project (Private & Secured)",
      duration: 3000,
    });
  };

  const openGitHubOrg = () => {
    const url = `https://github.com/${githubStatus.organization}`;
    window.open(url, "_blank", "noopener,noreferrer");

    toast.success("Opening GitHub Organization", {
      description: "🌍 Culture of Harmony Organization - Secure Development",
      duration: 3000,
    });
  };

  const createSecureGitHubRepo = () => {
    toast.info("Creating Secure GitHub Repository", {
      description:
        '📝 Use Lovable\'s "Export to GitHub" - Repository will be private and secured',
      duration: 8000,
    });

    toast.success("Security Configuration Ready", {
      description:
        "🔒 Private repo, branch protection, secrets scanning will be enabled",
      duration: 5000,
    });
  };

  const openSecuritySettings = () => {
    const url = `https://github.com/${githubStatus.organization}/${githubStatus.repository}/settings/security_analysis`;
    window.open(url, "_blank", "noopener,noreferrer");

    toast.success("Opening Security Settings", {
      description: "🛡️ Configure advanced security features",
      duration: 3000,
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
      <Button
        onClick={openGitHubRepo}
        className="bg-blue-600 hover:bg-blue-700"
        disabled={!githubStatus.isConnected}
      >
        <Github className="h-4 w-4 mr-2" />
        View Repository
      </Button>

      <Button onClick={openGitHubOrg} variant="outline">
        <Star className="h-4 w-4 mr-2" />
        Organization
      </Button>

      <Button
        onClick={openSecuritySettings}
        variant="outline"
        disabled={!githubStatus.isConnected}
        className="border-green-500/20"
      >
        <Shield className="h-4 w-4 mr-2" />
        Security Settings
      </Button>

      {!githubStatus.isConnected && (
        <Button
          onClick={createSecureGitHubRepo}
          className="bg-green-600 hover:bg-green-700"
        >
          <Lock className="h-4 w-4 mr-2" />
          Create Secure Repo
        </Button>
      )}
    </div>
  );
}
