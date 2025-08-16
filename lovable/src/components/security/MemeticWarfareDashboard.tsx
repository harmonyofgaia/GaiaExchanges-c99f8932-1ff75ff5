import { useState, useEffect, useCallback} from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { memeticWarfare } from "@/services/memeticWarfare";
import { Brain, Target, Zap, Globe } from "lucide-react";

export function MemeticWarfareDashboard() {
  const [status, setStatus] = useState({
    isActive: false,
    globalMindControl: 0,
    realityCorruption: 0,
    memeticWeapons: { total: 0, active: 0, totalMindsPenetrated: 0 },
    psychicNetworks: { total: 0, connected: 0, totalNodes: 0, collectiveIQ: 0 },
    consciousnessHijacks: { total: 0, successful: 0 },
    realityGlitches: { total: 0, exploitable: 0 },
  });

  useEffect(() => {
    const updateStatus = () => {
      setStatus(memeticWarfare.getMemeticWarfareStatus());
    };
    const interval = setInterval(updateStatus, 2000);
    updateStatus();
    return () => clearInterval(interval);
  }, []);

  const handleInitialize = async () => {
    try {
      await memeticWarfare.initializeMemeticWarfareSystem();
      toast.success("🧠 Memetic Warfare System Armed");
    } catch (error) {
      toast.error("Failed to initialize system");
    }
  };

  return (
    <Card className="border-gradient">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-primary" />
          Phase 13: Memetic Warfare & Cognitive Manipulation
          <Badge variant={status.isActive ? "destructive" : "secondary"}>
            {status.isActive ? "MIND CONTROL ACTIVE" : "STANDBY"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Active Memes</span>
            </div>
            <div className="text-2xl font-bold text-primary">
              {status.memeticWeapons.active}/{status.memeticWeapons.total}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Mind Control Ops</span>
            </div>
            <div className="text-2xl font-bold text-primary">
              {status.consciousnessHijacks.successful}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Psych Weapons</span>
            </div>
            <div className="text-2xl font-bold text-primary">
              {status.psychicNetworks.connected}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Cognitive Infections</span>
            </div>
            <div className="text-2xl font-bold text-primary">
              {status.realityGlitches.exploitable}
            </div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Brain className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Memetic Infection Rate</span>
          </div>
          <Progress value={status.globalMindControl * 100} className="mt-2" />
          <div className="text-sm text-muted-foreground">
            {(status.globalMindControl * 100).toFixed(1)}% Mind Control
          </div>
        </div>
        <Button onClick={handleInitialize} size="sm" variant="destructive">
          <Brain className="h-4 w-4 mr-2" />
          Initialize Memetic Warfare
        </Button>
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">🧠 Cognitive Domination Guarantee</h4>
          <p className="text-sm text-muted-foreground">
            Total psychological warfare capabilities through memetic infection, mind control
            operations, and cognitive manipulation systems.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
