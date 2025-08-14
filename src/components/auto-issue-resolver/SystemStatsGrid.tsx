import { CheckCircle, RefreshCw, AlertTriangle, Shield } from "lucide-react";
import { SystemStats } from "./types";

interface SystemStatsGridProps {
  stats: SystemStats;
}

export function SystemStatsGrid({ stats }: SystemStatsGridProps) {
  const getSecurityColor = (level: string) => {
    switch (level) {
      case "HIGH":
        return "text-green-400";
      case "MEDIUM":
        return "text-yellow-400";
      case "LOW":
        return "text-red-400";
      default:
        return "text-green-400";
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4 text-center">
        <CheckCircle className="h-8 w-8 text-green-400 mx-auto mb-2" />
        <div className="text-2xl font-bold text-green-400">{stats.systemHealth}%</div>
        <div className="text-sm text-muted-foreground">System Health</div>
      </div>
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 text-center">
        <RefreshCw className="h-8 w-8 text-blue-400 mx-auto mb-2" />
        <div className="text-2xl font-bold text-blue-400">{stats.checkInterval}</div>
        <div className="text-sm text-muted-foreground">Security Scan</div>
      </div>
      <div className="bg-purple-500/10 border border-purple-500/20 rounded-lg p-4 text-center">
        <AlertTriangle className="h-8 w-8 text-purple-400 mx-auto mb-2" />
        <div className="text-2xl font-bold text-purple-400">{stats.activeIssues}</div>
        <div className="text-sm text-muted-foreground">Active Threats</div>
      </div>
      <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4 text-center">
        <Shield className="h-8 w-8 text-orange-400 mx-auto mb-2" />
        <div className={`text-2xl font-bold ${getSecurityColor(stats.securityLevel || "HIGH")}`}>
          {stats.securityLevel || "HIGH"}
        </div>
        <div className="text-sm text-muted-foreground">Security Level</div>
      </div>
    </div>
  );
}
