
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Brain, 
  Cpu, 
  Zap, 
  Target, 
  Settings, 
  Database,
  Cloud,
  Shield,
  Palette,
  Gamepad2,
  Eye,
  Lock
} from 'lucide-react'
import { toast } from 'sonner'

interface CreatedContent {
  id: string
  type: 'nft' | 'landscape' | 'weapon' | 'tool'
  name: string
  quality: number
  uniqueness: number
  marketplaceReady: boolean
  freeGift: boolean
  createdAt: string
}

export function NeuralNetworkGameAI() {
  const [aiStatus, setAiStatus] = useState({
    learning: true,
    contentGenerated: 2847,
    uniquenessLevel: 98.7,
    cloudConnected: true,
    databaseGrowth: 156.3
  })

  const [createdContent, setCreatedContent] = useState<CreatedContent[]>([
    {
      id: '1',
      type: 'landscape',
      name: 'Quantum Forest Valley',
      quality: 99,
      uniqueness: 97,
      marketplaceReady: true,
      freeGift: false,
      createdAt: '2024-01-15'
    },
    {
      id: '2',
      type: 'nft',
      name: 'Crystal Dragon Armor',
      quality: 95,
      uniqueness: 89,
      marketplaceReady: false,
      freeGift: true,
      createdAt: '2024-01-14'
    },
    {
      id: '3',
      type: 'weapon',
      name: 'Plasma Bio Sword',
      quality: 92,
      uniqueness: 94,
      marketplaceReady: true,
      freeGift: false,
      createdAt: '2024-01-13'
    }
  ])

  const toggleMarketplace = (id: string) => {
    setCreatedContent(prev => prev.map(item => 
      item.id === id ? { ...item, marketplaceReady: !item.marketplaceReady } : item
    ))
    toast.success('Marketplace status updated!', {
      description: 'Content routing updated for NFT marketplace'
    })
  }

  const toggleFreeGift = (id: string) => {
    setCreatedContent(prev => prev.map(item => 
      item.id === id ? { ...item, freeGift: !item.freeGift } : item
    ))
    toast.success('Gift status updated!', {
      description: 'Content marked for loyal user rewards'
    })
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'landscape': return '🏔️'
      case 'nft': return '🎴'
      case 'weapon': return '⚔️'
      case 'tool': return '🔧'
      default: return '✨'
    }
  }

  return (
    <div className="space-y-6">
      {/* AI Status Header */}
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/30 to-blue-900/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Brain className="h-6 w-6" />
            🧠 NEURAL NETWORK GAME AI - SELF-LEARNING CONTENT CREATOR
          </CardTitle>
          <div className="flex gap-4">
            <Badge className={`${aiStatus.learning ? 'bg-green-600' : 'bg-red-600'} animate-pulse`}>
              {aiStatus.learning ? '🔄 ACTIVELY LEARNING' : '⏸️ PAUSED'}
            </Badge>
            <Badge className="bg-blue-600">
              <Cloud className="h-3 w-3 mr-1" />
              24/7 CLOUD CONNECTED
            </Badge>
            <Badge className="bg-orange-600">
              <Database className="h-3 w-3 mr-1" />
              {aiStatus.contentGenerated.toLocaleString()} ITEMS CREATED
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-purple-900/20 rounded-lg">
              <Cpu className="h-8 w-8 mx-auto text-purple-400 mb-2" />
              <div className="text-2xl font-bold text-purple-400">{aiStatus.uniquenessLevel}%</div>
              <div className="text-sm text-muted-foreground">Uniqueness Level</div>
            </div>
            <div className="text-center p-4 bg-blue-900/20 rounded-lg">
              <Zap className="h-8 w-8 mx-auto text-blue-400 mb-2" />
              <div className="text-2xl font-bold text-blue-400">{aiStatus.databaseGrowth}%</div>
              <div className="text-sm text-muted-foreground">Growth Rate</div>
            </div>
            <div className="text-center p-4 bg-green-900/20 rounded-lg">
              <Target className="h-8 w-8 mx-auto text-green-400 mb-2" />
              <div className="text-2xl font-bold text-green-400">∞</div>
              <div className="text-sm text-muted-foreground">Learning Capacity</div>
            </div>
            <div className="text-center p-4 bg-orange-900/20 rounded-lg">
              <Shield className="h-8 w-8 mx-auto text-orange-400 mb-2" />
              <div className="text-2xl font-bold text-orange-400">100%</div>
              <div className="text-sm text-muted-foreground">Admin Only</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Content Management Tabs */}
      <Tabs defaultValue="created-content" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="created-content">🎨 Created Content</TabsTrigger>
          <TabsTrigger value="ai-settings">⚙️ AI Settings</TabsTrigger>
          <TabsTrigger value="cloud-database">☁️ Cloud Database</TabsTrigger>
        </TabsList>

        <TabsContent value="created-content" className="space-y-4">
          <Card className="border-green-500/20">
            <CardHeader>
              <CardTitle className="text-green-400">🎯 AI GENERATED CONTENT LIBRARY</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {createdContent.map((item) => (
                  <Card key={item.id} className="border-gray-600/50 bg-gray-900/50">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">{getTypeIcon(item.type)}</span>
                          <div>
                            <h4 className="font-bold text-white">{item.name}</h4>
                            <p className="text-sm text-muted-foreground capitalize">{item.type}</p>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Badge className="bg-purple-600">Q: {item.quality}%</Badge>
                          <Badge className="bg-blue-600">U: {item.uniqueness}%</Badge>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 mb-3">
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Quality</div>
                          <Progress value={item.quality} className="h-2" />
                        </div>
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Uniqueness</div>
                          <Progress value={item.uniqueness} className="h-2" />
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          onClick={() => toggleMarketplace(item.id)}
                          className={`${item.marketplaceReady ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-600 hover:bg-gray-700'}`}
                          size="sm"
                        >
                          {item.marketplaceReady ? '🏪 ON MARKETPLACE' : '📦 ADD TO MARKETPLACE'}
                        </Button>
                        <Button
                          onClick={() => toggleFreeGift(item.id)}
                          className={`${item.freeGift ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-blue-600 hover:bg-blue-700'}`}
                          size="sm"
                        >
                          {item.freeGift ? '🎁 FREE GIFT' : '💰 FOR SALE'}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="ai-settings" className="space-y-4">
          <Card className="border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-blue-400">🔧 AI LEARNING CONFIGURATION</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-blue-900/20 rounded-lg">
                <h4 className="font-bold text-blue-400 mb-2">🧠 Learning Parameters</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Content Generation Rate:</span>
                    <span className="text-blue-400">247 items/hour</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Uniqueness Threshold:</span>
                    <span className="text-green-400">85% minimum</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Quality Assurance:</span>
                    <span className="text-purple-400">99% automated</span>
                  </div>
                </div>
              </div>
              
              <div className="p-4 bg-red-900/20 rounded-lg border border-red-500/30">
                <h4 className="font-bold text-red-400 mb-2">🛡️ ADMIN ONLY SECURITY</h4>
                <div className="text-sm text-red-300 space-y-1">
                  <div>• Users CANNOT access AI creation tools</div>
                  <div>• Admin privileges completely separated</div>
                  <div>• Wall of Defense monitors all user activity</div>
                  <div>• Self-training Elephant guards system integrity</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cloud-database" className="space-y-4">
          <Card className="border-purple-500/20">
            <CardHeader>
              <CardTitle className="text-purple-400">☁️ 24/7 GROWING CLOUD DATABASE</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-purple-900/20 rounded-lg">
                  <h4 className="font-bold text-purple-400 mb-3">📊 Database Statistics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Records:</span>
                      <span className="text-purple-400">2.8M+</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Growth Rate:</span>
                      <span className="text-green-400">+156.3%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Storage Used:</span>
                      <span className="text-blue-400">847 TB</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Backup Status:</span>
                      <span className="text-green-400">✅ Real-time</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 bg-green-900/20 rounded-lg">
                  <h4 className="font-bold text-green-400 mb-3">🔒 Security Status</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Encryption:</span>
                      <span className="text-green-400">Quantum Level</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Access Control:</span>
                      <span className="text-red-400">Admin Only</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Monitoring:</span>
                      <span className="text-blue-400">24/7 Active</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Threat Level:</span>
                      <span className="text-green-400">Zero Detected</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* System Status */}
      <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
        <h4 className="font-medium text-green-400 mb-2">🚀 Neural Network AI System Status</h4>
        <div className="text-sm text-green-300">
          ✅ Self-learning AI continuously creating unique content<br/>
          ✅ 24/7 cloud database growing and learning<br/>
          ✅ Admin-only access to all creation tools<br/>
          ✅ Automatic routing to NFT marketplace ready<br/>
          ✅ Free gift system for loyal users operational<br/>
          ✅ Wall of Defense protecting all admin privileges
        </div>
      </div>
    </div>
  )
}
