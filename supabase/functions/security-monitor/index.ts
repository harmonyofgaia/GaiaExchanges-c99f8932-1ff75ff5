import { serve } from "https://deno.land/std@0.208.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface SecurityIssue {
  table_name: string;
  issue_type: string;
  issue_description: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  auto_fixable: boolean;
  fix_sql?: string;
}

interface MonitoringResult {
  scan_id: string;
  timestamp: string;
  issues_found: SecurityIssue[];
  auto_fixes_applied: number;
  notifications_sent: number;
  compliance_score: number;
}

class SecurityMonitor {
  private supabase: any;
  private adminKey: string;

  constructor(supabaseUrl: string, adminKey: string) {
    this.supabase = createClient(supabaseUrl, adminKey);
    this.adminKey = adminKey;
  }

  // Main scanning function that checks for all types of security issues
  async performComprehensiveScan(): Promise<SecurityIssue[]> {
    const issues: SecurityIssue[] = [];

    try {
      // 1. Check RLS Policy Issues
      const rlsIssues = await this.scanRLSPolicies();
      issues.push(...rlsIssues);

      // 2. Check for Missing Indexes
      const indexIssues = await this.scanIndexes();
      issues.push(...indexIssues);

      // 3. Check Function Security
      const functionIssues = await this.scanFunctionSecurity();
      issues.push(...functionIssues);

      // 4. Check for Duplicate Policies
      const duplicateIssues = await this.scanDuplicatePolicies();
      issues.push(...duplicateIssues);

      // 5. Check Auth Configuration
      const authIssues = await this.scanAuthConfiguration();
      issues.push(...authIssues);

      // 6. Check Storage Security
      const storageIssues = await this.scanStorageSecurity();
      issues.push(...storageIssues);

    } catch (error) {
      console.error('Error during security scan:', error);
      issues.push({
        table_name: 'system',
        issue_type: 'scan_error',
        issue_description: `Security scan failed: ${error.message}`,
        severity: 'high',
        auto_fixable: false
      });
    }

    return issues;
  }

  // Scan RLS policies for security issues
  async scanRLSPolicies(): Promise<SecurityIssue[]> {
    const issues: SecurityIssue[] = [];

    try {
      // Check for tables without RLS enabled
      const { data: tablesWithoutRLS } = await this.supabase.rpc('validate_security_configuration');
      
      if (tablesWithoutRLS) {
        for (const issue of tablesWithoutRLS) {
          issues.push({
            table_name: issue.table_name,
            issue_type: issue.issue_type,
            issue_description: issue.issue_description,
            severity: issue.severity as 'low' | 'medium' | 'high' | 'critical',
            auto_fixable: issue.issue_type === 'missing_rls',
            fix_sql: issue.issue_type === 'missing_rls' 
              ? `ALTER TABLE ${issue.table_name} ENABLE ROW LEVEL SECURITY;`
              : undefined
          });
        }
      }

      // Check for policies using direct auth.uid() calls
      const { data: policies } = await this.supabase
        .from('pg_policies')
        .select('*')
        .or('qual.like.%auth.uid()%,with_check.like.%auth.uid()%');

      if (policies) {
        for (const policy of policies) {
          issues.push({
            table_name: policy.tablename,
            issue_type: 'insecure_auth_check',
            issue_description: `Policy "${policy.policyname}" uses direct auth.uid() call`,
            severity: 'medium',
            auto_fixable: true,
            fix_sql: this.generateSecureAuthPolicyFix(policy)
          });
        }
      }

    } catch (error) {
      console.error('Error scanning RLS policies:', error);
    }

    return issues;
  }

