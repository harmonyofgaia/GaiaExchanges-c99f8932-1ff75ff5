import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Leaf, Plus, Edit, Trash2, Save, TreePine, Droplets, Wind, Sun } from "lucide-react";
import { toast } from "sonner";

interface GreenProject {
  id: string;
  title: string;
  description: string;
  category: "trees" | "ocean" | "renewable" | "conservation";
  budget: number;
  status: "planning" | "active" | "completed";
  impact: string;
  startDate: string;
}

export function GreenProjectManager() {
  const [projects, setProjects] = useState<GreenProject[]>([
    {
      id: "1",
      title: "Ocean Cleanup Initiative",
      description: "Large-scale ocean plastic removal using advanced filtration systems",
      category: "ocean",
      budget: 250000,
      status: "active",
      impact: "50,000 tons of plastic removed",
      startDate: "2024-01-15",
    },
    {
      id: "2",
      title: "Forest Restoration Program",
      description: "Planting native trees in deforested areas across multiple continents",
      category: "trees",
      budget: 180000,
      status: "active",
      impact: "100,000 trees planted",
      startDate: "2024-02-01",
    },
  ]);

  const [editingProject, setEditingProject] = useState<string | null>(null);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    category: "trees" as const,
    budget: 0,
    impact: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "trees":
        return <TreePine className="h-4 w-4" />;
      case "ocean":
        return <Droplets className="h-4 w-4" />;
      case "renewable":
        return <Sun className="h-4 w-4" />;
      case "conservation":
        return <Wind className="h-4 w-4" />;
      default:
        return <Leaf className="h-4 w-4" />;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "trees":
        return "bg-green-600";
      case "ocean":
        return "bg-blue-600";
      case "renewable":
        return "bg-yellow-600";
      case "conservation":
        return "bg-purple-600";
      default:
        return "bg-gray-600";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-600";
      case "active":
        return "bg-blue-600";
      case "planning":
        return "bg-yellow-600";
      default:
        return "bg-gray-600";
    }
  };

  const addProject = () => {
    if (!newProject.title || !newProject.description) return;

    const project: GreenProject = {
      id: Date.now().toString(),
      ...newProject,
      status: "planning",
      startDate: new Date().toISOString().split("T")[0],
    };

    setProjects((prev) => [project, ...prev]);
    setNewProject({
      title: "",
      description: "",
      category: "trees",
      budget: 0,
      impact: "",
    });
    setShowAddForm(false);

    toast.success("🌱 Green Project Added!", {
      description: "Project has been added to the ecosystem",
      duration: 4000,
    });

    console.log("🌍 NEW GREEN PROJECT ADDED:", project.title);
  };

  const deleteProject = (id: string) => {
    setProjects((prev) => prev.filter((p) => p.id !== id));
    toast.success("Project Removed", {
      description: "Green project has been removed from management",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      <Card className="border-green-500/50 bg-gradient-to-br from-green-900/30 to-emerald-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Leaf className="h-6 w-6" />
            🌱 GREEN PROJECT MANAGEMENT - ADMIN CONTROL
            <Badge className="bg-green-600 text-white">ECOSYSTEM BUILDER</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add New Project Button */}
          <Button
            onClick={() => setShowAddForm(!showAddForm)}
            className="bg-green-600 hover:bg-green-700"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add New Green Project
          </Button>

          {/* Add Project Form */}
          {showAddForm && (
            <Card className="border-green-500/30">
              <CardContent className="pt-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Project Title"
                    value={newProject.title}
                    onChange={(e) =>
                      setNewProject((prev) => ({
                        ...prev,
                        title: e.target.value,
                      }))
                    }
                  />
                  <select
                    value={newProject.category}
                    onChange={(e) =>
                      setNewProject((prev) => ({
                        ...prev,
                        category: e.target.value as any,
                      }))
                    }
                    className="px-3 py-2 bg-background border border-input rounded-md"
                  >
                    <option value="trees">Forest/Trees</option>
                    <option value="ocean">Ocean Cleanup</option>
                    <option value="renewable">Renewable Energy</option>
                    <option value="conservation">Conservation</option>
                  </select>
                </div>
                <Textarea
                  placeholder="Project Description"
                  value={newProject.description}
                  onChange={(e) =>
                    setNewProject((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    type="number"
                    placeholder="Budget (GAiA tokens)"
                    value={newProject.budget || ""}
                    onChange={(e) =>
                      setNewProject((prev) => ({
                        ...prev,
                        budget: Number(e.target.value),
                      }))
                    }
                  />
                  <Input
                    placeholder="Expected Impact"
                    value={newProject.impact}
                    onChange={(e) =>
                      setNewProject((prev) => ({
                        ...prev,
                        impact: e.target.value,
                      }))
                    }
                  />
                </div>
                <div className="flex gap-2">
                  <Button onClick={addProject} className="bg-green-600 hover:bg-green-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Project
                  </Button>
                  <Button onClick={() => setShowAddForm(false)} variant="outline">
                    Cancel
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Projects List */}
          <div className="space-y-4">
            <h4 className="text-green-400 font-bold">Current Green Projects</h4>
            {projects.map((project) => (
              <Card key={project.id} className="border-green-500/30">
                <CardContent className="pt-4">
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        {getCategoryIcon(project.category)}
                        <h5 className="font-bold text-white">{project.title}</h5>
                        <Badge
                          className={`${getCategoryColor(project.category)} text-white text-xs`}
                        >
                          {project.category.toUpperCase()}
                        </Badge>
                        <Badge className={`${getStatusColor(project.status)} text-white text-xs`}>
                          {project.status.toUpperCase()}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{project.description}</p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 text-sm">
                        <div>💰 Budget: {project.budget.toLocaleString()} GAiA</div>
                        <div>🎯 Impact: {project.impact}</div>
                        <div>📅 Started: {new Date(project.startDate).toLocaleDateString()}</div>
                      </div>
                    </div>
                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => deleteProject(project.id)}>
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Project Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-3 rounded-lg bg-green-900/30">
              <div className="text-2xl font-bold text-green-400">{projects.length}</div>
              <div className="text-xs text-muted-foreground">Total Projects</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-blue-900/30">
              <div className="text-2xl font-bold text-blue-400">
                {projects.filter((p) => p.status === "active").length}
              </div>
              <div className="text-xs text-muted-foreground">Active Projects</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-yellow-900/30">
              <div className="text-2xl font-bold text-yellow-400">
                {projects.reduce((sum, p) => sum + p.budget, 0).toLocaleString()}
              </div>
              <div className="text-xs text-muted-foreground">Total Budget (GAiA)</div>
            </div>
            <div className="text-center p-3 rounded-lg bg-purple-900/30">
              <div className="text-2xl font-bold text-purple-400">
                {projects.filter((p) => p.status === "completed").length}
              </div>
              <div className="text-xs text-muted-foreground">Completed</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
