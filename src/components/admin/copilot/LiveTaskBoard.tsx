import React, { useState, useEffect, useCallback } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { MoreVertical, UserRound, CheckCircle2, Clock4, AlertTriangle, PauseCircle, PlayCircle } from 'lucide-react';
import { toast } from 'sonner';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed' | 'blocked';
  assignee: {
    name: string;
    avatar: string;
  };
  priority: 'high' | 'medium' | 'low';
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  suggestions?: any[];
}

const taskData: Task[] = [
  {
    id: '1',
    title: 'Design Onboarding Flow',
    description: 'Create a seamless onboarding experience for new users.',
    status: 'pending',
    assignee: {
      name: 'Alice Johnson',
      avatar: 'https://avatar.vercel.sh/1.png',
    },
    priority: 'high',
    createdAt: new Date(),
    suggestions: [
      { type: 'copy', content: 'Simplify the initial steps to reduce drop-off.' },
      { type: 'design', content: 'Use visual cues to guide users through the process.' },
    ],
  },
  {
    id: '2',
    title: 'Implement User Authentication',
    description: 'Set up secure authentication methods for user accounts.',
    status: 'in-progress',
    assignee: {
      name: 'Bob Williams',
      avatar: 'https://avatar.vercel.sh/2.png',
    },
    priority: 'medium',
    createdAt: new Date(),
    startedAt: new Date(),
    suggestions: [
      { type: 'code', content: 'Use OAuth 2.0 for third-party authentication.' },
    ],
  },
  {
    id: '3',
    title: 'Write Blog Post',
    description: 'Draft a blog post about the latest product updates.',
    status: 'completed',
    assignee: {
      name: 'Charlie Brown',
      avatar: 'https://avatar.vercel.sh/3.png',
    },
    priority: 'low',
    createdAt: new Date(),
    startedAt: new Date(),
    completedAt: new Date(),
    suggestions: [],
  },
  {
    id: '4',
    title: 'Fix Performance Bottleneck',
    description: 'Identify and resolve the main performance issues.',
    status: 'blocked',
    assignee: {
      name: 'Diana Miller',
      avatar: 'https://avatar.vercel.sh/4.png',
    },
    priority: 'high',
    createdAt: new Date(),
    suggestions: [
      { type: 'code', content: 'Profile the application to find slow queries.' },
    ],
  },
];

export function LiveTaskBoard() {
  const [tasks, setTasks] = useState<Task[]>(taskData);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newTaskDescription, setNewTaskDescription] = useState('');
  const [isAutoProcessing, setIsAutoProcessing] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const startTask = useCallback((taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: 'in-progress', startedAt: new Date() }
        : task
    ));
  }, []);

  const autoProcessTasks = useCallback(() => {
    if (!isAutoProcessing) return;
    
    // Auto-process logic here
    console.log('Auto-processing tasks...');
  }, [isAutoProcessing]);

  const applySuggestion = useCallback((taskId: string, suggestion: any) => {
    console.log(`Applying suggestion to task ${taskId}:`, suggestion);
    // Apply suggestion logic here
  }, []);

  useEffect(() => {
    if (isAutoProcessing) {
      autoProcessTasks();
    }
  }, [isAutoProcessing, autoProcessTasks]);

  const completeTask = (taskId: string) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId
        ? { ...task, status: 'completed', completedAt: new Date() }
        : task
    ));
    toast.success('Task Completed', {
      description: 'The task has been marked as completed.',
      duration: 3000,
    });
  };

  const blockTask = (taskId: string) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId
        ? { ...task, status: 'blocked' }
        : task
    ));
    toast.warning('Task Blocked', {
      description: 'The task has been marked as blocked.',
      duration: 3000,
    });
  };

  const addTask = () => {
    if (newTaskTitle.trim() === '' || newTaskDescription.trim() === '') {
      toast.error('Please fill in all fields', {
        description: 'Task title and description cannot be empty.',
        duration: 3000,
      });
      return;
    }

    const newTask: Task = {
      id: Date.now().toString(),
      title: newTaskTitle,
      description: newTaskDescription,
      status: 'pending',
      assignee: {
        name: 'Unassigned',
        avatar: 'https://avatar.vercel.sh/0.png',
      },
      priority: 'medium',
      createdAt: new Date(),
      suggestions: [],
    };

    setTasks(prev => [...prev, newTask]);
    setNewTaskTitle('');
    setNewTaskDescription('');
    toast.success('Task Added', {
      description: 'A new task has been added to the board.',
      duration: 3000,
    });
  };

  const toggleAutoProcessing = () => {
    setIsAutoProcessing(prev => !prev);
    toast.info(`Auto Processing ${isAutoProcessing ? 'Disabled' : 'Enabled'}`, {
      description: `Task auto-processing has been ${isAutoProcessing ? 'disabled' : 'enabled'}.`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">
            🚀 Live Task Board
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Manage tasks in real-time with Copilot assistance.
          </p>
        </div>

        {/* Task Creation */}
        <Card className="border-blue-500/30 bg-gradient-to-br from-blue-100/40 to-purple-100/40">
          <CardHeader>
            <CardTitle>➕ Add New Task</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="task-title">Task Title</Label>
                <Input
                  type="text"
                  id="task-title"
                  placeholder="Enter task title"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="task-description">Task Description</Label>
                <Textarea
                  id="task-description"
                  placeholder="Enter task description"
                  value={newTaskDescription}
                  onChange={(e) => setNewTaskDescription(e.target.value)}
                />
              </div>
            </div>
            <Button onClick={addTask} className="bg-blue-600 hover:bg-blue-700 text-white">
              Add Task
            </Button>
          </CardContent>
        </Card>

        {/* Task Table */}
        <Card className="border-purple-500/30 bg-gradient-to-br from-purple-50/40 to-pink-50/40">
          <CardHeader>
            <CardTitle>📊 Current Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[200px]">Task</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Assignee</TableHead>
                  <TableHead>Priority</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id}>
                    <TableCell className="font-medium">{task.title}</TableCell>
                    <TableCell>
                      {task.status === 'pending' && <Badge variant="secondary">Pending</Badge>}
                      {task.status === 'in-progress' && <Badge className="bg-blue-500 text-white">In Progress</Badge>}
                      {task.status === 'completed' && <Badge className="bg-green-500 text-white">Completed</Badge>}
                      {task.status === 'blocked' && <Badge className="bg-red-500 text-white">Blocked</Badge>}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Avatar>
                          <AvatarImage src={task.assignee.avatar} alt={task.assignee.name} />
                          <AvatarFallback>{task.assignee.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>
                        <span>{task.assignee.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{task.priority}</TableCell>
                    <TableCell>{task.createdAt.toLocaleDateString()}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem onClick={() => startTask(task.id)}>
                            <Clock4 className="h-4 w-4 mr-2" />
                            Start Task
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => completeTask(task.id)}>
                            <CheckCircle2 className="h-4 w-4 mr-2" />
                            Complete Task
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => blockTask(task.id)}>
                            <AlertTriangle className="h-4 w-4 mr-2" />
                            Block Task
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => setSelectedTask(task)}>
                            <UserRound className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Auto Processing Toggle */}
        <Card className="border-green-500/30 bg-gradient-to-br from-green-50/40 to-lime-50/40">
          <CardHeader>
            <CardTitle>🤖 Auto Task Processing</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <Label htmlFor="auto-process">Enable Auto Processing</Label>
              <Checkbox
                id="auto-process"
                checked={isAutoProcessing}
                onCheckedChange={toggleAutoProcessing}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
