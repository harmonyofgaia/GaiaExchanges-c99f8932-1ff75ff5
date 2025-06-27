
import { BurningSystem } from '@/components/BurningSystem'

const Transparency = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Transparency Center</h1>
          <p className="text-muted-foreground">Real-time tracking of token burning and environmental reinvestment</p>
        </div>
      </div>
      
      <BurningSystem />
    </div>
  )
}

export default Transparency
