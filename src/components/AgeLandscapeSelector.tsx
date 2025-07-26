
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AgeLandscapeSelectorProps {
  selectedAge: string;
  onAgeSelect: (age: string) => void;
}

export function AgeLandscapeSelector({ selectedAge, onAgeSelect }: AgeLandscapeSelectorProps) {
  const ageGroups = [
    { id: '6-8', label: '6-8 Years', description: 'Simple builds, basic shapes' },
    { id: '9-12', label: '9-12 Years', description: 'Medium complexity, creative themes' },
    { id: '13-16', label: '13-16 Years', description: 'Advanced builds, detailed structures' },
    { id: '17+', label: '17+ Years', description: 'Expert level, unlimited creativity' }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {ageGroups.map((group) => (
        <Card 
          key={group.id}
          className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
            selectedAge === group.id 
              ? 'border-green-400 bg-green-900/50' 
              : 'border-green-600/30 bg-green-900/20'
          }`}
          onClick={() => onAgeSelect(group.id)}
        >
          <div className="p-4 text-center space-y-2">
            <h3 className="font-semibold text-green-300">{group.label}</h3>
            <p className="text-sm text-green-400/80">{group.description}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
