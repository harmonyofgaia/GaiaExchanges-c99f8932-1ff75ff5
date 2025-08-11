import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Heart,
  Shield,
  Truck,
  MapPin,
  Clock,
  AlertTriangle,
  CheckCircle,
} from "lucide-react";

interface TransferProtocol {
  id: string;
  animalType: string;
  stressLevel: "minimal" | "low" | "moderate";
  transportTime: string;
  preparationSteps: string[];
  monitoringRequirements: string[];
  recoveryTime: string;
  successRate: number;
}

interface ActiveTransfer {
  id: string;
  animalType: string;
  quantity: number;
  origin: string;
  destination: string;
  status: "preparing" | "in-transit" | "delivered" | "recovering";
  departureTime: string;
  estimatedArrival: string;
  stressLevel: number;
  protocol: string;
}

export function AnimalTransferProtocols() {
  const [selectedProtocol, setSelectedProtocol] = useState<string>("sheep");

  const transferProtocols: TransferProtocol[] = [
    {
      id: "sheep",
      animalType: "🐑 Sheep",
      stressLevel: "minimal",
      transportTime: "2-4 hours max",
      preparationSteps: [
        "Familiar handler presence 24h before transfer",
        "Gradual feed reduction 12h prior",
        "Group transport with familiar animals",
        "Climate-controlled vehicles only",
        "Soft music during transport",
      ],
      monitoringRequirements: [
        "Heart rate monitoring every 15 minutes",
        "Temperature checks every 30 minutes",
        "Behavioral observation continuous",
        "Hydration status monitoring",
      ],
      recoveryTime: "24-48 hours",
      successRate: 98,
    },
    {
      id: "goats",
      animalType: "🐐 Goats",
      stressLevel: "low",
      transportTime: "3-5 hours max",
      preparationSteps: [
        "Social group maintenance during transport",
        "Enrichment toys for mental stimulation",
        "Pre-transport health screening",
        "Gradual loading with treats",
        "Familiar scents in transport vehicle",
      ],
      monitoringRequirements: [
        "Continuous video monitoring",
        "GPS tracking for smooth routes",
        "Veterinary escort for groups >50",
        "Stress hormone level checks",
      ],
      recoveryTime: "48-72 hours",
      successRate: 96,
    },
    {
      id: "cattle",
      animalType: "🐄 Cattle",
      stressLevel: "low",
      transportTime: "4-6 hours max",
      preparationSteps: [
        "Herd unity preservation",
        "Loading ramp acclimatization",
        "Pre-transport veterinary check",
        "Nutritional preparation 48h prior",
        "Stress-reducing pheromone application",
      ],
      monitoringRequirements: [
        "Individual ID tracking",
        "Weight monitoring pre/post transport",
        "Respiratory rate checks",
        "Emergency veterinary on standby",
      ],
      recoveryTime: "72-96 hours",
      successRate: 94,
    },
    {
      id: "pigs",
      animalType: "🐷 Pigs",
      stressLevel: "moderate",
      transportTime: "2-3 hours max",
      preparationSteps: [
        "Temperature regulation critical",
        "Social group stability maintenance",
        "Anti-stress medication if needed",
        "Gradual environment transition",
        "Familiar bedding materials",
      ],
      monitoringRequirements: [
        "Temperature control monitoring",
        "Ventilation system checks",
        "Individual stress level assessment",
        "Immediate veterinary response capability",
      ],
      recoveryTime: "96-120 hours",
      successRate: 91,
    },
    {
      id: "poultry",
      animalType: "🐔 Poultry",
      stressLevel: "minimal",
      transportTime: "1-2 hours max",
      preparationSteps: [
        "Flock integrity maintenance",
        "Climate-controlled containers",
        "Minimal handling procedures",
        "Dawn/dusk transport preferred",
        "Familiar handler voices",
      ],
      monitoringRequirements: [
        "Container temperature monitoring",
        "Air quality continuous checking",
        "Mortality prevention protocols",
        "Quick unloading procedures",
      ],
      recoveryTime: "12-24 hours",
      successRate: 99,
    },
  ];

  const activeTransfers: ActiveTransfer[] = [
    {
      id: "transfer001",
      animalType: "🐑 Sheep",
      quantity: 25,
      origin: "Northern Farm Facility",
      destination: "Industrial Recovery Site Alpha",
      status: "in-transit",
      departureTime: "2024-01-15 08:00",
      estimatedArrival: "2024-01-15 11:30",
      stressLevel: 15,
      protocol: "minimal-stress-sheep",
    },
    {
      id: "transfer002",
      animalType: "🐐 Goats",
      quantity: 18,
      origin: "Eastern Sanctuary",
      destination: "Mountain Recovery Zone Beta",
      status: "preparing",
      departureTime: "2024-01-16 06:00",
      estimatedArrival: "2024-01-16 10:00",
      stressLevel: 8,
      protocol: "low-stress-goats",
    },
    {
      id: "transfer003",
      animalType: "🐄 Cattle",
      quantity: 12,
      origin: "Central Ranch",
      destination: "Plains Restoration Gamma",
      status: "recovering",
      departureTime: "2024-01-14 14:00",
      estimatedArrival: "2024-01-14 19:00",
      stressLevel: 22,
      protocol: "gentle-cattle-move",
    },
  ];

  const getStressLevelColor = (level: number) => {
    if (level <= 20) return "text-green-400";
    if (level <= 40) return "text-yellow-400";
    return "text-red-400";
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "preparing":
        return "bg-blue-600";
      case "in-transit":
        return "bg-yellow-600";
      case "delivered":
        return "bg-purple-600";
      case "recovering":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  const getStressLevelBadge = (
    stressLevel: TransferProtocol["stressLevel"],
  ) => {
    switch (stressLevel) {
      case "minimal":
        return "bg-green-600";
      case "low":
        return "bg-yellow-600";
      case "moderate":
        return "bg-orange-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30">
        <CardHeader>
          <CardTitle className="text-2xl text-blue-400 flex items-center gap-2">
            <Heart className="h-6 w-6" />
            🚛 STRESS-FREE ANIMAL TRANSFER PROTOCOLS
          </CardTitle>
          <p className="text-muted-foreground">
            Revolutionary animal welfare system ensuring zero-stress
            transportation to restoration sites
          </p>
        </CardHeader>
      </Card>

      <Tabs defaultValue="protocols" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="protocols">📋 Protocols</TabsTrigger>
          <TabsTrigger value="active">🚛 Active Transfers</TabsTrigger>
          <TabsTrigger value="monitoring">📊 Monitoring</TabsTrigger>
          <TabsTrigger value="analytics">📈 Analytics</TabsTrigger>
        </TabsList>

        <TabsContent value="protocols" className="space-y-6">
          <div className="grid gap-6">
            {transferProtocols.map((protocol) => (
              <Card
                key={protocol.id}
                className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 border border-gray-700/50"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-xl text-foreground flex items-center gap-2">
                      {protocol.animalType}
                    </CardTitle>
                    <div className="flex gap-2">
                      <Badge
                        className={getStressLevelBadge(protocol.stressLevel)}
                      >
                        {protocol.stressLevel} stress
                      </Badge>
                      <Badge className="bg-green-600">
                        {protocol.successRate}% success
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-blue-400 mb-3 flex items-center gap-2">
                        <Shield className="h-4 w-4" />
                        Preparation Steps
                      </h4>
                      <ul className="space-y-2">
                        {protocol.preparationSteps.map((step, index) => (
                          <li
                            key={index}
                            className="text-sm text-muted-foreground flex items-start gap-2"
                          >
                            <CheckCircle className="h-4 w-4 text-green-400 mt-0.5 flex-shrink-0" />
                            {step}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold text-yellow-400 mb-3 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        Monitoring Requirements
                      </h4>
                      <ul className="space-y-2">
                        {protocol.monitoringRequirements.map(
                          (requirement, index) => (
                            <li
                              key={index}
                              className="text-sm text-muted-foreground flex items-start gap-2"
                            >
                              <CheckCircle className="h-4 w-4 text-yellow-400 mt-0.5 flex-shrink-0" />
                              {requirement}
                            </li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-700">
                    <div className="text-center">
                      <Clock className="h-8 w-8 mx-auto text-purple-400 mb-2" />
                      <div className="font-semibold text-purple-400">
                        Max Transport Time
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {protocol.transportTime}
                      </div>
                    </div>

                    <div className="text-center">
                      <Heart className="h-8 w-8 mx-auto text-green-400 mb-2" />
                      <div className="font-semibold text-green-400">
                        Recovery Time
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {protocol.recoveryTime}
                      </div>
                    </div>

                    <div className="text-center">
                      <Shield className="h-8 w-8 mx-auto text-blue-400 mb-2" />
                      <div className="font-semibold text-blue-400">
                        Success Rate
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {protocol.successRate}%
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-6">
          <div className="grid gap-6">
            {activeTransfers.map((transfer) => (
              <Card
                key={transfer.id}
                className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border border-purple-500/30"
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <CardTitle className="text-lg text-purple-400 flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Transfer #{transfer.id.slice(-3)}
                    </CardTitle>
                    <Badge className={getStatusColor(transfer.status)}>
                      {transfer.status.toUpperCase()}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-semibold text-cyan-400 mb-3">
                        🚛 Transfer Details
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Animal Type:</span>
                          <span className="font-semibold">
                            {transfer.animalType}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Quantity:</span>
                          <span className="font-semibold">
                            {transfer.quantity} animals
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span>Protocol:</span>
                          <span className="font-semibold">
                            {transfer.protocol}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-green-400 mb-3">
                        📍 Route Information
                      </h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-muted-foreground">From:</span>
                          <div className="font-semibold">{transfer.origin}</div>
                        </div>
                        <div>
                          <span className="text-muted-foreground">To:</span>
                          <div className="font-semibold">
                            {transfer.destination}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-4 border-t border-gray-700">
                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Departure
                      </div>
                      <div className="font-semibold">
                        {transfer.departureTime}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Expected Arrival
                      </div>
                      <div className="font-semibold">
                        {transfer.estimatedArrival}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm text-muted-foreground mb-1">
                        Stress Level
                      </div>
                      <div
                        className={`font-semibold ${getStressLevelColor(transfer.stressLevel)}`}
                      >
                        {transfer.stressLevel}%
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between text-sm mb-2">
                      <span>Animal Stress Level</span>
                      <span
                        className={getStressLevelColor(transfer.stressLevel)}
                      >
                        {transfer.stressLevel}%
                      </span>
                    </div>
                    <Progress value={transfer.stressLevel} className="h-2" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 border border-green-500/30">
              <CardHeader>
                <CardTitle className="text-lg text-green-400">
                  🩺 Live Health Monitoring
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Average Heart Rate</span>
                      <span className="text-green-400">Normal</span>
                    </div>
                    <Progress value={72} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Temperature Regulation</span>
                      <span className="text-green-400">Optimal</span>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Behavioral Indicators</span>
                      <span className="text-green-400">Calm</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 border border-blue-500/30">
              <CardHeader>
                <CardTitle className="text-lg text-blue-400">
                  🚛 Transport Conditions
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Vehicle Temperature</span>
                      <span className="text-blue-400">18°C</span>
                    </div>
                    <Progress value={75} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Air Quality</span>
                      <span className="text-blue-400">Excellent</span>
                    </div>
                    <Progress value={92} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Route Smoothness</span>
                      <span className="text-blue-400">Optimal</span>
                    </div>
                    <Progress value={89} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border border-purple-500/30">
              <CardContent className="p-6 text-center">
                <Heart className="h-12 w-12 mx-auto text-purple-400 mb-4" />
                <div className="text-3xl font-bold text-purple-400">96.8%</div>
                <div className="text-sm text-muted-foreground">
                  Average Success Rate
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-orange-900/30 to-red-900/30 border border-orange-500/30">
              <CardContent className="p-6 text-center">
                <Shield className="h-12 w-12 mx-auto text-orange-400 mb-4" />
                <div className="text-3xl font-bold text-orange-400">18%</div>
                <div className="text-sm text-muted-foreground">
                  Average Stress Level
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-cyan-900/30 to-blue-900/30 border border-cyan-500/30">
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 mx-auto text-cyan-400 mb-4" />
                <div className="text-3xl font-bold text-cyan-400">32h</div>
                <div className="text-sm text-muted-foreground">
                  Average Recovery Time
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
