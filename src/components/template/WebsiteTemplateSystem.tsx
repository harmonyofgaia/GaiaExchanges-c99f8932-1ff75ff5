import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Save, 
  Download, 
  Upload, 
  Layers, 
  Globe, 
  Palette,
  Monitor,
  Smartphone,
  Tablet,
  Eye,
  Copy,
  Trash2,
  Star,
  Clock,
  Image as ImageIcon,
  Settings,
  RefreshCw
} from 'lucide-react'
import { toast } from 'sonner'

interface PageDesign {
  id: string
  name: string
  backgroundType: string
  backgroundConfig: any
  colors: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
  }
  fonts: {
    heading: string
    body: string
    accent: string
  }
  layout: {
    headerStyle: string
    sidebarStyle: string
    contentLayout: string
    footerStyle: string
  }
  animations: any[]
  effects: any[]
}

interface WebsiteTemplate {
  id: string
  name: string
  description: string
  version: string
  created: Date
  lastModified: Date
  isDefault?: boolean
  isFavorite?: boolean
  pages: {
    homepage: PageDesign
    admin: PageDesign
    sidebar: PageDesign
    [key: string]: PageDesign
  }
  globalSettings: {
    theme: 'light' | 'dark' | 'auto'
    colorScheme: string
    fontScale: number
    animationSpeed: number
    responsiveBreakpoints: any
  }
  metadata: {
    author: string
    tags: string[]
    category: string
    previewImage?: string
  }
}

interface WebsiteTemplateSystemProps {
  className?: string
  onTemplateApplied?: (template: WebsiteTemplate) => void
  currentDesign?: PageDesign
}

