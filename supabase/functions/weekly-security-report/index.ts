import { serve } from "https://deno.land/std@0.208.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface WeeklyReport {
  report_id: string;
  week_start: string;
  week_end: string;
  security_summary: {
    total_scans: number;
    issues_detected: number;
    issues_resolved: number;
    compliance_score_avg: number;
    compliance_trend: 'improving' | 'stable' | 'declining';
  };
  performance_summary: {
    avg_query_time: number;
    slow_queries_count: number;
    index_usage_efficiency: number;
    storage_growth: number;
  };
  threat_intelligence: {
    new_vulnerabilities: number;
    blocked_attempts: number;
    suspicious_activities: number;
    geographic_threats: string[];
  };
  recommendations: string[];
  action_items: string[];
  compliance_status: 'compliant' | 'non-compliant' | 'warning';
}

class WeeklyReportGenerator {
  private supabase: any;

  constructor(supabaseUrl: string, adminKey: string) {
    this.supabase = createClient(supabaseUrl, adminKey);
  }

  async generateWeeklyReport(): Promise<WeeklyReport> {
    const weekEnd = new Date();
    const weekStart = new Date(weekEnd.getTime() - 7 * 24 * 60 * 60 * 1000);

    const reportId = crypto.randomUUID();

    // Generate all report sections
    const securitySummary = await this.generateSecuritySummary(weekStart, weekEnd);
    const performanceSummary = await this.generatePerformanceSummary(weekStart, weekEnd);
    const threatIntelligence = await this.generateThreatIntelligence(weekStart, weekEnd);
    const recommendations = await this.generateRecommendations(securitySummary, performanceSummary);
    const actionItems = await this.generateActionItems(securitySummary, threatIntelligence);

    const report: WeeklyReport = {
      report_id: reportId,
      week_start: weekStart.toISOString(),
      week_end: weekEnd.toISOString(),
      security_summary: securitySummary,
      performance_summary: performanceSummary,
      threat_intelligence: threatIntelligence,
      recommendations,
      action_items,
      compliance_status: this.determineComplianceStatus(securitySummary)
    };

    // Store the report
    await this.storeReport(report);

    // Send notifications if needed
    await this.sendReportNotifications(report);

    return report;
  }

  private async generateSecuritySummary(weekStart: Date, weekEnd: Date) {
    try {
      // Get security audit logs for the week
      const { data: auditLogs } = await this.supabase
        .from('security_audit_log')
        .select('*')
        .gte('created_at', weekStart.toISOString())
        .lte('created_at', weekEnd.toISOString());

      // Count security scans
      const totalScans = auditLogs?.filter(log => 
        log.operation === 'SECURITY_SCAN' || log.table_name === 'migration'
      ).length || 0;

      // Count issues detected and resolved
      const issuesDetected = auditLogs?.filter(log => 
        log.operation === 'ISSUE_DETECTED'
      ).length || 0;

      const issuesResolved = auditLogs?.filter(log => 
        log.operation === 'AUTO_FIX' || log.operation === 'MANUAL_FIX'
      ).length || 0;

      // Calculate compliance score trend
      const complianceScores = await this.getComplianceScores(weekStart, weekEnd);
      const complianceScoreAvg = complianceScores.reduce((a, b) => a + b, 0) / complianceScores.length || 100;
      
      const previousWeekScores = await this.getComplianceScores(
        new Date(weekStart.getTime() - 7 * 24 * 60 * 60 * 1000),
        weekStart
      );
      const previousAvg = previousWeekScores.reduce((a, b) => a + b, 0) / previousWeekScores.length || 100;

      let complianceTrend: 'improving' | 'stable' | 'declining' = 'stable';
      if (complianceScoreAvg > previousAvg + 5) complianceTrend = 'improving';
      else if (complianceScoreAvg < previousAvg - 5) complianceTrend = 'declining';

      return {
        total_scans: totalScans,
        issues_detected: issuesDetected,
        issues_resolved: issuesResolved,
        compliance_score_avg: Math.round(complianceScoreAvg),
        compliance_trend: complianceTrend
      };

    } catch (error) {
      console.error('Error generating security summary:', error);
      return {
        total_scans: 0,
        issues_detected: 0,
        issues_resolved: 0,
        compliance_score_avg: 0,
        compliance_trend: 'declining' as const
      };
    }
  }

