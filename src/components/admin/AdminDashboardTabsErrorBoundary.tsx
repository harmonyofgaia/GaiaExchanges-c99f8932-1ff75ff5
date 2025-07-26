import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface AdminDashboardTabsErrorBoundaryState {
  hasError: boolean
  error: Error | null
  errorInfo: React.ErrorInfo | null
}

interface AdminDashboardTabsErrorBoundaryProps {
  children: React.ReactNode
  tabName: string
}

export class AdminDashboardTabsErrorBoundary extends React.Component<
  AdminDashboardTabsErrorBoundaryProps,
  AdminDashboardTabsErrorBoundaryState
> {
  constructor(props: AdminDashboardTabsErrorBoundaryProps) {
    super(props)
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    }
  }

  static getDerivedStateFromError(error: Error): AdminDashboardTabsErrorBoundaryState {
    return {
      hasError: true,
      error,
      errorInfo: null
    }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`AdminDashboard Error in ${this.props.tabName}:`, error)
    console.error('Error Info:', errorInfo)
    
    this.setState({
      error,
      errorInfo
    })

    // In production, send error to logging service
    if (process.env.NODE_ENV === 'production') {
      // logErrorToService(error, errorInfo, this.props.tabName)
    }
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null
    })
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="border-red-500/50 bg-red-900/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="h-5 w-5" />
              Error in {this.props.tabName}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Badge variant="destructive" className="mb-2">
                Component Error
              </Badge>
              <p className="text-sm text-muted-foreground">
                The {this.props.tabName} component encountered an error and couldn't load properly.
              </p>
              {this.state.error && (
                <details className="text-xs">
                  <summary className="cursor-pointer text-red-400 hover:text-red-300">
                    Error Details (Click to expand)
                  </summary>
                  <pre className="mt-2 p-2 bg-red-900/20 rounded text-red-300 overflow-auto">
                    {this.state.error.toString()}
                    {this.state.errorInfo?.componentStack}
                  </pre>
                </details>
              )}
            </div>
            
            <div className="flex gap-2">
              <Button 
                onClick={this.handleRetry}
                size="sm"
                className="flex items-center gap-2"
              >
                <RefreshCw className="h-4 w-4" />
                Retry Loading
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => window.location.reload()}
              >
                Refresh Page
              </Button>
            </div>

            <div className="text-xs text-muted-foreground mt-4 p-3 bg-gray-900/50 rounded">
              <p><strong>Troubleshooting:</strong></p>
              <ul className="list-disc list-inside space-y-1 mt-2">
                <li>Check browser console for additional error details</li>
                <li>Ensure all required components are properly imported</li>
                <li>Verify component dependencies are installed</li>
                <li>Try refreshing the page or clearing browser cache</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      )
    }

    return this.props.children
  }
}

// Loading component for tab content
interface AdminTabLoadingProps {
  tabName: string
}

export function AdminTabLoading({ tabName }: AdminTabLoadingProps) {
  return (
    <Card className="bg-gradient-to-r from-blue-900/10 to-purple-900/10 border-blue-500/20">
      <CardContent className="flex items-center justify-center py-12">
        <div className="text-center space-y-4">
          <div className="relative">
            <div className="w-12 h-12 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-t-purple-500/50 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse', animationDuration: '0.8s' }}></div>
          </div>
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-blue-400">Loading {tabName}</h3>
            <p className="text-sm text-muted-foreground">
              Initializing component and establishing secure connections...
            </p>
          </div>
          <Badge className="bg-blue-600 text-blue-100">
            Component Loading
          </Badge>
        </div>
      </CardContent>
    </Card>
  )
}