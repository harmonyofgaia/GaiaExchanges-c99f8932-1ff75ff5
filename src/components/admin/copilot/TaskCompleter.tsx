import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  CheckCircle, AlertCircle, Clock, Play, Pause, RotateCcw,
  Zap, Settings, ArrowRight, Bot, Wrench, CheckSquare,
  XCircle, RefreshCw, Target, ListChecks
} from 'lucide-react'
import { toast } from 'sonner'

interface TaskCompleterProps {
  toolName: string
  toolId: string
}

interface Task {
  id: string
  name: string
  description: string
  status: 'pending' | 'running' | 'completed' | 'failed' | 'retrying'
  progress: number
  estimatedTime?: string
  startTime?: Date
  endTime?: Date
  errorMessage?: string
  autoRetry: boolean
  dependencies?: string[]
  suggestion?: string
}

interface MissingStep {
  id: string
  name: string
  description: string
  importance: 'high' | 'medium' | 'low'
  canAutomate: boolean
  estimatedTime: string
}

export function TaskCompleter({ toolName, toolId }: TaskCompleterProps) {
  const [tasks, setTasks] = useState<Task[]>([])
  const [missingSteps, setMissingSteps] = useState<MissingStep[]>([])
  const [isAutoMode, setIsAutoMode] = useState(false)
  const [isScanning, setIsScanning] = useState(false)

  useEffect(() => {
    initializeTasks()
    scanForMissingSteps()
  }, [toolName, toolId])

  // Auto-run tasks in auto mode
  useEffect(() => {
    if (!isAutoMode) return

    const interval = setInterval(() => {
      const pendingTasks = tasks.filter(task => task.status === 'pending')
      if (pendingTasks.length > 0) {
        executeTask(pendingTasks[0].id)
      }
    }, 3000)

    return () => clearInterval(interval)
  }, [isAutoMode, tasks])

  const initializeTasks = () => {
    const sampleTasks: Task[] = [
      {
        id: '1',
        name: 'Database Connection Check',
        description: 'Verify database connectivity and pool status',
        status: Math.random() > 0.7 ? 'completed' : 'pending',
        progress: Math.random() > 0.7 ? 100 : 0,
        estimatedTime: '30s',
        autoRetry: true,
        dependencies: []
      },
      {
        id: '2',
        name: 'Security Token Validation',
        description: 'Validate all active security tokens and permissions',
        status: Math.random() > 0.5 ? 'completed' : 'pending',
        progress: Math.random() > 0.5 ? 100 : 0,
        estimatedTime: '45s',
        autoRetry: true,
        dependencies: ['1']
      },
      {
        id: '3',
        name: 'Cache Warm-up',
        description: 'Pre-load frequently accessed data into cache',
        status: 'pending',
        progress: 0,
        estimatedTime: '2m',
        autoRetry: false,
        dependencies: ['1', '2']
      },
      {
        id: '4',
        name: 'System Health Verification',
        description: 'Run comprehensive system health checks',
        status: Math.random() > 0.8 ? 'failed' : 'pending',
        progress: Math.random() > 0.8 ? 25 : 0,
        estimatedTime: '1m',
        autoRetry: true,
        errorMessage: Math.random() > 0.8 ? 'Service unavailable - timeout after 30s' : undefined,
        suggestion: Math.random() > 0.8 ? 'Increase timeout to 60s and retry with exponential backoff' : undefined,
        dependencies: ['1', '2', '3']
      }
    ]
    setTasks(sampleTasks)
  }

  const scanForMissingSteps = () => {
    setIsScanning(true)
    
    setTimeout(() => {
      const missings: MissingStep[] = [
        {
          id: 'm1',
          name: 'API Rate Limit Setup',
          description: 'Configure rate limiting for API endpoints to prevent abuse',
          importance: 'high',
          canAutomate: true,
          estimatedTime: '5m'
        },
        {
          id: 'm2',
          name: 'Error Recovery Procedures',
          description: 'Implement automatic error recovery and rollback mechanisms',
          importance: 'high',
          canAutomate: true,
          estimatedTime: '10m'
        },
        {
          id: 'm3',
          name: 'Performance Monitoring',
          description: 'Add performance monitoring and alerting thresholds',
          importance: 'medium',
          canAutomate: true,
          estimatedTime: '7m'
        },
        {
          id: 'm4',
          name: 'Documentation Update',
          description: 'Update system documentation with recent changes',
          importance: 'low',
          canAutomate: false,
          estimatedTime: '15m'
        }
      ]
      setMissingSteps(missings)
      setIsScanning(false)
    }, 2000)
  }

  const executeTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId)
    if (!task || task.status === 'running') return

    // Check dependencies
    const missingDeps = task.dependencies?.filter(depId => {
      const dep = tasks.find(t => t.id === depId)
      return dep?.status !== 'completed'
    })

    if (missingDeps && missingDeps.length > 0) {
      toast.warning(`⏳ Cannot execute "${task.name}"`, {
        description: `Missing dependencies: ${missingDeps.length} task(s)`
      })
      return
    }

    setTasks(prev => prev.map(t => 
      t.id === taskId 
        ? { ...t, status: 'running', progress: 0, startTime: new Date() }
        : t
    ))

    toast.info(`🚀 Starting task: ${task.name}`)

    // Simulate task execution
    const duration = parseInt(task.estimatedTime?.replace(/[^0-9]/g, '') || '30') * 1000
    const updateInterval = duration / 20

    let progress = 0
    const progressInterval = setInterval(() => {
      progress += 5
      setTasks(prev => prev.map(t => 
        t.id === taskId ? { ...t, progress: Math.min(progress, 100) } : t
      ))
    }, updateInterval)

    setTimeout(() => {
      clearInterval(progressInterval)
      
      // Simulate success/failure
      const success = Math.random() > 0.15 // 85% success rate
      
      setTasks(prev => prev.map(t => 
        t.id === taskId 
          ? { 
              ...t, 
              status: success ? 'completed' : 'failed',
              progress: success ? 100 : Math.floor(Math.random() * 80) + 10,
              endTime: new Date(),
              errorMessage: success ? undefined : 'Unexpected error occurred during execution',
              suggestion: success ? undefined : 'Check system logs and retry with verbose logging enabled'
            }
          : t
      ))

      if (success) {
        toast.success(`✅ Task completed: ${task.name}`)
      } else {
        toast.error(`❌ Task failed: ${task.name}`, {
          description: 'Click to view error details and suggestions'
        })
        
        // Auto-retry if enabled
        if (task.autoRetry) {
          setTimeout(() => retryTask(taskId), 5000)
        }
      }
    }, duration)
  }

  const retryTask = (taskId: string) => {
    setTasks(prev => prev.map(t => 
      t.id === taskId 
        ? { ...t, status: 'retrying', progress: 0, errorMessage: undefined }
        : t
    ))
    
    setTimeout(() => executeTask(taskId), 1000)
  }

  const autoGenerateMissingStep = async (stepId: string) => {
    const step = missingSteps.find(s => s.id === stepId)
    if (!step || !step.canAutomate) return

    toast.info(`🤖 Auto-generating: ${step.name}`)

    // Create a new task for the missing step
    const newTask: Task = {
      id: `auto-${Date.now()}`,
      name: `Auto-Fix: ${step.name}`,
      description: step.description,
      status: 'pending',
      progress: 0,
      estimatedTime: step.estimatedTime,
      autoRetry: true,
      dependencies: []
    }

    setTasks(prev => [...prev, newTask])
    setMissingSteps(prev => prev.filter(s => s.id !== stepId))

    // Auto-execute if in auto mode
    if (isAutoMode) {
      setTimeout(() => executeTask(newTask.id), 1000)
    }

    toast.success(`✨ Generated auto-fix task for: ${step.name}`)
  }

  const getStatusIcon = (status: Task['status']) => {
    switch (status) {
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-400" />
      case 'running': return <RefreshCw className="h-4 w-4 text-blue-400 animate-spin" />
      case 'failed': return <XCircle className="h-4 w-4 text-red-400" />
      case 'retrying': return <RotateCcw className="h-4 w-4 text-yellow-400 animate-spin" />
      default: return <Clock className="h-4 w-4 text-gray-400" />
    }
  }

  const getStatusColor = (status: Task['status']) => {
    switch (status) {
      case 'completed': return 'border-green-500/50'
      case 'running': return 'border-blue-500/50'
      case 'failed': return 'border-red-500/50'
      case 'retrying': return 'border-yellow-500/50'
      default: return 'border-gray-500/50'
    }
  }

  const getImportanceColor = (importance: MissingStep['importance']) => {
    switch (importance) {
      case 'high': return 'text-red-400 border-red-400'
      case 'medium': return 'text-yellow-400 border-yellow-400'
      case 'low': return 'text-green-400 border-green-400'
    }
  }

  const completedTasks = tasks.filter(t => t.status === 'completed').length
  const totalTasks = tasks.length
  const overallProgress = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0

  return (
    <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/10 to-purple-900/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Bot className="h-5 w-5" />
            🤖 Task Completer: {toolName}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsAutoMode(!isAutoMode)}
              className={`border-blue-500/30 ${isAutoMode ? 'bg-blue-600/20' : ''}`}
            >
              <Zap className="h-4 w-4 mr-1" />
              {isAutoMode ? 'Auto ON' : 'Auto OFF'}
            </Button>
            <Button
              size="sm"
              onClick={scanForMissingSteps}
              disabled={isScanning}
              className="bg-purple-600 hover:bg-purple-700"
            >
              {isScanning ? <RefreshCw className="h-4 w-4 animate-spin mr-1" /> : <Target className="h-4 w-4 mr-1" />}
              Scan
            </Button>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-400">Overall Progress</span>
            <span className="text-blue-400">{completedTasks}/{totalTasks} tasks</span>
          </div>
          <Progress value={overallProgress} className="h-2" />
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="tasks" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="tasks">🎯 Active Tasks</TabsTrigger>
            <TabsTrigger value="missing">⚡ Missing Steps</TabsTrigger>
            <TabsTrigger value="completed">✅ Completed</TabsTrigger>
          </TabsList>

          <TabsContent value="tasks" className="space-y-3">
            {tasks.filter(t => t.status !== 'completed').map((task) => (
              <Card key={task.id} className={`border ${getStatusColor(task.status)}`}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(task.status)}
                      <span className="font-medium text-white">{task.name}</span>
                      <Badge variant="outline" className="text-xs">
                        {task.estimatedTime}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2">
                      {task.status === 'pending' && (
                        <Button
                          size="sm"
                          onClick={() => executeTask(task.id)}
                          className="bg-blue-600 hover:bg-blue-700"
                        >
                          <Play className="h-3 w-3 mr-1" />
                          Start
                        </Button>
                      )}
                      {task.status === 'failed' && (
                        <Button
                          size="sm"
                          onClick={() => retryTask(task.id)}
                          className="bg-yellow-600 hover:bg-yellow-700"
                        >
                          <RotateCcw className="h-3 w-3 mr-1" />
                          Retry
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm text-gray-400 mb-2">{task.description}</p>
                  
                  {task.progress > 0 && (
                    <div className="space-y-1 mb-2">
                      <div className="flex justify-between text-xs">
                        <span className="text-gray-500">Progress</span>
                        <span className="text-blue-400">{task.progress.toFixed(0)}%</span>
                      </div>
                      <Progress value={task.progress} className="h-1" />
                    </div>
                  )}

                  {task.dependencies && task.dependencies.length > 0 && (
                    <div className="text-xs text-gray-500 mb-2">
                      <span>Dependencies: {task.dependencies.join(', ')}</span>
                    </div>
                  )}

                  {task.errorMessage && (
                    <div className="bg-red-900/20 border border-red-500/30 rounded p-2 mb-2">
                      <p className="text-xs text-red-400">{task.errorMessage}</p>
                      {task.suggestion && (
                        <p className="text-xs text-yellow-400 mt-1">
                          💡 Suggestion: {task.suggestion}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="missing" className="space-y-3">
            {isScanning ? (
              <Card className="border-blue-500/30">
                <CardContent className="p-4 text-center">
                  <RefreshCw className="h-8 w-8 text-blue-400 mx-auto mb-2 animate-spin" />
                  <p className="text-blue-400">Scanning for missing steps...</p>
                </CardContent>
              </Card>
            ) : (
              missingSteps.map((step) => (
                <Card key={step.id} className={`border ${getImportanceColor(step.importance)}`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <Wrench className="h-4 w-4 text-orange-400" />
                        <span className="font-medium text-white">{step.name}</span>
                        <Badge variant="outline" className={getImportanceColor(step.importance)}>
                          {step.importance.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {step.estimatedTime}
                        </Badge>
                        {step.canAutomate && (
                          <Button
                            size="sm"
                            onClick={() => autoGenerateMissingStep(step.id)}
                            className="bg-purple-600 hover:bg-purple-700"
                          >
                            <Bot className="h-3 w-3 mr-1" />
                            Auto-Fix
                          </Button>
                        )}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">{step.description}</p>
                    {!step.canAutomate && (
                      <p className="text-xs text-yellow-400 mt-2">
                        ⚠️ Manual intervention required
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>

          <TabsContent value="completed" className="space-y-3">
            {tasks.filter(t => t.status === 'completed').map((task) => (
              <Card key={task.id} className="border-green-500/30">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-400" />
                      <span className="font-medium text-white">{task.name}</span>
                      <Badge variant="outline" className="text-green-400 border-green-400">
                        COMPLETED
                      </Badge>
                    </div>
                    {task.endTime && (
                      <span className="text-xs text-gray-500">
                        {task.endTime.toLocaleTimeString()}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-400 mt-1">{task.description}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}