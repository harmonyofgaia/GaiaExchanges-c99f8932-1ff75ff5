import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Gamepad2, Trophy, Users, Zap, Play, Star, Settings } from 'lucide-react'
import HoverSidebar from '@/components/HoverSidebar'
import { GaiaGameHub } from '@/components/GaiaGameHub'

const Gaming = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900/20 via-blue-900/20 to-green-900/20">
      <HoverSidebar />
      
      <div className="ml-16 min-h-screen">
        <div className="container mx-auto px-6 py-8">
          <GaiaGameHub />
        </div>
      </div>
    </div>
  )
}

export default Gaming
