/**
 * AdminDashboardTabsErrorBoundary Component
 * 
 * Provides error boundary protection for admin dashboard tabs to prevent
 * individual tab failures from breaking the entire dashboard.
 * 
 * @author Admin Dashboard Team
 * @version 1.0.0
 */

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface AdminDashboardTabsErrorBoundaryProps {
  children: React.ReactNode
  tabName: string
}

interface AdminDashboardTabsErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class AdminDashboardTabsErrorBoundary extends React.Component<
  AdminDashboardTabsErrorBoundaryProps,
  AdminDashboardTabsErrorBoundaryState
> {
  constructor(props: AdminDashboardTabsErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): AdminDashboardTabsErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error(`Admin Dashboard Tab Error (${this.props.tabName}):`, error, errorInfo)
    // In production, send to error logging service
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="border-red-500/20 bg-red-900/10">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="h-5 w-5" />
              Tab Error: {this.props.tabName}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              An error occurred while loading this tab. The dashboard remains functional.
            </p>
            {this.state.error && (
              <details className="text-xs text-red-400 bg-red-950/20 p-2 rounded">
                <summary className="cursor-pointer">Error Details</summary>
                <pre className="mt-2 whitespace-pre-wrap">
                  {this.state.error.message}
                </pre>
              </details>
            )}
            <Button 
              onClick={this.handleRetry}
              variant="outline"
              size="sm"
              className="border-red-500/30 text-red-400 hover:bg-red-500/10"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Retry Loading
            </Button>
          </CardContent>
        </Card>
      )
    }

    return this.props.children
  }
}