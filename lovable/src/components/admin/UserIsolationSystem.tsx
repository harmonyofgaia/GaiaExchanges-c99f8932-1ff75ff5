import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Ban, Eye, AlertTriangle } from "lucide-react";
import { RealTimeCoinCrafter } from "@/components/RealTimeCoinCrafter";
import { AIBackgroundCapabilities } from "./AIBackgroundCapabilities";

export function UserIsolationSystem() {
  return (
    <div className="space-y-6">
      {/* Real-Time Coin Crafter */}
      <RealTimeCoinCrafter />

      {/* AI Background Capabilities */}
      <AIBackgroundCapabilities />

      {/* User Isolation Controls */}
      <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-red-400">
            <Lock className="h-6 w-6" />
            🔒 USER ISOLATION & CONTROL SYSTEM
          </CardTitle>
          <div className="flex gap-4 text-sm">
            <Badge className="bg-red-600">🚫 ISOLATION ACTIVE</Badge>
            <Badge className="bg-orange-600">⚠️ THREAT MONITORING</Badge>
            <Badge className="bg-yellow-600">👁️ SURVEILLANCE MODE</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button className="bg-red-600 hover:bg-red-700">
              <Ban className="h-4 w-4 mr-2" />
              Isolate User
            </Button>
            <Button className="bg-orange-600 hover:bg-orange-700">
              <Shield className="h-4 w-4 mr-2" />
              Block Access
            </Button>
            <Button className="bg-yellow-600 hover:bg-yellow-700">
              <Eye className="h-4 w-4 mr-2" />
              Monitor Activity
            </Button>
            <Button className="bg-purple-600 hover:bg-purple-700">
              <AlertTriangle className="h-4 w-4 mr-2" />
              Threat Analysis
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
