export class AIAdvisor {
  private supabase: any
  private riskWeights: Record<string, number>

  constructor(supabase: any) {
    this.supabase = supabase
    
    // Risk scoring weights for different event types
    this.riskWeights = {
      'BRUTE_FORCE_DETECTED': 0.9,
      'CRITICAL_TABLE_MISSING': 0.95,
      'CONCURRENT_ADMIN_SESSIONS': 0.8,
      'HIGH_FAILED_AUTH_RATE': 0.7,
      'LARGE_TRANSACTIONS_DETECTED': 0.6,
      'HIGH_TRANSACTION_VOLUME': 0.5,
      'HIGH_IP_ACTIVITY': 0.4,
      'ADMIN_ROLE_GRANTED': 0.75,
      'EXPIRED_ADMIN_SESSIONS': 0.2,
      'RLS_POLICY_ACTIVE': -0.1, // Positive security indicator
      'SCHEMA_SECURITY_CHECK': -0.05
    }
  }

  async analyze(events: any[]): Promise<any[]> {
    const threats: any[] = []
    
    try {
      console.log('🧠 AI Security Advisor analyzing events...')
      
      // Perform risk analysis
      const riskAnalysis = await this.performRiskAnalysis(events)
      threats.push(...riskAnalysis)

      // Behavioral pattern analysis
      const behaviorAnalysis = await this.analyzeBehaviorPatterns(events)
      threats.push(...behaviorAnalysis)

      // Predictive threat modeling
      const predictiveThreats = await this.predictiveAnalysis(events)
      threats.push(...predictiveThreats)

      // Generate security recommendations
      const recommendations = await this.generateRecommendations(events)
      threats.push(...recommendations)

      console.log(`✅ AI Advisor generated ${threats.length} threat assessments`)
      
    } catch (error) {
      console.error('AI Advisor error:', error)
      threats.push({
        type: 'AI_ANALYSIS_ERROR',
        severity: 'medium',
        description: `AI analysis failed: ${error.message}`,
        source: 'AIAdvisor',
        timestamp: new Date().toISOString(),
        action_required: 'investigate_ai_system'
      })
    }

    return threats
  }

  private async performRiskAnalysis(events: any[]): Promise<any[]> {
    const threats: any[] = []
    
    // Calculate overall risk score
    let totalRiskScore = 0
    const eventCounts: Record<string, number> = {}

    for (const event of events) {
      const weight = this.riskWeights[event.type] || 0.1
      totalRiskScore += weight
      eventCounts[event.type] = (eventCounts[event.type] || 0) + 1
    }

    // Normalize risk score (0-1 scale)
    const normalizedRisk = Math.min(totalRiskScore / 10, 1)

    if (normalizedRisk > 0.7) {
      threats.push({
        type: 'HIGH_SECURITY_RISK_DETECTED',
        severity: 'critical',
        description: `AI analysis indicates high security risk (score: ${normalizedRisk.toFixed(2)})`,
        source: 'AIAdvisor',
        timestamp: new Date().toISOString(),
        action_required: 'immediate_investigation',
        metadata: {
          risk_score: normalizedRisk,
          contributing_events: eventCounts,
          recommendation: 'Implement emergency security measures and conduct immediate security audit'
        }
      })
    } else if (normalizedRisk > 0.4) {
      threats.push({
        type: 'ELEVATED_SECURITY_RISK',
        severity: 'high',
        description: `AI analysis indicates elevated security risk (score: ${normalizedRisk.toFixed(2)})`,
        source: 'AIAdvisor',
        timestamp: new Date().toISOString(),
        action_required: 'enhanced_monitoring',
        metadata: {
          risk_score: normalizedRisk,
          contributing_events: eventCounts,
          recommendation: 'Increase monitoring frequency and review security policies'
        }
      })
    }

    return threats
  }

  private async analyzeBehaviorPatterns(events: any[]): Promise<any[]> {
    const threats: any[] = []
    
    try {
      // Analyze temporal patterns
      const timePatterns = this.analyzeTemporalPatterns(events)
      
      // Look for coordinated attacks (multiple event types in short time)
      const coordinatedEvents = events.filter(e => 
        ['BRUTE_FORCE_DETECTED', 'HIGH_FAILED_AUTH_RATE', 'LARGE_TRANSACTIONS_DETECTED'].includes(e.type)
      )

      if (coordinatedEvents.length >= 2) {
        const timeSpread = this.calculateTimeSpread(coordinatedEvents)
        
        if (timeSpread < 300000) { // Within 5 minutes
          threats.push({
            type: 'COORDINATED_ATTACK_PATTERN',
            severity: 'critical',
            description: `Coordinated attack pattern detected: ${coordinatedEvents.length} related events within ${timeSpread/1000} seconds`,
            source: 'AIAdvisor',
            timestamp: new Date().toISOString(),
            action_required: 'immediate_lockdown',
            metadata: {
              event_types: coordinatedEvents.map(e => e.type),
              time_spread_seconds: timeSpread / 1000,
              recommendation: 'Activate emergency response protocol'
            }
          })
        }
      }

      // Analyze for insider threat patterns
      const insiderThreats = await this.detectInsiderThreats(events)
      threats.push(...insiderThreats)

    } catch (error) {
      console.error('Behavior pattern analysis error:', error)
    }

    return threats
  }

