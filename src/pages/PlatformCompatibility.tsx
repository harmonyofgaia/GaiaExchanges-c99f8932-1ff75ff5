
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AbstractArtOverlay } from '@/components/ui/abstract-art-overlay'

const PlatformCompatibility = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900/20 to-blue-900/20 relative">
      <AbstractArtOverlay artType="quantum" intensity="low" />
      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Enhanced header with quantum effects */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-0 rounded-lg">
            <AbstractArtOverlay artType="organic" intensity="medium" />
          </div>
          <div className="relative z-10 p-8 bg-black/20 backdrop-blur-sm rounded-lg border border-green-500/20">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent mb-4">
              🌍 HARMONY OF GAIA - QUANTUM PLATFORM
            </h1>
            <p className="text-xl text-muted-foreground mb-4">
              🚀 Universal Compatibility Across All Dimensions & Realities
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Badge className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-4 py-2">
                ∞ INFINITE PLATFORMS
              </Badge>
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2">
                ⚡ QUANTUM READY
              </Badge>
              <Badge className="bg-gradient-to-r from-cyan-600 to-teal-600 text-white px-4 py-2">
                🎮 GAMING OPTIMIZED
              </Badge>
            </div>
          </div>
        </div>

        {/* Platform Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="bg-gradient-to-br from-green-900/20 to-blue-900/20 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400">Desktop & Web</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Windows, macOS, Linux support</li>
                <li>All major browsers supported</li>
                <li>Optimized for high performance and low latency</li>
                <li>Seamless Web3 wallet integration</li>
                <li>Abstract art overlays for immersive experience</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border-purple-500/30">
            <CardHeader>
              <CardTitle className="text-purple-400">Mobile & Tablets</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>iOS and Android native support</li>
                <li>Responsive UI with touch-friendly controls</li>
                <li>Optimized quantum background for battery efficiency</li>
                <li>Mobile Web3 wallets supported</li>
                <li>Abstract art animations adapt to device orientation</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-cyan-900/20 to-teal-900/20 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400">VR & AR Platforms</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Supports Oculus, HTC Vive, and other VR devices</li>
                <li>Augmented reality overlays for real-world interaction</li>
                <li>Immersive quantum particle effects in 3D space</li>
                <li>Web3 wallet integration via VR-compatible extensions</li>
                <li>Future-ready for metaverse expansions</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Compatibility Features */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-br from-green-900/20 to-emerald-900/20 border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400">Security & Trust</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>End-to-end encrypted transactions</li>
                <li>Multi-factor authentication support</li>
                <li>Continuous auditing of smart contracts</li>
                <li>Transparent token burn and reinvestment tracking</li>
                <li>Community-driven trust network</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border-cyan-500/30">
            <CardHeader>
              <CardTitle className="text-cyan-400">Performance & Scalability</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>Optimized for low latency and high throughput</li>
                <li>Supports thousands of concurrent users</li>
                <li>Adaptive quantum background for smooth animations</li>
                <li>Modular architecture for easy feature expansion</li>
                <li>Cross-chain compatibility for future integrations</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-green-400 mb-4">Join the Quantum Revolution</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Harmony of Gaia is designed to be the most universal, secure, and immersive platform for environmental gaming and blockchain integration. Experience the future of gaming and sustainability across all your devices and realities.
          </p>
          <Badge className="bg-gradient-to-r from-purple-600 to-cyan-600 text-white px-6 py-3 text-lg cursor-pointer hover:opacity-90">
            🚀 Get Started Now
          </Badge>
        </div>
      </div>
    </div>
  )
}

export default PlatformCompatibility
