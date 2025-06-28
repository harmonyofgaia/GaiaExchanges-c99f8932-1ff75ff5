
import { CheckCircle } from 'lucide-react'

export function AutoResolutionFeatures() {
  const features = [
    'TypeScript Error Recovery',
    'React Warning Suppression',
    'Memory Leak Prevention',
    'Performance Optimization',
    'Accessibility Auto-Fix',
    'CSS Conflict Resolution'
  ]

  return (
    <div className="space-y-2">
      <h4 className="font-medium text-green-400">Auto-Resolution Features</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
        {features.map((feature) => (
          <div key={feature} className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-green-400" />
            <span>{feature}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
