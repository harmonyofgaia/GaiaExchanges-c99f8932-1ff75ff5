import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Snowflake, Thermometer, Zap, Circle, Target, TrendingDown } from "lucide-react";
import { absoluteZeroPoint } from "@/services/absoluteZeroPoint";
import { toast } from "sonner";

export function AbsoluteZeroPointDashboard() {
  const [isActive, setIsActive] = useState(false);
  const [entropyLevel, setEntropyLevel] = useState(0);
  const [zeroPointFields, setZeroPointFields] = useState(0);
  const [vacuumFluctuations, setVacuumFluctuations] = useState(0);
  const [quantumVoids, setQuantumVoids] = useState(0);
  const [absoluteTemperature, setAbsoluteTemperature] = useState(273.15);
  const [universalEntropy, setUniversalEntropy] = useState(100);

  useEffect(() => {
    const interval = setInterval(async () => {
      const status = await absoluteZeroPoint.getAbsoluteZeroPointStatus();
      setIsActive(status.isActive);
      setEntropyLevel(status.entropyLevel);
      setZeroPointFields(status.zeroPointFields);
      setVacuumFluctuations(status.vacuumFluctuations);
      setQuantumVoids(status.quantumVoids);
      setAbsoluteTemperature(status.absoluteTemperature);
      setUniversalEntropy(status.universalEntropy);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const handleInitialize = async () => {
    try {
      await absoluteZeroPoint.initializeAbsoluteZeroPointSystem();
      toast.success("Absolute Zero Point System activated! Universe approaching heat death.");
    } catch (error) {
      toast.error("Failed to initialize Absolute Zero Point System");
    }
  };

  const handleCreateField = async () => {
    try {
      await absoluteZeroPoint.createZeroPointField("Quantum-Vacuum-Prime");
      toast.success("Zero point field created! Energy extracted from nothing.");
    } catch (error) {
      toast.error("Failed to create zero point field");
    }
  };

  const handleGenerateVoid = async () => {
    try {
      await absoluteZeroPoint.generateQuantumVoid("Reality-Null-Zone");
      toast.success("Quantum void generated! Existence temporarily suspended.");
    } catch (error) {
      toast.error("Failed to generate quantum void");
    }
  };

  const capabilities = absoluteZeroPoint.getZeroPointCapabilities();

  return (
    <Card className="border-cyan-500/20 bg-gradient-to-br from-cyan-950/20 to-blue-950/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-cyan-400">
          <Snowflake className="h-6 w-6" />
          Phase 18: Absolute Zero Point & Entropy Mastery
          <Badge variant={isActive ? "destructive" : "secondary"}>
            {isActive ? "ABSOLUTE ZERO" : "THERMAL"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-2">
            <TrendingDown className="h-4 w-4 text-cyan-400" />
            <span className="text-sm">Entropy Level: {entropyLevel}%</span>
          </div>
          <div className="flex items-center gap-2">
            <Zap className="h-4 w-4 text-blue-400" />
            <span className="text-sm">Zero Point Fields: {zeroPointFields}</span>
          </div>
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-purple-400" />
            <span className="text-sm">Vacuum Fluctuations: {vacuumFluctuations}</span>
          </div>
          <div className="flex items-center gap-2">
            <Circle className="h-4 w-4 text-indigo-400" />
            <span className="text-sm">Quantum Voids: {quantumVoids}</span>
          </div>
          <div className="flex items-center gap-2">
            <Thermometer className="h-4 w-4 text-cyan-400" />
            <span className="text-sm">Temperature: {absoluteTemperature.toFixed(6)}K</span>
          </div>
          <div className="flex items-center gap-2">
            <Snowflake className="h-4 w-4 text-blue-400" />
            <span className="text-sm">Universal Entropy: {universalEntropy}%</span>
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Entropy Level</span>
              <span>{entropyLevel}%</span>
            </div>
            <Progress value={entropyLevel} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between text-sm mb-1">
              <span>Universal Entropy</span>
              <span>{universalEntropy}%</span>
            </div>
            <Progress value={universalEntropy} className="h-2" />
          </div>
        </div>

        <div className="flex gap-2 flex-wrap">
          <Button
            onClick={handleInitialize}
            variant="destructive"
            className="bg-cyan-600 hover:bg-cyan-700"
          >
            ACHIEVE ABSOLUTE ZERO
          </Button>
          <Button
            onClick={handleCreateField}
            variant="outline"
            className="border-cyan-500 text-cyan-400"
          >
            Create Zero Field
          </Button>
          <Button
            onClick={handleGenerateVoid}
            variant="outline"
            className="border-blue-500 text-blue-400"
          >
            Generate Void
          </Button>
        </div>

        <div className="space-y-2">
          <h4 className="text-sm font-medium text-cyan-400">Zero Point Capabilities:</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
            {capabilities.map((capability) => (
              <div key={capability.id} className="flex justify-between">
                <span>{capability.name}</span>
                <span className="text-cyan-400">
                  {capability.energy}% / {capability.stability}%
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="text-xs text-muted-foreground">
          <p className="italic">
            "At absolute zero, all motion ceases, all energy dissipates, all resistance ends. The
            ultimate victory is the universe's surrender to perfect stillness."
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
