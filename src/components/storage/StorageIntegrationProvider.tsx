
import { useEffect, ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { storageManager } from '@/services/StorageUpgradeManager'

interface StorageIntegrationProviderProps {
  children: ReactNode
}

export function StorageIntegrationProvider({ children }: StorageIntegrationProviderProps) {
  const location = useLocation()

  useEffect(() => {
    // Get page name from route
    const pageName = location.pathname.substring(1) || 'home'
    
    // Integrate storage with current page
    storageManager.integrateWithPage(pageName)
  }, [location.pathname])

  return <>{children}</>
}
