import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Generate weekly security report
    const report = await generateWeeklySecurityReport(supabaseClient);

    return new Response(
      JSON.stringify({
        success: true,
        report: report,
      })
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Weekly report error:", error);
    return new Response("Internal Server Error", {
      status: 500,
      headers: corsHeaders,
    });
  }
});

async function generateWeeklySecurityReport(supabaseClient: unknown) {
  const endDate = new Date();
  const startDate = new Date(endDate.getTime() - 7 * 24 * 60 * 60 * 1000); // 7 days ago

  // Gather data from the past week
  const { data: scans } = await supabaseClient
    .from("security_scans")
    .select("*")
    .gte("created_at", startDate.toISOString())
    .lte("created_at", endDate.toISOString())
    .order("created_at", { ascending: false });

  const { data: threats } = await supabaseClient
    .from("threat_intelligence")
    .select("*")
    .gte("detected_at", startDate.toISOString())
    .lte("detected_at", endDate.toISOString())
    .order("detected_at", { ascending: false });

  const { data: remediations } = await supabaseClient
    .from("security_remediation_logs")
    .select("*")
    .gte("created_at", startDate.toISOString())
    .lte("created_at", endDate.toISOString());

  // Calculate metrics
  const metrics = {
    totalScans: scans?.length || 0,
    averageComplianceScore:
      scans?.reduce((sum, scan) => sum + scan.compliance_score, 0) / (scans?.length || 1),
    totalThreats: threats?.length || 0,
    threatsResolved: threats?.filter((t) => t.resolved_at).length || 0,
    criticalIssues: scans?.reduce((sum, scan) => sum + scan.critical_issues, 0) || 0,
    highIssues: scans?.reduce((sum, scan) => sum + scan.high_issues, 0) || 0,
    mediumIssues: scans?.reduce((sum, scan) => sum + scan.medium_issues, 0) || 0,
    lowIssues: scans?.reduce((sum, scan) => sum + scan.low_issues, 0) || 0,
    successfulRemediations: remediations?.filter((r) => r.success).length || 0,
    failedRemediations: remediations?.filter((r) => !r.success).length || 0,
  };

  // Generate insights
  const insights = generateSecurityInsights(metrics, scans, threats);

  // Generate recommendations
  const recommendations = generateSecurityRecommendations(metrics, scans, threats);

  // Create HTML report
  const htmlReport = generateHTMLReport(metrics, insights, recommendations, startDate, endDate);

  return {
    reportId: `weekly-${Date.now()}`,
    period: {
      start: startDate.toISOString(),
      end: endDate.toISOString()
    },
    metrics,
    insights,
    recommendations,
    htmlReport,
    generatedAt: new Date().toISOString()
  };
}

function generateSecurityInsights(metrics: unknown, scans: unknown[], threats: unknown[]) {
  const insights = [];

  // Compliance trend
  if (metrics.averageComplianceScore >= 95) {
    insights.push({
      type: "positive",
      title: "Excellent Compliance",
      description: `Average compliance score of ${metrics.averageComplianceScore.toFixed(1)}% indicates strong security posture.`,
    });
  } else if (metrics.averageComplianceScore < 80) {
    insights.push({
      type: "warning",
      title: "Compliance Concern",
      description: `Average compliance score of ${metrics.averageComplianceScore.toFixed(1)}% requires attention.`,
    });
  }

  // Threat analysis
  if (metrics.totalThreats === 0) {
    insights.push({
      type: "positive",
      title: "No Threats Detected",
      description: "No security threats were detected this week.",
    });
  } else {
    const resolutionRate = (metrics.threatsResolved / metrics.totalThreats) * 100;
    insights.push({
      type: resolutionRate >= 90 ? "positive" : "warning",
      title: "Threat Resolution",
      description: `${resolutionRate.toFixed(1)}% of threats were resolved (${metrics.threatsResolved}/${metrics.totalThreats}).`,
    });
  }

  // Issue trends
  if (metrics.criticalIssues > 0) {
    insights.push({
      type: "critical",
      title: "Critical Issues Found",
      description: `${metrics.criticalIssues} critical security issues require immediate attention.`,
    });
  }

  return insights;
}

