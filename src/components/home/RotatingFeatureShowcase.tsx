import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  Shield, 
  Coins, 
  Users, 
  Zap, 
  Globe, 
  Heart, 
  TrendingUp,
  Sparkles,
  ArrowRight,
  Star
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const features = [
  {
    id: 1,
    title: "Carbon-Negative Trading",
    description: "Every transaction removes CO2 from the atmosphere. Trade and heal the Earth simultaneously.",
    icon: Leaf,
    color: "from-green-400 to-emerald-500",
    bgColor: "from-green-900/30 to-emerald-900/30",
    highlight: "100% Carbon Negative",
    video: "🌱 Eco-Friendly Revolution"
  },
  {
    id: 2,
    title: "Zero-Fee Community Exchange",
    description: "No trading fees, no hidden costs. All profits go to environmental restoration projects.",
    icon: Coins,
    color: "from-blue-400 to-cyan-500",
    bgColor: "from-blue-900/30 to-cyan-900/30",
    highlight: "0% Trading Fees",
    video: "💰 Fair Trading Platform"
  },
  {
    id: 3,
    title: "Blockchain for Believers",
    description: "Built for long-term environmental advocates, not day traders. Stable, secure, meaningful.",
    icon: Shield,
    color: "from-purple-400 to-pink-500",
    bgColor: "from-purple-900/30 to-pink-900/30",
    highlight: "Anti-Speculation",
    video: "🛡️ Secure & Stable"
  },
  {
    id: 4,
    title: "Global Community Impact",
    description: "Join thousands of believers worldwide working together for environmental restoration.",
    icon: Globe,
    color: "from-yellow-400 to-orange-500",
    bgColor: "from-yellow-900/30 to-orange-900/30",
    highlight: "12,450+ Holders",
    video: "🌍 Global Movement"
  },
  {
    id: 5,
    title: "Instant Earth Healing",
    description: "Real-time environmental projects funded by every transaction. See your impact immediately.",
    icon: Heart,
    color: "from-red-400 to-pink-500",
    bgColor: "from-red-900/30 to-pink-900/30",
    highlight: "Live Impact Tracking",
    video: "❤️ Heal the Planet"
  },
  {
    id: 6,
    title: "Revolutionary Technology",
    description: "Advanced private blockchain technology that scales with your environmental impact.",
    icon: Zap,
    color: "from-indigo-400 to-purple-500",
    bgColor: "from-indigo-900/30 to-purple-900/30",
    highlight: "Next-Gen Blockchain",
    video: "⚡ Future Technology"
  }
];

export function RotatingFeatureShowcase() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % features.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentFeature = features[currentIndex];
  const nextFeatures = features.slice(currentIndex + 1, currentIndex + 3);
  const Icon = currentFeature.icon;

  return (
    <div className="relative overflow-hidden">
      <Card className="border-2 border-green-500/30 bg-gradient-to-br from-green-900/20 via-blue-900/20 to-purple-900/20 shadow-2xl shadow-green-500/20">
        <CardContent className="p-8">
          <div className="text-center mb-8">
            <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 mb-4">
              🌟 Revolutionary Features
            </h2>
            <p className="text-xl text-muted-foreground">
              Experience the future of environmental blockchain technology
            </p>
          </div>

          {/* Main Feature Display */}
          <div className="relative h-96 mb-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFeature.id}
                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="absolute inset-0"
              >
                <Card className={`h-full bg-gradient-to-br ${currentFeature.bgColor} border-2 border-opacity-50 relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
                  
                  {/* Floating Particles */}
                  <div className="absolute inset-0">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-white/30 rounded-full"
                        animate={{
                          x: [0, Math.random() * 400],
                          y: [0, Math.random() * 300],
                          opacity: [0, 1, 0],
                        }}
                        transition={{
                          duration: 6 + Math.random() * 4,
                          repeat: Infinity,
                          delay: Math.random() * 4,
                        }}
                        style={{
                          left: Math.random() * 100 + "%",
                          top: Math.random() * 100 + "%",
                        }}
                      />
                    ))}
                  </div>

                  <CardContent className="h-full flex flex-col justify-center items-center text-center relative z-10 p-8">
                    {/* Icon with Glow Effect */}
                    <motion.div
                      animate={{ 
                        rotate: [0, 360],
                        scale: [1, 1.1, 1]
                      }}
                      transition={{ 
                        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
                        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                      }}
                      className={`mb-6 p-6 rounded-full bg-gradient-to-r ${currentFeature.color} shadow-2xl relative`}
                    >
                      <Icon className="h-16 w-16 text-white" />
                      <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${currentFeature.color} blur-xl opacity-50 -z-10`} />
                    </motion.div>

                    {/* Video/Intro Text */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="mb-4"
                    >
                      <Badge 
                        variant="outline" 
                        className={`border-white/50 text-white bg-gradient-to-r ${currentFeature.color} text-lg px-4 py-2`}
                      >
                        <Sparkles className="h-4 w-4 mr-2" />
                        {currentFeature.video}
                      </Badge>
                    </motion.div>

                    {/* Title */}
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-4xl font-bold text-white mb-4"
                    >
                      {currentFeature.title}
                    </motion.h3>

                    {/* Description */}
                    <motion.p
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="text-xl text-white/90 mb-6 max-w-2xl leading-relaxed"
                    >
                      {currentFeature.description}
                    </motion.p>

                    {/* Highlight Badge */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                    >
                      <Badge className="bg-white/20 text-white text-lg px-6 py-2 backdrop-blur-sm">
                        <Star className="h-4 w-4 mr-2 fill-current" />
                        {currentFeature.highlight}
                      </Badge>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center justify-center gap-4 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="border-green-500/50 text-green-400"
            >
              {isPlaying ? "⏸️ Pause" : "▶️ Play"}
            </Button>
            
            <div className="flex gap-2">
              {features.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === currentIndex 
                      ? 'bg-green-400 scale-125' 
                      : 'bg-white/30 hover:bg-white/50'
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentIndex((prev) => (prev + 1) % features.length)}
              className="border-blue-500/50 text-blue-400"
            >
              Next <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>

          {/* Preview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {nextFeatures.map((feature, index) => {
              const FeatureIcon = feature.icon;
              return (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 0.7, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => setCurrentIndex(features.indexOf(feature))}
                  className="cursor-pointer hover:opacity-100 transition-opacity"
                >
                  <Card className={`bg-gradient-to-r ${feature.bgColor} border border-white/20 hover:border-white/40 transition-all`}>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className={`p-2 rounded-lg bg-gradient-to-r ${feature.color}`}>
                        <FeatureIcon className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white text-sm">{feature.title}</h4>
                        <p className="text-white/70 text-xs">{feature.highlight}</p>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}