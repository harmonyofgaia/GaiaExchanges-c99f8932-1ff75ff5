import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Switch } from "@/components/ui/switch";
import { toast } from "sonner";

interface AutomationTask {
  id: string;
  name: string;
  status: "pending" | "running" | "completed" | "error";
  progress: number;
  priority: "low" | "medium" | "high" | "critical";
}

export function DailyEngineAutomation() {
  const [isAutomationActive, setIsAutomationActive] = useState(false);
  const [tasks, setTasks] = useState<AutomationTask[]>([
    {
      id: "1",
      name: "System Health Check",
      status: "pending",
      progress: 0,
      priority: "critical",
    },
    {
      id: "2",
      name: "Database Optimization",
      status: "pending",
      progress: 0,
      priority: "high",
    },
    {
      id: "3",
      name: "Security Scan",
      status: "pending",
      progress: 0,
      priority: "critical",
    },
    {
      id: "4",
      name: "Backup Creation",
      status: "pending",
      progress: 0,
      priority: "high",
    },
    {
      id: "5",
      name: "Performance Analytics",
      status: "pending",
      progress: 0,
      priority: "medium",
    },
    {
      id: "6",
      name: "Threat Intelligence Update",
      status: "pending",
      progress: 0,
      priority: "high",
    },
    {
      id: "7",
      name: "Resource Cleanup",
      status: "pending",
      progress: 0,
      priority: "medium",
    },
    {
      id: "8",
      name: "Network Optimization",
      status: "pending",
      progress: 0,
      priority: "high",
    },
  ]);

  const [tacticalMovements, setTacticalMovements] = useState({
    defensive: 0,
    offensive: 0,
    reconnaissance: 0,
  });

  useEffect(() => {
    if (isAutomationActive) {
      const interval = setInterval(() => {
        setTasks((prevTasks) =>
          prevTasks.map((task) => {
            if (task.status === "pending") {
              return { ...task, status: "running" as const };
            } else if (task.status === "running" && task.progress < 100) {
              const increment = Math.random() * 15;
              const newProgress = Math.min(100, task.progress + increment);
              const newStatus = newProgress >= 100 ? ("completed" as const) : ("running" as const);
              return { ...task, progress: newProgress, status: newStatus };
            }
            return task;
          })
        );

        setTacticalMovements((prev) => ({
          defensive: Math.min(100, prev.defensive + Math.random() * 3),
          offensive: Math.min(100, prev.offensive + Math.random() * 2),
          reconnaissance: Math.min(100, prev.reconnaissance + Math.random() * 4),
        }));
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [isAutomationActive]);

  const toggleAutomation = () => {
    setIsAutomationActive(!isAutomationActive);
    if (!isAutomationActive) {
      toast.success("🚀 Daily Engine Automation Activated", {
        description: "All systems are now running automated optimization tasks",
      });
    } else {
      toast.info("⏸️ Automation Paused", {
        description: "Daily engine tasks have been temporarily suspended",
      });
    }
  };

  const executeEmergencyProtocol = () => {
    toast.warning("🚨 Emergency Protocol Activated", {
      description: "Tactical defense movements initiated",
    });

    setTacticalMovements({
      defensive: 100,
      offensive: 85,
      reconnaissance: 95,
    });
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "critical":
        return "bg-red-500";
      case "high":
        return "bg-orange-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-green-500";
      default:
        return "bg-gray-500";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-gray-500";
      case "running":
        return "bg-blue-500";
      case "completed":
        return "bg-green-500";
      case "error":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const completedTasks = tasks.filter((task) => task.status === "completed").length;
  const totalTasks = tasks.length;
  const overallProgress = (completedTasks / totalTasks) * 100;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                🔄 Daily Engine Task Automation
                <Badge className={isAutomationActive ? "bg-green-500" : "bg-gray-500"}>
                  {isAutomationActive ? "ACTIVE" : "STANDBY"}
                </Badge>
              </CardTitle>
              <CardDescription>
                Automated system optimization and tactical defense management
              </CardDescription>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="text-sm">Automation</span>
                <Switch checked={isAutomationActive} onCheckedChange={toggleAutomation} />
              </div>
              <Button onClick={executeEmergencyProtocol} variant="destructive" size="sm">
                🚨 Emergency Protocol
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{overallProgress.toFixed(1)}%</div>
              <div className="text-sm text-blue-700 dark:text-blue-300">Overall Progress</div>
              <Progress value={overallProgress} className="mt-2" />
            </div>
            <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {completedTasks}/{totalTasks}
              </div>
              <div className="text-sm text-green-700 dark:text-green-300">Tasks Completed</div>
            </div>
            <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {isAutomationActive ? "ACTIVE" : "STANDBY"}
              </div>
              <div className="text-sm text-purple-700 dark:text-purple-300">System Status</div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">🛠️ Automation Tasks</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {tasks.map((task) => (
                <div key={task.id} className="border rounded-lg p-3">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-sm">{task.name}</span>
                    <div className="flex gap-1">
                      <Badge className={getPriorityColor(task.priority)}>{task.priority}</Badge>
                      <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                    </div>
                  </div>
                  <Progress value={task.progress} className="h-2" />
                  <div className="text-xs text-muted-foreground mt-1">
                    {task.progress.toFixed(1)}% complete
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">⚔️ Tactical Defense Movements</h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">🛡️ Defensive</span>
                  <span className="text-sm font-bold">
                    {tacticalMovements.defensive.toFixed(1)}%
                  </span>
                </div>
                <Progress value={tacticalMovements.defensive} className="h-3" />
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">⚔️ Offensive</span>
                  <span className="text-sm font-bold">
                    {tacticalMovements.offensive.toFixed(1)}%
                  </span>
                </div>
                <Progress value={tacticalMovements.offensive} className="h-3" />
              </div>
              <div className="border rounded-lg p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">🔍 Reconnaissance</span>
                  <span className="text-sm font-bold">
                    {tacticalMovements.reconnaissance.toFixed(1)}%
                  </span>
                </div>
                <Progress value={tacticalMovements.reconnaissance} className="h-3" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
