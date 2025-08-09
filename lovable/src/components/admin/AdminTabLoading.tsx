/**
 * Loading Fallback Component for AdminDashboardTabs
 *
 * This component provides consistent loading states for tab content
 * while components are being rendered or when they take time to load.
 *
 * Features:
 * - Skeleton loading animation
 * - Consistent styling with dashboard theme
 * - Configurable loading messages
 * - Accessible loading indicators
 */

import React from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Loader2 } from "lucide-react";

interface AdminTabLoadingProps {
  tabName?: string;
  message?: string;
}

export function AdminTabLoading({
  tabName = "Content",
  message = "Loading admin tools...",
}: AdminTabLoadingProps) {
  return (
    <div className="space-y-6">
      {/* Main loading card */}
      <Card className="bg-gradient-to-r from-blue-900/10 to-purple-900/10 border-blue-500/20">
        <CardHeader>
          <div className="flex items-center gap-3">
            <Loader2 className="h-5 w-5 text-blue-400 animate-spin" />
            <div className="space-y-2">
              <div className="h-5 bg-gradient-to-r from-blue-400/20 to-transparent rounded animate-pulse w-48" />
              <div className="h-3 bg-gradient-to-r from-purple-400/10 to-transparent rounded animate-pulse w-32" />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 bg-gradient-to-r from-slate-700/50 to-transparent rounded animate-pulse" />
                  <div className="h-3 bg-gradient-to-r from-slate-600/30 to-transparent rounded animate-pulse w-3/4" />
                </div>
              ))}
            </div>

            <div className="space-y-2">
              <div className="h-3 bg-gradient-to-r from-slate-700/40 to-transparent rounded animate-pulse" />
              <div className="h-3 bg-gradient-to-r from-slate-600/30 to-transparent rounded animate-pulse w-5/6" />
              <div className="h-3 bg-gradient-to-r from-slate-700/20 to-transparent rounded animate-pulse w-4/5" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Additional skeleton cards */}
      {[1, 2].map((i) => (
        <Card key={i} className="border-slate-700/20">
          <CardHeader>
            <div className="h-4 bg-gradient-to-r from-slate-700/30 to-transparent rounded animate-pulse w-40" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="h-3 bg-gradient-to-r from-slate-600/20 to-transparent rounded animate-pulse" />
              <div className="h-3 bg-gradient-to-r from-slate-700/15 to-transparent rounded animate-pulse w-4/5" />
              <div className="h-8 bg-gradient-to-r from-slate-700/10 to-transparent rounded animate-pulse w-32" />
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Loading message */}
      <div className="text-center py-4">
        <p className="text-sm text-muted-foreground flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          {message}
        </p>
      </div>
    </div>
  );
}

/**
 * Simple inline loading spinner for smaller components
 */
export function AdminTabInlineLoading({
  size = "sm",
  message = "Loading...",
}: {
  size?: "sm" | "md" | "lg";
  message?: string;
}) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6",
  };

  return (
    <div className="flex items-center justify-center gap-2 py-8">
      <Loader2 className={`${sizeClasses[size]} text-blue-400 animate-spin`} />
      <span className="text-sm text-muted-foreground">{message}</span>
    </div>
  );
}
