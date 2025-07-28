
import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Database, Shield, Clock, CheckCircle, AlertTriangle } from 'lucide-react'
import { toast } from 'sonner'

interface BackupStatus {
  id: string
  timestamp: string
  type: 'full' | 'incremental' | 'differential'
  status: 'completed' | 'in-progress' | 'failed'
  size: string
  duration: string
}

export function AutomatedBackupSystem() {
  const [backupHistory, setBackupHistory] = useState<BackupStatus[]>([])
  const [currentBackup, setCurrentBackup] = useState<BackupStatus | null>(null)
  const [backupProgress, setBackupProgress] = useState(0)
  const [systemHealth, setSystemHealth] = useState(98.5)

  useEffect(() => {
    // Initialize backup history
    const initialBackups: BackupStatus[] = [
      {
        id: 'backup_001',
        timestamp: new Date(Date.now() - 86400000).toISOString(),
        type: 'full',
        status: 'completed',
        size: '2.4 GB',
        duration: '45 minutes'
      },
      {
        id: 'backup_002',
        timestamp: new Date(Date.now() - 43200000).toISOString(),
        type: 'incremental',
        status: 'completed',
        size: '256 MB',
        duration: '8 minutes'
      },
      {
        id: 'backup_003',
        timestamp: new Date(Date.now() - 21600000).toISOString(),
        type: 'incremental',
        status: 'completed',
        size: '142 MB',
        duration: '5 minutes'
      }
    ]
    setBackupHistory(initialBackups)

    // Simulate automated backups every hour
    const backupInterval = setInterval(() => {
      initiateAutomaticBackup()
    }, 300000) // 5 minutes for demo

    return () => clearInterval(backupInterval)
  }, [])

  const initiateAutomaticBackup = () => {
    const newBackup: BackupStatus = {
      id: `backup_${Date.now()}`,
      timestamp: new Date().toISOString(),
      type: Math.random() > 0.7 ? 'full' : 'incremental',
      status: 'in-progress',
      size: '0 MB',
      duration: '0 minutes'
    }

    setCurrentBackup(newBackup)
    setBackupProgress(0)
    
    console.log('🔄 Automated backup initiated:', newBackup.type)
    toast.info(`${newBackup.type.toUpperCase()} backup started`)

    // Simulate backup progress
    const progressInterval = setInterval(() => {
      setBackupProgress(prev => {
        const newProgress = Math.min(100, prev + Math.random() * 10)
        
        if (newProgress >= 100) {
          clearInterval(progressInterval)
          
          const completedBackup = {
            ...newBackup,
            status: 'completed' as const,
            size: newBackup.type === 'full' ? `${(Math.random() * 2 + 1).toFixed(1)} GB` : `${Math.floor(Math.random() * 500 + 100)} MB`,
            duration: `${Math.floor(Math.random() * 40 + 5)} minutes`
          }
          
          setBackupHistory(prev => [completedBackup, ...prev.slice(0, 9)])
          setCurrentBackup(null)
          setBackupProgress(0)
          
          console.log('✅ Automated backup completed')
          toast.success('Backup completed successfully')
        }
        
        return newProgress
      })
    }, 1000)
  }

  const initiateManualBackup = (type: 'full' | 'incremental') => {
    if (currentBackup) {
      toast.error('Backup already in progress')
      return
    }

    const newBackup: BackupStatus = {
      id: `manual_${Date.now()}`,
      timestamp: new Date().toISOString(),
      type,
      status: 'in-progress',
      size: '0 MB',
      duration: '0 minutes'
    }

    setCurrentBackup(newBackup)
    initiateAutomaticBackup()
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-900/30'
      case 'in-progress': return 'text-yellow-400 bg-yellow-900/30'
      case 'failed': return 'text-red-400 bg-red-900/30'
      default: return 'text-gray-400 bg-gray-900/30'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return CheckCircle
      case 'in-progress': return Clock
      case 'failed': return AlertTriangle
      default: return Database
    }
  }

  return (
    <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Shield className="h-6 w-6" />
          Automated Backup System
          <Badge className="bg-green-600">ACTIVE</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-green-900/30 rounded-lg">
            <Database className="h-8 w-8 mx-auto text-green-400 mb-2" />
            <div className="text-2xl font-bold text-green-400">{systemHealth}%</div>
            <div className="text-sm text-muted-foreground">System Health</div>
          </div>
          
          <div className="text-center p-4 bg-blue-900/30 rounded-lg">
            <Shield className="h-8 w-8 mx-auto text-blue-400 mb-2" />
            <div className="text-2xl font-bold text-blue-400">{backupHistory.length}</div>
            <div className="text-sm text-muted-foreground">Successful Backups</div>
          </div>
          
          <div className="text-center p-4 bg-purple-900/30 rounded-lg">
            <Clock className="h-8 w-8 mx-auto text-purple-400 mb-2" />
            <div className="text-2xl font-bold text-purple-400">
              {backupHistory[0] ? new Date(backupHistory[0].timestamp).toLocaleTimeString() : 'N/A'}
            </div>
            <div className="text-sm text-muted-foreground">Last Backup</div>
          </div>
        </div>

        {currentBackup && (
          <div className="bg-black/40 p-4 rounded-lg border border-yellow-500/30">
            <h4 className="text-yellow-400 font-bold mb-3">Backup In Progress</h4>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-white">{currentBackup.type.toUpperCase()} Backup</span>
                <span className="text-yellow-400">{backupProgress.toFixed(0)}%</span>
              </div>
              <Progress value={backupProgress} className="h-2" />
            </div>
          </div>
        )}

        <div className="flex gap-3">
          <Button 
            onClick={() => initiateManualBackup('full')}
            disabled={!!currentBackup}
            className="bg-green-600 hover:bg-green-700"
          >
            <Database className="h-4 w-4 mr-2" />
            Full Backup
          </Button>
          <Button 
            onClick={() => initiateManualBackup('incremental')}
            disabled={!!currentBackup}
            className="bg-blue-600 hover:bg-blue-700"
          >
            <Shield className="h-4 w-4 mr-2" />
            Incremental Backup
          </Button>
        </div>

        <div className="space-y-3">
          <h4 className="text-white font-bold">Recent Backup History</h4>
          {backupHistory.map((backup) => {
            const StatusIcon = getStatusIcon(backup.status)
            return (
              <div key={backup.id} className="flex items-center justify-between p-3 bg-black/30 rounded-lg">
                <div className="flex items-center gap-3">
                  <StatusIcon className="h-5 w-5 text-green-400" />
                  <div>
                    <div className="text-white font-medium">
                      {backup.type.toUpperCase()} - {new Date(backup.timestamp).toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Size: {backup.size} • Duration: {backup.duration}
                    </div>
                  </div>
                </div>
                <Badge className={getStatusColor(backup.status)}>
                  {backup.status.toUpperCase()}
                </Badge>
              </div>
            )
          })}
        </div>
      </CardContent>
    </Card>
  )
}
