
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Brain,
  Zap,
  Settings,
  Activity,
  Target,
  Shield,
  Crown,
  Rocket,
  Command,
  Bot,
  Cpu,
  Database,
  Network,
  Code,
  Eye,
  Lock,
  Unlock,
  Play,
  Pause,
  Stop,
  RefreshCw,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'
import { toast } from 'sonner'

interface AITask {
  id: string
  name: string
  type: 'automation' | 'monitoring' | 'analysis' | 'optimization' | 'security'
  status: 'active' | 'paused' | 'completed' | 'failed'
  priority: 'low' | 'medium' | 'high' | 'critical'
  progress: number
  description: string
  lastRun: string
  nextRun: string
  permissions: string[]
}

export function AITaskManagerEngine() {
  const [tasks, setTasks] = useState<AITask[]>([])
  const [engineStatus, setEngineStatus] = useState<'online' | 'offline' | 'maintenance'>('online')
  const [systemLoad, setSystemLoad] = useState(67)
  const [activeProcesses, setActiveProcesses] = useState(23)
  const [securityLevel, setSecurityLevel] = useState<'standard' | 'enhanced' | 'maximum'>('maximum')

  useEffect(() => {
    // Initialize AI tasks with full admin capabilities
    const initialTasks: AITask[] = [
      {
        id: 'task-001',
        name: 'Live Animal Health Monitoring',
        type: 'monitoring',
        status: 'active',
        priority: 'critical',
        progress: 94,
        description: 'Real-time monitoring of all registered animals health and activity',
        lastRun: '2 minutes ago',
        nextRun: 'Continuous',
        permissions: ['READ_ANIMAL_DATA', 'WRITE_HEALTH_REPORTS', 'ALERT_SYSTEM']
      },
      {
        id: 'task-002',
        name: 'NFT Market Price Optimization',
        type: 'optimization',
        status: 'active',
        priority: 'high',
        progress: 78,
        description: 'Dynamic pricing for animal NFTs based on market demand and conservation impact',
        lastRun: '15 minutes ago',
        nextRun: '5 minutes',
        permissions: ['READ_MARKET_DATA', 'WRITE_PRICING', 'EXECUTE_TRADES']
      },
      {
        id: 'task-003',
        name: 'Artist Stream Analytics Engine',
        type: 'analysis',
        status: 'active',
        priority: 'high',
        progress: 85,
        description: 'Advanced analytics for live streams, viewer engagement, and revenue optimization',
        lastRun: '5 minutes ago',
        nextRun: '10 minutes',
        permissions: ['READ_STREAM_DATA', 'WRITE_ANALYTICS', 'AUDIENCE_INSIGHTS']
      },
      {
        id: 'task-004',
        name: 'Security Threat Detection',
        type: 'security',
        status: 'active',
        priority: 'critical',
        progress: 99,
        description: 'Advanced threat detection and prevention for the entire GAiA ecosystem',
        lastRun: '30 seconds ago',
        nextRun: 'Continuous',
        permissions: ['READ_ALL_LOGS', 'WRITE_SECURITY_ALERTS', 'BLOCK_THREATS', 'ADMIN_OVERRIDE']
      },
      {
        id: 'task-005',
        name: 'Wallet Transaction Optimizer',
        type: 'automation',
        status: 'active',
        priority: 'medium',
        progress: 72,
        description: 'Optimize transaction fees and routes for all wallet operations',
        lastRun: '8 minutes ago',
        nextRun: '2 minutes',
        permissions: ['READ_WALLET_DATA', 'OPTIMIZE_TRANSACTIONS', 'ROUTE_SELECTION']
      },
      {
        id: 'task-006',
        name: 'Conservation Impact Calculator',
        type: 'analysis',
        status: 'active',
        priority: 'high',
        progress: 91,
        description: 'Calculate real-world conservation impact from platform activities',
        lastRun: '1 hour ago',
        nextRun: '30 minutes',
        permissions: ['READ_CONSERVATION_DATA', 'WRITE_IMPACT_REPORTS', 'FUNDING_ALLOCATION']
      }
    ]
    setTasks(initialTasks)
  }, [])

  const toggleTaskStatus = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            status: task.status === 'active' ? 'paused' : 'active'
          }
        : task
    ))
    
    const task = tasks.find(t => t.id === taskId)
    toast.success(`🤖 Task ${task?.status === 'active' ? 'Paused' : 'Started'}!`, {
      description: task?.name,
      duration: 3000
    })
  }

  const createNewTask = () => {
    const newTask: AITask = {
      id: `task-${Date.now()}`,
      name: 'Custom AI Task',
      type: 'automation',
      status: 'paused',
      priority: 'medium',
      progress: 0,
      description: 'Custom task created by admin',
      lastRun: 'Never',
      nextRun: 'Manual start',
      permissions: ['FULL_ADMIN_ACCESS']
    }
    
    setTasks(prev => [newTask, ...prev])
    toast.success('✨ New AI Task Created!', {
      description: 'Task ready for configuration',
      duration: 3000
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600'
      case 'paused': return 'bg-yellow-600'
      case 'completed': return 'bg-blue-600'
      case 'failed': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-red-500/50 bg-red-900/20'
      case 'high': return 'border-orange-500/50 bg-orange-900/20'
      case 'medium': return 'border-blue-500/50 bg-blue-900/20'
      case 'low': return 'border-gray-500/50 bg-gray-900/20'
      default: return 'border-gray-500/50 bg-gray-900/20'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'automation': return <Bot className="h-4 w-4" />
      case 'monitoring': return <Eye className="h-4 w-4" />
      case 'analysis': return <Brain className="h-4 w-4" />
      case 'optimization': return <TrendingUp className="h-4 w-4" />
      case 'security': return <Shield className="h-4 w-4" />
      default: return <Cpu className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Engine Header */}
      <Card className="border-2 border-cyan-500/50 bg-gradient-to-br from-cyan-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="text-cyan-400 flex items-center gap-2">
            <Brain className="h-6 w-6" />
            🤖 AI TASK MANAGER ENGINE - UNLIMITED ADMIN POWER
          </CardTitle>
          <p className="text-muted-foreground">
            Powerful AI engine with full admin rights and unlimited task management capabilities
          </p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="text-center p-4 bg-cyan-900/30 border border-cyan-500/20 rounded-lg">
              <div className="text-2xl font-bold text-cyan-400">{engineStatus.toUpperCase()}</div>
              <div className="text-sm text-muted-foreground">Engine Status</div>
            </div>
            <div className="text-center p-4 bg-green-900/30 border border-green-500/20 rounded-lg">
              <div className="text-2xl font-bold text-green-400">{tasks.filter(t => t.status === 'active').length}</div>
              <div className="text-sm text-muted-foreground">Active Tasks</div>
            </div>
            <div className="text-center p-4 bg-blue-900/30 border border-blue-500/20 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">{systemLoad}%</div>
              <div className="text-sm text-muted-foreground">System Load</div>
            </div>
            <div className="text-center p-4 bg-purple-900/30 border border-purple-500/20 rounded-lg">
              <div className="text-2xl font-bold text-purple-400">{activeProcesses}</div>
              <div className="text-sm text-muted-foreground">Processes</div>
            </div>
            <div className="text-center p-4 bg-orange-900/30 border border-orange-500/20 rounded-lg">
              <div className="text-2xl font-bold text-orange-400">{securityLevel.toUpperCase()}</div>
              <div className="text-sm text-muted-foreground">Security Level</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="tasks" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="tasks">🔧 Active Tasks</TabsTrigger>
          <TabsTrigger value="create">➕ Create Task</TabsTrigger>
          <TabsTrigger value="engine">⚙️ Engine Controls</TabsTrigger>
          <TabsTrigger value="permissions">🔐 Permissions</TabsTrigger>
          <TabsTrigger value="analytics">📊 Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="tasks">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {tasks.map((task) => (
              <Card key={task.id} className={`border-2 ${getPriorityColor(task.priority)} hover:scale-105 transition-all`}>
                <CardContent className="p-4 space-y-4">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-2">
                      {getTypeIcon(task.type)}
                      <h3 className="font-bold text-white">{task.name}</h3>
                    </div>
                    <div className="flex gap-2">
                      <Badge className={`${getStatusColor(task.status)} text-white text-xs`}>
                        {task.status}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        {task.priority}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground">{task.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span>Progress:</span>
                      <span className="text-cyan-400">{task.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
                        style={{ width: `${task.progress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <span className="text-muted-foreground">Last Run:</span>
                      <div className="text-green-400">{task.lastRun}</div>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Next Run:</span>
                      <div className="text-blue-400">{task.nextRun}</div>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-1">
                    {task.permissions.slice(0, 3).map(permission => (
                      <Badge key={permission} variant="outline" className="text-xs">
                        {permission}
                      </Badge>
                    ))}
                    {task.permissions.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{task.permissions.length - 3} more
                      </Badge>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      onClick={() => toggleTaskStatus(task.id)}
                      className={`flex-1 ${task.status === 'active' ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'}`}
                      size="sm"
                    >
                      {task.status === 'active' ? <Pause className="h-3 w-3 mr-1" /> : <Play className="h-3 w-3 mr-1" />}
                      {task.status === 'active' ? 'Pause' : 'Start'}
                    </Button>
                    <Button className="flex-1 bg-blue-600 hover:bg-blue-700" size="sm">
                      <Settings className="h-3 w-3 mr-1" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="create">
          <Card className="border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400">🚀 Create New AI Task</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Task Name:</label>
                    <Input placeholder="Enter task name" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Task Type:</label>
                    <select className="w-full px-3 py-2 bg-muted border border-border rounded-md">
                      <option value="automation">Automation</option>
                      <option value="monitoring">Monitoring</option>
                      <option value="analysis">Analysis</option>
                      <option value="optimization">Optimization</option>
                      <option value="security">Security</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Priority:</label>
                    <select className="w-full px-3 py-2 bg-muted border border-border rounded-md">
                      <option value="critical">Critical</option>
                      <option value="high">High</option>
                      <option value="medium">Medium</option>
                      <option value="low">Low</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Description:</label>
                    <textarea 
                      className="w-full px-3 py-2 bg-muted border border-border rounded-md h-20"
                      placeholder="Describe the task functionality"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Permissions:</label>
                    <div className="space-y-2">
                      {['FULL_ADMIN_ACCESS', 'READ_ALL_DATA', 'WRITE_ALL_DATA', 'EXECUTE_COMMANDS', 'SYSTEM_CONTROL'].map(permission => (
                        <label key={permission} className="flex items-center gap-2">
                          <input type="checkbox" className="rounded" />
                          <span className="text-sm">{permission}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <Button onClick={createNewTask} className="w-full bg-purple-600 hover:bg-purple-700">
                <Rocket className="h-4 w-4 mr-2" />
                Create AI Task
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engine">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="border-red-500/30 bg-red-900/20">
              <CardHeader>
                <CardTitle className="text-red-400">🔥 Engine Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-red-600 hover:bg-red-700">
                  <Stop className="h-4 w-4 mr-2" />
                  Emergency Stop
                </Button>
                <Button className="w-full bg-orange-600 hover:bg-orange-700">
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Restart Engine
                </Button>
                <Button className="w-full bg-purple-600 hover:bg-purple-700">
                  <Command className="h-4 w-4 mr-2" />
                  Force Override
                </Button>
              </CardContent>
            </Card>

            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="text-blue-400">⚡ Performance Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-blue-600 hover:bg-blue-700">
                  <Cpu className="h-4 w-4 mr-2" />
                  CPU Optimization
                </Button>
                <Button className="w-full bg-cyan-600 hover:bg-cyan-700">
                  <Database className="h-4 w-4 mr-2" />
                  Database Tuning
                </Button>
                <Button className="w-full bg-indigo-600 hover:bg-indigo-700">
                  <Network className="h-4 w-4 mr-2" />
                  Network Boost
                </Button>
              </CardContent>
            </Card>

            <Card className="border-green-500/30 bg-green-900/20">
              <CardHeader>
                <CardTitle className="text-green-400">🛡️ Security Controls</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full bg-green-600 hover:bg-green-700">
                  <Lock className="h-4 w-4 mr-2" />
                  Lock All Tasks
                </Button>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                  <Unlock className="h-4 w-4 mr-2" />
                  Unlock All Tasks
                </Button>
                <Button className="w-full bg-teal-600 hover:bg-teal-700">
                  <Crown className="h-4 w-4 mr-2" />
                  Admin Override
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="permissions">
          <Card className="border-yellow-500/30">
            <CardHeader>
              <CardTitle className="text-yellow-400">🔐 Permission Management System</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Available Permissions</h3>
                  <div className="space-y-3">
                    {[
                      'FULL_ADMIN_ACCESS',
                      'READ_ALL_DATA',
                      'WRITE_ALL_DATA',
                      'EXECUTE_COMMANDS',
                      'SYSTEM_CONTROL',
                      'WALLET_MANAGEMENT',
                      'NFT_GENERATION',
                      'STREAM_CONTROL',
                      'ANIMAL_MONITORING',
                      'SECURITY_OVERRIDE'
                    ].map(permission => (
                      <div key={permission} className="flex items-center justify-between p-3 bg-muted rounded">
                        <span className="text-sm font-medium">{permission}</span>
                        <Badge className="bg-green-600 text-white">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Granted
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-bold text-white mb-4">Security Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Security Level:</label>
                      <select 
                        value={securityLevel}
                        onChange={(e) => setSecurityLevel(e.target.value as any)}
                        className="w-full px-3 py-2 bg-muted border border-border rounded-md"
                      >
                        <option value="standard">Standard</option>
                        <option value="enhanced">Enhanced</option>
                        <option value="maximum">Maximum</option>
                      </select>
                    </div>
                    <Button className="w-full bg-yellow-600 hover:bg-yellow-700">
                      <Shield className="h-4 w-4 mr-2" />
                      Apply Security Settings
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-cyan-400">📈 Engine Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-cyan-900/30 rounded">
                      <div className="text-2xl font-bold text-cyan-400">99.7%</div>
                      <div className="text-xs">Uptime</div>
                    </div>
                    <div className="text-center p-3 bg-green-900/30 rounded">
                      <div className="text-2xl font-bold text-green-400">847ms</div>
                      <div className="text-xs">Avg Response</div>
                    </div>
                  </div>
                  <div className="h-32 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded flex items-end justify-center">
                    <div className="text-white text-sm">Performance Chart</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400">🎯 Task Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Success Rate:</span>
                    <span className="text-green-400">98.4%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tasks Completed:</span>
                    <span className="text-blue-400">12,847</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Processing Speed:</span>
                    <span className="text-purple-400">2.3x Faster</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Resource Usage:</span>
                    <span className="text-yellow-400">Optimized</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
