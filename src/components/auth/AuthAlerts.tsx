
import React from 'react'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, Shield } from 'lucide-react'

interface AuthAlertsProps {
  error: string | null
  success: string | null
}

export function AuthAlerts({ error, success }: AuthAlertsProps) {
  if (!error && !success) return null

  return (
    <>
      {error && (
        <Alert className="mt-4 border-red-500/20 bg-red-500/10">
          <AlertCircle className="h-4 w-4 text-red-400" />
          <AlertDescription className="text-red-400">
            {error}
          </AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mt-4 border-green-500/20 bg-green-500/10">
          <Shield className="h-4 w-4 text-green-400" />
          <AlertDescription className="text-green-400">
            {success}
          </AlertDescription>
        </Alert>
      )}
    </>
  )
}