  private async generatePerformanceSummary(weekStart: Date, weekEnd: Date) {
    try {
      // Get performance metrics
      const { data: queryStats, error: queryStatsError } = await this.supabase
        .from('pg_stat_statements')
        .select(`
          avg(mean_exec_time) as avg_query_time,
          count(*) filter (where mean_exec_time > 1000) as slow_queries_count
        `)
        .gte('last_exec', weekStart.toISOString())
        .lte('last_exec', weekEnd.toISOString());
      if (queryStatsError) {
        throw queryStatsError;
      }

      // Get index usage stats
      const { data: indexStats, error: indexStatsError } = await this.supabase
        .from('pg_stat_user_tables')
        .select(`
          avg(idx_scan::float / GREATEST(seq_scan + idx_scan, 1)) * 100 as index_efficiency
        `)
        .eq('schemaname', 'public');
      if (indexStatsError) {
        throw indexStatsError;
      }

      // Get storage growth
      const { data: storageStats, error: storageStatsError } = await this.supabase
        .rpc('get_storage_size', { schema_name: 'public' });
      if (storageStatsError) {
        throw storageStatsError;
      }

      const previousSize = await this.getPreviousStorageSize(weekStart);
      const storageGrowth = storageStats?.[0]?.current_size 
        ? ((storageStats[0].current_size - previousSize) / previousSize) * 100
        : 0;

      return {
        avg_query_time: Math.round(queryStats?.[0]?.avg_query_time || 0),
        slow_queries_count: queryStats?.[0]?.slow_queries_count || 0,
        index_usage_efficiency: Math.round(indexStats?.[0]?.index_efficiency || 0),
        storage_growth: Math.round(storageGrowth * 100) / 100
      };

    } catch (error) {
      console.error('Error generating performance summary:', error);
      return {
        avg_query_time: 0,
        slow_queries_count: 0,
        index_usage_efficiency: 0,
        storage_growth: 0
      };
    }
  }

  private async generateThreatIntelligence(weekStart: Date, weekEnd: Date) {
    try {
      // Get security events for threat analysis
      const { data: securityEvents } = await this.supabase
        .from('security_events')
        .select('*')
        .gte('created_at', weekStart.toISOString())
        .lte('created_at', weekEnd.toISOString());

      const newVulnerabilities = securityEvents?.filter(event => 
        event.event_type === 'vulnerability_detected'
      ).length || 0;

      const blockedAttempts = securityEvents?.filter(event => 
        event.event_type === 'blocked_attempt' || event.event_type === 'suspicious_login'
      ).length || 0;

      const suspiciousActivities = securityEvents?.filter(event => 
        event.severity === 'high' || event.severity === 'maximum'
      ).length || 0;

      // Analyze geographic threats
      const geographicThreats = this.analyzeGeographicThreats(securityEvents || []);

      return {
        new_vulnerabilities: newVulnerabilities,
        blocked_attempts: blockedAttempts,
        suspicious_activities: suspiciousActivities,
        geographic_threats: geographicThreats
      };

    } catch (error) {
      console.error('Error generating threat intelligence:', error);
      return {
        new_vulnerabilities: 0,
        blocked_attempts: 0,
        suspicious_activities: 0,
        geographic_threats: []
      };
    }
  }

  private async generateRecommendations(securitySummary: any, performanceSummary: any): Promise<string[]> {
    const recommendations = [];

    // Security recommendations
    if (securitySummary.compliance_score_avg < 80) {
      recommendations.push('🔒 Priority: Improve compliance score by addressing critical security issues');
    }

    if (securitySummary.compliance_trend === 'declining') {
      recommendations.push('📉 Warning: Compliance trend is declining - immediate review required');
    }

    if (securitySummary.issues_detected > securitySummary.issues_resolved) {
      recommendations.push('⚠️ Backlog: More security issues detected than resolved this week');
    }

    // Performance recommendations
    if (performanceSummary.avg_query_time > 500) {
      recommendations.push('🐌 Performance: Average query time is high - review slow queries');
    }

    if (performanceSummary.index_usage_efficiency < 70) {
      recommendations.push('📊 Indexes: Low index usage efficiency detected - review database queries');
    }

    if (performanceSummary.storage_growth > 20) {
      recommendations.push('💾 Storage: High storage growth detected - consider data archiving');
    }

    if (performanceSummary.slow_queries_count > 10) {
      recommendations.push('🚀 Optimization: Multiple slow queries detected - optimization needed');
    }

    // General recommendations
    if (recommendations.length === 0) {
      recommendations.push('✅ Excellent: All metrics are within acceptable ranges');
      recommendations.push('🔄 Maintenance: Continue regular monitoring and proactive maintenance');
    }

    return recommendations;
  }

