
import React from 'react'
import { Shield, Globe } from 'lucide-react'

export function AuthFeatures() {
  return (
    <div className="space-y-3 text-center text-sm text-muted-foreground">
      <div className="flex items-center justify-center gap-2">
        <Shield className="h-4 w-4 text-green-400" />
        <span>Bank-level security without captcha verification</span>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Globe className="h-4 w-4 text-blue-400" />
        <span>Connect with the global Culture of Harmony community</span>
      </div>
    </div>
  )
}
