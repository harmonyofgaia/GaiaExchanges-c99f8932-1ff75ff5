import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { CheckCircle, Circle, Target, Zap } from "lucide-react";
import { toast } from "sonner";

interface Task {
  id: string;
  title: string;
  description: string;
  category: "branding" | "security" | "development" | "legal" | "marketing";
  completed: boolean;
  priority: "high" | "medium" | "low";
}

export function CompletionTaskManager() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: "1",
      title: "Brand Clarification Campaign",
      description:
        "Deploy official statements across all platforms clarifying we are NOT GAIA Everworld",
      category: "branding",
      completed: false,
      priority: "high",
    },
    {
      id: "2",
      title: "Legal Documentation",
      description:
        "Create official partnership agreements with brand distinction clauses",
      category: "legal",
      completed: false,
      priority: "high",
    },
    {
      id: "3",
      title: "Google Search Optimization",
      description:
        "Submit to Google to clarify our distinct identity and prevent confusion",
      category: "marketing",
      completed: false,
      priority: "high",
    },
    {
      id: "4",
      title: "Exclusive Brand Identity",
      description:
        "Develop unique visual and textual elements that distinguish us completely",
      category: "branding",
      completed: false,
      priority: "high",
    },
    {
      id: "5",
      title: "Admin Eye Recognition System",
      description: "Implement biometric security for admin-only AI access",
      category: "security",
      completed: false,
      priority: "high",
    },
    {
      id: "6",
      title: "Parabolic AI Thinking Module",
      description: "Create isolated AI environment for complex problem-solving",
      category: "development",
      completed: false,
      priority: "medium",
    },
    {
      id: "7",
      title: "Immutable AI Core Protection",
      description:
        "Lock AI modifications to admin-only with biometric verification",
      category: "security",
      completed: false,
      priority: "high",
    },
    {
      id: "8",
      title: "Enhanced Tools & Weapons Making System",
      description:
        "Advanced 3D designer for creating superior gaming tools and weapons",
      category: "development",
      completed: false,
      priority: "medium",
    },
  ]);

  const toggleTask = (taskId: string) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task,
      ),
    );

    const task = tasks.find((t) => t.id === taskId);
    if (task && !task.completed) {
      toast.success(`Task Completed: ${task.title}`, {
        description: "Moving closer to our watersolid plan!",
        duration: 3000,
      });
    }
  };

  const completedTasks = tasks.filter((task) => task.completed).length;
  const totalTasks = tasks.length;
  const completionPercentage = (completedTasks / totalTasks) * 100;

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "branding":
        return "bg-purple-600";
      case "security":
        return "bg-red-600";
      case "development":
        return "bg-blue-600";
      case "legal":
        return "bg-yellow-600";
      case "marketing":
        return "bg-green-600";
      default:
        return "bg-gray-600";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "border-red-500 bg-red-900/20";
      case "medium":
        return "border-yellow-500 bg-yellow-900/20";
      case "low":
        return "border-green-500 bg-green-900/20";
      default:
        return "border-gray-500 bg-gray-900/20";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/30 to-blue-900/30 border-purple-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Target className="h-6 w-6" />
            📋 COMPLETION TASK MANAGER - WATERSOLID PLAN
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <div className="text-4xl font-bold text-purple-400 mb-2">
              {completedTasks}/{totalTasks}
            </div>
            <div className="text-sm text-muted-foreground mb-4">
              Tasks Completed
            </div>
            <Progress value={completionPercentage} className="h-4" />
            <div className="text-sm text-muted-foreground mt-2">
              {completionPercentage.toFixed(1)}% Complete
            </div>
          </div>

          <div className="space-y-4">
            {tasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 rounded-lg border-2 ${getPriorityColor(task.priority)} ${
                  task.completed ? "opacity-60" : ""
                }`}
              >
                <div className="flex items-start gap-3">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => toggleTask(task.id)}
                    className="p-1 h-auto"
                  >
                    {task.completed ? (
                      <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                      <Circle className="h-5 w-5 text-gray-400" />
                    )}
                  </Button>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h4
                        className={`font-semibold ${task.completed ? "line-through text-gray-400" : "text-white"}`}
                      >
                        {task.title}
                      </h4>
                      <Badge className={getCategoryColor(task.category)}>
                        {task.category.toUpperCase()}
                      </Badge>
                      <Badge
                        variant="outline"
                        className={`
                        ${
                          task.priority === "high"
                            ? "border-red-400 text-red-400"
                            : task.priority === "medium"
                              ? "border-yellow-400 text-yellow-400"
                              : "border-green-400 text-green-400"
                        }
                      `}
                      >
                        {task.priority.toUpperCase()}
                      </Badge>
                    </div>
                    <p
                      className={`text-sm ${task.completed ? "text-gray-500" : "text-gray-300"}`}
                    >
                      {task.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {completionPercentage === 100 && (
            <div className="bg-green-900/40 p-6 rounded-lg border border-green-500/30 text-center">
              <Zap className="h-12 w-12 mx-auto text-green-400 mb-4" />
              <h3 className="text-2xl font-bold text-green-400 mb-2">
                🎉 WATERSOLID PLAN COMPLETE! 🎉
              </h3>
              <p className="text-green-300">
                All tasks completed! GAiA Token community is now fully
                established as an exclusive, independent project powered by
                Culture of Harmony!
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
