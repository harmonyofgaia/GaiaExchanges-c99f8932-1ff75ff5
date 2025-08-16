import { useState, useEffect, useCallback } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Shield,
  Zap,
  Eye,
  Target,
  AlertTriangle,
  CheckCircle,
  Activity,
  Clock,
  TrendingUp,
  Users,
  Timer,
  Crosshair,
  Ghost,
} from "lucide-react";
import { toast } from "sonner";

interface ThreatData {
  id: string;
  timestamp: number;
  severity: number; // 1-10 scale
  type: string;
  location: string;
  description: string;
  systemsAffected: string[];
  attackVectors: string[];
  confidence: number;
  status: "detected" | "analyzing" | "deploying" | "neutralizing" | "resolved";
}

interface GhostAnimal {
  id: string;
  name: string;
  type: string;
  level: number;
  power: number;
  specialAbility: string;
  status: "available" | "deployed" | "engaging" | "recovering";
  effectiveness: number;
  deploymentCount: number;
  successRate: number;
  emoji: string;
}

interface DeploymentLog {
  id: string;
  timestamp: number;
  threatId: string;
  animalsDeployed: string[];
  deploymentTime: number; // milliseconds
  status: "successful" | "ongoing" | "failed";
  threatsNeutralized: number;
  systemsProtected: string[];
}

