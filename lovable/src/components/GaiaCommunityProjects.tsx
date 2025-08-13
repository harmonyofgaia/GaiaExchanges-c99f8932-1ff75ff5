import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Leaf, Users, Target, DollarSign, Clock, Award } from "lucide-react";

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  fundingGoal: number;
  currentFunding: number;
  backers: number;
  daysLeft: number;
  impact: string;
}

export function GaiaCommunityProjects() {
  const [projects, setProjects] = useState<Project[]>([
    {
      id: "1",
      title: "Solar Village Initiative",
      description:
        "Installing solar panels in remote villages to provide clean, renewable energy access.",
      category: "Renewable Energy",
      fundingGoal: 50000,
      currentFunding: 35750,
      backers: 234,
      daysLeft: 18,
      impact: "Will provide clean energy to 500+ families",
    },
    {
      id: "2",
      title: "Ocean Cleanup Drones",
      description:
        "Deploying autonomous drones to collect plastic waste from ocean surfaces.",
      category: "Ocean Conservation",
      fundingGoal: 75000,
      currentFunding: 42300,
      backers: 189,
      daysLeft: 25,
      impact: "Expected to remove 10 tons of plastic annually",
    },
    {
      id: "3",
      title: "Urban Forest Expansion",
      description:
        "Creating green corridors in urban areas to improve air quality and biodiversity.",
      category: "Reforestation",
      fundingGoal: 30000,
      currentFunding: 28900,
      backers: 456,
      daysLeft: 5,
      impact: "Will plant 1,000 trees in metropolitan areas",
    },
  ]);

  const [animatedProjects, setAnimatedProjects] = useState(projects);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedProjects((prev) =>
        prev.map((project) => ({
          ...project,
          currentFunding: Math.min(
            project.fundingGoal,
            project.currentFunding + Math.floor(Math.random() * 500),
          ),
          backers: project.backers + Math.floor(Math.random() * 3),
        })),
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-green-400 mb-4">
          🌱 Community Impact Projects
        </h2>
        <p className="text-muted-foreground">
          Support real-world environmental projects that make a measurable
          difference
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {animatedProjects.map((project) => {
          const fundingPercentage =
            (project.currentFunding / project.fundingGoal) * 100;
          const isNearingGoal = fundingPercentage > 80;

          return (
            <Card
              key={project.id}
              className={`bg-gradient-to-br from-green-900/30 to-emerald-900/30 border-green-500/30 transition-all duration-300 hover:scale-105 ${
                isNearingGoal ? "ring-2 ring-green-400/50" : ""
              }`}
            >
              <CardHeader>
                <div className="flex items-center justify-between">
                  <Badge className="bg-green-600">{project.category}</Badge>
                  <div className="flex items-center gap-1 text-orange-400">
                    <Clock className="h-4 w-4" />
                    <span className="text-sm">{project.daysLeft} days</span>
                  </div>
                </div>
                <CardTitle className="text-green-400">
                  {project.title}
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                <p className="text-sm text-green-300/80">
                  {project.description}
                </p>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-green-400">Funding Progress</span>
                    <span className="text-green-300">
                      ${project.currentFunding.toLocaleString()} / $
                      {project.fundingGoal.toLocaleString()}
                    </span>
                  </div>
                  <Progress value={fundingPercentage} className="h-2" />
                  <div className="text-xs text-green-300/60">
                    {fundingPercentage.toFixed(1)}% funded
                  </div>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-blue-400">
                    <Users className="h-4 w-4" />
                    {project.backers} backers
                  </div>
                  <div className="flex items-center gap-1 text-purple-400">
                    <Target className="h-4 w-4" />
                    Impact Goal
                  </div>
                </div>

                <div className="bg-emerald-900/20 border border-emerald-500/20 rounded-lg p-3">
                  <div className="flex items-center gap-2 text-emerald-400 mb-1">
                    <Award className="h-4 w-4" />
                    <span className="font-medium">Expected Impact</span>
                  </div>
                  <p className="text-sm text-emerald-300/80">
                    {project.impact}
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    className="flex-1 bg-green-600 hover:bg-green-700"
                    size="sm"
                  >
                    <DollarSign className="h-4 w-4 mr-1" />
                    Back Project
                  </Button>
                  <Button
                    variant="outline"
                    className="border-green-400 text-green-400 hover:bg-green-900/20"
                    size="sm"
                  >
                    <Leaf className="h-4 w-4 mr-1" />
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="text-center">
        <Button
          size="lg"
          className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
        >
          <Target className="h-5 w-5 mr-2" />
          View All Projects
        </Button>
      </div>
    </div>
  );
}