  // Scan for missing or duplicate indexes
  async scanIndexes(): Promise<SecurityIssue[]> {
    const issues: SecurityIssue[] = [];

    try {
      // Check for missing indexes on foreign keys
      const { data: missingIndexes } = await this.supabase.rpc(`
        SELECT 
          kcu.table_name,
          kcu.column_name,
          kcu.constraint_name
        FROM information_schema.key_column_usage kcu
        JOIN information_schema.table_constraints tc 
          ON kcu.constraint_name = tc.constraint_name
        LEFT JOIN pg_stat_user_indexes i 
          ON i.relname = kcu.table_name 
          AND i.indexrelname LIKE '%' || kcu.column_name || '%'
        WHERE tc.constraint_type = 'FOREIGN KEY'
          AND kcu.table_schema = 'public'
          AND i.indexrelname IS NULL
      `);

      if (missingIndexes) {
        for (const missing of missingIndexes) {
          issues.push({
            table_name: missing.table_name,
            issue_type: 'missing_index',
            issue_description: `Missing index on foreign key column: ${missing.column_name}`,
            severity: 'low',
            auto_fixable: true,
            fix_sql: `CREATE INDEX CONCURRENTLY IF NOT EXISTS idx_${missing.table_name}_${missing.column_name} ON ${missing.table_name}(${missing.column_name});`
          });
        }
      }

      // Check for duplicate indexes
      const { data: duplicateIndexes } = await this.supabase.rpc(`
        SELECT 
          schemaname,
          tablename,
          array_agg(indexname) as duplicate_indexes,
          indkey
        FROM pg_stat_user_indexes 
        WHERE schemaname = 'public'
        GROUP BY schemaname, tablename, indkey
        HAVING count(*) > 1
      `);

      if (duplicateIndexes) {
        for (const duplicate of duplicateIndexes) {
          const indexesToDrop = duplicate.duplicate_indexes.slice(1); // Keep first, drop rest
          issues.push({
            table_name: duplicate.tablename,
            issue_type: 'duplicate_index',
            issue_description: `Duplicate indexes found: ${indexesToDrop.join(', ')}`,
            severity: 'low',
            auto_fixable: true,
            fix_sql: indexesToDrop.map((idx: string) => `DROP INDEX CONCURRENTLY IF EXISTS ${idx};`).join('\n')
          });
        }
      }

    } catch (error) {
      console.error('Error scanning indexes:', error);
    }

    return issues;
  }

  // Scan function security settings
  async scanFunctionSecurity(): Promise<SecurityIssue[]> {
    const issues: SecurityIssue[] = [];

    try {
      // Check for SECURITY DEFINER functions without proper search_path
      const { data: insecureFunctions } = await this.supabase.rpc(`
        SELECT 
          proname,
          prosecdef,
          proconfig
        FROM pg_proc p
        JOIN pg_namespace n ON p.pronamespace = n.oid
        WHERE n.nspname = 'public'
          AND prosecdef = true
          AND (proconfig IS NULL OR NOT proconfig::text LIKE '%search_path%')
      `);

      if (insecureFunctions) {
        for (const func of insecureFunctions) {
          issues.push({
            table_name: 'functions',
            issue_type: 'insecure_function',
            issue_description: `SECURITY DEFINER function "${func.proname}" lacks proper search_path`,
            severity: 'high',
            auto_fixable: false // Requires manual review
          });
        }
      }

    } catch (error) {
      console.error('Error scanning function security:', error);
    }

    return issues;
  }

  // Scan for duplicate or conflicting policies
  async scanDuplicatePolicies(): Promise<SecurityIssue[]> {
    const issues: SecurityIssue[] = [];

    try {
      // Find tables with multiple permissive policies for same command
      const { data: duplicatePolicies } = await this.supabase.rpc(`
        SELECT 
          tablename,
          cmd,
          count(*) as policy_count,
          array_agg(policyname) as policy_names
        FROM pg_policies 
        WHERE schemaname = 'public' 
          AND permissive = 'PERMISSIVE'
        GROUP BY tablename, cmd
        HAVING count(*) > 1
      `);

      if (duplicatePolicies) {
        for (const duplicate of duplicatePolicies) {
          issues.push({
            table_name: duplicate.tablename,
            issue_type: 'duplicate_policies',
            issue_description: `Multiple ${duplicate.cmd} policies: ${duplicate.policy_names.join(', ')}`,
            severity: 'medium',
            auto_fixable: false // Requires manual consolidation
          });
        }
      }

    } catch (error) {
      console.error('Error scanning duplicate policies:', error);
    }

    return issues;
  }

  // Scan auth configuration
  async scanAuthConfiguration(): Promise<SecurityIssue[]> {
    const issues: SecurityIssue[] = [];

    try {
      // Check for weak session settings
      const sessionTimeout = await this.checkSessionTimeout();
      if (sessionTimeout > 24 * 60 * 60) { // More than 24 hours
        issues.push({
          table_name: 'auth',
          issue_type: 'weak_session_config',
          issue_description: 'Session timeout is too long (>24 hours)',
          severity: 'medium',
          auto_fixable: false
        });
      }

      // Check for missing MFA enforcement
      const { data: usersWithoutMFA } = await this.supabase
        .from('auth.users')
        .select('id')
        .is('phone', null)
        .limit(1);

      if (usersWithoutMFA && usersWithoutMFA.length > 0) {
        issues.push({
          table_name: 'auth',
          issue_type: 'weak_mfa_enforcement',
          issue_description: 'Users exist without MFA setup',
          severity: 'medium',
          auto_fixable: false
        });
      }

    } catch (error) {
      console.error('Error scanning auth configuration:', error);
    }

    return issues;
  }

