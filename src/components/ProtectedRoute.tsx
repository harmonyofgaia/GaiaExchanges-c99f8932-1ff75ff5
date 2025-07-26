import { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: ReactNode
  requireAdmin?: boolean
}

export function ProtectedRoute({ children, requireAdmin = false }: ProtectedRouteProps) {
  const isProduction = import.meta.env.PROD
  const [isAdmin, setIsAdmin] = React.useState<boolean | null>(null)

  React.useEffect(() => {
    if (requireAdmin && isProduction) {
      fetch('/api/validate-admin', { credentials: 'include' })
        .then(response => response.json())
        .then(data => setIsAdmin(data.isAdmin))
        .catch(() => setIsAdmin(false))
    } else {
      setIsAdmin(true)
    }
  }, [requireAdmin, isProduction])

  if (isAdmin === false) {
    return <Navigate to="/" replace />
  }

  if (isAdmin === null) {
    return <div>Loading...</div>
  }
  // In development, always allow access
  if (!isProduction) {
    return <>{children}</>
  }

  return <>{children}</>
}