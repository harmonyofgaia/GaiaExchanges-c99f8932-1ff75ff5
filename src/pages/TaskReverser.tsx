
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { AdminReverseButton } from '@/components/admin/AdminReverseButton'
import { useSecureAdmin } from '@/hooks/useSecureAdmin'
import { 
  RotateCcw, 
  Trash2, 
  Star, 
  Settings, 
  History, 
  Filter,
  Search,
  ArrowLeft,
  ArrowRight,
  Check,
  X,
  AlertTriangle
} from 'lucide-react'
import { toast } from 'sonner'

interface Task {
  id: string
  name: string
  description: string
  category: string
  status: 'active' | 'inactive' | 'pending' | 'error'
  createdAt: Date
  lastModified: Date
  dependencies: string[]
  canReverse: boolean
  isFeatured: boolean
  impact: 'low' | 'medium' | 'high' | 'critical'
}

export default function TaskReverser() {
  const { isAdmin } = useSecureAdmin()
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      name: 'Artist Streaming Platform',
      description: 'Complete artist streaming system with upload and earnings',
      category: 'Feature',
      status: 'active',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      lastModified: new Date(Date.now() - 1 * 60 * 60 * 1000),
      dependencies: ['music-player', 'video-upload'],
      canReverse: true,
      isFeatured: true,
      impact: 'high'
    },
    {
      id: '2',
      name: 'Video Upload System',
      description: 'Video upload, storage, and streaming functionality',
      category: 'Feature',
      status: 'active',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      lastModified: new Date(Date.now() - 30 * 60 * 1000),
      dependencies: ['supabase-storage'],
      canReverse: true,
      isFeatured: true,
      impact: 'high'
    },
    {
      id: '3',
      name: 'Music Player Admin',
      description: 'Admin interface for music upload and management',
      category: 'Admin',
      status: 'error',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      lastModified: new Date(Date.now() - 2 * 60 * 60 * 1000),
      dependencies: ['admin-dashboard'],
      canReverse: true,
      isFeatured: false,
      impact: 'medium'
    },
    {
      id: '4',
      name: 'Wallet Integration',
      description: 'MetaMask and multi-wallet support',
      category: 'Integration',
      status: 'pending',
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
      lastModified: new Date(Date.now() - 3 * 60 * 60 * 1000),
      dependencies: ['web3-provider'],
      canReverse: true,
      isFeatured: false,
      impact: 'critical'
    },
    {
      id: '5',
      name: 'GitHub Integration',
      description: 'Python integration and development tools',
      category: 'Development',
      status: 'inactive',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      lastModified: new Date(Date.now() - 4 * 60 * 60 * 1000),
      dependencies: [],
      canReverse: false,
      isFeatured: false,
      impact: 'low'
    }
  ])

  const [selectedTasks, setSelectedTasks] = useState<string[]>([])
  const [filterCategory, setFilterCategory] = useState<string>('all')
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Redirect if not admin
  useEffect(() => {
    if (!isAdmin) {
      toast.error('Admin access required')
      window.location.href = '/admin'
    }
  }, [isAdmin])

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = filterCategory === 'all' || task.category.toLowerCase() === filterCategory.toLowerCase()
    const matchesStatus = filterStatus === 'all' || task.status === filterStatus
    
    return matchesSearch && matchesCategory && matchesStatus
  })

  const toggleTaskSelection = (taskId: string) => {
    setSelectedTasks(prev => 
      prev.includes(taskId) 
        ? prev.filter(id => id !== taskId)
        : [...prev, taskId]
    )
  }

  const selectAllTasks = () => {
    setSelectedTasks(filteredTasks.map(task => task.id))
  }

  const clearSelection = () => {
    setSelectedTasks([])
  }

  const reverseSelectedTasks = () => {
    if (selectedTasks.length === 0) {
      toast.error('No tasks selected')
      return
    }

    const reversibleTasks = selectedTasks.filter(id => {
      const task = tasks.find(t => t.id === id)
      return task?.canReverse
    })

    if (reversibleTasks.length === 0) {
      toast.error('Selected tasks cannot be reversed')
      return
    }

    toast.success(`🔄 Reversing ${reversibleTasks.length} tasks...`, {
      description: 'Tasks will be reverted to their previous state'
    })

    // Simulate reversal
    setTasks(prev => prev.map(task => 
      reversibleTasks.includes(task.id) 
        ? { ...task, status: 'inactive' as const, lastModified: new Date() }
        : task
    ))

    setSelectedTasks([])
  }

  const deleteSelectedTasks = () => {
    if (selectedTasks.length === 0) {
      toast.error('No tasks selected')
      return
    }

    const criticalTasks = selectedTasks.filter(id => {
      const task = tasks.find(t => t.id === id)
      return task?.impact === 'critical'
    })

    if (criticalTasks.length > 0) {
      toast.error('Cannot delete critical tasks')
      return
    }

    toast.success(`🗑️ Deleting ${selectedTasks.length} tasks...`)
    
    setTasks(prev => prev.filter(task => !selectedTasks.includes(task.id)))
    setSelectedTasks([])
  }

  const toggleTaskFeatured = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, isFeatured: !task.isFeatured, lastModified: new Date() }
        : task
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600'
      case 'inactive': return 'bg-gray-600'
      case 'pending': return 'bg-yellow-600'
      case 'error': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'low': return 'text-blue-400'
      case 'medium': return 'text-yellow-400'
      case 'high': return 'text-orange-400'
      case 'critical': return 'text-red-400'
      default: return 'text-gray-400'
    }
  }

  if (!isAdmin) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <AlertTriangle className="h-16 w-16 text-red-400 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-red-400">Access Denied</h1>
          <p className="text-muted-foreground">Admin privileges required</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <AdminReverseButton />
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent">
          🔄 TASK REVERSER - ULTIMATE CONTROL CENTER
        </h1>
        <p className="text-center text-muted-foreground mt-2">
          Granular control over every task, feature, and setting
        </p>
      </div>

      {/* Control Panel */}
      <Card className="mb-8 bg-gradient-to-br from-red-900/20 to-orange-900/20 border-red-500/30">
        <CardHeader>
          <CardTitle className="text-red-400 flex items-center gap-2">
            <Settings className="h-5 w-5" />
            🎛️ Master Control Panel
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Search and Filters */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input
                placeholder="Search tasks..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-black/20"
              />
            </div>
            
            <select 
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="p-2 bg-black/20 border border-border rounded-md text-white"
            >
              <option value="all">All Categories</option>
              <option value="feature">Feature</option>
              <option value="admin">Admin</option>
              <option value="integration">Integration</option>
              <option value="development">Development</option>
            </select>

            <select 
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="p-2 bg-black/20 border border-border rounded-md text-white"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
              <option value="pending">Pending</option>
              <option value="error">Error</option>
            </select>

            <div className="flex gap-2">
              <Button onClick={selectAllTasks} variant="outline" size="sm">
                Select All
              </Button>
              <Button onClick={clearSelection} variant="outline" size="sm">
                Clear
              </Button>
            </div>
          </div>

          {/* Bulk Actions */}
          {selectedTasks.length > 0 && (
            <div className="flex items-center gap-4 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
              <span className="text-yellow-400 font-semibold">
                {selectedTasks.length} tasks selected
              </span>
              <div className="flex gap-2">
                <Button 
                  onClick={reverseSelectedTasks}
                  className="bg-orange-600 hover:bg-orange-700"
                  size="sm"
                >
                  <RotateCcw className="h-4 w-4 mr-2" />
                  Reverse Selected
                </Button>
                <Button 
                  onClick={deleteSelectedTasks}
                  className="bg-red-600 hover:bg-red-700"
                  size="sm"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Task Grid */}
      <div className="grid gap-4">
        {filteredTasks.map((task) => (
          <Card 
            key={task.id} 
            className={`bg-gradient-to-br from-gray-900/20 to-gray-800/20 border-gray-500/30 hover:border-blue-500/50 transition-all duration-300 ${
              selectedTasks.includes(task.id) ? 'ring-2 ring-blue-500/50' : ''
            }`}
          >
            <CardContent className="pt-6">
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4 flex-1">
                  <input
                    type="checkbox"
                    checked={selectedTasks.includes(task.id)}
                    onChange={() => toggleTaskSelection(task.id)}
                    className="mt-1"
                  />
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-lg font-semibold text-white">{task.name}</h3>
                      {task.isFeatured && (
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      )}
                      <Badge className={getStatusColor(task.status)}>
                        {task.status}
                      </Badge>
                      <Badge variant="outline" className={getImpactColor(task.impact)}>
                        {task.impact} impact
                      </Badge>
                    </div>
                    
                    <p className="text-muted-foreground mb-3">{task.description}</p>
                    
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>Category: {task.category}</span>
                      <span>Created: {task.createdAt.toLocaleDateString()}</span>
                      <span>Modified: {task.lastModified.toLocaleTimeString()}</span>
                    </div>
                    
                    {task.dependencies.length > 0 && (
                      <div className="mt-2">
                        <span className="text-sm text-muted-foreground">Dependencies: </span>
                        {task.dependencies.map(dep => (
                          <Badge key={dep} variant="outline" className="text-xs mr-1">
                            {dep}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Button
                    onClick={() => toggleTaskFeatured(task.id)}
                    variant="outline"
                    size="sm"
                    className="text-yellow-400 hover:text-yellow-300"
                  >
                    <Star className={`h-4 w-4 ${task.isFeatured ? 'fill-current' : ''}`} />
                  </Button>
                  
                  {task.canReverse && (
                    <Button
                      onClick={() => reverseSelectedTasks()}
                      variant="outline"
                      size="sm"
                      className="text-orange-400 hover:text-orange-300"
                    >
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                  )}
                  
                  <Button
                    onClick={() => setSelectedTasks([task.id])}
                    variant="outline"
                    size="sm"
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <div className="text-center py-12">
          <History className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No tasks found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  )
}