function generateSecurityRecommendations(metrics: unknown, scans: unknown[], threats: unknown[]) {
  const recommendations = [];

  // Compliance recommendations
  if (metrics.averageComplianceScore < 90) {
    recommendations.push({
      priority: "high",
      title: "Improve Compliance Score",
      description:
        "Focus on resolving high and medium priority issues to improve overall compliance.",
      actionItems: [
        "Review and update security policies",
        "Implement additional security controls",
        "Regular security training for team members",
      ],
    });
  }

  // Threat mitigation
  if (metrics.totalThreats > 0) {
    recommendations.push({
      priority: "medium",
      title: "Enhance Threat Detection",
      description:
        "Strengthen threat detection capabilities to identify and respond to threats faster.",
      actionItems: [
        "Implement real-time monitoring",
        "Update threat intelligence sources",
        "Improve incident response procedures",
      ],
    });
  }

  // Performance optimization
  if (metrics.totalScans > 0) {
    recommendations.push({
      priority: "low",
      title: "Optimize Security Scans",
      description: "Regular security scans are running well. Consider optimizing scan frequency.",
      actionItems: [
        "Review scan scheduling",
        "Optimize scan performance",
        "Implement automated remediation",
      ],
    });
  }

  return recommendations;
}

function generateHTMLReport(
  metrics: unknown,
  insights: unknown[],
  recommendations: unknown[],
  startDate: Date,
  endDate: Date
) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Weekly Security Report</title>
      <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        .header { background: #1e40af; color: white; padding: 20px; border-radius: 8px; }
        .metrics { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 20px; margin: 20px 0; }
        .metric { background: #f8fafc; padding: 15px; border-radius: 8px; border-left: 4px solid #1e40af; }
        .insight { margin: 10px 0; padding: 15px; border-radius: 8px; }
        .insight.positive { background: #dcfce7; border-left: 4px solid #16a34a; }
        .insight.warning { background: #fef3c7; border-left: 4px solid #f59e0b; }
        .insight.critical { background: #fee2e2; border-left: 4px solid #dc2626; }
        .recommendation { margin: 10px 0; padding: 15px; background: #f1f5f9; border-radius: 8px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>🛡️ Weekly Security Report</h1>
        <p>Report Period: ${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}</p>
      </div>
      
      <h2>Security Metrics</h2>
      <div class="metrics">
        <div class="metric">
          <h3>Total Scans</h3>
          <p>${metrics.totalScans}</p>
        </div>
        <div class="metric">
          <h3>Compliance Score</h3>
          <p>${metrics.averageComplianceScore.toFixed(1)}%</p>
        </div>
        <div class="metric">
          <h3>Threats Detected</h3>
          <p>${metrics.totalThreats}</p>
        </div>
        <div class="metric">
          <h3>Issues Resolved</h3>
          <p>${metrics.successfulRemediations}</p>
        </div>
      </div>
      
      <h2>Key Insights</h2>
      ${insights
        .map(
          (insight) => `
        <div class="insight ${insight.type}">
          <h3>${insight.title}</h3>
          <p>${insight.description}</p>
        </div>
      `
        )
        .join("")}
      
      <h2>Recommendations</h2>
      ${recommendations
        .map(
          (rec) => `
        <div class="recommendation">
          <h3>${rec.title} (${rec.priority.toUpperCase()} Priority)</h3>
          <p>${rec.description}</p>
          <ul>
            ${rec.actionItems.map((item) => `<li>${item}</li>`).join("")}
          </ul>
        </div>
      `
        )
        .join("")}
      
      <div style="margin-top: 40px; padding-top: 20px; border-top: 1px solid #e2e8f0; color: #64748b;">
        <p>Generated on ${new Date().toLocaleString()}</p>
        <p>GAiA Exchange Security System</p>
      </div>
    </body>
    </html>
  `;
}
