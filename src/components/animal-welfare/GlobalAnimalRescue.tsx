import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Globe,
  MapPin,
  AlertTriangle,
  Heart,
  Users,
  Clock,
  Target,
  Zap,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { toast } from "sonner";

interface RescueOperation {
  id: string;
  location: string;
  country: string;
  species: string;
  urgency: "critical" | "high" | "medium" | "low";
  animalsAffected: number;
  fundsNeeded: number;
  fundsRaised: number;
  status: "active" | "completed" | "urgent";
  description: string;
  timeRemaining: string;
}

export function GlobalAnimalRescue() {
  const [activeOperations, setActiveOperations] = useState<RescueOperation[]>([
    {
      id: "1",
      location: "Amazon Rainforest, Brazil",
      country: "Brazil",
      species: "Jaguars, Sloths, Toucans",
      urgency: "critical",
      animalsAffected: 847,
      fundsNeeded: 50000,
      fundsRaised: 32400,
      status: "urgent",
      description: "Illegal deforestation threatening wildlife sanctuary",
      timeRemaining: "3 days",
    },
    {
      id: "2",
      location: "Serengeti, Tanzania",
      country: "Tanzania",
      species: "Elephants, Lions, Zebras",
      urgency: "high",
      animalsAffected: 1200,
      fundsNeeded: 75000,
      fundsRaised: 68500,
      status: "active",
      description: "Poaching crisis requiring immediate intervention",
      timeRemaining: "1 week",
    },
    {
      id: "3",
      location: "Great Barrier Reef, Australia",
      country: "Australia",
      species: "Sea Turtles, Dolphins, Fish",
      urgency: "high",
      animalsAffected: 2500,
      fundsNeeded: 100000,
      fundsRaised: 45600,
      status: "active",
      description: "Coral bleaching emergency affecting marine life",
      timeRemaining: "2 weeks",
    },
    {
      id: "4",
      location: "Madagascar",
      country: "Madagascar",
      species: "Lemurs, Fossas, Chameleons",
      urgency: "medium",
      animalsAffected: 680,
      fundsNeeded: 35000,
      fundsRaised: 28900,
      status: "active",
      description: "Habitat restoration for endemic species",
      timeRemaining: "1 month",
    },
  ]);

  const [globalStats, setGlobalStats] = useState({
    totalRescues: 12847,
    activeOperations: 45,
    animalsSaved: 89542,
    partnersWorldwide: 247,
  });

  const donateToOperation = (operationId: string, amount: number) => {
    setActiveOperations((ops) =>
      ops.map((op) =>
        op.id === operationId ? { ...op, fundsRaised: op.fundsRaised + amount } : op
      )
    );
    toast.success("🌍 Donation sent globally!", {
      description: `${amount} GAiA tokens donated to rescue operation`,
      duration: 4000,
    });
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case "critical":
        return "bg-red-600";
      case "high":
        return "bg-orange-600";
      case "medium":
        return "bg-yellow-600";
      case "low":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Global Stats Header */}
      <Card className="border-2 border-blue-500/50 bg-gradient-to-r from-blue-900/30 to-green-900/30">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            🌍 GLOBAL ANIMAL RESCUE OPERATIONS
          </CardTitle>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <Badge className="bg-blue-600 p-4 text-center">
              <div className="flex flex-col items-center">
                <Globe className="h-6 w-6 mb-2" />
                <span className="text-xl font-bold">
                  {globalStats.totalRescues.toLocaleString()}
                </span>
                <span className="text-sm">Total Rescues</span>
              </div>
            </Badge>
            <Badge className="bg-red-600 p-4 text-center">
              <div className="flex flex-col items-center">
                <AlertTriangle className="h-6 w-6 mb-2" />
                <span className="text-xl font-bold">{globalStats.activeOperations}</span>
                <span className="text-sm">Active Operations</span>
              </div>
            </Badge>
            <Badge className="bg-green-600 p-4 text-center">
              <div className="flex flex-col items-center">
                <Heart className="h-6 w-6 mb-2" />
                <span className="text-xl font-bold">
                  {globalStats.animalsSaved.toLocaleString()}
                </span>
                <span className="text-sm">Animals Saved</span>
              </div>
            </Badge>
            <Badge className="bg-purple-600 p-4 text-center">
              <div className="flex flex-col items-center">
                <Users className="h-6 w-6 mb-2" />
                <span className="text-xl font-bold">{globalStats.partnersWorldwide}</span>
                <span className="text-sm">Global Partners</span>
              </div>
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Active Operations */}
      <Tabs defaultValue="urgent" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="urgent">🚨 Urgent</TabsTrigger>
          <TabsTrigger value="active">🌍 Active</TabsTrigger>
          <TabsTrigger value="completed">✅ Completed</TabsTrigger>
        </TabsList>

        <TabsContent value="urgent" className="space-y-4">
          {activeOperations
            .filter((op) => op.urgency === "critical")
            .map((operation) => (
              <Card key={operation.id} className="border-red-500/50 bg-red-900/20">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-red-400 flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5" />
                        {operation.location}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {operation.species} • {operation.animalsAffected} animals affected
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={getUrgencyColor(operation.urgency)}>
                        {operation.urgency.toUpperCase()}
                      </Badge>
                      <p className="text-sm text-red-400 mt-1 flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {operation.timeRemaining}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{operation.description}</p>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Funding Progress</span>
                      <span>
                        {((operation.fundsRaised / operation.fundsNeeded) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress
                      value={(operation.fundsRaised / operation.fundsNeeded) * 100}
                      className="h-3"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{operation.fundsRaised.toLocaleString()} GAiA raised</span>
                      <span>{operation.fundsNeeded.toLocaleString()} GAiA needed</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={() => donateToOperation(operation.id, 100)}
                      className="bg-red-600 hover:bg-red-700"
                    >
                      🚨 Emergency Donate 100 GAiA
                    </Button>
                    <Button
                      onClick={() => donateToOperation(operation.id, 500)}
                      className="bg-orange-600 hover:bg-orange-700"
                    >
                      💰 Donate 500 GAiA
                    </Button>
                    <Button
                      onClick={() => donateToOperation(operation.id, 1000)}
                      className="bg-yellow-600 hover:bg-yellow-700"
                    >
                      ⭐ Major Support 1000 GAiA
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          {activeOperations
            .filter((op) => op.urgency !== "critical")
            .map((operation) => (
              <Card key={operation.id} className="border-blue-500/30 bg-blue-900/20">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-blue-400 flex items-center gap-2">
                        <MapPin className="h-5 w-5" />
                        {operation.location}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground mt-1">
                        {operation.species} • {operation.animalsAffected} animals affected
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={getUrgencyColor(operation.urgency)}>
                        {operation.urgency.toUpperCase()}
                      </Badge>
                      <p className="text-sm text-blue-400 mt-1 flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {operation.timeRemaining}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{operation.description}</p>

                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span>Funding Progress</span>
                      <span>
                        {((operation.fundsRaised / operation.fundsNeeded) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress
                      value={(operation.fundsRaised / operation.fundsNeeded) * 100}
                      className="h-3"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{operation.fundsRaised.toLocaleString()} GAiA raised</span>
                      <span>{operation.fundsNeeded.toLocaleString()} GAiA needed</span>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button
                      onClick={() => donateToOperation(operation.id, 50)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      💙 Support 50 GAiA
                    </Button>
                    <Button
                      onClick={() => donateToOperation(operation.id, 200)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      🌿 Donate 200 GAiA
                    </Button>
                    <Button
                      onClick={() => donateToOperation(operation.id, 500)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      ⭐ Major Gift 500 GAiA
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <Card className="border-green-500/50 bg-green-900/20">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <CheckCircle className="h-6 w-6" />
                Recent Success Stories
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-800/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="font-semibold">Australian Bushfire Recovery - Complete</p>
                    <p className="text-sm text-muted-foreground">
                      2,400 koalas and wildlife rescued
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-800/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="font-semibold">Arctic Ice Protection - Complete</p>
                    <p className="text-sm text-muted-foreground">1,800 polar bears protected</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 bg-green-800/30 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <div>
                    <p className="font-semibold">Borneo Orangutan Sanctuary - Complete</p>
                    <p className="text-sm text-muted-foreground">950 orangutans relocated safely</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
