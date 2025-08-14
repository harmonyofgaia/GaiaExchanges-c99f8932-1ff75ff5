import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Lock, Eye, AlertTriangle, Zap, Crown } from "lucide-react";

export default function UltimateSecurity() {
  const [securityLevel, setSecurityLevel] = useState(100);
  const [threatsBlocked, setThreatsBlocked] = useState(0);

  useEffect(() => {
    const securityInterval = setInterval(() => {
      setSecurityLevel((prev) => Math.min(100, prev + 1));
      setThreatsBlocked((prev) => prev + Math.floor(Math.random() * 3));
    }, 2000);

    return () => clearInterval(securityInterval);
  }, []);

  return (
    <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-red-400">
          <Shield className="h-6 w-6" />
          🛡️ ULTIMATE SECURITY SYSTEM
        </CardTitle>
        <div className="flex gap-2">
          <Badge className="bg-red-600">🔒 MAXIMUM PROTECTION</Badge>
          <Badge className="bg-orange-600">⚡ QUANTUM DEFENSE</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-green-900/20 border border-green-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2 text-green-400">
              <Crown className="h-4 w-4" />
              <span className="font-medium">Security Level</span>
            </div>
            <div className="text-2xl font-bold text-green-300">{securityLevel}%</div>
          </div>

          <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2 text-blue-400">
              <Eye className="h-4 w-4" />
              <span className="font-medium">Threats Blocked</span>
            </div>
            <div className="text-2xl font-bold text-blue-300">{threatsBlocked}</div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button className="bg-red-600 hover:bg-red-700">
            <Lock className="h-4 w-4 mr-2" />
            Lockdown Mode
          </Button>
          <Button className="bg-orange-600 hover:bg-orange-700">
            <Zap className="h-4 w-4 mr-2" />
            Quantum Shield
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
