import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  TreePine,
  Waves,
  Mountain,
  Leaf,
  Heart,
  Users,
  Target,
  Clock,
  MapPin,
  Award,
  Zap,
} from "lucide-react";
import { toast } from "sonner";

interface ConservationProject {
  id: string;
  title: string;
  description: string;
  location: string;
  country: string;
  category: "forest" | "marine" | "wildlife" | "habitat";
  species: string[];
  fundingGoal: number;
  fundingRaised: number;
  participants: number;
  timeRemaining: string;
  impact: {
    metric: string;
    value: number;
    unit: string;
  };
  status: "active" | "completed" | "urgent";
  images: string[];
  milestones: {
    title: string;
    completed: boolean;
    description: string;
  }[];
}

export function AnimalConservationProjects() {
  const [projects, setProjects] = useState<ConservationProject[]>([
    {
      id: "1",
      title: "Amazon Rainforest Protection Initiative",
      description:
        "Large-scale reforestation and wildlife corridor creation to protect endangered species in the Amazon basin.",
      location: "Amazon Basin",
      country: "Brazil",
      category: "forest",
      species: ["Jaguars", "Macaws", "Monkeys", "Sloths", "Poison Frogs"],
      fundingGoal: 250000,
      fundingRaised: 186400,
      participants: 2847,
      timeRemaining: "45 days",
      impact: {
        metric: "Trees Planted",
        value: 125000,
        unit: "trees",
      },
      status: "active",
      images: ["forest1.jpg", "forest2.jpg"],
      milestones: [
        { title: "Land Acquisition", completed: true, description: "Secured 10,000 hectares" },
        { title: "Species Survey", completed: true, description: "Catalogued 847 species" },
        { title: "Reforestation Phase 1", completed: false, description: "Plant 50,000 trees" },
        { title: "Wildlife Corridors", completed: false, description: "Create 5 corridors" },
      ],
    },
    {
      id: "2",
      title: "Great Barrier Reef Restoration",
      description:
        "Coral restoration and marine protected area expansion to save the world's largest coral reef ecosystem.",
      location: "Great Barrier Reef",
      country: "Australia",
      category: "marine",
      species: ["Coral", "Sea Turtles", "Tropical Fish", "Rays", "Sharks"],
      fundingGoal: 180000,
      fundingRaised: 142300,
      participants: 1924,
      timeRemaining: "60 days",
      impact: {
        metric: "Coral Colonies Restored",
        value: 15600,
        unit: "colonies",
      },
      status: "active",
      images: ["reef1.jpg", "reef2.jpg"],
      milestones: [
        { title: "Research Phase", completed: true, description: "Marine biodiversity assessment" },
        { title: "Coral Nurseries", completed: true, description: "Established 20 nurseries" },
        { title: "Restoration Phase 1", completed: false, description: "Restore 100 hectares" },
        { title: "Protected Area Expansion", completed: false, description: "Add 500 sq km" },
      ],
    },
    {
      id: "3",
      title: "African Elephant Migration Route Protection",
      description:
        "Securing ancient elephant migration routes and reducing human-wildlife conflict through community engagement.",
      location: "Kenya-Tanzania Border",
      country: "Kenya/Tanzania",
      category: "wildlife",
      species: ["African Elephants", "Zebras", "Wildebeest", "Giraffes"],
      fundingGoal: 320000,
      fundingRaised: 98700,
      participants: 1456,
      timeRemaining: "90 days",
      impact: {
        metric: "Migration Route Protected",
        value: 450,
        unit: "kilometers",
      },
      status: "urgent",
      images: ["elephant1.jpg", "elephant2.jpg"],
      milestones: [
        { title: "Community Outreach", completed: true, description: "Engaged 50 villages" },
        { title: "Route Mapping", completed: false, description: "GPS tracking of herds" },
        {
          title: "Corridor Creation",
          completed: false,
          description: "Build 12 wildlife corridors",
        },
        { title: "Monitoring System", completed: false, description: "24/7 tracking network" },
      ],
    },
    {
      id: "4",
      title: "Arctic Ice Habitat Preservation",
      description:
        "Climate change mitigation and habitat preservation for Arctic wildlife threatened by ice loss.",
      location: "Arctic Circle",
      country: "Multiple",
      category: "habitat",
      species: ["Polar Bears", "Arctic Seals", "Walruses", "Arctic Foxes"],
      fundingGoal: 500000,
      fundingRaised: 234600,
      participants: 3621,
      timeRemaining: "120 days",
      impact: {
        metric: "Ice Habitat Protected",
        value: 2500,
        unit: "sq km",
      },
      status: "active",
      images: ["arctic1.jpg", "arctic2.jpg"],
      milestones: [
        { title: "Research Stations", completed: true, description: "5 monitoring stations" },
        {
          title: "Ice Preservation Tech",
          completed: false,
          description: "Deploy preservation systems",
        },
        { title: "Wildlife Tracking", completed: false, description: "Tag 500 animals" },
        {
          title: "Climate Action Plan",
          completed: false,
          description: "International cooperation",
        },
      ],
    },
  ]);

  const fundProject = (projectId: string, amount: number) => {
    setProjects((prev) =>
      prev.map((project) =>
        project.id === projectId
          ? {
              ...project,
              fundingRaised: project.fundingRaised + amount,
              participants: project.participants + 1,
            }
          : project
      )
    );
    toast.success("🌿 Conservation funding sent!", {
      description: `${amount} GAiA contributed to conservation project`,
      duration: 4000,
    });
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "forest":
        return <TreePine className="h-5 w-5" />;
      case "marine":
        return <Waves className="h-5 w-5" />;
      case "wildlife":
        return <Heart className="h-5 w-5" />;
      case "habitat":
        return <Mountain className="h-5 w-5" />;
      default:
        return <Leaf className="h-5 w-5" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "forest":
        return "bg-green-600";
      case "marine":
        return "bg-blue-600";
      case "wildlife":
        return "bg-orange-600";
      case "habitat":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-2 border-green-500/50 bg-gradient-to-r from-green-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            🌿 GLOBAL CONSERVATION PROJECTS
          </CardTitle>
          <p className="text-center text-lg text-muted-foreground">
            Long-term conservation initiatives protecting habitats and species worldwide
          </p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-4">
            <Badge className="bg-green-600 p-3 text-center">
              <div className="flex flex-col items-center">
                <TreePine className="h-6 w-6 mb-1" />
                <span className="text-lg font-bold">{projects.length}</span>
                <span className="text-sm">Active Projects</span>
              </div>
            </Badge>
            <Badge className="bg-blue-600 p-3 text-center">
              <div className="flex flex-col items-center">
                <Target className="h-6 w-6 mb-1" />
                <span className="text-lg font-bold">
                  {Math.round(
                    (projects.reduce((sum, p) => sum + p.fundingRaised / p.fundingGoal, 0) /
                      projects.length) *
                      100
                  )}
                  %
                </span>
                <span className="text-sm">Avg Funded</span>
              </div>
            </Badge>
            <Badge className="bg-purple-600 p-3 text-center">
              <div className="flex flex-col items-center">
                <Users className="h-6 w-6 mb-1" />
                <span className="text-lg font-bold">
                  {projects.reduce((sum, p) => sum + p.participants, 0).toLocaleString()}
                </span>
                <span className="text-sm">Participants</span>
              </div>
            </Badge>
            <Badge className="bg-orange-600 p-3 text-center">
              <div className="flex flex-col items-center">
                <Award className="h-6 w-6 mb-1" />
                <span className="text-lg font-bold">12</span>
                <span className="text-sm">Completed</span>
              </div>
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Project Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="all">🌍 All Projects</TabsTrigger>
          <TabsTrigger value="forest">🌲 Forest</TabsTrigger>
          <TabsTrigger value="marine">🌊 Marine</TabsTrigger>
          <TabsTrigger value="wildlife">🦁 Wildlife</TabsTrigger>
          <TabsTrigger value="habitat">🏔️ Habitat</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {projects.map((project) => (
              <Card
                key={project.id}
                className={`border-2 ${
                  project.status === "urgent"
                    ? "border-red-500/50 bg-red-900/20"
                    : "border-green-500/30 bg-green-900/20"
                }`}
              >
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle
                        className={`flex items-center gap-2 ${
                          project.status === "urgent" ? "text-red-400" : "text-green-400"
                        }`}
                      >
                        {getCategoryIcon(project.category)}
                        {project.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                        <MapPin className="h-4 w-4" />
                        {project.location}, {project.country}
                      </p>
                    </div>
                    <div className="text-right">
                      <Badge className={getCategoryColor(project.category)}>
                        {project.category.toUpperCase()}
                      </Badge>
                      {project.status === "urgent" && (
                        <Badge className="bg-red-600 mt-1">🚨 URGENT</Badge>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm mb-4">{project.description}</p>

                  <div className="space-y-3 mb-4">
                    <div className="flex justify-between text-sm">
                      <span>Funding Progress</span>
                      <span>
                        {((project.fundingRaised / project.fundingGoal) * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress
                      value={(project.fundingRaised / project.fundingGoal) * 100}
                      className="h-3"
                    />
                    <div className="flex justify-between text-sm text-muted-foreground">
                      <span>{project.fundingRaised.toLocaleString()} GAiA raised</span>
                      <span>{project.fundingGoal.toLocaleString()} GAiA goal</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-blue-900/30 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-blue-400">Impact Goal</p>
                      <p className="text-lg font-bold">{project.impact.value.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">{project.impact.metric}</p>
                    </div>
                    <div className="bg-purple-900/30 p-3 rounded-lg">
                      <p className="text-sm font-semibold text-purple-400">Community</p>
                      <p className="text-lg font-bold">{project.participants.toLocaleString()}</p>
                      <p className="text-sm text-muted-foreground">Participants</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold mb-2">Species Protected:</p>
                    <div className="flex flex-wrap gap-1">
                      {project.species.map((species) => (
                        <Badge key={species} variant="outline" className="text-xs">
                          {species}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-semibold mb-2">Project Milestones:</p>
                    <div className="space-y-1">
                      {project.milestones.map((milestone, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <div
                            className={`w-3 h-3 rounded-full ${
                              milestone.completed ? "bg-green-500" : "bg-gray-500"
                            }`}
                          />
                          <span
                            className={
                              milestone.completed ? "text-green-400" : "text-muted-foreground"
                            }
                          >
                            {milestone.title}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => fundProject(project.id, 100)}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      🌱 100 GAiA
                    </Button>
                    <Button
                      onClick={() => fundProject(project.id, 500)}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      🌿 500 GAiA
                    </Button>
                    <Button
                      onClick={() => fundProject(project.id, 1000)}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      ⭐ 1000 GAiA
                    </Button>
                  </div>

                  <div className="flex justify-between items-center mt-3 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {project.timeRemaining} remaining
                    </span>
                    <span className="flex items-center gap-1">
                      <Zap className="h-4 w-4" />
                      Impact: High
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {["forest", "marine", "wildlife", "habitat"].map((category) => (
          <TabsContent key={category} value={category} className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {projects
                .filter((p) => p.category === category)
                .map((project) => (
                  <Card key={project.id} className="border-green-500/30 bg-green-900/20">
                    <CardHeader>
                      <CardTitle className="text-green-400 flex items-center gap-2">
                        {getCategoryIcon(project.category)}
                        {project.title}
                      </CardTitle>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapPin className="h-4 w-4" />
                        {project.location}, {project.country}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm mb-4">{project.description}</p>

                      <div className="space-y-3 mb-4">
                        <Progress
                          value={(project.fundingRaised / project.fundingGoal) * 100}
                          className="h-3"
                        />
                        <div className="flex justify-between text-sm text-muted-foreground">
                          <span>{project.fundingRaised.toLocaleString()} GAiA</span>
                          <span>{project.fundingGoal.toLocaleString()} GAiA</span>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => fundProject(project.id, 100)}
                          className="bg-green-600 hover:bg-green-700"
                          size="sm"
                        >
                          Support 100 GAiA
                        </Button>
                        <Button
                          onClick={() => fundProject(project.id, 500)}
                          className="bg-blue-600 hover:bg-blue-700"
                          size="sm"
                        >
                          Donate 500 GAiA
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
