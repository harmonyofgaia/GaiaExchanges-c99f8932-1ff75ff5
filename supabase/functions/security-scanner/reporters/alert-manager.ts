export class AlertManager {
  private supabase: any
  private alertChannels: Record<string, any>
  private escalationMatrix: Record<string, any>
  private alertThresholds: Record<string, any>

  constructor(supabase: any) {
    this.supabase = supabase
    
    // Define alert channels and their capabilities
    this.alertChannels = {
      'ADMIN_NOTIFICATION': {
        type: 'internal',
        priority: 'high',
        delivery_method: 'dashboard',
        escalation_time: 300, // 5 minutes
        available: true
      },
      'SECURITY_TEAM_ALERT': {
        type: 'internal',
        priority: 'high',
        delivery_method: 'email',
        escalation_time: 600, // 10 minutes
        available: true
      },
      'EMERGENCY_BROADCAST': {
        type: 'emergency',
        priority: 'critical',
        delivery_method: 'multiple',
        escalation_time: 60, // 1 minute
        available: true
      },
      'COMPLIANCE_NOTIFICATION': {
        type: 'regulatory',
        priority: 'medium',
        delivery_method: 'email',
        escalation_time: 3600, // 1 hour
        available: true
      },
      'SYSTEM_MONITORING': {
        type: 'operational',
        priority: 'low',
        delivery_method: 'logs',
        escalation_time: 0, // No escalation
        available: true
      }
    }

    // Define escalation matrix based on threat severity and type
    this.escalationMatrix = {
      'critical': {
        immediate: ['EMERGENCY_BROADCAST', 'ADMIN_NOTIFICATION'],
        escalated: ['SECURITY_TEAM_ALERT', 'COMPLIANCE_NOTIFICATION'],
        final: ['EMERGENCY_BROADCAST'] // Re-alert if not acknowledged
      },
      'high': {
        immediate: ['ADMIN_NOTIFICATION', 'SECURITY_TEAM_ALERT'],
        escalated: ['EMERGENCY_BROADCAST'],
        final: ['COMPLIANCE_NOTIFICATION']
      },
      'medium': {
        immediate: ['ADMIN_NOTIFICATION'],
        escalated: ['SECURITY_TEAM_ALERT'],
        final: ['COMPLIANCE_NOTIFICATION']
      },
      'low': {
        immediate: ['SYSTEM_MONITORING'],
        escalated: ['ADMIN_NOTIFICATION'],
        final: []
      }
    }

    // Define alert thresholds and conditions
    this.alertThresholds = {
      'BRUTE_FORCE_DETECTED': { threshold: 1, severity: 'critical', immediate: true },
      'MALICIOUS_IP_DETECTED': { threshold: 1, severity: 'critical', immediate: true },
      'HIGH_FAILED_AUTH_RATE': { threshold: 3, severity: 'high', immediate: false },
      'LARGE_TRANSACTIONS_DETECTED': { threshold: 5, severity: 'medium', immediate: false },
      'ADMIN_ROLE_GRANTED': { threshold: 1, severity: 'high', immediate: true },
      'PENETRATION_TEST_VULNERABILITY': { threshold: 1, severity: 'high', immediate: false },
      'COORDINATED_ATTACK_PATTERN': { threshold: 1, severity: 'critical', immediate: true },
      'SYSTEM_LOCKDOWN_INITIATED': { threshold: 1, severity: 'critical', immediate: true }
    }
  }

  async report(events: any[], threats: any[]): Promise<any> {
    const alertResults: any[] = []
    let alertsSent = 0

    try {
      console.log('🚨 AlertManager processing alerts and notifications...')
      
      // Process security event alerts
      const eventAlerts = await this.processEventAlerts(events)
      alertResults.push(...eventAlerts)
      alertsSent += eventAlerts.filter(a => a.sent).length

      // Process threat alerts
      const threatAlerts = await this.processThreatAlerts(threats)
      alertResults.push(...threatAlerts)
      alertsSent += threatAlerts.filter(a => a.sent).length

      // Process system status alerts
      const statusAlerts = await this.processSystemStatusAlerts(events, threats)
      alertResults.push(...statusAlerts)
      alertsSent += statusAlerts.filter(a => a.sent).length

      // Check for alert escalations
      const escalationAlerts = await this.processEscalations()
      alertResults.push(...escalationAlerts)
      alertsSent += escalationAlerts.filter(a => a.sent).length

      // Generate alert summary
      const alertSummary = await this.generateAlertSummary(alertResults)
      alertResults.push(alertSummary)

      console.log(`✅ AlertManager: ${alertsSent} alerts sent, ${alertResults.length} total alert actions`)

    } catch (error) {
      console.error('AlertManager error:', error)
      await this.logAlertError(error.message)
    }

    return { alerts_processed: alertResults.length, alerts_sent: alertsSent }
  }

  private async processEventAlerts(events: any[]): Promise<any[]> {
    const alerts: any[] = []

    for (const event of events) {
      const alertConfig = this.alertThresholds[event.type]
      
      if (alertConfig) {
        const shouldAlert = await this.shouldTriggerAlert(event, alertConfig)
        
        if (shouldAlert) {
          const alert = await this.createEventAlert(event, alertConfig)
          alerts.push(alert)
        }
      }
    }

    return alerts
  }

  private async processThreatAlerts(threats: any[]): Promise<any[]> {
    const alerts: any[] = []

    // Group threats by severity for batch processing
    const threatsBySeverity = this.groupThreatsBySeverity(threats)

    for (const [severity, severityThreats] of Object.entries(threatsBySeverity)) {
      if (severityThreats.length > 0) {
        const alert = await this.createThreatSeverityAlert(severity, severityThreats)
        alerts.push(alert)
      }
    }

    // Check for specific high-priority threat patterns
    const priorityAlerts = await this.checkPriorityThreatPatterns(threats)
    alerts.push(...priorityAlerts)

    return alerts
  }

  private async processSystemStatusAlerts(events: any[], threats: any[]): Promise<any[]> {
    const alerts: any[] = []

    // Calculate system health metrics
    const systemHealth = await this.calculateSystemHealth(events, threats)
    
    if (systemHealth.status !== 'healthy') {
      const alert = await this.createSystemHealthAlert(systemHealth)
      alerts.push(alert)
    }

    // Check for system degradation patterns
    const degradationAlert = await this.checkSystemDegradation(events, threats)
    if (degradationAlert) {
      alerts.push(degradationAlert)
    }

    return alerts
  }

  private async shouldTriggerAlert(event: any, alertConfig: any): Promise<boolean> {
    try {
      // Check if threshold is met
      if (alertConfig.threshold > 1) {
        const recentCount = await this.countRecentEvents(event.type, 3600000) // Last hour
        return recentCount >= alertConfig.threshold
      }

      // For threshold 1, always trigger
      return true

    } catch (error) {
      console.error('Alert threshold check failed:', error)
      return false
    }
  }

  private async createEventAlert(event: any, alertConfig: any): Promise<any> {
    const alert = {
      alert_id: this.generateAlertId(),
      alert_type: 'SECURITY_EVENT_ALERT',
      event_type: event.type,
      severity: alertConfig.severity,
      immediate: alertConfig.immediate,
      created_at: new Date().toISOString(),
      event_details: event,
      channels: this.determineAlertChannels(alertConfig.severity),
      escalation_required: alertConfig.immediate,
      acknowledgment_required: alertConfig.severity === 'critical',
      sent: false
    }

    // Send the alert
    alert.sent = await this.sendAlert(alert)
    
    // Log the alert
    await this.logAlert(alert)

    return alert
  }

  private async createThreatSeverityAlert(severity: string, threats: any[]): Promise<any> {
    const alert = {
      alert_id: this.generateAlertId(),
      alert_type: 'THREAT_SEVERITY_ALERT',
      severity: severity,
      threat_count: threats.length,
      created_at: new Date().toISOString(),
      threat_summary: this.summarizeThreats(threats),
      channels: this.determineAlertChannels(severity),
      escalation_required: severity === 'critical',
      acknowledgment_required: severity === 'critical',
      sent: false
    }

    alert.sent = await this.sendAlert(alert)
    await this.logAlert(alert)

    return alert
  }

  private async createSystemHealthAlert(systemHealth: any): Promise<any> {
    const alert = {
      alert_id: this.generateAlertId(),
      alert_type: 'SYSTEM_HEALTH_ALERT',
      severity: systemHealth.status === 'critical' ? 'critical' : 'high',
      created_at: new Date().toISOString(),
      health_status: systemHealth,
      channels: this.determineAlertChannels(systemHealth.status === 'critical' ? 'critical' : 'high'),
      escalation_required: systemHealth.status === 'critical',
      acknowledgment_required: systemHealth.status === 'critical',
      sent: false
    }

    alert.sent = await this.sendAlert(alert)
    await this.logAlert(alert)

    return alert
  }

  private async checkPriorityThreatPatterns(threats: any[]): Promise<any[]> {
    const priorityAlerts: any[] = []

    // Check for coordinated attack patterns
    const coordinatedThreats = threats.filter(t => t.type === 'COORDINATED_ATTACK_PATTERN')
    if (coordinatedThreats.length > 0) {
      const alert = await this.createCoordinatedAttackAlert(coordinatedThreats)
      priorityAlerts.push(alert)
    }

    // Check for insider threat patterns
    const insiderThreats = threats.filter(t => t.type === 'POTENTIAL_INSIDER_THREAT')
    if (insiderThreats.length > 0) {
      const alert = await this.createInsiderThreatAlert(insiderThreats)
      priorityAlerts.push(alert)
    }

    // Check for data exfiltration patterns
    const exfiltrationThreats = threats.filter(t => t.type === 'DATA_EXFILTRATION_PATTERN')
    if (exfiltrationThreats.length > 0) {
      const alert = await this.createDataExfiltrationAlert(exfiltrationThreats)
      priorityAlerts.push(alert)
    }

    return priorityAlerts
  }

  private async createCoordinatedAttackAlert(threats: any[]): Promise<any> {
    const alert = {
      alert_id: this.generateAlertId(),
      alert_type: 'COORDINATED_ATTACK_ALERT',
      severity: 'critical',
      created_at: new Date().toISOString(),
      attack_details: threats,
      channels: ['EMERGENCY_BROADCAST', 'ADMIN_NOTIFICATION', 'SECURITY_TEAM_ALERT'],
      escalation_required: true,
      acknowledgment_required: true,
      immediate_response_required: true,
      sent: false
    }

    alert.sent = await this.sendEmergencyAlert(alert)
    await this.logAlert(alert)

    return alert
  }

  private async createInsiderThreatAlert(threats: any[]): Promise<any> {
    const alert = {
      alert_id: this.generateAlertId(),
      alert_type: 'INSIDER_THREAT_ALERT',
      severity: 'high',
      created_at: new Date().toISOString(),
      threat_details: threats,
      channels: ['ADMIN_NOTIFICATION', 'SECURITY_TEAM_ALERT'],
      escalation_required: true,
      acknowledgment_required: true,
      investigation_required: true,
      sent: false
    }

    alert.sent = await this.sendAlert(alert)
    await this.logAlert(alert)

    return alert
  }

  private async createDataExfiltrationAlert(threats: any[]): Promise<any> {
    const alert = {
      alert_id: this.generateAlertId(),
      alert_type: 'DATA_EXFILTRATION_ALERT',
      severity: 'critical',
      created_at: new Date().toISOString(),
      exfiltration_details: threats,
      channels: ['EMERGENCY_BROADCAST', 'ADMIN_NOTIFICATION', 'COMPLIANCE_NOTIFICATION'],
      escalation_required: true,
      acknowledgment_required: true,
      regulatory_notification_required: true,
      sent: false
    }

    alert.sent = await this.sendEmergencyAlert(alert)
    await this.logAlert(alert)

    return alert
  }

  private async checkSystemDegradation(events: any[], threats: any[]): Promise<any | null> {
    const errorEvents = events.filter(e => e.type.includes('ERROR'))
    const systemThreats = threats.filter(t => t.type.includes('SYSTEM'))

    if (errorEvents.length > 5 || systemThreats.length > 3) {
      return {
        alert_id: this.generateAlertId(),
        alert_type: 'SYSTEM_DEGRADATION_ALERT',
        severity: 'medium',
        created_at: new Date().toISOString(),
        degradation_indicators: {
          error_events: errorEvents.length,
          system_threats: systemThreats.length
        },
        channels: ['ADMIN_NOTIFICATION'],
        escalation_required: false,
        acknowledgment_required: false,
        sent: await this.sendAlert({
          alert_type: 'SYSTEM_DEGRADATION_ALERT',
          severity: 'medium'
        })
      }
    }

    return null
  }

  private async processEscalations(): Promise<any[]> {
    const escalations: any[] = []

    try {
      // Check for unacknowledged critical alerts
      const unacknowledgedAlerts = await this.getUnacknowledgedAlerts()
      
      for (const alert of unacknowledgedAlerts) {
        const escalation = await this.escalateAlert(alert)
        if (escalation) {
          escalations.push(escalation)
        }
      }

    } catch (error) {
      console.error('Escalation processing failed:', error)
    }

    return escalations
  }

  private async sendAlert(alert: any): Promise<boolean> {
    try {
      // Determine target channels
      const channels = alert.channels || this.determineAlertChannels(alert.severity)
      let sent = false

      for (const channel of channels) {
        const channelConfig = this.alertChannels[channel]
        
        if (channelConfig && channelConfig.available) {
          const success = await this.sendToChannel(alert, channel, channelConfig)
          if (success) {
            sent = true
          }
        }
      }

      return sent

    } catch (error) {
      console.error('Alert sending failed:', error)
      return false
    }
  }

  private async sendEmergencyAlert(alert: any): Promise<boolean> {
    try {
      // Emergency alerts go to all available critical channels
      const emergencyChannels = ['EMERGENCY_BROADCAST', 'ADMIN_NOTIFICATION', 'SECURITY_TEAM_ALERT']
      let sent = false

      for (const channel of emergencyChannels) {
        const success = await this.sendToChannel(alert, channel, this.alertChannels[channel])
        if (success) {
          sent = true
        }
      }

      // Log emergency alert
      await this.supabase
        .from('security_events')
        .insert({
          event_type: 'EMERGENCY_ALERT_SENT',
          event_description: `Emergency alert sent: ${alert.alert_type}`,
          severity: 'critical',
          metadata: {
            alert_id: alert.alert_id,
            channels_notified: emergencyChannels.length
          }
        })

      return sent

    } catch (error) {
      console.error('Emergency alert sending failed:', error)
      return false
    }
  }

  private async sendToChannel(alert: any, channel: string, channelConfig: any): Promise<boolean> {
    try {
      switch (channelConfig.delivery_method) {
        case 'dashboard':
          return await this.sendToDashboard(alert)
          
        case 'email':
          return await this.sendToEmail(alert)
          
        case 'logs':
          return await this.sendToLogs(alert)
          
        case 'multiple':
          return await this.sendToMultipleChannels(alert)
          
        default:
          return await this.sendToLogs(alert)
      }
    } catch (error) {
      console.error(`Failed to send alert to ${channel}:`, error)
      return false
    }
  }

  private async sendToDashboard(alert: any): Promise<boolean> {
    // Send alert to admin dashboard
    const { error } = await this.supabase
      .from('notifications')
      .insert({
        user_id: '00000000-0000-0000-0000-000000000000', // Admin notification
        title: `Security Alert: ${alert.alert_type}`,
        message: alert.event_details?.description || `${alert.alert_type} detected`,
        type: 'security_alert'
      })

    return !error
  }

  private async sendToEmail(alert: any): Promise<boolean> {
    // In production, this would send actual emails
    // For now, log the email notification
    const { error } = await this.supabase
      .from('security_events')
      .insert({
        event_type: 'EMAIL_ALERT_SENT',
        event_description: `Email alert sent for ${alert.alert_type}`,
        severity: alert.severity,
        metadata: {
          alert_id: alert.alert_id,
          delivery_method: 'email'
        }
      })

    return !error
  }

  private async sendToLogs(alert: any): Promise<boolean> {
    const { error } = await this.supabase
      .from('security_events')
      .insert({
        event_type: 'ALERT_LOGGED',
        event_description: `Security alert logged: ${alert.alert_type}`,
        severity: alert.severity,
        metadata: {
          alert_details: alert,
          delivery_method: 'logs'
        }
      })

    return !error
  }

  private async sendToMultipleChannels(alert: any): Promise<boolean> {
    // Send to dashboard, email, and logs
    const dashboardSent = await this.sendToDashboard(alert)
    const emailSent = await this.sendToEmail(alert)
    const logsSent = await this.sendToLogs(alert)

    return dashboardSent || emailSent || logsSent
  }

  // Helper methods

  private generateAlertId(): string {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2, 8)
    return `ALERT_${timestamp}_${random}`.toUpperCase()
  }

  private groupThreatsBySeverity(threats: any[]): Record<string, any[]> {
    return threats.reduce((acc, threat) => {
      const severity = threat.severity || 'medium'
      if (!acc[severity]) acc[severity] = []
      acc[severity].push(threat)
      return acc
    }, {})
  }

  private determineAlertChannels(severity: string): string[] {
    const escalation = this.escalationMatrix[severity]
    return escalation ? escalation.immediate : ['SYSTEM_MONITORING']
  }

  private summarizeThreats(threats: any[]): any {
    return {
      count: threats.length,
      types: [...new Set(threats.map(t => t.type))],
      sources: [...new Set(threats.map(t => t.source))],
      first_detected: threats[0]?.timestamp,
      latest_detected: threats[threats.length - 1]?.timestamp
    }
  }

  private async calculateSystemHealth(events: any[], threats: any[]): Promise<any> {
    const criticalCount = threats.filter(t => t.severity === 'critical').length
    const highCount = threats.filter(t => t.severity === 'high').length
    const errorCount = events.filter(e => e.type.includes('ERROR')).length

    let status = 'healthy'
    if (criticalCount > 0) status = 'critical'
    else if (highCount > 2 || errorCount > 5) status = 'degraded'
    else if (threats.length > 10) status = 'stressed'

    return {
      status,
      threat_summary: {
        critical: criticalCount,
        high: highCount,
        total: threats.length
      },
      error_count: errorCount,
      health_score: Math.max(0, 100 - (criticalCount * 30 + highCount * 10 + errorCount * 5))
    }
  }

  private async countRecentEvents(eventType: string, timeWindowMs: number): Promise<number> {
    try {
      const { data: events } = await this.supabase
        .from('security_events')
        .select('id')
        .eq('event_type', eventType)
        .gte('created_at', new Date(Date.now() - timeWindowMs).toISOString())

      return events?.length || 0
    } catch (error) {
      return 0
    }
  }

  private async getUnacknowledgedAlerts(): Promise<any[]> {
    try {
      const { data: alerts, error } = await this.supabase
        .from('alerts')
        .select('*')
        .eq('acknowledged', false);

      if (error) {
        console.error('Error fetching unacknowledged alerts:', error);
        return [];
      }

      return alerts || [];
    } catch (error) {
      console.error('Unexpected error fetching unacknowledged alerts:', error);
      return [];
    }
  }

  private async escalateAlert(alert: any): Promise<any | null> {
    // Mock escalation logic
    return null
  }

  private async generateAlertSummary(alertResults: any[]): Promise<any> {
    const summary = {
      summary_type: 'ALERT_SUMMARY',
      generated_at: new Date().toISOString(),
      total_alerts: alertResults.length,
      alerts_sent: alertResults.filter(a => a.sent).length,
      by_severity: this.groupAlertsBySeverity(alertResults),
      by_type: this.groupAlertsByType(alertResults),
      escalations_required: alertResults.filter(a => a.escalation_required).length,
      acknowledgments_pending: alertResults.filter(a => a.acknowledgment_required && !a.acknowledged).length
    }

    // Log alert summary
    await this.logAlertSummary(summary)

    return summary
  }

  private groupAlertsBySeverity(alerts: any[]): Record<string, number> {
    return alerts.reduce((acc, alert) => {
      if (alert.severity) {
        acc[alert.severity] = (acc[alert.severity] || 0) + 1
      }
      return acc
    }, {})
  }

  private groupAlertsByType(alerts: any[]): Record<string, number> {
    return alerts.reduce((acc, alert) => {
      if (alert.alert_type) {
        acc[alert.alert_type] = (acc[alert.alert_type] || 0) + 1
      }
      return acc
    }, {})
  }

  // Logging methods

  private async logAlert(alert: any): Promise<void> {
    try {
      await this.supabase
        .from('security_audit_log')
        .insert({
          event_type: 'ALERT_GENERATED',
          event_description: `Security alert generated: ${alert.alert_type}`,
          remediation_applied: JSON.stringify({
            alert_details: alert,
            channels_notified: alert.channels?.length || 0,
            sent_successfully: alert.sent
          })
        })
    } catch (error) {
      console.error('Failed to log alert:', error)
    }
  }

  private async logAlertSummary(summary: any): Promise<void> {
    try {
      await this.supabase
        .from('security_audit_log')
        .insert({
          event_type: 'ALERT_SUMMARY_GENERATED',
          event_description: `Alert summary: ${summary.alerts_sent}/${summary.total_alerts} alerts sent`,
          remediation_applied: JSON.stringify(summary)
        })
    } catch (error) {
      console.error('Failed to log alert summary:', error)
    }
  }

  private async logAlertError(errorMessage: string): Promise<void> {
    try {
      await this.supabase
        .from('security_events')
        .insert({
          event_type: 'ALERT_MANAGER_ERROR',
          event_description: `Alert management failed: ${errorMessage}`,
          severity: 'medium'
        })
    } catch (error) {
      console.error('Failed to log alert error:', error)
    }
  }
}