import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  BarChart3, 
  TrendingUp, 
  TreePine, 
  Droplets, 
  Shield, 
  Target,
  Leaf,
  Globe,
  Calendar,
  CheckCircle,
  AlertTriangle,
  Award,
  Satellite,
  Activity,
  PieChart,
  LineChart,
  MapPin,
  Clock,
  Users,
  Zap,
  Heart,
  Coins,
  Eye,
  FileText,
  Download,
  Share,
  RefreshCw
} from "lucide-react";

interface ImpactMetric {
  id: string;
  name: string;
  category: 'environmental' | 'social' | 'economic' | 'technical';
  current_value: number;
  target_value: number;
  unit: string;
  trend: 'increasing' | 'decreasing' | 'stable';
  change_percent: number;
  last_updated: string;
  verification_status: 'verified' | 'pending' | 'unverified';
  data_sources: string[];
}

interface CarbonCredit {
  id: string;
  project_name: string;
  area_protected: number;
  co2_sequestered: number;
  credits_issued: number;
  verification_standard: string;
  issue_date: string;
  status: 'active' | 'retired' | 'pending';
  price_per_credit: number;
  buyer: string;
}

interface VerificationRecord {
  id: string;
  metric: string;
  value: number;
  verification_method: 'satellite' | 'ground_sensor' | 'third_party' | 'community';
  verifier: string;
  confidence_level: number;
  timestamp: string;
  evidence_links: string[];
  blockchain_hash: string;
}

interface SDGAlignment {
  goal_number: number;
  goal_title: string;
  alignment_score: number;
  target_indicators: string[];
  contribution_description: string;
  progress_toward_target: number;
}