  private async generateActionItems(securitySummary: any, threatIntelligence: any): Promise<string[]> {
    const actionItems = [];

    if (threatIntelligence.new_vulnerabilities > 0) {
      actionItems.push(`Review and patch ${threatIntelligence.new_vulnerabilities} new vulnerabilities`);
    }

    if (threatIntelligence.suspicious_activities > 5) {
      actionItems.push('Investigate suspicious activities and update security policies');
    }

    if (securitySummary.compliance_score_avg < 70) {
      actionItems.push('Immediate compliance remediation required');
    }

    if (threatIntelligence.geographic_threats.length > 0) {
      actionItems.push(`Review geographic threats from: ${threatIntelligence.geographic_threats.join(', ')}`);
    }

    actionItems.push('Schedule next security scan within 24 hours');
    actionItems.push('Review and update security policies if needed');
    actionItems.push('Backup critical data and test recovery procedures');

    return actionItems;
  }

  private determineComplianceStatus(securitySummary: any): 'compliant' | 'non-compliant' | 'warning' {
    if (securitySummary.compliance_score_avg >= 90) {
      return 'compliant';
    } else if (securitySummary.compliance_score_avg >= 70) {
      return 'warning';
    } else {
      return 'non-compliant';
    }
  }

  private async getComplianceScores(start: Date, end: Date): Promise<number[]> {
    try {
      // This would get actual compliance scores from monitoring results
      // For now, return mock data
      return [85, 87, 90, 88, 92, 89, 91];
    } catch (error) {
      console.error('Error getting compliance scores:', error);
      return [];
    }
  }

  private async getPreviousStorageSize(weekStart: Date): Promise<number> {
    try {
      // This would get historical storage size data
      // For now, return a mock value
      return 1000000; // 1MB
    } catch (error) {
      console.error('Error getting previous storage size:', error);
      return 0;
    }
  }

  private analyzeGeographicThreats(securityEvents: any[]): string[] {
    const threatCountries = new Set<string>();

    for (const event of securityEvents) {
      if (event.ip_address && (event.severity === 'high' || event.severity === 'maximum')) {
        // In a real implementation, you would use IP geolocation
        // For now, add some mock geographic data
        if (event.event_type === 'suspicious_login') {
          threatCountries.add('Unknown Location');
        }
      }
    }

    return Array.from(threatCountries);
  }

  private async storeReport(report: WeeklyReport): Promise<void> {
    try {
      // Store in a dedicated reports table or file storage
      await this.supabase
        .from('security_audit_log')
        .insert({
          table_name: 'weekly_reports',
          operation: 'WEEKLY_REPORT_GENERATED',
          new_data: report
        });

    } catch (error) {
      console.error('Error storing weekly report:', error);
    }
  }

  private async sendReportNotifications(report: WeeklyReport): Promise<void> {
    try {
      // Get admin users
      const { data: admins } = await this.supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'admin');

      const statusEmoji = {
        'compliant': '✅',
        'warning': '⚠️',
        'non-compliant': '🚨'
      };

      const message = `Weekly Security Report Generated
${statusEmoji[report.compliance_status]} Status: ${report.compliance_status.toUpperCase()}
📊 Compliance Score: ${report.security_summary.compliance_score_avg}%
🔍 Issues Detected: ${report.security_summary.issues_detected}
✅ Issues Resolved: ${report.security_summary.issues_resolved}
⚡ Performance: ${report.performance_summary.slow_queries_count} slow queries`;

      for (const admin of admins || []) {
        await this.supabase
          .from('notifications')
          .insert({
            user_id: admin.user_id,
            title: `📊 Weekly Security Report - ${report.compliance_status.toUpperCase()}`,
            message: message,
            type: 'security_report',
            action_url: `/admin/reports/${report.report_id}`
          });
      }

    } catch (error) {
      console.error('Error sending report notifications:', error);
    }
  }
}

