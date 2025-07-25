import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Shield, 
  Zap, 
  AlertTriangle, 
  Eye, 
  Brain, 
  Radar,
  Crosshair,
  Activity,
  Lock,
  Unlock,
  Target,
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Settings,
  Globe,
  Wifi,
  Server,
  Database,
  Cpu,
  HardDrive,
  Network
} from 'lucide-react';
import { toast } from 'sonner';
import { Navbar } from '@/components/Navbar';

interface DefenseSystem {
  id: string;
  name: string;
  type: 'ai' | 'quantum' | 'biological' | 'cyber' | 'physical';
  status: 'active' | 'standby' | 'maintenance' | 'offline';
  threat_level: 1 | 2 | 3 | 4 | 5;
  effectiveness: number; // percentage
  last_activation: string;
  threats_blocked: number;
  description: string;
  capabilities: string[];
  autonomous: boolean;
  energy_consumption: number;
  upgrade_available: boolean;
}

interface ThreatAlert {
  id: string;
  type: 'cyber_attack' | 'physical_breach' | 'data_theft' | 'social_engineering' | 'malware';
  severity: 'low' | 'medium' | 'high' | 'critical';
  timestamp: string;
  source: string;
  target: string;
  status: 'detected' | 'analyzing' | 'blocking' | 'neutralized' | 'escalated';
  description: string;
  defense_response: string[];
  impact_assessment: {
    data_risk: number;
    system_risk: number;
    user_risk: number;
  };
}

interface AttackPattern {
  id: string;
  name: string;
  frequency: number;
  success_rate: number;
  last_detected: string;
  countermeasures: string[];
  threat_intelligence: {
    origin_countries: string[];
    common_targets: string[];
    typical_payload: string;
  };
}

