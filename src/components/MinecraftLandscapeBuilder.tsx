import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { AgeLandscapeSelector } from './AgeLandscapeSelector';

export function MinecraftLandscapeBuilder() {
  const [selectedAge, setSelectedAge] = useState('6-8');

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-900 via-emerald-800 to-blue-900 p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-green-400">🌍 Minecraft Landscape Builder</h1>
          <p className="text-green-300 max-w-2xl mx-auto">
            Create amazing Minecraft landscapes with our advanced building tools and age-appropriate content selection
          </p>
        </div>

        {/* Age Selector */}
        <Card className="border-green-500/30 bg-gradient-to-br from-green-900/40 to-emerald-900/40">
          <CardHeader>
            <CardTitle className="text-green-400 flex items-center gap-2">
              <Users className="h-6 w-6" />
              Age Group Selection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <AgeLandscapeSelector 
              selectedAge={selectedAge}
              onAgeSelect={setSelectedAge}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
