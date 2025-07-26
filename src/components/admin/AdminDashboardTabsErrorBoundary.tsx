/**
 * AdminDashboardTabsErrorBoundary Component
 * 
 * Error boundary for admin dashboard tabs to prevent component failures from breaking the dashboard
 */

import React, { Component, ReactNode } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertTriangle } from 'lucide-react'

interface AdminDashboardTabsErrorBoundaryProps {
  children: ReactNode
  tabName: string
}

interface AdminDashboardTabsErrorBoundaryState {
  hasError: boolean
  error?: Error
}

export class AdminDashboardTabsErrorBoundary extends Component<
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
    console.error(`Admin dashboard tab error in ${this.props.tabName}:`, error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <Card className="bg-red-900/20 border-red-500/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-400">
              <AlertTriangle className="h-5 w-5" />
              {this.props.tabName} - Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center text-muted-foreground">
              <p>An error occurred while loading this tab.</p>
              <p className="text-sm mt-2">Please refresh the page or contact support.</p>
              {this.state.error && (
                <p className="text-xs mt-4 text-red-400">
                  Error: {this.state.error.message}
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      )
    }

    return this.props.children
  }
}