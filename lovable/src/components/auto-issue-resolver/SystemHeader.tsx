import { Shield, RefreshCw } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface SystemHeaderProps {
  lastCheck: Date;
}

export function SystemHeader({ lastCheck }: SystemHeaderProps) {
  return (
    <>
      <div className="flex items-center gap-2 text-green-400">
        <Shield className="h-5 w-5" />
        Harmony of Gaia - Auto Issue Resolver
        <Badge className="bg-green-600">Active</Badge>
      </div>
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <RefreshCw className="h-4 w-4 animate-spin" />
        <span>Last Check: {lastCheck.toLocaleTimeString()}</span>
        <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      </div>
    </>
  );
}
