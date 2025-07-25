import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Brain, 
  Zap, 
  Target, 
  Activity, 
  Eye, 
  Shield, 
  Cpu, 
  Database,
  Network,
  Globe,
  Lock,
  AlertTriangle,
  CheckCircle,
  Settings,
  Play,
  Pause,
  RotateCcw,
  TrendingUp,
  Star,
  Crown,
  Infinity as InfinityIcon,
  Atom,
  Sparkles,
  Flame,
  Lightning,
  Radio,
  Radar,
  Satellite,
  Telescope,
  Microscope,
  Dna,
  Orbit,
  Layers,
  GitBranch,
  Network as NetworkIcon,
  Workflow,
  Timer,
  Gauge,
  BarChart,
  LineChart,
  PieChart,
  TrendingDown,
  ArrowUp,
  ArrowDown,
  ChevronRight,
  Plus,
  Minus,
  X,
  Check,
  Info,
  AlertCircle,
  HelpCircle,
  Search,
  Filter,
  SortAsc,
  SortDesc,
  Download,
  Upload,
  Share,
  Copy,
  Edit,
  Trash,
  Save,
  RefreshCw,
  Power,
  Volume2,
  VolumeX,
  Wifi,
  WifiOff,
  Bluetooth,
  Usb,
  Gem
} from 'lucide-react'
import { toast } from 'sonner'

interface AITool {
  name: string
  icon: React.ReactNode
  status: string
  power: number
  id: string
}

interface SystemLog {
  id: string
  timestamp: string
  event: string
  status: 'success' | 'warning' | 'error'
}

