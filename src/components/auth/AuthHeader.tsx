
import React from 'react'
import { Leaf } from 'lucide-react'

export function AuthHeader() {
  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center gap-2">
        <Leaf className="h-8 w-8 text-green-400" />
        <h1 className="text-3xl font-bold text-green-400">Gaia's Exchanges</h1>
      </div>
      <p className="text-muted-foreground">
        Join the Culture of Harmony ecosystem - Your gateway to eco-conscious trading
      </p>
    </div>
  )
}
