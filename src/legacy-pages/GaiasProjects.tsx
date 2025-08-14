import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, DollarSign, Globe, Users, TrendingUp } from "lucide-react";
import { UniversalGaiaLogo } from "@/components/branding/UniversalGaiaLogo";

export default function GaiasProjects() {
  const [projects, setProjects] = useState([
    {
      id: 1,
      name: "Coral Reef Restoration",
      description: "Restoring damaged coral reefs worldwide using sound technology",
      funding: 250000,
      target: 500000,
      impact: "Ocean Protection",
      status: "Active",
    },
    {
      id: 2,
      name: "Rainforest Conservation",
      description: "Protecting Amazon rainforest areas",
      funding: 180000,
      target: 300000,
      impact: "Climate Action",
      status: "Active",
    },
    {
      id: 3,
      name: "Solar Energy for Communities",
      description: "Solar panel installations in underserved areas",
      funding: 320000,
      target: 400000,
      impact: "Clean Energy",
      status: "Active",
    },
    {
      id: 4,
      name: "Ocean Cleanup Technology",
      description: "Advanced systems for removing plastic from oceans",
      funding: 150000,
      target: 250000,
      impact: "Ocean Cleanup",
      status: "Active",
    },
  ]);

  useEffect(() => {
    // Simulate live funding updates
    const interval = setInterval(() => {
      setProjects((prev) =>
        prev.map((project) => ({
          ...project,
          funding: Math.min(project.target, project.funding + Math.floor(Math.random() * 5000)),
        }))
      );
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-green-900/20 to-blue-900/20">
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-center mb-8">
          <UniversalGaiaLogo
            size="lg"
            animated={true}
            showText={true}
            className="hover:scale-105 transition-transform duration-300"
          />
        </div>

        <Card className="border-4 border-green-500/50 bg-gradient-to-br from-green-900/40 via-blue-900/40 to-purple-900/40 mb-8">
          <CardHeader>
            <CardTitle className="text-center text-5xl font-black bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              🌱 HARMONY GREEN PROJECTS
            </CardTitle>
            <div className="text-center text-2xl text-green-300 font-bold">
              Environmental Impact • Community Driven • Transparent Funding
            </div>
          </CardHeader>
          <CardContent className="space-y-8">
            {/* Project Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-4 bg-green-900/50 rounded-lg border-2 border-green-500/50">
                <Leaf className="h-8 w-8 text-green-400 mx-auto mb-2 animate-pulse" />
                <div className="text-2xl font-black text-green-400">{projects.length}</div>
                <div className="text-sm text-green-300">Active Projects</div>
              </div>

              <div className="text-center p-4 bg-blue-900/50 rounded-lg border-2 border-blue-500/50">
                <DollarSign className="h-8 w-8 text-blue-400 mx-auto mb-2 animate-bounce" />
                <div className="text-2xl font-black text-blue-400">
                  ${projects.reduce((sum, p) => sum + p.funding, 0).toLocaleString()}
                </div>
                <div className="text-sm text-blue-300">Total Funding</div>
              </div>

              <div className="text-center p-4 bg-purple-900/50 rounded-lg border-2 border-purple-500/50">
                <Globe className="h-8 w-8 text-purple-400 mx-auto mb-2 animate-spin" />
                <div className="text-2xl font-black text-purple-400">15</div>
                <div className="text-sm text-purple-300">Countries</div>
              </div>

              <div className="text-center p-4 bg-orange-900/50 rounded-lg border-2 border-orange-500/50">
                <Users className="h-8 w-8 text-orange-400 mx-auto mb-2 animate-pulse" />
                <div className="text-2xl font-black text-orange-400">12.5K</div>
                <div className="text-sm text-orange-300">Contributors</div>
              </div>
            </div>

            {/* Active Projects Display */}
            <div className="space-y-6">
              <h3 className="text-3xl font-bold text-center text-white">
                🌍 ACTIVE GREEN PROJECTS
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project) => (
                  <Card
                    key={project.id}
                    className="border-2 border-green-500/50 bg-gradient-to-br from-green-900/30 to-blue-900/30"
                  >
                    <CardContent className="p-6">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <h4 className="text-xl font-bold text-green-400">{project.name}</h4>
                          <Badge className="bg-green-600 text-white">{project.status}</Badge>
                        </div>
                        <p className="text-muted-foreground">{project.description}</p>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>Progress</span>
                            <span>{Math.round((project.funding / project.target) * 100)}%</span>
                          </div>
                          <div className="w-full bg-gray-700 rounded-full h-3">
                            <div
                              className="bg-gradient-to-r from-green-400 to-blue-400 h-3 rounded-full transition-all duration-300"
                              style={{
                                width: `${Math.min((project.funding / project.target) * 100, 100)}%`,
                              }}
                            />
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-green-400">
                              ${project.funding.toLocaleString()} raised
                            </span>
                            <span className="text-blue-400">
                              ${project.target.toLocaleString()} target
                            </span>
                          </div>
                        </div>
                        <Badge className="bg-purple-600 text-white w-full text-center py-2">
                          Impact: {project.impact}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            <div className="text-center">
              <div className="text-4xl font-black text-green-400 mb-2">
                🌱 BUILDING A GREENER TOMORROW 🌱
              </div>
              <div className="text-xl text-green-300">
                Every Transaction • Every Choice • Every Project • Makes a Difference
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
