import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Zap, Layers, Clock, Atom, Target, AlertTriangle } from "lucide-react";
import { dimensionalFracture } from "@/services/dimensionalFracture";
import { toast } from "sonner";

export function DimensionalFractureDashboard() {
  const [isActive, setIsActive] = useState(false);
  const [spacetimeRifts, setSpacetimeRifts] = useState(0);
  const [dimensionalBreaches, setDimensionalBreaches] = useState(0);
  const [temporalAnchors, setTemporalAnchors] = useState(0);
  const [realityFragments, setRealityFragments] = useState(0);
  const [fractureIntensity, setFractureIntensity] = useState(0);
  const [spacetimeStability, setSpacetimeStability] = useState(100);

  useEffect(() => {
    const interval = setInterval(async () => {
      const status = await dimensionalFracture.getDimensionalFractureStatus();
      setIsActive(status.isActive);
      setSpacetimeRifts(status.spacetimeRifts);
      setDimensionalBreaches(status.dimensionalBreaches);
      setTemporalAnchors(status.temporalAnchors);
      setRealityFragments(status.realityFragments);
      setFractureIntensity(status.fractureIntensity);
      setSpacetimeStability(status.spacetimeStability);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleInitialize = async () => {
    try {
      await dimensionalFracture.initializeDimensionalFractureSystem();
      toast.success("Dimensional Fracture System initialized! Spacetime is now unstable.");
    } catch (error) {
      toast.error("Failed to initialize Dimensional Fracture System");
    }
  };

  const handleCreateRift = async () => {
    try {
      await dimensionalFracture.createSpacetimeRift("Reality-Prime-Alpha");
      toast.success("Spacetime rift created! Reality barrier breached.");
    } catch (error) {
      toast.error("Failed to create spacetime rift");
    }
  };

  const handleBreachDimension = async () => {
    try {
      await dimensionalFracture.breachDimension("Parallel-Universe-7");
      toast.success("Dimensional breach successful! Parallel reality accessed.");
    } catch (error) {
      toast.error("Failed to breach dimension");
    }
  };

  const capabilities = dimensionalFracture.getFractureCapabilities();

  return (
    <Card className="border-orange-500/20 bg-gradient-to-br from-orange-950/20 to-red-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-400">
          <Layers className="h-6 w-6" />
          Phase 16: Dimensional Fracture & Spacetime Control
          <Badge variant={isActive ? "destructive" : "secondary"}>
            {isActive ? "FRACTURING" : "STABLE"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-orange-400" />
            <span className="text-sm">Spacetime Rifts: {spacetimeRifts}</span>
          </div>
          <div className="flex items-center gap-2">
            <Layers className="h-4 w-4 text-red-400" />
            <span className="text-sm">Dimensional Breaches: {dimensionalBreaches}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-yellow-400" />
            <span className="text-sm">Temporal Anchors: {temporalAnchors}</span>
          </div>
          <div className="flex items-center gap-2">
            <Atom className="h-4 w-4 text-purple-400" />
            <span className="text-sm">Reality Fragments: {realityFragments}</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-orange-400" />
            <span className="text-sm">Fracture Intensity: {fractureIntensity}%</span>
          </div>
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-red-400" />
            <span className="text-sm">Spacetime Stability: {spacetimeStability}%</span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Fracture Intensity</span>
              <span>{fractureIntensity}%</span>
            </div>
            <Progress value={fractureIntensity} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Spacetime Stability</span>
              <span>{spacetimeStability}%</span>
            </div>
            <Progress value={spacetimeStability} className="h-2" />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={handleInitialize}
            variant="destructive"
            className="bg-orange-600 hover:bg-orange-700"
          >
            FRACTURE SPACETIME
          </Button>
          <Button
            onClick={handleCreateRift}
            variant="outline"
            className="border-orange-500 text-orange-400"
          >
            Create Rift
          </Button>
          <Button
            onClick={handleBreachDimension}
            variant="outline"
            className="border-red-500 text-red-400"
          >
            Breach Dimension
          </Button>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-orange-400">Fracture Capabilities:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {capabilities.map((capability) => (
              <div key={capability.id} className="flex justify-between">
                <span>{capability.name}</span>
                <span className="text-orange-400">
                  {capability.power}% / {capability.stability}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          <p className="italic">
            "When spacetime itself becomes your weapon, reality becomes optional. Every dimension is
            just another battlefield to conquer."
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
