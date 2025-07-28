
import Navbar from '@/components/Navbar'
import { GlobalLeaderboard } from '@/components/leaderboard/GlobalLeaderboard'

export default function GlobalLeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-yellow-900">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <GlobalLeaderboard />
      </div>
    </div>
  )
}