  // Scan storage security
  async scanStorageSecurity(): Promise<SecurityIssue[]> {
    const issues: SecurityIssue[] = [];

    try {
      // Check for public buckets without proper policies
      const { data: buckets } = await this.supabase.storage.listBuckets();

      for (const bucket of buckets || []) {
        if (bucket.public) {
          const { data: policies } = await this.supabase.rpc(`
            SELECT count(*) as policy_count
            FROM storage.policies 
            WHERE bucket_id = '${bucket.id}'
          `);

          if (!policies || policies[0]?.policy_count === 0) {
            issues.push({
              table_name: 'storage',
              issue_type: 'public_bucket_no_policies',
              issue_description: `Public bucket "${bucket.id}" has no security policies`,
              severity: 'high',
              auto_fixable: false
            });
          }
        }
      }

    } catch (error) {
      console.error('Error scanning storage security:', error);
    }

    return issues;
  }

  // Auto-fix security issues where possible
  async autoFixIssues(issues: SecurityIssue[]): Promise<number> {
    let fixedCount = 0;

    for (const issue of issues) {
      if (issue.auto_fixable && issue.fix_sql) {
        try {
          console.log(`Auto-fixing issue: ${issue.issue_description}`);
          await this.supabase.rpc('execute_sql', { sql: issue.fix_sql });
          
          // Log the fix
          await this.logSecurityAction('auto_fix', issue);
          fixedCount++;
          
        } catch (error) {
          console.error(`Failed to auto-fix issue: ${issue.issue_description}`, error);
          await this.logSecurityAction('auto_fix_failed', issue, error.message);
        }
      }
    }

    return fixedCount;
  }

