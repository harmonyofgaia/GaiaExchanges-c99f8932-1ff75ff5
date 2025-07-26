import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { 
  Rocket, 
  CheckCircle, 
  AlertTriangle, 
  Server, 
  Globe, 
  Settings, 
  Activity,
  ExternalLink,
  Copy,
  RefreshCw
} from 'lucide-react';

const DeploymentStatus = () => {
  const [deploymentStatus, setDeploymentStatus] = useState('ready');
  const [lastCheck, setLastCheck] = useState(new Date());
  const [buildSize, setBuildSize] = useState('7.0MB');
  const [checks, setChecks] = useState({
    build: true,
    dependencies: true,
    security: true,
    performance: true,
    environment: true
  });

  const refreshStatus = () => {
    setLastCheck(new Date());
    // Simulate status refresh
    setTimeout(() => {
      setDeploymentStatus('ready');
    }, 1000);
  };

  const deploymentCommands = {
    vercel: 'npm run deploy:vercel',
    netlify: 'npm run deploy:netlify',
    githubPages: 'npm run deploy:github-pages',
    manual: './scripts/deploy.sh'
  };

  const environmentVars = [
    { key: 'VITE_SUPABASE_URL', required: true, description: 'Supabase project URL' },
    { key: 'VITE_SUPABASE_ANON_KEY', required: true, description: 'Supabase anonymous key' },
    { key: 'VITE_WS_TOKEN', required: false, description: 'WebSocket token for development' },
    { key: 'VITE_API_BASE_URL', required: false, description: 'Custom API base URL' },
    { key: 'VITE_ENABLE_ANALYTICS', required: false, description: 'Enable analytics' },
  ];

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2 flex items-center justify-center gap-3">
            <Rocket className="h-8 w-8 text-green-600" />
            Deployment Center
          </h1>
          <p className="text-gray-600">
            GaiaExchanges deployment status and management
          </p>
        </div>

        {/* Status Overview */}
        <Card className="mb-6">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                Deployment Status
              </CardTitle>
              <Button onClick={refreshStatus} variant="outline" size="sm">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="font-semibold">Ready to Deploy</h3>
                <Badge variant="outline" className="mt-1 bg-green-50 text-green-700">
                  All Systems Go
                </Badge>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Server className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="font-semibold">Build Size</h3>
                <p className="text-gray-600 mt-1">{buildSize}</p>
              </div>
              <div className="text-center">
                <div className="flex items-center justify-center mb-2">
                  <Globe className="h-8 w-8 text-purple-500" />
                </div>
                <h3 className="font-semibold">Last Check</h3>
                <p className="text-gray-600 mt-1 text-sm">
                  {lastCheck.toLocaleTimeString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Tabs defaultValue="quick-deploy" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="quick-deploy">Quick Deploy</TabsTrigger>
            <TabsTrigger value="environment">Environment</TabsTrigger>
            <TabsTrigger value="checks">Health Checks</TabsTrigger>
            <TabsTrigger value="guides">Guides</TabsTrigger>
          </TabsList>

          <TabsContent value="quick-deploy" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Quick Deployment Options</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {Object.entries(deploymentCommands).map(([platform, command]) => (
                  <div key={platform} className="flex items-center justify-between p-4 border rounded-lg">
                    <div>
                      <h3 className="font-semibold capitalize">{platform.replace(/([A-Z])/g, ' $1')}</h3>
                      <code className="text-sm text-gray-600">{command}</code>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => copyToClipboard(command)}
                        variant="outline"
                        size="sm"
                      >
                        <Copy className="h-4 w-4 mr-2" />
                        Copy
                      </Button>
                      <Button size="sm">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Deploy
                      </Button>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="environment" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Environment Variables</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {environmentVars.map((envVar) => (
                    <div key={envVar.key} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <code className="font-mono text-sm">{envVar.key}</code>
                          {envVar.required && (
                            <Badge variant="destructive" size="sm">Required</Badge>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{envVar.description}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant="outline" className="text-xs">
                          {process.env[envVar.key] ? 'Set' : 'Not Set'}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="checks" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>System Health Checks</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(checks).map(([check, status]) => (
                    <div key={check} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {status ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-red-500" />
                        )}
                        <span className="capitalize">{check.replace(/([A-Z])/g, ' $1')}</span>
                      </div>
                      <Badge variant={status ? "default" : "destructive"}>
                        {status ? 'Pass' : 'Fail'}
                      </Badge>
                    </div>
                  ))}
                  <div className="mt-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Overall Health</span>
                      <span className="text-sm text-gray-600">95%</span>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guides" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Deployment Guides</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <h3 className="font-semibold">Vercel Deployment</h3>
                      <p className="text-sm text-gray-600 mt-1">Deploy to Vercel with zero configuration</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <h3 className="font-semibold">Netlify Deployment</h3>
                      <p className="text-sm text-gray-600 mt-1">Deploy to Netlify with CDN</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <h3 className="font-semibold">GitHub Pages</h3>
                      <p className="text-sm text-gray-600 mt-1">Deploy to GitHub Pages for free</p>
                    </div>
                  </Button>
                  <Button variant="outline" className="h-auto p-4 justify-start">
                    <div className="text-left">
                      <h3 className="font-semibold">Custom Server</h3>
                      <p className="text-sm text-gray-600 mt-1">Deploy to your own infrastructure</p>
                    </div>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={() => copyToClipboard('npm run build')}>
                Build App
              </Button>
              <Button variant="outline" size="sm" onClick={() => copyToClipboard('npm run preview')}>
                Preview Build
              </Button>
              <Button variant="outline" size="sm" onClick={() => copyToClipboard('./scripts/pre-deploy-check.sh')}>
                Run Checks
              </Button>
              <Button variant="outline" size="sm" onClick={() => window.open('/DEPLOYMENT_GUIDE.md', '_blank')}>
                View Guide
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeploymentStatus;