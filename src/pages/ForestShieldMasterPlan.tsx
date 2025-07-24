import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Shield, 
  Target, 
  Satellite, 
  Coins, 
  Users, 
  TreePine, 
  Flame, 
  Droplets,
  Brain,
  Globe,
  TrendingUp,
  Lock,
  Zap,
  Map,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const ForestShieldMasterPlan = () => {
  const phaseProgress = {
    phase1: 25,
    phase2: 0,
    phase3: 0,
    phase4: 0
  };

  const keyMetrics = [
    { label: "Forests Protected", value: "0", target: "10M hectares", icon: TreePine },
    { label: "Sand Cannons Deployed", value: "0", target: "50,000", icon: Target },
    { label: "IoT Sensors Active", value: "0", target: "500,000", icon: Satellite },
    { label: "Token Holders", value: "0", target: "1M+", icon: Coins },
    { label: "Community Members", value: "0", target: "100K+", icon: Users },
    { label: "Wildfires Prevented", value: "0", target: "1,000+", icon: Shield }
  ];

  const roadmapPhases = [
    {
      id: "phase1",
      title: "R&D & Prototyping",
      timeline: "Q1-Q2 2025",
      status: "In Progress",
      progress: 25,
      color: "bg-blue-500",
      tasks: [
        "Sand cannon technology development",
        "IoT sensor network design", 
        "AI detection algorithm creation",
        "Blockchain token architecture",
        "Initial prototype testing"
      ]
    },
    {
      id: "phase2", 
      title: "Pilot Programs",
      timeline: "Q3-Q4 2025",
      status: "Planned",
      progress: 0,
      color: "bg-yellow-500",
      tasks: [
        "Deploy 100 sand cannons in high-risk areas",
        "Launch IoT sensor network in 3 regions",
        "Community pilot programs",
        "Partnership agreements with forest services",
        "Impact measurement baseline establishment"
      ]
    },
    {
      id: "phase3",
      title: "Global Expansion", 
      timeline: "2026-2027",
      status: "Planned",
      progress: 0,
      color: "bg-green-500",
      tasks: [
        "Scale to 10,000+ sand cannon installations",
        "International partnership expansion",
        "Full DAO governance implementation",
        "Advanced AI integration",
        "Carbon credit marketplace launch"
      ]
    },
    {
      id: "phase4",
      title: "Continuous Innovation",
      timeline: "2028+",
      status: "Planned", 
      progress: 0,
      color: "bg-purple-500",
      tasks: [
        "Next-generation wildfire prediction",
        "Autonomous drone integration",
        "Quantum-secured communications",
        "Global forest protection network",
        "Planetary scale impact measurement"
      ]
    }
  ];

  const tokenomics = [
    { type: "Impact Tokens", distribution: "40%", purpose: "Reward environmental impact", color: "bg-green-500" },
    { type: "Governance Tokens", distribution: "25%", purpose: "DAO voting and governance", color: "bg-blue-500" },
    { type: "Investor Tokens", distribution: "20%", purpose: "Funding and returns", color: "bg-yellow-500" },
    { type: "Community Tokens", distribution: "10%", purpose: "Local responder rewards", color: "bg-purple-500" },
    { type: "Development Fund", distribution: "5%", purpose: "Continuous innovation", color: "bg-red-500" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-green-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">Forest Shield Sand Cannon</h1>
          </div>
          <h2 className="text-2xl font-semibold text-green-700 mb-2">Wildfire Defense Master Plan</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            A comprehensive global wildfire defense system combining automated sand cannon installations, 
            advanced AI detection, blockchain governance, and community engagement for planetary forest protection.
          </p>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <Badge variant="outline" className="bg-green-100 text-green-800">Version 1.0</Badge>
            <Badge variant="outline" className="bg-blue-100 text-blue-800">Active Development</Badge>
            <Badge variant="outline" className="bg-yellow-100 text-yellow-800">Global Scale</Badge>
          </div>
        </div>

        {/* Key Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {keyMetrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <Card key={index} className="border-2 hover:shadow-lg transition-shadow">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <IconComponent className="h-8 w-8 text-green-600" />
                    <Badge variant="outline">{metric.target}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className="text-sm text-gray-600">{metric.label}</div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
            <TabsTrigger value="technology">Technology</TabsTrigger>
            <TabsTrigger value="tokenomics">Tokenomics</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="impact">Impact</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-green-600" />
                    Mission Statement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed">
                    To create the world's first globally coordinated wildfire defense system that leverages 
                    automated sand cannon installations, AI-powered early detection, and blockchain-based 
                    community governance to protect forests before fires can spread, ensuring planetary 
                    forest preservation for future generations.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="h-5 w-5 mr-2 text-blue-600" />
                    Core Innovation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-start space-x-3">
                      <Droplets className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <div className="font-semibold">Sand Cannon Technology</div>
                        <div className="text-sm text-gray-600">Automated fire suppression using locally sourced sand</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Brain className="h-5 w-5 text-purple-500 mt-0.5" />
                      <div>
                        <div className="font-semibold">AI Detection Network</div>
                        <div className="text-sm text-gray-600">Satellite and IoT-based early warning system</div>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3">
                      <Coins className="h-5 w-5 text-yellow-500 mt-0.5" />
                      <div>
                        <div className="font-semibold">Blockchain Governance</div>
                        <div className="text-sm text-gray-600">Decentralized funding and community control</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Globe className="h-5 w-5 mr-2 text-green-600" />
                  Global Forest Protection Network
                </CardTitle>
                <CardDescription>
                  Comprehensive wildfire defense coverage across vulnerable forest regions worldwide
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <TreePine className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="font-semibold">Forest Coverage</div>
                    <div className="text-sm text-gray-600">10 million hectares protected</div>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Satellite className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold">Detection Network</div>
                    <div className="text-sm text-gray-600">500,000 IoT sensors</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <Shield className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <div className="font-semibold">Defense Systems</div>
                    <div className="text-sm text-gray-600">50,000 sand cannons</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Roadmap Tab */}
          <TabsContent value="roadmap" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Map className="h-5 w-5 mr-2 text-blue-600" />
                  Multi-Phase Implementation Roadmap
                </CardTitle>
                <CardDescription>
                  Strategic phases for global wildfire defense system deployment
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {roadmapPhases.map((phase, index) => (
                    <div key={phase.id} className="border-l-4 border-gray-200 pl-6 relative">
                      <div className={`absolute -left-2 top-0 w-4 h-4 rounded-full ${phase.color}`}></div>
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg font-semibold">{phase.title}</h3>
                        <div className="flex items-center space-x-2">
                          <Badge variant={phase.status === "In Progress" ? "default" : "secondary"}>
                            {phase.status}
                          </Badge>
                          <span className="text-sm text-gray-500">{phase.timeline}</span>
                        </div>
                      </div>
                      <Progress value={phase.progress} className="mb-3" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {phase.tasks.map((task, taskIndex) => (
                          <div key={taskIndex} className="flex items-center space-x-2 text-sm">
                            {phase.progress > 0 && taskIndex === 0 ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <div className="h-4 w-4 border-2 border-gray-300 rounded"></div>
                            )}
                            <span>{task}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Technology Tab */}
          <TabsContent value="technology" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 mr-2 text-red-600" />
                    Sand Cannon Technology
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Core Features</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Automated fire detection and response</li>
                        <li>• 360-degree coverage with 500m range</li>
                        <li>• Solar-powered with battery backup</li>
                        <li>• Local sand sourcing and recycling</li>
                        <li>• Weather-resistant deployment</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Technical Specifications</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Response time: &lt;30 seconds</li>
                        <li>• Sand capacity: 10,000 kg</li>
                        <li>• Operating temperature: -20°C to 60°C</li>
                        <li>• Network connectivity: 5G/Satellite</li>
                        <li>• Maintenance cycle: 6 months</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Brain className="h-5 w-5 mr-2 text-purple-600" />
                    AI Detection Network
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Detection Methods</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Satellite thermal imaging</li>
                        <li>• IoT sensor networks</li>
                        <li>• Computer vision analysis</li>
                        <li>• Weather pattern integration</li>
                        <li>• Community crowdsourcing</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">AI Capabilities</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• 99.5% fire detection accuracy</li>
                        <li>• 15-minute prediction window</li>
                        <li>• False positive rate: &lt;0.1%</li>
                        <li>• Multi-language support</li>
                        <li>• Continuous learning algorithms</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Lock className="h-5 w-5 mr-2 text-blue-600" />
                  Security & Resilience
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Network Security</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• End-to-end encryption</li>
                      <li>• Multi-factor authentication</li>
                      <li>• Blockchain immutability</li>
                      <li>• Regular security audits</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">System Resilience</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Redundant communication paths</li>
                      <li>• Offline operation capability</li>
                      <li>• Self-healing network topology</li>
                      <li>• Emergency override protocols</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Data Protection</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• GDPR compliance</li>
                      <li>• Decentralized storage</li>
                      <li>• Zero-knowledge proofs</li>
                      <li>• Privacy-preserving analytics</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tokenomics Tab */}
          <TabsContent value="tokenomics" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Coins className="h-5 w-5 mr-2 text-yellow-600" />
                  Multi-Tier Token System
                </CardTitle>
                <CardDescription>
                  Blockchain-powered incentives for funding, governance, and impact verification
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tokenomics.map((token, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${token.color}`}></div>
                        <div>
                          <div className="font-semibold">{token.type}</div>
                          <div className="text-sm text-gray-600">{token.purpose}</div>
                        </div>
                      </div>
                      <Badge variant="outline">{token.distribution}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Funding Mechanism</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>Initial Development</span>
                      <span className="font-semibold">$50M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Global Deployment</span>
                      <span className="font-semibold">$500M</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Operational Budget</span>
                      <span className="font-semibold">$100M/year</span>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center font-semibold">
                        <span>Total Required</span>
                        <span>$650M+</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>DAO Governance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <h4 className="font-semibold mb-2">Voting Rights</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• System deployment decisions</li>
                        <li>• Budget allocation voting</li>
                        <li>• Technology upgrade approvals</li>
                        <li>• Partnership agreements</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Proposal Process</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Community proposal submission</li>
                        <li>• Technical review period</li>
                        <li>• Public discussion phase</li>
                        <li>• Token holder voting</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Community Tab */}
          <TabsContent value="community" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-blue-600" />
                    Community Engagement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Training Programs</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Local responder certification</li>
                        <li>• Equipment maintenance training</li>
                        <li>• Emergency response protocols</li>
                        <li>• Community leadership development</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Gamification</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Fire prevention challenges</li>
                        <li>• Community leaderboards</li>
                        <li>• Achievement badges</li>
                        <li>• Seasonal competitions</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                    Partnership Network
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Government Agencies</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• National forest services</li>
                        <li>• Emergency management agencies</li>
                        <li>• Environmental departments</li>
                        <li>• International cooperation bodies</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">NGOs & Tech Firms</h4>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Conservation organizations</li>
                        <li>• Technology partners</li>
                        <li>• Research institutions</li>
                        <li>• Funding foundations</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Community Dashboard Features</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <AlertTriangle className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                    <div className="font-semibold">Alert System</div>
                    <div className="text-sm text-gray-600">Real-time notifications</div>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Map className="h-8 w-8 text-green-600 mx-auto mb-2" />
                    <div className="font-semibold">Interactive Maps</div>
                    <div className="text-sm text-gray-600">Local coverage views</div>
                  </div>
                  <div className="text-center p-4 bg-yellow-50 rounded-lg">
                    <TrendingUp className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
                    <div className="font-semibold">Progress Tracking</div>
                    <div className="text-sm text-gray-600">Impact metrics</div>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Users className="h-8 w-8 text-purple-600 mx-auto mb-2" />
                    <div className="font-semibold">Social Features</div>
                    <div className="text-sm text-gray-600">Community forums</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Impact Tab */}
          <TabsContent value="impact" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <TreePine className="h-5 w-5 mr-2 text-green-600" />
                    Environmental Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>CO₂ Absorption Protected</span>
                      <span className="font-semibold">500M tons/year</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Biodiversity Preserved</span>
                      <span className="font-semibold">100K species</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Water Sources Protected</span>
                      <span className="font-semibold">10K watersheds</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Communities Safeguarded</span>
                      <span className="font-semibold">1M people</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Coins className="h-5 w-5 mr-2 text-yellow-600" />
                    Economic Impact
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span>Fire Damage Prevented</span>
                      <span className="font-semibold">$100B+</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Jobs Created</span>
                      <span className="font-semibold">50K direct</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Green Economy Value</span>
                      <span className="font-semibold">$500B</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Insurance Savings</span>
                      <span className="font-semibold">$50B/year</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Impact Verification System</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <h4 className="font-semibold mb-2">Measurement Methods</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Satellite monitoring</li>
                      <li>• Ground sensor data</li>
                      <li>• Third-party audits</li>
                      <li>• Community reporting</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Verification Standards</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• ISO 14064 compliance</li>
                      <li>• Verra VCS certification</li>
                      <li>• Gold Standard approval</li>
                      <li>• UN SDG alignment</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Transparency Tools</h4>
                    <ul className="space-y-1 text-sm text-gray-600">
                      <li>• Real-time dashboards</li>
                      <li>• Public data APIs</li>
                      <li>• Blockchain records</li>
                      <li>• Annual impact reports</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Call to Action */}
        <div className="mt-8 text-center">
          <Card className="bg-gradient-to-r from-green-500 to-blue-500 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Join the Forest Shield Revolution</h3>
              <p className="text-lg mb-6 opacity-90">
                Be part of the global movement to protect our forests with cutting-edge technology and community action.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" variant="secondary">
                  Explore Dashboard
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-green-600">
                  Learn More
                </Button>
                <Button size="lg" variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600">
                  Join Community
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ForestShieldMasterPlan;