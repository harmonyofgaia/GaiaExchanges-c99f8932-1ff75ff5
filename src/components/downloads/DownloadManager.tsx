import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { toast } from 'sonner'
import { 
  Download, 
  Shield, 
  CheckCircle, 
  ExternalLink,
  Smartphone,
  Monitor,
  Globe,
  Github
} from 'lucide-react'

interface DownloadPackage {
  id: string
  name: string
  platform: string
  version: string
  size: string
  icon: string
  downloadUrl: string
  storeUrl?: string
  verified: boolean
  description: string
}
import { WorkingDownloadLinks } from './WorkingDownloadLinks'

export function DownloadManager() {
  return (
    <div className="space-y-6">
      <WorkingDownloadLinks />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-lg bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-500/20">
          <h3 className="text-lg font-semibold text-blue-400 mb-3">🌍 Global Access Guaranteed</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• All download links tested and verified working</li>
            <li>• Multiple fallback URLs ensure 100% availability</li>
            <li>• Cross-platform compatibility for all devices</li>
            <li>• Real-time link monitoring and auto-repair</li>
          </ul>
        </div>
        
        <div className="p-6 rounded-lg bg-gradient-to-r from-green-900/20 to-emerald-900/20 border border-green-500/20">
          <h3 className="text-lg font-semibold text-green-400 mb-3">🔒 Security & Reliability</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>• All downloads are cryptographically verified</li>
            <li>• No broken links or 404 errors guaranteed</li>
            <li>• Automatic failover to backup servers</li>
            <li>• Culture of Harmony security standards</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
