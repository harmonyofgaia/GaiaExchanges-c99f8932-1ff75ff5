import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Brain, 
  Cpu, 
  Zap, 
  Bot, 
  Settings,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Sparkles,
  Network,
  Eye,
  Shield
} from 'lucide-react';

export function AIHubAdmin() {
  const [aiStats, setAiStats] = useState({
    totalModels: 47,
    activeModels: 23,
    processingTasks: 1847,
    completedToday: 12450,
    cpuUsage: 67.8,
    gpuUsage: 82.3,
    memoryUsage: 74.1
  });

  const [aiModels, setAiModels] = useState([
    { 
      id: 1, 
      name: "EcoVision AI", 
      type: "Computer Vision", 
      status: "active", 
      accuracy: 94.7,
      tasks: 2847,
      description: "Environmental monitoring and analysis"
    },
    { 
      id: 2, 
      name: "GreenText Analyzer", 
      type: "NLP", 
      status: "active", 
      accuracy: 91.3,
      tasks: 1923,
      description: "Content moderation and sentiment analysis"
    },
    { 
      id: 3, 
      name: "Climate Predictor", 
      type: "Forecasting", 
      status: "training", 
      accuracy: 87.9,
      tasks: 0,
      description: "Environmental trend prediction"
    },
    { 
      id: 4, 
      name: "Community Guardian", 
      type: "Security", 
      status: "active", 
      accuracy: 98.2,
      tasks: 5674,
      description: "Threat detection and prevention"
    },
    { 
      id: 5, 
      name: "Smart Recommender", 
      type: "Recommendation", 
      status: "maintenance", 
      accuracy: 89.6,
      tasks: 847,
      description: "Personalized content recommendations"
    }
  ]);

  const [activeTasks, setActiveTasks] = useState([
    { id: 1, task: "Processing video content analysis", model: "EcoVision AI", progress: 78, eta: "2m 15s" },
    { id: 2, task: "Analyzing user sentiment patterns", model: "GreenText Analyzer", progress: 45, eta: "4m 32s" },
    { id: 3, task: "Training climate prediction model", model: "Climate Predictor", progress: 23, eta: "1h 45m" },
    { id: 4, task: "Scanning for security threats", model: "Community Guardian", progress: 92, eta: "30s" }
  ]);

  const [systemAlerts, setSystemAlerts] = useState([
    { id: 1, type: "warning", message: "GPU memory usage approaching limit", timestamp: "2 minutes ago" },
    { id: 2, type: "info", message: "Model training completed successfully", timestamp: "15 minutes ago" },
    { id: 3, type: "error", message: "API rate limit exceeded for external service", timestamp: "1 hour ago" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAiStats(prev => ({
        ...prev,
        processingTasks: prev.processingTasks + Math.floor(Math.random() * 10) - 5,
        completedToday: prev.completedToday + Math.floor(Math.random() * 5),
        cpuUsage: Math.max(0, Math.min(100, prev.cpuUsage + (Math.random() - 0.5) * 5)),
        gpuUsage: Math.max(0, Math.min(100, prev.gpuUsage + (Math.random() - 0.5) * 3)),
        memoryUsage: Math.max(0, Math.min(100, prev.memoryUsage + (Math.random() - 0.5) * 2))
      }));

      setActiveTasks(prev => prev.map(task => ({
        ...task,
        progress: Math.min(100, task.progress + Math.floor(Math.random() * 3))
      })));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500"><CheckCircle className="h-3 w-3 mr-1" />Active</Badge>;
      case 'training':
        return <Badge variant="default" className="bg-blue-500"><Brain className="h-3 w-3 mr-1" />Training</Badge>;
      case 'maintenance':
        return <Badge variant="secondary"><Settings className="h-3 w-3 mr-1" />Maintenance</Badge>;
      case 'error':
        return <Badge variant="destructive"><AlertTriangle className="h-3 w-3 mr-1" />Error</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getAlertBadge = (type: string) => {
    switch (type) {
      case 'error':
        return <Badge variant="destructive">Error</Badge>;
      case 'warning':
        return <Badge variant="default" className="bg-yellow-500">Warning</Badge>;
      case 'info':
        return <Badge variant="outline">Info</Badge>;
      default:
        return <Badge variant="secondary">{type}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-purple-400">🧠 AI Hub Control</h2>
          <p className="text-muted-foreground">Manage GAiA AI Systems & Machine Learning</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline" className="text-purple-400 border-purple-400">
            <Brain className="h-4 w-4 mr-2" />
            {aiStats.activeModels} Active Models
          </Badge>
          <Badge variant="outline" className="text-blue-400 border-blue-400">
            <Activity className="h-4 w-4 mr-2" />
            {aiStats.processingTasks} Tasks
          </Badge>
        </div>
      </div>

      {/* System Resource Monitoring */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground">CPU Usage</p>
                <p className="text-2xl font-bold">{aiStats.cpuUsage.toFixed(1)}%</p>
              </div>
              <Cpu className="h-8 w-8 text-blue-500" />
            </div>
            <Progress value={aiStats.cpuUsage} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground">GPU Usage</p>
                <p className="text-2xl font-bold">{aiStats.gpuUsage.toFixed(1)}%</p>
              </div>
              <Zap className="h-8 w-8 text-yellow-500" />
            </div>
            <Progress value={aiStats.gpuUsage} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground">Memory Usage</p>
                <p className="text-2xl font-bold">{aiStats.memoryUsage.toFixed(1)}%</p>
              </div>
              <Network className="h-8 w-8 text-green-500" />
            </div>
            <Progress value={aiStats.memoryUsage} className="h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed Today</p>
                <p className="text-2xl font-bold">{aiStats.completedToday.toLocaleString()}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-purple-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="models" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="models">AI Models</TabsTrigger>
          <TabsTrigger value="tasks">Active Tasks</TabsTrigger>
          <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="models" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI Model Directory</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {aiModels.map((model) => (
                  <div key={model.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Brain className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{model.name}</h3>
                        <p className="text-sm text-muted-foreground">{model.description}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-muted-foreground">Type: {model.type}</span>
                          <span className="text-xs text-muted-foreground">Accuracy: {model.accuracy}%</span>
                          <span className="text-xs text-muted-foreground">Tasks: {model.tasks}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(model.status)}
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4 mr-1" />
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="tasks" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Processing Tasks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeTasks.map((task) => (
                  <div key={task.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold">{task.task}</h3>
                      <span className="text-sm text-muted-foreground">ETA: {task.eta}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">Model: {task.model}</p>
                    <div className="flex items-center space-x-2">
                      <Progress value={task.progress} className="flex-1" />
                      <span className="text-sm font-medium">{task.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>System Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className="mt-1">
                        {getAlertBadge(alert.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Model Accuracy</span>
                      <span className="text-sm font-medium">92.4%</span>
                    </div>
                    <Progress value={92.4} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Processing Speed</span>
                      <span className="text-sm font-medium">87.1%</span>
                    </div>
                    <Progress value={87.1} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">System Reliability</span>
                      <span className="text-sm font-medium">98.9%</span>
                    </div>
                    <Progress value={98.9} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Model Training Center</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border-2 border-dashed border-muted rounded-lg text-center">
                  <Bot className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                  <h3 className="font-semibold mb-2">Start New Training</h3>
                  <p className="text-sm text-muted-foreground mb-4">Upload datasets and configure training parameters</p>
                  <Button>
                    <Sparkles className="h-4 w-4 mr-2" />
                    New Training Session
                  </Button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Training Queue</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Climate Predictor v2.1</span>
                        <Badge variant="outline">Queued</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Enhanced Vision Model</span>
                        <Badge variant="outline">Queued</Badge>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <h3 className="font-semibold mb-2">Recent Completions</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Security Model v3.2</span>
                        <Badge variant="default" className="bg-green-500">Completed</Badge>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Text Analyzer v1.8</span>
                        <Badge variant="default" className="bg-green-500">Completed</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>AI System Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Auto-scaling enabled</h3>
                    <p className="text-sm text-muted-foreground">Automatically scale resources based on demand</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Real-time monitoring</h3>
                    <p className="text-sm text-muted-foreground">Enable continuous performance monitoring</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Automated retraining</h3>
                    <p className="text-sm text-muted-foreground">Retrain models when performance drops</p>
                  </div>
                  <input type="checkbox" className="toggle" />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Max CPU Usage (%)</label>
                  <input type="number" className="w-full px-3 py-2 border rounded-md mt-1" defaultValue="80" />
                </div>
                <div>
                  <label className="text-sm font-medium">Max Memory Usage (%)</label>
                  <input type="number" className="w-full px-3 py-2 border rounded-md mt-1" defaultValue="75" />
                </div>
              </div>
              <Button>Save Configuration</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}