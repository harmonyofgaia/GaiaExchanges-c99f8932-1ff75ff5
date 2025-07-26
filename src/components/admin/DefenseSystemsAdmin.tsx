import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Shield, 
  Zap, 
  AlertTriangle, 
  Sword,
  Crown,
  Eye,
  Lock,
  Activity,
  Target,
  Crosshair,
  Radar,
  Sparkles
} from 'lucide-react';

export function DefenseSystemsAdmin() {
  const [defenseStats, setDefenseStats] = useState({
    totalThreats: 28479,
    blockedToday: 847,
    activeDefenses: 15,
    securityLevel: 98.7,
    dragonDefenses: 7,
    koalaEngines: 3,
    phoenixGuards: 4
  });

  const [activeDefenses, setActiveDefenses] = useState([
    { 
      id: 1, 
      name: "Dragon AI Defense", 
      type: "AI Security", 
      status: "active", 
      threatLevel: "high",
      efficiency: 97.8,
      blocked: 2847,
      description: "Advanced AI-powered threat detection and response"
    },
    { 
      id: 2, 
      name: "Thunderstorm Defense", 
      type: "Network Protection", 
      status: "active", 
      threatLevel: "medium",
      efficiency: 94.2,
      blocked: 1923,
      description: "Multi-layered network security protocols"
    },
    { 
      id: 3, 
      name: "Phoenix Guardian", 
      type: "System Recovery", 
      status: "standby", 
      threatLevel: "low",
      efficiency: 99.1,
      blocked: 0,
      description: "Automated recovery and resilience systems"
    },
    { 
      id: 4, 
      name: "Koala AI Engine", 
      type: "Behavioral Analysis", 
      status: "active", 
      threatLevel: "medium",
      efficiency: 91.7,
      blocked: 567,
      description: "Intelligent behavior pattern analysis"
    },
    { 
      id: 5, 
      name: "Quantum Firewall", 
      type: "Quantum Security", 
      status: "active", 
      threatLevel: "critical",
      efficiency: 98.9,
      blocked: 4321,
      description: "Quantum-encrypted security barrier"
    }
  ]);

  const [threatIntel, setThreatIntel] = useState([
    { id: 1, threat: "Coordinated bot attack", severity: "high", source: "Multiple IPs", status: "mitigated", time: "2 minutes ago" },
    { id: 2, threat: "Suspicious login patterns", severity: "medium", source: "User account", status: "investigating", time: "15 minutes ago" },
    { id: 3, threat: "DDoS attempt detected", severity: "critical", source: "Botnet", status: "blocked", time: "1 hour ago" },
    { id: 4, threat: "Malicious content upload", severity: "medium", source: "Content system", status: "quarantined", time: "2 hours ago" }
  ]);

  const [systemAlerts, setSystemAlerts] = useState([
    { id: 1, type: "security", message: "Dragon Defense successfully blocked coordinated attack", timestamp: "Now" },
    { id: 2, type: "warning", message: "Unusual traffic pattern detected in sector 7", timestamp: "5 minutes ago" },
    { id: 3, type: "info", message: "Defense system update completed successfully", timestamp: "1 hour ago" }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDefenseStats(prev => ({
        ...prev,
        blockedToday: prev.blockedToday + Math.floor(Math.random() * 3),
        securityLevel: Math.max(95, Math.min(100, prev.securityLevel + (Math.random() - 0.5) * 0.5))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="default" className="bg-green-500"><Shield className="h-3 w-3 mr-1" />Active</Badge>;
      case 'standby':
        return <Badge variant="default" className="bg-blue-500"><Eye className="h-3 w-3 mr-1" />Standby</Badge>;
      case 'maintenance':
        return <Badge variant="secondary"><Lock className="h-3 w-3 mr-1" />Maintenance</Badge>;
      case 'offline':
        return <Badge variant="destructive"><AlertTriangle className="h-3 w-3 mr-1" />Offline</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getThreatBadge = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <Badge variant="destructive">Critical</Badge>;
      case 'high':
        return <Badge variant="default" className="bg-red-600">High</Badge>;
      case 'medium':
        return <Badge variant="default" className="bg-yellow-600">Medium</Badge>;
      case 'low':
        return <Badge variant="outline">Low</Badge>;
      default:
        return <Badge variant="secondary">{severity}</Badge>;
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'security':
        return <Shield className="h-4 w-4 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      case 'info':
        return <Activity className="h-4 w-4 text-blue-500" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-red-400">🛡️ Defense Systems Command</h2>
          <p className="text-muted-foreground">Advanced Security & Threat Protection</p>
        </div>
        <div className="flex space-x-2">
          <Badge variant="outline" className="text-red-400 border-red-400">
            <Shield className="h-4 w-4 mr-2" />
            Dragon Defense Active
          </Badge>
          <Badge variant="outline" className="text-green-500 border-green-500">
            <Shield className="h-4 w-4 mr-2" />
            Security Level: {defenseStats.securityLevel.toFixed(1)}%
          </Badge>
        </div>
      </div>

      {/* Defense Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Threats Blocked</p>
                <p className="text-2xl font-bold">{defenseStats.totalThreats.toLocaleString()}</p>
              </div>
              <Shield className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Blocked Today</p>
                <p className="text-2xl font-bold">{defenseStats.blockedToday}</p>
              </div>
              <Target className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Active Defenses</p>
                <p className="text-2xl font-bold">{defenseStats.activeDefenses}</p>
              </div>
              <Radar className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-sm text-muted-foreground">Security Level</p>
                <p className="text-2xl font-bold">{defenseStats.securityLevel.toFixed(1)}%</p>
              </div>
              <Crown className="h-8 w-8 text-yellow-500" />
            </div>
            <Progress value={defenseStats.securityLevel} className="h-2" />
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="defenses" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="defenses">Defense Systems</TabsTrigger>
          <TabsTrigger value="threats">Threat Intelligence</TabsTrigger>
          <TabsTrigger value="monitoring">Live Monitoring</TabsTrigger>
          <TabsTrigger value="responses">Auto Responses</TabsTrigger>
          <TabsTrigger value="settings">Configuration</TabsTrigger>
        </TabsList>

        <TabsContent value="defenses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Defense Systems</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activeDefenses.map((defense) => (
                  <div key={defense.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="p-2 bg-red-100 rounded-lg">
                        {defense.name.includes('Dragon') && <Shield className="h-6 w-6 text-red-600" />}
                        {defense.name.includes('Thunderstorm') && <Zap className="h-6 w-6 text-blue-600" />}
                        {defense.name.includes('Phoenix') && <Sparkles className="h-6 w-6 text-orange-600" />}
                        {defense.name.includes('Koala') && <Eye className="h-6 w-6 text-green-600" />}
                        {defense.name.includes('Quantum') && <Lock className="h-6 w-6 text-purple-600" />}
                      </div>
                      <div>
                        <h3 className="font-semibold">{defense.name}</h3>
                        <p className="text-sm text-muted-foreground">{defense.description}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-muted-foreground">Type: {defense.type}</span>
                          <span className="text-xs text-muted-foreground">Efficiency: {defense.efficiency}%</span>
                          <span className="text-xs text-muted-foreground">Blocked: {defense.blocked}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusBadge(defense.status)}
                      {getThreatBadge(defense.threatLevel)}
                      <Button size="sm" variant="outline">
                        <Crosshair className="h-4 w-4 mr-1" />
                        Configure
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="threats" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Threat Intelligence Feed</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {threatIntel.map((threat) => (
                  <div key={threat.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold">{threat.threat}</h3>
                      <p className="text-sm text-muted-foreground">Source: {threat.source}</p>
                      <p className="text-xs text-muted-foreground mt-1">{threat.time}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getThreatBadge(threat.severity)}
                      <Badge variant="outline" className={
                        threat.status === 'mitigated' ? 'text-green-600 border-green-600' :
                        threat.status === 'blocked' ? 'text-blue-600 border-blue-600' :
                        threat.status === 'investigating' ? 'text-yellow-600 border-yellow-600' :
                        'text-red-600 border-red-600'
                      }>
                        {threat.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Real-time Alerts</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {systemAlerts.map((alert) => (
                    <div key={alert.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className="mt-0.5">
                        {getAlertIcon(alert.type)}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{alert.message}</p>
                        <p className="text-xs text-muted-foreground mt-1">{alert.timestamp}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Defense Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Dragon AI Defense</span>
                      <span className="text-sm font-medium">97.8%</span>
                    </div>
                    <Progress value={97.8} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Quantum Firewall</span>
                      <span className="text-sm font-medium">98.9%</span>
                    </div>
                    <Progress value={98.9} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Thunderstorm Defense</span>
                      <span className="text-sm font-medium">94.2%</span>
                    </div>
                    <Progress value={94.2} />
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Koala AI Engine</span>
                      <span className="text-sm font-medium">91.7%</span>
                    </div>
                    <Progress value={91.7} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="responses" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Automated Response Protocols</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">DDoS Attack Response</h3>
                  <p className="text-sm text-muted-foreground mb-2">Automatically block coordinated attacks and scale defenses</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="default" className="bg-green-500">Active</Badge>
                    <Button size="sm" variant="outline">Configure</Button>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Malicious Content Detection</h3>
                  <p className="text-sm text-muted-foreground mb-2">AI-powered content scanning and automatic quarantine</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="default" className="bg-green-500">Active</Badge>
                    <Button size="sm" variant="outline">Configure</Button>
                  </div>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Suspicious Account Behavior</h3>
                  <p className="text-sm text-muted-foreground mb-2">Monitor and respond to unusual account activities</p>
                  <div className="flex justify-between items-center">
                    <Badge variant="default" className="bg-green-500">Active</Badge>
                    <Button size="sm" variant="outline">Configure</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Defense System Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Auto-deploy countermeasures</h3>
                    <p className="text-sm text-muted-foreground">Automatically deploy defenses when threats detected</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Real-time threat intelligence</h3>
                    <p className="text-sm text-muted-foreground">Continuous threat feed updates</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-medium">Dragon Defense AI learning</h3>
                    <p className="text-sm text-muted-foreground">Enable adaptive AI learning from new threats</p>
                  </div>
                  <input type="checkbox" className="toggle" defaultChecked />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium">Threat Response Sensitivity</label>
                  <select className="w-full px-3 py-2 border rounded-md mt-1">
                    <option value="high">High (Aggressive)</option>
                    <option value="medium" selected>Medium (Balanced)</option>
                    <option value="low">Low (Conservative)</option>
                  </select>
                </div>
                <div>
                  <label className="text-sm font-medium">Auto-block Duration (hours)</label>
                  <input type="number" className="w-full px-3 py-2 border rounded-md mt-1" defaultValue="24" />
                </div>
              </div>
              <Button>Save Configuration</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}