  private calculateTimeSpread(events: any[]): number {
    if (events.length < 2) return 0
    
    const timestamps = events.map(e => new Date(e.timestamp).getTime())
    const minTime = Math.min(...timestamps)
    const maxTime = Math.max(...timestamps)
    
    return maxTime - minTime
  }

  private analyzeTemporalPatterns(events: any[]): any {
    // Group events by hour to find peak attack times
    const hourlyDistribution: Record<number, number> = {}
    
    for (const event of events) {
      const hour = new Date(event.timestamp).getHours()
      hourlyDistribution[hour] = (hourlyDistribution[hour] || 0) + 1
    }

    return {
      peak_hours: Object.entries(hourlyDistribution)
        .sort(([,a], [,b]) => b - a)
        .slice(0, 3)
        .map(([hour, count]) => ({ hour: parseInt(hour), count }))
    }
  }

  private async detectInsiderThreats(events: any[]): Promise<any[]> {
    const threats: any[] = []
    
    // Look for admin privilege escalation combined with suspicious activity
    const adminEvents = events.filter(e => e.type === 'ADMIN_ROLE_GRANTED')
    const suspiciousEvents = events.filter(e => 
      ['LARGE_TRANSACTIONS_DETECTED', 'HIGH_TRANSACTION_VOLUME'].includes(e.type)
    )

    if (adminEvents.length > 0 && suspiciousEvents.length > 0) {
      threats.push({
        type: 'POTENTIAL_INSIDER_THREAT',
        severity: 'high',
        description: 'AI detected potential insider threat: admin privilege escalation followed by suspicious activity',
        source: 'AIAdvisor',
        timestamp: new Date().toISOString(),
        action_required: 'investigate_admin_activity',
        metadata: {
          admin_grants: adminEvents.length,
          suspicious_activities: suspiciousEvents.length,
          recommendation: 'Review admin access logs and validate recent privilege grants'
        }
      })
    }

    return threats
  }

  private async predictiveAnalysis(events: any[]): Promise<any[]> {
    const threats: any[] = []
    
    try {
      // Simple predictive model based on event velocity and patterns
      const recentEvents = events.filter(e => 
        new Date(e.timestamp).getTime() > Date.now() - 300000 // Last 5 minutes
      )

      const eventVelocity = recentEvents.length / 5 // Events per minute

      if (eventVelocity > 2) { // More than 2 events per minute
        const projectedEvents = eventVelocity * 60 // Events in next hour if trend continues
        
        threats.push({
          type: 'ATTACK_ESCALATION_PREDICTED',
          severity: 'high',
          description: `AI predicts attack escalation: ${projectedEvents.toFixed(0)} events projected in next hour`,
          source: 'AIAdvisor',
          timestamp: new Date().toISOString(),
          action_required: 'preemptive_defense',
          metadata: {
            current_velocity: eventVelocity,
            projected_hourly_events: projectedEvents,
            recommendation: 'Implement preemptive security measures and increase monitoring'
          }
        })
      }

    } catch (error) {
      console.error('Predictive analysis error:', error)
    }

    return threats
  }

  private async generateRecommendations(events: any[]): Promise<any[]> {
    const recommendations: any[] = []
    
    // Generate specific recommendations based on event patterns
    const eventTypes = new Set(events.map(e => e.type))

    if (eventTypes.has('BRUTE_FORCE_DETECTED')) {
      recommendations.push({
        type: 'SECURITY_RECOMMENDATION',
        severity: 'medium',
        description: 'AI Recommendation: Implement rate limiting and CAPTCHA for login attempts',
        source: 'AIAdvisor',
        timestamp: new Date().toISOString(),
        action_required: 'implement_rate_limiting',
        metadata: {
          recommendation_type: 'rate_limiting',
          priority: 'high',
          implementation_complexity: 'medium'
        }
      })
    }

    if (eventTypes.has('LARGE_TRANSACTIONS_DETECTED')) {
      recommendations.push({
        type: 'SECURITY_RECOMMENDATION',
        severity: 'medium',
        description: 'AI Recommendation: Implement additional verification for large transactions',
        source: 'AIAdvisor',
        timestamp: new Date().toISOString(),
        action_required: 'enhance_transaction_security',
        metadata: {
          recommendation_type: 'transaction_verification',
          priority: 'medium',
          implementation_complexity: 'low'
        }
      })
    }

    if (eventTypes.has('HIGH_IP_ACTIVITY')) {
      recommendations.push({
        type: 'SECURITY_RECOMMENDATION',
        severity: 'low',
        description: 'AI Recommendation: Implement IP-based geofencing and reputation checking',
        source: 'AIAdvisor',
        timestamp: new Date().toISOString(),
        action_required: 'implement_ip_filtering',
        metadata: {
          recommendation_type: 'ip_geofencing',
          priority: 'low',
          implementation_complexity: 'high'
        }
      })
    }

    return recommendations
  }
}