
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AdminMetrics } from './AdminMetrics'
import { AdminTabs } from './AdminTabs'
import { toast } from 'sonner'

interface SystemHealth {
  server: number
  database: number
  network: number
  security: number
  performance: number
}

interface AdminMetrics {
  totalUsers: number
  activeUsers: number
  totalTransactions: number
  serverUptime: number
  securityThreats: number
  systemLoad: number
}

export function AdminDashboard() {
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    server: 99.8,
    database: 100,
    network: 98.5,
    security: 100,
    performance: 95.2
  })

  const [adminMetrics, setAdminMetrics] = useState<AdminMetrics>({
    totalUsers: 125847,
    activeUsers: 48750,
    totalTransactions: 2847593,
    serverUptime: 99.99,
    securityThreats: 0,
    systemLoad: 23.5
  })

  const [realTimeAlerts, setRealTimeAlerts] = useState<string[]>([])

  useEffect(() => {
    const updateAdminData = () => {
      setSystemHealth(prev => ({
        server: Math.min(100, prev.server + (Math.random() - 0.5) * 0.1),
        database: Math.min(100, prev.database + (Math.random() - 0.5) * 0.05),
        network: Math.min(100, prev.network + (Math.random() - 0.5) * 0.2),
        security: 100,
        performance: Math.min(100, prev.performance + (Math.random() - 0.5) * 0.3)
      }))

      setAdminMetrics(prev => ({
        ...prev,
        activeUsers: prev.activeUsers + Math.floor(Math.random() * 50 - 25),
        totalTransactions: prev.totalTransactions + Math.floor(Math.random() * 100),
        systemLoad: Math.max(0, Math.min(100, prev.systemLoad + (Math.random() - 0.5) * 2))
      }))

      if (Math.random() > 0.8) {
        const alerts = [
          '🚀 Performance boost applied - 10x speed increase detected',
          '🛡️ Security scan completed - All systems secure',
          '📊 New user milestone reached - Growth accelerating',
          '⚡ Network optimization successful - Latency improved',
          '🌍 Global expansion - New region activated'
        ]
        const newAlert = alerts[Math.floor(Math.random() * alerts.length)]
        setRealTimeAlerts(prev => [newAlert, ...prev.slice(0, 4)])
      }
    }

    const interval = setInterval(updateAdminData, 3000)
    return () => clearInterval(interval)
  }, [])

  const handleSystemAction = (action: string) => {
    toast.success(`Admin Action: ${action}`, {
      description: 'System operation completed successfully'
    })
  }

  return (
    <div className="space-y-6">
      <AdminMetrics systemHealth={systemHealth} adminMetrics={adminMetrics} />
      <AdminTabs 
        adminMetrics={adminMetrics} 
        realTimeAlerts={realTimeAlerts} 
        handleSystemAction={handleSystemAction} 
      />

      {/* Admin Quick Actions */}
      <Card className="border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-purple-400">🚀 Quick Admin Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Button 
              onClick={() => handleSystemAction('System Optimization')}
              className="bg-green-600 hover:bg-green-700"
            >
              Optimize System
            </Button>
            <Button 
              onClick={() => handleSystemAction('Security Scan')}
              className="bg-red-600 hover:bg-red-700"
            >
              Run Security Scan
            </Button>
            <Button 
              onClick={() => handleSystemAction('Performance Boost')}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Apply 10x Boost
            </Button>
            <Button 
              onClick={() => handleSystemAction('System Backup')}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Create Backup
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
