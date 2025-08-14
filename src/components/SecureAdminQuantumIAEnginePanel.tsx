import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Brain, Zap, Activity } from "lucide-react";

export default function SecureAdminQuantumIAEnginePanel() {
  const [processingPower, setProcessingPower] = useState(95);
  const [quantumCoherence, setQuantumCoherence] = useState(98);
  const [insights, setInsights] = useState<string[]>([
    "🧠 Initializing neural network matrix",
    "🔮 Calibrating quantum entanglement sensors",
    "🌐 Analyzing global threat vectors",
    "🤖 Evolving AI defense protocols",
    "🛡️ Strengthening parabolic security layers",
  ]);

  const generateRandomInsight = () => {
    const insights = [
      "🧠 Neural networks optimized for maximum community protection",
      "🔮 Quantum algorithms detecting potential security threats",
      "🌐 Global network analysis reveals 99.9% stability",
      "🤖 AI systems evolving to counter new attack vectors",
      "🛡️ Parabolic defense matrices strengthening automatically",
    ];

    const newInsight = insights[Math.floor(Math.random() * insights.length)];
    setInsights((prev) => [newInsight, ...prev.slice(0, 4)]);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setProcessingPower((prev) => Math.min(100, prev + Math.random() * 2));
      setQuantumCoherence((prev) => Math.min(100, prev + Math.random() * 1.5));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="bg-gradient-to-br from-purple-900/30 to-blue-900/30 border-purple-500/30">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-purple-400">
          <Brain className="h-6 w-6" />
          🧠 QUANTUM IA ENGINE PANEL
        </CardTitle>
        <div className="flex gap-2">
          <Badge className="bg-purple-600">🔮 QUANTUM ACTIVE</Badge>
          <Badge className="bg-blue-600">🧠 AI LEARNING</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-purple-900/20 border border-purple-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2 text-purple-400">
              <Zap className="h-4 w-4" />
              <span className="font-medium">Processing Power</span>
            </div>
            <div className="text-2xl font-bold text-purple-300">{processingPower}%</div>
          </div>

          <div className="bg-blue-900/20 border border-blue-500/20 rounded-lg p-3">
            <div className="flex items-center gap-2 text-blue-400">
              <Activity className="h-4 w-4" />
              <span className="font-medium">Quantum Coherence</span>
            </div>
            <div className="text-2xl font-bold text-blue-300">{quantumCoherence}%</div>
          </div>
        </div>

        <div className="space-y-2">
          <h4 className="font-medium text-purple-400">🔮 Quantum Insights</h4>
          <div className="space-y-1">
            {insights.map((insight, index) => (
              <div key={index} className="text-sm text-purple-300/80 bg-purple-900/10 rounded p-2">
                {insight}
              </div>
            ))}
          </div>
        </div>

        <Button
          onClick={generateRandomInsight}
          className="w-full bg-purple-600 hover:bg-purple-700"
        >
          <Brain className="h-4 w-4 mr-2" />
          Generate New Insight
        </Button>
      </CardContent>
    </Card>
  );
}