export function WebsiteTemplateSystem({ 
  className = '', 
  onTemplateApplied,
  currentDesign 
}: WebsiteTemplateSystemProps) {
  const [templates, setTemplates] = useState<WebsiteTemplate[]>([])
  const [selectedTemplate, setSelectedTemplate] = useState<WebsiteTemplate | null>(null)
  const [isCreatingTemplate, setIsCreatingTemplate] = useState(false)
  const [templateForm, setTemplateForm] = useState({
    name: '',
    description: '',
    category: 'custom',
    tags: ''
  })

  // Load templates from localStorage
  useEffect(() => {
    const savedTemplates = localStorage.getItem('gaia-website-templates')
    if (savedTemplates) {
      try {
        const parsed = JSON.parse(savedTemplates)
        setTemplates(parsed)
      } catch (e) {
        console.warn('Failed to load website templates')
      }
    } else {
      // Create default templates to preserve current designs
      createDefaultTemplates()
    }
  }, [])

  // Save templates when they change
  useEffect(() => {
    if (templates.length > 0) {
      localStorage.setItem('gaia-website-templates', JSON.stringify(templates))
    }
  }, [templates])

  const createDefaultTemplates = () => {
    const defaultTemplates: WebsiteTemplate[] = [
      {
        id: 'default-matrix',
        name: 'Matrix Digital Rain',
        description: 'Classic cyberpunk aesthetic with digital rain background',
        version: '1.0.0',
        created: new Date(),
        lastModified: new Date(),
        isDefault: true,
        pages: {
          homepage: createMatrixPageDesign('Homepage'),
          admin: createMatrixPageDesign('Admin'),
          sidebar: createMatrixPageDesign('Sidebar')
        },
        globalSettings: {
          theme: 'dark',
          colorScheme: 'matrix-green',
          fontScale: 1.0,
          animationSpeed: 1.0,
          responsiveBreakpoints: {
            mobile: 768,
            tablet: 1024,
            desktop: 1200
          }
        },
        metadata: {
          author: 'Gaia Exchanges',
          tags: ['cyberpunk', 'matrix', 'digital', 'dark'],
          category: 'default'
        }
      },
      {
        id: 'default-neural',
        name: 'Neural Network',
        description: 'Advanced neural network visualization with pulsing connections',
        version: '1.0.0',
        created: new Date(),
        lastModified: new Date(),
        isDefault: true,
        pages: {
          homepage: createNeuralPageDesign('Homepage'),
          admin: createNeuralPageDesign('Admin'),
          sidebar: createNeuralPageDesign('Sidebar')
        },
        globalSettings: {
          theme: 'dark',
          colorScheme: 'neural-blue',
          fontScale: 1.0,
          animationSpeed: 0.8,
          responsiveBreakpoints: {
            mobile: 768,
            tablet: 1024,
            desktop: 1200
          }
        },
        metadata: {
          author: 'Gaia Exchanges',
          tags: ['neural', 'ai', 'network', 'futuristic'],
          category: 'default'
        }
      },
      {
        id: 'default-liquid',
        name: 'Liquid Flow',
        description: 'Flowing liquid animations with organic movements',
        version: '1.0.0',
        created: new Date(),
        lastModified: new Date(),
        isDefault: true,
        pages: {
          homepage: createLiquidPageDesign('Homepage'),
          admin: createLiquidPageDesign('Admin'),
          sidebar: createLiquidPageDesign('Sidebar')
        },
        globalSettings: {
          theme: 'dark',
          colorScheme: 'liquid-teal',
          fontScale: 1.0,
          animationSpeed: 1.2,
          responsiveBreakpoints: {
            mobile: 768,
            tablet: 1024,
            desktop: 1200
          }
        },
        metadata: {
          author: 'Gaia Exchanges',
          tags: ['liquid', 'organic', 'flow', 'smooth'],
          category: 'default'
        }
      }
    ]

    setTemplates(defaultTemplates)
  }

  const createMatrixPageDesign = (pageName: string): PageDesign => ({
    id: `matrix-${pageName.toLowerCase()}`,
    name: `Matrix ${pageName}`,
    backgroundType: 'matrix',
    backgroundConfig: {
      type: 'matrix',
      intensity: 'medium',
      color: '#00ff00',
      speed: 1
    },
    colors: {
      primary: '#00ff00',
      secondary: '#003300',
      accent: '#66ff66',
      text: '#ffffff',
      background: '#000000'
    },
    fonts: {
      heading: 'Orbitron',
      body: 'Courier New',
      accent: 'Share Tech Mono'
    },
    layout: {
      headerStyle: 'modern',
      sidebarStyle: 'compact',
      contentLayout: 'centered',
      footerStyle: 'minimal'
    },
    animations: [
      { type: 'fade', duration: 300 },
      { type: 'slide', direction: 'up', duration: 500 }
    ],
    effects: [
      { type: 'glow', color: '#00ff00', intensity: 0.5 }
    ]
  })

  const createNeuralPageDesign = (pageName: string): PageDesign => ({
    id: `neural-${pageName.toLowerCase()}`,
    name: `Neural ${pageName}`,
    backgroundType: 'neuro',
    backgroundConfig: {
      type: 'neuro',
      intensity: 'high',
      color: '#4fc3f7',
      speed: 0.8,
      neuralDensity: 60
    },
    colors: {
      primary: '#4fc3f7',
      secondary: '#1e3a5f',
      accent: '#81d4fa',
      text: '#ffffff',
      background: '#0a1929'
    },
    fonts: {
      heading: 'Rajdhani',
      body: 'Inter',
      accent: 'Exo 2'
    },
    layout: {
      headerStyle: 'futuristic',
      sidebarStyle: 'neural',
      contentLayout: 'grid',
      footerStyle: 'connected'
    },
    animations: [
      { type: 'pulse', duration: 2000 },
      { type: 'neural-sync', frequency: 0.5 }
    ],
    effects: [
      { type: 'neural-glow', intensity: 0.7 },
      { type: 'connection-lines', opacity: 0.3 }
    ]
  })

  const createLiquidPageDesign = (pageName: string): PageDesign => ({
    id: `liquid-${pageName.toLowerCase()}`,
    name: `Liquid ${pageName}`,
    backgroundType: 'liquid',
    backgroundConfig: {
      type: 'liquid',
      intensity: 'medium',
      color: '#00bcd4',
      speed: 1.2,
      viscosity: 0.6
    },
    colors: {
      primary: '#00bcd4',
      secondary: '#004d5c',
      accent: '#4dd0e1',
      text: '#ffffff',
      background: '#001f24'
    },
    fonts: {
      heading: 'Poppins',
      body: 'Nunito Sans',
      accent: 'Quicksand'
    },
    layout: {
      headerStyle: 'flowing',
      sidebarStyle: 'liquid',
      contentLayout: 'organic',
      footerStyle: 'wave'
    },
    animations: [
      { type: 'flow', direction: 'radial', speed: 1.2 },
      { type: 'morph', intensity: 0.4 }
    ],
    effects: [
      { type: 'liquid-distortion', amount: 0.2 },
      { type: 'surface-ripple', frequency: 0.8 }
    ]
  })

  const captureCurrentDesign = (): WebsiteTemplate => {
    // Capture the current state of all pages
    const currentTemplate: WebsiteTemplate = {
      id: `captured-${Date.now()}`,
      name: templateForm.name || `Captured Design ${new Date().toLocaleDateString()}`,
      description: templateForm.description || 'Captured from current website state',
      version: '1.0.0',
      created: new Date(),
      lastModified: new Date(),
      pages: {
        homepage: currentDesign || createMatrixPageDesign('Homepage'),
        admin: getCurrentAdminDesign(),
        sidebar: getCurrentSidebarDesign()
      },
      globalSettings: getCurrentGlobalSettings(),
      metadata: {
        author: 'User',
        tags: templateForm.tags.split(',').map(tag => tag.trim()).filter(Boolean),
        category: templateForm.category
      }
    }

    return currentTemplate
  }

  const getCurrentAdminDesign = (): PageDesign => {
    // Get current admin page design from localStorage or defaults
    const saved = localStorage.getItem('gaia-admin-design')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.warn('Failed to parse admin design')
      }
    }
    return createNeuralPageDesign('Admin')
  }

  const getCurrentSidebarDesign = (): PageDesign => {
    // Get current sidebar design from localStorage or defaults
    const saved = localStorage.getItem('gaia-sidebar-design')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.warn('Failed to parse sidebar design')
      }
    }
    return createMatrixPageDesign('Sidebar')
  }

  const getCurrentGlobalSettings = () => {
    const saved = localStorage.getItem('gaia-global-settings')
    if (saved) {
      try {
        return JSON.parse(saved)
      } catch (e) {
        console.warn('Failed to parse global settings')
      }
    }
    return {
      theme: 'dark' as const,
      colorScheme: 'matrix-green',
      fontScale: 1.0,
      animationSpeed: 1.0,
      responsiveBreakpoints: {
        mobile: 768,
        tablet: 1024,
        desktop: 1200
      }
    }
  }

  const handleCreateTemplate = () => {
    if (!templateForm.name.trim()) {
      toast.error('Please enter a template name')
      return
    }

    const newTemplate = captureCurrentDesign()
    setTemplates(prev => [...prev, newTemplate])
    
    // Reset form
    setTemplateForm({
      name: '',
      description: '',
      category: 'custom',
      tags: ''
    })
    
    setIsCreatingTemplate(false)
    toast.success('Website template created successfully!')
  }

  const handleApplyTemplate = (template: WebsiteTemplate) => {
    // Apply template to all pages
    localStorage.setItem('gaia-enhanced-background-config', JSON.stringify(template.pages.homepage.backgroundConfig))
    localStorage.setItem('gaia-admin-design', JSON.stringify(template.pages.admin))
    localStorage.setItem('gaia-sidebar-design', JSON.stringify(template.pages.sidebar))
    localStorage.setItem('gaia-global-settings', JSON.stringify(template.globalSettings))
    
    onTemplateApplied?.(template)
    toast.success(`Applied template: ${template.name}`)
  }

  const handleDeleteTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId)
    if (template?.isDefault) {
      toast.error('Cannot delete default templates')
      return
    }

    setTemplates(prev => prev.filter(t => t.id !== templateId))
    toast.success('Template deleted')
  }

  const handleToggleFavorite = (templateId: string) => {
    setTemplates(prev => prev.map(t => 
      t.id === templateId ? { ...t, isFavorite: !t.isFavorite } : t
    ))
  }

  const exportTemplate = (template: WebsiteTemplate) => {
    const blob = new Blob([JSON.stringify(template, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${template.name.replace(/\s+/g, '-').toLowerCase()}.json`
    document.body.appendChild(a)
    a.click()
    document.body.removeChild(a)
    URL.revokeObjectURL(url)
    toast.success('Template exported successfully!')
  }

  const importTemplate = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (e) => {
      try {
        const template = JSON.parse(e.target?.result as string) as WebsiteTemplate
        template.id = `imported-${Date.now()}`
        template.created = new Date()
        template.lastModified = new Date()
        
        setTemplates(prev => [...prev, template])
        toast.success('Template imported successfully!')
      } catch (error) {
        toast.error('Failed to import template')
      }
    }
    reader.readAsText(file)
  }

  return (
    <div className={`website-template-system ${className}`}>
      <Card className="bg-gray-900/50 border-blue-500/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-400">
            <Layers className="w-5 h-5" />
            Website Template System
            <Badge variant="outline" className="ml-auto">
              {templates.length} Templates
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="gallery" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="gallery">Template Gallery</TabsTrigger>
              <TabsTrigger value="create">Create Template</TabsTrigger>
              <TabsTrigger value="manage">Manage</TabsTrigger>
            </TabsList>

            <TabsContent value="gallery" className="space-y-4">
              <div className="flex gap-2 mb-4">
                <Button 
                  size="sm" 
                  onClick={() => {
                    const input = document.createElement('input')
                    input.type = 'file'
                    input.accept = '.json'
                    input.onchange = importTemplate
                    input.click()
                  }}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Import
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {templates.map((template) => (
                  <Card 
                    key={template.id} 
                    className={`transition-all cursor-pointer ${
                      selectedTemplate?.id === template.id 
                        ? 'ring-2 ring-blue-500 bg-blue-900/20' 
                        : 'bg-gray-800/50 hover:bg-gray-700/50'
                    }`}
                    onClick={() => setSelectedTemplate(template)}
                  >
                    <CardContent className="p-4">
                      <div className="aspect-video bg-gradient-to-br from-gray-700 to-gray-800 rounded-lg mb-3 flex items-center justify-center">
                        <Globe className="w-8 h-8 text-gray-400" />
                      </div>

                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-200">{template.name}</h4>
                        <div className="flex gap-1">
                          {template.isDefault && (
                            <Badge variant="outline" className="text-xs">Default</Badge>
                          )}
                          {template.isFavorite && (
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          )}
                        </div>
                      </div>

                      <p className="text-sm text-gray-400 mb-3 line-clamp-2">
                        {template.description}
                      </p>

                      <div className="flex gap-2 mb-3">
                        {Object.values(template.pages.homepage.colors).slice(0, 4).map((color, index) => (
                          <div 
                            key={index}
                            className="w-6 h-6 rounded-full border border-gray-600"
                            style={{ backgroundColor: color }}
                          />
                        ))}
                      </div>

                      <div className="flex gap-2 text-xs text-gray-500 mb-3">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {template.created.toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          size="sm" 
                          className="flex-1"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleApplyTemplate(template)
                          }}
                        >
                          Apply
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            handleToggleFavorite(template.id)
                          }}
                        >
                          <Star className={`w-4 h-4 ${template.isFavorite ? 'text-yellow-500 fill-current' : ''}`} />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation()
                            exportTemplate(template)
                          }}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="create" className="space-y-4">
              <Card className="bg-gray-800/50">
                <CardHeader>
                  <CardTitle className="text-lg text-gray-200">Create New Template</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label className="text-gray-300">Template Name</Label>
                    <Input
                      placeholder="My Custom Template"
                      value={templateForm.name}
                      onChange={(e) => setTemplateForm(prev => ({ ...prev, name: e.target.value }))}
                      className="bg-gray-700/50 border-gray-600"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300">Description</Label>
                    <Textarea
                      placeholder="Describe your template..."
                      value={templateForm.description}
                      onChange={(e) => setTemplateForm(prev => ({ ...prev, description: e.target.value }))}
                      className="bg-gray-700/50 border-gray-600"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-300">Tags (comma-separated)</Label>
                    <Input
                      placeholder="cyberpunk, dark, futuristic"
                      value={templateForm.tags}
                      onChange={(e) => setTemplateForm(prev => ({ ...prev, tags: e.target.value }))}
                      className="bg-gray-700/50 border-gray-600"
                    />
                  </div>

                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-lg p-4">
                    <h4 className="font-medium text-blue-400 mb-2">Current Design Preview</h4>
                    <p className="text-sm text-gray-300 mb-3">
                      This will capture the current state of all pages including backgrounds, colors, layouts, and animations.
                    </p>
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="bg-gray-700/50 p-2 rounded">
                        <Monitor className="w-4 h-4 mb-1 text-gray-400" />
                        Homepage
                      </div>
                      <div className="bg-gray-700/50 p-2 rounded">
                        <Settings className="w-4 h-4 mb-1 text-gray-400" />
                        Admin
                      </div>
                      <div className="bg-gray-700/50 p-2 rounded">
                        <Layers className="w-4 h-4 mb-1 text-gray-400" />
                        Sidebar
                      </div>
                    </div>
                  </div>

                  <Button 
                    onClick={handleCreateTemplate}
                    className="w-full bg-blue-600 hover:bg-blue-700"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Create Template
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="manage" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                {templates.map((template) => (
                  <Card key={template.id} className="bg-gray-800/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-gray-200">{template.name}</h4>
                            {template.isDefault && (
                              <Badge variant="outline" className="text-xs">Default</Badge>
                            )}
                            {template.isFavorite && (
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            )}
                          </div>
                          <p className="text-sm text-gray-400">{template.description}</p>
                          <div className="flex gap-4 text-xs text-gray-500 mt-2">
                            <span>Version: {template.version}</span>
                            <span>Created: {template.created.toLocaleDateString()}</span>
                            <span>Pages: {Object.keys(template.pages).length}</span>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button 
                            size="sm" 
                            onClick={() => handleApplyTemplate(template)}
                          >
                            Apply
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => exportTemplate(template)}
                          >
                            <Download className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleToggleFavorite(template.id)}
                          >
                            <Star className={`w-4 h-4 ${template.isFavorite ? 'text-yellow-500 fill-current' : ''}`} />
                          </Button>
                          {!template.isDefault && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleDeleteTemplate(template.id)}
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}