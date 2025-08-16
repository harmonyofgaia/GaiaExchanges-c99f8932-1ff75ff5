-- Add audit logging for access to these sensitive tables
CREATE OR REPLACE FUNCTION public.audit_security_table_access()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Log access to sensitive security tables
  INSERT INTO public.admin_activity_logs (
    user_id,
    action,
    details,
    ip_address
  ) VALUES (
    auth.uid(),
    TG_OP || ' on ' || TG_TABLE_NAME,
    jsonb_build_object(
      'table', TG_TABLE_NAME,
      'operation', TG_OP,
      'timestamp', now(),
      'user_role', CASE 
        WHEN public.is_super_admin() THEN 'super_admin'
        WHEN public.is_security_admin() THEN 'security_admin'
        ELSE 'user'
      END
    ),
    inet_client_addr()
  );
  
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$;

-- Apply audit triggers to sensitive tables
DROP TRIGGER IF EXISTS audit_security_events_access ON public.security_events;
CREATE TRIGGER audit_security_events_access
  AFTER INSERT OR UPDATE OR DELETE ON public.security_events
  FOR EACH ROW EXECUTE FUNCTION public.audit_security_table_access();

DROP TRIGGER IF EXISTS audit_threat_intelligence_access ON public.threat_intelligence;
CREATE TRIGGER audit_threat_intelligence_access
  AFTER INSERT OR UPDATE OR DELETE ON public.threat_intelligence
  FOR EACH ROW EXECUTE FUNCTION public.audit_security_table_access();

DROP TRIGGER IF EXISTS audit_security_alerts_access ON public.security_alerts;
CREATE TRIGGER audit_security_alerts_access
  AFTER INSERT OR UPDATE OR DELETE ON public.security_alerts
  FOR EACH ROW EXECUTE FUNCTION public.audit_security_table_access();

-- Create a view for security dashboard (filtered data for regular admins)
CREATE OR REPLACE VIEW public.security_dashboard_summary AS
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

-- Add comments for documentation
COMMENT ON FUNCTION public.is_security_admin() IS 'Verifies if the current user is a security administrator';
COMMENT ON FUNCTION public.is_super_admin() IS 'Verifies if the current user is a super administrator with access to most sensitive security data';
COMMENT ON VIEW public.security_dashboard_summary IS 'Filtered view of security events for dashboard display with data masking based on user permissions';