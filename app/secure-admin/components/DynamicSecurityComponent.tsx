'use client'

import dynamic from 'next/dynamic'
import { ComponentType } from 'react'

// Dynamically import security components to prevent SSR issues
export const DynamicBreachDefenseSystem = dynamic(
  () => import('./BreachDefenseSystem').then(mod => ({ default: mod.BreachDefenseSystem })),
  { 
    ssr: false,
    loading: () => null
  }
)

export const DynamicSecurityMiddleware = dynamic(
  () => import('./SecurityMiddleware').then(mod => ({ default: mod.SecurityMiddleware })),
  { 
    ssr: false,
    loading: () => null
  }
)

export const DynamicTimeSync = dynamic(
  () => import('./TimeSync').then(mod => ({ default: mod.TimeSync })),
  { 
    ssr: false,
    loading: () => null
  }
)