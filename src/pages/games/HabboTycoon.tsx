import HoverSidebar from '@/components/HoverSidebar'
import { HabboTycoonGame } from '@/components/games/HabboTycoonGame'

const HabboTycoon = () => {
  return (
    <div className="min-h-screen">
      <HoverSidebar />
      <div className="ml-16">
        <HabboTycoonGame />
      </div>
    </div>
  )
}

export default HabboTycoon