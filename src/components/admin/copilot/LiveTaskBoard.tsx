import React, { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  Activity, Play, Pause, RotateCcw, CheckCircle, XCircle,
  Clock, AlertTriangle, Bot, Zap, Settings, Eye, Trash2,
  Plus, Search, Filter, TrendingUp, Users, Server
} from 'lucide-react'
import { toast } from 'sonner'

interface LiveTask {
  id: string
  name: string
  description: string
  status: 'pending' | 'running' | 'completed' | 'failed' | 'paused' | 'cancelled'
  progress: number
  tool: string
  category: 'database' | 'security' | 'performance' | 'maintenance' | 'user' | 'system'
  priority: 'low' | 'medium' | 'high' | 'critical'
  startTime?: Date
  endTime?: Date
  estimatedDuration: number // in seconds
  actualDuration?: number
  errorMessage?: string
  suggestion?: string
  autoRetryCount: number
  maxRetries: number
  dependencies: string[]
  assignedTo: string
  logs: TaskLog[]
}

interface TaskLog {
  id: string
  timestamp: Date
  level: 'info' | 'warn' | 'error' | 'debug'
  message: string
}

interface TaskSuggestion {
  id: string
  taskId: string
  type: 'parameter_adjustment' | 'retry_strategy' | 'dependency_fix' | 'resource_allocation'
  title: string
  description: string
  confidence: number
  estimated_fix_time: string
  auto_applicable: boolean
}

interface TaskMetrics {
  totalTasks: number
  runningTasks: number
  completedTasks: number
  failedTasks: number
  averageSuccessRate: number
  averageExecutionTime: number
  totalExecutionTime: number
}

