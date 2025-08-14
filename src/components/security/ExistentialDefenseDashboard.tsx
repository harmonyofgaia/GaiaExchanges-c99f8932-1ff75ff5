import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { existentialDefense } from "@/services/existentialDefense";
import { Shield, Zap, Star } from "lucide-react";
import { Infinity as InfinityIcon } from "lucide-react";

export function ExistentialDefenseDashboard() {
  const [status, setStatus] = useState({
    isActive: false,
    existenceStability: 0,
    voidContainment: 0,
    realityIntegrity: 0,
    existentialThreats: { total: 0, contained: 0, active: 0 },
    voidBarriers: { total: 0, active: 0 },
    existenceProtocols: { total: 0, armed: 0 },
    conceptualWeapons: { total: 0, charged: 0 },
  });

  useEffect(() => {
    const updateStatus = () => {
      setStatus(existentialDefense.getExistentialDefenseStatus());
    };
    const interval = setInterval(updateStatus, 2000);
    updateStatus();
    return () => clearInterval(interval);
  }, []);

  const handleInitialize = async () => {
    try {
      await existentialDefense.initializeExistentialDefenseSystem();
      toast.success("🛡️ Existential Defense System Armed");
    } catch (error) {
      toast.error("Failed to initialize system");
    }
  };

  return (
    <Card className="border-gradient">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="h-6 w-6 text-primary" />
          Phase 15: Existential Defense & Ontological Warfare
          <Badge variant={status.isActive ? "destructive" : "secondary"}>
            {status.isActive ? "EXISTENCE SECURED" : "STANDBY"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Ontological Weapons</span>
            </div>
            <div className="text-2xl font-bold text-primary">
              {status.conceptualWeapons.charged}/{status.conceptualWeapons.total}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Conceptual Shields</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.voidBarriers.active}</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              {/* TODO: Replace with a valid icon. Removed invalid <Infinity /> */}
              <span className="h-4 w-4 text-primary">∞</span>
              <span className="text-sm font-medium">Existential Anchors</span>
            </div>
            <div className="text-2xl font-bold text-primary">
              {status.existentialThreats.contained}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Reality Ward Fields</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.existenceProtocols.armed}</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Existential Threat Level</span>
          </div>
          <Progress value={status.existenceStability * 100} className="mt-2" />
          <div className="text-sm text-muted-foreground">
            {(status.existenceStability * 100).toFixed(1)}% Stable
          </div>
        </div>
        <Button onClick={handleInitialize} size="sm" variant="destructive">
          <Shield className="h-4 w-4 mr-2" />
          Initialize Existential Defense
        </Button>
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">🛡️ Existence Protection Guarantee</h4>
          <p className="text-sm text-muted-foreground">
            Ultimate defense against existential threats through ontological warfare, conceptual
            shields, and reality anchor systems.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
