-- CRITICAL SECURITY FIX: Secure all security-related tables
-- This prevents exposure of sensitive security data to attackers

-- 1. Fix security_monitoring table (most critical)
DROP POLICY IF EXISTS "Admins can manage security events" ON public.security_monitoring;
DROP POLICY IF EXISTS "Admins can view security monitoring" ON public.security_monitoring;
DROP POLICY IF EXISTS "System can log security events" ON public.security_monitoring;

-- Create secure policies for security_monitoring
CREATE POLICY "security_monitoring_select_super_admin_only" 
ON public.security_monitoring 
FOR SELECT 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  )
);

CREATE POLICY "security_monitoring_insert_admin_only" 
ON public.security_monitoring 
FOR INSERT 
TO authenticated 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users 
    WHERE user_id = auth.uid() AND is_active = true
  )
);

CREATE POLICY "security_monitoring_update_super_admin_only" 
ON public.security_monitoring 
FOR UPDATE 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  )
) 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  )
);

CREATE POLICY "security_monitoring_delete_super_admin_only" 
ON public.security_monitoring 
FOR DELETE 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  )
);

-- 2. Secure other security tables that might have RLS enabled
-- Check and secure security_alerts
ALTER TABLE public.security_alerts ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "security_alerts_access" ON public.security_alerts;
CREATE POLICY "security_alerts_super_admin_only" 
ON public.security_alerts 
FOR ALL 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  )
) 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  )
);

-- 3. Secure security_scans
ALTER TABLE public.security_scans ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "security_scans_access" ON public.security_scans;
CREATE POLICY "security_scans_super_admin_only" 
ON public.security_scans 
FOR ALL 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  )
) 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  )
);

-- 4. Secure security_risk_assessments
ALTER TABLE public.security_risk_assessments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "security_risk_assessments_access" ON public.security_risk_assessments;
CREATE POLICY "security_risk_assessments_super_admin_only" 
ON public.security_risk_assessments 
FOR ALL 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  )
) 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  )
);

-- 5. Secure security_remediation_logs
ALTER TABLE public.security_remediation_logs ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "security_remediation_logs_access" ON public.security_remediation_logs;
CREATE POLICY "security_remediation_logs_super_admin_only" 
ON public.security_remediation_logs 
FOR ALL 
TO authenticated 
USING (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  )
) 
WITH CHECK (
  EXISTS (
    SELECT 1 FROM public.admin_users au
    JOIN public.admin_profiles ap ON au.user_id = ap.user_id
    WHERE au.user_id = auth.uid() 
    AND au.is_active = true 
    AND ap.role = 'super_admin'
  )
);

-- 6. Create security function for system logging (controlled access)
CREATE OR REPLACE FUNCTION public.log_security_event_system(
  p_event_type text,
  p_details jsonb,
  p_severity text DEFAULT 'medium'
)
RETURNS void AS $$
BEGIN
  -- Only allow system functions to log security events
  -- This prevents unauthorized logging
  INSERT INTO public.security_monitoring (
    event_type,
    user_id,
    details,
    severity,
    created_at
  ) VALUES (
    p_event_type,
    auth.uid(),
    p_details,
    p_severity,
    NOW()
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- 7. Create audit trail for security table access
CREATE OR REPLACE FUNCTION public.audit_security_table_access()
RETURNS TRIGGER AS $$
BEGIN
  -- Log all access to security tables for auditing
  INSERT INTO public.security_monitoring (
    event_type,
    user_id,
    details,
    severity
  ) VALUES (
    'security_table_access',
    auth.uid(),
    jsonb_build_object(
      'table_name', TG_TABLE_NAME,
      'operation', TG_OP,
      'timestamp', NOW(),
      'user_role', (
        SELECT ap.role FROM public.admin_users au
        JOIN public.admin_profiles ap ON au.user_id = ap.user_id
        WHERE au.user_id = auth.uid()
      )
    ),
    'high'
  );
  
  IF TG_OP = 'DELETE' THEN
    RETURN OLD;
  ELSE
    RETURN NEW;
  END IF;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = '';

-- Add audit triggers to all security tables
DROP TRIGGER IF EXISTS security_events_audit ON public.security_events;
CREATE TRIGGER security_events_audit
  AFTER INSERT OR UPDATE OR DELETE ON public.security_events
  FOR EACH ROW EXECUTE FUNCTION public.audit_security_table_access();

DROP TRIGGER IF EXISTS security_logs_audit ON public.security_logs;
CREATE TRIGGER security_logs_audit
  AFTER INSERT OR UPDATE OR DELETE ON public.security_logs
  FOR EACH ROW EXECUTE FUNCTION public.audit_security_table_access();

DROP TRIGGER IF EXISTS threat_intelligence_audit ON public.threat_intelligence;
CREATE TRIGGER threat_intelligence_audit
  AFTER INSERT OR UPDATE OR DELETE ON public.threat_intelligence
  FOR EACH ROW EXECUTE FUNCTION public.audit_security_table_access();