export function GhostAnimalArmyOrchestrator() {
  const [isActive, setIsActive] = useState(true);
  const [threats, setThreats] = useState<ThreatData[]>([]);
  const [ghostAnimals, setGhostAnimals] = useState<GhostAnimal[]>([]);
  const [deploymentLogs, setDeploymentLogs] = useState<DeploymentLog[]>([]);
  const [activeDeployments, setActiveDeployments] = useState(0);
  const [threatsNeutralized, setThreatsNeutralized] = useState(15847);
  const [averageResponseTime, setAverageResponseTime] = useState(0.3);
  const [systemIntegrity, setSystemIntegrity] = useState(99.8);

  // Initialize ghost animal repository
  useEffect(() => {
    const initialAnimals: GhostAnimal[] = [
      // Level 1 - Reconnaissance
      {
        id: "1",
        name: "Ghost Cyber Koala",
        type: "reconnaissance",
        level: 25,
        power: 5000,
        specialAbility: "Digital infiltration detection",
        status: "available",
        effectiveness: 85,
        deploymentCount: 234,
        successRate: 94,
        emoji: "👻🐨",
      },
      {
        id: "2",
        name: "Phantom Sky Eagle",
        type: "reconnaissance",
        level: 30,
        power: 6500,
        specialAbility: "Network perimeter surveillance",
        status: "available",
        effectiveness: 88,
        deploymentCount: 189,
        successRate: 96,
        emoji: "👻🦅",
      },
      {
        id: "3",
        name: "Spirit Wolf Scout",
        type: "reconnaissance",
        level: 28,
        power: 6000,
        specialAbility: "Behavior pattern analysis",
        status: "available",
        effectiveness: 82,
        deploymentCount: 156,
        successRate: 91,
        emoji: "👻🐺",
      },
      {
        id: "4",
        name: "Ghost AI Dolphin",
        type: "reconnaissance",
        level: 32,
        power: 7000,
        specialAbility: "Deep system scanning",
        status: "available",
        effectiveness: 90,
        deploymentCount: 278,
        successRate: 97,
        emoji: "👻🐬",
      },

      // Level 2 - Defense
      {
        id: "5",
        name: "Ghost Lion Guardian",
        type: "defense",
        level: 45,
        power: 15000,
        specialAbility: "Access control enforcement",
        status: "available",
        effectiveness: 92,
        deploymentCount: 345,
        successRate: 95,
        emoji: "👻🦁",
      },
      {
        id: "6",
        name: "Phantom Monkey Squad",
        type: "defense",
        level: 40,
        power: 12000,
        specialAbility: "Multi-vector defense",
        status: "available",
        effectiveness: 89,
        deploymentCount: 267,
        successRate: 93,
        emoji: "👻🐒",
      },
      {
        id: "7",
        name: "Spirit Serpent",
        type: "defense",
        level: 42,
        power: 13500,
        specialAbility: "Data flow protection",
        status: "available",
        effectiveness: 87,
        deploymentCount: 198,
        successRate: 92,
        emoji: "👻🐍",
      },
      {
        id: "8",
        name: "Ghost Gecko",
        type: "defense",
        level: 38,
        power: 11000,
        specialAbility: "System restoration",
        status: "available",
        effectiveness: 85,
        deploymentCount: 223,
        successRate: 89,
        emoji: "👻🦎",
      },

      // Level 3 - Elite
      {
        id: "9",
        name: "Ghost Dragon Prime",
        type: "elite",
        level: 75,
        power: 45000,
        specialAbility: "Maximum threat elimination",
        status: "available",
        effectiveness: 98,
        deploymentCount: 89,
        successRate: 99,
        emoji: "👻🐉",
      },
      {
        id: "10",
        name: "Phantom Phoenix",
        type: "elite",
        level: 70,
        power: 40000,
        specialAbility: "System resurrection capabilities",
        status: "available",
        effectiveness: 96,
        deploymentCount: 67,
        successRate: 98,
        emoji: "👻🔥",
      },
      {
        id: "11",
        name: "Spirit Thunder Cat",
        type: "elite",
        level: 68,
        power: 38000,
        specialAbility: "Lightning-fast response",
        status: "available",
        effectiveness: 94,
        deploymentCount: 78,
        successRate: 97,
        emoji: "👻⚡",
      },
      {
        id: "12",
        name: "Ghost Storm Bear",
        type: "elite",
        level: 72,
        power: 42000,
        specialAbility: "Overwhelming defense force",
        status: "available",
        effectiveness: 95,
        deploymentCount: 56,
        successRate: 98,
        emoji: "👻🌪️",
      },

      // Level 4 - Ultimate
      {
        id: "13",
        name: "Quantum Ghost Dragon",
        type: "ultimate",
        level: 100,
        power: 999999,
        specialAbility: "Infinite power deployment",
        status: "available",
        effectiveness: 100,
        deploymentCount: 12,
        successRate: 100,
        emoji: "👻💎",
      },
      {
        id: "14",
        name: "Celestial Spirit Phoenix",
        type: "ultimate",
        level: 95,
        power: 500000,
        specialAbility: "Immortal system protection",
        status: "available",
        effectiveness: 99,
        deploymentCount: 8,
        successRate: 100,
        emoji: "👻🌟",
      },
      {
        id: "15",
        name: "Ghost Warrior Legion",
        type: "ultimate",
        level: 90,
        power: 300000,
        specialAbility: "Coordinated army assault",
        status: "available",
        effectiveness: 98,
        deploymentCount: 15,
        successRate: 100,
        emoji: "👻⚔️",
      },
      {
        id: "16",
        name: "Ultimate Defense Specter",
        type: "ultimate",
        level: 98,
        power: 750000,
        specialAbility: "Absolute system shielding",
        status: "available",
        effectiveness: 100,
        deploymentCount: 5,
        successRate: 100,
        emoji: "👻🛡️",
      },
    ];
    setGhostAnimals(initialAnimals);
  }, []);

  const selectGhostAnimals = useCallback(
    (threat: ThreatData, currentAnimals: GhostAnimal[]): GhostAnimal[] => {
      const availableAnimals = currentAnimals.filter((animal) => animal.status === "available");
      const selectedAnimals: GhostAnimal[] = [];

      // Select primary defender based on threat level
      if (threat.severity >= 9) {
        const ultimate = availableAnimals.filter((a) => a.type === "ultimate")[0];
        if (ultimate) selectedAnimals.push(ultimate);
      } else if (threat.severity >= 7) {
        const elite = availableAnimals.filter((a) => a.type === "elite")[0];
        if (elite) selectedAnimals.push(elite);
      } else if (threat.severity >= 4) {
        const defense = availableAnimals.filter((a) => a.type === "defense")[0];
        if (defense) selectedAnimals.push(defense);
      } else {
        const recon = availableAnimals.filter((a) => a.type === "reconnaissance")[0];
        if (recon) selectedAnimals.push(recon);
      }

      // Add support animals for high-severity threats
      if (threat.severity >= 6 && selectedAnimals.length < 3) {
        const supportAnimals = availableAnimals
          .filter((a) => !selectedAnimals.includes(a))
          .slice(0, 2);
        selectedAnimals.push(...supportAnimals);
      }

      return selectedAnimals;
    },
    []
  );

  const deployGhostAnimals = useCallback(
    (threat: ThreatData) => {
      setGhostAnimals((currentAnimals) => {
        const selectedAnimals = selectGhostAnimals(threat, currentAnimals);

        if (selectedAnimals.length === 0) {
          toast.error("No ghost animals available for deployment!");
          return currentAnimals;
        }

        const deploymentTime = Math.random() * 500 + 100; // 100-600ms

        // Update animal status to deployed
        const updatedAnimals = currentAnimals.map((animal) =>
          selectedAnimals.some((selected) => selected.id === animal.id)
            ? {
                ...animal,
                status: "deployed" as const,
                deploymentCount: animal.deploymentCount + 1,
              }
            : animal
        );

        // Update threat status
        setThreats((prev) =>
          prev.map((t) => (t.id === threat.id ? { ...t, status: "deploying" as const } : t))
        );

        // Log deployment
        const deploymentLog: DeploymentLog = {
          id: `deploy-${Date.now()}`,
          timestamp: Date.now(),
          threatId: threat.id,
          animalsDeployed: selectedAnimals.map((a) => a.name)
          deploymentTime,
          status: "ongoing",
          threatsNeutralized: 0,
          systemsProtected: threat.systemsAffected,
        };

        setDeploymentLogs((prev) => [deploymentLog, ...prev.slice(0, 19)]);
        setActiveDeployments((prev) => prev + 1);

        toast.success(
          `Deployed ${selectedAnimals.length} ghost animals in ${deploymentTime.toFixed(0)}ms`
        );

        // Simulate threat neutralization
        setTimeout(() => {
          const success = Math.random() > 0.05; // 95% success rate

          setThreats((prev) =>
            prev.map((t) =>
              t.id === threat.id ? { ...t, status: success ? "resolved" : "analyzing" } : t
            )
          );

          setGhostAnimals((prev) =>
            prev.map((animal) =>
              selectedAnimals.some((selected) => selected.id === animal.id)
                ? {
                    ...animal,
                    status: "available" as const,
                    successRate: success ? animal.successRate + 0.1 : animal.successRate - 0.5,
                  }
                : animal
            )
          );

          setDeploymentLogs((prev) =>
            prev.map((log) =>
              log.id === deploymentLog.id
                ? {
                    ...log,
                    status: success ? "successful" : "failed",
                    threatsNeutralized: success ? 1 : 0,
                  }
                : log
            )
          );

          setActiveDeployments((prev) => prev - 1);
          if (success) {
            setThreatsNeutralized((prev) => prev + 1);
          }

          toast[success ? "success" : "error"](
            success
              ? "Threat successfully neutralized!"
              : "Threat neutralization failed - escalating response"
          );
        }, deploymentTime + 2000);

        return updatedAnimals;
      });
    },
    [selectGhostAnimals]
  );

  // Real-time threat monitoring simulation
  useEffect(() => {
    if (!isActive) return;

    const monitorThreats = setInterval(() => {
      // Simulate threat detection (5% chance per interval)
      if (Math.random() < 0.05) {
        const newThreat: ThreatData = {
          id: `threat-${Date.now()}`,
          timestamp: Date.now(),
          severity: Math.floor(Math.random() * 10) + 1,
          type: [
            "SQL Injection",
            "DDoS Attack",
            "Malware Injection",
            "Data Corruption",
            "System Intrusion",
          ][Math.floor(Math.random() * 5)],
          location: [
            "Database Server",
            "API Gateway",
            "File System",
            "Network Layer",
            "User Interface",
          ][Math.floor(Math.random() * 5)],
          description: "Automated threat detection triggered",
          systemsAffected: [
            ["Authentication", "Data Storage", "Network Security"][Math.floor(Math.random() * 3)],
          ],
          attackVectors: [["Network", "Application", "Database"][Math.floor(Math.random() * 3)]],
          confidence: 85 + Math.random() * 15,
          status: "detected",
        };

        setThreats((prev) => [newThreat, ...prev.slice(0, 9)]);

        // Automatically deploy ghost animals
        if (newThreat.severity >= 3) {
          deployGhostAnimals(newThreat);
        }
      }

      // Update system metrics
      setSystemIntegrity((prev) => Math.max(95, prev + (Math.random() - 0.5) * 0.5));
      setAverageResponseTime((prev) => Math.max(0.1, prev + (Math.random() - 0.5) * 0.1));
    }, 3000);

    return () => clearInterval(monitorThreats);
  }, [isActive, deployGhostAnimals]);

  const manualDeploy = (animalId: string) => {
    const animal = ghostAnimals.find((a) => a.id === animalId);
    if (!animal || animal.status !== "available") {
      toast.error("Ghost animal not available for deployment");
      return;
    }

    const mockThreat: ThreatData = {
      id: `manual-${Date.now()}`,
      timestamp: Date.now(),
      severity: 5,
      type: "Manual Deployment",
      location: "System-wide",
      description: "Manual deployment initiated by admin",
      systemsAffected: ["All Systems"],
      attackVectors: ["Unknown"],
      confidence: 100,
      status: "detected",
    };

    deployGhostAnimals(mockThreat);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "available":
        return "bg-green-500";
      case "deployed":
        return "bg-blue-500";
      case "engaging":
        return "bg-orange-500";
      case "recovering":
        return "bg-yellow-500";
      default:
        return "bg-gray-500";
    }
  };

  const getThreatSeverityColor = (severity: number) => {
    if (severity >= 9) return "bg-red-600";
    if (severity >= 7) return "bg-red-500";
    if (severity >= 5) return "bg-orange-500";
    if (severity >= 3) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Ghost className="h-8 w-8 text-purple-500" />
          <div>
            <h2 className="text-2xl font-bold">GAIA Ghost Animal Army</h2>
            <p className="text-muted-foreground">Autonomous Infrastructure Protection System</p>
          </div>
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <label htmlFor="ghost-army-active" className="text-sm font-medium">
              Active Monitoring
            </label>
            <Switch id="ghost-army-active" checked={isActive} onCheckedChange={setIsActive} />
          </div>
          <Badge variant={isActive ? "default" : "secondary"}>
            {isActive ? "ACTIVE" : "STANDBY"}
          </Badge>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Deployments</p>
                <p className="text-2xl font-bold">{activeDeployments}</p>
              </div>
              <Activity className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Threats Neutralized</p>
                <p className="text-2xl font-bold">{threatsNeutralized.toLocaleString()}</p>
              </div>
              <Target className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Avg Response Time</p>
                <p className="text-2xl font-bold">{averageResponseTime.toFixed(2)}s</p>
              </div>
              <Timer className="h-8 w-8 text-orange-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">System Integrity</p>
                <p className="text-2xl font-bold">{systemIntegrity.toFixed(1)}%</p>
              </div>
              <Shield className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Real-Time Threats */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertTriangle className="h-5 w-5" />
            <span>Real-Time Threat Detection</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {threats.length === 0 ? (
              <Alert>
                <CheckCircle className="h-4 w-4" />
                <AlertDescription>No active threats detected. System is secure.</AlertDescription>
              </Alert>
            ) : (
              threats.map((threat) => (
                <div
                  key={threat.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-3 h-3 rounded-full ${getThreatSeverityColor(threat.severity)}`}
                    />
                    <div>
                      <p className="font-medium">{threat.type}</p>
                      <p className="text-sm text-muted-foreground">
                        {threat.location} • Severity: {threat.severity}/10
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={threat.status === "resolved" ? "default" : "secondary"}>
                      {threat.status.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(threat.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Ghost Animal Repository */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Users className="h-5 w-5" />
            <span>Wall of Defense - Ghost Animal Repository</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ghostAnimals.map((animal) => (
              <div key={animal.id} className="border rounded-lg p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl">{animal.emoji}</span>
                    <div>
                      <h4 className="font-medium text-sm">{animal.name}</h4>
                      <p className="text-xs text-muted-foreground">Level {animal.level}</p>
                    </div>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${getStatusColor(animal.status)}`} />
                </div>

                <div className="space-y-2">
                  <div>
                    <div className="flex justify-between text-xs">
                      <span>Power</span>
                      <span>{animal.power.toLocaleString()}</span>
                    </div>
                    <Progress value={(animal.power / 10000) * 100} className="h-1" />
                  </div>

                  <div>
                    <div className="flex justify-between text-xs">
                      <span>Effectiveness</span>
                      <span>{animal.effectiveness}%</span>
                    </div>
                    <Progress value={animal.effectiveness} className="h-1" />
                  </div>

                  <div className="text-xs text-muted-foreground">
                    <p>Deployments: {animal.deploymentCount}</p>
                    <p>Success Rate: {animal.successRate.toFixed(1)}%</p>
                  </div>
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  className="w-full"
                  onClick={() => manualDeploy(animal.id)}
                  disabled={animal.status !== "available"}
                >
                  {animal.status === "available" ? "Deploy" : animal.status.toUpperCase()}
                </Button>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Deployment Logs */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Clock className="h-5 w-5" />
            <span>Escalation & Deployment Logs</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {deploymentLogs.length === 0 ? (
              <p className="text-muted-foreground text-center py-4">No deployments recorded yet</p>
            ) : (
              deploymentLogs.map((log) => (
                <div
                  key={log.id}
                  className="flex items-center justify-between p-3 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      Deployed {log.animalsDeployed.length} ghost animals
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {log.animalsDeployed.join(", ")} • {log.deploymentTime}ms response
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        log.status === "successful"
                          ? "default"
                          : log.status === "failed"
                            ? "destructive"
                            : "secondary"
                      }
                    >
                      {log.status.toUpperCase()}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {new Date(log.timestamp).toLocaleTimeString()}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
