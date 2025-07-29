
export const Games = () => {
  const games = [
    {
      title: "Gaia Fighter",
      description: "Epic battles in the metaverse with NFT characters",
      status: "Live",
      image: "🥊"
    },
    {
      title: "Coin Crafter",
      description: "Craft and mine GAIA tokens through strategic gameplay",
      status: "Live",
      image: "⛏️"
    },
    {
      title: "Landscape Builder",
      description: "Create and customize your own virtual worlds",
      status: "Beta",
      image: "🏗️"
    },
    {
      title: "Soul Quest",
      description: "Adventure through mystical realms to find true happiness",
      status: "Coming Soon",
      image: "🌟"
    }
  ]

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Games
        </h1>
        
        <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
          Immerse yourself in our collection of games where creativity meets blockchain technology. 
          Earn GAIA tokens, collect NFTs, and join a community that celebrates good vibrations.
        </p>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {games.map((game, index) => (
            <div 
              key={index}
              className="bg-black/20 backdrop-blur-sm border border-green-500/30 rounded-lg p-6 hover:border-green-400/50 transition-all duration-300 hover:scale-105"
            >
              <div className="text-4xl mb-4 text-center">{game.image}</div>
              <h3 className="text-xl font-semibold mb-2 text-white">{game.title}</h3>
              <p className="text-gray-300 mb-4 text-sm">{game.description}</p>
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 rounded text-xs ${
                  game.status === 'Live' ? 'bg-green-500/20 text-green-400' :
                  game.status === 'Beta' ? 'bg-yellow-500/20 text-yellow-400' :
                  'bg-blue-500/20 text-blue-400'
                }`}>
                  {game.status}
                </span>
                <button className="px-4 py-2 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30 transition-colors">
                  Play
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div className="bg-black/20 backdrop-blur-sm border border-green-500/30 rounded-lg p-8">
          <h2 className="text-2xl font-semibold mb-4 text-green-400">Game Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-semibold mb-2 text-white">Play-to-Earn</h3>
              <p className="text-gray-300 text-sm">Earn GAIA tokens through gameplay achievements and competitions</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-white">NFT Integration</h3>
              <p className="text-gray-300 text-sm">Collect, trade, and use unique NFT assets across all games</p>
            </div>
            <div>
              <h3 className="font-semibold mb-2 text-white">Community Events</h3>
              <p className="text-gray-300 text-sm">Participate in tournaments and special events with exclusive rewards</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
