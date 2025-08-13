import { AdvancedAnalyticsDashboard } from "@/components/analytics/AdvancedAnalyticsDashboard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, Eye, Lock } from "lucide-react";

export function AdminAnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <Card className="border-2 border-red-500/50 bg-gradient-to-br from-red-900/30 to-orange-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Shield className="h-6 w-6" />
            🛡️ ADMIN-ONLY ANALYTICS COMMAND CENTER
            <Badge className="bg-red-600 text-white animate-pulse">
              <Lock className="h-3 w-3 mr-1" />
              INVISIBLE TO OUTSIDERS
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center space-y-2 mb-6">
            <div className="flex items-center justify-center gap-2 text-orange-400">
              <Eye className="h-5 w-5" />
              <span className="font-bold">COMMUNITY PROTECTION ANALYTICS</span>
            </div>
            <p className="text-sm text-muted-foreground">
              🔒 Encrypted • 👻 Invisible to malicious software • 🛡️ Admin-only
              access
            </p>
          </div>
        </CardContent>
      </Card>

      <AdvancedAnalyticsDashboard />
    </div>
  );
}
