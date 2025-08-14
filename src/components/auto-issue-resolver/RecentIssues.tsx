import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Issue } from "./types";

interface RecentIssuesProps {
  issues: Issue[];
}

export function RecentIssues({ issues }: RecentIssuesProps) {
  if (issues.length === 0) return null;

  return (
    <div className="space-y-2">
      <h4 className="font-medium text-yellow-400">Recent Auto-Resolutions</h4>
      <div className="max-h-32 overflow-y-auto space-y-1">
        {issues.slice(-5).map((issue) => (
          <div key={issue.id} className="flex items-center gap-2 text-xs p-2 bg-muted/20 rounded">
            <CheckCircle className="h-3 w-3 text-green-400" />
            <span className="flex-1">{issue.message}</span>
            <Badge variant="outline" className="text-xs">
              {issue.component}
            </Badge>
          </div>
        ))}
      </div>
    </div>
  );
}
