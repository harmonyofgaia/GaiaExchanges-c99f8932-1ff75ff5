
interface GaiaLogoProps {
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'white-fade' | 'colorful'
}

export function GaiaLogo({ size = 'md', variant = 'default' }: GaiaLogoProps) {
  const sizeClasses = {
    sm: 'w-8 h-8 text-2xl',
    md: 'w-12 h-12 text-4xl',
    lg: 'w-16 h-16 text-6xl'
  }

  const variantClasses = {
    default: 'text-green-400',
    'white-fade': 'text-white opacity-90',
    colorful: 'bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent'
  }

  return (
    <div className={`${sizeClasses[size]} ${variantClasses[variant]} flex items-center justify-center`}>
      <span className="font-bold">🌍</span>
    </div>
  )
}
