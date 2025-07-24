
export function getBadgeClassNames(status: string): string {
  switch (status) {
    case 'active':
      return 'bg-green-500/20 text-green-400 border-green-500/30'
    case 'pending':
      return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30'
    case 'completed':
      return 'bg-blue-500/20 text-blue-400 border-blue-500/30'
    case 'failed':
      return 'bg-red-500/20 text-red-400 border-red-500/30'
    default:
      return 'bg-gray-500/20 text-gray-400 border-gray-500/30'
  }
}

export function getBackgroundColorClass(type: string): string {
  switch (type) {
    case 'coral':
      return 'bg-gradient-to-br from-coral-500/20 to-orange-500/20'
    case 'ocean':
      return 'bg-gradient-to-br from-blue-500/20 to-cyan-500/20'
    case 'forest':
      return 'bg-gradient-to-br from-green-500/20 to-emerald-500/20'
    default:
      return 'bg-gradient-to-br from-gray-500/20 to-slate-500/20'
  }
}
