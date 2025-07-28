
import React, { createContext, useContext, useState, useEffect } from 'react'
import { toast } from 'sonner'

interface ProjectComponent {
  id: string
  name: string
  type: 'component' | 'page' | 'feature' | 'style' | 'asset'
  status: 'active' | 'inactive' | 'draft' | 'deprecated'
  dependencies: string[]
  description: string
  createdAt: string
  updatedAt: string
  size: number
  version: string
  tags: string[]
}

interface ProjectChange {
  id: string
  type: 'added' | 'modified' | 'removed' | 'renamed'
  component: string
  description: string
  timestamp: string
  rollbackData?: any
}

interface ProjectManagementState {
  components: ProjectComponent[]
  changes: ProjectChange[]
  isLocked: boolean
  backupCount: number
  totalSize: number
}

interface ProjectManagementContextType {
  state: ProjectManagementState
  addComponent: (component: Omit<ProjectComponent, 'id' | 'createdAt' | 'updatedAt'>) => void
  removeComponent: (id: string) => void
  updateComponent: (id: string, updates: Partial<ProjectComponent>) => void
  toggleComponentStatus: (id: string) => void
  rollbackChange: (changeId: string) => void
  lockProject: () => void
  unlockProject: () => void
  createBackup: () => void
  restoreBackup: (backupId: string) => void
  bulkAction: (componentIds: string[], action: 'activate' | 'deactivate' | 'remove') => void
  exportProject: () => void
  importProject: (data: any) => void
}

const ProjectManagementContext = createContext<ProjectManagementContextType | undefined>(undefined)

