
import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, XCircle, Clock, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'failed';
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  failureReason?: string;
}

interface TaskCompleterProps {
  selectedTask: Task | null;
  toolName?: string;
  toolId?: string;
}

export function TaskCompleter({ selectedTask, toolName, toolId }: TaskCompleterProps) {
  const [taskStatus, setTaskStatus] = useState(selectedTask?.status || 'pending');
  const [completionResult, setCompletionResult] = useState<string | null>(null);
  const [failureReason, setFailureReason] = useState<string | null>(null);

  const executeTask = useCallback(async (taskId: string) => {
    console.log(`Executing task ${taskId}${toolName ? ` for ${toolName}` : ''}`);
    // Task execution logic here
  }, [toolName]);

  useEffect(() => {
    // Use executeTask in effect
    if (selectedTask) {
      executeTask(selectedTask.id);
    }
  }, [selectedTask, executeTask]);

  useEffect(() => {
    if (selectedTask) {
      setTaskStatus(selectedTask.status);
    }
  }, [selectedTask]);

  return (
    <Card className="border-blue-500/30 bg-gradient-to-br from-blue-900/20 to-purple-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-blue-400">
          {selectedTask ? selectedTask.title : 'No Task Selected'}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {selectedTask ? (
          <>
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="text-sm font-medium text-gray-400">
                  Status: {taskStatus}
                </p>
                <p className="text-xl font-bold text-white">
                  {selectedTask.description}
                </p>
                {toolName && (
                  <p className="text-sm text-gray-500">
                    Tool: {toolName} {toolId && `(${toolId})`}
                  </p>
                )}
              </div>
              <Badge className="bg-blue-600 text-white">
                {taskStatus === 'pending' && (
                  <>
                    <Clock className="h-3 w-3 mr-1" />
                    Pending
                  </>
                )}
                {taskStatus === 'in-progress' && (
                  <>
                    <Clock className="h-3 w-3 mr-1 animate-spin" />
                    In Progress
                  </>
                )}
                {taskStatus === 'completed' && (
                  <>
                    <CheckCircle className="h-3 w-3 mr-1" />
                    Completed
                  </>
                )}
                {taskStatus === 'failed' && (
                  <>
                    <XCircle className="h-3 w-3 mr-1" />
                    Failed
                  </>
                )}
              </Badge>
            </div>

            {taskStatus === 'failed' && (
              <div className="rounded-md border border-red-500/50 bg-red-900/20 p-4">
                <div className="flex items-center space-x-2">
                  <AlertTriangle className="h-4 w-4 text-red-400" />
                  <p className="text-sm font-medium text-red-400">
                    Failure Reason:
                  </p>
                </div>
                <p className="text-sm text-red-300">{failureReason || selectedTask.failureReason || 'Unknown'}</p>
              </div>
            )}

            {completionResult && (
              <div className="rounded-md border border-green-500/50 bg-green-900/20 p-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <p className="text-sm font-medium text-green-400">
                    Completion Result:
                  </p>
                </div>
                <p className="text-sm text-green-300">{completionResult}</p>
              </div>
            )}

            <div className="flex items-center space-x-2">
              {taskStatus === 'pending' && (
                <Button onClick={() => setTaskStatus('in-progress')} className="bg-blue-600 hover:bg-blue-700">
                  Start Task
                </Button>
              )}
              {taskStatus === 'in-progress' && (
                <>
                  <Button onClick={() => setTaskStatus('completed')} className="bg-green-600 hover:bg-green-700">
                    Complete Task
                  </Button>
                  <Button onClick={() => setTaskStatus('failed')} variant="destructive">
                    Mark as Failed
                  </Button>
                </>
              )}
            </div>
          </>
        ) : (
          <p className="text-gray-500">No task selected. Please select a task to view details and take action.</p>
        )}
      </CardContent>
    </Card>
  );
}