const DefenseAttackMechanisms: React.FC = () => {
  const [defenseSystems, setDefenseSystems] = useState<DefenseSystem[]>([]);
  const [threatAlerts, setThreatAlerts] = useState<ThreatAlert[]>([]);
  const [attackPatterns, setAttackPatterns] = useState<AttackPattern[]>([]);
  const [systemStatus, setSystemStatus] = useState<{
    overall_threat_level: number;
    systems_online: number;
    threats_blocked_today: number;
    active_defenses: number;
  } | null>(null);
  const [selectedSystem, setSelectedSystem] = useState<DefenseSystem | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Initialize defense systems
    const sampleDefenseSystems: DefenseSystem[] = [
      {
        id: 'dragon-ai-defense',
        name: 'Dragon AI Defense Matrix',
        type: 'ai',
        status: 'active',
        threat_level: 5,
        effectiveness: 98.7,
        last_activation: '2025-01-25T10:30:00Z',
        threats_blocked: 15670,
        description: 'Advanced AI-powered threat detection and response system with machine learning capabilities.',
        capabilities: [
          'Real-time Threat Analysis',
          'Behavioral Pattern Recognition',
          'Automated Incident Response',
          'Predictive Threat Modeling',
          'Dynamic Rule Generation'
        ],
        autonomous: true,
        energy_consumption: 45,
        upgrade_available: true
      },
      {
        id: 'quantum-thunderstorm',
        name: 'Quantum Thunderstorm Defense',
        type: 'quantum',
        status: 'active',
        threat_level: 5,
        effectiveness: 99.2,
        last_activation: '2025-01-25T09:15:00Z',
        threats_blocked: 23450,
        description: 'Quantum-enhanced security protocol that uses quantum encryption and entanglement for ultimate protection.',
        capabilities: [
          'Quantum Encryption',
          'Entanglement-based Detection',
          'Quantum Key Distribution',
          'Superposition Analysis',
          'Quantum Tunneling Prevention'
        ],
        autonomous: true,
        energy_consumption: 78,
        upgrade_available: false
      },
      {
        id: 'phantom-guardian',
        name: 'Phantom Guardian Network',
        type: 'cyber',
        status: 'active',
        threat_level: 4,
        effectiveness: 94.8,
        last_activation: '2025-01-25T11:45:00Z',
        threats_blocked: 8920,
        description: 'Invisible network monitoring system that operates in stealth mode to detect and neutralize cyber threats.',
        capabilities: [
          'Stealth Network Monitoring',
          'Invisible Packet Analysis',
          'Shadow Firewall Management',
          'Covert Threat Hunting',
          'Ghost Mode Operations'
        ],
        autonomous: true,
        energy_consumption: 32,
        upgrade_available: true
      },
      {
        id: 'bio-defense-creatures',
        name: 'Biological Defense Creatures',
        type: 'biological',
        status: 'standby',
        threat_level: 3,
        effectiveness: 87.3,
        last_activation: '2025-01-24T16:20:00Z',
        threats_blocked: 5680,
        description: 'AI-controlled biological entities that can adapt and respond to environmental and digital threats.',
        capabilities: [
          'Adaptive Threat Response',
          'Environmental Monitoring',
          'Biological Pattern Analysis',
          'Ecosystem Defense',
          'Natural Camouflage'
        ],
        autonomous: false,
        energy_consumption: 23,
        upgrade_available: true
      },
      {
        id: 'fortress-shield',
        name: 'Digital Fortress Shield',
        type: 'cyber',
        status: 'active',
        threat_level: 4,
        effectiveness: 92.1,
        last_activation: '2025-01-25T12:00:00Z',
        threats_blocked: 12340,
        description: 'Multi-layered digital fortress with adaptive barriers and intelligent threat classification.',
        capabilities: [
          'Multi-layer Protection',
          'Adaptive Barriers',
          'Intelligent Classification',
          'Dynamic IP Filtering',
          'Automated Quarantine'
        ],
        autonomous: true,
        energy_consumption: 55,
        upgrade_available: false
      },
      {
        id: 'ghost-army',
        name: 'Ghost Army Orchestrator',
        type: 'physical',
        status: 'maintenance',
        threat_level: 2,
        effectiveness: 89.4,
        last_activation: '2025-01-23T14:30:00Z',
        threats_blocked: 3450,
        description: 'Coordinated physical security system with distributed monitoring and response capabilities.',
        capabilities: [
          'Distributed Monitoring',
          'Physical Perimeter Control',
          'Coordinated Response',
          'Access Point Management',
          'Emergency Lockdown'
        ],
        autonomous: false,
        energy_consumption: 67,
        upgrade_available: true
      }
    ];

    const sampleThreatAlerts: ThreatAlert[] = [
      {
        id: 'threat-001',
        type: 'cyber_attack',
        severity: 'high',
        timestamp: '2025-01-25T12:45:00Z',
        source: '192.168.1.100 (Suspicious)',
        target: 'Admin Dashboard',
        status: 'blocking',
        description: 'Detected sophisticated SQL injection attempt targeting admin authentication system.',
        defense_response: [
          'Dragon AI Defense: Analyzing attack pattern',
          'Quantum Thunderstorm: Encrypting vulnerable endpoints',
          'Phantom Guardian: Blocking source IP range',
          'Digital Fortress: Activating emergency protocols'
        ],
        impact_assessment: {
          data_risk: 85,
          system_risk: 70,
          user_risk: 45
        }
      },
      {
        id: 'threat-002',
        type: 'malware',
        severity: 'critical',
        timestamp: '2025-01-25T11:30:00Z',
        source: 'Email Attachment',
        target: 'User Workstations',
        status: 'neutralized',
        description: 'Zero-day malware detected in email attachment with advanced evasion techniques.',
        defense_response: [
          'Dragon AI Defense: Malware signature generated',
          'Phantom Guardian: Quarantine activated',
          'Digital Fortress: System-wide scan initiated',
          'Biological Defense: Environmental containment'
        ],
        impact_assessment: {
          data_risk: 95,
          system_risk: 90,
          user_risk: 80
        }
      },
      {
        id: 'threat-003',
        type: 'physical_breach',
        severity: 'medium',
        timestamp: '2025-01-25T10:15:00Z',
        source: 'Server Room Access',
        target: 'Physical Infrastructure',
        status: 'analyzing',
        description: 'Unauthorized access attempt detected at server room entrance using cloned access card.',
        defense_response: [
          'Ghost Army: Physical perimeter secured',
          'Biological Defense: Environmental sensors activated',
          'Digital Fortress: Access logs secured',
          'Quantum Thunderstorm: Quantum authentication required'
        ],
        impact_assessment: {
          data_risk: 60,
          system_risk: 75,
          user_risk: 30
        }
      }
    ];

    const sampleAttackPatterns: AttackPattern[] = [
      {
        id: 'pattern-001',
        name: 'Advanced Persistent Threat (APT)',
        frequency: 23,
        success_rate: 3.2,
        last_detected: '2025-01-25T08:20:00Z',
        countermeasures: [
          'Enhanced behavioral analysis',
          'Extended network monitoring',
          'Advanced threat hunting',
          'Zero-trust architecture'
        ],
        threat_intelligence: {
          origin_countries: ['China', 'Russia', 'North Korea'],
          common_targets: ['Government', 'Critical Infrastructure', 'Financial'],
          typical_payload: 'Data exfiltration and system persistence'
        }
      },
      {
        id: 'pattern-002',
        name: 'Ransomware Campaign',
        frequency: 45,
        success_rate: 8.7,
        last_detected: '2025-01-24T19:45:00Z',
        countermeasures: [
          'Automated backup verification',
          'Network segmentation',
          'Behavioral detection',
          'Rapid response protocols'
        ],
        threat_intelligence: {
          origin_countries: ['Eastern Europe', 'Southeast Asia'],
          common_targets: ['Healthcare', 'Education', 'Small Business'],
          typical_payload: 'File encryption and ransom demands'
        }
      },
      {
        id: 'pattern-003',
        name: 'Supply Chain Attack',
        frequency: 12,
        success_rate: 15.3,
        last_detected: '2025-01-23T14:30:00Z',
        countermeasures: [
          'Software integrity verification',
          'Vendor security assessment',
          'Code signing validation',
          'Third-party monitoring'
        ],
        threat_intelligence: {
          origin_countries: ['Various', 'State-sponsored'],
          common_targets: ['Software vendors', 'Cloud providers', 'Critical systems'],
          typical_payload: 'Backdoor installation and lateral movement'
        }
      }
    ];

    const sampleSystemStatus = {
      overall_threat_level: 3,
      systems_online: 5,
      threats_blocked_today: 156,
      active_defenses: 4
    };

    setDefenseSystems(sampleDefenseSystems);
    setThreatAlerts(sampleThreatAlerts);
    setAttackPatterns(sampleAttackPatterns);
    setSystemStatus(sampleSystemStatus);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-600';
      case 'standby': return 'bg-yellow-600';
      case 'maintenance': return 'bg-blue-600';
      case 'offline': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return CheckCircle;
      case 'standby': return Clock;
      case 'maintenance': return Settings;
      case 'offline': return XCircle;
      default: return AlertTriangle;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'bg-green-600';
      case 'medium': return 'bg-yellow-600';
      case 'high': return 'bg-orange-600';
      case 'critical': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'ai': return Brain;
      case 'quantum': return Zap;
      case 'biological': return Activity;
      case 'cyber': return Shield;
      case 'physical': return Lock;
      default: return Shield;
    }
  };

  const getThreatIcon = (type: string) => {
    switch (type) {
      case 'cyber_attack': return Target;
      case 'physical_breach': return Unlock;
      case 'data_theft': return Database;
      case 'social_engineering': return Users;
      case 'malware': return AlertTriangle;
      default: return AlertTriangle;
    }
  };

  const handleToggleSystem = async (systemId: string) => {
    const system = defenseSystems.find(s => s.id === systemId);
    if (!system) return;

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const newStatus = system.status === 'active' ? 'standby' : 'active';
      
      setDefenseSystems(prev => prev.map(s => 
        s.id === systemId 
          ? { ...s, status: newStatus }
          : s
      ));

      toast.success(
        `${system.name} ${newStatus === 'active' ? 'activated' : 'deactivated'}!`,
        {
          description: `Defense system is now ${newStatus}.`
        }
      );

    } catch (error) {
      toast.error('System toggle failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpgradeSystem = async (systemId: string) => {
    const system = defenseSystems.find(s => s.id === systemId);
    if (!system || !system.upgrade_available) return;

    setLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 3000));

      setDefenseSystems(prev => prev.map(s => 
        s.id === systemId 
          ? { 
              ...s, 
              effectiveness: Math.min(99.9, s.effectiveness + 2.5),
              upgrade_available: false,
              threat_level: Math.min(5, s.threat_level + 1)
            }
          : s
      ));

      toast.success(
        `${system.name} upgraded successfully!`,
        {
          description: `Defense effectiveness increased and new capabilities unlocked.`
        }
      );

    } catch (error) {
      toast.error('System upgrade failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-red-900 text-white">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 flex items-center gap-3">
            <Shield className="text-red-400" />
            Defense & Attack Mechanisms
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl">
            Advanced security ecosystem with AI-powered defense systems, quantum protection protocols, and real-time threat detection. 
            Monitor, control, and enhance your digital fortress against all forms of attacks.
          </p>
        </div>

        {/* System Status Overview */}
        {systemStatus && (
          <div className="grid gap-4 md:grid-cols-4 mb-8">
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-green-400" />
                <div className="text-2xl font-bold">{systemStatus.systems_online}/6</div>
                <div className="text-sm text-gray-400">Systems Online</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <Target className="w-8 h-8 mx-auto mb-2 text-red-400" />
                <div className="text-2xl font-bold">{systemStatus.threats_blocked_today}</div>
                <div className="text-sm text-gray-400">Threats Blocked Today</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <Activity className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                <div className="text-2xl font-bold">{systemStatus.active_defenses}</div>
                <div className="text-sm text-gray-400">Active Defenses</div>
              </CardContent>
            </Card>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-4 text-center">
                <AlertTriangle className={`w-8 h-8 mx-auto mb-2 ${
                  systemStatus.overall_threat_level <= 2 ? 'text-green-400' :
                  systemStatus.overall_threat_level <= 3 ? 'text-yellow-400' : 'text-red-400'
                }`} />
                <div className="text-2xl font-bold">{systemStatus.overall_threat_level}/5</div>
                <div className="text-sm text-gray-400">Threat Level</div>
              </CardContent>
            </Card>
          </div>
        )}

        <Tabs defaultValue="defense-systems" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-gray-800">
            <TabsTrigger value="defense-systems">Defense Systems</TabsTrigger>
            <TabsTrigger value="threat-alerts">Threat Alerts</TabsTrigger>
            <TabsTrigger value="attack-patterns">Attack Patterns</TabsTrigger>
            <TabsTrigger value="control-center">Control Center</TabsTrigger>
          </TabsList>

          <TabsContent value="defense-systems" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {defenseSystems.map((system) => {
                const TypeIcon = getTypeIcon(system.type);
                const StatusIcon = getStatusIcon(system.status);
                
                return (
                  <Card key={system.id} className="bg-gray-800 border-gray-700 hover:border-red-500 transition-colors">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <TypeIcon className="w-5 h-5 text-blue-400" />
                          {system.name}
                        </CardTitle>
                        <Badge className={`${getStatusColor(system.status)} text-white`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {system.status}
                        </Badge>
                      </div>
                      <div className="text-sm text-gray-400 capitalize">
                        {system.type} Defense System
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-300 text-sm">{system.description}</p>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-400">Effectiveness</span>
                          <div className="font-semibold text-green-400">{system.effectiveness}%</div>
                          <Progress value={system.effectiveness} className="h-2 mt-1" />
                        </div>
                        <div>
                          <span className="text-gray-400">Threat Level</span>
                          <div className="font-semibold">
                            {'★'.repeat(system.threat_level)}{'☆'.repeat(5 - system.threat_level)}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400">Threats Blocked</span>
                          <div className="font-semibold text-red-400">{system.threats_blocked.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-400">Energy Usage</span>
                          <div className="font-semibold">{system.energy_consumption}%</div>
                        </div>
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold mb-2">Capabilities</h4>
                        <div className="flex flex-wrap gap-1">
                          {system.capabilities.slice(0, 3).map(capability => (
                            <Badge key={capability} variant="outline" className="text-xs">
                              {capability}
                            </Badge>
                          ))}
                          {system.capabilities.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{system.capabilities.length - 3} more
                            </Badge>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <span className="text-gray-400">Last Activation:</span>
                        <span>{new Date(system.last_activation).toLocaleString()}</span>
                      </div>

                      <div className="flex gap-2">
                        <Button 
                          className={`flex-1 ${
                            system.status === 'active' 
                              ? 'bg-yellow-600 hover:bg-yellow-700' 
                              : 'bg-green-600 hover:bg-green-700'
                          }`}
                          onClick={() => handleToggleSystem(system.id)}
                          disabled={loading || system.status === 'maintenance'}
                        >
                          {system.status === 'active' ? 'Deactivate' : 'Activate'}
                        </Button>
                        {system.upgrade_available && (
                          <Button 
                            variant="outline"
                            onClick={() => handleUpgradeSystem(system.id)}
                            disabled={loading}
                          >
                            <Zap className="w-4 h-4" />
                          </Button>
                        )}
                      </div>

                      {system.autonomous && (
                        <div className="bg-green-900/20 border border-green-500/30 rounded p-2">
                          <div className="flex items-center gap-2 text-xs">
                            <Brain className="w-4 h-4 text-green-400" />
                            <span className="text-green-400">Autonomous Mode Active</span>
                          </div>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="threat-alerts" className="space-y-6">
            <div className="space-y-4">
              {threatAlerts.map((alert) => {
                const ThreatIcon = getThreatIcon(alert.type);
                
                return (
                  <Card key={alert.id} className="bg-gray-800 border-gray-700">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="flex items-center gap-2">
                          <ThreatIcon className="w-5 h-5 text-red-400" />
                          {alert.type.replace('_', ' ').toUpperCase()}
                        </CardTitle>
                        <div className="flex items-center gap-2">
                          <Badge className={getSeverityColor(alert.severity)}>
                            {alert.severity}
                          </Badge>
                          <Badge variant="outline">
                            {alert.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-sm text-gray-400">
                        {new Date(alert.timestamp).toLocaleString()}
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-gray-300">{alert.description}</p>

                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <h4 className="font-semibold mb-2">Threat Details</h4>
                          <div className="space-y-1 text-sm">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Source:</span>
                              <span>{alert.source}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Target:</span>
                              <span>{alert.target}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Status:</span>
                              <span className="capitalize">{alert.status}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Impact Assessment</h4>
                          <div className="space-y-2">
                            <div>
                              <div className="flex justify-between text-sm">
                                <span>Data Risk</span>
                                <span>{alert.impact_assessment.data_risk}%</span>
                              </div>
                              <Progress value={alert.impact_assessment.data_risk} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm">
                                <span>System Risk</span>
                                <span>{alert.impact_assessment.system_risk}%</span>
                              </div>
                              <Progress value={alert.impact_assessment.system_risk} className="h-2" />
                            </div>
                            <div>
                              <div className="flex justify-between text-sm">
                                <span>User Risk</span>
                                <span>{alert.impact_assessment.user_risk}%</span>
                              </div>
                              <Progress value={alert.impact_assessment.user_risk} className="h-2" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div>
                        <h4 className="font-semibold mb-2">Defense Response</h4>
                        <div className="space-y-1">
                          {alert.defense_response.map((response, index) => (
                            <div key={index} className="flex items-start gap-2 text-sm">
                              <CheckCircle className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-300">{response}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          <TabsContent value="attack-patterns" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {attackPatterns.map((pattern) => (
                <Card key={pattern.id} className="bg-gray-800 border-gray-700">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Radar className="w-5 h-5 text-orange-400" />
                      {pattern.name}
                    </CardTitle>
                    <div className="text-sm text-gray-400">
                      Last detected: {new Date(pattern.last_detected).toLocaleString()}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <span className="text-gray-400 text-sm">Detection Frequency</span>
                        <div className="font-semibold text-yellow-400">{pattern.frequency} times/month</div>
                      </div>
                      <div>
                        <span className="text-gray-400 text-sm">Success Rate</span>
                        <div className="font-semibold text-red-400">{pattern.success_rate}%</div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Threat Intelligence</h4>
                      <div className="space-y-2 text-sm">
                        <div>
                          <span className="text-gray-400">Origin Countries:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {pattern.threat_intelligence.origin_countries.map(country => (
                              <Badge key={country} variant="outline" className="text-xs">
                                {country}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400">Common Targets:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {pattern.threat_intelligence.common_targets.map(target => (
                              <Badge key={target} variant="secondary" className="text-xs">
                                {target}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <span className="text-gray-400">Typical Payload:</span>
                          <div className="text-gray-300 mt-1">{pattern.threat_intelligence.typical_payload}</div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Active Countermeasures</h4>
                      <div className="space-y-1">
                        {pattern.countermeasures.map((measure, index) => (
                          <div key={index} className="flex items-start gap-2 text-sm">
                            <Shield className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-300">{measure}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="control-center" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Master Defense Control</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <Button className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Activate All
                    </Button>
                    <Button className="bg-yellow-600 hover:bg-yellow-700">
                      <Clock className="w-4 h-4 mr-2" />
                      Standby All
                    </Button>
                    <Button className="bg-red-600 hover:bg-red-700">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Emergency Lock
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Settings className="w-4 h-4 mr-2" />
                      Maintenance
                    </Button>
                  </div>

                  <div className="bg-gray-700 p-4 rounded-lg">
                    <h4 className="font-semibold mb-2">System Health</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>CPU Usage</span>
                        <span>67%</span>
                      </div>
                      <Progress value={67} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>Memory Usage</span>
                        <span>45%</span>
                      </div>
                      <Progress value={45} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>Network Load</span>
                        <span>82%</span>
                      </div>
                      <Progress value={82} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gray-800 border-gray-700">
                <CardHeader>
                  <CardTitle>Global Defense Network</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <Globe className="w-8 h-8 mx-auto mb-2 text-green-400" />
                      <div className="text-2xl font-bold text-green-400">12</div>
                      <div className="text-sm text-gray-400">Global Nodes</div>
                    </div>
                    <div>
                      <Network className="w-8 h-8 mx-auto mb-2 text-blue-400" />
                      <div className="text-2xl font-bold text-blue-400">99.9%</div>
                      <div className="text-sm text-gray-400">Uptime</div>
                    </div>
                    <div>
                      <Wifi className="w-8 h-8 mx-auto mb-2 text-yellow-400" />
                      <div className="text-2xl font-bold text-yellow-400">5.2TB</div>
                      <div className="text-sm text-gray-400">Data Analyzed</div>
                    </div>
                    <div>
                      <Server className="w-8 h-8 mx-auto mb-2 text-purple-400" />
                      <div className="text-2xl font-bold text-purple-400">156K</div>
                      <div className="text-sm text-gray-400">Threats Blocked</div>
                    </div>
                  </div>

                  <Button className="w-full bg-purple-600 hover:bg-purple-700">
                    <Eye className="w-4 h-4 mr-2" />
                    View Global Map
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DefenseAttackMechanisms;