-- SECURITY FIX: Enable RLS on tables missing row level security

-- Enable RLS on auth_rate_limits table
ALTER TABLE public.auth_rate_limits ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for auth_rate_limits (admin access only)
CREATE POLICY "Admins can view rate limits"
ON public.auth_rate_limits FOR SELECT
USING (public.get_current_user_admin_status());

CREATE POLICY "System can manage rate limits"
ON public.auth_rate_limits FOR ALL
USING (public.get_current_user_admin_status())
WITH CHECK (public.get_current_user_admin_status());

-- Enable RLS on security_monitoring table
ALTER TABLE public.security_monitoring ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for security_monitoring (admin access only)
CREATE POLICY "Admins can view security monitoring"
ON public.security_monitoring FOR SELECT
USING (public.get_current_user_admin_status());

CREATE POLICY "System can log security events"
ON public.security_monitoring FOR INSERT
WITH CHECK (true); -- Allow system to log events

CREATE POLICY "Admins can manage security events"
ON public.security_monitoring FOR UPDATE
USING (public.get_current_user_admin_status())
WITH CHECK (public.get_current_user_admin_status());

-- Log security fix completion
SELECT public.log_security_event(
  'rls_security_fix_completed',
  'info',
  auth.uid(),
  inet_client_addr(),
  NULL,
  jsonb_build_object(
    'tables_secured', ARRAY['auth_rate_limits', 'security_monitoring'],
    'policies_created', 6,
    'timestamp', now()
  )
);