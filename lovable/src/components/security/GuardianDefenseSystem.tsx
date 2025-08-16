import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Shield, Activity, Eye, Lock } from "lucide-react";
import { toast } from "sonner";

export function GuardianDefenseSystem() {
  const [defenseLevel, setDefenseLevel] = useState(75.0);
  const [activeProtections, setActiveProtections] = useState(8);
  const [threatsBlocked, setThreatsBlocked] = useState(156);

  useEffect(() => {
    // Simulate guardian defense system activity
    const interval = setInterval(() => {
      setDefenseLevel((prev) => Math.min(100, prev + Math.random() * 0.2));
      if (Math.random() < 0.1) {
        setThreatsBlocked((prev) => prev + 1);
        toast.success("🛡️ Guardian Defense: Threat Blocked", {
          description: "Your guardian protection successfully blocked a security threat",
          duration: 3000,
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const activateGuardianMode = () => {
    setActiveProtections((prev) => prev + 2);
    toast.success("🛡️ Guardian Mode Activated!", {
      description: "Enhanced protection protocols are now active",
      duration: 4000,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-purple-500/50 bg-gradient-to-br from-purple-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Shield className="h-6 w-6" />
            🛡️ GUARDIAN DEFENSE SYSTEM
          </CardTitle>
          <p className="text-purple-300">
            Community Guardian Protection • Animal-Focused Security • Environmental Defense
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{defenseLevel.toFixed(1)}%</div>
              <div className="text-sm text-muted-foreground">Defense Level</div>
              <Progress value={defenseLevel} className="mt-2 h-2" />
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{activeProtections}</div>
              <div className="text-sm text-muted-foreground">Active Protections</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{threatsBlocked}</div>
              <div className="text-sm text-muted-foreground">Threats Blocked</div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-black/50 p-4 rounded-lg">
              <h4 className="text-purple-400 font-bold mb-2">🌿 Guardian Protection Features:</h4>
              <ul className="text-sm text-purple-300 space-y-1">
                <li>• Animal welfare monitoring and alerts</li>
                <li>• Environmental project protection</li>
                <li>• Community-focused threat detection</li>
                <li>• Guardian network communication</li>
                <li>• Specialized defense protocols</li>
              </ul>
            </div>

            <Button
              onClick={activateGuardianMode}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3"
            >
              <Shield className="h-5 w-5 mr-2" />
              ACTIVATE GUARDIAN MODE
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-green-500/30 bg-green-900/20">
        <CardHeader>
          <CardTitle className="text-green-400">🌍 Community Impact</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">Animals Protected:</span>
              <span className="text-green-400 ml-2 font-bold">2,847</span>
            </div>
            <div>
              <span className="text-muted-foreground">Guardian Network:</span>
              <span className="text-blue-400 ml-2 font-bold">Active</span>
            </div>
            <div>
              <span className="text-muted-foreground">Environmental Projects:</span>
              <span className="text-purple-400 ml-2 font-bold">47</span>
            </div>
            <div>
              <span className="text-muted-foreground">Defense Efficiency:</span>
              <span className="text-green-400 ml-2 font-bold">96.8%</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
