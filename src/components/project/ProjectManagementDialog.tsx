
import React, { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import {
  Settings,
  Package,
  History,
  Shield,
  Download,
  Upload,
  Plus,
  Trash2,
  Edit,
  Eye,
  EyeOff,
  Play,
  Pause,
  RotateCcw,
  Lock,
  Unlock,
  Search,
  Filter,
  Archive,
  Zap,
  Database,
  Code,
  Layers,
  GitBranch,
  Save,
  RefreshCw
} from 'lucide-react'
import { useProjectManagement } from './ProjectManagementProvider'
import { toast } from 'sonner'

interface ProjectManagementDialogProps {
  isOpen: boolean
  onClose: () => void
}

export function ProjectManagementDialog({ isOpen, onClose }: ProjectManagementDialogProps) {
  const { state, addComponent, removeComponent, updateComponent, toggleComponentStatus, rollbackChange, lockProject, unlockProject, createBackup, bulkAction, exportProject } = useProjectManagement()
  
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedComponents, setSelectedComponents] = useState<string[]>([])
  const [filterType, setFilterType] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)

  const [newComponent, setNewComponent] = useState({
    name: '',
    type: 'component' as const,
    description: '',
    tags: '',
    size: 10,
    version: '1.0.0'
  })

  const filteredComponents = state.components.filter(component => {
    const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         component.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         component.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
    
    const matchesType = filterType === 'all' || component.type === filterType
    const matchesStatus = filterStatus === 'all' || component.status === filterStatus
    
    return matchesSearch && matchesType && matchesStatus
  })

  const handleAddComponent = () => {
    if (!newComponent.name.trim()) {
      toast.error('Component name is required')
      return
    }
    
    addComponent({
      ...newComponent,
      status: 'active',
      dependencies: [],
      tags: newComponent.tags.split(',').map(tag => tag.trim()).filter(Boolean)
    })
    
    setNewComponent({
      name: '',
      type: 'component',
      description: '',
      tags: '',
      size: 10,
      version: '1.0.0'
    })
    setShowAddForm(false)
  }

  const handleBulkAction = (action: 'activate' | 'deactivate' | 'remove') => {
    if (selectedComponents.length === 0) {
      toast.error('No components selected')
      return
    }
    
    bulkAction(selectedComponents, action)
    setSelectedComponents([])
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600'
      case 'inactive': return 'bg-gray-600'
      case 'draft': return 'bg-yellow-600'
      case 'deprecated': return 'bg-red-600'
      default: return 'bg-gray-600'
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'component': return <Package className="h-4 w-4" />
      case 'page': return <Layers className="h-4 w-4" />
      case 'feature': return <Zap className="h-4 w-4" />
      case 'style': return <Code className="h-4 w-4" />
      case 'asset': return <Database className="h-4 w-4" />
      default: return <Package className="h-4 w-4" />
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl text-purple-400">
            <Settings className="h-6 w-6" />
            🚀 Advanced Project Management System
            <Badge className={state.isLocked ? 'bg-red-600' : 'bg-green-600'}>
              {state.isLocked ? 'LOCKED' : 'UNLOCKED'}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="components" className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="components">Components</TabsTrigger>
            <TabsTrigger value="changes">Changes</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="backups">Backups</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          {/* Components Tab */}
          <TabsContent value="components" className="space-y-6">
            <div className="flex flex-col md:flex-row gap-4">
              {/* Search and Filters */}
              <div className="flex-1 space-y-4">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search components..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="component">Components</SelectItem>
                      <SelectItem value="page">Pages</SelectItem>
                      <SelectItem value="feature">Features</SelectItem>
                      <SelectItem value="style">Styles</SelectItem>
                      <SelectItem value="asset">Assets</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterStatus} onValueChange={setFilterStatus}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="deprecated">Deprecated</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Bulk Actions */}
                {selectedComponents.length > 0 && (
                  <div className="flex gap-2 p-4 bg-purple-900/20 rounded-lg border border-purple-500/30">
                    <span className="text-sm text-purple-400">{selectedComponents.length} selected:</span>
                    <Button size="sm" onClick={() => handleBulkAction('activate')} className="bg-green-600 hover:bg-green-700">
                      <Play className="h-3 w-3 mr-1" />
                      Activate
                    </Button>
                    <Button size="sm" onClick={() => handleBulkAction('deactivate')} className="bg-gray-600 hover:bg-gray-700">
                      <Pause className="h-3 w-3 mr-1" />
                      Deactivate
                    </Button>
                    <Button size="sm" onClick={() => handleBulkAction('remove')} variant="destructive">
                      <Trash2 className="h-3 w-3 mr-1" />
                      Remove
                    </Button>
                  </div>
                )}
              </div>

              {/* Add Component Button */}
              <Button onClick={() => setShowAddForm(!showAddForm)} className="bg-purple-600 hover:bg-purple-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Component
              </Button>
            </div>

            {/* Add Component Form */}
            {showAddForm && (
              <Card className="border-purple-500/30 bg-purple-900/20">
                <CardHeader>
                  <CardTitle className="text-purple-400">Add New Component</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Name</Label>
                      <Input
                        value={newComponent.name}
                        onChange={(e) => setNewComponent(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Component name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Type</Label>
                      <Select value={newComponent.type} onValueChange={(value: any) => setNewComponent(prev => ({ ...prev, type: value }))}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="component">Component</SelectItem>
                          <SelectItem value="page">Page</SelectItem>
                          <SelectItem value="feature">Feature</SelectItem>
                          <SelectItem value="style">Style</SelectItem>
                          <SelectItem value="asset">Asset</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label>Version</Label>
                      <Input
                        value={newComponent.version}
                        onChange={(e) => setNewComponent(prev => ({ ...prev, version: e.target.value }))}
                        placeholder="1.0.0"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Size (KB)</Label>
                      <Input
                        type="number"
                        value={newComponent.size}
                        onChange={(e) => setNewComponent(prev => ({ ...prev, size: Number(e.target.value) }))}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      value={newComponent.description}
                      onChange={(e) => setNewComponent(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Component description"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Tags (comma separated)</Label>
                    <Input
                      value={newComponent.tags}
                      onChange={(e) => setNewComponent(prev => ({ ...prev, tags: e.target.value }))}
                      placeholder="ui, core, navigation"
                    />
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={handleAddComponent} className="bg-green-600 hover:bg-green-700">
                      <Save className="h-4 w-4 mr-2" />
                      Add Component
                    </Button>
                    <Button variant="outline" onClick={() => setShowAddForm(false)}>
                      Cancel
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Components List */}
            <div className="grid grid-cols-1 gap-4">
              {filteredComponents.map((component) => (
                <Card key={component.id} className="border-green-500/30 bg-green-900/20 hover:bg-green-900/30 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <Checkbox
                          checked={selectedComponents.includes(component.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedComponents(prev => [...prev, component.id])
                            } else {
                              setSelectedComponents(prev => prev.filter(id => id !== component.id))
                            }
                          }}
                        />
                        
                        <div className="flex items-center gap-3">
                          {getTypeIcon(component.type)}
                          <div>
                            <h3 className="font-bold text-green-400 text-lg">{component.name}</h3>
                            <p className="text-sm text-muted-foreground">{component.description}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <Badge className={getStatusColor(component.status)}>{component.status}</Badge>
                              <Badge variant="outline">{component.type}</Badge>
                              <Badge variant="outline">v{component.version}</Badge>
                              <Badge variant="outline">{component.size}KB</Badge>
                            </div>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {component.tags.map((tag, index) => (
                                <Badge key={index} variant="secondary" className="text-xs">{tag}</Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => toggleComponentStatus(component.id)}
                          disabled={state.isLocked}
                        >
                          {component.status === 'active' ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => removeComponent(component.id)}
                          disabled={state.isLocked}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    {component.dependencies.length > 0 && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <div className="text-sm text-muted-foreground">
                          <strong>Dependencies:</strong> {component.dependencies.join(', ')}
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Changes Tab */}
          <TabsContent value="changes" className="space-y-4">
            <Card className="border-blue-500/30 bg-blue-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <History className="h-5 w-5" />
                  Project Changes History
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.changes.map((change) => (
                  <div key={change.id} className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <Badge className={
                          change.type === 'added' ? 'bg-green-600' :
                          change.type === 'modified' ? 'bg-yellow-600' :
                          change.type === 'removed' ? 'bg-red-600' : 'bg-blue-600'
                        }>
                          {change.type}
                        </Badge>
                        <span className="font-medium text-blue-400">{change.component}</span>
                      </div>
                      <p className="text-sm text-muted-foreground">{change.description}</p>
                      <p className="text-xs text-muted-foreground">{new Date(change.timestamp).toLocaleString()}</p>
                    </div>
                    
                    {change.rollbackData && (
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => rollbackChange(change.id)}
                        disabled={state.isLocked}
                      >
                        <RotateCcw className="h-3 w-3 mr-1" />
                        Rollback
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-4">
            <Card className="border-red-500/30 bg-red-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-400">
                  <Shield className="h-5 w-5" />
                  Project Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-black/30 rounded-lg">
                  <div>
                    <h4 className="font-medium text-red-400">Project Lock Status</h4>
                    <p className="text-sm text-muted-foreground">
                      {state.isLocked 
                        ? 'Project is locked. Components cannot be modified or removed.'
                        : 'Project is unlocked. All operations are allowed.'}
                    </p>
                  </div>
                  <Button
                    onClick={state.isLocked ? unlockProject : lockProject}
                    variant={state.isLocked ? 'destructive' : 'outline'}
                    className="flex items-center gap-2"
                  >
                    {state.isLocked ? <Unlock className="h-4 w-4" /> : <Lock className="h-4 w-4" />}
                    {state.isLocked ? 'Unlock Project' : 'Lock Project'}
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <h4 className="font-medium text-red-400">Project Statistics</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Total Components:</span>
                        <span className="font-mono">{state.components.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Active Components:</span>
                        <span className="font-mono">{state.components.filter(c => c.status === 'active').length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Project Size:</span>
                        <span className="font-mono">{state.totalSize}KB</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Total Changes:</span>
                        <span className="font-mono">{state.changes.length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Available Backups:</span>
                        <span className="font-mono">{state.backupCount}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h4 className="font-medium text-red-400">Export/Import</h4>
                    <div className="space-y-2">
                      <Button onClick={exportProject} className="w-full bg-blue-600 hover:bg-blue-700">
                        <Download className="h-4 w-4 mr-2" />
                        Export Project
                      </Button>
                      <Button onClick={createBackup} className="w-full bg-purple-600 hover:bg-purple-700">
                        <Save className="h-4 w-4 mr-2" />
                        Create Backup
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Backups Tab */}
          <TabsContent value="backups" className="space-y-4">
            <Card className="border-purple-500/30 bg-purple-900/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-purple-400">
                  <Archive className="h-5 w-5" />
                  Project Backups & Versioning
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center py-8 text-muted-foreground">
                  <Archive className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <h3 className="text-lg font-medium mb-2">Backup System Ready</h3>
                  <p className="mb-4">Create and manage project backups for safe restoration</p>
                  <Button onClick={createBackup} className="bg-purple-600 hover:bg-purple-700">
                    <Save className="h-4 w-4 mr-2" />
                    Create First Backup
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card className="border-green-500/30 bg-green-900/20">
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-green-400">{state.components.length}</h3>
                  <p className="text-sm text-muted-foreground">Total Components</p>
                </CardContent>
              </Card>
              
              <Card className="border-blue-500/30 bg-blue-900/20">
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-blue-400">{state.components.filter(c => c.status === 'active').length}</h3>
                  <p className="text-sm text-muted-foreground">Active Components</p>
                </CardContent>
              </Card>
              
              <Card className="border-yellow-500/30 bg-yellow-900/20">
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-yellow-400">{state.totalSize}KB</h3>
                  <p className="text-sm text-muted-foreground">Project Size</p>
                </CardContent>
              </Card>
              
              <Card className="border-purple-500/30 bg-purple-900/20">
                <CardContent className="p-6 text-center">
                  <h3 className="text-2xl font-bold text-purple-400">{state.changes.length}</h3>
                  <p className="text-sm text-muted-foreground">Total Changes</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
