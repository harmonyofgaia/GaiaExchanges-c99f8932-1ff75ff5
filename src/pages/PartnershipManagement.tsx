import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Users, 
  Building, 
  Globe, 
  Handshake, 
  Award,
  TrendingUp,
  MapPin,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Mail,
  Phone,
  ExternalLink,
  FileText,
  Target,
  Zap,
  Shield,
  Leaf,
  Heart,
  Settings,
  Plus,
  Search,
  Filter
} from "lucide-react";

interface Partner {
  id: string;
  name: string;
  type: 'government' | 'ngo' | 'tech' | 'academic' | 'financial';
  region: string;
  status: 'active' | 'pending' | 'negotiating' | 'inactive';
  partnership_level: 'strategic' | 'operational' | 'support';
  start_date: string;
  contract_value: number;
  projects: number;
  contact: {
    name: string;
    title: string;
    email: string;
    phone: string;
    avatar: string;
  };
  capabilities: string[];
  current_projects: string[];
  performance_score: number;
}

interface Partnership {
  id: string;
  title: string;
  description: string;
  partners: string[];
  status: 'planning' | 'active' | 'completed' | 'paused';
  start_date: string;
  end_date: string;
  budget: number;
  progress: number;
  deliverables: string[];
  metrics: {
    fires_prevented: number;
    area_protected: number;
    communities_served: number;
    systems_deployed: number;
  };
}

interface Initiative {
  id: string;
  title: string;
  description: string;
  type: 'research' | 'deployment' | 'training' | 'integration';
  lead_partner: string;
  participating_partners: string[];
  funding_required: number;
  funding_secured: number;
  timeline: string;
  status: 'proposal' | 'approved' | 'active' | 'completed';
  expected_impact: string;
}

