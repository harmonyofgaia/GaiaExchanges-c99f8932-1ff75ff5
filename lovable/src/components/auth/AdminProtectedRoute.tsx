
import { ReactNode } from 'react'

interface AdminProtectedRouteProps {
  children: ReactNode
}

export function AdminProtectedRoute({ children }: AdminProtectedRouteProps) {
  // Remove authentication requirement - allow direct admin access
  // Admin pages now handle their own authentication internally
  return <>{children}</>
}
