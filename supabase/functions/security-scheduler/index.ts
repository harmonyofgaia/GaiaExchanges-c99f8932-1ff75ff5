import { serve } from "https://deno.land/std@0.208.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface ScheduleConfig {
  security_scan_interval: number; // hours
  performance_check_interval: number; // hours
  weekly_report_day: number; // 0-6 (Sunday-Saturday)
  weekly_report_hour: number; // 0-23
  auto_fix_enabled: boolean;
  notification_threshold: 'low' | 'medium' | 'high' | 'critical';
}

class SecurityScheduler {
  private supabase: any;
  private config: ScheduleConfig;

  constructor(supabaseUrl: string, adminKey: string) {
    this.supabase = createClient(supabaseUrl, adminKey);
    this.config = {
      security_scan_interval: 4, // Every 4 hours
      performance_check_interval: 1, // Every hour
      weekly_report_day: 1, // Monday
      weekly_report_hour: 9, // 9 AM
      auto_fix_enabled: true,
      notification_threshold: 'high'
    };
  }

  async executeScheduledTasks(): Promise<any> {
    const now = new Date();
    const results = {
      timestamp: now.toISOString(),
      tasks_executed: [],
      errors: [],
      next_execution: this.calculateNextExecution(now)
    };

    try {
      // Check if it's time for security scan
      if (this.shouldRunSecurityScan(now)) {
        console.log('Running scheduled security scan...');
        const scanResult = await this.runSecurityScan();
        results.tasks_executed.push({
          task: 'security_scan',
          result: scanResult,
          timestamp: now.toISOString()
        });
      }

      // Check if it's time for performance check
      if (this.shouldRunPerformanceCheck(now)) {
        console.log('Running scheduled performance check...');
        const perfResult = await this.runPerformanceCheck();
        results.tasks_executed.push({
          task: 'performance_check',
          result: perfResult,
          timestamp: now.toISOString()
        });
      }

      // Check if it's time for weekly report
      if (this.shouldGenerateWeeklyReport(now)) {
        console.log('Generating scheduled weekly report...');
        const reportResult = await this.generateWeeklyReport();
        results.tasks_executed.push({
          task: 'weekly_report',
          result: reportResult,
          timestamp: now.toISOString()
        });
      }

      // Run continuous monitoring tasks
      await this.runContinuousMonitoring();

      // Cleanup old audit logs
      await this.cleanupOldLogs();

      // Update system health status
      await this.updateSystemHealth();

    } catch (error) {
      console.error('Error in scheduled tasks:', error);
      results.errors.push({
        error: error.message,
        timestamp: now.toISOString()
      });
    }

    return results;
  }

  private shouldRunSecurityScan(now: Date): boolean {
    return this.shouldRunTask('last_security_scan', this.config.security_scan_interval, now);
  }

  private shouldRunPerformanceCheck(now: Date): boolean {
    return this.shouldRunTask('last_performance_check', this.config.performance_check_interval, now);
  }

  private shouldGenerateWeeklyReport(now: Date): boolean {
    const dayOfWeek = now.getDay();
    const hour = now.getHours();
    
    return dayOfWeek === this.config.weekly_report_day && 
           hour === this.config.weekly_report_hour &&
           !this.hasReportBeenGeneratedToday(now);
  }

  private async shouldRunTask(taskKey: string, intervalHours: number, now: Date): Promise<boolean> {
    try {
      const { data: lastRun } = await this.supabase
        .from('system_config')
        .select('config_value')
        .eq('config_key', taskKey)
        .single();

      if (!lastRun?.config_value) {
        return true; // Never run before
      }

      const lastRunTime = new Date(lastRun.config_value);
      const hoursSinceLastRun = (now.getTime() - lastRunTime.getTime()) / (1000 * 60 * 60);
      
      return hoursSinceLastRun >= intervalHours;

    } catch (error) {
      console.error(`Error checking last run time for ${taskKey}:`, error);
      return true; // Run on error to be safe
    }
  }

