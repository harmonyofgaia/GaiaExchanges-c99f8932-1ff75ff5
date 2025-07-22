-- Security Remediation: Fix Function Search Path Mutable Issues
-- This migration secures all database functions by setting fixed search_path
-- to prevent search path manipulation attacks

-- 1. Secure the has_role function
ALTER FUNCTION public.has_role(_user_id UUID, _role user_role) 
SET search_path = 'public';

-- 2. Secure the handle_updated_at function
ALTER FUNCTION public.handle_updated_at() 
SET search_path = 'public';

-- 3. Secure admin access validation function
ALTER FUNCTION public.validate_admin_access(client_ip inet) 
SET search_path = 'public';

-- 4. Secure admin session creation function
ALTER FUNCTION public.create_admin_session(client_ip inet, client_user_agent text, client_fingerprint text) 
SET search_path = 'public';

-- 5. Secure admin session validation function
ALTER FUNCTION public.validate_admin_session(token text, client_ip inet) 
SET search_path = 'public';

-- 6. Secure admin metrics function
ALTER FUNCTION public.update_admin_metric(metric_name text, metric_value bigint, metric_type text, additional_data jsonb) 
SET search_path = 'public';

-- 7. Secure video tokens award function
ALTER FUNCTION public.award_video_tokens() 
SET search_path = 'public';

-- 8. Update has_role function with text parameter (if exists in later migrations)
DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_proc
    JOIN pg_namespace ON pg_proc.pronamespace = pg_namespace.oid
    WHERE proname = 'has_role'
      AND nspname = 'public'
      AND proargtypes = ARRAY['uuid'::regtype, 'text'::regtype]
  ) THEN
    ALTER FUNCTION public.has_role(_user_id UUID, _role text) 
    SET search_path = 'public';
  END IF;
END;
$$;

-- Create security audit log for tracking these changes
CREATE TABLE IF NOT EXISTS public.security_audit_log (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type TEXT NOT NULL,
  event_description TEXT NOT NULL,
  function_name TEXT,
  remediation_applied TEXT,
  applied_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  applied_by TEXT DEFAULT current_user
);

-- Enable RLS on security audit log
ALTER TABLE public.security_audit_log ENABLE ROW LEVEL SECURITY;

-- Create policy for security audit log (admin only access)
CREATE POLICY "Admins can view security audit log" ON public.security_audit_log
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Log the security remediation
INSERT INTO public.security_audit_log (event_type, event_description, remediation_applied)
VALUES (
  'SECURITY_REMEDIATION',
  'Applied search_path fixes to all database functions to prevent search path manipulation attacks',
  'ALTER FUNCTION SET search_path = public for all functions'
);

-- Create enhanced security monitoring function
CREATE OR REPLACE FUNCTION public.log_security_event(
  event_type TEXT,
  event_description TEXT,
  function_name TEXT DEFAULT NULL,
  additional_data JSONB DEFAULT NULL
)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = 'public'
AS $$
BEGIN
  INSERT INTO public.security_audit_log (
    event_type, 
    event_description, 
    function_name,
    remediation_applied
  )
  VALUES (
    event_type,
    event_description,
    function_name,
    COALESCE(additional_data->>'remediation', 'N/A')
  );
END;
$$;

-- Grant execute permission to authenticated users for security logging
GRANT EXECUTE ON FUNCTION public.log_security_event TO authenticated;

-- Log completion of this migration
SELECT public.log_security_event(
  'MIGRATION_COMPLETE',
  'Security remediation migration completed - all functions now have fixed search_path',
  'security_remediation_migration'
);