export function ProjectManagementProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<ProjectManagementState>({
    components: [
      {
        id: 'navbar',
        name: 'Navigation Bar',
        type: 'component',
        status: 'active',
        dependencies: [],
        description: 'Main navigation component',
        createdAt: '2024-01-01',
        updatedAt: '2024-01-15',
        size: 12.5,
        version: '2.1.0',
        tags: ['navigation', 'ui', 'core']
      },
      {
        id: 'visual-controls',
        name: 'Visual Design Controls',
        type: 'feature',
        status: 'active',
        dependencies: ['background-manager'],
        description: 'Advanced visual customization system',
        createdAt: '2024-01-10',
        updatedAt: '2024-01-20',
        size: 45.2,
        version: '1.5.0',
        tags: ['design', 'visual', 'controls']
      },
      {
        id: 'home-background',
        name: 'Home Background',
        type: 'component',
        status: 'active',
        dependencies: [],
        description: 'Animated background for homepage',
        createdAt: '2024-01-05',
        updatedAt: '2024-01-18',
        size: 23.8,
        version: '1.3.0',
        tags: ['background', 'animation', 'home']
      },
      {
        id: 'gaming-page',
        name: 'Gaming Page',
        type: 'page',
        status: 'draft',
        dependencies: ['navbar', 'background-manager'],
        description: 'Gaming section and entertainment',
        createdAt: '2024-01-12',
        updatedAt: '2024-01-19',
        size: 18.3,
        version: '0.8.0',
        tags: ['gaming', 'entertainment', 'page']
      },
      {
        id: 'markets-page',
        name: 'Markets Page',
        type: 'page',
        status: 'inactive',
        dependencies: ['navbar'],
        description: 'Financial markets and trading',
        createdAt: '2024-01-08',
        updatedAt: '2024-01-16',
        size: 31.7,
        version: '1.0.0',
        tags: ['finance', 'markets', 'trading']
      }
    ],
    changes: [],
    isLocked: false,
    backupCount: 3,
    totalSize: 131.5
  })

  const addComponent = (component: Omit<ProjectComponent, 'id' | 'createdAt' | 'updatedAt'>) => {
    if (state.isLocked) {
      toast.error('🔒 Project is locked! Cannot add components.')
      return
    }
    
    const newComponent: ProjectComponent = {
      ...component,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    setState(prev => ({
      ...prev,
      components: [...prev.components, newComponent],
      changes: [{
        id: Date.now().toString(),
        type: 'added',
        component: newComponent.name,
        description: `Added ${newComponent.type}: ${newComponent.name}`,
        timestamp: new Date().toISOString()
      }, ...prev.changes],
      totalSize: prev.totalSize + newComponent.size
    }))
    
    toast.success(`✅ Added ${newComponent.name}`)
  }

  const removeComponent = (id: string) => {
    if (state.isLocked) {
      toast.error('🔒 Project is locked! Cannot remove components.')
      return
    }
    
    const component = state.components.find(c => c.id === id)
    if (!component) return
    
    setState(prev => ({
      ...prev,
      components: prev.components.filter(c => c.id !== id),
      changes: [{
        id: Date.now().toString(),
        type: 'removed',
        component: component.name,
        description: `Removed ${component.type}: ${component.name}`,
        timestamp: new Date().toISOString(),
        rollbackData: component
      }, ...prev.changes],
      totalSize: prev.totalSize - component.size
    }))
    
    toast.success(`🗑️ Removed ${component.name}`)
  }

  const updateComponent = (id: string, updates: Partial<ProjectComponent>) => {
    if (state.isLocked) {
      toast.error('🔒 Project is locked! Cannot modify components.')
      return
    }
    
    setState(prev => ({
      ...prev,
      components: prev.components.map(c => 
        c.id === id ? { ...c, ...updates, updatedAt: new Date().toISOString() } : c
      ),
      changes: [{
        id: Date.now().toString(),
        type: 'modified',
        component: prev.components.find(c => c.id === id)?.name || 'Unknown',
        description: `Modified component properties`,
        timestamp: new Date().toISOString()
      }, ...prev.changes]
    }))
  }

  const toggleComponentStatus = (id: string) => {
    const component = state.components.find(c => c.id === id)
    if (!component) return
    
    const newStatus = component.status === 'active' ? 'inactive' : 'active'
    updateComponent(id, { status: newStatus })
    
    toast.success(`${newStatus === 'active' ? '✅ Activated' : '⏸️ Deactivated'} ${component.name}`)
  }

  const rollbackChange = (changeId: string) => {
    const change = state.changes.find(c => c.id === changeId)
    if (!change || !change.rollbackData) return
    
    if (change.type === 'removed' && change.rollbackData) {
      setState(prev => ({
        ...prev,
        components: [...prev.components, change.rollbackData]
      }))
      toast.success(`↩️ Restored ${change.component}`)
    }
  }

  const lockProject = () => {
    setState(prev => ({ ...prev, isLocked: true }))
    toast.success('🔒 Project locked - all components are now protected')
  }

  const unlockProject = () => {
    setState(prev => ({ ...prev, isLocked: false }))
    toast.success('🔓 Project unlocked - components can now be modified')
  }

  const createBackup = () => {
    localStorage.setItem(`gaia-backup-${Date.now()}`, JSON.stringify(state))
    setState(prev => ({ ...prev, backupCount: prev.backupCount + 1 }))
    toast.success('💾 Backup created successfully')
  }

  const restoreBackup = (backupId: string) => {
    const backupData = localStorage.getItem(backupId)
    if (backupData) {
      setState(JSON.parse(backupData))
      toast.success('↩️ Backup restored successfully')
    }
  }

  const bulkAction = (componentIds: string[], action: 'activate' | 'deactivate' | 'remove') => {
    if (state.isLocked && action === 'remove') {
      toast.error('🔒 Project is locked! Cannot remove components.')
      return
    }
    
    componentIds.forEach(id => {
      if (action === 'activate' || action === 'deactivate') {
        updateComponent(id, { status: action === 'activate' ? 'active' : 'inactive' })
      } else if (action === 'remove') {
        removeComponent(id)
      }
    })
    
    toast.success(`✅ Bulk action completed: ${action} ${componentIds.length} components`)
  }

  const exportProject = () => {
    const exportData = {
      ...state,
      exportedAt: new Date().toISOString(),
      version: '1.0.0'
    }
    
    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `gaia-project-${Date.now()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    
    toast.success('📤 Project exported successfully')
  }

  const importProject = (data: any) => {
    try {
      setState(data)
      toast.success('📥 Project imported successfully')
    } catch (error) {
      toast.error('❌ Failed to import project')
    }
  }

  return (
    <ProjectManagementContext.Provider value={{
      state,
      addComponent,
      removeComponent,
      updateComponent,
      toggleComponentStatus,
      rollbackChange,
      lockProject,
      unlockProject,
      createBackup,
      restoreBackup,
      bulkAction,
      exportProject,
      importProject
    }}>
      {children}
    </ProjectManagementContext.Provider>
  )
}

export const useProjectManagement = () => {
  const context = useContext(ProjectManagementContext)
  if (!context) {
    throw new Error('useProjectManagement must be used within ProjectManagementProvider')
  }
  return context
}
