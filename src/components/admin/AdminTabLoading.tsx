/**
 * AdminTabLoading Component
 * 
 * Loading state component for admin dashboard tabs
 */

import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

interface AdminTabLoadingProps {
  tabName: string
}

export function AdminTabLoading({ tabName }: AdminTabLoadingProps) {
  return (
    <Card className="bg-slate-900/20 border-slate-700/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-slate-400">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading {tabName}...
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center text-muted-foreground">
          <div className="flex items-center justify-center gap-2">
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
          <p className="text-sm mt-4">Please wait while {tabName} loads...</p>
        </div>
      </CardContent>
    </Card>
  )
}