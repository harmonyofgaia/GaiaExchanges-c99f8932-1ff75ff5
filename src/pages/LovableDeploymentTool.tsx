/**
 * Lovable Deployment Tool Page
 * Main page for the deployment tool with dashboard and management interface
 */

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Rocket, 
  Users, 
  Shield, 
  BarChart3, 
  Settings, 
  Leaf,
  Activity,
  Globe,
  Code,
  CheckCircle
} from 'lucide-react';

// Import components from the module
import { DeploymentDashboard } from '@/modules/lovable-deployment-tool/components/DeploymentDashboard';
import { CommunityVoting } from '@/modules/lovable-deployment-tool/components/CommunityVoting';
import { SupabaseDiagnosticsWidget } from '@/modules/lovable-deployment-tool/components/SupabaseDiagnosticsWidget';

const LovableDeploymentTool: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const moduleFeatures = [
    {
      icon: <Shield className="h-5 w-5" />,
      title: "Additive-Only Guarantee",
      description: "Zero destructive changes during deployment"
    },
    {
      icon: <Globe className="h-5 w-5" />,
      title: "Multi-Platform Sync",
      description: "Deploy to Vercel, Netlify, Supabase, Lovable, Replit"
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Community Approval",
      description: "Democratic decision-making with expert validation"
    },
    {
      icon: <Activity className="h-5 w-5" />,
      title: "AI Risk Assessment",
      description: "Machine learning powered risk analysis"
    },
    {
      icon: <Code className="h-5 w-5" />,
      title: "Auto-Fix Engine",
      description: "Automated issue detection and resolution"
    },
    {
      icon: <Leaf className="h-5 w-5" />,
      title: "Environmental Impact",
      description: "Carbon footprint tracking and optimization"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <Rocket className="h-8 w-8 text-primary" />
          <h1 className="text-4xl font-bold tracking-tight">
            Lovable Deployment Tool
          </h1>
          <Badge className="bg-green-100 text-green-800">
            Master Plan v3
          </Badge>
        </div>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Revolutionary additive-only deployment tool with multi-platform sync, 
          community approval workflow, and comprehensive environmental impact tracking.
        </p>
      </div>

      {/* Feature Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {moduleFeatures.map((feature, index) => (
          <Card key={index} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                {feature.icon}
                {feature.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{feature.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Interface Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4">
          <TabsTrigger value="dashboard" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Dashboard
          </TabsTrigger>
          <TabsTrigger value="voting" className="flex items-center gap-2">
            <Users className="h-4 w-4" />
            Community Voting
          </TabsTrigger>
          <TabsTrigger value="diagnostics" className="flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Diagnostics
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="h-4 w-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="space-y-6">
          <DeploymentDashboard />
        </TabsContent>

        <TabsContent value="voting" className="space-y-6">
          <CommunityVoting deploymentId="deploy_example_001" />
        </TabsContent>

        <TabsContent value="diagnostics" className="space-y-6">
          <SupabaseDiagnosticsWidget 
            supabaseUrl="https://slheudxfcqqppyphyobq.supabase.co"
            supabaseApiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsaGV1ZHhmY3FxcHB5cGh5b2JxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTEwMjIyNjIsImV4cCI6MjA2NjU5ODI2Mn0.qPQ339weTKXapr6JgF_iLHSMtB-KOYi503WQf-QxUCE"
          />
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Deployment Configuration
              </CardTitle>
              <CardDescription>
                Configure deployment settings and platform integrations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Additive-Only Settings */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Additive-Only Policy</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Enforce Additive-Only</div>
                        <div className="text-sm text-muted-foreground">
                          Prevent any destructive changes
                        </div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">Auto-Rollback on Failure</div>
                        <div className="text-sm text-muted-foreground">
                          Automatic rollback if deployment fails
                        </div>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                </div>

                {/* Platform Integrations */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Platform Integrations</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {['Vercel', 'Netlify', 'Supabase', 'Lovable', 'Replit', 'GaiaExchanges'].map((platform) => (
                      <div key={platform} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <div className="font-medium">{platform}</div>
                          <div className="text-sm text-muted-foreground">
                            Connected & configured
                          </div>
                        </div>
                        <CheckCircle className="h-5 w-5 text-green-500" />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Community Settings */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Community Approval</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="font-medium">Voting Period</div>
                      <div className="text-sm text-muted-foreground">24 hours</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-medium">Quorum Requirement</div>
                      <div className="text-sm text-muted-foreground">51% participation</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-medium">Minimum Approvals</div>
                      <div className="text-sm text-muted-foreground">3 community votes</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-medium">Expert Review</div>
                      <div className="text-sm text-muted-foreground">Required for high-risk deployments</div>
                    </div>
                  </div>
                </div>

                {/* Environmental Impact */}
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold">Environmental Impact</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="font-medium">Carbon Footprint Tracking</div>
                      <div className="text-sm text-muted-foreground">Enabled</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-medium">Green Platform Priority</div>
                      <div className="text-sm text-muted-foreground">Prefer eco-friendly platforms</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-medium">Impact Threshold</div>
                      <div className="text-sm text-muted-foreground">50 carbon points maximum</div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="font-medium">Sustainability Metrics</div>
                      <div className="text-sm text-muted-foreground">Real-time monitoring enabled</div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Status Footer */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Additive-Only Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Community Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>Environment Friendly</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>AI Risk Assessed</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LovableDeploymentTool;
