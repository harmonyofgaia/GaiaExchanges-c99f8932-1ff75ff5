import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Infinity as InfinityIcon,
  RotateCcw,
  Zap,
  Target,
  AlertCircle,
  Atom,
} from "lucide-react";
import { infiniteRecursion } from "@/services/infiniteRecursion";
import { toast } from "sonner";

export function InfiniteRecursionDashboard() {
  const [isActive, setIsActive] = useState(false);
  const [recursionDepth, setRecursionDepth] = useState(0);
  const [paradoxLoops, setParadoxLoops] = useState(0);
  const [infinityEngines, setInfinityEngines] = useState(0);
  const [recursionStability, setRecursionStability] = useState(100);
  const [paradoxIntensity, setParadoxIntensity] = useState(0);
  const [computationalSingularities, setComputationalSingularities] =
    useState(0);

  useEffect(() => {
    const interval = setInterval(async () => {
      const status = await infiniteRecursion.getInfiniteRecursionStatus();
      setIsActive(status.isActive);
      setRecursionDepth(status.recursionDepth);
      setParadoxLoops(status.paradoxLoops);
      setInfinityEngines(status.infinityEngines);
      setRecursionStability(status.recursionStability);
      setParadoxIntensity(status.paradoxIntensity);
      setComputationalSingularities(status.computationalSingularities);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleInitialize = async () => {
    try {
      await infiniteRecursion.initializeInfiniteRecursionSystem();
      toast.success(
        "Infinite Recursion System activated! Logic is now paradoxical.",
      );
    } catch (error) {
      toast.error("Failed to initialize Infinite Recursion System");
    }
  };

  const handleCreateParadox = async () => {
    try {
      await infiniteRecursion.createParadoxLoop("Temporal-Bootstrap-Omega");
      toast.success("Paradox loop created! Causality compromised.");
    } catch (error) {
      toast.error("Failed to create paradox loop");
    }
  };

  const handleDeployEngine = async () => {
    try {
      await infiniteRecursion.deployInfinityEngine("Computational-Matrix-∞");
      toast.success("Infinity engine deployed! Mathematical limits exceeded.");
    } catch (error) {
      toast.error("Failed to deploy infinity engine");
    }
  };

  const patterns = infiniteRecursion.getRecursionPatterns();

  return (
    <Card className="border-purple-500/20 bg-gradient-to-br from-purple-950/20 to-indigo-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <InfinityIcon className="h-6 w-6" />
          Phase 17: Infinite Recursion & Paradox Warfare
          <Badge variant={isActive ? "destructive" : "secondary"}>
            {isActive ? "INFINITE" : "FINITE"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <InfinityIcon className="h-4 w-4 text-purple-400" />
            <span className="text-sm">
              Recursion Depth: {recursionDepth.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <RotateCcw className="h-4 w-4 text-indigo-400" />
            <span className="text-sm">Paradox Loops: {paradoxLoops}</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-blue-400" />
            <span className="text-sm">Infinity Engines: {infinityEngines}</span>
          </div>
          <div className="flex items-center gap-2">
            <Atom className="h-4 w-4 text-purple-400" />
            <span className="text-sm">
              Singularities: {computationalSingularities}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-indigo-400" />
            <span className="text-sm">
              Paradox Intensity: {paradoxIntensity}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4 text-red-400" />
            <span className="text-sm">Stability: {recursionStability}%</span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Paradox Intensity</span>
              <span>{paradoxIntensity}%</span>
            </div>
            <Progress value={paradoxIntensity} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Recursion Stability</span>
              <span>{recursionStability}%</span>
            </div>
            <Progress value={recursionStability} className="h-2" />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={handleInitialize}
            variant="destructive"
            className="bg-purple-600 hover:bg-purple-700"
          >
            INITIATE INFINITE RECURSION
          </Button>
          <Button
            onClick={handleCreateParadox}
            variant="outline"
            className="border-purple-500 text-purple-400"
          >
            Create Paradox
          </Button>
          <Button
            onClick={handleDeployEngine}
            variant="outline"
            className="border-indigo-500 text-indigo-400"
          >
            Deploy Engine
          </Button>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-purple-400">
            Recursion Patterns:
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {patterns.map((pattern) => (
              <div key={pattern.id} className="flex justify-between">
                <span>{pattern.name}</span>
                <span className="text-purple-400">
                  {pattern.depth.toLocaleString()} / {pattern.stability}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          <p className="italic">
            "In infinite recursion, every paradox becomes truth, every
            impossibility becomes inevitable. Logic itself bends to our will."
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
