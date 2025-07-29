
export const Tokenomics = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Tokenomics
        </h1>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-black/20 backdrop-blur-sm border border-green-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-400">Token Distribution</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span>Total Supply:</span>
                <span className="text-green-400">1,000,000,000 GAIA</span>
              </div>
              <div className="flex justify-between">
                <span>Community:</span>
                <span>40%</span>
              </div>
              <div className="flex justify-between">
                <span>Development:</span>
                <span>20%</span>
              </div>
              <div className="flex justify-between">
                <span>Liquidity:</span>
                <span>20%</span>
              </div>
              <div className="flex justify-between">
                <span>Team:</span>
                <span>15%</span>
              </div>
              <div className="flex justify-between">
                <span>Marketing:</span>
                <span>5%</span>
              </div>
            </div>
          </div>
          
          <div className="bg-black/20 backdrop-blur-sm border border-green-500/30 rounded-lg p-6">
            <h2 className="text-2xl font-semibold mb-4 text-green-400">Utility Features</h2>
            <ul className="space-y-2">
              <li>• Gaming rewards and achievements</li>
              <li>• Staking rewards</li>
              <li>• Governance voting</li>
              <li>• NFT marketplace transactions</li>
              <li>• Premium features access</li>
              <li>• Tournament entry fees</li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 bg-black/20 backdrop-blur-sm border border-green-500/30 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-green-400">Economic Model</h2>
          <p className="text-gray-300 leading-relaxed">
            GAIA token operates on a sustainable economic model designed to reward creativity, 
            community participation, and long-term engagement. Our tokenomics ensure fair 
            distribution while maintaining scarcity and value appreciation through various 
            burn mechanisms and utility-driven demand.
          </p>
        </div>
      </div>
    </div>
  )
}
