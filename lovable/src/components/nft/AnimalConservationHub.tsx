import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Heart, TreePine, Droplets, Shield, Globe, Users } from "lucide-react";

export function AnimalConservationHub() {
  const conservationProjects = [
    {
      id: 1,
      name: "Amazon Rainforest Protection",
      animal: "Jaguars & Toucans",
      progress: 78,
      funding: 125000,
      goal: 200000,
      supporters: 2847,
      impact: "2,500 acres protected",
    },
    {
      id: 2,
      name: "Arctic Wildlife Preservation",
      animal: "Polar Bears",
      progress: 92,
      funding: 184000,
      goal: 200000,
      supporters: 1923,
      impact: "15 bears tracked & protected",
    },
    {
      id: 3,
      name: "Ocean Cleanup Initiative",
      animal: "Sea Turtles",
      progress: 65,
      funding: 85000,
      goal: 150000,
      supporters: 3456,
      impact: "1,200 turtles saved",
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="border-green-500/30 bg-green-900/20">
        <CardHeader>
          <CardTitle className="text-green-400">🌱 Conservation Impact Hub</CardTitle>
          <p className="text-muted-foreground">
            Every NFT purchase directly funds real-world animal conservation projects
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-900/20 rounded border border-blue-500/20">
              <div className="text-2xl font-bold text-blue-400">12,847</div>
              <div className="text-sm text-muted-foreground">Animals Protected</div>
            </div>
            <div className="text-center p-4 bg-green-900/20 rounded border border-green-500/20">
              <div className="text-2xl font-bold text-green-400">$1.2M</div>
              <div className="text-sm text-muted-foreground">Funds Raised</div>
            </div>
            <div className="text-center p-4 bg-purple-900/20 rounded border border-purple-500/20">
              <div className="text-2xl font-bold text-purple-400">47</div>
              <div className="text-sm text-muted-foreground">Active Projects</div>
            </div>
            <div className="text-center p-4 bg-orange-900/20 rounded border border-orange-500/20">
              <div className="text-2xl font-bold text-orange-400">8,226</div>
              <div className="text-sm text-muted-foreground">Supporters</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        {conservationProjects.map((project) => (
          <Card key={project.id} className="border-blue-500/20 bg-blue-900/10">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-blue-400">{project.name}</CardTitle>
                  <p className="text-sm text-muted-foreground mt-1">
                    Protecting: <span className="text-green-400">{project.animal}</span>
                  </p>
                </div>
                <Badge className="bg-green-600">{project.progress}% Complete</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Funding Progress</span>
                  <span className="text-green-400">
                    ${project.funding.toLocaleString()} / ${project.goal.toLocaleString()}
                  </span>
                </div>
                <Progress value={project.progress} className="h-3" />
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-blue-400" />
                  <span>{project.supporters.toLocaleString()} supporters</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="h-4 w-4 text-red-400" />
                  <span className="text-green-400">{project.impact}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">
                  <Heart className="h-4 w-4 mr-2" />
                  Support Project
                </Button>
                <Button variant="outline" className="border-blue-500/30 text-blue-400">
                  <Globe className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="border-purple-500/20 bg-purple-900/10">
        <CardContent className="pt-6">
          <h3 className="text-xl font-bold text-purple-400 mb-4 text-center">
            🌍 Global Conservation Impact
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center space-y-2">
              <TreePine className="h-12 w-12 text-green-400 mx-auto" />
              <h4 className="font-semibold text-green-400">Forest Protection</h4>
              <p className="text-sm text-muted-foreground">
                Protecting crucial habitats and biodiversity
              </p>
            </div>
            <div className="text-center space-y-2">
              <Droplets className="h-12 w-12 text-blue-400 mx-auto" />
              <h4 className="font-semibold text-blue-400">Ocean Conservation</h4>
              <p className="text-sm text-muted-foreground">
                Cleaning oceans and protecting marine life
              </p>
            </div>
            <div className="text-center space-y-2">
              <Shield className="h-12 w-12 text-purple-400 mx-auto" />
              <h4 className="font-semibold text-purple-400">Wildlife Security</h4>
              <p className="text-sm text-muted-foreground">
                Anti-poaching and animal tracking systems
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
