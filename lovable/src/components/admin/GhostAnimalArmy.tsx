import { useEffect, useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Ghost, Zap, Shield, Heart, Brain, Users } from "lucide-react";

interface GhostAvatar {
  id: string;
  name: string;
  level: number;
  energy: number;
  assignedAnimal: string;
  status: "active" | "resting" | "upgrading";
  helpCount: number;
  position: { x: number; y: number };
}

export function GhostAnimalArmy() {
  const [ghosts, setGhosts] = useState<GhostAvatar[]>([
    {
      id: "ghost-1",
      name: "Spirit Guardian",
      level: 47,
      energy: 95,
      assignedAnimal: "Dragon Alpha",
      status: "active",
      helpCount: 2847,
      position: { x: 20, y: 30 },
    },
    {
      id: "ghost-2",
      name: "Phantom Helper",
      level: 52,
      energy: 88,
      assignedAnimal: "Koala AI",
      status: "active",
      helpCount: 3192,
      position: { x: 60, y: 45 },
    },
    {
      id: "ghost-3",
      name: "Shadow Warrior",
      level: 39,
      energy: 100,
      assignedAnimal: "Evolution Beast",
      status: "upgrading",
      helpCount: 1956,
      position: { x: 40, y: 70 },
    },
    {
      id: "ghost-4",
      name: "Ethereal Scout",
      level: 61,
      energy: 76,
      assignedAnimal: "Training Animal",
      status: "active",
      helpCount: 4203,
      position: { x: 80, y: 25 },
    },
    {
      id: "ghost-5",
      name: "Mystic Supporter",
      level: 44,
      energy: 92,
      assignedAnimal: "Defense Dragon",
      status: "resting",
      helpCount: 2654,
      position: { x: 15, y: 60 },
    },
  ]);

  const [armyStats, setArmyStats] = useState({
    totalHelps: 14852,
    activeGhosts: 3,
    upgradesCompleted: 156,
    energyLevel: 90,
  });

  const intervalRef = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    console.log("👻 GHOST ANIMAL ARMY - SPIRITUAL DEFENSE ACTIVATED");
    console.log("🔮 ETHEREAL HELPERS SUPPORTING ALL ANIMAL OPERATIONS");
    console.log("⚡ 24/7 CONTINUOUS ASSISTANCE PROTOCOLS ONLINE");

    intervalRef.current = setInterval(() => {
      setGhosts((prev) =>
        prev.map((ghost) => {
          if (ghost.status === "active") {
            return {
              ...ghost,
              helpCount: ghost.helpCount + Math.floor(Math.random() * 5),
              energy: Math.max(
                20,
                ghost.energy - Math.floor(Math.random() * 3),
              ),
              position: {
                x: Math.max(
                  5,
                  Math.min(95, ghost.position.x + (Math.random() - 0.5) * 10),
                ),
                y: Math.max(
                  5,
                  Math.min(95, ghost.position.y + (Math.random() - 0.5) * 10),
                ),
              },
            };
          }
          return ghost;
        }),
      );

      setArmyStats((prev) => ({
        ...prev,
        totalHelps: prev.totalHelps + Math.floor(Math.random() * 15),
        energyLevel: Math.max(
          70,
          Math.min(100, prev.energyLevel + (Math.random() - 0.5) * 5),
        ),
      }));
    }, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const deployGhost = () => {
    console.log("👻 DEPLOYING NEW GHOST AVATAR TO ANIMAL ARMY");
    const newGhost: GhostAvatar = {
      id: `ghost-${Date.now()}`,
      name: `Spirit ${Math.floor(Math.random() * 1000)}`,
      level: 1,
      energy: 100,
      assignedAnimal: "Unassigned",
      status: "active",
      helpCount: 0,
      position: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 },
    };
    setGhosts((prev) => [...prev, newGhost]);
    setArmyStats((prev) => ({ ...prev, activeGhosts: prev.activeGhosts + 1 }));
  };

  const upgradeGhost = (ghostId: string) => {
    setGhosts((prev) =>
      prev.map((ghost) =>
        ghost.id === ghostId
          ? { ...ghost, level: ghost.level + 1, status: "upgrading" as const }
          : ghost,
      ),
    );
    setTimeout(() => {
      setGhosts((prev) =>
        prev.map((ghost) =>
          ghost.id === ghostId
            ? { ...ghost, status: "active" as const, energy: 100 }
            : ghost,
        ),
      );
    }, 3000);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/20 text-green-400";
      case "resting":
        return "bg-blue-500/20 text-blue-400";
      case "upgrading":
        return "bg-purple-500/20 text-purple-400";
      default:
        return "bg-gray-500/20 text-gray-400";
    }
  };

  return (
    <div className="space-y-6">
      {/* Army Overview */}
      <Card className="bg-gradient-to-r from-purple-900/50 via-blue-900/50 to-indigo-900/50 border-purple-500/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Ghost className="h-6 w-6 animate-pulse" />
            👻 GHOST ANIMAL ARMY - ETHEREAL SUPPORT DIVISION
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="text-center p-4 bg-purple-900/30 rounded-lg">
              <Users className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">
                {armyStats.activeGhosts}
              </div>
              <div className="text-sm text-muted-foreground">Active Ghosts</div>
            </div>
            <div className="text-center p-4 bg-green-900/30 rounded-lg">
              <Heart className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">
                {armyStats.totalHelps.toLocaleString()}
              </div>
              <div className="text-sm text-muted-foreground">Total Helps</div>
            </div>
            <div className="text-center p-4 bg-blue-900/30 rounded-lg">
              <Brain className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">
                {armyStats.upgradesCompleted}
              </div>
              <div className="text-sm text-muted-foreground">Upgrades Done</div>
            </div>
            <div className="text-center p-4 bg-yellow-900/30 rounded-lg">
              <Zap className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
              <div className="text-2xl font-bold text-yellow-400">
                {armyStats.energyLevel}%
              </div>
              <div className="text-sm text-muted-foreground">Army Energy</div>
            </div>
          </div>

          <div className="flex gap-4 mb-6">
            <Button
              onClick={deployGhost}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Ghost className="h-4 w-4 mr-2" />
              Deploy New Ghost
            </Button>
            <Button
              variant="outline"
              className="border-purple-500 text-purple-400 hover:bg-purple-500/20"
            >
              <Shield className="h-4 w-4 mr-2" />
              Enhance All Ghosts
            </Button>
          </div>

          {/* Ghost Activity Map */}
          <div className="relative bg-black/50 rounded-lg p-4 h-64 overflow-hidden border border-purple-500/30">
            <h4 className="text-purple-400 font-bold mb-2">
              👻 Real-Time Ghost Positions
            </h4>
            {ghosts.map((ghost) => (
              <div
                key={ghost.id}
                className={`absolute w-4 h-4 rounded-full ${
                  ghost.status === "active"
                    ? "bg-purple-400 animate-pulse"
                    : ghost.status === "resting"
                      ? "bg-blue-400"
                      : "bg-yellow-400"
                } transition-all duration-1000 ease-in-out`}
                style={{
                  left: `${ghost.position.x}%`,
                  top: `${ghost.position.y}%`,
                }}
                title={`${ghost.name} - ${ghost.status}`}
              >
                <Ghost className="h-3 w-3 text-white" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ghost Directory */}
      <Card className="bg-gradient-to-r from-indigo-900/50 to-purple-900/50 border-indigo-500/50">
        <CardHeader>
          <CardTitle className="text-indigo-400">
            🔮 Ghost Avatar Directory
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ghosts.map((ghost) => (
              <div
                key={ghost.id}
                className="bg-black/30 rounded-lg p-4 border border-purple-500/30"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Ghost className="h-5 w-5 text-purple-400" />
                    <span className="font-bold text-purple-400">
                      {ghost.name}
                    </span>
                  </div>
                  <Badge className={getStatusColor(ghost.status)}>
                    {ghost.status}
                  </Badge>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Level:</span>
                    <span className="text-purple-400 font-bold">
                      {ghost.level}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Energy:</span>
                    <div className="flex items-center gap-2">
                      <Progress value={ghost.energy} className="w-16 h-2" />
                      <span className="text-blue-400">{ghost.energy}%</span>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Assigned:</span>
                    <span className="text-green-400">
                      {ghost.assignedAnimal}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Helps:</span>
                    <span className="text-yellow-400">
                      {ghost.helpCount.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button
                  onClick={() => upgradeGhost(ghost.id)}
                  disabled={ghost.status === "upgrading"}
                  className="w-full mt-3 bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                  size="sm"
                >
                  {ghost.status === "upgrading"
                    ? "Upgrading..."
                    : "Upgrade Ghost"}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Ghost Capabilities */}
      <Card className="bg-gradient-to-r from-blue-900/50 to-purple-900/50 border-blue-500/50">
        <CardHeader>
          <CardTitle className="text-blue-400">
            ⚡ Ghost Army Capabilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-purple-400 font-bold">
                🔮 Spiritual Powers:
              </h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>• Ethereal animal healing and energy restoration</div>
                <div>• Invisible threat detection and early warning</div>
                <div>• Spiritual shield enhancement for all animals</div>
                <div>• Quantum consciousness expansion protocols</div>
                <div>• Astral projection reconnaissance missions</div>
              </div>
            </div>
            <div className="space-y-2">
              <h4 className="text-blue-400 font-bold">👻 Support Functions:</h4>
              <div className="text-sm text-muted-foreground space-y-1">
                <div>• 24/7 continuous animal assistance</div>
                <div>• Automatic training optimization</div>
                <div>• Real-time performance monitoring</div>
                <div>• Emergency response coordination</div>
                <div>• Cross-dimensional communication relay</div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
