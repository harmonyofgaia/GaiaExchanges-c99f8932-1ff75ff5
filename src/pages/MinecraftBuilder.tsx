
import { MinecraftLandscapeBuilder } from '@/components/MinecraftLandscapeBuilder'

export default function MinecraftBuilder() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <MinecraftLandscapeBuilder />
      </div>
    </div>
  )
}
