import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { DiagnosticArea } from '../services/SupabaseDiagnosticsService'

interface SupabaseDiagnosticsWidgetProps {
  supabaseUrl: string
  supabaseApiKey: string
}

export function SupabaseDiagnosticsWidget({ supabaseUrl, supabaseApiKey }: SupabaseDiagnosticsWidgetProps) {
  const [results, setResults] = useState<{ [key in DiagnosticArea]?: string }>({})
  const [isLoading, setIsLoading] = useState<{ [key in DiagnosticArea]?: boolean }>({})

  const runDiagnostics = async (area: DiagnosticArea) => {
    setIsLoading(prev => ({ ...prev, [area]: true }))
    try {
      const response = await fetch('/api/ LovableDeploymentTool/supabase-diagnostics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          supabaseUrl,
          supabaseApiKey,
          area
        })
      })

      const data = await response.json()
      setResults(prev => ({ ...prev, [area]: data.result }))
    } catch (error: any) {
      setResults(prev => ({ ...prev, [area]: `Error: ${error.message}` }))
    } finally {
      setIsLoading(prev => ({ ...prev, [area]: false }))
    }
  }

  const diagnosticAreas: DiagnosticArea[] = ['authentication', 'database', 'storage', 'api']

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Supabase Diagnostics</CardTitle>
      </CardHeader>
      <CardContent className="grid gap-4">
        {diagnosticAreas.map(area => (
          <div key={area} className="flex items-center justify-between">
            <span>{area}</span>
            <div>
              {results[area] && (
                <Badge variant="secondary" className="mr-2">
                  {results[area]?.startsWith('Error') ? 'Failed' : 'Passed'}
                </Badge>
              )}
              <Button
                variant="outline"
                size="sm"
                onClick={() => runDiagnostics(area)}
                disabled={isLoading[area]}
              >
                {isLoading[area] ? 'Loading...' : 'Run Diagnostics'}
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
