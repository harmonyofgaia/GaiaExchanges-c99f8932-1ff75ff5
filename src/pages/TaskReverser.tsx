
import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { RotateCcw, AlertTriangle, CheckCircle } from 'lucide-react'
import { toast } from 'sonner'

export default function TaskReverser() {
  const [taskId, setTaskId] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const handleReverseTask = async () => {
    if (!taskId.trim()) {
      toast.error('Please enter a valid task ID')
      return
    }

    setIsProcessing(true)
    
    // Simulate task reversal process
    setTimeout(() => {
      setIsProcessing(false)
      toast.success('Task reversal initiated successfully')
      setTaskId('')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-red-900/20 via-orange-900/20 to-yellow-900/20 p-6">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-400 via-orange-400 to-yellow-400 bg-clip-text text-transparent mb-4">
            ⚡ Task Reverser System
          </h1>
          <p className="text-xl text-mutable-foreground">
            Advanced task reversal and system rollback capabilities
          </p>
        </div>

        <div className="grid gap-6">
          <Card className="border-red-500/30 bg-red-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <AlertTriangle className="h-6 w-6" />
                Warning: Admin Only Feature
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-300 mb-4">
                This system allows authorized administrators to reverse specific tasks and operations. 
                Use with extreme caution as this can affect system state and user data.
              </p>
            </CardContent>
          </Card>

          <Card className="border-orange-500/30 bg-orange-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-400">
                <RotateCcw className="h-6 w-6" />
                Task Reversal Interface
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="taskId" className="text-orange-300">Task ID</Label>
                <Input
                  id="taskId"
                  value={taskId}
                  onChange={(e) => setTaskId(e.target.value)}
                  placeholder="Enter task ID to reverse..."
                  className="bg-black/40 border-orange-500/30"
                />
              </div>
              
              <Button 
                onClick={handleReverseTask}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700"
              >
                {isProcessing ? 'Processing Reversal...' : 'Reverse Task'}
              </Button>
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <CheckCircle className="h-6 w-6" />
                Recent Reversals
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex justify-between items-center p-2 bg-green-900/30 rounded">
                  <span className="text-green-300">Task #12345 - Transaction Reversal</span>
                  <span className="text-xs text-green-400">2 mins ago</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-green-900/30 rounded">
                  <span className="text-green-300">Task #12344 - User Action Rollback</span>
                  <span className="text-xs text-green-400">15 mins ago</span>
                </div>
                <div className="flex justify-between items-center p-2 bg-green-900/30 rounded">
                  <span className="text-green-300">Task #12343 - System State Reset</span>
                  <span className="text-xs text-green-400">1 hour ago</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
