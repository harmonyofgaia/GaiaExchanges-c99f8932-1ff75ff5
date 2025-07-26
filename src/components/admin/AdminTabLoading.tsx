/**
 * AdminTabLoading Components
 * 
 * Provides loading states for admin dashboard tabs with different styles
 * for various loading contexts.
 * 
 * @author Admin Dashboard Team
 * @version 1.0.0
 */

import React from 'react'
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Loader2 } from 'lucide-react'

interface AdminTabLoadingProps {
  tabName?: string
}

/**
 * Full tab loading component with skeleton placeholders
 */
export function AdminTabLoading({ tabName }: AdminTabLoadingProps) {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Loader2 className="h-5 w-5 animate-spin text-blue-400" />
            <Skeleton className="h-6 w-48" />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="border-slate-700/50">
                <CardHeader className="pb-2">
                  <Skeleton className="h-4 w-32" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-20 w-full" />
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
        </CardContent>
      </Card>
      
      {tabName && (
        <div className="text-center text-sm text-muted-foreground">
          Loading {tabName}...
        </div>
      )}
    </div>
  )
}

/**
 * Inline loading component for smaller areas
 */
export function AdminTabInlineLoading({ tabName }: AdminTabLoadingProps) {
  return (
    <div className="flex items-center justify-center py-8">
      <div className="flex items-center gap-3 text-muted-foreground">
        <Loader2 className="h-5 w-5 animate-spin" />
        <span>Loading {tabName || 'content'}...</span>
      </div>
    </div>
  )
}

/**
 * Minimal loading spinner
 */
export function AdminTabSpinner() {
  return (
    <div className="flex items-center justify-center py-4">
      <Loader2 className="h-6 w-6 animate-spin text-blue-400" />
    </div>
  )
}