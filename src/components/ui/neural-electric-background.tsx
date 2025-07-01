
import { useEffect, useState } from 'react'

interface NeuralNode {
  id: string
  x: number
  y: number
  size: number
  pulseSpeed: number
  connections: string[]
  electricShock: boolean
}

interface NeuralElectricBackgroundProps {
  style?: string
  intensity?: string
}

export function NeuralElectricBackground({ style = 'neural', intensity = 'medium' }: NeuralElectricBackgroundProps) {
  const [nodes, setNodes] = useState<NeuralNode[]>([])
  const [electricShocks, setElectricShocks] = useState<Array<{id: string, x1: number, y1: number, x2: number, y2: number}>>([])

  useEffect(() => {
    const nodeCount = intensity === 'high' ? 150 : intensity === 'medium' ? 100 : 50
    
    const createNode = (index: number): NeuralNode => ({
      id: `node-${index}`,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      pulseSpeed: Math.random() * 3 + 1,
      connections: [],
      electricShock: false
    })

    const newNodes = Array.from({ length: nodeCount }, (_, i) => createNode(i))
    
    // Create connections between nearby nodes
    newNodes.forEach(node => {
      const nearbyNodes = newNodes.filter(other => 
        other.id !== node.id && 
        Math.sqrt(Math.pow(other.x - node.x, 2) + Math.pow(other.y - node.y, 2)) < 20
      )
      node.connections = nearbyNodes.slice(0, 3).map(n => n.id)
    })
    
    setNodes(newNodes)

    // Electric shock animation
    const shockInterval = setInterval(() => {
      const shocks = Array.from({ length: 5 }, (_, i) => ({
        id: `shock-${i}`,
        x1: Math.random() * 100,
        y1: Math.random() * 100,
        x2: Math.random() * 100,
        y2: Math.random() * 100
      }))
      setElectricShocks(shocks)
      
      setTimeout(() => setElectricShocks([]), 200)
    }, 2000)

    return () => {
      clearInterval(shockInterval)
    }
  }, [intensity])

  const getStyleColors = () => {
    switch (style) {
      case 'bioelectric':
        return { primary: '#00ff88', secondary: '#88ff00', accent: '#ffff00' }
      case 'synaptic':
        return { primary: '#ff00ff', secondary: '#8800ff', accent: '#00ffff' }
      case 'neural':
        return { primary: '#00ffff', secondary: '#0088ff', accent: '#ff0088' }
      default:
        return { primary: '#00ff00', secondary: '#00ffff', accent: '#ff00ff' }
    }
  }

  const colors = getStyleColors()

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {/* Neural network SVG */}
      <svg className="absolute inset-0 w-full h-full">
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/> 
            </feMerge>
          </filter>
          <linearGradient id="electricGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={colors.primary} stopOpacity="0.8"/>
            <stop offset="50%" stopColor={colors.secondary} stopOpacity="0.6"/>
            <stop offset="100%" stopColor={colors.accent} stopOpacity="0.4"/>
          </linearGradient>
        </defs>
        
        {/* Neural connections */}
        {nodes.map(node => 
          node.connections.map(connectionId => {
            const connectedNode = nodes.find(n => n.id === connectionId)
            if (!connectedNode) return null
            
            return (
              <line
                key={`${node.id}-${connectionId}`}
                x1={`${node.x}%`}
                y1={`${node.y}%`}
                x2={`${connectedNode.x}%`}
                y2={`${connectedNode.y}%`}
                stroke="url(#electricGradient)"
                strokeWidth="1"
                opacity="0.4"
                filter="url(#glow)"
                className="animate-pulse"
              />
            )
          })
        )}
        
        {/* Electric shocks */}
        {electricShocks.map(shock => (
          <line
            key={shock.id}
            x1={`${shock.x1}%`}
            y1={`${shock.y1}%`}
            x2={`${shock.x2}%`}
            y2={`${shock.y2}%`}
            stroke="#ffffff"
            strokeWidth="3"
            opacity="1"
            filter="url(#glow)"
            className="animate-ping"
          />
        ))}
        
        {/* Neural nodes */}
        {nodes.map(node => (
          <circle
            key={node.id}
            cx={`${node.x}%`}
            cy={`${node.y}%`}
            r={node.size}
            fill={colors.primary}
            opacity="0.8"
            filter="url(#glow)"
            className="animate-pulse"
            style={{
              animationDuration: `${node.pulseSpeed}s`
            }}
          />
        ))}
      </svg>
      
      {/* Electrical particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 30 }).map((_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute w-1 h-1 rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              backgroundColor: colors.accent,
              animationDelay: `${Math.random() * 2}s`,
              animationDuration: `${1 + Math.random() * 2}s`
            }}
          />
        ))}
      </div>
    </div>
  )
}
