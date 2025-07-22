import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

// Import security modules
import { FunctionMonitor } from './monitors/function-monitor.ts'
import { SchemaMonitor } from './monitors/schema-monitor.ts'
import { AccessMonitor } from './monitors/access-monitor.ts'
import { AIAdvisor } from './analyzers/ai-advisor.ts'
import { ThreatIntelligence } from './analyzers/threat-intelligence.ts'
import { PenetrationTester } from './analyzers/penetration-tester.ts'
import { AutoPatcher } from './healers/auto-patcher.ts'
import { PolicyEnforcer } from './healers/policy-enforcer.ts'
import { EmergencyResponse } from './healers/emergency-response.ts'
import { ComplianceReporter } from './reporters/compliance-reporter.ts'
import { AuditLogger } from './reporters/audit-logger.ts'
import { AlertManager } from './reporters/alert-manager.ts'

interface SecurityEvent {
  type: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  description: string
  source: string
  timestamp: string
  metadata?: Record<string, any>
}

interface SecurityResponse {
  success: boolean
  events_detected: number
  threats_mitigated: number
  policies_enforced: number
  alerts_sent: number
  compliance_status: string
  system_health: string
  next_scan: string
}

class SecurityOrchestrator {
  private supabase: any
  private monitors: any[]
  private analyzers: any[]
  private healers: any[]
  private reporters: any[]

  constructor(supabaseUrl: string, supabaseKey: string) {
    this.supabase = createClient(supabaseUrl, supabaseKey)
    
    // Initialize monitoring systems
    this.monitors = [
      new FunctionMonitor(this.supabase),
      new SchemaMonitor(this.supabase),
      new AccessMonitor(this.supabase)
    ]

    // Initialize analysis systems
    this.analyzers = [
      new AIAdvisor(this.supabase),
      new ThreatIntelligence(this.supabase),
      new PenetrationTester(this.supabase)
    ]

    // Initialize healing systems
    this.healers = [
      new AutoPatcher(this.supabase),
      new PolicyEnforcer(this.supabase),
      new EmergencyResponse(this.supabase)
    ]

    // Initialize reporting systems
    this.reporters = [
      new ComplianceReporter(this.supabase),
      new AuditLogger(this.supabase),
      new AlertManager(this.supabase)
    ]
  }

  async runSecurityScan(): Promise<SecurityResponse> {
    const startTime = new Date()
    let eventsDetected = 0
    let threatsMitigated = 0
    let policiesEnforced = 0
    let alertsSent = 0

    console.log('🔒 Starting comprehensive security scan...')

    try {
      // Phase 1: Monitoring and Detection
      console.log('📊 Phase 1: Security Monitoring')
      const events: SecurityEvent[] = []
      
      for (const monitor of this.monitors) {
        const monitorEvents = await monitor.scan()
        events.push(...monitorEvents)
        eventsDetected += monitorEvents.length
      }

      // Phase 2: Analysis and Intelligence
      console.log('🧠 Phase 2: AI Analysis and Threat Intelligence')
      const threats: any[] = []
      
      for (const analyzer of this.analyzers) {
        const analysisResults = await analyzer.analyze(events)
        threats.push(...analysisResults)
      }

      // Phase 3: Healing and Remediation
      console.log('⚡ Phase 3: Self-Healing and Remediation')
      
      for (const healer of this.healers) {
        const healingResults = await healer.heal(threats)
        threatsMitigated += healingResults.mitigated
        policiesEnforced += healingResults.enforced
      }

      // Phase 4: Reporting and Alerting
      console.log('📋 Phase 4: Compliance Reporting and Alerting')
      
      for (const reporter of this.reporters) {
        const reportResults = await reporter.report(events, threats)
        alertsSent += reportResults.alerts_sent || 0
      }

      // Log security scan completion
      await this.logSecurityEvent({
        type: 'SECURITY_SCAN_COMPLETE',
        severity: 'low',
        description: `Security scan completed. Events: ${eventsDetected}, Threats mitigated: ${threatsMitigated}`,
        source: 'SecurityOrchestrator',
        timestamp: new Date().toISOString(),
        metadata: {
          scan_duration: Date.now() - startTime.getTime(),
          events_detected: eventsDetected,
          threats_mitigated: threatsMitigated,
          policies_enforced: policiesEnforced
        }
      })

      return {
        success: true,
        events_detected: eventsDetected,
        threats_mitigated: threatsMitigated,
        policies_enforced: policiesEnforced,
        alerts_sent: alertsSent,
        compliance_status: 'COMPLIANT',
        system_health: 'HEALTHY',
        next_scan: new Date(Date.now() + 5 * 60 * 1000).toISOString() // Next scan in 5 minutes
      }

    } catch (error) {
      console.error('❌ Security scan failed:', error)
      
      await this.logSecurityEvent({
        type: 'SECURITY_SCAN_ERROR',
        severity: 'high',
        description: `Security scan failed: ${error.message}`,
        source: 'SecurityOrchestrator',
        timestamp: new Date().toISOString(),
        metadata: { error: error.message }
      })

      return {
        success: false,
        events_detected: 0,
        threats_mitigated: 0,
        policies_enforced: 0,
        alerts_sent: 0,
        compliance_status: 'ERROR',
        system_health: 'DEGRADED',
        next_scan: new Date(Date.now() + 1 * 60 * 1000).toISOString() // Retry in 1 minute
      }
    }
  }

  private async logSecurityEvent(event: SecurityEvent): Promise<void> {
    try {
      await this.supabase
        .from('security_events')
        .insert({
          event_type: event.type,
          event_description: event.description,
          severity: event.severity,
          ip_address: null, // Set by calling context
          metadata: event.metadata
        })
    } catch (error) {
      console.error('Failed to log security event:', error)
    }
  }
}

serve(async (req) => {
  try {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    }

    if (req.method === 'OPTIONS') {
      return new Response('ok', { headers: corsHeaders })
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!

    const orchestrator = new SecurityOrchestrator(supabaseUrl, supabaseServiceKey)
    
    console.log('🛡️ Security Scanner Edge Function Activated')
    
    const result = await orchestrator.runSecurityScan()

    return new Response(
      JSON.stringify(result),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )

  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        system_health: 'CRITICAL'
      }),
      {
        headers: { 'Content-Type': 'application/json' },
        status: 500,
      },
    )
  }
})