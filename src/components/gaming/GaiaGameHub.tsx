
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { 
  Users, 
  Trophy, 
  Globe, 
  Zap,
  Crown,
  Star
} from 'lucide-react'

export function GaiaGameHub() {
  return (
    <div className="space-y-6">
      <Card className="bg-gradient-to-r from-purple-900/30 to-cyan-900/30 border-2 border-purple-500/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-purple-400">
            <Globe className="h-6 w-6 animate-pulse" />
            🌍 GAIA GAME HUB - GLOBAL COMMUNITY
          </CardTitle>
          <div className="flex gap-4">
            <Badge className="bg-green-600 animate-pulse">
              🔥 42,891 Players Online
            </Badge>
            <Badge className="bg-blue-600">
              🏆 Daily Tournaments
            </Badge>
            <Badge className="bg-purple-600">
              ⭐ VIP Club Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 rounded-lg bg-blue-900/30 border border-blue-500/20">
              <Users className="h-8 w-8 text-blue-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-blue-400">42,891</div>
              <div className="text-sm text-muted-foreground">Active Players</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-yellow-900/30 border border-yellow-500/20">
              <Trophy className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-yellow-400">156</div>
              <div className="text-sm text-muted-foreground">Tournaments Today</div>
            </div>
            
            <div className="text-center p-4 rounded-lg bg-purple-900/30 border border-purple-500/20">
              <Crown className="h-8 w-8 text-purple-400 mx-auto mb-2" />
              <div className="text-2xl font-bold text-purple-400">8,247</div>
              <div className="text-sm text-muted-foreground">VIP Members</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 rounded-lg p-6 text-center">
            <h3 className="text-2xl font-bold text-green-400 mb-4">
              🎮 COMMUNITY FEATURES
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <div className="text-4xl">🏟️</div>
                <div className="font-bold text-yellow-400">GLOBAL ARENAS</div>
                <div className="text-sm text-muted-foreground">
                  Cross-platform battles with players worldwide
                </div>
              </div>
              <div className="space-y-2">
                <div className="text-4xl">🎯</div>
                <div className="font-bold text-blue-400">SKILL MATCHMAKING</div>
                <div className="text-sm text-muted-foreground">
                  AI-powered matching system for fair competition
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
