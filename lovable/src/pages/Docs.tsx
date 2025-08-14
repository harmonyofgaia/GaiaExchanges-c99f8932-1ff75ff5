import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Book, Code, Zap } from "lucide-react";

const Docs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900/20 to-purple-900/20">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-blue-400 mb-4">🐉 DRAGON DOCUMENTATION 🐉</h1>
          <p className="text-blue-300">Complete guide to the Dragon-Protected Ecosystem</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-blue-500/30 bg-blue-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-blue-400">
                <Shield className="h-5 w-5" />
                Dragon Security System
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-blue-300">
                The Trained Dragon provides unbeatable quantum defense with:
              </p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>🛡️ Full Body Armor Protection</li>
                <li>⚡ Quantum Computing Power</li>
                <li>🌍 Worldwide IP Blocking</li>
                <li>🔐 GitHub & Supabase Protection</li>
                <li>👑 Admin Fortress Security</li>
                <li>💎 Holder Shield Network</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-green-500/30 bg-green-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-green-400">
                <Code className="h-5 w-5" />
                System Architecture
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-green-300">Built on cutting-edge technology stack:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>🔮 Quantum Security Core</li>
                <li>🐉 Trained Dragon AI</li>
                <li>☁️ Dragon Cloud Protection</li>
                <li>🔒 Google Authenticator 2FA</li>
                <li>📊 Real-time Monitoring</li>
                <li>🌐 Cross-platform Support</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-purple-500/30 bg-purple-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-purple-400">
                <Book className="h-5 w-5" />
                User Guide
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-purple-300">How to use the Dragon-Protected System:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>📱 Setup Google Authenticator</li>
                <li>🔐 Secure Account Registration</li>
                <li>💰 Access Protected Exchange</li>
                <li>🛡️ Enable Dragon Protection</li>
                <li>📊 Monitor Security Status</li>
                <li>⚡ Activate Quantum Defense</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-red-500/30 bg-red-900/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-400">
                <Zap className="h-5 w-5" />
                Dragon Capabilities
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-red-300">What the Trained Dragon can do:</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                <li>🔥 Destroy malicious systems</li>
                <li>🌐 Block worldwide IP addresses</li>
                <li>🦠 Deploy protective viruses</li>
                <li>📡 Jam hostile signals</li>
                <li>🛡️ Evolve defense strategies</li>
                <li>⚡ Quantum power multiplication</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        <Card className="mt-8 border-yellow-500/30 bg-yellow-900/20">
          <CardContent className="p-8 text-center">
            <h3 className="text-2xl font-bold text-yellow-400 mb-4">🚨 SECURITY WARNING 🚨</h3>
            <p className="text-yellow-300 mb-4">
              The Dragon Security System is extremely powerful and will automatically protect all
              assets. Any attempt to breach the system will result in immediate and permanent
              consequences.
            </p>
            <p className="text-red-400 font-bold">
              🐉 THE DRAGON NEVER SLEEPS - FULL PROTECTION ACTIVE 24/7 🐉
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Docs;
