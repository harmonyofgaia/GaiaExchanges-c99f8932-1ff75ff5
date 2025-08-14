import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Download, Megaphone, Globe, Leaf, Zap } from "lucide-react";
import { toast } from "sonner";

export function PromotionalContentGenerator() {
  const [copiedContent, setCopiedContent] = useState<string | null>(null);

  const promotionalContent = {
    headlines: [
      "🌍 Join the Night Train Express to a Normal Healthy Planet!",
      "🚀 GAIA: Where Technology Meets Environmental Revolution!",
      "💚 Be Part of the Love & Joy Protocol - Transform Finance Forever!",
      "🌱 Breaking Barriers, Building Futures - The GAIA Way!",
      "⚡ 10x Performance, 100% Sustainable - Welcome to Tomorrow!",
      "🎯 Race to Build A Better Place - Keep Yourself in Open Minded SPACE!",
    ],
    socialMediaPosts: [
      "🌍 Ready to board the Night Train Express to environmental healing? GAIA's revolutionary Love & Joy protocol is transforming cryptocurrency into a force for planetary recovery! Join thousands building microscopical-level environmental solutions. #GAIAToken #GreenCrypto #CultureOfHarmony",

      "🚀 We bark our way through barriers, deploying innovative ideas that help rebuild our green planet! GAIA Exchange offers ZERO fees, quantum security, and environmental impact tracking. Every trade heals the Earth! 🌱 #ZeroFees #QuantumSecurity",

      "💡 Dive Deep into Our Race to find and Build A Better Place! GAIA's Virtual World lets you create landscapes, connect with VR, and trade in complete security. Keep yourself surrounded in Open Minded SPACE! 🎮 #VirtualWorld #VRGaming",

      "⚡ 10x faster than Bitcoin + Ethereum COMBINED! GAIA's quantum-resistant technology processes 1M+ transactions per second while being 100% carbon-negative. The future of finance is HERE! 📈 #QuantumTech #CarbonNegative",

      "🌟 From microscopic particle recovery to massive environmental restoration - GAIA operates on every level! Join our community of builders, dreamers, and planet healers. Download on ALL platforms! 📱💻 #CrossPlatform #EnvironmentalTech",
    ],
    benefits: [
      "🔐 Quantum-Resistant Security - Your investments protected by military-grade encryption",
      "⚡ Lightning Speed - 1M+ transactions per second with sub-millisecond response",
      "🌱 100% Carbon Negative - Every transaction helps heal the planet",
      "💰 Zero Trading Fees - Keep 100% of your profits forever",
      "🌍 Global Accessibility - Available on Windows, macOS, Linux, iOS, Android",
      "🎮 Integrated Gaming & VR - Earn while playing in virtual landscapes",
      "📊 Advanced Analytics - AI-powered market insights and predictions",
      "🏦 DeFi Integration - Complete financial ecosystem in one platform",
      "🔄 Cross-Chain Compatibility - Trade any cryptocurrency seamlessly",
      "🛡️ 71-Layer Security - Unbreakable defense against all threats",
    ],
    reasons: [
      "Environmental Impact: Every transaction removes carbon from the atmosphere while generating clean energy",
      "Financial Revolution: Break free from traditional banking fees and limitations",
      "Community Power: Join 10M+ active users building a sustainable future together",
      "Technological Superiority: Experience blockchain technology that's 5+ years ahead of competitors",
      "Global Reach: Access your funds and trade from anywhere on any device",
      "Gaming Integration: Earn real value while enjoying immersive virtual experiences",
      "Open Source: Transparent, community-driven development with full code visibility",
      "Regulatory Compliance: Fully licensed and compliant in 195+ countries worldwide",
      "Educational Resources: Learn and grow with comprehensive guides and community support",
      "Future-Proof: Quantum-resistant technology that remains secure for decades to come",
    ],
    callsToAction: [
      "🌟 Board the Night Train Express to Environmental Healing - Join GAIA Today!",
      "🚀 Don't Miss the Green Revolution - Download GAIA Exchange Now!",
      "💚 Be the Change - Start Trading with Love & Joy Protocol!",
      "🌍 Help Heal the Planet One Transaction at a Time - Join GAIA!",
      "⚡ Experience 10x Performance - Try GAIA Exchange Today!",
      "🎮 Enter the Virtual World - Build, Play, Earn with GAIA!",
    ],
  };

  const copyToClipboard = (content: string, type: string) => {
    navigator.clipboard.writeText(content);
    setCopiedContent(content);
    toast.success(`${type} copied to clipboard!`);
    setTimeout(() => setCopiedContent(null), 2000);
  };

  const downloadAllContent = () => {
    const allContent = `
# GAIA PROMOTIONAL CONTENT LIBRARY
## Complete Marketing Arsenal for Environmental Revolution

---

## HEADLINES & TAGLINES
${promotionalContent.headlines.map((headline, i) => `${i + 1}. ${headline}`).join("\n")}

---

## SOCIAL MEDIA POSTS
${promotionalContent.socialMediaPosts
  .map(
    (post, i) => `
POST ${i + 1}:
${post}
`
  )
  .join("\n")}

---

## KEY BENEFITS
${promotionalContent.benefits.map((benefit, i) => `${i + 1}. ${benefit}`).join("\n")}

---

## REASONS TO JOIN GAIA
${promotionalContent.reasons.map((reason, i) => `${i + 1}. ${reason}`).join("\n")}

---

## CALL-TO-ACTION PHRASES
${promotionalContent.callsToAction.map((cta, i) => `${i + 1}. ${cta}`).join("\n")}

---

## CORE MESSAGE
"We bark our way through barriers of many projects to deploy ideas and businesses, helping the green planet rebuild and recover every particle on microscopical level. So we dive deep into our race to find and build a better place. Keep yourself surrounded in an Open Minded SPACE!"

---

## CONTACT INFORMATION
- Website: https://cultureofharmony.net
- Email: info@cultureofharmony.net
- Phone: +31687758236

© 2024 Culture of Harmony - GAIA Ecosystem
Generated: ${new Date().toLocaleDateString()}
    `;

    const blob = new Blob([allContent], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "GAIA-Promotional-Content-Library.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success("Promotional Content Library Downloaded!", {
      description: "Complete marketing arsenal ready for environmental revolution",
      duration: 3000,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="border-purple-500/30 bg-gradient-to-r from-purple-900/20 to-pink-900/20">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl text-purple-400 flex items-center gap-2">
                <Megaphone className="h-6 w-6" />
                GAIA Promotional Arsenal
              </CardTitle>
              <p className="text-muted-foreground">
                Complete marketing library for environmental revolution
              </p>
            </div>
            <Button onClick={downloadAllContent} className="bg-purple-600 hover:bg-purple-700">
              <Download className="h-4 w-4 mr-2" />
              Download All Content
            </Button>
          </div>
        </CardHeader>
      </Card>

      {/* Content Tabs */}
      <Tabs defaultValue="headlines" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="headlines">Headlines</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="benefits">Benefits</TabsTrigger>
          <TabsTrigger value="reasons">Why Join</TabsTrigger>
          <TabsTrigger value="cta">Call to Action</TabsTrigger>
        </TabsList>

        <TabsContent value="headlines" className="space-y-4">
          <Card className="border-yellow-500/30">
            <CardHeader>
              <CardTitle className="text-yellow-400 flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Powerful Headlines & Taglines
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {promotionalContent.headlines.map((headline, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                  >
                    <span className="flex-1">{headline}</span>
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(headline, "Headline")}
                      variant={copiedContent === headline ? "default" : "outline"}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="social" className="space-y-4">
          <Card className="border-blue-500/30">
            <CardHeader>
              <CardTitle className="text-blue-400 flex items-center gap-2">
                <Globe className="h-5 w-5" />
                Social Media Posts
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {promotionalContent.socialMediaPosts.map((post, index) => (
                  <div key={index} className="p-4 bg-muted/20 rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-blue-600 text-white">Post {index + 1}</Badge>
                      <Button
                        size="sm"
                        onClick={() => copyToClipboard(post, "Social Media Post")}
                        variant={copiedContent === post ? "default" : "outline"}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-sm leading-relaxed">{post}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="benefits" className="space-y-4">
          <Card className="border-green-500/30">
            <CardHeader>
              <CardTitle className="text-green-400 flex items-center gap-2">
                <Leaf className="h-5 w-5" />
                Key Benefits & Features
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3">
                {promotionalContent.benefits.map((benefit, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                  >
                    <span className="flex-1 text-sm">{benefit}</span>
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(benefit, "Benefit")}
                      variant={copiedContent === benefit ? "default" : "outline"}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reasons" className="space-y-4">
          <Card className="border-orange-500/30">
            <CardHeader>
              <CardTitle className="text-orange-400">Why Choose GAIA</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {promotionalContent.reasons.map((reason, index) => (
                  <div key={index} className="p-3 bg-muted/20 rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className="bg-orange-600 text-white">Reason {index + 1}</Badge>
                      <Button
                        size="sm"
                        onClick={() => copyToClipboard(reason, "Reason")}
                        variant={copiedContent === reason ? "default" : "outline"}
                      >
                        <Copy className="h-3 w-3" />
                      </Button>
                    </div>
                    <p className="text-sm">{reason}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="cta" className="space-y-4">
          <Card className="border-red-500/30">
            <CardHeader>
              <CardTitle className="text-red-400">Call-to-Action Phrases</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {promotionalContent.callsToAction.map((cta, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 bg-muted/20 rounded-lg"
                  >
                    <span className="flex-1 font-medium">{cta}</span>
                    <Button
                      size="sm"
                      onClick={() => copyToClipboard(cta, "Call-to-Action")}
                      variant={copiedContent === cta ? "default" : "outline"}
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Inspirational Message */}
      <Card className="border-gradient bg-gradient-to-r from-green-900/20 via-blue-900/20 to-purple-900/20">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <h3 className="text-xl font-bold bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
              Our Mission Statement
            </h3>
            <p className="text-lg leading-relaxed max-w-4xl mx-auto">
              "We bark our way through barriers of many projects to deploy ideas and businesses,
              helping the green planet rebuild and recover every particle on microscopical level. So
              we dive deep into our race to find and build a better place. Keep yourself surrounded
              in an Open Minded SPACE!"
            </p>
            <div className="flex justify-center">
              <Button
                onClick={() =>
                  copyToClipboard(
                    "We bark our way through barriers of many projects to deploy ideas and businesses, helping the green planet rebuild and recover every particle on microscopical level. So we dive deep into our race to find and build a better place. Keep yourself surrounded in an Open Minded SPACE!",
                    "Mission Statement"
                  )
                }
                className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy Mission Statement
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