const PartnershipManagement = () => {
  const [selectedPartner, setSelectedPartner] = useState<Partner | null>(null);
  const [filterType, setFilterType] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');

  const partners: Partner[] = useMemo(() => [
    {
      id: 'usfs-001',
      name: 'US Forest Service',
      type: 'government',
      region: 'North America',
      status: 'active',
      partnership_level: 'strategic',
      start_date: '2024-01-15',
      contract_value: 15000000,
      projects: 12,
      contact: {
        name: 'Dr. Jennifer Rodriguez',
        title: 'Director of Fire Prevention',
        email: 'j.rodriguez@usfs.gov',
        phone: '+1-555-0123',
        avatar: '/avatars/jennifer.jpg'
      },
      capabilities: ['Fire Management', 'Emergency Response', 'Land Management', 'Policy Development'],
      current_projects: ['California Pilot Program', 'Oregon Sensor Network', 'Training Initiative'],
      performance_score: 94
    },
    {
      id: 'wwf-001',
      name: 'World Wildlife Fund',
      type: 'ngo',
      region: 'Global',
      status: 'active',
      partnership_level: 'strategic',
      start_date: '2024-02-01',
      contract_value: 8500000,
      projects: 8,
      contact: {
        name: 'Sarah Thompson',
        title: 'Senior Conservation Director',
        email: 's.thompson@wwf.org',
        phone: '+1-555-0456',
        avatar: '/avatars/sarah-wwf.jpg'
      },
      capabilities: ['Conservation', 'Community Engagement', 'Impact Assessment', 'Global Networks'],
      current_projects: ['Biodiversity Monitoring', 'Community Training', 'Impact Verification'],
      performance_score: 92
    },
    {
      id: 'mit-001',
      name: 'MIT Environmental Lab',
      type: 'academic',
      region: 'North America',
      status: 'active',
      partnership_level: 'operational',
      start_date: '2024-03-10',
      contract_value: 3200000,
      projects: 5,
      contact: {
        name: 'Prof. Michael Chen',
        title: 'Director of Environmental Systems',
        email: 'm.chen@mit.edu',
        phone: '+1-555-0789',
        avatar: '/avatars/michael-mit.jpg'
      },
      capabilities: ['AI Research', 'Environmental Modeling', 'Sensor Development', 'Data Analytics'],
      current_projects: ['AI Algorithm Optimization', 'Sensor Accuracy Study', 'Environmental Modeling'],
      performance_score: 96
    },
    {
      id: 'spacex-001',
      name: 'SpaceX Starlink',
      type: 'tech',
      region: 'Global',
      status: 'negotiating',
      partnership_level: 'operational',
      start_date: '2024-06-01',
      contract_value: 12000000,
      projects: 0,
      contact: {
        name: 'Alex Kumar',
        title: 'Director of Earth Applications',
        email: 'a.kumar@spacex.com',
        phone: '+1-555-0321',
        avatar: '/avatars/alex-spacex.jpg'
      },
      capabilities: ['Satellite Communication', 'Global Coverage', 'Low Latency', 'IoT Connectivity'],
      current_projects: [],
      performance_score: 0
    },
    {
      id: 'green-fund-001',
      name: 'Green Climate Fund',
      type: 'financial',
      region: 'Global',
      status: 'pending',
      partnership_level: 'support',
      start_date: '2024-08-01',
      contract_value: 25000000,
      projects: 0,
      contact: {
        name: 'Dr. Elena Vasquez',
        title: 'Senior Investment Officer',
        email: 'e.vasquez@gcfund.org',
        phone: '+1-555-0654',
        avatar: '/avatars/elena-gcf.jpg'
      },
      capabilities: ['Climate Finance', 'Impact Investment', 'Grant Management', 'Global Partnerships'],
      current_projects: [],
      performance_score: 0
    }
  ], []);

  const partnerships: Partnership[] = [
    {
      id: 'ca-pilot',
      title: 'California Wildfire Defense Pilot',
      description: 'Comprehensive pilot program deploying 50 sand cannons across high-risk areas in Northern California',
      partners: ['US Forest Service', 'California Fire Department', 'UC Berkeley'],
      status: 'active',
      start_date: '2024-04-01',
      end_date: '2024-12-31',
      budget: 5000000,
      progress: 67,
      deliverables: ['50 Sand Cannons Deployed', 'IoT Network Established', 'Training Program', 'Impact Report'],
      metrics: {
        fires_prevented: 12,
        area_protected: 50000,
        communities_served: 15,
        systems_deployed: 32
      }
    },
    {
      id: 'global-research',
      title: 'Global Forest Defense Research Initiative',
      description: 'Multi-institutional research program to advance wildfire prevention technologies',
      partners: ['MIT Environmental Lab', 'Stanford Woods Institute', 'Oxford Environmental Change Institute'],
      status: 'active',
      start_date: '2024-01-01',
      end_date: '2025-12-31',
      budget: 8000000,
      progress: 45,
      deliverables: ['AI Model Enhancement', 'Sensor Technology', 'Environmental Impact Study', 'Best Practices Guide'],
      metrics: {
        fires_prevented: 0,
        area_protected: 0,
        communities_served: 0,
        systems_deployed: 0
      }
    }
  ];

  const initiatives: Initiative[] = [
    {
      id: 'satellite-integration',
      title: 'Global Satellite Communication Network',
      description: 'Integration with SpaceX Starlink for global coverage and real-time communication',
      type: 'integration',
      lead_partner: 'SpaceX Starlink',
      participating_partners: ['US Forest Service', 'European Space Agency'],
      funding_required: 15000000,
      funding_secured: 8000000,
      timeline: '18 months',
      status: 'proposal',
      expected_impact: 'Global coverage with <1 second communication latency'
    },
    {
      id: 'community-expansion',
      title: 'Community Training Expansion Program',
      description: 'Scale community training programs to 100 locations worldwide',
      type: 'training',
      lead_partner: 'World Wildlife Fund',
      participating_partners: ['Local NGOs', 'Government Agencies', 'Educational Institutions'],
      funding_required: 12000000,
      funding_secured: 12000000,
      timeline: '24 months',
      status: 'approved',
      expected_impact: '10,000 certified local responders across 100 communities'
    }
  ];

  const getPartnerTypeIcon = (type: string) => {
    switch (type) {
      case 'government': return Building;
      case 'ngo': return Heart;
      case 'tech': return Zap;
      case 'academic': return Award;
      case 'financial': return TrendingUp;
      default: return Users;
    }
  };

  const getPartnerTypeColor = (type: string) => {
    switch (type) {
      case 'government': return 'text-blue-600';
      case 'ngo': return 'text-green-600';
      case 'tech': return 'text-purple-600';
      case 'academic': return 'text-yellow-600';
      case 'financial': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'negotiating': return 'bg-blue-100 text-blue-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'strategic': return 'bg-purple-100 text-purple-800';
      case 'operational': return 'bg-blue-100 text-blue-800';
      case 'support': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredPartners = useMemo(() => {
    return partners.filter(partner => {
      const matchesType = filterType === 'all' || partner.type === filterType;
      const matchesSearch = partner.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           partner.region.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesType && matchesSearch;
    });
  }, [partners, filterType, searchTerm]);

  const totalContractValue = partners.reduce((sum, partner) => sum + partner.contract_value, 0);
  const activePartners = partners.filter(p => p.status === 'active').length;
  const totalProjects = partners.reduce((sum, partner) => sum + partner.projects, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Handshake className="h-10 w-10 text-blue-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Partnership Management</h1>
                <p className="text-lg text-gray-600">NGO, agency, and tech firm collaboration platform</p>
              </div>
            </div>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Partnership
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Users className="h-8 w-8 text-blue-600" />
                <Badge variant="outline">Partners</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{activePartners}</div>
              <div className="text-sm text-gray-600">Active Partners</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <TrendingUp className="h-8 w-8 text-green-600" />
                <Badge variant="outline">Value</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                ${(totalContractValue / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-gray-600">Total Contract Value</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Target className="h-8 w-8 text-purple-600" />
                <Badge variant="outline">Projects</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{totalProjects}</div>
              <div className="text-sm text-gray-600">Active Projects</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Globe className="h-8 w-8 text-yellow-600" />
                <Badge variant="outline">Coverage</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">12</div>
              <div className="text-sm text-gray-600">Countries/Regions</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="partners" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="partners">Partners</TabsTrigger>
            <TabsTrigger value="partnerships">Partnerships</TabsTrigger>
            <TabsTrigger value="initiatives">Initiatives</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          {/* Partners Tab */}
          <TabsContent value="partners" className="space-y-6">
            {/* Filters and Search */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-500" />
                  <Input
                    placeholder="Search partners..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="h-4 w-4 text-gray-500" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="border rounded px-3 py-2 text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="government">Government</option>
                    <option value="ngo">NGO</option>
                    <option value="tech">Technology</option>
                    <option value="academic">Academic</option>
                    <option value="financial">Financial</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Partner Directory</CardTitle>
                    <CardDescription>
                      Manage relationships with key partners across sectors
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {filteredPartners.map((partner) => {
                        const TypeIcon = getPartnerTypeIcon(partner.type);
                        return (
                          <div 
                            key={partner.id}
                            className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                              selectedPartner?.id === partner.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => setSelectedPartner(partner)}
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-3">
                                <TypeIcon className={`h-8 w-8 ${getPartnerTypeColor(partner.type)}`} />
                                <div>
                                  <h3 className="font-semibold text-lg">{partner.name}</h3>
                                  <div className="flex items-center text-sm text-gray-600">
                                    <MapPin className="h-4 w-4 mr-1" />
                                    {partner.region}
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center space-x-2">
                                <Badge className={getStatusColor(partner.status)}>
                                  {partner.status}
                                </Badge>
                                <Badge className={getLevelColor(partner.partnership_level)}>
                                  {partner.partnership_level}
                                </Badge>
                              </div>
                            </div>

                            <div className="grid grid-cols-4 gap-4 text-sm">
                              <div>
                                <div className="text-gray-600">Contract Value</div>
                                <div className="font-semibold">
                                  ${(partner.contract_value / 1000000).toFixed(1)}M
                                </div>
                              </div>
                              <div>
                                <div className="text-gray-600">Projects</div>
                                <div className="font-semibold">{partner.projects}</div>
                              </div>
                              <div>
                                <div className="text-gray-600">Performance</div>
                                <div className="font-semibold text-green-600">
                                  {partner.performance_score || 'N/A'}
                                  {partner.performance_score && '/100'}
                                </div>
                              </div>
                              <div>
                                <div className="text-gray-600">Since</div>
                                <div className="font-semibold">
                                  {new Date(partner.start_date).getFullYear()}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-3 pt-3 border-t">
                              <div className="flex items-center space-x-2">
                                <Avatar className="h-8 w-8">
                                  <AvatarImage src={partner.contact.avatar} />
                                  <AvatarFallback>
                                    {partner.contact.name.split(' ').map(n => n[0]).join('')}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="text-sm">
                                  <div className="font-semibold">{partner.contact.name}</div>
                                  <div className="text-gray-600">{partner.contact.title}</div>
                                </div>
                              </div>
                              <div className="flex space-x-2">
                                <Button size="sm" variant="outline">
                                  <Mail className="h-4 w-4" />
                                </Button>
                                <Button size="sm" variant="outline">
                                  <Phone className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div>
                {selectedPartner && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Partner Details</CardTitle>
                      <CardDescription>{selectedPartner.name}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Contact Information</h4>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center space-x-2">
                              <Mail className="h-4 w-4 text-gray-500" />
                              <a href={`mailto:${selectedPartner.contact.email}`} className="text-blue-600 hover:underline">
                                {selectedPartner.contact.email}
                              </a>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Phone className="h-4 w-4 text-gray-500" />
                              <span>{selectedPartner.contact.phone}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Capabilities</h4>
                          <div className="flex flex-wrap gap-2">
                            {selectedPartner.capabilities.map((capability, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {capability}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Current Projects</h4>
                          <div className="space-y-1 text-sm">
                            {selectedPartner.current_projects.length > 0 ? (
                              selectedPartner.current_projects.map((project, index) => (
                                <div key={index} className="flex items-center space-x-2">
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                  <span>{project}</span>
                                </div>
                              ))
                            ) : (
                              <div className="text-gray-500">No active projects</div>
                            )}
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <Button className="flex-1" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            View Profile
                          </Button>
                          <Button variant="outline" size="sm">
                            <Settings className="h-4 w-4 mr-2" />
                            Manage
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </TabsContent>

          {/* Partnerships Tab */}
          <TabsContent value="partnerships" className="space-y-6">
            <div className="space-y-6">
              {partnerships.map((partnership) => (
                <Card key={partnership.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Handshake className="h-5 w-5 text-blue-600" />
                          <span>{partnership.title}</span>
                        </CardTitle>
                        <CardDescription>{partnership.description}</CardDescription>
                      </div>
                      <Badge className={getStatusColor(partnership.status)}>
                        {partnership.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Project Details</h4>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <div className="text-gray-600">Budget</div>
                              <div className="font-semibold">${(partnership.budget / 1000000).toFixed(1)}M</div>
                            </div>
                            <div>
                              <div className="text-gray-600">Duration</div>
                              <div className="font-semibold">
                                {new Date(partnership.start_date).getFullYear()} - {new Date(partnership.end_date).getFullYear()}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <h4 className="font-semibold">Progress</h4>
                            <span className="text-sm text-gray-600">{partnership.progress}%</span>
                          </div>
                          <Progress value={partnership.progress} className="h-2" />
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Partners</h4>
                          <div className="flex flex-wrap gap-2">
                            {partnership.partners.map((partner, index) => (
                              <Badge key={index} variant="outline">
                                {partner}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Impact Metrics</h4>
                          <div className="grid grid-cols-2 gap-3 text-sm">
                            <div className="flex items-center justify-between">
                              <span>Fires Prevented:</span>
                              <span className="font-semibold">{partnership.metrics.fires_prevented}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Area Protected:</span>
                              <span className="font-semibold">{partnership.metrics.area_protected.toLocaleString()} ha</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Communities:</span>
                              <span className="font-semibold">{partnership.metrics.communities_served}</span>
                            </div>
                            <div className="flex items-center justify-between">
                              <span>Systems Deployed:</span>
                              <span className="font-semibold">{partnership.metrics.systems_deployed}</span>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Deliverables</h4>
                          <div className="space-y-1">
                            {partnership.deliverables.map((deliverable, index) => (
                              <div key={index} className="flex items-center space-x-2 text-sm">
                                <CheckCircle className="h-4 w-4 text-green-500" />
                                <span>{deliverable}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex space-x-2 mt-4 pt-4 border-t">
                      <Button>
                        <FileText className="h-4 w-4 mr-2" />
                        View Report
                      </Button>
                      <Button variant="outline">
                        <Settings className="h-4 w-4 mr-2" />
                        Manage
                      </Button>
                      <Button variant="outline">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Initiatives Tab */}
          <TabsContent value="initiatives" className="space-y-6">
            <div className="space-y-6">
              {initiatives.map((initiative) => (
                <Card key={initiative.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Target className="h-5 w-5 text-purple-600" />
                          <span>{initiative.title}</span>
                        </CardTitle>
                        <CardDescription>{initiative.description}</CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getStatusColor(initiative.status)}>
                          {initiative.status.toUpperCase()}
                        </Badge>
                        <Badge variant="outline" className="capitalize">
                          {initiative.type}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-gray-600">Lead Partner</div>
                            <div className="font-semibold">{initiative.lead_partner}</div>
                          </div>
                          <div>
                            <div className="text-gray-600">Timeline</div>
                            <div className="font-semibold">{initiative.timeline}</div>
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Funding Status</h4>
                          <div className="space-y-2">
                            <div className="flex justify-between text-sm">
                              <span>Required: ${(initiative.funding_required / 1000000).toFixed(1)}M</span>
                              <span>Secured: ${(initiative.funding_secured / 1000000).toFixed(1)}M</span>
                            </div>
                            <Progress 
                              value={(initiative.funding_secured / initiative.funding_required) * 100} 
                              className="h-2" 
                            />
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold mb-2">Participating Partners</h4>
                          <div className="flex flex-wrap gap-2">
                            {initiative.participating_partners.map((partner, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {partner}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Expected Impact</h4>
                          <p className="text-sm text-gray-700">{initiative.expected_impact}</p>
                        </div>

                        <div className="flex space-x-2">
                          <Button className="flex-1">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button variant="outline">
                            <FileText className="h-4 w-4 mr-2" />
                            Proposal
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Average Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">
                    {Math.round(partners.filter(p => p.performance_score > 0).reduce((sum, p) => sum + p.performance_score, 0) / partners.filter(p => p.performance_score > 0).length)}/100
                  </div>
                  <div className="text-sm text-gray-600">All Partners</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Response Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-blue-600">2.3 days</div>
                  <div className="text-sm text-gray-600">Average</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Project Success</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-green-600">94%</div>
                  <div className="text-sm text-gray-600">On-time Delivery</div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-yellow-600">4.7/5</div>
                  <div className="text-sm text-gray-600">Partner Rating</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Partner Performance Overview</CardTitle>
                <CardDescription>Performance metrics and evaluation scores</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {partners.filter(p => p.performance_score > 0).map((partner) => (
                    <div key={partner.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                          partner.performance_score >= 95 ? 'bg-green-500 text-white' :
                          partner.performance_score >= 90 ? 'bg-blue-500 text-white' :
                          partner.performance_score >= 80 ? 'bg-yellow-500 text-white' :
                          'bg-red-500 text-white'
                        }`}>
                          {partner.performance_score}
                        </div>
                        <div>
                          <div className="font-semibold">{partner.name}</div>
                          <div className="text-sm text-gray-600">{partner.projects} active projects</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">${(partner.contract_value / 1000000).toFixed(1)}M</div>
                        <div className="text-sm text-gray-600">contract value</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PartnershipManagement;