  // Generate threat intelligence report
  async generateThreatReport(issues: SecurityIssue[]): Promise<any> {
    const criticalIssues = issues.filter(i => i.severity === 'critical');
    const highIssues = issues.filter(i => i.severity === 'high');
    const mediumIssues = issues.filter(i => i.severity === 'medium');
    const lowIssues = issues.filter(i => i.severity === 'low');

    const complianceScore = Math.max(0, 100 - (
      criticalIssues.length * 25 +
      highIssues.length * 10 +
      mediumIssues.length * 5 +
      lowIssues.length * 1
    ));

    return {
      summary: {
        total_issues: issues.length,
        critical: criticalIssues.length,
        high: highIssues.length,
        medium: mediumIssues.length,
        low: lowIssues.length,
        compliance_score: complianceScore,
        auto_fixable: issues.filter(i => i.auto_fixable).length
      },
      issues: issues,
      recommendations: this.generateRecommendations(issues),
      next_scan: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
  }

  // Send notifications for critical issues
  async sendNotifications(issues: SecurityIssue[]): Promise<number> {
    const criticalIssues = issues.filter(i => i.severity === 'critical' || i.severity === 'high');
    
    if (criticalIssues.length === 0) {
      return 0;
    }

    try {
      // Get admin users
      const { data: admins } = await this.supabase
        .from('user_roles')
        .select('user_id')
        .eq('role', 'admin');

      let notificationsSent = 0;

      for (const admin of admins || []) {
        await this.supabase
          .from('notifications')
          .insert({
            user_id: admin.user_id,
            title: `🚨 Security Alert: ${criticalIssues.length} Critical Issues Found`,
            message: `Security scan detected ${criticalIssues.length} critical/high severity issues requiring immediate attention.`,
            type: 'security_alert',
            action_url: '/admin/security-dashboard'
          });
        
        notificationsSent++;
      }

      return notificationsSent;

    } catch (error) {
      console.error('Error sending notifications:', error);
      return 0;
    }
  }

  // Helper methods
  private generateSecureAuthPolicyFix(policy: any): string {
    // Replace direct auth.uid() with secure function call
    const secureQual = policy.qual?.replace(/auth\.uid\(\)/g, 'public.get_current_user_id()');
    const secureWithCheck = policy.with_check?.replace(/auth\.uid\(\)/g, 'public.get_current_user_id()');
    
    return `
      DROP POLICY IF EXISTS "${policy.policyname}" ON ${policy.tablename};
      CREATE POLICY "${policy.policyname}_secure" ON ${policy.tablename}
        FOR ${policy.cmd}
        ${secureQual ? `USING (${secureQual})` : ''}
        ${secureWithCheck ? `WITH CHECK (${secureWithCheck})` : ''};
    `;
  }

  private async checkSessionTimeout(): Promise<number> {
    // This would check actual auth configuration
    // For now, return a default value
    return 3600; // 1 hour
  }

  private generateRecommendations(issues: SecurityIssue[]): string[] {
    const recommendations = [];

    if (issues.some(i => i.issue_type === 'missing_rls')) {
      recommendations.push('Enable Row Level Security on all public tables');
    }

    if (issues.some(i => i.issue_type === 'insecure_auth_check')) {
      recommendations.push('Replace direct auth.uid() calls with secure wrapper functions');
    }

    if (issues.some(i => i.issue_type === 'missing_index')) {
      recommendations.push('Add indexes on all foreign key columns for better performance');
    }

    if (issues.some(i => i.issue_type === 'duplicate_policies')) {
      recommendations.push('Consolidate multiple permissive policies into single policies per table/action');
    }

    if (issues.some(i => i.severity === 'critical' || i.severity === 'high')) {
      recommendations.push('Address critical and high severity issues immediately');
    }

    return recommendations;
  }

  private async logSecurityAction(action: string, issue: SecurityIssue, details?: string): Promise<void> {
    try {
      await this.supabase
        .from('security_audit_log')
        .insert({
          table_name: issue.table_name,
          operation: action.toUpperCase(),
          new_data: {
            issue_type: issue.issue_type,
            issue_description: issue.issue_description,
            severity: issue.severity,
            details: details || null,
            timestamp: new Date().toISOString()
          }
        });
    } catch (error) {
      console.error('Failed to log security action:', error);
    }
  }
}

// Main Edge Function handler
serve(async (req) => {
  try {
    const { action = 'scan', auto_fix = true } = await req.json();
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    
    const monitor = new SecurityMonitor(supabaseUrl, supabaseServiceKey);
    
    switch (action) {
      case 'scan': {
        console.log('Starting comprehensive security scan...');
        
        // Perform security scan
        const issues = await monitor.performComprehensiveScan();
        console.log(`Found ${issues.length} security issues`);
        
        // Auto-fix issues if enabled
        let autoFixesApplied = 0;
        if (auto_fix) {
          autoFixesApplied = await monitor.autoFixIssues(issues);
          console.log(`Auto-fixed ${autoFixesApplied} issues`);
        }
        
        // Send notifications for critical issues
        const notificationsSent = await monitor.sendNotifications(issues);
        
        // Generate comprehensive report
        const report = await monitor.generateThreatReport(issues);
        
        const result: MonitoringResult = {
          scan_id: crypto.randomUUID(),
          timestamp: new Date().toISOString(),
          issues_found: issues,
          auto_fixes_applied: autoFixesApplied,
          notifications_sent: notificationsSent,
          compliance_score: report.summary.compliance_score
        };
        
        return new Response(JSON.stringify(result), {
          headers: { 'Content-Type': 'application/json' },
          status: 200
        });
      }
      
      case 'status': {
        // Return current security status
        const issues = await monitor.performComprehensiveScan();
        const report = await monitor.generateThreatReport(issues);
        
        return new Response(JSON.stringify({
          status: 'healthy',
          last_scan: new Date().toISOString(),
          compliance_score: report.summary.compliance_score,
          critical_issues: report.summary.critical,
          high_issues: report.summary.high
        }), {
          headers: { 'Content-Type': 'application/json' },
          status: 200
        });
      }
      
      case 'report': {
        // Generate detailed compliance report
        const issues = await monitor.performComprehensiveScan();
        const report = await monitor.generateThreatReport(issues);
        
        return new Response(JSON.stringify(report), {
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
    console.error('Security monitor error:', error);
    
    return new Response(JSON.stringify({ 
      error: 'Internal server error',
      message: error.message 
    }), {
      headers: { 'Content-Type': 'application/json' },
      status: 500
    });
  }
});