-- Security Fix: Restrict access to sensitive security tables
-- This migration enhances security for tables containing sensitive threat intelligence,
-- security events, alerts, and logs to prevent unauthorized access.

-- First, create a dedicated security role checking function to avoid JWT issues
CREATE OR REPLACE FUNCTION public.is_security_admin()
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  -- Check if the current user is an admin through the admin_users table
  RETURN EXISTS (
    SELECT 1 
    FROM public.admin_users au
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true
  );
END;
$$;

-- Create a function to check if user is a super admin for the most sensitive operations
CREATE OR REPLACE FUNCTION public.is_super_admin()
RETURNS boolean
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 
    FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  );
END;
$$;

-- Drop existing insecure policies
DROP POLICY IF EXISTS "Deny all access by default" ON public.security_events;
DROP POLICY IF EXISTS "Only admins can access security events" ON public.security_events;
DROP POLICY IF EXISTS "Users can only see their own security events" ON public.security_event_log;
DROP POLICY IF EXISTS "Only admins can access security event log" ON public.security_event_log;
DROP POLICY IF EXISTS "Only admins can access security logs" ON public.security_logs;
DROP POLICY IF EXISTS "Admins can view all logs" ON public.security_logs;
DROP POLICY IF EXISTS "Combined security log policy" ON public.security_log;
DROP POLICY IF EXISTS "Security alerts access" ON public.security_alerts;
DROP POLICY IF EXISTS "Admins can access threat intelligence" ON public.threat_intelligence;

-- Create secure policies for security_events (most sensitive - super admin only)
CREATE POLICY "Super admins only access to security events"
ON public.security_events
FOR ALL
TO authenticated
USING (public.is_super_admin())
WITH CHECK (public.is_super_admin());

-- Create secure policies for threat_intelligence (super admin only)
CREATE POLICY "Super admins only access to threat intelligence"
ON public.threat_intelligence
FOR ALL
TO authenticated
USING (public.is_super_admin())
WITH CHECK (public.is_super_admin());

-- Create secure policies for security_alerts (security admins can view/manage)
CREATE POLICY "Security admins can manage security alerts"
ON public.security_alerts
FOR ALL
TO authenticated
USING (public.is_security_admin())
WITH CHECK (public.is_security_admin());

-- Create secure policies for security_logs (security admins can view, super admins can modify)
CREATE POLICY "Security admins can view security logs"
ON public.security_logs
FOR SELECT
TO authenticated
USING (public.is_security_admin());

CREATE POLICY "Super admins can modify security logs"
ON public.security_logs
FOR INSERT, UPDATE, DELETE
TO authenticated
USING (public.is_super_admin())
WITH CHECK (public.is_super_admin());

-- Create secure policies for security_log (security admins can view, super admins can modify)
CREATE POLICY "Security admins can view security log"
ON public.security_log
FOR SELECT
TO authenticated
USING (public.is_security_admin());

CREATE POLICY "Super admins can modify security log"
ON public.security_log
FOR INSERT, UPDATE, DELETE
TO authenticated
USING (public.is_super_admin())
WITH CHECK (public.is_super_admin());

-- Create secure policies for security_event_log (users can see their own, admins see all)
CREATE POLICY "Users can view their own security event log entries"
ON public.security_event_log
FOR SELECT
TO authenticated
USING (user_id = auth.uid());

CREATE POLICY "Security admins can view all security event log entries"
ON public.security_event_log
FOR SELECT
TO authenticated
USING (public.is_security_admin());

CREATE POLICY "Super admins can modify security event log"
ON public.security_event_log
FOR INSERT, UPDATE, DELETE
TO authenticated
USING (public.is_super_admin())
WITH CHECK (public.is_super_admin());

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
CREATE TRIGGER audit_security_events_access
  AFTER INSERT OR UPDATE OR DELETE ON public.security_events
  FOR EACH ROW EXECUTE FUNCTION public.audit_security_table_access();

CREATE TRIGGER audit_threat_intelligence_access
  AFTER INSERT OR UPDATE OR DELETE ON public.threat_intelligence
  FOR EACH ROW EXECUTE FUNCTION public.audit_security_table_access();

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

-- Log this security enhancement
INSERT INTO public.admin_activity_logs (
  user_id,
  action,
  details
) VALUES (
  auth.uid(),
  'Security Enhancement Applied',
  jsonb_build_object(
    'enhancement', 'security_tables_access_restriction',
    'tables_secured', array['security_events', 'threat_intelligence', 'security_alerts', 'security_logs', 'security_log', 'security_event_log'],
    'timestamp', now(),
    'security_level', 'high'
  )
);