export function LiveTaskBoard() {
  const [tasks, setTasks] = useState<LiveTask[]>([])
  const [suggestions, setSuggestions] = useState<TaskSuggestion[]>([])
  const [metrics, setMetrics] = useState<TaskMetrics | null>(null)
  const [selectedTask, setSelectedTask] = useState<LiveTask | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [isAutoMode, setIsAutoMode] = useState(true)

  useEffect(() => {
    initializeTasks()
    const interval = setInterval(updateTaskProgress, 2000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    updateMetrics()
  }, [updateMetrics])

  useEffect(() => {
    if (isAutoMode) {
      const interval = setInterval(autoProcessTasks, 5000)
      return () => clearInterval(interval)
    }
  }, [isAutoMode, autoProcessTasks])

  const initializeTasks = () => {
    const mockTasks: LiveTask[] = [
      {
        id: '1',
        name: 'Database Cleanup',
        description: 'Remove orphaned records and optimize tables',
        status: 'running',
        progress: 35,
        tool: 'Database Inspector',
        category: 'database',
        priority: 'high',
        startTime: new Date(Date.now() - 180000),
        estimatedDuration: 600,
        autoRetryCount: 0,
        maxRetries: 3,
        dependencies: [],
        assignedTo: 'system',
        logs: [
          {
            id: '1',
            timestamp: new Date(Date.now() - 120000),
            level: 'info',
            message: 'Starting database cleanup process'
          },
          {
            id: '2',
            timestamp: new Date(Date.now() - 60000),
            level: 'info',
            message: 'Analyzing table structures'
          }
        ]
      },
      {
        id: '2',
        name: 'Security Scan',
        description: 'Full system security vulnerability assessment',
        status: 'pending',
        progress: 0,
        tool: 'Security Center',
        category: 'security',
        priority: 'critical',
        estimatedDuration: 900,
        autoRetryCount: 0,
        maxRetries: 2,
        dependencies: ['1'],
        assignedTo: 'admin',
        logs: []
      },
      {
        id: '3',
        name: 'Performance Optimization',
        description: 'Optimize system performance and resource usage',
        status: 'failed',
        progress: 15,
        tool: 'Performance Monitor',
        category: 'performance',
        priority: 'medium',
        startTime: new Date(Date.now() - 300000),
        endTime: new Date(Date.now() - 240000),
        estimatedDuration: 450,
        actualDuration: 60,
        errorMessage: 'Memory allocation failed during optimization',
        suggestion: 'Increase available memory and retry with smaller batch size',
        autoRetryCount: 2,
        maxRetries: 3,
        dependencies: [],
        assignedTo: 'system',
        logs: [
          {
            id: '3',
            timestamp: new Date(Date.now() - 280000),
            level: 'info',
            message: 'Starting performance optimization'
          },
          {
            id: '4',
            timestamp: new Date(Date.now() - 240000),
            level: 'error',
            message: 'Memory allocation failed'
          }
        ]
      },
      {
        id: '4',
        name: 'User Data Sync',
        description: 'Synchronize user data across all services',
        status: 'completed',
        progress: 100,
        tool: 'User Management',
        category: 'user',
        priority: 'low',
        startTime: new Date(Date.now() - 900000),
        endTime: new Date(Date.now() - 780000),
        estimatedDuration: 120,
        actualDuration: 120,
        autoRetryCount: 0,
        maxRetries: 2,
        dependencies: [],
        assignedTo: 'scheduler',
        logs: [
          {
            id: '5',
            timestamp: new Date(Date.now() - 900000),
            level: 'info',
            message: 'Starting user data synchronization'
          },
          {
            id: '6',
            timestamp: new Date(Date.now() - 780000),
            level: 'info',
            message: 'User data sync completed successfully'
          }
        ]
      }
    ]

    setTasks(mockTasks)

    // Generate suggestions for failed tasks
    const mockSuggestions: TaskSuggestion[] = [
      {
        id: '1',
        taskId: '3',
        type: 'parameter_adjustment',
        title: 'Reduce Batch Size',
        description: 'Lower the batch size from 1000 to 500 to reduce memory pressure',
        confidence: 85,
        estimated_fix_time: '2 minutes',
        auto_applicable: true
      },
      {
        id: '2',
        taskId: '3',
        type: 'resource_allocation',
        title: 'Increase Memory Limit',
        description: 'Allocate additional 2GB memory for optimization process',
        confidence: 92,
        estimated_fix_time: '5 minutes',
        auto_applicable: true
      }
    ]

    setSuggestions(mockSuggestions)
  }

  const updateTaskProgress = () => {
    setTasks(prev => prev.map(task => {
      if (task.status === 'running') {
        const newProgress = Math.min(100, task.progress + Math.random() * 5)
        const updatedTask = { ...task, progress: newProgress }
        
        // Complete task when progress reaches 100%
        if (newProgress >= 100) {
          updatedTask.status = 'completed'
          updatedTask.endTime = new Date()
          updatedTask.actualDuration = task.startTime 
            ? (Date.now() - task.startTime.getTime()) / 1000 
            : task.estimatedDuration
          
          toast.success(`✅ Task completed: ${task.name}`)
        }
        
        return updatedTask
      }
      return task
    }))
  }

  const updateMetrics = useCallback(() => {
    const totalTasks = tasks.length
    const runningTasks = tasks.filter(t => t.status === 'running').length
    const completedTasks = tasks.filter(t => t.status === 'completed').length
    const failedTasks = tasks.filter(t => t.status === 'failed').length
    
    const completedWithDuration = tasks.filter(t => t.status === 'completed' && t.actualDuration)
    const averageExecutionTime = completedWithDuration.length > 0
      ? completedWithDuration.reduce((sum, t) => sum + (t.actualDuration || 0), 0) / completedWithDuration.length
      : 0

    const totalExecutionTime = tasks.reduce((sum, t) => sum + (t.actualDuration || 0), 0)
    const averageSuccessRate = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

    setMetrics({
      totalTasks,
      runningTasks,
      completedTasks,
      failedTasks,
      averageSuccessRate,
      averageExecutionTime,
      totalExecutionTime
    })
  }, [tasks])

  const autoProcessTasks = useCallback(() => {
    // Auto-start pending tasks that have no unfulfilled dependencies
    const pendingTasks = tasks.filter(t => t.status === 'pending')
    
    for (const task of pendingTasks) {
      const unfulfilledDeps = task.dependencies.filter(depId => {
        const dep = tasks.find(t => t.id === depId)
        return dep?.status !== 'completed'
      })
      
      if (unfulfilledDeps.length === 0) {
        startTask(task.id)
        break // Start one task at a time
      }
    }

    // Auto-retry failed tasks
    const failedTasks = tasks.filter(t => 
      t.status === 'failed' && 
      t.autoRetryCount < t.maxRetries &&
      suggestions.some(s => s.taskId === t.id && s.auto_applicable)
    )
    
    if (failedTasks.length > 0) {
      const task = failedTasks[0]
      const suggestion = suggestions.find(s => s.taskId === task.id && s.auto_applicable)
      if (suggestion) {
        applySuggestion(suggestion.id)
      }
    }
  }, [tasks, suggestions, startTask, applySuggestion])

  const startTask = useCallback((taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            status: 'running', 
            progress: 0, 
            startTime: new Date(),
            logs: [...task.logs, {
              id: Date.now().toString(),
              timestamp: new Date(),
              level: 'info',
              message: `Task started: ${task.name}`
            }]
          }
        : task
    ))
    
    const task = tasks.find(t => t.id === taskId)
    if (task) {
      toast.info(`🚀 Starting task: ${task.name}`)
    }
  }, [tasks])

  const pauseTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId && task.status === 'running'
        ? { 
            ...task, 
            status: 'paused',
            logs: [...task.logs, {
              id: Date.now().toString(),
              timestamp: new Date(),
              level: 'info',
              message: 'Task paused by user'
            }]
          }
        : task
    ))
    
    toast.info('⏸️ Task paused')
  }

  const resumeTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId && task.status === 'paused'
        ? { 
            ...task, 
            status: 'running',
            logs: [...task.logs, {
              id: Date.now().toString(),
              timestamp: new Date(),
              level: 'info',
              message: 'Task resumed by user'
            }]
          }
        : task
    ))
    
    toast.info('▶️ Task resumed')
  }

  const retryTask = useCallback((taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            status: 'running',
            progress: 0,
            startTime: new Date(),
            endTime: undefined,
            errorMessage: undefined,
            autoRetryCount: task.autoRetryCount + 1,
            logs: [...task.logs, {
              id: Date.now().toString(),
              timestamp: new Date(),
              level: 'info',
              message: `Task retry attempt ${task.autoRetryCount + 1}`
            }]
          }
        : task
    ))
    
    toast.info('🔄 Retrying task...')
  }, [])

  const cancelTask = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { 
            ...task, 
            status: 'cancelled',
            endTime: new Date(),
            logs: [...task.logs, {
              id: Date.now().toString(),
              timestamp: new Date(),
              level: 'warn',
              message: 'Task cancelled by user'
            }]
          }
        : task
    ))
    
    toast.warning('❌ Task cancelled')
  }

  const applySuggestion = useCallback((suggestionId: string) => {
    const suggestion = suggestions.find(s => s.id === suggestionId)
    if (!suggestion) return

    toast.info(`🤖 Applying suggestion: ${suggestion.title}`)

    // Simulate applying suggestion
    setTimeout(() => {
      // Remove the suggestion
      setSuggestions(prev => prev.filter(s => s.id !== suggestionId))
      
      // Retry the task
      retryTask(suggestion.taskId)
      
      toast.success('✨ Suggestion applied successfully')
    }, 1000)
  }, [suggestions, retryTask])

  const addCustomTask = (name: string, description: string, category: LiveTask['category']) => {
    const newTask: LiveTask = {
      id: Date.now().toString(),
      name,
      description,
      status: 'pending',
      progress: 0,
      tool: 'Manual',
      category,
      priority: 'medium',
      estimatedDuration: 300,
      autoRetryCount: 0,
      maxRetries: 2,
      dependencies: [],
      assignedTo: 'admin',
      logs: [{
        id: Date.now().toString(),
        timestamp: new Date(),
        level: 'info',
        message: 'Task created manually'
      }]
    }

    setTasks(prev => [...prev, newTask])
    toast.success('✅ Custom task added')
  }

  const getStatusIcon = (status: LiveTask['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'running': return <Activity className="h-4 w-4 text-blue-400 animate-pulse" />
      case 'failed': return <XCircle className="h-4 w-4 text-red-400" />
      case 'paused': return <Pause className="h-4 w-4 text-yellow-400" />
      case 'cancelled': return <XCircle className="h-4 w-4 text-gray-400" />
      default: return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: LiveTask['status']) => {
    switch (status) {
      case 'completed': return 'border-green-500/50'
      case 'running': return 'border-blue-500/50'
      case 'failed': return 'border-red-500/50'
      case 'paused': return 'border-yellow-500/50'
      case 'cancelled': return 'border-gray-500/50'
      default: return 'border-gray-500/50'
    }
  }

  const getPriorityColor = (priority: LiveTask['priority']) => {
    switch (priority) {
      case 'critical': return 'text-red-500 border-red-500'
      case 'high': return 'text-orange-500 border-orange-500'
      case 'medium': return 'text-yellow-500 border-yellow-500'
      case 'low': return 'text-green-500 border-green-500'
    }
  }

  const getCategoryIcon = (category: LiveTask['category']) => {
    switch (category) {
      case 'database': return '🗄️'
      case 'security': return '🔒'
      case 'performance': return '⚡'
      case 'maintenance': return '🔧'
      case 'user': return '👤'
      case 'system': return '⚙️'
    }
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.tool.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus
    const matchesCategory = filterCategory === 'all' || task.category === filterCategory
    
    return matchesSearch && matchesStatus && matchesCategory
  })

  return (
    <Card className="border-purple-500/30 bg-gradient-to-br from-purple-900/10 to-blue-900/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Activity className="h-5 w-5" />
            📋 Live Task Board
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsAutoMode(!isAutoMode)}
              className={`border-purple-500/30 ${isAutoMode ? 'bg-purple-600/20' : ''}`}
            >
              <Bot className="h-4 w-4 mr-1" />
              Auto {isAutoMode ? 'ON' : 'OFF'}
            </Button>
            <Button
              size="sm"
              onClick={() => {
                const name = prompt('Task name:')
                const description = prompt('Task description:')
                if (name && description) {
                  addCustomTask(name, description, 'system')
                }
              }}
              className="bg-purple-600 hover:bg-purple-700"
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Task
            </Button>
          </div>
        </div>
        {metrics && (
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-400">{metrics.totalTasks}</div>
              <div className="text-xs text-gray-400">Total</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-400">{metrics.runningTasks}</div>
              <div className="text-xs text-gray-400">Running</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-400">{metrics.completedTasks}</div>
              <div className="text-xs text-gray-400">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-400">{metrics.failedTasks}</div>
              <div className="text-xs text-gray-400">Failed</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-400">{metrics.averageSuccessRate.toFixed(0)}%</div>
              <div className="text-xs text-gray-400">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-cyan-400">{metrics.averageExecutionTime.toFixed(0)}s</div>
              <div className="text-xs text-gray-400">Avg Time</div>
            </div>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="tasks">🎯 Active Tasks ({tasks.filter(t => t.status !== 'completed').length})</TabsTrigger>
            <TabsTrigger value="suggestions" className="relative">
              💡 Suggestions ({suggestions.length})
              {suggestions.length > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-1">
                  {suggestions.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="completed">✅ Completed ({tasks.filter(t => t.status === 'completed').length})</TabsTrigger>
            <TabsTrigger value="metrics">📊 Metrics</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-4">
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <div className="flex items-center gap-2 flex-1">
                <Search className="h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search tasks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 bg-background border border-gray-600 rounded text-sm"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="running">Running</option>
                  <option value="failed">Failed</option>
                  <option value="paused">Paused</option>
                </select>
                <select
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                  className="px-3 py-2 bg-background border border-gray-600 rounded text-sm"
                >
                  <option value="all">All Categories</option>
                  <option value="database">Database</option>
                  <option value="security">Security</option>
                  <option value="performance">Performance</option>
                  <option value="maintenance">Maintenance</option>
                  <option value="user">User</option>
                  <option value="system">System</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              {filteredTasks.filter(t => t.status !== 'completed').map((task) => (
                <Card key={task.id} className={`border ${getStatusColor(task.status)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {getStatusIcon(task.status)}
                        <span className="font-medium text-white">{task.name}</span>
                        <Badge variant="outline" className={getPriorityColor(task.priority)}>
                          {task.priority.toUpperCase()}
                        </Badge>
                        <Badge variant="secondary">
                          {getCategoryIcon(task.category)} {task.category}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {task.tool}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-1">
                        {task.status === 'pending' && (
                          <Button
                            size="sm"
                            onClick={() => startTask(task.id)}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Play className="h-3 w-3" />
                          </Button>
                        )}
                        {task.status === 'running' && (
                          <Button
                            size="sm"
                            onClick={() => pauseTask(task.id)}
                            className="bg-yellow-600 hover:bg-yellow-700"
                          >
                            <Pause className="h-3 w-3" />
                          </Button>
                        )}
                        {task.status === 'paused' && (
                          <Button
                            size="sm"
                            onClick={() => resumeTask(task.id)}
                            className="bg-blue-600 hover:bg-blue-700"
                          >
                            <Play className="h-3 w-3" />
                          </Button>
                        )}
                        {task.status === 'failed' && (
                          <Button
                            size="sm"
                            onClick={() => retryTask(task.id)}
                            className="bg-orange-600 hover:bg-orange-700"
                          >
                            <RotateCcw className="h-3 w-3" />
                          </Button>
                        )}
                        {(task.status === 'running' || task.status === 'pending') && (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => cancelTask(task.id)}
                            className="border-red-500/30 text-red-400"
                          >
                            <XCircle className="h-3 w-3" />
                          </Button>
                        )}
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => setSelectedTask(task)}
                          className="border-gray-500/30"
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <p className="text-sm text-gray-300 mb-3">{task.description}</p>

                    {task.progress > 0 && (
                      <div className="space-y-1 mb-3">
                        <div className="flex justify-between text-xs">
                          <span className="text-gray-500">Progress</span>
                          <span className="text-blue-400">{task.progress.toFixed(0)}%</span>
                        </div>
                        <Progress value={task.progress} className="h-2" />
                      </div>
                    )}

                    {task.errorMessage && (
                      <div className="bg-red-900/20 border border-red-500/30 rounded p-2 mb-2">
                        <p className="text-xs text-red-400">{task.errorMessage}</p>
                        {task.suggestion && (
                          <p className="text-xs text-yellow-400 mt-1">
                            💡 {task.suggestion}
                          </p>
                        )}
                      </div>
                    )}

                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-4">
                        <span>Assigned to: {task.assignedTo}</span>
                        <span>Retries: {task.autoRetryCount}/{task.maxRetries}</span>
                        {task.startTime && (
                          <span>Started: {task.startTime.toLocaleTimeString()}</span>
                        )}
                      </div>
                      <span>Est: {task.estimatedDuration}s</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="suggestions" className="space-y-3">
            {suggestions.length === 0 ? (
              <Card className="border-green-500/30">
                <CardContent className="p-6 text-center">
                  <CheckCircle className="h-12 w-12 text-green-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-green-400 mb-2">No Suggestions Needed</h3>
                  <p className="text-gray-400">All tasks are running smoothly!</p>
                </CardContent>
              </Card>
            ) : (
              suggestions.map((suggestion) => {
                const task = tasks.find(t => t.id === suggestion.taskId)
                return (
                  <Card key={suggestion.id} className="border-yellow-500/30">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Bot className="h-4 w-4 text-yellow-400" />
                          <span className="font-medium text-white">{suggestion.title}</span>
                          <Badge variant="outline" className="text-yellow-400 border-yellow-400">
                            {suggestion.confidence}% confidence
                          </Badge>
                          {suggestion.auto_applicable && (
                            <Badge variant="outline" className="text-green-400 border-green-400">
                              AUTO-FIXABLE
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="secondary" className="text-xs">
                            {suggestion.estimated_fix_time}
                          </Badge>
                          {suggestion.auto_applicable && (
                            <Button
                              size="sm"
                              onClick={() => applySuggestion(suggestion.id)}
                              className="bg-yellow-600 hover:bg-yellow-700"
                            >
                              <Zap className="h-3 w-3 mr-1" />
                              Apply
                            </Button>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-gray-300 mb-2">{suggestion.description}</p>
                      {task && (
                        <p className="text-xs text-gray-500">
                          For task: {task.name} ({task.status})
                        </p>
                      )}
                    </CardContent>
                  </Card>
                )
              })
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-3">
            {tasks.filter(t => t.status === 'completed').map((task) => (
              <Card key={task.id} className="border-green-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="font-medium text-white">{task.name}</span>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        COMPLETED
                      </Badge>
                      <Badge variant="secondary">
                        {getCategoryIcon(task.category)} {task.category}
                      </Badge>
                    </div>
                    <div className="text-xs text-gray-500">
                      {task.actualDuration?.toFixed(0)}s / {task.estimatedDuration}s
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">{task.description}</p>
                  {task.endTime && (
                    <p className="text-xs text-gray-500 mt-2">
                      Completed: {task.endTime.toLocaleString()}
                    </p>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="metrics" className="space-y-4">
            {metrics && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <Card className="border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-sm text-blue-400">
                      <TrendingUp className="h-4 w-4 inline mr-2" />
                      Task Performance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Success Rate:</span>
                      <span className="text-xs text-green-400">{metrics.averageSuccessRate.toFixed(1)}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Avg Execution:</span>
                      <span className="text-xs text-blue-400">{metrics.averageExecutionTime.toFixed(0)}s</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Total Time:</span>
                      <span className="text-xs text-purple-400">{(metrics.totalExecutionTime / 60).toFixed(1)}m</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-green-500/30">
                  <CardHeader>
                    <CardTitle className="text-sm text-green-400">
                      <Activity className="h-4 w-4 inline mr-2" />
                      Task Status Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Running:</span>
                      <span className="text-xs text-blue-400">{metrics.runningTasks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Completed:</span>
                      <span className="text-xs text-green-400">{metrics.completedTasks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Failed:</span>
                      <span className="text-xs text-red-400">{metrics.failedTasks}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="text-sm text-purple-400">
                      <Server className="h-4 w-4 inline mr-2" />
                      System Load
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Active Tasks:</span>
                      <span className="text-xs text-purple-400">{metrics.runningTasks}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Queue Depth:</span>
                      <span className="text-xs text-yellow-400">{tasks.filter(t => t.status === 'pending').length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-xs text-gray-400">Auto Mode:</span>
                      <span className={`text-xs ${isAutoMode ? 'text-green-400' : 'text-red-400'}`}>
                        {isAutoMode ? 'ENABLED' : 'DISABLED'}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}