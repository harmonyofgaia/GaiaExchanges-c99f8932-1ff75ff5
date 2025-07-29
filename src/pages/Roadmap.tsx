
export const Roadmap = () => {
  const roadmapItems = [
    {
      phase: "Phase 1",
      title: "Foundation",
      status: "completed",
      items: [
        "Token creation and deployment",
        "Basic website launch",
        "Community building initiation",
        "Initial partnerships"
      ]
    },
    {
      phase: "Phase 2",
      title: "Platform Development",
      status: "current",
      items: [
        "Gaming platform launch",
        "Staking mechanisms",
        "NFT marketplace",
        "Mobile app development"
      ]
    },
    {
      phase: "Phase 3",
      title: "Ecosystem Expansion",
      status: "upcoming",
      items: [
        "Metaverse integration",
        "Cross-chain bridges",
        "Advanced AI features",
        "DeFi protocols"
      ]
    },
    {
      phase: "Phase 4",
      title: "Global Adoption",
      status: "future",
      items: [
        "Mass market adoption",
        "Enterprise partnerships",
        "Global community events",
        "Sustainable growth model"
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 border-green-400'
      case 'current': return 'text-blue-400 border-blue-400'
      case 'upcoming': return 'text-yellow-400 border-yellow-400'
      case 'future': return 'text-gray-400 border-gray-400'
      default: return 'text-gray-400 border-gray-400'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
          Roadmap
        </h1>
        
        <div className="grid lg:grid-cols-2 gap-8">
          {roadmapItems.map((item, index) => (
            <div 
              key={index}
              className={`bg-black/20 backdrop-blur-sm border rounded-lg p-6 ${getStatusColor(item.status)}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-semibold">{item.phase}</h2>
                <span className={`px-3 py-1 rounded-full text-sm border ${getStatusColor(item.status)}`}>
                  {item.status}
                </span>
              </div>
              
              <h3 className="text-xl font-medium mb-4 text-white">{item.title}</h3>
              
              <ul className="space-y-2">
                {item.items.map((listItem, itemIndex) => (
                  <li key={itemIndex} className="flex items-center text-gray-300">
                    <span className="mr-2">•</span>
                    {listItem}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <p className="text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Our roadmap is designed to build a sustainable ecosystem that brings joy and creativity 
            to every soul. Each phase focuses on delivering real value while maintaining our core 
            mission of spreading good vibrations and smiles across the world.
          </p>
        </div>
      </div>
    </div>
  )
}
