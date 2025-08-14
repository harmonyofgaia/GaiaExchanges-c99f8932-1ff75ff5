import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { realityManipulation } from "@/services/realityManipulation";
import { Layers, Zap, Globe, Target } from "lucide-react";

export function RealityManipulationDashboard() {
  const [status, setStatus] = useState({
    isActive: false,
    realityFlexibility: 0,
    causalStability: 0,
    probabilityMatrices: { total: 0, active: 0 },
    quantumPossibilities: { total: 0, manifested: 0 },
    causalLoops: { total: 0, active: 0, totalIterations: 0 },
    realityAnchors: { total: 0, deployed: 0 },
  });

  useEffect(() => {
    const updateStatus = () => {
      setStatus(realityManipulation.getRealityManipulationStatus());
    };
    const interval = setInterval(updateStatus, 2000);
    updateStatus();
    return () => clearInterval(interval);
  }, []);

  const handleInitialize = async () => {
    try {
      await realityManipulation.initializeRealityManipulationSystem();
      toast.success("🌌 Reality Manipulation System Armed");
    } catch (error) {
      toast.error("Failed to initialize system");
    }
  };

  return (
    <Card className="border-gradient">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-6 w-6 text-primary" />
          Phase 14: Reality Manipulation & Probability Control
          <Badge variant={status.isActive ? "destructive" : "secondary"}>
            {status.isActive ? "REALITY HACKED" : "STANDBY"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Reality Distortions</span>
            </div>
            <div className="text-2xl font-bold text-primary">
              {status.probabilityMatrices.active}/{status.probabilityMatrices.total}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Globe className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Dimensional Anchors</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.realityAnchors.deployed}</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Probability Engines</span>
            </div>
            <div className="text-2xl font-bold text-primary">
              {status.quantumPossibilities.manifested}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Causality Violations</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.causalLoops.active}</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Reality Coherence Index</span>
          </div>
          <Progress value={status.realityFlexibility * 100} className="mt-2" />
          <div className="text-sm text-muted-foreground">
            {(status.realityFlexibility * 100).toFixed(1)}% Flexible
          </div>
        </div>
        <Button onClick={handleInitialize} size="sm" variant="destructive">
          <Layers className="h-4 w-4 mr-2" />
          Initialize Reality Manipulation
        </Button>
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">🌌 Reality Control Guarantee</h4>
          <p className="text-sm text-muted-foreground">
            Complete control over physical laws, probability manipulation, and dimensional reality
            restructuring capabilities.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
