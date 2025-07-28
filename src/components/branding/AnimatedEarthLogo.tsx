
export function AnimatedEarthLogo() {
  return (
    <div className="relative w-10 h-10 flex items-center justify-center">
      {/* Outer glow effect */}
      <div className="absolute inset-0 rounded-full bg-green-400/20 animate-pulse blur-md" />
      
      {/* Main earth container */}
      <div className="relative w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 via-green-500 to-blue-600 shadow-lg overflow-hidden">
        {/* Continents */}
        <div className="absolute top-1 left-1 w-2 h-2 bg-green-600 rounded-full opacity-80" />
        <div className="absolute top-2 right-1 w-1.5 h-1.5 bg-green-700 rounded-full opacity-70" />
        <div className="absolute bottom-1.5 left-1.5 w-1 h-1 bg-green-600 rounded-full opacity-90" />
        <div className="absolute bottom-1 right-2 w-1.5 h-1 bg-green-700 rounded-sm opacity-80" />
        
        {/* Clouds */}
        <div className="absolute top-0.5 left-2 w-3 h-1 bg-white/30 rounded-full animate-pulse" />
        <div className="absolute bottom-0.5 right-1 w-2 h-0.5 bg-white/40 rounded-full animate-pulse" style={{animationDelay: '1s'}} />
        
        {/* Atmosphere glow */}
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-transparent via-blue-300/20 to-transparent animate-spin" style={{animationDuration: '8s'}} />
      </div>
      
      {/* Orbital elements */}
      <div className="absolute inset-0 rounded-full border border-green-400/30 animate-spin" style={{animationDuration: '12s'}} />
      <div className="absolute top-0 left-1/2 w-1 h-1 bg-green-400 rounded-full transform -translate-x-1/2 animate-bounce" style={{animationDelay: '0s'}} />
      <div className="absolute bottom-0 right-1/2 w-0.5 h-0.5 bg-blue-400 rounded-full transform translate-x-1/2 animate-bounce" style={{animationDelay: '2s'}} />
    </div>
  )
}
