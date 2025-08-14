import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TreePine, Droplets, Wind, Shield, Users, Target } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { GreenProject, parseJsonField } from "@/types/ui-types";
import { supabase } from "@/integrations/supabase/client";

export default function DecentralizedProjectFundingPools() {
  const [projects, setProjects] = useState<GreenProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const loadProjects = async () => {
    try {
      const { data, error } = await supabase
        .from("green_projects")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error loading projects:", error);
        return;
      }

      const typedProjects: GreenProject[] =
        data?.map((project) => ({
          id: project.id,
          title: project.title,
          description: project.description,
          funding_goal: project.funding_goal,
          current_funding: project.funding_raised || 0,
          project_type: project.category || "general",
          carbon_impact_target: project.carbon_impact_target,
          biodiversity_score: project.biodiversity_score,
          verification_status: project.verification_status,
          smart_contract_address: null,
          satellite_verified: false,
          governance_score: 0,
          community_votes: 0,
          verification_method: "pending",
          project_data: parseJsonField(project.project_data, {
            location: "",
            area_covered: 0,
            species_count: 0,
            timeline: "",
            technical_specs: {},
            environmental_metrics: {},
          }),
        })) || [];

      setProjects(typedProjects);
    } catch (error) {
      console.error("Error in loadProjects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const mockProjects: GreenProject[] = [
    {
      id: "amazon-protection",
      title: "Amazon Rainforest Protection",
      description: "Large-scale conservation of 10,000 hectares in the Amazon basin",
      funding_goal: 2500000,
      current_funding: 1847500,
      project_type: "Forest Conservation",
      carbon_impact_target: 50000,
      biodiversity_score: 95,
      verification_status: "verified",
      smart_contract_address: "0x1234...abcd",
      satellite_verified: true,
      governance_score: 92,
      community_votes: 15420,
      verification_method: "satellite + ground truth",
      project_data: {
        location: "Amazon Basin, Brazil",
        area_covered: 10000,
        species_count: 2500,
        timeline: "36 months",
        technical_specs: {},
        environmental_metrics: { co2_sequestration: 50000 },
      },
    },
    {
      id: "ocean-cleanup",
      title: "Pacific Ocean Plastic Removal",
      description: "Advanced filtration systems to remove microplastics from ocean currents",
      funding_goal: 1800000,
      current_funding: 1260000,
      project_type: "Ocean Cleanup",
      carbon_impact_target: 25000,
      biodiversity_score: 87,
      verification_status: "verified",
      smart_contract_address: "0x5678...efgh",
      satellite_verified: true,
      governance_score: 88,
      community_votes: 12100,
      verification_method: "drone monitoring",
      project_data: {
        location: "North Pacific Gyre",
        area_covered: 5000,
        species_count: 800,
        timeline: "24 months",
        technical_specs: {},
        environmental_metrics: { plastic_removed: 15000 },
      },
    },
  ];

  const displayProjects = projects.length > 0 ? projects : mockProjects;

  const getProjectIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "forest conservation":
        return <TreePine className="h-6 w-6 text-green-400" />;
      case "ocean cleanup":
        return <Droplets className="h-6 w-6 text-blue-400" />;
      case "renewable energy":
        return <Wind className="h-6 w-6 text-yellow-400" />;
      default:
        return <Shield className="h-6 w-6 text-purple-400" />;
    }
  };

  const getStatusColor = (status: string | null) => {
    switch (status) {
      case "verified":
        return "bg-green-600";
      case "pending":
        return "bg-yellow-600";
      case "rejected":
        return "bg-red-600";
      default:
        return "bg-gray-600";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
        <Navbar />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <div className="text-2xl text-green-400">Loading projects...</div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-green-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
            🌍 Decentralized Project Funding Pools
          </h1>
          <p className="text-xl text-muted-foreground mt-2">
            Community-driven environmental project funding with full transparency
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayProjects.map((project) => (
            <Card
              key={project.id}
              className="bg-gradient-to-br from-black/50 to-gray-900/50 border-gray-700/20 hover:scale-105 transition-all duration-300"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  {getProjectIcon(project.project_type)}
                  {project.title}
                </CardTitle>
                <div className="flex gap-2">
                  <Badge className={getStatusColor(project.verification_status)}>
                    {project.verification_status || "pending"}
                  </Badge>
                  {project.satellite_verified && (
                    <Badge className="bg-blue-600">Satellite Verified</Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">{project.description}</p>

                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="text-white font-bold">
                      {Math.round((project.current_funding / project.funding_goal) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={(project.current_funding / project.funding_goal) * 100}
                    className="w-full h-2"
                  />

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Raised</span>
                    <span className="text-green-400 font-bold">
                      ${project.current_funding.toLocaleString()}
                    </span>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Goal</span>
                    <span className="text-white font-bold">
                      ${project.funding_goal.toLocaleString()}
                    </span>
                  </div>

                  {project.carbon_impact_target && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">CO₂ Impact</span>
                      <span className="text-green-400 font-bold">
                        {project.carbon_impact_target.toLocaleString()} tons
                      </span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Community Votes</span>
                    <span className="text-purple-400 font-bold">
                      {project.community_votes.toLocaleString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2 mt-6">
                  <Button className="flex-1 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700">
                    <Target className="h-4 w-4 mr-2" />
                    Fund Project
                  </Button>
                  <Button variant="outline" size="sm">
                    <Users className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
