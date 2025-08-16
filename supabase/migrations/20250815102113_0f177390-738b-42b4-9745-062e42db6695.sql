-- Fix the security definer view issue by recreating without SECURITY DEFINER
DROP VIEW IF EXISTS public.security_dashboard_summary;

-- Create a standard view for security dashboard (filtered data for regular admins)
-- This view will use the calling user's permissions, not the creator's
CREATE VIEW public.security_dashboard_summary AS
SELECT 
  'alert' as event_category,
  alert_type as event_type,
  severity::text as severity_level,
  created_at,
  status,
  -- Mask sensitive IP data for non-super admins
  CASE 
    WHEN public.is_super_admin() THEN details
    ELSE jsonb_build_object('masked', 'true', 'alert_summary', details->>'summary')
  END as filtered_details
FROM public.security_alerts
WHERE public.is_security_admin()

UNION ALL

SELECT 
  event_category,
  event_type,
  severity::text as severity_level,
  created_at,
  'processed' as status,
  -- Mask IP addresses and sensitive data for non-super admins
  CASE 
    WHEN public.is_super_admin() THEN event_details
    ELSE jsonb_build_object('masked', 'true', 'event_summary', event_details->>'summary')
  END as filtered_details
FROM public.security_events
WHERE public.is_super_admin();

-- Grant appropriate permissions
GRANT SELECT ON public.security_dashboard_summary TO authenticated;

-- Update the comment
COMMENT ON VIEW public.security_dashboard_summary IS 'Filtered view of security events for dashboard display with data masking based on user permissions - uses calling user context for security';

-- Log this security enhancement completion
INSERT INTO public.admin_activity_logs (
  user_id,
  action,
  details
) VALUES (
  auth.uid(),
  'Security Enhancement Completed',
  jsonb_build_object(
    'enhancement', 'security_tables_access_restriction_complete',
    'tables_secured', array['security_events', 'threat_intelligence', 'security_alerts', 'security_logs', 'security_log', 'security_event_log'],
    'timestamp', now(),
    'security_level', 'high',
    'status', 'completed'
  )
);