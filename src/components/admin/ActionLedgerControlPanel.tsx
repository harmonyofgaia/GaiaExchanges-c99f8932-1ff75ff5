import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export function ActionLedgerControlPanel() {
  const [ledgerStatus, setLedgerStatus] = useState('active')

  const recentActions = [
    { id: 1, action: 'User Login', user: 'admin@gaia.com', timestamp: '2024-01-15 14:30:25', status: 'success' },
    { id: 2, action: 'Database Query', user: 'system', timestamp: '2024-01-15 14:29:18', status: 'success' },
    { id: 3, action: 'Security Scan', user: 'ai-defense', timestamp: '2024-01-15 14:28:45', status: 'success' },
    { id: 4, action: 'Token Burn', user: 'admin@gaia.com', timestamp: '2024-01-15 14:27:12', status: 'success' },
    { id: 5, action: 'Backup Creation', user: 'system', timestamp: '2024-01-15 14:25:33', status: 'success' }
  ]

  const actionStats = [
    { name: 'Total Actions', value: 45672, change: '+12%' },
    { name: 'Successful Actions', value: 45501, change: '+0.3%' },
    { name: 'Failed Actions', value: 171, change: '-5%' },
    { name: 'Active Users', value: 23, change: '+8%' }
  ]

  const actionCategories = [
    { category: 'Authentication', count: 15234, percentage: 33.4 },
    { category: 'Database Operations', count: 12876, percentage: 28.2 },
    { category: 'Security Scans', count: 8934, percentage: 19.6 },
    { category: 'System Maintenance', count: 5678, percentage: 12.4 },
    { category: 'User Management', count: 2950, percentage: 6.4 }
  ]

  return (
    <div className="space-y-6">
      <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/30 to-indigo-900/30">
        <CardHeader>
          <CardTitle className="text-blue-400 flex items-center gap-2">
            📋 Action Ledger Control Panel
            <Badge variant="outline" className="border-blue-500 text-blue-400">
              {ledgerStatus.toUpperCase()}
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {actionStats.map((stat, index) => (
              <Card key={index} className="border-blue-500/20">
                <CardContent className="p-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-400">{stat.value.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">{stat.name}</div>
                    <Badge variant="outline" className={`mt-2 ${
                      stat.change.includes('+') ? 'border-green-500 text-green-400' : 'border-red-500 text-red-400'
                    }`}>
                      {stat.change}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="border-green-500/30">
              <CardHeader>
                <CardTitle className="text-green-400">📊 Recent Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentActions.map((action) => (
                    <div key={action.id} className="flex items-center justify-between p-3 border border-green-500/20 rounded-lg">
                      <div>
                        <div className="text-green-400 font-semibold">{action.action}</div>
                        <div className="text-sm text-muted-foreground">{action.user}</div>
                        <div className="text-xs text-gray-500">{action.timestamp}</div>
                      </div>
                      <Badge variant="outline" className="border-green-500 text-green-400">
                        {action.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-purple-500/30">
              <CardHeader>
                <CardTitle className="text-purple-400">📈 Action Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {actionCategories.map((category, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-purple-400">{category.category}</span>
                        <span className="text-sm text-muted-foreground">{category.count.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full" 
                          style={{ width: `${category.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="flex gap-4 mt-6">
            <Button className="bg-blue-600 hover:bg-blue-700">
              🔄 Refresh Ledger
            </Button>
            <Button variant="outline" className="border-green-500 text-green-400">
              📊 Export Report
            </Button>
            <Button variant="outline" className="border-purple-500 text-purple-400">
              🔍 Advanced Search
            </Button>
            <Button variant="outline" className="border-red-500 text-red-400">
              🗑️ Clear Old Entries
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}