  private async hasReportBeenGeneratedToday(now: Date): Promise<boolean> {
    const startOfDay = new Date(now);
    startOfDay.setHours(0, 0, 0, 0);

    try {
      const { data } = await this.supabase
        .from('security_audit_log')
        .select('id')
        .eq('operation', 'WEEKLY_REPORT_GENERATED')
        .gte('created_at', startOfDay.toISOString())
        .limit(1);

      return data && data.length > 0;
    } catch (error) {
      console.error('Error checking if report generated today:', error);
      return false;
    }
  }

  private async runSecurityScan(): Promise<any> {
    try {
      // Call the security monitor function
      const response = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/security-monitor`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          action: 'scan',
          auto_fix: this.config.auto_fix_enabled
        })
      });

      const result = await response.json();

      // Update last run time
      await this.updateLastRunTime('last_security_scan');

      // Send notifications if issues found
      if (result.issues_found && result.issues_found.length > 0) {
        await this.sendScheduledNotifications('security_scan', result);
      }

      return result;

    } catch (error) {
      console.error('Error running security scan:', error);
      throw error;
    }
  }

  private async runPerformanceCheck(): Promise<any> {
    try {
      // Get current performance metrics
      const { data: queryStats } = await this.supabase.rpc(`
        SELECT 
          avg(mean_exec_time) as avg_query_time,
          count(*) filter (where mean_exec_time > 1000) as slow_queries,
          max(mean_exec_time) as slowest_query
        FROM pg_stat_statements 
        WHERE last_exec >= NOW() - INTERVAL '1 hour'
      `);

      const { data: connectionStats } = await this.supabase.rpc(`
        SELECT 
          count(*) as active_connections,
          count(*) filter (where state = 'active') as active_queries
        FROM pg_stat_activity 
        WHERE state != 'idle'
      `);

      const result = {
        avg_query_time: queryStats?.[0]?.avg_query_time || 0,
        slow_queries: queryStats?.[0]?.slow_queries || 0,
        slowest_query: queryStats?.[0]?.slowest_query || 0,
        active_connections: connectionStats?.[0]?.active_connections || 0,
        active_queries: connectionStats?.[0]?.active_queries || 0,
        timestamp: new Date().toISOString()
      };

      // Update last run time
      await this.updateLastRunTime('last_performance_check');

      // Check for performance issues
      if (result.avg_query_time > 1000 || result.slow_queries > 10) {
        await this.sendScheduledNotifications('performance_issue', result);
      }

      return result;

    } catch (error) {
      console.error('Error running performance check:', error);
      throw error;
    }
  }

  private async generateWeeklyReport(): Promise<any> {
    try {
      // Call the weekly report function
      const response = await fetch(`${Deno.env.get('SUPABASE_URL')}/functions/v1/weekly-security-report`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          format: 'json'
        })
      });

      const result = await response.json();

      // Update last run time
      await this.updateLastRunTime('last_weekly_report');

      return result;

    } catch (error) {
      console.error('Error generating weekly report:', error);
      throw error;
    }
  }

  private async runContinuousMonitoring(): Promise<void> {
    try {
      // Monitor for suspicious activities
      const { data: suspiciousEvents } = await this.supabase
        .from('security_events')
        .select('*')
        .gte('created_at', new Date(Date.now() - 5 * 60 * 1000).toISOString()) // Last 5 minutes
        .in('severity', ['high', 'maximum']);

      if (suspiciousEvents && suspiciousEvents.length > 0) {
        await this.sendImmediateAlert('suspicious_activity', suspiciousEvents);
      }

      // Monitor for failed login attempts
      const { data: failedLogins } = await this.supabase
        .from('security_events')
        .select('*')
        .eq('event_type', 'failed_login')
        .gte('created_at', new Date(Date.now() - 5 * 60 * 1000).toISOString())
        .limit(10);

      if (failedLogins && failedLogins.length >= 5) {
        await this.sendImmediateAlert('brute_force_attempt', failedLogins);
      }

      // Monitor for database errors
      await this.checkDatabaseHealth();

    } catch (error) {
      console.error('Error in continuous monitoring:', error);
    }
  }

  private async cleanupOldLogs(): Promise<void> {
    try {
      // Clean up audit logs older than 90 days
      const ninetyDaysAgo = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000);
      
      await this.supabase
        .from('security_audit_log')
        .delete()
        .lt('created_at', ninetyDaysAgo.toISOString());

      // Clean up old security events
      await this.supabase
        .from('security_events')
        .delete()
        .lt('created_at', ninetyDaysAgo.toISOString())
        .eq('resolved', true);

    } catch (error) {
      console.error('Error cleaning up old logs:', error);
    }
  }

  private async updateSystemHealth(): Promise<void> {
    try {
      // Calculate overall system health score
      const { data: recentIssues } = await this.supabase
        .from('security_audit_log')
        .select('new_data')
        .eq('operation', 'SECURITY_SCAN')
        .gte('created_at', new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()) // Last 24 hours
        .order('created_at', { ascending: false })
        .limit(1);

      let healthScore = 100;
      let status = 'healthy';

      if (recentIssues && recentIssues.length > 0) {
        const scanData = recentIssues[0].new_data;
        if (scanData && scanData.compliance_score) {
          healthScore = scanData.compliance_score;
          
          if (healthScore >= 90) status = 'healthy';
          else if (healthScore >= 70) status = 'warning';
          else status = 'critical';
        }
      }

      // Update system status
      await this.supabase
        .from('system_config')
        .upsert({
          config_key: 'system_health',
          config_value: JSON.stringify({
            score: healthScore,
            status: status,
            last_updated: new Date().toISOString()
          })
        });

    } catch (error) {
      console.error('Error updating system health:', error);
    }
  }

  private async updateLastRunTime(taskKey: string): Promise<void> {
    try {
      await this.supabase
        .from('system_config')
        .upsert({
          config_key: taskKey,
          config_value: new Date().toISOString()
        });
    } catch (error) {
      console.error(`Error updating last run time for ${taskKey}:`, error);
    }
  }

  private async sendScheduledNotifications(type: string, data: any): Promise<void> {
    try {
      const { data: admins } = await this.supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'admin');

      const messages = {
        security_scan: `Scheduled security scan completed. ${data.issues_found?.length || 0} issues found.`,
        performance_issue: `Performance issues detected. Average query time: ${data.avg_query_time}ms`,
        weekly_report: 'Weekly security report has been generated and is ready for review.'
      };

      for (const admin of admins || []) {
        await this.supabase
          .from('notifications')
          .insert({
            user_id: admin.user_id,
            title: `🔄 Scheduled ${type.replace('_', ' ')}`,
            message: messages[type] || `Scheduled task completed: ${type}`,
            type: 'scheduled_task'
          });
      }

    } catch (error) {
      console.error('Error sending scheduled notifications:', error);
    }
  }

  private async sendImmediateAlert(alertType: string, data: any): Promise<void> {
    try {
      const { data: admins } = await this.supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'admin');

      const alertMessages = {
        suspicious_activity: `🚨 ALERT: ${data.length} suspicious activities detected in the last 5 minutes`,
        brute_force_attempt: `🚨 ALERT: Potential brute force attack detected - ${data.length} failed login attempts`,
        database_error: `🚨 ALERT: Database errors detected - immediate attention required`
      };

      for (const admin of admins || []) {
        await this.supabase
          .from('notifications')
          .insert({
            user_id: admin.user_id,
            title: alertMessages[alertType] || `🚨 Security Alert: ${alertType}`,
            message: `Critical security event detected. Please review immediately.`,
            type: 'security_alert'
          });
      }

    } catch (error) {
      console.error('Error sending immediate alert:', error);
    }
  }

  private async checkDatabaseHealth(): Promise<void> {
    try {
      // Check for connection pool exhaustion
      const { data: connections } = await this.supabase.rpc(`
        SELECT count(*) as total_connections
        FROM pg_stat_activity
      `);

      if (connections?.[0]?.total_connections > 80) { // Assuming max 100 connections
        await this.sendImmediateAlert('database_error', {
          error: 'High connection count',
          connections: connections[0].total_connections
        });
      }

      // Check for long-running queries
      const { data: longQueries } = await this.supabase.rpc(`
        SELECT count(*) as long_running_queries
        FROM pg_stat_activity 
        WHERE state = 'active' 
        AND now() - query_start > interval '5 minutes'
      `);

      if (longQueries?.[0]?.long_running_queries > 0) {
        await this.sendImmediateAlert('database_error', {
          error: 'Long running queries detected',
          count: longQueries[0].long_running_queries
        });
      }

    } catch (error) {
      console.error('Error checking database health:', error);
    }
  }

  private calculateNextExecution(now: Date): string {
    // Calculate next execution time based on the shortest interval
    const nextExecution = new Date(now.getTime() + this.config.performance_check_interval * 60 * 60 * 1000);
    return nextExecution.toISOString();
  }

  async getScheduleStatus(): Promise<any> {
    try {
      const { data: configs } = await this.supabase
        .from('system_config')
        .select('*')
        .in('config_key', ['last_security_scan', 'last_performance_check', 'last_weekly_report', 'system_health']);

      const status = {};
      for (const config of configs || []) {
        status[config.config_key] = config.config_value;
      }

      return {
        current_config: this.config,
        last_runs: status,
        next_execution: this.calculateNextExecution(new Date()),
        status: 'active'
      };

    } catch (error) {
      console.error('Error getting schedule status:', error);
      return { error: error.message };
    }
  }
}

// Create system_config table if it doesn't exist
const initializeSystemConfig = async (supabase: any) => {
  try {
    await supabase.rpc(`
      CREATE TABLE IF NOT EXISTS public.system_config (
        id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
        config_key TEXT UNIQUE NOT NULL,
        config_value TEXT NOT NULL,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      )
    `);

    // Enable RLS
    await supabase.rpc(`
      ALTER TABLE public.system_config ENABLE ROW LEVEL SECURITY
    `);

    // Create policy for admin access
    await supabase.rpc(`
      CREATE POLICY IF NOT EXISTS "Admin can manage system config" ON public.system_config
        FOR ALL USING (public.has_role_secure(public.get_current_user_id(), 'admin'))
    `);

  } catch (error) {
    console.error('Error initializing system config:', error);
  }
};

// Main Edge Function handler
serve(async (req) => {
  try {
    const { action = 'execute' } = await req.json();
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    
    // Initialize system config table
    await initializeSystemConfig(supabase);
    
    const scheduler = new SecurityScheduler(supabaseUrl, supabaseServiceKey);
    
    switch (action) {
      case 'execute': {
        console.log('Executing scheduled security tasks...');
        const result = await scheduler.executeScheduledTasks();
        
        return new Response(JSON.stringify(result), {
          headers: { 'Content-Type': 'application/json' },
          status: 200
        });
      }
      
      case 'status': {
        const status = await scheduler.getScheduleStatus();
        
        return new Response(JSON.stringify(status), {
          headers: { 'Content-Type': 'application/json' },
          status: 200
        });
      }
      
      default:
        return new Response(JSON.stringify({ error: 'Invalid action' }), {
          headers: { 'Content-Type': 'application/json' },
          status: 400
        });
    }
    
  } catch (error) {
    console.error('Security scheduler error:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Scheduler execution failed',
      message: error.message 
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
});