export function EinsteinCopilotDashboard() {
  const [systemHealth, setSystemHealth] = useState(95)
  const [aiEngagement, setAiEngagement] = useState(78)
  const [securityLevel, setSecurityLevel] = useState(92)
  const [activeTasks, setActiveTasks] = useState(15)
  const [dataThroughput, setDataThroughput] = useState(450)
  const [logEntries, setLogEntries] = useState<SystemLog[]>([])

  useEffect(() => {
    const logInterval = setInterval(() => {
      const newLog: SystemLog = {
        id: Math.random().toString(36).substring(7),
        timestamp: new Date().toLocaleTimeString(),
        event: `Simulated System Event ${logEntries.length + 1}`,
        status: ['success', 'warning', 'error'][Math.floor(Math.random() * 3)] as 'success' | 'warning' | 'error',
      }
      setLogEntries((prevLogs) => [newLog, ...prevLogs.slice(0, 9)])
    }, 5000)

    return () => clearInterval(logInterval)
  }, [logEntries])

  const aiTools = [
    { 
      name: 'Quantum Processor', 
      icon: <Gem className="h-5 w-5" />, 
      status: 'Active', 
      power: 99.8,
      id: 'quantum-processor'
    },
    { 
      name: 'Neural Net Optimizer', 
      icon: <Brain className="h-5 w-5" />, 
      status: 'Active', 
      power: 98.5,
      id: 'neural-net-optimizer'
    },
    { 
      name: 'Security Protocol', 
      icon: <Shield className="h-5 w-5" />, 
      status: 'Active', 
      power: 99.2,
      id: 'security-protocol'
    },
    { 
      name: 'Data Stream Analyzer', 
      icon: <Database className="h-5 w-5" />, 
      status: 'Active', 
      power: 97.9,
      id: 'data-stream-analyzer'
    },
    { 
      name: 'Task Automation Engine', 
      icon: <Cpu className="h-5 w-5" />, 
      status: 'Active', 
      power: 98.7,
      id: 'task-automation-engine'
    },
    { 
      name: 'Network Sentinel', 
      icon: <NetworkIcon className="h-5 w-5" />, 
      status: 'Active', 
      power: 99.5,
      id: 'network-sentinel'
    },
  ]

  const handleToolAction = (toolId: string, action: string) => {
    toast.success(`${action} initiated for ${toolId}`, { duration: 3000 })
  }

  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-br from-gray-900/70 to-gray-700/70 border-2 border-purple-500/50">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-500 text-center">
            🤖 Einstein Copilot - Admin Dashboard
          </CardTitle>
          <p className="text-center text-gray-300">Real-time monitoring and control of AI systems</p>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="bg-gray-800/50 border border-blue-500/30">
              <CardContent className="p-4">
                <div className="text-center">
                  <TrendingUp className="h-6 w-6 text-blue-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-blue-400">{systemHealth}%</div>
                  <p className="text-sm text-gray-400">System Health</p>
                  <Progress value={systemHealth} className="mt-2 h-2 bg-blue-700" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border border-green-500/30">
              <CardContent className="p-4">
                <div className="text-center">
                  <Activity className="h-6 w-6 text-green-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-green-400">{aiEngagement}%</div>
                  <p className="text-sm text-gray-400">AI Engagement</p>
                  <Progress value={aiEngagement} className="mt-2 h-2 bg-green-700" />
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border border-red-500/30">
              <CardContent className="p-4">
                <div className="text-center">
                  <Shield className="h-6 w-6 text-red-400 mx-auto mb-2" />
                  <div className="text-2xl font-bold text-red-400">{securityLevel}%</div>
                  <p className="text-sm text-gray-400">Security Level</p>
                  <Progress value={securityLevel} className="mt-2 h-2 bg-red-700" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card className="bg-gray-800/50 border border-yellow-500/30">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-yellow-400">
                  <Zap className="h-4 w-4 mr-2" />
                  Active Tasks
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-yellow-400">{activeTasks}</div>
                <p className="text-sm text-gray-400">Currently running AI tasks</p>
              </CardContent>
            </Card>

            <Card className="bg-gray-800/50 border border-cyan-500/30">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-cyan-400">
                  <Database className="h-4 w-4 mr-2" />
                  Data Throughput
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold text-cyan-400">{dataThroughput} MB/s</div>
                <p className="text-sm text-gray-400">Real-time data processing rate</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-300 mb-4">AI Tools Management</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {aiTools.map((tool) => (
                <Card key={tool.id} className="bg-gray-800/50 border border-purple-500/30">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-purple-400">
                      {tool.icon}
                      {tool.name}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-gray-400">Status:</span>
                      <Badge className="bg-green-600 text-white">{tool.status}</Badge>
                    </div>
                    <Progress value={tool.power} className="h-2 bg-purple-700" />
                    <div className="flex justify-between mt-2">
                      <span className="text-sm text-gray-400">Power:</span>
                      <span className="text-sm text-purple-400">{tool.power}%</span>
                    </div>
                    <div className="flex justify-end mt-4">
                      <Button size="sm" variant="outline" className="mr-2" onClick={() => handleToolAction(tool.id, 'Restart')}>
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Restart
                      </Button>
                      <Button size="sm" onClick={() => handleToolAction(tool.id, 'Analyze')}>
                        <Search className="h-4 w-4 mr-2" />
                        Analyze
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-xl font-bold text-gray-300 mb-4">System Logs</h3>
            <Card className="bg-gray-800/50 border border-gray-500/30">
              <CardContent className="p-4">
                <div className="overflow-y-auto h-48">
                  {logEntries.length > 0 ? (
                    <ul className="space-y-2">
                      {logEntries.map((log) => (
                        <li key={log.id} className="flex items-center justify-between">
                          <div>
                            <span className="text-xs text-gray-400">{log.timestamp}</span>
                            <p className="text-sm text-gray-300">{log.event}</p>
                          </div>
                          {log.status === 'success' && <CheckCircle className="h-4 w-4 text-green-500" />}
                          {log.status === 'warning' && <AlertTriangle className="h-4 w-4 text-yellow-500" />}
                          {log.status === 'error' && <AlertCircle className="h-4 w-4 text-red-500" />}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-gray-400">No system logs available.</p>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
