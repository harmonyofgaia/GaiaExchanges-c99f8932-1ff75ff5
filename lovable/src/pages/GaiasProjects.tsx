import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  TreePine,
  Leaf,
  Droplets,
  Wind,
  Globe,
  Heart,
  Shield,
  Target,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { useNavigate } from "react-router-dom";

export default function GaiasProjects() {
  const navigate = useNavigate();

  const projects = [
    {
      id: 1,
      title: "Sand Protect System",
      description:
        "Community-driven wildfire prevention through advanced sand cannon technology and AI detection",
      category: "Wildfire Prevention",
      funded: 56.5,
      goal: 1500000,
      icon: <Shield className="h-6 w-6 text-orange-400" />,
      color: "from-orange-600 to-red-600",
      route: "/sand-protect",
      owner: "harmonyofgaia",
      priority: true,
    },
    {
      id: 2,
      title: "Amazon Rainforest Conservation",
      description:
        "Protecting 50,000 acres of pristine rainforest through sustainable farming partnerships",
      category: "Forest Protection",
      funded: 85,
      goal: 500000,
      icon: <TreePine className="h-6 w-6 text-green-400" />,
      color: "from-green-600 to-emerald-600",
    },
    {
      id: 3,
      title: "Ocean Plastic Cleanup Initiative",
      description:
        "Advanced ocean cleanup technology removing plastic waste from marine ecosystems",
      category: "Ocean Cleanup",
      funded: 67,
      goal: 750000,
      icon: <Droplets className="h-6 w-6 text-blue-400" />,
      color: "from-blue-600 to-cyan-600",
    },
    {
      id: 4,
      title: "Renewable Energy Villages",
      description:
        "Installing solar and wind power systems in remote communities worldwide",
      category: "Clean Energy",
      funded: 92,
      goal: 300000,
      icon: <Wind className="h-6 w-6 text-yellow-400" />,
      color: "from-yellow-600 to-orange-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌍 Gaia's Environmental Projects
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Supporting Global Environmental Initiatives Through Community
            Funding
          </p>
          <div className="flex gap-4 mt-4">
            <Badge
              variant="outline"
              className="border-green-500/50 text-green-400"
            >
              <Globe className="h-3 w-3 mr-1" />
              Global Impact
            </Badge>
            <Badge
              variant="outline"
              className="border-blue-500/50 text-blue-400"
            >
              <Heart className="h-3 w-3 mr-1" />
              Community Driven
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-green-900/20 to-black/50 border-green-500/20">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">247</div>
              <div className="text-muted-foreground">Active Projects</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-blue-900/20 to-black/50 border-blue-500/20">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-blue-400 mb-2">
                $12.4M
              </div>
              <div className="text-muted-foreground">Total Funded</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-purple-900/20 to-black/50 border-purple-500/20">
            <CardContent className="p-6 text-center">
              <div className="text-4xl font-bold text-purple-400 mb-2">89K</div>
              <div className="text-muted-foreground">Trees Planted</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Card
              key={project.id}
              className={`bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20 hover:scale-105 transition-all duration-300 ${project.priority ? "ring-2 ring-orange-500/50" : ""}`}
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  {project.icon}
                  {project.title}
                </CardTitle>
                <div className="flex items-center gap-2">
                  <Badge className={`bg-gradient-to-r ${project.color} w-fit`}>
                    {project.category}
                  </Badge>
                  {project.priority && (
                    <Badge
                      variant="outline"
                      className="border-orange-500/50 text-orange-400 text-xs"
                    >
                      Featured
                    </Badge>
                  )}
                </div>
                {project.owner && (
                  <div className="text-xs text-muted-foreground">
                    Project Owner:{" "}
                    <span className="text-green-400">{project.owner}</span>
                  </div>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-white font-bold">
                      {project.funded}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className={`bg-gradient-to-r ${project.color} h-2 rounded-full transition-all duration-300`}
                      style={{ width: `${project.funded}%` }}
                    ></div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Goal</span>
                    <span className="text-white font-bold">
                      ${project.goal.toLocaleString()}
                    </span>
                  </div>
                </div>

                <Button
                  className={`w-full mt-6 bg-gradient-to-r ${project.color} hover:opacity-90`}
                  onClick={() =>
                    project.route ? navigate(project.route) : undefined
                  }
                >
                  {project.route ? (
                    <>
                      <Target className="h-4 w-4 mr-2" />
                      View Project
                    </>
                  ) : (
                    <>
                      <Heart className="h-4 w-4 mr-2" />
                      Support Project
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <Card className="mt-8 bg-gradient-to-r from-green-900/30 to-blue-900/30 border-green-500/20">
          <CardHeader>
            <CardTitle className="text-center text-green-400">
              🌱 Start Your Own Environmental Project
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground mb-6">
              Have an environmental initiative that needs funding? Submit your
              project proposal to the GAIA community.
            </p>
            <Button className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
              Submit Project Proposal
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
