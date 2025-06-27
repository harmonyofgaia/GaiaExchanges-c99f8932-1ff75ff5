
import { SwapSystem } from '@/components/SwapSystem'

const Markets = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Digital Currency Markets</h1>
          <p className="text-muted-foreground">Swap any supported digital currency with optimized fees</p>
        </div>
      </div>
      
      <SwapSystem />
    </div>
  )
}

export default Markets
