import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { 
  Settings, Eye, RotateCcw, Play, Save, AlertTriangle,
  Sliders, Target, CheckCircle, XCircle, Clock, Info
} from 'lucide-react'
import { toast } from 'sonner'

interface PrecisionControlProps {
  actionName: string
  actionId: string
  onExecute?: (parameters: ActionParameters) => Promise<void>
  onPreview?: (parameters: ActionParameters) => ActionPreview
}

interface ActionParameters {
  [key: string]: string | number | boolean
}

interface ActionPreview {
  affectedItems: number
  estimatedTime: string
  risks: string[]
  benefits: string[]
  reversible: boolean
}

interface ParameterConfig {
  name: string
  label: string
  type: 'string' | 'number' | 'boolean' | 'slider' | 'textarea'
  value: string | number | boolean
  min?: number
  max?: number
  step?: number
  options?: string[]
  description?: string
  required?: boolean
}

export function PrecisionControl({ 
  actionName, 
  actionId, 
  onExecute,
  onPreview 
}: PrecisionControlProps) {
  const [parameters, setParameters] = useState<ParameterConfig[]>([
    {
      name: 'batchSize',
      label: 'Batch Size',
      type: 'slider',
      value: 50,
      min: 1,
      max: 1000,
      step: 10,
      description: 'Number of items to process in each batch',
      required: true
    },
    {
      name: 'timeout',
      label: 'Timeout (seconds)',
      type: 'number',
      value: 30,
      description: 'Maximum time to wait for each operation',
      required: true
    },
    {
      name: 'dryRun',
      label: 'Dry Run Mode',
      type: 'boolean',
      value: true,
      description: 'Execute without making actual changes (recommended for testing)',
      required: false
    },
    {
      name: 'autoRetry',
      label: 'Auto Retry on Failure',
      type: 'boolean',
      value: true,
      description: 'Automatically retry failed operations',
      required: false
    },
    {
      name: 'notificationLevel',
      label: 'Notification Level',
      type: 'string',
      value: 'normal',
      options: ['silent', 'normal', 'verbose'],
      description: 'Level of notifications during execution',
      required: true
    },
    {
      name: 'customQuery',
      label: 'Custom Query Filter',
      type: 'textarea',
      value: '',
      description: 'Advanced filter query (optional)',
      required: false
    }
  ])

  const [preview, setPreview] = useState<ActionPreview | null>(null)
  const [isExecuting, setIsExecuting] = useState(false)
  const [executionHistory, setExecutionHistory] = useState<Array<{
    id: string
    timestamp: Date
    parameters: ActionParameters
    status: 'success' | 'error' | 'cancelled'
    result?: string
    error?: string
  }>>([])

  const updateParameter = (name: string, value: string | number | boolean) => {
    setParameters(prev => prev.map(param => 
      param.name === name ? { ...param, value } : param
    ))
    
    // Clear preview when parameters change
    setPreview(null)
  }

  const getParameterValues = (): ActionParameters => {
    return parameters.reduce((acc, param) => {
      acc[param.name] = param.value
      return acc
    }, {} as ActionParameters)
  }

  const handlePreview = () => {
    const paramValues = getParameterValues()
    
    if (onPreview) {
      const previewResult = onPreview(paramValues)
      setPreview(previewResult)
    } else {
      // Generate mock preview
      const mockPreview: ActionPreview = {
        affectedItems: Math.floor(Math.random() * 500) + 50,
        estimatedTime: `${Math.floor(Math.random() * 10) + 2} minutes`,
        risks: [
          'This action may temporarily impact system performance',
          'Some operations cannot be undone automatically',
          'Database locks may occur during execution'
        ].slice(0, Math.floor(Math.random() * 3) + 1),
        benefits: [
          'Improved system performance and stability',
          'Optimized resource utilization',
          'Enhanced data consistency',
          'Better error handling'
        ].slice(0, Math.floor(Math.random() * 3) + 2),
        reversible: Math.random() > 0.3
      }
      setPreview(mockPreview)
    }

    toast.success('📊 Impact preview generated', {
      description: 'Review the changes before executing'
    })
  }

  const handleExecute = async () => {
    const paramValues = getParameterValues()
    
    // Validation
    const requiredParams = parameters.filter(p => p.required && !p.value)
    if (requiredParams.length > 0) {
      toast.error('❌ Missing required parameters', {
        description: `Please set: ${requiredParams.map(p => p.label).join(', ')}`
      })
      return
    }

    setIsExecuting(true)
    const executionId = Date.now().toString()

    try {
      toast.info(`🚀 Executing: ${actionName}`, {
        description: 'Operation started with precision controls'
      })

      if (onExecute) {
        await onExecute(paramValues)
      } else {
        // Simulate execution
        await new Promise(resolve => setTimeout(resolve, 3000))
      }

      const success = Math.random() > 0.1 // 90% success rate

      const historyEntry = {
        id: executionId,
        timestamp: new Date(),
        parameters: paramValues,
        status: success ? 'success' as const : 'error' as const,
        result: success ? 'Operation completed successfully' : undefined,
        error: success ? undefined : 'Unexpected error occurred during execution'
      }

      setExecutionHistory(prev => [historyEntry, ...prev].slice(0, 10))

      if (success) {
        toast.success('✅ Operation completed successfully', {
          description: 'All precision controls were applied correctly'
        })
        setPreview(null) // Clear preview after successful execution
      } else {
        toast.error('❌ Operation failed', {
          description: 'Check the execution history for details'
        })
      }

    } catch (error) {
      toast.error('💥 Execution error', {
        description: 'An unexpected error occurred'
      })
      
      setExecutionHistory(prev => [{
        id: executionId,
        timestamp: new Date(),
        parameters: paramValues,
        status: 'error',
        error: error instanceof Error ? error.message : 'Unknown error'
      }, ...prev].slice(0, 10))
    } finally {
      setIsExecuting(false)
    }
  }

  const resetToDefaults = () => {
    setParameters(prev => prev.map(param => ({
      ...param,
      value: getDefaultValue(param)
    })))
    setPreview(null)
    toast.info('🔄 Parameters reset to defaults')
  }

  const getDefaultValue = (param: ParameterConfig) => {
    switch (param.type) {
      case 'boolean': return false
      case 'number': case 'slider': return param.min || 0
      default: return ''
    }
  }

  const renderParameter = (param: ParameterConfig) => {
    switch (param.type) {
      case 'boolean':
        return (
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <Label className="text-sm font-medium">{param.label}</Label>
              {param.description && (
                <p className="text-xs text-gray-400">{param.description}</p>
              )}
            </div>
            <Switch
              checked={param.value as boolean}
              onCheckedChange={(checked) => updateParameter(param.name, checked)}
            />
          </div>
        )

      case 'slider':
        return (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label className="text-sm font-medium">{param.label}</Label>
              <Badge variant="outline">{param.value}</Badge>
            </div>
            <Slider
              value={[param.value as number]}
              onValueChange={([value]) => updateParameter(param.name, value)}
              min={param.min}
              max={param.max}
              step={param.step}
              className="w-full"
            />
            {param.description && (
              <p className="text-xs text-gray-400">{param.description}</p>
            )}
          </div>
        )

      case 'textarea':
        return (
          <div className="space-y-2">
            <Label className="text-sm font-medium">{param.label}</Label>
            <Textarea
              value={param.value as string}
              onChange={(e) => updateParameter(param.name, e.target.value)}
              placeholder={param.description}
              className="min-h-[80px]"
            />
            {param.description && (
              <p className="text-xs text-gray-400">{param.description}</p>
            )}
          </div>
        )

      default:
        return (
          <div className="space-y-2">
            <Label className="text-sm font-medium">{param.label}</Label>
            <Input
              type={param.type === 'number' ? 'number' : 'text'}
              value={param.value as string | number}
              onChange={(e) => updateParameter(param.name, 
                param.type === 'number' ? parseFloat(e.target.value) || 0 : e.target.value
              )}
              min={param.min}
              max={param.max}
              step={param.step}
            />
            {param.description && (
              <p className="text-xs text-gray-400">{param.description}</p>
            )}
          </div>
        )
    }
  }

  return (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-900/10 to-blue-900/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-green-400">
            <Sliders className="h-5 w-5" />
            ⚙️ Precision Control: {actionName}
          </CardTitle>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={resetToDefaults}
              className="border-gray-500/30"
            >
              <RotateCcw className="h-4 w-4 mr-1" />
              Reset
            </Button>
            <Button
              size="sm"
              onClick={handlePreview}
              disabled={isExecuting}
              className="bg-blue-600 hover:bg-blue-700"
            >
              <Eye className="h-4 w-4 mr-1" />
              Preview Impact
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="parameters" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="parameters">⚙️ Parameters</TabsTrigger>
            <TabsTrigger value="preview">👁️ Preview</TabsTrigger>
            <TabsTrigger value="history">📜 History</TabsTrigger>
          </TabsList>

          <TabsContent value="parameters" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {parameters.map((param) => (
                <Card key={param.name} className="border-gray-700/50">
                  <CardContent className="p-4">
                    {renderParameter(param)}
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="flex items-center justify-center pt-4">
              <Button
                onClick={handleExecute}
                disabled={isExecuting}
                className="bg-green-600 hover:bg-green-700 px-8 py-2"
              >
                {isExecuting ? (
                  <>
                    <Clock className="h-4 w-4 mr-2 animate-spin" />
                    Executing...
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4 mr-2" />
                    Execute with Precision Control
                  </>
                )}
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="preview" className="space-y-4">
            {!preview ? (
              <Card className="border-blue-500/30">
                <CardContent className="p-6 text-center">
                  <Eye className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-blue-400 mb-2">No Preview Available</h3>
                  <p className="text-gray-400 mb-4">
                    Configure your parameters and click "Preview Impact" to see the estimated effects
                  </p>
                  <Button
                    onClick={handlePreview}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Target className="h-4 w-4 mr-2" />
                    Generate Preview
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-4">
                <Card className="border-blue-500/30">
                  <CardHeader>
                    <CardTitle className="text-blue-400 text-lg">📊 Impact Assessment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{preview.affectedItems}</div>
                        <div className="text-sm text-gray-400">Items Affected</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-white">{preview.estimatedTime}</div>
                        <div className="text-sm text-gray-400">Estimated Time</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold">
                          {preview.reversible ? (
                            <CheckCircle className="h-8 w-8 text-green-400 mx-auto" />
                          ) : (
                            <XCircle className="h-8 w-8 text-red-400 mx-auto" />
                          )}
                        </div>
                        <div className="text-sm text-gray-400">
                          {preview.reversible ? 'Reversible' : 'Not Reversible'}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="border-red-500/30">
                    <CardHeader>
                      <CardTitle className="text-red-400 text-sm">
                        <AlertTriangle className="h-4 w-4 inline mr-2" />
                        Potential Risks
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {preview.risks.map((risk, index) => (
                          <li key={index} className="text-sm text-red-300 flex items-start gap-2">
                            <span className="text-red-500 mt-1">•</span>
                            {risk}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="border-green-500/30">
                    <CardHeader>
                      <CardTitle className="text-green-400 text-sm">
                        <CheckCircle className="h-4 w-4 inline mr-2" />
                        Expected Benefits
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {preview.benefits.map((benefit, index) => (
                          <li key={index} className="text-sm text-green-300 flex items-start gap-2">
                            <span className="text-green-500 mt-1">•</span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={handleExecute}
                    disabled={isExecuting}
                    className="bg-green-600 hover:bg-green-700 px-8"
                  >
                    {isExecuting ? (
                      <>
                        <Clock className="h-4 w-4 mr-2 animate-spin" />
                        Executing...
                      </>
                    ) : (
                      <>
                        <Play className="h-4 w-4 mr-2" />
                        Proceed with Execution
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="history" className="space-y-3">
            {executionHistory.length === 0 ? (
              <Card className="border-gray-700/50">
                <CardContent className="p-6 text-center">
                  <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-400 mb-2">No Execution History</h3>
                  <p className="text-gray-500">
                    Execution history will appear here after running operations
                  </p>
                </CardContent>
              </Card>
            ) : (
              executionHistory.map((entry) => (
                <Card key={entry.id} className={`border ${
                  entry.status === 'success' ? 'border-green-500/50' : 
                  entry.status === 'error' ? 'border-red-500/50' : 'border-yellow-500/50'
                }`}>
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        {entry.status === 'success' ? (
                          <CheckCircle className="h-4 w-4 text-green-400" />
                        ) : entry.status === 'error' ? (
                          <XCircle className="h-4 w-4 text-red-400" />
                        ) : (
                          <Clock className="h-4 w-4 text-yellow-400" />
                        )}
                        <span className="font-medium text-white">{actionName}</span>
                        <Badge variant="outline" className={
                          entry.status === 'success' ? 'text-green-400 border-green-400' :
                          entry.status === 'error' ? 'text-red-400 border-red-400' :
                          'text-yellow-400 border-yellow-400'
                        }>
                          {entry.status.toUpperCase()}
                        </Badge>
                      </div>
                      <span className="text-xs text-gray-500">
                        {entry.timestamp.toLocaleString()}
                      </span>
                    </div>

                    {entry.result && (
                      <p className="text-sm text-green-300 mb-2">{entry.result}</p>
                    )}

                    {entry.error && (
                      <p className="text-sm text-red-300 mb-2">{entry.error}</p>
                    )}

                    <details className="text-xs">
                      <summary className="text-gray-400 cursor-pointer hover:text-white">
                        View Parameters
                      </summary>
                      <div className="mt-2 bg-gray-900/50 p-2 rounded">
                        <pre className="text-gray-300">
                          {JSON.stringify(entry.parameters, null, 2)}
                        </pre>
                      </div>
                    </details>
                  </CardContent>
                </Card>
              ))
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}