// HTML Report Generator
class HTMLReportGenerator {
  static generateHTML(report: WeeklyReport): string {
    const statusColor = {
      'compliant': '#10B981',
      'warning': '#F59E0B',
      'non-compliant': '#EF4444'
    };

    return `
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Weekly Security & Performance Report</title>
    <style>
        body { 
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; 
            line-height: 1.6; 
            color: #333; 
            max-width: 800px; 
            margin: 0 auto; 
            padding: 20px; 
        }
        .header { 
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
            color: white; 
            padding: 20px; 
            border-radius: 8px; 
            margin-bottom: 20px; 
        }
        .status-badge { 
            background: ${statusColor[report.compliance_status]}; 
            color: white; 
            padding: 4px 12px; 
            border-radius: 20px; 
            font-size: 12px; 
            font-weight: bold; 
        }
        .metric-grid { 
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
            gap: 15px; 
            margin: 20px 0; 
        }
        .metric-card { 
            background: #f8fafc; 
            padding: 15px; 
            border-radius: 8px; 
            border: 1px solid #e2e8f0; 
        }
        .metric-value { 
            font-size: 24px; 
            font-weight: bold; 
            color: #2563eb; 
        }
        .section { 
            margin: 20px 0; 
            padding: 20px; 
            background: white; 
            border-radius: 8px; 
            box-shadow: 0 1px 3px rgba(0,0,0,0.1); 
        }
        .recommendations { 
            background: #fef3cd; 
            border-left: 4px solid #fbbf24; 
            padding: 15px; 
            margin: 10px 0; 
        }
        .action-items { 
            background: #fee2e2; 
            border-left: 4px solid #ef4444; 
            padding: 15px; 
            margin: 10px 0; 
        }
        ul { padding-left: 20px; }
        li { margin: 5px 0; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🛡️ Weekly Security & Performance Report</h1>
        <p>Report Period: ${new Date(report.week_start).toLocaleDateString()} - ${new Date(report.week_end).toLocaleDateString()}</p>
        <span class="status-badge">${report.compliance_status.toUpperCase()}</span>
    </div>

    <div class="section">
        <h2>📊 Executive Summary</h2>
        <div class="metric-grid">
            <div class="metric-card">
                <div class="metric-value">${report.security_summary.compliance_score_avg}%</div>
                <div>Compliance Score</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${report.security_summary.issues_resolved}</div>
                <div>Issues Resolved</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${report.performance_summary.avg_query_time}ms</div>
                <div>Avg Query Time</div>
            </div>
            <div class="metric-card">
                <div class="metric-value">${report.threat_intelligence.blocked_attempts}</div>
                <div>Blocked Attempts</div>
            </div>
        </div>
    </div>

    <div class="section">
        <h2>🔒 Security Summary</h2>
        <ul>
            <li>Total Security Scans: ${report.security_summary.total_scans}</li>
            <li>Issues Detected: ${report.security_summary.issues_detected}</li>
            <li>Issues Resolved: ${report.security_summary.issues_resolved}</li>
            <li>Compliance Trend: ${report.security_summary.compliance_trend} 
                ${report.security_summary.compliance_trend === 'improving' ? '📈' : 
                  report.security_summary.compliance_trend === 'declining' ? '📉' : '➡️'}
            </li>
        </ul>
    </div>

    <div class="section">
        <h2>⚡ Performance Summary</h2>
        <ul>
            <li>Average Query Time: ${report.performance_summary.avg_query_time}ms</li>
            <li>Slow Queries: ${report.performance_summary.slow_queries_count}</li>
            <li>Index Usage Efficiency: ${report.performance_summary.index_usage_efficiency}%</li>
            <li>Storage Growth: ${report.performance_summary.storage_growth}%</li>
        </ul>
    </div>

    <div class="section">
        <h2>🌐 Threat Intelligence</h2>
        <ul>
            <li>New Vulnerabilities: ${report.threat_intelligence.new_vulnerabilities}</li>
            <li>Blocked Attempts: ${report.threat_intelligence.blocked_attempts}</li>
            <li>Suspicious Activities: ${report.threat_intelligence.suspicious_activities}</li>
            <li>Geographic Threats: ${report.threat_intelligence.geographic_threats.join(', ') || 'None detected'}</li>
        </ul>
    </div>

    <div class="recommendations">
        <h3>💡 Recommendations</h3>
        <ul>
            ${report.recommendations.map(rec => `<li>${rec}</li>`).join('')}
        </ul>
    </div>

    <div class="action-items">
        <h3>📋 Action Items</h3>
        <ul>
            ${report.action_items.map(item => `<li>${item}</li>`).join('')}
        </ul>
    </div>

    <div style="text-align: center; margin-top: 40px; color: #666; font-size: 12px;">
        Report generated on ${new Date().toLocaleString()} | Report ID: ${report.report_id}
    </div>
</body>
</html>`;
  }
}

// Main Edge Function handler
serve(async (req) => {
  try {
    const { format = 'json', email_report = false } = await req.json();
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const generator = new WeeklyReportGenerator(supabaseUrl, supabaseServiceKey);
    
    console.log('Generating weekly security and performance report...');
    const report = await generator.generateWeeklyReport();
    
    if (format === 'html') {
      const htmlReport = HTMLReportGenerator.generateHTML(report);
      
      return new Response(htmlReport, {
        headers: { 'Content-Type': 'text/html' },
        status: 200
      });
    }
    
    return new Response(JSON.stringify(report, null, 2), {
      headers: { 'Content-Type': 'application/json' },
      status: 200
    });
    
  } catch (error) {
    console.error('Weekly report generation error:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Failed to generate weekly report',
      message: error.message 
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
});