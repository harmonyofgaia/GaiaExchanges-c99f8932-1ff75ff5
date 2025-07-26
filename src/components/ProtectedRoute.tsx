import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: ReactNode
  requireAdmin?: boolean
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const isProduction = import.meta.env.PROD
  const hasAdminAccess = sessionStorage.getItem('admin-active') === 'true'
  const adminSession = localStorage.getItem('gaia-admin-session')
  const adminExpiry = localStorage.getItem('gaia-admin-expiry')
  
  // Check if admin session is valid
  const isValidAdminSession = adminSession && adminExpiry && 
    parseInt(adminExpiry) > Date.now()

  // In production, admin routes require valid admin session
  if (requireAdmin && isProduction && (!hasAdminAccess || !isValidAdminSession)) {
    return <Navigate to="/" replace />
  }

  // In development, always allow access
  if (!isProduction) {
    return <>{children}</>
  }

  return <>{children}</>
}