const ImpactMeasurementSystem = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('monthly');
  const [refreshing, setRefreshing] = useState(false);

  const impactMetrics: ImpactMetric[] = [
    {
      id: 'fires-prevented',
      name: 'Wildfires Prevented',
      category: 'environmental',
      current_value: 247,
      target_value: 1000,
      unit: 'fires',
      trend: 'increasing',
      change_percent: 23.5,
      last_updated: '2024-12-15T10:30:00Z',
      verification_status: 'verified',
      data_sources: ['Satellite Data', 'Sand Cannon Logs', 'Fire Department Reports']
    },
    {
      id: 'area-protected',
      name: 'Forest Area Protected',
      category: 'environmental',
      current_value: 125000,
      target_value: 10000000,
      unit: 'hectares',
      trend: 'increasing',
      change_percent: 45.2,
      last_updated: '2024-12-15T09:15:00Z',
      verification_status: 'verified',
      data_sources: ['Satellite Imagery', 'GPS Mapping', 'Government Land Registry']
    },
    {
      id: 'co2-preserved',
      name: 'CO₂ Absorption Preserved',
      category: 'environmental',
      current_value: 2500000,
      target_value: 500000000,
      unit: 'tons/year',
      trend: 'increasing',
      change_percent: 12.8,
      last_updated: '2024-12-15T08:45:00Z',
      verification_status: 'verified',
      data_sources: ['Environmental Models', 'Forest Biomass Data', 'Carbon Calculation Standards']
    },
    {
      id: 'communities-served',
      name: 'Communities Protected',
      category: 'social',
      current_value: 89,
      target_value: 1000,
      unit: 'communities',
      trend: 'increasing',
      change_percent: 34.6,
      last_updated: '2024-12-14T16:20:00Z',
      verification_status: 'verified',
      data_sources: ['Community Registration', 'Census Data', 'Local Authority Records']
    },
    {
      id: 'jobs-created',
      name: 'Jobs Created',
      category: 'economic',
      current_value: 2340,
      target_value: 50000,
      unit: 'jobs',
      trend: 'increasing',
      change_percent: 18.7,
      last_updated: '2024-12-14T14:10:00Z',
      verification_status: 'verified',
      data_sources: ['Employment Records', 'Training Certificates', 'Payroll Data']
    },
    {
      id: 'response-time',
      name: 'Average Response Time',
      category: 'technical',
      current_value: 24,
      target_value: 30,
      unit: 'seconds',
      trend: 'decreasing',
      change_percent: -8.3,
      last_updated: '2024-12-15T11:45:00Z',
      verification_status: 'verified',
      data_sources: ['System Logs', 'Sand Cannon Telemetry', 'Performance Monitoring']
    }
  ];

  const carbonCredits: CarbonCredit[] = [
    {
      id: 'cc-001',
      project_name: 'California Redwood Protection',
      area_protected: 15000,
      co2_sequestered: 450000,
      credits_issued: 450000,
      verification_standard: 'Verra VCS',
      issue_date: '2024-11-15',
      status: 'active',
      price_per_credit: 25.50,
      buyer: 'Microsoft Corp'
    },
    {
      id: 'cc-002',
      project_name: 'Oregon Forest Shield Initiative',
      area_protected: 8500,
      co2_sequestered: 255000,
      credits_issued: 255000,
      verification_standard: 'Gold Standard',
      issue_date: '2024-10-20',
      status: 'retired',
      price_per_credit: 28.00,
      buyer: 'Amazon Inc'
    },
    {
      id: 'cc-003',
      project_name: 'Washington State Pilot',
      area_protected: 12000,
      co2_sequestered: 360000,
      credits_issued: 0,
      verification_standard: 'ISO 14064',
      issue_date: '2024-12-01',
      status: 'pending',
      price_per_credit: 0,
      buyer: 'Pending'
    }
  ];

  const verificationRecords: VerificationRecord[] = [
    {
      id: 'vr-001',
      metric: 'Forest Area Protected',
      value: 125000,
      verification_method: 'satellite',
      verifier: 'NASA Earth Observation',
      confidence_level: 98.5,
      timestamp: '2024-12-15T09:15:00Z',
      evidence_links: ['satellite-imagery-001.jpg', 'analysis-report-001.pdf'],
      blockchain_hash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef12'
    },
    {
      id: 'vr-002',
      metric: 'Wildfires Prevented',
      value: 247,
      verification_method: 'ground_sensor',
      verifier: 'Forest Defense Network',
      confidence_level: 96.2,
      timestamp: '2024-12-15T10:30:00Z',
      evidence_links: ['sensor-data-247.json', 'incident-reports.pdf'],
      blockchain_hash: '0x2b3c4d5e6f7890ab1234567890abcdef1234567890'
    },
    {
      id: 'vr-003',
      metric: 'Community Impact',
      value: 89,
      verification_method: 'third_party',
      verifier: 'Independent Impact Assessors',
      confidence_level: 94.8,
      timestamp: '2024-12-14T16:20:00Z',
      evidence_links: ['community-survey-results.pdf', 'field-assessment.docx'],
      blockchain_hash: '0x3c4d5e6f7890ab12567890abcdef1234567890abcd'
    }
  ];

  const sdgAlignments: SDGAlignment[] = [
    {
      goal_number: 13,
      goal_title: 'Climate Action',
      alignment_score: 95,
      target_indicators: ['13.1.1', '13.2.1', '13.3.1'],
      contribution_description: 'Directly contributes to climate change mitigation through forest protection and fire prevention',
      progress_toward_target: 78
    },
    {
      goal_number: 15,
      goal_title: 'Life on Land',
      alignment_score: 92,
      target_indicators: ['15.1.1', '15.2.1', '15.4.1'],
      contribution_description: 'Protects terrestrial ecosystems and prevents biodiversity loss through wildfire prevention',
      progress_toward_target: 65
    },
    {
      goal_number: 8,
      goal_title: 'Decent Work and Economic Growth',
      alignment_score: 85,
      target_indicators: ['8.3.1', '8.5.1', '8.6.1'],
      contribution_description: 'Creates sustainable employment opportunities in environmental protection sector',
      progress_toward_target: 45
    },
    {
      goal_number: 11,
      goal_title: 'Sustainable Cities and Communities',
      alignment_score: 80,
      target_indicators: ['11.4.1', '11.5.1', '11.b.1'],
      contribution_description: 'Enhances community resilience against natural disasters and environmental threats',
      progress_toward_target: 52
    }
  ];

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'environmental': return TreePine;
      case 'social': return Users;
      case 'economic': return Coins;
      case 'technical': return Zap;
      default: return BarChart3;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'environmental': return 'text-green-600';
      case 'social': return 'text-blue-600';
      case 'economic': return 'text-yellow-600';
      case 'technical': return 'text-purple-600';
      default: return 'text-gray-600';
    }
  };

  const getVerificationIcon = (method: string) => {
    switch (method) {
      case 'satellite': return Satellite;
      case 'ground_sensor': return Activity;
      case 'third_party': return Award;
      case 'community': return Users;
      default: return CheckCircle;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'unverified': return 'bg-red-100 text-red-800';
      case 'active': return 'bg-blue-100 text-blue-800';
      case 'retired': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'decreasing': return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />;
      case 'stable': return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
      default: return null;
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate data refresh
    await new Promise(resolve => setTimeout(resolve, 2000));
    setRefreshing(false);
  };

  const totalCarbonCredits = useMemo(() => 
    carbonCredits.reduce((sum, credit) => sum + credit.credits_issued, 0), 
    [carbonCredits]
  );
  const totalCreditValue = useMemo(() => 
    carbonCredits.reduce((sum, credit) => sum + (credit.credits_issued * credit.price_per_credit), 0), 
    [carbonCredits]
  );
  const avgVerificationConfidence = useMemo(() => 
    verificationRecords.reduce((sum, record) => sum + record.confidence_level, 0) / verificationRecords.length, 
    [verificationRecords]
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <BarChart3 className="h-10 w-10 text-green-600 mr-3" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Impact Measurement System</h1>
                <p className="text-lg text-gray-600">Environmental impact tracking and verification platform</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">Period:</span>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="border rounded px-3 py-2 text-sm"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="monthly">Monthly</option>
                  <option value="yearly">Yearly</option>
                </select>
              </div>
              <Button onClick={handleRefresh} disabled={refreshing}>
                <RefreshCw className={`h-4 w-4 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
                Refresh Data
              </Button>
            </div>
          </div>
        </div>

        {/* Key Metrics Dashboard */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <CheckCircle className="h-8 w-8 text-green-600" />
                <Badge variant="outline">Verified</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {impactMetrics.filter(m => m.verification_status === 'verified').length}
              </div>
              <div className="text-sm text-gray-600">Verified Metrics</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Leaf className="h-8 w-8 text-green-600" />
                <Badge variant="outline">Credits</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {(totalCarbonCredits / 1000).toFixed(0)}K
              </div>
              <div className="text-sm text-gray-600">Carbon Credits</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <TrendingUp className="h-8 w-8 text-blue-600" />
                <Badge variant="outline">Confidence</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {avgVerificationConfidence.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Avg Confidence</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <div className="flex items-center justify-between">
                <Coins className="h-8 w-8 text-yellow-600" />
                <Badge variant="outline">Value</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                ${(totalCreditValue / 1000000).toFixed(1)}M
              </div>
              <div className="text-sm text-gray-600">Credit Value</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Tabs */}
        <Tabs defaultValue="metrics" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="metrics">Impact Metrics</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
            <TabsTrigger value="carbon">Carbon Credits</TabsTrigger>
            <TabsTrigger value="sdg">SDG Alignment</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          {/* Impact Metrics Tab */}
          <TabsContent value="metrics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {impactMetrics.map((metric) => {
                const CategoryIcon = getCategoryIcon(metric.category);
                const progressPercentage = (metric.current_value / metric.target_value) * 100;
                
                return (
                  <Card key={metric.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <CategoryIcon className={`h-6 w-6 ${getCategoryColor(metric.category)}`} />
                          <div>
                            <CardTitle className="text-lg">{metric.name}</CardTitle>
                            <CardDescription className="capitalize">{metric.category} Impact</CardDescription>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getTrendIcon(metric.trend)}
                          <Badge className={getStatusColor(metric.verification_status)}>
                            {metric.verification_status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="text-3xl font-bold text-gray-900">
                              {metric.current_value.toLocaleString()}
                            </div>
                            <div className="text-sm text-gray-600">
                              {metric.unit} / {metric.target_value.toLocaleString()} target
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-lg font-semibold ${
                              metric.change_percent > 0 ? 'text-green-600' : 
                              metric.change_percent < 0 ? 'text-red-600' : 'text-gray-600'
                            }`}>
                              {metric.change_percent > 0 ? '+' : ''}{metric.change_percent}%
                            </div>
                            <div className="text-xs text-gray-500">vs last period</div>
                          </div>
                        </div>

                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium">Progress to Target</span>
                            <span className="text-sm text-gray-600">{progressPercentage.toFixed(1)}%</span>
                          </div>
                          <Progress value={Math.min(progressPercentage, 100)} className="h-2" />
                        </div>

                        <div>
                          <h4 className="text-sm font-semibold mb-2">Data Sources</h4>
                          <div className="flex flex-wrap gap-1">
                            {metric.data_sources.map((source, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {source}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs text-gray-500">
                          <span>Last updated: {new Date(metric.last_updated).toLocaleString()}</span>
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </TabsContent>

          {/* Verification Tab */}
          <TabsContent value="verification" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Shield className="h-5 w-5 mr-2 text-blue-600" />
                  Verification Records
                </CardTitle>
                <CardDescription>
                  Blockchain-verified impact measurements with evidence trails
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {verificationRecords.map((record) => {
                    const MethodIcon = getVerificationIcon(record.verification_method);
                    return (
                      <div key={record.id} className="border-2 border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center space-x-3">
                            <MethodIcon className="h-6 w-6 text-blue-600" />
                            <div>
                              <h3 className="font-semibold">{record.metric}</h3>
                              <div className="text-sm text-gray-600">
                                Verified by {record.verifier}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-lg">{record.value.toLocaleString()}</div>
                            <div className="text-sm text-gray-600">
                              {record.confidence_level}% confidence
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-gray-600">Verification Method</div>
                            <div className="font-semibold capitalize">
                              {record.verification_method.replace('_', ' ')}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-600">Timestamp</div>
                            <div className="font-semibold">
                              {new Date(record.timestamp).toLocaleString()}
                            </div>
                          </div>
                          <div>
                            <div className="text-gray-600">Evidence Files</div>
                            <div className="font-semibold">{record.evidence_links.length} files</div>
                          </div>
                        </div>

                        <div className="mt-3 pt-3 border-t">
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-500 font-mono">
                              Blockchain: {record.blockchain_hash}
                            </div>
                            <div className="flex space-x-2">
                              <Button size="sm" variant="outline">
                                <FileText className="h-3 w-3 mr-1" />
                                Evidence
                              </Button>
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3 mr-1" />
                                Verify
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Carbon Credits Tab */}
          <TabsContent value="carbon" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {carbonCredits.map((credit) => (
                <Card key={credit.id}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <Leaf className="h-5 w-5 text-green-600" />
                          <span>{credit.project_name}</span>
                        </CardTitle>
                        <CardDescription>
                          {credit.verification_standard} Standard
                        </CardDescription>
                      </div>
                      <Badge className={getStatusColor(credit.status)}>
                        {credit.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <div className="text-gray-600">Area Protected</div>
                          <div className="font-semibold">
                            {credit.area_protected.toLocaleString()} hectares
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">CO₂ Sequestered</div>
                          <div className="font-semibold">
                            {credit.co2_sequestered.toLocaleString()} tons
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Credits Issued</div>
                          <div className="font-semibold">
                            {credit.credits_issued.toLocaleString()}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-600">Price per Credit</div>
                          <div className="font-semibold">
                            ${credit.price_per_credit.toFixed(2)}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-sm text-gray-600">Total Value</div>
                          <div className="text-lg font-bold text-green-600">
                            ${(credit.credits_issued * credit.price_per_credit).toLocaleString()}
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">Buyer</div>
                          <div className="font-semibold">{credit.buyer}</div>
                        </div>
                      </div>

                      <div className="text-xs text-gray-500">
                        Issue Date: {new Date(credit.issue_date).toLocaleDateString()}
                      </div>

                      <div className="flex space-x-2">
                        <Button size="sm" className="flex-1">
                          <FileText className="h-3 w-3 mr-1" />
                          Certificate
                        </Button>
                        <Button size="sm" variant="outline">
                          <Eye className="h-3 w-3 mr-1" />
                          Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Carbon Credit Summary</CardTitle>
                <CardDescription>
                  Overview of carbon credit generation and trading
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">
                      {(totalCarbonCredits / 1000).toFixed(0)}K
                    </div>
                    <div className="text-sm text-gray-600">Total Credits Issued</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600">
                      {carbonCredits.reduce((sum, c) => sum + c.area_protected, 0).toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600">Hectares Protected</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-yellow-600">
                      ${(totalCreditValue / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-gray-600">Total Credit Value</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">
                      {(carbonCredits.reduce((sum, c) => sum + c.co2_sequestered, 0) / 1000000).toFixed(1)}M
                    </div>
                    <div className="text-sm text-gray-600">Tons CO₂ Sequestered</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* SDG Alignment Tab */}
          <TabsContent value="sdg" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {sdgAlignments.map((sdg) => (
                <Card key={sdg.goal_number}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="flex items-center space-x-2">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                            {sdg.goal_number}
                          </div>
                          <span>SDG {sdg.goal_number}</span>
                        </CardTitle>
                        <CardDescription>{sdg.goal_title}</CardDescription>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-blue-600">
                          {sdg.alignment_score}%
                        </div>
                        <div className="text-xs text-gray-500">Alignment</div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <p className="text-sm text-gray-700">
                        {sdg.contribution_description}
                      </p>

                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Progress Toward Target</span>
                          <span className="text-sm text-gray-600">{sdg.progress_toward_target}%</span>
                        </div>
                        <Progress value={sdg.progress_toward_target} className="h-2" />
                      </div>

                      <div>
                        <h4 className="text-sm font-semibold mb-2">Target Indicators</h4>
                        <div className="flex flex-wrap gap-1">
                          {sdg.target_indicators.map((indicator, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {indicator}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Reports Tab */}
          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-600" />
                    Impact Reports
                  </CardTitle>
                  <CardDescription>
                    Comprehensive impact assessment reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { title: 'Q4 2024 Impact Assessment', date: '2024-12-15', type: 'Quarterly', size: '2.3 MB' },
                      { title: 'Annual Environmental Report 2024', date: '2024-12-01', type: 'Annual', size: '5.8 MB' },
                      { title: 'Carbon Credit Verification Report', date: '2024-11-20', type: 'Compliance', size: '1.4 MB' },
                      { title: 'Community Impact Study', date: '2024-11-15', type: 'Social', size: '3.2 MB' }
                    ].map((report, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="h-5 w-5 text-blue-600" />
                          <div>
                            <div className="font-semibold">{report.title}</div>
                            <div className="text-sm text-gray-600">
                              {report.type} • {report.date} • {report.size}
                            </div>
                          </div>
                        </div>
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline">
                            <Eye className="h-3 w-3 mr-1" />
                            View
                          </Button>
                          <Button size="sm" variant="outline">
                            <Download className="h-3 w-3 mr-1" />
                            Download
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Share className="h-5 w-5 mr-2 text-green-600" />
                    Export & Sharing
                  </CardTitle>
                  <CardDescription>
                    Export data and generate custom reports
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Export Options</h4>
                      <div className="grid grid-cols-2 gap-2">
                        <Button variant="outline" size="sm">
                          <FileText className="h-3 w-3 mr-1" />
                          PDF Report
                        </Button>
                        <Button variant="outline" size="sm">
                          <BarChart3 className="h-3 w-3 mr-1" />
                          Excel Data
                        </Button>
                        <Button variant="outline" size="sm">
                          <FileText className="h-3 w-3 mr-1" />
                          CSV Export
                        </Button>
                        <Button variant="outline" size="sm">
                          <Share className="h-3 w-3 mr-1" />
                          API Access
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Scheduled Reports</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Monthly Summary</span>
                          <Badge variant="outline">Active</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Quarterly Assessment</span>
                          <Badge variant="outline">Active</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span>Annual Report</span>
                          <Badge variant="outline">Pending</Badge>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Create Custom Report
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Data Transparency Dashboard</CardTitle>
                <CardDescription>
                  Real-time public dashboard for stakeholder transparency
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Globe className="h-16 w-16 text-blue-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Public Impact Dashboard</h3>
                  <p className="text-gray-600 mb-4">
                    Share real-time impact data with stakeholders and the public
                  </p>
                  <div className="flex justify-center space-x-4">
                    <Button>
                      <Eye className="h-4 w-4 mr-2" />
                      View Public Dashboard
                    </Button>
                    <Button variant="outline">
                      <Share className="h-4 w-4 mr-2" />
                      Share Link
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ImpactMeasurementSystem;