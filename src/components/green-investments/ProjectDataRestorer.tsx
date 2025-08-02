
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { FirecrawlService } from '@/utils/FirecrawlService';
import { toast } from 'sonner';
import { Leaf, Download, Key, Globe } from 'lucide-react';

interface ProjectDataRestorerProps {
  onDataRestored: (projectData: any) => void;
}

export function ProjectDataRestorer({ onDataRestored }: ProjectDataRestorerProps) {
  const [apiKey, setApiKey] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [crawlResult, setCrawlResult] = useState<any>(null);

  const handleApiKeySubmit = async () => {
    if (!apiKey.trim()) {
      toast.error('Please enter your Firecrawl API key');
      return;
    }

    const isValid = await FirecrawlService.testApiKey(apiKey);
    if (isValid) {
      FirecrawlService.saveApiKey(apiKey);
      toast.success('🔑 API Key saved successfully!');
    } else {
      toast.error('Invalid API key. Please check and try again.');
    }
  };

  const handleRestoreData = async () => {
    setIsLoading(true);
    setProgress(0);
    setCrawlResult(null);
    
    try {
      const url = 'https://sites.google.com/view/culture-of-harmony/harmony-of-gaia/soul-projects';
      console.log('🌍 Starting to restore GAiA project data from:', url);
      
      const result = await FirecrawlService.crawlWebsite(url);
      
      if (result.success) {
        toast.success('✨ Project data restored successfully!', {
          description: 'Your original GAiA project information has been retrieved'
        });
        setCrawlResult(result.data);
        onDataRestored(result.data);
      } else {
        toast.error('❌ Failed to restore project data', {
          description: result.error || 'Unable to access the project information'
        });
      }
    } catch (error) {
      console.error('Error restoring project data:', error);
      toast.error('❌ Error during data restoration', {
        description: 'Please check your connection and try again'
      });
    } finally {
      setIsLoading(false);
      setProgress(100);
    }
  };

  return (
    <Card className="border-green-500/30 bg-gradient-to-br from-green-900/20 to-emerald-900/20">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-green-400">
          <Leaf className="h-6 w-6" />
          🌱 Restore Original GAiA Project Data
        </CardTitle>
        <p className="text-green-300/80 text-sm">
          Restore your original project information from your Culture of Harmony website
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {!FirecrawlService.getApiKey() && (
          <div className="space-y-3 p-4 bg-yellow-900/20 border border-yellow-500/30 rounded-lg">
            <div className="flex items-center gap-2 text-yellow-400">
              <Key className="h-4 w-4" />
              <span className="font-semibold">Firecrawl API Key Required</span>
            </div>
            <p className="text-sm text-yellow-300/80">
              To restore your project data, please enter your Firecrawl API key:
            </p>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="Enter your Firecrawl API key"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="flex-1"
              />
              <Button onClick={handleApiKeySubmit} className="bg-green-600 hover:bg-green-700">
                <Key className="h-4 w-4 mr-1" />
                Save Key
              </Button>
            </div>
          </div>
        )}

        {FirecrawlService.getApiKey() && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-400">
              <Globe className="h-4 w-4" />
              <span className="text-sm">Ready to restore from: Culture of Harmony - Soul Projects</span>
            </div>
            
            {isLoading && (
              <Progress value={progress} className="w-full" />
            )}
            
            <Button
              onClick={handleRestoreData}
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            >
              <Download className="h-4 w-4 mr-2" />
              {isLoading ? "Restoring Project Data..." : "Restore Original GAiA Projects"}
            </Button>
          </div>
        )}

        {crawlResult && (
          <Card className="mt-4 p-4 bg-emerald-900/20 border-emerald-500/30">
            <h4 className="text-emerald-400 font-semibold mb-2">✨ Restoration Complete!</h4>
            <div className="space-y-2 text-sm text-emerald-300/80">
              <p>Status: {crawlResult.status}</p>
              <p>Pages Processed: {crawlResult.completed}</p>
              <p>Credits Used: {crawlResult.creditsUsed}</p>
              {crawlResult.data && (
                <div className="mt-3">
                  <p className="font-semibold mb-1">Project Data Retrieved:</p>
                  <div className="bg-black/30 p-2 rounded text-xs max-h-32 overflow-auto">
                    <pre>{JSON.stringify(crawlResult.data.slice(0, 2), null, 2)}</pre>
                  </div>
                </div>
              )}
            </div>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}
