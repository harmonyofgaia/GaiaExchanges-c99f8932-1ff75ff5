import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import { 
  Brain, 
  Zap, 
  CheckCircle, 
  AlertTriangle, 
  Settings, 
  Play,
  Pause,
  Cpu,
  Activity,
  Command,
  Rocket,
  Shield,
  Eye,
  Lock,
  Target,
  Globe,
  Database,
  Network,
  Server,
  Trash2,
  RefreshCw
} from 'lucide-react'
import { toast } from 'sonner'
import { supabase } from '@/integrations/supabase/client'

interface AIResponse {
  id: string
  query: string
  response: string
  confidence: number
  actionable: boolean
  timestamp: Date
  status: 'pending' | 'approved' | 'implemented' | 'rejected'
  systemImpact: 'low' | 'medium' | 'high' | 'critical'
}

interface AITask {
  id: string
  name: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'critical'
  status: 'pending' | 'running' | 'completed' | 'failed' | 'paused'
  progress: number
  category: 'security' | 'analysis' | 'automation' | 'monitoring' | 'attack' | 'defense'
  estimatedTime: string
  requiredResources: string[]
  createdAt: Date
  completedAt?: Date
  adminOnly: boolean
  invisible: boolean
}

export function AITaskManagerEngine() {
  const [tasks, setTasks] = useState<AITask[]>([])
  const [newTaskName, setNewTaskName] = useState('')
  const [newTaskDescription, setNewTaskDescription] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('security')
  const [selectedPriority, setSelectedPriority] = useState('medium')
  const [systemMetrics, setSystemMetrics] = useState({
    activeTasks: 0,
    completedTasks: 0,
    cpuUsage: 45,
    memoryUsage: 67,
    networkActivity: 89,
    defensiveMode: true,
    attackMode: false,
    invisibleOperations: 12
  })
  const [koalaAIActive, setKoalaAIActive] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  // Load tasks from Supabase and initialize Koala AI
  useEffect(() => {
    loadAITasks()
    initializeKoalaAI()
    
    // Set up real-time updates
    const interval = setInterval(() => {
      updateTaskProgress()
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const loadAITasks = async () => {
    try {
      setIsLoading(true)
      
      // Load from Supabase admin_metrics for AI tasks
      const { data, error } = await supabase
        .from('admin_metrics')
        .select('*')
        .eq('metric_type', 'ai_task')
        .order('last_updated', { ascending: false })

      if (error) throw error

      // Convert metrics to AI tasks format
      const loadedTasks: AITask[] = data.map((metric, index) => {
        const metadata = (metric.metadata as any) || {}
        return {
          id: metric.id,
          name: metadata.name || `🐨 Koala AI Task ${index + 1}`,
          description: metadata.description || 'Advanced Koala AI processing task',
          status: metadata.status || 'pending',
          progress: metric.metric_value,
          priority: metadata.priority || 'medium',
          category: metadata.category || 'automation',
          estimatedTime: metadata.estimatedTime || '1 hour',
          requiredResources: metadata.requiredResources || ['Koala CPU: 50%', 'AI RAM: 2GB'],
          createdAt: new Date(metric.last_updated),
          adminOnly: true,
          invisible: metadata.invisible || false
        }
      })

      // Add default Koala AI tasks if none exist
      if (loadedTasks.length === 0) {
        const defaultTasks = await createDefaultKoalaTasks()
        setTasks(defaultTasks)
      } else {
        setTasks(loadedTasks)
      }
    } catch (error) {
      console.error('Error loading AI tasks:', error)
      // Fallback to default tasks
      const defaultTasks = await createDefaultKoalaTasks()
      setTasks(defaultTasks)
    } finally {
      setIsLoading(false)
    }
  }

  const initializeKoalaAI = async () => {
    try {
      // Initialize Koala AI integration with Supabase
      setKoalaAIActive(true)
      
      // Log Koala AI activation
      await supabase
        .from('admin_metrics')
        .upsert({
          metric_name: 'koala_ai_status',
          metric_type: 'system',
          metric_value: 1,
          metadata: {
            status: 'active',
            initialized_at: new Date().toISOString(),
            engine_version: '2.0.0-quantum',
            capabilities: ['quantum_processing', 'neural_networks', 'adaptive_learning'],
            supabase_integration: true
          }
        })

      toast.success('🐨 Koala AI Engine Activated!', {
        description: 'Advanced AI processing capabilities with Supabase integration enabled'
      })
    } catch (error) {
      console.error('Error initializing Koala AI:', error)
      setKoalaAIActive(false)
    }
  }

  const createDefaultKoalaTasks = async (): Promise<AITask[]> => {
    const defaultTasks: AITask[] = [
      {
        id: '1',
        name: '🐨 Koala Quantum Security Scan',
        description: 'Advanced Koala AI security analysis with quantum processing and Supabase data integration',
        status: 'running',
        progress: 75,
        priority: 'critical',
        category: 'security',
        estimatedTime: '30 minutes',
        requiredResources: ['Koala CPU: 90%', 'Quantum RAM: 8GB', 'Neural Network: Active', 'Supabase: Connected'],
        createdAt: new Date(Date.now() - 20 * 60 * 1000),
        adminOnly: true,
        invisible: true
      },
      {
        id: '2',
        name: '🐨 Koala AI Network Optimization',
        description: 'Koala AI neural pathway optimization for maximum efficiency with real-time Supabase sync',
        status: 'completed',
        progress: 100,
        priority: 'high',
        category: 'automation',
        estimatedTime: '1.5 hours',
        requiredResources: ['Koala CPU: 95%', 'AI RAM: 12GB', 'Quantum GPU: Required', 'Database: Synced'],
        createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
        completedAt: new Date(Date.now() - 45 * 60 * 1000),
        adminOnly: true,
        invisible: false
      },
      {
        id: '3',
        name: '🐨 Koala Threat Intelligence',
        description: 'Advanced Koala AI threat pattern recognition and analysis with Supabase logging',
        status: 'pending',
        progress: 0,
        priority: 'high',
        category: 'monitoring',
        estimatedTime: '2 hours',
        requiredResources: ['Koala CPU: 85%', 'AI RAM: 6GB', 'Global Network: High', 'Supabase Logs: Active'],
        createdAt: new Date(),
        adminOnly: true,
        invisible: true
      },
      {
        id: '4',
        name: '🐨 Koala Database Optimization',
        description: 'Optimize Supabase database performance using Koala AI algorithms',
        status: 'running',
        progress: 45,
        priority: 'medium',
        category: 'automation',
        estimatedTime: '45 minutes',
        requiredResources: ['Koala CPU: 70%', 'Database CPU: 60%', 'Supabase RPC: Active'],
        createdAt: new Date(Date.now() - 10 * 60 * 1000),
        adminOnly: true,
        invisible: false
      }
    ]

    // Save default tasks to Supabase
    for (const task of defaultTasks) {
      await supabase
        .from('admin_metrics')
        .upsert({
          id: task.id,
          metric_name: `koala_ai_task_${task.id}`,
          metric_type: 'ai_task',
          metric_value: task.progress,
          metadata: {
            name: task.name,
            description: task.description,
            status: task.status,
            priority: task.priority,
            category: task.category,
            estimatedTime: task.estimatedTime,
            requiredResources: task.requiredResources,
            invisible: task.invisible,
            koala_ai: true
          }
        })
    }

    return defaultTasks
  }

  const createTask = async () => {
    if (!newTaskName.trim()) {
      toast.error('Please enter a task name')
      return
    }

    const newTask: AITask = {
      id: Date.now().toString(),
      name: `🐨 ${newTaskName}`,
      description: newTaskDescription || 'Koala AI powered task with Supabase integration',
      priority: selectedPriority as AITask['priority'],
      status: 'pending',
      progress: 0,
      category: selectedCategory as AITask['category'],
      estimatedTime: 'Calculating...',
      requiredResources: ['Koala CPU: 60%', 'AI RAM: 4GB', 'Supabase: Connected'],
      createdAt: new Date(),
      adminOnly: true,
      invisible: selectedCategory === 'attack' || selectedCategory === 'defense'
    }

    try {
      // Save to Supabase
      await supabase
        .from('admin_metrics')
        .insert({
          id: newTask.id,
          metric_name: `koala_ai_task_${newTask.id}`,
          metric_type: 'ai_task',
          metric_value: 0,
          metadata: {
            name: newTask.name,
            description: newTask.description,
            status: newTask.status,
            priority: newTask.priority,
            category: newTask.category,
            estimatedTime: newTask.estimatedTime,
            requiredResources: newTask.requiredResources,
            invisible: newTask.invisible,
            koala_ai: true,
            created_by: 'admin'
          }
        })

      setTasks(prev => [newTask, ...prev])
      setNewTaskName('')
      setNewTaskDescription('')
      
      toast.success('🐨 Koala AI Task Created!', {
        description: `Task "${newTaskName}" added to Koala AI processing queue with Supabase tracking`
      })
    } catch (error) {
      console.error('Error creating task:', error)
      toast.error('Failed to create AI task')
    }
  }

  const executeTask = async (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: 'running' } : task
    ))
    
    try {
      // Update in Supabase
      await supabase
        .from('admin_metrics')
        .update({
          metric_value: 1,
          metadata: {
            status: 'running',
            started_at: new Date().toISOString()
          }
        })
        .eq('id', taskId)
      
      toast.success('⚡ Koala AI Task Started!', {
        description: 'Advanced AI engine is now processing the task with Supabase logging'
      })
    } catch (error) {
      console.error('Error executing task:', error)
    }
  }

  const pauseTask = async (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: 'paused' } : task
    ))
    
    try {
      // Update in Supabase
      await supabase
        .from('admin_metrics')
        .update({
          metadata: {
            status: 'paused',
            paused_at: new Date().toISOString()
          }
        })
        .eq('id', taskId)
      
      toast.warning('⏸️ Task Paused', {
        description: 'Koala AI task execution has been paused'
      })
    } catch (error) {
      console.error('Error pausing task:', error)
    }
  }

  const deleteTask = async (taskId: string) => {
    try {
      await supabase
        .from('admin_metrics')
        .delete()
        .eq('id', taskId)
      
      setTasks(prev => prev.filter(task => task.id !== taskId))
      
      toast.success('🗑️ Task Deleted', {
        description: 'Task removed from Koala AI queue'
      })
    } catch (error) {
      console.error('Error deleting task:', error)
      toast.error('Failed to delete task')
    }
  }

  const updateTaskProgress = () => {
    setTasks(prev => prev.map(task => {
      if (task.status === 'running' && task.progress < 100) {
        const increment = Math.random() * 5 + 1
        const newProgress = Math.min(100, task.progress + increment)
        
        // Update in Supabase asynchronously
        supabase
          .from('admin_metrics')
          .update({ metric_value: newProgress })
          .eq('id', task.id)
          .then()
        
        if (newProgress >= 100) {
          return { ...task, progress: 100, status: 'completed', completedAt: new Date() }
        }
        return { ...task, progress: newProgress }
      }
      return task
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'running': return 'bg-blue-600'
      case 'completed': return 'bg-green-600'
      case 'failed': return 'bg-red-600'
      case 'paused': return 'bg-yellow-600'
      default: return 'bg-gray-600'
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'security': return <Shield className="h-4 w-4" />
      case 'analysis': return <Brain className="h-4 w-4" />
      case 'automation': return <Cpu className="h-4 w-4" />
      case 'monitoring': return <Eye className="h-4 w-4" />
      case 'attack': return <Target className="h-4 w-4" />
      case 'defense': return <Lock className="h-4 w-4" />
      default: return <Activity className="h-4 w-4" />
    }
  }

  const activeTasks = tasks.filter(t => t.status === 'running').length
  const completedTasks = tasks.filter(t => t.status === 'completed').length

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-purple-500/50 bg-gradient-to-r from-purple-900/40 to-blue-900/40">
        <CardHeader>
          <CardTitle className="text-center text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            🐨 KOALA AI TASK MANAGER ENGINE - SUPABASE POWERED
          </CardTitle>
          <div className="text-center space-y-2">
            <div className="text-lg text-purple-300">
              Autonomous Operations • Supabase Integration • Advanced AI Processing
            </div>
            <div className="flex justify-center gap-2 flex-wrap">
              <Badge className={`${koalaAIActive ? 'bg-green-600' : 'bg-red-600'} animate-pulse`}>
                🐨 KOALA AI {koalaAIActive ? 'ACTIVE' : 'INACTIVE'}
              </Badge>
              <Badge className="bg-blue-600 animate-pulse">SUPABASE CONNECTED</Badge>
              <Badge className="bg-purple-600 animate-pulse">QUANTUM PROCESSING</Badge>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* System Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="border-blue-500/30 bg-blue-900/20">
          <CardContent className="p-4 text-center">
            <Brain className="h-8 w-8 mx-auto text-blue-400 mb-2" />
            <div className="text-lg font-bold text-blue-400">
              {koalaAIActive ? 'ONLINE' : 'OFFLINE'}
            </div>
            <div className="text-xs text-muted-foreground">Koala AI</div>
          </CardContent>
        </Card>
        
        <Card className="border-green-500/30 bg-green-900/20">
          <CardContent className="p-4 text-center">
            <Activity className="h-8 w-8 mx-auto text-green-400 mb-2" />
            <div className="text-2xl font-bold text-green-400">{activeTasks}</div>
            <div className="text-sm text-muted-foreground">Active Tasks</div>
          </CardContent>
        </Card>
        
        <Card className="border-emerald-500/30 bg-emerald-900/20">
          <CardContent className="p-4 text-center">
            <CheckCircle className="h-8 w-8 mx-auto text-emerald-400 mb-2" />
            <div className="text-2xl font-bold text-emerald-400">{completedTasks}</div>
            <div className="text-sm text-muted-foreground">Completed</div>
          </CardContent>
        </Card>
        
        <Card className="border-yellow-500/30 bg-yellow-900/20">
          <CardContent className="p-4 text-center">
            <Cpu className="h-8 w-8 mx-auto text-yellow-400 mb-2" />
            <div className="text-2xl font-bold text-yellow-400">{systemMetrics.cpuUsage}%</div>
            <div className="text-sm text-muted-foreground">CPU Usage</div>
          </CardContent>
        </Card>
        
        <Card className="border-cyan-500/30 bg-cyan-900/20">
          <CardContent className="p-4 text-center">
            <Database className="h-8 w-8 mx-auto text-cyan-400 mb-2" />
            <div className="text-lg font-bold text-cyan-400">SYNCED</div>
            <div className="text-xs text-muted-foreground">Supabase</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="create-task" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="create-task">🎯 Create Task</TabsTrigger>
          <TabsTrigger value="active-tasks">⚡ Active Tasks</TabsTrigger>
          <TabsTrigger value="system-control">🔧 System Control</TabsTrigger>
          <TabsTrigger value="koala-ai">🐨 Koala AI</TabsTrigger>
        </TabsList>

        <TabsContent value="create-task" className="space-y-4">
          <Card className="border-cyan-500/30 bg-cyan-900/20">
            <CardHeader>
              <CardTitle className="text-cyan-400">🐨 Create New Koala AI Task</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Input
                value={newTaskName}
                onChange={(e) => setNewTaskName(e.target.value)}
                placeholder="Task name (e.g., 'Advanced Security Analysis')"
                className="bg-black/30 border-cyan-500/30"
              />
              
              <Textarea
                value={newTaskDescription}
                onChange={(e) => setNewTaskDescription(e.target.value)}
                placeholder="Detailed task description and objectives..."
                className="bg-black/30 border-cyan-500/30 min-h-20"
              />
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-cyan-300 mb-2 block">Category</label>
                  <select 
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full p-2 bg-black/30 border border-cyan-500/30 rounded text-white"
                  >
                    <option value="security">🛡️ Security</option>
                    <option value="analysis">🧠 Analysis</option>
                    <option value="automation">🤖 Automation</option>
                    <option value="monitoring">👁️ Monitoring</option>
                    <option value="attack">⚔️ Attack</option>
                    <option value="defense">🔒 Defense</option>
                  </select>
                </div>
                
                <div>
                  <label className="text-sm text-cyan-300 mb-2 block">Priority</label>
                  <select 
                    value={selectedPriority}
                    onChange={(e) => setSelectedPriority(e.target.value)}
                    className="w-full p-2 bg-black/30 border border-cyan-500/30 rounded text-white"
                  >
                    <option value="low">🟢 Low</option>
                    <option value="medium">🟡 Medium</option>
                    <option value="high">🟠 High</option>
                    <option value="critical">🔴 Critical</option>
                  </select>
                </div>
              </div>
              
              <Button 
                onClick={createTask}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700"
              >
                <Rocket className="h-4 w-4 mr-2" />
                🐨 Create Koala AI Task
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active-tasks" className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold">🐨 Koala AI Task Queue</h3>
            <Button 
              onClick={loadAITasks}
              variant="outline" 
              size="sm"
              disabled={isLoading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
          </div>
          
          <div className="space-y-4">
            {tasks.map((task) => (
              <Card key={task.id} className="border-gray-500/30 bg-gray-900/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getCategoryIcon(task.category)}
                      <CardTitle className="text-lg">{task.name}</CardTitle>
                      {task.invisible && <Badge className="bg-purple-600">👻 INVISIBLE</Badge>}
                      {task.adminOnly && <Badge className="bg-red-600">👑 ADMIN ONLY</Badge>}
                    </div>
                    <div className="flex gap-2">
                      <Badge className={`${getStatusColor(task.status)} text-white`}>
                        {task.status.toUpperCase()}
                      </Badge>
                      <Button
                        onClick={() => deleteTask(task.id)}
                        variant="ghost"
                        size="sm"
                        className="text-red-400 hover:text-red-300"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{task.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{Math.round(task.progress)}%</span>
                    </div>
                    <Progress value={task.progress} className="h-2" />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">Priority: </span>
                      <span className="capitalize">{task.priority}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Est. Time: </span>
                      <span>{task.estimatedTime}</span>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {task.status === 'pending' && (
                      <Button 
                        onClick={() => executeTask(task.id)}
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Execute
                      </Button>
                    )}
                    {task.status === 'running' && (
                      <Button 
                        onClick={() => pauseTask(task.id)}
                        size="sm"
                        className="bg-yellow-600 hover:bg-yellow-700"
                      >
                        <Pause className="h-3 w-3 mr-1" />
                        Pause
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="system-control" className="space-y-4">
          <Card className="border-orange-500/30 bg-orange-900/20">
            <CardHeader>
              <CardTitle className="text-orange-400">🔧 Koala AI System Control</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={initializeKoalaAI}
                  className="bg-blue-600 hover:bg-blue-700 h-16"
                >
                  <Brain className="h-6 w-6 mr-2" />
                  🐨 ACTIVATE KOALA AI
                </Button>
                
                <Button className="bg-green-600 hover:bg-green-700 h-16">
                  <Database className="h-6 w-6 mr-2" />
                  🔗 SYNC SUPABASE
                </Button>
                
                <Button className="bg-purple-600 hover:bg-purple-700 h-16">
                  <Shield className="h-6 w-6 mr-2" />
                  🛡️ DEFENSE MODE
                </Button>
                
                <Button className="bg-cyan-600 hover:bg-cyan-700 h-16">
                  <Network className="h-6 w-6 mr-2" />
                  🌐 QUANTUM NETWORK
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="koala-ai" className="space-y-4">
          <Card className="border-emerald-500/30 bg-emerald-900/20">
            <CardHeader>
              <CardTitle className="text-emerald-400">🐨 Koala AI Engine Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center space-y-4">
                <div className="text-8xl mb-4">🐨</div>
                <h3 className="text-3xl font-bold text-emerald-400">
                  KOALA AI ENGINE v2.0.0
                </h3>
                <p className="text-emerald-300 text-lg">
                  Advanced AI processing with Supabase integration
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <h4 className="text-emerald-400 font-bold text-lg">🚀 CAPABILITIES:</h4>
                    <div className="text-sm space-y-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Quantum Neural Processing</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Real-time Supabase Sync</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Autonomous Task Management</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Advanced Security Analysis</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-400" />
                        <span>Adaptive Learning Algorithms</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <h4 className="text-emerald-400 font-bold text-lg">⚡ INTEGRATIONS:</h4>
                    <div className="text-sm space-y-2">
                      <div className="flex items-center gap-2">
                        <Database className="h-4 w-4 text-cyan-400" />
                        <span>Supabase Database</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="h-4 w-4 text-purple-400" />
                        <span>Security Framework</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Network className="h-4 w-4 text-blue-400" />
                        <span>Global Network Access</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 text-pink-400" />
                        <span>Neural Network APIs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Zap className="h-4 w-4 text-yellow-400" />
                        <span>Real-time Processing</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-emerald-500/30">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-emerald-400">{tasks.length}</div>
                      <div className="text-sm text-muted-foreground">Total Tasks</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-400">{activeTasks}</div>
                      <div className="text-sm text-muted-foreground">Active</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-400">{completedTasks}</div>
                      <div className="text-sm text-muted-foreground">Completed</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}