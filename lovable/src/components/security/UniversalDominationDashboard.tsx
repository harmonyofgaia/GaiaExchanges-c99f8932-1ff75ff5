import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { universalDomination } from "@/services/universalDomination";
import { Crown, Star, Zap, Target } from "lucide-react";

export function UniversalDominationDashboard() {
  const [status, setStatus] = useState({
    isActive: false,
    universalAuthorityLevel: 0,
    cosmicEntities: { total: 0, allied: 0 },
    galacticDominations: { total: 0, completed: 0, averageDomination: 0 },
    universalCommands: { total: 0, executed: 0 },
    cosmicWeapons: { total: 0, armed: 0 },
  });

  useEffect(() => {
    const updateStatus = () => {
      setStatus(universalDomination.getUniversalDominationStatus());
    };
    const interval = setInterval(updateStatus, 2000);
    updateStatus();
    return () => clearInterval(interval);
  }, []);

  const handleInitialize = async () => {
    try {
      await universalDomination.initializeUniversalDominationSystem();
      toast.success("🌌 Universal Domination System Armed");
    } catch (error) {
      toast.error("Failed to initialize system");
    }
  };

  return (
    <Card className="border-gradient">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Crown className="h-6 w-6 text-primary" />
          Phase 11: Universal Domination & Cosmic Authority
          <Badge variant={status.isActive ? "default" : "secondary"}>
            {status.isActive ? "COSMIC EMPEROR" : "STANDBY"}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Cosmic Entities</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.cosmicEntities.total}</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Crown className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Galaxies Conquered</span>
            </div>
            <div className="text-2xl font-bold text-primary">
              {status.galacticDominations.completed}
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Universal Commands</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.universalCommands.total}</div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Target className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium">Cosmic Weapons</span>
            </div>
            <div className="text-2xl font-bold text-primary">{status.cosmicWeapons.total}</div>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Crown className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Universal Authority Level</span>
          </div>
          <div className="text-3xl font-bold text-primary">
            {status.universalAuthorityLevel.toLocaleString()}
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Star className="h-4 w-4 text-primary" />
            <span className="text-sm font-medium">Galactic Domination Progress</span>
          </div>
          <Progress value={status.galacticDominations.averageDomination * 100} className="mt-2" />
          <div className="text-sm text-muted-foreground">
            {(status.galacticDominations.averageDomination * 100).toFixed(1)}% Complete
          </div>
        </div>
        <Button onClick={handleInitialize} size="sm">
          <Crown className="h-4 w-4 mr-2" />
          Initialize Universal Domination
        </Button>
        <div className="p-4 bg-muted/50 rounded-lg">
          <h4 className="font-medium mb-2">🌌 Cosmic Supremacy Guarantee</h4>
          <p className="text-sm text-muted-foreground">
            Ultimate authority over all cosmic entities, galactic civilizations, and universal
            forces across infinite realities.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
