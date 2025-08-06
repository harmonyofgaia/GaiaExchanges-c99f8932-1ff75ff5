
import { Shield, Eye, Lock, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export function SecurityFeaturesGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
      <div className="p-3 rounded-lg bg-green-900/20 border border-green-500/20">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-green-400" />
          <span className="text-xs font-medium">Secrets Scanning</span>
        </div>
        <Badge className="mt-1 bg-green-600 text-white text-xs">ACTIVE</Badge>
      </div>
      
      <div className="p-3 rounded-lg bg-blue-900/20 border border-blue-500/20">
        <div className="flex items-center gap-2">
          <Eye className="h-4 w-4 text-blue-400" />
          <span className="text-xs font-medium">Code Scanning</span>
        </div>
        <Badge className="mt-1 bg-blue-600 text-white text-xs">ACTIVE</Badge>
      </div>
      
      <div className="p-3 rounded-lg bg-purple-900/20 border border-purple-500/20">
        <div className="flex items-center gap-2">
          <Lock className="h-4 w-4 text-purple-400" />
          <span className="text-xs font-medium">Branch Protection</span>
        </div>
        <Badge className="mt-1 bg-purple-600 text-white text-xs">ENABLED</Badge>
      </div>
      
      <div className="p-3 rounded-lg bg-yellow-900/20 border border-yellow-500/20">
        <div className="flex items-center gap-2">
          <CheckCircle className="h-4 w-4 text-yellow-400" />
          <span className="text-xs font-medium">Dependency Scan</span>
        </div>
        <Badge className="mt-1 bg-yellow-600 text-white text-xs">ACTIVE</Badge>
      </div>
    </div>
  )
}
