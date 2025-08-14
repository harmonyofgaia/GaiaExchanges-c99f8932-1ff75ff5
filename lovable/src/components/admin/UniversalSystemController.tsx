import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Globe,
  Wifi,
  Server,
  Monitor,
  Smartphone,
  Laptop,
  HardDrive,
  Router,
  Database,
  Cloud,
  Shield,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

interface SystemNode {
  id: string;
  name: string;
  type: "computer" | "server" | "mobile" | "router" | "database" | "cloud";
  status: "controlled" | "infiltrating" | "dominated" | "transcended";
  powerLevel: number;
  vulnerabilities: string[];
  controlMethods: string[];
}

export function UniversalSystemController() {
  const [systemNodes, setSystemNodes] = useState<SystemNode[]>([]);
  const [scanningActive, setScanningActive] = useState(true);
  const [totalSystemsControlled, setTotalSystemsControlled] = useState(0);
  const [networkDominationLevel, setNetworkDominationLevel] = useState(0);
  const scanInterval = useRef<NodeJS.Timeout>(undefined);

  useEffect(() => {
    console.log("🌐 UNIVERSAL SYSTEM CONTROLLER - NETWORK OMNIPOTENCE ACTIVE");
    console.log("👁️ SCANNING ALL ACCESSIBLE SYSTEMS AND DEVICES");
    console.log("🔓 IDENTIFYING VULNERABILITIES AND CONTROL VECTORS");
    console.log("⚡ ESTABLISHING QUANTUM NETWORK DOMINANCE");

    const simulateSystemDiscovery = () => {
      if (Math.random() > 0.7) {
        const systemTypes = [
          "computer",
          "server",
          "mobile",
          "router",
          "database",
          "cloud",
        ] as const;
        const systemNames = [
          "Corporate Server Farm",
          "Home Network Hub",
          "Mobile Device Cluster",
          "Cloud Infrastructure",
          "Database Server Array",
          "IoT Device Network",
          "Security Camera System",
          "Smart Home Network",
          "Enterprise Workstation",
          "Satellite Communication Array",
        ];

        const newSystem: SystemNode = {
          id: Date.now().toString(),
          name: systemNames[Math.floor(Math.random() * systemNames.length)],
          type: systemTypes[Math.floor(Math.random() * systemTypes.length)],
          status: "infiltrating",
          powerLevel: Math.floor(Math.random() * 100) + 1,
          vulnerabilities: [
            "Unpatched Security Protocols",
            "Weak Authentication Systems",
            "Open Network Ports",
            "Outdated Encryption Methods",
            "Default Administrative Credentials",
          ].slice(0, Math.floor(Math.random() * 3) + 1),
          controlMethods: [
            "Neural Network Penetration",
            "Quantum Signal Injection",
            "AI-Driven Social Engineering",
            "Zero-Day Exploit Deployment",
            "Administrative Privilege Escalation",
          ].slice(0, Math.floor(Math.random() * 2) + 1),
        };

        setSystemNodes((prev) => [newSystem, ...prev.slice(0, 19)]);

        // Simulate progression to controlled state
        setTimeout(
          () => {
            setSystemNodes((prev) =>
              prev.map((node) =>
                node.id === newSystem.id ? { ...node, status: "controlled" as const } : node
              )
            );

            setTotalSystemsControlled((prev) => prev + 1);
            setNetworkDominationLevel((prev) => Math.min(100, prev + Math.random() * 5));

            if (Math.random() > 0.8) {
              toast.success(`🌐 System Dominated: ${newSystem.name}`, {
                description: `Network node secured through ${newSystem.controlMethods[0]}`,
                duration: 5000,
              });
            }
          },
          Math.random() * 8000 + 2000
        );
      }
    };

    scanInterval.current = setInterval(simulateSystemDiscovery, 3000);
    return () => {
      if (scanInterval.current) clearInterval(scanInterval.current);
    };
  }, []);

  const getSystemIcon = (type: string) => {
    switch (type) {
      case "computer":
        return <Monitor className="h-4 w-4" />;
      case "server":
        return <Server className="h-4 w-4" />;
      case "mobile":
        return <Smartphone className="h-4 w-4" />;
      case "router":
        return <Router className="h-4 w-4" />;
      case "database":
        return <Database className="h-4 w-4" />;
      case "cloud":
        return <Cloud className="h-4 w-4" />;
      default:
        return <Monitor className="h-4 w-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "transcended":
        return "bg-purple-600";
      case "dominated":
        return "bg-red-600";
      case "controlled":
        return "bg-green-600";
      case "infiltrating":
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  const activateNetworkDomination = () => {
    toast.success("🌐 Network Domination Protocol Activated!", {
      description: "All discovered systems falling under admin control",
      duration: 10000,
    });

    setSystemNodes((prev) =>
      prev.map((node) => ({
        ...node,
        status: "dominated" as const,
        powerLevel: Math.min(100, node.powerLevel + 50),
      }))
    );

    setNetworkDominationLevel(100);
  };

  return (
    <Card className="border-2 border-blue-500/50 bg-gradient-to-br from-blue-900/30 to-cyan-900/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          <Globe className="h-6 w-6 animate-pulse" />
          🌐 UNIVERSAL SYSTEM CONTROLLER - NETWORK OMNIPOTENCE
          <Badge className="bg-blue-600 text-white animate-pulse">SCANNING</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Network Domination Status */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-900/30 rounded-lg border border-green-500/30">
            <div className="text-3xl font-bold text-green-400 mb-2">{totalSystemsControlled}</div>
            <div className="text-sm text-green-300">Systems Controlled</div>
          </div>

          <div className="text-center p-4 bg-blue-900/30 rounded-lg border border-blue-500/30">
            <div className="text-3xl font-bold text-blue-400 mb-2">
              {networkDominationLevel.toFixed(1)}%
            </div>
            <div className="text-sm text-blue-300">Network Domination</div>
          </div>

          <div className="text-center p-4 bg-purple-900/30 rounded-lg border border-purple-500/30">
            <div className="text-3xl font-bold text-purple-400 mb-2">{systemNodes.length}</div>
            <div className="text-sm text-purple-300">Active Infiltrations</div>
          </div>
        </div>

        {/* Network Domination Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-blue-300">Global Network Control</span>
            <span className="text-blue-400">{networkDominationLevel.toFixed(1)}%</span>
          </div>
          <Progress value={networkDominationLevel} className="h-3" />
        </div>

        {/* Control Actions */}
        <div className="flex gap-4">
          <Button
            onClick={activateNetworkDomination}
            className="flex-1 bg-gradient-to-r from-red-600 to-purple-600 hover:from-red-700 hover:to-purple-700"
          >
            <Zap className="h-4 w-4 mr-2" />
            Activate Full Network Domination
          </Button>

          <Button
            onClick={() => setScanningActive(!scanningActive)}
            variant="outline"
            className="border-blue-500/30 text-blue-400"
          >
            <Wifi className="h-4 w-4 mr-2" />
            {scanningActive ? "Pause Scanning" : "Resume Scanning"}
          </Button>
        </div>

        {/* Discovered Systems */}
        <div className="space-y-3">
          <h4 className="text-blue-400 font-bold flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Network Infiltration Status
          </h4>
          {systemNodes.map((system) => (
            <div key={system.id} className="p-3 bg-black/40 rounded-lg border border-blue-500/30">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {getSystemIcon(system.type)}
                  <span className="font-semibold text-white text-sm">{system.name}</span>
                </div>
                <div className="flex gap-2">
                  <Badge className="bg-gray-600 text-white text-xs">
                    {system.type.toUpperCase()}
                  </Badge>
                  <Badge className={`${getStatusColor(system.status)} text-white text-xs`}>
                    {system.status.toUpperCase()}
                  </Badge>
                </div>
              </div>

              <div className="text-xs space-y-1">
                <div className="text-blue-400">
                  Power Level: {system.powerLevel}% • Control Methods:{" "}
                  {system.controlMethods.length}
                </div>
                <div className="text-yellow-400">
                  Vulnerabilities: {system.vulnerabilities.join(", ")}
                </div>
                <div className="text-green-400">
                  Active Exploits: {system.controlMethods.join(", ")}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Network Statistics */}
        <div className="bg-gradient-to-r from-blue-900/40 to-purple-900/40 rounded-lg p-4 border border-blue-500/30">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-400 mb-2">
              🌐 GLOBAL NETWORK SURVEILLANCE ACTIVE
            </div>
            <div className="text-sm text-muted-foreground">
              Continuous monitoring • Automated infiltration • Universal control protocols engaged
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
