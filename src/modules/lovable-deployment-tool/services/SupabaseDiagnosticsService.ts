import { supabase } from '@/integrations/supabase/client'

export type DiagnosticArea = 'authentication' | 'database' | 'storage' | 'api'

export interface DiagnosticResult {
  area: DiagnosticArea
  status: 'success' | 'error'
  message: string
  details?: any
}

interface SupabaseConfig {
  url: string
  anonKey: string
}

export class SupabaseDiagnosticsService {
  private config: SupabaseConfig

  constructor(config: SupabaseConfig) {
    this.config = config
  }

  async runAllDiagnostics(): Promise<DiagnosticResult[]> {
    const areas: DiagnosticArea[] = ['authentication', 'database', 'storage', 'api']
    const results: DiagnosticResult[] = []

    for (const area of areas) {
      const result = await this.runDiagnostic(area)
      results.push(result)
    }

    return results
  }

  async runDiagnostic(area: DiagnosticArea): Promise<DiagnosticResult> {
    if (!this.validateArea(area)) {
      return {
        area: area,
        status: 'error',
        message: 'Invalid diagnostic area specified.'
      }
    }

    try {
      switch (area) {
        case 'authentication':
          return await this.checkAuthentication();
        case 'database':
          return await this.checkDatabaseConnection();
        case 'storage':
          return await this.checkStorageAccess();
        case 'api':
          return await this.checkApiAccess();
        default:
          return {
            area: area,
            status: 'error',
            message: 'No diagnostic logic implemented for this area.'
          }
      }
    } catch (error: any) {
      console.error(`Diagnostic failed for ${area}:`, error)
      return {
        area: area,
        status: 'error',
        message: `Diagnostic test failed: ${error.message || 'Unknown error'}`
      }
    }
  }

  private async checkAuthentication(): Promise<DiagnosticResult> {
    try {
      const { data, error } = await supabase.auth.getUser()

      if (error) {
        return {
          area: 'authentication',
          status: 'error',
          message: `Authentication check failed: ${error.message}`,
          details: error
        }
      }

      if (data?.user) {
        return {
          area: 'authentication',
          status: 'success',
          message: `Authentication successful. User ID: ${data.user.id}`
        }
      } else {
        return {
          area: 'authentication',
          status: 'error',
          message: 'No user session found.'
        }
      }
    } catch (error: any) {
      return {
        area: 'authentication',
        status: 'error',
        message: `Authentication check failed: ${error.message || 'Unknown error'}`
      }
    }
  }

  private async checkDatabaseConnection(): Promise<DiagnosticResult> {
    try {
      const { data, error } = await supabase.from('projects').select('*').limit(1)

      if (error) {
        return {
          area: 'database',
          status: 'error',
          message: `Database connection check failed: ${error.message}`,
          details: error
        }
      }

      if (data && data.length > 0) {
        return {
          area: 'database',
          status: 'success',
          message: 'Database connection successful. Retrieved sample data.',
          details: data[0]
        }
      } else {
        return {
          area: 'database',
          status: 'error',
          message: 'Could not retrieve data from the database.'
        }
      }
    } catch (error: any) {
      return {
        area: 'database',
        status: 'error',
        message: `Database connection check failed: ${error.message || 'Unknown error'}`
      }
    }
  }

  private async checkStorageAccess(): Promise<DiagnosticResult> {
    try {
      const { data, error } = await supabase.storage.listBuckets()

      if (error) {
        return {
          area: 'storage',
          status: 'error',
          message: `Storage access check failed: ${error.message}`,
          details: error
        }
      }

      if (data && data.length > 0) {
        return {
          area: 'storage',
          status: 'success',
          message: `Storage access successful. Found ${data.length} buckets.`,
          details: data
        }
      } else {
        return {
          area: 'storage',
          status: 'error',
          message: 'No storage buckets found or access denied.'
        }
      }
    } catch (error: any) {
      return {
        area: 'storage',
        status: 'error',
        message: `Storage access check failed: ${error.message || 'Unknown error'}`
      }
    }
  }

  private async checkApiAccess(): Promise<DiagnosticResult> {
    try {
      // Attempt to fetch the Supabase API URL from environment variables or a configuration file
      const apiUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || this.config.url
      if (!apiUrl) {
        return {
          area: 'api',
          status: 'error',
          message: 'Supabase API URL is not defined.'
        }
      }

      // For this example, we'll just check if the URL is reachable
      const response = await fetch(apiUrl)
      if (response.ok) {
        return {
          area: 'api',
          status: 'success',
          message: 'API endpoint is reachable.'
        }
      } else {
        return {
          area: 'api',
          status: 'error',
          message: `API endpoint returned an error: ${response.status} ${response.statusText}`
        }
      }
    } catch (error: any) {
      return {
        area: 'api',
        status: 'error',
        message: `API access check failed: ${error.message || 'Unknown error'}`
      }
    }
  }

  private validateArea(area: DiagnosticArea): boolean {
    return ['authentication', 'database', 'storage', 'api'].includes(area)
  }
}
