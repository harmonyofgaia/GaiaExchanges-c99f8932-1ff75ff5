
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Shield, 
  AlertTriangle, 
  CheckCircle, 
  XCircle, 
  Search,
  Filter,
  Eye,
  Flag,
  Clock,
  Users,
  Bot
} from 'lucide-react'
import { toast } from 'sonner'

interface ModerationItem {
  id: string
  type: 'video' | 'music' | 'comment' | 'stream'
  title: string
  creator: string
  reportReason: string
  status: 'pending' | 'approved' | 'rejected' | 'under_review'
  aiScore: number
  flaggedContent: string[]
  timestamp: Date
  thumbnail?: string
}

export function VideoContentModeration() {
  const [activeTab, setActiveTab] = useState<'queue' | 'ai-analysis' | 'reports' | 'settings'>('queue')
  const [searchQuery, setSearchQuery] = useState('')
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'flagged'>('all')
  
  const [moderationQueue, setModerationQueue] = useState<ModerationItem[]>([
    {
      id: '1',
      type: 'video',
      title: 'Solar Panel Installation Tutorial',
      creator: 'GreenTechMike',
      reportReason: 'Spam content',
      status: 'pending',
      aiScore: 0.2,
      flaggedContent: ['promotional'],
      timestamp: new Date(),
      thumbnail: '/api/placeholder/160/90'
    },
    {
      id: '2',
      type: 'music',
      title: 'Nature Sounds Meditation',
      creator: 'EcoWarriorSarah',
      reportReason: 'Copyright violation',
      status: 'under_review',
      aiScore: 0.8,
      flaggedContent: ['copyright'],
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '3',
      type: 'comment',
      title: 'Comment on: Climate Change Solutions',
      creator: 'Anonymous',
      reportReason: 'Harassment',
      status: 'pending',
      aiScore: 0.9,
      flaggedContent: ['harassment', 'inappropriate'],
      timestamp: new Date(Date.now() - 7200000),
    }
  ])

  const handleModerationAction = (itemId: string, action: 'approve' | 'reject') => {
    setModerationQueue(prev => 
      prev.map(item => 
        item.id === itemId 
          ? { ...item, status: action === 'approve' ? 'approved' : 'rejected' }
          : item
      )
    )
    
    toast.success(`Content ${action}d successfully`, {
      description: `Moderation action completed for item ${itemId}`
    })
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-400'
      case 'approved': return 'bg-green-500/20 text-green-400'
      case 'rejected': return 'bg-red-500/20 text-red-400'
      case 'under_review': return 'bg-blue-500/20 text-blue-400'
      default: return 'bg-gray-500/20 text-gray-400'
    }
  }

  const getRiskLevel = (score: number) => {
    if (score < 0.3) return { level: 'Low', color: 'text-green-400' }
    if (score < 0.7) return { level: 'Medium', color: 'text-yellow-400' }
    return { level: 'High', color: 'text-red-400' }
  }

  const filteredQueue = moderationQueue.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.creator.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'pending' && item.status === 'pending') ||
                         (filterStatus === 'flagged' && item.aiScore > 0.7)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="space-y-6">
      <Card className="border-orange-500/30 bg-gradient-to-r from-orange-900/20 to-red-900/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-orange-400" />
            Advanced Content Moderation
            <Badge variant="secondary" className="bg-orange-500/20 text-orange-400">AI-Powered</Badge>
          </CardTitle>
          <p className="text-muted-foreground">
            AI-powered content safety and moderation system for the GAiA community
          </p>
        </CardHeader>
      </Card>

      <div className="flex gap-2 mb-4">
        <Button
          variant={activeTab === 'queue' ? 'default' : 'outline'}
          onClick={() => setActiveTab('queue')}
          className="flex items-center gap-2"
        >
          <Clock className="h-4 w-4" />
          Moderation Queue
        </Button>
        <Button
          variant={activeTab === 'ai-analysis' ? 'default' : 'outline'}
          onClick={() => setActiveTab('ai-analysis')}
          className="flex items-center gap-2"
        >
          <Bot className="h-4 w-4" />
          AI Analysis
        </Button>
        <Button
          variant={activeTab === 'reports' ? 'default' : 'outline'}
          onClick={() => setActiveTab('reports')}
          className="flex items-center gap-2"
        >
          <Flag className="h-4 w-4" />
          User Reports
        </Button>
        <Button
          variant={activeTab === 'settings' ? 'default' : 'outline'}
          onClick={() => setActiveTab('settings')}
          className="flex items-center gap-2"
        >
          <Shield className="h-4 w-4" />
          Settings
        </Button>
      </div>

      {activeTab === 'queue' && (
        <div className="space-y-4">
          <div className="flex gap-4 items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search content, creators, or reports..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setFilterStatus(filterStatus === 'all' ? 'pending' : filterStatus === 'pending' ? 'flagged' : 'all')}
              className="flex items-center gap-2"
            >
              <Filter className="h-4 w-4" />
              {filterStatus === 'all' ? 'All Items' : filterStatus === 'pending' ? 'Pending' : 'Flagged'}
            </Button>
          </div>

          <div className="grid gap-4">
            {filteredQueue.map((item) => {
              const risk = getRiskLevel(item.aiScore)
              return (
                <Card key={item.id} className="border-purple-500/30">
                  <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="text-xs">
                            {item.type.toUpperCase()}
                          </Badge>
                          <Badge className={getStatusColor(item.status)}>
                            {item.status.replace('_', ' ')}
                          </Badge>
                          <Badge variant="outline" className={risk.color}>
                            {risk.level} Risk
                          </Badge>
                        </div>
                        
                        <h3 className="font-semibold mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground mb-2">by {item.creator}</p>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          {item.flaggedContent.map((flag) => (
                            <Badge key={flag} variant="destructive" className="text-xs">
                              {flag}
                            </Badge>
                          ))}
                        </div>
                        
                        <p className="text-sm text-muted-foreground">
                          Reported: {item.reportReason} • AI Score: {(item.aiScore * 100).toFixed(0)}%
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {item.timestamp.toLocaleString()}
                        </p>
                      </div>
                      
                      {item.status === 'pending' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleModerationAction(item.id, 'approve')}
                            className="text-green-400 border-green-400 hover:bg-green-400/10"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleModerationAction(item.id, 'reject')}
                            className="text-red-400 border-red-400 hover:bg-red-400/10"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      )}

      {activeTab === 'ai-analysis' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-4 text-center">
                <Bot className="h-8 w-8 text-blue-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">96.8%</div>
                <div className="text-sm text-muted-foreground">AI Accuracy</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <AlertTriangle className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">23</div>
                <div className="text-sm text-muted-foreground">Items Flagged Today</div>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-4 text-center">
                <Shield className="h-8 w-8 text-green-400 mx-auto mb-2" />
                <div className="text-2xl font-bold">0.3s</div>
                <div className="text-sm text-muted-foreground">Avg Analysis Time</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>AI Detection Categories</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  { category: 'Spam/Promotional', count: 8, accuracy: '98%' },
                  { category: 'Harassment', count: 5, accuracy: '95%' },
                  { category: 'Copyright Violation', count: 3, accuracy: '92%' },
                  { category: 'Inappropriate Content', count: 7, accuracy: '97%' }
                ].map((item) => (
                  <div key={item.category} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <div>
                      <h4 className="font-medium">{item.category}</h4>
                      <p className="text-sm text-muted-foreground">{item.count} items detected</p>
                    </div>
                    <Badge variant="outline" className="text-green-400 border-green-400">
                      {item.accuracy}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === 'reports' && (
        <Card>
          <CardHeader>
            <CardTitle>Community Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                  <div>
                    <h4 className="font-medium">Report #{i}</h4>
                    <p className="text-sm text-muted-foreground">Reported by community member • 2 hours ago</p>
                  </div>
                  <Button size="sm" variant="outline">
                    <Eye className="h-4 w-4 mr-1" />
                    Review
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === 'settings' && (
        <Card>
          <CardHeader>
            <CardTitle>Moderation Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-medium">AI Sensitivity</h4>
                <div className="grid grid-cols-3 gap-2">
                  {['Conservative', 'Balanced', 'Strict'].map((level) => (
                    <Button key={level} variant="outline" size="sm">
                      {level}
                    </Button>
                  ))}
                </div>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-medium">Auto-Actions</h4>
                <div className="space-y-2">
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Auto-approve low-risk content</span>
                  </label>
                  <label className="flex items-center space-x-2">
                    <input type="checkbox" className="rounded" />
                    <span className="text-sm">Auto-flag high-risk content</span>
                  </label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
