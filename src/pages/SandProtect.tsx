import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Waves, Fish, Anchor, Heart, Star, Zap } from 'lucide-react'

export default function SandProtect() {
  const [sandLevel, setSandLevel] = useState(75)
  const [threatsDetected, setThreatsDetected] = useState(12)
  const [protectedSpecies, setProtectedSpecies] = useState(42)

  useEffect(() => {
    const sandInterval = setInterval(() => {
      setSandLevel(prev => Math.min(100, prev + Math.random() * 2))
      setThreatsDetected(prev => prev + Math.floor(Math.random() * 3))
      setProtectedSpecies(prev => prev + 1)
    }, 3000)

    return () => clearInterval(sandInterval)
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.3,
        duration: 0.8
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        type: 'spring',
        stiffness: 100
      }
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900 relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-blue-900 via-cyan-900 to-teal-900 opacity-30"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      />

      {/* Sand particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 50 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute w-1 h-1 bg-yellow-200 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `sand-drift ${Math.random() * 5 + 5}s linear infinite`
            }}
            variants={itemVariants}
            initial="hidden"
            animate="visible"
          />
        ))}
      </div>
      
      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4 flex items-center justify-center gap-3">
            <Waves className="h-12 w-12 text-cyan-400" />
            🏝️ SAND PROTECT SYSTEM
            <Fish className="h-12 w-12 text-blue-400" />
          </h1>
          <p className="text-xl text-gray-300">
            Protecting our shores and marine life with advanced technology
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants}>
            <Card className="bg-blue-900/20 border-blue-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-400">
                  <Shield className="h-5 w-5" />
                  Sand Stability
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{sandLevel}%</div>
                <p className="text-sm text-gray-300">
                  Current sand stability level
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-cyan-900/20 border-cyan-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-cyan-400">
                  <Zap className="h-5 w-5" />
                  Threats Detected
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{threatsDetected}</div>
                <p className="text-sm text-gray-300">
                  Potential threats to the ecosystem
                </p>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants}>
            <Card className="bg-teal-900/20 border-teal-500/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-teal-400">
                  <Heart className="h-5 w-5" />
                  Protected Species
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white">{protectedSpecies}</div>
                <p className="text-sm text-gray-300">
                  Marine species under protection
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        <motion.div
          className="mt-8 text-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <Button className="bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-blue-500 hover:to-cyan-500 text-white">
            <Anchor className="h-4 w-4 mr-2" />
            Stabilize Sand
          </Button>
        </motion.div>
      </div>
    </div>
  )
}
