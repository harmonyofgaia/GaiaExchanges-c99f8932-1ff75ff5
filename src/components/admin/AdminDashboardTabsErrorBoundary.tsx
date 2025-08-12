/**
 * Error Boundary Component for AdminDashboardTabs
 * 
 * This component provides graceful error handling for individual tab components
 * to prevent single component failures from breaking the entire dashboard.
 * 
 * Features:
 * - Catches React component errors within tab content
 * - Provides fallback UI when components fail to render
 * - Logs errors for debugging purposes
 * - Maintains dashboard functionality even when individual tabs fail
 */

import React, { Component, ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle, RefreshCw } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Props {
  children: ReactNode
  tabName: string
}

interface State {
  hasError: boolean
  error?: Error
}

export class AdminDashboardTabsErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log the error for debugging
    console.error(`Error in ${this.props.tabName} tab:`, error, errorInfo)
    
    // In a production environment, you might want to send this to an error reporting service
    // Example: errorReportingService.captureException(error, { extra: errorInfo })
  }

  handleRetry = () => {
    // Clear the error state to retry rendering the component
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="border-red-500/20 bg-red-900/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="h-5 w-5" />
              Error in {this.props.tabName}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This component encountered an error and couldn't be displayed. 
              The error has been logged for investigation.
            </p>
            
            {this.state.error && (
              <div className="bg-red-950/20 border border-red-500/20 rounded p-3">
                <p className="text-xs font-mono text-red-300">
                  {this.state.error.message}
                </p>
              </div>
            )}
            
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={this.handleRetry}
                className="border-red-500/20 text-red-400 hover:bg-red-500/10"
              >
                <RefreshCw className="h-4 w-4 mr-1" />
                Retry
              </Button>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.location.reload()}
                className="text-muted-foreground hover:text-foreground"
              >
                Reload Page
              </Button>
            </div>
          </CardContent>
        </Card>
      )
    }

    return this.props.children
  }
}