import { CheckCircle, AlertCircle, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { GitHubStatus } from "./types";

interface GitHubStatusDisplayProps {
  githubStatus: GitHubStatus;
}

export function GitHubStatusDisplay({ githubStatus }: GitHubStatusDisplayProps) {
  return (
    <div className="flex items-center justify-between p-3 rounded-lg bg-muted/20">
      <div className="flex items-center gap-3">
        {githubStatus.isConnected ? (
          <CheckCircle className="h-5 w-5 text-green-400" />
        ) : (
          <AlertCircle className="h-5 w-5 text-orange-400" />
        )}
        <div>
          <div className="font-semibold flex items-center gap-2">
            {githubStatus.organization}/{githubStatus.repository}
            {githubStatus.isPrivate && <Lock className="h-4 w-4 text-green-400" />}
          </div>
          <div className="text-sm text-muted-foreground">
            {githubStatus.isConnected ? "Repository Connected & Secured" : "Repository Not Found"}
          </div>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Badge className={githubStatus.isConnected ? "bg-green-600" : "bg-orange-600"}>
          {githubStatus.isConnected ? "Connected" : "Pending"}
        </Badge>
        {githubStatus.isPrivate && (
          <Badge className="bg-blue-600 text-white">
            <Lock className="h-3 w-3 mr-1" />
            Private
          </Badge>
        )}
      </div>
    </div>
  );
}
